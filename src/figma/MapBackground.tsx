// Animated continent map background — vector outlines + arc routing.
// Ported verbatim from the Figma Make export (script-05).
// One continent is picked per visit (rotating via sessionStorage), then arcs are
// animated between city pairs on that continent for ambient motion.

import { useEffect, useMemo, useRef, useState } from 'react'

// Equirectangular projection. viewBox: 1440 × 720 (lon -180..180, lat 90..-90).
// x = (lon + 180) * 4   y = (90 - lat) * 4
const proj = (lon: number, lat: number): [number, number] => [(lon + 180) * 4, (90 - lat) * 4]
const ll = (lon: number, lat: number) => proj(lon, lat).join(',')

interface City { n: string; ll: [number, number] }
interface Continent {
  label: string
  bbox: [number, number, number, number]
  paths: string[]
  cities: City[]
}

const CONTINENTS: Record<string, Continent> = {
  africa: {
    label: 'AFRICA',
    bbox: [-20, -36, 52, 38],
    paths: [
      `M ${ll(-17, 14)} L ${ll(-15, 20)} ${ll(-12, 25)} ${ll(-8, 31)} ${ll(0, 35)} ${ll(10, 33)} ${ll(20, 32)} ${ll(31, 31)} ${ll(35, 23)} ${ll(43, 12)} ${ll(51, 12)} ${ll(50, 4)} ${ll(45, -3)} ${ll(40, -10)} ${ll(38, -18)} ${ll(33, -25)} ${ll(28, -32)} ${ll(20, -35)} ${ll(15, -32)} ${ll(13, -25)} ${ll(10, -15)} ${ll(8, -5)} ${ll(2, 4)} ${ll(-7, 5)} ${ll(-13, 9)} Z`,
      `M ${ll(43, -12)} L ${ll(48, -15)} ${ll(50, -22)} ${ll(46, -25)} ${ll(43, -20)} Z`,
    ],
    cities: [
      { n: 'Lagos',         ll: [3.4, 6.5] },
      { n: 'Accra',         ll: [-0.2, 5.6] },
      { n: 'Dakar',         ll: [-17.4, 14.7] },
      { n: 'Abidjan',       ll: [-4.0, 5.3] },
      { n: 'Cairo',         ll: [31.2, 30.0] },
      { n: 'Casablanca',    ll: [-7.6, 33.6] },
      { n: 'Nairobi',       ll: [36.8, -1.3] },
      { n: 'Addis Ababa',   ll: [38.7, 9.0] },
      { n: 'Kigali',        ll: [30.1, -1.9] },
      { n: 'Cape Town',     ll: [18.4, -33.9] },
      { n: 'Johannesburg',  ll: [28.0, -26.2] },
      { n: 'Kinshasa',      ll: [15.3, -4.3] },
    ],
  },
  europe: {
    label: 'EUROPE',
    bbox: [-12, 35, 42, 71],
    paths: [
      `M ${ll(-10, 38)} L ${ll(-9, 43)} ${ll(-2, 44)} ${ll(0, 46)} ${ll(-1, 49)} ${ll(2, 51)} ${ll(8, 54)} ${ll(12, 54)} ${ll(15, 55)} ${ll(20, 54)} ${ll(28, 60)} ${ll(28, 65)} ${ll(22, 68)} ${ll(15, 69)} ${ll(8, 63)} ${ll(5, 60)} ${ll(11, 58)} ${ll(11, 54)} ${ll(8, 49)} ${ll(7, 44)} ${ll(13, 45)} ${ll(15, 39)} ${ll(18, 41)} ${ll(20, 40)} ${ll(23, 38)} ${ll(28, 41)} ${ll(28, 36)} ${ll(22, 36)} ${ll(15, 36)} ${ll(8, 38)} ${ll(0, 36)} ${ll(-5, 36)} Z`,
      `M ${ll(-8, 53)} L ${ll(-3, 55)} ${ll(-2, 58)} ${ll(-5, 58)} ${ll(-6, 55)} Z`,
      `M ${ll(-10, 52)} L ${ll(-6, 53)} ${ll(-7, 54)} ${ll(-10, 55)} Z`,
      `M ${ll(5, 54)} L ${ll(13, 56)} ${ll(11, 59)} ${ll(15, 67)} ${ll(20, 69)} ${ll(25, 70)} ${ll(30, 69)} ${ll(20, 65)} ${ll(15, 60)} ${ll(11, 56)} Z`,
    ],
    cities: [
      { n: 'London',     ll: [-0.13, 51.51] },
      { n: 'Paris',      ll: [2.35, 48.86] },
      { n: 'Berlin',     ll: [13.4, 52.52] },
      { n: 'Madrid',     ll: [-3.7, 40.4] },
      { n: 'Lisbon',     ll: [-9.14, 38.72] },
      { n: 'Rome',       ll: [12.5, 41.9] },
      { n: 'Amsterdam',  ll: [4.9, 52.37] },
      { n: 'Stockholm',  ll: [18.07, 59.33] },
      { n: 'Warsaw',     ll: [21.0, 52.23] },
      { n: 'Athens',     ll: [23.73, 37.98] },
      { n: 'Dublin',     ll: [-6.26, 53.35] },
      { n: 'Helsinki',   ll: [24.94, 60.17] },
    ],
  },
  'n-america': {
    label: 'NORTH · AMERICA',
    bbox: [-170, 7, -50, 75],
    paths: [
      `M ${ll(-168, 65)} L ${ll(-165, 70)} ${ll(-155, 71)} ${ll(-130, 70)} ${ll(-110, 73)} ${ll(-95, 75)} ${ll(-80, 73)} ${ll(-65, 70)} ${ll(-55, 60)} ${ll(-58, 50)} ${ll(-65, 45)} ${ll(-70, 42)} ${ll(-75, 38)} ${ll(-80, 32)} ${ll(-82, 25)} ${ll(-90, 22)} ${ll(-95, 16)} ${ll(-105, 18)} ${ll(-110, 24)} ${ll(-118, 32)} ${ll(-124, 38)} ${ll(-125, 48)} ${ll(-135, 55)} ${ll(-148, 60)} ${ll(-160, 60)} ${ll(-168, 62)} Z`,
      `M ${ll(-85, 16)} L ${ll(-79, 8)} ${ll(-82, 8)} ${ll(-88, 14)} Z`,
    ],
    cities: [
      { n: 'New York',     ll: [-74.0, 40.71] },
      { n: 'San Francisco', ll: [-122.4, 37.77] },
      { n: 'Los Angeles',  ll: [-118.24, 34.05] },
      { n: 'Seattle',      ll: [-122.33, 47.6] },
      { n: 'Toronto',      ll: [-79.38, 43.65] },
      { n: 'Vancouver',    ll: [-123.12, 49.28] },
      { n: 'Chicago',      ll: [-87.65, 41.88] },
      { n: 'Austin',       ll: [-97.74, 30.27] },
      { n: 'Miami',        ll: [-80.19, 25.76] },
      { n: 'Mexico City',  ll: [-99.13, 19.43] },
      { n: 'Boston',       ll: [-71.06, 42.36] },
      { n: 'Montréal',     ll: [-73.57, 45.5] },
    ],
  },
  's-america': {
    label: 'SOUTH · AMERICA',
    bbox: [-82, -56, -34, 13],
    paths: [
      `M ${ll(-78, 11)} L ${ll(-72, 12)} ${ll(-62, 11)} ${ll(-55, 6)} ${ll(-50, 0)} ${ll(-44, -2)} ${ll(-38, -8)} ${ll(-35, -15)} ${ll(-40, -23)} ${ll(-50, -30)} ${ll(-58, -36)} ${ll(-63, -42)} ${ll(-66, -48)} ${ll(-69, -54)} ${ll(-73, -53)} ${ll(-71, -45)} ${ll(-73, -38)} ${ll(-72, -30)} ${ll(-71, -23)} ${ll(-76, -15)} ${ll(-80, -5)} ${ll(-79, 2)} ${ll(-77, 8)} Z`,
    ],
    cities: [
      { n: 'São Paulo',    ll: [-46.63, -23.55] },
      { n: 'Rio',          ll: [-43.18, -22.91] },
      { n: 'Buenos Aires', ll: [-58.38, -34.6] },
      { n: 'Bogotá',       ll: [-74.07, 4.71] },
      { n: 'Lima',         ll: [-77.04, -12.05] },
      { n: 'Santiago',     ll: [-70.65, -33.45] },
      { n: 'Caracas',      ll: [-66.92, 10.49] },
      { n: 'Quito',        ll: [-78.47, -0.18] },
      { n: 'Montevideo',   ll: [-56.16, -34.9] },
      { n: 'Medellín',     ll: [-75.58, 6.24] },
    ],
  },
  asia: {
    label: 'ASIA',
    bbox: [30, -10, 145, 73],
    paths: [
      `M ${ll(30, 40)} L ${ll(35, 48)} ${ll(45, 52)} ${ll(60, 55)} ${ll(75, 62)} ${ll(90, 70)} ${ll(110, 73)} ${ll(135, 70)} ${ll(150, 65)} ${ll(155, 56)} ${ll(140, 50)} ${ll(130, 45)} ${ll(125, 36)} ${ll(120, 28)} ${ll(115, 22)} ${ll(110, 16)} ${ll(105, 11)} ${ll(98, 9)} ${ll(95, 16)} ${ll(88, 22)} ${ll(80, 22)} ${ll(73, 16)} ${ll(70, 24)} ${ll(60, 26)} ${ll(50, 26)} ${ll(45, 30)} ${ll(38, 33)} ${ll(33, 36)} Z`,
      `M ${ll(133, 33)} L ${ll(141, 36)} ${ll(141, 41)} ${ll(135, 38)} Z`,
      `M ${ll(96, -2)} L ${ll(105, 0)} ${ll(115, -1)} ${ll(118, -6)} ${ll(110, -8)} ${ll(100, -5)} Z`,
    ],
    cities: [
      { n: 'Tokyo',     ll: [139.69, 35.69] },
      { n: 'Seoul',     ll: [126.98, 37.57] },
      { n: 'Beijing',   ll: [116.41, 39.9] },
      { n: 'Shanghai',  ll: [121.47, 31.23] },
      { n: 'Hong Kong', ll: [114.17, 22.32] },
      { n: 'Singapore', ll: [103.82, 1.35] },
      { n: 'Bangkok',   ll: [100.5, 13.76] },
      { n: 'Jakarta',   ll: [106.85, -6.2] },
      { n: 'Mumbai',    ll: [72.88, 19.08] },
      { n: 'Bangalore', ll: [77.59, 12.97] },
      { n: 'Delhi',     ll: [77.21, 28.61] },
      { n: 'Dubai',     ll: [55.27, 25.2] },
      { n: 'Manila',    ll: [120.98, 14.6] },
    ],
  },
  oceania: {
    label: 'OCEANIA',
    bbox: [110, -47, 180, -8],
    paths: [
      `M ${ll(113, -22)} L ${ll(115, -33)} ${ll(118, -34)} ${ll(125, -33)} ${ll(135, -34)} ${ll(140, -38)} ${ll(146, -39)} ${ll(150, -37)} ${ll(153, -28)} ${ll(150, -22)} ${ll(143, -12)} ${ll(135, -12)} ${ll(128, -15)} ${ll(122, -17)} ${ll(115, -20)} Z`,
      `M ${ll(166, -41)} L ${ll(174, -36)} ${ll(178, -39)} ${ll(174, -47)} ${ll(168, -45)} Z`,
    ],
    cities: [
      { n: 'Sydney',     ll: [151.21, -33.87] },
      { n: 'Melbourne',  ll: [144.96, -37.81] },
      { n: 'Brisbane',   ll: [153.03, -27.47] },
      { n: 'Perth',      ll: [115.86, -31.95] },
      { n: 'Adelaide',   ll: [138.6, -34.93] },
      { n: 'Auckland',   ll: [174.76, -36.85] },
      { n: 'Wellington', ll: [174.78, -41.29] },
      { n: 'Christchurch', ll: [172.64, -43.53] },
    ],
  },
}

