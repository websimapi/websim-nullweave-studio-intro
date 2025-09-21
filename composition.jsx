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
  staticFile,
  Sequence
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
  fontWeight: 900,
  letterSpacing: "0.05em",
  position: "relative",
  display: "inline-block"
};
const NullweaveGradient = () => /* @__PURE__ */ jsxDEV("svg", { width: "0", height: "0", children: /* @__PURE__ */ jsxDEV("defs", { children: /* @__PURE__ */ jsxDEV("linearGradient", { id: "nullweaveGradient", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
  /* @__PURE__ */ jsxDEV("stop", { offset: "0%", style: { stopColor: "#9f00ff", stopOpacity: 1 } }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 34,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV("stop", { offset: "100%", style: { stopColor: "#00ffff", stopOpacity: 1 } }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 35,
    columnNumber: 5
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 33,
  columnNumber: 4
}) }, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 32,
  columnNumber: 3
}) }, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 31,
  columnNumber: 2
});
const StreamParticle = ({ seed }) => {
  const { width, height, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  const life = durationInFrames;
  const progress = frame % life / life;
  const initialX = random(seed + "ix") * width * 1.5 - width * 0.25;
  const initialY = random(seed + "iy") * height * 2 - height;
  const speed = random(seed + "speed") * 0.5 + 0.5;
  const x = initialX + progress * width * speed;
  const y = initialY + progress * (width / 2) * speed;
  const opacity = random(seed + "op") * 0.3 * Math.sin(progress * Math.PI);
  const size = random(seed + "size") * 2 + 1;
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        position: "absolute",
        left: x,
        top: y,
        width: size * 3,
        height: size,
        borderRadius: "50%",
        backgroundColor: "#00ffff",
        opacity,
        filter: "blur(1px)"
      }
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 60,
      columnNumber: 3
    }
  );
};
const Background = () => {
  const { width, height } = useVideoConfig();
  const gridStyle = {
    position: "absolute",
    width: "200%",
    height: "200%",
    top: "-50%",
    left: "-50%",
    backgroundImage: `
      linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
    `,
    backgroundSize: "50px 50px",
    transform: "rotateX(75deg) translateZ(-300px)"
  };
  return /* @__PURE__ */ jsxDEV(
    AbsoluteFill,
    {
      style: {
        background: "radial-gradient(ellipse at bottom, #0d1a2f 0%, #02040a 100%)",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ jsxDEV("div", { style: gridStyle }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 101,
          columnNumber: 4
        }),
        /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: Array.from({ length: 100 }).map((_, i) => /* @__PURE__ */ jsxDEV(StreamParticle, { seed: `stream-${i}` }, i, false, {
          fileName: "<stdin>",
          lineNumber: 104,
          columnNumber: 6
        })) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 102,
          columnNumber: 4
        })
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 94,
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
  const impactGlowPulse = spring({
    frame: frame - impactFrame,
    fps,
    durationInFrames: 20
  });
  const glowPulse = interpolate(impactGlowPulse, [0, 0.5, 1], [0, 1, 0]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        display: "flex",
        transform: `translateZ(${introTranslateZ}px)`,
        opacity: introProgress
      },
      children: [
        /* @__PURE__ */ jsxDEV(NullweaveGradient, {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 148,
          columnNumber: 4
        }),
        letters.map((char, i) => {
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
                  transform: letterTransform,
                  opacity: fallOpacity,
                  fill: "url(#nullweaveGradient)",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                  backgroundImage: "linear-gradient(to bottom, #9f00ff, #00ffff)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  textShadow: `
                  0 0 10px rgba(0, 255, 255, 0.7),
                  0 0 20px rgba(159, 0, 255, 0.5)
                `
                },
                children: char
              },
              i,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 173,
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
                transform: `${letterTransform}`,
                transformOrigin: i < 3 ? "bottom right" : "bottom left",
                fill: "url(#nullweaveGradient)",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                backgroundImage: "linear-gradient(to bottom, #9f00ff, #00ffff)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                textShadow: `
                0 0 10px rgba(0, 255, 255, 0.7),
                0 0 20px rgba(159, 0, 255, 0.5),
                ${isNul ? `0 0 ${20 + glowPulse * 20}px rgba(0, 255, 255, ${glowPulse * 0.5})` : ""}
              `
              },
              children: char
            },
            i,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 224,
              columnNumber: 6
            }
          );
        })
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 141,
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
  const x = (random(seed + "x") - 0.5) * 50;
  const y = (random(seed + "y") - 0.5) * 50;
  const z = (random(seed + "z") - 0.5) * 50;
  const endX = x * (random(seed + "endX") * 3 + 1);
  const endY = y * (random(seed + "endY") * 3 + 1);
  const endZ = z * (random(seed + "endZ") * 3 + 1);
  const currentX = interpolate(progress, [0, 1], [0, endX]);
  const currentY = interpolate(progress, [0, 1], [0, endY]);
  const currentZ = interpolate(progress, [0, 1], [0, endZ]);
  const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const size = interpolate(progress, [0, 1], [random(seed + "size") * 6 + 2, 0]);
  const color = random(seed) > 0.5 ? "#9f00ff" : "#00ffff";
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        opacity,
        transform: `translateX(${currentX}px) translateY(${currentY}px) translateZ(${currentZ}px)`,
        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`
      }
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 289,
      columnNumber: 3
    }
  );
};
const Particles = () => {
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { transform: "translateY(-50px)" }, children: Array.from({ length: 50 }).map((_, i) => /* @__PURE__ */ jsxDEV(Particle, { seed: `particle-${i}` }, i, false, {
    fileName: "<stdin>",
    lineNumber: 308,
    columnNumber: 5
  })) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 306,
    columnNumber: 3
  });
};
const ImpactObject = () => {
  const frame = useCurrentFrame();
  const fallProgress = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: "clamp"
  });
  const y = interpolate(fallProgress, [0, 1], [-500, -50]);
  const opacity = interpolate(frame, [20, 35, 40], [0, 1, 0], {
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        position: "absolute",
        width: 50,
        height: 200,
        background: "linear-gradient(to bottom, rgba(0, 255, 255, 0), rgba(0, 255, 255, 1))",
        opacity,
        transform: `translateY(${y}px) translateX(-25px)`,
        filter: "blur(10px)"
      }
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 325,
      columnNumber: 3
    }
  );
};
const StudioText = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeInDuration = 30;
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
  const opacity = interpolate(frame, [0, fadeInDuration], [0, 1], {
    extrapolateRight: "clamp"
  });
  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const glowRadius = interpolate(flash, [0, 0.5, 1], [40, 80, 20]);
  const glowOpacity = interpolate(flash, [0, 0.5, 1], [0, 1, 0.7]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        marginTop: "40px",
        position: "relative"
      },
      children: /* @__PURE__ */ jsxDEV(
        "div",
        {
          style: {
            ...textBaseStyle,
            fontSize: 80,
            transform: `scale(${scale})`,
            opacity,
            color: "#ff00a0",
            textShadow: `
            0 0 10px rgba(255, 0, 160, ${glowOpacity}),
            0 0 20px rgba(255, 0, 160, ${glowOpacity * 0.7}),
            0 0 ${glowRadius}px #0077ff,
            0 0 ${glowRadius + 10}px #0077ff
          `
          },
          children: "STUDIO"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 373,
          columnNumber: 4
        }
      )
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 367,
      columnNumber: 3
    }
  );
};
const NullweaveIntro = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const impactFrame = 40;
  const studioFrame = 90;
  const zoom = interpolate(
    frame,
    [0, impactFrame, impactFrame + 60, durationInFrames],
    [0.9, 1.1, 1.15, 1.15],
    { extrapolateRight: "clamp" }
  );
  const pan = interpolate(
    frame,
    [0, durationInFrames],
    [-2, 2],
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
          lineNumber: 420,
          columnNumber: 4
        }),
        /* @__PURE__ */ jsxDEV(
          AbsoluteFill,
          {
            style: {
              transform: `scale(${zoom}) rotateY(${pan}deg)`
            },
            children: [
              /* @__PURE__ */ jsxDEV("div", { style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }, children: [
                /* @__PURE__ */ jsxDEV(NullweaveText, {}, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 432,
                  columnNumber: 6
                }),
                /* @__PURE__ */ jsxDEV(Sequence, { from: studioFrame, children: /* @__PURE__ */ jsxDEV(StudioText, {}, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 434,
                  columnNumber: 7
                }) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 433,
                  columnNumber: 6
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 426,
                columnNumber: 5
              }),
              /* @__PURE__ */ jsxDEV(Sequence, { from: impactFrame, children: /* @__PURE__ */ jsxDEV(Particles, {}, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 439,
                columnNumber: 6
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 438,
                columnNumber: 5
              }),
              /* @__PURE__ */ jsxDEV(ImpactObject, {}, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 441,
                columnNumber: 5
              })
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 421,
            columnNumber: 4
          }
        ),
        /* @__PURE__ */ jsxDEV(
          Audio,
          {
            src: staticFile("whoosh.mp3"),
            startFrom: impactFrame - 30,
            endAt: impactFrame,
            volume: 0.7
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 444,
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
            lineNumber: 450,
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
            lineNumber: 455,
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
            lineNumber: 460,
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
            lineNumber: 466,
            columnNumber: 4
          }
        )
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 415,
      columnNumber: 3
    }
  );
};
export {
  NullweaveIntro
};
