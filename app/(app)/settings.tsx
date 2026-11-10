import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader } from "../../src/components/AppHeader";
import { useAuthStore } from "../../src/state/useAuthStore";
import { StyledButton } from "../../src/components/StyledButton";
import { colors, mono } from "../../src/theme";

function SettingRow({
  label,
  value,
  valueStyle,
  last,
}: {
  label: string;
  value: string;
  valueStyle?: object;
  last?: boolean;
}) {
  return (
    <View style={[styles.row, !last && styles.rowBorder]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, valueStyle]}>{value}</Text>
    </View>
  );
}

export default function SettingsScreen() {
  const { logout } = useAuthStore();

  return (
    <View style={styles.screen}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.intro}>
          <View style={styles.titleRow}>
            <Ionicons
              name="settings-outline"
              size={16}
              color={colors.slate600}
            />
            <Text style={styles.title}>App Configuration</Text>
          </View>
          <Text style={styles.subtitle}>
            Regional defaults and Supabase database connection.
          </Text>
        </View>

        <View style={styles.card}>
          <SettingRow label="Target Country" value="Belgium (BE)" />
          <SettingRow
            label="Currency"
            value="Euro (€)"
            valueStyle={{
              fontFamily: mono,
              fontWeight: "700",
              color: colors.emerald600,
            }}
          />
          <SettingRow
            label="Measurement System"
            value="Metric (Grams & Kilograms)"
            last
          />
        </View>

        <View style={styles.dbCard}>
          <View style={styles.dbHeader}>
            <View style={styles.dbTitleRow}>
              <Ionicons name="server" size={13} color={colors.yellow} />
              <Text style={styles.dbTitle}>Supabase Free Tier Backend</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Connected</Text>
            </View>
          </View>
          <View style={styles.dbRow}>
            <Text style={styles.dbKey}>Retail Pricing Data:</Text>
            <Text style={styles.dbValue}>
              LEGO.com BE (Germany/EU baseline)
            </Text>
          </View>
        </View>

        <StyledButton label="Log out" onPress={logout} variant="secondary" />
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
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 16, fontWeight: "900", color: colors.slate900 },
  subtitle: { fontSize: 12, color: colors.slate500 },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.slate100 },
  rowLabel: { fontSize: 12, fontWeight: "700", color: colors.slate800 },
  rowValue: { fontSize: 12, fontWeight: "600", color: colors.slate600 },
  dbCard: {
    backgroundColor: colors.slate900,
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  dbHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dbTitleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  dbTitle: { fontSize: 12, fontWeight: "700", color: colors.yellow },
  badge: {
    backgroundColor: "rgba(16,185,129,0.2)",
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.3)",
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { fontSize: 10, fontWeight: "700", color: colors.emerald400 },
  dbRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.slate800,
    paddingTop: 8,
  },
  dbKey: { fontSize: 11, color: colors.slate400 },
  dbValue: { fontSize: 11, fontWeight: "500", color: colors.emerald400 },
});
