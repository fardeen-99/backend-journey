import { useEffect } from "react"
import { useRecipe } from "../hooks/recipe.hook"
import { useNavigate } from "react-router-dom"

const Collection=()=>{
const navigate=useNavigate()
    const {recipe,getAllRecipe}=useRecipe()
    useEffect(()=>{
        getAllRecipe()
    },[])
    // console.log(recipe)
    return(
        <div className=" m-auto flex  w-[80%] m-auto lg:w-full flex-col min-h-full lg:flex-row gap-10  p-6">
                 {recipe.map((item)=>{
                     return(
                        <section key={item._id} 
                        onClick={()=>navigate(`/collection/${item._id}`)}
                        className="group max-h-[250px] max-w-[300px] rounded-xl overflow-hidden relative flex items-center gap-2 justify-center flex-col w-full">
<img src={item.image} className=" rounded-xl w-full h-full object-cover" alt="" />
<p className="text-xl font-semibold text-white absolute bottom-0 transform translate-y-10 group-hover:-translate-y-7 text-black transition-all duration-300">{item.dishName}</p>
            </section>
                    )
                 })}
        </div>
    )
}

export default Collection   