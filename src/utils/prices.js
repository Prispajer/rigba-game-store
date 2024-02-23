export default function generateRandomValue() {
  const minValue = 0;
  const maxValue = 300;
  const precision = 100;

  const randomValue =
    Math.floor(Math.random() * (maxValue - minValue + 1) * precision) /
    precision;

  return randomValue;
}
