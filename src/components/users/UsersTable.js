import { CRow, CDataTable, CButton, CCol } from '@coreui/react'
import React from 'react'


function UsersTable({users,  onClickDelete, onClickEdit }){
    return(
        <>
            <CDataTable
                items={users}
                fields={fields}
                hover
                striped
                six="sm"
                sorter
                bordered
                pagination
                itemsPerPage={4}
                scopedSlots={{
                    name: (item) => <td>{item.username}</td>,
                    email:(item) => <td>{item.email}</td>,
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
export default UsersTable
const fields = [
    {
        key:"username",
        label:"Имя пользователя",
        _style: { width: "35%" }
    },
    {
        key:"email",
        label:"Электронный адрес",
        _style: { width: "35%" }
    },
    {
        key:"actions",
        label:""
    },
    
]