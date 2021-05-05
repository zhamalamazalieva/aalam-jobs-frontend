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
import UsersTable from "./UsersTable";
import UserCreateModal from "./UserCreateModal";
import UserDeleteModal from "./UserDeleteModal";
import UserEditModal from './UserEditModal'

function UsersContent(props) {
  const ServerService = useContext(ServerServiceContext);

  const [isLoading, setIsLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

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
  const onClickEdit = useCallback( async ( User)=> {
    setSelectedUser(User)
    openEditModal()
  },[])
  //DELETEMODAL
  const openDeleteModal = useCallback(async () => {
    setIsDeleteModalOpen(true);
  }, []);
  const closeDeleteModal = useCallback(async () => {
    setIsDeleteModalOpen(false);
  }, []);
  const onClickDelete = useCallback(async (User) => {
    setSelectedUser(User);
    openDeleteModal();
  }, []);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    const { hasError, data } = await ServerService.getUsers();
    if (hasError) {
      console.log("Что-то пошло не так с сервером");
    } else {
      setUsers(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const reFetchUsers = useCallback(async () => {
    fetchUsers();
  }, []);

  return (
    <>
      <CRow>
        <CCol className="c-main container-fluid col-10">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol>
                  <h4>Список пользователей</h4>
                </CCol>
                <CCol>
                  <CButton
                    color="primary"
                    className="float-right"
                    onClick={openCreateModal}
                  >
                    <span className="mr-2">Добавить пользователя</span>
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              {isLoading ? (
                <FullSpinner />
              ) : (
                <UsersTable
                  users={users}
                  onClickDelete={onClickDelete}
                  onClickEdit={onClickEdit}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {isCreateModalOpen && (
        <UserCreateModal
          isCreateModalOpen={isCreateModalOpen}
          closeCreateModal={closeCreateModal}
          users={users}
          reFetchUsers={reFetchUsers}
        />
      )}
      {isDeleteModalOpen && (
        <UserDeleteModal
          closeDeleteModal={closeDeleteModal}
          isDeleteModalOpen={isDeleteModalOpen}
          selectedUser={selectedUser}
          reFetchUsers={reFetchUsers}
        />
      )}
      { isEditModalOpen && (
        <UserEditModal
          closeEditModal={closeEditModal}
          isEditModalOpen={isEditModalOpen}
          reFetchUsers={reFetchUsers}
          selectedUser={selectedUser}
        />
      )
      }
    </>
  );
}
export default UsersContent;
