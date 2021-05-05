import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CHeader,
  CCardHeader,
} from "@coreui/react";
import ServerServiceContext from "src/contexts/ServerServiceContext";
import FullSpinner from "../spinners/FullSpinner";
import CurrenciesTable from "./CurrenciesTable";
import CurrencyCreateModal from "./CurrencyCreateModal";
import CurrencyDeleteModal from "./CurrencyDeleteModal";
import CurrencyEditModal from './CurrencyEditModal'

function CurrenciesContent(props) {
  const ServerService = useContext(ServerServiceContext);

  const [isLoading, setIsLoading] = useState(false);

  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  //CREATEMODAL
  const openCreateModal = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);
  const closeCreateModal = useCallback(() => {
    setIsCreateModalOpen(false);
  }, []);
  //EDITMODAL
  const openEditModal = useCallback(async () => {
    setIsEditModalOpen(true)
  },[])
  const closeEditModal = useCallback(async () => {
    setIsEditModalOpen(false)
  },[])
  const onClickEdit = useCallback( async ( Currency)=> {
    setSelectedCurrency(Currency)
    openEditModal()
  },[])
  //DELETEMODAL
  const openDeleteModal = useCallback(async () => {
    setIsDeleteModalOpen(true);
  }, []);
  const closeDeleteModal = useCallback(async () => {
    setIsDeleteModalOpen(false);
  }, []);
  const onClickDelete = useCallback(async (Currency) => {
    setSelectedCurrency(Currency);
    openDeleteModal();
  }, []);

  const fetchCurrencies = useCallback(async () => {
    setIsLoading(true);
    const { hasError, data } = await ServerService.getCurrencies();
    if (hasError) {
      console.log("Что-то пошло не так с сервером");
    } else {
      setCurrencies(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const reFetchCurrencies = useCallback(async () => {
    fetchCurrencies();
  }, []);

  return (
    <>
      <CRow>
        <CCol className="c-main container-fluid col-12">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol>
                  <h4>Список валют</h4>
                </CCol>
                <CCol>
                  <CButton
                    color="primary"
                    className="float-right"
                    onClick={openCreateModal}
                  >
                    <span className="mr-2">Добавить валюту</span>
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              {isLoading ? (
                <FullSpinner />
              ) : (
                <CurrenciesTable
                  сurrencies={сurrencies}
                  onClickDelete={onClickDelete}
                  onClickEdit={onClickEdit}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {isCreateModalOpen && (
        <CurrencyCreateModal
          isCreateModalOpen={isCreateModalOpen}
          closeCreateModal={closeCreateModal}
          сurrencies={сurrencies}
          reFetchCurrencies={reFetchCurrencies}
        />
      )}
      {isDeleteModalOpen && (
        <CurrencyDeleteModal
          closeDeleteModal={closeDeleteModal}
          isDeleteModalOpen={isDeleteModalOpen}
          selectedCurrency={selectedCurrency}
          reFetchCurrencies={reFetchCurrencies}
        />
      )}
      { isEditModalOpen && (
        <CurrencyEditModal
          closeEditModal={closeEditModal}
          isEditModalOpen={isEditModalOpen}
          reFetchCurrencies={reFetchCurrencies}
          selectedCurrency={selectedCurrency}
        />
      )
      }
    </>
  );
}
export default CurrenciesContent;
