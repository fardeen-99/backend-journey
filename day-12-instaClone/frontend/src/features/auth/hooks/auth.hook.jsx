import { useContext } from "react"
import { Context } from "../auth.context"

export const Useauth=()=>{

const context=useContext(Context)
return context


}