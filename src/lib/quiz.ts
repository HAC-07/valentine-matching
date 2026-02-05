export const optionLabels = ["A", "B", "C", "D"] as const;

export const scoreMessage = (percentage: number) => {
  if (percentage > 80) {
    return "You know them scary well 👀";
  }
  if (percentage >= 50) {
    return "You pass the vibe check 😌";
  }
  return "Do you even talk?? 😭";
};

export const formatPercentage = (value: number) =>
  Math.round(value * 10) / 10;

