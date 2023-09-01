"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import Button from './Button';

const Navbar = () => {
    const { data: session } = useSession();
    const isLoggedIn = !!session?.user?.email
    const handleGoogleLoginButtonClick = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        signIn("google");
    }
    const handleLogoutButtonClick = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        signOut();
    }
    return (
        <div className="max-w-2xl mx-auto flex justify-end p-2 items-center">
            {isLoggedIn && (
                <>
                    <p>Hello, {session.user.name}!</p>
                    <div className="p-4">
                        <Button primary onClick={handleLogoutButtonClick}>Logout</Button>
                    </div>
                </>
            )
            }
            {
                !isLoggedIn && (
                    <>
                        <div className="p-4">
                            <Button primary onClick={handleGoogleLoginButtonClick}>Login</Button>
                        </div>
                    </>
                )
            }
        </div >
    )
}

export default Navbar