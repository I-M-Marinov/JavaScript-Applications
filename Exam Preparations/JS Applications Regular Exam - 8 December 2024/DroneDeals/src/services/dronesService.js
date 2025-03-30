import { get, post, put, del } from "./apiService.js";

export async function getAllDrones() {
  return get("/data/drones?sortBy=_createdOn%20desc");
}

export async function getDroneById(id) {
  return get(`/data/drones/${id}`);
}

export async function addDrone({ model, imageUrl, price, condition, weight, phone, description }) {
  return post("/data/drones", {
    model, 
    imageUrl, 
    price, 
    condition, 
    weight, 
    phone, 
    description
  });
}

export async function editDrone(id, data) {
  return put(`/data/drones/${id}`, data);
}

export async function deleteDrone(id) {
  return del(`/data/drones/${id}`);
}

