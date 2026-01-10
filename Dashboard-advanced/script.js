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
view+=`<div class="w-[49%]   relative">
<input type="text" value="${text[index] || ""}" placeholder="..." class="goal-input w-[100%] p-7 outline-0 rounded-xl font-semibold text-white " style="background-color: var(--sec);">
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