import React from 'react'
import { useState,useEffect,useContext,useReducer} from 'react'
import axios from 'axios'
import { SimpleGrid, Card,Image,Text,Badge,Button,Group } from '@mantine/core'
import { getAuth,onAuthStateChanged } from "firebase/auth";

export default function User(){

    const [data, setData] = useState()
    const [error, setError] = useState();
    const [useruid,setUser] = useState();
    const [userdata, setUserdata] = useState();
    const[auth,setAuth] = useState(getAuth())

  
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(uid)
        console.log("API_URLuser/" + user.uid.toString())
         const response =  axios.get(API_URL + "user/" + useruid)
            .then((result) =>{
              console.log(JSON.stringify(result) + "this is user Data")
            });
        // ...
      } else {            
      }
    });



return (
  <div >
    <p>{JSON.stringify(data)}</p>
  </div>
);


}



