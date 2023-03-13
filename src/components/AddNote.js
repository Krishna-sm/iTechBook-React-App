import React,{useContext, useState} from 'react'
import NoteContext from './../context/Notes/NoteContext';
const AddNote = () => {
    const {AddNote,GetNote,setAlertMessage} = useContext(NoteContext);



    const [data,setData]=useState({
        title:'',
        tag:'',
        description:''
    })
    const handleClick=()=>{

      if(data.title.length<5 || data.tag.length<5 || data.description.length<5)
      {
        
         return setAlertMessage("all feild must be have 5 or more above characters");

      }


        AddNote(data);
        setData({
            title:'',
            tag:'',
            description:''
        })
        GetNote();
        
    }



    const onchangeEvent=(e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }
  return (
    <>
      <h1>Add a Note</h1>
        <div className="container px-5 my-4 ">
          <form action="" onSubmit={(e)=>e.preventDefault()} method="post">
            <div className="mb-3">
              <label htmlFor="name">Title</label>
              <input type="text"  name='title' onChange={onchangeEvent} className="form-control" value={data.title} placeholder='Enter title' />
            </div>
            <div className="mb-3">
              <label htmlFor="name">tag</label>
              <input type="text"  name='tag' onChange={onchangeEvent} className="form-control" value={data.tag} placeholder='Enter Tag' />
            </div>
            <div className="mb-3">
              <label htmlFor="name">Description</label>
              <textarea name='description'  onChange={onchangeEvent} value={data.description} id="" cols="30" placeholder='Enter Description' rows="3" className="form-control"></textarea>
            </div>
            <div className="mb-3">
                <button className="btn btn-primary" onClick={handleClick} >Add Note &rarr;</button>
             </div>
          </form>
        </div>
    </>
  )
}

export default AddNote