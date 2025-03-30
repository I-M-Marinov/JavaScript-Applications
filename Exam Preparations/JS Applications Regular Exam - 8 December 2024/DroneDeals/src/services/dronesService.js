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

// export async function likeTattoo(data) {
//   return post(`/data/likes`, data);
// }

// export async function getAllLikes(tattooId) {
//   return get(`/data/likes?where=tattooId%3D%22${tattooId}%22&distinct=_ownerId&count`);
// }

// export async function getLikeByUser(tattooId, userId) {
   
//   return await get(`/data/likes?where=tattooId%3D%22${tattooId}%22%20and%20_ownerId%3D%22${userId}%22&count`);

// }