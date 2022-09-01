import React,{useState,useEffect} from 'react'
import {v4 } from 'uuid';



import './NewList.css'

import {DragDropContext} from 'react-beautiful-dnd';




import AddList from "../AddList/AddList";


import ListTitle from '../ListTitle/ListTitle';


import NewCardsContainer from '../CardsContainer/NewCardsContainer';
import SearchBar from '../SearchBar/SearchBar';





const NewList = () => {

    //states
    const [columns,updatecolumns]=useState({})
    const [add_list_clicked,set_add_list_clicked]=useState(false) 
    
    
    const [title_clicked,set_title_clicked]=useState(null)
    const[dots_icon_clicked,set_dots_icon_clicked]=useState(null)

    const [hovering,sethovering]=useState(null)
    const [add_card_clicked,set_add_card_clicked]=useState(null)

    const [card_clicked,set_card_clicked]=useState(null)
    const [modal,setmodal]=useState(null)

    
    
    //useeffect window clicked set all clicking states to false

    const handleclick=(e)=>{
        if(!e.target.className || e.target.className==="lists-container" || e.target.className==="column"){

           
            set_add_list_clicked(false)
            set_title_clicked(null)
            set_add_card_clicked(null)
            set_card_clicked(null)
            set_dots_icon_clicked(null) 
            
        }            
    }

    

    

    useEffect(()=>{
        document.addEventListener("click",handleclick)
        return ()=>{document.removeEventListener("click",handleclick)}
    },[])
    


    
    //add list add card
    const add_list=(x)=>{
        if(x){
            let column_id=v4()
            updatecolumns({...columns,[column_id]:{title:x,items:[]}})
            
        }
    }


    const add_card=(x,key)=>{
        if(x){
            let {title,items}=columns[key]
            let card_id=v4()
            updatecolumns({...columns,[key]:{title:title,items:[...items,{id:card_id,content:x, description:"",comments:[] }]}})
            //card_input.current.value=""
        }

    }

    //edit list title edit card

    const edit_title=(x,column_id)=>{
        if (x){
            let {items}=columns[column_id]
            updatecolumns({...columns,[column_id]:{title:x,items:items}})
            set_title_clicked(null)
        } 
           
    }

    const change_card_value=(x,column_id,index)=>{
        if(x){
            let {title,items}=columns[column_id]
            let {id,description,comments}=items[index]
            items.splice(index,1,{id:id,content:x,description:description,comments:comments})
            updatecolumns({...columns,[column_id]:{title:title,items:items}})
            //card_input.current.value=""
            set_card_clicked(null)
            sethovering(null)

        }
    }

    const delete_card=(column_id,index)=>{
        let {title,items}=columns[column_id]
        items.splice(index,1)
        updatecolumns({...columns,[column_id]:{title:title,items:items}})
        set_card_clicked(null)

    }




    

    

    


    //draghandlers

    const onDragEnd = ({source,destination}) => {
        if (!destination) return;
    
        if (source.droppableId !== destination.droppableId) {
          const sourceColumn = columns[source.droppableId];
          const destColumn = columns[destination.droppableId]
          const sourceItems = [...sourceColumn.items]
          const destItems = [...destColumn.items]
          const [removed] = sourceItems.splice(source.index, 1)
          destItems.splice(destination.index, 0, removed)
          updatecolumns({
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceItems
            },
            [destination.droppableId]: {
              ...destColumn,
              items: destItems
            }
          })
        } else {
          const column = columns[source.droppableId]
          const copiedItems = [...column.items]
          const [removed] = copiedItems.splice(source.index, 1)
          copiedItems.splice(destination.index, 0, removed)
          updatecolumns({
            ...columns,
            [source.droppableId]: {
              ...column,
              items: copiedItems
            }
          })
        }
      }



    //reset handlers

    const reset_handler=(x,y)=>{
        switch(x){
            case "ds":
                set_card_clicked(null)
                set_add_card_clicked(null)
                set_title_clicked(null)
                set_add_list_clicked(false)
                set_dots_icon_clicked(null)
                break
            case "lh":
                set_add_list_clicked(z=>!z)
                set_card_clicked(null)
                set_add_card_clicked(null)
                set_title_clicked(null)
                set_dots_icon_clicked(null)
                break
            
            case "ec":
                set_card_clicked(y)
                set_add_card_clicked(null)
                set_title_clicked(null)
                set_add_list_clicked(false)
                set_dots_icon_clicked(null)
                break
            
            case "ac":
                set_card_clicked(null)
                set_add_card_clicked(y)
                set_title_clicked(null)
                set_add_list_clicked(false)
                set_dots_icon_clicked(null)
                break
            case "di":
                set_card_clicked(null)
                set_add_card_clicked(null)
                set_title_clicked(null)
                set_add_list_clicked(false)
                set_dots_icon_clicked(y)
                break

            case "th":
                set_card_clicked(null)
                set_add_card_clicked(null)
                set_title_clicked(y)
                set_add_list_clicked(false)
                set_dots_icon_clicked(null)
                break

            case "hovering":
                sethovering(y)
                break
            
            case "modal":
                setmodal(y)
                set_card_clicked(null)
                set_add_card_clicked(null)
                set_title_clicked(null)
                set_add_list_clicked(false)
                set_dots_icon_clicked(null)
                sethovering(null)
                break

            default:
                set_dots_icon_clicked(null)
                //none of the above
            

        }

    }


   
    

    const menu_switch=(x,y)=>{
        switch(x){
            case 1:
                reset_handler("ac",y)
                break
            case 2:
                reset_handler("th",y)
                break
            case 3:
                delete columns[y]
                set_dots_icon_clicked(null)
                break
            default:
                //none of the above
            
        }

    }

    


    const modal_handler=(x,column_id,index,arr)=>{

        let {title,items}=columns[column_id]
        let{id,content,description,comments}=items[index]
        switch(x){
            case 't':
                
                items.splice(index,1,{id:id,content:arr[0],description:description,comments:comments})
                
                updatecolumns({...columns,[column_id]:{title:title,items:items}})
                
                break
            case 'd':
                items.splice(index,1,{id:id,content:content,description:arr[1],comments:comments})
                updatecolumns({...columns,[column_id]:{title:title,items:items}})
                
                break
            case 'c':
                items.splice(index,1,{id:id,content:content,description:description,comments:arr[2]})
                updatecolumns({...columns,[column_id]:{title:title,items:items}})

                
                break
            default:
                //none of the above

        }
    }


     const cardscontainer_props=(key,column)=>{
        let o={columnId:key,column:column,title_clicked:title_clicked,add_card_clicked:add_card_clicked,card_clicked:card_clicked,hovering:hovering,
            dots_icon_clicked:dots_icon_clicked,reset_handler:reset_handler,
            modal:modal,modal_handler:modal_handler,menu_switch:menu_switch,
            add_card:add_card,edit_title:edit_title,change_card_value:change_card_value,delete_card:delete_card
        }

        return o

    }
    
    



    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={()=>reset_handler("ds")} >
            <SearchBar data={columns} setmodal={setmodal}/>
            
            <ul className='lists-container'>
                {Object.entries(columns).map(([columnId, column])=>{
                    return(
                    <li className='column' key={columnId}>
                        <NewCardsContainer cardscontainer_props={cardscontainer_props(columnId,column)}/>
                    </li>
                    )
                })}

                {!add_list_clicked ? (<AddList name={!Object.keys(columns).length ? "Add list" : "Add another list"} type="add-a-list" handler={()=>reset_handler("lh")}/>) : (<ListTitle cancel={()=>reset_handler("lh")} add_list={add_list}  />)} 
            
            </ul>
        </DragDropContext>
        
    )
}

export default NewList
