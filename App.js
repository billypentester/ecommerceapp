import { StyleSheet, Text, View, StatusBar, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetch from './hooks/useFetch';

export default function App() {

  const { data, loading, error } = useFetch('https://fakestoreapi.com/products')

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving errors
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }

  storeData(data);

  loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
  error && <Text>{error}</Text>


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="royalblue" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.heading}>Ecommerce Store</Text>
      </View>
      <View style={styles.wrapper}>
        <FlatList showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} data={data} renderItem={({ item }) => 
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={{ fontSize:20, textAlign:'center', marginVertical:10 }}>{item.title}</Text>
            <Text style={styles.price}>$ {item.price}</Text>
            <TouchableOpacity style={styles.button} onPress={() => console.log('pressed')}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        } />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header:{
    backgroundColor: 'royalblue',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  wrapper:{
    paddingTop: 10,
    paddingHorizontal: 20,
    flex: 1,
  },
  heading:{
    fontSize: 30,
    textAlign: 'center',
    color:'#fff'
  },
  button:{
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',

  },
  buttonText:{
    color: '#fff',
    fontSize: 15,
    textAlign: 'center'
  },
  item:{
    backgroundColor: '#eeee',
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: '100%',
    flex:1
  },
  price:{
    fontSize:20, 
    textAlign:'center', 
    marginVertical:10, 
    color:'royalblue', 
    fontWeight:'bold' 
  },
  image:{
    width: 120, 
    height: 120, 
    borderRadius: 10, 
    alignSelf:'center', 
    margin:5
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  }
});
