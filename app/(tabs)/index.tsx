import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CustomTextInput, NIMInput } from "../../components/input";

export default function Index() {
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detail Mahasiswa:</Text>
      <Text>Nama: {name}</Text>
      <Text>NIM: {nim}</Text>

      <CustomTextInput input={name} onChange={(val) => setName(val)} />
      <NIMInput input={nim} onChange={(val) => setNim(val)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});