function sum(a: number, b: number): number {
    return a + b;
}

function multiply(a: number, b: number): number {
    return a * b;
}

function isEven(num: number): boolean {
    return num % 2 === 0;
}

function isOdd(num: number): boolean {
    return !isEven(num);
}

function greet(name: string): string {
    return `Hello, ${name}!`;
}

const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens: number[] = numbers.filter(isEven);
const odds: number[] = numbers.filter(isOdd);
const doubled: number[] = numbers.map((n: number) => multiply(n, 2));

console.log(evens);
console.log(odds);
console.log(doubled);

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    greet() {
        console.log(greet(this.firstName));
    }
};

person.greet();

function updateAge(p: Person, newAge: number): void {
    p.age = newAge;
}

updateAge(person, 31);
console.log(person);

class Animal {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    speak(): void {
        console.log(`${this.name} makes a sound.`);
    }

    getAge(): number {
        return this.age;
    }

    setAge(age): void {
        this.age = age;
    }
}

class Dog extends Animal {
    speak(): void {
        console.log(`${this.name} barks.`);
    }
}

const dog: Dog = new Dog("Buddy", 3);
dog.speak();
dog.setAge(4);
console.log(dog.getAge());

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncOperation(): Promise<void> {
    console.log("Starting async operation...");

    await delay(100);

    console.log("Async operation finished.");
}

asyncOperation();

interface Item {
    id: number;
    name: string;
    price: number;
}

const items: Item[] = [
    { id: 1, name: "item1", price: 100 },
    { id: 2, name: "item2", price: 200 },
    { id: 3, name: "item3", price: 300 },
];

const totalCost: number = items.reduce((total: number, item: Item) => total + item.price, 0);
console.log(`Total cost: ${totalCost}`);

const itemNames: string[] = items.map(item: Item => item.name);
console.log(itemNames);

function add(x: number): (y: number) => number {
    return function(y: number): number {
        return x + y;
    };
}

const add5: (y: number) => number = add(5);
console.log(add5(10));

function processArray(arr: number[], fn: (n: number) => number): number[] {
    return arr.map(fn);
}

const squaredNumbers: number[] = processArray(numbers, (n: number) => n * n);
console.log(squaredNumbers);

function factorial(n: number): number {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

console.log(factorial(5));

interface Person {
    firstName: string;
    lastName: string
}

const { firstName, lastName }: Person = person;
console.log(`First Name: ${firstName}, Last Name: ${lastName}`);

const extendedPerson: Person & { location: string } = { ...person, location: "Earth" };
console.log(extendedPerson);

function printAll(...args: number[]): void {
    args.forEach(arg => console.log(arg));
}

printAll(1, 2, 3, 4, 5);

function greetUser(name: string = "Guest"): void {
    console.log(`Hello, ${name}`);
}

greetUser();
greetUser("Alice");

const templateLiteralExample: string = `Sum of 2 and 3 is ${sum(2, 3)}`;
console.log(templateLiteralExample);

const [first, second, ...rest]: number[] = numbers;
console.log(first);
console.log(second);
console.log(rest);

const isAdult: boolean | string = person.age > 18 || "Not an adult";
console.log(isAdult);

const user: string | null = null;
const defaultUser: string = user ?? "Anonymous";
console.log(defaultUser);

const accessLevel: string = person.age > 18 ? "Adult" : "Child";
console.log(accessLevel);

function getDay(day: number): string {
    switch(day) {
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        default: return "Invalid day";
    }
}

console.log(getDay(1));

for (let i: number = 0; i < 5; i++) {
    console.log(i);
}

let count: number = 0;
while (count < 5) {
    console.log(count);
    count++;
}

let num: number = 0;
do {
    console.log(num);
    num++;
} while (num < 5);

const addArrow = (a: number, b: number) => a + b;
console.log(addArrow(3, 4));

const jsonData: string = JSON.stringify(person);
console.log(jsonData);

const parsedData: Person = JSON.parse(jsonData);
console.log(parsedData);