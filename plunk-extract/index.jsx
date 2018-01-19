"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: "Country",
          field: "country",
          width: 120,
          rowGroup: true
        },
        {
          headerName: "Year",
          field: "year",
          width: 90,
          rowGroup: true
        },
        {
          headerName: "Sport",
          field: "sport",
          width: 110
        },
        {
          headerName: "Athlete",
          field: "athlete",
          width: 200
        },
        {
          headerName: "Gold",
          field: "gold",
          width: 100
        },
        {
          headerName: "Silver",
          field: "silver",
          width: 100
        },
        {
          headerName: "Bronze",
          field: "bronze",
          width: 100
        },
        {
          headerName: "Total",
          field: "total",
          width: 100
        },
        {
          headerName: "Age",
          field: "age",
          width: 90
        },
        {
          headerName: "Date",
          field: "date",
          width: 110
        }
      ],
      autoGroupColumnDef: {
        headerName: "Organisation",
        comparator: sortSubGroup
      }
    }
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      params.api.setRowData(data.slice(0,24));
    };

    httpRequest.open(
      "GET",
      "https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/olympicWinnersSmall.json"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  }
  
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          style={{
            boxSizing: "border-box",
            height: "100%",
            width: "100%"
          }}
          className="ag-theme-fresh"
        >
          <AgGridReact
            id="myGrid"
            columnDefs={this.state.columnDefs}
            animateRows={true}
            enableRangeSelection={true}
            enableSorting={true}
            enableFilter={true}
            onGridReady={this.onGridReady.bind(this)}
            autoGroupColumnDef = {
        this.state.autoGroupColumnDef
      }
          />
        </div>
      </div>
    );
  }
}

function sortSubGroup(valueA, valueB, nodeA, nodeB, isInverted) {
  if(nodeA.uiLevel === 0 && nodeB.uiLevel === 0) {
    return 0;
  }
  else if (!valueA || !valueB) {
    return 0;
  }
  else {
    if(!isNaN(valueA) && !isNaN(valueB)) {
      return parseFloat(valueA) - parseFloat(valueB);
    }
    else {
      var n = valueA.localeCompare(valueB);
      return n;
    }
  }
}

render(<GridExample />, document.querySelector("#root"));
