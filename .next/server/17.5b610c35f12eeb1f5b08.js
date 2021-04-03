exports.ids = [17];
exports.modules = {

/***/ "bMVF":
/***/ (function(module, exports) {



/***/ }),

/***/ "jfrX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Map; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_leaflet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("AuoD");
/* harmony import */ var react_leaflet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_leaflet__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("bMVF");
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_4__);




function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class Map extends react__WEBPACK_IMPORTED_MODULE_2__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      center: {
        lat: 33.4484,
        lng: -112
      },
      marker: {
        lat: 33.4484,
        lng: -112
      },
      zoom: 12,
      draggable: true
    });

    _defineProperty(this, "refmarker", /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_2__["createRef"])(this.state.marker));

    _defineProperty(this, "toggleDraggable", () => {
      this.setState({
        draggable: !this.state.draggable
      });
    });

    _defineProperty(this, "updateMarker", e => {
      // const marker = e.marker;
      this.setState({
        marker: e.marker.getLatLng()
      });
      console.log(e.marker.getLatLng());
    });

    _defineProperty(this, "updatePosition", () => {
      const marker = this.refmarker.current;

      if (marker != null) {
        this.setState({
          marker: marker.leafletElement.getLatLng()
        });
      }

      console.log(marker.leafletElement.getLatLng());
    });
  }

  render() {
    const position = [this.state.center.lat, this.state.center.lng];
    const markerPosition = [this.state.marker.lat, this.state.marker.lng];
    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
      className: "jsx-1045330311" + " " + "map-root",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(react_leaflet__WEBPACK_IMPORTED_MODULE_3__["MapContainer"], {
        zoom: this.state.zoom,
        maxZoom: 15,
        minZoom: 3,
        center: position,
        style: {
          height: "700px"
        },
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(react_leaflet__WEBPACK_IMPORTED_MODULE_3__["TileLayer"], {
          attribution: "\xA9<a href=\"http://jawg.io\" title=\"Tiles Courtesy of Jawg Maps\" target=\"_blank\"> <b>Jawg</b>Maps</a> \xA9 <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
          url: "https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=o1RJMTA22fWIFHfZp6ZqGTO0XNGLh2KK1JCrWzHTBJr22tEtFqIRHihtI7of0lEc"
        })
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a, {
        id: "1045330311",
        children: [".map-root.jsx-1045330311{height:100%;}", ".leaflet-container.jsx-1045330311{height:400px !important;width:80%;margin:0 auto;}"]
      })]
    });
  }

}

/***/ })

};;