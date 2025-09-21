import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  random,
  Audio,
  staticFile
} from "remotion";
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  perspective: "1000px"
};
const textBaseStyle = {
  fontFamily: '"Exo2", sans-serif',
  fontWeight: 700,
  color: "#e0e0e0",
  letterSpacing: "0.05em",
  textShadow: `
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 20px #00aaff,
    0 0 30px #00aaff,
    0 0 40px #00aaff
  `
};
const NullweaveText = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const impactFrame = 40;
  const word = "NULLWEAVE";
  const letters = word.split("");
  const introProgress = spring({
    frame,
    fps,
    durationInFrames: 30,
    config: { damping: 200 }
  });
  const introTranslateZ = interpolate(introProgress, [0, 1], [-200, 0]);
  const impactSpring = spring({
    frame: frame - impactFrame,
    fps,
    config: { damping: 10, stiffness: 100 }
  });
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        display: "flex",
        transform: `translateZ(${introTranslateZ}px)`,
        opacity: introProgress
      },
      children: letters.map((char, i) => {
        const isFallingL = i === 3;
        const isNul = i < 3;
        const isWeave = i > 3;
        let letterTransform = "none";
        if (isFallingL) {
          const fallProgress = spring({
            frame: frame - impactFrame - 5,
            fps,
            config: { damping: 200, mass: 2 }
          });
          const fallY = interpolate(fallProgress, [0, 1], [0, 1500]);
          const fallRotateX = interpolate(fallProgress, [0, 1], [0, 720]);
          const fallRotateZ = interpolate(fallProgress, [0, 1], [0, -180]);
          const fallOpacity = interpolate(
            fallProgress,
            [0, 0.5, 1],
            [1, 1, 0]
          );
          letterTransform = `translateY(${fallY}px) rotateX(${fallRotateX}deg) rotateZ(${fallRotateZ}deg)`;
          return /* @__PURE__ */ jsxDEV(
            "span",
            {
              style: {
                ...textBaseStyle,
                fontSize: 100,
                display: "inline-block",
                transform: letterTransform,
                opacity: fallOpacity
              },
              children: char
            },
            i,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 89,
              columnNumber: 7
            }
          );
        }
        if (isNul) {
          const recoilRotateX = interpolate(
            impactSpring,
            [0, 0.5, 1],
            [0, 30, 0],
            { extrapolateRight: "clamp" }
          );
          const recoilTranslateX = interpolate(
            impactSpring,
            [0, 0.5, 1],
            [0, 20, 0],
            { extrapolateRight: "clamp" }
          );
          letterTransform = `rotateX(${recoilRotateX}deg) translateX(${recoilTranslateX}px)`;
        }
        if (isWeave) {
          const recoilTranslateX = interpolate(
            impactSpring,
            [0, 0.5, 1],
            [0, -15, 0],
            { extrapolateRight: "clamp" }
          );
          letterTransform = `translateX(${recoilTranslateX}px)`;
        }
        return /* @__PURE__ */ jsxDEV(
          "span",
          {
            style: {
              ...textBaseStyle,
              fontSize: 100,
              display: "inline-block",
              transform: letterTransform,
              transformOrigin: i < 3 ? "bottom right" : "bottom left"
            },
            children: char
          },
          i,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 131,
            columnNumber: 6
          }
        );
      })
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 58,
      columnNumber: 3
    }
  );
};
const Particle = ({ seed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const life = random(seed + "life") * 30 + 15;
  const progress = spring({
    frame,
    fps,
    durationInFrames: life
  });
  if (progress === 0 || progress === 1) return null;
  const x = (random(seed + "x") - 0.5) * 400;
  const y = (random(seed + "y") - 0.5) * 400;
  const z = (random(seed + "z") - 0.5) * 400;
  const endX = x * (random(seed + "endX") * 2 + 1);
  const endY = y * (random(seed + "endY") * 2 + 1);
  const endZ = z * (random(seed + "endZ") * 2 + 1);
  const currentX = interpolate(progress, [0, 1], [0, endX]);
  const currentY = interpolate(progress, [0, 1], [0, endY]);
  const currentZ = interpolate(progress, [0, 1], [0, endZ]);
  const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const size = interpolate(progress, [0, 1], [random(seed + "size") * 8 + 2, 0]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "#fff",
        opacity,
        transform: `translateX(${currentX}px) translateY(${currentY}px) translateZ(${currentZ}px)`,
        boxShadow: "0 0 10px #fff, 0 0 20px #00aaff"
      }
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 178,
      columnNumber: 3
    }
  );
};
const Particles = () => {
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: Array.from({ length: 50 }).map((_, i) => /* @__PURE__ */ jsxDEV(Particle, { seed: `particle-${i}` }, i, false, {
    fileName: "<stdin>",
    lineNumber: 197,
    columnNumber: 5
  })) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 195,
    columnNumber: 3
  });
};
const StudioText = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame,
    fps,
    config: { damping: 200, mass: 0.5 }
  });
  const flash = spring({
    frame,
    fps,
    durationInFrames: 15,
    config: { damping: 10 }
  });
  const opacity = interpolate(progress, [0, 0.5], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const glowRadius = interpolate(flash, [0, 0.5, 1], [50, 100, 20]);
  const glowOpacity = interpolate(flash, [0, 0.5, 1], [0, 1, 0.7]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        ...textBaseStyle,
        fontSize: 80,
        marginTop: "40px",
        transform: `scale(${scale})`,
        opacity,
        textShadow: `
          0 0 5px rgba(255,255,255, ${glowOpacity * 0.5}),
          0 0 10px rgba(255,255,255, ${glowOpacity * 0.5}),
          0 0 ${glowRadius}px #00aaff,
          0 0 ${glowRadius + 10}px #00aaff
        `
      },
      children: "STUDIO"
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 224,
      columnNumber: 3
    }
  );
};
const NullweaveIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const impactFrame = 40;
  const studioFrame = 90;
  const shakeProgress = spring({
    frame: frame - impactFrame,
    fps,
    durationInFrames: 20
  });
  const shakeX = Math.sin(shakeProgress * Math.PI * 4) * interpolate(shakeProgress, [0, 1], [10, 0]);
  const shakeY = Math.cos(shakeProgress * Math.PI * 6) * interpolate(shakeProgress, [0, 1], [10, 0]);
  return /* @__PURE__ */ jsxDEV(
    AbsoluteFill,
    {
      style: {
        background: "radial-gradient(circle, #222 0%, #000 100%)"
      },
      children: [
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            style: {
              ...containerStyle,
              width: "100%",
              height: "100%",
              transform: `translateX(${shakeX}px) translateY(${shakeY}px)`
            },
            children: [
              /* @__PURE__ */ jsxDEV(NullweaveText, {}, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 278,
                columnNumber: 5
              }),
              frame >= studioFrame && /* @__PURE__ */ jsxDEV(StudioText, {}, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 279,
                columnNumber: 30
              }),
              frame >= impactFrame && frame < impactFrame + 60 && /* @__PURE__ */ jsxDEV(Particles, {}, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 281,
                columnNumber: 58
              })
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 270,
            columnNumber: 4
          }
        ),
        /* @__PURE__ */ jsxDEV(
          Audio,
          {
            src: staticFile("impact.mp3"),
            startFrom: impactFrame,
            volume: 0.8
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 283,
            columnNumber: 4
          }
        )
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 264,
      columnNumber: 3
    }
  );
};
export {
  NullweaveIntro
};
