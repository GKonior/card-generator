const oneFeet = 0.3048;

const convertFeetToMeters = (value: number) => {
  const result = value * oneFeet;
  return Math.round(result * 10) / 10;
};

export default convertFeetToMeters;
