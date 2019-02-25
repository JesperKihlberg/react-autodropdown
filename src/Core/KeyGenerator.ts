
export function getRandomString() {
  const x = 2147483648;
  return (
    Math.floor(Math.random() * x).toString(36) +
    Math.abs(Math.floor(Math.random() * x) ^ new Date().getUTCMilliseconds()).toString(36)
  );
}
