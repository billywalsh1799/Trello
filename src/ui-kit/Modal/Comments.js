import React,{useRef} from 'react'

import Controllers from '../Controllers/Controllers';
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

import {v4 } from 'uuid';
import './MyModal.css'

const Comments = ({comments_props}) => {

    const comment_input=useRef()

    let {comments,columnId,card_index,reset_handler,setter,comment_clicked}=comments_props

    
    const add_comment=()=>{
        if(comment_input.current.value){
            comments=[{id:v4(),content:comment_input.current.value},...comments]
            setter('c',columnId,card_index,["","",comments])
            reset_handler()
        }
    }

    const add_comment_keydown=(e)=>{
        if (e.key === 'Enter'){
            add_comment()
            e.preventDefault()
        }
    }

    const edit_comment=(index)=>{
        if(comment_input.current.value){
            comments.splice(index,1,{id:v4(),content:comment_input.current.value})
            setter('c',columnId,card_index,["","",comments])
            reset_handler()
        }
    }

    const edit_comment_keydown=(e,index)=>{
        if (e.key === 'Enter'){
            edit_comment(index)
            e.preventDefault()
        }
       
    }

    const delete_comment=(index)=>{
        comments.splice(index,1)
        setter('c',columnId,card_index,["","",comments])

    }




    const comment_keydown=(e)=>{
        if(e.target.scrollHeight>28){
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight-5+ 'px'
        }

       else
        e.target.style.height="20px"

        if (!e.target.value)
            e.target.style.height="20px" 

    }

   

    const comment_focus=(e)=>{
        let val = e.target.value
        e.target.value = ''
        e.target.value = val
        if(e.target.scrollHeight>28){
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight-5+ 'px'
        }

       else
        e.target.style.height="20px"

        if (!e.target.value)
            e.target.style.height="20px" 


    }
    return (
        <>
        <div className='modal-nested-flex'>
            <AiOutlineUnorderedList className='card-icon modal-flex-item' size="20px"/>
            <p className='item-one'>Activity</p>
        </div>

        <div className='modal-nested-flex'>
            <FaUserCircle size="25px" className='card-icon'/>
            
            <div className='comment-box'>
                {comment_clicked!==true && <div className='comment' onClick={()=>reset_handler("comment")}> Write a comment... </div>}
                {comment_clicked===true && <textarea ref={comment_input} className='comment-text-area' placeholder='Write a comment...' onInput={comment_keydown} onKeyDown={add_comment_keydown} autoFocus />}
                {comment_clicked===true && <div className='comment-controllers'><Controllers name="save" click={add_comment} cancel={()=>reset_handler()}/></div> }
            </div>
            
        </div>

        {comments.map(({id,content},index)=>(
        <div className='modal-nested-flex' key={id}>
            <FaUserCircle size="25px" className='card-icon'/>
            <div className='comment-box'>
                { comment_clicked!==id && <div className='comment'> {content} </div>}
                {comment_clicked===id && <textarea ref={comment_input} className='comment-text-area' placeholder='Write a comment...' onInput={comment_keydown} onKeyDown={(e)=>edit_comment_keydown(e,index)} defaultValue={content} autoFocus onFocus={comment_focus} />}
                {comment_clicked===id && <div className='comment-controllers'><Controllers name="save" click={()=>edit_comment(index)} cancel={()=>reset_handler()}/></div> }
            </div> 
            <p className='edit-comment' onClick={()=>reset_handler("edit comment",id)}>Edit</p>
            <p className='edit-comment' onClick={()=>delete_comment(index)}>Delete</p>
            
        </div>
        
        ))}

        </>
    )
}

export default Comments
