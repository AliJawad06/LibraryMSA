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
  Card,
  Text,
  Badge,
  Image,
  HoverCard,
  SimpleGrid
} from "@mantine/core";
import app from "../shared/firebaseConfig/firebase";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { getAuth,onAuthStateChanged } from "firebase/auth";

import classes from './booksStyling.module.css'

export default function SignInCopy(props) {
  // { console.log(props + "this is props")}

  const [isG, setG] = useState();
  const [uploadImage, setUploadImage] = useState();
  const [url,setUrl] = useState();
  const [text,setText] = useState("paste Image Url in here")
  const [flag,setFlag] = useState(true)
  const [user, setUser] = useState(null)
  const[auth,setAuth] = useState(getAuth());

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

  const handlePaste = (event) => {
    const newUrl = event.clipboardData.getData('text')
    if(newUrl != url){
      setUrl(newUrl)
    }
  }


  const onSubmit = (data) => {
    
    const book = {...data,checkedOut: false, due_length:14};
    console.log(book)
    axios.post(API_URL + '/add-book',book)
        .then(res => {
        setG(true)
                    
        })
        .catch(err => console.log(err));          
  }   



  

  onAuthStateChanged(auth, (userlog) => { 
    if (userlog) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = userlog.email;
      if(userlog.emailVerified && userlog != user){
          setUser(userlog) 
          const userID = userlog.uid
      }
      
    } else {
      //redirect('http://localhost:3000/books')
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
  
   <>
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
      <Controller
      name = "file_name"
      control = {control}
      rules={{
        required: {value: true, message:"This is required"},
      }}
      render={({ field,formState }) => {
        return <TextInput
        onPaste={(e) => handlePaste(e)}
          label="Image Url"
          error = {formState.errors.name && formState.errors.name.message}
          placeholder="Description"
          aria-label="Clear input"
          mt="md"
          {...field}
        />
      }} 
      />
      
      <Group justify="flex-end" mt="md">
        <Button type="submit" disabled={!user} onClick={handleSubmit(onSubmit)}  >
          Submit
        </Button>
      </Group>
      {isG && <p color="green">Success</p>}
    </Fieldset>
    <SimpleGrid  className={classes.sampleGrid} cols={6}>
    <Card className={classes.sampleCard} shadow="sm" padding="lg" radius="md" withBorder   >
      <Card.Section>
        <Image
          src={url}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Sample Title</Text>
      </Group>

      <Text size="sm" c="dimmed">
        Sample Description
      </Text>
      <Badge color="pink" variant="light">
                  14
      </Badge>

      <Button color="blue" fullWidth mt="md" radius="md">
        Sample Button
      </Button>
    </Card>
    </SimpleGrid>
  </>
  
  );
}
