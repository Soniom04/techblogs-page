import { NavLink } from "react-router-dom"

export default function BlogDetails(props){
    const post = props.post
    console.log(post)
    return(
        <div className="w-11/12 max-w-[550px] mx-auto mb-7"> 
            <NavLink to={`/blogs/${post.id}`}><h1 className="font-bold text-black text-lg">{post.title}</h1></NavLink>
            <p className="text-[14px]">
                By <span className="italic">{post.author}</span> on
                <NavLink to={`/categories/${post.category.replaceAll(' ','-')}`}>
                    <span className="font-bold underline ml-1">{post.category}</span>
                </NavLink>
            </p>
            <p className="text-[14px]">Posted on <span>{post.date}</span></p>
            <p className="text-[15.5px] mt-2">{post.content}</p>
            <div className="space-x-3">
                {
                    post.tags.map((tag,index) =>{
                        return <NavLink to={`/tags/${tag.replaceAll(' ','-')}`}>
                            <span className="text-blue-700 text-sm underline cursor-pointer" key={index}>{`#${tag}`}</span>
                        </NavLink>
                    })
                }
            </div>
        </div>
    )
}