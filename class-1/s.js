// //? Challenge: "Event Maestro: Handle It All!"

// //! Objective
// //* Create a program using Node.js EventEmitter that:

// //? Listens for multiple types of user events (e.g., login, logout, purchase, and profile update).
// //? Tracks how many times each event is emitted.
// //? Logs a summary of all event occurrences when a special summary event is triggered.

// //! Requirements
// //? Create at least four custom events (e.g., user-login, user-logout, user-purchase, profile-update).
// //? Emit these events multiple times with different arguments (e.g., username, item purchased).
// //? Track and store the count of each event type.
// //? Define a summary event that logs a detailed report of how many times each event was triggered.

// const EventEmitter = require("events");

// const emitter = new EventEmitter();

// const eventCounts ="" 
// if(localStorage.getItem("aloo")){
// eventCounts=JSON.parse(localStorage.getItem("aloo"))
// }else{
//     eventCounts={
//       "user-login": 0,
//       "user-logout": 0,
//       "user-purchase": 0,
//       "profile-update": 0,
//     };
    
// }

// // Event listeners
// emitter.on("user-login", (username) => {
//   eventCounts["user-login"]++;
//   console.log(`${username} logged in!`);
// });

// emitter.on("user-purchase", (username, item) => {
//   eventCounts["user-purchase"]++;
//   console.log(`${username} purchased ${item}!`);
// });

// emitter.on("profile-update", (username, field) => {
//   eventCounts["profile-update"]++;
//   console.log(`${username} updated their ${field}!`);
// });

// emitter.on("user-logout", (username) => {
//   eventCounts["user-logout"]++;
//   console.log(`${username} logged out!`);
// });

// emitter.on("summary", () => {
//   console.log(eventCounts);
//   localStorage.setItem("aloo",JSON.stringify(eventCounts))
// });

// // Emit some events
// emitter.emit("user-login", "Thapa");
// emitter.emit("user-purchase", "Thapa", "Laptop");
// // emitter.emit("profile-update", "Thapa", "email");
// // emitter.emit("user-logout", "Thapa");

// // Show the summary
// emitter.emit("summary");





// const EventEmitter=require("events")
// let emitter=new EventEmitter()


// emitter.on("fardeen",(data)=>{
//     console.log(data)
// })


// emitter.emit("fardeen","buy a laptop")



// const fs = require("fs/promises");

// async function readData() {
//   try {
//     const data = await fs.readFile("far.txt", "utf-8");
//     console.log("data is available:", data);
//   } catch (error) {
//     console.log("Error:", error.message);
//   }
// } 


// readData();

let http=require("http")

let server=http.createServer((req,res)=>{
res.setHeader("Content-Type","text/html")
if(req.url==="/"){
    res.write("<h1>hello my name is fareden khan</h1>")
}
res.end()

})


let port=4000

server.listen(port,()=>{
    console.log("your server is started");
    
})