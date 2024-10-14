export const useDayInfo = () => {
  const today = new Date();
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(today.getMonth() - 6);
  const formattedToday = today.toISOString().split('T')[0];
  const formattedSixMonthsAgo = sixMonthsAgo.toISOString().split('T')[0];

  return { formattedToday, formattedSixMonthsAgo };
};
