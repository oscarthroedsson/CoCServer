export function calculateRatio(factorOne: number, factorTwo: number): number {
  let ratio = factorOne / factorTwo;
  if (isNaN(ratio)) return 0;

  if (factorOne === 0) return 0.0;

  if (ratio === Infinity) {
    if (factorOne > 0 && factorTwo === 0) {
      return factorOne;
    }
  }

  // Avrunda till två decimaler
  ratio = parseFloat(ratio.toFixed(2));

  return ratio;
}
