import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from 'axios'
import { API_URL } from '../shared/url';
import client from '../shared/amazonConfig/awsConfig'
import {PutObjectCommand} from '@aws-sdk/client-s3'
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
import classes from './booksStyling.module.css'

export default function SignInCopy(props) {
  // { console.log(props + "this is props")}

  const [isG, setG] = useState();
  const [uploadImage, setUploadImage] = useState()
  

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      author: "",
      due_length: 14,
      description: "",
      file_name: "",
    },
    mode:"all"
  });
    console.log(client + "This is client")
  const uploadFile = file => {
    const preview = URL.createObjectURL(file)
    setUploadImage(file)
  }

  const onSubmit = (data) => {
    const host = "https://msalibrary.s3.amazonaws.com/"
    const body = data.file_name
    
    
    const book = {...data,file_name:host + data.title.replace(/ /g, "+") + ".png",checkedOut: false};
    console.log(book)
    axios.post(API_URL + '/add-book',book)
        .then(res => {
        setG(true)
                    
        })
        .catch(err => console.log(err));
        const bucketName = "msalibrary";

        const params = {
          Bucket: bucketName,
          Key:  data.title + ".png",
          Body: body,
        };
        
       
      
        client.send(new PutObjectCommand(params))
          .then(response => {
            console.log("Upload successful", response);
          })
          .catch(error => {
            console.error("Error uploading file", error);
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
  
    <Fieldset className={classes.formcontainer} legend="Book Information">
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
      disabled = {true}
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
          wrap
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
        label="Book Cover Image"
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
      {isG && <p color="green">Success</p>}
    </Fieldset>
    
  );
}
