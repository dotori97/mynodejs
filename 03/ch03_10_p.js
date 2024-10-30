const fs = require(`fs`);

let posts=[];
for(i=0; i<20; i++){
    posts.push(
        {
            title: `나는 제목이야[${i}]`,
            content: `나는 내용이야[${i}]`,
            author: `홍길동[${i}]`,
            createAt: new Date(),
        }
    )
}


const data = {
   data:posts
}


const jsonStr = JSON.stringify(posts, null, 2);

// 1. posts.push(...) 부분의 타입
// 이 부분에서 생성되는 데이터 타입은 JavaScript 객체입니다. 
//posts 배열에 push 메서드를 통해 추가되는 요소들은 
//{ title, content, author, createAt }라는 객체들로, 
//각각의 키-값 쌍이 포함되어 있어요.

// JavaScript에서 **객체(Object)**는 중괄호 { }로 감싸인 데이터 구조로, 
//키(key)와 값(value) 쌍을 여러 개 포함할 수 있습니다.
// 반면 JSON은 데이터를 주고받기 위한 표준화된 텍스트 형식으로, 
//객체와 비슷한 구조이지만, 문자열로 변환되어야 JSON 형태로 사용할 수 있어요.
// 즉, posts.push(...)의 title, content, author, createAt과 같은 속성들은 
//객체의 속성으로, 이 단계에서는 JavaScript 객체로 생성한 뒤 
//이후 JSON.stringify()를 사용해 JSON 형식의 문자열로 변환하게 됩니다.

// 2. const data = { data: posts } 코드의 data에 대한 설명
// 여기서 const data = { data: posts }는 객체를 생성하는 코드입니다.

// 이 경우, data라는 객체를 만들어서 posts라는 배열을 포함한 속성 data를 할당한 것입니다.
// 최종적으로 data 객체는 { data: [...] } 형태가 되어 data.data 속성에 
//posts 배열이 들어가게 됩니다.
// 따라서, data는 여러 데이터를 담을 수 있는 객체이며, 
//posts는 그 객체의 data 속성에 포함된 배열입니다.

// 3. JSON.stringify에 대한 설명
// JSON.stringify 함수는 JavaScript 객체를 JSON 문자열로 변환해주는 함수입니다.

// JSON 형식으로 변환하는 이유는, 데이터가 문자열 형태로 변환되기 때문에 
//파일로 저장하거나 다른 시스템으로 전달하기 쉽게 만들기 위해서입니다.
// 처음부터 JSON 형태로 입력하지 않는 이유는, JSON은 단순히 데이터 포맷에 불과해 
//로직을 처리하거나 조작하기에는 JavaScript 객체 형태가 더 유용하기 때문입니다.
// JSON.stringify(data, null, 2); 코드에서:

// 첫 번째 인자 data는 변환할 객체입니다.
// 두 번째 인자인 null은 replacer로, 특정 속성을 필터링하거나 변환할 때 
//사용하는 인자입니다. null을 넣으면 모든 속성이 포함됩니다.
// 세 번째 인자는 들여쓰기 간격으로, 숫자 2는 변환된 JSON 문자열의 각 계층을 
// 두 칸씩 들여쓰기 합니다.
// replacer 예시: JSON.stringify(data, (key, value) => key === "author" ? undefined : value, 2);

// 이 예시에서 replacer 함수는 author 속성이 있을 경우 
//값을 undefined로 바꾸어 출력에서 제외하게 됩니다.

// { data: posts } 사용: data 속성을 사용해 데이터를 감싸는 구조가 만들어집니다. 
//특정 키를 기준으로 데이터를 포함해 관리하고 싶다면 유용합니다.
// posts 직접 사용: 중간에 감싸는 레이어 없이 배열만 있는 JSON이 생성되므로, 
//간단한 구조로 사용할 수 있습니다.
// 어느 방식을 사용할지는 JSON을 어디에, 어떻게 사용할지에 따라 달라지며, 
//특히 REST API 응답 형식에서는 데이터를 감싸는 객체를 사용하는 방식이 많이 사용됩니다.

// JSON.stringify(posts, null, 2)로 JSON 문자열로 변환했을 경우, 
//title에 직접 접근하려면 문자열을 객체 배열로 다시 파싱해야 합니다. 
//JSON 문자열에서는 배열 요소에 바로 접근할 수 없기 때문에, 
//JSON 문자열을 다시 JavaScript 객체로 변환하는 과정이 필요합니다.

// 이 과정을 위해 JSON.parse() 함수를 사용해 문자열을 배열로 되돌린 후 접근할 수 있습니다.

// 접근 과정 예시
// JSON 문자열로 변환: JSON.stringify(posts, null, 2)
// 변환된 JSON 문자열을 다시 객체 배열로 파싱: JSON.parse(jsonStr)
// 아래와 같이 작성할 수 있습니다.

// javascript
// 코드 복사
// const jsonStr = JSON.stringify(posts, null, 2); // JSON 문자열로 변환
// const parsedPosts = JSON.parse(jsonStr);        // 다시 객체 배열로 파싱

// console.log(parsedPosts[0].title);              // 첫 번째 객체의 title 접근
// 이제 parsedPosts[0].title을 통해 첫 번째 객체의 title 값에 접근할 수 있습니다.