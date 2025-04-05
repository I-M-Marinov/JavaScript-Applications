import { get, post, put, del } from "./apiService.js";

export async function getallStamps() {
  return get("/data/stamps?sortBy=_createdOn%20desc");
}

export async function getStampById(id) {
  return get(`/data/stamps/${id}`);
}

export async function addStamp(data) {
    return post("/data/stamps", data);
  }
    

export async function editStamp(id, data) {
  return put(`/data/stamps/${id}`, data);
}

export async function deleteStamp(id) {
  return del(`/data/stamps/${id}`);
}

export async function likeStamp(data) {
  return post(`/data/likes`, data);
}

export async function getAllLikes(stampsId) {
  return get(`/data/likes?where=stampsId%3D%22${stampsId}%22&distinct=_ownerId&count`);
}

export async function getLikeByUser(stampsId, userId) {
   
  return await get(`/data/likes?where=stampsId%3D%22${stampsId}%22%20and%20_ownerId%3D%22${userId}%22&count`);

}