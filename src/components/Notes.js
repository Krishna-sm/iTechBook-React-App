import React,{useContext, useEffect,useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from './../context/Notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
const Notes = () => {
  const navigate= useNavigate();
  const ref=useRef(null);
  const refClose = useRef(null);
  const {notes,GetNote,UpdateNotes,setAlertMessage,GetUser} = useContext(NoteContext);
  const [note,setNote]=useState({
    id:'',
    title:'',
     tag:'',
     description:''
 })
  const updateNote=async(curruntNote)=>{
    ref.current.click();
    setNote({title:curruntNote.title,tag:curruntNote.tag,description:curruntNote.description,id:curruntNote._id});
    console.log(note,curruntNote);
  }
  
 
const onChangeHandler=(e)=>{
  setNote({
    ...note,
    [e.target.name]:e.target.value
  })
}

const updateMethod=()=>{
  
 
  UpdateNotes(note);
  refClose.current.click();
  setAlertMessage("note updated....");
 
}
useEffect(()=>{
  if(!localStorage.getItem("token"))
  {
    navigate("/login");
  }
  else{
    GetNote();
    GetUser();
  }
  // eslint-disable-next-line
},[])

  return (
    <div className="row my-3">
        <AddNote/>

<div>
<button ref={ref}  type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>



  <div className="modal fade" id="exampleModal"  tabIndex={-1} aria-labelledby="exampleModalLabel"  aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          <form action="" onSubmit={(e)=>e.preventDefault()} method="post">
            <div className="mb-3">
              <label htmlFor="">Title</label>
              <input type="text" name='title' value={note.title} className="form-control" onChange={onChangeHandler} />
            </div>
            <div className="mb-3">
              <label htmlFor="">Tag</label>
              <input type="text" name='tag' value={note.tag} className="form-control" onChange={onChangeHandler} />
            </div>
            <div className="mb-3">
              <label htmlFor="">Description</label>
              <input type="text" name='description' value={note.description} className="form-control" onChange={onChangeHandler} />
            </div>
           
          </form>
        </div>
        <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={updateMethod} className="btn btn-primary">Update Note</button>
      </div>
      </div>
    </div>
  </div>
</div>



    <h1>Your Notes:</h1>

 <div className="container">
 { notes.length === 0 && 'No Notes to Display' }
 </div>
    {
     notes.map((c,i)=>(
        <NoteItem updateNote={updateNote} note={c} key={i} />
      ))
    }
  </div>

  )
}

export default Notes