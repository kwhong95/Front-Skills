# You Don't Know JS Yet!
## Chap 1. What is Scope?
프로그래밍 언어의 가장 기본적 패러다임은 변수에 값을 저장하고 나중에 해당 값을  
검색하거나 수정할 수 있는 기능이다. 이것이 프로그램 상태를 제공하는 것이다.  
> Scope란?  
특정한 위치에 변수를 저장하고 나중에 해당 변수를 찾기 위해 잘 정의된 규칙의  
집합이 있고 이 규칙의 세트를 Scope라고 한다.

### 1.컴파일러 이론
> 프로그램은 일반적으로 실행되기 전에 '컴파일'이라는 세단계를 거친다.

1. Tokenizing / Lexing : 문자열을 토큰이라고 하는 덩어리로 나눈다.
- Token : 상태 비저장 또는 상태 저장 방식으로 식별 

```js
var a = 2; 
// token
var, a, = , 2, ; + "공백"
```
2. 구문 분석 : Token Stream(Array)를 가져와 프로그램 문법적 구조를 집합으로  
나타내는 중첩 요소 트리(AST)로 변환
```js
var a = 2; // 최상위 노드 Variable Declaration

a // Identifier
2 // Assignment Expression 의 Numeric Literal
```
3. 코드 생성 : AST를 가져와 실행 가능한 코드로 바꾸는 프로세스

> JS의 모든 조각은 실행되기 전에 컴파일되어야 한다고 가정했을 때,  
JS 컴파일러는 프로그램을 가져와 먼저 컴파일 한 다음 일반적으로 즉시 실행할 준비를 한다.


### 2. 스코프의 이해
#### 2.1 캐스트 
> 프로그램을 처리하기 위해 상호 작용하는 캐릭터들
1. 엔진 : JS 프로그램의 시작부터 끝까지 컴파일 및 실행을 담당
2. 컴파일러 : 엔진의 친구중 하나; 파싱 및 코드 생성의 작업을 처리
3. 스코프 : 엔진의 또 다른 친구; 선언된 모든 식별자(변수)의 조회 목록을 수집 및  
유지 관리하며 현재 실행중인 코드에서 이런 식별자에 엑세스 방법에 엄격한 규칙집합을 적용

#### 2.2 Back & Front
> var a = 2; 를 예시로 한 컴파일러 진행 방향
1. `var a` 가 발생하면 컴파일러는 해당 특정 범위 컬렉션에 대한 변수가 이미 있는지 확인하기 위해 Scope 에 `a`를 요청하고 없다면 무시하고 계속 진행한다. 있다면 새 변수를 선언하도록 Scope에 요청한다.
2. 다음 컴파일러는 엔진이 나중에 실행할 코드를 생성하여 `a = 2`를 할당하고 실행되는 코드는 먼저 현재 범위 컬렉션에 엑세스 가능한 변수가 있는지 Scope에 묻는다.  
있다면 해당 변수를 사용하고 없다면 다른 곳을 찾는다.

> 요약 : 변수 할당에 대해 두가지 작업시 수행되고 첫째, 컴파일러는 변수를 선언하고  
두 번째로 실행시 엔진은 Scope에서 변수를 조회하고 찾은 경우 할당한다.

#### 2.3 컴파일러 용어 
* 측면 할당 작업
 * LHS : 할당 대상
 * RHS : 할당 소스

```js
function foo(a) {
  console.log(a);
}

foo( 2 ); 
```
- LHS 조회 : a = 2값이 매개 변수에 할당. (암묵적으로) parameter에 할당하기 위함이다.
- RHS 조회 : a의 값에 대한 `console.log`를 실행하기 위함이고 `console` 객체에 대한 RHS 조회이며 `log`라는 메서드가 있는지 확인하기 위해 발생함
- a변수에 2 값을 할당함에 RHS 조회를 통해 NET Framework로 전달하는 `LHS/RHS 교환` 개념이 있다.

