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
        axios.post(`http://localhost:4000/checkout-book`,{book_id:book_id, uuid: user.uid})
        .then(res => {
            console.log(res)
            const filteredArray = data.filter(item => item._id !== book_id);   
            setData(filteredArray);
            setFlag(!flag)
        })
        .catch(err => console.log( "this is err"));
    }


    
   


  
   
    useEffect(()=>{

      console.log("here")
      async function getData(){
            const response = await axios.get('http://localhost:4000/get-all-checkouts');
            const dat = await response.data
            dat.filter(checkout)
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
    
    {data && (
    
      <SimpleGrid  cols = {3}>
        {data.map((rez,i) => (
              <Card key = {rez._id} shadow="sm" padding="sm" radius="sm" withBorder>
              <Card.Section component="a" href="https://mantine.dev/">
                <Image
                  src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>
              <Text size="sm" c="dimmed">
                {rez.book.author}
              </Text>

              <Button onClick={() => checkOut(rez.book._id)} disabled = {user?false:true} variant="light" color="blue" fullWidth mt="md" radius="md"  >
                Checkout Book now 
              </Button>
            </Card>
        ))}
    </SimpleGrid>
    )}
    <NavLink to="/user" >user</NavLink>
  </div>
);


}



