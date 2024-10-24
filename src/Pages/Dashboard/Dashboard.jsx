import React, { useState } from 'react'
import './Dashboard.css'
import BasePage from '../BasePage/BasePage'
import TableWithPagination from '../../Components/TableWithPagination/TableWithPagination'
import PieChart from '../../Components/PieChart/PieChart'
import LineChart from '../../Components/LineChart/LineChart'
import BarChart from '../../Components/BarChart/BarChart'
export default function Dashboard() {
  const [tableData,setTableData] = useState({
    columns : [
      {
        label:"Lead Name",
        field:"lead_name"
      },
      {
        label:"Lead Name",
        field:"lead_name"
      },
      {
        label:"Lead Name",
        field:"lead_name"
      },
      {
        label:"Lead Name",
        field:"lead_name"
      },
      
    ],
    rows :[
      {
        lead_name :'Collins'
      },
      {
        lead_name :'Collins'
      },{
        lead_name :'Collins'
      },
      {
        lead_name :'Collins'
      },
      {
        lead_name :'Collins'
      }
    ]
  })
  return (
    <BasePage>
      <div className="row">
        <div className="col-md-7">
          <div className="dashboard-card first-row-card">
            <div className="dashboard-card-header">
              <p className='m-0 noto-sans-font bold-font large-font'><i className="ti ti-grip-vertical me-1"></i>Recently Created Leads</p>
            </div>
            <div className="dashboard-card-body p-3 table-card">
              
                <TableWithPagination data={tableData}/>
            </div>
          </div>
        </div>
        <div className="col-md-5">
        <div className="dashboard-card first-row-card">
            <div className="dashboard-card-header">
              <p className='m-0 noto-sans-font bold-font large-font'><i className="ti ti-grip-vertical me-1"></i>Recently Created Leads</p>
            </div>
            <div className="dashboard-card-body p-3">
              
                <PieChart/>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
      <div className="col-12">
        <div className="dashboard-card second-row-card">
            <div className="dashboard-card-header">
              <p className='m-0 noto-sans-font bold-font large-font'><i className="ti ti-grip-vertical me-1"></i>Recently Created Leads</p>
            </div>
            <div className="dashboard-card-body p-3">
              
                <LineChart/>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
      <div className="col-6">
        <div className="dashboard-card third-row-card">
            <div className="dashboard-card-header">
              <p className='m-0 noto-sans-font bold-font large-font'><i className="ti ti-grip-vertical me-1"></i>Recently Created Leads</p>
            </div>
            <div className="dashboard-card-body p-3">
              
                <BarChart/>
            </div>
          </div>
        </div>

        <div className="col-6">
        <div className="dashboard-card third-row-card">
            <div className="dashboard-card-header">
              <p className='m-0 noto-sans-font bold-font large-font'><i className="ti ti-grip-vertical me-1"></i>Recently Created Leads</p>
            </div>
            <div className="dashboard-card-body p-3">
              
                <BarChart/>
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  )
}
