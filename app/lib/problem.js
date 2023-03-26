import AsyncStorage from "@react-native-async-storage/async-storage";

export async function read(name) {
  try {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
}

export async function writeProblem(name, value) {
  value = { img: value, time: Date.now() };

  read(name).then(async (data) => {
    if (data == null) {
      data = [];
    }
    try {
      data.push(value);

      const jsonValue = JSON.stringify(data);

      await AsyncStorage.setItem(name, jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  });
}

export async function deleteAll(name) {
  console.log("Deleting: " + name);
  AsyncStorage.removeValue = async (name) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };
}
