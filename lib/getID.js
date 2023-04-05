import * as SecureStore from "expo-secure-store";
import * as Crypto from "expo-crypto";

export async function getUUID() {
  let fetchUUID = await SecureStore.getItemAsync("secure_deviceid");

  let uuid;

  if (fetchUUID) {
    uuid = fetchUUID;
  } else {
    uuid = Crypto.randomUUID();
    await SecureStore.setItemAsync("secure_deviceid", uuid);
    getUUID();
  }
  return uuid;
}

export async function removeUUID() {
  await SecureStore.deleteItemAsync("secure_deviceid");
  return true;
}
