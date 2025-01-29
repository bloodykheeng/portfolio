import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";

const OlyCashPaymentDialog = () => {
  const [visible, setVisible] = useState(false);

  const initializeOlycashWidget = () => {
    const script = document.createElement("script");
    script.id = "olycash-js-sdk";
    script.src = "https://share.olycash.com/en-us/sdk.js";
    script.async = true;
    script.onload = () => {
      if (window.OlyCash && window.OlyCash.init) {
        window.OlyCash.init(); // Initialize the widget after script loads
      }
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (visible) {
      // Load the OlyCash SDK script if it’s not already loaded
      let olyCashScriptTag = document.getElementById("olycash-js-sdk");
      if (!olyCashScriptTag) {
        // If no script, reinitialize the widget
        initializeOlycashWidget();
      } else {
        // If script is already loaded, first remove existing script then reinitialize the widget
        olyCashScriptTag.remove();
        initializeOlycashWidget();
      }
    }
  }, [visible]);

  return (
    <div>
      {/* Button to open dialog */}
      <button
        className="p-button p-button-primary"
        onClick={() => setVisible(true)}
      >
        Hire me or Buy me a Coffee ☕☕☕
      </button>

      {/* Dialog with OlyCash form */}
      <Dialog
        header="Support Me with OlyCash"
        visible={visible}
        onHide={() => setVisible(false)}
        modal
        maximizable
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <div
            className="olycash-pay olycash--window"
            style={{ width: "100% !important" }}
            data-ignorefrequency="Y"
            data-id="1346D7C_759467"
          >
            {/* Hidden inputs for payment details */}
            <input
              type="hidden"
              id="olycash__category"
              name="olycash__category"
              value="156"
            />
            <input
              type="hidden"
              id="olycash__total"
              name="olycash__total"
              value="5000"
            />
            <input
              type="hidden"
              id="olycash__currency"
              name="olycash__currency"
              value="UGX"
            />
            <input
              type="hidden"
              id="olycash__third_party_fee_paid_by"
              name="olycash__third_party_fee_paid_by"
              value="payer"
            />

            {/* Noscript fallback */}
            <noscript>
              You need JavaScript enabled to interact with OlyCash.
            </noscript>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default OlyCashPaymentDialog;
