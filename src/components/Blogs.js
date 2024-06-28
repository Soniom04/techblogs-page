import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Spinner from "./Spinner";
import BlogDetails from "./BlogDetails";

export default function Blogs(){
    const {posts,loading} = useContext(AppContext)
    console.log(posts)
    return(
        <div className="mb-[72px]">
            {
                loading ? (<Spinner/>):(
                    (posts.length === 0)?
                        (<div className="text-center mt-[15%] text-3xl font-bold">No Posts Found</div>)
                        :(
                            posts.map(post =>(
                                <BlogDetails key={post.id} post={post}/>
                            ))
                        )
                )
            }
        </div>
    )
}