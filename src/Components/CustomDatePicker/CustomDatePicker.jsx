import React from 'react'
import './CustomDatePicker.css'
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import { startOfDay, endOfDay, addDays, subDays } from 'date-fns';


export default function CustomDatePicker(props) {
  const Ranges = [
    {
      label: 'today',
      value: [new Date(), new Date()]
    },
    {
      label: 'yesterday',
      value: [subDays(new Date(), 1), subDays(new Date(),1)]
    },
    {
      label: 'last7Days',
      value: [subDays(new Date(),7), new Date()]
    },
    // {
    //   label: 'last10Days',
    //   value: [startOfDay(subDays(new Date(),10)), endOfDay(new Date())]
    // }
  ];

  const handleDateChange = (range) => {
   
    
    const adjustedDates = [startOfDay(addDays(range[0],1)), endOfDay(range[1],-1)]
    props.setDates(adjustedDates);
  };

  return (
    <div className="field">
    <DateRangePicker
    style={{width:'200px'}}
    className='sm-font noto-sans-font regular-font'
      format="dd-MM-yyyy"
      // defaultCalendarValue={[new Date(), new Date()]}
      value={props.dates}
      onChange={handleDateChange}
      placement="auto"
      ranges={Ranges}
      cleanable={false}
      
    />
  </div>

   

  )
}
