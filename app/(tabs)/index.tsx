import React, { useState } from "react";
import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import Counter from "../../components/counter";
import Profile from "../../components/Profile";

export default function App() {
  const [count, setCount] = useState(0);
  const [inputName, setInputName] = useState("");
  const [finalName, setFinalName] = useState("Anonymous");
  const [finalAge, setFinalAge] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handlePassValue = () => {
    setFinalName(inputName === "" ? "Anonymous" : inputName);
    setFinalAge(count);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Nama"
        value={inputName}
        onChangeText={setInputName}
      />

      <Counter
        value={count}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        handlePassValue={handlePassValue}
      />

      <Profile name={finalName} age={finalAge} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
