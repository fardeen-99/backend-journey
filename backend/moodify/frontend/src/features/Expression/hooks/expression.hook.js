import { useContext } from "react"
import { ExpressionContext } from "../expression.context"
import { getsong,getusersong,uploadsong } from "../services/expression.api"

export const useExpression = () => {

    const { mood, song, loading, error, setMood, setSong, setLoading, setError,usersong,setusersong } = useContext(ExpressionContext)

    const handlegetsong = async (mood) => {
        const res = await getsong(mood)
        setSong(res.song)
    }

    const handlegetusersong=async(mood)=>{
        const res=await getusersong(mood)
        setusersong(res.song)
    }
    const handleuploadsong=async(mood,song)=>{
        const res=await uploadsong(mood,song)
        setusersong(res.song)
    }


    return {
        mood,
        song,
        loading,
        error,
        setMood,
        setSong,
        setLoading,
        setError,
        handlegetsong,
        usersong,
        setusersong,
        handlegetusersong,handleuploadsong
    }

}