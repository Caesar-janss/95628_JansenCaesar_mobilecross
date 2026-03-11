import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface CustomProps {
  input: string;
  onChange: (val: string) => void;
}

export const CustomTextInput = ({ input, onChange }: CustomProps) => {
  return (
    <View style={{ width: 200, marginBottom: 10 }}>
      <Text>Name</Text>
      <TextInput
        placeholder="Input your name"
        style={styles.input}
        onChangeText={onChange}
        value={input}
      />
    </View>
  );
};

export const NIMInput = ({ input, onChange }: CustomProps) => {
  return (
    <View style={{ width: 200 }}>
      <Text>NIM</Text>
      <TextInput
        placeholder="Input your NIM/Student ID"
        style={styles.input}
        onChangeText={onChange}
        value={input}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
});

export default function Dummy() { return null; }