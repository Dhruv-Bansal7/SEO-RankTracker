'use client';

import { signOut } from "next-auth/react";

export default function LogoutLink () {
    return (
        <button 
            onClick={() => signOut()}
            className="text-slate-300 hover:underline">
            Logout &raquo;
        </button>
    );
}