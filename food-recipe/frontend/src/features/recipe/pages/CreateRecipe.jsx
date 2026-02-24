import { useState } from "react"
import { useRecipe } from "../hooks/recipe.hook"

const CreateRecipe=()=>{
const {getRecipe,getAllRecipe}=useRecipe()
    const [file,setFile]=useState(null)
    const [form,setform]=useState({
        ingredients:"",
        recipe:"",
        chef:"",
        category:"",
        dishName:""
    })


const sethandler=(e)=>{
    const {name,value}=e.target
    setform((prev)=>({
        ...prev,
        [name]:value
    }))
}
    const handleSubmit=async(e)=>{
        e.preventDefault()

       const formData=new FormData()
formData.append("file",file)
formData.append("form",JSON.stringify(form))


const res=await getRecipe(formData)
console.log(res)
getAllRecipe()
    

    }
    return(
        <div className="pt-10 h-full w-full bg-[url(https://eastafricachef.gumlet.io/wp-content/uploads/2025/02/top-view-food-ingredients.jpg?compress=true)] bg-cover bg-no-repeat ">
            <form onSubmit={handleSubmit} className="w-[80%] m-auto max-h-[80vh] max-w-150 flex flex-col bg-black/40 gap-4 text-lg">
                <input className="w-full p-4 text-white border border-gray-300 placeholder:text-gray-300 rounded outline-none  px-3" type="file" name="" id=""  onChange={(e)=>setFile(e.target.files[0])} />
                <input className="w-full p-4 text-white border border-gray-300 placeholder:text-gray-300 rounded outline-none  px-3" type="text" placeholder="//dishName" name="dishName"  required value={form.dishName} onChange={(e)=>sethandler(e)}  />
                <input className="w-full p-4 text-white border border-gray-300 placeholder:text-gray-300 rounded outline-none  px-3" type="text" placeholder="//ingredients" name="ingredients"  required value={form.ingredients} onChange={(e)=>sethandler(e)}  />
                <textarea rows={4} cols={30} className="w-full p-4 text-white border border-gray-300 placeholder:text-gray-300 rounded outline-none  px-3" placeholder="//recipe" name="recipe" required value={form.recipe} onChange={(e)=>sethandler(e)}  />
                <input className="w-full p-4 text-white border border-gray-300 placeholder:text-gray-300 rounded outline-none  px-3" type="text" placeholder="//chef" name="chef" required value={form.chef} onChange={(e)=>sethandler(e)}  />
                <select className="w-full p-4 text-white border border-gray-300 placeholder:text-gray-300 rounded outline-none bg-transparent px-3" name="category" id="" value={form.category} onChange={(e)=>sethandler(e)}>
                    <option className="bg-gray-800 text-white" value="">Select Category</option>
                    <option className="bg-gray-800 text-white" value="breakfast">Breakfast</option>
                    <option className="bg-gray-800 text-white" value="lunch">Lunch</option>
                    <option className="bg-gray-800 text-white" value="dinner">Dinner</option>
                </select>
                <button type="submit" className="w-full h-15 border border-gray-300 rounded outline-none px-3 bg-yellow-500 font-semibold text-white">Create Recipe</button>
            </form>
        </div>
    )
}   

export default CreateRecipe