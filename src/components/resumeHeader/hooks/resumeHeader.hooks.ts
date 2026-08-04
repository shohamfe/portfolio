import { useState } from "react";

/** Reads the response as a stream to track real progress, not a guess. */
export const useCvDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);

  const download = async (url: string, filename: string) => {
    setIsDownloading(true);
    setProgress(null);

    try {
      const response = await fetch(url);
      const total = Number(response.headers.get("content-length")) || 0;
      const reader = response.body?.getReader();
      const chunks: Uint8Array<ArrayBuffer>[] = [];
      let received = 0;

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          chunks.push(new Uint8Array(value));
          received += value.length;

          if (total) setProgress(received / total);
        }
      }

      const blob = new Blob(chunks);
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      link.click();

      URL.revokeObjectURL(objectUrl);
    } catch {
      window.location.href = url;
    } finally {
      setIsDownloading(false);
      setProgress(null);
    }
  };

  return { isDownloading, progress, download };
};
