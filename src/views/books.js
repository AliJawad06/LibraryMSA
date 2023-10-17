import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { SimpleGrid, Card } from '@mantine/core'


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
  <div>
    {data && (
      <>
        {data.map((book,i) => (
          <p key={i}>{book.title}</p>
        ))}
      </>
    )}
  </div>
);


}



