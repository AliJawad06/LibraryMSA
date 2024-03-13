import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInCopy from "./views/signIncopy";
import SignUp from "./views/signUp";
import CreateBook from "./views/createBook"
import Books from "./views/books";
import User from "./views/user"
import Shurah from "./views/shurah";
import {useState,useContext} from "react"
import { HeaderSimple } from "./views/header";
import Home from "./views/home";
import Resources from "./views/resources";


const App = () => {
   // { console.log(props + "this is props")}


  return (
    <>
    <HeaderSimple />
      <Router>      
        <Routes>  
          <Route exact path = "/shurah" element = {<Shurah/>} />
          <Route exact path = "/sign-in" element={<SignInCopy />} />
          <Route exact path = "/sign-up" element={<SignUp />} />
          <Route exact path = "/add-book" element={<CreateBook />} />
          <Route exact path = "/books" element={<Books />} />
          <Route exact path = "/user" element={<User />} />
          <Route exact path = "/resources" element={<Resources />} />

          <Route exact path = "/" element={<Home />} />
        </Routes>
      </Router>
      </>
      
  );
};


export default App;
