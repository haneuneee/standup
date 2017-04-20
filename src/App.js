import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from './Editor.js'

class App extends Component {
  constructor(){
    super();
    this.submit = this.submit.bind(this);
  }

  submit(content){
    if(content){
      console.log(content);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>만들어봅시당</h2>
        </div>
        <p className="App-intro">
          이제 여기서 부터 프로젝트는 시작입니다. 로고는 일단은 그냥 둡시다..
        </p>
        <Editor {...this}/>
      </div>
    );
  }
}

export default App;
