let users = [
  { id: 1, name: 'ID', age: 36 },
  { id: 2, name: 'BJ', age: 32 },
  { id: 3, name: 'JM', age: 31 },
  { id: 4, name: 'MG', age: 27 },
  { id: 5, name: 'LE', age: 25 },
  { id: 6, name: 'KS', age: 26 },
  { id: 7, name: 'OE', age: 31 },
  { id: 8, name: 'PQ', age: 23 }
];

// 1. 수집하기 - map

// 1. values

function _values() {
  return users.map( user => user )
}

// console.log(_values(users[0]));
// 2. pluck

function _pluck(users, key) {
  return users.map(obj => { return obj[key] }); 
}

// console.log(_pluck(users, 'age'));
// console.log(_pluck(users, 'name'));
// console.log(_pluck(users, 'id'));

// 2. 거르기 - filter

users.filter()

// 1. reject 