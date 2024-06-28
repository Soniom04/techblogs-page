import Header from "../components/Header"
import Blogs from "../components/Blogs"
import Footer from "../components/Footer"
import { useLocation, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"

export default function Body(){
    const navigate = useNavigate()
    const location = useLocation()
    const {totalPages} = useContext(AppContext)
    let tag = null
    let category = undefined

    if(location.pathname.includes('categories')){
        category = location.pathname.split('/').at(-1)
    }
    else if(location.pathname.includes('tags')){
        tag = location.pathname.split('/').at(-1)
    }
    return (
        <div>
            <Header/>
                { !location.pathname.includes('categories') && !location.pathname.includes('tags') &&
                    <div className="mt-[50px] flex w-11/12 max-w-[550px] mx-auto space-x-8 mb-5"/>
                }
                { location.pathname.includes('categories') &&
                    <div className="mt-[70px] flex w-11/12 max-w-[550px] mx-auto space-x-8 mb-5">
                        <button className="border-2 py-[2px] px-[11px]" onClick={() => navigate(-1)}>Back</button>
                        <h2 className="text-lg">Blogs on <span>{category}</span></h2>
                    </div>
                }
                { location.pathname.includes('tags') &&
                    <div className="mt-[70px] flex w-11/12 max-w-[550px] mx-auto space-x-8 mb-5">
                        <button className="border-2 py-[2px] px-[11px]" onClick={()=> navigate(-1)}>Back</button>
                        <h2 className="text-lg">Blogs Tagged <span>#{tag}</span></h2>
                    </div>
                }
            <Blogs/>
            {totalPages &&
                <Footer/>
            }
        </div>
    )
}