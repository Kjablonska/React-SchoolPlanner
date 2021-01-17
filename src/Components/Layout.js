import React from 'react';
import Menu from './MenuComponent'

const Layout = ({ children }) => {
    return (
        <>
            <div>
                <Menu />
            </div>
            <main>{children}</main>
        </>
    )
}

export default Layout;