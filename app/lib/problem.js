import AsyncStorage from "@react-native-async-storage/async-storage";

export async function read(name) {
  try {
    const jsonValue = await AsyncStorage.getItem("@history");
    console.log("value read:");
    console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
}

export async function writeProblem(name, value) {
  value = { img: value, time: Date.now() };
  console.log(value);
  read(name).then(async (data) => {
    if (data == null) {
      data = [];
    }
    try {
      data = data.concat(value);
      console.log(data);
      const jsonValue = JSON.stringify(data);
      console.log(jsonValue);
      await AsyncStorage.setItem("@history", jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  });
}
