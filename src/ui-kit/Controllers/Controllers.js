import React from 'react'
import './Controllers.css'
import { BiX} from "react-icons/bi";
import {FaTrashAlt} from 'react-icons/fa';


const Controllers = ({name,click,cancel,delete_card}) => {

    
    

    return (
        <div className='controllers-flex'>
            <button className="add-list-card flex-item" onClick={click}>{name}</button>
            {name==="Save" && <FaTrashAlt className='icon flex-item trash' size="15px" onClick={delete_card}/>}
            <BiX className='icon flex-item' size="28px" onClick={cancel} />
              
        </div>
        
    )
}

export default Controllers