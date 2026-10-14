import { ImageResponse } from "next/og";

/**
 * Server-rendered PNG brand mark. The emblem stays inside the maskable safe
 * area so Android launchers can crop the background without clipping it.
 */
export function renderInsuranceIcon(size: 192 | 512): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(145deg, #29bdff 0%, #0472dd 38%, #00459f 70%, #07235b 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          background: "radial-gradient(circle at 23% 14%, rgba(255,255,255,0.23), transparent 45%)",
        }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size * 0.75}
        height={size * 0.75}
        viewBox="0 0 512 512"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="shield-edge" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset=".5" stopColor="#d6f6ff" />
            <stop offset="1" stopColor="#73c9ff" />
          </linearGradient>
          <linearGradient id="shield-core" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#129eff" />
            <stop offset=".6" stopColor="#075fc8" />
            <stop offset="1" stopColor="#092f86" />
          </linearGradient>
        </defs>
        <path
          d="M256 55c-52 38-110 60-174 71v133c0 112 67 189 174 241 107-52 174-129 174-241V126c-64-11-122-33-174-71Z"
          fill="url(#shield-edge)"
          stroke="#eafaff"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path
          d="M256 98c-45 29-88 46-132 57v100c0 84 45 151 132 199 87-48 132-115 132-199V155c-44-11-87-28-132-57Z"
          fill="url(#shield-core)"
        />
        <circle cx="256" cy="215" r="36" fill="#fff" />
        <circle cx="174" cy="243" r="23" fill="#ecfaff" />
        <circle cx="338" cy="243" r="23" fill="#ecfaff" />
        <path d="M210 333c0-52 18-84 46-84s46 32 46 84v34c-14 11-29 20-46 30-17-10-32-19-46-30v-34Z" fill="#fff" />
        <path d="M147 319c0-41 10-62 27-62 14 0 25 10 32 29-9 21-13 47-13 75-17-12-33-25-46-42Z" fill="#e5f7ff" />
        <path d="M365 319c0-41-10-62-27-62-14 0-25 10-32 29 9 21 13 47 13 75 17-12 33-25 46-42Z" fill="#e5f7ff" />
      </svg>
    </div>,
    {
      width: size,
      height: size,
    },
  );
}
