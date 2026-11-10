import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Set } from "../types/Set";
import { colors, mono } from "../theme";
import { eur, getMetrics } from "../utils/setMetrics";
import { MetricBox } from "./MetricBox";
import { SetImage } from "./SetImage";

interface Props {
  set: Set;
  isFavorite: boolean;
  isCompared: boolean;
  onPress?: () => void;
  onToggleFavorite: () => void;
  onToggleCompare: () => void;
}

export function SetCard({
  set,
  isFavorite,
  isCompared,
  onPress,
  onToggleFavorite,
  onToggleCompare,
}: Props) {
  const m = getMetrics(set);

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.row}>
          <Text style={styles.num}>#{set.id}</Text>
          {set.theme ? (
            <View style={styles.themeTag}>
              <Text style={styles.themeText}>{set.theme}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.row}>
          <Pressable onPress={onToggleCompare} hitSlop={8} style={styles.row}>
            <Ionicons
              name="git-compare-outline"
              size={13}
              color={isCompared ? colors.emerald600 : colors.slate400}
            />
            <Text
              style={[
                styles.compareText,
                isCompared && styles.compareTextActive,
              ]}
            >
              {isCompared ? "Selected" : "Compare"}
            </Text>
          </Pressable>
          <Pressable onPress={onToggleFavorite} hitSlop={8}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={18}
              color={isFavorite ? colors.red : colors.slate400}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.main}>
        <SetImage uri={set.imageUrl} size={80} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
            {set.title}
          </Text>
          <Text style={styles.meta}>
            {set.pieces.toLocaleString()} parts • {set.weight.toFixed(2)} kg
          </Text>
          <Text style={styles.price}>{eur(set.price)}</Text>
        </View>
      </View>

      <View style={styles.metrics}>
        <MetricBox
          label="Price / Weight"
          value={`${eur(m.pricePerKg, 1)}/kg`}
          tone="green"
        />
        <MetricBox
          label="Price / Piece"
          value={eur(m.pricePerPiece, 3)}
          tone="yellow"
        />
        <MetricBox
          label="Weight / Piece"
          value={`${m.gramsPerPiece.toFixed(2)}g`}
          tone="sky"
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: { flexDirection: "row", alignItems: "center", gap: 6 },
  num: {
    fontFamily: mono,
    fontSize: 11,
    fontWeight: "700",
    color: colors.slate400,
  },
  themeTag: {
    backgroundColor: colors.slate100,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  themeText: { fontSize: 10, fontWeight: "600", color: colors.slate700 },
  compareText: { fontSize: 11, color: colors.slate400 },
  compareTextActive: { color: colors.emerald600, fontWeight: "700" },
  main: { flexDirection: "row", gap: 12 },
  info: { flex: 1, gap: 4 },
  name: { fontSize: 12, fontWeight: "800", color: colors.slate900 },
  meta: { fontSize: 11, fontWeight: "500", color: colors.slate500 },
  price: {
    fontFamily: mono,
    fontSize: 14,
    fontWeight: "900",
    color: colors.slate900,
  },
  metrics: {
    flexDirection: "row",
    gap: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.slate100,
  },
});
