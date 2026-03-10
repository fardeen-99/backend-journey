import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useRecipe } from "../hooks/recipe.hook"
import { FaRegHeart, FaHeart, FaUserCircle, FaTag, FaEdit, FaTrash } from "react-icons/fa"
import { Loading } from "./Loader";

const SingleRecipe = () => {

    const [recipe, setRecipe] = useState([])
    const { id } = useParams()
    const { GetSingleRecipe, singleRecipe, getToknowfvrt, fvrt, handleFvrt, handleUnFvrt, postdelete, loading } = useRecipe()
    const navigate = useNavigate()

    useEffect(() => {
        GetSingleRecipe(id)
    }, [id])

    useEffect(() => {
        setRecipe(singleRecipe)
        console.log(recipe)
    }, [singleRecipe])

    const liker = (id, isfvrt) => {
        setRecipe(prev => prev.map(item => (
            item._id === id ? { ...item, isfvrt: !item.isfvrt } : item
        )))
        if (isfvrt) {
            handleUnFvrt(id)
        } else {
            handleFvrt(id)
        }
    }

    const postkarodelete = (id) => {
        postdelete(id)
        navigate("/collection")
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">
                {recipe.map((item) => (
                    <div key={item._id} className="bg-gray-800 rounded-3xl shadow-sm border border-gray-700 overflow-hidden flex flex-col lg:flex-row transition-all duration-300 hover:shadow-md">

                        {/* Image Section */}
                        <div className="w-full lg:w-1/2 relative h-[300px] sm:h-[400px] lg:h-auto min-h-[300px]">
                            <img
                                className="absolute inset-0 w-full h-full object-cover"
                                src={item.image}
                                alt={item.dishName}
                            />
                            {/* Favorite Button */}
                            <button
                                onClick={() => liker(item._id, item.isfvrt)}
                                className="absolute top-6 right-6 z-10 bg-gray-800/90 backdrop-blur-sm p-3.5 rounded-full shadow-md hover:bg-gray-700 transition-all duration-200 active:scale-95 group focus:outline-none"
                            >
                                {item.isfvrt ? (
                                    <FaHeart className="text-red-500 text-2xl transition-transform group-hover:scale-110" />
                                ) : (
                                    <FaRegHeart className="text-gray-400 hover:text-red-400 text-2xl transition-all group-hover:scale-110" />
                                )}
                            </button>
                        </div>

                        {/* Content Section */}
                        <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col bg-gray-800">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 capitalize leading-tight tracking-tight">
                                    {item.dishName}
                                </h1>

                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-700 text-gray-200 text-sm font-medium">
                                        <FaUserCircle className="text-base text-gray-400" />
                                        <span className="capitalize">{item.chef}</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-700 text-gray-200 text-sm font-medium">
                                        <FaTag className="text-base text-gray-400" />
                                        <span className="capitalize">{item.category}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Details Container */}
                            <div className="flex flex-col gap-10 grow">
                                {/* Ingredients */}
                                <section>
                                    <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-5 flex items-center gap-4">
                                        Ingredients
                                        <span className="h-px bg-gray-700 grow"></span>
                                    </h2>
                                    <div className="overflow-y-auto text-gray-300 text-lg max-h-30  break-words">
                                        {item.ingredients}
                                    </div>
                                </section>

                                {/* Instructions */}
                                <section className=" w-full ">
                                    <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-5 flex items-center gap-4">
                                        Instructions
                                        <span className="h-px bg-gray-700 grow"></span>
                                    </h2>
                                    <div className="overflow-y-auto text-gray-300 text-lg max-h-30 leading-relaxed break-words">
                                        {item.recipe}
                                    </div>
                                </section>
                            </div>

                            {/* Actions */}
                            <div className="mt-10 pt-6 border-t border-gray-700 flex flex-wrap gap-4">
                                <button
                                    onClick={() => navigate(`/edit/${item._id}`)}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 active:scale-95 shadow-sm"
                                >
                                    <FaEdit />
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={() => postkarodelete(item._id)}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-transparent hover:bg-red-900/30 text-red-400 border border-red-500/30 hover:border-red-500/50 px-8 py-3 rounded-xl font-medium transition-all duration-200 active:scale-95"
                                >
                                    <FaTrash />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SingleRecipe