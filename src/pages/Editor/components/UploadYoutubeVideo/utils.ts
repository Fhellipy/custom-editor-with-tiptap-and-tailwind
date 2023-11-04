export const YOUTUBE_REGEX =
  /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be)(?!.*\/channel\/)(?!\/@)(.+)?$/;
export const YOUTUBE_REGEX_GLOBAL =
  /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be)(?!.*\/channel\/)(?!\/@)(.+)?$/g;

export const isValidYoutubeUrl = (url: string) => {
  return url.match(YOUTUBE_REGEX);
};

export function createYoutubeEmbedUrl(url: string): string {
  if (typeof url === "string" && url.trim().length > 0) {
    try {
      const urlObject = new URL(url);
      const baseYtEmbedUrl = "https://www.youtube.com/embed";

      const videoId =
        urlObject.searchParams.get("v") ?? urlObject.pathname.split("/").pop();

      const src = `${baseYtEmbedUrl}/${videoId}`;

      return src;
    } catch (error) {
      console.error(error);
      return "";
    }
  } else {
    return "";
  }
}