const ALL_KEYS = Object.keys(CONTINENTS)

function pickContinent(): string {
  try {
    const last = sessionStorage.getItem('mapbg:last')
    const candidates = ALL_KEYS.filter((k) => k !== last)
    const next = candidates[Math.floor(Math.random() * candidates.length)] || ALL_KEYS[0]
    sessionStorage.setItem('mapbg:last', next)
    return next
  } catch {
    return ALL_KEYS[Math.floor(Math.random() * ALL_KEYS.length)]
  }
}

type CityP = City & { p: [number, number] }

function pickRoutes(cities: CityP[], count = 1): [CityP, CityP][] {
  if (cities.length < 2) return []
  const pairs: [CityP, CityP][] = []
  for (let i = 0; i < count; i++) {
    let a = Math.floor(Math.random() * cities.length)
    let b = Math.floor(Math.random() * cities.length)
    while (b === a) b = Math.floor(Math.random() * cities.length)
    pairs.push([cities[a], cities[b]])
  }
  return pairs
}

function arcPath(p1: [number, number], p2: [number, number]) {
  const [x1, y1] = p1
  const [x2, y2] = p2
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const dist = Math.hypot(dx, dy)
  const curve = Math.min(dist * 0.32, 90)
  const nx = -dy / dist
  const ny = dx / dist
  const cx = mx + nx * curve
  const cy = my + ny * curve - Math.min(dist * 0.08, 24)
  return { d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, dist }
}

