export function calculateSipProjection(monthly: number, years: number, annualRate: number) {
  const monthlyRate = annualRate / 100 / 12;
  const periods = years * 12;
  const total =
    monthlyRate === 0
      ? monthly * periods
      : monthly * (((1 + monthlyRate) ** periods - 1) / monthlyRate) * (1 + monthlyRate);
  const principal = monthly * periods;
  const gain = total - principal;
  const multiplier = principal === 0 ? 0 : total / principal;
  const yearlyBreakdown = Array.from({ length: years }, (_, index) => {
    const year = index + 1;
    const value =
      monthlyRate === 0
        ? monthly * year * 12
        : monthly * (((1 + monthlyRate) ** (year * 12) - 1) / monthlyRate) * (1 + monthlyRate);
    return {
      year,
      value: Number(value.toFixed(2)),
      cashback: monthly * year * 12
    };
  });

  return {
    total: Number(total.toFixed(2)),
    principal,
    gain: Number(gain.toFixed(2)),
    multiplier: Number(multiplier.toFixed(2)),
    yearlyBreakdown
  };
}
