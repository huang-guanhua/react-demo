const a = 10;
const obj = {a:1,b:2};
(function test(num){
    console.log(num + a);
    console.log(JSON.stringify(obj));
})(66666)