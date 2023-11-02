import React from "react";
import { useEffect, useState, useContext } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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

export default function SignUp(props) {
  // { console.log(props + "this is props")}

  const [auth, setAuth] = useState(getAuth())
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
    .then((userCredential) => {
      const user = userCredential.user;
      axios.post(`http://localhost:4000/add-user`,{name:data.name,uuid:user.uid,email:data.email})
        .then(res => {
          console.log("success")
        })
        .catch(err => console.log(err));
      setG(true);
    })
    .catch((error) => {
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

      {isG && <p color="green">Success</p>}
    </Fieldset>
    
  );
}
