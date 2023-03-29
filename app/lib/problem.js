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
    } else if (data.length >= 21) {
      data.pop();
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

export async function deleteAll(name) {
  console.log("Deleting: " + name);

  try {
    await AsyncStorage.removeItem(name);
  } catch (e) {
    // remove error
    console.log(e);
  }

  console.log("Done.");
}

export async function deleteItem(name, index) {
  console.log("Deleting: " + name + index);

  read(name).then(async (data) => {
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
