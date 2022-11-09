import { uniqWith, isEqual } from "lodash-es"

export const addList = (key, data, isUniq) => {
  const allData = JSON.parse(localStorage.getItem(key) || "[]");
  let storeData
  allData.push(data);
  storeData = JSON.stringify(allData)
  if (isUniq) {
    storeData = JSON.stringify(uniqWith(allData, isEqual))
  }
  localStorage.setItem(key, storeData);
  return allData;
};

export const subListItem = (key, index) => {
  const allData = JSON.parse(localStorage.getItem(key) || "[]");
  allData.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(allData));
  return allData;
}

export const getList = (key) => JSON.parse(localStorage.getItem(key) || "[]")