/* ================================================================
   PROJECT CARD SVG ILLUSTRATIONS
   One per project — dark, animated, editorial
   ================================================================ */

export function FintechIllustration() {
  return (
    <svg viewBox="0 0 640 800" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
      style={{ display: "block", background: "#040c14" }}>
      <defs>
        <linearGradient id="fi-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#00d4aa" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="fi-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0077ff"/>
          <stop offset="100%" stopColor="#00d4aa"/>
        </linearGradient>
        <linearGradient id="fi-bar-up" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d4aa"/>
          <stop offset="100%" stopColor="#00d4aa" stopOpacity="0.5"/>
        </linearGradient>
        <linearGradient id="fi-bar-dn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f87171"/>
          <stop offset="100%" stopColor="#f87171" stopOpacity="0.5"/>
        </linearGradient>
        <filter id="fi-glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="fi-clip"><rect width="640" height="800"/></clipPath>
      </defs>

      <g clipPath="url(#fi-clip)">
        {/* Grid */}
        {[100,200,300,400,500,600,700].map(y => (
          <line key={y} x1="0" y1={y} x2="640" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        ))}
        {[0,80,160,240,320,400,480,560,640].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="800" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
        ))}

        {/* Ambient glow top-right */}
        <ellipse cx="580" cy="120" rx="220" ry="180" fill="#00d4aa" opacity="0.04" filter="url(#fi-glow)"/>
        <ellipse cx="80" cy="680" rx="180" ry="140" fill="#0077ff" opacity="0.05"/>

        {/* Candlestick bars */}
        {[
          { x: 60,  open: 580, close: 540, high: 520, low: 600, up: false },
          { x: 110, open: 545, close: 500, high: 490, low: 560, up: true  },
          { x: 160, open: 500, close: 540, high: 480, low: 550, up: true  },
          { x: 210, open: 535, close: 510, high: 498, low: 548, up: false },
          { x: 260, open: 514, close: 468, high: 455, low: 525, up: true  },
          { x: 310, open: 468, close: 510, high: 452, low: 520, up: true  },
          { x: 360, open: 505, close: 475, high: 460, low: 515, up: false },
          { x: 410, open: 480, close: 430, high: 415, low: 490, up: true  },
          { x: 460, open: 430, close: 390, high: 375, low: 442, up: true  },
          { x: 510, open: 390, close: 420, high: 378, low: 430, up: true  },
          { x: 560, open: 418, close: 370, high: 355, low: 428, up: true  },
        ].map((c, i) => (
          <g key={i}>
            <line x1={c.x+20} y1={c.high} x2={c.x+20} y2={c.low}
              stroke={c.up ? "#00d4aa" : "#f87171"} strokeWidth="1.5" opacity="0.7"/>
            <rect x={c.x+8} y={Math.min(c.open,c.close)} width="24"
              height={Math.max(2, Math.abs(c.open-c.close))}
              fill={c.up ? "url(#fi-bar-up)" : "url(#fi-bar-dn)"} rx="2"/>
          </g>
        ))}

        {/* Price area fill */}
        <path d="M0,620 C40,600 80,560 120,520 C160,480 200,450 240,410
                 C280,370 320,340 360,300 C400,260 440,240 480,210
                 C520,180 560,165 600,155 L640,150 L640,800 L0,800 Z"
          fill="url(#fi-area)"/>

        {/* Price line */}
        <path d="M0,620 C40,600 80,560 120,520 C160,480 200,450 240,410
                 C280,370 320,340 360,300 C400,260 440,240 480,210
                 C520,180 560,165 600,155 L640,150"
          stroke="url(#fi-line)" strokeWidth="2.5" filter="url(#fi-glow)"/>

        {/* Animated dot on line end */}
        <circle cx="640" cy="150" r="5" fill="#00d4aa" opacity="0.9">
          <animate attributeName="r" values="5;9;5" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="640" cy="150" r="3" fill="#00d4aa"/>

        {/* Dashed reference line */}
        <line x1="0" y1="150" x2="640" y2="150"
          stroke="#00d4aa" strokeWidth="1" strokeDasharray="4 6" opacity="0.2"/>

        {/* Floating stat badge */}
        <rect x="420" y="60" width="148" height="56" rx="12"
          fill="rgba(0,212,170,0.08)" stroke="rgba(0,212,170,0.2)" strokeWidth="1"/>
        <text x="440" y="86" fill="#00d4aa" fontSize="11" fontWeight="700" fontFamily="system-ui" letterSpacing="0.05em">PORTFOLIO VALUE</text>
        <text x="440" y="106" fill="#ffffff" fontSize="17" fontWeight="800" fontFamily="system-ui" letterSpacing="-0.03em">$4.28M  </text>
        <text x="536" y="106" fill="#00d4aa" fontSize="13" fontWeight="700" fontFamily="system-ui">↑ 24.7%</text>

        {/* Second mini badge */}
        <rect x="50" y="60" width="108" height="56" rx="12"
          fill="rgba(0,119,255,0.08)" stroke="rgba(0,119,255,0.2)" strokeWidth="1"/>
        <text x="68" y="84" fill="#60a5fa" fontSize="10" fontWeight="700" fontFamily="system-ui" letterSpacing="0.05em">LIVE ORDERS</text>
        <text x="68" y="104" fill="#ffffff" fontSize="17" fontWeight="800" fontFamily="system-ui" letterSpacing="-0.03em">1,247</text>

        {/* Volume bars at bottom */}
        {[60,110,160,210,260,310,360,410,460,510,560].map((x, i) => {
          const h = [18,28,22,14,36,20,16,42,32,24,38][i];
          const up = [false,true,true,false,true,true,false,true,true,true,true][i];
          return (
            <rect key={i} x={x+6} y={780-h} width="28" height={h}
              fill={up ? "rgba(0,212,170,0.25)" : "rgba(248,113,113,0.2)"} rx="2"/>
          );
        })}

        {/* Bottom axis labels */}
        {["JAN","FEB","MAR","APR","MAY","JUN","JUL"].map((label, i) => (
          <text key={label} x={60 + i*84} y="796" fill="rgba(255,255,255,0.25)"
            fontSize="8" fontWeight="600" fontFamily="system-ui" letterSpacing="0.08em">{label}</text>
        ))}

        {/* Ticker strip */}
        <rect x="0" y="720" width="640" height="36" fill="rgba(0,212,170,0.04)"/>
        <text x="20" y="742" fill="rgba(0,212,170,0.5)" fontSize="9" fontWeight="700"
          fontFamily="'SF Mono','Fira Code',monospace" letterSpacing="0.05em">
          BTC +2.4%  •  ETH +1.8%  •  SOL +5.2%  •  AAPL -0.3%  •  NVDA +3.1%  •  SPX +0.7%
        </text>
      </g>
    </svg>
  );
}

