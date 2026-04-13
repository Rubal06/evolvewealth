interface NudgeTransactionInput {
  merchantName: string;
  merchantCategory: string;
  amount: number;
  weeklyFoodSpend?: number;
  weeklyFoodBudget?: number;
  monthlyCategorySpend?: number;
  monthlyCategoryBudget?: number;
  sameMerchantVisitsThisWeek?: number;
}

export function evaluateNudge(transaction: NudgeTransactionInput) {
  const weeklyFoodSpend = transaction.weeklyFoodSpend ?? 720;
  const weeklyFoodBudget = transaction.weeklyFoodBudget ?? 400;
  const monthlyCategorySpend = transaction.monthlyCategorySpend ?? 2300;
  const monthlyCategoryBudget = transaction.monthlyCategoryBudget ?? 1600;
  const visits = transaction.sameMerchantVisitsThisWeek ?? 4;

  let shouldNudge = false;
  let message = "Spending pattern is healthy.";

  if (transaction.merchantCategory === "food_delivery" && weeklyFoodSpend > weeklyFoodBudget * 1.5) {
    shouldNudge = true;
    message = `You've already spent ${Math.round((weeklyFoodSpend / weeklyFoodBudget) * 100)}% of your food budget this week.`;
  } else if (transaction.amount > 300 && monthlyCategorySpend > monthlyCategoryBudget) {
    shouldNudge = true;
    message = "This category is already over budget for the month. Redirecting this spend could reset your streak.";
  } else if (visits > 3) {
    shouldNudge = true;
    message = `You've hit ${transaction.merchantName} ${visits} times this week. One skip can fund your next 2 days of investing.`;
  }

  const investmentSuggestion = Math.max(50, Math.round(transaction.amount * 0.35));
  const byYear = 2029;
  const projectedValue = Number((investmentSuggestion * 2.4).toFixed(0));

  return {
    shouldNudge,
    message,
    projectedValue,
    byYear,
    investmentSuggestion
  };
}
