import React, { useEffect, useRef, useState } from 'react'
import './TableAction.css'
export default function TableAction({index,children}) {
    const [actionChecked,setActionChecked] = useState(null)
    const actionRef = useRef(null); 
    
    useEffect(() => {
        
        const handleClickOutside = (e) => {
          if (
            actionRef.current &&
            !actionRef.current.contains(e.target) && // Click is outside the container
            e.target.tagName !== 'INPUT' &&         // Not on the checkbox
            e.target.tagName !== 'LABEL'            // Not on the label
          ) {
            setActionChecked(null);  // Uncheck the checkbox
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [actionRef, setActionChecked]);
    
    const handleActionChange = (e) =>{
   
        if(actionChecked === e.target.value){
          setActionChecked(null)
        }
        else{
          setActionChecked(e.target.value)
        }
      
  
    }
  return (
    <div className='table-action' ref={actionRef}>
          <input type="checkbox" name="action-checkbox" id={index} className='d-none' value={index} checked={actionChecked==index?true:false} onChange={handleActionChange} />
          <label htmlFor={index} className='action-label'>
            <i className="fa fa-ellipsis-v"></i>
          </label>

          {children}
        </div>
  )
}
