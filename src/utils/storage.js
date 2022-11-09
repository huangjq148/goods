export const addList = (key, data) => {
  const allData = JSON.parse(localStorage.getItem(key) || "[]");
  allData.push(data);
  localStorage.setItem(key, allData);
  return allData;
};

export const subListItem = (key, index) => {
  const allData = JSON.parse(localStorage.getItem(key) || "[]");
  allData.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(allData));
  return allData;

}