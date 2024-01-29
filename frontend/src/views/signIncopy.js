import React from "react";
import { useEffect, useState, useContext } from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, browserSessionPersistence,setPersistence } from "firebase/auth";
import {
  Fieldset,
  TextInput,
  Button,
  Group,
  MantineProvider,
} from "@mantine/core";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {NavLink} from 'react-router-dom'
import { API_URL } from '../shared/url';
import classes from './booksStyling.module.css'
export default function SignInCopy(props) {
  // { console.log(props + "this is props")}

  const [auth, setAuth] = useState(getAuth())
  const [isG, setG] = useState();


  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode:"all"
  });
  const onSubmit = (data) => {
  setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    setG(true)
    return signInWithEmailAndPassword(auth, data.email, data.password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
    
    

  }   

  
  


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
    <Fieldset className={classes.formcontainer} legend="Sign In">
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

      {isG && <p color="green">Success</p>}
    </Fieldset>
    </>
    
  );
}
