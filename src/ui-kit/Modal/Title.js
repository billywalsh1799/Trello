import React,{useRef} from 'react'
import {MdOutlineCreditCard } from "react-icons/md";
import './MyModal.css'

const Title = ({title_props}) => {
    let {title,card_title_clicked,reset_handler,setter,columnId,card_index}=title_props
    const card_input=useRef()

    const edit_card_value=(e)=>{
        if (e.key === 'Enter' && card_input.current.value){
            setter('t',columnId,card_index,[card_input.current.value,"",""])
            reset_handler()
        }
        else if(e.key==="Enter" && !card_input.current.value)
            e.preventDefault()
    }

    
    const title_keydown=(e)=>{
        if(e.target.scrollHeight>28){
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight-5+ 'px'
        }
        else
            e.target.style.height="15px"

        if(!e.target.value)
            e.target.style.height="15px"
     
      }

      const title_focus=(e)=>{
        let val = e.target.value
        e.target.value = ''
        e.target.value = val
        if(e.target.scrollHeight>28){
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight-5+ 'px'

        }

        else
            e.target.style.height="15px"
        
      }



    return (
        <div className='modal-nested-flex'>
            <MdOutlineCreditCard size="20px" className='card-icon'/>
            {card_title_clicked && <textarea className='modal-card-title' ref={card_input} onFocus={title_focus} onInput={title_keydown} defaultValue={title} autoFocus onKeyDown={edit_card_value} />   }
            {!card_title_clicked && <div className='modal-card-title2' onClick={()=>reset_handler("title")}>{title}</div>  }
        </div>
    )
}

export default Title