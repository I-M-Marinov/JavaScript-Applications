import { get, post, put, del } from "./apiService.js";

export async function getallSolutions() {
  return get("/data/solutions?sortBy=_createdOn%20desc");
}

export async function getSolutionById(id) {
  return get(`/data/solutions/${id}`);
}

export async function addSolution(data) {
    const { ["image-url"]: imageUrl, ["more-info"]: learnMore, ...otherProps } = data;
    return post("/data/solutions", {imageUrl, learnMore, ...otherProps});
}

export async function editSolution(id, data) {
  return put(`/data/solutions/${id}`, data);
}

export async function deleteSolution(id) {
  return del(`/data/solutions/${id}`);
}

export async function likeSolution(data) {
  return post(`/data/likes`, data);
}

export async function getAllLikes(solutionId) {
  return get(`/data/likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`);
}

export async function getLikeByUser(solutionId, userId) {
   
  return await get(`/data/likes?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`);

}