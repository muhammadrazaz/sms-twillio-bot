import React, { useState, useRef, useEffect } from 'react'
import './Filter.css'
export default function Filter(props) {
  const [filterCheckbox, setFilterCheckbox] = useState(false)
  const [selectedOption, setSelectedOption] = useState(Object.keys(props.filterOption)[0] || null);

  const filterRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {

      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterCheckbox(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterRef]);

  const handleOptionClick = (key) => {
    // Toggle the selected option or uncheck if clicked again
    setSelectedOption(prevSelectedOption => (prevSelectedOption === key ? null : key));
  };

  const handleSelectedFitlerOptionChnage = (e, key, value) => {

    var newFilterArray
    if (e.target.checked) {
      newFilterArray = [...props.selectedFilterOption[key] || [], value]

    }
    else {

      newFilterArray = props.selectedFilterOption[key].filter(item => item !== value)

    }
    if (newFilterArray.length !== 0) {
      props.setSelectedFilterOption(prevState => ({
        ...prevState,
        [key]: newFilterArray
      }))
    }
    else {
      const newState = { ...props.selectedFilterOption }
      delete newState[key]
      props.setSelectedFilterOption(newState)
    }





  }





  return (
    <div className='filter-comp' ref={filterRef}>
      <input id='filter-checkbox' type="checkbox" className='d-none' name='options-checkbox' checked={filterCheckbox} onChange={() => { setFilterCheckbox(!filterCheckbox) }} />
      <label htmlFor="filter-checkbox" className='m-0 sm-font noto-sans-font regular-font filter-checkbox-label'><i className="ti ti-filter-share me-2"></i>Filter
        {/* <i className="ti ti-chevron-down ms-1 drop-icon d-inline-block"></i> */}

      </label>

      <div className='filter-option'>
        <div className="filter-head mb-3">

          <p className='noto-sans-font large-font bold-font mb-2'> <i className="ti ti-filter-share me-2 large-font"></i>Filter</p>
        </div>

        <div>
          {Object.keys(props.filterOption).map((key, index) => {
            return <div key={index} className='mb-4'>

              <input type="radio" name='filter-option-selection' id={key} className='d-none' checked={selectedOption === key} onChange={()=>{}} onClick={() => handleOptionClick(key)} />
              <label htmlFor={key} className='text-capitalize noto-sans-font sm-font semibold-font p-0' style={{ border: 'none' }}> <i className="ti ti-chevron-right ms-1 d-inline-block me-2"></i>{key}</label>
              <div className="sub-options">

                {props.filterOption[key].map((value, secondIndex) => {
                  return <div key={secondIndex} className='d-flex align-items-center mb-3'>

                    <input type="checkbox" name={key} id={key + "-" + value} className='me-2'
                      checked={props.selectedFilterOption && props.selectedFilterOption[key] && props.selectedFilterOption[key].includes(value) ? true : false}
                      onChange={(e) => { handleSelectedFitlerOptionChnage(e, key, value) }} />
                    <label htmlFor={key + "-" + value} className='option-checkbox x-sm-font noto-sans-font regular-font'>{value}</label> <br />
                  </div>
                })}



              </div>

            </div>
          })}

          <div className="row filter-action-btn noto-sans-font sm-font semibold-font">
            <div className="col-6">
              <button onClick={() => { props.setSelectedFilterOption({}); props.setIsFilterChange(!props.isFilterChange);setFilterCheckbox(false) }} className='reset-btn'>Reset</button>
            </div>
            <div className="col-6">
              <button onClick={() => { props.setIsFilterChange(!props.isFilterChange);setFilterCheckbox(false) }} className='filter-btn'>Filter</button>
            </div>
          </div>


        </div>
      </div>



    </div>
  )
}
