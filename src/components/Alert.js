import React, { useContext } from 'react'
import NoteContext from './../context/Notes/NoteContext';

const Alert = () => {
  const {alert} = useContext(NoteContext);
  return (
    <>
        { alert.length===0? '': <div className="alert alert-primary alert-dismissible fade show" role="alert">
  {alert}
  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
</div>
}

    </>
  )
}

export default Alert