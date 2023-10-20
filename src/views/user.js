import React from 'react'
import { useState,useEffect,useContext,useReducer} from 'react'
import axios from 'axios'
import { SimpleGrid, Card,Image,Text,Badge,Button,Group } from '@mantine/core'
import { getAuth,onAuthStateChanged } from "firebase/auth";

export default function User(){

    const [data, setData] = useState()
    const [error, setError] = useState();
    const [user,setUser] = useState();

    async function getData(){
        const response = await axios.get('http://localhost:4000/get-books');
        const dat = await response.data
        setData(dat)
    }
    getData();
   
    useEffect(()=>{
        async function getData(){
            if(user){
            const response = await axios.get('http://localhost:4000/user/:');
            const dat = await response.data
            setData(dat)
            }
        }
        getData();


    },[])
   
  




return (
  <div >
    <p>{JSON.stringify(data)}</p>
  </div>
);


}



