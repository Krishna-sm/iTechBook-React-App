import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=({children})=>{
    const [alert,setAlert]=useState('');
    // const host="http://localhost:5000"
 

  const [notes,setNotes]=useState([]);
  const [user,setUser]=useState({});


  // set and display the alert message
  const setAlertMessage=(message)=>{
        setAlert(message);
        setTimeout(()=>{
            setAlert('');
        },2000)
  }

// get All notes

  const GetNote=async()=>{
    // TODO api call
 try {
  const url=`/api/note/fetchallnotes`;
  const response = await fetch(url,{
      method:"GET",
      headers:{
          'Content-Type':"application/json",
          'auth-token':localStorage.getItem("token")
      }
  })

  const json = await response.json();
  setNotes(json);
  
 } catch (error) {
  console.log("🚀 ~ ", error)
  
 }

};


const GetUser=async()=>{
  // TODO api call
try {
const url=`/api/auth/getuser`;
const response = await fetch(url,{
    method:"POST",
    headers:{
        'Content-Type':"application/json",
        'auth-token':localStorage.getItem("token")
    }
})

const json = await response.json();
setUser(json.user);
if(!json.success)
{
   return localStorage.removeItem("token");
}

// setUser(json.user);



} catch (error) {
console.log("🚀 ~ ", error)

}

};


  // Add a note

  const AddNote=async({title,description,tag})=>{
    // TODO api call
  try {
    const url=`/api/note/addnote`;
    const response = await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':"application/json",
            'auth-token':localStorage.getItem("token")
        },
        body:JSON.stringify({title,description,tag})
    })

    const json = await response.json();
    console.log(json);
    setAlertMessage("Note Added...");
  } catch (error) {
    setAlertMessage("Error Occoured");
    
  }

};

  // delete a note
  const DeleteNote=async(id)=>{
    
    // TODO api call
   try {
    const url=`/api/note/deletenote/${id}`;
    const response = await fetch(url,{
        method:"DELETE",
        headers:{
            'Contnent-Type':"application/json",
            'auth-token':localStorage.getItem("token")
        }
    })

    setAlertMessage("Note Deleteed....");
    GetNote();
  


   } catch (error) {
    setAlertMessage("Error Occoured");
    
   }
  }

  // update a note
  const UpdateNotes=async({id,title,description,tag})=>{
    // API call
   try {
    const url=`/api/note/updatenote/${id}`;
    const response = await fetch(url,{
        method:"PUT",
        headers:{
            'Content-Type':"application/json",
            'auth-token':localStorage.getItem("token")
        },
        body:JSON.stringify({title,description,tag})
    })
    const json =await response.json();
  await  GetNote();
    setAlertMessage("Note Updated.....");

   } catch (error) {
    setAlertMessage("Error Occoured");
    
   }







    for (let index = 0; index < notes.length; index++) {
        // logic building
        const element = notes[index];
        if(element._id === id)
        {
            element.title=title;
            element.description=description;
            element.tag=tag;
        }
        
    }
  }

    return <NoteContext.Provider value={{notes,setNotes,GetNote,AddNote,DeleteNote,UpdateNotes,setAlertMessage,alert,user,GetUser,setUser}} >
        {children}
    </NoteContext.Provider>
}

export default NoteState;