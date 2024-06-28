import { useContext, useEffect ,useState} from "react"
import { useLocation, useNavigate} from "react-router-dom"
import { AppContext } from "../context/AppContext"
import { baseUrl } from "../baseUrl"
import Header from "../components/Header"
import Spinner from "../components/Spinner"
import BlogDetails from "../components/BlogDetails"

export default function BlogPage(){
    const [blog,setBlog] = useState(null)
    const [relatedBlogs,setRelatedBlogs] = useState([])
    const location = useLocation()
    const blogId = location.pathname.split('/').at(-1)
    const {setLoading,loading} = useContext(AppContext)
    const navigate = useNavigate()

    async function fetchRelatedBlogs(){
        setLoading(true)
        let url = `${baseUrl}get-blog?blogId=${blogId}`
        console.log(url)
        try{
            const data = await fetch(url)
            const output = await data.json()
            console.log(output)
            setBlog(output.blog)
            setRelatedBlogs(output.relatedBlogs)
        }
        catch{
            console.log('Some Error Ocuured while fetching Data')
            setBlog(null)
            setRelatedBlogs([])
        }
        setLoading(false)
    }

    useEffect(()=>{
        if(blogId){
            fetchRelatedBlogs()
        }
    },[location.pathname])

    console.log(blog,relatedBlogs)

    return(
        <div>
             <Header/>
             <div className="mt-[72px] flex flex-col mx-auto  mb-5 items-center">
                <button className="border-2 py-[2px] px-[11px] mb-3" onClick={()=>navigate(-1)}>Back</button>
                {
                    loading?(<Spinner/>):(
                        blog ? (
                            <div>
                                <BlogDetails post={blog}/>
                                <h2 className="text-center my-3 text-lg font-bold">Related Blogs</h2>
                                {
                                    relatedBlogs.map((blog,index) =>(
                                        <BlogDetails key={index} post={blog}/>
                                    ))
                                }
                            </div>
                        )
                        :(<div>No Blogs Found</div>)
                    )
                }
             </div>
        </div>
    )
}