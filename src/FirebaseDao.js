import firebase from 'firebase';
/*
*  initializeFirebaseApp
*/
export default class FirebaseDao {
  constructor(config){
    firebase.initializeApp(config);
  }
  //더 이상 입력에 사용하지 않습니다.
  insert(postData){
    return firebase.database().ref().child('posts').push(postData);
  }
  // 수정
  update(key,postData){
    var updates = {};
    updates['/posts/' + key] = postData;
    updates['/user-posts/genji/' + key] = postData;
    return firebase.database().ref().update(updates);
  }
  // 삭제, delete는 예약어 이므로 remove를 사용
  remove(key){
    firebase.database().ref('/posts/').child(key).remove();
    return firebase.database().ref('/user-posts/genji/').child(key).remove();
  }
  //database에 걸린 이벤트를 종료
  off(){
    return firebase.database().ref().off();
  }
  //새로 빈 데이터를 만들고 key값만 return
  newKey(){
    return firebase.database().ref().child('posts').push().key;
  }
  //한개의 글을 얻어 온다.
  getArticle(key){
    return firebase.database().ref('/posts/' + key);
  }
  list(pagesize){
  return firebase.database().ref('/posts/')
          .orderByKey().limitToLast(pagesize);
}
}
