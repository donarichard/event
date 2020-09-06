import axiosInstance from "../axios";

export const getEvents = async () => {
  return await axiosInstance
    .get("/event")
    .then(res => res.data)
    .catch(err => err);
};

export const getEventsById = async id => {
  return await axiosInstance
    .get(`/event/${id}`)
    .then(res => res.data)
    .catch(err => err);
};

export const bookEvents = async (id, bookData) => {
  return await axiosInstance
    .post(`/book/${id}`, bookData)
    .then(res => res.data)
    .catch(err => err);
};
