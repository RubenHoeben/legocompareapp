import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SetService from "../../src/services/setService";
import { useSetStore } from "../../src/state/useSetStore";
import { AppHeader } from "../../src/components/AppHeader";
import { eur, getMetrics } from "../../src/utils/setMetrics";
import type { Set } from "../../src/types/Set";
import { colors, mono } from "../../src/theme";

interface Row {
  label: string;
  value: (s: Set) => string;
  raw?: (s: Set) => number;
  lowerIsBetter?: boolean; // highlight the winner when set
  tint?: string;
}

const ROWS: Row[] = [
  {
    label: "Retail Price (BE)",
    value: (s) => eur(s.price),
    raw: (s) => s.price,
    lowerIsBetter: true,
  },
  {
    label: "Price / Weight",
    value: (s) => `${eur(getMetrics(s).pricePerKg)} / kg`,
    raw: (s) => getMetrics(s).pricePerKg,
    lowerIsBetter: true,
    tint: "rgba(236,253,245,0.7)",
  },
  {
    label: "Price / Piece",
    value: (s) => `${eur(getMetrics(s).pricePerPiece, 3)} / pc`,
    raw: (s) => getMetrics(s).pricePerPiece,
    lowerIsBetter: true,
    tint: "rgba(254,252,232,0.7)",
  },
  {
    label: "Weight / Piece",
    value: (s) => `${getMetrics(s).gramsPerPiece.toFixed(2)} g/pc`,
    tint: "rgba(240,249,255,0.7)",
  },
  { label: "Piece Count", value: (s) => `${s.pieces.toLocaleString()} pcs` },
  { label: "Minifigs", value: (s) => String(s.minifigs) },
  { label: "Boxed Weight", value: (s) => `${s.weight} kg` },
];

export default function CompareScreen() {
  const { compare, clearCompare } = useSetStore();

  const allSets = useMemo(() => SetService.getAllSets(), []);

  const selected = useMemo(
    () =>
      compare
        .map((id) => allSets.find((s) => s.id === id))
        .filter((s): s is Set => !!s),
    [compare, allSets],
  );

  return (
    <View style={styles.screen}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.intro}>
          <View style={styles.introTitleRow}>
            <Ionicons
              name="git-compare-outline"
              size={16}
              color={colors.emerald600}
            />
            <Text style={styles.introTitle}>Set Metric Comparison</Text>
          </View>
          <Text style={styles.introText}>
            Side-by-side weight density and value comparison (€/kg, €/pc, g/pc).
          </Text>
        </View>

        {selected.length < 2 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              Select two sets in the catalog to compare them here (
              {selected.length}/2 selected).
            </Text>
          </View>
        ) : (
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>
                Comparing{" "}
                <Text style={{ color: colors.yellow }}>{selected.length}</Text>{" "}
                Selected Sets
              </Text>
              <Pressable onPress={clearCompare}>
                <Text style={styles.clear}>Clear Selection</Text>
              </Pressable>
            </View>

            <View style={[styles.tr, styles.headRow]}>
              <Text style={[styles.cellLabel, { color: colors.slate600 }]}>
                Metric
              </Text>
              {selected.map((s) => (
                <Text
                  key={s.id}
                  style={[styles.cell, styles.cellTitle]}
                  numberOfLines={2}
                >
                  {s.title}
                </Text>
              ))}
            </View>

            {ROWS.map((row) => {
              const nums = row.raw ? selected.map(row.raw) : [];
              const best =
                row.raw && row.lowerIsBetter ? Math.min(...nums) : null;
              return (
                <View
                  key={row.label}
                  style={[
                    styles.tr,
                    row.tint ? { backgroundColor: row.tint } : null,
                  ]}
                >
                  <Text style={styles.cellLabel}>{row.label}</Text>
                  {selected.map((s) => {
                    const isBest =
                      best !== null &&
                      row.raw!(s) === best &&
                      nums[0] !== nums[1];
                    return (
                      <Text
                        key={s.id}
                        style={[styles.cell, isBest && styles.cellBest]}
                      >
                        {row.value(s)}
                      </Text>
                    );
                  })}
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  content: { padding: 12, gap: 16 },
  intro: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 12,
    padding: 16,
    gap: 4,
  },
  introTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  introTitle: { fontSize: 16, fontWeight: "900", color: colors.slate900 },
  introText: { fontSize: 12, color: colors.slate500 },
  empty: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 12,
    padding: 28,
  },
  emptyText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.slate600,
    textAlign: "center",
  },
  table: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 12,
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: colors.slate900,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tableHeaderText: { color: colors.white, fontSize: 12, fontWeight: "700" },
  clear: {
    color: colors.slate400,
    fontSize: 10,
    textDecorationLine: "underline",
  },
  tr: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.slate100,
  },
  headRow: { backgroundColor: colors.slate100 },
  cellLabel: {
    flex: 1.1,
    padding: 10,
    fontSize: 11,
    fontWeight: "700",
    color: colors.slate500,
  },
  cell: {
    flex: 1,
    padding: 10,
    fontFamily: mono,
    fontSize: 11,
    fontWeight: "700",
    color: colors.slate800,
    borderLeftWidth: 1,
    borderLeftColor: colors.slate100,
  },
  cellTitle: { fontFamily: undefined, color: colors.slate900 },
  cellBest: { color: colors.emerald600 },
});
