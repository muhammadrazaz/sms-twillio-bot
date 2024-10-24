import React, { useContext, useEffect, useRef, useState } from 'react'
import './MultiSelect.css'
import { MultiSelectContext } from '../../Context/MultiSelectProvider'
export default function MultiSelect(props) {
    
    // const {selectedOptions, setSelectedOptions,data,setData} = useContext(MultiSelectContext)
    const [selectedOptions,setSelectedOptions] = useState()
    const multiSelectRef = useRef(null)
    const [isSelectOption,setIsSelectOption] = useState(false)

    useEffect(()=>{
        // console.log(props.stateData,selectedOptions,'states')
        setSelectedOptions(props.stateData)
    },[props.stateData])

    useEffect(() => {
        const handleClickOutside = (event) => {
    
          if (multiSelectRef.current && !multiSelectRef.current.contains(event.target)) {
            setIsSelectOption(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [multiSelectRef]);


    const optionChange = (e) => {
        // props.setState(prevState=>({
        //     ...prevState,
        //     't':'test'
        // }))

        
        const {name,value} = e.target
        props.setState(prevState => ({
            ...prevState,
            [name]:[value]
    }))
        // if (e.target.checked) {
        //     props.setState(prevState => ({
        //         ...prevState,
        //         [name]:[...prevState[name]?[...prevState,value]:[value]]
        // }))
        // }
        // else {
        //     props.setState(prevState => ({
        //         ...prevState,
        //         [name]:[...prevState.filter(state => state !== e.target.value)]
        // }))
        // }
    }

    const removeOption = (value) => {
        setSelectedOptions(prevState => ([
            ...prevState.filter(state => state !== value)
        ]))
    }
    return (
        <div className="multi-select-div" ref={multiSelectRef} onClick={()=>{setIsSelectOption(true)}}>
            <input type="checkbox" name="multi-select-checkbox" id="" checked={isSelectOption} className='multi-select-checkbox d-none' />
            <div>
                {/* {selectedOptions.length ===0 &&<div>Select Options</div>} */}
                
                {selectedOptions && selectedOptions['states'] && selectedOptions['states'].map((state, index) => {
                    return <span className="selected-option sm-font regular-font mx-1" key={index}>
                        {state} <i class="ti ti-x d-inline-block ms-2" onClick={() => { removeOption(state) }}></i>
                    </span>
                })}
            </div>

            <div className='multi-select-optios'>
                {props.options.map((value, index) => {
                    return <div className='d-flex align-items-center sm-font regular-font option' key={index}>
                        <input type="checkbox" name={props.name} id={"option-" + index} value={value} checked={selectedOptions && selectedOptions['states'] && selectedOptions['states'].includes(value) ? true : false} onChange={optionChange} />
                        <label htmlFor={"option-" + index} className='ms-2'>{value}</label>
                    </div>
                })}

            </div>
        </div>
    )
}
