import { Area, AreaChart, ResponsiveContainer, Tooltip ,YAxis} from "recharts";
import { sortBy , uniqBy ,sumBy} from "lodash";
export default function Chart({results,height=75}) {
    if(results.length === 0) {
        return (
            <div>There is no Keywords</div>
        )
    }
    const lowestRank = sortBy(results,'rank').reverse()[0].rank;
    const highestRank = sortBy(results,'rank')[0].rank;
    const domainLow = lowestRank+3;
    if(lowestRank === 0 && highestRank === 0) {
        return (
            <div>Not Listed In Top 100</div>
        )
    }
    let data = results.sort((a, b) => new Date(a.date) - new Date(b.date));
    data = data
        .filter(res => res.rank !== 0)
        .map(res => {
        return {
            keyword : res.keyword,
            date : res.date,
            rank : res.rank,
            points : domainLow-res.rank,
        }
    })
    const dataWithDupes = [...data];
    data = uniqBy(data , r => r.date)
    data.forEach((result,index) => {
        const originalDataResults = dataWithDupes
            .filter(oResult => oResult.date === result.date);
        if(originalDataResults.length > 1){
            data[index]['points'] = sumBy(originalDataResults,'points')/originalDataResults.length;
            data[index]['rank'] = sumBy(originalDataResults,'rank') / originalDataResults.length;
        }
    });
    return (
        <div className="flex justify-center text-center">
            <ResponsiveContainer height={height}>
            <AreaChart  data={data} className="text-black"
                margin={{ top: 10, right: 0, left: 0, bottom: 0  }}>
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                    </linearGradient>
                </defs>
                <YAxis hide={true} domain={[2,lowestRank]} />
                <Tooltip
                    labelFormatter={(value, name, props) => name?.[0]?.payload?.date?.substring(0,10)}
                    formatter={(value,name,props) => ['Rank : '+props?.payload?.rank]}
                /> 
                <Area type="monotone" dataKey="points" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}