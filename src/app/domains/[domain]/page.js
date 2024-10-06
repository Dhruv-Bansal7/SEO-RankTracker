'use client'
import DeleteIcon from "@/components/DeleteIcon";
import DoubleHeader from "@/components/DoubleHeader";
import KeywordRow from "@/components/KeywordRow";
import NewkeywordForm from "@/components/NewKeywordForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function DomainPage(props) {
    const [loading,setLoading] = useState(false)
    const [keywords , setKeywords] = useState([]);
    const [results , setResults] = useState([])
    const router = useRouter();
    const domain = props.params.domain;
    useEffect(() => {
        fetchKeywords();
    }, [])
    function fetchKeywords () {
        setLoading(true)
        axios.get('/api/keywords?domain='+domain)
        .then(response => {
            setKeywords(response.data.keywords);
            setResults(response.data.results)
            setLoading(false);
        });
    }
    
    function deleteDomain() {
        axios.delete('/api/domains?domain='+domain)
        .then(() => {
            router.push('/');
        });
    }

    function showDeletePopup() {
        MySwal.fire({
            title : 'Delete?',
            text: `Are you sure you want to delete ${domain}?`,
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
                deleteDomain();
            }
        })
    }
    return (
        <div>
            <div className="flex items-end justify-between">
                <DoubleHeader 
                    preTitleLink={'/'}
                    preTitle={"Domain » "}
                    mainTitle={domain}
                />

                <DeleteIcon onClick={showDeletePopup} />
            </div>
            <NewkeywordForm
             domain={domain} 
             onNew={fetchKeywords} 
             onSavingStarted = {() => setLoading(true)}
            />
            {loading && (
                <div>Loading...</div>
            )}
            {!loading && keywords.map((data) => (
                <KeywordRow {...data} 
                        key={data._id}
                        results = {results.filter(r => r.keyword === data.keyword)}
                />
            ))}
            {!loading && !keywords.length && (
                <div>
                    No Keywords Found :(
                </div>
            )}
        </div>
    );
}