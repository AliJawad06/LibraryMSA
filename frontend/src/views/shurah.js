import React from 'react'
import { useState,useEffect,useContext,useReducer} from 'react'
import axios from 'axios'
import { SimpleGrid, Card,Image,Text,Badge,Button,Group } from '@mantine/core'
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { NavLink, redirect } from 'react-router-dom';
import cx from 'clsx';
import { Table, ScrollArea } from '@mantine/core';
import classes from './TableScrollArea.module.css';
import { API_URL } from '../shared/url';

export default function Shurah(){

    const [t1, setT1] = useState();
    const [t2, setT2] = useState();

    const [flag,setFlag] = useState(true);
    const[auth,setAuth] = useState(getAuth());
    const [isLoaded, setLoaded] = useState(false)
    const[user,setUser] = useState(getAuth().currentUser)
    const [scrolled, setScrolled] = useState(false);


    onAuthStateChanged(auth, (user) => { 
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.email;
        if(user.email == "shurah@uncmsa.org"){
            setUser(user) 
        }
        // ...
      } else {
        redirect('https://msalibrary.vercel.app/books')
      }
    });
    

    async function checkOut(checkout_id, name, due_length){
      const today = new Date(); 

      var due = new Date(today.setDate(today.getDate() + due_length))
      const day_due = due.getDay();
      if(day_due == 6 || day_due == 0 ){
        due = due.setDate(due.getDate() + (day_due % 5) + 1);
      }
      due = new Date(due).toLocaleDateString()

      axios.post(API_URL + '/change-status',{checkout_id:checkout_id, name: name, due_date: due})
        .then(res => {
          console.log(res)
            console.log(res.data + "this is res")
            console.log(t1)
            const filteredArray = t1.filter((item) => (
              item._id !== checkout_id));   

            setT1(filteredArray);
            setFlag(!flag)
        })
        .catch(err => console.log(err));
        window.location.reload();

    }



    async function deleteCO(checkout_id, name, book_id){
      




      axios.post(API_URL + '/delete-checkout',{checkout_id:checkout_id, name: name, book_id:book_id})
        .then(res => {
            console.log(res.data + "this")
            const filteredArray = t2.filter((item) => (
              item._id !== checkout_id));   
            setT2(filteredArray);
            setFlag(!flag)
        })
        .catch(err => console.log(err));
        window.location.reload();
      
    }

    
   


  
   
    useEffect(()=>{

      console.log("here")
      const checkoutsList = [];
      async function getData(){
            const response = await axios.get(API_URL + '/get-all-checkouts');
            const dat = await response.data
            console.log(dat)
            dat.filter((student) =>{
              const name = student.name;
              var t1 = []
              var t2 = []
              for(var i = 0; i < student.checkouts.length; i++) {
        
                var checkout = student.checkouts[i];
                console.log(JSON.stringify(checkout) + "this is checkout")
                

                const ui_checkout = {
                  name: name, 
                  title: checkout.book.title,
                  due_date: checkout.due_date,
                  _id: checkout._id,
                  due_length: checkout.book.due_length,
                  book_id: checkout.book._id
                }              
                checkout.status ? t2.push(ui_checkout) : t1.push(ui_checkout)

                
                
                console.log(JSON.stringify(checkout) + "this is checkout")
              }
               t1 = t1.map((row) => (
                <Table.Tr key={row._id}>
                  <Table.Td>{row.name}</Table.Td>
                  <Table.Td>{row.title}</Table.Td>
                  <Table.Td>{row.due_date}</Table.Td>
                  <Button onClick={() => checkOut(row._id, name,row.due_length)} variant="light" color="blue" fullWidth mt="md" radius="md"  >
                Checkout Book 
              </Button>
                </Table.Tr>
              ));
              t2 = t2.map((row) => (
                <Table.Tr key={row._id}>
                  <Table.Td>{row.name}</Table.Td>
                  <Table.Td>{row.title}</Table.Td>
                  <Table.Td>{row.due_date}</Table.Td>
                  <Button onClick={() => deleteCO(row._id,name, row.book_id)} variant="light" color="blue" fullWidth mt="md" radius="md"  >
                Check-in Book 
              </Button>
                </Table.Tr>
              ));
                setT1(t1)
                setT2(t2)
                console.log(t1,t2)

            }) 
            
            
        }
        getData();

    },[])

   

 

  


return (
  <div >
    {user && 
     <div> 

      <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Due Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{t1}</Table.Tbody>
      </Table>
    </ScrollArea>
    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Due Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{t2}</Table.Tbody>
      </Table>
    </ScrollArea>
    </div> 
}
  </div>
   
);


}



