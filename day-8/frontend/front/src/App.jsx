import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const App = () => {

const [data, setdata] = useState([])

const getdata=async()=>{
const res=await fetch("http://localhost:3000/api/node")
const alldata=await res.json()
setdata(alldata.note)
}

useEffect(()=>{
  getdata()
},[])


const submit=async(e)=>{
e.preventDefault()

const {title,description,photo}=e.target.elements
// console.log(title.value,description,photo);

let res=await fetch("http://localhost:3000/api/node",{
  method:"POST",
      headers: {
      "Content-Type": "application/json",
    },
  body:JSON.stringify({title:title.value,description:description.value,photo:photo.value})
})
getdata()


// console.log(e.target.elements);

}

  return (
<>
<form onSubmit={(e)=>submit(e)}>

<input type="text" placeholder='enter title'name='title'  />
<input type="text" placeholder='enter description' name='description' />
<input type="text" placeholder='enter photo' name='photo' />
<button>add</button>
</form>

<div>
  {
   data && data.map((ele,i)=>{
    
    return(

      <div key={i} >
        <img src={ele.photo} alt="" />
<p>{ele.title}</p>
<p>{ele.description}</p>
<div>
  <button>add</button>
  <button>edit</button>
</div>
      </div>
  ) 
    })
  }
  </div>

</>
  )
}

export default App