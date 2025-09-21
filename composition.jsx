import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  random,
  Audio,
  Sequence,
  delayRender,
  continueRender
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
  const fogDrift = frame * 0.15;
  return /* @__PURE__ */ jsxDEV(
    AbsoluteFill,
    {
      style: {
        background: "radial-gradient(ellipse at bottom, #0d1a2f 0%, #02040a 100%)",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { pointerEvents: "none" }, children: /* @__PURE__ */ jsxDEV("div", { style: {
          position: "absolute",
          inset: 0,
          mixBlendMode: "screen",
          opacity: 0.18,
          background: "radial-gradient(120% 80% at 50% 120%, rgba(155,214,255,0.35) 0%, rgba(155,214,255,0) 60%)",
          transform: `translate(${fogDrift * 0.05}px, ${-fogDrift * 0.03}px)`
        } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 90,
          columnNumber: 9
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 89,
          columnNumber: 7
        }),
        /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { pointerEvents: "none" }, children: /* @__PURE__ */ jsxDEV("div", { style: {
          position: "absolute",
          inset: 0,
          mixBlendMode: "screen",
          opacity: 0.22,
          background: "radial-gradient(140% 90% at 30% 110%, rgba(168,228,255,0.3) 0%, rgba(168,228,255,0) 55%)",
          transform: `translate(${fogDrift * -0.04}px, ${fogDrift * 0.02}px)`
        } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 97,
          columnNumber: 9
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 96,
          columnNumber: 7
        }),
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
            lineNumber: 103,
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
            lineNumber: 109,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: Array.from({ length: 80 }).map((_, i) => /* @__PURE__ */ jsxDEV(StreamParticle, { seed: `stream-${i}` }, i, false, {
          fileName: "<stdin>",
          lineNumber: 117,
          columnNumber: 11
        })) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 115,
          columnNumber: 7
        })
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 82,
      columnNumber: 5
    }
  );
};
const NullweaveText = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const impactFrame = 40;
  const nullRevealFrame = 18;
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
          lineNumber: 162,
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
            const rel = frame - impactFrame;
            const preFallY = 0;
            const dropY = interpolate(rel, [0, 10, 40, 80], [0, 40, 240, 900], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const rotZ = interpolate(rel, [0, 80], [0, 25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const shiftX = interpolate(rel, [0, 80], [0, 20], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const lTransform = rel < 0 ? `translateY(${preFallY}px)` : `translateY(${preFallY + dropY}px) rotateZ(${rotZ}deg) translateX(${shiftX}px)`;
            return /* @__PURE__ */ jsxDEV(
              "span",
              {
                style: {
                  ...textBaseStyle,
                  fontSize: 100,
                  transform: lTransform,
                  opacity: frame < nullRevealFrame ? 0 : 1,
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
                lineNumber: 188,
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
              lineNumber: 246,
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
      lineNumber: 155,
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
      lineNumber: 310,
      columnNumber: 5
    }
  );
};
const Particles = () => {
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { transform: "translateY(-50px)" }, children: Array.from({ length: 30 }).map((_, i) => /* @__PURE__ */ jsxDEV(Particle, { seed: `particle-${i}` }, i, false, {
    fileName: "<stdin>",
    lineNumber: 329,
    columnNumber: 9
  })) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 327,
    columnNumber: 5
  });
};
const ImpactObject = () => {
  const frame = useCurrentFrame();
  const impactFrame = 40;
  const rel = frame - impactFrame;
  const hitX = -25;
  const preX = interpolate(frame, [20, impactFrame], [-100, hitX], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const preY = interpolate(frame, [20, impactFrame], [-400, -20], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const postX = hitX + Math.max(0, rel) * 7;
  const amp0 = 120;
  const decay = Math.exp(-Math.max(0, rel) / 60);
  const postY = -40 - Math.abs(Math.sin(Math.max(0, rel) * 0.18 * Math.PI)) * amp0 * decay;
  const x = frame < impactFrame ? preX : postX;
  const y = frame < impactFrame ? preY : postY;
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        position: "absolute",
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "radial-gradient(circle at 40% 40%, rgba(0,255,255,1) 0%, rgba(0,255,255,0.2) 60%, rgba(0,255,255,0) 75%)",
        boxShadow: "0 0 30px rgba(0,255,255,0.9), 0 0 60px rgba(159,0,255,0.7)",
        opacity: 1,
        transform: `translate(${x}px, ${y}px)`,
        filter: "blur(0.5px)",
        zIndex: 5
      }
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 353,
      columnNumber: 5
    }
  );
};
const StudioText = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const studioFrame = 90;
  const fadeInDuration = 18;
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
              frame: relativeFrame - i * 3,
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
                lineNumber: 462,
                columnNumber: 13
              }
            );
          })
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 426,
          columnNumber: 7
        }
      )
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 415,
      columnNumber: 5
    }
  );
};
const FontLoader = ({ children }) => {
  const [handle] = React.useState(() => delayRender("Loading Exo2 font"));
  React.useEffect(() => {
    const font = new FontFace(
      "Exo2",
      "url('https://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwk_Q4.woff2') format('woff2')",
      { weight: "900", style: "normal" }
    );
    font.load().then(() => {
      document.fonts.add(font);
      continueRender(handle);
    }).catch(() => continueRender(handle));
  }, [handle]);
  return /* @__PURE__ */ jsxDEV(Fragment, { children }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 500,
    columnNumber: 10
  });
};
const IntroWithFont = () => /* @__PURE__ */ jsxDEV(FontLoader, { children: /* @__PURE__ */ jsxDEV(NullweaveIntro, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 505,
  columnNumber: 5
}) }, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 504,
  columnNumber: 3
});
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
          lineNumber: 532,
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
              /* @__PURE__ */ jsxDEV("div", { style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) translateX(-130px)", pointerEvents: "none" }, children: /* @__PURE__ */ jsxDEV(ImpactObject, {}, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 542,
                columnNumber: 11
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 541,
                columnNumber: 9
              }),
              /* @__PURE__ */ jsxDEV(NullweaveText, {}, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 544,
                columnNumber: 9
              }),
              /* @__PURE__ */ jsxDEV(StudioText, {}, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 545,
                columnNumber: 9
              }),
              /* @__PURE__ */ jsxDEV(Sequence, { from: impactFrame - 30, durationInFrames: 30, children: /* @__PURE__ */ jsxDEV(Audio, { src: "./whoosh.mp3", volume: 0.3 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 548,
                columnNumber: 11
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 547,
                columnNumber: 9
              }),
              /* @__PURE__ */ jsxDEV(Sequence, { from: impactFrame, children: /* @__PURE__ */ jsxDEV(Audio, { src: "./impact.mp3", volume: 0.4 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 551,
                columnNumber: 11
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 550,
                columnNumber: 9
              }),
              /* @__PURE__ */ jsxDEV(Sequence, { from: impactFrame, children: /* @__PURE__ */ jsxDEV(Audio, { src: "./shatter.mp3", volume: 0.3 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 554,
                columnNumber: 11
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 553,
                columnNumber: 9
              }),
              /* @__PURE__ */ jsxDEV(Sequence, { from: impactFrame + 8, durationInFrames: 42, children: /* @__PURE__ */ jsxDEV(Audio, { src: "./tumble.mp3", volume: 0.2 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 557,
                columnNumber: 11
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 556,
                columnNumber: 9
              }),
              /* @__PURE__ */ jsxDEV(Sequence, { from: studioFrame, children: /* @__PURE__ */ jsxDEV(Audio, { src: "./studio_reveal.mp3", volume: 0.4 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 560,
                columnNumber: 11
              }) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 559,
                columnNumber: 9
              })
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 533,
            columnNumber: 7
          }
        )
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 527,
      columnNumber: 5
    }
  );
};
export {
  IntroWithFont,
  NullweaveIntro
};
