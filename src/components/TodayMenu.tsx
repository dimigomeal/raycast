import { Detail, getPreferenceValues } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { parseMenuToMarkdown } from "../func/parseMarkdown";
import { TranslatedMenu } from "./TranslatedMenu";

interface Preferences {
  language: string;
}

const translatedLanguages = ["en", "jp"];

export const TodayMenu: React.FC<{
  type: "breakfast" | "lunch" | "dinner";
  date?: Date;
}> = ({ type, date = new Date() }) => {
  const preferences = getPreferenceValues<Preferences>();
  const targetDate: string = date.toISOString().split("T")[0];
  const { isLoading, data, error } = useFetch<{
    breakfast: string;
    lunch: string;
    dinner: string;
  }>(`https://api.xn--299a1v27nvthhjj.com/meal/${targetDate}`, {
    keepPreviousData: false,
  });

  return (
    <>
      {!translatedLanguages.includes(preferences.language) && data && (
        <Detail
          isLoading={isLoading}
          markdown={
            data
              ? `# ${targetDate} ${type === "breakfast" ? "아침" : type === "lunch" ? "점심" : "저녁"}\n` +
                parseMenuToMarkdown(data[type])
              : error?.message
          }
        />
      )}
      {translatedLanguages.includes(preferences.language) && data && (
        <TranslatedMenu
          data={
            data
              ? `# ${targetDate} ${type === "breakfast" ? "아침" : type === "lunch" ? "점심" : "저녁"}\n` +
                parseMenuToMarkdown(data[type])
              : String(error?.message)
          }
          targetLanguage={preferences.language}
        />
      )}
      {error && <Detail markdown={error.message} />}
    </>
  );
};

export default TodayMenu;
