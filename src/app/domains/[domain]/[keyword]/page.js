'use client'

import Chart from "@/components/Chart";
import DeleteIcon from "@/components/DeleteIcon";
import DoubleHeader from "@/components/DoubleHeader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);


export default function KeywordPage(props) {
    const domain = props.params.domain;
    const keyword = decodeURIComponent(props.params.keyword);
    const router = useRouter();
    let [results,setResults] = useState([]);
    useEffect(() => {
        axios.get('/api/keywords?keywords='+keyword+'&domain='+domain)
        .then(response => setResults(response.data.results))
    },[])
    results = results.filter(r => r.keyword === keyword)
    results = results.map(r => ({date : r.createdAt,rank : r.position,keyword : r.keyword}));
    function deleteKeyword() {
        const url = '/api/keywords?domain='+domain+'&keyword='+encodeURIComponent(keyword)
        axios.delete(url).then(() => {
            router.push('/domains/'+domain);
        })
    }
    function showDeletePopup() {
        MySwal.fire({
            title : 'Delete?',
            text: `Are you sure you want to delete keyword "${keyword}"?`,
            showCancelButton : true,
            showCloseButton : true,
            cancelButtonText : 'Cancel',
            confirmButtonText : 'Delete',
            confirmButtonColor : '#d33',
            reverseButtons : true,
            focusCancel: true,
            focusConfirm : false,
        }).then((result) => {
            if(result.isConfirmed){
                deleteKeyword();
            }
        })
    }
    return (
    <div>
        {
            console.log({results})
        }
        <div className="flex justify-between mb-8">
            <DoubleHeader 
            preTitle={domain+" »"} 
            mainTitle={keyword}
            preTitleLink={`/domains/${domain}`}
            />
            <div>
                <DeleteIcon onClick={showDeletePopup} />
            </div>
        </div>
            <div className="text-center justify-cente">
                <Chart results={results} height={180} />
            </div>
    </div>
    );  
}