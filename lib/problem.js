import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { appStart } from "./appStart";

export async function read(name) {
  try {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
}

export async function deleteAll(name) {
  console.log("Deleting: " + name);

  try {
    FileSystem.deleteAsync(FileSystem.documentDirectory + "images/");
  } catch (error) {
    console.log(error);
  }

  try {
    await AsyncStorage.removeItem(name);
  } catch (e) {
    // remove error
    console.log(e);
  }

  appStart();

  console.log("Done.");
}

export async function deleteItem(name, index) {
  console.log("Deleting: " + name + index);

  read(name).then(async (data) => {
    try {
      FileSystem.deleteAsync(
        FileSystem.documentDirectory + "images/" + data[index].img
      );
    } catch (error) {
      console.log(error);
    }

    data.splice(index, 1);

    try {
      const jsonValue = JSON.stringify(data);

      await AsyncStorage.setItem(name, jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  });

  console.log("Done.");
  return true;
}

export async function writeProblem(name, image, answer) {
  value = { img: image, answer: answer, time: Date.now() };

  read(name).then(async (data) => {
    if (data == null) {
      data = [];
    } else if (data.length === 21) {
      await deleteItem(name, 20);
    }
    try {
      data.unshift(value);

      const jsonValue = JSON.stringify(data);

      await AsyncStorage.setItem(name, jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  });
}
