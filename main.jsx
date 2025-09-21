import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@websim/remotion/player";
import { NullweaveIntro } from "./composition.jsx";
const App = () => {
  return /* @__PURE__ */ jsxDEV(
    Player,
    {
      component: NullweaveIntro,
      durationInFrames: 180,
      fps: 30,
      compositionWidth: 1080,
      compositionHeight: 1080,
      loop: true,
      controls: true,
      autoplay: true,
      style: {
        maxWidth: "100%",
        maxHeight: "100%",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)"
      }
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 8,
      columnNumber: 5
    }
  );
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 26,
  columnNumber: 51
}));
