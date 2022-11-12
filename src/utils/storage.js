import dayjs from "dayjs"

// 查询列表
export const getList = (key) => JSON.parse(localStorage.getItem(key) || "[]");

export const storeData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// 根据 id 查询
export const getById = (key, id) => {
  const allData = getList(key);
  const result = allData.filter(item => item.id == id)?.[0] ?? {}

  return result
}

// 增
export const create = (key, data) => {
  const allData = getList(key);
  const id = dayjs().format("YYMMDDHHmmss")

  allData.unshift({ ...data, id });
  storeData(key, allData);

  return allData;
};

// 删
export const remove = (key, id) => {
  const allData = getList(key);
  const removeIndex = allData.findIndex(item => item.id === id)

  allData.splice(removeIndex, 1);
  storeData(key, allData);

  return allData;
};

// 改
export const update = (key, data) => {
  const allData = getList(key);
  const result = allData.filter(item => item.id == data.id)?.[0] ?? {}

  Object.keys(data).map(key => {
    result[key] = data[key];
  })
  storeData(key, allData);

  return allData;
};


export const createOrUpdate = (key, data) => {
  if (data.id) {
    update(key, data)
  } else {
    create(key, data)
  }
}