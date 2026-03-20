import { useContext } from "react";
import { chatContext } from "../chat.context";

const useChat = () => {
    return useContext(chatContext);
};

export default useChat;
