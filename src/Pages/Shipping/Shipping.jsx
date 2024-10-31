import React, { useEffect, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import subDays from 'date-fns/subDays'
import TableSearchSortFilter from '../../Components/TableSearchSortFilter/TableSearchSortFilter'
import axios from '../../Api/axios'
import TableAction from '../../Components/TableAction/TableAction'
import RightBarForm from '../../Components/RightBarForm/RightBarForm'
import RightBar from '../../Components/RightBar/RightBar'
import { useApi } from '../../Provider/ApiProvider'
import { useRightBar } from '../../Provider/RightBarProvider'
export default function Shipping() {

  const {setRightBarCheckbox} = useRightBar()
  const {increaseApiCounter,decreaseApiCounter} = useApi()
  const [dates, setDates] = useState([subDays(new Date(), 30), new Date()])
  const [editData, setEditData] = useState({})
  const [isEditFormShow, setIsEditFormShow] = useState(false)
  const [filterOption,setFilterOption] = useState({})
  const [errors, setErrors] = useState({})
    
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
          {
            label:"Notes",
            field:"notes"
          },
          {
            label:"Status",
            field:"status"
          },
         
         
        ],
       
      })


      useEffect(()=>{
        getShippingApi()
      },[dates])

      useEffect(()=>{
        getFilterOptionApi()
      },[])

      
    
    
      const handleEditShippingChange = (e) => {
        const { name, value } = e.target
        console.log(name)
        setEditData(prevState => ({
          ...prevState,
          [name]: value
        }))
      }

      const showEditShipping = (e) => {
  
        setEditData(JSON.parse(e.target.value));
        setIsEditFormShow(true)
        setRightBarCheckbox(true)
      }

      const getShippingApi = () =>{
        increaseApiCounter()
        axios.get('shippings/',{
          params:{
            dates:dates
          }
        })
        .then(response=>{
          console.log(';;;;;;;;;;;;;;;;;;;;;;;;')
          setTableData(prevState=>({
            ...prevState,
            'rows':response.data
          }))
          decreaseApiCounter()
        }).catch(error=>{
          
          decreaseApiCounter()
        })
      }

      const getFilterOptionApi = () =>{
        axios.get('shipping/filter-options')
        .then(response=>{
          console.log(response)
          setFilterOption(response.data)
        }).catch(error=>{
          console.log(error)
        })
      }


      const editShippingApi = (e) => {
        e.preventDefault()
        increaseApiCounter()
        
        axios.put('shippings/'+editData['id']+'/',editData)
        .then(response =>{
          console.log(response)
          setErrors({})
          decreaseApiCounter()
          getShippingApi()
          setRightBarCheckbox(false)
          
        }).catch(error =>{
          if(error.response.status === 400){
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
                <button value={JSON.stringify(row)} onClick={showEditShipping} className='edit-btn w-100 noto-sans-font'><i className="ti ti-edit text-primary me-2"></i>Edit</button>
              </div>
            </TableAction>
            row['status'] = <div className={'status '+row['status']}>{row['status'].replace('_',' ')}</div>
            row['notes'] = <div style={{width:150,overflow:'clip'}}>
              {row['notes']}
            </div>
          })
        }
        return data
      }
  return (
    <BasePage>
    {/* <p className='noto-sans-font medium-font regular-font mb-3'>Shippings 0</p> */}

    <TableSearchSortFilter data={tableData} dates={dates} setDates={setDates} changeInTableData={changeInTableData} filterOption={filterOption} reportName = "shippingReport.csv"/>
    {isEditFormShow && <RightBar setIsFormShow={setIsEditFormShow}  rightBarTitle="Edit Lead Data" children={<ShippingForm data={editData} handleChangeData={handleEditShippingChange} onSubmit={editShippingApi}  errors={errors} />} />}
    </BasePage>
    
  )
}

export const ShippingForm = (props) => {
  console.log(props.data,'inside form')
  const formChildren = <div className="row">
    <div className="col-12">
      <label htmlFor="notes" className='sm-font semibold-font'>Edit Note</label>
      <textarea name="notes" id="notes" value={props.data['notes']} className='w-100 ' rows={15} onChange={props.handleChangeData}></textarea>
    </div>

    <div className="col-12 mt-2">
      <label htmlFor="status" className='sm-font semibold-font'>Status</label>
      <br />
      <select name="status" id="status" value={props.data.status} className='w-100' onChange={props.handleChangeData}>
        <option value="in_progress">In Progress</option>
        <option value="not_verified">Not Verified</option>
        <option value="verified">Verified</option>
      </select>
     
    </div>

  </div>
  return (

    <RightBarForm setIsRightBar={props.setIsRightBar} onSubmit={props.onSubmit} children={formChildren} />
  )
}
