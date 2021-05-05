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
import MiniSpinner from "../spinners/MiniSpinner";
import ServerServiceContext from "../../contexts/ServerServiceContext";
import countryList from "react-select-country-list";
import Select from "react-select";

function CountryCreateModal({
  closeCreateModal,
  isCreateModalOpen,
  reFetchCountries,
}) {
  const ServerService = useContext(ServerServiceContext);

  const [isLoading, setIsLoading] = useState(false);

  const [selectCountry, setSelectCountry] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    setSelectCountry(options[0]);
  }, []);
  const changeHandler = (value) => {
    setSelectCountry(value);
    console.log("value:", value);
  };

  const onSubmit = async (e) => {
      e.preventDefault()
    setIsLoading(true);
    const { hasError, data } = await ServerService.createCountry({
      name: selectCountry.label,
      country_code: selectCountry.value,
    });

    if (hasError) {
      console.log("tut");
    } else {
      console.log("dat: ", reFetchCountries());
      reFetchCountries();
      closeCreateModal();
    }
    setIsLoading(false);
  };
  return (
    <CModal
      onClose={closeCreateModal}
      show={isCreateModalOpen}
      size="sm"
      centered
    >
      <CModalBody>
        <CForm onSubmit={onSubmit}>
          <CModalHeader>Добавление новой страны</CModalHeader>
          <CModalBody>
            <CRow>
              <CCol>
                <CFormGroup row>
                  <CCol xs="12">
                    <CLabel>Название страны</CLabel>
                  </CCol>
                  <CCol xs="12">
                    <Select
                      options={options}
                      value={selectCountry}
                      onChange={changeHandler}
                    />
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
                    <CInput value={selectCountry.value}  disable />
                  </CCol>
                </CFormGroup>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            {isLoading ? (
              <div className="mr-5">
                <MiniSpinner />
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
  );
}
export default CountryCreateModal;
