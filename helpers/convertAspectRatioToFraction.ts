export function convertAspectRatioToFraction(aspectRatio: number) {
  // Set a maximum denominator for a reasonable approximation
  const maxDenominator = 1000;

  // Initialize variables for the best approximation
  let bestNumerator = 0;
  let bestDenominator = 1;
  let closestError = Math.abs(aspectRatio - bestNumerator / bestDenominator);

  // Iterate through possible denominators
  for (let denominator = 1; denominator <= maxDenominator; denominator++) {
    const numerator = Math.round(aspectRatio * denominator);
    const error = Math.abs(aspectRatio - numerator / denominator);

    // If this is a better approximation, update the best values
    if (error < closestError) {
      closestError = error;
      bestNumerator = numerator;
      bestDenominator = denominator;
    }
  }

  return {
    numerator: bestNumerator,
    denominator: bestDenominator,
  }
}
