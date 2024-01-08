import { hookstate, useHookstate } from "@hookstate/core";

var online = false;

export const checkOnline = async () => {
  return online;
};

export const setOnline = (value) => {
  online = value;
};
