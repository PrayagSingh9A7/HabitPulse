import {Text, TouchableOpacity, View} from "react-native";
import{Months,Days} from "../lib/month.js";
import { useState } from "react";
import TaskItem from "../component/textItem.js";
import{MaterialCommunityIcons} from"@expo/vector-icons";
import AddTask from "../component/addtask.js";
import {LinearGradient, } from "expo-linear-gradient";
import{useFonts} from "expo-font";
import { useEffect} from "react";
import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRouter} from "expo-router";
export default function HomePage(){

 const router=useRouter();

 const[modalOpen,setModalOpen]=useState(false); 
 const[fontsLoaded]=useFonts({
    d:require("../assets/fonts/DancingScript-VariableFont_wght.ttf"),
      rp:require("../assets/fonts/StickNoBills-VariableFont_wght.ttf")
 })
 
    const now= new Date();
    const date = now.getDate();
    const month= now.getMonth();
    const day=now.getDay();
    const[tasks,setTasks]=useState([ ]);
   
       function initailize(){
           AsyncStorage.getItem("Arr").then((data)=>{
               if(data){
                   const Arr=JSON.parse(data)
                   const lastIndex=Arr.length-1;
                   setTasks(Arr[lastIndex])
               }
               else{
                   const arr=[[]];
                   AsyncStorage.setItem("Arr",JSON.stringify(arr))
               }
           })
   
       }

       useEffect(()=>{
           initailize();
       },[])


    function startNewDay(){
        const arr=[...tasks]
        arr.forEach((tsks)=>{
                tsks.completed=false

        })
        setTasks(arr);
        AsyncStorage.getItem("Arr").then((data)=>{
            const Arr=JSON.parse(data)
            Arr.push(arr)
             AsyncStorage.setItem("Arr",JSON.stringify(Arr))

        })
    }  

    let completedtasks=tasks.filter(function(task){return task.completed}).length;
        
        
    const totalTasks = tasks.length;
    const percentage = totalTasks > 0 ? ((completedtasks * 100) / totalTasks).toFixed(2) : "0.00";
   

    function suffix( date){
    if( date==1||date==11||day==21||day==31)   return "st";
    if( date==2||date==12||day==22)   return "nd";
    if( date==3||date==13||day==23)   return "rd";
    else  return "th";
    }

    function openModal(){
       setModalOpen(true)
    }

    return(<>
    <LinearGradient  colors={['#cceeff', '#ff99bb']}style={{ height: '100%', width:'100%' }}>
    <View style={{height:"100%"}}>
        <View style={{backgroundColor:"#ffcce0",height:120,borderBottomRightRadius:120,borderBottomLeftRadius:30}}> 
        <Text style={{fontSize:25,fontFamily:"d",fontWeight:600,color:"#990033",textShadowRadius:"30",marginTop:60,marginLeft:20}}>"Track Your Habits,Own Your Day"</Text></View>
        <View style={{  height:200, padding:20}}>
       
        <View flexDirection="row">
        <Text style={{ fontSize:27, left:10, color:"#1f2e2e", fontFamily:"d", fontWeight:600}}>{date}{suffix(date)}  {Months[month]}</Text>
        <TouchableOpacity onPress={()=>router.push('tab2')}><Entypo name="bar-graph" size={28} color="#ff99bb" style={{marginLeft:"70%",marginTop:10,borderWidth:1,borderRadius:5,padding:2,borderColor:"#96aaecd0",width:35}} /></TouchableOpacity>
        </View>
        <Text style={{ fontSize:16, left:10, color:"#527a7a", fontWeight:300}}>{Days[day]}</Text>
        <View style={{height:15,backgroundColor:"white",borderRadius:10,marginTop:5,}}>
        <View style={{height:"100%",backgroundColor:"#bf80ff",justifyContent:"center",alignItems:"center",position:"absolute",width:`${percentage}%`,borderRadius:10,}}>
        <View style={{aspectRatio:1,height:"90%", backgroundColor:"white",position:"absolute", borderRadius:10, marginVertical:"5%",right:1,}}></View>
        </View>
        </View>

        {percentage&&<View style={{marginTop:10,height: 20,alignItems:"flex-end" }}>
        <Text style={{fontSize: 16,fontWeight: 400,color:"#800000"}}>{percentage}%</Text>
        </View>
        }

        <TouchableOpacity onPress={startNewDay} style={{ backgroundColor: "#00cccc",borderRadius: 10, justifyContent: "center", alignItems: "center", margin: 10  }}>
        <Text style={{ fontSize: 20 }}> start new day</Text>
        </TouchableOpacity>
        

        <View style={{ marginTop: 25}}>
        <View style={{ marginVertical: 20, }}>
        <Text style={{ fontSize: 18,fontWeight: 400,fontFamily:"rp"}}> INCOMPLETED TASKS</Text>
        </View>
        < View style={{ backgroundColor:"#e6e6ff",borderWidth:1,borderRadius:10,paddingHorizontal : 20,paddingVertical:5, borderColor:"#248f8f",}}>
        {
            tasks.map((item, i) => {
                                      if(item.completed===false){
                                        return (
                                        <TaskItem tasks={tasks} item={item} key={i} index={i} isLastIndex={tasks.length - 1 === i} setTasks={setTasks} />
                                        )
                                      }
                                   })
        }
         </View>
        
        <View style={{marginVertical: 20}}>
        <Text style={{fontSize: 18,fontWeight: 400}}> COMPLETED TASKS</Text>
        </View>
        <View style={{backgroundColor:"#ccf2ff",borderWidth:1, borderRadius:10, paddingHorizontal : 20, paddingVertical:5,borderColor:"#248f8f",}}>
        {
            tasks.map((item, i) => {
                                       if(item.completed===true){
                                           return (
                                           <TaskItem tasks={tasks} item={item} key={i} index={i} setTasks={setTasks} isLastIndex={tasks.length - 1 === i} />
                                           )
                                        }
                                   })
        }
        </View>
         
        </View>
         
        <AddTask  setModalOpen={setModalOpen} modalOpen={modalOpen}setTasks={setTasks} tasks={tasks}/>
        </View>
        
        
        <TouchableOpacity onPress={openModal}style={{height:70, width:70,backgroundColor:"#AFA6E6" ,justifyContent:"center",alignItems:"center",borderRadius:100, position:"absolute", bottom:30,left:"50%",transform:[{ translateX:"-50%" }]}}>
        <View><MaterialCommunityIcons  name="plus"  size={32}/> </View>
        </TouchableOpacity>
        </View>
        
        </LinearGradient>
        </>
    )
}

