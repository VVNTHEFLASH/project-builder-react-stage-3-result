import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeComponent from './components/HomeComponent';
import QuizComponent from './components/QuizComponent';
import ResultComponent from './components/ResultComponent';
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />}></Route>
        <Route path="/homecomponent" element={<HomeComponent />}></Route>
        <Route path="/quizcomponent" element={<QuizComponent />}></Route>
        <Route path="/resultcomponent" element={<ResultComponent />}></Route>
      </Routes>
    </BrowserRouter>
    )
  }
}
