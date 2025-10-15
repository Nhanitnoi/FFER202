const ages = [33, 12, 20, 16];

const [first, , third = 0, ...restAges] = ages;

console.log("first:", first);       // 33
console.log("third:", third);       // 20
console.log("restAges:", restAges); // [16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32]
