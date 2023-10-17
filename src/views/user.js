import React from 'react'
import { useState,useEffect,useContext } from 'react'
import axios from 'axios'
import { SimpleGrid, Card,Image,Text,Badge,Button,Group } from '@mantine/core'
import { UserContext } from "../shared/context/UserContext";


export default function Books(){

    const [data, setData] = useState()
    const [isLoaded, setLoaded] = useState(false)
    const {user,setUser} = useContext(UserContext);

    async function User(){
        const response = await axios.get('http://localhost:4000/get-books');
        const dat = await response.data
        setData(dat)
    }
    getData();
   
    useEffect(()=>{
        async function getUser(){
            if(user){
            const response = await axios.get('http://localhost:4000/get-books');
            const dat = await response.data
            setData(dat)
            }
        }
        getData();


    },[])
   




return (
  <div >
    {user && }
  </div>
);


}



