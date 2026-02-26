import { useState } from "react"
import { useRecipe } from "../hooks/recipe.hook"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MdOutlineDelete } from "react-icons/md";
import { Bounce, toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Fvrt=()=>{


const {getToknowfvrt,fvrt,handlefvrtdlt}=useRecipe()
const [favourite,setfavourite]=useState()
const fvrthandle=async()=>{
    const res=await getToknowfvrt()
  const filterres= res.filter((item)=>item.isfvrt)
   setfavourite(filterres)
}

useEffect(()=>{
 fvrthandle()
},[favourite])
 
const navigate=useNavigate()

// console.log(fvrt)

    return(
<>
<ToastContainer
position="top-right"
autoClose={500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition={Bounce}
/>
        <div className=" w-full h-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] m-auto gap-10 p-6 mt-6 mb-10">

            {favourite?.map((item)=>{
                    return(
                        <div key={item._id} className="h-[250px] relative rounded-xl max-w-[350px]" 
                       
                        >
                            
                    <h1 className="absolute bottom-3 left-1/2 text-white text-3xl transform translate-x-[-50%] font-semibold">{item.dishName}</h1>
                    <img 
                     onClick={()=>navigate(`/collection/${item._id}`)}
                    className="w-full h-full object-cover rounded-xl" src={item.image} alt="" />
                    <MdOutlineDelete 
                    onClick={()=>{handlefvrtdlt(item._id)
toast('deleted recipe from favourite 🍕', {
position: "top-right",
autoClose: 500,
hideProgressBar: false,
closeOnClick: true, 
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
color:"red",
transition: Bounce,
});
                        console.log(item._id)
                    }}
                    className="absolute top-3 right-3 z-10 text-red-500 text-3xl" />
                
                </div>
                    )
                    
            })}
        </div>
                    </>
    )
}

export default Fvrt