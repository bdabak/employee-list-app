/* global moment:true */
sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/smod/employeelistapp/utils/moment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Filter, FilterOperator, momentjs) {
    "use strict";

    return Controller.extend("com.smod.employeelistapp.controller.View1", {
      onInit: function () {
        var oViewModel = new JSONModel({
          displayMode: "grid", // grid or table
          searchQuery: "",
        });

        this.getView().setModel(oViewModel, "empListModel");
      },

      onShowAsGrid: function () {
        var oModel = this.getView().getModel("empListModel");
        oModel.setProperty("/displayMode", "grid");
      },
      onShowAsTable: function () {
        var oModel = this.getView().getModel("empListModel");
        oModel.setProperty("/displayMode", "table");
      },

      onSearch: function (oEvent) {
        // var oModel = this.getView().getModel();
        // var oViewModel = this.getView().getModel("empListModel");
        // var sQuery = oViewModel("/searchQuery");

        // var oGrid = this.getView().byId("employeeGrid");

        // var aFilter = [];
        // var sQuery = oEvent.getParameter("query");
        // if (sQuery) {
        //   aFilter.push(new Filter("Title", FilterOperator.Contains, sQuery));
        //   aFilter.push(new Filter("FirstName", FilterOperator.Contains, sQuery));
        // }

        // var oBinding = oGrid.getBinding("content");
        // oBinding.filter(aFilter);

        var oTable = this.getView().byId("employeeTable");

        var aFilter = [];
        var sQuery = oEvent.getParameter("query");
        if (sQuery) {
          aFilter.push(new Filter("Title", FilterOperator.Contains, sQuery));
        }

        var oBinding = oTable.getBinding("items");
        oBinding.filter(aFilter);
      },

      convertImagePath: function (imageData) {
        var sTrimmedData = imageData.substr(104);
        return "data:image/bmp;base64," + sTrimmedData;
      },
      getEmployeeById: function (employeeId) {
        var oModel = this.getView().getModel();
        var sPath = `/Employees(${employeeId})`;
        var oEmp = oModel.getProperty(sPath);

        return oEmp ? `${oEmp.FirstName} ${oEmp.LastName}` : "";
      },

      getDirectReportsCount: function (employeeId) {
        var oModel = this.getView().getModel();
        var sPath = `/Employees(${employeeId})/Employees1`;

        return new Promise(function (resolve, reject) {
          oModel.read(sPath, {
            success: function (oData) {
              resolve(oData.results.length);
            },
            error: function () {
              resolve(0);
            },
          });
        }).then(function (l) {
          return l > 0 ? l.toString() : "";
        });
      },
      hasDirectReports: function (employeeId) {
        var oModel = this.getView().getModel();
        var sPath = `/Employees(${employeeId})/Employees1`;

        return new Promise(function (resolve, reject) {
          oModel.read(sPath, {
            success: function (oData) {
              resolve(oData.results.length);
            },
            error: function () {
              resolve(0);
            },
          });
        }).then(function (l) {
          return l > 0 ? true : false;
        });
      },
      calculateAge: function (birthDate) {
        if (birthDate) {
          var diff = moment(birthDate).diff(moment(), "milliseconds");
          var duration = moment.duration(diff);
          return Math.abs(duration.years());
        }
        return "";
      },
    });
  }
);
