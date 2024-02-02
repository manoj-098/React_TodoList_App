import React,{useState,useEffect} from 'react'
import './styles.css'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";




function TodoList() {
  const[value,setValue]=useState('')
  const[allTodos,setAllTodos]=useState([])
  // const[isStrike,setIsStrike]=useState(false)
  
  function addTask()
  {
    if(value==''){
        alert('Kindly enter something')
        return
    }

    
    let list={
      task:value,
      isStrike:false
    }
    let temp=[...allTodos]
    temp.push(list)
    setAllTodos(temp)
    localStorage.setItem('KEY',JSON.stringify(temp))
    setValue('')
    // ListItem
    // console.log("VALUE: "+value);
    
  }

  function deleteTask(task)
  {
    // let temp=[...allTodos]
    // index==0?temp.shift() : temp.splice(index,index)
    let list=allTodos.filter((item)=>{return(
        item.task!=task
    )})
    setAllTodos(list)
    localStorage.setItem('KEY',JSON.stringify(list))
    // console.log('INDEX: '+index)
  }
  function strike(task)
  {
    //APPROACH-1
       let temp=allTodos.map(item=>item.task==task?{...item,isStrike:!item.isStrike}:{...item})
      setAllTodos(temp)

      //APPROACH-2
      // setAllTodos(allTodos.map(item=>item.task==task?{...item,isStrike:!item.isStrike}:item))
      localStorage.setItem('KEY',JSON.stringify(temp))
  }
  const handleSubmit=event=>{
    event.preventDefault();
    addTask()
  }
    // useEffect(()=>{},)
    useEffect(()=>{
    let savedlist=JSON.parse(localStorage.getItem('KEY'))
    setAllTodos(savedlist)
  },[])

  return (
    <form onSubmit={handleSubmit}>
     <div className="container">
        <div className="input-field">
            <input type="text" value={value} placeholder="Add some task....." onChange={event=>setValue(event.target.value)}></input>
            <button type="button" onClick={()=>addTask()
            }
            >ADD</button>
        </div>
        {
          allTodos.map((item)=>
          {
            return(
              <div className='task-field' key={item.task}>
              <div  className={`${item.isStrike? "task class-true":"task class-false"}`} >
                  <MdOutlineCheckBoxOutlineBlank  className='image image_uncheck'  onClick={()=>strike(item.task)}/>
                  <IoCheckbox className='image image_check'  onClick={()=>strike(item.task)}/>
                  <h3       
                  >{item.task}
                  </h3>
                  <MdDelete className='image image3' onClick={()=>deleteTask(item.task)} />
              </div>
              </div>
            )

        }

          )
      }
      </div>
</form>
  )
}
export default TodoList
