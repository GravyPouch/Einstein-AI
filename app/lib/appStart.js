import * as FileSystem from "expo-file-system";
import { getUUID } from "./getID";
import AsyncStorage from "@react-native-async-storage/async-storage";

const images = FileSystem.documentDirectory + "images/";

export async function appStart() {
  const dirInfo = await FileSystem.getInfoAsync(images);
  if (!dirInfo.exists) {
    console.log("Image directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(images, { intermediates: true });
  }

  let uuid = await getUUID();

  console.log("UUID: " + uuid);

  AsyncStorage.getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      // read key error
    }

    console.log(keys);
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  };
}
