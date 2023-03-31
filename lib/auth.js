import { read } from "./store";
import { Camera } from "expo-camera";

const [permission, requestPermission] = Camera.useCameraPermissions();

export async function getCamera() {
  if (permission === null) {
    requestPermission();
  }
  if (permission === false) {
    return false;
  }
  return true;
}
