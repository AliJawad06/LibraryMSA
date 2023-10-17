import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInCopy from "./views/signIncopy";
import SignUp from "./views/signUp";
import CreateBook from "./views/createBook"
import Books from "./views/books";
import {useState,useContext} from "react"
import {UserContext} from "./shared/context/UserContext"


const App = () => {
   // { console.log(props + "this is props")}

   const[user, setUser] = useState(false)

  return (
     <>    

      <Router>      
        <UserContext.Provider value = {{user,setUser}}>
        <Routes>  
             

          <Route exact path="/sign-in" element={<SignInCopy />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/add-book" element={<CreateBook />} />
          <Route exact path="/books" element={<Books />} />
       
        </Routes>
        </UserContext.Provider>
      </Router>
      
      </>
  );
};


export default App;