export function HealthIllustration() {
  const rings = [60, 110, 160, 210, 255];
  return (
    <svg viewBox="0 0 640 800" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
      style={{ display: "block", background: "#03100d" }}>
      <defs>
        <linearGradient id="ht-ecg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0"/>
          <stop offset="40%" stopColor="#34d399"/>
          <stop offset="100%" stopColor="#22d3ee"/>
        </linearGradient>
        <radialGradient id="ht-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#34d399" stopOpacity="0"/>
        </radialGradient>
        <filter id="ht-glow">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="ht-clip"><rect width="640" height="800"/></clipPath>
      </defs>

      <g clipPath="url(#ht-clip)">
        {/* Grid dots */}
        {Array.from({length: 10}).map((_, row) =>
          Array.from({length: 8}).map((_, col) => (
            <circle key={`${row}-${col}`} cx={col*80+40} cy={row*80+40}
              r="1.5" fill="rgba(52,211,153,0.08)"/>
          ))
        )}

        {/* Scan rings — centred at 320, 420 */}
        {rings.map((r, i) => (
          <circle key={i} cx="320" cy="400" r={r}
            stroke="#34d399" strokeWidth="1" fill="none"
            opacity={0.06 + (rings.length - i) * 0.03}>
            <animate attributeName="r" values={`${r};${r+8};${r}`} dur={`${3+i*0.5}s`} repeatCount="indefinite"/>
            <animate attributeName="opacity" values={`${0.06+(rings.length-i)*0.03};0.02;${0.06+(rings.length-i)*0.03}`}
              dur={`${3+i*0.5}s`} repeatCount="indefinite"/>
          </circle>
        ))}

        {/* Core radial glow */}
        <circle cx="320" cy="400" r="80" fill="url(#ht-core)"/>
        <circle cx="320" cy="400" r="18" fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth="1.5" opacity="0.8"/>
        <circle cx="320" cy="400" r="5" fill="#34d399" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.8s" repeatCount="indefinite"/>
        </circle>

        {/* Crosshair */}
        <line x1="320" y1="320" x2="320" y2="370" stroke="#34d399" strokeWidth="1" opacity="0.3" strokeDasharray="4 4"/>
        <line x1="320" y1="430" x2="320" y2="480" stroke="#34d399" strokeWidth="1" opacity="0.3" strokeDasharray="4 4"/>
        <line x1="240" y1="400" x2="290" y2="400" stroke="#34d399" strokeWidth="1" opacity="0.3" strokeDasharray="4 4"/>
        <line x1="350" y1="400" x2="400" y2="400" stroke="#34d399" strokeWidth="1" opacity="0.3" strokeDasharray="4 4"/>

        {/* ECG / Pulse waveform */}
        <path d="M0,560 L80,560 L100,560 L115,510 L130,600 L145,490 L160,580 L175,560
                 L260,560 L275,560 L290,510 L305,600 L320,490 L335,580 L350,560
                 L440,560 L455,560 L470,510 L485,600 L500,490 L515,580 L530,560 L640,560"
          stroke="url(#ht-ecg)" strokeWidth="2" filter="url(#ht-glow)"/>

        {/* Animated scan line */}
        <line x1="0" y1="0" x2="0" y2="800" stroke="#34d399" strokeWidth="1.5" opacity="0.15">
          <animateTransform attributeName="transform" type="translate"
            values="0,0;640,0;0,0" dur="3s" repeatCount="indefinite"/>
        </line>

        {/* Stat cards */}
        <rect x="40" y="80" width="130" height="70" rx="12"
          fill="rgba(52,211,153,0.06)" stroke="rgba(52,211,153,0.18)" strokeWidth="1"/>
        <text x="58" y="106" fill="#34d399" fontSize="9" fontWeight="700" fontFamily="system-ui" letterSpacing="0.1em">HEART RATE</text>
        <text x="58" y="130" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="system-ui" letterSpacing="-0.04em">72</text>
        <text x="94" y="130" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="system-ui"> BPM</text>

        <rect x="470" y="80" width="130" height="70" rx="12"
          fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.18)" strokeWidth="1"/>
        <text x="488" y="106" fill="#22d3ee" fontSize="9" fontWeight="700" fontFamily="system-ui" letterSpacing="0.1em">O₂ SATURATION</text>
        <text x="488" y="130" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="system-ui" letterSpacing="-0.04em">98.4</text>
        <text x="548" y="130" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="system-ui">%</text>

        <rect x="40" y="660" width="175" height="70" rx="12"
          fill="rgba(52,211,153,0.06)" stroke="rgba(52,211,153,0.12)" strokeWidth="1"/>
        <text x="58" y="686" fill="#34d399" fontSize="9" fontWeight="700" fontFamily="system-ui" letterSpacing="0.1em">AI DIAGNOSIS</text>
        <text x="58" y="710" fill="#ffffff" fontSize="14" fontWeight="700" fontFamily="system-ui">Normal  </text>
        <text x="132" y="710" fill="#34d399" fontSize="13" fontWeight="800" fontFamily="system-ui">99.2%</text>

        <rect x="430" y="660" width="170" height="70" rx="12"
          fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.12)" strokeWidth="1"/>
        <text x="448" y="686" fill="#22d3ee" fontSize="9" fontWeight="700" fontFamily="system-ui" letterSpacing="0.1em">SCAN COMPLETE</text>
        <text x="448" y="710" fill="#ffffff" fontSize="14" fontWeight="700" fontFamily="system-ui">MRI  ·  CT  ·  X-Ray</text>

        {/* Corner decorators */}
        {[[40,180],[600,180],[40,620],[600,620]].map(([x,y],i) => (
          <g key={i} transform={`translate(${x},${y}) rotate(${i*90})`}>
            <line x1="0" y1="0" x2="16" y2="0" stroke="#34d399" strokeWidth="1.5" opacity="0.35"/>
            <line x1="0" y1="0" x2="0" y2="16" stroke="#34d399" strokeWidth="1.5" opacity="0.35"/>
          </g>
        ))}
      </g>
    </svg>
  );
}

