import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput} from 'react-native';

export default function App() {
  return (
    <ScrollView>
    <View style={styles.container}>

      <Image 
        source={require('../../assets/images/images.png')}
        style={styles.logo}
      />
      <TextInput placeholder="Jansen Caesar - 00000095628"/> 

      <Image 
        source={require('../../assets/images/rafi.png')}
        style={styles.logo}
      />
      <Text>Atanius Rafi Herkistio</Text>
      <Text>00000044898</Text>

      <Image 
        source={require('../../assets/images/farion.png')}
        style={styles.logo}
      />
      <Text>Farion Tekkry</Text>
      <Text>00000056034</Text>

      <Image 
        source={require('../../assets/images/john.png')}
        style={styles.logo}
      />
      <Text>John Smith</Text>
      <Text>johnsmith@example.com</Text>

      <Image 
        source={require('../../assets/images/jane.png')}
        style={styles.logo}
      />
      <Text>Jane Doe</Text>
      <Text>jandoe@example.com</Text>

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 20,
  }
});
