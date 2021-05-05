import {
    CModal,
    CModalBody,
    CModalHeader,
    CModalFooter,
    CButton,
    CCol,
    CRow,
    CFormGroup,
    CInput,
    CLabel,
    CForm,
  } from "@coreui/react";
  import React, { useContext, useState, useCallback } from "react";
  import MiniSpinner from "../spinners/MiniSpinner";
  import ServerServiceContext from "../../contexts/ServerServiceContext";
  import { Formik } from "formik";
  
  function UserEditModal({
    isEditModalOpen,
    closeEditModal,
    reFetchUsers,
    selectedUser,
  }) {
    const formValues = {
      name:selectedUser.name,
      email:selectedUser.email
    };
  
    const ServerSevice = useContext(ServerServiceContext);
  
    const [isLoading, setIsLoading] = useState(false);
  
    const onSubmit = async (values) => {
      setIsLoading(true);
      const { hasError, data } = await ServerSevice.updateUser({
        id: selectedUser.id,
        name:values.name,
        email:values.email
      });
      if (hasError) {
        console.log("Ошибка про запросе: ", hasError);
      } else {
        reFetchUsers();
        closeEditModal();
      }
      setIsLoading(false);
    };
  
    return (
      <>
        <Formik
          initialValues={formValues}
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
            !values.name && (errors.name = "Обязательное поле");
            !values.email && (errors.email = "Обязательное поле");
            return errors;
          }}
        >
          {({
            values,
            errors,
            touched,
            handleReset,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting,
          }) => (
            <CModal show={isEditModalOpen} onClose={closeEditModal}>
              <CForm onSubmit={handleSubmit}>
                <CModalHeader closeButton>Изменить данные о пользователе</CModalHeader>
                <CModalBody>
                  <CRow>
                    <CCol>
                      <CFormGroup row>
                        <CCol xs="12">
                          <CLabel>Аккаунт пользователя</CLabel>
                        </CCol>
                        <CCol xs="12">
                          <CInput
                            id="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.name && touched.name
                                ? "border-error"
                                : ""
                            }
                          />
                          {
                            <span className="text-danger">
                              {errors.name && touched.name}
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
                          <CLabel>Электронный адрес</CLabel>
                        </CCol>
                        <CCol xs="12">
                          <CInput
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.email && touched.email
                                ? "border-error"
                                : ""
                            }
                          />
                          {
                            <span className="text-danger">
                              {errors.email && touched.email}
                            </span>
                          }
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  </CModalBody>
                <CModalFooter className="d-flex">
                  <div>
                    <CButton color="info" onClick={() => handleReset()}>
                      Вернуть в исходное положение
                    </CButton>
                  </div>
                  <div>
                    {isLoading ? (
                      <span className="mr-2">
                        <MiniSpinner />
                      </span>
                    ) : (
                      <CButton color="primary" type="submit" className="ml-2">
                        Изменить
                      </CButton>
                    )}
                    <CButton
                      color="secondary"
                      onClick={() => {
                        handleReset();
                        closeEditModal();
                      }}
                      className="ml-2"
                    >
                      Отмена
                    </CButton>
                  </div>
                </CModalFooter>
              </CForm>
            </CModal>
          )}
        </Formik>
      </>
    );
  }
  export default UserEditModal;
  