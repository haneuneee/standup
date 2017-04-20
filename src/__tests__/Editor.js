//Editor.js
import Editor from '../Editor';
let ed = new Editor;
it('detect URL ', () => {
  expect(ed.detectURL("my www.devpools.kr ")).toEqual("www.devpools.kr");
});
it('detect URL 1', () => {
  expect(ed.detectURL("my www.devpools.kr "))
        .toEqual("www.devpools.kr");
});
it('detect URL 2', () => {
  expect(
    ed.detectURL("http://www.devpools.kr는 www.github.com이 궁금하다"))
    .toEqual("http://www.devpools.kr");
});
it('detect URL 3', () => {
  expect(
    ed.detectURL("www.github.com은 http://www.devpools.kr이 전문가"))
     .toEqual("http://www.devpools.kr");
});
