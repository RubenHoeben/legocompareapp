import type { Set } from "../types/Set";

export interface SetMetrics {
  pricePerKg: number;
  pricePerPiece: number;
  gramsPerPiece: number;
}

export function getMetrics(set: Set): SetMetrics {
  return {
    pricePerKg: set.weight > 0 ? set.price / set.weight : 0,
    pricePerPiece: set.pieces > 0 ? set.price / set.pieces : 0,
    gramsPerPiece: set.pieces > 0 ? (set.weight * 1000) / set.pieces : 0,
  };
}

export const eur = (n: number, decimals = 2) => `€${n.toFixed(decimals)}`;

export function summarize(sets: Set[]) {
  const n = sets.length;
  const metrics = sets.map(getMetrics);
  const avg = (fn: (m: SetMetrics) => number) =>
    n === 0 ? 0 : metrics.reduce((acc, m) => acc + fn(m), 0) / n;

  return {
    count: n,
    totalPieces: sets.reduce((a, s) => a + s.pieces, 0),
    totalWeight: sets.reduce((a, s) => a + s.weight, 0),
    totalPrice: sets.reduce((a, s) => a + s.price, 0),
    avgPricePerPiece: avg((m) => m.pricePerPiece),
    avgPricePerKg: avg((m) => m.pricePerKg),
  };
}

export type SortKey =
  | "pw-asc"
  | "ppp-asc"
  | "wpp-desc"
  | "parts-desc"
  | "price-asc";

export const SORT_OPTIONS: {
  key: SortKey;
  label: string;
  compare: (a: Set, b: Set) => number;
}[] = [
  {
    key: "pw-asc",
    label: "€/kg (Lowest)",
    compare: (a, b) => getMetrics(a).pricePerKg - getMetrics(b).pricePerKg,
  },
  {
    key: "ppp-asc",
    label: "€/Piece (Lowest)",
    compare: (a, b) =>
      getMetrics(a).pricePerPiece - getMetrics(b).pricePerPiece,
  },
  {
    key: "wpp-desc",
    label: "g/Piece (Heaviest)",
    compare: (a, b) =>
      getMetrics(b).gramsPerPiece - getMetrics(a).gramsPerPiece,
  },
  {
    key: "parts-desc",
    label: "Most Pieces",
    compare: (a, b) => b.pieces - a.pieces,
  },
  {
    key: "price-asc",
    label: "Price (Low to High)",
    compare: (a, b) => a.price - b.price,
  },
];
