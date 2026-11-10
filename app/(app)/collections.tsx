import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SetService from "../../src/services/setService";
import { useSetStore } from "../../src/state/useSetStore";
import { AppHeader } from "../../src/components/AppHeader";
import { SetImage } from "../../src/components/SetImage";
import { SummaryBox } from "../../src/components/SummaryBox";
import { eur, getMetrics, summarize } from "../../src/utils/setMetrics";
import { colors, mono } from "../../src/theme";

type Tab = "favorites" | "owned";

export default function CollectionsScreen() {
  const { favorites, owned, toggleFavorite, toggleOwned } = useSetStore();
  const [tab, setTab] = useState<Tab>("favorites");

  const allSets = useMemo(() => SetService.getAllSets(), []);
  const favSets = useMemo(
    () => allSets.filter((s) => favorites.includes(s.id)),
    [allSets, favorites],
  );
  const ownedSets = useMemo(
    () => allSets.filter((s) => owned.includes(s.id)),
    [allSets, owned],
  );

  const fav = summarize(favSets);
  const own = summarize(ownedSets);

  const activeSets = tab === "favorites" ? favSets : ownedSets;
  const onRemove = tab === "favorites" ? toggleFavorite : toggleOwned;

  return (
    <View style={styles.screen}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleRow}>
          <Ionicons name="layers-outline" size={16} color={colors.red} />
          <Text style={styles.title}>My Collections</Text>
        </View>
        <Text style={styles.subtitle}>
          Saved favorites & personal collection value.
        </Text>

        <View style={styles.tabs}>
          {(["favorites", "owned"] as Tab[]).map((t) => {
            const active = tab === t;
            const label =
              t === "favorites"
                ? `Favorites (${favorites.length})`
                : `Owned Collection (${owned.length})`;
            return (
              <Pressable
                key={t}
                onPress={() => setTab(t)}
                style={[styles.tab, active && styles.tabActive]}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {tab === "favorites" ? (
          <SummaryBox
            title="Favorites Portfolio Totals"
            titleColor={colors.yellow}
            stats={[
              { label: "Parts", value: fav.totalPieces.toLocaleString() },
              {
                label: "Weight",
                value: `${fav.totalWeight.toFixed(1)} kg`,
                color: colors.sky300,
              },
              {
                label: "Avg €/pc",
                value: eur(fav.avgPricePerPiece, 3),
                color: colors.yellow,
              },
              {
                label: "Avg €/kg",
                value: eur(fav.avgPricePerKg, 1),
                color: colors.emerald400,
              },
            ]}
          />
        ) : (
          <SummaryBox
            title="Owned Collection Total Value"
            titleColor={colors.emerald400}
            stats={[
              { label: "Sets", value: String(own.count) },
              {
                label: "MSRP",
                value: eur(own.totalPrice, 0),
                color: colors.emerald400,
              },
              {
                label: "Total Wt",
                value: `${own.totalWeight.toFixed(1)} kg`,
                color: colors.sky300,
              },
              {
                label: "Avg €/kg",
                value: eur(own.avgPricePerKg, 0),
                color: colors.emerald400,
              },
            ]}
          />
        )}

        {activeSets.length === 0 ? (
          <Text style={styles.empty}>
            {tab === "favorites"
              ? "No favorites yet. Tap the heart on a set to save it."
              : "No owned sets yet."}
          </Text>
        ) : (
          activeSets.map((s) => (
            <View key={s.id} style={styles.item}>
              <SetImage uri={s.imageUrl} size={40} />
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {s.title}
                </Text>
                <Text style={styles.itemMeta}>
                  #{s.id} • {eur(getMetrics(s).pricePerKg, 1)}/kg
                </Text>
              </View>
              <Pressable
                onPress={() => onRemove(s.id)}
                hitSlop={8}
                style={{ padding: 4 }}
              >
                <Ionicons
                  name="trash-outline"
                  size={16}
                  color={colors.slate400}
                />
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  content: { padding: 12, gap: 12 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 16, fontWeight: "900", color: colors.slate900 },
  subtitle: { fontSize: 12, color: colors.slate500, marginTop: -8 },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: { borderBottomColor: colors.red },
  tabText: { fontSize: 12, fontWeight: "500", color: colors.slate400 },
  tabTextActive: { color: colors.red, fontWeight: "700" },
  empty: {
    textAlign: "center",
    fontSize: 12,
    color: colors.slate500,
    paddingVertical: 24,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 10,
    padding: 10,
  },
  itemName: { fontSize: 12, fontWeight: "700", color: colors.slate900 },
  itemMeta: {
    fontFamily: mono,
    fontSize: 10,
    color: colors.slate400,
    marginTop: 2,
  },
});
