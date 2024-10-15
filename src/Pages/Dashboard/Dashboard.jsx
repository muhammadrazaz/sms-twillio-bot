import React, { useState } from 'react'
import './Dashboard.css'
import BasePage from '../BasePage/BasePage'
import TableWithPagination from '../../Components/TableWithPagination/TableWithPagination'
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
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <p className='m-0 noto-sans-font bold-font large-font'><i class="ti ti-grip-vertical me-1"></i>Recently Created Leads</p>
            </div>
            <div className="dashboard-card-body p-3">
              
                <TableWithPagination data={tableData}/>
            </div>
          </div>
        </div>
        <div className="col-md-5">

        </div>
      </div>
    </BasePage>
  )
}