> 중요한 차이점은 컴파일러가 코드 생성 중에 선언과 값 정의를 모두 처리하므로 엔진이 `foo` 코드를 실행할 때 함수 값을 '할당'하는데 필요한 처리가 없다. 따라서, 함수 선언을 LHS 조회 할당으로 생각하는 것은 적절치 않음

#### 2.4 엔진 / 스코프 대화
> Engine : Scope야 RHS 참조에 `foo` 라고 있던데 들어봤어?  
> Scope : 네. 컴파일러는 그것을 1초전에 선언헸어요, 그는 함수이고 여기 있습니다.  
> Engine : 좋아! 고마워!  

> Engine : Scope야 LHS에 a라는 레퍼런스가 있는데 들어봤어?  
> Scope: 네. 컴파일러는 `foo()`함수의 매개변수로 선언했어요, 여기 있습니다.  
> Engine : 다시 한번 고마워~ 이제 a에 2를 할당해야겠네.  

> Engine : Scope야 귀찮게 해서 미안한데 RHS에 대한 조회가 필요해. console이라고 들어봤어?  
> Scope : 괜찮아요, 이건 내 일이에요. 여기 console이 있습니다. 그는 내장되어 있어요.  
> Engine : 완벽해! `log()`도 찾았다. 이건 함수야.  
> Engine : Scope야 a의 RHS 참조좀 도와줄래? 기억나는것 같은데 다시 한번 확인하려고  
> Scope : 그게 맞습니다. 변하지 않았구요, 여기 있습니다!  
> Engine : 좋아! a의 값을 전달하고 log(a)에 2를 전개해야겠다.  

#### 2.5 Quiz
```js
function foo (a) {
  var b = a ;
  return a + b ;
}

var c = foo( 2 ); 
```

1. 모든 LHS 조회 (3) : 
- `c = ..` 
- `a = 2`(암시적 매개 변수 할당)
- `b = ..`
2. 모든 RHS 조회 (4) :
- `foo(2..)`
-  `= a;`
- `a + ..`
- `.. + b`

### 3. 중첩된 Scope
일반적으로 Scope는 여러 개 존재할 수 있다.
블록 또는 함수가 다른 블록 또는 함수 내에 중첩된 것처럼 Scope는 다른 범위 내에 중첩된다.
따라서 해당 Scope에서 변수를 찾을 수 없는 경우 Engine은 발견 될 때까지 가장 바깥쪽(Global Scope)까지 찾는다.
```js
function foo (a) {
  console.log( a + b );
}

var b = 2 ;
foo( 2 ); // 4
```

> Engine : Scope(foo)야 b라고 들어본적 있어?(RHS 참조)
> Scope(foo) : 아니요, 모르겠습니다.
> Engine : Scope(Global)야 b라고 들어본적 있어?(RHS 참조)
> Scope(Global) : 네 여기 있습니다.

### 4. 오류
> LHS & RHS 왜 중요 한가?  
이 두가지 유형의 조회는 변수가 아직 선언되지 않은 상황에서 다르게 작동하기 떄문이다.

```js
function foo( a ) {
  console.log( a + b );
  b = a ;
}

foo( 2 );
```
- RHS 조회인 b가 처음 발생하면 찾을 수 없다. (선언 되지 않은 변수)
- RHS 조회가 중첩된 Scope 어디에서나 변수를 찾지 못하면 `Reference Error`를 발생한다.  
- 반대로 엔진이 LHS 조회를 수행하고 Global Scope까지 찾지 못한 경우 Scope 전역 범위에 해당 이름의 새 변수를 만들고 엔진에게 다시 전달한다.  
- 또한, RHS 조회를 위한 변수를 찾았지만, 함수가 아닌 값을 함수로 실행하거나, 속성 참조 불가능한 `null` 또는 `undefined`으로 시도하는 경우 `TypeError`를 발생한다.