import Link from "next/link"
import { useEffect, useState } from "react"
import Chart from "./Chart";

export default function KeywordRow({keyword,owner,domain,results}) {
    results = results.map(r => ({date : r.createdAt,rank : r.position,keyword : r.keyword}))

    return(
        <div className="flex gap-4 my-2 p-2 text-black bg-slate-100 border border-blue-200 border-b-2 rounded-lg items-center justify-between">
            <Link href={'/domains/'+domain+'/'+encodeURIComponent(keyword)} className="font-bold ml-4 text-2xl"><h1>{keyword}</h1></Link>
            
            <div>
                <div className=" w-[350px] h-[75px] text-center justify-center">
                    <Chart results={results} />
                </div>
            </div>
        </div>
    )   
} 