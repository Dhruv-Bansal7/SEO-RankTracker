'use client'
import NewDomainForm from "@/components/NewDomainForm";
import DomainList from "@/components/DomainList";
import { useState , useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [domains , setDomains] = useState([]);
  const [keywords , setKeywords] = useState([]);
  const [loading , setLoading] = useState(false);
  const [results,setResults] = useState([]);
    useEffect(() =>{
        fetchDomain();
    }, [])
    function fetchDomain() {
      setLoading(true);
      axios.get('/api/domains').then((res) => {
          setDomains(res.data.domains);
          setKeywords(res.data.keywords);
          setResults(res.data.results);
          setLoading(false); 
      });
    }
  return (
    <div>
        <NewDomainForm onNew={fetchDomain} onSavingStarted={() => setLoading(true)} />
        {loading && (
          <div>Loading ...</div>
        )}
        {!loading && (
          <DomainList domains={domains} keywords={keywords} results={results} />
        )}
        
      
    </div>
  );
}
