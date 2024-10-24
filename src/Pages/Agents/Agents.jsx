import React, { useContext, useEffect, useState } from 'react'
import './Agents.css'
import BasePage from '../BasePage/BasePage'
import TableSearchSortFilter from '../../Components/TableSearchSortFilter/TableSearchSortFilter'

import { setDate, subDays } from 'date-fns'
import TableAction from '../../Components/TableAction/TableAction'
// import { RightBarContext } from '../../Context/RightBarContext'
import RightBarForm from '../../Components/RightBarForm/RightBarForm'
import AddButton from '../../Components/AddButton/AddButton'

import MultiSelect from '../../Components/MultiSelect/MultiSelect'
import axios from '../../Api/axios'
import { MultiSelectContext } from '../../Context/MultiSelectProvider'

import RightBar from '../../Components/RightBar/RightBar'
export default function Agents() {

  const [dates, setDates] = useState([subDays(new Date(), 30), new Date()])


  // const { setRightBarCheckBox, setRightBarChildren, setRightBarTitle } = useContext(RightBarContext)
  
  const {selectedOptions, setSelectedOptions,data,setData} = useContext(MultiSelectContext)

  const [newAgentData, setNewAgentData] = useState({states:['state1', 'state2', 'state3', 'state4','state5','state6','state7','state8']})
  const [editAgentData, setEditAgentData] = useState({})
  
  const [stateOptions,setStateOptions] = useState(['state1', 'state2', 'state3', 'state4','state5','state6','state7','state8'])

  const [isAdd,setIsAdd] = useState(true) 

  




  useEffect(()=>{
    getStateApi()
  },[])

  useEffect(()=>{
    console.log(newAgentData,"newagent")
  },[newAgentData])



  const [tableData, setTableData] = useState({
    columns: [
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
    rows: [
      {

        states: 'California',
        channel_id: '-1002271875770',
        telegram_username: 'Lingo.000',
        uan: '-1002271875770',
        email: 'borismeh65@gmail.com',
        instagram: 'sterfri',
        snapchat: 'Donte_t2024'
      },
      {

        states: 'California',
        channel_id: '-1002271875770',
        telegram_username: 'Lingo.000',
        uan: '-1002271875770',
        email: 'borismeh65@gmail.com',
        instagram: 'sterfri',
        snapchat: 'Donte_t2024'
      },
      {

        states: 'California',
        channel_id: '-1002271875770',
        telegram_username: 'Lingo.000',
        uan: '-1002271875770',
        email: 'borismeh65@gmail.com',
        instagram: 'sterfri',
        snapchat: 'Donte_t2024'
      },
      {

        states: 'California',
        channel_id: '-1002271875770',
        telegram_username: 'Lingo.000',
        uan: '-1002271875770',
        email: 'borismeh65@gmail.com',
        instagram: 'sterfri',
        snapchat: 'Donte_t2024'
      },
    ]
  })




  const handleNewAgentChange = (e) => {
    const { name, value } = e.target
    setNewAgentData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleEditAgentData = (e) => {
    console.log(e)
    const { name, value } = e.target
    setEditAgentData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }


  const addAgentApi = (e) =>{
    e.preventDefault()
    console.log(newAgentData,'--------------------------')
  }


  // const agentForm = (data, handleChangeData,setState)=> {
  //   // setMultiSelect()
  //   return <div className="agent-form-grid1">

  //     <div className="form-group">
  //       <label for="username" className="form-label regular-font">Username <span className="text-danger">*</span></label>
  //       <input type="text" name='username' className="form-control" id="username" value={data['username']} onChange={handleChangeData}  />
  //       <div className="valid-feedback">

  //       </div>
  //     </div>

  //     <div className="form-group">
  //       <label for="password" className="form-label regular-font">Password <span className="text-danger">*</span></label>
  //       <input type="password" name='password' className="form-control" id="password" value={data['password']} onChange={handleChangeData}  />
  //       <div className="valid-feedback">

  //       </div>
  //     </div>
  //     {/* <div className="form-group">
  //       <label for="first_name" className="form-label regular-font">First Name <span className="text-danger">*</span></label>
  //       <input type="text" name='first_name' className="form-control" id="first_name" value={data['first_name']} onChange={handleChangeData}  />
  //       <div className="valid-feedback">

  //       </div>
  //     </div>

  //     <div className="form-group">
  //       <label for="last_name" className="form-label regular-font">Last Name <span className="text-danger">*</span></label>
  //       <input type="text" name='last_name' className="form-control" id="last_name" value={data['last_name']} onChange={handleChangeData}  />
  //       <div className="valid-feedback">

  //       </div>
  //     </div> */}

        
  //     <div className="form-group">
  //       <label for="channel_id" className="form-label regular-font">Channel ID <span className="text-danger">*</span></label>
  //       <input type="text" name='channel_id' className="form-control" id="channel_id" value={data['channel_id']} onChange={handleChangeData}  />
  //       <div className="valid-feedback">

  //       </div>
  //     </div>

  //       <div className="row">
  //         <div className="col">
  //         <div className="form-group w-100">
  //       <label for="states" className="form-label regular-font">States <span className="text-danger">*</span></label>
  //       {/* <input type="text" name='states' className="form-control" id="states" value={data['states']} onChange={handleChangeData}  /> */}
  //       <MultiSelect name='states' options ={stateOptions} setState = {setState} stateData={data}/>
  //       <div className="valid-feedback">

  //       </div>
  //     </div>
  //         </div>
  //       </div>

      

  //     <div className="form-group">
  //       <label for="telegram-username" className="form-label regular-font">Telegram Username </label>
  //       <input type="text" name='telegram_username' className="form-control" id="telegram-username" value={data['telegram_username']} onChange={handleChangeData} />
  //       <div className="valid-feedback">

  //       </div>
  //     </div>

  //     <div className="form-group">
  //       <label for="uan" className="form-label regular-font">UAN </label>
  //       <input type="text" name='uan' className="form-control" id="uan" value={data['uan']} onChange={handleChangeData} />
  //       <div className="valid-feedback">

  //       </div>
  //     </div>

  //     <div className="form-group">
  //       <label for="email" className="form-label regular-font">Email</label>
  //       <input type="email" name='email' className="form-control" id="email" value={data['email']} onChange={handleChangeData} />
  //       <div className="valid-feedback">

  //       </div>
  //     </div>


  //   </div>
  // }

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    // console.log(data,'==========='); // Log or handle the updated data
    // addAgentApi(newAgentData); // Call the API with the latest state
    console.log(newAgentData)
  };
  const addAgentForm = () => {
    
    // setSelectedOptions(newAgentData)
    // setData(setNewAgentData())
    // setRightBarTitle("Add New Agent")
    // setRightBarCheckBox(true)
    // setRightBarChildren(  <form id='right-bar-form' onSubmit={handleSubmit}>
    // {/* {props.children} */}
    // <div className="btn-div">
    // <AgentForm data={newAgentData} handleChangeData = {handleNewAgentChange} setState={setNewAgentData} stateOptions = {stateOptions}/>
    //     <button className='cancel-btn' type='button' onClick={()=>{setRightBarCheckBox(false)}}>
    //       Cancel
    //     </button>

    //     <button className='save-btn'>
    //       Save Changes
    //     </button>
      
    // </div>
    // <button onClick={()=>{test('test')}} type='button'>test</button>
    //  </form>)
  
    // // return (
    // //   <RightBarForm onSubmit={handleSubmit}>
    // //     {agentForm(newAgentData, handleNewAgentChange, setNewAgentData)}
    // //   </RightBarForm>
    // // );
  };


  // const addAgentForm = () => {

  //   const form = <RightBarForm onSubmit = {addAgentApi}>
  //     {agentForm(newAgentData, handleNewAgentChange,setNewAgentData)}
  //   </RightBarForm>

    
  // }
  const editAgentForm = (e) => {
    // const data = JSON.parse(e.target.value)
    // setEditAgentData(data)

    // const form = <RightBarForm>
    //   {agentForm(editAgentData, handleEditAgentData,setEditAgentData,editAgentData)}
    // </RightBarForm>
    // setRightBarTitle("Edit Agent Data")
    // setRightBarCheckBox(true)
    // setRightBarChildren(form)



  }

  const test =(newAgentData)=>{
    console.log(newAgentData,'tttttttttttttttttest')
  }

  const AddAgent = <AddButton title="Add Agent" onClick={addAgentForm}></AddButton>

  const getStateApi = () =>{
    axios.get('state/')
    .then(response =>{
      console.log(response)
      var stateData = []
      response.data.map((data)=>{
        stateData.push(data.state_name)
      })

      // setStateOptions(stateData)
    })
    .catch(error =>{
      console.log(error)
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
            <button value={JSON.stringify(row)} onClick={editAgentForm} className='edit-btn w-100 noto-sans-font'><i className="ti ti-edit text-primary me-2"></i>Edit</button>
          </div>
        </TableAction>
      })
    }
    return data
  }
  return (
    <BasePage>
      <p className='noto-sans-font medium-font regular-font mb-3'>Leads 0</p>


      <TableSearchSortFilter data={tableData} dates={dates} setDates={setDates} changeInTableData={changeInTableData} AddButton={AddAgent} />
     
      {/* <MultiSelect/> */}
      <button onClick ={()=>{setIsAdd(true);console.log('ttttttttttt')}}>click me</button>
      <RightBar rightCheckbox = {'isAdd'} setRightCheckBox={setIsAdd} children={<AgentForm data={newAgentData} handleChangeData = {handleNewAgentChange} setState={setNewAgentData} stateOptions = {stateOptions} onSubmit={handleSubmit}/>}/>
    </BasePage>
  )
}



