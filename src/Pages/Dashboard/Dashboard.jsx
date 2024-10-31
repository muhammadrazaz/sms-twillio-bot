import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import BasePage from '../BasePage/BasePage'
import TableWithPagination from '../../Components/TableWithPagination/TableWithPagination'
import PieChart from '../../Components/PieChart/PieChart'
import LineChart from '../../Components/LineChart/LineChart'
import BarChart from '../../Components/BarChart/BarChart'
import { useApi } from '../../Provider/ApiProvider'
import axios from '../../Api/axios'
export default function Dashboard() {
  const { increaseApiCounter, decreaseApiCounter } = useApi()
  const [leadByStates,setLeadByStates] = useState({label:[],data:[]})
  const [leadByMonths,setLeadByMonths] = useState({label:[],data:[]})
  const [leadByStatus,setLeadByStatus] = useState({label:[],data:[]})
  const [taskByStatus,setTaskByStatus] = useState({label:[],data:[]})
  const [tableData, setTableData] = useState({
    columns: [
      {
        label: "User ID",
        field: "user_id"
      },
      {
        label: "Preferred Communication",
        field: "preferred_contact"
      },
      {
        label: "Status",
        field: "status"
      },
      {
        label: "States",
        field: "states"
      },

    ],

  })

  useEffect(() => {
    getDashbaordDataApi()
  }, [])

  const getDashbaordDataApi = () => {
    increaseApiCounter()
    axios.get('dashboard/')
      .then(response => {
        console.log(response)
        setTableData(prevState => ({
          ...prevState,
          'rows': response.data.recent_leads
        }))
        setLeadByStates(response.data.lead_counts_by_states)
        setLeadByMonths(response.data.lead_counts_by_month)
        setLeadByStatus(response.data.lead_by_status)
        setTaskByStatus(response.data.task_by_status)
        decreaseApiCounter()
      })
      .catch(error => {
        console.log(error)
        decreaseApiCounter()
      })
  }

  function changeInTableData(data) {
    

    if (data && data.rows) {
      data.rows.map((row, index) => {
        
        row['status'] = <div className={'status '+row['status']}>
          {row['status'].replace('_',' ')}
          {/* {row.status} */}
          </div>
      })
    }
    return data
  }
  return (
    <BasePage>
      <div className="row">
        <div className="col-md-7">
          <div className="dashboard-card first-row-card">
            <div className="dashboard-card-header">
              <p className='m-0 noto-sans-font bold-font large-font'><i className="ti ti-grip-vertical me-1"></i>Recently Created Leads</p>
            </div>
            <div className="dashboard-card-body p-3 table-card">

              <TableWithPagination data={tableData} changeInTableData={changeInTableData}/>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="dashboard-card first-row-card">
            <div className="dashboard-card-header">
              <p className='m-0 noto-sans-font bold-font large-font'><i className="ti ti-grip-vertical me-1"></i>Leads By States</p>
            </div>
            <div className="dashboard-card-body p-3">

              <PieChart data={leadByStates}/>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="dashboard-card second-row-card">
            <div className="dashboard-card-header">
              <p className='m-0 noto-sans-font bold-font large-font'><i className="ti ti-grip-vertical me-1"></i>Leads By Month</p>
            </div>
            <div className="dashboard-card-body p-3">

              <LineChart data={leadByMonths}/>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="dashboard-card third-row-card">
            <div className="dashboard-card-header">
              <p className='m-0 noto-sans-font bold-font large-font'><i className="ti ti-grip-vertical me-1"></i>Leads By Status</p>
            </div>
            <div className="dashboard-card-body p-3">

              <BarChart data={leadByStatus} name="Lead"/>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="dashboard-card third-row-card">
            <div className="dashboard-card-header">
              <p className='m-0 noto-sans-font bold-font large-font'><i className="ti ti-grip-vertical me-1"></i>Task By Status</p>
            </div>
            <div className="dashboard-card-body p-3">

              <BarChart data={taskByStatus} name="Task"/>
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  )
}
