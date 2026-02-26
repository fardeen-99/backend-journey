import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useRecipe } from "../hooks/recipe.hook"
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

const SingleRecipe=()=>{
   const {id}=useParams()
const {GetSingleRecipe,singleRecipe,getToknowfvrt,fvrt,handleFvrt,handleUnFvrt,postdelete}=useRecipe()
const navigate=useNavigate()
   useEffect(()=>{
    GetSingleRecipe(id)
   },[])
console.log(fvrt)


const postkarodelete=(id)=>{

    postdelete(id)
    navigate("/collection")
}

// console.log(singleRecipe)
    return(
        <div>
        {singleRecipe.map((item)=>{
            return(
                <div key={item._id} className="flex w-[90%] h-[80vh] mt-10 mb-10 m-auto gap-6">
                    <div className="w-full h-full">
                    <img className="w-full h-full rounded-lg object-cover" src={item.image} alt="" />

                    </div>
                    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">

                    <p className="text-4xl font-semibold">{item.dishName}</p>
                    <p className="text-2xl border-b  border-gray-300 ">{item.ingredients}</p>
                    <p className="text-2xl border-b border-gray-300 ">{item.recipe}</p>
                    <p className="text-2xl border-b border-gray-300 ">{item.chef}</p>
                    <p className="text-2xl border-b border-gray-300 ">{item.category}</p>
                    <div className="flex gap-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={()=>navigate(`/edit/${item._id}`)}>Edit</button>
                        <button onClick={()=>postkarodelete(item._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
                    </div>
                    </div>
                    <div onClick={()=>{item.isfvrt?handleUnFvrt(item._id):handleFvrt(item._id)}}>{item.isfvrt?<FaHeart className="text-red-500 cursor-pointer text-3xl" />:<FaRegHeart className="text-white cursor-pointer text-3xl" />}</div>
                </div>
            )
        })}

        </div>
    )
}

export default SingleRecipe