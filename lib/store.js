import AsyncStorage from "@react-native-async-storage/async-storage";

export async function write(name, data) {
  try {
    await AsyncStorage.setItem(name, data);
  } catch (e) {
    // saving error
  }
}

export async function read(name) {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
  }
}

export async function remove(name) {
  try {
    await AsyncStorage.removeItem(name);
  } catch (e) {
    // remove error
  }
}

export async function getAll() {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    // read key error
  }

  return keys;
}
