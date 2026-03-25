import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#151515",
          borderRadius: "32px",
          position: "relative",
        }}
      >
        <svg width="118" height="118" viewBox="0 0 64 64" fill="none">
          <path
            d="M32 12 36.8 27.2 52 32 36.8 36.8 32 52 27.2 36.8 12 32 27.2 27.2Z"
            fill="#BF5A2A"
          />
        </svg>
      </div>
    ),
    size
  );
}
