import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
  const [imgUrl, setImgUrl] = useState(null);

  const showToast = useShowToast();

  const handleImgChange = (Event) => {
    const file = Event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      showToast("Invalid file type.", "Please select an image file", "error");
      setImgUrl(null);
    }

    console.log(file);
  };
  console.log(imgUrl);
  return { handleImgChange, imgUrl, setImgUrl };
};

export default usePreviewImg;
