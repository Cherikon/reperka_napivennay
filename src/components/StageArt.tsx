import { css, keyframes } from '@emotion/react';

const drift = keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-9px)' },
});

export function StageArt() {
  return (
    <svg viewBox="0 0 540 480" role="presentation" aria-hidden="true"
      css={css({ display: 'block', width: '100%', height: '100%', minHeight: 0 })}>
      <defs>
        <pattern id="stage-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#c4a0ff" opacity=".23" />
        </pattern>
        <pattern id="mic-mesh" width="7" height="7" patternUnits="userSpaceOnUse">
          <rect width="7" height="7" fill="#15101e" />
          <path d="M0 1h7M0 5h7M1 0v7M5 0v7" stroke="#a57dd2" strokeWidth=".6" opacity=".65" />
        </pattern>
        <linearGradient id="mic-metal" x2="1" y2="0">
          <stop stopColor="#100b19" /><stop offset=".25" stopColor="#6c477f" />
          <stop offset=".46" stopColor="#dbbcff" /><stop offset=".58" stopColor="#7c58a0" />
          <stop offset=".84" stopColor="#332044" /><stop offset="1" stopColor="#100b19" />
        </linearGradient>
        <radialGradient id="stage-light">
          <stop stopColor="#b179ff" /><stop offset="1" stopColor="#6331c7" />
        </radialGradient>
      </defs>
      <rect width="540" height="480" fill="url(#stage-grid)" />
      <circle cx="281" cy="233" r="157" fill="url(#stage-light)" stroke="#d6b8ff" strokeOpacity=".6" />
      <circle cx="281" cy="233" r="181" fill="none" stroke="#d6b8ff" strokeOpacity=".45" strokeDasharray="3 7" />
      <circle cx="281" cy="233" r="205" fill="none" stroke="#d6b8ff" strokeOpacity=".24" />
      <path d="M26 62V29h36m414 0h36v33M26 417v33h36m414 0h36v-33" stroke="#d6b8ff" strokeWidth="1.2" fill="none" />
      <path d="M0 254h54l9-21 10 40 12-70 13 94 12-53 10 14h54m198-6h59l10-29 11 59 13-87 11 82 9-28h55"
        fill="none" stroke="#e7d6ff" strokeOpacity=".72" strokeWidth="1.8" />
      <g fill="#c6ff00">
        <path d="m133 78 6 15 15 6-15 6-6 15-6-15-15-6 15-6z" />
        <path d="m431 334 4 10 10 4-10 4-4 10-4-10-10-4 10-4z" />
        <circle cx="420" cy="117" r="4" /><circle cx="129" cy="365" r="3" />
      </g>
      <g css={css({ animation: `${drift} 5s ease-in-out infinite` })}>
        <g transform="translate(288 222) rotate(32)">
          <path d="M0 144c7 52-28 61-20 108s45 57 69 81" stroke="#130e1d" strokeWidth="8" fill="none" />
          <path d="M0 144c7 52-28 61-20 108s45 57 69 81" stroke="#a78ac9" strokeWidth="1.3" fill="none" />
          <path d="M-17 125h34v32a7 7 0 0 1-7 7h-20a7 7 0 0 1-7-7z" fill="#21132c" stroke="#110b18" strokeWidth="5" />
          <path d="M-36-65H36L23 130a10 10 0 0 1-10 9h-26a10 10 0 0 1-10-9z" fill="url(#mic-metal)" stroke="#160d20" strokeWidth="5" />
          <path d="M-25-42-15 120m39-162L15 120" stroke="#e1c8ff" opacity=".35" fill="none" />
          <rect x="-9" y="7" width="18" height="39" rx="5" fill="#1e1329" stroke="#b892e7" strokeWidth="1.5" />
          <rect x="-5" y="12" width="10" height="13" rx="2" fill="#c6ff00" />
          <rect x="-52" y="-139" width="104" height="96" rx="43" fill="url(#mic-mesh)" stroke="#190e24" strokeWidth="5" />
          <path d="M-41-109q4-23 27-25m18 3h14m17 7 5 5" fill="none" stroke="#e4c7ff" strokeLinecap="round" strokeWidth="3" opacity=".7" />
          <rect x="-49" y="-76" width="98" height="14" rx="5" fill="url(#mic-metal)" stroke="#190e24" strokeWidth="2.5" />
          <rect x="-38" y="-50" width="76" height="12" rx="4" fill="url(#mic-metal)" stroke="#190e24" strokeWidth="2.5" />
        </g>
      </g>
      <g fontFamily="monospace" fontSize="10" fontWeight="bold" letterSpacing="2" fill="#ecdcff">
        <text x="43" y="50">FIG. 01 / OPEN MIC</text>
        <text x="497" y="431" textAnchor="end">SIGNAL / LIVE</text>
      </g>
      <circle cx="406" cy="427" r="3" fill="#c6ff00" />
    </svg>
  );
}
