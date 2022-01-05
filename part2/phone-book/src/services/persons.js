import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const createNew = async (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  const response = await request;
  return response.data;
};

const updatePhoneNumber = async (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson);
  const response = await request;
  return response.data;
};

const deletePerson = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    const response = await request;
    return response.data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, updatePhoneNumber , deletePerson };
