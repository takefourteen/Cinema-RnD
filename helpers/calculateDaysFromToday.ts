export const calculateDaysFromToday = (targetDate: string): number => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  const currentDate = new Date();
  const providedDate = new Date(targetDate);

  // Calculate the difference in milliseconds
  const diffInMilliseconds = providedDate.getTime() - currentDate.getTime();

  // Convert the difference to days and adjust the sign based on the comparison
  const diffInDays = Math.round(diffInMilliseconds / oneDay);

  return diffInDays;
};
