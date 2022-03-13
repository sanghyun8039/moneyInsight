import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import React, { useState } from 'react';
import './Layout.css';

const Layout = () =>
{
    const [clickValue,setClickValue] = useState(true);

    const getClickValue = (value) =>
    {
        setClickValue(value);
    }

    return (
        <div className='Layout'>
            <Header getClickValue = {getClickValue}/>
            <Body clickValue = {clickValue}/>        
            <Footer/>
        </div>
       
    )
}

export default Layout