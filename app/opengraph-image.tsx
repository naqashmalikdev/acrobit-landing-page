import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const alt = "Acrobit — Custom Software & AI Development Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logoBuffer = fs.readFileSync(
    path.join(process.cwd(), "public/logo/light-acrobit-word.png")
  );
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0f1c3f",
          padding: "60px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top-right blue glow */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(0,72,255,0.25) 0%, rgba(0,72,255,0) 60%)",
          }}
        />

        {/* Bottom-left subtle glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "200px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "linear-gradient(45deg, rgba(0,72,255,0.12) 0%, rgba(0,72,255,0) 70%)",
          }}
        />

        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="Acrobit" style={{ height: "44px", objectFit: "contain" }} />
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Main headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            marginBottom: "44px",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "76px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-3px",
            }}
          >
            Custom Software &
          </span>
          <span
            style={{
              color: "#0048ff",
              fontSize: "76px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-3px",
            }}
          >
            AI Development.
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.50)",
              fontSize: "26px",
              fontWeight: 400,
              marginTop: "18px",
              letterSpacing: "-0.3px",
            }}
          >
            Senior-only engineers · Fixed-price · Outcome-guaranteed
          </span>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid rgba(255,255,255,0.10)",
            paddingTop: "28px",
          }}
        >
          {[
            ["200+", "Projects Shipped"],
            ["98%", "Client Satisfaction"],
            ["12+", "Years Experience"],
            ["50+", "Senior Engineers"],
          ].map(([metric, label], i) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                flex: 1,
                paddingLeft: i > 0 ? "36px" : "0px",
                borderLeft:
                  i > 0 ? "1px solid rgba(255,255,255,0.10)" : "none",
              }}
            >
              <span
                style={{
                  color: "#0048ff",
                  fontSize: "38px",
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                {metric}
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.40)",
                  fontSize: "15px",
                  fontWeight: 400,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
