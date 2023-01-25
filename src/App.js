import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CustomToolPanel,
  CustomLoading,
  CustomHeaderBtn,
  Popup,
  GroupPanel,
} from "./components/";
import "./app.css";

function App() {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState();
  const [isUserListPopupOpen, setIsUserListPopupOpen] = useState(false);
  const [isGroupPopupOpen, setIsGroupPopupOpen] = useState(false);

  const togglePopup = useCallback((cb) => {
    cb((prev) => !prev);
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        colId: "name",
        field: "name",
        headerComponent: CustomHeaderBtn,
        headerComponentParams: {
          onClick: () => togglePopup(setIsUserListPopupOpen),
          btnText: "All users",
        },
        headerName: "Name",
      },
      {
        colId: "username",
        field: "username",
        headerComponent: CustomHeaderBtn,
        headerComponentParams: {
          onClick: () => togglePopup(setIsGroupPopupOpen),
          btnText: "Grouping",
        },
        headerName: "Username",
      },
      { colId: "email", field: "email", headerName: "Email" },
      { colId: "lat", field: "latitude", headerName: "Latitude" },
      { colId: "lng", field: "longitude", headerName: "Longitude" },
      { colId: "street", field: "street", headerName: "Street" },
      { colId: "city", field: "city", headerName: "City" },
      {
        colId: "companyName",
        field: "companyName",
        headerName: "Company name",
      },
    ],
    []
  );

  const sideBarConf = useMemo(
    () => ({
      toolPanels: [
        {
          id: "customToolPanel",
          labelDefault: "Custom Tool Panel",
          labelKey: "customToolPanelLabel",
          toolPanel: CustomToolPanel,
        },
      ],
      defaultToolPanel: "customToolPanel",
    }),
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.forEachNode((node) => {
      node.setSelected(!!node.data && node.rowIndex === 0);
    });
  }, []);

  const popupChildren = useMemo(() => {
    return (
      <ul>
        {rowData?.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    );
  }, [rowData]);

  const handleApplyBtn = useCallback(() => {
    togglePopup(setIsGroupPopupOpen);
  }, []);

  const handleResetBtn = useCallback(() => {
    gridRef.current.columnApi.setRowGroupColumns([]);
  }, []);

  const handleSelectChange = useCallback((e) => {
    const colId = e.target.value;
    gridRef.current.columnApi.setRowGroupColumns([colId]);
  }, []);

  const rowDataObj = useCallback((data) => {
    return data.map((row) => {
      return {
        name: row?.name,
        username: row?.username,
        email: row?.email,
        latitude: row?.address?.geo?.lat,
        longitude: row.address?.geo?.lng,
        street: row?.address?.street,
        city: row?.address?.city,
        companyName: row?.company?.name,
      };
    });
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((result) => result.json())
      .then((data) => setRowData(rowDataObj(data)));
  }, []);

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="single"
          loadingOverlayComponent={CustomLoading}
          onFirstDataRendered={onFirstDataRendered}
          sideBar={sideBarConf}
          groupDisplayType="singleColumn"
        />
      </div>
      {isUserListPopupOpen && (
        <Popup
          headerPopup="Users"
          closePopup={() => togglePopup(setIsUserListPopupOpen)}
          children={popupChildren}
        />
      )}
      {isGroupPopupOpen && (
        <Popup
          headerPopup="Grouping"
          closePopup={() => togglePopup(setIsGroupPopupOpen)}>
          <GroupPanel
            options={columnDefs}
            onApply={handleApplyBtn}
            onReset={handleResetBtn}
            onSelectChange={handleSelectChange}
          />
        </Popup>
      )}
    </div>
  );
}

export default App;
