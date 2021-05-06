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
  import React, { useContext, useState } from "react";
  import MiniSpinner from "../spinners/MiniSpinner";
  import ServerServiceContext from "../../contexts/ServerServiceContext";
  import { Formik } from "formik";
  
  function CityEditModal({
    isEditModalOpen,
    closeEditModal,
    reFetchCities,
    selectedCity,
  }) {
    const formValues = {
      name:selectedCity.name,
      country:selectedCity.country
    };
  
    const ServerSevice = useContext(ServerServiceContext);
  
    const [isLoading, setIsLoading] = useState(false);
  
    const onSubmit = async (values) => {
      setIsLoading(true);
      const { hasError, data } = await ServerSevice.updateCity({
        id: selectedCity.id,
        name:values.name,
        City_countrycode:values.country
      });
      if (hasError) {
        console.log("Ошибка про запросе: ", hasError);
      } else {
        reFetchCities();
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
            !values.country && (errors.country = "Обязательное поле");
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
                <CModalHeader closeButton>Изменить данные города</CModalHeader>
                <CModalBody>
                  <CRow>
                    <CCol>
                      <CFormGroup row>
                        <CCol xs="12">
                          <CLabel>Название города</CLabel>
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
                          <CLabel>Страна</CLabel>
                        </CCol>
                        <CCol xs="12">
                          <CInput
                            id="City_code"
                            value={values.City_code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.City_code && touched.City_code
                                ? "border-error"
                                : ""
                            }
                          />
                          {
                            <span className="text-danger">
                              {errors.City_code && touched.City_code}
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
  export default CityEditModal;
  