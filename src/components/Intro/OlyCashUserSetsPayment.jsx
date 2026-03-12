import { useState, useEffect, useRef, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// WHY NO <Dialog> HERE:
//
// PrimeReact's <Dialog> uses a Portal that React fully unmounts when
// visible=false. OlyCash's SDK mutates the Portal's DOM directly (injects
// iframes, moves nodes). When React unmounts, it tries to remove nodes that
// OlyCash has already moved → "insertBefore: node is not a child" crash.
//
// Fix: build our own always-mounted modal overlay in plain React.
// The overlay is NEVER unmounted — we just show/hide it with CSS.
// OlyCash can mutate the interior freely; React never unmounts it → no crash.
// ─────────────────────────────────────────────────────────────────────────────

const OlyCashUserSetsPayment = () => {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("10.00");
  const [visible, setVisible] = useState(false);
  const [sdkLoading, setSdkLoading] = useState(false);
  const [maximized, setMaximized] = useState(false);

  // Stable anchor — React renders it once, never reconciles its children
  const anchorRef = useRef(null);
  const initTimeoutRef = useRef(null);
  const isMounted = useRef(true);
  // Track whether we have ever initialised (so we init on first open only,
  // not re-init on every render)
  const hasInited = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      clearTimeout(initTimeoutRef.current);
    };
  }, []);

  // ── Build widget DOM imperatively (outside React's vdom) ──────────────────
  const buildWidgetDOM = useCallback((cur, amt) => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    while (anchor.firstChild) anchor.removeChild(anchor.firstChild);

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "olycash-pay olycash--window";
    widgetDiv.style.width = "100%";
    widgetDiv.dataset.ignorefrequency = "Y";
    widgetDiv.dataset.id = "1346D7C_959467";

    const makeHidden = (id, name, value) => {
      const inp = document.createElement("input");
      inp.type = "hidden";
      inp.id = id;
      inp.name = name;
      inp.value = value;
      return inp;
    };
    widgetDiv.appendChild(
      makeHidden("olycash__category", "olycash__category", "156"),
    );
    widgetDiv.appendChild(makeHidden("olycash__total", "olycash__total", amt));
    widgetDiv.appendChild(
      makeHidden("olycash__currency", "olycash__currency", cur),
    );
    widgetDiv.appendChild(
      makeHidden(
        "olycash__third_party_fee_paid_by",
        "olycash__third_party_fee_paid_by",
        "payer",
      ),
    );
    anchor.appendChild(widgetDiv);
  }, []);

  // ── Remove OlyCash iframes/overlays injected into <body> ─────────────────
  const cleanBodyNodes = useCallback(() => {
    document
      .querySelectorAll(
        'iframe[src*="olycash"], div[class*="olycash"][id*="olycash"]',
      )
      .forEach((el) => {
        if (!anchorRef.current?.contains(el)) el.remove();
      });
  }, []);

  // ── Load SDK script and init ───────────────────────────────────────────────
  const loadAndInitSDK = useCallback(
    (cur, amt) => {
      if (!isMounted.current) return;
      setSdkLoading(true);
      hasInited.current = false;

      cleanBodyNodes();

      const existing = document.getElementById("olycash-js-sdk");
      if (existing) existing.remove();

      buildWidgetDOM(cur, amt);

      const script = document.createElement("script");
      script.id = "olycash-js-sdk";
      script.src = "https://share.olycash.com/en-us/sdk.js";
      script.async = true;

      script.onload = () => {
        initTimeoutRef.current = setTimeout(() => {
          if (!isMounted.current) return;
          try {
            if (window.OlyCash && typeof window.OlyCash.init === "function") {
              window.OlyCash.init();
              hasInited.current = true;
            }
          } catch (e) {
            console.warn("OlyCash init error:", e);
          }
          initTimeoutRef.current = setTimeout(() => {
            if (isMounted.current) setSdkLoading(false);
          }, 1000);
        }, 300);
      };

      script.onerror = () => {
        if (isMounted.current) setSdkLoading(false);
      };

      document.body.appendChild(script);
    },
    [buildWidgetDOM, cleanBodyNodes],
  );

  // ── React to dialog open ───────────────────────────────────────────────────
  useEffect(() => {
    if (visible) {
      // Small delay so our overlay CSS transition finishes before SDK scans DOM
      initTimeoutRef.current = setTimeout(() => {
        loadAndInitSDK(currency, amount);
      }, 150);
    } else {
      clearTimeout(initTimeoutRef.current);
      // Don't destroy the DOM — just let CSS hide it.
      // OlyCash's nodes stay intact; nothing for React to reconcile.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const onClose = () => {
    clearTimeout(initTimeoutRef.current);
    setCurrency("USD");
    setAmount("10.00");
    setMaximized(false);
    setVisible(false);
  };

  // ─── Dark/light-mode aware CSS vars (PrimeReact tokens) ───────────────────
  // backdrop + modal shell
  const backdropStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 1100,
    backgroundColor: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // show/hide via opacity + pointer-events so React NEVER unmounts this node
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
    transition: "opacity 0.2s ease",
  };

  const modalStyle = {
    position: "relative",
    width: maximized ? "100vw" : "min(92vw, 860px)",
    height: maximized ? "100vh" : "auto",
    maxHeight: maximized ? "100vh" : "90vh",
    overflowY: "auto",
    borderRadius: maximized ? "0" : "8px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
    backgroundColor: "var(--surface-overlay, #ffffff)",
    color: "var(--text-color, #000000)",
    display: "flex",
    flexDirection: "column",
    transform: visible ? "scale(1)" : "scale(0.96)",
    transition:
      "transform 0.2s ease, width 0.2s ease, height 0.2s ease, border-radius 0.2s ease",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 1.25rem",
    borderBottom: "1px solid var(--surface-border, #e0e0e0)",
    fontFamily: "Arial, sans-serif",
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "var(--text-color, #000)",
  };

  const closeBtnStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.4rem",
    lineHeight: 1,
    color: "var(--text-color-secondary, #6b7280)",
    padding: "2px 6px",
    borderRadius: "4px",
  };

  const bodyStyle = {
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    minHeight: "300px",
  };

  const overlayStyle = {
    position: "absolute",
    inset: 0,
    display: sdkLoading ? "flex" : "none",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--surface-overlay, rgba(255,255,255,0.93))",
    zIndex: 10,
    gap: "14px",
    borderRadius: "0 0 8px 8px",
  };

  const spinnerStyle = {
    width: "42px",
    height: "42px",
    border: "4px solid var(--surface-border, #e0e0e0)",
    borderTop: "4px solid var(--primary-color, #6366f1)",
    borderRadius: "50%",
    animation: "olycash__spin 0.75s linear infinite",
  };

  const inputBase = {
    border: "1px solid #B2B2B2",
    backgroundColor: "var(--surface-card, #ffffff)",
    color: "var(--text-color, #000000)",
    fontFamily: "Arial, sans-serif",
    fontSize: "17px",
  };

  return (
    <>
      <style>{`
        @keyframes olycash__spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── Trigger button ─────────────────────────────────────────────────── */}
      <button
        className="p-button p-button-primary"
        onClick={() => setVisible(true)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <strong>Buy me a Coffee</strong>
        <strong>☕☕☕</strong>
      </button>

      {/* ── Always-mounted modal overlay ────────────────────────────────────
          opacity/pointerEvents toggle means React NEVER unmounts this tree.
          OlyCash is free to mutate anchorRef's children; React ignores them. */}
      <div
        style={backdropStyle}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div style={modalStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <span>Buy me a Coffee ☕☕☕</span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {/* Maximize / Restore button */}
              <button
                style={closeBtnStyle}
                onClick={() => setMaximized((m) => !m)}
                aria-label={maximized ? "Restore" : "Maximize"}
                title={maximized ? "Restore" : "Maximize"}
              >
                {maximized ? "⊡" : "⤢"}
              </button>
              <button
                style={closeBtnStyle}
                onClick={onClose}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div style={bodyStyle}>
            {/* Loading overlay */}
            <div style={overlayStyle}>
              <div style={spinnerStyle} />
              <p
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: "14px",
                  color: "var(--text-color-secondary, #6b7280)",
                  textAlign: "center",
                  maxWidth: "220px",
                  lineHeight: "1.5",
                  margin: 0,
                }}
              >
                ☕ Loading payment widget…
                <br />
                <span style={{ fontSize: "12px", opacity: 0.75 }}>
                  Please hold on, this takes a few seconds.
                </span>
              </p>
            </div>

            {/* Amount entry — fix: <tr> inside <tbody>, not bare inside <table> */}
            <table
              className="olycash-amount-entry-form"
              data-id="1346D7C_959467_amountform"
              style={{
                borderCollapse: "collapse",
                border: "none",
                minWidth: "100px",
                maxWidth: "250px",
                marginBottom: "10px",
                background: "none",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      background: "none",
                      border: "none",
                      fontWeight: "bold",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "17px",
                      padding: "0",
                      whiteSpace: "nowrap",
                      width: "1%",
                      color: "var(--text-color, inherit)",
                    }}
                  >
                    Amount:
                  </td>
                  <td
                    style={{ background: "none", border: "none", padding: "0" }}
                  >
                    <select
                      id="olycash__tempcurrency_1738145629"
                      name="olycash__tempcurrency_1738145629"
                      className="__olycash-temp-currency-field"
                      data-order="USD,UGX,EUR,GBP,KES"
                      style={{
                        ...inputBase,
                        width: "85px",
                        minHeight: "42px",
                        height: "42px",
                        padding: "10px 5px",
                      }}
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="USD">USD</option>
                      <option value="UGX">UGX</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="KES">KES</option>
                    </select>
                  </td>
                  <td
                    style={{ background: "none", border: "none", padding: "0" }}
                  >
                    <input
                      type="text"
                      inputMode="decimal"
                      id="olycash__temptotal_1738145629"
                      name="olycash__temptotal_1738145629"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      style={{
                        ...inputBase,
                        width: "100px",
                        height: "20px",
                        padding: "10px",
                      }}
                      className="__olycash-temp-amount-field"
                      placeholder="0.00"
                      maxLength="12"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Widget anchor — React owns this div but NEVER its children.
                buildWidgetDOM() manages children imperatively so OlyCash
                can mutate them freely without triggering React reconciliation. */}
            <div ref={anchorRef} style={{ width: "100%" }} />
          </div>
          {/* /body */}
        </div>
        {/* /modal */}
      </div>
      {/* /backdrop */}
    </>
  );
};

export default OlyCashUserSetsPayment;
