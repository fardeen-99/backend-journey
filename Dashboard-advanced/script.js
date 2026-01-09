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



let all=document.querySelectorAll(".allelem")
let page=document.querySelectorAll(".fullelem")
let btn=document.querySelectorAll(".fullelem button")



all.forEach((e)=>{
e.addEventListener("click",()=>{
  page[e.id].style.display="block"
  
})  
  
})
btn.forEach((e)=>{
  e.addEventListener("click",()=>{
    page[e.id].style.display="none";
    
  })
})