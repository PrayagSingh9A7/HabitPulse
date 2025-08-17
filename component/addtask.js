import { ImageBackground, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import k from "../assets/images/mod.png";

export default function AddTask({ modalOpen, setModalOpen, setTasks, tasks }) {
 const [title, setTitle] = useState("");

 function close() {
        setModalOpen(false)
 }
    
 function submit() {
        if (!title.trim()) return;
        const newArr = [...tasks];
        newArr.push({
            name:title,
            completed:false
        });
        setTasks(newArr)

        AsyncStorage.getItem('Arr').then(function(data){
            const Arr=JSON.parse(data)
          Arr[Arr.length-1]=newArr;
            
        AsyncStorage.setItem('Arr',JSON.stringify(neArr))
        })
     
        setTitle("")
        close()

 }
    
 function onChange(value) {
        setTitle(value)

 }


 return (
        <Modal visible={modalOpen} transparent={true} >
        <ImageBackground source={k} style={{width: 300,height: 260,margin: "auto", borderRadius: 20,borderColor: "grey", borderWidth: 2,overflow: "hidden"}}>
        <View style={{ flexDirection: "row"}}>
        <TextInput placeholder="enter task you want to add" value={title} style={{height: 40,backgroundColor: "white", flex: 1}} onChangeText={onChange} />
        <TouchableOpacity onPress={close} style={{ backgroundColor: "white",height: 40,alignItems: "center",justifyContent: "center",}}> 
        <View style={{backgroundColor: "#00e6e6",aspectRatio: 1,borderRadius: 100,right: 6,height: "90%",alignItems: "center",justifyContent: "center",}}>
        <Text style={{}}>❌</Text>
        </View>
        </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={submit} style={{backgroundColor: "#00cccc", borderRadius: 10,justifyContent: "center",alignItems: "center", margin: 10}}> 
        <Text style={{ fontSize: 20}}> Add</Text>
        </TouchableOpacity>
        </ImageBackground>
        </Modal>
 )
}