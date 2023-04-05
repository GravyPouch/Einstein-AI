import * as FileSystem from "expo-file-system";
import { getUUID } from "./getID";

const apiURL = "http://10.0.0.95:3000/";

export async function postImageToAPI(imageFile) {
  const id = await getUUID();

  let formData = new FormData();

  let filename = imageFile.split("/").pop();

  formData.append("photo", {
    uri: imageFile,
    name: filename,
    type: "image/jpg",
  });

  formData.append("id", id);

  const answer = await fetch(apiURL + "multipart-upload", {
    method: "POST",
    body: formData,
    headers: {
      "content-type": "multipart/form-data",
    },
  });

  const jsonData = await answer.json();

  return jsonData.answer;
}

export async function postChatToAPI(chat) {
  const id = await getUUID();

  const answer = await fetch(apiURL + "chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      chat: chat,
    }),
  });

  const jsonData = await answer.json();

  return jsonData.answer;
}
