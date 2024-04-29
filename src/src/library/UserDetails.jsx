import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";

const UserDetails = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                localStorage.setItem("libuser", JSON.stringify(user));
            } else {
                setUser(null);
                localStorage.removeItem("libuser");
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                localStorage.removeItem("libuser");
                navigate('/');
            })
            .catch((error) => {
                console.error("Error signing out: ", error);
            });
    };

    return (
        user && (
            <div className="max-w-md mx-auto mt-8 bg-white p-8 border rounded-lg shadow-md">
                <div className="text-center mb-4">
                    <img
                        src={user.photoURL || 'https://via.placeholder.com/150'}
                        alt="User Profile"
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <h2 className="text-xl font-semibold">{user.displayName}</h2>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600">Email: {user.email}</p>
                    <p className="text-gray-600">Mobile Number: {user.phoneNumber}</p>
                </div>

                <div className='flex justify-between'>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Logout
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        )
    );
};

export default UserDetails;
