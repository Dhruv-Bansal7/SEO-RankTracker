'use client'
import axios from "axios";
import { useState } from "react";


export default function NewkeywordForm({onNew , domain,onSavingStarted}) {
    const [keyword , setKeyword] = useState('');
    async function handleSubmit(e) {
        onSavingStarted();
        e.preventDefault();
        setKeyword('');
        await axios.post('/api/keywords' , {keyword , domain});
        onNew();
    }
    return (
        <form action="" className="flex gap-4 my-10" onSubmit={handleSubmit}>
            <input 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="bg-slate-100 border border-blue-200 border-b-2 px-4 py-2 text-xl rounded-lg grow text-black" 
            type="text" placeholder="New Keyword"/>
            <button 
            type="submit"
            className="bg-indigo-400 w-32 px-6 text-white rounded-lg border border-b-2 border-indigo-700">
                Add
            </button>
        </form>
    );
}