import Header from './Header';
import Footer from './Footer';
import React, { useState } from 'react';

const Layout = ({mainLayout, subLayout}) =>
{
    const [clickValue,setClickValue] = useState(true);

    const getClickValue = (value) =>
    {
        setClickValue(value);
    }

    return (
        <div>
            <Header clickValue = {clickValue} getClickValue = {getClickValue}/>
            <main>
                {clickValue?mainLayout:subLayout}
            </main>
            
            <Footer/>
        </div>
       
    )
}

export default Layout