import React, { useState, useCallback } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import CIcon from "@coreui/icons-react";
import Profile from '../components/users/profile/Profile'

const TheHeaderDropdown = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const logoutHandler = () => dispatch(logout());

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const openProfileModal =  useCallback( async() => { setIsProfileOpen(true)},[])
  const closeProfileModal =  useCallback( async() => { setIsProfileOpen(false)},[])



  return (
    <>
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"avatars/6.jpg"}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Аккаунт</strong>
        </CDropdownItem>
        <CDropdownItem onClick={openProfileModal}>
          <CIcon name="cil-user" className="mfe-2" />
          Профиль
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Настройки
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={logoutHandler}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
            Выйти
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
    { isProfileOpen && (
      <Profile
        closeProfileModal={closeProfileModal}
        isProfileOpen={isProfileOpen}
      />
    )}
    </>
  );
};

export default TheHeaderDropdown;
