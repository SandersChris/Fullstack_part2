import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl)

const create = newObject => axios.post(baseUrl, newObject)

const remove = id => axios.delete(`${baseUrl}/${id}`)

const update = (id, changedNumber) => axios.put(`${baseUrl}/${id}`, changedNumber)


export default { getAll, create, remove, update}