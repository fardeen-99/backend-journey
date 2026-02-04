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
console.log(data);

const submit=async(e)=>{
e.preventDefault()

const {title,description,photo}=e.target.elements

await fetch("http://localhost:3000/api/node",{
  method:"POST",
  headers: {
    "Content-Type": "application/json",
  },
  body:JSON.stringify({
    title:title.value,
    description:description.value,
    photo:photo.value
  })
})
getdata()
}

const deleter=async(id)=>{
await fetch(`http://localhost:3000/api/node/${id}`,{
  method:"DELETE"

})

getdata()
}

const editer=async(id)=>{
let newdescription=prompt("enter your new description")

await fetch(`http://localhost:3000/api/node/${id}`,{
  method:"PATCH",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({description:newdescription})
})
getdata()
}

return (
<>
  <form className="form" onSubmit={(e)=>submit(e)}>
    <input className="input" type="text" placeholder='enter title' name='title' />
    <input className="input" type="text" placeholder='enter description' name='description' />
    <input className="input" type="text" placeholder='enter photo' name='photo' />
    <button className="add-btn">Add</button>
  </form>

  <div className="card-container">
    {
      data && data.map((ele,i)=>{
        return(
          
        
          <div className="card" key={i}>
            <img className="card-img" src={ele.photo} alt="" />
            <p className="card-title">{ele.title}</p>
            <p className="card-desc">{ele.description}</p>

            <div className="card-actions">
              <button className="delete-btn" onClick={()=>deleter(ele._id)}>Delete</button>
              <button className="edit-btn" onClick={()=>editer(ele._id)}>Edit</button>
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
