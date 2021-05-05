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

function Profile({ closeProfileModal, isProfileOpen }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <CModal show={isProfileOpen} onClose={closeProfileModal}>
        <CModalHeader closeButton>Изменить данные о пользователе</CModalHeader>
        <CModalBody></CModalBody>
        <CModalFooter className="d-flex">
          <div>
            <CButton color="info">Вернуть в исходное положение</CButton>
          </div>
          <div>
            {isLoading ? (
              <span className="mr-2">...</span>
            ) : (
              <CButton color="primary" type="submit" className="ml-2">
                Изменить
              </CButton>
            )}
            <CButton color="secondary" className="ml-2">
              Отмена
            </CButton>
          </div>
        </CModalFooter>
      </CModal>
    </>
  );
}
export default Profile;
