"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import CustomHeader from "./customHeader.jsx";
import CustomPinnedRowRenderer from "./customPinnedRowRenderer.jsx";

class GridExample extends Component {
  constructor(props) {
    super(props);
    this.expandAll =true;
    this.state = {
      columnDefs: [{ field: "jobTitle" }, { field: "employmentType" }, {field: "salary"}],
      rowData: [
        {
          orgHierarchy: ["Erica Rogers"],
          jobTitle: "CEO",
          employmentType: "Permanent",
          salary: 1000
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett"],
          jobTitle: "Exec. Vice President",
          employmentType: "Permanent",
          salary: 3000
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Esther Baker"],
          jobTitle: "Director of Operations",
          employmentType: "Permanent",
          salary: 1000
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Esther Baker", "Brittany Hanson"],
          jobTitle: "Fleet Coordinator",
          employmentType: "Permanent",
          salary: 1000
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Esther Baker", "Brittany Hanson", "Leah Flowers"],
          jobTitle: "Parts Technician",
          employmentType: "Contract",
          salary: 1000
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Esther Baker", "Brittany Hanson", "Tammy Sutton"],
          jobTitle: "Service Technician",
          employmentType: "Contract",
          salary: 1000
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Esther Baker", "Derek Paul"],
          jobTitle: "Inventory Control",
          employmentType: "Permanent",
          salary: 1000
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Francis Strickland"],
          jobTitle: "VP Sales",
          employmentType: "Permanent",
          salary: 1000
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Francis Strickland", "Morris Hanson"],
          jobTitle: "Sales Manager",
          employmentType: "Permanent",
          salary: 1000
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Francis Strickland", "Todd Tyler"],
          jobTitle: "Sales Executive",
          employmentType: "Contract",
          salary: 1000
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Francis Strickland", "Bennie Wise"],
          jobTitle: "Sales Executive",
          employmentType: "Contract",
          salary: 1000
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Francis Strickland", "Joel Cooper"],
          jobTitle: "Sales Executive",
          employmentType: "Permanent",
          salary: 1000
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
        pinnedRowCellRenderer: "customPinnedRowRenderer", 
        pinnedRowCellRendererParams: { style: { color: "blue" }, value: "Total" },
        headerComponentParams: { expanded: this.expandAll, showExpandIcon: true, expandHandler: this.expandCollapseAll, enableSorting: true },
      },
      frameworkComponents: { agColumnHeader: CustomHeader, customPinnedRowRenderer: CustomPinnedRowRenderer },
      sum: 0
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
    this.addTotalRow();
  }
  
  addTotalRow(){
     let sum = this.state.sum;  
     this.gridApi.forEachNode(node =>{
       sum+= node.data.salary;
     });
     
     this.setState({sum: sum})
     const totalRow = {
          orgHierarchy: ["Total"],
          salary: sum
     }
     
     this.gridApi.updateRowData({ add: [totalRow] });
  }
  
  expandCollapseAll = ()=>{
    // debugger;
    // if(!this.expandAll){
      
      // this.gridApi.expandAll()
    // }else{
      // this.gridApi.collapseAll()
    // }
    
     this.expandAll = !this.expandAll;
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
            height: "90%",
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
            pinnedBottomRowData={[{salary: this.state.sum}]}
          />
          
         {/* <div> Total:  {this.state.sum} </div>*/}
        </div>
      </div>
    );
  }
}

function sumFunction(accumulator, values) {
  var result = 0;
  values.forEach(function(value) {
    if (typeof value === "number") {
      result += value;
    }
  });
  return result;
}

render(<GridExample />, document.querySelector("#root"));
