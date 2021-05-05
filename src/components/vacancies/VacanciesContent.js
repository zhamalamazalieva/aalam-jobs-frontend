// import React from 'react'
// import {
//     CButton, 
//     CCard,
//     CCardBody,
//     CCardHeader,
//     CCol,
import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

const VacanciesContent = () => {

    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
  
    const changeHandler = value => {
      setValue(value)
    }
  
    return <Select options={options} value={value} onChange={changeHandler} />
  }

export default VacanciesContent

// } from "@coreui/react"
// import FullSpinner from '../spinners/FullSpinner'
// import MiniSpinner from '../spinners/MiniSpinner'

// function VacanciesContent(props){
//     return (
//         <>
//             <CCard>
//                 <CCardHeader>
//                     <CRow>
//                         <CCol>Управление вакансиями</CCol>
//                         <CCol>
//                             <CButton color="primary" className="float-right">
//                                 <span>Добавить новую вакансию</span>
//                             </CButton>
//                         </CCol>
//                     </CRow>
//                 </CCardHeader>
//                 <CCardBody>

//                 </CCardBody>
//             </CCard>
//         </>
//     )
// }
// export default VacanciesContent