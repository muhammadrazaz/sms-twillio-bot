import React, { useEffect, useRef, useState } from 'react'
import './MultiSelect.css'
export default function MultiSelect(props) {

    const [selectedOptions, setSelectedOptions] = useState([])
    const [isSelect, setIsSelect] = useState(false)
    const multiSelectRef = useRef(null)


    useEffect(()=>{
        if(props.stateData){
            if(props.stateData[props.name]){
                if(Array.isArray(props.stateData[props.name])){
                    setSelectedOptions(props.stateData[props.name])
                }
                else{
                    setSelectedOptions(props.stateData[props.name].replace(' ','').split(','))
                }
            }
            
        }
        // props.stateData && props.stateData[props.name] || []
    },[])


    useEffect(() => {

        if (selectedOptions.length > 0) {
            props.setState(prevState => ({
                ...prevState,
                [props.name]: selectedOptions
            }))
        }

    }, [selectedOptions])

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (multiSelectRef.current && !multiSelectRef.current.contains(event.target)) {
                setIsSelect(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [multiSelectRef]);
    const optionChange = (e) => {
        if (e.target.checked) {
            setSelectedOptions(prevState => ([
                ...prevState,
                e.target.value
            ]))
        }
        else {
            setSelectedOptions(prevState => ([
                ...prevState.filter(state => state !== e.target.value)
            ]))
        }
    }

    const removeOption = (value) => {
        setSelectedOptions(prevState => ([
            ...prevState.filter(state => state !== value)
        ]))
    }
    return (

        <div className={"multi-select-div "+props.className} ref={multiSelectRef} onClick={() => { setIsSelect(true) }}>
                <input type="checkbox" name="multi-select-checkbox" className='multi-select-checkbox d-none' checked={isSelect} />
            <div className='d-flex selected-options'>
                {/* <div className='selected-option-div'> */}
                    {selectedOptions.length === 0 && <div>Select Options</div>}
                    {selectedOptions.map((state, index) => {
                        return <div className="selected-option  mx-1 d-flex flex-row align-items-center" key={index}>
                            {state} <i class="ti ti-x d-inline-block ms-2" onClick={() => { removeOption(state) }}></i>
                        </div>
                    })}
                {/* </div> */}
            </div>

            <div className='multi-select-optios'>
                
                {props.options && props.options.map((value, index) => {
                    return <div className='d-flex align-items-center sm-font regular-font option' key={index}>
                        <input type="checkbox" name="" id={"option-" + index} value={value} checked={selectedOptions.includes(value) ? true : false} onChange={optionChange} />
                        <label htmlFor={"option-" + index} className='ms-2'>{value}</label>
                    </div>
                })}

            </div>
        </div>

    )
}
