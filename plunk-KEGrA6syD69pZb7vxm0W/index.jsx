"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import CustomHeader from "./customHeader.jsx";

class GridExample extends Component {
  constructor(props) {
    super(props);
    // this.expandAll =true;
    this.state = {
      columnDefs: [{ field: "jobTitle" }, { field: "employmentType" }],
      rowData: [
        {
          orgHierarchy: ["Erica Rogers"],
          jobTitle: "CEO",
          employmentType: "Permanent"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett"],
          jobTitle: "Exec. Vice President",
          employmentType: "Permanent"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Esther Baker"],
          jobTitle: "Director of Operations",
          employmentType: "Permanent"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Esther Baker", "Brittany Hanson"],
          jobTitle: "Fleet Coordinator",
          employmentType: "Permanent"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Esther Baker", "Brittany Hanson", "Leah Flowers"],
          jobTitle: "Parts Technician",
          employmentType: "Contract"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Esther Baker", "Brittany Hanson", "Tammy Sutton"],
          jobTitle: "Service Technician",
          employmentType: "Contract"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Esther Baker", "Derek Paul"],
          jobTitle: "Inventory Control",
          employmentType: "Permanent"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Francis Strickland"],
          jobTitle: "VP Sales",
          employmentType: "Permanent"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Francis Strickland", "Morris Hanson"],
          jobTitle: "Sales Manager",
          employmentType: "Permanent"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Francis Strickland", "Todd Tyler"],
          jobTitle: "Sales Executive",
          employmentType: "Contract"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Francis Strickland", "Bennie Wise"],
          jobTitle: "Sales Executive",
          employmentType: "Contract"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Francis Strickland", "Joel Cooper"],
          jobTitle: "Sales Executive",
          employmentType: "Permanent"
        }
      ],
      groupDefaultExpanded: -1,
      getDataPath: function(data) {
        return data.orgHierarchy;
      },
      autoGroupColumnDef: {
        headerName: "Organisation Hierarchy",
        cellRendererParams: {
          suppressCount: true,
          padding: 20
        },
        headerComponentParams: { showExpandIcon: true, expandHandler: this.expandCollapseAll, enableSorting: true },
      },
      frameworkComponents: { agColumnHeader: CustomHeader },
      defaultColDef: {
        headerComponentParams: { menuIcon: "fa-bars" }
      }
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  
  expandCollapseAll = ()=>{
    
    this.gridApi.forEachNode(node =>{
      // debugger;
      node.setExpanded(!node.expanded);
     });
   
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
      <span onClick={this.expandCollapseAll}>Expand/collapse</span>
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
            rowData={this.state.rowData}
            treeData={true}
            animateRows={true}
            groupDefaultExpanded={-1}
            getDataPath={this.state.getDataPath}
            frameworkComponents={this.state.frameworkComponents}
            defaultColDef={this.state.defaultColDef}
            autoGroupColumnDef={this.state.autoGroupColumnDef}
            onGridReady={this.onGridReady.bind(this)}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample />, document.querySelector("#root"));
