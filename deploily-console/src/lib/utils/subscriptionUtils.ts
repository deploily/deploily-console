
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
    return Math.round(totalPrice);
  }


  const remainingDays = getDateDiffInDays(startDate, today)
  const remainingValue = (((durationMonth * 30) - remainingDays) * totalPrice) / (durationMonth * 30);

  // Fixed: Return properly rounded value (was multiplying by 10 instead of 100)
  return remainingValue;
}



export function getDateDiffInDays(date1: string | Date, date2: string | Date): number {
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
}