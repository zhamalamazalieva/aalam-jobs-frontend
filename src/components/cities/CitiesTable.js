import { CRow, CDataTable, CButton, CCol } from "@coreui/react";
import React from "react";

function CitiesTable({ cities, onClickDelete, onClickEdit }) {
  return (
    <>
      <CDataTable
        items={cities}
        fields={fields}
        hover
        striped
        six="sm"
        sorter
        bordered
        pagination
        itemsPerPage={4}
        scopedSlots={{
          name: (item) => <td>{item.name}</td>,
          country: (item) => <td>{item.country.label}</td>,
          actions: (item) => (
            <td>
              <CRow className="m-width">
                <CCol>
                  <CButton
                    size="sm"
                    color="info"
                    onClick={() => onClickEdit(item)}
                  >
                    Изменить
                  </CButton>
                </CCol>
                <CCol>
                  <CButton
                    size="sm"
                    color="danger"
                    onClick={() => onClickDelete(item)}
                  >
                    Удалить
                  </CButton>
                </CCol>
              </CRow>
            </td>
          ),
        }}
      ></CDataTable>
    </>
  );
}
export default CitiesTable;
const fields = [
  {
    key: "name",
    label: "Город",
    _style: { width: "35%" },
  },
  {
    key: "country",
    label: "Страна",
    _style: { width: "35%" },
  },
  {
    key: "actions",
    label: "",
  },
];
