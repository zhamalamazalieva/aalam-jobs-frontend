import React, { useState, useEffect, useContext, useMemo } from "react";
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
} from "@coreui/react";
import ServerServiceContext from "../../contexts/ServerServiceContext";
import Select from "react-select";
import { Formik } from 'formik'


function CityCreateModal({
  closeCreateModal,
  isCreateModalOpen,
  reFetchCities,
}) {

  const ServerService = useContext(ServerServiceContext);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState({})
  const [countries, setCountries] = useState([])
  const [fetchCountriesError, setFetchCountriesError] = useState(null)


  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true)
      const { hasError, data } = await ServerService.getCountries()
      if( hasError ){
        setFetchCountriesError("Ошибка при загрузке данных о стране")
      } 
      else{
        const con = data.map(c => ({value: c.id, label: `${c.name}`}))
        setCountries(con)
        con[0] && setSelectedCountry(con[0])
      }
      return null
    }
    fetchCountries()
  }, [ServerService])


  
  const onSubmit = async (values) => {
    setIsLoading(true);
    const { hasError} = await ServerService.createCity({ name: values.name, country: selectedCountry.value });

    if (hasError) {
      console.log("Ошибка с сервером");
    } else {
      reFetchCities();
      closeCreateModal();

    }
    console.log("ctr: ", selectedCountry)
    setIsLoading(false);

  };
  console.log(isLoading)
  return (
   <Formik
    initialValues={{ name:"", country:""}}
    onSubmit={onSubmit}
    validate={values => {
        const errors = {}
        !values.name && ( errors.name = "Обязательное поле")
        return errors
    }}
    >
        {({
            values,
            handleChange,
            touched,
            handleBlur,
            errors,
            handleSubmit
        }) => (
            <CModal
            onClose={closeCreateModal}
            show={isCreateModalOpen}
            size="sm"
            centered
          >
            <CModalBody>
              <CForm onSubmit={handleSubmit}>
                <CModalHeader>Добавление нового города</CModalHeader>
                <CModalBody>
                  <CRow>
                    <CCol>
                      <CFormGroup row>
                        <CCol xs="12">
                          <CLabel>Название страны</CLabel>
                        </CCol>
                        <CCol xs="12">
                            { fetchCountriesError ?  (
                                   <span className="text-danger">
                                   {fetchCountriesError}
                                 </span>
                            ) : (
                                <Select
                                options={countries}
                                value={selectedCountry}
                                onChange={e => setSelectedCountry(e)}
                                />
                            )}
                         
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CRow>
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
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className={
                            errors.name && touched.name
                              ? "border-error"
                              : ""
                          }
                        />
                        {
                          <span className="text-danger">
                            {errors.name &&
                              touched.name &&
                              errors.name}
                          </span>
                        }
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CModalBody>
                <CModalFooter>
                  {/* {isLoading ? (
                    <div className="mr-5">
                      <MiniSpinner />
                    </div>
                  ) : ( */}
                    <CButton color="primary" type="submit">
                      Добавить
                    </CButton>
                  {/* )} */}
                  <CButton color="secondary" onClick={closeCreateModal}>
                    Отменить
                  </CButton>
                </CModalFooter>
              </CForm>
            </CModalBody>
          </CModal>
        )}
      
   </Formik>
  );
}
export default CityCreateModal;
