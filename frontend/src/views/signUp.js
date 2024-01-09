import React from "react";
import { useEffect, useState, useContext } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification,onAuthStateChanged } from "firebase/auth";
import axios from 'axios'
import {
  Fieldset,
  TextInput,
  Button,
  Group,
  MantineProvider,
} from "@mantine/core";
import app from "../shared/firebaseConfig/firebase";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { API_URL } from '../shared/url';

export default function SignUp(props) {
  // { console.log(props + "this is props")}

  const [auth, setAuth] = useState(getAuth())
  const [isF, setF] = useState(false)
  const [isG, setG] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode:"all"
  });
  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      setF(true)
      await sendEmailVerification(user);
      /*axios.post(API_URL + '/add-user',{name:data.name,uuid:user.uid,email:data.email})
        .then(res => {
          console.log("success")
        })
        .catch(err => console.log(err));
      ;*/

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }   


  onAuthStateChanged(auth, (user) => {

    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.email;
      const {email, emailVerified} = user;
      emailVerified && [setG(true), setF(false)]
      
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  
  


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
  
    <Fieldset legend="Personal information">
      <Controller
      name = "name"
      control = {control}
      rules={{
        required: {value: true, message:"This is required"},
      }}
      render={({ field,formState }) => {
        return <TextInput
          label="Name"
          error = {formState.errors.name && formState.errors.name.message}
          placeholder="name"
          mt="md"
          {...field}
        />
      }} 
      />
      <Controller
      name = "email"
      control = {control}
      rules={{
        required: {value: true, message:"This is required"},
      }}
      render={({ field,formState }) => {
        return <TextInput
          label="Email"
          error = {formState.errors.name && formState.errors.name.message}
          placeholder="email"
          mt="md"
          {...field}
        />
      }} 
      />
      <Controller
      name = "password"
      control = {control}
      rules={{
        required: {value: true, message:"This is required"},
      }}
      render={({ field,formState }) => {
        return <TextInput
          label="Password"
          error = {formState.errors.name && formState.errors.name.message}
          placeholder="Password"
          mt="md"
          {...field}
          type = "password"
        />
      }} 
      />
      <Group justify="flex-end" mt="md">
        <Button onClick={handleSubmit(onSubmit)} type="submit">
          Submit
        </Button>
      </Group>
      {isF && <p color="green">A verfification link has been sent to your email</p>}
      {isG && <p color="green">Success</p>}
    </Fieldset>
    
  );
}
