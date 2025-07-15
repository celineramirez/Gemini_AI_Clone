import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const onSent = async () => {
        try {
            setResultData("")
            setLoading(true)
            setShowResult(true)
            // store response
            const response = await runChat(input)
            setResultData(response)
            // turn off loading animation
            setLoading(false)
            // reset input field
            setInput("")
        }
        catch (e) {
            console.error("Error running chat:", e);
        }
    }

        const contextValue = {
            prevPrompts,
            setPrevPrompts,
            onSent,
            setRecentPrompt,
            recentPrompt,
            showResult,
            loading,
            resultData,
            input,
            setInput
        }

        return (
            <Context.Provider value={contextValue}>
                {props.children}
            </Context.Provider>
        )
    }

    export default ContextProvider;