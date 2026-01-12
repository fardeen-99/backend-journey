let date=document.querySelector("#date")
let time=document.querySelector("#time")
let cel=document.querySelector("#celcius")
let loc=document.querySelector("#location")
let clear=document.querySelector("#clear")
let form=document.querySelector("form")
let city=document.querySelector("#city")
let perception=document.querySelector("#perception")
let humidity=document.querySelector("#humidity")
let wind=document.querySelector("#wind")
let icon=document.querySelector("#icon")



function map(){
  let now= new Date()
let b=now.getDate()

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
let year=now.getFullYear()
let month=months[now.getMonth()]
console.log(month);

date.innerHTML=`${b} ${month},${year}`

function timer(){


  setInterval(() => {
    let nower=new Date()
      let str= nower.toLocaleString("en-US",{
  weekday:"long",
  hour:"numeric",
  minute:"2-digit",
  hour12:true,
  second:"2-digit"
  
  
  })
  time.innerHTML=str
}, 1000);
}

timer()


const submiter=async(e)=>{
    e.preventDefault()

if(loc.value.trim()==="") return;

let state=loc.value
state=state.toLowerCase()
console.log(state);

let api=`https://api.weatherapi.com/v1/current.json?key=751765e0045f4357b15105848252412&q=${state},IN`
loc.value=""
    
try {
    
let res= await fetch(api)
let data=await res.json()

  city.innerHTML=`${data.location.name}, ${data.location.country}`
  cel.innerHTML=`${data.current.temp_c}&deg;c`
  clear.innerHTML=`${data.current.condition.text}`

perception.innerHTML=`precipitation: ${data.current.precip_mm} mm`
humidity.innerHTML=`humidity: ${data.current.humidity}%`
wind.innerHTML=`wind: ${data.current.wind_kph} km/h`




} catch (error) {
    
    console.log(error);
    
}

}

form.addEventListener("submit",submiter)
}
map()


let all=document.querySelectorAll(".allelem")
let page=document.querySelectorAll(".fullelem")
let btn=document.querySelectorAll(".close-btn")



all.forEach((e)=>{
e.addEventListener("click",()=>{
  page[e.id].style.display="block"
  
  
})  
  
})
btn.forEach((e)=>{
  e.addEventListener("click",()=>{
    page[e.id].style.display="none"
    
  })
})



function todo(){
  var store=[]

if(localStorage.getItem("saver")){
  let updated=JSON.parse(localStorage.getItem("saver"))
  store=updated
}

let todos=document.querySelector("#todo-container")
let todoinp=document.querySelector("#todo-input")
let todobtn=document.querySelector("#todo-button")

let dlt=document.querySelector(".todo-btn")
function addtodo(){

  let sum=""
  
  store.forEach((ele,i)=>{
    sum+=`<div class="todo-box">
    <p>${ele.text}</p>
    <button class="todo-btn">mark as read</button>
    </div>`
    
  })
  console.log(sum);
  
  todos.innerHTML=sum

let dltbtn=document.querySelectorAll(".todo-btn")

dltbtn.forEach((e,i)=>{
// console.log(e);

e.addEventListener("click",()=>{

  store.splice(i,1)
  localStorage.setItem("saver",JSON.stringify(store))
  addtodo()

})

})

}
addtodo()






todobtn.addEventListener("click",()=>{
  if(todoinp.value.trim()==="") return;
  let inputtodo=todoinp.value

  store.push({text:inputtodo})
localStorage.setItem("saver",JSON.stringify(store))

  addtodo()
  todoinp.value=""
})
// console.log(store)


// document.addEventListener("click",(e)=>{
//   if(e.target.classList.contains("todo-btn")){
//     e.target.closest(".todo-box").remove()
//   }

// })

}
  todo()

function dailygoal(){
    let text=[]

if(localStorage.getItem("textsaver")){
text=JSON.parse(localStorage.getItem("textsaver"))

}
  let arru= Array.from({length:18},(_,i)=>{

 return `${6+i}:00-${7+i}:00`

  })
  console.log(arru);

  let view=""
  arru.forEach((ele,index)=>{
view+=`<div class="lg:w-[49%] w-[100%]  relative">
<input type="text" value="${text[index] || ""}" placeholder="..." class="goal-input w-[100%] p-7 py-8 outline-0 rounded-xl font-semibold text-white " style="background-color: var(--sec);">
<p class="absolute top-2 left-4 font-semibold" style="color: var(--tri1);">${ele}</p>

</div>`


  })
  let goal =document.querySelector("#dailygoal")
  
  goal.innerHTML=view
  
  let goalinp=document.querySelectorAll(".goal-input")
 
  goalinp.forEach((e,index)=>{
    e.addEventListener("input",(e)=>{

      
      text[index]=e.target.value
      localStorage.setItem("textsaver",JSON.stringify(text))
      
      console.log(text);
    })
  })
  
}
dailygoal()


