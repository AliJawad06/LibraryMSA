import React from "react";
import { Text,Center } from "@mantine/core";
import { API_URL } from '../shared/url';
import { useState } from "react";

export default function Home() {
  const [scale, setScale] = useState(window.innerWidth < 390 ? 'scale(0.5)' : 'scale(1)')
  
 
  


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
    <Center maw={1280*2} h={250*2} >
    <div style={{marginTop: '100px', transform: scale}} >
      <Text size= "xl" as="div" style={{ display: 'block',fontSize: '80px'}}>
                      ٱقْرَأْ بِٱسْمِ رَبِّكَ ٱلَّذِى خَلَق 
      </Text>
      <Text as="div" style={{ display: 'block', fontSize: '30px'}}>
      Read, ˹O Prophet,˺ in the Name of your Lord Who created

      </Text>
    </div>
    </Center>
    </>

  );
}
