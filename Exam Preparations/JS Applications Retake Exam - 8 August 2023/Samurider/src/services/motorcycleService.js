import { get, post, put, del } from "./apiService.js";

export async function getAllMotorcycles() {
  return get("/data/motorcycles?sortBy=_createdOn%20desc");
}

export async function getMotorcycleById(id) {
  return get(`/data/motorcycles/${id}`);
}

export async function createMotorcycle(data) {
  const { ["image-url"]: imageUrl, ["more-info"]: moreInfo, ...otherProps } = data;
  return post("/data/motorcycles", { imageUrl, moreInfo, ...otherProps });
}


export async function editMotorcycle(id, data) {
  return put(`/data/motorcycles/${id}`, data);
}

export async function deleteMotorcycle(id) {
  return del(`/data/motorcycles/${id}`);
}

export async function searchForMotorcycle(query) {
  return get(`/data/motorcycles?where=model%20LIKE%20%22${query}%22`);
}