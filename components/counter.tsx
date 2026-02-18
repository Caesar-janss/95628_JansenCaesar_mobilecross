import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface CounterProps {
  value: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handlePassValue: () => void;
}

const Counter: React.FC<CounterProps> = ({
  value,
  handleIncrement,
  handleDecrement,
  handlePassValue,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter</Text>
      <Text style={styles.value}>{value}</Text>

      <View style={styles.buttonRow}>
        <Button title="Increment" onPress={handleIncrement} />
        <Button title="Decrement" onPress={handleDecrement} />
      </View>

      <Button title="Pass Value" onPress={handlePassValue} />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  value: {
    fontSize: 24,
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
});
