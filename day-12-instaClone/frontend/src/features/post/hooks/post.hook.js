import { useContext } from "react"
import { Context } from "../post.context"
import { detailposting, folllow, like, save, unfolllow, unlike, unsave, upload } from "../services/post.api"
import { Useauth } from "../../auth/hooks/auth.hook"


export const usePost = () => {
    const { handlegetallpost, fetchUser } = Useauth()
    const { singlepost, setSinglepost } = useContext(Context)


    const likeHandle = async (id) => {

        const res = await like(id)
        await handlegetallpost()
    }
    const unlikeHandle = async (id) => {

        const res = await unlike(id)
        await handlegetallpost()
    }
    const followHandle = async (id) => {
        const res = await folllow(id)
        await handlegetallpost()
    }
    const unfollowHandle = async (id) => {
        const res = await unfolllow(id)
        await handlegetallpost()
    }
    const uploadHandle = async (formset) => {
        const res = await upload(formset)
        await handlegetallpost()
    }
    const saveHandle = async (id) => {

        const res = await save(id)
        await handlegetallpost()

    }
    const unsaveHandle = async (id) => {

        const res = await unsave(id)
        await handlegetallpost()

    }

    const detailpostHandle = async (id) => {
        const res = await detailposting(id)
        setSinglepost(res.detailpost)
        console.log(res.detailpost)
    }

    return ({ likeHandle, unlikeHandle, followHandle, unfollowHandle, uploadHandle, saveHandle, unsaveHandle, detailpostHandle, setSinglepost, singlepost })


}