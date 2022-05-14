import React, { Component } from 'react';
import "./quizcomponent.css";
import Questions from "../resources/questions.json";
import {Link} from 'react-router-dom'

export default class QuizComponent extends Component {

  constructor(){
    super();
    // found new way to work with answers
    this.newArray = new Array(Questions.length);
    this.new = this.newArray.fill(0);
    // normal state
    this.state = {
      qNo: 0,
      timer: 256,
      ans: [...this.new]
    }
    this.intervalId = setInterval(this.timer.bind(this),1000);
    this.removeId = setInterval(this.removeAns.bind(this),2000)
    // console.log(this.new);
    // console.log(this.state.ans);
  }


  

  // ansHandler = () => {
  //   return this.state.ans.length;
  // }
  prevClickHandler = () => {
    this.setState({ qNo: this.state.qNo - 1 })
    if(this.state.qNo < 1) {
      document.getElementById("prevBtn").classList.add('disable');
      this.setState({
        qNo: 0
      })
    }
    else{
      document.getElementById('nextBtn').classList.remove('disable')
    }
  }
  nextClickHandler = () => {
    this.setState({ qNo: this.state.qNo + 1 })
    if(this.state.qNo > Questions.length - 2) {
      document.getElementById("nextBtn").classList.add('disable');
      this.setState({
        qNo: Questions.length - 1
      })
    }
    else{
      document.getElementById('prevBtn').classList.remove('disable')
    }
  }
  submitClickHandler = () => {
    clearInterval(this.intervalId);
    clearInterval(this.removeId);
    this.props.sentAns(this.state.ans);
  }

  timer = () => {
    this.setState({
      timer: this.state.timer - 1
    })
    if (this.state.timer < 1) {
      this.submitClickHandler();
    }
}

  optionClickHandler = (e) => {
    let decider = document.createElement("span");
    if(Questions[this.state.qNo].answer === e.target.value){
      decider.textContent = "Correct";
      decider.classList.add('yes');
      let newAns = [...this.state.ans];
      newAns[this.state.qNo] = 1;
      this.setState({ans: [...newAns]})
    }
    else{
      decider.textContent = "Wrong";
      decider.classList.add('no');
      let newAns = [...this.state.ans];
      newAns[this.state.qNo] = -1;
      this.setState({ans: [...newAns]})
    }
    document.getElementById('answer').appendChild(decider);
    this.nextClickHandler();
  }

  removeAns = () => {
    let spans = document.getElementById("answer");
    if (spans === null) {
        clearInterval(this.removeId);
    } else {
        if (spans.hasChildNodes()) {
            spans.removeChild(spans.firstChild);
        }
    }
}

  render() { 
    // console.log(this.ansHandler());
    return (
      <div className='Quiz'>
        <div className='quiz-container'>
          <div className='quiz-question'>
            <h1>Questions</h1>
            <span id='answer'>
               {/* decider goes here */}
            </span>
            <p>{Questions[this.state.qNo].question}</p>
          </div>
          <div className='quiz-time'>
            <p>{this.state.qNo + 1} of {Questions.length}</p>
            <p>{this.state.timer}</p>
          </div>
          <div className='quiz-options'>
            <button value={Questions[this.state.qNo].options[0]} onClick={this.optionClickHandler}>{Questions[this.state.qNo].options[0]}</button>
            <button value={Questions[this.state.qNo].options[1]} onClick={this.optionClickHandler}>{Questions[this.state.qNo].options[1]}</button>
            <button value={Questions[this.state.qNo].options[2]} onClick={this.optionClickHandler}>{Questions[this.state.qNo].options[2]}</button>
            <button value={Questions[this.state.qNo].options[3]} onClick={this.optionClickHandler}>{Questions[this.state.qNo].options[3]}</button>
          </div>
          <div className='quiz-action'>
            <button id='prevBtn' onClick={this.prevClickHandler}>Prev</button>
            <button id='nextBtn' onClick={this.nextClickHandler}>Next</button>
            <Link to='/resultcomponent'><button id='submitBtn' onClick={this.submitClickHandler}>Submit</button></Link>
          </div>
        </div>
      </div>
    )
  }
}
