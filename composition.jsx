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
    columnNumber: 9
  }),
  /* @__PURE__ */ jsxDEV("stop", { offset: "100%", style: { stopColor: "#00ffff", stopOpacity: 1 } }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 35,
    columnNumber: 9
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 33,
  columnNumber: 7
}) }, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 32,
  columnNumber: 5
}) }, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 31,
  columnNumber: 3
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
      columnNumber: 5
    }
  );
};
const Background = () => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const diagOffset = frame * 0.6;
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
          lineNumber: 103,
          columnNumber: 7
        }),
        /* @__PURE__ */ jsxDEV(
          AbsoluteFill,
          {
            style: {
              pointerEvents: "none",
              backgroundImage: "repeating-linear-gradient(135deg, rgba(0,255,255,0.06) 0 2px, transparent 2px 24px)",
              backgroundPosition: `${-diagOffset}px ${diagOffset}px`,
              mixBlendMode: "screen"
            }
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 104,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(
          AbsoluteFill,
          {
            style: {
              background: "linear-gradient(to top, rgba(0,20,40,0.65), transparent 35%)"
            }
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 113,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(
          AbsoluteFill,
          {
            style: {
              background: "radial-gradient(ellipse at center, transparent 58%, rgba(0,0,0,0.65) 100%)"
            }
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 119,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: Array.from({ length: 100 }).map((_, i) => /* @__PURE__ */ jsxDEV(StreamParticle, { seed: `stream-${i}` }, i, false, {
          fileName: "<stdin>",
          lineNumber: 127,
          columnNumber: 11
        })) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 125,
          columnNumber: 7
        })
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 96,
      columnNumber: 5
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
        opacity: 1
      },
      children: [
        /* @__PURE__ */ jsxDEV(NullweaveGradient, {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 171,
          columnNumber: 7
        }),
        letters.map((char, i) => {
          const isFallingL = i === 3;
          const isNul = i < 3;
          const isWeave = i > 3;
          const letterIn = spring({
            frame: frame - i * 3,
            fps,
            config: { damping: 200 }
          });
          const letterOpacity = interpolate(letterIn, [0, 1], [0, 1]);
          const letterLift = interpolate(letterIn, [0, 1], [20, 0]);
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
                  opacity: fallOpacity * letterOpacity,
                  fill: "url(#nullweaveGradient)",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                  backgroundImage: "linear-gradient(to bottom, #9f00ff, #00ffff)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  textShadow: `
                  0 0 18px rgba(0, 255, 255, 0.9),
                  0 0 40px rgba(159, 0, 255, 0.8),
                  0 0 60px rgba(0, 255, 255, 0.6)
                `
                },
                children: char
              },
              i,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 204,
                columnNumber: 13
              }
            );
          }
          if (isNul) {
            const recoilRotateX = interpolate(
              impactSpring,
              [0, 0.35, 1],
              [0, 24, 8],
              { extrapolateRight: "clamp" }
            );
            const recoilRotateZ = interpolate(
              impactSpring,
              [0, 0.35, 1],
              [0, 12, 8],
              { extrapolateRight: "clamp" }
            );
            const recoilTranslateX = interpolate(
              impactSpring,
              [0, 0.35, 1],
              [0, 22, 8],
              { extrapolateRight: "clamp" }
            );
            letterTransform = `rotateX(${recoilRotateX}deg) rotateZ(${recoilRotateZ}deg) translateX(${recoilTranslateX}px)`;
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
                transform: `translateY(${-letterLift}px) ${letterTransform}`,
                transformOrigin: i < 3 ? "bottom right" : "bottom left",
                fill: "url(#nullweaveGradient)",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                backgroundImage: "linear-gradient(to bottom, #9f00ff, #00ffff)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                textShadow: `
                0 0 18px rgba(0, 255, 255, 0.9),
                0 0 40px rgba(159, 0, 255, 0.8),
                0 0 60px rgba(0, 255, 255, 0.7),
                ${isNul ? `0 0 ${30 + glowPulse * 30}px rgba(0, 255, 255, ${0.6 + glowPulse * 0.4})` : ""}
              `,
                opacity: letterOpacity
              },
              children: char
            },
            i,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 262,
              columnNumber: 11
            }
          );
        })
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 164,
      columnNumber: 5
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
      lineNumber: 326,
      columnNumber: 5
    }
  );
};
const Particles = () => {
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { transform: "translateY(-50px)" }, children: Array.from({ length: 50 }).map((_, i) => /* @__PURE__ */ jsxDEV(Particle, { seed: `particle-${i}` }, i, false, {
    fileName: "<stdin>",
    lineNumber: 345,
    columnNumber: 9
  })) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 343,
    columnNumber: 5
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
      lineNumber: 362,
      columnNumber: 5
    }
  );
};
const StudioText = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const studioFrame = 90;
  const fadeInDuration = 30;
  if (frame < studioFrame) return null;
  const relativeFrame = frame - studioFrame;
  const progress = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 200, mass: 0.5 }
  });
  const flash = spring({
    frame: relativeFrame,
    fps,
    durationInFrames: 15,
    config: { damping: 10 }
  });
  const opacity = interpolate(relativeFrame, [0, fadeInDuration], [0, 1], {
    extrapolateRight: "clamp"
  });
  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const glowRadius = interpolate(flash, [0, 0.5, 1], [40, 80, 20]);
  const glowOpacity = interpolate(flash, [0, 0.5, 1], [0, 1, 0.7]);
  const shift = interpolate(relativeFrame, [0, 120], [0, 100], {
    extrapolateRight: "clamp"
  });
  const letters = "STUDIO".split("");
  const palette = [
    "#ff00a0",
    "#00e5ff",
    "#6a5cff",
    "#00ffcc",
    "#ffd700",
    "#ff4d4d"
  ];
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        position: "absolute",
        top: "60%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
      children: /* @__PURE__ */ jsxDEV(
        "div",
        {
          style: {
            ...textBaseStyle,
            fontSize: 80,
            opacity,
            backgroundImage: "linear-gradient(90deg, #ff00a0, #00e5ff, #6a5cff, #00ffcc, #ff00a0)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${shift}% 0%`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow: `
            0 0 10px rgba(255, 0, 160, ${glowOpacity}),
            0 0 20px rgba(0, 229, 255, ${glowOpacity * 0.7}),
            0 0 ${glowRadius}px #6a5cff,
            0 0 ${glowRadius + 10}px #00ffcc
          `
          },
          children: letters.map((ch, i) => {
            const c = palette[i % palette.length];
            const li = spring({
              frame: relativeFrame - i * 6,
              fps,
              config: { damping: 200 }
            });
            const lOpacity = interpolate(li, [0, 1], [0, 1], {
              extrapolateLeft: "clamp"
            });
            const lY = interpolate(li, [0, 1], [20, 0], {
              extrapolateLeft: "clamp"
            });
            const lGlow = interpolate(li, [0, 1], [0.2, 1], {
              extrapolateLeft: "clamp"
            });
            return /* @__PURE__ */ jsxDEV(
              "span",
              {
                style: {
                  backgroundImage: `linear-gradient(90deg, ${c}, ${palette[(i + 1) % palette.length]})`,
                  backgroundSize: "300% 100%",
                  backgroundPosition: `${(shift + i * 20) % 300}% 0%`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  opacity: lOpacity,
                  transform: `translateY(${lY}px)`,
                  textShadow: `0 0 ${10 + 20 * lGlow}px ${c}, 0 0 ${25 + 30 * lGlow}px ${c}, 0 0 ${45 + 40 * lGlow}px ${c}`
                },
                children: ch
              },
              i,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 469,
                columnNumber: 13
              }
            );
          })
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 433,
          columnNumber: 7
        }
      )
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 422,
      columnNumber: 5
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
  const pan = interpolate(frame, [0, durationInFrames], [-2, 2], {
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */ jsxDEV(
    AbsoluteFill,
    {
      style: {
        backgroundColor: "#000"
      },
      children: [
        /* @__PURE__ */ jsxDEV(Background, {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 517,
          columnNumber: 7
        }),
        /* @__PURE__ */ jsxDEV(
          AbsoluteFill,
          {
            style: {
              transform: `scale(${zoom}) rotateY(${pan}deg)`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ jsxDEV(NullweaveText, {}, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 526,
                columnNumber: 9
              }),
              /* @__PURE__ */ jsxDEV(StudioText, {}, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 527,
                columnNumber: 9
              }),
              /* @__PURE__ */ jsxDEV(Sequence, { from: impactFrame, children: /* @__PURE__ */ jsxDEV(Particles, {}, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 530,
                columnNumber: 11
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 529,
                columnNumber: 9
              }),
              /* @__PURE__ */ jsxDEV(ImpactObject, {}, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 532,
                columnNumber: 9
              })
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 518,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(
          Audio,
          {
            src: staticFile("whoosh.mp3"),
            startFrom: impactFrame - 30,
            endAt: impactFrame,
            volume: 0.3
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 535,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(
          Audio,
          {
            src: staticFile("impact.mp3"),
            startFrom: impactFrame,
            volume: 0.4
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 541,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(
          Audio,
          {
            src: staticFile("shatter.mp3"),
            startFrom: impactFrame,
            volume: 0.3
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 546,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(
          Audio,
          {
            src: staticFile("tumble.mp3"),
            startFrom: impactFrame + 8,
            endAt: impactFrame + 50,
            volume: 0.2
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 551,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(
          Audio,
          {
            src: staticFile("studio_reveal.mp3"),
            startFrom: studioFrame,
            volume: 0.4
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 557,
            columnNumber: 7
          }
        )
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 512,
      columnNumber: 5
    }
  );
};
export {
  NullweaveIntro
};
