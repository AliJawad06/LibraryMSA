import React from 'react'
import { useState,useEffect,useContext,useReducer} from 'react'
import axios from 'axios'
import { SimpleGrid, Card,Image,Text,Badge,Button,Group } from '@mantine/core'
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { NavLink, redirect } from 'react-router-dom';


export default function Shurah(){

    const [data, setData] = useState();
    const [flag,setFlag] = useState(true);
    const[auth,setAuth] = useState(getAuth());
    const [isLoaded, setLoaded] = useState(false)
    const[user,setUser] = useState(getAuth().currentUser)


   
    

    async function checkOut(book_id){
       
    }


    
   


  
   
    useEffect(()=>{

      console.log("here")
      async function getData(){
            const response = await axios.get('http://localhost:4000/get-all-checkouts');
            const dat = await response.data
            dat.filter((student) =>{
              const today = new Date(); 
              const name = student.name;
              for(var i = 0; i < student.checkouts.length; i++) {
                var checkout = student.checkouts[i];
                const due_length = checkout.book.due_length;
                console.log(due_length);
                var due = new Date(today.setDate(today.getDate() + due_length))
                const day_due = due.getDay()
                if(day_due == 6 || day_due == 0 ){
                  due = due.setDate(due.getDate() + (day_due % 5) + 1);
                }
                checkout.due_date = due
                console.log(due.toDateString())
                console.log(JSON.stringify(checkout) + "this is checkout")
              }
             
            }) 
            console.log(dat)
            setData(dat)
            
        }
        getData();

    },[])

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.email;
        if(user.email == "shurah@gmail.com"){
            setUser(user) 
        }
        // ...
      } else {
        redirect('http://localhost:3000/books')
      }
    });




return (
  <div >
    
    {data && <p>{console.log("hello")}</p> }
  </div>
);


}



