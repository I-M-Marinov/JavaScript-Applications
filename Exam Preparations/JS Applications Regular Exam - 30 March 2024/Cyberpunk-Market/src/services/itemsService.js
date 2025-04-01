import { get, post, put, del } from "./apiService.js";

export async function getAllItems() {
  return get("/data/cyberpunk?sortBy=_createdOn%20desc");
}

export async function getItemById(id) {
  return get(`/data/cyberpunk/${id}`);
}

export async function addItem({ item, imageUrl, price, availability, type, description }) {
  return post("/data/cyberpunk", {
    item, 
    imageUrl, 
    price, 
    availability, 
    type, 
    description
  });
}

export async function editItem(id, data) {
  return put(`/data/cyberpunk/${id}`, data);
}

export async function deleteItem(id) {
  return del(`/data/cyberpunk/${id}`);
}

