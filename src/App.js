import React from 'react';
import NavigationBar from './component/Navbar';
import AddPost from './component/AddBlog';
import EditPost from './component/editBlog';
import ReadPost from './component/ReadBlog';
import Login from './component/Login';
import HomePage from './component/Home';
import Signup from './component/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
const db=require('./db.json')

function App() {
  
  if(localStorage.getItem("reactBlogData")===null){
    localStorage.setItem("reactBlogData", JSON.stringify(db))
  }
  
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/post/:id" element={<ReadPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/editpost/:id" element={<EditPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
