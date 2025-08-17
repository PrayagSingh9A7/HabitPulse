import { AntDesign } from "@expo/vector-icons";
import { useState,useEffect } from "react";
import { View,Text, TouchableHighlight, TouchableOpacity, Modal, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {linearGradient} from "expo-linear-gradient";
export default function taskItem({item,isLastIndex,index,setTasks, tasks}){
 const [tr,setTr] =useState()
 const[val,setVal]=useState(item.name)
    function handlePress(){
        const newArr = [...tasks];
        newArr[index].completed=!newArr[index].completed
        setTasks(newArr)
           AsyncStorage.getItem("Arr").then(function(data){
            const arr=JSON.parse(data)
            arr[arr.length-1]=newArr;
             AsyncStorage.setItem("Arr",JSON.stringify(arr))
        })

    }
 function change(value){
        setVal(value)
 }
    


 function changeTask(){
        const arr=[...tasks]
        arr[index].name=val
        setTasks(arr)
       
        AsyncStorage.getItem('Arr').then(function(data){
            const Arr=JSON.parse(data)
            Arr[Arr.length-1]=arr
        AsyncStorage.setItem('Arr',JSON.stringify(Arr))
        })
         setTr(!tr)
 }

 function changeTr(){
       setTr(!tr)
 }

 function handleDelete(){
        const arr=tasks.filter(function(_,i){
            return i!=index
        })
        setTasks(arr)
          AsyncStorage.getItem('Arr').then(function(data){
            const Arr=JSON.parse(data)
            Arr[Arr.length-1]=arr
        AsyncStorage.setItem('Arr',JSON.stringify(Arr))
        })
 }
   
 function handleEdit(){
        return(
             <View style={{}}>
             <Modal transparent={true}>
             <View style={{ height:160,backgroundColor:"#f9ecf2",width:220, margin:"auto", borderWidth:2,borderRadius:10,borderColor:"lightblue" }}>
             <View style={{height:40,backgroundColor:"white",borderTopEndRadius:8,borderTopLeftRadius:8}}>
             <TextInput placeholder="edit your task" style={{fontSize:14, }} onChangeText={change}></TextInput>
             </View>
             <View style={{backgroundColor:"#00e6e6",width:70,height:25,borderRadius:7,alignItems:"center",marginLeft:70, marginTop:25}}> 
             <TouchableOpacity onPress={changeTask} ><Text>Confirm</Text></TouchableOpacity></View>
             <View style={{backgroundColor:"#00e6e6",width:70,height:25,borderRadius:7,alignItems:"center",marginLeft:70,marginTop:5}}> 
             <TouchableOpacity onPress={changeTr}><Text>cancel</Text></TouchableOpacity></View>
             </View>
             </Modal>
             </View>
        )
 }
   

 return(
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <TouchableOpacity key={index} onPress={handlePress} style={{flexDirection:"row",alignItems:"center", gap:10, borderRadius:90, }}>
        <View style={{height:20,width:20, borderWidth:2,borderRadius:100,borderColor:"#007399"}}>
        {item.completed && <View style={{height:"90%", aspectRatio: 1,backgroundColor:"#9999ff",borderRadius:40,margin:"auto",}}>
        </View>}
        </View>
        <Text style={{fontSize:20,overflow:"hidden", color:"#004d66",}}>{item.name}</Text>
        </TouchableOpacity>
        <View style={{flexDirection:"row",gap:4}}>
        { tr&&handleEdit()}
        <TouchableOpacity onPress={handleDelete} ><AntDesign name="delete" size={24} color="black"></AntDesign></TouchableOpacity>
        <TouchableOpacity onPress={changeTr} ><AntDesign name="edit" size={24} color="black"></AntDesign></TouchableOpacity></View>
        </View>
 )

}