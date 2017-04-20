import React, { Component } from 'react';
import './Editor.css';
import Profile from './Profile';
import Article from './Article';
import Card from './Card';
import getEmbedly from './EmbedlyDao';

class Editor extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.editorChange = this.editorChange.bind(this);
    this.getCard = this.getCard.bind(this);
    this.hasValue = this.hasValue.bind(this);
    this.detectURL = this.detectURL.bind(this);
    this.state ={
      embedlyUrl : undefined,
      content : undefined
    }
  }
getForcedState(embedlyUrl,content){
  //Promises를 사용합니다.
  return new Promise(resolve=>{
    //URL이 들어 왔을 경우
    if(embedlyUrl){
      //Embedly API를 호출해서 response.data의 값을 받아온다.
      getEmbedly(embedlyUrl).then((response)=>{
        let cardInfo = Object.assign({},response.data);
        //setState 해줄 객체를 만들어 준다
        resolve({
          embedlyUrl : embedlyUrl,
          content : content,
          cardInfo : cardInfo
        });
      }).catch((error)=>{
        resolve({
          embedlyUrl : undefined,
          content : undefined,
          cardInfo : undefined
        });
      });
    }else{
      //URL 이 안들어 올 경우는 state에서 content만 업데이트 할 수 있도록 bypass 시켜 준다
      //호출하는 쪽에서 setState를 콜하도록 하는 패턴을 바꾸는 편이 낫다고 생각해서
      //이렇게 분기를 했는데, 리팩토링의 여지가 있음
      resolve({
        content : content
      });
    }
  })
}
 onPaste(event){
  event.clipboardData.items[0].getAsString(text=>{
    let checkText = this.detectURL(text);
    //복사 붙여넣기 할때 클립보드의 URL을 확인해서 있을 경우 카드를 만든다.
    //state가 변경이 되면 카드가 만들어진다.
    if(checkText){
      this.getForcedState(checkText).then((obj)=>{
        this.setState(obj);
      });
    }
  })
}
editorChange(event){
  let checkText = this.detectURL(event.currentTarget.textContent);
  //편집기에 타이핑을 할때 URL을 확인해서 있을 경우 카드를 만든다.
  //state가 변경이 되면 카드가 만들어진다.
  if(!this.state.embedlyUrl&&
      (event.keyCode===32||event.keyCode===13)&&
      checkText){
    this.getForcedState(checkText,event.currentTarget.textContent)
        .then((obj)=>{
          this.setState(obj);
        });
  }else{
    this.getForcedState(undefined,event.currentTarget.textContent)
        .then((obj)=>{
          this.setState(obj);
        });
  }
}
  getCard(embedlyUrl){
    if(embedlyUrl){
      return(
        <div>{embedlyUrl}</div>
      );
    }else{
      return(<div/>);
    }
  }
  hasValue(value){
    if((value && (typeof value) === "string"))
      return (!value)?false:(value.trim()===""?false:true);
    else return false;
  }
  handleSubmit(event){
  let article = Object.assign({}, Article());
  article.user = "Genji";
  article.content = this.state.content;
  article.urls[0].url = this.state.embedlyUrl;
  this.props.handleSyubmit(article);
}
  detectURL(text){
    var urls = text.match(/(https?:\/\/[^\s]+)/g)||text.match(/(www.[^\s]+)/g);
    if(urls){
      if(urls.length>0) return urls[0];
    }
    else return undefined;
  }
  render() {
    return (
      <div className="wrapEditor">
        <Profile isAnonymous={this.props.isAnonymous}/>
        <div className="textEditor">
          <div className="innerEdit"
            contentEditable="true"
            placeholder="글쓰기..."
            onPaste={this.onPaste}
      onKeyUp={this.editorChange}></div>
        <Card cardInfo={this.state.cardInfo}/>
        </div>
        <div className="actionBar">
          <button className="upload"
            disabled={!this.hasValue(this.state.content)}
            onClick={this.handleSubmit}><span>스탠드업!</span></button>
        </div>
      </div>
    );
  }}
export default Editor;
