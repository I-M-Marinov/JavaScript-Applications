import { get, post, put, del } from "./apiService.js";

export async function getAllFacts() {
  return get("/data/facts?sortBy=_createdOn%20desc");
}

export async function getFactById(id) {
  return get(`/data/facts/${id}`);
}

export async function addFact(data) {
    return post("/data/facts", data);
  }
    

export async function editFact(id, data) {
  return put(`/data/facts/${id}`, data);
}

export async function deleteFact(id) {
  return del(`/data/facts/${id}`);
}

export async function likeFact(data) {
  return post(`/data/likes`, data);
}

export async function getAllLikes(factId) {
  return get(`/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`);
}

export async function getLikeByUser(factId, userId) {
   
  return await get(`/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`);

}