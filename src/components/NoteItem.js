import React,{useContext} from 'react'
import NoteContext from './../context/Notes/NoteContext';
const NoteItem = ({note,updateNote}) => {
  const {DeleteNote,setAlertMessage} = useContext(NoteContext);

  return (
    <>
          <div className="col-md-3 mb-3">
          <div className="card">
                <div className="card-body">
                   <div className="d-flex align-items-center">
                   <h5 className="card-title">{note.title}</h5>
                    <i className="fa fa-trash mx-2" onClick={()=>{DeleteNote(note._id); setAlertMessage("Note Deleted")}} ></i>
                    <i className="fa fa-edit mx-2" onClick={()=>updateNote(note)}></i>
                   </div>
                    <p className='card-text'>{note.description.slice(0,20)}</p>
                
                </div>
            </div>
          </div>
    </>
  )
}

export default NoteItem