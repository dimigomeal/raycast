import { Detail } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { parseMenuToMarkdown } from "../func/parseMarkdown";

export const TodayMenu: React.FC<{
  type: "breakfast" | "lunch" | "dinner";
  date?: Date;
}> = ({ type, date = new Date() }) => {
  // YYYY-MM-DD
  const targetDate: string = date.toISOString().split("T")[0];
  const { isLoading, data, error } = useFetch<{
    breakfast: string;
    lunch: string;
    dinner: string;
  }>(`https://api.xn--299a1v27nvthhjj.com/meal/${targetDate}`);

  return (
    <>
      {data && (
        <Detail
          isLoading={isLoading}
          markdown={
            `# ${targetDate} ${type === "breakfast" ? "아침" : type === "lunch" ? "점심" : "저녁"}\n` +
            parseMenuToMarkdown(data[type])
          }
        />
      )}
      {error && <Detail isLoading={isLoading} markdown={error.message} />}
    </>
  );
};

export default TodayMenu;
