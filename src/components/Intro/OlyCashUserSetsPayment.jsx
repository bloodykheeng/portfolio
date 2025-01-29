import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";

const OlyCashUserSetsPayment = () => {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("10.00");
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
      let olyCashScriptTag = document.getElementById("olycash-js-sdk");
      if (!olyCashScriptTag) {
        initializeOlycashWidget();
      } else {
        olyCashScriptTag.remove();
        initializeOlycashWidget();
      }
    }
  }, [visible]);

  const onClose = () => {
    setCurrency("USD");
    setAmount("10.00");
    setVisible(false);
  };

  return (
    <div>
      {/* Button to open dialog */}
      <button
        className="p-button p-button-primary"
        onClick={() => setVisible(true)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <strong>Buy me a Coffee</strong>
        <strong>☕☕☕</strong>
      </button>

      {/* Dialog with OlyCash form */}
      <Dialog
        header="Buy me a Coffee ☕☕☕"
        visible={visible}
        onHide={onClose}
        modal
        maximizable
        maximized
        style={{ width: "90vw" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          {/* Amount Entry Form */}
          <table
            className="olycash-amount-entry-form"
            data-id="1346D7C_959467_amountform"
            style={{
              borderCollapse: "collapse !important",
              border: "0px !important",
              minWidth: "100px !important",
              maxWidth: "250px !important",
              marginBottom: "10px",
              background: "none !important"
            }}
          >
            <tr style={{ background: "none !important" }}>
              <td
                style={{
                  background: "none !important",
                  border: "0px !important",
                  fontWeight: "bold",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "17px",
                  padding: "0px",
                  margin: "0px",
                  whiteSpace: "nowrap",
                  width: "1%"
                }}
              >
                Amount:
              </td>
              <td
                style={{
                  background: "none !important",
                  border: "0px !important",
                  padding: "0px",
                  margin: "0px"
                }}
              >
                <select
                  id="olycash__tempcurrency_1738145629"
                  name="olycash__tempcurrency_1738145629"
                  className="__olycash-temp-currency-field"
                  data-order="USD,UGX,EUR,GBP,KES"
                  style={{
                    width: "85px !important",
                    minHeight: "42px !important",
                    height: "42px !important",
                    padding: "10px 5px 10px 5px !important",
                    border: "1px solid #B2B2B2 !important",
                    backgroundColor: "#FFFFFF !important",
                    fontFamily: "Arial, sans-serif !important",
                    fontSize: "17px !important"
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
                style={{
                  background: "none !important",
                  border: "0px",
                  padding: "0px",
                  margin: "0px"
                }}
              >
                <input
                  type="text"
                  inputMode="decimal"
                  id="olycash__temptotal_1738145629"
                  name="olycash__temptotal_1738145629"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{
                    width: "100px !important",
                    minHeight: "20px !important",
                    height: "20px !important",
                    padding: "10px !important",
                    border: "1px solid #B2B2B2 !important",
                    backgroundColor: "#FFFFFF !important",
                    fontFamily: "Arial, sans-serif !important",
                    fontSize: "17px !important"
                  }}
                  className="__olycash-temp-amount-field"
                  placeholder="0.00"
                  maxLength="12"
                />
              </td>
            </tr>
          </table>

          {/* Hidden inputs for payment details */}
          <div
            className="olycash-pay olycash--window"
            style={{ width: "100% !important" }}
            data-ignorefrequency="Y"
            data-id="1346D7C_959467"
          >
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
              value={amount}
            />
            <input
              type="hidden"
              id="olycash__currency"
              name="olycash__currency"
              value={currency}
            />
            <input
              type="hidden"
              id="olycash__third_party_fee_paid_by"
              name="olycash__third_party_fee_paid_by"
              value="payer"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default OlyCashUserSetsPayment;
