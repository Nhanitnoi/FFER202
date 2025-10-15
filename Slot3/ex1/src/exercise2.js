function sum(...nums) {
  return nums
    .map(Number) // chuyển sang số
    .filter(n => !isNaN(n)) // loại bỏ NaN
    .reduce((total, n) => total + n, 0);
}

function avg(...nums) {
  const validNums = nums
    .map(Number)
    .filter(n => !isNaN(n));

  if (validNums.length === 0) return 0;

  const total = validNums.reduce((sum, n) => sum + n, 0);
  return (total / validNums.length).toFixed(2);
}

// Test
console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 'x', 4));     // 5
console.log(avg(1, 2, 3, 4));    // 2.50
console.log(avg());              // 0