import { get, post, put, del } from "./apiService.js";

export async function getAllTattoos() {
  return get("/data/tattoos?sortBy=_createdOn%20desc");
}

export async function getTattooById(id) {
  return get(`/data/tattoos/${id}`);
}

export async function createTattoo({ type, imageUrl, description, userType }) {
  return post("/data/tattoos", {
    type,
    imageUrl,
    description,
    userType,
  });
}

export async function updateTattoo(id, data) {
  return put(`/data/tattoos/${id}`, data);
}

export async function deleteTattoo(id) {
  return del(`/data/tattoos/${id}`);
}

export async function likeTattoo(data) {
  return post(`/data/likes`, data);
}

export async function getAllLikes(tattooId) {
  return get(`/data/likes?where=tattooId%3D%22${tattooId}%22&distinct=_ownerId&count`);
}

export async function getLikeByUser(tattooId, userId) {
   
  return await get(`/data/likes?where=tattooId%3D%22${tattooId}%22%20and%20_ownerId%3D%22${userId}%22&count`);

}