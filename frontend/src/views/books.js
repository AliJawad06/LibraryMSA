import React from 'react'
import { useState,useEffect,useContext,useReducer} from 'react'
import axios from 'axios'
import { HoverCard, SimpleGrid, Card,Image,Text,Badge,Button,Group} from '@mantine/core'
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { NavLink } from 'react-router-dom';
import { API_URL } from '../shared/url';
import client from '../shared/amazonConfig/awsConfig'
import {ListObjectsV2Command} from '@aws-sdk/client-s3'
export default function Books(){

    const [data, setData] = useState();
    const [flag,setFlag] = useState(true);
    const[auth,setAuth] = useState(getAuth());
    const [isLoaded, setLoaded] = useState(false)
    const[user,setUser] = useState()
    const [checkoutsSize, setCheckoutsSize] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);




   
    

    async function checkOut(book_id){
        axios.post(API_URL + '/checkout-book',{book_id:book_id, uuid: user.uid})
        .then(res => {
            console.log(res)
            const filteredArray = data.filter(item => item._id !== book_id);   
            setData(filteredArray);
            setFlag(!flag)
            setCheckoutsSize(checkoutsSize + 1)
            if(checkoutsSize > 2){
              setDisabled(true)
            }
        })
        .catch(err => console.log( "this is err"));
    }


    
   


  
   
    useEffect(()=>{

      console.log("here")
      async function getData(){
            const response = await axios.get(API_URL + '/get-books');
            const dat = await response.data
            const command = new ListObjectsV2Command({Bucket: "msalibrary"});
            const imagesresponse = await client.send(command);
            console.log(imagesresponse)
            console.log('%c ', 'font-size:400px; background:url("Screen Shot 2023-12-28 at 10.00.27 AM.png") no-repeat;');


            setData(dat)
            
        }
        getData();

    },[])

   
 onAuthStateChanged(auth, (user) => { 
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.email;
        if(user.emailVerified){
            setUser(user) 
           
              // Replace 'your_server_url' with the actual URL where your Express server is running
              axios.get(API_URL + "getUserCheckoutsSize/${userId}")
                .then(response => {
                  setCheckoutsSize(response.data.checkoutsSize);
                  console.log(response.data.checkoutsSize)
                  if(checkoutsSize > 2){
                    setDisabled(true)
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
    
      <SimpleGrid  cols = {3}>
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

              <Button onClick={() => checkOut(book._id)} disabled = {user ? false:true} variant="light" color="blue" fullWidth mt="md" radius="md"  >
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



