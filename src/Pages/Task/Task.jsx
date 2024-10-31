import React, { useState, useContext, useEffect } from 'react'
import './Task.css'
import BasePage from '../BasePage/BasePage'
import TableSearchSortFilter from '../../Components/TableSearchSortFilter/TableSearchSortFilter'

import { set, setDate, subDays } from 'date-fns'
import TableAction from '../../Components/TableAction/TableAction'
import RightBar from '../../Components/RightBar/RightBar'
import RightBarForm from '../../Components/RightBarForm/RightBarForm'
import AddButton from '../../Components/AddButton/AddButton'
import axios from '../../Api/axios'
import { useRightBar } from '../../Provider/RightBarProvider'
import { useApi } from '../../Provider/ApiProvider'
export default function Task() {
    const [dates, setDates] = useState([subDays(new Date(), 30), new Date()])
    const {rightBarCheckbox,setRightBarCheckbox} = useRightBar()
    const {increaseApiCounter,decreaseApiCounter} = useApi()

    const [newTaskData, setNewTaskData] = useState({})
    const [editTaskData, setEditTaskData] = useState({})
    const [isAddFormShow, setIsAddFormShow] = useState(false)
    const [isEditFormShow,setIsEditFormShow] = useState(false)
    const [errors,setErrors] = useState({})

    const [filterOption, setFilterOption] = useState({})



    const [tableData, setTableData] = useState({
        columns: [
            {
                label: "Title",
                field: "title"
            },
            {
                label: "Category",
                field: "category"
            },
            {
                label: "Priority",
                field: "priority"
            },

            {
                label: "Start Date",
                field: "start_date"
            },

            {
                label: "Start Time",
                field: "start_time"
            },

            {
                label: "Status",
                field: "status"
            },

            {
                label: "Description",
                field: "description"
            },




        ],

    })

    useEffect(()=>{
        getTaskApi()
        
    },[dates])

    useEffect(()=>{
        getFilterOptionApi()
    },[])

   
    const handleNewTaskChange = (e) => {
        const { name, value } = e.target
        setNewTaskData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleEditTaskChange = (e) => {
        const { name, value } = e.target
        setEditTaskData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const editTask = (e) => {
        setEditTaskData(JSON.parse(e.target.value));
        setRightBarCheckbox(true);
        setIsEditFormShow(true)
    }







    const AddTask = <AddButton title="Add Task" onClick={() => { setRightBarCheckbox(true);setIsAddFormShow(true) }}></AddButton>


    const getTaskApi = () =>{
        console.log(dates,'dates')
        increaseApiCounter()
        axios.get('task/',{
            params :{
                dates : dates
            }
        })
        .then(response=>{
            console.log(response)
            setTableData(prevState=>({
                ...prevState,
                'rows':response.data
            }))
            decreaseApiCounter()
        }).catch(error=>{
            console.log(error)
            decreaseApiCounter()
        })
    }

    const getFilterOptionApi = () =>{
        axios.get('task/fitler-options')
        .then(response =>{
            console.log(response)
            setFilterOption(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const addTaskApi = (e) => {
        e.preventDefault()
        increaseApiCounter()
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const data = newTaskData
        data['user_timezone'] = timezone

       
        
        axios.post('task/',data)
        .then(response=>{
            console.log(response)
            decreaseApiCounter()
            getTaskApi()
            setRightBarCheckbox(false)
            setNewTaskData({})
            setErrors({})
        }).catch(error=>{
            if(error.response.status===400){
                setErrors(error.response.data)
            }
            else{
                setErrors({})
            }
            console.log(error)
            decreaseApiCounter()
            setRightBarCheckbox(false)
        })
    }

    const editTaskApi = (e) => {
        e.preventDefault()
        increaseApiCounter()
        console.log(editTaskData)
       
        
        axios.put('task/'+editTaskData.id+'/',editTaskData)
        .then(response=>{
            console.log(response)
            decreaseApiCounter()
            getTaskApi()
            setRightBarCheckbox(false)
            setErrors({})
        }).catch(error=>{
            if(error.response.status===400){
                setErrors(error.response.data)
            }
            else{
                setErrors({})
            }
            console.log(error)
            decreaseApiCounter()
            setRightBarCheckbox(false)
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
                        <button value={JSON.stringify(row)} onClick={editTask} className='edit-btn w-100 noto-sans-font'><i className="ti ti-edit text-primary me-2"></i>Edit</button>
                    </div>
                </TableAction>
            })
        }
        return data
    }
    return (
        <BasePage>
            <p className='noto-sans-font medium-font regular-font mb-3'>Leads 0</p>


            <TableSearchSortFilter data={tableData} dates={dates} setDates={setDates} changeInTableData={changeInTableData} AddButton={AddTask} filterOption={filterOption} reportName = "taskReport.csv"/>
            {isAddFormShow && <RightBar setIsFormShow={setIsAddFormShow} rightBarTitle="Add New Task" children={<TaskForm data={newTaskData} handleChangeData={handleNewTaskChange} onSubmit={addTaskApi} errors={errors} />} />}
            {isEditFormShow && <RightBar setIsFormShow={setIsEditFormShow} rightBarTitle="Edit Task" children={<TaskForm data={editTaskData} handleChangeData={handleEditTaskChange} onSubmit={editTaskApi} errors={errors} />} />}

        </BasePage>
    )
}


export const TaskForm = (props) => {
    const rightBarChildren = <div className="task-form-div">
        <div className="row">
            <div className="form-group">
                <label htmlFor="title" className="form-label regular-font">Title<span className="text-danger">*</span></label>
                <input type="text" name='title' className={"form-control "+(props.errors.title?'is-invalid':'')} id="channel-id" value={props.data['title']} onChange={props.handleChangeData}  />
                <div className="invalid-feedback">
                    {props.errors.title}
                </div>
            </div>
        </div>


        <div className="form-group">
            <label htmlFor="category" className="form-label regular-font">Category <span className="text-danger">*</span></label>
            <select name="category" id="category" className={'form-control w-100 ' + (props.errors.category?'is-invalid':'') } value={props.data['category']} onChange={props.handleChangeData}>
                <option value=""></option>
                <option value="email">Email</option>
                <option value="call">Call</option>
            </select>

            <div className="invalid-feedback">
                    {props.errors.category}
            </div>
        </div>

        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="start_date" className="form-label regular-font">Start Date <span className="text-danger">*</span></label>
                    <input type="date" name='start_date' className={"form-control "+(props.errors.start_date?'is-invalid':'')} id="start_date" value={props.data['start_date']} onChange={props.handleChangeData} />
                    <div className="invalid-feedback">
                    {props.errors.start_date}
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="start_time" className="form-label regular-font">Start Time </label>
                    <input type="time" name='start_time' className={"form-control "+(props.errors.start_time?'is-invalid':'')} id="start_time" value={props.data['start_time']} onChange={props.handleChangeData} />
                    <div className="invalid-feedback">
                    {props.errors.start_time}
                    </div>
                </div>
            </div>
        </div>





        <div className="form-group">
            <label htmlFor="status" className="form-label regular-font">Status <span className="text-danger" >*</span></label>
            <select name="status" id="status" className={'form-control w-100 '+ (props.errors.status?'is-invalid':'')} value={props.data['status']} onChange={props.handleChangeData}>
                <option value=""></option>
                <option value="pending">Pending</option>
                <option value="started">Started</option>
            </select>

            <div className="invalid-feedback">
                    {props.errors.status}
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="priority" className="form-label regular-font">Priority <span className="text-danger" >*</span></label>
            <select name="priority" id="priority" className={'form-control w-100 '+ (props.errors.priority?'is-invalid':'')} value={props.data['priority']} onChange={props.handleChangeData}>
                <option value=""></option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>

            <div className="invalid-feedback">
                    {props.errors.priority}
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="description" className="form-label regular-font">Description</label>
            <textarea name="description" className={"form-control "+(props.errors.description?'is-invalid':'')} id="description" value={props.data['description']} onChange={props.handleChangeData} rows={12}></textarea>

            <div className="invalid-feedback">
                    {props.errors.description}
            </div>
        </div>


    </div>
    return (
        <RightBarForm onSubmit={props.onSubmit} children={rightBarChildren} />
    )
}
