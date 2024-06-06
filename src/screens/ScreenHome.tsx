import { Alert,ActivityIndicator,Pressable,StyleSheet, Text, TextInput, View,FlatList,TouchableOpacity } from 'react-native';
import LojaItem from '../components/LojaItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import {app,db,getFirestore,collection, addDoc, getDocs,deleteDoc,doc} from '../services/firebaseConfig'
import { useState,useEffect } from 'react';

export default function App({navigation}) {
  const[title,setTitle]=useState('')
  const[produtoList,setProdutoList]=useState([])

  const addItem = async() =>{
    try {
      const docRef = await addDoc(collection(db,"produtos"), {
        title: title,
        isChecked:false
      });
      alert("PRODUTO CADASTRADO")
      setTitle('')
      getItem()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const getItem = async () =>{
    let d = []
    const querySnapshot = await getDocs(collection(db, "produtos"));
    querySnapshot.forEach((doc) => {
      //console.log(doc.id , doc.data());
      const produtos = {
        id:doc.id,
        title:doc.data().title,
        isChecked:doc.data().isChecked
      }
      d.push(produtos)
    });
    setProdutoList(d)
  }

  const deleteItemList = async()=>{
    const pegandoItems = await getDocs(collection(db, "produtos"));
    pegandoItems.docs.map((item)=>deleteDoc(doc(db, "produtos", item.id)))
    getItem()
  }

  useEffect(()=>{
    getItem()
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Lista de itens</Text>
        <Text style={styles.numItem}>{produtoList.length}</Text>
        <Pressable onPress={deleteItemList}>
          <MaterialIcons name="delete" size={24} color="black" />
        </Pressable>
      </View>

      {produtoList.length>0?(<FlatList 
        data={produtoList}
        renderItem={({item})=>(
          <TouchableOpacity onPress={()=>navigation.navigate("ScreenUpdate",{id:item.id,title:item.title})} >
            <LojaItem 
              title={item.title}
              isChecked={item.isChecked}
              id={item.id}
              getItem={getItem}
              />
            </TouchableOpacity> )}
      />):<ActivityIndicator/>}
      

      <TextInput 
        style={styles.txtInput}
        placeholder='Digite o nome do produto...'
        value={title}
        onChangeText={(value)=>setTitle(value)}
        onSubmitEditing={addItem}
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff'
  },
  header:{
    flexDirection:'row',
    width:'90%',
    alignSelf:'center',
    padding:10,
    borderRadius:10,
    alignItems:'center'
  },
  headerTxt:{
    fontSize:25,
    fontWeight:'500',
    flex:1
  },
  numItem:{
    fontSize:25,
    fontWeight:'500',
    marginRight:20
  },
  txtInput:{
    backgroundColor:'lightgrey',
    padding:10,
    width:'90%',
    borderRadius:10,
    alignSelf:'center',
    marginTop:'auto',
    marginBottom:10
  }
});
