import * as FileSystem from "expo-file-system";
import { getUUID } from "./getID";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { write, read } from "./store";

const images = FileSystem.documentDirectory + "images/";

export async function appStart() {
  const dirInfo = await FileSystem.getInfoAsync(images);
  if (!dirInfo.exists) {
    console.log("Image directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(images, { intermediates: true });
  }

  let uuid = await getUUID();

  console.log("UUID: " + uuid);
}
