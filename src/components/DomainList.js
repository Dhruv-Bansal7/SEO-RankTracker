'use client'
import DoubleHeader from "./DoubleHeader";
import DomainRow from "./DomainRow";

export default function DomainList({domains , keywords,results}) {
    
    return (
        <div>
            <DoubleHeader preTitle={"Your Domains"} mainTitle={domains.length + ' Domains'}/>
            {domains.map((domain) => {
                return (
                    <DomainRow
                    key={domain._id}
                    icon ={domain.icon} 
                    domain = {domain.domain} 
                    owner = {domain.owner} 
                    keywords={keywords.filter(k => k.domain === domain.domain)} 
                    results={results.filter(r => r.domain === domain.domain)}
                    />
                )
            })}
        </div>
    );
}