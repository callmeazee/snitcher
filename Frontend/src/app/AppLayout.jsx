import React from 'react'
import Nav from '../features/Shared/Components/Nav'
import Footer from '../features/Shared/Components/Footer'
import { Outlet } from 'react-router'

const AppLayout = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div>
                <Nav />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default AppLayout