function motivationalQuote(){
  let moti= document.querySelector("#moti-h1")
let author=document.querySelector("#author")


async function fetcher(){
  
  let res=await fetch("https://dummyjson.com/quotes/random?tag=motivational")
  let data= await res.json()
  console.log(data);
  moti.innerHTML=data.quote
  author.innerHTML=`~${data.author}`
}

fetcher()
}
motivationalQuote()


let timer=document.querySelector("#timer")
let start=document.querySelector("#start")
let pause=document.querySelector("#pause")
let restart=document.querySelector("#reset")




// localStorage.clear()


function sessionTimer(){
  let TotalTime=25*60
let timeleft=TotalTime
let watch=null
let isrunning=false

if(localStorage.getItem("timesave")){

  timeleft=JSON.parse(localStorage.getItem("timesave"))

  timeleft > 0 ? timeleft:0

}

function calculate(){
  let minute=Math.floor(timeleft/60)
let sec=timeleft%60

timer.innerHTML=`${minute}:${sec < 10 ? 0: ""}${sec}`

}

calculate()
let audio=document.querySelector("audio")



start.addEventListener("click",()=>{

if(isrunning) return

isrunning=true

watch=setInterval(() => {
  if(timeleft>0){
    timeleft--
    localStorage.setItem("timesave",JSON.stringify(timeleft))
    calculate()
  }else{
    clearInterval(watch)
    isrunning=false
  
  calculate()
}
}, 1000);

})

pause.addEventListener("click",()=>{

clearInterval(watch)  
isrunning=false
localStorage.setItem("timesave",JSON.stringify(timeleft))
calculate()
  
})


restart.addEventListener("click",()=>{

clearInterval(watch)
  audio.play()
isrunning=false
timeleft=TotalTime
localStorage.setItem("timesave",JSON.stringify(timeleft))
calculate()


})
}

sessionTimer()

