import { get, post, put, del } from "./apiService.js";

export async function getAllFruits() {
  return get("/data/fruits?sortBy=_createdOn%20desc");
}

export async function getFruitById(id) {
  return get(`/data/fruits/${id}`);
}

export async function addFruit(data) {
  const { ["image-url"]: imageUrl, ["more-info"]: moreInfo, ...otherProps } = data;
  return post("/data/fruits", { imageUrl, moreInfo, ...otherProps });
}


export async function editFruit(id, data) {
  return put(`/data/fruits/${id}`, data);
}

export async function deleteFruit(id) {
  return del(`/data/fruits/${id}`);
}

export async function searchForFruit(query) {
  return get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
}