import * as FileSystem from "expo-file-system";
import { getUUID } from "./getID";

const apiURL = "http://10.0.0.95:3000/binary-upload";

export async function postImageToAPI(imageFile) {
  const id = await getUUID();

  let formData = new FormData();

  let filename = imageFile.split("/").pop();

  formData.append("file", {
    uri: imageFile,
    name: filename,
    type: "image/jpeg",
  });

  const answer = await fetch(apiURL, {
    method: "POST",
    body: formData,
    headers: {
      "content-type": "multipart/form-data",
    },
  });

  const jsonData = await answer.json();

  return jsonData.answer;
}
