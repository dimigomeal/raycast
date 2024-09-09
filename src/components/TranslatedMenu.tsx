import { AI, Detail } from "@raycast/api";
import { useAI } from "@raycast/utils";

const languages: Record<string, string> = {
  en: "English",
  jp: "Japanese",
};

export const TranslatedMenu: React.FC<{
  data: string;
  targetLanguage: string;
}> = ({ data, targetLanguage }) => {
  const {
    data: response,
    error,
    isLoading,
  } = useAI(
    `${data}\n\n\nTranslate this markdown to ${languages[targetLanguage]} and respond only with the translated markdown. don't wrap the translated markdown with any other text. title content should be '~ Menu on YYYY-MM-DD'. (e.g. Breakfast Menu on 2022-01-01).`,
    {
      creativity: 0,
      model: AI.Model["OpenAI_GPT4o-mini"],
    },
  );

  return (
    <>
      <Detail isLoading={isLoading} markdown={response ? response : error?.message} />
    </>
  );
};
