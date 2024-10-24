import React, { useState, useContext } from 'react'
import './Task.css'
import BasePage from '../BasePage/BasePage'
import TableSearchSortFilter from '../../Components/TableSearchSortFilter/TableSearchSortFilter'

import { setDate, subDays } from 'date-fns'
import TableAction from '../../Components/TableAction/TableAction'
import { RightBarContext } from '../../Context/RightBarContext'
import RightBarForm from '../../Components/RightBarForm/RightBarForm'
import AddButton from '../../Components/AddButton/AddButton'
export default function Task() {
    const [dates, setDates] = useState([subDays(new Date(), 30), new Date()])

    const { setRightBarCheckBox, setRightBarChildren, setRightBarTitle } = useContext(RightBarContext)
    const [newTaskData, setNewTaskData] = useState({})
    const [editTaskData, setEditTaskData] = useState({})



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
        rows: [
            {

                title: 'California',
                category: '-1002271875770',
                start_date: 'Lingo.000',
                start_time: '-1002271875770',
                description: 'borismeh65@gmail.com',
                priority: 'sterfri',
                status: 'pending'

            },
            {

                title: 'California',
                category: '-1002271875770',
                start_date: 'Lingo.000',
                start_time: '-1002271875770',
                description: 'borismeh65@gmail.com',
                priority: 'sterfri',
                status: 'pending'

            },
            {

                title: 'California',
                category: '-1002271875770',
                start_date: 'Lingo.000',
                start_time: '-1002271875770',
                description: 'borismeh65@gmail.com',
                priority: 'sterfri',
                status: 'pending'

            },
            {

                title: 'California',
                category: '-1002271875770',
                start_date: 'Lingo.000',
                start_time: '-1002271875770',
                description: 'borismeh65@gmail.com',
                priority: 'sterfri',
                status: 'pending'


            },
        ]
    })

    const handleNewAgentChange = (e) => {
        const { name, value } = e.target
        setNewTaskData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleEditTaskData = (e) => {
        const { name, value } = e.target
        setEditTaskData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    function taskForm(data, handleChangeData) {

        return <div className="task-form-div">
            <div className="row">
                <div className="form-group">
                    <label for="title" className="form-label regular-font">Title<span className="text-danger">*</span></label>
                    <input type="text" name='title' className="form-control" id="channel-id" value={data['title']} onChange={handleChangeData} required />
                    <div className="valid-feedback">

                    </div>
                </div>
            </div>


            <div className="form-group">
                <label for="category" className="form-label regular-font">Category <span className="text-danger">*</span></label>
                <select name="category" id="category" className='form-control w-100' value={data['category']} onChange={handleChangeData}>
                    <option value="">Email</option>
                    <option value="">Call</option>
                </select>

                <div className="valid-feedback">

                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label for="start_date" className="form-label regular-font">Start Date <span className="text-danger">*</span></label>
                        <input type="date" name='start_date' className="form-control" id="start_date" value={data['start_date']} onChange={handleChangeData} />
                        <div className="valid-feedback">

                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label for="start_time" className="form-label regular-font">Start Time </label>
                        <input type="text" name='start_time' className="form-control" id="start_time" value={data['start_time']} onChange={handleChangeData} />
                        <div className="valid-feedback">

                        </div>
                    </div>
                </div>
            </div>





            <div className="form-group">
                <label for="status" className="form-label regular-font">Status <span className="text-danger" onChange={handleChangeData}>*</span></label>
                <select name="status" id="status" className='form-control w-100' value={data['status']} onChange={handleChangeData}>
                    <option value="">Pending</option>
                    <option value="">Started</option>
                </select>

                <div className="valid-feedback">

                </div>
            </div>

            <div className="form-group">
                <label for="description" className="form-label regular-font">Description</label>
                <textarea name="description" className="form-control" id="description" value={data['description']} onChange={handleChangeData} rows={12}></textarea>

                <div className="valid-feedback">

                </div>
            </div>


        </div>
    }


    const addTaskForm = () => {

        const form = <RightBarForm>
            {taskForm(newTaskData, handleNewAgentChange)}
        </RightBarForm>
        setRightBarTitle("Add New Task")
        setRightBarCheckBox(true)
        setRightBarChildren(form)
    }
    const editTaskForm = (e) => {
        const data = JSON.parse(e.target.value)
        setEditTaskData(data)

        const form = <RightBarForm>
            {taskForm(editTaskData, handleEditTaskData)}
        </RightBarForm>
        setRightBarTitle("Edit Task Data")
        setRightBarCheckBox(true)
        setRightBarChildren(form)



    }

    const AddTask = <AddButton title="Add Task" onClick={addTaskForm}></AddButton>



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
                        <button value={JSON.stringify(row)} onClick={editTaskForm} className='edit-btn w-100 noto-sans-font'><i className="ti ti-edit text-primary me-2"></i>Edit</button>
                    </div>
                </TableAction>
            })
        }
        return data
    }
    return (
        <BasePage>
            <p className='noto-sans-font medium-font regular-font mb-3'>Leads 0</p>


            <TableSearchSortFilter data={tableData} dates={dates} setDates={setDates} changeInTableData={changeInTableData} AddButton={AddTask} />


        </BasePage>
    )
}
