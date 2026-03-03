const express=require("express")
const authRouter=require("../middlewares/auth.middleware")
const UserFollowRouter=express.Router()

const {FollowRoute,AcceptRoute,Reject,UnfollowRoute,StoryRoute,PersonProfile}=require("../controllers/follow.controller")


UserFollowRouter.post("/follow/:id",authRouter,FollowRoute)
UserFollowRouter.post("/request/accept/:id",authRouter,AcceptRoute)
UserFollowRouter.post("/request/reject/:id",authRouter,Reject)
UserFollowRouter.post("/unfollow/:id",authRouter,UnfollowRoute)
UserFollowRouter.get("/story",authRouter,StoryRoute)
UserFollowRouter.get("/personprofile/:id",authRouter,PersonProfile)
// UserFollowRouter.post("/userAlldetail",authRouter,useralldetail)









module.exports=UserFollowRouter