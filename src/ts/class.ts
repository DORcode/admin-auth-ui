class Site {
    name():void {
        console.log('Runoob')
    }
}

const obj = new Site();
obj.name();
// 任意类型 any
let a: any = 4;
a = 'I am who i am';
a = false;
a = 4;
// a.ifItExists();
// a.toFixed();

let array: any[] = [1, false, 'fine'];
console.log(array);


// 数字类型 number
let binary: number = 0b10101;
let octal: number = 0o744;
let dec: number = 6;
let hex: number = 0xf00d;

// 字符串类型 string

let str: string = "Runoob";
let years: number = 5;
// 注意模板的符号
let words: string = `您好，今年是${ str }发布${ years + 1 }周年`;
console.log(words);

// 数组类型
let arr: number[] = [1, 2];
let arr2: Array<number> = [1, 2];
console.log(arr2);

// 元组
let x: [string, number];
x = ['Runoob', 1];
console.log(x);

// 枚举 enum
enum Color {Red, Green, Blue};
let c: Color = Color.Blue;
console.log(c);

// void 
function hello(): void {
    alert("Hello World");
}

// null 表示对象傎缺失

// undefined 用于初始化变量为一个未定义的值

// never 是其他类型（包括null和undefined）的子类型，代表从不会出现的值

let nu: number = 1;
console.log(typeof(nu));


var global_num = 12;//全局变量
class Numbers {
    num_val = 13;  //实例变量
    static sval = 10; // 静态变量

    storeNum(): void {
        var local_num = 14; //局部变量
    }
}

var numb = new Numbers();

console.log(global_num);
console.log(Numbers.sval);
console.log(numb.num_val);

let five: number = 5;
if(five > 0) {
    console.log("数字是正数");
}


if(five > 10) {

} else {
    console.log("数字小于10");
}

if(five > 10) {

} else if(five > 6) {

} else {
    console.log("数字小于等于6");
}

const grade: string = "A";

switch(grade) {
    case "A": {
        console.log("优");
        break;
    }
    case "B": {
        console.log("良");
        break;
    }
    case "C": {
        console.log("及格");
        break;
    }
    default: {
        console.log("不存在");
        break;
    }
}


for(let i=0; i<10; i++) {
    console.log(`第${i}个`);
}
let j: string;
let alph: string[] = ['a', 'b', 'c'];
for(j in alph) {
    console.log(alph[j]);
}

for(let j of alph) {
    console.log(j);
}

alph.forEach((val, idx, array) => {
    console.log(`${val}--${idx}--${array}`);
})

alph.every((val, idx, array) => {
    console.log(`${val}--${idx}--${array}`);
    return true;
})

while(five > 0) {
    console.log(`${five}`);
    five--;
}

function func() {
    console.log("调用函数");
}

func();

function greet():string {
    return "返回";
}

console.log(greet());

function add(x: number, y: number): number {
    return x + y;
}

console.log(add(1, 2));

// 可选参数函数

function build(f: string, l?: string) {
    if(l) {
        return f + " " + l;
    } else {
        return f;
    }
}

console.log("Bob");
console.log("Bob", "Adams");


// 默认参数函数

function calculate(price: number, rate: number = 0.5) {
    console.log(price * rate);
}
calculate(10);
calculate(1000, 0.1);

// 剩余参数

function build2(f: string, ...r: string[]) {
    return f + " " + r.join(" ");
}

console.log(build2("joseph", "Samuel", "Lucas", "MacKinzie"));

function addNumbers(...nums: number[]) {
    let sum: number = 0;
    for(var i=0; i<nums.length; i++) {
        sum += nums[i];
    }
    console.log("和为" + sum);

}

addNumbers(1, 2, 100, 1000, 2000, 25, 32, 923);

// 匿名函数
var msg = function() {
    return 'hello world';
}

console.log(msg());

var res = function(a: number, b: number) {
    return a * b;
}

console.log(res(1.5, 22.5));

// 匿名函数自调用
(function() {
    var x = 'Hello!!';
    console.log(x);
})()

// 构造函数
var myFunction = new Function("a", "b", "return a * b");
var x1 = myFunction(4, 3);
console.log(x1);

// Lambda 函数
var foo = (x: number) => 10 + x;
console.log(foo(10));

var foo1 = (x: number) => {
    x = x + 10;
    console.log(x);
}

foo1(1000);

// 函数重载
function disp(s1:string):void; 
function disp(n1:number,s1:string):void; 
 
function disp(x:any,y?:any):void { 
    console.log(x); 
    console.log(y); 
} 
disp("abc") 
disp(1,"xyz");

// 字符串
let txt = new String("string");
// 通过prototype，可以向对象添加属性和方法

// function employee(id: number, name: string) {
//     this.id = id;
//     this.name = name;
// }

// var emp = new employee(123, "admin");
// employee.prototype.email = "admin@runoob.com";
// console.log(emp.email);

// 联合类型
var val1: string|number;
val1 = 12;
val1 = 'Runoob';

// 接口
interface IPerson {
    firstName: string;
    lastName: string;
    sayHi: ()=>string;
}

var customers:IPerson = {
    firstName: 'Tom',
    lastName: 'Hanks',
    sayHi: ():string => {
        return 'Hi there';
    }
}

console.log(customers.sayHi());


// 类
class Car {
    engine: string;

    constructor(engine:string) {
        this.engine = engine;
    }

    disp(): void {
        console.log("发动机" + this.engine);
    }
}

var car = new Car("Moto 1");
car.disp();

// public 默认
// protected
// private

// 对象












