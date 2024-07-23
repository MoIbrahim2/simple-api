x = [
  { id: 1, name: 'mohamed' },
  { id: 2, name: 'ahmed' },
];
v = { name: 'khaled' };
id = 1;
x = x.map((el) => {
  if (el.id === id) return { ...el, ...v };
});
console.log(x);
