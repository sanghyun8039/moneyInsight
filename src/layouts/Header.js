import { useState } from 'react';
import App from '../App';
import './Header.css';



const Header = ({clickValue, getClickValue}) =>
{
    const [layoutState,setLayoutState] = useState(false);
    const onClick = (e) =>
    {

        console.log(layoutState);
        getClickValue(layoutState);
        
        setLayoutState((current) => !current);
    }

    return(
        <div className ='Head'>
            <button>navIcon</button>
            <h1>This is 213124</h1>
            <button onClick={onClick}>Click</button>
        </div>    
    )
}

export default Header;