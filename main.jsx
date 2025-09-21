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
      durationInFrames: 150,
      fps: 30,
      compositionWidth: 720,
      compositionHeight: 1280,
      loop: true,
      controls: true,
      autoplay: true,
      muted: false,
      style: {
        width: "100%",
        height: "100%",
        maxWidth: "100vh",
        maxHeight: "100vh",
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
  lineNumber: 29,
  columnNumber: 51
}));