function kanbanBoard(){
  
let storage={}

  if(localStorage.getItem("kanbansaver")){

    let datu=JSON.parse(localStorage.getItem("kanbansaver"))

    for (const col in datu) {
      
   let coli= document.querySelector(`#${col}`)
   datu[col].forEach((ele)=>{

let counting=coli.querySelector(".count")
let allkanbantask=coli.querySelectorAll(".drag-task")


let wrap=document.createElement("div")

wrap.innerHTML=`<div class="flex flex-col gap-1 p-5 rounded-xl text-lg mt-4 draggable drag-task "  draggable="true" ">
    <h1 class="text-xl">${ele.title}</h1>
    <h5 class=" font-medium">${ele.disc}</h5>
    <div class="flex gap-4 self-end "   >
    <button class="h-10 px-4 capitalize rounded-lg border-0  bg-gray-700 editor" >edit</button>
    <button class=" h-10 px-4 rounded-lg capitalize border-0 bg-red-600 deleter" >delete</button>
    </div>
    </div>`

   let inner= wrap.querySelector(".drag-task")

if(ele.color){

inner.classList.add(ele.color,"rounded-xl")

}

inner.addEventListener("dragstart",()=>{
taskmover=inner

})
coli.append(wrap)

counting.innerHTML=allkanbantask.length


   })
      
      
    }

  }



 let tasku= document.querySelector("#task")
let progress=document.querySelector("#progress")
 let donetask = document.querySelector("#done")
let dragtask =document.querySelectorAll(".drag-task")


let taskmover=null

dragtask.forEach((e)=>{
e.addEventListener("dragstart",()=>{
  console.log(e);
  
taskmover=e

})


})





function chalao(col){

col.addEventListener("dragenter",(e)=>{

col.classList.add("enteradd")

})

col.addEventListener("dragleave",()=>{
  col.classList.remove("enteradd")
  
})

col.addEventListener("dragover",(e)=>{
  
  e.preventDefault()
  
})

col.addEventListener("drop", (e) => {
  e.preventDefault()
  col.append(taskmover)
  col.classList.remove("enteradd")

  // reset colors
  taskmover.classList.remove(
    "bg-sec",
    "bg-green-700",
    "color1",
    "rounded-xl"
  )

  // apply based on column
  if (col === tasku) {
    taskmover.classList.add("bg-sec", "rounded-xl")
  } 
  else if (col === progress) {
    taskmover.classList.add("color1", "rounded-xl")
  } 
  else if (col === donetask) {
    taskmover.classList.add("bg-green-900", "rounded-xl")
  }

  count()
})


}

chalao(tasku)
chalao(progress)
chalao(donetask)


function count(){
  let container=[tasku,progress,donetask]

container.forEach((col)=>{
let counter=col.querySelector(".count")
let Alltask=col.querySelectorAll(".drag-task")

storage[col.id]=Array.from(Alltask).map((evt)=>({

title:evt.querySelector("h1").textContent,
disc:evt.querySelector("h5").textContent,
color:evt.classList.contains("bg-sec")?"bg-sec":evt.classList.contains("color1")?"color1":"bg-green-900"


}))
localStorage.setItem("kanbansaver",JSON.stringify(storage))

counter.innerHTML=Alltask.length


})
}

let addbtn=document.querySelector("#btn-add")
let closebtn=document.querySelector("#btn-close")
let bgblur=document.querySelector("#bg-blur")
let inp=document.querySelector("#blur-input")
let textarea=document.querySelector("#blur-textarea")
let edit=document.querySelector(".editor")
let taskedit=null

closebtn.addEventListener("click",()=>{
bgblur.style.display="none"
inp.value=""
textarea.value=""
taskedit=null

})
document.querySelector(".add-task").addEventListener("click",()=>{
  addbtn.innerHTML= taskedit !== null?"edit-task":"add-task"
  bgblur.style.display="block"
  
})


addbtn.addEventListener("click",()=>{
  
if(inp.value==="" || textarea.value==="") return alert("enter all values")


if(taskedit){

  taskedit.querySelector("h1").innerHTML=inp.value
  taskedit.querySelector("h5").innerHTML=textarea.value
taskedit=null

}else{

  
  
let div=document.createElement("div")

div.innerHTML=`<div class="flex flex-col gap-1 p-5 rounded-xl text-lg mt-4 draggable drag-task bg-sec "  draggable="true" ">
    <h1 class="text-xl">${inp.value}</h1>
    <h5 class=" font-medium">${textarea.value}</h5>
    <div class="flex gap-4 self-end "   >
    <button class="h-10 px-4 capitalize rounded-lg border-0  bg-gray-700 editor" >edit</button>
    <button class=" h-10 px-4 rounded-lg capitalize border-0 bg-red-600 deleter" >delete</button>
    </div>
    </div>`
    
  document.body.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("draggable")) {
    taskmover = e.target
  }
})
    
    tasku.append(div)
  }
count()

bgblur.style.display="none"
inp.value=""
textarea.value=""


})

count()
document.body.addEventListener("click",(e)=>{
if(e.target.classList.contains("deleter")){
e.target.closest(".draggable").remove()

}
count()
if(e.target.classList.contains("editor")){
 taskedit= e.target.closest(".draggable")


  inp.value=taskedit.querySelector("h1").innerHTML
  textarea.value=taskedit.querySelector("h5").innerHTML

bgblur.style.display="block"
addbtn.innerHTML= taskedit !== null?"edit-task":"add-task"

}

})

}


kanbanBoard()

let themer=[
  {
    "--pri":" #FFECC0",
    "--sec": "#000B58",
    "--tri1": "#2B4F60",
    "--tri2":" #799EFF",
  },{
"--pri": "#FCF5EE",
    "--sec": "#5F8B4C",
    "--tri1": "#FFBC4C",
    "--tri2": "#A8DF8E"

  },
  {
     "--pri": "#F8F4E1",
    "--sec": "#391a05",
    "--tri1": "#FEBA17",
    "--tri2": "#74512D",
  }
]
let indux=-1

document.querySelector("#theme").addEventListener("click", () => {
  if(indux<2){
    indux++

  }else{
    indux=0
  }
  document.documentElement.style.setProperty("--pri", themer[indux]["--pri"]);
  document.documentElement.style.setProperty("--sec", themer[indux]["--sec"]);
  document.documentElement.style.setProperty("--tri1", themer[indux]["--tri1"]);
  document.documentElement.style.setProperty("--tri2", themer[indux]["--tri2"]);
});



