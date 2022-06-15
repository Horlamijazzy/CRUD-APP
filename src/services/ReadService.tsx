import http from '../http-common'

const getAll = () => {
  return http.get("/posts");
};

const get = (id:any) => {
  return http.get(`/posts/${id}`);
};

const create = (data: any) => {
  return http.post("/posts", data);
};

const update = (id:any, data:any) => {
  return http.put(`/posts/${id}`, data);
};

const remove = (id: any) => {
  return http.delete(`/posts/${id}`);
};
const removeAll = () => {
  return http.delete(`/posts`);
};
// const findByTitle = (title:any) => {
//   return http.get(`/readposts?title=${title}`);
// };
const ReadService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  // findByTitle
};

export default ReadService