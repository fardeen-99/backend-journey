import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
const App = () => {
const[data,setdata]=useState([])
const [form, setform] = useState({
  title:"",
  description:"",
  photo:""
})
const [edit, setedit] = useState({})


const decider=Object.keys(edit).length===0

const getdata=async()=>{

const res=await axios.get("http://localhost:3000/api/notes")
console.log(res.data);

setdata(res.data.note)

}

useEffect(()=>{

getdata()

},[])

const formchange=(e)=>{

const{name,value}=e.target

setform((prev)=>({...prev,[name]:value}))

}

// console.log(data[0].title);

const submit=async(e)=>{
e.preventDefault()
const action=e.nativeEvent.submitter.value

if(action==="add"){
  add()
}
if (action==="edit"){
  editer()
}

}

const add=async()=>{
  let res=await axios.post("http://localhost:3000/api/notes",form)
getdata()
// let final=res.data.note
// setdata(prev=>[...prev,final])
setform({title:"",description:"",photo:""})

}


const deleter=async(id)=>{
  
  await axios.delete(`http://localhost:3000/api/notes/${id}`)
  
  getdata()
// setdata((prev)=>prev.filter(item=>item._id!==id))

}
const editer=async()=>{
  
 await axios.put(`http://localhost:3000/api/notes/${edit._id}`,form)
 setform({title:"",description:""})
 setedit({})
 getdata()

}
const editing=(ele)=>{
setform({
  title:ele.title || "",
  description:ele.description || ""
})
setedit(ele)
}

  return (
    <>
    <main className='bg-zinc-900 h-full w-full'>

<div>
  <form className='w-full flex gap-2 p-4' onSubmit={submit} >
  <input name='title' className='px-6 py-2 border-0 rounded-xl text-black bg-stone-200 ' type="text" placeholder='enter your title' value={form.title} onChange={(e)=>formchange(e)} />
  <input name='description' className='px-6 py-2 border-0 rounded-xl text-black bg-stone-200 ' type="text" placeholder='enter your description' value={form.description} onChange={(e)=>formchange(e)} />
  <input name='photo' className='px-6 py-2 border-0 rounded-xl text-black bg-stone-200 ' type="text" placeholder='enter your photo' value={form.photo} disabled={!decider} onChange={(e)=>formchange(e)} />
  <button type='submit' value={decider?"add":"edit"} className='px-3 py-2 rounded-xl border-0 bg-amber-300 text-white font-semibold'>{decider?"add":"edit"}</button>
  </form>
</div>

      <div className='w-full p-4 flex gap-3 flex-wrap capitalize' >

{
  data.map((ele,i)=>{
    return(
      
      <div key={i} className='p-4 flex flex-col items-center min-w-60 justify-center gap-2 bg-stone-400 rounded-xl  text-black font-semibold w-fit'>
        
        <div className='h-22 w-22 rounded-full bg-white '>
          <img src={ele.photo} alt="" className='h-full w-full rounded-full' />
        </div>
<p>{ele.title}</p>
<h1>{ele.description}</h1>
<div className='flex w-full'>

<button  className='bg-red-700 border-0 rounded-xl w-full  text-white font-semibold  capitalize py-2' 
onClick={()=>deleter(ele._id)}
>delete</button>
<button  className='bg-yellow-700 ml-4  border-0 rounded-xl w-full text-white font-semibold  capitalize py-2' 
onClick={()=>editing(ele)}
>Edit</button>
</div>
</div>

)

})
}
</div>

    </main>
    </>
  )
}

export default App