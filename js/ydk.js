/*

Map - 키와 값을 열결한다 > 객체와 비슷 
Set - 중복을 허용하지 않는 점 제외 배열과 비슷

Map?? 

객체 의 단점)
1. 프로토타입 체인 때문에 의도하지 않은 연결이 생길 수 있음
2. 객체 안에 열결된 키와 값이 몇 개나 되는지 쉽게 알아내기 힘듬
3. 키는 반드시 심볼이나 문자열여야 하므로 객체를 키로 써서 값과 연결할 수없음
4. 객체는 프로퍼티 순서를 전혀 보장하지 않는다.

Map 객체는 위 결함을 모두 해결함!!


*/


// [btn, btnName] 각 튜플을 각각의 키/값 으로 분리하기 위해 구문 사용: 배열 분해
/* 
- Closer - 
함수가 다른 범위에서 실행되는 경우에도
함수가 범위 외부에서 변수를 기억하고 계속 엑세스함
*/

function greeting( msg ) {
  return function who( name ) {
    console.log(`${ msg }, ${ name } !`);
  };
}

let hello = greeting("Hello");
let howdy = greeting("Howdy");

hello("Kyle");
howdy("Grant");

function Counter ( step = 1 ) {
  let count = 0;
  return function incrementCount () {
    count = count + step;
    return count;
  };
}

let incBy1 = Counter(1);
let incBy3 = Counter(3);

function getSomeData ( url ) {
  ajax ( url, function onResponse ( resp ) {
    console.log( 
      `Response(from ${ url })) : ${ resp }`
    );
  } );
}

getSomeData("https://some.url/wherever");
// Response ( https://some.url/wherever 에서 ) : ...

for ( let [idx, btn] of buttons.entries() ) {
  btn.addEventListener("click", function onClick () {
    console.log(`Click on button( ${ idx } )!`);
  }) ;
}



/* Global EC In! 
Classroom => Function Object
- 전역변수 var commit 
- Class 의 teacher = Kyle
*/
function Classroom ( teacher ) {
  /* Classroom EC In!
   argument = {}
   Study = Function Object
  */
  return function Study() {
    /* Study EC In! 
      argument = { subject }
    */
    console.log( 
      // 여기서 this는 Study EC의 객체를 참조한다.
        ` ${ teacher } Say Study ${ this.subject } `
     );
  };
  // Study EC Out! && Classroom EC In!
}
// Classroom EC Out! && Global EC In!

var commit = Class("Kyle") ;