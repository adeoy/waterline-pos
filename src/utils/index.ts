import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

export const formatMoney = (value: number): string => `$${value.toFixed(2)}`;

export const setItem = async (key: string, value: any) => {
  await Storage.set({
    key,
    value: JSON.stringify(value),
  });
};

export const getItem = async (key: string, def: any) => {
  const ret = await Storage.get({ key });
  if (ret.value) {
    return JSON.parse(ret.value);
  } else {
    return def;
  }
};

export const delItem = async (key: string) => {
  await Storage.remove({ key });
};
