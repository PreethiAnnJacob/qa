import axios from 'axios'

const api=axios.create({
	baseURL:'http://localhost:3000/api',
})

export const insertqa=payload=>api.post(`/qa`,payload)
export const getAllqas=()=>api.get(`/qas`)
export const updateqaById=(id,payload)=>api.put(`/qa/${id}`,payload)
export const deleteqaById=id=>api.delete(`/qa/${id}`)
export const getqaById=id=>api.get(`/qa/${id}`)

const apis={
	insertqa,
	getAllqas,
	updateqaById,
	deleteqaById,
	getqaById,
}

export default apis