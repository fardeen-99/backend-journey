import axios from 'axios'

const api=axios.create({
    baseURL:"http://localhost:3000/api"
    ,withCredentials:true
})





export const like=async(id)=>{
  const res=  await api.post(`/post/like/${id}`)
  return res.data
}
export const unlike=async(id)=>{
  const res=  await api.post(`/post/unlike/${id}`)
  return res.data
}

export const folllow=async(id)=>{
    const res=await api.post(`/user/follow/${id}`)
    return res.data
}
export const unfolllow=async(id)=>{
    const res=await api.post(`/user/unfollow/${id}`)
    return res.data
}
export const upload=async(formset)=>{
    const res=await api.post('/post',formset)
    return res.data
}
export const save=async(id)=>{
    const res=await api.post(`/post/save/${id}`)
    return res.data
}
export const unsave=async(id)=>{
    const res=await api.post(`/post/unsave/${id}`)
    return res.data
}
export const detailposting=async(id)=>{
    const res=await api.get(`/post/detail/${id}`)
    return res.data
}