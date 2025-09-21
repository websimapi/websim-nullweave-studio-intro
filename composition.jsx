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
const DustParticle = ({ seed }) => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  const life = durationInFrames;
  const progress = frame / life;
  const initialX = random(seed + "ix") * 2e3 - 1e3;
  const initialY = random(seed + "iy") * 1500 - 200;
  const speedX = (random(seed + "sx") - 0.5) * 80;
  const speedY = (random(seed + "sy") - 0.5) * 80;
  const x = initialX + progress * speedX;
  const y = initialY + progress * speedY;
  const opacity = random(seed + "op") * 0.1 + Math.sin(progress * Math.PI) * (random(seed + "op2") * 0.1);
  const size = random(seed + "size") * 2 + 1;
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "white",
        opacity
      }
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 56,
      columnNumber: 3
    }
  );
};
const Background = () => {
  return /* @__PURE__ */ jsxDEV(
    AbsoluteFill,
    {
      style: {
        background: "radial-gradient(circle, #222 0%, #000 100%)",
        overflow: "hidden"
      },
      children: /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { transform: "translateZ(-500px)" }, children: Array.from({ length: 200 }).map((_, i) => /* @__PURE__ */ jsxDEV(DustParticle, { seed: `dust-${i}` }, i, false, {
        fileName: "<stdin>",
        lineNumber: 81,
        columnNumber: 6
      })) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 79,
        columnNumber: 4
      })
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 73,
      columnNumber: 3
    }
  );
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
  const impactJitterProgress = spring({
    frame: frame - impactFrame,
    fps,
    durationInFrames: 15,
    config: { damping: 5, stiffness: 500 }
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
        const jitterX = (random("jitterX" + i) - 0.5) * interpolate(impactJitterProgress, [0, 1], [10, 0], {
          extrapolateRight: "clamp"
        });
        const jitterY = (random("jitterY" + i) - 0.5) * interpolate(impactJitterProgress, [0, 1], [10, 0], {
          extrapolateRight: "clamp"
        });
        let jitterTransform = `translateX(${jitterX}px) translateY(${jitterY}px)`;
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
              lineNumber: 161,
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
              transform: `${letterTransform} ${jitterTransform}`,
              transformOrigin: i < 3 ? "bottom right" : "bottom left"
            },
            children: char
          },
          i,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 203,
            columnNumber: 6
          }
        );
      })
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 118,
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
      lineNumber: 250,
      columnNumber: 3
    }
  );
};
const Particles = () => {
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: Array.from({ length: 50 }).map((_, i) => /* @__PURE__ */ jsxDEV(Particle, { seed: `particle-${i}` }, i, false, {
    fileName: "<stdin>",
    lineNumber: 269,
    columnNumber: 5
  })) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 267,
    columnNumber: 3
  });
};
const Spark = ({ seed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const life = 20;
  const progress = spring({
    frame,
    fps,
    durationInFrames: life,
    config: { damping: 200 }
  });
  if (progress === 0 || progress === 1) return null;
  const angle = random(seed + "angle") * Math.PI * 2;
  const distance = random(seed + "dist") * 200 + 50;
  const endX = Math.cos(angle) * distance;
  const endY = Math.sin(angle) * distance;
  const currentX = interpolate(progress, [0, 1], [0, endX]);
  const currentY = interpolate(progress, [0, 1], [0, endY]);
  const scale = interpolate(progress, [0, 1], [1, 0]);
  const opacity = interpolate(progress, [0, 0.5, 1], [0, 1, 0]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        position: "absolute",
        width: 8,
        height: 2,
        backgroundColor: "#00aaff",
        opacity,
        transform: `translateX(${currentX}px) translateY(${currentY}px) scaleX(${scale}) rotate(${angle * (180 / Math.PI)}deg)`,
        boxShadow: "0 0 10px #00aaff"
      }
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 301,
      columnNumber: 3
    }
  );
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
  const showSparks = frame < 30;
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        marginTop: "40px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
      children: [
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            style: {
              ...textBaseStyle,
              fontSize: 80,
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
            lineNumber: 349,
            columnNumber: 4
          }
        ),
        showSparks && /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: Array.from({ length: 30 }).map((_, i) => /* @__PURE__ */ jsxDEV(Spark, { seed: `spark-${i}` }, i, false, {
          fileName: "<stdin>",
          lineNumber: 368,
          columnNumber: 7
        })) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 366,
          columnNumber: 5
        })
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 340,
      columnNumber: 3
    }
  );
};
const NullweaveIntro = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const impactFrame = 40;
  const studioFrame = 90;
  const shakeProgress = spring({
    frame: frame - impactFrame,
    fps,
    durationInFrames: 20
  });
  const shakeX = Math.sin(shakeProgress * Math.PI * 4) * interpolate(shakeProgress, [0, 1], [10, 0]);
  const shakeY = Math.cos(shakeProgress * Math.PI * 6) * interpolate(shakeProgress, [0, 1], [10, 0]);
  const zoom = interpolate(frame, [0, durationInFrames], [1.2, 1]);
  const flashOpacity = interpolate(
    frame,
    [impactFrame, impactFrame + 3, impactFrame + 15],
    [0, 1, 0],
    { extrapolateRight: "clamp" }
  );
  return /* @__PURE__ */ jsxDEV(
    AbsoluteFill,
    {
      style: {
        backgroundColor: "#000"
      },
      children: [
        /* @__PURE__ */ jsxDEV(Background, {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 410,
          columnNumber: 4
        }),
        /* @__PURE__ */ jsxDEV(
          AbsoluteFill,
          {
            style: {
              transform: `scale(${zoom})`
            },
            children: /* @__PURE__ */ jsxDEV(
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
                    lineNumber: 424,
                    columnNumber: 6
                  }),
                  frame >= studioFrame && /* @__PURE__ */ jsxDEV(StudioText, {}, "studio", false, {
                    fileName: "<stdin>",
                    lineNumber: 426,
                    columnNumber: 7
                  }),
                  frame >= impactFrame && frame < impactFrame + 60 && /* @__PURE__ */ jsxDEV(Particles, {}, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 429,
                    columnNumber: 59
                  })
                ]
              },
              void 0,
              true,
              {
                fileName: "<stdin>",
                lineNumber: 416,
                columnNumber: 5
              }
            )
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 411,
            columnNumber: 4
          }
        ),
        /* @__PURE__ */ jsxDEV(
          AbsoluteFill,
          {
            style: {
              background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 60%)",
              opacity: flashOpacity
            }
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 433,
            columnNumber: 4
          }
        ),
        /* @__PURE__ */ jsxDEV(
          Audio,
          {
            src: staticFile("whoosh.mp3"),
            startFrom: impactFrame - 20,
            endAt: impactFrame,
            volume: 0.7
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 441,
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
            lineNumber: 447,
            columnNumber: 4
          }
        ),
        /* @__PURE__ */ jsxDEV(
          Audio,
          {
            src: staticFile("shatter.mp3"),
            startFrom: impactFrame,
            volume: 0.6
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 452,
            columnNumber: 4
          }
        ),
        /* @__PURE__ */ jsxDEV(
          Audio,
          {
            src: staticFile("tumble.mp3"),
            startFrom: impactFrame + 8,
            endAt: impactFrame + 50,
            volume: 0.4
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 457,
            columnNumber: 4
          }
        ),
        /* @__PURE__ */ jsxDEV(
          Audio,
          {
            src: staticFile("studio_reveal.mp3"),
            startFrom: studioFrame,
            volume: 0.7
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 463,
            columnNumber: 4
          }
        )
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 405,
      columnNumber: 3
    }
  );
};
export {
  NullweaveIntro
};
