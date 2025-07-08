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
  
    if (today > endDate) {
      return 0.0;
    }
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const usedDays = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const remainingDays = totalDays - usedDays;
  
    if (totalDays === 0) {
      return 0.0;
    }
  
    const remainingValue = (remainingDays / totalDays) * totalPrice;
    return Math.round(remainingValue * 100) / 100;
  }
  