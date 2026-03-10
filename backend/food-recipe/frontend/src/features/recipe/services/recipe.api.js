import axios from "axios"


const api=axios.create({
    baseURL:"https://food-recipe-web.onrender.com/api/recipe",
    withCredentials:true
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

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

export const getfvrt=async()=>{
   const res= await api.get("/favourite")
   return res.data
}

export const addTOfvrt=async(id)=>{
   const res= await api.post(`/fvrt/${id}`)
   return res.data
}

export const unfvrt=async(id)=>{
   const res= await api.post(`/unfvrt/${id}`)
   return res.data
}

export const fvrtdlt=async(id)=>{
    const res=await api.post(`/fvrt/delete/${id}`)
    return res.data
}

export const singleRecipeDelete=async(id)=>{
    const res=await api.delete(`/single/${id}`)
    return res.data
}

export const RecipeUpdae=async(id,form)=>{

const res =await api.patch(`/single/${id}`,form)
return res.data
}
