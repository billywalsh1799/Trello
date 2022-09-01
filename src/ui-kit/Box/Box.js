import React from 'react'
import './Box.css'

//import {BiTrash} from "react-icons/bi";



const Box = ({title,click}) => {
    return (
        <div className='task-box' onClick={click}>{title}</div>
    )
}

export default Box