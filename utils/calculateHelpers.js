export function calculateTraitValues(responseValues) {
  const average = responseValues.reduce((sum, val) => sum + val, 0) / responseValues.length;
  const endValue = Math.round(((average + 3) / 6) * 100); // Map -3 to 3 onto 0 to 100
  const startValue = 100 - endValue;
  return { startValue, endValue };
}
