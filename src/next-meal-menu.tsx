import TodayMenu from "./components/TodayMenu";

export default function Command() {

  const targetDate = new Date();
  const totalMinutes = targetDate.getHours() * 60 + targetDate.getMinutes();

  // 00:00 ~ 08:00 -> breakfast (0 - 480)
  // 08:00 ~ 13:30 -> lunch (480 - 810)
  // 13:30 ~ 19:30 -> dinner (810 - 1170)
  // else -> next day breakfast (1170 - 1440)

  const mealType: 'breakfast' | 'lunch' | 'dinner' = 
    totalMinutes < 480 ? 'breakfast' :
    totalMinutes < 810 ? 'lunch' :
    totalMinutes < 1170 ? 'dinner' : 'breakfast';

  if (totalMinutes >= 1170) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  return <TodayMenu type={mealType} date={targetDate} />;
}
