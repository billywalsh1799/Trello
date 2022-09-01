import React,{useState,useEffect} from 'react'
import { Modal} from '@mantine/core';
import './MyModal.css'



import Description from './Description';
import Comments from './Comments';
import Title from './Title';


const MyModal = ({modal_props}) => {
    let {bigX,data,setter,columnId,card_index}=modal_props
    let {content:title,description,comments}=data
    
    //states

    const [card_title_clicked,set_card_title_clicked]=useState(false)
    const [description_clicked,set_description_clicked]=useState(false)
    const [comment_clicked,set_comment_clicked]=useState(false)

    

    // comment description components



    const handleclick=(e)=>{
        let classes=["modal-card-title2","comment","description",'edit-comment',"modal-card-title","mantine-144aj37 mantine-Modal-inner","description-text-area","comment-text-area","comment-box","add-list-card flex-item","controllers-flex"]
        let x=e.target.className
        //console.log(x)
        if (!classes.includes(x) ){
            set_card_title_clicked(false)
            set_description_clicked(false)
            set_comment_clicked(false)
        }
    }

    useEffect(()=>{
        document.addEventListener("click",handleclick)
        return ()=>{document.removeEventListener("click",handleclick)}
    },[])

   
    const reset_handler=(x,y)=>{
        switch(x){
            case "title":
                set_card_title_clicked(true)
                set_description_clicked(false)
                set_comment_clicked(false)
                break
            case "description":
                set_card_title_clicked(false)
                set_description_clicked(true)
                set_comment_clicked(false)
                break
            case "comment":
                set_card_title_clicked(false)
                set_description_clicked(false)
                set_comment_clicked(true)
                break
            
            case "edit comment":
                set_card_title_clicked(false)
                set_description_clicked(false)
                set_comment_clicked(y)
                break
            
            
            default:
                set_card_title_clicked(false)
                set_description_clicked(false)
                set_comment_clicked(false)
        }

    }
    const title_props=()=>{
        let o={title:title,card_title_clicked:card_title_clicked,reset_handler:reset_handler,setter:setter,columnId:columnId,card_index:card_index}
        return o
    }

    const description_props=()=>{
        let o={description:description,columnId:columnId,card_index:card_index,reset_handler:reset_handler,setter:setter,description_clicked:description_clicked}
        return o
    }

    const comments_props=()=>{
        let o={comments:comments,columnId:columnId,card_index:card_index,reset_handler:reset_handler,setter:setter,comment_clicked:comment_clicked}
        return o
    }

   
    return (
        <div>
            <Modal opened={true} onClose={bigX} size={500} title={<Title title_props={title_props()}/>} >
                <Description description_props={description_props()}/>
                <Comments comments_props={comments_props()}/>
            </Modal>
        </div>
        
    )
}

export default MyModal