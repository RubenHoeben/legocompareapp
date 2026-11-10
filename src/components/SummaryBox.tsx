import { StyleSheet, Text, View } from "react-native";
import { colors, mono } from "../theme";

interface Stat {
  label: string;
  value: string;
  color?: string;
}

export function SummaryBox({
  title,
  titleColor,
  stats,
}: {
  title: string;
  titleColor: string;
  stats: Stat[];
}) {
  return (
    <View style={styles.box}>
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      <View style={styles.grid}>
        {stats.map((s) => (
          <View key={s.label} style={styles.cell}>
            <Text style={styles.label}>{s.label}</Text>
            <Text style={[styles.value, { color: s.color ?? colors.white }]}>
              {s.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.slate900,
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  title: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  grid: { flexDirection: "row", gap: 4 },
  cell: {
    flex: 1,
    backgroundColor: colors.slate800,
    borderRadius: 6,
    padding: 6,
    alignItems: "center",
  },
  label: { fontSize: 9, color: colors.slate400 },
  value: { fontFamily: mono, fontSize: 12, fontWeight: "700", marginTop: 2 },
});
