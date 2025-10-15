const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 }
];

// 1. Tạo company0New từ companies[0] với start += 1, không làm đổi companies[0]
const company0New = { ...companies[0], start: companies[0].start + 1 };

console.log("companies[0]:", companies[0]);
console.log("company0New:", company0New);

// 2. Hàm concatAll dùng rest để nhận nhiều mảng
function concatAll(...arrays) {
  return [].concat(...arrays); // hoặc: return arrays.flat();
}

// 3. Test concatAll
console.log(concatAll([1, 2], [3], [4, 5])); 
