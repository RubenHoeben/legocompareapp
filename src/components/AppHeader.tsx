import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';

interface SearchProps {
  value: string;
  onChange: (v: string) => void;
  sortLabel: string;
  onSortPress: () => void;
}

export function AppHeader({ search }: { search?: SearchProps }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <View style={styles.topRow}>
        <View style={styles.logoRow}>
          <View style={styles.logoBox}>
            <Ionicons name="cube" size={18} color={colors.yellow} />
          </View>
          <View>
            <Text style={styles.title}>
              BRICK<Text style={{ color: colors.red }}>COMPARE</Text>
            </Text>
            <Text style={styles.subtitle}>Belgium LEGO Metric Engine</Text>
          </View>
        </View>
        <View style={styles.region}>
          <Text style={styles.regionText}>🇧🇪 BE (€)</Text>
          <View style={styles.dot} />
        </View>
      </View>

      {search && (
        <View style={styles.searchRow}>
          <View style={styles.inputWrap}>
            <Ionicons name="search" size={13} color={colors.slate500} style={styles.searchIcon} />
            <TextInput
              value={search.value}
              onChangeText={search.onChange}
              placeholder="Search set name, # or theme..."
              placeholderTextColor={colors.slate400}
              style={styles.input}
              autoCorrect={false}
            />
            {search.value.length > 0 && (
              <Pressable onPress={() => search.onChange('')} hitSlop={8} style={styles.clear}>
                <Ionicons name="close" size={14} color={colors.slate400} />
              </Pressable>
            )}
          </View>
          <Pressable onPress={search.onSortPress} style={styles.sortBtn}>
            <Text style={styles.sortText}>{search.sortLabel}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.yellow,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#facc15',
    gap: 10,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 16, fontWeight: '900', color: colors.black, letterSpacing: -0.3 },
  subtitle: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate800,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  region: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  regionText: { fontSize: 12, fontWeight: '700', color: colors.black },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.emerald500,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  inputWrap: { flex: 1, justifyContent: 'center' },
  searchIcon: { position: 'absolute', left: 10, zIndex: 1 },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#fde047',
    borderRadius: 8,
    paddingLeft: 30,
    paddingRight: 28,
    paddingVertical: 7,
    fontSize: 12,
    fontWeight: '500',
    color: colors.slate900,
  },
  clear: { position: 'absolute', right: 8 },
  sortBtn: {
    backgroundColor: colors.black,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  sortText: { color: colors.yellow, fontSize: 11, fontWeight: '700' },
});