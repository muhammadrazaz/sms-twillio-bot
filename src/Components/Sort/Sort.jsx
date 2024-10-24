import React, { useEffect, useRef, useState } from 'react'
import './Sort.css'
export default function Sort(props) {
    const [sortCheckbox,setSortCheckbox] = useState(false)
    const sortRef = useRef(null);
    
    
    useEffect(() => {
      const handleClickOutside = (event) => {
        
        if (sortRef.current && !sortRef.current.contains(event.target)) {
          setSortCheckbox(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [sortRef]);

    const handleSortChange = (e) =>{
      const value = e.target.value

      if(props.sortBy === value){
        props.setSortBy('')
      }
      else{
        props.setSortBy(value)
      }
      setSortCheckbox(false)
    }

  return (
    <div className='sort-checkbox me-2' ref={sortRef}>
        <input type="checkbox" name="options-checkbox" id="sort-checkbox" className='d-none' checked={sortCheckbox} onChange={()=>{setSortCheckbox(!sortCheckbox)}}/>
        <label htmlFor="sort-checkbox" className='m-0 sm-font noto-sans-font regular-font'><i className="ti ti-sort-ascending-2 me-2"></i>Sort 
            <i className="ti ti-chevron-down ms-1 drop-icon d-inline-block"></i>
            <div className='sort-option'>
                <button className={'x-sm-font noto-sans-font option text-start w-100 my-1 '+(props.sortBy === 'asc'?'option-active':'')} value='asc' style={{fontWeight:400}} onClick={handleSortChange}>
                <i className="ti ti-circle-chevron-right me-1"></i>
                Ascending
                </button>
                <button className={'x-sm-font noto-sans-font option text-start w-100 my-1 '+(props.sortBy === 'desc'?'option-active':'')}  value='desc' style={{fontWeight:400}} onClick={handleSortChange}>
                <i className="ti ti-circle-chevron-right me-1"></i>
                Descending
                </button>
            </div>
            </label>
    </div>
  )
}
