import React from "react";
import { Link } from "react-router-dom";

const Account = ({ user }) => {
    
    return (
        <header aria-label="Page Header" className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                <div className="text-center sm:text-left">
                    <h1 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
                            Welcome Back, {user?.username}!
                    </h1>

                    <p className="mt-1.5 text-sm text-gray-500">
                    Let's get you in a new car! 🙌🏻
                        </p>
                        <div className="flex space-x-4">
                            <Link to = "/cars"><button className="btn btn-outline btn-primary">Find Your Car</button></Link>
                        <Link to = "/cart"><button className="btn btn-outline btn-secondary">View Your Cart</button></Link>

                        {user?.isAdmin && 
                        <Link to = "/admin">
                            <button className="btn btn-outline btn-accent">Admin</button>
                        </Link>
                            }
                            
                        </div>
                </div>
                </div>
             </div>
        </header>
)
}

export default Account; 