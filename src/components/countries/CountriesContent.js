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
import CountriesTable from "./CountriesTable";
import CountryCreateModal from "./CountryCreateModal";
import CountryDeleteModal from "./CountryDeleteModal";
import CountryEditModal from './CountryEditModal'

function CountriesContent(props) {
  const ServerService = useContext(ServerServiceContext);

  const [isLoading, setIsLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

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
  const onClickEdit = useCallback( async ( country)=> {
    setSelectedCountry(country)
    openEditModal()
  },[])
  //DELETEMODAL
  const openDeleteModal = useCallback(async () => {
    setIsDeleteModalOpen(true);
  }, []);
  const closeDeleteModal = useCallback(async () => {
    setIsDeleteModalOpen(false);
  }, []);
  const onClickDelete = useCallback(async (country) => {
    setSelectedCountry(country);
    openDeleteModal();
  }, []);

  const fetchCountries = useCallback(async () => {
    setIsLoading(true);
    const { hasError, data } = await ServerService.getCountries();
    if (hasError) {
      console.log("Что-то пошло не так с сервером");
    } else {
      setCountries(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCountries();
  }, []);

  const reFetchCountries = useCallback(async () => {
    fetchCountries();
  }, []);

  return (
    <>
      <CRow>
        <CCol className="c-main container-fluid col-12">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol>
                  <h4>Список стран</h4>
                </CCol>
                <CCol>
                  <CButton
                    color="primary"
                    className="float-right"
                    onClick={openCreateModal}
                  >
                    <span className="mr-2">Добавить страну</span>
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              {isLoading ? (
                <FullSpinner />
              ) : (
                <CountriesTable
                  countries={countries}
                  onClickDelete={onClickDelete}
                  onClickEdit={onClickEdit}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {isCreateModalOpen && (
        <CountryCreateModal
          isCreateModalOpen={isCreateModalOpen}
          closeCreateModal={closeCreateModal}
          countries={countries}
          reFetchCountries={reFetchCountries}
        />
      )}
      {isDeleteModalOpen && (
        <CountryDeleteModal
          closeDeleteModal={closeDeleteModal}
          isDeleteModalOpen={isDeleteModalOpen}
          selectedCountry={selectedCountry}
          reFetchCountries={reFetchCountries}
        />
      )}
      { isEditModalOpen && (
        <CountryEditModal
          closeEditModal={closeEditModal}
          isEditModalOpen={isEditModalOpen}
          reFetchCountries={reFetchCountries}
          selectedCountry={selectedCountry}
        />
      )
      }
    </>
  );
}
export default CountriesContent;
