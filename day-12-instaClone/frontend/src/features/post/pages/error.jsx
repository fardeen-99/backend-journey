import { NavLink, useNavigate, useRouteError } from "react-router-dom";


export const Error = () => {


const navigate=useNavigate()


const hundle=()=>{
navigate(-1)

}
    let error=useRouteError()
    console.log(error)


    if(error.status===404){
  return (
    <>
     

      <div className="h-full w-full relative " >
     <img src="https://www.digitalmesh.com/blog/wp-content/uploads/2020/05/404-error.jpg" className="h-full w-full" alt="" />

<div className="absolute flex gap-3 bottom-10 w-full justify-center">
<button onClick={hundle} className="bg-blue-500 text-white px-4 py-2 rounded-lg">previous page</button>
      <NavLink className="bg-blue-500 text-white px-4 py-2 rounded-lg" to="/">go to home page</NavLink>
</div>
      </div>

    </>
  );
}
};