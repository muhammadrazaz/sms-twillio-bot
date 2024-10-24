import React, { useContext, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import TableSearchSortFilter from '../../Components/TableSearchSortFilter/TableSearchSortFilter'
import './Leads.css'
import { setDate, subDays } from 'date-fns'
import TableAction from '../../Components/TableAction/TableAction'
import { RightBarContext } from '../../Context/RightBarContext'
import RightBarForm from '../../Components/RightBarForm/RightBarForm'
export default function Leads() {

  

  const [dates, setDates] = useState([subDays(new Date(), 30), new Date()])
 
  const [editData,setEditData] = useState({})
  const {setRightBarCheckBox,setRightBarChildren,setRightBarTitle} = useContext(RightBarContext)


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
        field: "states"
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

    ],
    rows: [
      {
        user_id: '1507325405',
        username: 'test',
        states: 'Pennsylvania, California, California, New York, Maryland,State2',
        whatsapp: '19544009685',
        sms: '+8644927575',
        email: 'borismeh65@gmail.com',
        discord: 'Lingo.000',
        instagram: 'sterfri',
        snapchat: 'Donte_t2024'
      },
      {
        user_id: '5507325405',
        username: 'AlexGotIt',
        states: 'Pennsylvania, California, California, New York, Maryland',
        whatsapp: '19544009685',
        sms: '+8644927575',
        email: 'borismeh65@gmail.com',
        discord: 'Lingo.000',
        instagram: 'sterfri',
        snapchat: 'Donte_t2024'
      },
      {
        user_id: '5507325405',
        username: 'AlexGotIt',
        states: 'Pennsylvania, California, California, New York, Maryland',
        whatsapp: '19544009685',
        sms: '+8644927575',
        email: 'borismeh65@gmail.com',
        discord: 'Lingo.000',
        instagram: 'sterfri',
        snapchat: 'Donte_t2024'
      },
      {
        user_id: '5507325405',
        username: 'AlexGotIt',
        states: 'Pennsylvania, California, California, New York, Maryland',
        whatsapp: '19544009685',
        sms: '+8644927575',
        email: 'borismeh65@gmail.com',
        discord: 'Lingo.000',
        instagram: 'sterfri',
        snapchat: 'Donte_t2024'
      },
    ]
  })

  


  const editFormCreate = (e) =>{
    const data = JSON.parse(e.target.value)
    setEditData(data)

    const form = <RightBarForm>
      <label htmlFor="notes" className='sm-font semibold-font'>Edit Note</label>
      <textarea name="notes" id="notes" value={editData['notes']} className='w-100 ' rows={15}></textarea>
    </RightBarForm>
    setRightBarTitle("Edit Notes")
    setRightBarCheckBox(true)
    setRightBarChildren(form)

    

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
            <button value={JSON.stringify(row)} onClick={editFormCreate} className='edit-btn w-100 noto-sans-font'><i className="ti ti-edit text-primary me-2"></i>Edit</button>
          </div>
        </TableAction>
      })
    }
    return data
  }
  return (
    <BasePage>
      <p className='noto-sans-font medium-font regular-font mb-3'>Leads 0</p>


      <TableSearchSortFilter data={tableData} dates={dates} setDates={setDates} changeInTableData={changeInTableData}  />


    </BasePage>
  )
}
