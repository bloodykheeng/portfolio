import { useEffect } from "react";

const DriftWidget = ({ appId }) => {
  useEffect(() => {
    (function () {
      var t = (window.driftt = window.drift = window.driftt || []);
      if (!t.init) {
        if (t.invoked) {
          if (window.console && console.error) {
            console.error("Drift snippet included twice.");
          }
          return;
        }
        t.invoked = true;
        t.methods = [
          "identify",
          "config",
          "track",
          "reset",
          "debug",
          "show",
          "hide",
          "setUserAttributes",
          "showWelcomeMessage",
          "hideWelcomeMessage",
          "toggleChat",
          "ping",
        ];
        t.factory = function (e) {
          return function () {
            var n = Array.prototype.slice.call(arguments);
            n.unshift(e);
            t.push(n);
            return t;
          };
        };
        t.methods.forEach(function (e) {
          t[e] = t.factory(e);
        });
        t.load = function (tID) {
          var e = 3e5;
          var n = Math.ceil(new Date() / e) * e;
          var o = "https://driftt.com" + n + "/" + tID + ".js";
          var i = document.createElement("script");
          i.type = "text/javascript";
          i.async = true;
          i.crossorigin = "anonymous";
          i.src = o;
          var a = document.getElementsByTagName("script")[0];
          a.parentNode.insertBefore(i, a);
        };
      }
    })();

    window.drift.SNIPPET_VERSION = "0.3.1";
    window.drift.load(appId);
  }, [appId]);

  return null;
};

export default DriftWidget;
