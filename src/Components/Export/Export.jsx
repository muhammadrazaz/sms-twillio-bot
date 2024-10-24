import React, { useEffect, useRef, useState } from 'react'
import { CSVLink } from "react-csv";
import './Export.css'
export default function Export(props) {
  const [exportCheckbox, setExportCheckbox] = useState(false)
  const exportRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (exportRef.current && !exportRef.current.contains(event.target)) {
        setExportCheckbox(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [exportRef]);


  var columns = []
  var data = []

  if(props.data){

  if (props.data.length && props.columns.length) {

    data = props.data

    for (let i = 0; i < props.columns.length; i++) {

      columns.push({ label: props.columns[i].dataField, key: props.columns[i].dataField })

    }

  }
  else {
    if (props.data !== undefined) {
      if (props.data.columns !== undefined) {

        for (let i = 0; i < props.data.columns.length; i++) {


          columns.push({ label: props.data.columns[i].label, key: props.data.columns[i].field })


        }

        if (props.data.rows !== undefined) {
          data = props.data.rows;
        }
      }





    }
  }
}
  




  const csvReport = {
    data: data,
    headers: columns,
    filename: props.filename
  };

  return (
    <div className='export-comp' ref={exportRef}>
      
        <input id='export-checkbox' type="checkbox" className='d-none' name='options-checkbox' checked={exportCheckbox} onChange={() => { setExportCheckbox(!exportCheckbox) }} />
        <label htmlFor="export-checkbox" className='m-0 sm-font noto-sans-font regular-font'><i className="ti ti-package-export me-2"></i>Export
          <i className="ti ti-chevron-down ms-1 drop-icon d-inline-block"></i>
          <div className='export-option'>
            <CSVLink  {...csvReport} className='x-sm-font noto-sans-font option text-start'  style={{ fontWeight: 400,color:'black' }} onClick={()=>{setExportCheckbox(false)}}>
              <i className="ti ti-file-type-xls text-green me-1" style={{ color: 'green' }}></i>
              Export
              as CSV
            </CSVLink>
          </div>
        </label>
     



    </div>
  )
}
