import React, { useContext, useEffect, useState } from 'react'
import './Agents.css'
import BasePage from '../BasePage/BasePage'
import TableSearchSortFilter from '../../Components/TableSearchSortFilter/TableSearchSortFilter'
import { setDate, subDays } from 'date-fns'
import TableAction from '../../Components/TableAction/TableAction'
import RightBarForm from '../../Components/RightBarForm/RightBarForm'
import AddButton from '../../Components/AddButton/AddButton'
import MultiSelect from '../../Components/MultiSelect/MultiSelect'
import axios from '../../Api/axios'
import RightBar from '../../Components/RightBar/RightBar'
import { useRightBar } from '../../Provider/RightBarProvider'
import { useApi } from '../../Provider/ApiProvider'
export default function Agents() {

  const {setRightBarCheckbox} = useRightBar()
  const{increaseApiCounter,decreaseApiCounter} = useApi()

  const [dates, setDates] = useState([subDays(new Date(), 30), new Date()])
  const [newAgentData, setNewAgentData] = useState({})
  const [editAgentData, setEditAgentData] = useState({})
  const [stateOptions,setStateOptions] = useState()
  const [showAddAgentForm, setAddShowAgentForm] = useState(false);
  const [showEditAgentForm, setEditShowAgentForm] = useState(false);
  const [errors,setErrors] = useState({})
  const [filterOption, setFilterOption] = useState({})

  const [tableData, setTableData] = useState({
    columns: [
      {
        label: "Username",
        field: "username"
      },
      {
        label: "States",
        field: "states"
      },
      {
        label: "Channel ID",
        field: "channel_id"
      },
      {
        label: "Telegram Username",
        field: "telegram_username"
      },

      {
        label: "UAN",
        field: "uan"
      },

      {
        label: "Email",
        field: "email"
      },


    ],
   
  })

  

  useEffect(()=>{
    getAgentApi()
  },[dates])

  useEffect(()=>{
    getStateApi()
    getFilterOptions()
  },[])



 




  const handleNewAgentChange = (e) => {
    const { name, value } = e.target
    setNewAgentData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleEditAgentChange = (e) => {
    console.log(e)
    const { name, value } = e.target
    setEditAgentData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }


  const showEditAgent =(e) =>{
    setEditAgentData(JSON.parse(e.target.value));
    setEditShowAgentForm(true);
    setRightBarCheckbox(true)
  }
  



  const AddAgent = <AddButton title="Add Agent" onClick={()=>{setRightBarCheckbox(true);setAddShowAgentForm(true)}}></AddButton>

  const getStateApi = () =>{
    
    axios.get('state/')
    .then(response =>{
      console.log(response)
      var stateData = []
      response.data.map((data)=>{
        stateData.push(data.state_name)
      })

      setStateOptions(stateData)
    })
    .catch(error =>{
      console.log(error)
    })
  }

  const getFilterOptions =()=>{
    axios.get('agent/filter-options')
    .then(response=>{
      console.log(response)
      setFilterOption(response.data)
    }).catch(error=>{
      console.log(error)
    })
  }

  const getAgentApi = () =>{
    increaseApiCounter()
    axios.get('agent/',{
      params:{
        dates:dates
      }
    })
    .then(response =>{
      console.log(response)
      const data = response.data
      for(var i=0;i<response.data.length;i++){
        data[i]['states'] = data[i]['state_names']
        console.log(data[i]['state_names'].split(','),'state')
      }
      
      setTableData(prevState =>({
        ...prevState,
        'rows': data
      }))
      decreaseApiCounter()
    }).catch(error=>{
      console.log(error)
      decreaseApiCounter()
    })
  }


  const addAgentApi = (e) =>{
    e.preventDefault()
    increaseApiCounter()
    axios.post('agent/',newAgentData)
    .then(response =>{
      console.log(response)
      decreaseApiCounter()
      getAgentApi()
      setRightBarCheckbox(false)
      setNewAgentData({})
      setErrors({})
      
    })
    .catch(error=>{
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

  const editAgentApi = (e) =>{
    e.preventDefault()
    increaseApiCounter()
    var data = editAgentData
    data['pk'] = editAgentData['id']
    axios.put('agent/'+editAgentData['id']+'/',data)
    .then(response =>{
      console.log(response)
      decreaseApiCounter()
      setRightBarCheckbox(false)
      getAgentApi()
      setErrors({})
    })
    .catch(error=>{
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
            <button value={JSON.stringify(row)} onClick={showEditAgent} className='edit-btn w-100 noto-sans-font'><i className="ti ti-edit text-primary me-2"></i>Edit</button>
          </div>
        </TableAction>
      })
      return data
    }
  }
  
  return (
    <BasePage>
      {/* <p className='noto-sans-font medium-font regular-font mb-3'>Leads 0</p>  */}


      <TableSearchSortFilter data={tableData} dates={dates} setDates={setDates} changeInTableData={changeInTableData} AddButton={AddAgent} filterOption = {filterOption} reportName = "agentReport.csv"/>
     
      {showAddAgentForm && <RightBar setIsFormShow={setAddShowAgentForm} rightBarTitle = "Add New Agent" children={<AgentForm data={newAgentData} handleChangeData = {handleNewAgentChange} setState={setNewAgentData} stateOptions = {stateOptions} onSubmit={addAgentApi} errors ={errors}/>} />}
      
      {showEditAgentForm && <RightBar setIsFormShow={setEditShowAgentForm} rightBarTitle = "Edit Agent Data" children={<AgentForm data={editAgentData} handleChangeData = {handleEditAgentChange} setState={setEditAgentData} stateOptions = {stateOptions} onSubmit={editAgentApi} errors ={errors}/>} />}
    </BasePage>
  )
}



export const AgentForm = (props) => {
 
 

    const form =<form id='right-bar-form' onSubmit={props.onSubmit} >
      <div className="agent-form-grid">
      <div className="form-group">
        <label htmlFor="username" className="form-label regular-font">
          Username <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          name="username"
          className={"form-control " + props.errors.username?'is-invalid':''}
          id="username"
          value={props.data['username']}
          onChange={props.handleChangeData}
        />
        <div className="invalid-feedback">
            {props.errors.username}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label regular-font">
          Password <span className="text-danger">*</span>
        </label>
        <input
          type="password"
          name="password"
          className={"form-control " + props.errors.password?'is-invalid':''}
          id="password"
          value={props.data['password']}
          onChange={props.handleChangeData}
        />
        <div className="invalid-feedback">
          {props.errors.password}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="channel_id" className="form-label regular-font">
          Channel ID <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          name="channel_id"
          className={"form-control " + props.errors.channel_id?'is-invalid':''}
          id="channel_id"
          value={props.data['channel_id']}
          onChange={props.handleChangeData}
        />
        <div className="invalid-feedback">
          {props.errors.channel_id}
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group w-100">
            <label htmlFor="states" className="form-label regular-font">
              States <span className="text-danger">*</span>
            </label>
            <MultiSelect
              name="states"
              options={props.stateOptions}
              setState={props.setState}
              stateData={props.data}
              className = {"form-control " + (props.errors.states?'is-invalid':'')}
            />
            <div className="invalid-feedback">
              {props.errors.states}
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="telegram-username" className="form-label regular-font">
          Telegram Username
        </label>
        <input
          type="text"
          name="telegram_username"
          className={"form-control " + props.errors.telegram_username?'is-invalid':''}
          id="telegram-username"
          value={props.data['telegram_username']}
          onChange={props.handleChangeData}
        />
        <div className="invalid-feedback">
          {props.errors.telegram_username}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="uan" className="form-label regular-font">
          UAN
        </label>
        <input
          type="text"
          name="uan"
          className={"form-control " + props.errors.uan?'is-invalid':''}
          id="uan"
          value={props.data['uan']}
          onChange={props.handleChangeData}
        />
        <div className="invalid-feedback">
          {props.errors.uan}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label regular-font">
          Email
        </label>
        <input
          type="email"
          name="email"
          className={"form-control " + props.errors.email?'is-invalid':''}
          id="email"
          value={props.data['email']}
          onChange={props.handleChangeData}
        />
        <div className="invalid-feedback">
          {props.errors.email}
        </div>
      </div>
    </div>
     
    
       </form>

    return (
      <RightBarForm onSubmit={props.onSubmit} children={form} />
    )
    
  
};
