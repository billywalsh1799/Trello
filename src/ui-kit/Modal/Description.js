import React,{useRef} from 'react'
import './MyModal.css'
import Controllers from '../Controllers/Controllers';
import { MdOutlineSubject} from "react-icons/md";

const Description = ({description_props}) => {

    let{description,columnId,card_index,reset_handler,setter,description_clicked}=description_props

    const description_input=useRef()

    const add_description=()=>{
        setter('d',columnId,card_index,["",description_input.current.value,""])
        reset_handler()
    }


    const edit_description=(e)=>{
        if (e.key === 'Enter'){
            add_description()
        }
    }

    const description_keydown=(e)=>{
        
        if(e.target.scrollHeight>76){
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight-18+ 'px'
        }

       else
        e.target.style.height="60px"

        if (!e.target.value)
            e.target.style.height="60px"
            
    }

    const description_focus=(e)=>{
        let val = e.target.value
        e.target.value = ''
        e.target.value = val
        if(e.target.scrollHeight>76){
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight-18+ 'px'
        }

       else
        e.target.style.height="60px"

        if (!e.target.value)
            e.target.style.height="60px"

    }




    return (
        <>
        <div className='modal-nested-flex'>
            <MdOutlineSubject className='card-icon modal-flex-item' size="20px"/>
            <p className='item-one'>Description</p>
        </div>
                    
        {description_clicked && <textarea ref={description_input} onFocus={description_focus} className='description-text-area' placeholder='Add a more detailed description...' onInput={description_keydown} autoFocus defaultValue={description} onKeyDown={edit_description}/>}
        {description_clicked && <div className='description-controllers'>
                                    <Controllers name="save" click={add_description} cancel={()=>reset_handler()}/>
                                </div>}
        {!description_clicked &&<div className='description' onClick={()=>reset_handler("description")}>
                                    {!description ? "Add a more detailed descrption..." : description}
                                </div>}
        </>
  )
}

export default Description