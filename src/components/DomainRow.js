import Link from "next/link";
import Chart from "./Chart";

export default function DomainRow ({domain , icon , owner , keywords,results}) {
  results = results.map(r => ({date : r.createdAt,rank : r.position,keyword : r.keyword}))
    return (
        <div className="flex gap-4 my-3 text-black bg-slate-100 border border-blue-200 border-b-2 p-2 rounded-lg items-center justify-between">
        <div className="flex gap-4 items-center">
          {icon && (
            <img src={icon} className="h-10" />
          )}
          <div>
              <Link href={'/domains/'+domain} className="font-bold text-xl">
                <h2>{domain}</h2>
              </Link>
            {keywords.map( keywordDoc => (
              <span key={keywordDoc._id} className="bg-slate-300 text-xs inline-block mt-1 mr-1 p-1 px-3 rounded-lg">
                {keywordDoc.keyword}
              </span>
            ))}
          </div>
        </div>
        <div>
            <div className=" w-[350px] h-[75px]">
                <Chart results={results} />
            </div>
        </div>
      </div>
    );
}