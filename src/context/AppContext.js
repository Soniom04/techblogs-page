import { createContext, useEffect, useState} from "react";
import { baseUrl } from "../baseUrl";

export const AppContext = createContext()

export default function AppContextProvider({children}){
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [posts,setPosts] = useState([])
    const [totalPages,setTotalPages] = useState(null)
    const [tag, setTag] = useState(null);
    const [category, setCategory] = useState(undefined);
    
    async function fetchData(page=1,tag=null,category=undefined){
        setLoading(true)
        let url = baseUrl
        url+=`get-blogs?page=${page}`
        if(tag){
            url+=`&tag=${tag}`
        }
        else if(category){
            url+=`&category=${category}`
        }
        
        try {
            console.log(url)
            const result = await fetch(url)
            const data = await result.json()
            console.log(data)

            setPage(data.page)
            setPosts(data.posts)
            setTotalPages(data.totalPages)
        } 
        catch (error) {
            alert(error)
            setPage(1)
            setPosts([])
            setTotalPages(null)
        }
        setLoading(false)
    }

    useEffect(()=>{
        fetchData(page,tag,category)
    },[page,tag,category])

    const value = {
        loading,
        setLoading,
        posts,
        setPosts,
        page,
        setPage,
        totalPages,
        setTotalPages,
        fetchData,
        category,
        setCategory,
        tag,
        setTag
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}