import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCardHeader,
} from "@coreui/react";
import ServerServiceContext from "src/contexts/ServerServiceContext";
import FullSpinner from "../spinners/FullSpinner";
import CitiesTable from "./CitiesTable";
import CityCreateModal from "./CityCreateModal";
import CityDeleteModal from "./CityDeleteModal";
import CityEditModal from "./CityEditModal";

function CitiesContent(props) {
  const ServerService = useContext(ServerServiceContext);

  const [isLoading, setIsLoading] = useState(false);

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

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
    setIsEditModalOpen(true);
  }, []);
  const closeEditModal = useCallback(async () => {
    setIsEditModalOpen(false);
  }, []);
  const onClickEdit = useCallback(async (City) => {
    setSelectedCity(City);
    openEditModal();
  }, []);
  //DELETEMODAL
  const openDeleteModal = useCallback(async () => {
    setIsDeleteModalOpen(true);
  }, []);
  const closeDeleteModal = useCallback(async () => {
    setIsDeleteModalOpen(false);
  }, []);
  const onClickDelete = useCallback(async (city) => {
    setSelectedCity(city);
    openDeleteModal();
  }, []);
  
  const fetchCities = useCallback(async () => {
    setIsLoading(true);
    const { hasError, data } = await ServerService.getCities();
    if (hasError) {
      console.log("Что-то пошло не так с сервером");
    } else {
      setCities(data);
    }
    console.log("cities", data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCities();
  }, []);

  const reFetchCities = useCallback(async () => {
    fetchCities();
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
                    <span className="mr-2">Добавить город</span>
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              {isLoading ? (
                <FullSpinner />
              ) : (
                <CitiesTable
                  cities={cities}
                  onClickDelete={onClickDelete}
                  onClickEdit={onClickEdit}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {isCreateModalOpen && (
        <CityCreateModal
          isCreateModalOpen={isCreateModalOpen}
          closeCreateModal={closeCreateModal}
          cities={cities}
          reFetchCities={reFetchCities}
        />
      )}
      {isDeleteModalOpen && (
        <CityDeleteModal
          closeDeleteModal={closeDeleteModal}
          isDeleteModalOpen={isDeleteModalOpen}
          selectedCity={selectedCity}
          reFetchCities={reFetchCities}
        />
      )}
      {isEditModalOpen && (
        <CityEditModal
          closeEditModal={closeEditModal}
          isEditModalOpen={isEditModalOpen}
          reFetchCities={reFetchCities}
          selectedCity={selectedCity}
        />
      )}
    </>
  );
}
export default CitiesContent;
