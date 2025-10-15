const people = [
  { name: 'Jack', age: 50 },
  { name: 'Michael', age: 9 },
  { name: 'John', age: 40 },
  { name: 'Ann', age: 19 },
  { name: 'Elisabeth', age: 16 },
  { name: 'Tom', age: 13 }
];

const teens = people
  .filter(p => p.age >= 13 && p.age <= 19)       // lọc teenager
  .map(p => `${p.name} (${p.age})`);             // chuyển sang chuỗi "Name (Age)"

teens.forEach(t => console.log(t));
