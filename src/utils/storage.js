import { uniqWith, isEqual } from "lodash-es";

export const getList = (key) => JSON.parse(localStorage.getItem(key) || "[]");

export const storeData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const addList = (key, data, isUniq) => {
  const allData = getList(key);
  let result;
  allData.push(data);
  result = allData;
  if (isUniq) {
    result = uniqWith(allData, isEqual);
  }
  storeData(key, result);
  return allData;
};

export const subListItem = (key, index) => {
  const allData = getList(key);
  allData.splice(index, 1);
  storeData(key, allData);
  return allData;
};

export const updateItem = (key, index, data) => {
  const allData = getList(key);
  allData[index] = data;
  storeData(key, allData);
  return allData;
};
