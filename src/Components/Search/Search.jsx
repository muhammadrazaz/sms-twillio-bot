import React from 'react'
import './Search.css'
export default function Search(props) {
  const handleSearchChange = (e) =>{
    const value = e.target.value
    props.setSearch(value)
  }
  return (
    <div  className='search-div'>
        <input type="text" placeholder='Search' className='form-control noto-sans-font sm-font' name='search' onChange={handleSearchChange}/>
        <i className='ti ti-search'></i>
    </div>
  )
}
