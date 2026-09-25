type SvgProps = { className?: string; style?: React.CSSProperties };

export function Cloud({ className, style, face = false }: SvgProps & { face?: boolean }) {
  return (
    <svg viewBox="0 0 120 70" className={className} style={style} aria-hidden>
      <path
        d="M28 62h66a22 22 0 0 0 2-44 28 28 0 0 0-53-6A20 20 0 0 0 28 62Z"
        fill="#fff"
        stroke="#eadfce"
        strokeWidth="2"
      />
      {face && (
        <g fill="#3a2a20">
          <circle cx="50" cy="40" r="2.4" />
          <circle cx="72" cy="40" r="2.4" />
          <path d="M55 47q6 5 12 0" stroke="#3a2a20" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="44" cy="46" r="3.5" fill="#f3c7c3" />
          <circle cx="78" cy="46" r="3.5" fill="#f3c7c3" />
        </g>
      )}
    </svg>
  );
}

export function Branch({ className, style }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} aria-hidden>
      <path d="M18 108C48 84 76 52 100 12" stroke="#c89b6a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {[
        [34, 94, -30],
        [48, 80, -40],
        [62, 64, -45],
        [76, 48, -50],
        [88, 30, -55],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <ellipse cx={x - 9} cy={y - 4} rx="11" ry="4.6" fill="#c89b6a" transform={`rotate(${r} ${x - 9} ${y - 4})`} />
          <ellipse cx={x + 7} cy={y + 5} rx="11" ry="4.6" fill="#d6b089" transform={`rotate(${r + 80} ${x + 7} ${y + 5})`} />
        </g>
      ))}
      <circle cx="104" cy="8" r="3" fill="#c89b6a" />
      <circle cx="112" cy="18" r="2" fill="#c89b6a" />
    </svg>
  );
}

export function Heart({ className, style, fill = "#e8a7a7" }: SvgProps & { fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path
        d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.6 1.2 5.3 3.1 1.7-1.9 3.1-3.1 5.3-3.1 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21Z"
        fill={fill}
      />
    </svg>
  );
}

export function Sparkle({ className, style, fill = "#e8c27a" }: SvgProps & { fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 1.5c.8 5.4 2.9 7.7 8.5 8.5-5.6.8-7.7 3.1-8.5 8.5-.8-5.4-2.9-7.7-8.5-8.5 5.6-.8 7.7-3.1 8.5-8.5Z" fill={fill} />
    </svg>
  );
}

export function Bunny({ className, style }: SvgProps) {
  return (
    <svg viewBox="0 0 140 180" className={className} style={style} aria-hidden>
      <g stroke="#8a5e36" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M46 70C34 36 36 6 50 6s18 34 12 62" fill="#f1dcc0" />
        <path d="M94 70c12-34 10-64-4-64S72 40 78 68" fill="#f1dcc0" />
        <path d="M50 58c-4-18-2-38 2-40M90 58c4-18 2-38-2-40" fill="none" stroke="#e7b6b0" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="70" cy="132" rx="48" ry="44" fill="#f5e6d1" />
        <circle cx="70" cy="84" r="36" fill="#f5e6d1" />
      </g>
      <circle cx="57" cy="82" r="3.6" fill="#3a2a20" />
      <circle cx="83" cy="82" r="3.6" fill="#3a2a20" />
      <circle cx="49" cy="94" r="6" fill="#f3c7c3" />
      <circle cx="91" cy="94" r="6" fill="#f3c7c3" />
      <path d="M65 92q5 4 10 0" stroke="#3a2a20" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M56 50l14 8 14-8-4 14H60Z" fill="#e7b6b0" stroke="#8a5e36" strokeWidth="2" />
      <ellipse cx="50" cy="168" rx="16" ry="9" fill="#f1dcc0" stroke="#8a5e36" strokeWidth="2.5" />
      <ellipse cx="90" cy="168" rx="16" ry="9" fill="#f1dcc0" stroke="#8a5e36" strokeWidth="2.5" />
    </svg>
  );
}

export function Giraffe({ className, style }: SvgProps) {
  return (
    <svg viewBox="0 0 140 220" className={className} style={style} aria-hidden>
      <g stroke="#8a5e36" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M58 90l-6 110h18l4-60 4 60h18l-4-110Z" fill="#f2cf8f" />
        <path d="M60 96V40h24v56" fill="#f2cf8f" />
        <ellipse cx="72" cy="36" rx="26" ry="22" fill="#f2cf8f" />
        <ellipse cx="72" cy="48" rx="18" ry="11" fill="#f7e2bb" />
        <path d="M60 16V4M84 16V4" />
        <circle cx="60" cy="4" r="4" fill="#c89b6a" />
        <circle cx="84" cy="4" r="4" fill="#c89b6a" />
        <path d="M46 26l-12-6 8 14M98 26l12-6-8 14" fill="#f2cf8f" />
      </g>
      <g fill="#c89b6a">
        <circle cx="66" cy="70" r="6" />
        <circle cx="78" cy="86" r="5" />
        <circle cx="68" cy="110" r="7" />
        <circle cx="82" cy="130" r="6" />
        <circle cx="64" cy="150" r="5" />
      </g>
      <circle cx="62" cy="32" r="3.4" fill="#3a2a20" />
      <circle cx="82" cy="32" r="3.4" fill="#3a2a20" />
      <path d="M66 52q6 4 12 0" stroke="#3a2a20" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function WavyDivider({ className, fill = "var(--cream)" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className={className} aria-hidden>
      <path
        d="M0 30c120-26 240-26 360 0s240 26 360 0 240-26 360 0 240 26 360 0v30H0Z"
        fill={fill}
      />
    </svg>
  );
}
