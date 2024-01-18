import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from 'axios'
import { API_URL } from '../shared/url';

import {
  Fieldset,
  TextInput,
  Button,
  Group,
  FileInput,
  MantineProvider,
} from "@mantine/core";
import app from "../shared/firebaseConfig/firebase";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export default function SignInCopy(props) {
  // { console.log(props + "this is props")}

  const [isG, setG] = useState();
  const [uploadImage, setUploadImage] = useState()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      author: "",
      due_length: 0,
      description: "",
      file_name: "",
    },
    mode:"all"
  });

  const uploadFile = file => {
    const preview = URL.createObjectURL(file)
    setUploadImage(file)
  }

  const onSubmit = (data) => {
    

    const book = {...data, checkedOut: false};
    console.log(book)
    axios.post(API_URL + '/add-book',book)
        .then(res => {
        console.log(res.data + " this is second res.data");
                    
        })
        .catch(err => console.log(err));
        const formData = new FormData();
        formData.append('file', uploadImage);

        fetch('https://api.cloudflare.com/client/v4/accounts/e1565db10158f41be265d7af3675a32a/images/v1', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer weeAgpLjnq6nykYpEpKLfLcfEgPcBAdZIDb76Q-t',
          },
          body: formData,
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
              
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
          value={uploadImage}
          onChange={uploadFile}
          mt="md"
          {...field}
        />
      }} 
      />
      <Controller
      name = "file_name"
      control = {control}
      rules={{
        required: {value: true, message:"This is required"},
      }}
      render={({ field,formState }) => {
        return <FileInput
        placeholder="Pick file"
        label="Your resume"
        withAsterisk
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
