import React, { useState, useEffect } from 'react'
import Search from '../Search/Search'
import Export from '../Export/Export'
import Sort from '../Sort/Sort'
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker'
import Filter from '../Filter/Filter'
import TableWithPagination from '../TableWithPagination/TableWithPagination'
import RightBar from '../RightBar/RightBar'
export default function TableSearchSortFilter(props) {
    const [search, setSearch] = useState('')
    const [processedData, setProcessedData] = useState({})
    const [selectedFilterOption,setSelectedFilterOption] = useState({})
    const [isFilterChange,setIsFilterChange] = useState(false)
    const [sortBy,setSortBy] = useState('')
    // const [filterOption, setFilterOption] = useState({
    //     country: ['UK', 'USA', 'PK'],
    //     states: ['California', 'State2', 'State3','state4','state5','state6','state-7']
    //   })

      useEffect(()=>{
        setProcessedData(props.data)
      },[props.data])
    


 
    

    useEffect(() => {
        var updatedData 
        if(props.data && props.data.rows){
            updatedData = [...props.data.rows]
        }
        if (search) {
            
             updatedData = searchAllColumns(search, props.data.rows||[])
        }


        if(Object.keys(selectedFilterOption).length>0){
           
             updatedData = filterAll(selectedFilterOption,updatedData||[])
        }
           
        
        updatedData = sortData(sortBy,updatedData||[],props.data.columns[0].field)
        
        

        if(updatedData){
            setProcessedData(prevState => ({
                ...prevState,
                rows: updatedData
            }))
        }
        

    }, [search,isFilterChange,sortBy])

    function searchAllColumns(searchTerm, data) {

        return data.filter(row => {
            return Object.values(row).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    }
    function filterAll(filterTerms, data) {

        return data.filter(row => {
            return Object.keys(filterTerms).every(column => {
               
                if (row[column]) {
                    return filterTerms[column].some(term =>
                        
                        String(row[column]).toLowerCase().includes(',')?String(row[column]).toLowerCase().includes(term.toLowerCase()):String(row[column]).toLowerCase().replace('_',' ') === (term.toLowerCase())
                    );
                }
                return false;
            });
        });
    }

    function sortData(sort,data,sortColumn){
        
           
            return   data.sort((a, b) => {
            
              if (sort === 'asc') {
                return a[sortColumn] > b[sortColumn] ? 1 : -1; 
              } else if (sort === 'desc') {
                return a[sortColumn] < b[sortColumn] ? 1 : -1; 
              }
              return 0;
              
            });
      
           
          
    }
    return (
        <div className='table-data bg-white position-relative' style={{ borderRadius: "5px" }}>
            <div className="row p-3 top-row" style={{ borderBottom: '1px solid #E8E8E8' }}>
                <div className="col-md-6 my-2">
                    <Search search={search} setSearch={setSearch} />
                </div>
                <div className="col-md-6 my-2" style={{ textAlign: 'end' }}>
                    <div className="d-flex align-items-center justify-content-end">
                        <Export data={processedData}/>
                        {props.AddButton}
                    </div>
                </div>
            </div>
            <div className="p-3">
                <div className="row mb-4">
                    <div className="col">
                        <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
                            <div className='d-flex align-items-center justify-content-start row-gap-2'>

                                <Sort sortBy={sortBy} setSortBy={setSortBy}/>
                                <CustomDatePicker dates={props.dates} setDates={props.setDates} />
                            </div>

                            <Filter filterOption={props.filterOption} selectedFilterOption ={selectedFilterOption} setSelectedFilterOption={setSelectedFilterOption} isFilterChange={isFilterChange} setIsFilterChange={setIsFilterChange}/>
                        </div>
                    </div>
                </div>

                <TableWithPagination data={processedData} style={{ background: 'white' }} sortBy={sortBy} changeInTableData={props.changeInTableData}/>
            </div>

            {/* <LeftBar leftBoxCheck = {props.leftBoxCheck}> 
                {props.form}
            </LeftBar> */}
        </div>
    )
}
