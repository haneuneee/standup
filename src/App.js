import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FirebaseDao from './FirebaseDao'
import Editor from './Editor.js'
import config from './config'
console.log(config);

class App extends Component {
  constructor(){
    super();
    this.dao = new FirebaseDao(config);
    this.submit = this.submit.bind(this);
    this.state = {
      "articles": []
    }

  }

  submit(article){
    if(article){
      let key = this.dao.newKey();
      let updated = this.dao.update( key, article );
      return updated;
    }
  }
  getArticles(){
  let lis = [];
  for(let i=0;i<this.state.articles.length;i++){
    lis.push(<li key={this.state.articles[i].key}>{this.state.articles[i].content}</li>);
  }
    console.log(lis)
  return lis;
}
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>만들어봅시당</h2>
        </div>
        <p className="App-intro">
          안녕하세요!
        </p>
        <Editor handleSubmit={this.submit} isAnonymous={this.isAnonymous}/>
        <ul>
        {this.getArticles()}
        </ul>
        </div>
    );
  }
  componentWillMount() {
  //데이터 조회 이벤트를 등록합니다.
  this.dao.list(25).on('value',(dataSnapshots)=>{
    var items = [];
    dataSnapshots.forEach(function(dataSnapshot){
      items.push(dataSnapshot.val());
    })
    if(items && items.length>0){
      // state값에 셋팅
      this.setState({
        articles: items.reverse()
      });
    }
  });
}
componentWillUnmount(){
  //이벤트 삭제
  this.dao.off();
}
}

export default App;
