import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SetService from "../../src/services/setService";
import { useSetStore } from "../../src/state/useSetStore";
import { AppHeader } from "../../src/components/AppHeader";
import { SetCard } from "../../src/components/SetCard";
import { SORT_OPTIONS } from "../../src/utils/setMetrics";
import { colors } from "../../src/theme";

export default function CatalogScreen() {
  const router = useRouter();
  const { favorites, compare, toggleFavorite, toggleCompare } = useSetStore();

  const allSets = useMemo(() => SetService.getAllSets(), []);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<string>("all");
  const [sortIndex, setSortIndex] = useState(0);

  const themes = useMemo(
    () =>
      Array.from(
        new Set(allSets.map((s) => s.theme).filter(Boolean)),
      ) as string[],
    [allSets],
  );

  const sets = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allSets
      .filter((s) => {
        const matchesSearch =
          q === "" ||
          s.title.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          (s.theme ?? "").toLowerCase().includes(q);
        const matchesTheme = theme === "all" || s.theme === theme;
        return matchesSearch && matchesTheme;
      })
      .sort(SORT_OPTIONS[sortIndex].compare);
  }, [allSets, search, theme, sortIndex]);

  const sort = SORT_OPTIONS[sortIndex];

  return (
    <View style={styles.screen}>
      <AppHeader
        search={{
          value: search,
          onChange: setSearch,
          sortLabel: sort.label,
          onSortPress: () => setSortIndex((i) => (i + 1) % SORT_OPTIONS.length),
        }}
      />

      <FlatList
        data={sets}
        keyExtractor={(s) => s.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={
          <View style={{ gap: 12, marginBottom: 12 }}>
            {themes.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chips}
              >
                {["all", ...themes].map((t) => {
                  const active = theme === t;
                  return (
                    <Pressable
                      key={t}
                      onPress={() => setTheme(t)}
                      style={[styles.chip, active && styles.chipActive]}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          active && styles.chipTextActive,
                        ]}
                      >
                        {t === "all" ? "All Themes" : t}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            )}
            <View style={styles.summary}>
              <Text style={styles.summaryText}>
                Showing <Text style={styles.summaryBold}>{sets.length}</Text>{" "}
                sets
              </Text>
              <View style={styles.dbRow}>
                <Ionicons name="server" size={10} color={colors.emerald500} />
                <Text style={styles.dbText}>Belgium LEGO MSRP</Text>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No LEGO sets found matching your search.
            </Text>
            <Pressable
              onPress={() => {
                setSearch("");
                setTheme("all");
              }}
            >
              <Text style={styles.emptyLink}>Clear filters</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <SetCard
            set={item}
            isFavorite={favorites.includes(item.id)}
            isCompared={compare.includes(item.id)}
            // onPress={() => router.push(`/details/${item.id}`)}
            onToggleFavorite={() => toggleFavorite(item.id)}
            onToggleCompare={() => toggleCompare(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  list: { padding: 12 },
  chips: { gap: 6 },
  chip: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  chipActive: {
    backgroundColor: colors.slate900,
    borderColor: colors.slate800,
  },
  chipText: { fontSize: 12, fontWeight: "600", color: colors.slate700 },
  chipTextActive: { color: colors.white },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  summaryText: { fontSize: 12, color: colors.slate500 },
  summaryBold: { fontWeight: "700", color: colors.slate900 },
  dbRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  dbText: { fontSize: 11, fontWeight: "500", color: colors.slate600 },
  empty: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    gap: 8,
  },
  emptyText: { fontSize: 12, fontWeight: "700", color: colors.slate600 },
  emptyLink: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.red,
    textDecorationLine: "underline",
  },
});
