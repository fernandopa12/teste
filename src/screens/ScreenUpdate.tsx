import React,{useState} from "react";
import {View,Text,TextInput,Button} from "react-native"
import {updateDoc,db,doc} from '../services/firebaseConfig'

const ScreenUpdate = (props)=>{

    //const title = props.route.params.item
    console.log(props.route.params.item)
    const data = props.route.params.title

    const[newTitle,setTitle]=useState(props.route.params.item)

    const updateIsTitle = async(title) => {
        const itemRef = doc(db, "produtos", props.route.params.id);
        
        await updateDoc(itemRef, {
            title: title
        });
    }


    return(
        <View>
            <Text>Nome Produto: {data}</Text>
            <Text>Deseja Atualizar o nome do produtos?</Text>
            <TextInput
                placeholder="Digite para atualizar o nome do produto"
                value={newTitle}
                onChangeText={(value)=>setTitle(value)}
            />
            <Button title="Atualizar" onPress={updateIsTitle}/>
        </View>
    )
}

export default ScreenUpdate