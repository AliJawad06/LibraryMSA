import React from 'react'
import { useState,useEffect,useContext } from 'react'
import axios from 'axios'
import { SimpleGrid, Card,Image,Text,Badge,Button,Group } from '@mantine/core'
import {UserContext} from '../shared/context/UserContext'

export default function Books(){

    const [data, setData] = useState()
    const [isLoaded, setLoaded] = useState(false)
    const {user,setUser} = useContext(UserContext);

    async function checkOut(book_id){
        axios.post(`http://localhost:4000/checkout-book`,{book_id:book_id, uid: user.uid})
        .then(res => {                    
        })
        .catch(err => console.log(err));
    }

    

    async function getData(){
        const response = await axios.get('http://localhost:4000/get-books');
        const dat = await response.data
        setData(dat)
    }
   
    useEffect(()=>{
        console.log('2')
        async function getData(){
            const response = await axios.get('http://localhost:4000/get-books');
            const dat = await response.data
            setData(dat)
            console.log('3')
            
        }
        getData();
    },[])
   




return (
  <div >
    
    {data && (
    
      <SimpleGrid  cols = {3}>
        {data.map((book,i) => (
              <Card key = {book._id} shadow="sm" padding="sm" radius="sm" withBorder>
              <Card.Section component="a" href="https://mantine.dev/">
                <Image
                  src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>
        
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{book.title}</Text>
                <Badge color="pink" variant="light">
                  {book.due_length}
                </Badge>
              </Group>
        
              <Text size="sm" c="dimmed">
                {book.author}
              </Text>

              <Button onClick={() => checkOut(book._id)} disabled = {user?false:true} variant="light" color="blue" fullWidth mt="md" radius="md"  >
                Checkout Book now 
                {console.log({user})}
              </Button>
            </Card>
        ))}
    </SimpleGrid>
    )}
  </div>
);


}



