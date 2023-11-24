import React from 'react'
import { useState,useEffect,useContext,useReducer} from 'react'
import axios from 'axios'
import { SimpleGrid, Card,Image,Text,Badge,Button,Group } from '@mantine/core'
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { NavLink, redirect } from 'react-router-dom';
import cx from 'clsx';
import { Table, ScrollArea } from '@mantine/core';
import classes from './TableScrollArea.module.css';

export default function Shurah(){

    const [data, setData] = useState();
    const [flag,setFlag] = useState(true);
    const[auth,setAuth] = useState(getAuth());
    const [isLoaded, setLoaded] = useState(false)
    const[user,setUser] = useState(getAuth().currentUser)
    const [scrolled, setScrolled] = useState(false);


   
    

    async function checkOut(book_id){
       
    }


    
   


  
   
    useEffect(()=>{

      console.log("here")
      const checkoutsList = [];
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
                checkoutsList.push(
                {
                  name: name, 
                  title: checkout.book.title,
                  due_date: due.toDateString()
                }
                )
                console.log(due.toDateString())
                console.log(JSON.stringify(checkout) + "this is checkout")
              }
              const rows = checkoutsList.map((row) => (
                <Table.Tr key={row.name}>
                  <Table.Td>{row.name}</Table.Td>
                  <Table.Td>{row.title}</Table.Td>
                  <Table.Td>{row.due_date}</Table.Td>
                </Table.Tr>
              ));
                setData(rows)

            }) 
            console.log(dat)
            
            
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
    
    {data && <div> 

      <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Due Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{data}</Table.Tbody>
      </Table>
    </ScrollArea>


    </div> 
    }
  </div>
);


}



