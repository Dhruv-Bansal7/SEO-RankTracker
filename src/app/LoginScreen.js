'use client';
import { signIn } from "next-auth/react"

export default function LoginScreen() {
    return (
        <div className="text-center">
            <div className="my-6">
                <a href="/" className="my-10 text-3xl font-bold bg-gradient-to-r from-red-400 to-purple-300 text-transparent bg-clip-text">
                    SEO RankTracker
                </a>
            </div>
            <main className="bg-white mt-8 max-w-md border border-blue-300 border-b-4 text-slate-950 mx-auto rounded-xl p-4 text-center">
                <h1 className="text-slate-400 text-xl uppercase">Welcome Back</h1>
                <h2 className="font-bold text-3xl mb-4">Login to Your Account</h2>
                <button 
                    onClick={() => signIn('google')}
                    className="mb-4 bg-indigo-500 text-white px-6 py-2 rounded-xl border-indigo-600 border-b-4 inline-flex gap-2 items-center">
                    Login with Google 
                    <img className="w-4 invert" src="https://www.svgrepo.com/show/327365/logo-google.svg" alt="" />
                </button>
                

            </main>
        </div>
        
    );
}