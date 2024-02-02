import React from 'react'
import { useState,useEffect,useContext,useReducer} from 'react'
import axios from 'axios'
import { HoverCard, SimpleGrid, Card,Image,Text,Badge,Button,Group} from '@mantine/core'
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { NavLink } from 'react-router-dom';
import { API_URL } from '../shared/url';
import client from '../shared/amazonConfig/awsConfig'
import classes from './booksStyling.module.css'
export default function Books(){

    const [data, setData] = useState();
    const [flag,setFlag] = useState(true);
    const[auth,setAuth] = useState(getAuth());
    const [isLoaded, setLoaded] = useState(false)
    const [checkoutsSize, setCheckoutsSize] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [user, setUser] = useState(null)




   
    

    async function checkOut(book_id){
        axios.post(API_URL + '/checkout-book',{book_id:book_id, uuid: user.uid})
        .then(res => {
            const filteredArray = data.filter(item => item._id !== book_id);
            console.log(filteredArray + "this is filtered array")   
            setData(filteredArray);
            setFlag(!flag)
            setCheckoutsSize(checkoutsSize + 1)
            if(checkoutsSize > 2){
              setIsDisabled(true)
            }
        })
        .catch(err => console.log( "this is err"));
    }


    
   


  
   
    useEffect(()=>{

      console.log("here")
      async function getData(){
            const response = await axios.get(API_URL + '/get-books');
            const dat = await response.data
            const filterarray = dat.filter(item => item.checkedOut == false)
            console.log(filterarray)
            setData(filterarray)
            
        }
        getData();

    },[])

   
 onAuthStateChanged(auth, (user) => { 
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.email;
        if(user.emailVerified){
            console.log("user is verified")
            setUser(user) 
            const userID = user.uid
              axios.get(API_URL + "/getUserCheckoutsSize/" + userID)
                .then(response => {
                  setCheckoutsSize(response.data.checkoutsSize);
                  setIsDisabled(false);
                  console.log(response.data.checkoutsSize + "this is checkoutSize")
                  if(checkoutsSize > 2){
                    setIsDisabled(true)
                  }
                })
                .catch(error => {
                  console.error('Error fetching data: for checkoutSize', error);
                  // Handle the error state if necessary
                });
            
          

        }
        
      } else {
        //redirect('http://localhost:3000/books')
      }
    });



return (
  <div >
    
    {data && (
    
      <SimpleGrid className= {classes.bookcontainer} cols = {6}>
        {data.map((book,i) => (
              <Card key = {book._id} shadow="sm" padding="sm" radius="sm" withBorder>
              <Card.Section component="a" href="https://mantine.dev/">
                <Image
                  src={book.file_name}
                  height={160}
                  alt="Norway"
                />
              </Card.Section>
              
              <Group justify="space-between" mt="md" mb="xs">
              <HoverCard width={280} shadow="md">
              <HoverCard.Target>
                <Text fw={500}>{book.title}</Text>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="sm">
                  {book.description}
                </Text>
              </HoverCard.Dropdown>
            </HoverCard>

                <Badge color="pink" variant="light">
                  {book.due_length}
                </Badge>
              </Group>
              

        
              <Text size="sm" c="dimmed">
                {book.author}
              </Text>

              <Button onClick={() => checkOut(book._id)} disabled = {true} variant="light" color="blue" fullWidth mt="md" radius="md"  >
                Checkout Book now 
              </Button>
            </Card>
        ))}
    </SimpleGrid>
    )}
  </div>
);


}



