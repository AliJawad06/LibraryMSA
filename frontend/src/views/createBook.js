import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from 'axios'
import { API_URL } from '../shared/url';

import {
  Fieldset,
  TextInput,
  Button,
  Group,
  MantineProvider,
} from "@mantine/core";
import app from "../shared/firebaseConfig/firebase";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export default function SignInCopy(props) {
  // { console.log(props + "this is props")}

  const [isG, setG] = useState();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      author: "",
      due_length: 0,
      description: ""
    },
    mode:"all"
  });
  const onSubmit = (data) => {
    
    axios.post(API_URL + '/add-book',data)
        .then(res => {
        console.log(res.data + " this is second res.data");
                    
        })
        .catch(err => console.log(err));
 
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
      name = "title"
      control = {control}
      rules={{
        required: {value: true, message:"This is required"},
      }}
      render={({ field,formState }) => {
        return <TextInput
          label="Title"
          error = {formState.errors.name && formState.errors.name.message}
          placeholder="Title"
          mt="md"
          {...field}
        />
      }} 
      />
      <Controller
      name = "author"
      control = {control}
      rules={{
        required: {value: true, message:"This is required"},
      }}
      render={({ field,formState }) => {
        return <TextInput
          label="Author"
          error = {formState.errors.name && formState.errors.name.message}
          placeholder="Author"
          mt="md"
          {...field}
        />
      }} 
      />
      <Controller
      name = "due_length"
      control = {control}
      rules={{
        required: {value: true, message:"This is required"},
      }}
      render={({ field,formState }) => {
        return <TextInput
          label="DueLength"
          error = {formState.errors.name && formState.errors.name.message}
          placeholder="Due_length"
          mt="md"
          {...field}
          type = 'number'
        />
      }} 
      />
      <Controller
      name = "description"
      control = {control}
      rules={{
        required: {value: true, message:"This is required"},
      }}
      render={({ field,formState }) => {
        return <TextInput
          label="Description"
          error = {formState.errors.name && formState.errors.name.message}
          placeholder="Description"
          mt="md"
          {...field}
        />
      }} 
      />
      <Group justify="flex-end" mt="md">
        <Button onClick={handleSubmit(onSubmit)} type="submit">
          Submit
        </Button>
      </Group>
    </Fieldset>
    
  );
}
