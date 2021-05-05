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
  
  function CountryEditModal({
    isEditModalOpen,
    closeEditModal,
    reFetchCountries,
    selectedCountry,
  }) {
    const formValues = {
      name:selectedCountry.name,
      country_code:selectedCountry.country_code
    };
  
    const ServerSevice = useContext(ServerServiceContext);
  
    const [isLoading, setIsLoading] = useState(false);
  
    const onSubmit = async (values) => {
      setIsLoading(true);
      const { hasError, data } = await ServerSevice.updateCountry({
        id: selectedCountry.id,
        name:values.name,
        country_code:values.country_code
      });
      if (hasError) {
        console.log("Ошибка про запросе: ", hasError);
      } else {
        reFetchCountries();
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
            !values.country_code && (errors.country_code = "Обязательное поле");
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
                <CModalHeader closeButton>Изменить данные о стране</CModalHeader>
                <CModalBody>
                  <CRow>
                    <CCol>
                      <CFormGroup row>
                        <CCol xs="12">
                          <CLabel>Название страны</CLabel>
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
                          <CLabel>Код страны</CLabel>
                        </CCol>
                        <CCol xs="12">
                          <CInput
                            id="country_code"
                            value={values.country_code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.country_code && touched.country_code
                                ? "border-error"
                                : ""
                            }
                          />
                          {
                            <span className="text-danger">
                              {errors.country_code && touched.country_code}
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
                      <span className="mr-5">
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
  export default CountryEditModal;
  