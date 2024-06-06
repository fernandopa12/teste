import React,{useState} from "react";
import {View,Text,TextInput,Button} from "react-native"
import {updateDoc,db,doc} from '../services/firebaseConfig'

const ScreenUpdate = (props)=>{

    //const title = props.route.params.item
    console.log(props.route.params.title)
    console.log(props.route.params.id)

    const[newTitle,setTitle]=useState(props.route.params.title)

    const updateIsTitle = async(newTitle) => {
        const itemRef = doc(db, "produtos", props.route.params.id);
        
        await updateDoc(itemRef, {
            title: newTitle
        });
    }


    return(
        <View>
            <Text>Nome Produto: {props.route.params.title}</Text>
            <Text>Deseja Atualizar o nome do produtos?</Text>
            <TextInput
                placeholder="Digite para atualizar o nome do produto"
                value={newTitle}
                onChangeText={(value)=>setTitle(value)}
            />
            <Button title="Atualizar" onPress={()=>updateIsTitle(newTitle)}/>
        </View>
    )
}

export default ScreenUpdate