import React, { useState, useEffect, useContext, useMemo } from 'react'
import {
    CModal, 
    CModalBody,
    CModalFooter,
    CModalHeader,
    CButton,
    CLabel,
    CFormGroup,
    CCol,
    CRow,
    CForm,
    CInput,
} from '@coreui/react'
import MiniSpinner from '../spinners/MiniSpinner'
import ServerServiceContext from '../../contexts/ServerServiceContext'
import { Formik } from 'formik'

function UserCreateModal({ closeCreateModal, isCreateModalOpen, reFetchUsers }){
    const ServerService = useContext(ServerServiceContext)

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async( values ) => {
        setIsLoading(true)
        const { hasError, data } = await ServerService.createUser({ username: values.name, email: values.email,password: values.password })
        console.log({ name: values.name, email: values.email,password: values.password })
        if( hasError ){
            console.log("tut");
        }
        else{
            reFetchUsers()
            closeCreateModal()
        }
        setIsLoading(false)
    }
    return(
        <Formik
            initialValues={{ name:"", email:"", password:""}}
            onSubmit={onSubmit}
            validate={values => {
                const errors = {}
                !values.name && ( errors.name = "Обязательное поле")
                !values.email && ( errors.email = "Обязательное поле")
                !values.password && ( errors.password = "Обязательное поле")

            }}
        >
            {({ 
                values, 
                touched,
                errors, 
                handleSubmit, 
                handleChange, 
                handleBlur

            }) => (
                <CModal onClose={closeCreateModal} show={isCreateModalOpen} size="sm" centered>
                    <CModalBody>
                            <CForm onSubmit={handleSubmit}>
                                <CModalHeader>
                                Добавление нового пользователя
                                </CModalHeader>
                                <CModalBody>
                                    <CRow>
                                        <CCol>
                                            <CFormGroup row>
                                                <CCol xs="12">
                                                    <CLabel>
                                                        Аккаунт пользователя
                                                    </CLabel>
                                                </CCol>
                                                <CCol xs="12">
                                                    <CInput
                                                        id="name"
                                                        value={values.name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={ errors.name && touched.name ? "border-danger" : ""}
                                                    />
                                                    {
                                                        <span className="text-danger">
                                                            {
                                                                errors.name && touched.name && errors.name
                                                            }
                                                        </span>
                                                    }
                                               </CCol>
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol>
                                            <CFormGroup row>
                                                <CCol xs="12">
                                                    <CLabel>
                                                        Электронный адрес
                                                    </CLabel>
                                                </CCol>
                                                <CCol xs="12">
                                                    <CInput
                                                        id="email"
                                                        type="email"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={ errors.email && touched.email ? "border-danger" : ""}
                                                    />
                                                    {
                                                        <span className="text-danger">
                                                            {
                                                                errors.email && touched.email && errors.email
                                                            }
                                                        </span>
                                                    }
                                               </CCol>
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol>
                                            <CFormGroup row>
                                                <CCol xs="12">
                                                    <CLabel>
                                                        Пароль
                                                    </CLabel>
                                                </CCol>
                                                <CCol xs="12">
                                                    <CInput
                                                        id="password"
                                                        type="password"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={ errors.password && touched.password ? "border-danger" : ""}
                                                    />
                                                    {
                                                        <span className="text-danger">
                                                            {
                                                                errors.password && touched.password && errors.password
                                                            }
                                                        </span>
                                                    }
                                               </CCol>
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                </CModalBody>
                                <CModalFooter>
                                    { isLoading ? (
                                        <div className="mr-5">
                                            <MiniSpinner/>
                                        </div>
                                    ) : (
                                        <CButton color="primary" type="submit">
                                            Добавить
                                        </CButton>
                                    )}
                                    <CButton color="secondary" onClick={closeCreateModal}>
                                        Отменить
                                    </CButton>
                                </CModalFooter>
                            </CForm>                        
                    </CModalBody>
                </CModal>
            )}
           
        </Formik>
    )

}
export default UserCreateModal