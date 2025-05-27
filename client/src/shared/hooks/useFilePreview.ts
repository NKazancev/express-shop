import { useEffect, useState } from 'react';

const useFilePreview = (data: FileList | string) => {
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      let result = [];

      if (data.length === 1) {
        const file = data[0] as File;
        const url = URL.createObjectURL(file);
        result.push(url);
        setImagesUrl(result);
      }
      if (data.length > 1) {
        for (let i = 0; i < data.length; i++) {
          const file = data[i] as File;
          const url = URL.createObjectURL(file);
          result.push(url);
          setImagesUrl(result);
        }
      }
    }
  }, [data]);

  return imagesUrl;
};

export default useFilePreview;