interface Arc { id: number; a: CityP; b: CityP; d: string; dist: number; born: number }

export function MapBackground() {
  const [continentKey] = useState(() => pickContinent())
  const continent = CONTINENTS[continentKey]
  const [arcs, setArcs] = useState<Arc[]>([])
  const arcId = useRef(0)

  const focused = useMemo(() => {
    const [minLon, minLat, maxLon, maxLat] = continent.bbox
    const [x1, y2] = proj(minLon, minLat)
    const [x2, y1] = proj(maxLon, maxLat)
    const w = x2 - x1
    const h = y2 - y1
    const padX = w * 0.18
    const padY = h * 0.18
    return { x: x1 - padX, y: y1 - padY, w: w + padX * 2, h: h + padY * 2 }
  }, [continent.bbox])

  const cityPts = useMemo<CityP[]>(
    () => continent.cities.map((c) => ({ ...c, p: proj(c.ll[0], c.ll[1]) })),
    [continent.cities],
  )

  useEffect(() => {
    let alive = true
    const spawn = () => {
      if (!alive) return
      const pair = pickRoutes(cityPts, 1)[0]
      if (!pair) return
      const [a, b] = pair
      const id = ++arcId.current
      const path = arcPath(a.p, b.p)
      setArcs((prev) => [...prev, { id, a, b, ...path, born: performance.now() }])
      setTimeout(() => setArcs((prev) => prev.filter((x) => x.id !== id)), 5400)
    }
    spawn()
    const t1 = setTimeout(spawn, 600)
    const interval = setInterval(spawn, 1700)
    return () => { alive = false; clearTimeout(t1); clearInterval(interval) }
  }, [cityPts])

  const grat = useMemo(() => {
    const lines: { k: string; x1: number; y1: number; x2: number; y2: number }[] = []
    for (let lat = -60; lat <= 60; lat += 30) {
      lines.push({ k: `lat${lat}`, x1: 0, y1: (90 - lat) * 4, x2: 1440, y2: (90 - lat) * 4 })
    }
    for (let lon = -150; lon <= 150; lon += 30) {
      lines.push({ k: `lon${lon}`, x1: (lon + 180) * 4, y1: 0, x2: (lon + 180) * 4, y2: 720 })
    }
    return lines
  }, [])

  return (
    <div className="mapbg" aria-hidden="true">
      <div className="mapbg-label">
        <span className="dot"></span>
        <span className="lbl">ROUTING · {continent.label}</span>
        <span className="sep">·</span>
        <span className="lbl-soft">{continent.cities.length.toString().padStart(2, '0')} NODES</span>
      </div>

      <svg
        className="mapbg-svg"
        viewBox={`${focused.x} ${focused.y} ${focused.w} ${focused.h}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="arc-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--violet)" stopOpacity="0" />
            <stop offset="40%" stopColor="var(--violet)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--blue)" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="city-glow">
            <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
          </radialGradient>
          <filter id="arc-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>

        <g className="mapbg-graticule">
          {grat.map((g) => (
            <line key={g.k} x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} />
          ))}
        </g>

        <g className="mapbg-world">
          {ALL_KEYS.map((k) =>
            CONTINENTS[k].paths.map((d, i) => (
              <path
                key={`${k}-${i}`}
                d={d}
                className={k === continentKey ? 'continent active' : 'continent'}
              />
            )),
          )}
        </g>

        <g className="mapbg-cities">
          {cityPts.map((c) => (
            <g key={c.n} transform={`translate(${c.p[0]}, ${c.p[1]})`}>
              <circle r="4" className="city-glow" />
              <circle r="1.4" className="city-dot" />
            </g>
          ))}
        </g>

        <g className="mapbg-arcs">
          {arcs.map((a) => (
            <g key={a.id}>
              <path d={a.d} className="arc-trail" />
              <path d={a.d} className="arc-draw" filter="url(#arc-blur)" />
              <path d={a.d} className="arc-draw arc-bright" />
              <circle cx={a.a.p[0]} cy={a.a.p[1]} r="2.2" className="city-pulse" />
              <circle cx={a.b.p[0]} cy={a.b.p[1]} r="2.2" className="city-pulse delayed" />
              <g transform={`translate(${a.a.p[0]}, ${a.a.p[1]})`}>
                <text className="city-flash origin" x="6" y="-6">{a.a.n.toUpperCase()}</text>
              </g>
              <g transform={`translate(${a.b.p[0]}, ${a.b.p[1]})`}>
                <text className="city-flash arrival" x="6" y="-6">{a.b.n.toUpperCase()}</text>
              </g>
            </g>
          ))}
        </g>
      </svg>

      <div className="mapbg-fade-top"></div>
      <div className="mapbg-fade-bottom"></div>
    </div>
  )
}
