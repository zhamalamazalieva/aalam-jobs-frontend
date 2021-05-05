import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import { login } from "../redux/actions/authActions";
import { Formik } from "formik";

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuth = useSelector((state) => state.auth.isAuth);
  const error = useSelector((state) => state.auth.error);

  const onSubmit = (values) => {
    dispatch(login(values.username, values.password));
  };

  useEffect(() => {
    if (isAuth) {
      history.push("/main");
    }
  }, [isAuth, history]);

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Formik
                    initialValues={{ username: "", password: "" }}
                    validate={(values) => {
                      const errors = {};
                      !values.username && (errors.username = "Обязательное поле");
                      !values.password && (errors.password = "Обязательное поле");
                      return errors;
                    }}
                    onSubmit={onSubmit}
                  >
                    {({
                      values,
                      touched,
                      errors,
                      handleChange,
                      handleSubmit,
                      handleBlur,
                    }) => (
                      <CForm onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                          id="username"
                            value={values.username}
                            onChange={handleChange}
                            type="text"
                            onBlur={handleBlur}
                            className={ errors.username && touched.username ? "border-danger" : ""}
                          />
                          <div className="text-danger position-abs">
                            { errors.username && touched.username && errors.username}
                          </div>
                        </CInputGroup>                        
                        <CInputGroup className="mb-5">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                          id="password"
                            value={values.password}
                            onChange={handleChange}
                            type="password"
                            onBlur={handleBlur}
                            className={ errors.password && touched.password ? "border-danger" : ""}
                          />
                           <div className="text-danger position-abs">
                            { errors.password && touched.password && errors.password}
                          </div>
                         
                        </CInputGroup>
                        {error && error.detail && (
                          <span className="text-danger danger-message">
                            Некорректные данные
                          </span>
                        )}
                        <CRow>
                          <CCol xs="6">
                            <CButton
                              color="primary"
                              className="px-4"
                              type="submit"
                            >
                              Login
                            </CButton>
                          </CCol>
                          <CCol xs="6" className="text-right">
                            <CButton color="link" className="px-0">
                              Forgot password?
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    )}
                  </Formik>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default LoginPage;
