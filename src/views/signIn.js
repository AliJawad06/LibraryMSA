import React from 'react'
import { useEffect, useState,useContext  } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Fieldset, TextInput, Button, Group,MantineProvider } from '@mantine/core';
import app from '../shared/firebaseConfig/firebase'


export default function SignIn(props){
  // { console.log(props + "this is props")}

  const [auth, setAuth ] = useState(getAuth());
  const [email, setEmail ] = useState("example@gmail.com");
  const [password, setPassword ] = useState("........");
  const [error, setError] = useState();

async function checkUser(e){
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
   
  }


return(
    <Fieldset legend="Personal information" > 
      <TextInput label="Email" placeholder="Email" mt="md" onChange = {(e) => setEmail(e.target.value)} />
      <TextInput label="Your Password" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} />

      <Group justify="flex-end" mt="md">
        <Button onClick={(e)=> checkUser(e) } type = "submit">Submit</Button>
      </Group>
    </Fieldset>
    
    );
}