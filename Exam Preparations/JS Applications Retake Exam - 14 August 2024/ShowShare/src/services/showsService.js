import { get, post, put, del } from "./apiService.js";

export async function getAllShows() {
  return get("/data/shows?sortBy=_createdOn%20desc");
}

export async function getShowById(id) {
  return get(`/data/shows/${id}`);
}

export async function createShow(data) {
  const { ["image-url"]: imageUrl, ...otherProps } = data;
  return post("/data/shows", {imageUrl, ...otherProps});
}

export async function editShow(id, data) {
  return put(`/data/shows/${id}`, data);
}

export async function deleteShow(id) {
  return del(`/data/shows/${id}`);
}

export async function searchForShow(query) {
  return get(`/data/shows?where=title%20LIKE%20%22${query}%22`);
}