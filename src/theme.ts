import { Platform } from "react-native";

export const colors = {
  yellow: "#ffd502",
  yellowBorder: "#fde047",
  red: "#d01012",
  surface: "#f8fafc",
  card: "#ffffff",
  border: "#e2e8f0",
  black: "#000000",
  white: "#ffffff",
  slate50: "#f8fafc",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate300: "#cbd5e1",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1e293b",
  slate900: "#0f172a",
  emerald400: "#34d399",
  emerald500: "#10b981",
  emerald600: "#059669",
  sky300: "#7dd3fc",
};

export const mono = Platform.select({
  ios: "Menlo",
  android: "monospace",
  default: "monospace",
});
