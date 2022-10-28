/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comsmod/employee-list-app/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
