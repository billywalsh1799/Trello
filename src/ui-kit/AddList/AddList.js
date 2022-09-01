import React from 'react'
import './AddList.css'
import {BiPlus } from "react-icons/bi";

const AddList = ({name,type,click,handler,columnId}) => {

    
    return (
        <div>
            <div className={type} onClick={type==="add-a-list" ? handler : ()=>click(columnId)} >
                <BiPlus size={type==="add-a-card" ? "16" : "18"}/> 
                <div className='test'>{name}</div>
            </div>
        </div>
    )
}

export default AddList