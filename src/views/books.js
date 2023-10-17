import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { SimpleGrid, Card,Image,Text,Badge,Button,Group } from '@mantine/core'


export default function Books(){

    const [data, setData] = useState()
    const [isLoaded, setLoaded] = useState(false)

    async function getData(){
        const response = await axios.get('http://localhost:4000/get-books');
        const dat = await response.data
        setData(dat)
        

        
        
    }
    getData();
   
    useEffect(()=>{
        async function getData(){
            const response = await axios.get('http://localhost:4000/get-books');
            const dat = await response.data
            setData(dat)
            
            
        }
        getData();


    },[])
   




return (
  <div >
    {data && (
      <SimpleGrid  cols = {3}>
        {data.map((book,i) => (
              <Card key = {i} shadow="sm" padding="sm" radius="sm" withBorder>
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
        
              <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                Checkout Book now 
              </Button>
            </Card>
        ))}
    </SimpleGrid>
    )}
  </div>
);


}



