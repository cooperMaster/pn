let a =12;
let b =7;

let arr = [{a,b},{b,a}];
console.log(arr);

arr.sort((json1,json2)=> json1.a=json2.a);

console.log(arr);
alert(arr[0].a);