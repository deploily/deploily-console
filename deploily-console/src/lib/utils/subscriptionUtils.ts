
export function calculateRemainingSubscriptionValue(oldSubscription: {
  price: number;
  start_date: string | Date;
  duration_month: number;
}): number {
  const totalPrice = oldSubscription.price;
  const startDate = new Date(oldSubscription.start_date);
  const durationMonth = oldSubscription.duration_month;

  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + durationMonth);

  const today = new Date();

  // If subscription has expired, no remaining value
  if (today >= endDate) {
    return 0.0;
  }

  // If subscription hasn't started yet, full value remains
  if (today <= startDate) {
    return Math.round(totalPrice * 100) / 100;
  }

  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const usedDays = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const remainingDays = Math.max(0, totalDays - usedDays);

  if (totalDays === 0) {
    return 0.0;
  }

  const remainingValue = (remainingDays / totalDays) * totalPrice;

  // Fixed: Return properly rounded value (was multiplying by 10 instead of 100)
  return Math.round(remainingValue * 100) / 100;
}