export function CloudIllustration() {
  const nodes = [
    { x: 320, y: 320, r: 16, label: "CORE",   color: "#6366f1" },
    { x: 160, y: 200, r: 10, label: "US-E",   color: "#38bdf8" },
    { x: 480, y: 200, r: 10, label: "EU-W",   color: "#38bdf8" },
    { x: 120, y: 400, r: 8,  label: "AP-S",   color: "#818cf8" },
    { x: 520, y: 400, r: 8,  label: "AP-N",   color: "#818cf8" },
    { x: 200, y: 540, r: 8,  label: "CA-C",   color: "#818cf8" },
    { x: 440, y: 540, r: 8,  label: "SA-E",   color: "#818cf8" },
    { x: 320, y: 480, r: 7,  label: "CDN",    color: "#a5b4fc" },
    { x: 240, y: 280, r: 7,  label: "LB-1",   color: "#a5b4fc" },
    { x: 400, y: 280, r: 7,  label: "LB-2",   color: "#a5b4fc" },
  ];
  const edges = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
    [1,3],[1,8],[2,4],[2,9],[5,3],[6,4],[7,5],[7,6],[8,9],
  ];
  return (
    <svg viewBox="0 0 640 800" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
      style={{ display: "block", background: "#050814" }}>
      <defs>
        <radialGradient id="cl-hub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="cl-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2"/>
        </linearGradient>
        <filter id="cl-glow">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="cl-clip"><rect width="640" height="800"/></clipPath>
      </defs>

      <g clipPath="url(#cl-clip)">
        {/* Hex grid */}
        {Array.from({length: 7}).map((_, row) =>
          Array.from({length: 9}).map((_, col) => {
            const cx = col * 80 + (row % 2 === 0 ? 0 : 40);
            const cy = row * 70;
            const pts = Array.from({length:6}).map((_,i) => {
              const a = (i*60 - 30) * Math.PI / 180;
              return `${cx+30*Math.cos(a)},${cy+30*Math.sin(a)}`;
            }).join(' ');
            return <polygon key={`${row}-${col}`} points={pts}
              stroke="rgba(99,102,241,0.05)" strokeWidth="1" fill="none"/>;
          })
        )}

        {/* Ambient glow */}
        <circle cx="320" cy="320" r="200" fill="url(#cl-hub)"/>
        <ellipse cx="160" cy="200" rx="100" ry="80" fill="#38bdf8" opacity="0.03"/>
        <ellipse cx="480" cy="200" rx="100" ry="80" fill="#38bdf8" opacity="0.03"/>

        {/* Edge connections */}
        {edges.map(([a,b], i) => {
          const na = nodes[a], nb = nodes[b];
          return (
            <g key={i}>
              <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke="url(#cl-edge)" strokeWidth="1.5" opacity="0.4"/>
              {/* Animated data packet */}
              <circle r="2.5" fill="#38bdf8" opacity="0.8">
                <animateMotion dur={`${2+i*0.3}s`} repeatCount="indefinite"
                  path={`M${na.x},${na.y} L${nb.x},${nb.y}`}/>
                <animate attributeName="opacity" values="0;0.8;0" dur={`${2+i*0.3}s`} repeatCount="indefinite"/>
              </circle>
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r + 10} fill={n.color} opacity="0.06"/>
            <circle cx={n.x} cy={n.y} r={n.r} fill="rgba(5,8,20,0.8)"
              stroke={n.color} strokeWidth={i===0 ? 2 : 1.5} filter={i===0 ? "url(#cl-glow)" : undefined}/>
            {i === 0 ? (
              <>
                <circle cx={n.x} cy={n.y} r={4} fill={n.color}/>
                <circle cx={n.x} cy={n.y} r={n.r+4} stroke={n.color} strokeWidth="1"
                  fill="none" opacity="0.2">
                  <animate attributeName="r" values={`${n.r+4};${n.r+14};${n.r+4}`} dur="2.5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.2;0;0.2" dur="2.5s" repeatCount="indefinite"/>
                </circle>
              </>
            ) : (
              <circle cx={n.x} cy={n.y} r={3} fill={n.color} opacity="0.8"/>
            )}
            <text x={n.x} y={n.y + n.r + 14} textAnchor="middle"
              fill={n.color} fontSize="7" fontWeight="700" fontFamily="'SF Mono','Fira Code',monospace"
              opacity="0.7" letterSpacing="0.1em">{n.label}</text>
          </g>
        ))}

        {/* Stat panel */}
        <rect x="40" y="600" width="200" height="88" rx="14"
          fill="rgba(99,102,241,0.07)" stroke="rgba(99,102,241,0.2)" strokeWidth="1"/>
        <text x="58" y="626" fill="#818cf8" fontSize="9" fontWeight="700" fontFamily="system-ui" letterSpacing="0.1em">UPTIME SLA</text>
        <text x="58" y="654" fill="#ffffff" fontSize="26" fontWeight="900" fontFamily="system-ui" letterSpacing="-0.04em">99.99%</text>
        <text x="58" y="675" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="system-ui">Across 10 regions</text>

        <rect x="400" y="600" width="200" height="88" rx="14"
          fill="rgba(56,189,248,0.07)" stroke="rgba(56,189,248,0.2)" strokeWidth="1"/>
        <text x="418" y="626" fill="#38bdf8" fontSize="9" fontWeight="700" fontFamily="system-ui" letterSpacing="0.1em">RESPONSE TIME</text>
        <text x="418" y="654" fill="#ffffff" fontSize="26" fontWeight="900" fontFamily="system-ui" letterSpacing="-0.04em">12ms</text>
        <text x="418" y="675" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="system-ui">Global avg. latency</text>

        {/* Bottom status bar */}
        <rect x="0" y="740" width="640" height="60" fill="rgba(99,102,241,0.04)"/>
        {["US-EAST","EU-WEST","AP-SOUTH","AP-NORTH","CA-CENTRAL"].map((region, i) => (
          <g key={region}>
            <circle cx={60 + i*120} cy="765" r="3.5" fill="#34d399">
              <animate attributeName="opacity" values="1;0.3;1" dur={`${1.5+i*0.3}s`} repeatCount="indefinite"/>
            </circle>
            <text x={72 + i*120} y="769" fill="rgba(255,255,255,0.3)"
              fontSize="8" fontWeight="600" fontFamily="system-ui" letterSpacing="0.06em">{region}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export function SupplyChainIllustration() {
  const layers = [
    { x: 80,  nodes: [{ y: 280 }, { y: 400 }, { y: 520 }], color: "#c084fc" },
    { x: 240, nodes: [{ y: 220 }, { y: 340 }, { y: 460 }, { y: 580 }], color: "#a78bfa" },
    { x: 400, nodes: [{ y: 260 }, { y: 380 }, { y: 500 }], color: "#818cf8" },
    { x: 560, nodes: [{ y: 300 }, { y: 420 }, { y: 540 }], color: "#6366f1" },
  ];
  return (
    <svg viewBox="0 0 640 800" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
      style={{ display: "block", background: "#0a050f" }}>
      <defs>
        <linearGradient id="sc-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6"/>
        </linearGradient>
        <radialGradient id="sc-bg" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.07"/>
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
        </radialGradient>
        <filter id="sc-glow">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="sc-clip"><rect width="640" height="800"/></clipPath>
      </defs>

      <g clipPath="url(#sc-clip)">
        {/* Background glow */}
        <ellipse cx="320" cy="400" rx="300" ry="260" fill="url(#sc-bg)"/>

        {/* Circuit trace grid */}
        {Array.from({length: 9}).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={80+i*80} x2="640" y2={80+i*80}
            stroke="rgba(192,132,252,0.04)" strokeWidth="1"/>
        ))}
        {Array.from({length: 9}).map((_, i) => (
          <line key={`v${i}`} x1={i*80} y1="0" x2={i*80} y2="800"
            stroke="rgba(192,132,252,0.04)" strokeWidth="1"/>
        ))}

        {/* Neural network edges — all cross-layer connections */}
        {layers.slice(0,-1).map((layerA, li) =>
          layerA.nodes.map((nA, ni) =>
            layers[li+1].nodes.map((nB, nj) => {
              const animDur = 1.5 + (li*4+ni*3+nj) * 0.1;
              return (
                <g key={`e-${li}-${ni}-${nj}`}>
                  <line x1={layerA.x} y1={nA.y} x2={layers[li+1].x} y2={nB.y}
                    stroke="url(#sc-flow)" strokeWidth="1" opacity="0.15"/>
                  <circle r="2" fill="#c084fc" opacity="0.6">
                    <animateMotion dur={`${animDur}s`} repeatCount="indefinite"
                      path={`M${layerA.x},${nA.y} L${layers[li+1].x},${nB.y}`}/>
                    <animate attributeName="opacity" values="0;0.7;0" dur={`${animDur}s`} repeatCount="indefinite"/>
                  </circle>
                </g>
              );
            })
          )
        )}

        {/* Neural nodes */}
        {layers.map((layer, li) =>
          layer.nodes.map((node, ni) => (
            <g key={`n-${li}-${ni}`}>
              <circle cx={layer.x} cy={node.y} r="12"
                fill="rgba(10,5,15,0.8)" stroke={layer.color} strokeWidth="1.5"
                filter="url(#sc-glow)"/>
              <circle cx={layer.x} cy={node.y} r="4" fill={layer.color} opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.3;0.8"
                  dur={`${1.5+li*0.4+ni*0.3}s`} repeatCount="indefinite"/>
              </circle>
            </g>
          ))
        )}

        {/* Layer labels */}
        {[
          { x: 80,  label: "INPUT",   sub: "Raw Data"   },
          { x: 240, label: "LAYER 1", sub: "Feature Ext" },
          { x: 400, label: "LAYER 2", sub: "Reasoning"  },
          { x: 560, label: "OUTPUT",  sub: "Decision"   },
        ].map(({ x, label, sub }) => (
          <g key={label}>
            <text x={x} y="170" textAnchor="middle" fill="rgba(192,132,252,0.5)"
              fontSize="8" fontWeight="700" fontFamily="system-ui" letterSpacing="0.12em">{label}</text>
            <text x={x} y="186" textAnchor="middle" fill="rgba(255,255,255,0.2)"
              fontSize="7.5" fontFamily="system-ui">{sub}</text>
          </g>
        ))}

        {/* Stat panels */}
        <rect x="30" y="630" width="175" height="78" rx="12"
          fill="rgba(192,132,252,0.07)" stroke="rgba(192,132,252,0.2)" strokeWidth="1"/>
        <text x="48" y="656" fill="#c084fc" fontSize="9" fontWeight="700" fontFamily="system-ui" letterSpacing="0.1em">ROUTE EFFICIENCY</text>
        <text x="48" y="682" fill="#ffffff" fontSize="24" fontWeight="900" fontFamily="system-ui" letterSpacing="-0.04em">+38%</text>
        <text x="48" y="698" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="system-ui">vs. traditional ops</text>

        <rect x="435" y="630" width="175" height="78" rx="12"
          fill="rgba(99,102,241,0.07)" stroke="rgba(99,102,241,0.2)" strokeWidth="1"/>
        <text x="453" y="656" fill="#818cf8" fontSize="9" fontWeight="700" fontFamily="system-ui" letterSpacing="0.1em">COST REDUCTION</text>
        <text x="453" y="682" fill="#ffffff" fontSize="24" fontWeight="900" fontFamily="system-ui" letterSpacing="-0.04em">$2.4M</text>
        <text x="453" y="698" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="system-ui">annual savings</text>

        {/* Flow path highlight at top */}
        <path d="M80,90 C160,75 240,85 320,80 C400,75 480,88 560,80"
          stroke="url(#sc-flow)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.3"/>
        <text x="320" y="66" textAnchor="middle" fill="rgba(192,132,252,0.45)"
          fontSize="9" fontWeight="700" fontFamily="system-ui" letterSpacing="0.15em">AUTONOMOUS SUPPLY CHAIN AI</text>

        {/* Bottom pulse bar */}
        <rect x="0" y="748" width="640" height="52" fill="rgba(192,132,252,0.03)"/>
        {Array.from({length: 32}).map((_, i) => {
          const h = Math.random() > 0.5 ? 8 + Math.random() * 24 : 4 + Math.random() * 10;
          return (
            <rect key={i} x={10+i*19} y={790-h} width="10" height={h}
              fill="#c084fc" opacity={0.1 + Math.random()*0.25} rx="2"/>
          );
        })}
      </g>
    </svg>
  );
}
