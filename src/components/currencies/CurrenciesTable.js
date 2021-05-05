import { CRow, CDataTable, CButton, CCol } from '@coreui/react'
import React from 'react'


function CurrenciesTable({Currencies,  onClickDelete, onClickEdit }){
    return(
        <>
            <CDataTable
                items={Currencies}
                fields={fields}
                hover
                striped
                six="sm"
                sorter
                bordered
                pagination
                itemsPerPage={4}
                scopedSlots={{
                    name: (item) => <td>{item.name}</td>,
                    Currency_code:(item) => <td>{item.Currency_code}</td>,
                    actions: (item) => (
                        <td>
                          <CRow className="m-width">
                            <CCol>
                              <CButton
                                size="sm"
                                color="info"
                                onClick={() => onClickEdit(item)}
                              >
                                Изменить
                              </CButton>
                            </CCol>
                            <CCol>
                              <CButton
                                size="sm"
                                color="danger"
                                onClick={() => onClickDelete(item)}
                              >
                                Удалить
                              </CButton>
                            </CCol>
                          </CRow>
                        </td>
                      ),
                }}
            >              
            </CDataTable>
        </>
    )
}
export default CurrenciesTable
const fields = [
    {
        key:"name",
        label:"Страна",
        _style: { width: "50%" }
    },
    {
        key:"Currency_code",
        label:"Код страны",
        _style: { width: "20%" }
    },
    {
        key:"actions",
        label:""
    },
    
]