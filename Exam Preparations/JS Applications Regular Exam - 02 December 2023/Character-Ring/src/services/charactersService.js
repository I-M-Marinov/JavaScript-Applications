import { get, post, put, del } from "./apiService.js";

export async function getAllCharacters() {
  return get("/data/characters?sortBy=_createdOn%20desc");
}

export async function getCharacterById(id) {
  return get(`/data/characters/${id}`);
}

export async function addNewCharacter(data) {
   const { ["image-url"]: imageUrl, ["additional-info"]: moreInfo, ...otherProps } = data;
    return post("/data/characters", {imageUrl, moreInfo, ...otherProps});
  }
    

export async function editCharacter(id, data) {
  return put(`/data/characters/${id}`, data);
}

export async function removeCharacter(id) {
  return del(`/data/characters/${id}`);
}

export async function likeCharacter(data) {
  return post(`/data/useful`, data);
}

export async function getAllLikes(characterId) {
  return get(`/data/useful?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`);
}

export async function getLikeByUser(characterId, userId) {
   
  return await get(`/data/useful?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`);

}