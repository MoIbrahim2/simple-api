const x = { id: { gte: '4' } };
Object.keys(x).forEach((key) => {
  const value = x[key];
  console.log(
    Object.keys(value).some((key) => /\b(gte|gt|lte|lt)\b/.test(key)),
  );
});

console.log(x['id']);
