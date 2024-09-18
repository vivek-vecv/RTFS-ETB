import React from 'react'
import {
    TheContent,
    TheSidebar,
    TheFooter,
    TheHeader
} from './index'

const TheLayout = () => {
    const isMobile = window.innerWidth <= 760?true:false;
    return (
        <div className="c-app c-default-layout">

            {isMobile && <TheSidebar/>}
            <div className="c-wrapper">
                {isMobile && <TheHeader/>}
                <div className="c-body">
                    <TheContent/>
                </div>
            </div>
        </div>
    )
}

export default TheLayout
