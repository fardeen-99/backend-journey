import axios from 'axios'

const api=axios.create({
    baseURL:"/api/song",
    withCredentials:true
})


export const getsong=async(mood)=>{
    const response=await api.get(`/?mood=${mood}`)
    return response.data
}

export const getusersong=async(mood)=>{
    const response=await api.get(`/user?mood=${mood}`)
    return response.data
}

export const uploadsong=async(mood,song)=>{
    const response=await api.post(`/?mood=${mood}`,song)
    return response.data
}