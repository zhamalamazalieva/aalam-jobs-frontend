import React from 'react'
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CCardHeader
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import CountriesContent from '../countries/CountriesContent'
import CitiesContent from '../cities/CitiesContent'


const Catalog = () => {

  return (
    <CRow>
      <CCol >
        <CCard>
          <CCardHeader>
                Справочник
            <DocsLink name="CTabs"/>
          </CCardHeader>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    Страны
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Города
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Валюта
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <CountriesContent/>
                </CTabPane>
                <CTabPane>
                  <CitiesContent/>
                </CTabPane>
                <CTabPane>
                
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
      </CRow>

  )}

  export default Catalog