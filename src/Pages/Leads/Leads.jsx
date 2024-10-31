import React, { useContext, useEffect, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import TableSearchSortFilter from '../../Components/TableSearchSortFilter/TableSearchSortFilter'
import './Leads.css'
import { setDate, subDays } from 'date-fns'
import TableAction from '../../Components/TableAction/TableAction'
import RightBarForm from '../../Components/RightBarForm/RightBarForm'
import RightBar from '../../Components/RightBar/RightBar'
import { useRightBar } from '../../Provider/RightBarProvider'
import { useApi } from '../../Provider/ApiProvider'
import axios from '../../Api/axios'

export default function Leads() {

  const {setRightBarCheckbox} = useRightBar()
  const {increaseApiCounter,decreaseApiCounter} = useApi()

  const [dates, setDates] = useState([subDays(new Date(), 30), new Date()])
  const [editData, setEditData] = useState({})
  const [isEditFormShow, setIsEditFormShow] = useState(false)
  const [errors, setErrors] = useState({})
  const [filterOption,setFilterOption] = useState({})

  const [tableData, setTableData] = useState({
    columns: [
      {
        label: "User ID",
        field: "user_id"
      },
      {
        label: "Username",
        field: "username"
      },
      {
        label: "States",
        field: "state_names"
      },

      {
        label: "WhatsApp",
        field: "whatsapp"
      },
      {
        label: "SMS",
        field: "sms"
      },
      {
        label: "Email",
        field: "email"
      },
      {
        label: "Discord",
        field: "Discord"
      },
      {
        label: "Instagram",
        field: "instagram"
      },
      {
        label: "Snapchat",
        field: "snapchat"
      },
      {
        label: "Notes",
        field: "notes"
      },
      {
        label: "Status",
        field: "status"
      },

    ],

  })


  useEffect(() => {
    getLeadsApi()
  }, [dates])

  useEffect(()=>{
    getLeadFilterOptions()
  },[])



  const handleEditLeadChange = (e) => {
    const { name, value } = e.target
    console.log(name)
    setEditData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }




  const showEditLead = (e) => {
  
    setEditData(JSON.parse(e.target.value));
    setIsEditFormShow(true)
    setRightBarCheckbox(true)
  }


  const getLeadsApi = () => {
    increaseApiCounter()
    axios.get('leads/',{
      params:{
        dates:dates
      }
    })
      .then(response => {
        console.log(response)
        setTableData(prevState => ({
          ...prevState,
          'rows': response.data
        }))
        decreaseApiCounter()
      }).catch(error => {
        console.log(error)
        decreaseApiCounter()
      })
  }

  const getLeadFilterOptions=()=>{
    axios.get('lead/filter-options')
    .then(response =>{
      console.log(response)
      setFilterOption(response.data)
    }).catch(error=>{
      console.log(error)
    })
  }


  const editLeadApi = (e) => {
    e.preventDefault()
   increaseApiCounter()
    axios.put('leads/'+editData['id']+'/',editData)
    .then(response =>{
      console.log(response)
      setRightBarCheckbox(false)
      decreaseApiCounter()
      setErrors({})
      getLeadsApi()
    }).catch(error =>{
      console.log(error)
      if(error.response.status === 400){
        setErrors(error.response.data)
      }
      else{
        setErrors({})
      }
      decreaseApiCounter()
    })
  }



  function changeInTableData(data) {
    if (data && data.columns) {
      data.columns.push({
        "label": "action",
        "field": "action",
        "sort": "disabled",
        "width": 20
      })
    }

    if (data && data.rows) {
      data.rows.map((row, index) => {
        row['action'] = <TableAction index={index}>
          <div>
            <button value={JSON.stringify(row)} onClick={showEditLead} className='edit-btn w-100 noto-sans-font'><i className="ti ti-edit text-primary me-2"></i>Edit</button>
          </div>
        </TableAction>
        row['status'] = <div className={'status '+row['status']}>
          {row['status'].replace('_',' ')}
          {/* {row.status} */}
          </div>

        row['state_names'] =row['state_names'].join(',')
        row['notes'] = <div style={{width:150,overflow:'clip'}}>
          {row['notes']}
        </div>
      })
    }
    return data
  }
  return (
    <BasePage>
      {/* <p className='noto-sans-font medium-font regular-font mb-3'>Leads 0</p> */}


      <TableSearchSortFilter data={tableData} dates={dates} setDates={setDates} changeInTableData={changeInTableData} filterOption={filterOption} reportName = "inTownReport.csv"/>

      {isEditFormShow && <RightBar  setIsFormShow={setIsEditFormShow} rightBarTitle="Edit Lead Data" children={<LeadForm data={editData} handleChangeData={handleEditLeadChange} onSubmit={editLeadApi} errors={errors} />} />}
    </BasePage>
  )
}


export const LeadForm = (props) => {
  console.log(props.data,'inside form')
  const formChildren = <div className="row">
    <div className="col-12">
      <label htmlFor="notes" className='sm-font semibold-font'>Edit Note</label>
      <textarea name="notes" id="notes" value={props.data['notes']} className='w-100 ' rows={15} onChange={props.handleChangeData}></textarea>
    </div>

    <div className="col-12 mt-2">
      <label htmlFor="status" className='sm-font semibold-font'>Status</label>
      <br />
      <select name="status" id="status" value={props.data.status} className='w-100' onChange={props.handleChangeData}>
        <option value="in_progress">In Progress</option>
        <option value="not_verified">Not Verified</option>
        <option value="verified">Verified</option>
      </select>
     
    </div>

  </div>
  return (

    <RightBarForm setIsRightBar={props.setIsRightBar} onSubmit={props.onSubmit} children={formChildren} />
  )
}