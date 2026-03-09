import { useContext } from "react"
import { ExpressionContext } from "../expression.context"
import { getsong } from "../services/expression.api"

export const useExpression = () => {

    const { mood, song, loading, error, setMood, setSong, setLoading, setError } = useContext(ExpressionContext)

    const handlegetsong = async (mood) => {
        const res = await getsong(mood)
        setSong(res.song)
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
        handlegetsong
    }

}