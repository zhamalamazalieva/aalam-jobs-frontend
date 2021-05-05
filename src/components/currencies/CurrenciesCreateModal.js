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

function CurrencyCreateModal({
  closeCreateModal,
  isCreateModalOpen,
  reFetchCurrencies,
}) {
  const ServerService = useContext(ServerServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [newCurrency, setNewCurrency] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    const { hasError, data } = await ServerService.createCurrency({
      name: selectCurrency.label,
      Currency_code: selectCurrency.value,
    });

    if (hasError) {
      console.log("tut");
    } else {
      console.log("dat: ", reFetchCurrencies());
      reFetchCurrencies();
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
          <CModalHeader>Добавление новой валюты</CModalHeader>
          <CModalBody>
            <CRow>
              <CCol>
                <CFormGroup row>
                  <CCol xs="12">
                    <CLabel>Название валюты</CLabel>
                  </CCol>
                  <CCol xs="12">
                      <CInput
                        value={newCurrency}
                        onChange={e => setNewCurrency(e)}
                      />
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
export default CurrencyCreateModal;
