import React from "react";
import { Text,Center } from "@mantine/core";
export default function Home() {


  
  


  /*
async function addUser(e){
  e.preventDefault()
    
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
     
      const user = userCredential.user;
      console.log(user.email)
          
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    
    });
   
  }*/

  return (
    <>
    <Center maw={1280*2} h={500*2} >
    <div>
      <Text size= "xl" as="div" style={{ display: 'block',fontSize: '80px' }}>
        Asalaamu Alaykum
      </Text>
      <Text as="div" style={{ display: 'block', fontSize: '50px' }}>
        Welcome to our Library
      </Text>
    </div>
    </Center>
    </>

  );
}
