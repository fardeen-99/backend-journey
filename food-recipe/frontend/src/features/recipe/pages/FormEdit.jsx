import { useParams } from "react-router-dom"
import { useRecipe } from "../hooks/recipe.hook"
import { useState } from "react"

const FormEdit=()=>{
    const {id}=useParams()

const {recipe}=useRecipe()
const filteru=recipe.filter((item)=>item._id===id)
console.log(filteru)

const [edit,setEdit]=useState({
    dishName:filteru[0].dishName,
    ingredients:filteru[0].ingredients,
    recipe:filteru[0].recipe,
    chef:filteru[0].chef,
    category:filteru[0].category
})



    return(
        <div className="flex items-center justify-center h-screen">
            <form className="flex flex-col gap-4 w-[90%] max-w-100" >
                <input className="w-full p-4 text-white border border-gray-300 placeholder:text-gray-300 rounded outline-none  px-3" type="text" value={edit.dishName} onChange={(e)=>setEdit({...edit,dishName:e.target.value})}/>
                <input className="w-full p-4 text-white border border-gray-300 placeholder:text-gray-300 rounded outline-none  px-3" type="text" value={edit.ingredients} onChange={(e)=>setEdit({...edit,ingredients:e.target.value})}/>
                <input className="w-full p-4 text-white border border-gray-300 placeholder:text-gray-300 rounded outline-none  px-3" type="text" value={edit.recipe} onChange={(e)=>setEdit({...edit,recipe:e.target.value})}/>
                <input className="w-full p-4 text-white border border-gray-300 placeholder:text-gray-300 rounded outline-none  px-3" type="text" value={edit.chef} onChange={(e)=>setEdit({...edit,chef:e.target.value})}/>
                             <select className="w-full p-4 text-white border border-gray-300 placeholder:text-gray-300 rounded outline-none bg-transparent px-3" name="category" id="" value={edit.category} onChange={(e)=>setEdit({...edit,category:e.target.value})}>
                    <option className="bg-gray-800 text-white" value="">Select Category</option>
                    <option className="bg-gray-800 text-white" value="breakfast">Breakfast</option>
                    <option className="bg-gray-800 text-white" value="lunch">Lunch</option>
                    <option className="bg-gray-800 text-white" value="dinner">Dinner</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Update</button>
            </form>
        </div>
    )
}

export default FormEdit