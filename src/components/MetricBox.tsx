import { StyleSheet, Text, View } from 'react-native';
import { colors, mono } from '../theme';

type Tone = 'green' | 'yellow' | 'sky' | 'slate';

const tones: Record<Tone, { bg: string; border: string; label: string; value: string }> = {
  green: { bg: '#ecfdf5', border: '#a7f3d0', label: '#065f46', value: '#047857' },
  yellow: { bg: '#fefce8', border: '#fef08a', label: '#854d0e', value: colors.slate900 },
  sky: { bg: '#f0f9ff', border: '#bae6fd', label: '#075985', value: '#0369a1' },
  slate: { bg: colors.slate50, border: colors.slate200, label: colors.slate500, value: colors.slate800 },
};

interface Props {
  label: string;
  value: string;
  tone: Tone;
  size?: 'sm' | 'lg';
}

export function MetricBox({ label, value, tone, size = 'sm' }: Props) {
  const t = tones[tone];
  const large = size === 'lg';
  return (
    <View style={[styles.box, { backgroundColor: t.bg, borderColor: t.border }, large && styles.boxLg]}>
      <Text style={[styles.label, { color: t.label }, large && styles.labelLg]}>{label}</Text>
      <Text style={[styles.value, { color: t.value }, large && styles.valueLg]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 6, alignItems: 'center' },
  boxLg: { padding: 10, alignItems: 'flex-start' },
  label: { fontSize: 8, fontWeight: '700', textTransform: 'uppercase' },
  labelLg: { fontSize: 10 },
  value: { fontFamily: mono, fontSize: 11, fontWeight: '800', marginTop: 2 },
  valueLg: { fontSize: 16 },
});