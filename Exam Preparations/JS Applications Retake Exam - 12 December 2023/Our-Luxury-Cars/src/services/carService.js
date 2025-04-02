import { get, post, put, del } from "./apiService.js";

export async function getAllCars() {
  return get("/data/cars?sortBy=_createdOn%20desc");
}

export async function getCarById(id) {
  return get(`/data/cars/${id}`);
}

export async function addCar(data) {
  return post("/data/cars", data);
}


export async function editCar(id, data) {
  return put(`/data/cars/${id}`, data);
}

export async function deleteCar(id) {
  return del(`/data/cars/${id}`);
}

export async function searchForCar(query) {
  return get(`/data/cars?where=model%20LIKE%20%22${query}%22`);
}