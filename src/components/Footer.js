import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Footer(){
    const {page, category ,tag , totalPages , setPage} = useContext(AppContext)
    console.log(page,tag,category)
    return(
        <div className="text-center  py-3 border-t-4 text-md fixed bottom-0 w-full mx-auto bg-white">
            <div className="flex items-center w-11/12 max-w-[550px] mx-auto justify-between"> 
                <div className="flex space-x-3">
                    { page !== 1 &&
                        <button onClick={() =>setPage(page-1)}
                        className="border-2 py-[2px] px-[5px]">Previous</button>
                    }
                    { page !== totalPages &&
                        <button onClick={() =>setPage(page+1)}
                        className="border-2 py-[2px] px-[11px]">Next</button>
                    }
                </div>
                <div>
                <p>Page {page} of {totalPages}</p>
                </div>
            </div>
        </div>
    )
}