export const AgentForm = ({ data, handleChangeData, setState, stateOptions,onSubmit }) => {
  return (
    <form id='right-bar-form'onSubmit={onSubmit} >
      <div className="agent-form-grid1">
      <div className="form-group">
        <label htmlFor="username" className="form-label regular-font">
          Username <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          name="username"
          className="form-control"
          id="username"
          value={data['username']}
          onChange={handleChangeData}
        />
        <div className="valid-feedback"></div>
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label regular-font">
          Password <span className="text-danger">*</span>
        </label>
        <input
          type="password"
          name="password"
          className="form-control"
          id="password"
          value={data['password']}
          onChange={handleChangeData}
        />
        <div className="valid-feedback"></div>
      </div>

      <div className="form-group">
        <label htmlFor="channel_id" className="form-label regular-font">
          Channel ID <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          name="channel_id"
          className="form-control"
          id="channel_id"
          value={data['channel_id']}
          onChange={handleChangeData}
        />
        <div className="valid-feedback"></div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group w-100">
            <label htmlFor="states" className="form-label regular-font">
              States <span className="text-danger">*</span>
            </label>
            <MultiSelect
              name="states"
              options={stateOptions}
              setState={setState}
              stateData={data}
            />
            <div className="valid-feedback"></div>
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
          className="form-control"
          id="telegram-username"
          value={data['telegram_username']}
          onChange={handleChangeData}
        />
        <div className="valid-feedback"></div>
      </div>

      <div className="form-group">
        <label htmlFor="uan" className="form-label regular-font">
          UAN
        </label>
        <input
          type="text"
          name="uan"
          className="form-control"
          id="uan"
          value={data['uan']}
          onChange={handleChangeData}
        />
        <div className="valid-feedback"></div>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label regular-font">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="email"
          value={data['email']}
          onChange={handleChangeData}
        />
        <div className="valid-feedback"></div>
      </div>
    </div>
      <div className="btn-div">
      
          <button className='cancel-btn' type='button' onClick={closeRightBar}>
            Cancel
          </button>

          <button className='save-btn'>
            Save Changes
          </button>
        
      </div>
      <button onClick={()=>{test('test')}} type='button'>test</button>
       </form>
    
  );
};
