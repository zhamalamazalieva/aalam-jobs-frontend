import React, { useContext, useCallback, useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
  CCol,
} from "@coreui/react";
import ServerServiceContext from "../../contexts/ServerServiceContext";
import MiniSpinner from "../spinners/MiniSpinner";

function CountryDeleteModal({
    reFetchCountries,
    closeDeleteModal,
    isDeleteModalOpen,
    selectedCountry,
}) {
  const ServerService = useContext(ServerServiceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const onDelete = useCallback(async (id) => {
    setIsLoading(true);

    const { hasError, data } = await ServerService.deleteCountry(id);
    if (hasError) {
      setDeleteError("Не удалось удалить этого сотрудника", hasError);
    } else {
      reFetchCountries();
      closeDeleteModal();
    }
    setIsLoading(false);
  }, []);

  return (
    <CModal
      show={isDeleteModalOpen}
      onclose={closeDeleteModal}
      size="sm"
      centered
    >
      <CModalBody>
        Вы уверены, что хотите удалить эту страну из списка?
      </CModalBody>
      <CModalFooter>
        <CRow>
          {isLoading ? (
            <span className="mr-5">
              <MiniSpinner />
            </span>
          ) : (
            <CButton
              color="danger"
              onClick={() => onDelete(selectedCountry.id)}
              className="mr-2"
            >
              Удалить
            </CButton>
          )}

          <CButton color="secondary" onClick={() => closeDeleteModal()}>
            Отмена
          </CButton>
        </CRow>
        {deleteError && (
          <CRow>
            <CCol>
              <span className="text-danger">{deleteError}</span>
            </CCol>
          </CRow>
        )}
      </CModalFooter>
    </CModal>
  );
}
export default CountryDeleteModal;
