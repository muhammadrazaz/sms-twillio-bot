import React, { useState } from 'react'
import BasePage from '../BasePage/BasePage'
import subDays from 'date-fns/subDays'
import TableSearchSortFilter from '../../Components/TableSearchSortFilter/TableSearchSortFilter'

export default function Shipping() {
  const [dates, setDates] = useState([subDays(new Date(), 30), new Date()])
    
    const [tableData,setTableData] = useState({
        columns : [
          {
            label:"User ID",
            field:"user_id"
          },
          {
            label:"Username",
            field:"username"
          },
          {
            label:"States",
            field:"states"
          },
       
          {
            label:"WhatsApp",
            field:"whatsapp"
          },
          {
            label:"SMS",
            field:"sms"
          },
          {
            label:"Email",
            field:"email"
          },
          {
            label:"Discord",
            field:"Discord"
          },
          {
            label:"Instagram",
            field:"instagram"
          },
          {
            label:"Snapchat",
            field:"snapchat"
          },
         
        ],
        rows :[
          {
            user_id :'5507325405',
            username : 'AlexGotIt',
            states :'Pennsylvania, California, California, New York, Maryland',
            whatsapp :'19544009685',
            sms : '+8644927575',
            email : 'borismeh65@gmail.com',
            discord :'Lingo.000',
            instagram : 'sterfri',
            snapchat : 'Donte_t2024'
          },
          {
            user_id :'5507325405',
            username : 'AlexGotIt',
            states :'Pennsylvania, California, California, New York, Maryland',
            whatsapp :'19544009685',
            sms : '+8644927575',
            email : 'borismeh65@gmail.com',
            discord :'Lingo.000',
            instagram : 'sterfri',
            snapchat : 'Donte_t2024'
          },
          {
            user_id :'5507325405',
            username : 'AlexGotIt',
            states :'Pennsylvania, California, California, New York, Maryland',
            whatsapp :'19544009685',
            sms : '+8644927575',
            email : 'borismeh65@gmail.com',
            discord :'Lingo.000',
            instagram : 'sterfri',
            snapchat : 'Donte_t2024'
          },
          {
            user_id :'5507325405',
            username : 'AlexGotIt',
            states :'Pennsylvania, California, California, New York, Maryland',
            whatsapp :'19544009685',
            sms : '+8644927575',
            email : 'borismeh65@gmail.com',
            discord :'Lingo.000',
            instagram : 'sterfri',
            snapchat : 'Donte_t2024'
          },
        ]
      })
  return (
    <BasePage>
    <p className='noto-sans-font medium-font regular-font mb-3'>Shippings 0</p>

    <TableSearchSortFilter data={tableData} dates={dates} setDates={setDates}/>
    </BasePage>
  )
}
