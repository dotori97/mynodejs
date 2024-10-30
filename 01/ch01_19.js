let arr=[1,2,3,4,5,6,7,8,9,10];

const arr2=arr.filter((x)=>{   
    return x % 2 == 0;  //조건에 맞는 요소만 반환
});

console.log(arr2);

const arr3 = arr.filter(x=>x%2==0);
console.log(arr3);
