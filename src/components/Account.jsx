import React, { useEffect } from "react";
import { fetchAllAdmin, fetchMe } from '../api';
import { Link } from "react-router-dom";

const Account = ({ username, token, user }) => {
    console.log({ username });
    console.log(token);

    const getAdmin = async () => {
        const getAllAdmin = await fetchAllAdmin(token);
        console.log(getAllAdmin);
    }
    console.log(getAdmin());
    
    return (
        <header aria-label="Page Header" className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Welcome Back, {username}!
                    </h1>

                    <p className="mt-1.5 text-sm text-gray-500">
                    Let's write a new blog post! 🎉
                        </p>

                        {/* Ternary here to activate admin button  */}
                        
                        <Link to = "/admin">
                            <button className="btn btn-outline btn-secondary">Admin</button>
                        </Link>

                </div>
                </div>
             </div>
        </header>
)
}

export default Account; 