import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { register } from "../redux/actions/authActions";
import { useHistory } from "react-router-dom";
import { Formik } from 'formik' 


const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [username, setSUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (values) => {
    dispatch(register(values.email, values.username, values.password, toLogin));
  };

  function toLogin() {
    history.push("/login");
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                  <Formik
                    initialValues={{username:"", email:"", password:""}}
                    validate={values => {
                      const errors = {}
                      !values.username && ( errors.username = "Объзятельное поле")
                      !values.password && ( errors.password = "Объзятельное поле")
                      !values.email && ( errors.email = "Объзятельное поле") 
                    }}
                    onSubmit={onSubmit}
                  >
                    {({
                        handleBlur,
                        handleChange,
                        handleSubmit, 
                        errors,
                        values,
                        touched

                    }) => (
                      <CForm onSubmit={handleSubmit}>
                      <h1>Регистрация</h1>
                      <p className="text-muted">Создай свой аккаунт</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-envelope-closed" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          id="email"
                          value={values.email}
                          type="email"
                          onChange={handleChange}
                          placeholder="Имя"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="username"
                          className={ errors.email && touched.email ? "border-danger" : ""}
                        />
                        <div className="tetx-danger position-abs">
                          { errors.email && touched.email && errors.email}
                        </div>

                      </CInputGroup>                     
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>@</CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          id="username"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          placeholder="Аккаунт"
                          className={errors.username && touched.username ? "boder-danger" : ""}
                        />
                        <div className="text-danger position-abs">
                            { errors.username && touched.usermame && errors.username}
                        </div>
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                        id="password"
                          value={values.password}
                          onChange={handleChange}
                          onBLur={handleBlur}
                          type="password"
                          placeholder="Пароль"
                          autoComplete="new-password"
                          className={ errors.password && touched.password ? "border-danger" : ""}
                          />
                          <div className="tetx-danger position-abs">
                            { errors.password && touched.password && errors.password}
                          </div>
                    
                      </CInputGroup>
                      <CButton color="success" type="submit" block>
                        Create Account
                      </CButton>
                    </CForm>
                    )}
                  </Formik>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block>
                      <span>facebook</span>
                    </CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block>
                      <span>twitter</span>
                    </CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default RegisterPage;
