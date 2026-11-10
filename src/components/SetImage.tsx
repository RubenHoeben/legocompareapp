import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

interface SetImageProps {
  uri: string;
  size: number;
}

export function SetImage({ uri, size }: SetImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <View style={[styles.box, { width: size, height: size }]}>
      {failed ? (
        <Ionicons
          name="cube-outline"
          size={size / 2.5}
          color={colors.slate400}
        />
      ) : (
        <Image
          source={{ uri }}
          style={styles.image}
          resizeMode="contain"
          onError={() => setFailed(true)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.slate50,
    borderWidth: 1,
    borderColor: colors.slate100,
    borderRadius: 10,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: "100%", height: "100%" },
});
