const Redis=require("ioredis").default


const redis=new Redis({
    host:process.env.REDIS_HOST,
    port:15315,
    password:process.env.REDIS_PASSWORD
})
redis.on("connect", () => {
  console.log("Redis connected")
})

// redis.on("error", (err) => {
//   console.log("Redis error:", err.message)
// })



module.exports=redis