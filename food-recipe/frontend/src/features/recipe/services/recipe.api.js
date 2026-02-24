import axios from "axios"


const api=axios.create({
    baseURL:"http://localhost:3000/api/recipe",
    withCredentials:true
})



export const recipepost=async(data)=>{

try {
    const response=await api.post("/create",data)
    return response.data
} catch (error) {
    return error.response.data
}

}

export const getallRecipe=async()=>{

try {
    const res=await api.get("/")
    return res.data
} catch (error) {
    throw error
}

} 

export const getSingleRecipe=async(id)=>{
    try {
        const res=await api.get(`/single/${id}`)
        return res.data
    } catch (error) {
        throw error
    }
}

