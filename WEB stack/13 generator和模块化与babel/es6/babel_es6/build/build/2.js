"use strict";

var a = 12;
var b = 7;

var arr = [{ a: a, b: b }, { b: b, a: a }];
console.log(arr);

arr.sort(function (json1, json2) {
  return json1.a = json2.a;
});

console.log(arr);
alert(arr[0].a);