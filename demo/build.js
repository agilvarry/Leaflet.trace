/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@turf/bbox/dist/js/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@turf/bbox/dist/js/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var meta_1 = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/js/index.js");
/**
 * Takes a set of features, calculates the bbox of all input features, and returns a bounding box.
 *
 * @name bbox
 * @param {GeoJSON} geojson any GeoJSON object
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
 * var bbox = turf.bbox(line);
 * var bboxPolygon = turf.bboxPolygon(bbox);
 *
 * //addToMap
 * var addToMap = [line, bboxPolygon]
 */
function bbox(geojson) {
    var result = [Infinity, Infinity, -Infinity, -Infinity];
    meta_1.coordEach(geojson, function (coord) {
        if (result[0] > coord[0]) {
            result[0] = coord[0];
        }
        if (result[1] > coord[1]) {
            result[1] = coord[1];
        }
        if (result[2] < coord[0]) {
            result[2] = coord[0];
        }
        if (result[3] < coord[1]) {
            result[3] = coord[1];
        }
    });
    return result;
}
bbox["default"] = bbox;
exports["default"] = bbox;


/***/ }),

/***/ "./node_modules/@turf/helpers/dist/js/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@turf/helpers/dist/js/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * @module helpers
 */
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 *
 * @memberof helpers
 * @type {number}
 */
exports.earthRadius = 6371008.8;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.factors = {
    centimeters: exports.earthRadius * 100,
    centimetres: exports.earthRadius * 100,
    degrees: exports.earthRadius / 111325,
    feet: exports.earthRadius * 3.28084,
    inches: exports.earthRadius * 39.37,
    kilometers: exports.earthRadius / 1000,
    kilometres: exports.earthRadius / 1000,
    meters: exports.earthRadius,
    metres: exports.earthRadius,
    miles: exports.earthRadius / 1609.344,
    millimeters: exports.earthRadius * 1000,
    millimetres: exports.earthRadius * 1000,
    nauticalmiles: exports.earthRadius / 1852,
    radians: 1,
    yards: exports.earthRadius * 1.0936,
};
/**
 * Units of measurement factors based on 1 meter.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.unitsFactors = {
    centimeters: 100,
    centimetres: 100,
    degrees: 1 / 111325,
    feet: 3.28084,
    inches: 39.37,
    kilometers: 1 / 1000,
    kilometres: 1 / 1000,
    meters: 1,
    metres: 1,
    miles: 1 / 1609.344,
    millimeters: 1000,
    millimetres: 1000,
    nauticalmiles: 1 / 1852,
    radians: 1 / exports.earthRadius,
    yards: 1.0936133,
};
/**
 * Area of measurement factors based on 1 square meter.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.areaFactors = {
    acres: 0.000247105,
    centimeters: 10000,
    centimetres: 10000,
    feet: 10.763910417,
    hectares: 0.0001,
    inches: 1550.003100006,
    kilometers: 0.000001,
    kilometres: 0.000001,
    meters: 1,
    metres: 1,
    miles: 3.86e-7,
    millimeters: 1000000,
    millimetres: 1000000,
    yards: 1.195990046,
};
/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geom, properties, options) {
    if (options === void 0) { options = {}; }
    var feat = { type: "Feature" };
    if (options.id === 0 || options.id) {
        feat.id = options.id;
    }
    if (options.bbox) {
        feat.bbox = options.bbox;
    }
    feat.properties = properties || {};
    feat.geometry = geom;
    return feat;
}
exports.feature = feature;
/**
 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
 * For GeometryCollection type use `helpers.geometryCollection`
 *
 * @name geometry
 * @param {string} type Geometry Type
 * @param {Array<any>} coordinates Coordinates
 * @param {Object} [options={}] Optional Parameters
 * @returns {Geometry} a GeoJSON Geometry
 * @example
 * var type = "Point";
 * var coordinates = [110, 50];
 * var geometry = turf.geometry(type, coordinates);
 * // => geometry
 */
function geometry(type, coordinates, _options) {
    if (_options === void 0) { _options = {}; }
    switch (type) {
        case "Point":
            return point(coordinates).geometry;
        case "LineString":
            return lineString(coordinates).geometry;
        case "Polygon":
            return polygon(coordinates).geometry;
        case "MultiPoint":
            return multiPoint(coordinates).geometry;
        case "MultiLineString":
            return multiLineString(coordinates).geometry;
        case "MultiPolygon":
            return multiPolygon(coordinates).geometry;
        default:
            throw new Error(type + " is invalid");
    }
}
exports.geometry = geometry;
/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (!coordinates) {
        throw new Error("coordinates is required");
    }
    if (!Array.isArray(coordinates)) {
        throw new Error("coordinates must be an Array");
    }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be at least 2 numbers long");
    }
    if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) {
        throw new Error("coordinates must contain numbers");
    }
    var geom = {
        type: "Point",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.point = point;
/**
 * Creates a {@link Point} {@link FeatureCollection} from an Array of Point coordinates.
 *
 * @name points
 * @param {Array<Array<number>>} coordinates an array of Points
 * @param {Object} [properties={}] Translate these properties to each Feature
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Point>} Point Feature
 * @example
 * var points = turf.points([
 *   [-75, 39],
 *   [-80, 45],
 *   [-78, 50]
 * ]);
 *
 * //=points
 */
function points(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return point(coords, properties);
    }), options);
}
exports.points = points;
/**
 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
function polygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
        var ring = coordinates_1[_i];
        if (ring.length < 4) {
            throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error("First and last Position are not equivalent.");
            }
        }
    }
    var geom = {
        type: "Polygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.polygon = polygon;
/**
 * Creates a {@link Polygon} {@link FeatureCollection} from an Array of Polygon coordinates.
 *
 * @name polygons
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygon coordinates
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Polygon>} Polygon FeatureCollection
 * @example
 * var polygons = turf.polygons([
 *   [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
 *   [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
 * ]);
 *
 * //=polygons
 */
function polygons(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return polygon(coords, properties);
    }), options);
}
exports.polygons = polygons;
/**
 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
function lineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be an array of two or more positions");
    }
    var geom = {
        type: "LineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.lineString = lineString;
/**
 * Creates a {@link LineString} {@link FeatureCollection} from an Array of LineString coordinates.
 *
 * @name lineStrings
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<LineString>} LineString FeatureCollection
 * @example
 * var linestrings = turf.lineStrings([
 *   [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
 *   [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
 * ]);
 *
 * //=linestrings
 */
function lineStrings(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return lineString(coords, properties);
    }), options);
}
exports.lineStrings = lineStrings;
/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
    if (options === void 0) { options = {}; }
    var fc = { type: "FeatureCollection" };
    if (options.id) {
        fc.id = options.id;
    }
    if (options.bbox) {
        fc.bbox = options.bbox;
    }
    fc.features = features;
    return fc;
}
exports.featureCollection = featureCollection;
/**
 * Creates a {@link Feature<MultiLineString>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiLineString
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 */
function multiLineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiLineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiLineString = multiLineString;
/**
 * Creates a {@link Feature<MultiPoint>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPoint
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 */
function multiPoint(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPoint",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiPoint = multiPoint;
/**
 * Creates a {@link Feature<MultiPolygon>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPolygon
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPolygon>} a multipolygon feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
 *
 * //=multiPoly
 *
 */
function multiPolygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPolygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiPolygon = multiPolygon;
/**
 * Creates a {@link Feature<GeometryCollection>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name geometryCollection
 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = turf.geometry("Point", [100, 0]);
 * var line = turf.geometry("LineString", [[101, 0], [102, 1]]);
 * var collection = turf.geometryCollection([pt, line]);
 *
 * // => collection
 */
function geometryCollection(geometries, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "GeometryCollection",
        geometries: geometries,
    };
    return feature(geom, properties, options);
}
exports.geometryCollection = geometryCollection;
/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * turf.round(120.4321)
 * //=120
 *
 * turf.round(120.4321, 2)
 * //=120.43
 */
function round(num, precision) {
    if (precision === void 0) { precision = 0; }
    if (precision && !(precision >= 0)) {
        throw new Error("precision must be a positive number");
    }
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
}
exports.round = round;
/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = exports.factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return radians * factor;
}
exports.radiansToLength = radiansToLength;
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = exports.factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return distance / factor;
}
exports.lengthToRadians = lengthToRadians;
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
 *
 * @name lengthToDegrees
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} degrees
 */
function lengthToDegrees(distance, units) {
    return radiansToDegrees(lengthToRadians(distance, units));
}
exports.lengthToDegrees = lengthToDegrees;
/**
 * Converts any bearing angle from the north line direction (positive clockwise)
 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
 *
 * @name bearingToAzimuth
 * @param {number} bearing angle, between -180 and +180 degrees
 * @returns {number} angle between 0 and 360 degrees
 */
function bearingToAzimuth(bearing) {
    var angle = bearing % 360;
    if (angle < 0) {
        angle += 360;
    }
    return angle;
}
exports.bearingToAzimuth = bearingToAzimuth;
/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
function radiansToDegrees(radians) {
    var degrees = radians % (2 * Math.PI);
    return (degrees * 180) / Math.PI;
}
exports.radiansToDegrees = radiansToDegrees;
/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degreesToRadians(degrees) {
    var radians = degrees % 360;
    return (radians * Math.PI) / 180;
}
exports.degreesToRadians = degreesToRadians;
/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {Units} [originalUnit="kilometers"] of the length
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted length
 */
function convertLength(length, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "kilometers"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(length >= 0)) {
        throw new Error("length must be a positive number");
    }
    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}
exports.convertLength = convertLength;
/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches, hectares
 * @param {number} area to be converted
 * @param {Units} [originalUnit="meters"] of the distance
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted area
 */
function convertArea(area, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "meters"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(area >= 0)) {
        throw new Error("area must be a positive number");
    }
    var startFactor = exports.areaFactors[originalUnit];
    if (!startFactor) {
        throw new Error("invalid original units");
    }
    var finalFactor = exports.areaFactors[finalUnit];
    if (!finalFactor) {
        throw new Error("invalid final units");
    }
    return (area / startFactor) * finalFactor;
}
exports.convertArea = convertArea;
/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber(num) {
    return !isNaN(num) && num !== null && !Array.isArray(num);
}
exports.isNumber = isNumber;
/**
 * isObject
 *
 * @param {*} input variable to validate
 * @returns {boolean} true/false
 * @example
 * turf.isObject({elevation: 10})
 * //=true
 * turf.isObject('foo')
 * //=false
 */
function isObject(input) {
    return !!input && input.constructor === Object;
}
exports.isObject = isObject;
/**
 * Validate BBox
 *
 * @private
 * @param {Array<number>} bbox BBox to validate
 * @returns {void}
 * @throws Error if BBox is not valid
 * @example
 * validateBBox([-180, -40, 110, 50])
 * //=OK
 * validateBBox([-180, -40])
 * //=Error
 * validateBBox('Foo')
 * //=Error
 * validateBBox(5)
 * //=Error
 * validateBBox(null)
 * //=Error
 * validateBBox(undefined)
 * //=Error
 */
function validateBBox(bbox) {
    if (!bbox) {
        throw new Error("bbox is required");
    }
    if (!Array.isArray(bbox)) {
        throw new Error("bbox must be an Array");
    }
    if (bbox.length !== 4 && bbox.length !== 6) {
        throw new Error("bbox must be an Array of 4 or 6 numbers");
    }
    bbox.forEach(function (num) {
        if (!isNumber(num)) {
            throw new Error("bbox must only contain numbers");
        }
    });
}
exports.validateBBox = validateBBox;
/**
 * Validate Id
 *
 * @private
 * @param {string|number} id Id to validate
 * @returns {void}
 * @throws Error if Id is not valid
 * @example
 * validateId([-180, -40, 110, 50])
 * //=Error
 * validateId([-180, -40])
 * //=Error
 * validateId('Foo')
 * //=OK
 * validateId(5)
 * //=OK
 * validateId(null)
 * //=Error
 * validateId(undefined)
 * //=Error
 */
function validateId(id) {
    if (!id) {
        throw new Error("id is required");
    }
    if (["string", "number"].indexOf(typeof id) === -1) {
        throw new Error("id must be a number or a string");
    }
}
exports.validateId = validateId;


/***/ }),

/***/ "./node_modules/@turf/meta/dist/js/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@turf/meta/dist/js/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var helpers = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/js/index.js");

/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function coordEach(geojson, callback, excludeWrapCoord) {
  // Handles null Geometry -- Skips this GeoJSON
  if (geojson === null) return;
  var j,
    k,
    l,
    geometry,
    stopG,
    coords,
    geometryMaybeCollection,
    wrapShrink = 0,
    coordIndex = 0,
    isGeometryCollection,
    type = geojson.type,
    isFeatureCollection = type === "FeatureCollection",
    isFeature = type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection
      ? geojson.features[featureIndex].geometry
      : isFeature
      ? geojson.geometry
      : geojson;
    isGeometryCollection = geometryMaybeCollection
      ? geometryMaybeCollection.type === "GeometryCollection"
      : false;
    stopG = isGeometryCollection
      ? geometryMaybeCollection.geometries.length
      : 1;

    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry = isGeometryCollection
        ? geometryMaybeCollection.geometries[geomIndex]
        : geometryMaybeCollection;

      // Handles null Geometry -- Skips this geometry
      if (geometry === null) continue;
      coords = geometry.coordinates;
      var geomType = geometry.type;

      wrapShrink =
        excludeWrapCoord &&
        (geomType === "Polygon" || geomType === "MultiPolygon")
          ? 1
          : 0;

      switch (geomType) {
        case null:
          break;
        case "Point":
          if (
            callback(
              coords,
              coordIndex,
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false
          )
            return false;
          coordIndex++;
          multiFeatureIndex++;
          break;
        case "LineString":
        case "MultiPoint":
          for (j = 0; j < coords.length; j++) {
            if (
              callback(
                coords[j],
                coordIndex,
                featureIndex,
                multiFeatureIndex,
                geometryIndex
              ) === false
            )
              return false;
            coordIndex++;
            if (geomType === "MultiPoint") multiFeatureIndex++;
          }
          if (geomType === "LineString") multiFeatureIndex++;
          break;
        case "Polygon":
        case "MultiLineString":
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (
                callback(
                  coords[j][k],
                  coordIndex,
                  featureIndex,
                  multiFeatureIndex,
                  geometryIndex
                ) === false
              )
                return false;
              coordIndex++;
            }
            if (geomType === "MultiLineString") multiFeatureIndex++;
            if (geomType === "Polygon") geometryIndex++;
          }
          if (geomType === "Polygon") multiFeatureIndex++;
          break;
        case "MultiPolygon":
          for (j = 0; j < coords.length; j++) {
            geometryIndex = 0;
            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (
                  callback(
                    coords[j][k][l],
                    coordIndex,
                    featureIndex,
                    multiFeatureIndex,
                    geometryIndex
                  ) === false
                )
                  return false;
                coordIndex++;
              }
              geometryIndex++;
            }
            multiFeatureIndex++;
          }
          break;
        case "GeometryCollection":
          for (j = 0; j < geometry.geometries.length; j++)
            if (
              coordEach(geometry.geometries[j], callback, excludeWrapCoord) ===
              false
            )
              return false;
          break;
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
  }
}

/**
 * Callback for coordReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback coordReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Reduce coordinates in any GeoJSON object, similar to Array.reduce()
 *
 * @name coordReduce
 * @param {FeatureCollection|Geometry|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentCoord, coordIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordReduce(features, function (previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentCoord;
 * });
 */
function coordReduce(geojson, callback, initialValue, excludeWrapCoord) {
  var previousValue = initialValue;
  coordEach(
    geojson,
    function (
      currentCoord,
      coordIndex,
      featureIndex,
      multiFeatureIndex,
      geometryIndex
    ) {
      if (coordIndex === 0 && initialValue === undefined)
        previousValue = currentCoord;
      else
        previousValue = callback(
          previousValue,
          currentCoord,
          coordIndex,
          featureIndex,
          multiFeatureIndex,
          geometryIndex
        );
    },
    excludeWrapCoord
  );
  return previousValue;
}

/**
 * Callback for propEach
 *
 * @callback propEachCallback
 * @param {Object} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over properties in any GeoJSON object, similar to Array.forEach()
 *
 * @name propEach
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentProperties, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propEach(features, function (currentProperties, featureIndex) {
 *   //=currentProperties
 *   //=featureIndex
 * });
 */
function propEach(geojson, callback) {
  var i;
  switch (geojson.type) {
    case "FeatureCollection":
      for (i = 0; i < geojson.features.length; i++) {
        if (callback(geojson.features[i].properties, i) === false) break;
      }
      break;
    case "Feature":
      callback(geojson.properties, 0);
      break;
  }
}

/**
 * Callback for propReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback propReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {*} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce properties in any GeoJSON object into a single value,
 * similar to how Array.reduce works. However, in this case we lazily run
 * the reduction, so an array of all properties is unnecessary.
 *
 * @name propReduce
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentProperties, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propReduce(features, function (previousValue, currentProperties, featureIndex) {
 *   //=previousValue
 *   //=currentProperties
 *   //=featureIndex
 *   return currentProperties
 * });
 */
function propReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  propEach(geojson, function (currentProperties, featureIndex) {
    if (featureIndex === 0 && initialValue === undefined)
      previousValue = currentProperties;
    else
      previousValue = callback(previousValue, currentProperties, featureIndex);
  });
  return previousValue;
}

/**
 * Callback for featureEach
 *
 * @callback featureEachCallback
 * @param {Feature<any>} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name featureEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.featureEach(features, function (currentFeature, featureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 * });
 */
function featureEach(geojson, callback) {
  if (geojson.type === "Feature") {
    callback(geojson, 0);
  } else if (geojson.type === "FeatureCollection") {
    for (var i = 0; i < geojson.features.length; i++) {
      if (callback(geojson.features[i], i) === false) break;
    }
  }
}

/**
 * Callback for featureReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback featureReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name featureReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.featureReduce(features, function (previousValue, currentFeature, featureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   return currentFeature
 * });
 */
function featureReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  featureEach(geojson, function (currentFeature, featureIndex) {
    if (featureIndex === 0 && initialValue === undefined)
      previousValue = currentFeature;
    else previousValue = callback(previousValue, currentFeature, featureIndex);
  });
  return previousValue;
}

/**
 * Get all coordinates from any GeoJSON object.
 *
 * @name coordAll
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @returns {Array<Array<number>>} coordinate position array
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * var coords = turf.coordAll(features);
 * //= [[26, 37], [36, 53]]
 */
function coordAll(geojson) {
  var coords = [];
  coordEach(geojson, function (coord) {
    coords.push(coord);
  });
  return coords;
}

/**
 * Callback for geomEach
 *
 * @callback geomEachCallback
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
 *
 * @name geomEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomEach(features, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 * });
 */
function geomEach(geojson, callback) {
  var i,
    j,
    g,
    geometry,
    stopG,
    geometryMaybeCollection,
    isGeometryCollection,
    featureProperties,
    featureBBox,
    featureId,
    featureIndex = 0,
    isFeatureCollection = geojson.type === "FeatureCollection",
    isFeature = geojson.type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (i = 0; i < stop; i++) {
    geometryMaybeCollection = isFeatureCollection
      ? geojson.features[i].geometry
      : isFeature
      ? geojson.geometry
      : geojson;
    featureProperties = isFeatureCollection
      ? geojson.features[i].properties
      : isFeature
      ? geojson.properties
      : {};
    featureBBox = isFeatureCollection
      ? geojson.features[i].bbox
      : isFeature
      ? geojson.bbox
      : undefined;
    featureId = isFeatureCollection
      ? geojson.features[i].id
      : isFeature
      ? geojson.id
      : undefined;
    isGeometryCollection = geometryMaybeCollection
      ? geometryMaybeCollection.type === "GeometryCollection"
      : false;
    stopG = isGeometryCollection
      ? geometryMaybeCollection.geometries.length
      : 1;

    for (g = 0; g < stopG; g++) {
      geometry = isGeometryCollection
        ? geometryMaybeCollection.geometries[g]
        : geometryMaybeCollection;

      // Handle null Geometry
      if (geometry === null) {
        if (
          callback(
            null,
            featureIndex,
            featureProperties,
            featureBBox,
            featureId
          ) === false
        )
          return false;
        continue;
      }
      switch (geometry.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon": {
          if (
            callback(
              geometry,
              featureIndex,
              featureProperties,
              featureBBox,
              featureId
            ) === false
          )
            return false;
          break;
        }
        case "GeometryCollection": {
          for (j = 0; j < geometry.geometries.length; j++) {
            if (
              callback(
                geometry.geometries[j],
                featureIndex,
                featureProperties,
                featureBBox,
                featureId
              ) === false
            )
              return false;
          }
          break;
        }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    // Only increase `featureIndex` per each feature
    featureIndex++;
  }
}

/**
 * Callback for geomReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback geomReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Reduce geometry in any GeoJSON object, similar to Array.reduce().
 *
 * @name geomReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomReduce(features, function (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=previousValue
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 *   return currentGeometry
 * });
 */
function geomReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  geomEach(
    geojson,
    function (
      currentGeometry,
      featureIndex,
      featureProperties,
      featureBBox,
      featureId
    ) {
      if (featureIndex === 0 && initialValue === undefined)
        previousValue = currentGeometry;
      else
        previousValue = callback(
          previousValue,
          currentGeometry,
          featureIndex,
          featureProperties,
          featureBBox,
          featureId
        );
    }
  );
  return previousValue;
}

/**
 * Callback for flattenEach
 *
 * @callback flattenEachCallback
 * @param {Feature} currentFeature The current flattened feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Iterate over flattened features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name flattenEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex, multiFeatureIndex)
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenEach(features, function (currentFeature, featureIndex, multiFeatureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 * });
 */
function flattenEach(geojson, callback) {
  geomEach(geojson, function (geometry, featureIndex, properties, bbox, id) {
    // Callback for single geometry
    var type = geometry === null ? null : geometry.type;
    switch (type) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        if (
          callback(
            helpers.feature(geometry, properties, { bbox: bbox, id: id }),
            featureIndex,
            0
          ) === false
        )
          return false;
        return;
    }

    var geomType;

    // Callback for multi-geometry
    switch (type) {
      case "MultiPoint":
        geomType = "Point";
        break;
      case "MultiLineString":
        geomType = "LineString";
        break;
      case "MultiPolygon":
        geomType = "Polygon";
        break;
    }

    for (
      var multiFeatureIndex = 0;
      multiFeatureIndex < geometry.coordinates.length;
      multiFeatureIndex++
    ) {
      var coordinate = geometry.coordinates[multiFeatureIndex];
      var geom = {
        type: geomType,
        coordinates: coordinate,
      };
      if (
        callback(helpers.feature(geom, properties), featureIndex, multiFeatureIndex) ===
        false
      )
        return false;
    }
  });
}

/**
 * Callback for flattenReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback flattenReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Reduce flattened features in any GeoJSON object, similar to Array.reduce().
 *
 * @name flattenReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex, multiFeatureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenReduce(features, function (previousValue, currentFeature, featureIndex, multiFeatureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   return currentFeature
 * });
 */
function flattenReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  flattenEach(
    geojson,
    function (currentFeature, featureIndex, multiFeatureIndex) {
      if (
        featureIndex === 0 &&
        multiFeatureIndex === 0 &&
        initialValue === undefined
      )
        previousValue = currentFeature;
      else
        previousValue = callback(
          previousValue,
          currentFeature,
          featureIndex,
          multiFeatureIndex
        );
    }
  );
  return previousValue;
}

/**
 * Callback for segmentEach
 *
 * @callback segmentEachCallback
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 * @returns {void}
 */

/**
 * Iterate over 2-vertex line segment in any GeoJSON object, similar to Array.forEach()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex)
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentEach(polygon, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //=currentSegment
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   //=segmentIndex
 * });
 *
 * // Calculate the total number of segments
 * var total = 0;
 * turf.segmentEach(polygon, function () {
 *     total++;
 * });
 */
function segmentEach(geojson, callback) {
  flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
    var segmentIndex = 0;

    // Exclude null Geometries
    if (!feature.geometry) return;
    // (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
    var type = feature.geometry.type;
    if (type === "Point" || type === "MultiPoint") return;

    // Generate 2-vertex line segments
    var previousCoords;
    var previousFeatureIndex = 0;
    var previousMultiIndex = 0;
    var prevGeomIndex = 0;
    if (
      coordEach(
        feature,
        function (
          currentCoord,
          coordIndex,
          featureIndexCoord,
          multiPartIndexCoord,
          geometryIndex
        ) {
          // Simulating a meta.coordReduce() since `reduce` operations cannot be stopped by returning `false`
          if (
            previousCoords === undefined ||
            featureIndex > previousFeatureIndex ||
            multiPartIndexCoord > previousMultiIndex ||
            geometryIndex > prevGeomIndex
          ) {
            previousCoords = currentCoord;
            previousFeatureIndex = featureIndex;
            previousMultiIndex = multiPartIndexCoord;
            prevGeomIndex = geometryIndex;
            segmentIndex = 0;
            return;
          }
          var currentSegment = helpers.lineString(
            [previousCoords, currentCoord],
            feature.properties
          );
          if (
            callback(
              currentSegment,
              featureIndex,
              multiFeatureIndex,
              geometryIndex,
              segmentIndex
            ) === false
          )
            return false;
          segmentIndex++;
          previousCoords = currentCoord;
        }
      ) === false
    )
      return false;
  });
}

/**
 * Callback for segmentReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback segmentReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 */

/**
 * Reduce 2-vertex line segment in any GeoJSON object, similar to Array.reduce()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (previousValue, currentSegment, currentIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentReduce(polygon, function (previousSegment, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //= previousSegment
 *   //= currentSegment
 *   //= featureIndex
 *   //= multiFeatureIndex
 *   //= geometryIndex
 *   //= segmentIndex
 *   return currentSegment
 * });
 *
 * // Calculate the total number of segments
 * var initialValue = 0
 * var total = turf.segmentReduce(polygon, function (previousValue) {
 *     previousValue++;
 *     return previousValue;
 * }, initialValue);
 */
function segmentReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  var started = false;
  segmentEach(
    geojson,
    function (
      currentSegment,
      featureIndex,
      multiFeatureIndex,
      geometryIndex,
      segmentIndex
    ) {
      if (started === false && initialValue === undefined)
        previousValue = currentSegment;
      else
        previousValue = callback(
          previousValue,
          currentSegment,
          featureIndex,
          multiFeatureIndex,
          geometryIndex,
          segmentIndex
        );
      started = true;
    }
  );
  return previousValue;
}

/**
 * Callback for lineEach
 *
 * @callback lineEachCallback
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Iterate over line or ring coordinates in LineString, Polygon, MultiLineString, MultiPolygon Features or Geometries,
 * similar to Array.forEach.
 *
 * @name lineEach
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @example
 * var multiLine = turf.multiLineString([
 *   [[26, 37], [35, 45]],
 *   [[36, 53], [38, 50], [41, 55]]
 * ]);
 *
 * turf.lineEach(multiLine, function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function lineEach(geojson, callback) {
  // validation
  if (!geojson) throw new Error("geojson is required");

  flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
    if (feature.geometry === null) return;
    var type = feature.geometry.type;
    var coords = feature.geometry.coordinates;
    switch (type) {
      case "LineString":
        if (callback(feature, featureIndex, multiFeatureIndex, 0, 0) === false)
          return false;
        break;
      case "Polygon":
        for (
          var geometryIndex = 0;
          geometryIndex < coords.length;
          geometryIndex++
        ) {
          if (
            callback(
              helpers.lineString(coords[geometryIndex], feature.properties),
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false
          )
            return false;
        }
        break;
    }
  });
}

/**
 * Callback for lineReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback lineReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed.
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name lineReduce
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var multiPoly = turf.multiPolygon([
 *   turf.polygon([[[12,48],[2,41],[24,38],[12,48]], [[9,44],[13,41],[13,45],[9,44]]]),
 *   turf.polygon([[[5, 5], [0, 0], [2, 2], [4, 4], [5, 5]]])
 * ]);
 *
 * turf.lineReduce(multiPoly, function (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentLine
 * });
 */
function lineReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  lineEach(
    geojson,
    function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
      if (featureIndex === 0 && initialValue === undefined)
        previousValue = currentLine;
      else
        previousValue = callback(
          previousValue,
          currentLine,
          featureIndex,
          multiFeatureIndex,
          geometryIndex
        );
    }
  );
  return previousValue;
}

/**
 * Finds a particular 2-vertex LineString Segment from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 * Point & MultiPoint will always return null.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.segmentIndex=0] Segment Index
 * @param {Object} [options.properties={}] Translate Properties to output LineString
 * @param {BBox} [options.bbox={}] Translate BBox to output LineString
 * @param {number|string} [options.id={}] Translate Id to output LineString
 * @returns {Feature<LineString>} 2-vertex GeoJSON Feature LineString
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findSegment(multiLine);
 * // => Feature<LineString<[[10, 10], [50, 30]]>>
 *
 * // First Segment of 2nd Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: 1});
 * // => Feature<LineString<[[-10, -10], [-50, -30]]>>
 *
 * // Last Segment of Last Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: -1, segmentIndex: -1});
 * // => Feature<LineString<[[-50, -30], [-30, -40]]>>
 */
function findSegment(geojson, options) {
  // Optional Parameters
  options = options || {};
  if (!helpers.isObject(options)) throw new Error("options is invalid");
  var featureIndex = options.featureIndex || 0;
  var multiFeatureIndex = options.multiFeatureIndex || 0;
  var geometryIndex = options.geometryIndex || 0;
  var segmentIndex = options.segmentIndex || 0;

  // Find FeatureIndex
  var properties = options.properties;
  var geometry;

  switch (geojson.type) {
    case "FeatureCollection":
      if (featureIndex < 0)
        featureIndex = geojson.features.length + featureIndex;
      properties = properties || geojson.features[featureIndex].properties;
      geometry = geojson.features[featureIndex].geometry;
      break;
    case "Feature":
      properties = properties || geojson.properties;
      geometry = geojson.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      geometry = geojson;
      break;
    default:
      throw new Error("geojson is invalid");
  }

  // Find SegmentIndex
  if (geometry === null) return null;
  var coords = geometry.coordinates;
  switch (geometry.type) {
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
      if (segmentIndex < 0) segmentIndex = coords.length + segmentIndex - 1;
      return helpers.lineString(
        [coords[segmentIndex], coords[segmentIndex + 1]],
        properties,
        options
      );
    case "Polygon":
      if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
      if (segmentIndex < 0)
        segmentIndex = coords[geometryIndex].length + segmentIndex - 1;
      return helpers.lineString(
        [
          coords[geometryIndex][segmentIndex],
          coords[geometryIndex][segmentIndex + 1],
        ],
        properties,
        options
      );
    case "MultiLineString":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (segmentIndex < 0)
        segmentIndex = coords[multiFeatureIndex].length + segmentIndex - 1;
      return helpers.lineString(
        [
          coords[multiFeatureIndex][segmentIndex],
          coords[multiFeatureIndex][segmentIndex + 1],
        ],
        properties,
        options
      );
    case "MultiPolygon":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (geometryIndex < 0)
        geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
      if (segmentIndex < 0)
        segmentIndex =
          coords[multiFeatureIndex][geometryIndex].length - segmentIndex - 1;
      return helpers.lineString(
        [
          coords[multiFeatureIndex][geometryIndex][segmentIndex],
          coords[multiFeatureIndex][geometryIndex][segmentIndex + 1],
        ],
        properties,
        options
      );
  }
  throw new Error("geojson is invalid");
}

/**
 * Finds a particular Point from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.coordIndex=0] Coord Index
 * @param {Object} [options.properties={}] Translate Properties to output Point
 * @param {BBox} [options.bbox={}] Translate BBox to output Point
 * @param {number|string} [options.id={}] Translate Id to output Point
 * @returns {Feature<Point>} 2-vertex GeoJSON Feature Point
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findPoint(multiLine);
 * // => Feature<Point<[10, 10]>>
 *
 * // First Segment of the 2nd Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: 1});
 * // => Feature<Point<[-10, -10]>>
 *
 * // Last Segment of last Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: -1, coordIndex: -1});
 * // => Feature<Point<[-30, -40]>>
 */
function findPoint(geojson, options) {
  // Optional Parameters
  options = options || {};
  if (!helpers.isObject(options)) throw new Error("options is invalid");
  var featureIndex = options.featureIndex || 0;
  var multiFeatureIndex = options.multiFeatureIndex || 0;
  var geometryIndex = options.geometryIndex || 0;
  var coordIndex = options.coordIndex || 0;

  // Find FeatureIndex
  var properties = options.properties;
  var geometry;

  switch (geojson.type) {
    case "FeatureCollection":
      if (featureIndex < 0)
        featureIndex = geojson.features.length + featureIndex;
      properties = properties || geojson.features[featureIndex].properties;
      geometry = geojson.features[featureIndex].geometry;
      break;
    case "Feature":
      properties = properties || geojson.properties;
      geometry = geojson.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      geometry = geojson;
      break;
    default:
      throw new Error("geojson is invalid");
  }

  // Find Coord Index
  if (geometry === null) return null;
  var coords = geometry.coordinates;
  switch (geometry.type) {
    case "Point":
      return helpers.point(coords, properties, options);
    case "MultiPoint":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      return helpers.point(coords[multiFeatureIndex], properties, options);
    case "LineString":
      if (coordIndex < 0) coordIndex = coords.length + coordIndex;
      return helpers.point(coords[coordIndex], properties, options);
    case "Polygon":
      if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
      if (coordIndex < 0)
        coordIndex = coords[geometryIndex].length + coordIndex;
      return helpers.point(coords[geometryIndex][coordIndex], properties, options);
    case "MultiLineString":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (coordIndex < 0)
        coordIndex = coords[multiFeatureIndex].length + coordIndex;
      return helpers.point(coords[multiFeatureIndex][coordIndex], properties, options);
    case "MultiPolygon":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (geometryIndex < 0)
        geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
      if (coordIndex < 0)
        coordIndex =
          coords[multiFeatureIndex][geometryIndex].length - coordIndex;
      return helpers.point(
        coords[multiFeatureIndex][geometryIndex][coordIndex],
        properties,
        options
      );
  }
  throw new Error("geojson is invalid");
}

exports.coordAll = coordAll;
exports.coordEach = coordEach;
exports.coordReduce = coordReduce;
exports.featureEach = featureEach;
exports.featureReduce = featureReduce;
exports.findPoint = findPoint;
exports.findSegment = findSegment;
exports.flattenEach = flattenEach;
exports.flattenReduce = flattenReduce;
exports.geomEach = geomEach;
exports.geomReduce = geomReduce;
exports.lineEach = lineEach;
exports.lineReduce = lineReduce;
exports.propEach = propEach;
exports.propReduce = propReduce;
exports.segmentEach = segmentEach;
exports.segmentReduce = segmentReduce;


/***/ }),

/***/ "./node_modules/geojson-rbush/index.js":
/*!*********************************************!*\
  !*** ./node_modules/geojson-rbush/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rbush = __webpack_require__(/*! rbush */ "./node_modules/rbush/rbush.min.js");
var helpers = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/js/index.js");
var meta = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/js/index.js");
var turfBBox = (__webpack_require__(/*! @turf/bbox */ "./node_modules/@turf/bbox/dist/js/index.js")["default"]);
var featureEach = meta.featureEach;
var coordEach = meta.coordEach;
var polygon = helpers.polygon;
var featureCollection = helpers.featureCollection;

/**
 * GeoJSON implementation of [RBush](https://github.com/mourner/rbush#rbush) spatial index.
 *
 * @name rbush
 * @param {number} [maxEntries=9] defines the maximum number of entries in a tree node. 9 (used by default) is a
 * reasonable choice for most applications. Higher value means faster insertion and slower search, and vice versa.
 * @returns {RBush} GeoJSON RBush
 * @example
 * var geojsonRbush = require('geojson-rbush').default;
 * var tree = geojsonRbush();
 */
function geojsonRbush(maxEntries) {
    var tree = new rbush(maxEntries);
    /**
     * [insert](https://github.com/mourner/rbush#data-format)
     *
     * @param {Feature} feature insert single GeoJSON Feature
     * @returns {RBush} GeoJSON RBush
     * @example
     * var poly = turf.polygon([[[-78, 41], [-67, 41], [-67, 48], [-78, 48], [-78, 41]]]);
     * tree.insert(poly)
     */
    tree.insert = function (feature) {
        if (feature.type !== 'Feature') throw new Error('invalid feature');
        feature.bbox = feature.bbox ? feature.bbox : turfBBox(feature);
        return rbush.prototype.insert.call(this, feature);
    };

    /**
     * [load](https://github.com/mourner/rbush#bulk-inserting-data)
     *
     * @param {FeatureCollection|Array<Feature>} features load entire GeoJSON FeatureCollection
     * @returns {RBush} GeoJSON RBush
     * @example
     * var polys = turf.polygons([
     *     [[[-78, 41], [-67, 41], [-67, 48], [-78, 48], [-78, 41]]],
     *     [[[-93, 32], [-83, 32], [-83, 39], [-93, 39], [-93, 32]]]
     * ]);
     * tree.load(polys);
     */
    tree.load = function (features) {
        var load = [];
        // Load an Array of Features
        if (Array.isArray(features)) {
            features.forEach(function (feature) {
                if (feature.type !== 'Feature') throw new Error('invalid features');
                feature.bbox = feature.bbox ? feature.bbox : turfBBox(feature);
                load.push(feature);
            });
        } else {
            // Load a FeatureCollection
            featureEach(features, function (feature) {
                if (feature.type !== 'Feature') throw new Error('invalid features');
                feature.bbox = feature.bbox ? feature.bbox : turfBBox(feature);
                load.push(feature);
            });
        }
        return rbush.prototype.load.call(this, load);
    };

    /**
     * [remove](https://github.com/mourner/rbush#removing-data)
     *
     * @param {Feature} feature remove single GeoJSON Feature
     * @param {Function} equals Pass a custom equals function to compare by value for removal.
     * @returns {RBush} GeoJSON RBush
     * @example
     * var poly = turf.polygon([[[-78, 41], [-67, 41], [-67, 48], [-78, 48], [-78, 41]]]);
     *
     * tree.remove(poly);
     */
    tree.remove = function (feature, equals) {
        if (feature.type !== 'Feature') throw new Error('invalid feature');
        feature.bbox = feature.bbox ? feature.bbox : turfBBox(feature);
        return rbush.prototype.remove.call(this, feature, equals);
    };

    /**
     * [clear](https://github.com/mourner/rbush#removing-data)
     *
     * @returns {RBush} GeoJSON Rbush
     * @example
     * tree.clear()
     */
    tree.clear = function () {
        return rbush.prototype.clear.call(this);
    };

    /**
     * [search](https://github.com/mourner/rbush#search)
     *
     * @param {BBox|FeatureCollection|Feature} geojson search with GeoJSON
     * @returns {FeatureCollection} all features that intersects with the given GeoJSON.
     * @example
     * var poly = turf.polygon([[[-78, 41], [-67, 41], [-67, 48], [-78, 48], [-78, 41]]]);
     *
     * tree.search(poly);
     */
    tree.search = function (geojson) {
        var features = rbush.prototype.search.call(this, this.toBBox(geojson));
        return featureCollection(features);
    };

    /**
     * [collides](https://github.com/mourner/rbush#collisions)
     *
     * @param {BBox|FeatureCollection|Feature} geojson collides with GeoJSON
     * @returns {boolean} true if there are any items intersecting the given GeoJSON, otherwise false.
     * @example
     * var poly = turf.polygon([[[-78, 41], [-67, 41], [-67, 48], [-78, 48], [-78, 41]]]);
     *
     * tree.collides(poly);
     */
    tree.collides = function (geojson) {
        return rbush.prototype.collides.call(this, this.toBBox(geojson));
    };

    /**
     * [all](https://github.com/mourner/rbush#search)
     *
     * @returns {FeatureCollection} all the features in RBush
     * @example
     * tree.all()
     */
    tree.all = function () {
        var features = rbush.prototype.all.call(this);
        return featureCollection(features);
    };

    /**
     * [toJSON](https://github.com/mourner/rbush#export-and-import)
     *
     * @returns {any} export data as JSON object
     * @example
     * var exported = tree.toJSON()
     */
    tree.toJSON = function () {
        return rbush.prototype.toJSON.call(this);
    };

    /**
     * [fromJSON](https://github.com/mourner/rbush#export-and-import)
     *
     * @param {any} json import previously exported data
     * @returns {RBush} GeoJSON RBush
     * @example
     * var exported = {
     *   "children": [
     *     {
     *       "type": "Feature",
     *       "geometry": {
     *         "type": "Point",
     *         "coordinates": [110, 50]
     *       },
     *       "properties": {},
     *       "bbox": [110, 50, 110, 50]
     *     }
     *   ],
     *   "height": 1,
     *   "leaf": true,
     *   "minX": 110,
     *   "minY": 50,
     *   "maxX": 110,
     *   "maxY": 50
     * }
     * tree.fromJSON(exported)
     */
    tree.fromJSON = function (json) {
        return rbush.prototype.fromJSON.call(this, json);
    };

    /**
     * Converts GeoJSON to {minX, minY, maxX, maxY} schema
     *
     * @private
     * @param {BBox|FeatureCollection|Feature} geojson feature(s) to retrieve BBox from
     * @returns {Object} converted to {minX, minY, maxX, maxY}
     */
    tree.toBBox = function (geojson) {
        var bbox;
        if (geojson.bbox) bbox = geojson.bbox;
        else if (Array.isArray(geojson) && geojson.length === 4) bbox = geojson;
        else if (Array.isArray(geojson) && geojson.length === 6) bbox = [geojson[0], geojson[1], geojson[3], geojson[4]];
        else if (geojson.type === 'Feature') bbox = turfBBox(geojson);
        else if (geojson.type === 'FeatureCollection') bbox = turfBBox(geojson);
        else throw new Error('invalid geojson')

        return {
            minX: bbox[0],
            minY: bbox[1],
            maxX: bbox[2],
            maxY: bbox[3]
        };
    };
    return tree;
}

module.exports = geojsonRbush;
module.exports["default"] = geojsonRbush;


/***/ }),

/***/ "./node_modules/rbush/rbush.min.js":
/*!*****************************************!*\
  !*** ./node_modules/rbush/rbush.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function(t,i){ true?module.exports=i():0}(this,function(){"use strict";function t(t,r,e,a,h){!function t(n,r,e,a,h){for(;a>e;){if(a-e>600){var o=a-e+1,s=r-e+1,l=Math.log(o),f=.5*Math.exp(2*l/3),u=.5*Math.sqrt(l*f*(o-f)/o)*(s-o/2<0?-1:1),m=Math.max(e,Math.floor(r-s*f/o+u)),c=Math.min(a,Math.floor(r+(o-s)*f/o+u));t(n,r,m,c,h)}var p=n[r],d=e,x=a;for(i(n,e,r),h(n[a],p)>0&&i(n,e,a);d<x;){for(i(n,d,x),d++,x--;h(n[d],p)<0;)d++;for(;h(n[x],p)>0;)x--}0===h(n[e],p)?i(n,e,x):i(n,++x,a),x<=r&&(e=x+1),r<=x&&(a=x-1)}}(t,r,e||0,a||t.length-1,h||n)}function i(t,i,n){var r=t[i];t[i]=t[n],t[n]=r}function n(t,i){return t<i?-1:t>i?1:0}var r=function(t){void 0===t&&(t=9),this._maxEntries=Math.max(4,t),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),this.clear()};function e(t,i,n){if(!n)return i.indexOf(t);for(var r=0;r<i.length;r++)if(n(t,i[r]))return r;return-1}function a(t,i){h(t,0,t.children.length,i,t)}function h(t,i,n,r,e){e||(e=p(null)),e.minX=1/0,e.minY=1/0,e.maxX=-1/0,e.maxY=-1/0;for(var a=i;a<n;a++){var h=t.children[a];o(e,t.leaf?r(h):h)}return e}function o(t,i){return t.minX=Math.min(t.minX,i.minX),t.minY=Math.min(t.minY,i.minY),t.maxX=Math.max(t.maxX,i.maxX),t.maxY=Math.max(t.maxY,i.maxY),t}function s(t,i){return t.minX-i.minX}function l(t,i){return t.minY-i.minY}function f(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function u(t){return t.maxX-t.minX+(t.maxY-t.minY)}function m(t,i){return t.minX<=i.minX&&t.minY<=i.minY&&i.maxX<=t.maxX&&i.maxY<=t.maxY}function c(t,i){return i.minX<=t.maxX&&i.minY<=t.maxY&&i.maxX>=t.minX&&i.maxY>=t.minY}function p(t){return{children:t,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function d(i,n,r,e,a){for(var h=[n,r];h.length;)if(!((r=h.pop())-(n=h.pop())<=e)){var o=n+Math.ceil((r-n)/e/2)*e;t(i,o,n,r,a),h.push(n,o,o,r)}}return r.prototype.all=function(){return this._all(this.data,[])},r.prototype.search=function(t){var i=this.data,n=[];if(!c(t,i))return n;for(var r=this.toBBox,e=[];i;){for(var a=0;a<i.children.length;a++){var h=i.children[a],o=i.leaf?r(h):h;c(t,o)&&(i.leaf?n.push(h):m(t,o)?this._all(h,n):e.push(h))}i=e.pop()}return n},r.prototype.collides=function(t){var i=this.data;if(!c(t,i))return!1;for(var n=[];i;){for(var r=0;r<i.children.length;r++){var e=i.children[r],a=i.leaf?this.toBBox(e):e;if(c(t,a)){if(i.leaf||m(t,a))return!0;n.push(e)}}i=n.pop()}return!1},r.prototype.load=function(t){if(!t||!t.length)return this;if(t.length<this._minEntries){for(var i=0;i<t.length;i++)this.insert(t[i]);return this}var n=this._build(t.slice(),0,t.length-1,0);if(this.data.children.length)if(this.data.height===n.height)this._splitRoot(this.data,n);else{if(this.data.height<n.height){var r=this.data;this.data=n,n=r}this._insert(n,this.data.height-n.height-1,!0)}else this.data=n;return this},r.prototype.insert=function(t){return t&&this._insert(t,this.data.height-1),this},r.prototype.clear=function(){return this.data=p([]),this},r.prototype.remove=function(t,i){if(!t)return this;for(var n,r,a,h=this.data,o=this.toBBox(t),s=[],l=[];h||s.length;){if(h||(h=s.pop(),r=s[s.length-1],n=l.pop(),a=!0),h.leaf){var f=e(t,h.children,i);if(-1!==f)return h.children.splice(f,1),s.push(h),this._condense(s),this}a||h.leaf||!m(h,o)?r?(n++,h=r.children[n],a=!1):h=null:(s.push(h),l.push(n),n=0,r=h,h=h.children[0])}return this},r.prototype.toBBox=function(t){return t},r.prototype.compareMinX=function(t,i){return t.minX-i.minX},r.prototype.compareMinY=function(t,i){return t.minY-i.minY},r.prototype.toJSON=function(){return this.data},r.prototype.fromJSON=function(t){return this.data=t,this},r.prototype._all=function(t,i){for(var n=[];t;)t.leaf?i.push.apply(i,t.children):n.push.apply(n,t.children),t=n.pop();return i},r.prototype._build=function(t,i,n,r){var e,h=n-i+1,o=this._maxEntries;if(h<=o)return a(e=p(t.slice(i,n+1)),this.toBBox),e;r||(r=Math.ceil(Math.log(h)/Math.log(o)),o=Math.ceil(h/Math.pow(o,r-1))),(e=p([])).leaf=!1,e.height=r;var s=Math.ceil(h/o),l=s*Math.ceil(Math.sqrt(o));d(t,i,n,l,this.compareMinX);for(var f=i;f<=n;f+=l){var u=Math.min(f+l-1,n);d(t,f,u,s,this.compareMinY);for(var m=f;m<=u;m+=s){var c=Math.min(m+s-1,u);e.children.push(this._build(t,m,c,r-1))}}return a(e,this.toBBox),e},r.prototype._chooseSubtree=function(t,i,n,r){for(;r.push(i),!i.leaf&&r.length-1!==n;){for(var e=1/0,a=1/0,h=void 0,o=0;o<i.children.length;o++){var s=i.children[o],l=f(s),u=(m=t,c=s,(Math.max(c.maxX,m.maxX)-Math.min(c.minX,m.minX))*(Math.max(c.maxY,m.maxY)-Math.min(c.minY,m.minY))-l);u<a?(a=u,e=l<e?l:e,h=s):u===a&&l<e&&(e=l,h=s)}i=h||i.children[0]}var m,c;return i},r.prototype._insert=function(t,i,n){var r=n?t:this.toBBox(t),e=[],a=this._chooseSubtree(r,this.data,i,e);for(a.children.push(t),o(a,r);i>=0&&e[i].children.length>this._maxEntries;)this._split(e,i),i--;this._adjustParentBBoxes(r,e,i)},r.prototype._split=function(t,i){var n=t[i],r=n.children.length,e=this._minEntries;this._chooseSplitAxis(n,e,r);var h=this._chooseSplitIndex(n,e,r),o=p(n.children.splice(h,n.children.length-h));o.height=n.height,o.leaf=n.leaf,a(n,this.toBBox),a(o,this.toBBox),i?t[i-1].children.push(o):this._splitRoot(n,o)},r.prototype._splitRoot=function(t,i){this.data=p([t,i]),this.data.height=t.height+1,this.data.leaf=!1,a(this.data,this.toBBox)},r.prototype._chooseSplitIndex=function(t,i,n){for(var r,e,a,o,s,l,u,m=1/0,c=1/0,p=i;p<=n-i;p++){var d=h(t,0,p,this.toBBox),x=h(t,p,n,this.toBBox),v=(e=d,a=x,o=void 0,s=void 0,l=void 0,u=void 0,o=Math.max(e.minX,a.minX),s=Math.max(e.minY,a.minY),l=Math.min(e.maxX,a.maxX),u=Math.min(e.maxY,a.maxY),Math.max(0,l-o)*Math.max(0,u-s)),M=f(d)+f(x);v<m?(m=v,r=p,c=M<c?M:c):v===m&&M<c&&(c=M,r=p)}return r||n-i},r.prototype._chooseSplitAxis=function(t,i,n){var r=t.leaf?this.compareMinX:s,e=t.leaf?this.compareMinY:l;this._allDistMargin(t,i,n,r)<this._allDistMargin(t,i,n,e)&&t.children.sort(r)},r.prototype._allDistMargin=function(t,i,n,r){t.children.sort(r);for(var e=this.toBBox,a=h(t,0,i,e),s=h(t,n-i,n,e),l=u(a)+u(s),f=i;f<n-i;f++){var m=t.children[f];o(a,t.leaf?e(m):m),l+=u(a)}for(var c=n-i-1;c>=i;c--){var p=t.children[c];o(s,t.leaf?e(p):p),l+=u(s)}return l},r.prototype._adjustParentBBoxes=function(t,i,n){for(var r=n;r>=0;r--)o(i[r],t)},r.prototype._condense=function(t){for(var i=t.length-1,n=void 0;i>=0;i--)0===t[i].children.length?i>0?(n=t[i-1].children).splice(n.indexOf(t[i]),1):this.clear():a(t[i],this.toBBox)},r});


/***/ }),

/***/ "./src/icons.js":
/*!**********************!*\
  !*** ./src/icons.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "line": () => (/* binding */ line),
/* harmony export */   "select": () => (/* binding */ select),
/* harmony export */   "unselect": () => (/* binding */ unselect)
/* harmony export */ });
const line = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-5 0 32 32" >
<path d="M23.36 9.32c-1.32 0-2.36 1.080-2.36 2.36 0 0.28 0.040 0.56 0.12 0.8l-4.8 4.080c-0.32-0.2-0.72-0.28-1.16-0.28s-0.88 0.12-1.24 0.36l-2.72-2.2c0.080-0.24 0.12-0.44 0.12-0.72 0-1.32-1.080-2.36-2.36-2.36-1.32 0-2.36 1.080-2.36 2.36 0 0.36 0.080 0.68 0.2 0.96l-3.44 3.44c-0.28-0.12-0.64-0.2-0.96-0.2-1.32 0-2.36 1.080-2.36 2.36 0 1.32 1.080 2.36 2.36 2.36s2.36-1.080 2.36-2.36c0-0.36-0.080-0.68-0.2-0.96l3.44-3.44c0.28 0.12 0.64 0.2 0.96 0.2 0.44 0 0.88-0.12 1.24-0.36l2.76 2.12c-0.080 0.24-0.080 0.44-0.080 0.72 0 1.32 1.080 2.36 2.36 2.36s2.36-1.080 2.36-2.36c0-0.28-0.040-0.56-0.12-0.8l4.8-4.080c0.32 0.2 0.72 0.28 1.16 0.28 1.32 0 2.36-1.080 2.36-2.36-0.040-1.2-1.16-2.28-2.44-2.28zM2.36 21c-0.36 0-0.68-0.32-0.68-0.68 0-0.4 0.32-0.68 0.68-0.68s0.68 0.32 0.68 0.68c0 0.36-0.28 0.68-0.68 0.68zM8.24 13.76c0-0.4 0.32-0.68 0.68-0.68s0.68 0.32 0.68 0.68-0.32 0.68-0.68 0.68c-0.36 0-0.68-0.32-0.68-0.68zM15.2 19.28c-0.4 0-0.68-0.32-0.68-0.68s0.32-0.68 0.68-0.68 0.68 0.32 0.68 0.68c-0.040 0.4-0.28 0.68-0.68 0.68zM23.36 12.36c-0.36 0-0.68-0.32-0.68-0.68 0-0.4 0.32-0.68 0.68-0.68 0.4 0 0.68 0.32 0.68 0.68 0 0.4-0.32 0.68-0.68 0.68z"></path>
</svg>`;

const select = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-4 -3 28 28" >
<g id="select">
<path d="M14.8,24l-3.3-4.3l-3.2,4.2L5.8,6.9l16,7.2L16.4,16l3.2,4.3L14.8,24z M11.6,16.4l3.6,4.8l1.6-1.3L13.1,15l3.3-1.1l-8.1-3.6
  l1.3,8.7L11.6,16.4z"/>
<path d="M4,18H0v-4h2v2h2V18z M2,12H0V6h2V12z M18,10h-2V6h2V10z M18,4h-2V2h-2V0h4V4z M2,4H0V0h4v2H2V4z M12,2H6V0h6V2z"/>
</g>
</svg>`;

const unselect = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
viewBox="0 0 15 16">
<g id="unselect" transform="translate(-461.714 -531.79)">
<path  d="M470.714 533.877v1.015a5 5 0 0 1 1.754.73l.717-.716a6 6 0 0 0-2.47-1.03zm-2 .004a6 6 0 0 0-2.472 1.023l.718.719a5 5 0 0 1 1.754-.727zm5.887 2.437-.719.719a5 5 0 0 1 .727 1.754h1.015a6 6 0 0 0-1.023-2.473zm-9.771.002a6 6 0 0 0-1.03 2.47h1.016a5 5 0 0 1 .73-1.753zm-1.026 4.47a6 6 0 0 0 1.024 2.474l.718-.72a5 5 0 0 1-.726-1.753zm10.809 0a5 5 0 0 1-.73 1.755l.716.717a6 6 0 0 0 1.03-2.471zm-7.653 3.169-.716.717a6 6 0 0 0 2.47 1.029v-1.016a5 5 0 0 1-1.754-.73zm5.508 0a5 5 0 0 1-1.754.726v1.016a6 6 0 0 0 2.473-1.023z" id="path858"/>
<rect transform="rotate(-45)" width="1" height="8.0000029" x="-50.051552" y="709.82788"/>
<rect width="1" height="8" x="-714.32788" y="-53.551552" transform="rotate(-135)"/>
</g>
</svg>`;


/***/ }),

/***/ "./node_modules/@turf/boolean-disjoint/dist/es/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@turf/boolean-disjoint/dist/es/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _turf_boolean_point_in_polygon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/boolean-point-in-polygon */ "./node_modules/@turf/boolean-point-in-polygon/dist/es/index.js");
/* harmony import */ var _turf_line_intersect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/line-intersect */ "./node_modules/@turf/line-intersect/dist/es/index.js");
/* harmony import */ var _turf_meta__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/es/index.js");
/* harmony import */ var _turf_polygon_to_line__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @turf/polygon-to-line */ "./node_modules/@turf/polygon-to-line/dist/es/index.js");




/**
 * Boolean-disjoint returns (TRUE) if the intersection of the two geometries is an empty set.
 *
 * @name booleanDisjoint
 * @param {Geometry|Feature<any>} feature1 GeoJSON Feature or Geometry
 * @param {Geometry|Feature<any>} feature2 GeoJSON Feature or Geometry
 * @returns {boolean} true/false
 * @example
 * var point = turf.point([2, 2]);
 * var line = turf.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);
 *
 * turf.booleanDisjoint(line, point);
 * //=true
 */
function booleanDisjoint(feature1, feature2) {
    var bool = true;
    (0,_turf_meta__WEBPACK_IMPORTED_MODULE_2__.flattenEach)(feature1, function (flatten1) {
        (0,_turf_meta__WEBPACK_IMPORTED_MODULE_2__.flattenEach)(feature2, function (flatten2) {
            if (bool === false) {
                return false;
            }
            bool = disjoint(flatten1.geometry, flatten2.geometry);
        });
    });
    return bool;
}
/**
 * Disjoint operation for simple Geometries (Point/LineString/Polygon)
 *
 * @private
 * @param {Geometry<any>} geom1 GeoJSON Geometry
 * @param {Geometry<any>} geom2 GeoJSON Geometry
 * @returns {boolean} true/false
 */
function disjoint(geom1, geom2) {
    switch (geom1.type) {
        case "Point":
            switch (geom2.type) {
                case "Point":
                    return !compareCoords(geom1.coordinates, geom2.coordinates);
                case "LineString":
                    return !isPointOnLine(geom2, geom1);
                case "Polygon":
                    return !(0,_turf_boolean_point_in_polygon__WEBPACK_IMPORTED_MODULE_0__["default"])(geom1, geom2);
            }
            /* istanbul ignore next */
            break;
        case "LineString":
            switch (geom2.type) {
                case "Point":
                    return !isPointOnLine(geom1, geom2);
                case "LineString":
                    return !isLineOnLine(geom1, geom2);
                case "Polygon":
                    return !isLineInPoly(geom2, geom1);
            }
            /* istanbul ignore next */
            break;
        case "Polygon":
            switch (geom2.type) {
                case "Point":
                    return !(0,_turf_boolean_point_in_polygon__WEBPACK_IMPORTED_MODULE_0__["default"])(geom2, geom1);
                case "LineString":
                    return !isLineInPoly(geom1, geom2);
                case "Polygon":
                    return !isPolyInPoly(geom2, geom1);
            }
    }
    return false;
}
// http://stackoverflow.com/a/11908158/1979085
function isPointOnLine(lineString, pt) {
    for (var i = 0; i < lineString.coordinates.length - 1; i++) {
        if (isPointOnLineSegment(lineString.coordinates[i], lineString.coordinates[i + 1], pt.coordinates)) {
            return true;
        }
    }
    return false;
}
function isLineOnLine(lineString1, lineString2) {
    var doLinesIntersect = (0,_turf_line_intersect__WEBPACK_IMPORTED_MODULE_1__["default"])(lineString1, lineString2);
    if (doLinesIntersect.features.length > 0) {
        return true;
    }
    return false;
}
function isLineInPoly(polygon, lineString) {
    for (var _i = 0, _a = lineString.coordinates; _i < _a.length; _i++) {
        var coord = _a[_i];
        if ((0,_turf_boolean_point_in_polygon__WEBPACK_IMPORTED_MODULE_0__["default"])(coord, polygon)) {
            return true;
        }
    }
    var doLinesIntersect = (0,_turf_line_intersect__WEBPACK_IMPORTED_MODULE_1__["default"])(lineString, (0,_turf_polygon_to_line__WEBPACK_IMPORTED_MODULE_3__["default"])(polygon));
    if (doLinesIntersect.features.length > 0) {
        return true;
    }
    return false;
}
/**
 * Is Polygon (geom1) in Polygon (geom2)
 * Only takes into account outer rings
 * See http://stackoverflow.com/a/4833823/1979085
 *
 * @private
 * @param {Geometry|Feature<Polygon>} feature1 Polygon1
 * @param {Geometry|Feature<Polygon>} feature2 Polygon2
 * @returns {boolean} true/false
 */
function isPolyInPoly(feature1, feature2) {
    for (var _i = 0, _a = feature1.coordinates[0]; _i < _a.length; _i++) {
        var coord1 = _a[_i];
        if ((0,_turf_boolean_point_in_polygon__WEBPACK_IMPORTED_MODULE_0__["default"])(coord1, feature2)) {
            return true;
        }
    }
    for (var _b = 0, _c = feature2.coordinates[0]; _b < _c.length; _b++) {
        var coord2 = _c[_b];
        if ((0,_turf_boolean_point_in_polygon__WEBPACK_IMPORTED_MODULE_0__["default"])(coord2, feature1)) {
            return true;
        }
    }
    var doLinesIntersect = (0,_turf_line_intersect__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_turf_polygon_to_line__WEBPACK_IMPORTED_MODULE_3__["default"])(feature1), (0,_turf_polygon_to_line__WEBPACK_IMPORTED_MODULE_3__["default"])(feature2));
    if (doLinesIntersect.features.length > 0) {
        return true;
    }
    return false;
}
function isPointOnLineSegment(lineSegmentStart, lineSegmentEnd, pt) {
    var dxc = pt[0] - lineSegmentStart[0];
    var dyc = pt[1] - lineSegmentStart[1];
    var dxl = lineSegmentEnd[0] - lineSegmentStart[0];
    var dyl = lineSegmentEnd[1] - lineSegmentStart[1];
    var cross = dxc * dyl - dyc * dxl;
    if (cross !== 0) {
        return false;
    }
    if (Math.abs(dxl) >= Math.abs(dyl)) {
        if (dxl > 0) {
            return lineSegmentStart[0] <= pt[0] && pt[0] <= lineSegmentEnd[0];
        }
        else {
            return lineSegmentEnd[0] <= pt[0] && pt[0] <= lineSegmentStart[0];
        }
    }
    else if (dyl > 0) {
        return lineSegmentStart[1] <= pt[1] && pt[1] <= lineSegmentEnd[1];
    }
    else {
        return lineSegmentEnd[1] <= pt[1] && pt[1] <= lineSegmentStart[1];
    }
}
/**
 * compareCoords
 *
 * @private
 * @param {Position} pair1 point [x,y]
 * @param {Position} pair2 point [x,y]
 * @returns {boolean} true/false if coord pairs match
 */
function compareCoords(pair1, pair2) {
    return pair1[0] === pair2[0] && pair1[1] === pair2[1];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (booleanDisjoint);


/***/ }),

/***/ "./node_modules/@turf/boolean-intersects/dist/es/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@turf/boolean-intersects/dist/es/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ booleanIntersects)
/* harmony export */ });
/* harmony import */ var _turf_boolean_disjoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/boolean-disjoint */ "./node_modules/@turf/boolean-disjoint/dist/es/index.js");
/* harmony import */ var _turf_meta__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/es/index.js");


/**
 * Boolean-intersects returns (TRUE) two geometries intersect.
 *
 * @name booleanIntersects
 * @param {Geometry|Feature<any>} feature1 GeoJSON Feature or Geometry
 * @param {Geometry|Feature<any>} feature2 GeoJSON Feature or Geometry
 * @returns {boolean} true/false
 * @example
 * var point = turf.point([2, 2]);
 * var line = turf.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);
 *
 * turf.booleanIntersects(line, point);
 * //=true
 */
function booleanIntersects(feature1, feature2) {
    var bool = false;
    (0,_turf_meta__WEBPACK_IMPORTED_MODULE_1__.flattenEach)(feature1, function (flatten1) {
        (0,_turf_meta__WEBPACK_IMPORTED_MODULE_1__.flattenEach)(feature2, function (flatten2) {
            if (bool === true) {
                return true;
            }
            bool = !(0,_turf_boolean_disjoint__WEBPACK_IMPORTED_MODULE_0__["default"])(flatten1.geometry, flatten2.geometry);
        });
    });
    return bool;
}


/***/ }),

/***/ "./node_modules/@turf/boolean-point-in-polygon/dist/es/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@turf/boolean-point-in-polygon/dist/es/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ booleanPointInPolygon)
/* harmony export */ });
/* harmony import */ var _turf_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/invariant */ "./node_modules/@turf/invariant/dist/es/index.js");

// http://en.wikipedia.org/wiki/Even%E2%80%93odd_rule
// modified from: https://github.com/substack/point-in-polygon/blob/master/index.js
// which was modified from http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
/**
 * Takes a {@link Point} and a {@link Polygon} or {@link MultiPolygon} and determines if the point
 * resides inside the polygon. The polygon can be convex or concave. The function accounts for holes.
 *
 * @name booleanPointInPolygon
 * @param {Coord} point input point
 * @param {Feature<Polygon|MultiPolygon>} polygon input polygon or multipolygon
 * @param {Object} [options={}] Optional parameters
 * @param {boolean} [options.ignoreBoundary=false] True if polygon boundary should be ignored when determining if
 * the point is inside the polygon otherwise false.
 * @returns {boolean} `true` if the Point is inside the Polygon; `false` if the Point is not inside the Polygon
 * @example
 * var pt = turf.point([-77, 44]);
 * var poly = turf.polygon([[
 *   [-81, 41],
 *   [-81, 47],
 *   [-72, 47],
 *   [-72, 41],
 *   [-81, 41]
 * ]]);
 *
 * turf.booleanPointInPolygon(pt, poly);
 * //= true
 */
function booleanPointInPolygon(point, polygon, options) {
    if (options === void 0) { options = {}; }
    // validation
    if (!point) {
        throw new Error("point is required");
    }
    if (!polygon) {
        throw new Error("polygon is required");
    }
    var pt = (0,_turf_invariant__WEBPACK_IMPORTED_MODULE_0__.getCoord)(point);
    var geom = (0,_turf_invariant__WEBPACK_IMPORTED_MODULE_0__.getGeom)(polygon);
    var type = geom.type;
    var bbox = polygon.bbox;
    var polys = geom.coordinates;
    // Quick elimination if point is not inside bbox
    if (bbox && inBBox(pt, bbox) === false) {
        return false;
    }
    // normalize to multipolygon
    if (type === "Polygon") {
        polys = [polys];
    }
    var insidePoly = false;
    for (var i = 0; i < polys.length && !insidePoly; i++) {
        // check if it is in the outer ring first
        if (inRing(pt, polys[i][0], options.ignoreBoundary)) {
            var inHole = false;
            var k = 1;
            // check for the point in any of the holes
            while (k < polys[i].length && !inHole) {
                if (inRing(pt, polys[i][k], !options.ignoreBoundary)) {
                    inHole = true;
                }
                k++;
            }
            if (!inHole) {
                insidePoly = true;
            }
        }
    }
    return insidePoly;
}
/**
 * inRing
 *
 * @private
 * @param {Array<number>} pt [x,y]
 * @param {Array<Array<number>>} ring [[x,y], [x,y],..]
 * @param {boolean} ignoreBoundary ignoreBoundary
 * @returns {boolean} inRing
 */
function inRing(pt, ring, ignoreBoundary) {
    var isInside = false;
    if (ring[0][0] === ring[ring.length - 1][0] &&
        ring[0][1] === ring[ring.length - 1][1]) {
        ring = ring.slice(0, ring.length - 1);
    }
    for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        var xi = ring[i][0];
        var yi = ring[i][1];
        var xj = ring[j][0];
        var yj = ring[j][1];
        var onBoundary = pt[1] * (xi - xj) + yi * (xj - pt[0]) + yj * (pt[0] - xi) === 0 &&
            (xi - pt[0]) * (xj - pt[0]) <= 0 &&
            (yi - pt[1]) * (yj - pt[1]) <= 0;
        if (onBoundary) {
            return !ignoreBoundary;
        }
        var intersect = yi > pt[1] !== yj > pt[1] &&
            pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi;
        if (intersect) {
            isInside = !isInside;
        }
    }
    return isInside;
}
/**
 * inBBox
 *
 * @private
 * @param {Position} pt point [x,y]
 * @param {BBox} bbox BBox [west, south, east, north]
 * @returns {boolean} true/false if point is inside BBox
 */
function inBBox(pt, bbox) {
    return (bbox[0] <= pt[0] && bbox[1] <= pt[1] && bbox[2] >= pt[0] && bbox[3] >= pt[1]);
}


/***/ }),

/***/ "./node_modules/@turf/helpers/dist/es/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@turf/helpers/dist/es/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "areaFactors": () => (/* binding */ areaFactors),
/* harmony export */   "bearingToAzimuth": () => (/* binding */ bearingToAzimuth),
/* harmony export */   "convertArea": () => (/* binding */ convertArea),
/* harmony export */   "convertLength": () => (/* binding */ convertLength),
/* harmony export */   "degreesToRadians": () => (/* binding */ degreesToRadians),
/* harmony export */   "earthRadius": () => (/* binding */ earthRadius),
/* harmony export */   "factors": () => (/* binding */ factors),
/* harmony export */   "feature": () => (/* binding */ feature),
/* harmony export */   "featureCollection": () => (/* binding */ featureCollection),
/* harmony export */   "geometry": () => (/* binding */ geometry),
/* harmony export */   "geometryCollection": () => (/* binding */ geometryCollection),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "lengthToDegrees": () => (/* binding */ lengthToDegrees),
/* harmony export */   "lengthToRadians": () => (/* binding */ lengthToRadians),
/* harmony export */   "lineString": () => (/* binding */ lineString),
/* harmony export */   "lineStrings": () => (/* binding */ lineStrings),
/* harmony export */   "multiLineString": () => (/* binding */ multiLineString),
/* harmony export */   "multiPoint": () => (/* binding */ multiPoint),
/* harmony export */   "multiPolygon": () => (/* binding */ multiPolygon),
/* harmony export */   "point": () => (/* binding */ point),
/* harmony export */   "points": () => (/* binding */ points),
/* harmony export */   "polygon": () => (/* binding */ polygon),
/* harmony export */   "polygons": () => (/* binding */ polygons),
/* harmony export */   "radiansToDegrees": () => (/* binding */ radiansToDegrees),
/* harmony export */   "radiansToLength": () => (/* binding */ radiansToLength),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "unitsFactors": () => (/* binding */ unitsFactors),
/* harmony export */   "validateBBox": () => (/* binding */ validateBBox),
/* harmony export */   "validateId": () => (/* binding */ validateId)
/* harmony export */ });
/**
 * @module helpers
 */
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 *
 * @memberof helpers
 * @type {number}
 */
var earthRadius = 6371008.8;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 *
 * @memberof helpers
 * @type {Object}
 */
var factors = {
    centimeters: earthRadius * 100,
    centimetres: earthRadius * 100,
    degrees: earthRadius / 111325,
    feet: earthRadius * 3.28084,
    inches: earthRadius * 39.37,
    kilometers: earthRadius / 1000,
    kilometres: earthRadius / 1000,
    meters: earthRadius,
    metres: earthRadius,
    miles: earthRadius / 1609.344,
    millimeters: earthRadius * 1000,
    millimetres: earthRadius * 1000,
    nauticalmiles: earthRadius / 1852,
    radians: 1,
    yards: earthRadius * 1.0936,
};
/**
 * Units of measurement factors based on 1 meter.
 *
 * @memberof helpers
 * @type {Object}
 */
var unitsFactors = {
    centimeters: 100,
    centimetres: 100,
    degrees: 1 / 111325,
    feet: 3.28084,
    inches: 39.37,
    kilometers: 1 / 1000,
    kilometres: 1 / 1000,
    meters: 1,
    metres: 1,
    miles: 1 / 1609.344,
    millimeters: 1000,
    millimetres: 1000,
    nauticalmiles: 1 / 1852,
    radians: 1 / earthRadius,
    yards: 1.0936133,
};
/**
 * Area of measurement factors based on 1 square meter.
 *
 * @memberof helpers
 * @type {Object}
 */
var areaFactors = {
    acres: 0.000247105,
    centimeters: 10000,
    centimetres: 10000,
    feet: 10.763910417,
    hectares: 0.0001,
    inches: 1550.003100006,
    kilometers: 0.000001,
    kilometres: 0.000001,
    meters: 1,
    metres: 1,
    miles: 3.86e-7,
    millimeters: 1000000,
    millimetres: 1000000,
    yards: 1.195990046,
};
/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geom, properties, options) {
    if (options === void 0) { options = {}; }
    var feat = { type: "Feature" };
    if (options.id === 0 || options.id) {
        feat.id = options.id;
    }
    if (options.bbox) {
        feat.bbox = options.bbox;
    }
    feat.properties = properties || {};
    feat.geometry = geom;
    return feat;
}
/**
 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
 * For GeometryCollection type use `helpers.geometryCollection`
 *
 * @name geometry
 * @param {string} type Geometry Type
 * @param {Array<any>} coordinates Coordinates
 * @param {Object} [options={}] Optional Parameters
 * @returns {Geometry} a GeoJSON Geometry
 * @example
 * var type = "Point";
 * var coordinates = [110, 50];
 * var geometry = turf.geometry(type, coordinates);
 * // => geometry
 */
function geometry(type, coordinates, _options) {
    if (_options === void 0) { _options = {}; }
    switch (type) {
        case "Point":
            return point(coordinates).geometry;
        case "LineString":
            return lineString(coordinates).geometry;
        case "Polygon":
            return polygon(coordinates).geometry;
        case "MultiPoint":
            return multiPoint(coordinates).geometry;
        case "MultiLineString":
            return multiLineString(coordinates).geometry;
        case "MultiPolygon":
            return multiPolygon(coordinates).geometry;
        default:
            throw new Error(type + " is invalid");
    }
}
/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (!coordinates) {
        throw new Error("coordinates is required");
    }
    if (!Array.isArray(coordinates)) {
        throw new Error("coordinates must be an Array");
    }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be at least 2 numbers long");
    }
    if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) {
        throw new Error("coordinates must contain numbers");
    }
    var geom = {
        type: "Point",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link Point} {@link FeatureCollection} from an Array of Point coordinates.
 *
 * @name points
 * @param {Array<Array<number>>} coordinates an array of Points
 * @param {Object} [properties={}] Translate these properties to each Feature
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Point>} Point Feature
 * @example
 * var points = turf.points([
 *   [-75, 39],
 *   [-80, 45],
 *   [-78, 50]
 * ]);
 *
 * //=points
 */
function points(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return point(coords, properties);
    }), options);
}
/**
 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
function polygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
        var ring = coordinates_1[_i];
        if (ring.length < 4) {
            throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error("First and last Position are not equivalent.");
            }
        }
    }
    var geom = {
        type: "Polygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link Polygon} {@link FeatureCollection} from an Array of Polygon coordinates.
 *
 * @name polygons
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygon coordinates
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Polygon>} Polygon FeatureCollection
 * @example
 * var polygons = turf.polygons([
 *   [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
 *   [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
 * ]);
 *
 * //=polygons
 */
function polygons(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return polygon(coords, properties);
    }), options);
}
/**
 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
function lineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be an array of two or more positions");
    }
    var geom = {
        type: "LineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link LineString} {@link FeatureCollection} from an Array of LineString coordinates.
 *
 * @name lineStrings
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<LineString>} LineString FeatureCollection
 * @example
 * var linestrings = turf.lineStrings([
 *   [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
 *   [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
 * ]);
 *
 * //=linestrings
 */
function lineStrings(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return lineString(coords, properties);
    }), options);
}
/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
    if (options === void 0) { options = {}; }
    var fc = { type: "FeatureCollection" };
    if (options.id) {
        fc.id = options.id;
    }
    if (options.bbox) {
        fc.bbox = options.bbox;
    }
    fc.features = features;
    return fc;
}
/**
 * Creates a {@link Feature<MultiLineString>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiLineString
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 */
function multiLineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiLineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link Feature<MultiPoint>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPoint
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 */
function multiPoint(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPoint",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link Feature<MultiPolygon>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPolygon
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPolygon>} a multipolygon feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
 *
 * //=multiPoly
 *
 */
function multiPolygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPolygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link Feature<GeometryCollection>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name geometryCollection
 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = turf.geometry("Point", [100, 0]);
 * var line = turf.geometry("LineString", [[101, 0], [102, 1]]);
 * var collection = turf.geometryCollection([pt, line]);
 *
 * // => collection
 */
function geometryCollection(geometries, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "GeometryCollection",
        geometries: geometries,
    };
    return feature(geom, properties, options);
}
/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * turf.round(120.4321)
 * //=120
 *
 * turf.round(120.4321, 2)
 * //=120.43
 */
function round(num, precision) {
    if (precision === void 0) { precision = 0; }
    if (precision && !(precision >= 0)) {
        throw new Error("precision must be a positive number");
    }
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
}
/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return radians * factor;
}
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return distance / factor;
}
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
 *
 * @name lengthToDegrees
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} degrees
 */
function lengthToDegrees(distance, units) {
    return radiansToDegrees(lengthToRadians(distance, units));
}
/**
 * Converts any bearing angle from the north line direction (positive clockwise)
 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
 *
 * @name bearingToAzimuth
 * @param {number} bearing angle, between -180 and +180 degrees
 * @returns {number} angle between 0 and 360 degrees
 */
function bearingToAzimuth(bearing) {
    var angle = bearing % 360;
    if (angle < 0) {
        angle += 360;
    }
    return angle;
}
/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
function radiansToDegrees(radians) {
    var degrees = radians % (2 * Math.PI);
    return (degrees * 180) / Math.PI;
}
/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degreesToRadians(degrees) {
    var radians = degrees % 360;
    return (radians * Math.PI) / 180;
}
/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {Units} [originalUnit="kilometers"] of the length
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted length
 */
function convertLength(length, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "kilometers"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(length >= 0)) {
        throw new Error("length must be a positive number");
    }
    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}
/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches, hectares
 * @param {number} area to be converted
 * @param {Units} [originalUnit="meters"] of the distance
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted area
 */
function convertArea(area, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "meters"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(area >= 0)) {
        throw new Error("area must be a positive number");
    }
    var startFactor = areaFactors[originalUnit];
    if (!startFactor) {
        throw new Error("invalid original units");
    }
    var finalFactor = areaFactors[finalUnit];
    if (!finalFactor) {
        throw new Error("invalid final units");
    }
    return (area / startFactor) * finalFactor;
}
/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber(num) {
    return !isNaN(num) && num !== null && !Array.isArray(num);
}
/**
 * isObject
 *
 * @param {*} input variable to validate
 * @returns {boolean} true/false
 * @example
 * turf.isObject({elevation: 10})
 * //=true
 * turf.isObject('foo')
 * //=false
 */
function isObject(input) {
    return !!input && input.constructor === Object;
}
/**
 * Validate BBox
 *
 * @private
 * @param {Array<number>} bbox BBox to validate
 * @returns {void}
 * @throws Error if BBox is not valid
 * @example
 * validateBBox([-180, -40, 110, 50])
 * //=OK
 * validateBBox([-180, -40])
 * //=Error
 * validateBBox('Foo')
 * //=Error
 * validateBBox(5)
 * //=Error
 * validateBBox(null)
 * //=Error
 * validateBBox(undefined)
 * //=Error
 */
function validateBBox(bbox) {
    if (!bbox) {
        throw new Error("bbox is required");
    }
    if (!Array.isArray(bbox)) {
        throw new Error("bbox must be an Array");
    }
    if (bbox.length !== 4 && bbox.length !== 6) {
        throw new Error("bbox must be an Array of 4 or 6 numbers");
    }
    bbox.forEach(function (num) {
        if (!isNumber(num)) {
            throw new Error("bbox must only contain numbers");
        }
    });
}
/**
 * Validate Id
 *
 * @private
 * @param {string|number} id Id to validate
 * @returns {void}
 * @throws Error if Id is not valid
 * @example
 * validateId([-180, -40, 110, 50])
 * //=Error
 * validateId([-180, -40])
 * //=Error
 * validateId('Foo')
 * //=OK
 * validateId(5)
 * //=OK
 * validateId(null)
 * //=Error
 * validateId(undefined)
 * //=Error
 */
function validateId(id) {
    if (!id) {
        throw new Error("id is required");
    }
    if (["string", "number"].indexOf(typeof id) === -1) {
        throw new Error("id must be a number or a string");
    }
}


/***/ }),

/***/ "./node_modules/@turf/invariant/dist/es/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@turf/invariant/dist/es/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "collectionOf": () => (/* binding */ collectionOf),
/* harmony export */   "containsNumber": () => (/* binding */ containsNumber),
/* harmony export */   "featureOf": () => (/* binding */ featureOf),
/* harmony export */   "geojsonType": () => (/* binding */ geojsonType),
/* harmony export */   "getCoord": () => (/* binding */ getCoord),
/* harmony export */   "getCoords": () => (/* binding */ getCoords),
/* harmony export */   "getGeom": () => (/* binding */ getGeom),
/* harmony export */   "getType": () => (/* binding */ getType)
/* harmony export */ });
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");

/**
 * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
 *
 * @name getCoord
 * @param {Array<number>|Geometry<Point>|Feature<Point>} coord GeoJSON Point or an Array of numbers
 * @returns {Array<number>} coordinates
 * @example
 * var pt = turf.point([10, 10]);
 *
 * var coord = turf.getCoord(pt);
 * //= [10, 10]
 */
function getCoord(coord) {
    if (!coord) {
        throw new Error("coord is required");
    }
    if (!Array.isArray(coord)) {
        if (coord.type === "Feature" &&
            coord.geometry !== null &&
            coord.geometry.type === "Point") {
            return coord.geometry.coordinates;
        }
        if (coord.type === "Point") {
            return coord.coordinates;
        }
    }
    if (Array.isArray(coord) &&
        coord.length >= 2 &&
        !Array.isArray(coord[0]) &&
        !Array.isArray(coord[1])) {
        return coord;
    }
    throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
/**
 * Unwrap coordinates from a Feature, Geometry Object or an Array
 *
 * @name getCoords
 * @param {Array<any>|Geometry|Feature} coords Feature, Geometry Object or an Array
 * @returns {Array<any>} coordinates
 * @example
 * var poly = turf.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);
 *
 * var coords = turf.getCoords(poly);
 * //= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
 */
function getCoords(coords) {
    if (Array.isArray(coords)) {
        return coords;
    }
    // Feature
    if (coords.type === "Feature") {
        if (coords.geometry !== null) {
            return coords.geometry.coordinates;
        }
    }
    else {
        // Geometry
        if (coords.coordinates) {
            return coords.coordinates;
        }
    }
    throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
}
/**
 * Checks if coordinates contains a number
 *
 * @name containsNumber
 * @param {Array<any>} coordinates GeoJSON Coordinates
 * @returns {boolean} true if Array contains a number
 */
function containsNumber(coordinates) {
    if (coordinates.length > 1 &&
        (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.isNumber)(coordinates[0]) &&
        (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.isNumber)(coordinates[1])) {
        return true;
    }
    if (Array.isArray(coordinates[0]) && coordinates[0].length) {
        return containsNumber(coordinates[0]);
    }
    throw new Error("coordinates must only contain numbers");
}
/**
 * Enforce expectations about types of GeoJSON objects for Turf.
 *
 * @name geojsonType
 * @param {GeoJSON} value any GeoJSON object
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function geojsonType(value, type, name) {
    if (!type || !name) {
        throw new Error("type and name required");
    }
    if (!value || value.type !== type) {
        throw new Error("Invalid input to " +
            name +
            ": must be a " +
            type +
            ", given " +
            value.type);
    }
}
/**
 * Enforce expectations about types of {@link Feature} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @name featureOf
 * @param {Feature} feature a feature with an expected geometry type
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} error if value is not the expected type.
 */
function featureOf(feature, type, name) {
    if (!feature) {
        throw new Error("No feature passed");
    }
    if (!name) {
        throw new Error(".featureOf() requires a name");
    }
    if (!feature || feature.type !== "Feature" || !feature.geometry) {
        throw new Error("Invalid input to " + name + ", Feature with geometry required");
    }
    if (!feature.geometry || feature.geometry.type !== type) {
        throw new Error("Invalid input to " +
            name +
            ": must be a " +
            type +
            ", given " +
            feature.geometry.type);
    }
}
/**
 * Enforce expectations about types of {@link FeatureCollection} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @name collectionOf
 * @param {FeatureCollection} featureCollection a FeatureCollection for which features will be judged
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function collectionOf(featureCollection, type, name) {
    if (!featureCollection) {
        throw new Error("No featureCollection passed");
    }
    if (!name) {
        throw new Error(".collectionOf() requires a name");
    }
    if (!featureCollection || featureCollection.type !== "FeatureCollection") {
        throw new Error("Invalid input to " + name + ", FeatureCollection required");
    }
    for (var _i = 0, _a = featureCollection.features; _i < _a.length; _i++) {
        var feature = _a[_i];
        if (!feature || feature.type !== "Feature" || !feature.geometry) {
            throw new Error("Invalid input to " + name + ", Feature with geometry required");
        }
        if (!feature.geometry || feature.geometry.type !== type) {
            throw new Error("Invalid input to " +
                name +
                ": must be a " +
                type +
                ", given " +
                feature.geometry.type);
        }
    }
}
/**
 * Get Geometry from Feature or Geometry Object
 *
 * @param {Feature|Geometry} geojson GeoJSON Feature or Geometry Object
 * @returns {Geometry|null} GeoJSON Geometry Object
 * @throws {Error} if geojson is not a Feature or Geometry Object
 * @example
 * var point = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [110, 40]
 *   }
 * }
 * var geom = turf.getGeom(point)
 * //={"type": "Point", "coordinates": [110, 40]}
 */
function getGeom(geojson) {
    if (geojson.type === "Feature") {
        return geojson.geometry;
    }
    return geojson;
}
/**
 * Get GeoJSON object's type, Geometry type is prioritize.
 *
 * @param {GeoJSON} geojson GeoJSON object
 * @param {string} [name="geojson"] name of the variable to display in error message (unused)
 * @returns {string} GeoJSON type
 * @example
 * var point = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [110, 40]
 *   }
 * }
 * var geom = turf.getType(point)
 * //="Point"
 */
function getType(geojson, _name) {
    if (geojson.type === "FeatureCollection") {
        return "FeatureCollection";
    }
    if (geojson.type === "GeometryCollection") {
        return "GeometryCollection";
    }
    if (geojson.type === "Feature" && geojson.geometry !== null) {
        return geojson.geometry.type;
    }
    return geojson.type;
}


/***/ }),

/***/ "./node_modules/@turf/line-intersect/dist/es/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@turf/line-intersect/dist/es/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");
/* harmony import */ var _turf_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/invariant */ "./node_modules/@turf/invariant/dist/es/index.js");
/* harmony import */ var _turf_line_segment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @turf/line-segment */ "./node_modules/@turf/line-segment/dist/es/index.js");
/* harmony import */ var _turf_meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/es/index.js");
/* harmony import */ var geojson_rbush__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! geojson-rbush */ "./node_modules/geojson-rbush/index.js");





/**
 * Takes any LineString or Polygon GeoJSON and returns the intersecting point(s).
 *
 * @name lineIntersect
 * @param {GeoJSON} line1 any LineString or Polygon
 * @param {GeoJSON} line2 any LineString or Polygon
 * @returns {FeatureCollection<Point>} point(s) that intersect both
 * @example
 * var line1 = turf.lineString([[126, -11], [129, -21]]);
 * var line2 = turf.lineString([[123, -18], [131, -14]]);
 * var intersects = turf.lineIntersect(line1, line2);
 *
 * //addToMap
 * var addToMap = [line1, line2, intersects]
 */
function lineIntersect(line1, line2) {
    var unique = {};
    var results = [];
    // First, normalize geometries to features
    // Then, handle simple 2-vertex segments
    if (line1.type === "LineString") {
        line1 = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.feature)(line1);
    }
    if (line2.type === "LineString") {
        line2 = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.feature)(line2);
    }
    if (line1.type === "Feature" &&
        line2.type === "Feature" &&
        line1.geometry !== null &&
        line2.geometry !== null &&
        line1.geometry.type === "LineString" &&
        line2.geometry.type === "LineString" &&
        line1.geometry.coordinates.length === 2 &&
        line2.geometry.coordinates.length === 2) {
        var intersect = intersects(line1, line2);
        if (intersect) {
            results.push(intersect);
        }
        return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.featureCollection)(results);
    }
    // Handles complex GeoJSON Geometries
    var tree = geojson_rbush__WEBPACK_IMPORTED_MODULE_4__();
    tree.load((0,_turf_line_segment__WEBPACK_IMPORTED_MODULE_2__["default"])(line2));
    (0,_turf_meta__WEBPACK_IMPORTED_MODULE_3__.featureEach)((0,_turf_line_segment__WEBPACK_IMPORTED_MODULE_2__["default"])(line1), function (segment) {
        (0,_turf_meta__WEBPACK_IMPORTED_MODULE_3__.featureEach)(tree.search(segment), function (match) {
            var intersect = intersects(segment, match);
            if (intersect) {
                // prevent duplicate points https://github.com/Turfjs/turf/issues/688
                var key = (0,_turf_invariant__WEBPACK_IMPORTED_MODULE_1__.getCoords)(intersect).join(",");
                if (!unique[key]) {
                    unique[key] = true;
                    results.push(intersect);
                }
            }
        });
    });
    return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.featureCollection)(results);
}
/**
 * Find a point that intersects LineStrings with two coordinates each
 *
 * @private
 * @param {Feature<LineString>} line1 GeoJSON LineString (Must only contain 2 coordinates)
 * @param {Feature<LineString>} line2 GeoJSON LineString (Must only contain 2 coordinates)
 * @returns {Feature<Point>} intersecting GeoJSON Point
 */
function intersects(line1, line2) {
    var coords1 = (0,_turf_invariant__WEBPACK_IMPORTED_MODULE_1__.getCoords)(line1);
    var coords2 = (0,_turf_invariant__WEBPACK_IMPORTED_MODULE_1__.getCoords)(line2);
    if (coords1.length !== 2) {
        throw new Error("<intersects> line1 must only contain 2 coordinates");
    }
    if (coords2.length !== 2) {
        throw new Error("<intersects> line2 must only contain 2 coordinates");
    }
    var x1 = coords1[0][0];
    var y1 = coords1[0][1];
    var x2 = coords1[1][0];
    var y2 = coords1[1][1];
    var x3 = coords2[0][0];
    var y3 = coords2[0][1];
    var x4 = coords2[1][0];
    var y4 = coords2[1][1];
    var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    var numeA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
    var numeB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
    if (denom === 0) {
        if (numeA === 0 && numeB === 0) {
            return null;
        }
        return null;
    }
    var uA = numeA / denom;
    var uB = numeB / denom;
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        var x = x1 + uA * (x2 - x1);
        var y = y1 + uA * (y2 - y1);
        return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)([x, y]);
    }
    return null;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lineIntersect);


/***/ }),

/***/ "./node_modules/@turf/line-segment/dist/es/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@turf/line-segment/dist/es/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");
/* harmony import */ var _turf_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/invariant */ "./node_modules/@turf/invariant/dist/es/index.js");
/* harmony import */ var _turf_meta__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/dist/es/index.js");



/**
 * Creates a {@link FeatureCollection} of 2-vertex {@link LineString} segments from a
 * {@link LineString|(Multi)LineString} or {@link Polygon|(Multi)Polygon}.
 *
 * @name lineSegment
 * @param {GeoJSON} geojson GeoJSON Polygon or LineString
 * @returns {FeatureCollection<LineString>} 2-vertex line segments
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 * var segments = turf.lineSegment(polygon);
 *
 * //addToMap
 * var addToMap = [polygon, segments]
 */
function lineSegment(geojson) {
    if (!geojson) {
        throw new Error("geojson is required");
    }
    var results = [];
    (0,_turf_meta__WEBPACK_IMPORTED_MODULE_2__.flattenEach)(geojson, function (feature) {
        lineSegmentFeature(feature, results);
    });
    return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.featureCollection)(results);
}
/**
 * Line Segment
 *
 * @private
 * @param {Feature<LineString|Polygon>} geojson Line or polygon feature
 * @param {Array} results push to results
 * @returns {void}
 */
function lineSegmentFeature(geojson, results) {
    var coords = [];
    var geometry = geojson.geometry;
    if (geometry !== null) {
        switch (geometry.type) {
            case "Polygon":
                coords = (0,_turf_invariant__WEBPACK_IMPORTED_MODULE_1__.getCoords)(geometry);
                break;
            case "LineString":
                coords = [(0,_turf_invariant__WEBPACK_IMPORTED_MODULE_1__.getCoords)(geometry)];
        }
        coords.forEach(function (coord) {
            var segments = createSegments(coord, geojson.properties);
            segments.forEach(function (segment) {
                segment.id = results.length;
                results.push(segment);
            });
        });
    }
}
/**
 * Create Segments from LineString coordinates
 *
 * @private
 * @param {Array<Array<number>>} coords LineString coordinates
 * @param {*} properties GeoJSON properties
 * @returns {Array<Feature<LineString>>} line segments
 */
function createSegments(coords, properties) {
    var segments = [];
    coords.reduce(function (previousCoords, currentCoords) {
        var segment = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)([previousCoords, currentCoords], properties);
        segment.bbox = bbox(previousCoords, currentCoords);
        segments.push(segment);
        return currentCoords;
    });
    return segments;
}
/**
 * Create BBox between two coordinates (faster than @turf/bbox)
 *
 * @private
 * @param {Array<number>} coords1 Point coordinate
 * @param {Array<number>} coords2 Point coordinate
 * @returns {BBox} [west, south, east, north]
 */
function bbox(coords1, coords2) {
    var x1 = coords1[0];
    var y1 = coords1[1];
    var x2 = coords2[0];
    var y2 = coords2[1];
    var west = x1 < x2 ? x1 : x2;
    var south = y1 < y2 ? y1 : y2;
    var east = x1 > x2 ? x1 : x2;
    var north = y1 > y2 ? y1 : y2;
    return [west, south, east, north];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lineSegment);


/***/ }),

/***/ "./node_modules/@turf/meta/dist/es/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@turf/meta/dist/es/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "coordAll": () => (/* binding */ coordAll),
/* harmony export */   "coordEach": () => (/* binding */ coordEach),
/* harmony export */   "coordReduce": () => (/* binding */ coordReduce),
/* harmony export */   "featureEach": () => (/* binding */ featureEach),
/* harmony export */   "featureReduce": () => (/* binding */ featureReduce),
/* harmony export */   "findPoint": () => (/* binding */ findPoint),
/* harmony export */   "findSegment": () => (/* binding */ findSegment),
/* harmony export */   "flattenEach": () => (/* binding */ flattenEach),
/* harmony export */   "flattenReduce": () => (/* binding */ flattenReduce),
/* harmony export */   "geomEach": () => (/* binding */ geomEach),
/* harmony export */   "geomReduce": () => (/* binding */ geomReduce),
/* harmony export */   "lineEach": () => (/* binding */ lineEach),
/* harmony export */   "lineReduce": () => (/* binding */ lineReduce),
/* harmony export */   "propEach": () => (/* binding */ propEach),
/* harmony export */   "propReduce": () => (/* binding */ propReduce),
/* harmony export */   "segmentEach": () => (/* binding */ segmentEach),
/* harmony export */   "segmentReduce": () => (/* binding */ segmentReduce)
/* harmony export */ });
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");


/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function coordEach(geojson, callback, excludeWrapCoord) {
  // Handles null Geometry -- Skips this GeoJSON
  if (geojson === null) return;
  var j,
    k,
    l,
    geometry,
    stopG,
    coords,
    geometryMaybeCollection,
    wrapShrink = 0,
    coordIndex = 0,
    isGeometryCollection,
    type = geojson.type,
    isFeatureCollection = type === "FeatureCollection",
    isFeature = type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection
      ? geojson.features[featureIndex].geometry
      : isFeature
      ? geojson.geometry
      : geojson;
    isGeometryCollection = geometryMaybeCollection
      ? geometryMaybeCollection.type === "GeometryCollection"
      : false;
    stopG = isGeometryCollection
      ? geometryMaybeCollection.geometries.length
      : 1;

    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry = isGeometryCollection
        ? geometryMaybeCollection.geometries[geomIndex]
        : geometryMaybeCollection;

      // Handles null Geometry -- Skips this geometry
      if (geometry === null) continue;
      coords = geometry.coordinates;
      var geomType = geometry.type;

      wrapShrink =
        excludeWrapCoord &&
        (geomType === "Polygon" || geomType === "MultiPolygon")
          ? 1
          : 0;

      switch (geomType) {
        case null:
          break;
        case "Point":
          if (
            callback(
              coords,
              coordIndex,
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false
          )
            return false;
          coordIndex++;
          multiFeatureIndex++;
          break;
        case "LineString":
        case "MultiPoint":
          for (j = 0; j < coords.length; j++) {
            if (
              callback(
                coords[j],
                coordIndex,
                featureIndex,
                multiFeatureIndex,
                geometryIndex
              ) === false
            )
              return false;
            coordIndex++;
            if (geomType === "MultiPoint") multiFeatureIndex++;
          }
          if (geomType === "LineString") multiFeatureIndex++;
          break;
        case "Polygon":
        case "MultiLineString":
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (
                callback(
                  coords[j][k],
                  coordIndex,
                  featureIndex,
                  multiFeatureIndex,
                  geometryIndex
                ) === false
              )
                return false;
              coordIndex++;
            }
            if (geomType === "MultiLineString") multiFeatureIndex++;
            if (geomType === "Polygon") geometryIndex++;
          }
          if (geomType === "Polygon") multiFeatureIndex++;
          break;
        case "MultiPolygon":
          for (j = 0; j < coords.length; j++) {
            geometryIndex = 0;
            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (
                  callback(
                    coords[j][k][l],
                    coordIndex,
                    featureIndex,
                    multiFeatureIndex,
                    geometryIndex
                  ) === false
                )
                  return false;
                coordIndex++;
              }
              geometryIndex++;
            }
            multiFeatureIndex++;
          }
          break;
        case "GeometryCollection":
          for (j = 0; j < geometry.geometries.length; j++)
            if (
              coordEach(geometry.geometries[j], callback, excludeWrapCoord) ===
              false
            )
              return false;
          break;
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
  }
}

/**
 * Callback for coordReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback coordReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Reduce coordinates in any GeoJSON object, similar to Array.reduce()
 *
 * @name coordReduce
 * @param {FeatureCollection|Geometry|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentCoord, coordIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordReduce(features, function (previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentCoord;
 * });
 */
function coordReduce(geojson, callback, initialValue, excludeWrapCoord) {
  var previousValue = initialValue;
  coordEach(
    geojson,
    function (
      currentCoord,
      coordIndex,
      featureIndex,
      multiFeatureIndex,
      geometryIndex
    ) {
      if (coordIndex === 0 && initialValue === undefined)
        previousValue = currentCoord;
      else
        previousValue = callback(
          previousValue,
          currentCoord,
          coordIndex,
          featureIndex,
          multiFeatureIndex,
          geometryIndex
        );
    },
    excludeWrapCoord
  );
  return previousValue;
}

/**
 * Callback for propEach
 *
 * @callback propEachCallback
 * @param {Object} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over properties in any GeoJSON object, similar to Array.forEach()
 *
 * @name propEach
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentProperties, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propEach(features, function (currentProperties, featureIndex) {
 *   //=currentProperties
 *   //=featureIndex
 * });
 */
function propEach(geojson, callback) {
  var i;
  switch (geojson.type) {
    case "FeatureCollection":
      for (i = 0; i < geojson.features.length; i++) {
        if (callback(geojson.features[i].properties, i) === false) break;
      }
      break;
    case "Feature":
      callback(geojson.properties, 0);
      break;
  }
}

/**
 * Callback for propReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback propReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {*} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce properties in any GeoJSON object into a single value,
 * similar to how Array.reduce works. However, in this case we lazily run
 * the reduction, so an array of all properties is unnecessary.
 *
 * @name propReduce
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentProperties, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propReduce(features, function (previousValue, currentProperties, featureIndex) {
 *   //=previousValue
 *   //=currentProperties
 *   //=featureIndex
 *   return currentProperties
 * });
 */
function propReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  propEach(geojson, function (currentProperties, featureIndex) {
    if (featureIndex === 0 && initialValue === undefined)
      previousValue = currentProperties;
    else
      previousValue = callback(previousValue, currentProperties, featureIndex);
  });
  return previousValue;
}

/**
 * Callback for featureEach
 *
 * @callback featureEachCallback
 * @param {Feature<any>} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name featureEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.featureEach(features, function (currentFeature, featureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 * });
 */
function featureEach(geojson, callback) {
  if (geojson.type === "Feature") {
    callback(geojson, 0);
  } else if (geojson.type === "FeatureCollection") {
    for (var i = 0; i < geojson.features.length; i++) {
      if (callback(geojson.features[i], i) === false) break;
    }
  }
}

/**
 * Callback for featureReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback featureReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name featureReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.featureReduce(features, function (previousValue, currentFeature, featureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   return currentFeature
 * });
 */
function featureReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  featureEach(geojson, function (currentFeature, featureIndex) {
    if (featureIndex === 0 && initialValue === undefined)
      previousValue = currentFeature;
    else previousValue = callback(previousValue, currentFeature, featureIndex);
  });
  return previousValue;
}

/**
 * Get all coordinates from any GeoJSON object.
 *
 * @name coordAll
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @returns {Array<Array<number>>} coordinate position array
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * var coords = turf.coordAll(features);
 * //= [[26, 37], [36, 53]]
 */
function coordAll(geojson) {
  var coords = [];
  coordEach(geojson, function (coord) {
    coords.push(coord);
  });
  return coords;
}

/**
 * Callback for geomEach
 *
 * @callback geomEachCallback
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
 *
 * @name geomEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomEach(features, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 * });
 */
function geomEach(geojson, callback) {
  var i,
    j,
    g,
    geometry,
    stopG,
    geometryMaybeCollection,
    isGeometryCollection,
    featureProperties,
    featureBBox,
    featureId,
    featureIndex = 0,
    isFeatureCollection = geojson.type === "FeatureCollection",
    isFeature = geojson.type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (i = 0; i < stop; i++) {
    geometryMaybeCollection = isFeatureCollection
      ? geojson.features[i].geometry
      : isFeature
      ? geojson.geometry
      : geojson;
    featureProperties = isFeatureCollection
      ? geojson.features[i].properties
      : isFeature
      ? geojson.properties
      : {};
    featureBBox = isFeatureCollection
      ? geojson.features[i].bbox
      : isFeature
      ? geojson.bbox
      : undefined;
    featureId = isFeatureCollection
      ? geojson.features[i].id
      : isFeature
      ? geojson.id
      : undefined;
    isGeometryCollection = geometryMaybeCollection
      ? geometryMaybeCollection.type === "GeometryCollection"
      : false;
    stopG = isGeometryCollection
      ? geometryMaybeCollection.geometries.length
      : 1;

    for (g = 0; g < stopG; g++) {
      geometry = isGeometryCollection
        ? geometryMaybeCollection.geometries[g]
        : geometryMaybeCollection;

      // Handle null Geometry
      if (geometry === null) {
        if (
          callback(
            null,
            featureIndex,
            featureProperties,
            featureBBox,
            featureId
          ) === false
        )
          return false;
        continue;
      }
      switch (geometry.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon": {
          if (
            callback(
              geometry,
              featureIndex,
              featureProperties,
              featureBBox,
              featureId
            ) === false
          )
            return false;
          break;
        }
        case "GeometryCollection": {
          for (j = 0; j < geometry.geometries.length; j++) {
            if (
              callback(
                geometry.geometries[j],
                featureIndex,
                featureProperties,
                featureBBox,
                featureId
              ) === false
            )
              return false;
          }
          break;
        }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    // Only increase `featureIndex` per each feature
    featureIndex++;
  }
}

/**
 * Callback for geomReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback geomReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Reduce geometry in any GeoJSON object, similar to Array.reduce().
 *
 * @name geomReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomReduce(features, function (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=previousValue
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 *   return currentGeometry
 * });
 */
function geomReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  geomEach(
    geojson,
    function (
      currentGeometry,
      featureIndex,
      featureProperties,
      featureBBox,
      featureId
    ) {
      if (featureIndex === 0 && initialValue === undefined)
        previousValue = currentGeometry;
      else
        previousValue = callback(
          previousValue,
          currentGeometry,
          featureIndex,
          featureProperties,
          featureBBox,
          featureId
        );
    }
  );
  return previousValue;
}

/**
 * Callback for flattenEach
 *
 * @callback flattenEachCallback
 * @param {Feature} currentFeature The current flattened feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Iterate over flattened features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name flattenEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex, multiFeatureIndex)
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenEach(features, function (currentFeature, featureIndex, multiFeatureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 * });
 */
function flattenEach(geojson, callback) {
  geomEach(geojson, function (geometry, featureIndex, properties, bbox, id) {
    // Callback for single geometry
    var type = geometry === null ? null : geometry.type;
    switch (type) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        if (
          callback(
            (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.feature)(geometry, properties, { bbox: bbox, id: id }),
            featureIndex,
            0
          ) === false
        )
          return false;
        return;
    }

    var geomType;

    // Callback for multi-geometry
    switch (type) {
      case "MultiPoint":
        geomType = "Point";
        break;
      case "MultiLineString":
        geomType = "LineString";
        break;
      case "MultiPolygon":
        geomType = "Polygon";
        break;
    }

    for (
      var multiFeatureIndex = 0;
      multiFeatureIndex < geometry.coordinates.length;
      multiFeatureIndex++
    ) {
      var coordinate = geometry.coordinates[multiFeatureIndex];
      var geom = {
        type: geomType,
        coordinates: coordinate,
      };
      if (
        callback((0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.feature)(geom, properties), featureIndex, multiFeatureIndex) ===
        false
      )
        return false;
    }
  });
}

/**
 * Callback for flattenReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback flattenReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Reduce flattened features in any GeoJSON object, similar to Array.reduce().
 *
 * @name flattenReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex, multiFeatureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenReduce(features, function (previousValue, currentFeature, featureIndex, multiFeatureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   return currentFeature
 * });
 */
function flattenReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  flattenEach(
    geojson,
    function (currentFeature, featureIndex, multiFeatureIndex) {
      if (
        featureIndex === 0 &&
        multiFeatureIndex === 0 &&
        initialValue === undefined
      )
        previousValue = currentFeature;
      else
        previousValue = callback(
          previousValue,
          currentFeature,
          featureIndex,
          multiFeatureIndex
        );
    }
  );
  return previousValue;
}

/**
 * Callback for segmentEach
 *
 * @callback segmentEachCallback
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 * @returns {void}
 */

/**
 * Iterate over 2-vertex line segment in any GeoJSON object, similar to Array.forEach()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex)
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentEach(polygon, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //=currentSegment
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   //=segmentIndex
 * });
 *
 * // Calculate the total number of segments
 * var total = 0;
 * turf.segmentEach(polygon, function () {
 *     total++;
 * });
 */
function segmentEach(geojson, callback) {
  flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
    var segmentIndex = 0;

    // Exclude null Geometries
    if (!feature.geometry) return;
    // (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
    var type = feature.geometry.type;
    if (type === "Point" || type === "MultiPoint") return;

    // Generate 2-vertex line segments
    var previousCoords;
    var previousFeatureIndex = 0;
    var previousMultiIndex = 0;
    var prevGeomIndex = 0;
    if (
      coordEach(
        feature,
        function (
          currentCoord,
          coordIndex,
          featureIndexCoord,
          multiPartIndexCoord,
          geometryIndex
        ) {
          // Simulating a meta.coordReduce() since `reduce` operations cannot be stopped by returning `false`
          if (
            previousCoords === undefined ||
            featureIndex > previousFeatureIndex ||
            multiPartIndexCoord > previousMultiIndex ||
            geometryIndex > prevGeomIndex
          ) {
            previousCoords = currentCoord;
            previousFeatureIndex = featureIndex;
            previousMultiIndex = multiPartIndexCoord;
            prevGeomIndex = geometryIndex;
            segmentIndex = 0;
            return;
          }
          var currentSegment = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(
            [previousCoords, currentCoord],
            feature.properties
          );
          if (
            callback(
              currentSegment,
              featureIndex,
              multiFeatureIndex,
              geometryIndex,
              segmentIndex
            ) === false
          )
            return false;
          segmentIndex++;
          previousCoords = currentCoord;
        }
      ) === false
    )
      return false;
  });
}

/**
 * Callback for segmentReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback segmentReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 */

/**
 * Reduce 2-vertex line segment in any GeoJSON object, similar to Array.reduce()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (previousValue, currentSegment, currentIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentReduce(polygon, function (previousSegment, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //= previousSegment
 *   //= currentSegment
 *   //= featureIndex
 *   //= multiFeatureIndex
 *   //= geometryIndex
 *   //= segmentIndex
 *   return currentSegment
 * });
 *
 * // Calculate the total number of segments
 * var initialValue = 0
 * var total = turf.segmentReduce(polygon, function (previousValue) {
 *     previousValue++;
 *     return previousValue;
 * }, initialValue);
 */
function segmentReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  var started = false;
  segmentEach(
    geojson,
    function (
      currentSegment,
      featureIndex,
      multiFeatureIndex,
      geometryIndex,
      segmentIndex
    ) {
      if (started === false && initialValue === undefined)
        previousValue = currentSegment;
      else
        previousValue = callback(
          previousValue,
          currentSegment,
          featureIndex,
          multiFeatureIndex,
          geometryIndex,
          segmentIndex
        );
      started = true;
    }
  );
  return previousValue;
}

/**
 * Callback for lineEach
 *
 * @callback lineEachCallback
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Iterate over line or ring coordinates in LineString, Polygon, MultiLineString, MultiPolygon Features or Geometries,
 * similar to Array.forEach.
 *
 * @name lineEach
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @example
 * var multiLine = turf.multiLineString([
 *   [[26, 37], [35, 45]],
 *   [[36, 53], [38, 50], [41, 55]]
 * ]);
 *
 * turf.lineEach(multiLine, function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function lineEach(geojson, callback) {
  // validation
  if (!geojson) throw new Error("geojson is required");

  flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
    if (feature.geometry === null) return;
    var type = feature.geometry.type;
    var coords = feature.geometry.coordinates;
    switch (type) {
      case "LineString":
        if (callback(feature, featureIndex, multiFeatureIndex, 0, 0) === false)
          return false;
        break;
      case "Polygon":
        for (
          var geometryIndex = 0;
          geometryIndex < coords.length;
          geometryIndex++
        ) {
          if (
            callback(
              (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(coords[geometryIndex], feature.properties),
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false
          )
            return false;
        }
        break;
    }
  });
}

/**
 * Callback for lineReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback lineReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed.
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name lineReduce
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var multiPoly = turf.multiPolygon([
 *   turf.polygon([[[12,48],[2,41],[24,38],[12,48]], [[9,44],[13,41],[13,45],[9,44]]]),
 *   turf.polygon([[[5, 5], [0, 0], [2, 2], [4, 4], [5, 5]]])
 * ]);
 *
 * turf.lineReduce(multiPoly, function (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentLine
 * });
 */
function lineReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  lineEach(
    geojson,
    function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
      if (featureIndex === 0 && initialValue === undefined)
        previousValue = currentLine;
      else
        previousValue = callback(
          previousValue,
          currentLine,
          featureIndex,
          multiFeatureIndex,
          geometryIndex
        );
    }
  );
  return previousValue;
}

/**
 * Finds a particular 2-vertex LineString Segment from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 * Point & MultiPoint will always return null.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.segmentIndex=0] Segment Index
 * @param {Object} [options.properties={}] Translate Properties to output LineString
 * @param {BBox} [options.bbox={}] Translate BBox to output LineString
 * @param {number|string} [options.id={}] Translate Id to output LineString
 * @returns {Feature<LineString>} 2-vertex GeoJSON Feature LineString
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findSegment(multiLine);
 * // => Feature<LineString<[[10, 10], [50, 30]]>>
 *
 * // First Segment of 2nd Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: 1});
 * // => Feature<LineString<[[-10, -10], [-50, -30]]>>
 *
 * // Last Segment of Last Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: -1, segmentIndex: -1});
 * // => Feature<LineString<[[-50, -30], [-30, -40]]>>
 */
function findSegment(geojson, options) {
  // Optional Parameters
  options = options || {};
  if (!(0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.isObject)(options)) throw new Error("options is invalid");
  var featureIndex = options.featureIndex || 0;
  var multiFeatureIndex = options.multiFeatureIndex || 0;
  var geometryIndex = options.geometryIndex || 0;
  var segmentIndex = options.segmentIndex || 0;

  // Find FeatureIndex
  var properties = options.properties;
  var geometry;

  switch (geojson.type) {
    case "FeatureCollection":
      if (featureIndex < 0)
        featureIndex = geojson.features.length + featureIndex;
      properties = properties || geojson.features[featureIndex].properties;
      geometry = geojson.features[featureIndex].geometry;
      break;
    case "Feature":
      properties = properties || geojson.properties;
      geometry = geojson.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      geometry = geojson;
      break;
    default:
      throw new Error("geojson is invalid");
  }

  // Find SegmentIndex
  if (geometry === null) return null;
  var coords = geometry.coordinates;
  switch (geometry.type) {
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
      if (segmentIndex < 0) segmentIndex = coords.length + segmentIndex - 1;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(
        [coords[segmentIndex], coords[segmentIndex + 1]],
        properties,
        options
      );
    case "Polygon":
      if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
      if (segmentIndex < 0)
        segmentIndex = coords[geometryIndex].length + segmentIndex - 1;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(
        [
          coords[geometryIndex][segmentIndex],
          coords[geometryIndex][segmentIndex + 1],
        ],
        properties,
        options
      );
    case "MultiLineString":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (segmentIndex < 0)
        segmentIndex = coords[multiFeatureIndex].length + segmentIndex - 1;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(
        [
          coords[multiFeatureIndex][segmentIndex],
          coords[multiFeatureIndex][segmentIndex + 1],
        ],
        properties,
        options
      );
    case "MultiPolygon":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (geometryIndex < 0)
        geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
      if (segmentIndex < 0)
        segmentIndex =
          coords[multiFeatureIndex][geometryIndex].length - segmentIndex - 1;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(
        [
          coords[multiFeatureIndex][geometryIndex][segmentIndex],
          coords[multiFeatureIndex][geometryIndex][segmentIndex + 1],
        ],
        properties,
        options
      );
  }
  throw new Error("geojson is invalid");
}

/**
 * Finds a particular Point from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.coordIndex=0] Coord Index
 * @param {Object} [options.properties={}] Translate Properties to output Point
 * @param {BBox} [options.bbox={}] Translate BBox to output Point
 * @param {number|string} [options.id={}] Translate Id to output Point
 * @returns {Feature<Point>} 2-vertex GeoJSON Feature Point
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findPoint(multiLine);
 * // => Feature<Point<[10, 10]>>
 *
 * // First Segment of the 2nd Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: 1});
 * // => Feature<Point<[-10, -10]>>
 *
 * // Last Segment of last Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: -1, coordIndex: -1});
 * // => Feature<Point<[-30, -40]>>
 */
function findPoint(geojson, options) {
  // Optional Parameters
  options = options || {};
  if (!(0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.isObject)(options)) throw new Error("options is invalid");
  var featureIndex = options.featureIndex || 0;
  var multiFeatureIndex = options.multiFeatureIndex || 0;
  var geometryIndex = options.geometryIndex || 0;
  var coordIndex = options.coordIndex || 0;

  // Find FeatureIndex
  var properties = options.properties;
  var geometry;

  switch (geojson.type) {
    case "FeatureCollection":
      if (featureIndex < 0)
        featureIndex = geojson.features.length + featureIndex;
      properties = properties || geojson.features[featureIndex].properties;
      geometry = geojson.features[featureIndex].geometry;
      break;
    case "Feature":
      properties = properties || geojson.properties;
      geometry = geojson.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      geometry = geojson;
      break;
    default:
      throw new Error("geojson is invalid");
  }

  // Find Coord Index
  if (geometry === null) return null;
  var coords = geometry.coordinates;
  switch (geometry.type) {
    case "Point":
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(coords, properties, options);
    case "MultiPoint":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(coords[multiFeatureIndex], properties, options);
    case "LineString":
      if (coordIndex < 0) coordIndex = coords.length + coordIndex;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(coords[coordIndex], properties, options);
    case "Polygon":
      if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
      if (coordIndex < 0)
        coordIndex = coords[geometryIndex].length + coordIndex;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(coords[geometryIndex][coordIndex], properties, options);
    case "MultiLineString":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (coordIndex < 0)
        coordIndex = coords[multiFeatureIndex].length + coordIndex;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(coords[multiFeatureIndex][coordIndex], properties, options);
    case "MultiPolygon":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (geometryIndex < 0)
        geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
      if (coordIndex < 0)
        coordIndex =
          coords[multiFeatureIndex][geometryIndex].length - coordIndex;
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.point)(
        coords[multiFeatureIndex][geometryIndex][coordIndex],
        properties,
        options
      );
  }
  throw new Error("geojson is invalid");
}




/***/ }),

/***/ "./node_modules/@turf/polygon-to-line/dist/es/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@turf/polygon-to-line/dist/es/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "coordsToLine": () => (/* binding */ coordsToLine),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "multiPolygonToLine": () => (/* binding */ multiPolygonToLine),
/* harmony export */   "polygonToLine": () => (/* binding */ polygonToLine)
/* harmony export */ });
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");
/* harmony import */ var _turf_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/invariant */ "./node_modules/@turf/invariant/dist/es/index.js");


/**
 * Converts a {@link Polygon} to {@link LineString|(Multi)LineString} or {@link MultiPolygon} to a
 * {@link FeatureCollection} of {@link LineString|(Multi)LineString}.
 *
 * @name polygonToLine
 * @param {Feature<Polygon|MultiPolygon>} poly Feature to convert
 * @param {Object} [options={}] Optional parameters
 * @param {Object} [options.properties={}] translates GeoJSON properties to Feature
 * @returns {FeatureCollection|Feature<LineString|MultiLinestring>} converted (Multi)Polygon to (Multi)LineString
 * @example
 * var poly = turf.polygon([[[125, -30], [145, -30], [145, -20], [125, -20], [125, -30]]]);
 *
 * var line = turf.polygonToLine(poly);
 *
 * //addToMap
 * var addToMap = [line];
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(poly, options) {
    if (options === void 0) { options = {}; }
    var geom = (0,_turf_invariant__WEBPACK_IMPORTED_MODULE_1__.getGeom)(poly);
    if (!options.properties && poly.type === "Feature") {
        options.properties = poly.properties;
    }
    switch (geom.type) {
        case "Polygon":
            return polygonToLine(geom, options);
        case "MultiPolygon":
            return multiPolygonToLine(geom, options);
        default:
            throw new Error("invalid poly");
    }
}
/**
 * @private
 */
function polygonToLine(poly, options) {
    if (options === void 0) { options = {}; }
    var geom = (0,_turf_invariant__WEBPACK_IMPORTED_MODULE_1__.getGeom)(poly);
    var coords = geom.coordinates;
    var properties = options.properties
        ? options.properties
        : poly.type === "Feature"
            ? poly.properties
            : {};
    return coordsToLine(coords, properties);
}
/**
 * @private
 */
function multiPolygonToLine(multiPoly, options) {
    if (options === void 0) { options = {}; }
    var geom = (0,_turf_invariant__WEBPACK_IMPORTED_MODULE_1__.getGeom)(multiPoly);
    var coords = geom.coordinates;
    var properties = options.properties
        ? options.properties
        : multiPoly.type === "Feature"
            ? multiPoly.properties
            : {};
    var lines = [];
    coords.forEach(function (coord) {
        lines.push(coordsToLine(coord, properties));
    });
    return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.featureCollection)(lines);
}
/**
 * @private
 */
function coordsToLine(coords, properties) {
    if (coords.length > 1) {
        return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.multiLineString)(coords, properties);
    }
    return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_0__.lineString)(coords[0], properties);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./src/leaflet.trace.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons */ "./src/icons.js");
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");
/* harmony import */ var _turf_boolean_intersects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @turf/boolean-intersects */ "./node_modules/@turf/boolean-intersects/dist/es/index.js");





/**
 * @class L.Draw.Trace
 * @aka Draw.Trace
 * @inherits L.Draw.Trace
 */
L.Draw.Trace = L.Draw.Polyline.extend({
  statics: {
    TYPE: "trace",
  },
  //TODO i only want to edit shapeOptions, the rest need not be copied over
  options: {
    allowIntersection: true,
    repeatMode: false,
    drawError: {
      color: "#b00b00",
      timeout: 2500,
    },
    icon: new L.DivIcon({
      iconSize: new L.Point(8, 8),
      className: "leaflet-div-icon leaflet-editing-icon",
    }),
    touchIcon: new L.DivIcon({
      iconSize: new L.Point(20, 20),
      className: "leaflet-div-icon leaflet-editing-icon leaflet-touch-icon",
    }),
    guidelineDistance: 20,
    maxGuideLineLength: 4000,
    shapeOptions: {
      stroke: true,
      color: "red",
      weight: 4,
      opacity: 0.5,
      fill: false,
      clickable: true,
    },
    metric: true, // Whether to use the metric measurement system or imperial
    feet: true, // When not metric, to use feet instead of yards for display.
    nautic: false, // When not metric, not feet use nautic mile for display
    zIndexOffset: 2000, // This should be > than the highest z-index any map layers
    factor: 1, // To change distance calculation
    maxPoints: 0, // Once this number of points are placed, finish shape
  },
  // @method initialize(): void
  initialize: function (map, options) {
    L.Draw.Polyline.prototype.initialize.call(this, map, options);
    this.type = L.Draw.Trace.TYPE;
    this.options.drawError.message = "You must draw over the selected line.";
    //TODO: Not sure if this ill interfere with other polyline drawing
  },

  addHooks: function () {
    L.Draw.Polyline.prototype.addHooks.call(this);
    this.almostLatLng = false;

    this._map
      .on("almost:move", this._almostMove, this)
      .on("almost:out", this._almostOut, this);

    //TODO: sort how to store layer id and select more nicely here
    let s;
    this._map.eachLayer(function (layer) {
      if (layer.options.name && layer.options.name == "selected") {
        s = layer;
      }
    });
    this.selected = s;
    this.lineType = s.options.lineType;
    if (this.lineType == "MultiLineString") {
      this.getSegments(s);
    }
  },
  getSegments: function (s) {
    this.segments = s.getLatLngs().map((ll) => L.polyline(ll));
  },
  removeHooks: function () {
    L.Draw.Polygon.prototype.removeHooks.call(this);
    delete this.selected;
    delete this.almostLatLng;
    delete this.startRatio;
    delete this.linestart;
    delete this._clickHandled;
    delete this._disableMarkers;
    delete this.segments;
    delete this.closest;
    delete this.lineType;
    this._map
      .off("almost:move", this._almostMove, this)
      .off("almost:out", this._almostOut, this);
  },
  _almostOut: function (e) {
    this.almostLatLng = false;
  },
  _almostMove: function (e) {
    this.almostLatLng = e.latlng;
  },
  // @method addVertex(): void
  // Add a vertex to the end of the polyline
  addVertex: function (latlng) {
    const markersLength = this._markers.length;

    // markersLength must be greater than or equal to 2 before intersections can occur && must have latlng from drawing along selected
    if (
      (markersLength >= 2 &&
        !this.options.allowIntersection &&
        this._poly.newLatLngIntersects(latlng)) ||
      !latlng
    ) {
      this._showErrorTooltip();
      return;
    } else if (this._errorShown) {
      this._hideErrorTooltip();
    } else {
      //get the line ratio of the current point, and generate all points needed to draw line
      const endRatio = L.GeometryUtil.locateOnLine(
        this._map,
        this.closest,
        this.almostLatLng
      );
      const extraction = L.GeometryUtil.extract(
        this._map,
        this.closest,
        this.startRatio,
        endRatio
      );

      this._markers = extraction.map((e) => this._createMarker(e)); //create new marker list, which is added to the map
      this._poly.setLatLngs(extraction); //set the points of the line

      if (this._poly.getLatLngs().length === 2) {
        this._map.addLayer(this._poly);
      }

      this._vertexChanged(latlng, true);
    }
  },
  _onMouseMove: function (e) {
    L.Draw.Polyline.prototype._onMouseMove.call(this, e);
    //add a vertex on mouse move if slready drawing started
    if (this.lineStart) {
      this.addVertex(this.almostLatLng);
    }
  },
  _onMouseDown: function (e) {
    if (
      !this._clickHandled &&
      !this._touchHandled &&
      !this._disableMarkers &&
      this.almostLatLng != false
    ) {
      this._map.dragging.disable();
      this._onMouseMove(e);
      this._clickHandled = true;
      this._disableNewMarkers();
      this.lineStart = true;
      this.closest = this._setClosest();
      this.startRatio = L.GeometryUtil.locateOnLine(
        this._map,
        this.closest,
        this.almostLatLng
      );
      this._startPoint.call(this, this.almostLatLng.lng, this.almostLatLng.lat);
    }
  },
  _latlngToArray: function (lls) {
    if (Array.isArray(lls)) return lls.map((ll) => this._latlngToArray(ll));
    else return [lls.lng, lls.lat];
  },
  _setClosest: function () {
    if (this.lineType == "LineString") {
      return this.selected;
    } else {
      return L.GeometryUtil.closestLayer(
        this._map,
        this.segments,
        this.almostLatLng
      ).layer;
    }
  },

  _onMouseUp: function (e) {
    L.Draw.Polyline.prototype._onMouseUp.call(this, e);
    this._map.dragging.enable();
    this.lineStart = false;
  },

  //TODO: this function is an absolute mess and i need to address it
  _endPoint: function (e) {
    if (this._mouseDownOrigin) {
      this.addVertex(e.latlng);
      this._finishShape();
      //TODO: I disabled all of this and kept the parts of the code that allow the line to end
      // I need to spend more time looking at this to make sure there isn't something here I need, especially in regards to touch scree stuff

      // if (this._mouseDownOrigin) {
      // 	var dragCheckDistance = L.point(clientX, clientY)
      // 		.distanceTo(this._mouseDownOrigin);
      // 	var lastPtDistance = this._calculateFinishDistance(e.latlng);
      // 	if (this.options.maxPoints > 1 && this.options.maxPoints == this._markers.length + 1) {
      // 		this.addVertex(e.latlng);
      // 		this._finishShape();
      // 	} else if (lastPtDistance < 10 && L.Browser.touch) { //TODO: need to keep this in some form for touch screens???
      // 		this._finishShape();
      // 	} else if (Math.abs(dragCheckDistance) < 9 * (window.devicePixelRatio || 1)) {
      // 		this.addVertex(e.latlng);
      // 	}
      // 	this._enableNewMarkers(); // after a short pause, enable new markers
      // }
      this._enableNewMarkers(); // after a short pause, enable new markers
    }
    this._mouseDownOrigin = null;
  },
  _createMarker: function (latlng) {
    var marker = new L.Marker(latlng, {
      icon: this.options.icon,
      zIndexOffset: this.options.zIndexOffset * 2,
    });
    return marker;
  },
  _updateRunningMeasure: function (latlng, added) {
    var markersLength = this._markers.length,
      previousMarkerIndex,
      distance;

    if (this._markers.length === 1) {
      this._measurementRunningTotal = 0;
    } else {
      previousMarkerIndex = markersLength - (added ? 2 : 1);

      // Calculate the distance based on the version
      if (L.GeometryUtil.isVersion07x()) {
        distance =
          latlng.distanceTo(this._markers[previousMarkerIndex].getLatLng()) *
          (this.options.factor || 1);
      } else {
        distance =
          this._map.distance(
            latlng,
            this._markers[previousMarkerIndex].getLatLng()
          ) * (this.options.factor || 1);
      }

      this._measurementRunningTotal += distance * (added ? 1 : -1);
    }
  },
});

/**
 * @class L.Draw.Select
 * @aka Draw.Select
 * @inherits L.Draw.Rectangle
 */
L.Draw.Select = L.Draw.Rectangle.extend({
  statics: {
    TYPE: "select",
  },

  initialize: function (map, options) {
    // Save the type so super can fire, need to do this as cannot do this.TYPE :(
    L.Draw.Rectangle.prototype.initialize.call(this, map, options);
    this._map = map;
    this._initialLabelText = "Click and drag to select a line.";

    this.type = L.Draw.Select.TYPE;
  },

  // @method addHooks(): void
  // Add listener hooks to this handler.
  addHooks: function () {
    L.Draw.Rectangle.prototype.addHooks.call(this);
    //TODO: make more elegant if i can
    let s;
    this._map.eachLayer(function (layer) {
      if (layer.options.name && layer.options.name == "selected") {
        s = layer;
      }
    });
    this.selected = s;

    // this.selectedItem = new L.FeatureGroup().addTo(this._map);
    this._map.on(L.Draw.Event.CREATED, this._created, this);
  },
  enableSelect: function () {
    const button = document.getElementsByClassName("trace-line")[0];
    button.onClick = null;
    button.className = "trace-line leaflet-toolbar-icon";
  },

  removeHooks: function () {
    L.Draw.Rectangle.prototype.removeHooks.call(this);
    delete this.selected;
    this._map.off(L.Draw.Event.CREATED, this._created, this);
  },
  _latlngToArray: function (lls) {
    if (Array.isArray(lls)) return lls.map((ll) => this._latlngToArray(ll));
    else return [lls.lng, lls.lat];
    // });
  },

  _created: function (e) {
    //create turfjs compatible feature from drawn rectangle
    const latlngs = this._latlngToArray(e.layer.getLatLngs());
    latlngs[0].push(latlngs[0][0]); //add first pair to back to satisfy turf.js

    const selectPoly = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_1__.polygon)(latlngs);
    //search map for a selectable layer
    this._map.eachLayer((layer) => {
      if (layer.options.selectable) {
        this._manageSelect(selectPoly, layer);
      }
    });
  },

  //run query to select feature on rectangle draw
  _manageSelect: function (rect, selectable) {
    if (this.selected) {
      this._map.almostOver.removeLayer(this.selected);
      this._map.removeLayer(this.selected);
    }
    let selected;

    selectable.eachLayer((layer) => {
      let line = this._grabTurfLine(layer);

      if (line) {
        const intersect = (0,_turf_boolean_intersects__WEBPACK_IMPORTED_MODULE_2__["default"])(rect, line);
        if (intersect) {
          selected = layer;
        }
      }
    });
    if (selected) {
      this._drawSelect(selected);
    }
  },
  //convert layer into a turf line type
  _grabTurfLine: function (layer) {
    const lineType = layer.feature.geometry.type;
    const latlngs = this._latlngToArray(layer.getLatLngs());
    if (lineType == "LineString") {
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_1__.lineString)(latlngs);
    } else if (lineType == "MultiLineString") {
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_1__.multiLineString)(latlngs);
    }
    return _icons__WEBPACK_IMPORTED_MODULE_0__.line;
  },

  _drawSelect: function (selected) {
    let properties = {};
    if (selected.feature.properties) {
      properties = selected.feature.properties;
    }
    this.selected = L.polyline(selected.getLatLngs(), {
      weight: 4,
      color: "gold",
      name: "selected",
      lineType: selected.feature.geometry.type,
      properties: properties,
    }).addTo(this._map);
    this._map.addLayer(this.selected);
    this._map.almostOver.addLayer(this.selected);
    this.enableSelect();
  },
});

//see if i can run disable select elsewhere
L.Toolbar2.DrawAction.CancelTrace = L.Toolbar2.DrawAction.Cancel.extend({
  initialize: function () {
    disableSelect(); //diable select on draw button here because this is the first place where it's alrady initalized
    L.Toolbar2.DrawAction.Cancel.prototype.initialize.call(this);
  },
});

L.Toolbar2.DrawAction.Trace = L.Toolbar2.DrawAction.fromHandler(
  L.Draw.Trace,
  {
    className: "leaflet-draw-draw-polyline",
    tooltip: L.drawLocal.draw.toolbar.buttons.polyline,
  },
  new L.Toolbar2({ actions: [L.Toolbar2.DrawAction.CancelTrace] })
).extend({
  options: {
    toolbarIcon: {
      className: "trace-line",
      html: _icons__WEBPACK_IMPORTED_MODULE_0__.line,
      tooltip: "Draw a line",
    },
  },
});

L.Toolbar2.DrawAction.Select = L.Toolbar2.DrawAction.fromHandler(
  L.Draw.Select,
  {
    className: "leaflet-draw-draw-rectangle",
    tooltip: L.drawLocal.draw.toolbar.buttons.rectangle,
  },
  new L.Toolbar2({ actions: [L.Toolbar2.DrawAction.Cancel] })
).extend({
  options: {
    toolbarIcon: {
      html: _icons__WEBPACK_IMPORTED_MODULE_0__.select,
      tooltip: "Select a line",
    },
  },
});

L.Toolbar2.DrawAction.RemoveSelect = L.Toolbar2.Action.extend({
  options: {
    toolbarIcon: {
      html: _icons__WEBPACK_IMPORTED_MODULE_0__.unselect,
      tooltip: "Un-select the line",
    },
  },
  initialize: function (map) {
    this._map = map;

    L.Toolbar2.Action.prototype.initialize.call(this);
  },

  addHooks: function () {
    let s;
    this._map.eachLayer(function (layer) {
      if (layer.options.name && layer.options.name == "selected") {
        s = layer;
      }
    });
    this.selected = s;

    if (this.selected) {
      this._map.almostOver.removeLayer(this.selected);
      this._map.removeLayer(this.selected);
      disableSelect();
    }
  },
});

L.Toolbar2.Trace = L.Toolbar2.Control.extend({
  options: {
    actions: [
      L.Toolbar2.DrawAction.Select,
      L.Toolbar2.DrawAction.RemoveSelect,
      L.Toolbar2.DrawAction.Trace
    ],
  },
});

const disableSelect = () => {
  const button = document.getElementsByClassName("trace-line")[0];

  // disable button
  button.onClick = "preventEventDefault(); return false";
  button.className = "trace-line leaflet-toolbar-icon draw-control-disabled";
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0U7QUFDcEUseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG1EQUFtRDtBQUMvRDtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBLHVCQUF1QixzREFBUTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixvRUFBaUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHlEQUFjO0FBQzNCLE1BQU07QUFDTixhQUFhLDhEQUFtQjtBQUNoQztBQUNBLFdBQVcsd0NBQUk7QUFDZixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxtQkFBbUIsOENBQThDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx3Q0FBSTtBQUNoQjtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxtQkFBbUIseUNBQXlDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLFlBQVksMENBQU07QUFDbEI7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNENBQVE7QUFDcEI7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL2Jib3gvZGlzdC9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL2hlbHBlcnMvZGlzdC9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL21ldGEvZGlzdC9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL2dlb2pzb24tcmJ1c2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL25vZGVfbW9kdWxlcy9yYnVzaC9yYnVzaC5taW4uanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL3NyYy9pY29ucy5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL2Jvb2xlYW4tZGlzam9pbnQvZGlzdC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL2Jvb2xlYW4taW50ZXJzZWN0cy9kaXN0L2VzL2luZGV4LmpzIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2UvLi9ub2RlX21vZHVsZXMvQHR1cmYvYm9vbGVhbi1wb2ludC1pbi1wb2x5Z29uL2Rpc3QvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL25vZGVfbW9kdWxlcy9AdHVyZi9oZWxwZXJzL2Rpc3QvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL25vZGVfbW9kdWxlcy9AdHVyZi9pbnZhcmlhbnQvZGlzdC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL2xpbmUtaW50ZXJzZWN0L2Rpc3QvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL25vZGVfbW9kdWxlcy9AdHVyZi9saW5lLXNlZ21lbnQvZGlzdC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL21ldGEvZGlzdC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL3BvbHlnb24tdG8tbGluZS9kaXN0L2VzL2luZGV4LmpzIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vc3JjL2xlYWZsZXQudHJhY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbWV0YV8xID0gcmVxdWlyZShcIkB0dXJmL21ldGFcIik7XG4vKipcbiAqIFRha2VzIGEgc2V0IG9mIGZlYXR1cmVzLCBjYWxjdWxhdGVzIHRoZSBiYm94IG9mIGFsbCBpbnB1dCBmZWF0dXJlcywgYW5kIHJldHVybnMgYSBib3VuZGluZyBib3guXG4gKlxuICogQG5hbWUgYmJveFxuICogQHBhcmFtIHtHZW9KU09OfSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHJldHVybnMge0JCb3h9IGJib3ggZXh0ZW50IGluIFttaW5YLCBtaW5ZLCBtYXhYLCBtYXhZXSBvcmRlclxuICogQGV4YW1wbGVcbiAqIHZhciBsaW5lID0gdHVyZi5saW5lU3RyaW5nKFtbLTc0LCA0MF0sIFstNzgsIDQyXSwgWy04MiwgMzVdXSk7XG4gKiB2YXIgYmJveCA9IHR1cmYuYmJveChsaW5lKTtcbiAqIHZhciBiYm94UG9seWdvbiA9IHR1cmYuYmJveFBvbHlnb24oYmJveCk7XG4gKlxuICogLy9hZGRUb01hcFxuICogdmFyIGFkZFRvTWFwID0gW2xpbmUsIGJib3hQb2x5Z29uXVxuICovXG5mdW5jdGlvbiBiYm94KGdlb2pzb24pIHtcbiAgICB2YXIgcmVzdWx0ID0gW0luZmluaXR5LCBJbmZpbml0eSwgLUluZmluaXR5LCAtSW5maW5pdHldO1xuICAgIG1ldGFfMS5jb29yZEVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGNvb3JkKSB7XG4gICAgICAgIGlmIChyZXN1bHRbMF0gPiBjb29yZFswXSkge1xuICAgICAgICAgICAgcmVzdWx0WzBdID0gY29vcmRbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdFsxXSA+IGNvb3JkWzFdKSB7XG4gICAgICAgICAgICByZXN1bHRbMV0gPSBjb29yZFsxXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0WzJdIDwgY29vcmRbMF0pIHtcbiAgICAgICAgICAgIHJlc3VsdFsyXSA9IGNvb3JkWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHRbM10gPCBjb29yZFsxXSkge1xuICAgICAgICAgICAgcmVzdWx0WzNdID0gY29vcmRbMV07XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuYmJveFtcImRlZmF1bHRcIl0gPSBiYm94O1xuZXhwb3J0cy5kZWZhdWx0ID0gYmJveDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBAbW9kdWxlIGhlbHBlcnNcbiAqL1xuLyoqXG4gKiBFYXJ0aCBSYWRpdXMgdXNlZCB3aXRoIHRoZSBIYXJ2ZXNpbmUgZm9ybXVsYSBhbmQgYXBwcm94aW1hdGVzIHVzaW5nIGEgc3BoZXJpY2FsIChub24tZWxsaXBzb2lkKSBFYXJ0aC5cbiAqXG4gKiBAbWVtYmVyb2YgaGVscGVyc1xuICogQHR5cGUge251bWJlcn1cbiAqL1xuZXhwb3J0cy5lYXJ0aFJhZGl1cyA9IDYzNzEwMDguODtcbi8qKlxuICogVW5pdCBvZiBtZWFzdXJlbWVudCBmYWN0b3JzIHVzaW5nIGEgc3BoZXJpY2FsIChub24tZWxsaXBzb2lkKSBlYXJ0aCByYWRpdXMuXG4gKlxuICogQG1lbWJlcm9mIGhlbHBlcnNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydHMuZmFjdG9ycyA9IHtcbiAgICBjZW50aW1ldGVyczogZXhwb3J0cy5lYXJ0aFJhZGl1cyAqIDEwMCxcbiAgICBjZW50aW1ldHJlczogZXhwb3J0cy5lYXJ0aFJhZGl1cyAqIDEwMCxcbiAgICBkZWdyZWVzOiBleHBvcnRzLmVhcnRoUmFkaXVzIC8gMTExMzI1LFxuICAgIGZlZXQ6IGV4cG9ydHMuZWFydGhSYWRpdXMgKiAzLjI4MDg0LFxuICAgIGluY2hlczogZXhwb3J0cy5lYXJ0aFJhZGl1cyAqIDM5LjM3LFxuICAgIGtpbG9tZXRlcnM6IGV4cG9ydHMuZWFydGhSYWRpdXMgLyAxMDAwLFxuICAgIGtpbG9tZXRyZXM6IGV4cG9ydHMuZWFydGhSYWRpdXMgLyAxMDAwLFxuICAgIG1ldGVyczogZXhwb3J0cy5lYXJ0aFJhZGl1cyxcbiAgICBtZXRyZXM6IGV4cG9ydHMuZWFydGhSYWRpdXMsXG4gICAgbWlsZXM6IGV4cG9ydHMuZWFydGhSYWRpdXMgLyAxNjA5LjM0NCxcbiAgICBtaWxsaW1ldGVyczogZXhwb3J0cy5lYXJ0aFJhZGl1cyAqIDEwMDAsXG4gICAgbWlsbGltZXRyZXM6IGV4cG9ydHMuZWFydGhSYWRpdXMgKiAxMDAwLFxuICAgIG5hdXRpY2FsbWlsZXM6IGV4cG9ydHMuZWFydGhSYWRpdXMgLyAxODUyLFxuICAgIHJhZGlhbnM6IDEsXG4gICAgeWFyZHM6IGV4cG9ydHMuZWFydGhSYWRpdXMgKiAxLjA5MzYsXG59O1xuLyoqXG4gKiBVbml0cyBvZiBtZWFzdXJlbWVudCBmYWN0b3JzIGJhc2VkIG9uIDEgbWV0ZXIuXG4gKlxuICogQG1lbWJlcm9mIGhlbHBlcnNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydHMudW5pdHNGYWN0b3JzID0ge1xuICAgIGNlbnRpbWV0ZXJzOiAxMDAsXG4gICAgY2VudGltZXRyZXM6IDEwMCxcbiAgICBkZWdyZWVzOiAxIC8gMTExMzI1LFxuICAgIGZlZXQ6IDMuMjgwODQsXG4gICAgaW5jaGVzOiAzOS4zNyxcbiAgICBraWxvbWV0ZXJzOiAxIC8gMTAwMCxcbiAgICBraWxvbWV0cmVzOiAxIC8gMTAwMCxcbiAgICBtZXRlcnM6IDEsXG4gICAgbWV0cmVzOiAxLFxuICAgIG1pbGVzOiAxIC8gMTYwOS4zNDQsXG4gICAgbWlsbGltZXRlcnM6IDEwMDAsXG4gICAgbWlsbGltZXRyZXM6IDEwMDAsXG4gICAgbmF1dGljYWxtaWxlczogMSAvIDE4NTIsXG4gICAgcmFkaWFuczogMSAvIGV4cG9ydHMuZWFydGhSYWRpdXMsXG4gICAgeWFyZHM6IDEuMDkzNjEzMyxcbn07XG4vKipcbiAqIEFyZWEgb2YgbWVhc3VyZW1lbnQgZmFjdG9ycyBiYXNlZCBvbiAxIHNxdWFyZSBtZXRlci5cbiAqXG4gKiBAbWVtYmVyb2YgaGVscGVyc1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0cy5hcmVhRmFjdG9ycyA9IHtcbiAgICBhY3JlczogMC4wMDAyNDcxMDUsXG4gICAgY2VudGltZXRlcnM6IDEwMDAwLFxuICAgIGNlbnRpbWV0cmVzOiAxMDAwMCxcbiAgICBmZWV0OiAxMC43NjM5MTA0MTcsXG4gICAgaGVjdGFyZXM6IDAuMDAwMSxcbiAgICBpbmNoZXM6IDE1NTAuMDAzMTAwMDA2LFxuICAgIGtpbG9tZXRlcnM6IDAuMDAwMDAxLFxuICAgIGtpbG9tZXRyZXM6IDAuMDAwMDAxLFxuICAgIG1ldGVyczogMSxcbiAgICBtZXRyZXM6IDEsXG4gICAgbWlsZXM6IDMuODZlLTcsXG4gICAgbWlsbGltZXRlcnM6IDEwMDAwMDAsXG4gICAgbWlsbGltZXRyZXM6IDEwMDAwMDAsXG4gICAgeWFyZHM6IDEuMTk1OTkwMDQ2LFxufTtcbi8qKlxuICogV3JhcHMgYSBHZW9KU09OIHtAbGluayBHZW9tZXRyeX0gaW4gYSBHZW9KU09OIHtAbGluayBGZWF0dXJlfS5cbiAqXG4gKiBAbmFtZSBmZWF0dXJlXG4gKiBAcGFyYW0ge0dlb21ldHJ5fSBnZW9tZXRyeSBpbnB1dCBnZW9tZXRyeVxuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlfSBhIEdlb0pTT04gRmVhdHVyZVxuICogQGV4YW1wbGVcbiAqIHZhciBnZW9tZXRyeSA9IHtcbiAqICAgXCJ0eXBlXCI6IFwiUG9pbnRcIixcbiAqICAgXCJjb29yZGluYXRlc1wiOiBbMTEwLCA1MF1cbiAqIH07XG4gKlxuICogdmFyIGZlYXR1cmUgPSB0dXJmLmZlYXR1cmUoZ2VvbWV0cnkpO1xuICpcbiAqIC8vPWZlYXR1cmVcbiAqL1xuZnVuY3Rpb24gZmVhdHVyZShnZW9tLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZmVhdCA9IHsgdHlwZTogXCJGZWF0dXJlXCIgfTtcbiAgICBpZiAob3B0aW9ucy5pZCA9PT0gMCB8fCBvcHRpb25zLmlkKSB7XG4gICAgICAgIGZlYXQuaWQgPSBvcHRpb25zLmlkO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5iYm94KSB7XG4gICAgICAgIGZlYXQuYmJveCA9IG9wdGlvbnMuYmJveDtcbiAgICB9XG4gICAgZmVhdC5wcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCB7fTtcbiAgICBmZWF0Lmdlb21ldHJ5ID0gZ2VvbTtcbiAgICByZXR1cm4gZmVhdDtcbn1cbmV4cG9ydHMuZmVhdHVyZSA9IGZlYXR1cmU7XG4vKipcbiAqIENyZWF0ZXMgYSBHZW9KU09OIHtAbGluayBHZW9tZXRyeX0gZnJvbSBhIEdlb21ldHJ5IHN0cmluZyB0eXBlICYgY29vcmRpbmF0ZXMuXG4gKiBGb3IgR2VvbWV0cnlDb2xsZWN0aW9uIHR5cGUgdXNlIGBoZWxwZXJzLmdlb21ldHJ5Q29sbGVjdGlvbmBcbiAqXG4gKiBAbmFtZSBnZW9tZXRyeVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgR2VvbWV0cnkgVHlwZVxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBjb29yZGluYXRlcyBDb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcmV0dXJucyB7R2VvbWV0cnl9IGEgR2VvSlNPTiBHZW9tZXRyeVxuICogQGV4YW1wbGVcbiAqIHZhciB0eXBlID0gXCJQb2ludFwiO1xuICogdmFyIGNvb3JkaW5hdGVzID0gWzExMCwgNTBdO1xuICogdmFyIGdlb21ldHJ5ID0gdHVyZi5nZW9tZXRyeSh0eXBlLCBjb29yZGluYXRlcyk7XG4gKiAvLyA9PiBnZW9tZXRyeVxuICovXG5mdW5jdGlvbiBnZW9tZXRyeSh0eXBlLCBjb29yZGluYXRlcywgX29wdGlvbnMpIHtcbiAgICBpZiAoX29wdGlvbnMgPT09IHZvaWQgMCkgeyBfb3B0aW9ucyA9IHt9OyB9XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgICAgICAgcmV0dXJuIHBvaW50KGNvb3JkaW5hdGVzKS5nZW9tZXRyeTtcbiAgICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgICAgIHJldHVybiBsaW5lU3RyaW5nKGNvb3JkaW5hdGVzKS5nZW9tZXRyeTtcbiAgICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgICAgIHJldHVybiBwb2x5Z29uKGNvb3JkaW5hdGVzKS5nZW9tZXRyeTtcbiAgICAgICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgICAgICAgIHJldHVybiBtdWx0aVBvaW50KGNvb3JkaW5hdGVzKS5nZW9tZXRyeTtcbiAgICAgICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgICAgICAgICAgcmV0dXJuIG11bHRpTGluZVN0cmluZyhjb29yZGluYXRlcykuZ2VvbWV0cnk7XG4gICAgICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgICAgICAgIHJldHVybiBtdWx0aVBvbHlnb24oY29vcmRpbmF0ZXMpLmdlb21ldHJ5O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHR5cGUgKyBcIiBpcyBpbnZhbGlkXCIpO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2VvbWV0cnkgPSBnZW9tZXRyeTtcbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBQb2ludH0ge0BsaW5rIEZlYXR1cmV9IGZyb20gYSBQb3NpdGlvbi5cbiAqXG4gKiBAbmFtZSBwb2ludFxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBjb29yZGluYXRlcyBsb25naXR1ZGUsIGxhdGl0dWRlIHBvc2l0aW9uIChlYWNoIGluIGRlY2ltYWwgZGVncmVlcylcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxQb2ludD59IGEgUG9pbnQgZmVhdHVyZVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2ludCA9IHR1cmYucG9pbnQoWy03NS4zNDMsIDM5Ljk4NF0pO1xuICpcbiAqIC8vPXBvaW50XG4gKi9cbmZ1bmN0aW9uIHBvaW50KGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICBpZiAoIWNvb3JkaW5hdGVzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkaW5hdGVzIGlzIHJlcXVpcmVkXCIpO1xuICAgIH1cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29vcmRpbmF0ZXMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkaW5hdGVzIG11c3QgYmUgYW4gQXJyYXlcIik7XG4gICAgfVxuICAgIGlmIChjb29yZGluYXRlcy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkaW5hdGVzIG11c3QgYmUgYXQgbGVhc3QgMiBudW1iZXJzIGxvbmdcIik7XG4gICAgfVxuICAgIGlmICghaXNOdW1iZXIoY29vcmRpbmF0ZXNbMF0pIHx8ICFpc051bWJlcihjb29yZGluYXRlc1sxXSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29vcmRpbmF0ZXMgbXVzdCBjb250YWluIG51bWJlcnNcIik7XG4gICAgfVxuICAgIHZhciBnZW9tID0ge1xuICAgICAgICB0eXBlOiBcIlBvaW50XCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5wb2ludCA9IHBvaW50O1xuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIFBvaW50fSB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259IGZyb20gYW4gQXJyYXkgb2YgUG9pbnQgY29vcmRpbmF0ZXMuXG4gKlxuICogQG5hbWUgcG9pbnRzXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBQb2ludHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gVHJhbnNsYXRlIHRoZXNlIHByb3BlcnRpZXMgdG8gZWFjaCBGZWF0dXJlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdXG4gKiBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbjxQb2ludD59IFBvaW50IEZlYXR1cmVcbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9pbnRzID0gdHVyZi5wb2ludHMoW1xuICogICBbLTc1LCAzOV0sXG4gKiAgIFstODAsIDQ1XSxcbiAqICAgWy03OCwgNTBdXG4gKiBdKTtcbiAqXG4gKiAvLz1wb2ludHNcbiAqL1xuZnVuY3Rpb24gcG9pbnRzKGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24oY29vcmRpbmF0ZXMubWFwKGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICAgICAgcmV0dXJuIHBvaW50KGNvb3JkcywgcHJvcGVydGllcyk7XG4gICAgfSksIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5wb2ludHMgPSBwb2ludHM7XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgUG9seWdvbn0ge0BsaW5rIEZlYXR1cmV9IGZyb20gYW4gQXJyYXkgb2YgTGluZWFyUmluZ3MuXG4gKlxuICogQG5hbWUgcG9seWdvblxuICogQHBhcmFtIHtBcnJheTxBcnJheTxBcnJheTxudW1iZXI+Pj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIExpbmVhclJpbmdzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8UG9seWdvbj59IFBvbHlnb24gRmVhdHVyZVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2x5Z29uID0gdHVyZi5wb2x5Z29uKFtbWy01LCA1Ml0sIFstNCwgNTZdLCBbLTIsIDUxXSwgWy03LCA1NF0sIFstNSwgNTJdXV0sIHsgbmFtZTogJ3BvbHkxJyB9KTtcbiAqXG4gKiAvLz1wb2x5Z29uXG4gKi9cbmZ1bmN0aW9uIHBvbHlnb24oY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIGZvciAodmFyIF9pID0gMCwgY29vcmRpbmF0ZXNfMSA9IGNvb3JkaW5hdGVzOyBfaSA8IGNvb3JkaW5hdGVzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciByaW5nID0gY29vcmRpbmF0ZXNfMVtfaV07XG4gICAgICAgIGlmIChyaW5nLmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVhY2ggTGluZWFyUmluZyBvZiBhIFBvbHlnb24gbXVzdCBoYXZlIDQgb3IgbW9yZSBQb3NpdGlvbnMuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmluZ1tyaW5nLmxlbmd0aCAtIDFdLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAvLyBDaGVjayBpZiBmaXJzdCBwb2ludCBvZiBQb2x5Z29uIGNvbnRhaW5zIHR3byBudW1iZXJzXG4gICAgICAgICAgICBpZiAocmluZ1tyaW5nLmxlbmd0aCAtIDFdW2pdICE9PSByaW5nWzBdW2pdKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmlyc3QgYW5kIGxhc3QgUG9zaXRpb24gYXJlIG5vdCBlcXVpdmFsZW50LlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogXCJQb2x5Z29uXCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5wb2x5Z29uID0gcG9seWdvbjtcbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBQb2x5Z29ufSB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259IGZyb20gYW4gQXJyYXkgb2YgUG9seWdvbiBjb29yZGluYXRlcy5cbiAqXG4gKiBAbmFtZSBwb2x5Z29uc1xuICogQHBhcmFtIHtBcnJheTxBcnJheTxBcnJheTxBcnJheTxudW1iZXI+Pj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBQb2x5Z29uIGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbjxQb2x5Z29uPn0gUG9seWdvbiBGZWF0dXJlQ29sbGVjdGlvblxuICogQGV4YW1wbGVcbiAqIHZhciBwb2x5Z29ucyA9IHR1cmYucG9seWdvbnMoW1xuICogICBbW1stNSwgNTJdLCBbLTQsIDU2XSwgWy0yLCA1MV0sIFstNywgNTRdLCBbLTUsIDUyXV1dLFxuICogICBbW1stMTUsIDQyXSwgWy0xNCwgNDZdLCBbLTEyLCA0MV0sIFstMTcsIDQ0XSwgWy0xNSwgNDJdXV0sXG4gKiBdKTtcbiAqXG4gKiAvLz1wb2x5Z29uc1xuICovXG5mdW5jdGlvbiBwb2x5Z29ucyhjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKGNvb3JkaW5hdGVzLm1hcChmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgICAgIHJldHVybiBwb2x5Z29uKGNvb3JkcywgcHJvcGVydGllcyk7XG4gICAgfSksIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5wb2x5Z29ucyA9IHBvbHlnb25zO1xuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIExpbmVTdHJpbmd9IHtAbGluayBGZWF0dXJlfSBmcm9tIGFuIEFycmF5IG9mIFBvc2l0aW9ucy5cbiAqXG4gKiBAbmFtZSBsaW5lU3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBQb3NpdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxMaW5lU3RyaW5nPn0gTGluZVN0cmluZyBGZWF0dXJlXG4gKiBAZXhhbXBsZVxuICogdmFyIGxpbmVzdHJpbmcxID0gdHVyZi5saW5lU3RyaW5nKFtbLTI0LCA2M10sIFstMjMsIDYwXSwgWy0yNSwgNjVdLCBbLTIwLCA2OV1dLCB7bmFtZTogJ2xpbmUgMSd9KTtcbiAqIHZhciBsaW5lc3RyaW5nMiA9IHR1cmYubGluZVN0cmluZyhbWy0xNCwgNDNdLCBbLTEzLCA0MF0sIFstMTUsIDQ1XSwgWy0xMCwgNDldXSwge25hbWU6ICdsaW5lIDInfSk7XG4gKlxuICogLy89bGluZXN0cmluZzFcbiAqIC8vPWxpbmVzdHJpbmcyXG4gKi9cbmZ1bmN0aW9uIGxpbmVTdHJpbmcoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIGlmIChjb29yZGluYXRlcy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkaW5hdGVzIG11c3QgYmUgYW4gYXJyYXkgb2YgdHdvIG9yIG1vcmUgcG9zaXRpb25zXCIpO1xuICAgIH1cbiAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogXCJMaW5lU3RyaW5nXCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5saW5lU3RyaW5nID0gbGluZVN0cmluZztcbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBMaW5lU3RyaW5nfSB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259IGZyb20gYW4gQXJyYXkgb2YgTGluZVN0cmluZyBjb29yZGluYXRlcy5cbiAqXG4gKiBAbmFtZSBsaW5lU3RyaW5nc1xuICogQHBhcmFtIHtBcnJheTxBcnJheTxBcnJheTxudW1iZXI+Pj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIExpbmVhclJpbmdzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF1cbiAqIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlQ29sbGVjdGlvblxuICogQHJldHVybnMge0ZlYXR1cmVDb2xsZWN0aW9uPExpbmVTdHJpbmc+fSBMaW5lU3RyaW5nIEZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAZXhhbXBsZVxuICogdmFyIGxpbmVzdHJpbmdzID0gdHVyZi5saW5lU3RyaW5ncyhbXG4gKiAgIFtbLTI0LCA2M10sIFstMjMsIDYwXSwgWy0yNSwgNjVdLCBbLTIwLCA2OV1dLFxuICogICBbWy0xNCwgNDNdLCBbLTEzLCA0MF0sIFstMTUsIDQ1XSwgWy0xMCwgNDldXVxuICogXSk7XG4gKlxuICogLy89bGluZXN0cmluZ3NcbiAqL1xuZnVuY3Rpb24gbGluZVN0cmluZ3MoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbihjb29yZGluYXRlcy5tYXAoZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICByZXR1cm4gbGluZVN0cmluZyhjb29yZHMsIHByb3BlcnRpZXMpO1xuICAgIH0pLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMubGluZVN0cmluZ3MgPSBsaW5lU3RyaW5ncztcbi8qKlxuICogVGFrZXMgb25lIG9yIG1vcmUge0BsaW5rIEZlYXR1cmV8RmVhdHVyZXN9IGFuZCBjcmVhdGVzIGEge0BsaW5rIEZlYXR1cmVDb2xsZWN0aW9ufS5cbiAqXG4gKiBAbmFtZSBmZWF0dXJlQ29sbGVjdGlvblxuICogQHBhcmFtIHtGZWF0dXJlW119IGZlYXR1cmVzIGlucHV0IGZlYXR1cmVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbn0gRmVhdHVyZUNvbGxlY3Rpb24gb2YgRmVhdHVyZXNcbiAqIEBleGFtcGxlXG4gKiB2YXIgbG9jYXRpb25BID0gdHVyZi5wb2ludChbLTc1LjM0MywgMzkuOTg0XSwge25hbWU6ICdMb2NhdGlvbiBBJ30pO1xuICogdmFyIGxvY2F0aW9uQiA9IHR1cmYucG9pbnQoWy03NS44MzMsIDM5LjI4NF0sIHtuYW1lOiAnTG9jYXRpb24gQid9KTtcbiAqIHZhciBsb2NhdGlvbkMgPSB0dXJmLnBvaW50KFstNzUuNTM0LCAzOS4xMjNdLCB7bmFtZTogJ0xvY2F0aW9uIEMnfSk7XG4gKlxuICogdmFyIGNvbGxlY3Rpb24gPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgbG9jYXRpb25BLFxuICogICBsb2NhdGlvbkIsXG4gKiAgIGxvY2F0aW9uQ1xuICogXSk7XG4gKlxuICogLy89Y29sbGVjdGlvblxuICovXG5mdW5jdGlvbiBmZWF0dXJlQ29sbGVjdGlvbihmZWF0dXJlcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIGZjID0geyB0eXBlOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIgfTtcbiAgICBpZiAob3B0aW9ucy5pZCkge1xuICAgICAgICBmYy5pZCA9IG9wdGlvbnMuaWQ7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmJib3gpIHtcbiAgICAgICAgZmMuYmJveCA9IG9wdGlvbnMuYmJveDtcbiAgICB9XG4gICAgZmMuZmVhdHVyZXMgPSBmZWF0dXJlcztcbiAgICByZXR1cm4gZmM7XG59XG5leHBvcnRzLmZlYXR1cmVDb2xsZWN0aW9uID0gZmVhdHVyZUNvbGxlY3Rpb247XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgRmVhdHVyZTxNdWx0aUxpbmVTdHJpbmc+fSBiYXNlZCBvbiBhXG4gKiBjb29yZGluYXRlIGFycmF5LiBQcm9wZXJ0aWVzIGNhbiBiZSBhZGRlZCBvcHRpb25hbGx5LlxuICpcbiAqIEBuYW1lIG11bHRpTGluZVN0cmluZ1xuICogQHBhcmFtIHtBcnJheTxBcnJheTxBcnJheTxudW1iZXI+Pj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIExpbmVTdHJpbmdzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8TXVsdGlMaW5lU3RyaW5nPn0gYSBNdWx0aUxpbmVTdHJpbmcgZmVhdHVyZVxuICogQHRocm93cyB7RXJyb3J9IGlmIG5vIGNvb3JkaW5hdGVzIGFyZSBwYXNzZWRcbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlMaW5lID0gdHVyZi5tdWx0aUxpbmVTdHJpbmcoW1tbMCwwXSxbMTAsMTBdXV0pO1xuICpcbiAqIC8vPW11bHRpTGluZVxuICovXG5mdW5jdGlvbiBtdWx0aUxpbmVTdHJpbmcoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBnZW9tID0ge1xuICAgICAgICB0eXBlOiBcIk11bHRpTGluZVN0cmluZ1wiLFxuICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZXMsXG4gICAgfTtcbiAgICByZXR1cm4gZmVhdHVyZShnZW9tLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMubXVsdGlMaW5lU3RyaW5nID0gbXVsdGlMaW5lU3RyaW5nO1xuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIEZlYXR1cmU8TXVsdGlQb2ludD59IGJhc2VkIG9uIGFcbiAqIGNvb3JkaW5hdGUgYXJyYXkuIFByb3BlcnRpZXMgY2FuIGJlIGFkZGVkIG9wdGlvbmFsbHkuXG4gKlxuICogQG5hbWUgbXVsdGlQb2ludFxuICogQHBhcmFtIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gY29vcmRpbmF0ZXMgYW4gYXJyYXkgb2YgUG9zaXRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8TXVsdGlQb2ludD59IGEgTXVsdGlQb2ludCBmZWF0dXJlXG4gKiBAdGhyb3dzIHtFcnJvcn0gaWYgbm8gY29vcmRpbmF0ZXMgYXJlIHBhc3NlZFxuICogQGV4YW1wbGVcbiAqIHZhciBtdWx0aVB0ID0gdHVyZi5tdWx0aVBvaW50KFtbMCwwXSxbMTAsMTBdXSk7XG4gKlxuICogLy89bXVsdGlQdFxuICovXG5mdW5jdGlvbiBtdWx0aVBvaW50KGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogXCJNdWx0aVBvaW50XCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5tdWx0aVBvaW50ID0gbXVsdGlQb2ludDtcbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBGZWF0dXJlPE11bHRpUG9seWdvbj59IGJhc2VkIG9uIGFcbiAqIGNvb3JkaW5hdGUgYXJyYXkuIFByb3BlcnRpZXMgY2FuIGJlIGFkZGVkIG9wdGlvbmFsbHkuXG4gKlxuICogQG5hbWUgbXVsdGlQb2x5Z29uXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PEFycmF5PEFycmF5PG51bWJlcj4+Pj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIFBvbHlnb25zXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8TXVsdGlQb2x5Z29uPn0gYSBtdWx0aXBvbHlnb24gZmVhdHVyZVxuICogQHRocm93cyB7RXJyb3J9IGlmIG5vIGNvb3JkaW5hdGVzIGFyZSBwYXNzZWRcbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlQb2x5ID0gdHVyZi5tdWx0aVBvbHlnb24oW1tbWzAsMF0sWzAsMTBdLFsxMCwxMF0sWzEwLDBdLFswLDBdXV1dKTtcbiAqXG4gKiAvLz1tdWx0aVBvbHlcbiAqXG4gKi9cbmZ1bmN0aW9uIG11bHRpUG9seWdvbihjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIGdlb20gPSB7XG4gICAgICAgIHR5cGU6IFwiTXVsdGlQb2x5Z29uXCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5tdWx0aVBvbHlnb24gPSBtdWx0aVBvbHlnb247XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgRmVhdHVyZTxHZW9tZXRyeUNvbGxlY3Rpb24+fSBiYXNlZCBvbiBhXG4gKiBjb29yZGluYXRlIGFycmF5LiBQcm9wZXJ0aWVzIGNhbiBiZSBhZGRlZCBvcHRpb25hbGx5LlxuICpcbiAqIEBuYW1lIGdlb21ldHJ5Q29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheTxHZW9tZXRyeT59IGdlb21ldHJpZXMgYW4gYXJyYXkgb2YgR2VvSlNPTiBHZW9tZXRyaWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8R2VvbWV0cnlDb2xsZWN0aW9uPn0gYSBHZW9KU09OIEdlb21ldHJ5Q29sbGVjdGlvbiBGZWF0dXJlXG4gKiBAZXhhbXBsZVxuICogdmFyIHB0ID0gdHVyZi5nZW9tZXRyeShcIlBvaW50XCIsIFsxMDAsIDBdKTtcbiAqIHZhciBsaW5lID0gdHVyZi5nZW9tZXRyeShcIkxpbmVTdHJpbmdcIiwgW1sxMDEsIDBdLCBbMTAyLCAxXV0pO1xuICogdmFyIGNvbGxlY3Rpb24gPSB0dXJmLmdlb21ldHJ5Q29sbGVjdGlvbihbcHQsIGxpbmVdKTtcbiAqXG4gKiAvLyA9PiBjb2xsZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIGdlb21ldHJ5Q29sbGVjdGlvbihnZW9tZXRyaWVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogXCJHZW9tZXRyeUNvbGxlY3Rpb25cIixcbiAgICAgICAgZ2VvbWV0cmllczogZ2VvbWV0cmllcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5nZW9tZXRyeUNvbGxlY3Rpb24gPSBnZW9tZXRyeUNvbGxlY3Rpb247XG4vKipcbiAqIFJvdW5kIG51bWJlciB0byBwcmVjaXNpb25cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIE51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IFtwcmVjaXNpb249MF0gUHJlY2lzaW9uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSByb3VuZGVkIG51bWJlclxuICogQGV4YW1wbGVcbiAqIHR1cmYucm91bmQoMTIwLjQzMjEpXG4gKiAvLz0xMjBcbiAqXG4gKiB0dXJmLnJvdW5kKDEyMC40MzIxLCAyKVxuICogLy89MTIwLjQzXG4gKi9cbmZ1bmN0aW9uIHJvdW5kKG51bSwgcHJlY2lzaW9uKSB7XG4gICAgaWYgKHByZWNpc2lvbiA9PT0gdm9pZCAwKSB7IHByZWNpc2lvbiA9IDA7IH1cbiAgICBpZiAocHJlY2lzaW9uICYmICEocHJlY2lzaW9uID49IDApKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInByZWNpc2lvbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyXCIpO1xuICAgIH1cbiAgICB2YXIgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24gfHwgMCk7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobnVtICogbXVsdGlwbGllcikgLyBtdWx0aXBsaWVyO1xufVxuZXhwb3J0cy5yb3VuZCA9IHJvdW5kO1xuLyoqXG4gKiBDb252ZXJ0IGEgZGlzdGFuY2UgbWVhc3VyZW1lbnQgKGFzc3VtaW5nIGEgc3BoZXJpY2FsIEVhcnRoKSBmcm9tIHJhZGlhbnMgdG8gYSBtb3JlIGZyaWVuZGx5IHVuaXQuXG4gKiBWYWxpZCB1bml0czogbWlsZXMsIG5hdXRpY2FsbWlsZXMsIGluY2hlcywgeWFyZHMsIG1ldGVycywgbWV0cmVzLCBraWxvbWV0ZXJzLCBjZW50aW1ldGVycywgZmVldFxuICpcbiAqIEBuYW1lIHJhZGlhbnNUb0xlbmd0aFxuICogQHBhcmFtIHtudW1iZXJ9IHJhZGlhbnMgaW4gcmFkaWFucyBhY3Jvc3MgdGhlIHNwaGVyZVxuICogQHBhcmFtIHtzdHJpbmd9IFt1bml0cz1cImtpbG9tZXRlcnNcIl0gY2FuIGJlIGRlZ3JlZXMsIHJhZGlhbnMsIG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRyZXMsXG4gKiBtZXRlcnMsIGtpbG9tZXRyZXMsIGtpbG9tZXRlcnMuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBkaXN0YW5jZVxuICovXG5mdW5jdGlvbiByYWRpYW5zVG9MZW5ndGgocmFkaWFucywgdW5pdHMpIHtcbiAgICBpZiAodW5pdHMgPT09IHZvaWQgMCkgeyB1bml0cyA9IFwia2lsb21ldGVyc1wiOyB9XG4gICAgdmFyIGZhY3RvciA9IGV4cG9ydHMuZmFjdG9yc1t1bml0c107XG4gICAgaWYgKCFmYWN0b3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHVuaXRzICsgXCIgdW5pdHMgaXMgaW52YWxpZFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJhZGlhbnMgKiBmYWN0b3I7XG59XG5leHBvcnRzLnJhZGlhbnNUb0xlbmd0aCA9IHJhZGlhbnNUb0xlbmd0aDtcbi8qKlxuICogQ29udmVydCBhIGRpc3RhbmNlIG1lYXN1cmVtZW50IChhc3N1bWluZyBhIHNwaGVyaWNhbCBFYXJ0aCkgZnJvbSBhIHJlYWwtd29ybGQgdW5pdCBpbnRvIHJhZGlhbnNcbiAqIFZhbGlkIHVuaXRzOiBtaWxlcywgbmF1dGljYWxtaWxlcywgaW5jaGVzLCB5YXJkcywgbWV0ZXJzLCBtZXRyZXMsIGtpbG9tZXRlcnMsIGNlbnRpbWV0ZXJzLCBmZWV0XG4gKlxuICogQG5hbWUgbGVuZ3RoVG9SYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gZGlzdGFuY2UgaW4gcmVhbCB1bml0c1xuICogQHBhcmFtIHtzdHJpbmd9IFt1bml0cz1cImtpbG9tZXRlcnNcIl0gY2FuIGJlIGRlZ3JlZXMsIHJhZGlhbnMsIG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRyZXMsXG4gKiBtZXRlcnMsIGtpbG9tZXRyZXMsIGtpbG9tZXRlcnMuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSByYWRpYW5zXG4gKi9cbmZ1bmN0aW9uIGxlbmd0aFRvUmFkaWFucyhkaXN0YW5jZSwgdW5pdHMpIHtcbiAgICBpZiAodW5pdHMgPT09IHZvaWQgMCkgeyB1bml0cyA9IFwia2lsb21ldGVyc1wiOyB9XG4gICAgdmFyIGZhY3RvciA9IGV4cG9ydHMuZmFjdG9yc1t1bml0c107XG4gICAgaWYgKCFmYWN0b3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHVuaXRzICsgXCIgdW5pdHMgaXMgaW52YWxpZFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGRpc3RhbmNlIC8gZmFjdG9yO1xufVxuZXhwb3J0cy5sZW5ndGhUb1JhZGlhbnMgPSBsZW5ndGhUb1JhZGlhbnM7XG4vKipcbiAqIENvbnZlcnQgYSBkaXN0YW5jZSBtZWFzdXJlbWVudCAoYXNzdW1pbmcgYSBzcGhlcmljYWwgRWFydGgpIGZyb20gYSByZWFsLXdvcmxkIHVuaXQgaW50byBkZWdyZWVzXG4gKiBWYWxpZCB1bml0czogbWlsZXMsIG5hdXRpY2FsbWlsZXMsIGluY2hlcywgeWFyZHMsIG1ldGVycywgbWV0cmVzLCBjZW50aW1ldGVycywga2lsb21ldHJlcywgZmVldFxuICpcbiAqIEBuYW1lIGxlbmd0aFRvRGVncmVlc1xuICogQHBhcmFtIHtudW1iZXJ9IGRpc3RhbmNlIGluIHJlYWwgdW5pdHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdW5pdHM9XCJraWxvbWV0ZXJzXCJdIGNhbiBiZSBkZWdyZWVzLCByYWRpYW5zLCBtaWxlcywgaW5jaGVzLCB5YXJkcywgbWV0cmVzLFxuICogbWV0ZXJzLCBraWxvbWV0cmVzLCBraWxvbWV0ZXJzLlxuICogQHJldHVybnMge251bWJlcn0gZGVncmVlc1xuICovXG5mdW5jdGlvbiBsZW5ndGhUb0RlZ3JlZXMoZGlzdGFuY2UsIHVuaXRzKSB7XG4gICAgcmV0dXJuIHJhZGlhbnNUb0RlZ3JlZXMobGVuZ3RoVG9SYWRpYW5zKGRpc3RhbmNlLCB1bml0cykpO1xufVxuZXhwb3J0cy5sZW5ndGhUb0RlZ3JlZXMgPSBsZW5ndGhUb0RlZ3JlZXM7XG4vKipcbiAqIENvbnZlcnRzIGFueSBiZWFyaW5nIGFuZ2xlIGZyb20gdGhlIG5vcnRoIGxpbmUgZGlyZWN0aW9uIChwb3NpdGl2ZSBjbG9ja3dpc2UpXG4gKiBhbmQgcmV0dXJucyBhbiBhbmdsZSBiZXR3ZWVuIDAtMzYwIGRlZ3JlZXMgKHBvc2l0aXZlIGNsb2Nrd2lzZSksIDAgYmVpbmcgdGhlIG5vcnRoIGxpbmVcbiAqXG4gKiBAbmFtZSBiZWFyaW5nVG9BemltdXRoXG4gKiBAcGFyYW0ge251bWJlcn0gYmVhcmluZyBhbmdsZSwgYmV0d2VlbiAtMTgwIGFuZCArMTgwIGRlZ3JlZXNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IGFuZ2xlIGJldHdlZW4gMCBhbmQgMzYwIGRlZ3JlZXNcbiAqL1xuZnVuY3Rpb24gYmVhcmluZ1RvQXppbXV0aChiZWFyaW5nKSB7XG4gICAgdmFyIGFuZ2xlID0gYmVhcmluZyAlIDM2MDtcbiAgICBpZiAoYW5nbGUgPCAwKSB7XG4gICAgICAgIGFuZ2xlICs9IDM2MDtcbiAgICB9XG4gICAgcmV0dXJuIGFuZ2xlO1xufVxuZXhwb3J0cy5iZWFyaW5nVG9BemltdXRoID0gYmVhcmluZ1RvQXppbXV0aDtcbi8qKlxuICogQ29udmVydHMgYW4gYW5nbGUgaW4gcmFkaWFucyB0byBkZWdyZWVzXG4gKlxuICogQG5hbWUgcmFkaWFuc1RvRGVncmVlc1xuICogQHBhcmFtIHtudW1iZXJ9IHJhZGlhbnMgYW5nbGUgaW4gcmFkaWFuc1xuICogQHJldHVybnMge251bWJlcn0gZGVncmVlcyBiZXR3ZWVuIDAgYW5kIDM2MCBkZWdyZWVzXG4gKi9cbmZ1bmN0aW9uIHJhZGlhbnNUb0RlZ3JlZXMocmFkaWFucykge1xuICAgIHZhciBkZWdyZWVzID0gcmFkaWFucyAlICgyICogTWF0aC5QSSk7XG4gICAgcmV0dXJuIChkZWdyZWVzICogMTgwKSAvIE1hdGguUEk7XG59XG5leHBvcnRzLnJhZGlhbnNUb0RlZ3JlZXMgPSByYWRpYW5zVG9EZWdyZWVzO1xuLyoqXG4gKiBDb252ZXJ0cyBhbiBhbmdsZSBpbiBkZWdyZWVzIHRvIHJhZGlhbnNcbiAqXG4gKiBAbmFtZSBkZWdyZWVzVG9SYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gZGVncmVlcyBhbmdsZSBiZXR3ZWVuIDAgYW5kIDM2MCBkZWdyZWVzXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBhbmdsZSBpbiByYWRpYW5zXG4gKi9cbmZ1bmN0aW9uIGRlZ3JlZXNUb1JhZGlhbnMoZGVncmVlcykge1xuICAgIHZhciByYWRpYW5zID0gZGVncmVlcyAlIDM2MDtcbiAgICByZXR1cm4gKHJhZGlhbnMgKiBNYXRoLlBJKSAvIDE4MDtcbn1cbmV4cG9ydHMuZGVncmVlc1RvUmFkaWFucyA9IGRlZ3JlZXNUb1JhZGlhbnM7XG4vKipcbiAqIENvbnZlcnRzIGEgbGVuZ3RoIHRvIHRoZSByZXF1ZXN0ZWQgdW5pdC5cbiAqIFZhbGlkIHVuaXRzOiBtaWxlcywgbmF1dGljYWxtaWxlcywgaW5jaGVzLCB5YXJkcywgbWV0ZXJzLCBtZXRyZXMsIGtpbG9tZXRlcnMsIGNlbnRpbWV0ZXJzLCBmZWV0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCB0byBiZSBjb252ZXJ0ZWRcbiAqIEBwYXJhbSB7VW5pdHN9IFtvcmlnaW5hbFVuaXQ9XCJraWxvbWV0ZXJzXCJdIG9mIHRoZSBsZW5ndGhcbiAqIEBwYXJhbSB7VW5pdHN9IFtmaW5hbFVuaXQ9XCJraWxvbWV0ZXJzXCJdIHJldHVybmVkIHVuaXRcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBjb252ZXJ0ZWQgbGVuZ3RoXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRMZW5ndGgobGVuZ3RoLCBvcmlnaW5hbFVuaXQsIGZpbmFsVW5pdCkge1xuICAgIGlmIChvcmlnaW5hbFVuaXQgPT09IHZvaWQgMCkgeyBvcmlnaW5hbFVuaXQgPSBcImtpbG9tZXRlcnNcIjsgfVxuICAgIGlmIChmaW5hbFVuaXQgPT09IHZvaWQgMCkgeyBmaW5hbFVuaXQgPSBcImtpbG9tZXRlcnNcIjsgfVxuICAgIGlmICghKGxlbmd0aCA+PSAwKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJsZW5ndGggbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlclwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJhZGlhbnNUb0xlbmd0aChsZW5ndGhUb1JhZGlhbnMobGVuZ3RoLCBvcmlnaW5hbFVuaXQpLCBmaW5hbFVuaXQpO1xufVxuZXhwb3J0cy5jb252ZXJ0TGVuZ3RoID0gY29udmVydExlbmd0aDtcbi8qKlxuICogQ29udmVydHMgYSBhcmVhIHRvIHRoZSByZXF1ZXN0ZWQgdW5pdC5cbiAqIFZhbGlkIHVuaXRzOiBraWxvbWV0ZXJzLCBraWxvbWV0cmVzLCBtZXRlcnMsIG1ldHJlcywgY2VudGltZXRyZXMsIG1pbGxpbWV0ZXJzLCBhY3JlcywgbWlsZXMsIHlhcmRzLCBmZWV0LCBpbmNoZXMsIGhlY3RhcmVzXG4gKiBAcGFyYW0ge251bWJlcn0gYXJlYSB0byBiZSBjb252ZXJ0ZWRcbiAqIEBwYXJhbSB7VW5pdHN9IFtvcmlnaW5hbFVuaXQ9XCJtZXRlcnNcIl0gb2YgdGhlIGRpc3RhbmNlXG4gKiBAcGFyYW0ge1VuaXRzfSBbZmluYWxVbml0PVwia2lsb21ldGVyc1wiXSByZXR1cm5lZCB1bml0XG4gKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgY29udmVydGVkIGFyZWFcbiAqL1xuZnVuY3Rpb24gY29udmVydEFyZWEoYXJlYSwgb3JpZ2luYWxVbml0LCBmaW5hbFVuaXQpIHtcbiAgICBpZiAob3JpZ2luYWxVbml0ID09PSB2b2lkIDApIHsgb3JpZ2luYWxVbml0ID0gXCJtZXRlcnNcIjsgfVxuICAgIGlmIChmaW5hbFVuaXQgPT09IHZvaWQgMCkgeyBmaW5hbFVuaXQgPSBcImtpbG9tZXRlcnNcIjsgfVxuICAgIGlmICghKGFyZWEgPj0gMCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXJlYSBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyXCIpO1xuICAgIH1cbiAgICB2YXIgc3RhcnRGYWN0b3IgPSBleHBvcnRzLmFyZWFGYWN0b3JzW29yaWdpbmFsVW5pdF07XG4gICAgaWYgKCFzdGFydEZhY3Rvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIG9yaWdpbmFsIHVuaXRzXCIpO1xuICAgIH1cbiAgICB2YXIgZmluYWxGYWN0b3IgPSBleHBvcnRzLmFyZWFGYWN0b3JzW2ZpbmFsVW5pdF07XG4gICAgaWYgKCFmaW5hbEZhY3Rvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGZpbmFsIHVuaXRzXCIpO1xuICAgIH1cbiAgICByZXR1cm4gKGFyZWEgLyBzdGFydEZhY3RvcikgKiBmaW5hbEZhY3Rvcjtcbn1cbmV4cG9ydHMuY29udmVydEFyZWEgPSBjb252ZXJ0QXJlYTtcbi8qKlxuICogaXNOdW1iZXJcbiAqXG4gKiBAcGFyYW0geyp9IG51bSBOdW1iZXIgdG8gdmFsaWRhdGVcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlL2ZhbHNlXG4gKiBAZXhhbXBsZVxuICogdHVyZi5pc051bWJlcigxMjMpXG4gKiAvLz10cnVlXG4gKiB0dXJmLmlzTnVtYmVyKCdmb28nKVxuICogLy89ZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIobnVtKSB7XG4gICAgcmV0dXJuICFpc05hTihudW0pICYmIG51bSAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheShudW0pO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuLyoqXG4gKiBpc09iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gaW5wdXQgdmFyaWFibGUgdG8gdmFsaWRhdGVcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlL2ZhbHNlXG4gKiBAZXhhbXBsZVxuICogdHVyZi5pc09iamVjdCh7ZWxldmF0aW9uOiAxMH0pXG4gKiAvLz10cnVlXG4gKiB0dXJmLmlzT2JqZWN0KCdmb28nKVxuICogLy89ZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QoaW5wdXQpIHtcbiAgICByZXR1cm4gISFpbnB1dCAmJiBpbnB1dC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuLyoqXG4gKiBWYWxpZGF0ZSBCQm94XG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gYmJveCBCQm94IHRvIHZhbGlkYXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEB0aHJvd3MgRXJyb3IgaWYgQkJveCBpcyBub3QgdmFsaWRcbiAqIEBleGFtcGxlXG4gKiB2YWxpZGF0ZUJCb3goWy0xODAsIC00MCwgMTEwLCA1MF0pXG4gKiAvLz1PS1xuICogdmFsaWRhdGVCQm94KFstMTgwLCAtNDBdKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlQkJveCgnRm9vJylcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUJCb3goNSlcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUJCb3gobnVsbClcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUJCb3godW5kZWZpbmVkKVxuICogLy89RXJyb3JcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVCQm94KGJib3gpIHtcbiAgICBpZiAoIWJib3gpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYmJveCBpcyByZXF1aXJlZFwiKTtcbiAgICB9XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJib3gpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImJib3ggbXVzdCBiZSBhbiBBcnJheVwiKTtcbiAgICB9XG4gICAgaWYgKGJib3gubGVuZ3RoICE9PSA0ICYmIGJib3gubGVuZ3RoICE9PSA2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImJib3ggbXVzdCBiZSBhbiBBcnJheSBvZiA0IG9yIDYgbnVtYmVyc1wiKTtcbiAgICB9XG4gICAgYmJveC5mb3JFYWNoKGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgaWYgKCFpc051bWJlcihudW0pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJiYm94IG11c3Qgb25seSBjb250YWluIG51bWJlcnNcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMudmFsaWRhdGVCQm94ID0gdmFsaWRhdGVCQm94O1xuLyoqXG4gKiBWYWxpZGF0ZSBJZFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IGlkIElkIHRvIHZhbGlkYXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEB0aHJvd3MgRXJyb3IgaWYgSWQgaXMgbm90IHZhbGlkXG4gKiBAZXhhbXBsZVxuICogdmFsaWRhdGVJZChbLTE4MCwgLTQwLCAxMTAsIDUwXSlcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUlkKFstMTgwLCAtNDBdKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlSWQoJ0ZvbycpXG4gKiAvLz1PS1xuICogdmFsaWRhdGVJZCg1KVxuICogLy89T0tcbiAqIHZhbGlkYXRlSWQobnVsbClcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUlkKHVuZGVmaW5lZClcbiAqIC8vPUVycm9yXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlSWQoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImlkIGlzIHJlcXVpcmVkXCIpO1xuICAgIH1cbiAgICBpZiAoW1wic3RyaW5nXCIsIFwibnVtYmVyXCJdLmluZGV4T2YodHlwZW9mIGlkKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWQgbXVzdCBiZSBhIG51bWJlciBvciBhIHN0cmluZ1wiKTtcbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlSWQgPSB2YWxpZGF0ZUlkO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG52YXIgaGVscGVycyA9IHJlcXVpcmUoJ0B0dXJmL2hlbHBlcnMnKTtcblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgY29vcmRFYWNoXG4gKlxuICogQGNhbGxiYWNrIGNvb3JkRWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGN1cnJlbnRDb29yZCBUaGUgY3VycmVudCBjb29yZGluYXRlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb29yZEluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBjb29yZGluYXRlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBnZW9tZXRyeUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgY29vcmRpbmF0ZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LmZvckVhY2goKVxuICpcbiAqIEBuYW1lIGNvb3JkRWFjaFxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAoY3VycmVudENvb3JkLCBjb29yZEluZGV4LCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KVxuICogQHBhcmFtIHtib29sZWFufSBbZXhjbHVkZVdyYXBDb29yZD1mYWxzZV0gd2hldGhlciBvciBub3QgdG8gaW5jbHVkZSB0aGUgZmluYWwgY29vcmRpbmF0ZSBvZiBMaW5lYXJSaW5ncyB0aGF0IHdyYXBzIHRoZSByaW5nIGluIGl0cyBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgdHVyZi5wb2ludChbMjYsIDM3XSwge1wiZm9vXCI6IFwiYmFyXCJ9KSxcbiAqICAgdHVyZi5wb2ludChbMzYsIDUzXSwge1wiaGVsbG9cIjogXCJ3b3JsZFwifSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuY29vcmRFYWNoKGZlYXR1cmVzLCBmdW5jdGlvbiAoY3VycmVudENvb3JkLCBjb29yZEluZGV4LCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KSB7XG4gKiAgIC8vPWN1cnJlbnRDb29yZFxuICogICAvLz1jb29yZEluZGV4XG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1tdWx0aUZlYXR1cmVJbmRleFxuICogICAvLz1nZW9tZXRyeUluZGV4XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gY29vcmRFYWNoKGdlb2pzb24sIGNhbGxiYWNrLCBleGNsdWRlV3JhcENvb3JkKSB7XG4gIC8vIEhhbmRsZXMgbnVsbCBHZW9tZXRyeSAtLSBTa2lwcyB0aGlzIEdlb0pTT05cbiAgaWYgKGdlb2pzb24gPT09IG51bGwpIHJldHVybjtcbiAgdmFyIGosXG4gICAgayxcbiAgICBsLFxuICAgIGdlb21ldHJ5LFxuICAgIHN0b3BHLFxuICAgIGNvb3JkcyxcbiAgICBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbixcbiAgICB3cmFwU2hyaW5rID0gMCxcbiAgICBjb29yZEluZGV4ID0gMCxcbiAgICBpc0dlb21ldHJ5Q29sbGVjdGlvbixcbiAgICB0eXBlID0gZ2VvanNvbi50eXBlLFxuICAgIGlzRmVhdHVyZUNvbGxlY3Rpb24gPSB0eXBlID09PSBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgaXNGZWF0dXJlID0gdHlwZSA9PT0gXCJGZWF0dXJlXCIsXG4gICAgc3RvcCA9IGlzRmVhdHVyZUNvbGxlY3Rpb24gPyBnZW9qc29uLmZlYXR1cmVzLmxlbmd0aCA6IDE7XG5cbiAgLy8gVGhpcyBsb2dpYyBtYXkgbG9vayBhIGxpdHRsZSB3ZWlyZC4gVGhlIHJlYXNvbiB3aHkgaXQgaXMgdGhhdCB3YXlcbiAgLy8gaXMgYmVjYXVzZSBpdCdzIHRyeWluZyB0byBiZSBmYXN0LiBHZW9KU09OIHN1cHBvcnRzIG11bHRpcGxlIGtpbmRzXG4gIC8vIG9mIG9iamVjdHMgYXQgaXRzIHJvb3Q6IEZlYXR1cmVDb2xsZWN0aW9uLCBGZWF0dXJlcywgR2VvbWV0cmllcy5cbiAgLy8gVGhpcyBmdW5jdGlvbiBoYXMgdGhlIHJlc3BvbnNpYmlsaXR5IG9mIGhhbmRsaW5nIGFsbCBvZiB0aGVtLCBhbmQgdGhhdFxuICAvLyBtZWFucyB0aGF0IHNvbWUgb2YgdGhlIGBmb3JgIGxvb3BzIHlvdSBzZWUgYmVsb3cgYWN0dWFsbHkganVzdCBkb24ndCBhcHBseVxuICAvLyB0byBjZXJ0YWluIGlucHV0cy4gRm9yIGluc3RhbmNlLCBpZiB5b3UgZ2l2ZSB0aGlzIGp1c3QgYVxuICAvLyBQb2ludCBnZW9tZXRyeSwgdGhlbiBib3RoIGxvb3BzIGFyZSBzaG9ydC1jaXJjdWl0ZWQgYW5kIGFsbCB3ZSBkb1xuICAvLyBpcyBncmFkdWFsbHkgcmVuYW1lIHRoZSBpbnB1dCB1bnRpbCBpdCdzIGNhbGxlZCAnZ2VvbWV0cnknLlxuICAvL1xuICAvLyBUaGlzIGFsc28gYWltcyB0byBhbGxvY2F0ZSBhcyBmZXcgcmVzb3VyY2VzIGFzIHBvc3NpYmxlOiBqdXN0IGFcbiAgLy8gZmV3IG51bWJlcnMgYW5kIGJvb2xlYW5zLCByYXRoZXIgdGhhbiBhbnkgdGVtcG9yYXJ5IGFycmF5cyBhcyB3b3VsZFxuICAvLyBiZSByZXF1aXJlZCB3aXRoIHRoZSBub3JtYWxpemF0aW9uIGFwcHJvYWNoLlxuICBmb3IgKHZhciBmZWF0dXJlSW5kZXggPSAwOyBmZWF0dXJlSW5kZXggPCBzdG9wOyBmZWF0dXJlSW5kZXgrKykge1xuICAgIGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uID0gaXNGZWF0dXJlQ29sbGVjdGlvblxuICAgICAgPyBnZW9qc29uLmZlYXR1cmVzW2ZlYXR1cmVJbmRleF0uZ2VvbWV0cnlcbiAgICAgIDogaXNGZWF0dXJlXG4gICAgICA/IGdlb2pzb24uZ2VvbWV0cnlcbiAgICAgIDogZ2VvanNvbjtcbiAgICBpc0dlb21ldHJ5Q29sbGVjdGlvbiA9IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLnR5cGUgPT09IFwiR2VvbWV0cnlDb2xsZWN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gICAgc3RvcEcgPSBpc0dlb21ldHJ5Q29sbGVjdGlvblxuICAgICAgPyBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbi5nZW9tZXRyaWVzLmxlbmd0aFxuICAgICAgOiAxO1xuXG4gICAgZm9yICh2YXIgZ2VvbUluZGV4ID0gMDsgZ2VvbUluZGV4IDwgc3RvcEc7IGdlb21JbmRleCsrKSB7XG4gICAgICB2YXIgbXVsdGlGZWF0dXJlSW5kZXggPSAwO1xuICAgICAgdmFyIGdlb21ldHJ5SW5kZXggPSAwO1xuICAgICAgZ2VvbWV0cnkgPSBpc0dlb21ldHJ5Q29sbGVjdGlvblxuICAgICAgICA/IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLmdlb21ldHJpZXNbZ2VvbUluZGV4XVxuICAgICAgICA6IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uO1xuXG4gICAgICAvLyBIYW5kbGVzIG51bGwgR2VvbWV0cnkgLS0gU2tpcHMgdGhpcyBnZW9tZXRyeVxuICAgICAgaWYgKGdlb21ldHJ5ID09PSBudWxsKSBjb250aW51ZTtcbiAgICAgIGNvb3JkcyA9IGdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgICAgdmFyIGdlb21UeXBlID0gZ2VvbWV0cnkudHlwZTtcblxuICAgICAgd3JhcFNocmluayA9XG4gICAgICAgIGV4Y2x1ZGVXcmFwQ29vcmQgJiZcbiAgICAgICAgKGdlb21UeXBlID09PSBcIlBvbHlnb25cIiB8fCBnZW9tVHlwZSA9PT0gXCJNdWx0aVBvbHlnb25cIilcbiAgICAgICAgICA/IDFcbiAgICAgICAgICA6IDA7XG5cbiAgICAgIHN3aXRjaCAoZ2VvbVR5cGUpIHtcbiAgICAgICAgY2FzZSBudWxsOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgICAgY29vcmRzLFxuICAgICAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBjb29yZEluZGV4Kys7XG4gICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgrKztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgY29vcmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICAgIGNvb3Jkc1tqXSxcbiAgICAgICAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNvb3JkSW5kZXgrKztcbiAgICAgICAgICAgIGlmIChnZW9tVHlwZSA9PT0gXCJNdWx0aVBvaW50XCIpIG11bHRpRmVhdHVyZUluZGV4Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChnZW9tVHlwZSA9PT0gXCJMaW5lU3RyaW5nXCIpIG11bHRpRmVhdHVyZUluZGV4Kys7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICAgIGNhc2UgXCJNdWx0aUxpbmVTdHJpbmdcIjpcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgY29vcmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgY29vcmRzW2pdLmxlbmd0aCAtIHdyYXBTaHJpbms7IGsrKykge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICAgICAgICBjb29yZHNbal1ba10sXG4gICAgICAgICAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgY29vcmRJbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdlb21UeXBlID09PSBcIk11bHRpTGluZVN0cmluZ1wiKSBtdWx0aUZlYXR1cmVJbmRleCsrO1xuICAgICAgICAgICAgaWYgKGdlb21UeXBlID09PSBcIlBvbHlnb25cIikgZ2VvbWV0cnlJbmRleCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZ2VvbVR5cGUgPT09IFwiUG9seWdvblwiKSBtdWx0aUZlYXR1cmVJbmRleCsrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6XG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGNvb3Jkcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgZ2VvbWV0cnlJbmRleCA9IDA7XG4gICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgY29vcmRzW2pdLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgIGZvciAobCA9IDA7IGwgPCBjb29yZHNbal1ba10ubGVuZ3RoIC0gd3JhcFNocmluazsgbCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICAgICAgICAgIGNvb3Jkc1tqXVtrXVtsXSxcbiAgICAgICAgICAgICAgICAgICAgY29vcmRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnlJbmRleFxuICAgICAgICAgICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29vcmRJbmRleCsrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGdlb21ldHJ5SW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiR2VvbWV0cnlDb2xsZWN0aW9uXCI6XG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGdlb21ldHJ5Lmdlb21ldHJpZXMubGVuZ3RoOyBqKyspXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNvb3JkRWFjaChnZW9tZXRyeS5nZW9tZXRyaWVzW2pdLCBjYWxsYmFjaywgZXhjbHVkZVdyYXBDb29yZCkgPT09XG4gICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIEdlb21ldHJ5IFR5cGVcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGNvb3JkUmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgY29vcmRSZWR1Y2VDYWxsYmFja1xuICogQHBhcmFtIHsqfSBwcmV2aW91c1ZhbHVlIFRoZSBhY2N1bXVsYXRlZCB2YWx1ZSBwcmV2aW91c2x5IHJldHVybmVkIGluIHRoZSBsYXN0IGludm9jYXRpb25cbiAqIG9mIHRoZSBjYWxsYmFjaywgb3IgaW5pdGlhbFZhbHVlLCBpZiBzdXBwbGllZC5cbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gY3VycmVudENvb3JkIFRoZSBjdXJyZW50IGNvb3JkaW5hdGUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGNvb3JkSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIGNvb3JkaW5hdGUgYmVpbmcgcHJvY2Vzc2VkLlxuICogU3RhcnRzIGF0IGluZGV4IDAsIGlmIGFuIGluaXRpYWxWYWx1ZSBpcyBwcm92aWRlZCwgYW5kIGF0IGluZGV4IDEgb3RoZXJ3aXNlLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlGZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIE11bHRpLUZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGdlb21ldHJ5SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEdlb21ldHJ5IGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBjb29yZGluYXRlcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkucmVkdWNlKClcbiAqXG4gKiBAbmFtZSBjb29yZFJlZHVjZVxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxHZW9tZXRyeXxGZWF0dXJlfSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudENvb3JkLCBjb29yZEluZGV4KVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2V4Y2x1ZGVXcmFwQ29vcmQ9ZmFsc2VdIHdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgdGhlIGZpbmFsIGNvb3JkaW5hdGUgb2YgTGluZWFyUmluZ3MgdGhhdCB3cmFwcyB0aGUgcmluZyBpbiBpdHMgaXRlcmF0aW9uLlxuICogQHJldHVybnMgeyp9IFRoZSB2YWx1ZSB0aGF0IHJlc3VsdHMgZnJvbSB0aGUgcmVkdWN0aW9uLlxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICB0dXJmLnBvaW50KFsyNiwgMzddLCB7XCJmb29cIjogXCJiYXJcIn0pLFxuICogICB0dXJmLnBvaW50KFszNiwgNTNdLCB7XCJoZWxsb1wiOiBcIndvcmxkXCJ9KVxuICogXSk7XG4gKlxuICogdHVyZi5jb29yZFJlZHVjZShmZWF0dXJlcywgZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRDb29yZCwgY29vcmRJbmRleCwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleCkge1xuICogICAvLz1wcmV2aW91c1ZhbHVlXG4gKiAgIC8vPWN1cnJlbnRDb29yZFxuICogICAvLz1jb29yZEluZGV4XG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1tdWx0aUZlYXR1cmVJbmRleFxuICogICAvLz1nZW9tZXRyeUluZGV4XG4gKiAgIHJldHVybiBjdXJyZW50Q29vcmQ7XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gY29vcmRSZWR1Y2UoZ2VvanNvbiwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSwgZXhjbHVkZVdyYXBDb29yZCkge1xuICB2YXIgcHJldmlvdXNWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgY29vcmRFYWNoKFxuICAgIGdlb2pzb24sXG4gICAgZnVuY3Rpb24gKFxuICAgICAgY3VycmVudENvb3JkLFxuICAgICAgY29vcmRJbmRleCxcbiAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgZ2VvbWV0cnlJbmRleFxuICAgICkge1xuICAgICAgaWYgKGNvb3JkSW5kZXggPT09IDAgJiYgaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50Q29vcmQ7XG4gICAgICBlbHNlXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjYWxsYmFjayhcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlLFxuICAgICAgICAgIGN1cnJlbnRDb29yZCxcbiAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBleGNsdWRlV3JhcENvb3JkXG4gICk7XG4gIHJldHVybiBwcmV2aW91c1ZhbHVlO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBwcm9wRWFjaFxuICpcbiAqIEBjYWxsYmFjayBwcm9wRWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdH0gY3VycmVudFByb3BlcnRpZXMgVGhlIGN1cnJlbnQgUHJvcGVydGllcyBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBwcm9wZXJ0aWVzIGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5mb3JFYWNoKClcbiAqXG4gKiBAbmFtZSBwcm9wRWFjaFxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAoY3VycmVudFByb3BlcnRpZXMsIGZlYXR1cmVJbmRleClcbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgICAgdHVyZi5wb2ludChbMzYsIDUzXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHR1cmYucHJvcEVhY2goZmVhdHVyZXMsIGZ1bmN0aW9uIChjdXJyZW50UHJvcGVydGllcywgZmVhdHVyZUluZGV4KSB7XG4gKiAgIC8vPWN1cnJlbnRQcm9wZXJ0aWVzXG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIHByb3BFYWNoKGdlb2pzb24sIGNhbGxiYWNrKSB7XG4gIHZhciBpO1xuICBzd2l0Y2ggKGdlb2pzb24udHlwZSkge1xuICAgIGNhc2UgXCJGZWF0dXJlQ29sbGVjdGlvblwiOlxuICAgICAgZm9yIChpID0gMDsgaSA8IGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKGdlb2pzb24uZmVhdHVyZXNbaV0ucHJvcGVydGllcywgaSkgPT09IGZhbHNlKSBicmVhaztcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJGZWF0dXJlXCI6XG4gICAgICBjYWxsYmFjayhnZW9qc29uLnByb3BlcnRpZXMsIDApO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgcHJvcFJlZHVjZVxuICpcbiAqIFRoZSBmaXJzdCB0aW1lIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZSB2YWx1ZXMgcHJvdmlkZWQgYXMgYXJndW1lbnRzIGRlcGVuZFxuICogb24gd2hldGhlciB0aGUgcmVkdWNlIG1ldGhvZCBoYXMgYW4gaW5pdGlhbFZhbHVlIGFyZ3VtZW50LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBwcm92aWRlZCB0byB0aGUgcmVkdWNlIG1ldGhvZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIGluaXRpYWxWYWx1ZS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBub3QgcHJvdmlkZWQ6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgc2Vjb25kIGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogQGNhbGxiYWNrIHByb3BSZWR1Y2VDYWxsYmFja1xuICogQHBhcmFtIHsqfSBwcmV2aW91c1ZhbHVlIFRoZSBhY2N1bXVsYXRlZCB2YWx1ZSBwcmV2aW91c2x5IHJldHVybmVkIGluIHRoZSBsYXN0IGludm9jYXRpb25cbiAqIG9mIHRoZSBjYWxsYmFjaywgb3IgaW5pdGlhbFZhbHVlLCBpZiBzdXBwbGllZC5cbiAqIEBwYXJhbSB7Kn0gY3VycmVudFByb3BlcnRpZXMgVGhlIGN1cnJlbnQgUHJvcGVydGllcyBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBwcm9wZXJ0aWVzIGluIGFueSBHZW9KU09OIG9iamVjdCBpbnRvIGEgc2luZ2xlIHZhbHVlLFxuICogc2ltaWxhciB0byBob3cgQXJyYXkucmVkdWNlIHdvcmtzLiBIb3dldmVyLCBpbiB0aGlzIGNhc2Ugd2UgbGF6aWx5IHJ1blxuICogdGhlIHJlZHVjdGlvbiwgc28gYW4gYXJyYXkgb2YgYWxsIHByb3BlcnRpZXMgaXMgdW5uZWNlc3NhcnkuXG4gKlxuICogQG5hbWUgcHJvcFJlZHVjZVxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudFByb3BlcnRpZXMsIGZlYXR1cmVJbmRleClcbiAqIEBwYXJhbSB7Kn0gW2luaXRpYWxWYWx1ZV0gVmFsdWUgdG8gdXNlIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgZmlyc3QgY2FsbCBvZiB0aGUgY2FsbGJhY2suXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHZhbHVlIHRoYXQgcmVzdWx0cyBmcm9tIHRoZSByZWR1Y3Rpb24uXG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgICAgdHVyZi5wb2ludChbMjYsIDM3XSwge2ZvbzogJ2Jhcid9KSxcbiAqICAgICB0dXJmLnBvaW50KFszNiwgNTNdLCB7aGVsbG86ICd3b3JsZCd9KVxuICogXSk7XG4gKlxuICogdHVyZi5wcm9wUmVkdWNlKGZlYXR1cmVzLCBmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudFByb3BlcnRpZXMsIGZlYXR1cmVJbmRleCkge1xuICogICAvLz1wcmV2aW91c1ZhbHVlXG4gKiAgIC8vPWN1cnJlbnRQcm9wZXJ0aWVzXG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICByZXR1cm4gY3VycmVudFByb3BlcnRpZXNcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBwcm9wUmVkdWNlKGdlb2pzb24sIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUpIHtcbiAgdmFyIHByZXZpb3VzVmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gIHByb3BFYWNoKGdlb2pzb24sIGZ1bmN0aW9uIChjdXJyZW50UHJvcGVydGllcywgZmVhdHVyZUluZGV4KSB7XG4gICAgaWYgKGZlYXR1cmVJbmRleCA9PT0gMCAmJiBpbml0aWFsVmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50UHJvcGVydGllcztcbiAgICBlbHNlXG4gICAgICBwcmV2aW91c1ZhbHVlID0gY2FsbGJhY2socHJldmlvdXNWYWx1ZSwgY3VycmVudFByb3BlcnRpZXMsIGZlYXR1cmVJbmRleCk7XG4gIH0pO1xuICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgZmVhdHVyZUVhY2hcbiAqXG4gKiBAY2FsbGJhY2sgZmVhdHVyZUVhY2hDYWxsYmFja1xuICogQHBhcmFtIHtGZWF0dXJlPGFueT59IGN1cnJlbnRGZWF0dXJlIFRoZSBjdXJyZW50IEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgZmVhdHVyZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvXG4gKiBBcnJheS5mb3JFYWNoLlxuICpcbiAqIEBuYW1lIGZlYXR1cmVFYWNoXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4KVxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmZlYXR1cmVFYWNoKGZlYXR1cmVzLCBmdW5jdGlvbiAoY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCkge1xuICogICAvLz1jdXJyZW50RmVhdHVyZVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBmZWF0dXJlRWFjaChnZW9qc29uLCBjYWxsYmFjaykge1xuICBpZiAoZ2VvanNvbi50eXBlID09PSBcIkZlYXR1cmVcIikge1xuICAgIGNhbGxiYWNrKGdlb2pzb24sIDApO1xuICB9IGVsc2UgaWYgKGdlb2pzb24udHlwZSA9PT0gXCJGZWF0dXJlQ29sbGVjdGlvblwiKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBnZW9qc29uLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY2FsbGJhY2soZ2VvanNvbi5mZWF0dXJlc1tpXSwgaSkgPT09IGZhbHNlKSBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgZmVhdHVyZVJlZHVjZVxuICpcbiAqIFRoZSBmaXJzdCB0aW1lIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZSB2YWx1ZXMgcHJvdmlkZWQgYXMgYXJndW1lbnRzIGRlcGVuZFxuICogb24gd2hldGhlciB0aGUgcmVkdWNlIG1ldGhvZCBoYXMgYW4gaW5pdGlhbFZhbHVlIGFyZ3VtZW50LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBwcm92aWRlZCB0byB0aGUgcmVkdWNlIG1ldGhvZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIGluaXRpYWxWYWx1ZS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBub3QgcHJvdmlkZWQ6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgc2Vjb25kIGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogQGNhbGxiYWNrIGZlYXR1cmVSZWR1Y2VDYWxsYmFja1xuICogQHBhcmFtIHsqfSBwcmV2aW91c1ZhbHVlIFRoZSBhY2N1bXVsYXRlZCB2YWx1ZSBwcmV2aW91c2x5IHJldHVybmVkIGluIHRoZSBsYXN0IGludm9jYXRpb25cbiAqIG9mIHRoZSBjYWxsYmFjaywgb3IgaW5pdGlhbFZhbHVlLCBpZiBzdXBwbGllZC5cbiAqIEBwYXJhbSB7RmVhdHVyZX0gY3VycmVudEZlYXR1cmUgVGhlIGN1cnJlbnQgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBmZWF0dXJlcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkucmVkdWNlKCkuXG4gKlxuICogQG5hbWUgZmVhdHVyZVJlZHVjZVxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleClcbiAqIEBwYXJhbSB7Kn0gW2luaXRpYWxWYWx1ZV0gVmFsdWUgdG8gdXNlIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgZmlyc3QgY2FsbCBvZiB0aGUgY2FsbGJhY2suXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHZhbHVlIHRoYXQgcmVzdWx0cyBmcm9tIHRoZSByZWR1Y3Rpb24uXG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtcImZvb1wiOiBcImJhclwifSksXG4gKiAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtcImhlbGxvXCI6IFwid29ybGRcIn0pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmZlYXR1cmVSZWR1Y2UoZmVhdHVyZXMsIGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4KSB7XG4gKiAgIC8vPXByZXZpb3VzVmFsdWVcbiAqICAgLy89Y3VycmVudEZlYXR1cmVcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIHJldHVybiBjdXJyZW50RmVhdHVyZVxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIGZlYXR1cmVSZWR1Y2UoZ2VvanNvbiwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuICB2YXIgcHJldmlvdXNWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgZmVhdHVyZUVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgpIHtcbiAgICBpZiAoZmVhdHVyZUluZGV4ID09PSAwICYmIGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgcHJldmlvdXNWYWx1ZSA9IGN1cnJlbnRGZWF0dXJlO1xuICAgIGVsc2UgcHJldmlvdXNWYWx1ZSA9IGNhbGxiYWNrKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgpO1xuICB9KTtcbiAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG59XG5cbi8qKlxuICogR2V0IGFsbCBjb29yZGluYXRlcyBmcm9tIGFueSBHZW9KU09OIG9iamVjdC5cbiAqXG4gKiBAbmFtZSBjb29yZEFsbFxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHJldHVybnMge0FycmF5PEFycmF5PG51bWJlcj4+fSBjb29yZGluYXRlIHBvc2l0aW9uIGFycmF5XG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB2YXIgY29vcmRzID0gdHVyZi5jb29yZEFsbChmZWF0dXJlcyk7XG4gKiAvLz0gW1syNiwgMzddLCBbMzYsIDUzXV1cbiAqL1xuZnVuY3Rpb24gY29vcmRBbGwoZ2VvanNvbikge1xuICB2YXIgY29vcmRzID0gW107XG4gIGNvb3JkRWFjaChnZW9qc29uLCBmdW5jdGlvbiAoY29vcmQpIHtcbiAgICBjb29yZHMucHVzaChjb29yZCk7XG4gIH0pO1xuICByZXR1cm4gY29vcmRzO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBnZW9tRWFjaFxuICpcbiAqIEBjYWxsYmFjayBnZW9tRWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge0dlb21ldHJ5fSBjdXJyZW50R2VvbWV0cnkgVGhlIGN1cnJlbnQgR2VvbWV0cnkgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gZmVhdHVyZVByb3BlcnRpZXMgVGhlIGN1cnJlbnQgRmVhdHVyZSBQcm9wZXJ0aWVzIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gZmVhdHVyZUJCb3ggVGhlIGN1cnJlbnQgRmVhdHVyZSBCQm94IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gZmVhdHVyZUlkIFRoZSBjdXJyZW50IEZlYXR1cmUgSWQgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGVhY2ggZ2VvbWV0cnkgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LmZvckVhY2goKVxuICpcbiAqIEBuYW1lIGdlb21FYWNoXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50R2VvbWV0cnksIGZlYXR1cmVJbmRleCwgZmVhdHVyZVByb3BlcnRpZXMsIGZlYXR1cmVCQm94LCBmZWF0dXJlSWQpXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgICB0dXJmLnBvaW50KFsyNiwgMzddLCB7Zm9vOiAnYmFyJ30pLFxuICogICAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmdlb21FYWNoKGZlYXR1cmVzLCBmdW5jdGlvbiAoY3VycmVudEdlb21ldHJ5LCBmZWF0dXJlSW5kZXgsIGZlYXR1cmVQcm9wZXJ0aWVzLCBmZWF0dXJlQkJveCwgZmVhdHVyZUlkKSB7XG4gKiAgIC8vPWN1cnJlbnRHZW9tZXRyeVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgLy89ZmVhdHVyZVByb3BlcnRpZXNcbiAqICAgLy89ZmVhdHVyZUJCb3hcbiAqICAgLy89ZmVhdHVyZUlkXG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gZ2VvbUVhY2goZ2VvanNvbiwgY2FsbGJhY2spIHtcbiAgdmFyIGksXG4gICAgaixcbiAgICBnLFxuICAgIGdlb21ldHJ5LFxuICAgIHN0b3BHLFxuICAgIGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLFxuICAgIGlzR2VvbWV0cnlDb2xsZWN0aW9uLFxuICAgIGZlYXR1cmVQcm9wZXJ0aWVzLFxuICAgIGZlYXR1cmVCQm94LFxuICAgIGZlYXR1cmVJZCxcbiAgICBmZWF0dXJlSW5kZXggPSAwLFxuICAgIGlzRmVhdHVyZUNvbGxlY3Rpb24gPSBnZW9qc29uLnR5cGUgPT09IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAgICBpc0ZlYXR1cmUgPSBnZW9qc29uLnR5cGUgPT09IFwiRmVhdHVyZVwiLFxuICAgIHN0b3AgPSBpc0ZlYXR1cmVDb2xsZWN0aW9uID8gZ2VvanNvbi5mZWF0dXJlcy5sZW5ndGggOiAxO1xuXG4gIC8vIFRoaXMgbG9naWMgbWF5IGxvb2sgYSBsaXR0bGUgd2VpcmQuIFRoZSByZWFzb24gd2h5IGl0IGlzIHRoYXQgd2F5XG4gIC8vIGlzIGJlY2F1c2UgaXQncyB0cnlpbmcgdG8gYmUgZmFzdC4gR2VvSlNPTiBzdXBwb3J0cyBtdWx0aXBsZSBraW5kc1xuICAvLyBvZiBvYmplY3RzIGF0IGl0cyByb290OiBGZWF0dXJlQ29sbGVjdGlvbiwgRmVhdHVyZXMsIEdlb21ldHJpZXMuXG4gIC8vIFRoaXMgZnVuY3Rpb24gaGFzIHRoZSByZXNwb25zaWJpbGl0eSBvZiBoYW5kbGluZyBhbGwgb2YgdGhlbSwgYW5kIHRoYXRcbiAgLy8gbWVhbnMgdGhhdCBzb21lIG9mIHRoZSBgZm9yYCBsb29wcyB5b3Ugc2VlIGJlbG93IGFjdHVhbGx5IGp1c3QgZG9uJ3QgYXBwbHlcbiAgLy8gdG8gY2VydGFpbiBpbnB1dHMuIEZvciBpbnN0YW5jZSwgaWYgeW91IGdpdmUgdGhpcyBqdXN0IGFcbiAgLy8gUG9pbnQgZ2VvbWV0cnksIHRoZW4gYm90aCBsb29wcyBhcmUgc2hvcnQtY2lyY3VpdGVkIGFuZCBhbGwgd2UgZG9cbiAgLy8gaXMgZ3JhZHVhbGx5IHJlbmFtZSB0aGUgaW5wdXQgdW50aWwgaXQncyBjYWxsZWQgJ2dlb21ldHJ5Jy5cbiAgLy9cbiAgLy8gVGhpcyBhbHNvIGFpbXMgdG8gYWxsb2NhdGUgYXMgZmV3IHJlc291cmNlcyBhcyBwb3NzaWJsZToganVzdCBhXG4gIC8vIGZldyBudW1iZXJzIGFuZCBib29sZWFucywgcmF0aGVyIHRoYW4gYW55IHRlbXBvcmFyeSBhcnJheXMgYXMgd291bGRcbiAgLy8gYmUgcmVxdWlyZWQgd2l0aCB0aGUgbm9ybWFsaXphdGlvbiBhcHByb2FjaC5cbiAgZm9yIChpID0gMDsgaSA8IHN0b3A7IGkrKykge1xuICAgIGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uID0gaXNGZWF0dXJlQ29sbGVjdGlvblxuICAgICAgPyBnZW9qc29uLmZlYXR1cmVzW2ldLmdlb21ldHJ5XG4gICAgICA6IGlzRmVhdHVyZVxuICAgICAgPyBnZW9qc29uLmdlb21ldHJ5XG4gICAgICA6IGdlb2pzb247XG4gICAgZmVhdHVyZVByb3BlcnRpZXMgPSBpc0ZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb2pzb24uZmVhdHVyZXNbaV0ucHJvcGVydGllc1xuICAgICAgOiBpc0ZlYXR1cmVcbiAgICAgID8gZ2VvanNvbi5wcm9wZXJ0aWVzXG4gICAgICA6IHt9O1xuICAgIGZlYXR1cmVCQm94ID0gaXNGZWF0dXJlQ29sbGVjdGlvblxuICAgICAgPyBnZW9qc29uLmZlYXR1cmVzW2ldLmJib3hcbiAgICAgIDogaXNGZWF0dXJlXG4gICAgICA/IGdlb2pzb24uYmJveFxuICAgICAgOiB1bmRlZmluZWQ7XG4gICAgZmVhdHVyZUlkID0gaXNGZWF0dXJlQ29sbGVjdGlvblxuICAgICAgPyBnZW9qc29uLmZlYXR1cmVzW2ldLmlkXG4gICAgICA6IGlzRmVhdHVyZVxuICAgICAgPyBnZW9qc29uLmlkXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICBpc0dlb21ldHJ5Q29sbGVjdGlvbiA9IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLnR5cGUgPT09IFwiR2VvbWV0cnlDb2xsZWN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gICAgc3RvcEcgPSBpc0dlb21ldHJ5Q29sbGVjdGlvblxuICAgICAgPyBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbi5nZW9tZXRyaWVzLmxlbmd0aFxuICAgICAgOiAxO1xuXG4gICAgZm9yIChnID0gMDsgZyA8IHN0b3BHOyBnKyspIHtcbiAgICAgIGdlb21ldHJ5ID0gaXNHZW9tZXRyeUNvbGxlY3Rpb25cbiAgICAgICAgPyBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbi5nZW9tZXRyaWVzW2ddXG4gICAgICAgIDogZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb247XG5cbiAgICAgIC8vIEhhbmRsZSBudWxsIEdlb21ldHJ5XG4gICAgICBpZiAoZ2VvbWV0cnkgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgIGZlYXR1cmVQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgZmVhdHVyZUJCb3gsXG4gICAgICAgICAgICBmZWF0dXJlSWRcbiAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAoZ2VvbWV0cnkudHlwZSkge1xuICAgICAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgICAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgICAgZ2VvbWV0cnksXG4gICAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgZmVhdHVyZVByb3BlcnRpZXMsXG4gICAgICAgICAgICAgIGZlYXR1cmVCQm94LFxuICAgICAgICAgICAgICBmZWF0dXJlSWRcbiAgICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJHZW9tZXRyeUNvbGxlY3Rpb25cIjoge1xuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBnZW9tZXRyeS5nZW9tZXRyaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICAgIGdlb21ldHJ5Lmdlb21ldHJpZXNbal0sXG4gICAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICAgIGZlYXR1cmVQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgIGZlYXR1cmVCQm94LFxuICAgICAgICAgICAgICAgIGZlYXR1cmVJZFxuICAgICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBHZW9tZXRyeSBUeXBlXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBPbmx5IGluY3JlYXNlIGBmZWF0dXJlSW5kZXhgIHBlciBlYWNoIGZlYXR1cmVcbiAgICBmZWF0dXJlSW5kZXgrKztcbiAgfVxufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBnZW9tUmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgZ2VvbVJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHtHZW9tZXRyeX0gY3VycmVudEdlb21ldHJ5IFRoZSBjdXJyZW50IEdlb21ldHJ5IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtPYmplY3R9IGZlYXR1cmVQcm9wZXJ0aWVzIFRoZSBjdXJyZW50IEZlYXR1cmUgUHJvcGVydGllcyBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGZlYXR1cmVCQm94IFRoZSBjdXJyZW50IEZlYXR1cmUgQkJveCBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGZlYXR1cmVJZCBUaGUgY3VycmVudCBGZWF0dXJlIElkIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBnZW9tZXRyeSBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkucmVkdWNlKCkuXG4gKlxuICogQG5hbWUgZ2VvbVJlZHVjZVxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudEdlb21ldHJ5LCBmZWF0dXJlSW5kZXgsIGZlYXR1cmVQcm9wZXJ0aWVzLCBmZWF0dXJlQkJveCwgZmVhdHVyZUlkKVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm5zIHsqfSBUaGUgdmFsdWUgdGhhdCByZXN1bHRzIGZyb20gdGhlIHJlZHVjdGlvbi5cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgICB0dXJmLnBvaW50KFsyNiwgMzddLCB7Zm9vOiAnYmFyJ30pLFxuICogICAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmdlb21SZWR1Y2UoZmVhdHVyZXMsIGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50R2VvbWV0cnksIGZlYXR1cmVJbmRleCwgZmVhdHVyZVByb3BlcnRpZXMsIGZlYXR1cmVCQm94LCBmZWF0dXJlSWQpIHtcbiAqICAgLy89cHJldmlvdXNWYWx1ZVxuICogICAvLz1jdXJyZW50R2VvbWV0cnlcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPWZlYXR1cmVQcm9wZXJ0aWVzXG4gKiAgIC8vPWZlYXR1cmVCQm94XG4gKiAgIC8vPWZlYXR1cmVJZFxuICogICByZXR1cm4gY3VycmVudEdlb21ldHJ5XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gZ2VvbVJlZHVjZShnZW9qc29uLCBjYWxsYmFjaywgaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBwcmV2aW91c1ZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICBnZW9tRWFjaChcbiAgICBnZW9qc29uLFxuICAgIGZ1bmN0aW9uIChcbiAgICAgIGN1cnJlbnRHZW9tZXRyeSxcbiAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgIGZlYXR1cmVQcm9wZXJ0aWVzLFxuICAgICAgZmVhdHVyZUJCb3gsXG4gICAgICBmZWF0dXJlSWRcbiAgICApIHtcbiAgICAgIGlmIChmZWF0dXJlSW5kZXggPT09IDAgJiYgaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50R2VvbWV0cnk7XG4gICAgICBlbHNlXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjYWxsYmFjayhcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlLFxuICAgICAgICAgIGN1cnJlbnRHZW9tZXRyeSxcbiAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgZmVhdHVyZVByb3BlcnRpZXMsXG4gICAgICAgICAgZmVhdHVyZUJCb3gsXG4gICAgICAgICAgZmVhdHVyZUlkXG4gICAgICAgICk7XG4gICAgfVxuICApO1xuICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgZmxhdHRlbkVhY2hcbiAqXG4gKiBAY2FsbGJhY2sgZmxhdHRlbkVhY2hDYWxsYmFja1xuICogQHBhcmFtIHtGZWF0dXJlfSBjdXJyZW50RmVhdHVyZSBUaGUgY3VycmVudCBmbGF0dGVuZWQgZmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aUZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgTXVsdGktRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgZmxhdHRlbmVkIGZlYXR1cmVzIGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0b1xuICogQXJyYXkuZm9yRWFjaC5cbiAqXG4gKiBAbmFtZSBmbGF0dGVuRWFjaFxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAoY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpXG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgICAgdHVyZi5wb2ludChbMjYsIDM3XSwge2ZvbzogJ2Jhcid9KSxcbiAqICAgICB0dXJmLm11bHRpUG9pbnQoW1s0MCwgMzBdLCBbMzYsIDUzXV0sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmZsYXR0ZW5FYWNoKGZlYXR1cmVzLCBmdW5jdGlvbiAoY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpIHtcbiAqICAgLy89Y3VycmVudEZlYXR1cmVcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPW11bHRpRmVhdHVyZUluZGV4XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gZmxhdHRlbkVhY2goZ2VvanNvbiwgY2FsbGJhY2spIHtcbiAgZ2VvbUVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGdlb21ldHJ5LCBmZWF0dXJlSW5kZXgsIHByb3BlcnRpZXMsIGJib3gsIGlkKSB7XG4gICAgLy8gQ2FsbGJhY2sgZm9yIHNpbmdsZSBnZW9tZXRyeVxuICAgIHZhciB0eXBlID0gZ2VvbWV0cnkgPT09IG51bGwgPyBudWxsIDogZ2VvbWV0cnkudHlwZTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgbnVsbDpcbiAgICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgIGhlbHBlcnMuZmVhdHVyZShnZW9tZXRyeSwgcHJvcGVydGllcywgeyBiYm94OiBiYm94LCBpZDogaWQgfSksXG4gICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAwXG4gICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBnZW9tVHlwZTtcblxuICAgIC8vIENhbGxiYWNrIGZvciBtdWx0aS1nZW9tZXRyeVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgICAgZ2VvbVR5cGUgPSBcIlBvaW50XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgICAgICBnZW9tVHlwZSA9IFwiTGluZVN0cmluZ1wiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgICAgZ2VvbVR5cGUgPSBcIlBvbHlnb25cIjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZm9yIChcbiAgICAgIHZhciBtdWx0aUZlYXR1cmVJbmRleCA9IDA7XG4gICAgICBtdWx0aUZlYXR1cmVJbmRleCA8IGdlb21ldHJ5LmNvb3JkaW5hdGVzLmxlbmd0aDtcbiAgICAgIG11bHRpRmVhdHVyZUluZGV4KytcbiAgICApIHtcbiAgICAgIHZhciBjb29yZGluYXRlID0gZ2VvbWV0cnkuY29vcmRpbmF0ZXNbbXVsdGlGZWF0dXJlSW5kZXhdO1xuICAgICAgdmFyIGdlb20gPSB7XG4gICAgICAgIHR5cGU6IGdlb21UeXBlLFxuICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZSxcbiAgICAgIH07XG4gICAgICBpZiAoXG4gICAgICAgIGNhbGxiYWNrKGhlbHBlcnMuZmVhdHVyZShnZW9tLCBwcm9wZXJ0aWVzKSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCkgPT09XG4gICAgICAgIGZhbHNlXG4gICAgICApXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBmbGF0dGVuUmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgZmxhdHRlblJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHtGZWF0dXJlfSBjdXJyZW50RmVhdHVyZSBUaGUgY3VycmVudCBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBmbGF0dGVuZWQgZmVhdHVyZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LnJlZHVjZSgpLlxuICpcbiAqIEBuYW1lIGZsYXR0ZW5SZWR1Y2VcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBhbnkgR2VvSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm5zIHsqfSBUaGUgdmFsdWUgdGhhdCByZXN1bHRzIGZyb20gdGhlIHJlZHVjdGlvbi5cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgICB0dXJmLnBvaW50KFsyNiwgMzddLCB7Zm9vOiAnYmFyJ30pLFxuICogICAgIHR1cmYubXVsdGlQb2ludChbWzQwLCAzMF0sIFszNiwgNTNdXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuZmxhdHRlblJlZHVjZShmZWF0dXJlcywgZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KSB7XG4gKiAgIC8vPXByZXZpb3VzVmFsdWVcbiAqICAgLy89Y3VycmVudEZlYXR1cmVcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPW11bHRpRmVhdHVyZUluZGV4XG4gKiAgIHJldHVybiBjdXJyZW50RmVhdHVyZVxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW5SZWR1Y2UoZ2VvanNvbiwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuICB2YXIgcHJldmlvdXNWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgZmxhdHRlbkVhY2goXG4gICAgZ2VvanNvbixcbiAgICBmdW5jdGlvbiAoY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpIHtcbiAgICAgIGlmIChcbiAgICAgICAgZmVhdHVyZUluZGV4ID09PSAwICYmXG4gICAgICAgIG11bHRpRmVhdHVyZUluZGV4ID09PSAwICYmXG4gICAgICAgIGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICApXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50RmVhdHVyZTtcbiAgICAgIGVsc2VcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGNhbGxiYWNrKFxuICAgICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgICAgY3VycmVudEZlYXR1cmUsXG4gICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4XG4gICAgICAgICk7XG4gICAgfVxuICApO1xuICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3Igc2VnbWVudEVhY2hcbiAqXG4gKiBAY2FsbGJhY2sgc2VnbWVudEVhY2hDYWxsYmFja1xuICogQHBhcmFtIHtGZWF0dXJlPExpbmVTdHJpbmc+fSBjdXJyZW50U2VnbWVudCBUaGUgY3VycmVudCBTZWdtZW50IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBnZW9tZXRyeUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gc2VnbWVudEluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBTZWdtZW50IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIDItdmVydGV4IGxpbmUgc2VnbWVudCBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkuZm9yRWFjaCgpXG4gKiAoTXVsdGkpUG9pbnQgZ2VvbWV0cmllcyBkbyBub3QgY29udGFpbiBzZWdtZW50cyB0aGVyZWZvcmUgdGhleSBhcmUgaWdub3JlZCBkdXJpbmcgdGhpcyBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50U2VnbWVudCwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleCwgc2VnbWVudEluZGV4KVxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZXhhbXBsZVxuICogdmFyIHBvbHlnb24gPSB0dXJmLnBvbHlnb24oW1tbLTUwLCA1XSwgWy00MCwgLTEwXSwgWy01MCwgLTEwXSwgWy00MCwgNV0sIFstNTAsIDVdXV0pO1xuICpcbiAqIC8vIEl0ZXJhdGUgb3ZlciBHZW9KU09OIGJ5IDItdmVydGV4IHNlZ21lbnRzXG4gKiB0dXJmLnNlZ21lbnRFYWNoKHBvbHlnb24sIGZ1bmN0aW9uIChjdXJyZW50U2VnbWVudCwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleCwgc2VnbWVudEluZGV4KSB7XG4gKiAgIC8vPWN1cnJlbnRTZWdtZW50XG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1tdWx0aUZlYXR1cmVJbmRleFxuICogICAvLz1nZW9tZXRyeUluZGV4XG4gKiAgIC8vPXNlZ21lbnRJbmRleFxuICogfSk7XG4gKlxuICogLy8gQ2FsY3VsYXRlIHRoZSB0b3RhbCBudW1iZXIgb2Ygc2VnbWVudHNcbiAqIHZhciB0b3RhbCA9IDA7XG4gKiB0dXJmLnNlZ21lbnRFYWNoKHBvbHlnb24sIGZ1bmN0aW9uICgpIHtcbiAqICAgICB0b3RhbCsrO1xuICogfSk7XG4gKi9cbmZ1bmN0aW9uIHNlZ21lbnRFYWNoKGdlb2pzb24sIGNhbGxiYWNrKSB7XG4gIGZsYXR0ZW5FYWNoKGdlb2pzb24sIGZ1bmN0aW9uIChmZWF0dXJlLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KSB7XG4gICAgdmFyIHNlZ21lbnRJbmRleCA9IDA7XG5cbiAgICAvLyBFeGNsdWRlIG51bGwgR2VvbWV0cmllc1xuICAgIGlmICghZmVhdHVyZS5nZW9tZXRyeSkgcmV0dXJuO1xuICAgIC8vIChNdWx0aSlQb2ludCBnZW9tZXRyaWVzIGRvIG5vdCBjb250YWluIHNlZ21lbnRzIHRoZXJlZm9yZSB0aGV5IGFyZSBpZ25vcmVkIGR1cmluZyB0aGlzIG9wZXJhdGlvbi5cbiAgICB2YXIgdHlwZSA9IGZlYXR1cmUuZ2VvbWV0cnkudHlwZTtcbiAgICBpZiAodHlwZSA9PT0gXCJQb2ludFwiIHx8IHR5cGUgPT09IFwiTXVsdGlQb2ludFwiKSByZXR1cm47XG5cbiAgICAvLyBHZW5lcmF0ZSAyLXZlcnRleCBsaW5lIHNlZ21lbnRzXG4gICAgdmFyIHByZXZpb3VzQ29vcmRzO1xuICAgIHZhciBwcmV2aW91c0ZlYXR1cmVJbmRleCA9IDA7XG4gICAgdmFyIHByZXZpb3VzTXVsdGlJbmRleCA9IDA7XG4gICAgdmFyIHByZXZHZW9tSW5kZXggPSAwO1xuICAgIGlmIChcbiAgICAgIGNvb3JkRWFjaChcbiAgICAgICAgZmVhdHVyZSxcbiAgICAgICAgZnVuY3Rpb24gKFxuICAgICAgICAgIGN1cnJlbnRDb29yZCxcbiAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgIGZlYXR1cmVJbmRleENvb3JkLFxuICAgICAgICAgIG11bHRpUGFydEluZGV4Q29vcmQsXG4gICAgICAgICAgZ2VvbWV0cnlJbmRleFxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBTaW11bGF0aW5nIGEgbWV0YS5jb29yZFJlZHVjZSgpIHNpbmNlIGByZWR1Y2VgIG9wZXJhdGlvbnMgY2Fubm90IGJlIHN0b3BwZWQgYnkgcmV0dXJuaW5nIGBmYWxzZWBcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBwcmV2aW91c0Nvb3JkcyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBmZWF0dXJlSW5kZXggPiBwcmV2aW91c0ZlYXR1cmVJbmRleCB8fFxuICAgICAgICAgICAgbXVsdGlQYXJ0SW5kZXhDb29yZCA+IHByZXZpb3VzTXVsdGlJbmRleCB8fFxuICAgICAgICAgICAgZ2VvbWV0cnlJbmRleCA+IHByZXZHZW9tSW5kZXhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHByZXZpb3VzQ29vcmRzID0gY3VycmVudENvb3JkO1xuICAgICAgICAgICAgcHJldmlvdXNGZWF0dXJlSW5kZXggPSBmZWF0dXJlSW5kZXg7XG4gICAgICAgICAgICBwcmV2aW91c011bHRpSW5kZXggPSBtdWx0aVBhcnRJbmRleENvb3JkO1xuICAgICAgICAgICAgcHJldkdlb21JbmRleCA9IGdlb21ldHJ5SW5kZXg7XG4gICAgICAgICAgICBzZWdtZW50SW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY3VycmVudFNlZ21lbnQgPSBoZWxwZXJzLmxpbmVTdHJpbmcoXG4gICAgICAgICAgICBbcHJldmlvdXNDb29yZHMsIGN1cnJlbnRDb29yZF0sXG4gICAgICAgICAgICBmZWF0dXJlLnByb3BlcnRpZXNcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICBjdXJyZW50U2VnbWVudCxcbiAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgZ2VvbWV0cnlJbmRleCxcbiAgICAgICAgICAgICAgc2VnbWVudEluZGV4XG4gICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBzZWdtZW50SW5kZXgrKztcbiAgICAgICAgICBwcmV2aW91c0Nvb3JkcyA9IGN1cnJlbnRDb29yZDtcbiAgICAgICAgfVxuICAgICAgKSA9PT0gZmFsc2VcbiAgICApXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBzZWdtZW50UmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgc2VnbWVudFJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHtGZWF0dXJlPExpbmVTdHJpbmc+fSBjdXJyZW50U2VnbWVudCBUaGUgY3VycmVudCBTZWdtZW50IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBnZW9tZXRyeUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gc2VnbWVudEluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBTZWdtZW50IGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSAyLXZlcnRleCBsaW5lIHNlZ21lbnQgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LnJlZHVjZSgpXG4gKiAoTXVsdGkpUG9pbnQgZ2VvbWV0cmllcyBkbyBub3QgY29udGFpbiBzZWdtZW50cyB0aGVyZWZvcmUgdGhleSBhcmUgaWdub3JlZCBkdXJpbmcgdGhpcyBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50U2VnbWVudCwgY3VycmVudEluZGV4KVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2x5Z29uID0gdHVyZi5wb2x5Z29uKFtbWy01MCwgNV0sIFstNDAsIC0xMF0sIFstNTAsIC0xMF0sIFstNDAsIDVdLCBbLTUwLCA1XV1dKTtcbiAqXG4gKiAvLyBJdGVyYXRlIG92ZXIgR2VvSlNPTiBieSAyLXZlcnRleCBzZWdtZW50c1xuICogdHVyZi5zZWdtZW50UmVkdWNlKHBvbHlnb24sIGZ1bmN0aW9uIChwcmV2aW91c1NlZ21lbnQsIGN1cnJlbnRTZWdtZW50LCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4LCBzZWdtZW50SW5kZXgpIHtcbiAqICAgLy89IHByZXZpb3VzU2VnbWVudFxuICogICAvLz0gY3VycmVudFNlZ21lbnRcbiAqICAgLy89IGZlYXR1cmVJbmRleFxuICogICAvLz0gbXVsdGlGZWF0dXJlSW5kZXhcbiAqICAgLy89IGdlb21ldHJ5SW5kZXhcbiAqICAgLy89IHNlZ21lbnRJbmRleFxuICogICByZXR1cm4gY3VycmVudFNlZ21lbnRcbiAqIH0pO1xuICpcbiAqIC8vIENhbGN1bGF0ZSB0aGUgdG90YWwgbnVtYmVyIG9mIHNlZ21lbnRzXG4gKiB2YXIgaW5pdGlhbFZhbHVlID0gMFxuICogdmFyIHRvdGFsID0gdHVyZi5zZWdtZW50UmVkdWNlKHBvbHlnb24sIGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlKSB7XG4gKiAgICAgcHJldmlvdXNWYWx1ZSsrO1xuICogICAgIHJldHVybiBwcmV2aW91c1ZhbHVlO1xuICogfSwgaW5pdGlhbFZhbHVlKTtcbiAqL1xuZnVuY3Rpb24gc2VnbWVudFJlZHVjZShnZW9qc29uLCBjYWxsYmFjaywgaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBwcmV2aW91c1ZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICB2YXIgc3RhcnRlZCA9IGZhbHNlO1xuICBzZWdtZW50RWFjaChcbiAgICBnZW9qc29uLFxuICAgIGZ1bmN0aW9uIChcbiAgICAgIGN1cnJlbnRTZWdtZW50LFxuICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICBnZW9tZXRyeUluZGV4LFxuICAgICAgc2VnbWVudEluZGV4XG4gICAgKSB7XG4gICAgICBpZiAoc3RhcnRlZCA9PT0gZmFsc2UgJiYgaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50U2VnbWVudDtcbiAgICAgIGVsc2VcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGNhbGxiYWNrKFxuICAgICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgICAgY3VycmVudFNlZ21lbnQsXG4gICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgIGdlb21ldHJ5SW5kZXgsXG4gICAgICAgICAgc2VnbWVudEluZGV4XG4gICAgICAgICk7XG4gICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICB9XG4gICk7XG4gIHJldHVybiBwcmV2aW91c1ZhbHVlO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBsaW5lRWFjaFxuICpcbiAqIEBjYWxsYmFjayBsaW5lRWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge0ZlYXR1cmU8TGluZVN0cmluZz59IGN1cnJlbnRMaW5lIFRoZSBjdXJyZW50IExpbmVTdHJpbmd8TGluZWFyUmluZyBiZWluZyBwcm9jZXNzZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlGZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIE11bHRpLUZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkXG4gKiBAcGFyYW0ge251bWJlcn0gZ2VvbWV0cnlJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgR2VvbWV0cnkgYmVpbmcgcHJvY2Vzc2VkXG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgbGluZSBvciByaW5nIGNvb3JkaW5hdGVzIGluIExpbmVTdHJpbmcsIFBvbHlnb24sIE11bHRpTGluZVN0cmluZywgTXVsdGlQb2x5Z29uIEZlYXR1cmVzIG9yIEdlb21ldHJpZXMsXG4gKiBzaW1pbGFyIHRvIEFycmF5LmZvckVhY2guXG4gKlxuICogQG5hbWUgbGluZUVhY2hcbiAqIEBwYXJhbSB7R2VvbWV0cnl8RmVhdHVyZTxMaW5lU3RyaW5nfFBvbHlnb258TXVsdGlMaW5lU3RyaW5nfE11bHRpUG9seWdvbj59IGdlb2pzb24gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50TGluZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleClcbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlMaW5lID0gdHVyZi5tdWx0aUxpbmVTdHJpbmcoW1xuICogICBbWzI2LCAzN10sIFszNSwgNDVdXSxcbiAqICAgW1szNiwgNTNdLCBbMzgsIDUwXSwgWzQxLCA1NV1dXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmxpbmVFYWNoKG11bHRpTGluZSwgZnVuY3Rpb24gKGN1cnJlbnRMaW5lLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KSB7XG4gKiAgIC8vPWN1cnJlbnRMaW5lXG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1tdWx0aUZlYXR1cmVJbmRleFxuICogICAvLz1nZW9tZXRyeUluZGV4XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gbGluZUVhY2goZ2VvanNvbiwgY2FsbGJhY2spIHtcbiAgLy8gdmFsaWRhdGlvblxuICBpZiAoIWdlb2pzb24pIHRocm93IG5ldyBFcnJvcihcImdlb2pzb24gaXMgcmVxdWlyZWRcIik7XG5cbiAgZmxhdHRlbkVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpIHtcbiAgICBpZiAoZmVhdHVyZS5nZW9tZXRyeSA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIHZhciB0eXBlID0gZmVhdHVyZS5nZW9tZXRyeS50eXBlO1xuICAgIHZhciBjb29yZHMgPSBmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgaWYgKGNhbGxiYWNrKGZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIDAsIDApID09PSBmYWxzZSlcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgZm9yIChcbiAgICAgICAgICB2YXIgZ2VvbWV0cnlJbmRleCA9IDA7XG4gICAgICAgICAgZ2VvbWV0cnlJbmRleCA8IGNvb3Jkcy5sZW5ndGg7XG4gICAgICAgICAgZ2VvbWV0cnlJbmRleCsrXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICBoZWxwZXJzLmxpbmVTdHJpbmcoY29vcmRzW2dlb21ldHJ5SW5kZXhdLCBmZWF0dXJlLnByb3BlcnRpZXMpLFxuICAgICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBsaW5lUmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgbGluZVJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHtGZWF0dXJlPExpbmVTdHJpbmc+fSBjdXJyZW50TGluZSBUaGUgY3VycmVudCBMaW5lU3RyaW5nfExpbmVhclJpbmcgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aUZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgTXVsdGktRmVhdHVyZSBiZWluZyBwcm9jZXNzZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBnZW9tZXRyeUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWRcbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBmZWF0dXJlcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkucmVkdWNlKCkuXG4gKlxuICogQG5hbWUgbGluZVJlZHVjZVxuICogQHBhcmFtIHtHZW9tZXRyeXxGZWF0dXJlPExpbmVTdHJpbmd8UG9seWdvbnxNdWx0aUxpbmVTdHJpbmd8TXVsdGlQb2x5Z29uPn0gZ2VvanNvbiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRMaW5lLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm5zIHsqfSBUaGUgdmFsdWUgdGhhdCByZXN1bHRzIGZyb20gdGhlIHJlZHVjdGlvbi5cbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlQb2x5ID0gdHVyZi5tdWx0aVBvbHlnb24oW1xuICogICB0dXJmLnBvbHlnb24oW1tbMTIsNDhdLFsyLDQxXSxbMjQsMzhdLFsxMiw0OF1dLCBbWzksNDRdLFsxMyw0MV0sWzEzLDQ1XSxbOSw0NF1dXSksXG4gKiAgIHR1cmYucG9seWdvbihbW1s1LCA1XSwgWzAsIDBdLCBbMiwgMl0sIFs0LCA0XSwgWzUsIDVdXV0pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmxpbmVSZWR1Y2UobXVsdGlQb2x5LCBmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudExpbmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgpIHtcbiAqICAgLy89cHJldmlvdXNWYWx1ZVxuICogICAvLz1jdXJyZW50TGluZVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgLy89bXVsdGlGZWF0dXJlSW5kZXhcbiAqICAgLy89Z2VvbWV0cnlJbmRleFxuICogICByZXR1cm4gY3VycmVudExpbmVcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBsaW5lUmVkdWNlKGdlb2pzb24sIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUpIHtcbiAgdmFyIHByZXZpb3VzVmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gIGxpbmVFYWNoKFxuICAgIGdlb2pzb24sXG4gICAgZnVuY3Rpb24gKGN1cnJlbnRMaW5lLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KSB7XG4gICAgICBpZiAoZmVhdHVyZUluZGV4ID09PSAwICYmIGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBwcmV2aW91c1ZhbHVlID0gY3VycmVudExpbmU7XG4gICAgICBlbHNlXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjYWxsYmFjayhcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlLFxuICAgICAgICAgIGN1cnJlbnRMaW5lLFxuICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICk7XG4gICAgfVxuICApO1xuICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbn1cblxuLyoqXG4gKiBGaW5kcyBhIHBhcnRpY3VsYXIgMi12ZXJ0ZXggTGluZVN0cmluZyBTZWdtZW50IGZyb20gYSBHZW9KU09OIHVzaW5nIGBAdHVyZi9tZXRhYCBpbmRleGVzLlxuICpcbiAqIE5lZ2F0aXZlIGluZGV4ZXMgYXJlIHBlcm1pdHRlZC5cbiAqIFBvaW50ICYgTXVsdGlQb2ludCB3aWxsIGFsd2F5cyByZXR1cm4gbnVsbC5cbiAqXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gQW55IEdlb0pTT04gRmVhdHVyZSBvciBHZW9tZXRyeVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZmVhdHVyZUluZGV4PTBdIEZlYXR1cmUgSW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tdWx0aUZlYXR1cmVJbmRleD0wXSBNdWx0aS1GZWF0dXJlIEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZ2VvbWV0cnlJbmRleD0wXSBHZW9tZXRyeSBJbmRleFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnNlZ21lbnRJbmRleD0wXSBTZWdtZW50IEluZGV4XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMucHJvcGVydGllcz17fV0gVHJhbnNsYXRlIFByb3BlcnRpZXMgdG8gb3V0cHV0IExpbmVTdHJpbmdcbiAqIEBwYXJhbSB7QkJveH0gW29wdGlvbnMuYmJveD17fV0gVHJhbnNsYXRlIEJCb3ggdG8gb3V0cHV0IExpbmVTdHJpbmdcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gW29wdGlvbnMuaWQ9e31dIFRyYW5zbGF0ZSBJZCB0byBvdXRwdXQgTGluZVN0cmluZ1xuICogQHJldHVybnMge0ZlYXR1cmU8TGluZVN0cmluZz59IDItdmVydGV4IEdlb0pTT04gRmVhdHVyZSBMaW5lU3RyaW5nXG4gKiBAZXhhbXBsZVxuICogdmFyIG11bHRpTGluZSA9IHR1cmYubXVsdGlMaW5lU3RyaW5nKFtcbiAqICAgICBbWzEwLCAxMF0sIFs1MCwgMzBdLCBbMzAsIDQwXV0sXG4gKiAgICAgW1stMTAsIC0xMF0sIFstNTAsIC0zMF0sIFstMzAsIC00MF1dXG4gKiBdKTtcbiAqXG4gKiAvLyBGaXJzdCBTZWdtZW50IChkZWZhdWx0cyBhcmUgMClcbiAqIHR1cmYuZmluZFNlZ21lbnQobXVsdGlMaW5lKTtcbiAqIC8vID0+IEZlYXR1cmU8TGluZVN0cmluZzxbWzEwLCAxMF0sIFs1MCwgMzBdXT4+XG4gKlxuICogLy8gRmlyc3QgU2VnbWVudCBvZiAybmQgTXVsdGkgRmVhdHVyZVxuICogdHVyZi5maW5kU2VnbWVudChtdWx0aUxpbmUsIHttdWx0aUZlYXR1cmVJbmRleDogMX0pO1xuICogLy8gPT4gRmVhdHVyZTxMaW5lU3RyaW5nPFtbLTEwLCAtMTBdLCBbLTUwLCAtMzBdXT4+XG4gKlxuICogLy8gTGFzdCBTZWdtZW50IG9mIExhc3QgTXVsdGkgRmVhdHVyZVxuICogdHVyZi5maW5kU2VnbWVudChtdWx0aUxpbmUsIHttdWx0aUZlYXR1cmVJbmRleDogLTEsIHNlZ21lbnRJbmRleDogLTF9KTtcbiAqIC8vID0+IEZlYXR1cmU8TGluZVN0cmluZzxbWy01MCwgLTMwXSwgWy0zMCwgLTQwXV0+PlxuICovXG5mdW5jdGlvbiBmaW5kU2VnbWVudChnZW9qc29uLCBvcHRpb25zKSB7XG4gIC8vIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGlmICghaGVscGVycy5pc09iamVjdChvcHRpb25zKSkgdGhyb3cgbmV3IEVycm9yKFwib3B0aW9ucyBpcyBpbnZhbGlkXCIpO1xuICB2YXIgZmVhdHVyZUluZGV4ID0gb3B0aW9ucy5mZWF0dXJlSW5kZXggfHwgMDtcbiAgdmFyIG11bHRpRmVhdHVyZUluZGV4ID0gb3B0aW9ucy5tdWx0aUZlYXR1cmVJbmRleCB8fCAwO1xuICB2YXIgZ2VvbWV0cnlJbmRleCA9IG9wdGlvbnMuZ2VvbWV0cnlJbmRleCB8fCAwO1xuICB2YXIgc2VnbWVudEluZGV4ID0gb3B0aW9ucy5zZWdtZW50SW5kZXggfHwgMDtcblxuICAvLyBGaW5kIEZlYXR1cmVJbmRleFxuICB2YXIgcHJvcGVydGllcyA9IG9wdGlvbnMucHJvcGVydGllcztcbiAgdmFyIGdlb21ldHJ5O1xuXG4gIHN3aXRjaCAoZ2VvanNvbi50eXBlKSB7XG4gICAgY2FzZSBcIkZlYXR1cmVDb2xsZWN0aW9uXCI6XG4gICAgICBpZiAoZmVhdHVyZUluZGV4IDwgMClcbiAgICAgICAgZmVhdHVyZUluZGV4ID0gZ2VvanNvbi5mZWF0dXJlcy5sZW5ndGggKyBmZWF0dXJlSW5kZXg7XG4gICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCBnZW9qc29uLmZlYXR1cmVzW2ZlYXR1cmVJbmRleF0ucHJvcGVydGllcztcbiAgICAgIGdlb21ldHJ5ID0gZ2VvanNvbi5mZWF0dXJlc1tmZWF0dXJlSW5kZXhdLmdlb21ldHJ5O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkZlYXR1cmVcIjpcbiAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IGdlb2pzb24ucHJvcGVydGllcztcbiAgICAgIGdlb21ldHJ5ID0gZ2VvanNvbi5nZW9tZXRyeTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJQb2ludFwiOlxuICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgIGdlb21ldHJ5ID0gZ2VvanNvbjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnZW9qc29uIGlzIGludmFsaWRcIik7XG4gIH1cblxuICAvLyBGaW5kIFNlZ21lbnRJbmRleFxuICBpZiAoZ2VvbWV0cnkgPT09IG51bGwpIHJldHVybiBudWxsO1xuICB2YXIgY29vcmRzID0gZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gIHN3aXRjaCAoZ2VvbWV0cnkudHlwZSkge1xuICAgIGNhc2UgXCJQb2ludFwiOlxuICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgaWYgKHNlZ21lbnRJbmRleCA8IDApIHNlZ21lbnRJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBzZWdtZW50SW5kZXggLSAxO1xuICAgICAgcmV0dXJuIGhlbHBlcnMubGluZVN0cmluZyhcbiAgICAgICAgW2Nvb3Jkc1tzZWdtZW50SW5kZXhdLCBjb29yZHNbc2VnbWVudEluZGV4ICsgMV1dLFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICBpZiAoZ2VvbWV0cnlJbmRleCA8IDApIGdlb21ldHJ5SW5kZXggPSBjb29yZHMubGVuZ3RoICsgZ2VvbWV0cnlJbmRleDtcbiAgICAgIGlmIChzZWdtZW50SW5kZXggPCAwKVxuICAgICAgICBzZWdtZW50SW5kZXggPSBjb29yZHNbZ2VvbWV0cnlJbmRleF0ubGVuZ3RoICsgc2VnbWVudEluZGV4IC0gMTtcbiAgICAgIHJldHVybiBoZWxwZXJzLmxpbmVTdHJpbmcoXG4gICAgICAgIFtcbiAgICAgICAgICBjb29yZHNbZ2VvbWV0cnlJbmRleF1bc2VnbWVudEluZGV4XSxcbiAgICAgICAgICBjb29yZHNbZ2VvbWV0cnlJbmRleF1bc2VnbWVudEluZGV4ICsgMV0sXG4gICAgICAgIF0sXG4gICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgICAgaWYgKG11bHRpRmVhdHVyZUluZGV4IDwgMClcbiAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXggPSBjb29yZHMubGVuZ3RoICsgbXVsdGlGZWF0dXJlSW5kZXg7XG4gICAgICBpZiAoc2VnbWVudEluZGV4IDwgMClcbiAgICAgICAgc2VnbWVudEluZGV4ID0gY29vcmRzW211bHRpRmVhdHVyZUluZGV4XS5sZW5ndGggKyBzZWdtZW50SW5kZXggLSAxO1xuICAgICAgcmV0dXJuIGhlbHBlcnMubGluZVN0cmluZyhcbiAgICAgICAgW1xuICAgICAgICAgIGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bc2VnbWVudEluZGV4XSxcbiAgICAgICAgICBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdW3NlZ21lbnRJbmRleCArIDFdLFxuICAgICAgICBdLFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgIGlmIChtdWx0aUZlYXR1cmVJbmRleCA8IDApXG4gICAgICAgIG11bHRpRmVhdHVyZUluZGV4ID0gY29vcmRzLmxlbmd0aCArIG11bHRpRmVhdHVyZUluZGV4O1xuICAgICAgaWYgKGdlb21ldHJ5SW5kZXggPCAwKVxuICAgICAgICBnZW9tZXRyeUluZGV4ID0gY29vcmRzW211bHRpRmVhdHVyZUluZGV4XS5sZW5ndGggKyBnZW9tZXRyeUluZGV4O1xuICAgICAgaWYgKHNlZ21lbnRJbmRleCA8IDApXG4gICAgICAgIHNlZ21lbnRJbmRleCA9XG4gICAgICAgICAgY29vcmRzW211bHRpRmVhdHVyZUluZGV4XVtnZW9tZXRyeUluZGV4XS5sZW5ndGggLSBzZWdtZW50SW5kZXggLSAxO1xuICAgICAgcmV0dXJuIGhlbHBlcnMubGluZVN0cmluZyhcbiAgICAgICAgW1xuICAgICAgICAgIGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bZ2VvbWV0cnlJbmRleF1bc2VnbWVudEluZGV4XSxcbiAgICAgICAgICBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdW2dlb21ldHJ5SW5kZXhdW3NlZ21lbnRJbmRleCArIDFdLFxuICAgICAgICBdLFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcImdlb2pzb24gaXMgaW52YWxpZFwiKTtcbn1cblxuLyoqXG4gKiBGaW5kcyBhIHBhcnRpY3VsYXIgUG9pbnQgZnJvbSBhIEdlb0pTT04gdXNpbmcgYEB0dXJmL21ldGFgIGluZGV4ZXMuXG4gKlxuICogTmVnYXRpdmUgaW5kZXhlcyBhcmUgcGVybWl0dGVkLlxuICpcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBBbnkgR2VvSlNPTiBGZWF0dXJlIG9yIEdlb21ldHJ5XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5mZWF0dXJlSW5kZXg9MF0gRmVhdHVyZSBJbmRleFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm11bHRpRmVhdHVyZUluZGV4PTBdIE11bHRpLUZlYXR1cmUgSW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5nZW9tZXRyeUluZGV4PTBdIEdlb21ldHJ5IEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuY29vcmRJbmRleD0wXSBDb29yZCBJbmRleFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLnByb3BlcnRpZXM9e31dIFRyYW5zbGF0ZSBQcm9wZXJ0aWVzIHRvIG91dHB1dCBQb2ludFxuICogQHBhcmFtIHtCQm94fSBbb3B0aW9ucy5iYm94PXt9XSBUcmFuc2xhdGUgQkJveCB0byBvdXRwdXQgUG9pbnRcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gW29wdGlvbnMuaWQ9e31dIFRyYW5zbGF0ZSBJZCB0byBvdXRwdXQgUG9pbnRcbiAqIEByZXR1cm5zIHtGZWF0dXJlPFBvaW50Pn0gMi12ZXJ0ZXggR2VvSlNPTiBGZWF0dXJlIFBvaW50XG4gKiBAZXhhbXBsZVxuICogdmFyIG11bHRpTGluZSA9IHR1cmYubXVsdGlMaW5lU3RyaW5nKFtcbiAqICAgICBbWzEwLCAxMF0sIFs1MCwgMzBdLCBbMzAsIDQwXV0sXG4gKiAgICAgW1stMTAsIC0xMF0sIFstNTAsIC0zMF0sIFstMzAsIC00MF1dXG4gKiBdKTtcbiAqXG4gKiAvLyBGaXJzdCBTZWdtZW50IChkZWZhdWx0cyBhcmUgMClcbiAqIHR1cmYuZmluZFBvaW50KG11bHRpTGluZSk7XG4gKiAvLyA9PiBGZWF0dXJlPFBvaW50PFsxMCwgMTBdPj5cbiAqXG4gKiAvLyBGaXJzdCBTZWdtZW50IG9mIHRoZSAybmQgTXVsdGktRmVhdHVyZVxuICogdHVyZi5maW5kUG9pbnQobXVsdGlMaW5lLCB7bXVsdGlGZWF0dXJlSW5kZXg6IDF9KTtcbiAqIC8vID0+IEZlYXR1cmU8UG9pbnQ8Wy0xMCwgLTEwXT4+XG4gKlxuICogLy8gTGFzdCBTZWdtZW50IG9mIGxhc3QgTXVsdGktRmVhdHVyZVxuICogdHVyZi5maW5kUG9pbnQobXVsdGlMaW5lLCB7bXVsdGlGZWF0dXJlSW5kZXg6IC0xLCBjb29yZEluZGV4OiAtMX0pO1xuICogLy8gPT4gRmVhdHVyZTxQb2ludDxbLTMwLCAtNDBdPj5cbiAqL1xuZnVuY3Rpb24gZmluZFBvaW50KGdlb2pzb24sIG9wdGlvbnMpIHtcbiAgLy8gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKCFoZWxwZXJzLmlzT2JqZWN0KG9wdGlvbnMpKSB0aHJvdyBuZXcgRXJyb3IoXCJvcHRpb25zIGlzIGludmFsaWRcIik7XG4gIHZhciBmZWF0dXJlSW5kZXggPSBvcHRpb25zLmZlYXR1cmVJbmRleCB8fCAwO1xuICB2YXIgbXVsdGlGZWF0dXJlSW5kZXggPSBvcHRpb25zLm11bHRpRmVhdHVyZUluZGV4IHx8IDA7XG4gIHZhciBnZW9tZXRyeUluZGV4ID0gb3B0aW9ucy5nZW9tZXRyeUluZGV4IHx8IDA7XG4gIHZhciBjb29yZEluZGV4ID0gb3B0aW9ucy5jb29yZEluZGV4IHx8IDA7XG5cbiAgLy8gRmluZCBGZWF0dXJlSW5kZXhcbiAgdmFyIHByb3BlcnRpZXMgPSBvcHRpb25zLnByb3BlcnRpZXM7XG4gIHZhciBnZW9tZXRyeTtcblxuICBzd2l0Y2ggKGdlb2pzb24udHlwZSkge1xuICAgIGNhc2UgXCJGZWF0dXJlQ29sbGVjdGlvblwiOlxuICAgICAgaWYgKGZlYXR1cmVJbmRleCA8IDApXG4gICAgICAgIGZlYXR1cmVJbmRleCA9IGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoICsgZmVhdHVyZUluZGV4O1xuICAgICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwgZ2VvanNvbi5mZWF0dXJlc1tmZWF0dXJlSW5kZXhdLnByb3BlcnRpZXM7XG4gICAgICBnZW9tZXRyeSA9IGdlb2pzb24uZmVhdHVyZXNbZmVhdHVyZUluZGV4XS5nZW9tZXRyeTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJGZWF0dXJlXCI6XG4gICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCBnZW9qc29uLnByb3BlcnRpZXM7XG4gICAgICBnZW9tZXRyeSA9IGdlb2pzb24uZ2VvbWV0cnk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICBjYXNlIFwiTXVsdGlQb2ludFwiOlxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgIGNhc2UgXCJNdWx0aUxpbmVTdHJpbmdcIjpcbiAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6XG4gICAgICBnZW9tZXRyeSA9IGdlb2pzb247XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2VvanNvbiBpcyBpbnZhbGlkXCIpO1xuICB9XG5cbiAgLy8gRmluZCBDb29yZCBJbmRleFxuICBpZiAoZ2VvbWV0cnkgPT09IG51bGwpIHJldHVybiBudWxsO1xuICB2YXIgY29vcmRzID0gZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gIHN3aXRjaCAoZ2VvbWV0cnkudHlwZSkge1xuICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgcmV0dXJuIGhlbHBlcnMucG9pbnQoY29vcmRzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiTXVsdGlQb2ludFwiOlxuICAgICAgaWYgKG11bHRpRmVhdHVyZUluZGV4IDwgMClcbiAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXggPSBjb29yZHMubGVuZ3RoICsgbXVsdGlGZWF0dXJlSW5kZXg7XG4gICAgICByZXR1cm4gaGVscGVycy5wb2ludChjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgaWYgKGNvb3JkSW5kZXggPCAwKSBjb29yZEluZGV4ID0gY29vcmRzLmxlbmd0aCArIGNvb3JkSW5kZXg7XG4gICAgICByZXR1cm4gaGVscGVycy5wb2ludChjb29yZHNbY29vcmRJbmRleF0sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICBpZiAoZ2VvbWV0cnlJbmRleCA8IDApIGdlb21ldHJ5SW5kZXggPSBjb29yZHMubGVuZ3RoICsgZ2VvbWV0cnlJbmRleDtcbiAgICAgIGlmIChjb29yZEluZGV4IDwgMClcbiAgICAgICAgY29vcmRJbmRleCA9IGNvb3Jkc1tnZW9tZXRyeUluZGV4XS5sZW5ndGggKyBjb29yZEluZGV4O1xuICAgICAgcmV0dXJuIGhlbHBlcnMucG9pbnQoY29vcmRzW2dlb21ldHJ5SW5kZXhdW2Nvb3JkSW5kZXhdLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6XG4gICAgICBpZiAobXVsdGlGZWF0dXJlSW5kZXggPCAwKVxuICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBtdWx0aUZlYXR1cmVJbmRleDtcbiAgICAgIGlmIChjb29yZEluZGV4IDwgMClcbiAgICAgICAgY29vcmRJbmRleCA9IGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF0ubGVuZ3RoICsgY29vcmRJbmRleDtcbiAgICAgIHJldHVybiBoZWxwZXJzLnBvaW50KGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bY29vcmRJbmRleF0sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgIGlmIChtdWx0aUZlYXR1cmVJbmRleCA8IDApXG4gICAgICAgIG11bHRpRmVhdHVyZUluZGV4ID0gY29vcmRzLmxlbmd0aCArIG11bHRpRmVhdHVyZUluZGV4O1xuICAgICAgaWYgKGdlb21ldHJ5SW5kZXggPCAwKVxuICAgICAgICBnZW9tZXRyeUluZGV4ID0gY29vcmRzW211bHRpRmVhdHVyZUluZGV4XS5sZW5ndGggKyBnZW9tZXRyeUluZGV4O1xuICAgICAgaWYgKGNvb3JkSW5kZXggPCAwKVxuICAgICAgICBjb29yZEluZGV4ID1cbiAgICAgICAgICBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdW2dlb21ldHJ5SW5kZXhdLmxlbmd0aCAtIGNvb3JkSW5kZXg7XG4gICAgICByZXR1cm4gaGVscGVycy5wb2ludChcbiAgICAgICAgY29vcmRzW211bHRpRmVhdHVyZUluZGV4XVtnZW9tZXRyeUluZGV4XVtjb29yZEluZGV4XSxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXCJnZW9qc29uIGlzIGludmFsaWRcIik7XG59XG5cbmV4cG9ydHMuY29vcmRBbGwgPSBjb29yZEFsbDtcbmV4cG9ydHMuY29vcmRFYWNoID0gY29vcmRFYWNoO1xuZXhwb3J0cy5jb29yZFJlZHVjZSA9IGNvb3JkUmVkdWNlO1xuZXhwb3J0cy5mZWF0dXJlRWFjaCA9IGZlYXR1cmVFYWNoO1xuZXhwb3J0cy5mZWF0dXJlUmVkdWNlID0gZmVhdHVyZVJlZHVjZTtcbmV4cG9ydHMuZmluZFBvaW50ID0gZmluZFBvaW50O1xuZXhwb3J0cy5maW5kU2VnbWVudCA9IGZpbmRTZWdtZW50O1xuZXhwb3J0cy5mbGF0dGVuRWFjaCA9IGZsYXR0ZW5FYWNoO1xuZXhwb3J0cy5mbGF0dGVuUmVkdWNlID0gZmxhdHRlblJlZHVjZTtcbmV4cG9ydHMuZ2VvbUVhY2ggPSBnZW9tRWFjaDtcbmV4cG9ydHMuZ2VvbVJlZHVjZSA9IGdlb21SZWR1Y2U7XG5leHBvcnRzLmxpbmVFYWNoID0gbGluZUVhY2g7XG5leHBvcnRzLmxpbmVSZWR1Y2UgPSBsaW5lUmVkdWNlO1xuZXhwb3J0cy5wcm9wRWFjaCA9IHByb3BFYWNoO1xuZXhwb3J0cy5wcm9wUmVkdWNlID0gcHJvcFJlZHVjZTtcbmV4cG9ydHMuc2VnbWVudEVhY2ggPSBzZWdtZW50RWFjaDtcbmV4cG9ydHMuc2VnbWVudFJlZHVjZSA9IHNlZ21lbnRSZWR1Y2U7XG4iLCJ2YXIgcmJ1c2ggPSByZXF1aXJlKCdyYnVzaCcpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCdAdHVyZi9oZWxwZXJzJyk7XG52YXIgbWV0YSA9IHJlcXVpcmUoJ0B0dXJmL21ldGEnKTtcbnZhciB0dXJmQkJveCA9IHJlcXVpcmUoJ0B0dXJmL2Jib3gnKS5kZWZhdWx0O1xudmFyIGZlYXR1cmVFYWNoID0gbWV0YS5mZWF0dXJlRWFjaDtcbnZhciBjb29yZEVhY2ggPSBtZXRhLmNvb3JkRWFjaDtcbnZhciBwb2x5Z29uID0gaGVscGVycy5wb2x5Z29uO1xudmFyIGZlYXR1cmVDb2xsZWN0aW9uID0gaGVscGVycy5mZWF0dXJlQ29sbGVjdGlvbjtcblxuLyoqXG4gKiBHZW9KU09OIGltcGxlbWVudGF0aW9uIG9mIFtSQnVzaF0oaHR0cHM6Ly9naXRodWIuY29tL21vdXJuZXIvcmJ1c2gjcmJ1c2gpIHNwYXRpYWwgaW5kZXguXG4gKlxuICogQG5hbWUgcmJ1c2hcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbWF4RW50cmllcz05XSBkZWZpbmVzIHRoZSBtYXhpbXVtIG51bWJlciBvZiBlbnRyaWVzIGluIGEgdHJlZSBub2RlLiA5ICh1c2VkIGJ5IGRlZmF1bHQpIGlzIGFcbiAqIHJlYXNvbmFibGUgY2hvaWNlIGZvciBtb3N0IGFwcGxpY2F0aW9ucy4gSGlnaGVyIHZhbHVlIG1lYW5zIGZhc3RlciBpbnNlcnRpb24gYW5kIHNsb3dlciBzZWFyY2gsIGFuZCB2aWNlIHZlcnNhLlxuICogQHJldHVybnMge1JCdXNofSBHZW9KU09OIFJCdXNoXG4gKiBAZXhhbXBsZVxuICogdmFyIGdlb2pzb25SYnVzaCA9IHJlcXVpcmUoJ2dlb2pzb24tcmJ1c2gnKS5kZWZhdWx0O1xuICogdmFyIHRyZWUgPSBnZW9qc29uUmJ1c2goKTtcbiAqL1xuZnVuY3Rpb24gZ2VvanNvblJidXNoKG1heEVudHJpZXMpIHtcbiAgICB2YXIgdHJlZSA9IG5ldyByYnVzaChtYXhFbnRyaWVzKTtcbiAgICAvKipcbiAgICAgKiBbaW5zZXJ0XShodHRwczovL2dpdGh1Yi5jb20vbW91cm5lci9yYnVzaCNkYXRhLWZvcm1hdClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RmVhdHVyZX0gZmVhdHVyZSBpbnNlcnQgc2luZ2xlIEdlb0pTT04gRmVhdHVyZVxuICAgICAqIEByZXR1cm5zIHtSQnVzaH0gR2VvSlNPTiBSQnVzaFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHBvbHkgPSB0dXJmLnBvbHlnb24oW1tbLTc4LCA0MV0sIFstNjcsIDQxXSwgWy02NywgNDhdLCBbLTc4LCA0OF0sIFstNzgsIDQxXV1dKTtcbiAgICAgKiB0cmVlLmluc2VydChwb2x5KVxuICAgICAqL1xuICAgIHRyZWUuaW5zZXJ0ID0gZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgICAgaWYgKGZlYXR1cmUudHlwZSAhPT0gJ0ZlYXR1cmUnKSB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZmVhdHVyZScpO1xuICAgICAgICBmZWF0dXJlLmJib3ggPSBmZWF0dXJlLmJib3ggPyBmZWF0dXJlLmJib3ggOiB0dXJmQkJveChmZWF0dXJlKTtcbiAgICAgICAgcmV0dXJuIHJidXNoLnByb3RvdHlwZS5pbnNlcnQuY2FsbCh0aGlzLCBmZWF0dXJlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogW2xvYWRdKGh0dHBzOi8vZ2l0aHViLmNvbS9tb3VybmVyL3JidXNoI2J1bGstaW5zZXJ0aW5nLWRhdGEpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEFycmF5PEZlYXR1cmU+fSBmZWF0dXJlcyBsb2FkIGVudGlyZSBHZW9KU09OIEZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICogQHJldHVybnMge1JCdXNofSBHZW9KU09OIFJCdXNoXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgcG9seXMgPSB0dXJmLnBvbHlnb25zKFtcbiAgICAgKiAgICAgW1tbLTc4LCA0MV0sIFstNjcsIDQxXSwgWy02NywgNDhdLCBbLTc4LCA0OF0sIFstNzgsIDQxXV1dLFxuICAgICAqICAgICBbW1stOTMsIDMyXSwgWy04MywgMzJdLCBbLTgzLCAzOV0sIFstOTMsIDM5XSwgWy05MywgMzJdXV1cbiAgICAgKiBdKTtcbiAgICAgKiB0cmVlLmxvYWQocG9seXMpO1xuICAgICAqL1xuICAgIHRyZWUubG9hZCA9IGZ1bmN0aW9uIChmZWF0dXJlcykge1xuICAgICAgICB2YXIgbG9hZCA9IFtdO1xuICAgICAgICAvLyBMb2FkIGFuIEFycmF5IG9mIEZlYXR1cmVzXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZlYXR1cmVzKSkge1xuICAgICAgICAgICAgZmVhdHVyZXMuZm9yRWFjaChmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlLnR5cGUgIT09ICdGZWF0dXJlJykgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGZlYXR1cmVzJyk7XG4gICAgICAgICAgICAgICAgZmVhdHVyZS5iYm94ID0gZmVhdHVyZS5iYm94ID8gZmVhdHVyZS5iYm94IDogdHVyZkJCb3goZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgbG9hZC5wdXNoKGZlYXR1cmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBMb2FkIGEgRmVhdHVyZUNvbGxlY3Rpb25cbiAgICAgICAgICAgIGZlYXR1cmVFYWNoKGZlYXR1cmVzLCBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlLnR5cGUgIT09ICdGZWF0dXJlJykgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGZlYXR1cmVzJyk7XG4gICAgICAgICAgICAgICAgZmVhdHVyZS5iYm94ID0gZmVhdHVyZS5iYm94ID8gZmVhdHVyZS5iYm94IDogdHVyZkJCb3goZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgbG9hZC5wdXNoKGZlYXR1cmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJidXNoLnByb3RvdHlwZS5sb2FkLmNhbGwodGhpcywgbG9hZCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFtyZW1vdmVdKGh0dHBzOi8vZ2l0aHViLmNvbS9tb3VybmVyL3JidXNoI3JlbW92aW5nLWRhdGEpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0ZlYXR1cmV9IGZlYXR1cmUgcmVtb3ZlIHNpbmdsZSBHZW9KU09OIEZlYXR1cmVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbHMgUGFzcyBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gdG8gY29tcGFyZSBieSB2YWx1ZSBmb3IgcmVtb3ZhbC5cbiAgICAgKiBAcmV0dXJucyB7UkJ1c2h9IEdlb0pTT04gUkJ1c2hcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBwb2x5ID0gdHVyZi5wb2x5Z29uKFtbWy03OCwgNDFdLCBbLTY3LCA0MV0sIFstNjcsIDQ4XSwgWy03OCwgNDhdLCBbLTc4LCA0MV1dXSk7XG4gICAgICpcbiAgICAgKiB0cmVlLnJlbW92ZShwb2x5KTtcbiAgICAgKi9cbiAgICB0cmVlLnJlbW92ZSA9IGZ1bmN0aW9uIChmZWF0dXJlLCBlcXVhbHMpIHtcbiAgICAgICAgaWYgKGZlYXR1cmUudHlwZSAhPT0gJ0ZlYXR1cmUnKSB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZmVhdHVyZScpO1xuICAgICAgICBmZWF0dXJlLmJib3ggPSBmZWF0dXJlLmJib3ggPyBmZWF0dXJlLmJib3ggOiB0dXJmQkJveChmZWF0dXJlKTtcbiAgICAgICAgcmV0dXJuIHJidXNoLnByb3RvdHlwZS5yZW1vdmUuY2FsbCh0aGlzLCBmZWF0dXJlLCBlcXVhbHMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBbY2xlYXJdKGh0dHBzOi8vZ2l0aHViLmNvbS9tb3VybmVyL3JidXNoI3JlbW92aW5nLWRhdGEpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UkJ1c2h9IEdlb0pTT04gUmJ1c2hcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRyZWUuY2xlYXIoKVxuICAgICAqL1xuICAgIHRyZWUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByYnVzaC5wcm90b3R5cGUuY2xlYXIuY2FsbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogW3NlYXJjaF0oaHR0cHM6Ly9naXRodWIuY29tL21vdXJuZXIvcmJ1c2gjc2VhcmNoKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtCQm94fEZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV9IGdlb2pzb24gc2VhcmNoIHdpdGggR2VvSlNPTlxuICAgICAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbn0gYWxsIGZlYXR1cmVzIHRoYXQgaW50ZXJzZWN0cyB3aXRoIHRoZSBnaXZlbiBHZW9KU09OLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHBvbHkgPSB0dXJmLnBvbHlnb24oW1tbLTc4LCA0MV0sIFstNjcsIDQxXSwgWy02NywgNDhdLCBbLTc4LCA0OF0sIFstNzgsIDQxXV1dKTtcbiAgICAgKlxuICAgICAqIHRyZWUuc2VhcmNoKHBvbHkpO1xuICAgICAqL1xuICAgIHRyZWUuc2VhcmNoID0gZnVuY3Rpb24gKGdlb2pzb24pIHtcbiAgICAgICAgdmFyIGZlYXR1cmVzID0gcmJ1c2gucHJvdG90eXBlLnNlYXJjaC5jYWxsKHRoaXMsIHRoaXMudG9CQm94KGdlb2pzb24pKTtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKGZlYXR1cmVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogW2NvbGxpZGVzXShodHRwczovL2dpdGh1Yi5jb20vbW91cm5lci9yYnVzaCNjb2xsaXNpb25zKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtCQm94fEZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV9IGdlb2pzb24gY29sbGlkZXMgd2l0aCBHZW9KU09OXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlcmUgYXJlIGFueSBpdGVtcyBpbnRlcnNlY3RpbmcgdGhlIGdpdmVuIEdlb0pTT04sIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBwb2x5ID0gdHVyZi5wb2x5Z29uKFtbWy03OCwgNDFdLCBbLTY3LCA0MV0sIFstNjcsIDQ4XSwgWy03OCwgNDhdLCBbLTc4LCA0MV1dXSk7XG4gICAgICpcbiAgICAgKiB0cmVlLmNvbGxpZGVzKHBvbHkpO1xuICAgICAqL1xuICAgIHRyZWUuY29sbGlkZXMgPSBmdW5jdGlvbiAoZ2VvanNvbikge1xuICAgICAgICByZXR1cm4gcmJ1c2gucHJvdG90eXBlLmNvbGxpZGVzLmNhbGwodGhpcywgdGhpcy50b0JCb3goZ2VvanNvbikpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBbYWxsXShodHRwczovL2dpdGh1Yi5jb20vbW91cm5lci9yYnVzaCNzZWFyY2gpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7RmVhdHVyZUNvbGxlY3Rpb259IGFsbCB0aGUgZmVhdHVyZXMgaW4gUkJ1c2hcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRyZWUuYWxsKClcbiAgICAgKi9cbiAgICB0cmVlLmFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGZlYXR1cmVzID0gcmJ1c2gucHJvdG90eXBlLmFsbC5jYWxsKHRoaXMpO1xuICAgICAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24oZmVhdHVyZXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBbdG9KU09OXShodHRwczovL2dpdGh1Yi5jb20vbW91cm5lci9yYnVzaCNleHBvcnQtYW5kLWltcG9ydClcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHthbnl9IGV4cG9ydCBkYXRhIGFzIEpTT04gb2JqZWN0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgZXhwb3J0ZWQgPSB0cmVlLnRvSlNPTigpXG4gICAgICovXG4gICAgdHJlZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByYnVzaC5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFtmcm9tSlNPTl0oaHR0cHM6Ly9naXRodWIuY29tL21vdXJuZXIvcmJ1c2gjZXhwb3J0LWFuZC1pbXBvcnQpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2FueX0ganNvbiBpbXBvcnQgcHJldmlvdXNseSBleHBvcnRlZCBkYXRhXG4gICAgICogQHJldHVybnMge1JCdXNofSBHZW9KU09OIFJCdXNoXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgZXhwb3J0ZWQgPSB7XG4gICAgICogICBcImNoaWxkcmVuXCI6IFtcbiAgICAgKiAgICAge1xuICAgICAqICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAgICAgKiAgICAgICBcImdlb21ldHJ5XCI6IHtcbiAgICAgKiAgICAgICAgIFwidHlwZVwiOiBcIlBvaW50XCIsXG4gICAgICogICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFsxMTAsIDUwXVxuICAgICAqICAgICAgIH0sXG4gICAgICogICAgICAgXCJwcm9wZXJ0aWVzXCI6IHt9LFxuICAgICAqICAgICAgIFwiYmJveFwiOiBbMTEwLCA1MCwgMTEwLCA1MF1cbiAgICAgKiAgICAgfVxuICAgICAqICAgXSxcbiAgICAgKiAgIFwiaGVpZ2h0XCI6IDEsXG4gICAgICogICBcImxlYWZcIjogdHJ1ZSxcbiAgICAgKiAgIFwibWluWFwiOiAxMTAsXG4gICAgICogICBcIm1pbllcIjogNTAsXG4gICAgICogICBcIm1heFhcIjogMTEwLFxuICAgICAqICAgXCJtYXhZXCI6IDUwXG4gICAgICogfVxuICAgICAqIHRyZWUuZnJvbUpTT04oZXhwb3J0ZWQpXG4gICAgICovXG4gICAgdHJlZS5mcm9tSlNPTiA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiByYnVzaC5wcm90b3R5cGUuZnJvbUpTT04uY2FsbCh0aGlzLCBqc29uKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgR2VvSlNPTiB0byB7bWluWCwgbWluWSwgbWF4WCwgbWF4WX0gc2NoZW1hXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QkJveHxGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfSBnZW9qc29uIGZlYXR1cmUocykgdG8gcmV0cmlldmUgQkJveCBmcm9tXG4gICAgICogQHJldHVybnMge09iamVjdH0gY29udmVydGVkIHRvIHttaW5YLCBtaW5ZLCBtYXhYLCBtYXhZfVxuICAgICAqL1xuICAgIHRyZWUudG9CQm94ID0gZnVuY3Rpb24gKGdlb2pzb24pIHtcbiAgICAgICAgdmFyIGJib3g7XG4gICAgICAgIGlmIChnZW9qc29uLmJib3gpIGJib3ggPSBnZW9qc29uLmJib3g7XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZ2VvanNvbikgJiYgZ2VvanNvbi5sZW5ndGggPT09IDQpIGJib3ggPSBnZW9qc29uO1xuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGdlb2pzb24pICYmIGdlb2pzb24ubGVuZ3RoID09PSA2KSBiYm94ID0gW2dlb2pzb25bMF0sIGdlb2pzb25bMV0sIGdlb2pzb25bM10sIGdlb2pzb25bNF1dO1xuICAgICAgICBlbHNlIGlmIChnZW9qc29uLnR5cGUgPT09ICdGZWF0dXJlJykgYmJveCA9IHR1cmZCQm94KGdlb2pzb24pO1xuICAgICAgICBlbHNlIGlmIChnZW9qc29uLnR5cGUgPT09ICdGZWF0dXJlQ29sbGVjdGlvbicpIGJib3ggPSB0dXJmQkJveChnZW9qc29uKTtcbiAgICAgICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZ2VvanNvbicpXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1pblg6IGJib3hbMF0sXG4gICAgICAgICAgICBtaW5ZOiBiYm94WzFdLFxuICAgICAgICAgICAgbWF4WDogYmJveFsyXSxcbiAgICAgICAgICAgIG1heFk6IGJib3hbM11cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiB0cmVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdlb2pzb25SYnVzaDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBnZW9qc29uUmJ1c2g7XG4iLCIhZnVuY3Rpb24odCxpKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1pKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShpKToodD10fHxzZWxmKS5SQnVzaD1pKCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQscixlLGEsaCl7IWZ1bmN0aW9uIHQobixyLGUsYSxoKXtmb3IoO2E+ZTspe2lmKGEtZT42MDApe3ZhciBvPWEtZSsxLHM9ci1lKzEsbD1NYXRoLmxvZyhvKSxmPS41Kk1hdGguZXhwKDIqbC8zKSx1PS41Kk1hdGguc3FydChsKmYqKG8tZikvbykqKHMtby8yPDA/LTE6MSksbT1NYXRoLm1heChlLE1hdGguZmxvb3Ioci1zKmYvbyt1KSksYz1NYXRoLm1pbihhLE1hdGguZmxvb3Iocisoby1zKSpmL28rdSkpO3QobixyLG0sYyxoKX12YXIgcD1uW3JdLGQ9ZSx4PWE7Zm9yKGkobixlLHIpLGgoblthXSxwKT4wJiZpKG4sZSxhKTtkPHg7KXtmb3IoaShuLGQseCksZCsrLHgtLTtoKG5bZF0scCk8MDspZCsrO2Zvcig7aChuW3hdLHApPjA7KXgtLX0wPT09aChuW2VdLHApP2kobixlLHgpOmkobiwrK3gsYSkseDw9ciYmKGU9eCsxKSxyPD14JiYoYT14LTEpfX0odCxyLGV8fDAsYXx8dC5sZW5ndGgtMSxofHxuKX1mdW5jdGlvbiBpKHQsaSxuKXt2YXIgcj10W2ldO3RbaV09dFtuXSx0W25dPXJ9ZnVuY3Rpb24gbih0LGkpe3JldHVybiB0PGk/LTE6dD5pPzE6MH12YXIgcj1mdW5jdGlvbih0KXt2b2lkIDA9PT10JiYodD05KSx0aGlzLl9tYXhFbnRyaWVzPU1hdGgubWF4KDQsdCksdGhpcy5fbWluRW50cmllcz1NYXRoLm1heCgyLE1hdGguY2VpbCguNCp0aGlzLl9tYXhFbnRyaWVzKSksdGhpcy5jbGVhcigpfTtmdW5jdGlvbiBlKHQsaSxuKXtpZighbilyZXR1cm4gaS5pbmRleE9mKHQpO2Zvcih2YXIgcj0wO3I8aS5sZW5ndGg7cisrKWlmKG4odCxpW3JdKSlyZXR1cm4gcjtyZXR1cm4tMX1mdW5jdGlvbiBhKHQsaSl7aCh0LDAsdC5jaGlsZHJlbi5sZW5ndGgsaSx0KX1mdW5jdGlvbiBoKHQsaSxuLHIsZSl7ZXx8KGU9cChudWxsKSksZS5taW5YPTEvMCxlLm1pblk9MS8wLGUubWF4WD0tMS8wLGUubWF4WT0tMS8wO2Zvcih2YXIgYT1pO2E8bjthKyspe3ZhciBoPXQuY2hpbGRyZW5bYV07byhlLHQubGVhZj9yKGgpOmgpfXJldHVybiBlfWZ1bmN0aW9uIG8odCxpKXtyZXR1cm4gdC5taW5YPU1hdGgubWluKHQubWluWCxpLm1pblgpLHQubWluWT1NYXRoLm1pbih0Lm1pblksaS5taW5ZKSx0Lm1heFg9TWF0aC5tYXgodC5tYXhYLGkubWF4WCksdC5tYXhZPU1hdGgubWF4KHQubWF4WSxpLm1heFkpLHR9ZnVuY3Rpb24gcyh0LGkpe3JldHVybiB0Lm1pblgtaS5taW5YfWZ1bmN0aW9uIGwodCxpKXtyZXR1cm4gdC5taW5ZLWkubWluWX1mdW5jdGlvbiBmKHQpe3JldHVybih0Lm1heFgtdC5taW5YKSoodC5tYXhZLXQubWluWSl9ZnVuY3Rpb24gdSh0KXtyZXR1cm4gdC5tYXhYLXQubWluWCsodC5tYXhZLXQubWluWSl9ZnVuY3Rpb24gbSh0LGkpe3JldHVybiB0Lm1pblg8PWkubWluWCYmdC5taW5ZPD1pLm1pblkmJmkubWF4WDw9dC5tYXhYJiZpLm1heFk8PXQubWF4WX1mdW5jdGlvbiBjKHQsaSl7cmV0dXJuIGkubWluWDw9dC5tYXhYJiZpLm1pblk8PXQubWF4WSYmaS5tYXhYPj10Lm1pblgmJmkubWF4WT49dC5taW5ZfWZ1bmN0aW9uIHAodCl7cmV0dXJue2NoaWxkcmVuOnQsaGVpZ2h0OjEsbGVhZjohMCxtaW5YOjEvMCxtaW5ZOjEvMCxtYXhYOi0xLzAsbWF4WTotMS8wfX1mdW5jdGlvbiBkKGksbixyLGUsYSl7Zm9yKHZhciBoPVtuLHJdO2gubGVuZ3RoOylpZighKChyPWgucG9wKCkpLShuPWgucG9wKCkpPD1lKSl7dmFyIG89bitNYXRoLmNlaWwoKHItbikvZS8yKSplO3QoaSxvLG4scixhKSxoLnB1c2gobixvLG8scil9fXJldHVybiByLnByb3RvdHlwZS5hbGw9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fYWxsKHRoaXMuZGF0YSxbXSl9LHIucHJvdG90eXBlLnNlYXJjaD1mdW5jdGlvbih0KXt2YXIgaT10aGlzLmRhdGEsbj1bXTtpZighYyh0LGkpKXJldHVybiBuO2Zvcih2YXIgcj10aGlzLnRvQkJveCxlPVtdO2k7KXtmb3IodmFyIGE9MDthPGkuY2hpbGRyZW4ubGVuZ3RoO2ErKyl7dmFyIGg9aS5jaGlsZHJlblthXSxvPWkubGVhZj9yKGgpOmg7Yyh0LG8pJiYoaS5sZWFmP24ucHVzaChoKTptKHQsbyk/dGhpcy5fYWxsKGgsbik6ZS5wdXNoKGgpKX1pPWUucG9wKCl9cmV0dXJuIG59LHIucHJvdG90eXBlLmNvbGxpZGVzPWZ1bmN0aW9uKHQpe3ZhciBpPXRoaXMuZGF0YTtpZighYyh0LGkpKXJldHVybiExO2Zvcih2YXIgbj1bXTtpOyl7Zm9yKHZhciByPTA7cjxpLmNoaWxkcmVuLmxlbmd0aDtyKyspe3ZhciBlPWkuY2hpbGRyZW5bcl0sYT1pLmxlYWY/dGhpcy50b0JCb3goZSk6ZTtpZihjKHQsYSkpe2lmKGkubGVhZnx8bSh0LGEpKXJldHVybiEwO24ucHVzaChlKX19aT1uLnBvcCgpfXJldHVybiExfSxyLnByb3RvdHlwZS5sb2FkPWZ1bmN0aW9uKHQpe2lmKCF0fHwhdC5sZW5ndGgpcmV0dXJuIHRoaXM7aWYodC5sZW5ndGg8dGhpcy5fbWluRW50cmllcyl7Zm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspdGhpcy5pbnNlcnQodFtpXSk7cmV0dXJuIHRoaXN9dmFyIG49dGhpcy5fYnVpbGQodC5zbGljZSgpLDAsdC5sZW5ndGgtMSwwKTtpZih0aGlzLmRhdGEuY2hpbGRyZW4ubGVuZ3RoKWlmKHRoaXMuZGF0YS5oZWlnaHQ9PT1uLmhlaWdodCl0aGlzLl9zcGxpdFJvb3QodGhpcy5kYXRhLG4pO2Vsc2V7aWYodGhpcy5kYXRhLmhlaWdodDxuLmhlaWdodCl7dmFyIHI9dGhpcy5kYXRhO3RoaXMuZGF0YT1uLG49cn10aGlzLl9pbnNlcnQobix0aGlzLmRhdGEuaGVpZ2h0LW4uaGVpZ2h0LTEsITApfWVsc2UgdGhpcy5kYXRhPW47cmV0dXJuIHRoaXN9LHIucHJvdG90eXBlLmluc2VydD1mdW5jdGlvbih0KXtyZXR1cm4gdCYmdGhpcy5faW5zZXJ0KHQsdGhpcy5kYXRhLmhlaWdodC0xKSx0aGlzfSxyLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmRhdGE9cChbXSksdGhpc30sci5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKHQsaSl7aWYoIXQpcmV0dXJuIHRoaXM7Zm9yKHZhciBuLHIsYSxoPXRoaXMuZGF0YSxvPXRoaXMudG9CQm94KHQpLHM9W10sbD1bXTtofHxzLmxlbmd0aDspe2lmKGh8fChoPXMucG9wKCkscj1zW3MubGVuZ3RoLTFdLG49bC5wb3AoKSxhPSEwKSxoLmxlYWYpe3ZhciBmPWUodCxoLmNoaWxkcmVuLGkpO2lmKC0xIT09ZilyZXR1cm4gaC5jaGlsZHJlbi5zcGxpY2UoZiwxKSxzLnB1c2goaCksdGhpcy5fY29uZGVuc2UocyksdGhpc31hfHxoLmxlYWZ8fCFtKGgsbyk/cj8obisrLGg9ci5jaGlsZHJlbltuXSxhPSExKTpoPW51bGw6KHMucHVzaChoKSxsLnB1c2gobiksbj0wLHI9aCxoPWguY2hpbGRyZW5bMF0pfXJldHVybiB0aGlzfSxyLnByb3RvdHlwZS50b0JCb3g9ZnVuY3Rpb24odCl7cmV0dXJuIHR9LHIucHJvdG90eXBlLmNvbXBhcmVNaW5YPWZ1bmN0aW9uKHQsaSl7cmV0dXJuIHQubWluWC1pLm1pblh9LHIucHJvdG90eXBlLmNvbXBhcmVNaW5ZPWZ1bmN0aW9uKHQsaSl7cmV0dXJuIHQubWluWS1pLm1pbll9LHIucHJvdG90eXBlLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmRhdGF9LHIucHJvdG90eXBlLmZyb21KU09OPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmRhdGE9dCx0aGlzfSxyLnByb3RvdHlwZS5fYWxsPWZ1bmN0aW9uKHQsaSl7Zm9yKHZhciBuPVtdO3Q7KXQubGVhZj9pLnB1c2guYXBwbHkoaSx0LmNoaWxkcmVuKTpuLnB1c2guYXBwbHkobix0LmNoaWxkcmVuKSx0PW4ucG9wKCk7cmV0dXJuIGl9LHIucHJvdG90eXBlLl9idWlsZD1mdW5jdGlvbih0LGksbixyKXt2YXIgZSxoPW4taSsxLG89dGhpcy5fbWF4RW50cmllcztpZihoPD1vKXJldHVybiBhKGU9cCh0LnNsaWNlKGksbisxKSksdGhpcy50b0JCb3gpLGU7cnx8KHI9TWF0aC5jZWlsKE1hdGgubG9nKGgpL01hdGgubG9nKG8pKSxvPU1hdGguY2VpbChoL01hdGgucG93KG8sci0xKSkpLChlPXAoW10pKS5sZWFmPSExLGUuaGVpZ2h0PXI7dmFyIHM9TWF0aC5jZWlsKGgvbyksbD1zKk1hdGguY2VpbChNYXRoLnNxcnQobykpO2QodCxpLG4sbCx0aGlzLmNvbXBhcmVNaW5YKTtmb3IodmFyIGY9aTtmPD1uO2YrPWwpe3ZhciB1PU1hdGgubWluKGYrbC0xLG4pO2QodCxmLHUscyx0aGlzLmNvbXBhcmVNaW5ZKTtmb3IodmFyIG09ZjttPD11O20rPXMpe3ZhciBjPU1hdGgubWluKG0rcy0xLHUpO2UuY2hpbGRyZW4ucHVzaCh0aGlzLl9idWlsZCh0LG0sYyxyLTEpKX19cmV0dXJuIGEoZSx0aGlzLnRvQkJveCksZX0sci5wcm90b3R5cGUuX2Nob29zZVN1YnRyZWU9ZnVuY3Rpb24odCxpLG4scil7Zm9yKDtyLnB1c2goaSksIWkubGVhZiYmci5sZW5ndGgtMSE9PW47KXtmb3IodmFyIGU9MS8wLGE9MS8wLGg9dm9pZCAwLG89MDtvPGkuY2hpbGRyZW4ubGVuZ3RoO28rKyl7dmFyIHM9aS5jaGlsZHJlbltvXSxsPWYocyksdT0obT10LGM9cywoTWF0aC5tYXgoYy5tYXhYLG0ubWF4WCktTWF0aC5taW4oYy5taW5YLG0ubWluWCkpKihNYXRoLm1heChjLm1heFksbS5tYXhZKS1NYXRoLm1pbihjLm1pblksbS5taW5ZKSktbCk7dTxhPyhhPXUsZT1sPGU/bDplLGg9cyk6dT09PWEmJmw8ZSYmKGU9bCxoPXMpfWk9aHx8aS5jaGlsZHJlblswXX12YXIgbSxjO3JldHVybiBpfSxyLnByb3RvdHlwZS5faW5zZXJ0PWZ1bmN0aW9uKHQsaSxuKXt2YXIgcj1uP3Q6dGhpcy50b0JCb3godCksZT1bXSxhPXRoaXMuX2Nob29zZVN1YnRyZWUocix0aGlzLmRhdGEsaSxlKTtmb3IoYS5jaGlsZHJlbi5wdXNoKHQpLG8oYSxyKTtpPj0wJiZlW2ldLmNoaWxkcmVuLmxlbmd0aD50aGlzLl9tYXhFbnRyaWVzOyl0aGlzLl9zcGxpdChlLGkpLGktLTt0aGlzLl9hZGp1c3RQYXJlbnRCQm94ZXMocixlLGkpfSxyLnByb3RvdHlwZS5fc3BsaXQ9ZnVuY3Rpb24odCxpKXt2YXIgbj10W2ldLHI9bi5jaGlsZHJlbi5sZW5ndGgsZT10aGlzLl9taW5FbnRyaWVzO3RoaXMuX2Nob29zZVNwbGl0QXhpcyhuLGUscik7dmFyIGg9dGhpcy5fY2hvb3NlU3BsaXRJbmRleChuLGUsciksbz1wKG4uY2hpbGRyZW4uc3BsaWNlKGgsbi5jaGlsZHJlbi5sZW5ndGgtaCkpO28uaGVpZ2h0PW4uaGVpZ2h0LG8ubGVhZj1uLmxlYWYsYShuLHRoaXMudG9CQm94KSxhKG8sdGhpcy50b0JCb3gpLGk/dFtpLTFdLmNoaWxkcmVuLnB1c2gobyk6dGhpcy5fc3BsaXRSb290KG4sbyl9LHIucHJvdG90eXBlLl9zcGxpdFJvb3Q9ZnVuY3Rpb24odCxpKXt0aGlzLmRhdGE9cChbdCxpXSksdGhpcy5kYXRhLmhlaWdodD10LmhlaWdodCsxLHRoaXMuZGF0YS5sZWFmPSExLGEodGhpcy5kYXRhLHRoaXMudG9CQm94KX0sci5wcm90b3R5cGUuX2Nob29zZVNwbGl0SW5kZXg9ZnVuY3Rpb24odCxpLG4pe2Zvcih2YXIgcixlLGEsbyxzLGwsdSxtPTEvMCxjPTEvMCxwPWk7cDw9bi1pO3ArKyl7dmFyIGQ9aCh0LDAscCx0aGlzLnRvQkJveCkseD1oKHQscCxuLHRoaXMudG9CQm94KSx2PShlPWQsYT14LG89dm9pZCAwLHM9dm9pZCAwLGw9dm9pZCAwLHU9dm9pZCAwLG89TWF0aC5tYXgoZS5taW5YLGEubWluWCkscz1NYXRoLm1heChlLm1pblksYS5taW5ZKSxsPU1hdGgubWluKGUubWF4WCxhLm1heFgpLHU9TWF0aC5taW4oZS5tYXhZLGEubWF4WSksTWF0aC5tYXgoMCxsLW8pKk1hdGgubWF4KDAsdS1zKSksTT1mKGQpK2YoeCk7djxtPyhtPXYscj1wLGM9TTxjP006Yyk6dj09PW0mJk08YyYmKGM9TSxyPXApfXJldHVybiByfHxuLWl9LHIucHJvdG90eXBlLl9jaG9vc2VTcGxpdEF4aXM9ZnVuY3Rpb24odCxpLG4pe3ZhciByPXQubGVhZj90aGlzLmNvbXBhcmVNaW5YOnMsZT10LmxlYWY/dGhpcy5jb21wYXJlTWluWTpsO3RoaXMuX2FsbERpc3RNYXJnaW4odCxpLG4scik8dGhpcy5fYWxsRGlzdE1hcmdpbih0LGksbixlKSYmdC5jaGlsZHJlbi5zb3J0KHIpfSxyLnByb3RvdHlwZS5fYWxsRGlzdE1hcmdpbj1mdW5jdGlvbih0LGksbixyKXt0LmNoaWxkcmVuLnNvcnQocik7Zm9yKHZhciBlPXRoaXMudG9CQm94LGE9aCh0LDAsaSxlKSxzPWgodCxuLWksbixlKSxsPXUoYSkrdShzKSxmPWk7ZjxuLWk7ZisrKXt2YXIgbT10LmNoaWxkcmVuW2ZdO28oYSx0LmxlYWY/ZShtKTptKSxsKz11KGEpfWZvcih2YXIgYz1uLWktMTtjPj1pO2MtLSl7dmFyIHA9dC5jaGlsZHJlbltjXTtvKHMsdC5sZWFmP2UocCk6cCksbCs9dShzKX1yZXR1cm4gbH0sci5wcm90b3R5cGUuX2FkanVzdFBhcmVudEJCb3hlcz1mdW5jdGlvbih0LGksbil7Zm9yKHZhciByPW47cj49MDtyLS0pbyhpW3JdLHQpfSxyLnByb3RvdHlwZS5fY29uZGVuc2U9ZnVuY3Rpb24odCl7Zm9yKHZhciBpPXQubGVuZ3RoLTEsbj12b2lkIDA7aT49MDtpLS0pMD09PXRbaV0uY2hpbGRyZW4ubGVuZ3RoP2k+MD8obj10W2ktMV0uY2hpbGRyZW4pLnNwbGljZShuLmluZGV4T2YodFtpXSksMSk6dGhpcy5jbGVhcigpOmEodFtpXSx0aGlzLnRvQkJveCl9LHJ9KTtcbiIsImV4cG9ydCBjb25zdCBsaW5lID0gYDxzdmcgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiLTUgMCAzMiAzMlwiID5cclxuPHBhdGggZD1cIk0yMy4zNiA5LjMyYy0xLjMyIDAtMi4zNiAxLjA4MC0yLjM2IDIuMzYgMCAwLjI4IDAuMDQwIDAuNTYgMC4xMiAwLjhsLTQuOCA0LjA4MGMtMC4zMi0wLjItMC43Mi0wLjI4LTEuMTYtMC4yOHMtMC44OCAwLjEyLTEuMjQgMC4zNmwtMi43Mi0yLjJjMC4wODAtMC4yNCAwLjEyLTAuNDQgMC4xMi0wLjcyIDAtMS4zMi0xLjA4MC0yLjM2LTIuMzYtMi4zNi0xLjMyIDAtMi4zNiAxLjA4MC0yLjM2IDIuMzYgMCAwLjM2IDAuMDgwIDAuNjggMC4yIDAuOTZsLTMuNDQgMy40NGMtMC4yOC0wLjEyLTAuNjQtMC4yLTAuOTYtMC4yLTEuMzIgMC0yLjM2IDEuMDgwLTIuMzYgMi4zNiAwIDEuMzIgMS4wODAgMi4zNiAyLjM2IDIuMzZzMi4zNi0xLjA4MCAyLjM2LTIuMzZjMC0wLjM2LTAuMDgwLTAuNjgtMC4yLTAuOTZsMy40NC0zLjQ0YzAuMjggMC4xMiAwLjY0IDAuMiAwLjk2IDAuMiAwLjQ0IDAgMC44OC0wLjEyIDEuMjQtMC4zNmwyLjc2IDIuMTJjLTAuMDgwIDAuMjQtMC4wODAgMC40NC0wLjA4MCAwLjcyIDAgMS4zMiAxLjA4MCAyLjM2IDIuMzYgMi4zNnMyLjM2LTEuMDgwIDIuMzYtMi4zNmMwLTAuMjgtMC4wNDAtMC41Ni0wLjEyLTAuOGw0LjgtNC4wODBjMC4zMiAwLjIgMC43MiAwLjI4IDEuMTYgMC4yOCAxLjMyIDAgMi4zNi0xLjA4MCAyLjM2LTIuMzYtMC4wNDAtMS4yLTEuMTYtMi4yOC0yLjQ0LTIuMjh6TTIuMzYgMjFjLTAuMzYgMC0wLjY4LTAuMzItMC42OC0wLjY4IDAtMC40IDAuMzItMC42OCAwLjY4LTAuNjhzMC42OCAwLjMyIDAuNjggMC42OGMwIDAuMzYtMC4yOCAwLjY4LTAuNjggMC42OHpNOC4yNCAxMy43NmMwLTAuNCAwLjMyLTAuNjggMC42OC0wLjY4czAuNjggMC4zMiAwLjY4IDAuNjgtMC4zMiAwLjY4LTAuNjggMC42OGMtMC4zNiAwLTAuNjgtMC4zMi0wLjY4LTAuNjh6TTE1LjIgMTkuMjhjLTAuNCAwLTAuNjgtMC4zMi0wLjY4LTAuNjhzMC4zMi0wLjY4IDAuNjgtMC42OCAwLjY4IDAuMzIgMC42OCAwLjY4Yy0wLjA0MCAwLjQtMC4yOCAwLjY4LTAuNjggMC42OHpNMjMuMzYgMTIuMzZjLTAuMzYgMC0wLjY4LTAuMzItMC42OC0wLjY4IDAtMC40IDAuMzItMC42OCAwLjY4LTAuNjggMC40IDAgMC42OCAwLjMyIDAuNjggMC42OCAwIDAuNC0wLjMyIDAuNjgtMC42OCAwLjY4elwiPjwvcGF0aD5cclxuPC9zdmc+YDtcclxuXHJcbmV4cG9ydCBjb25zdCBzZWxlY3QgPSBgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCItNCAtMyAyOCAyOFwiID5cclxuPGcgaWQ9XCJzZWxlY3RcIj5cclxuPHBhdGggZD1cIk0xNC44LDI0bC0zLjMtNC4zbC0zLjIsNC4yTDUuOCw2LjlsMTYsNy4yTDE2LjQsMTZsMy4yLDQuM0wxNC44LDI0eiBNMTEuNiwxNi40bDMuNiw0LjhsMS42LTEuM0wxMy4xLDE1bDMuMy0xLjFsLTguMS0zLjZcclxuICBsMS4zLDguN0wxMS42LDE2LjR6XCIvPlxyXG48cGF0aCBkPVwiTTQsMThIMHYtNGgydjJoMlYxOHogTTIsMTJIMFY2aDJWMTJ6IE0xOCwxMGgtMlY2aDJWMTB6IE0xOCw0aC0yVjJoLTJWMGg0VjR6IE0yLDRIMFYwaDR2MkgyVjR6IE0xMiwySDZWMGg2VjJ6XCIvPlxyXG48L2c+XHJcbjwvc3ZnPmA7XHJcblxyXG5leHBvcnQgY29uc3QgdW5zZWxlY3QgPSBgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIFxyXG52aWV3Qm94PVwiMCAwIDE1IDE2XCI+XHJcbjxnIGlkPVwidW5zZWxlY3RcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTQ2MS43MTQgLTUzMS43OSlcIj5cclxuPHBhdGggIGQ9XCJNNDcwLjcxNCA1MzMuODc3djEuMDE1YTUgNSAwIDAgMSAxLjc1NC43M2wuNzE3LS43MTZhNiA2IDAgMCAwLTIuNDctMS4wM3ptLTIgLjAwNGE2IDYgMCAwIDAtMi40NzIgMS4wMjNsLjcxOC43MTlhNSA1IDAgMCAxIDEuNzU0LS43Mjd6bTUuODg3IDIuNDM3LS43MTkuNzE5YTUgNSAwIDAgMSAuNzI3IDEuNzU0aDEuMDE1YTYgNiAwIDAgMC0xLjAyMy0yLjQ3M3ptLTkuNzcxLjAwMmE2IDYgMCAwIDAtMS4wMyAyLjQ3aDEuMDE2YTUgNSAwIDAgMSAuNzMtMS43NTN6bS0xLjAyNiA0LjQ3YTYgNiAwIDAgMCAxLjAyNCAyLjQ3NGwuNzE4LS43MmE1IDUgMCAwIDEtLjcyNi0xLjc1M3ptMTAuODA5IDBhNSA1IDAgMCAxLS43MyAxLjc1NWwuNzE2LjcxN2E2IDYgMCAwIDAgMS4wMy0yLjQ3MXptLTcuNjUzIDMuMTY5LS43MTYuNzE3YTYgNiAwIDAgMCAyLjQ3IDEuMDI5di0xLjAxNmE1IDUgMCAwIDEtMS43NTQtLjczem01LjUwOCAwYTUgNSAwIDAgMS0xLjc1NC43MjZ2MS4wMTZhNiA2IDAgMCAwIDIuNDczLTEuMDIzelwiIGlkPVwicGF0aDg1OFwiLz5cclxuPHJlY3QgdHJhbnNmb3JtPVwicm90YXRlKC00NSlcIiB3aWR0aD1cIjFcIiBoZWlnaHQ9XCI4LjAwMDAwMjlcIiB4PVwiLTUwLjA1MTU1MlwiIHk9XCI3MDkuODI3ODhcIi8+XHJcbjxyZWN0IHdpZHRoPVwiMVwiIGhlaWdodD1cIjhcIiB4PVwiLTcxNC4zMjc4OFwiIHk9XCItNTMuNTUxNTUyXCIgdHJhbnNmb3JtPVwicm90YXRlKC0xMzUpXCIvPlxyXG48L2c+XHJcbjwvc3ZnPmA7XHJcbiIsImltcG9ydCBib29sZWFuUG9pbnRJblBvbHlnb24gZnJvbSBcIkB0dXJmL2Jvb2xlYW4tcG9pbnQtaW4tcG9seWdvblwiO1xuaW1wb3J0IGxpbmVJbnRlcnNlY3QgZnJvbSBcIkB0dXJmL2xpbmUtaW50ZXJzZWN0XCI7XG5pbXBvcnQgeyBmbGF0dGVuRWFjaCB9IGZyb20gXCJAdHVyZi9tZXRhXCI7XG5pbXBvcnQgcG9seWdvblRvTGluZSBmcm9tIFwiQHR1cmYvcG9seWdvbi10by1saW5lXCI7XG4vKipcbiAqIEJvb2xlYW4tZGlzam9pbnQgcmV0dXJucyAoVFJVRSkgaWYgdGhlIGludGVyc2VjdGlvbiBvZiB0aGUgdHdvIGdlb21ldHJpZXMgaXMgYW4gZW1wdHkgc2V0LlxuICpcbiAqIEBuYW1lIGJvb2xlYW5EaXNqb2ludFxuICogQHBhcmFtIHtHZW9tZXRyeXxGZWF0dXJlPGFueT59IGZlYXR1cmUxIEdlb0pTT04gRmVhdHVyZSBvciBHZW9tZXRyeVxuICogQHBhcmFtIHtHZW9tZXRyeXxGZWF0dXJlPGFueT59IGZlYXR1cmUyIEdlb0pTT04gRmVhdHVyZSBvciBHZW9tZXRyeVxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUvZmFsc2VcbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9pbnQgPSB0dXJmLnBvaW50KFsyLCAyXSk7XG4gKiB2YXIgbGluZSA9IHR1cmYubGluZVN0cmluZyhbWzEsIDFdLCBbMSwgMl0sIFsxLCAzXSwgWzEsIDRdXSk7XG4gKlxuICogdHVyZi5ib29sZWFuRGlzam9pbnQobGluZSwgcG9pbnQpO1xuICogLy89dHJ1ZVxuICovXG5mdW5jdGlvbiBib29sZWFuRGlzam9pbnQoZmVhdHVyZTEsIGZlYXR1cmUyKSB7XG4gICAgdmFyIGJvb2wgPSB0cnVlO1xuICAgIGZsYXR0ZW5FYWNoKGZlYXR1cmUxLCBmdW5jdGlvbiAoZmxhdHRlbjEpIHtcbiAgICAgICAgZmxhdHRlbkVhY2goZmVhdHVyZTIsIGZ1bmN0aW9uIChmbGF0dGVuMikge1xuICAgICAgICAgICAgaWYgKGJvb2wgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9vbCA9IGRpc2pvaW50KGZsYXR0ZW4xLmdlb21ldHJ5LCBmbGF0dGVuMi5nZW9tZXRyeSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBib29sO1xufVxuLyoqXG4gKiBEaXNqb2ludCBvcGVyYXRpb24gZm9yIHNpbXBsZSBHZW9tZXRyaWVzIChQb2ludC9MaW5lU3RyaW5nL1BvbHlnb24pXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7R2VvbWV0cnk8YW55Pn0gZ2VvbTEgR2VvSlNPTiBHZW9tZXRyeVxuICogQHBhcmFtIHtHZW9tZXRyeTxhbnk+fSBnZW9tMiBHZW9KU09OIEdlb21ldHJ5XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZS9mYWxzZVxuICovXG5mdW5jdGlvbiBkaXNqb2ludChnZW9tMSwgZ2VvbTIpIHtcbiAgICBzd2l0Y2ggKGdlb20xLnR5cGUpIHtcbiAgICAgICAgY2FzZSBcIlBvaW50XCI6XG4gICAgICAgICAgICBzd2l0Y2ggKGdlb20yLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFjb21wYXJlQ29vcmRzKGdlb20xLmNvb3JkaW5hdGVzLCBnZW9tMi5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc1BvaW50T25MaW5lKGdlb20yLCBnZW9tMSk7XG4gICAgICAgICAgICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFib29sZWFuUG9pbnRJblBvbHlnb24oZ2VvbTEsIGdlb20yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgICAgIHN3aXRjaCAoZ2VvbTIudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWlzUG9pbnRPbkxpbmUoZ2VvbTEsIGdlb20yKTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWlzTGluZU9uTGluZShnZW9tMSwgZ2VvbTIpO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNMaW5lSW5Qb2x5KGdlb20yLCBnZW9tMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICAgICAgICBzd2l0Y2ggKGdlb20yLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFib29sZWFuUG9pbnRJblBvbHlnb24oZ2VvbTIsIGdlb20xKTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWlzTGluZUluUG9seShnZW9tMSwgZ2VvbTIpO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNQb2x5SW5Qb2x5KGdlb20yLCBnZW9tMSk7XG4gICAgICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzExOTA4MTU4LzE5NzkwODVcbmZ1bmN0aW9uIGlzUG9pbnRPbkxpbmUobGluZVN0cmluZywgcHQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVTdHJpbmcuY29vcmRpbmF0ZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGlmIChpc1BvaW50T25MaW5lU2VnbWVudChsaW5lU3RyaW5nLmNvb3JkaW5hdGVzW2ldLCBsaW5lU3RyaW5nLmNvb3JkaW5hdGVzW2kgKyAxXSwgcHQuY29vcmRpbmF0ZXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBpc0xpbmVPbkxpbmUobGluZVN0cmluZzEsIGxpbmVTdHJpbmcyKSB7XG4gICAgdmFyIGRvTGluZXNJbnRlcnNlY3QgPSBsaW5lSW50ZXJzZWN0KGxpbmVTdHJpbmcxLCBsaW5lU3RyaW5nMik7XG4gICAgaWYgKGRvTGluZXNJbnRlcnNlY3QuZmVhdHVyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gaXNMaW5lSW5Qb2x5KHBvbHlnb24sIGxpbmVTdHJpbmcpIHtcbiAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gbGluZVN0cmluZy5jb29yZGluYXRlczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIGNvb3JkID0gX2FbX2ldO1xuICAgICAgICBpZiAoYm9vbGVhblBvaW50SW5Qb2x5Z29uKGNvb3JkLCBwb2x5Z29uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGRvTGluZXNJbnRlcnNlY3QgPSBsaW5lSW50ZXJzZWN0KGxpbmVTdHJpbmcsIHBvbHlnb25Ub0xpbmUocG9seWdvbikpO1xuICAgIGlmIChkb0xpbmVzSW50ZXJzZWN0LmZlYXR1cmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8qKlxuICogSXMgUG9seWdvbiAoZ2VvbTEpIGluIFBvbHlnb24gKGdlb20yKVxuICogT25seSB0YWtlcyBpbnRvIGFjY291bnQgb3V0ZXIgcmluZ3NcbiAqIFNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80ODMzODIzLzE5NzkwODVcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtHZW9tZXRyeXxGZWF0dXJlPFBvbHlnb24+fSBmZWF0dXJlMSBQb2x5Z29uMVxuICogQHBhcmFtIHtHZW9tZXRyeXxGZWF0dXJlPFBvbHlnb24+fSBmZWF0dXJlMiBQb2x5Z29uMlxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUvZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNQb2x5SW5Qb2x5KGZlYXR1cmUxLCBmZWF0dXJlMikge1xuICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBmZWF0dXJlMS5jb29yZGluYXRlc1swXTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIGNvb3JkMSA9IF9hW19pXTtcbiAgICAgICAgaWYgKGJvb2xlYW5Qb2ludEluUG9seWdvbihjb29yZDEsIGZlYXR1cmUyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2IgPSAwLCBfYyA9IGZlYXR1cmUyLmNvb3JkaW5hdGVzWzBdOyBfYiA8IF9jLmxlbmd0aDsgX2IrKykge1xuICAgICAgICB2YXIgY29vcmQyID0gX2NbX2JdO1xuICAgICAgICBpZiAoYm9vbGVhblBvaW50SW5Qb2x5Z29uKGNvb3JkMiwgZmVhdHVyZTEpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgZG9MaW5lc0ludGVyc2VjdCA9IGxpbmVJbnRlcnNlY3QocG9seWdvblRvTGluZShmZWF0dXJlMSksIHBvbHlnb25Ub0xpbmUoZmVhdHVyZTIpKTtcbiAgICBpZiAoZG9MaW5lc0ludGVyc2VjdC5mZWF0dXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBpc1BvaW50T25MaW5lU2VnbWVudChsaW5lU2VnbWVudFN0YXJ0LCBsaW5lU2VnbWVudEVuZCwgcHQpIHtcbiAgICB2YXIgZHhjID0gcHRbMF0gLSBsaW5lU2VnbWVudFN0YXJ0WzBdO1xuICAgIHZhciBkeWMgPSBwdFsxXSAtIGxpbmVTZWdtZW50U3RhcnRbMV07XG4gICAgdmFyIGR4bCA9IGxpbmVTZWdtZW50RW5kWzBdIC0gbGluZVNlZ21lbnRTdGFydFswXTtcbiAgICB2YXIgZHlsID0gbGluZVNlZ21lbnRFbmRbMV0gLSBsaW5lU2VnbWVudFN0YXJ0WzFdO1xuICAgIHZhciBjcm9zcyA9IGR4YyAqIGR5bCAtIGR5YyAqIGR4bDtcbiAgICBpZiAoY3Jvc3MgIT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoTWF0aC5hYnMoZHhsKSA+PSBNYXRoLmFicyhkeWwpKSB7XG4gICAgICAgIGlmIChkeGwgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbGluZVNlZ21lbnRTdGFydFswXSA8PSBwdFswXSAmJiBwdFswXSA8PSBsaW5lU2VnbWVudEVuZFswXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBsaW5lU2VnbWVudEVuZFswXSA8PSBwdFswXSAmJiBwdFswXSA8PSBsaW5lU2VnbWVudFN0YXJ0WzBdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGR5bCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGxpbmVTZWdtZW50U3RhcnRbMV0gPD0gcHRbMV0gJiYgcHRbMV0gPD0gbGluZVNlZ21lbnRFbmRbMV07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbGluZVNlZ21lbnRFbmRbMV0gPD0gcHRbMV0gJiYgcHRbMV0gPD0gbGluZVNlZ21lbnRTdGFydFsxXTtcbiAgICB9XG59XG4vKipcbiAqIGNvbXBhcmVDb29yZHNcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtQb3NpdGlvbn0gcGFpcjEgcG9pbnQgW3gseV1cbiAqIEBwYXJhbSB7UG9zaXRpb259IHBhaXIyIHBvaW50IFt4LHldXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZS9mYWxzZSBpZiBjb29yZCBwYWlycyBtYXRjaFxuICovXG5mdW5jdGlvbiBjb21wYXJlQ29vcmRzKHBhaXIxLCBwYWlyMikge1xuICAgIHJldHVybiBwYWlyMVswXSA9PT0gcGFpcjJbMF0gJiYgcGFpcjFbMV0gPT09IHBhaXIyWzFdO1xufVxuZXhwb3J0IGRlZmF1bHQgYm9vbGVhbkRpc2pvaW50O1xuIiwiaW1wb3J0IGJvb2xlYW5EaXNqb2ludCBmcm9tIFwiQHR1cmYvYm9vbGVhbi1kaXNqb2ludFwiO1xuaW1wb3J0IHsgZmxhdHRlbkVhY2ggfSBmcm9tIFwiQHR1cmYvbWV0YVwiO1xuLyoqXG4gKiBCb29sZWFuLWludGVyc2VjdHMgcmV0dXJucyAoVFJVRSkgdHdvIGdlb21ldHJpZXMgaW50ZXJzZWN0LlxuICpcbiAqIEBuYW1lIGJvb2xlYW5JbnRlcnNlY3RzXG4gKiBAcGFyYW0ge0dlb21ldHJ5fEZlYXR1cmU8YW55Pn0gZmVhdHVyZTEgR2VvSlNPTiBGZWF0dXJlIG9yIEdlb21ldHJ5XG4gKiBAcGFyYW0ge0dlb21ldHJ5fEZlYXR1cmU8YW55Pn0gZmVhdHVyZTIgR2VvSlNPTiBGZWF0dXJlIG9yIEdlb21ldHJ5XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZS9mYWxzZVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2ludCA9IHR1cmYucG9pbnQoWzIsIDJdKTtcbiAqIHZhciBsaW5lID0gdHVyZi5saW5lU3RyaW5nKFtbMSwgMV0sIFsxLCAyXSwgWzEsIDNdLCBbMSwgNF1dKTtcbiAqXG4gKiB0dXJmLmJvb2xlYW5JbnRlcnNlY3RzKGxpbmUsIHBvaW50KTtcbiAqIC8vPXRydWVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYm9vbGVhbkludGVyc2VjdHMoZmVhdHVyZTEsIGZlYXR1cmUyKSB7XG4gICAgdmFyIGJvb2wgPSBmYWxzZTtcbiAgICBmbGF0dGVuRWFjaChmZWF0dXJlMSwgZnVuY3Rpb24gKGZsYXR0ZW4xKSB7XG4gICAgICAgIGZsYXR0ZW5FYWNoKGZlYXR1cmUyLCBmdW5jdGlvbiAoZmxhdHRlbjIpIHtcbiAgICAgICAgICAgIGlmIChib29sID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib29sID0gIWJvb2xlYW5EaXNqb2ludChmbGF0dGVuMS5nZW9tZXRyeSwgZmxhdHRlbjIuZ2VvbWV0cnkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYm9vbDtcbn1cbiIsImltcG9ydCB7IGdldENvb3JkLCBnZXRHZW9tIH0gZnJvbSBcIkB0dXJmL2ludmFyaWFudFwiO1xuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9FdmVuJUUyJTgwJTkzb2RkX3J1bGVcbi8vIG1vZGlmaWVkIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9zdWJzdGFjay9wb2ludC1pbi1wb2x5Z29uL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG4vLyB3aGljaCB3YXMgbW9kaWZpZWQgZnJvbSBodHRwOi8vd3d3LmVjc2UucnBpLmVkdS9Ib21lcGFnZXMvd3JmL1Jlc2VhcmNoL1Nob3J0X05vdGVzL3BucG9seS5odG1sXG4vKipcbiAqIFRha2VzIGEge0BsaW5rIFBvaW50fSBhbmQgYSB7QGxpbmsgUG9seWdvbn0gb3Ige0BsaW5rIE11bHRpUG9seWdvbn0gYW5kIGRldGVybWluZXMgaWYgdGhlIHBvaW50XG4gKiByZXNpZGVzIGluc2lkZSB0aGUgcG9seWdvbi4gVGhlIHBvbHlnb24gY2FuIGJlIGNvbnZleCBvciBjb25jYXZlLiBUaGUgZnVuY3Rpb24gYWNjb3VudHMgZm9yIGhvbGVzLlxuICpcbiAqIEBuYW1lIGJvb2xlYW5Qb2ludEluUG9seWdvblxuICogQHBhcmFtIHtDb29yZH0gcG9pbnQgaW5wdXQgcG9pbnRcbiAqIEBwYXJhbSB7RmVhdHVyZTxQb2x5Z29ufE11bHRpUG9seWdvbj59IHBvbHlnb24gaW5wdXQgcG9seWdvbiBvciBtdWx0aXBvbHlnb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5pZ25vcmVCb3VuZGFyeT1mYWxzZV0gVHJ1ZSBpZiBwb2x5Z29uIGJvdW5kYXJ5IHNob3VsZCBiZSBpZ25vcmVkIHdoZW4gZGV0ZXJtaW5pbmcgaWZcbiAqIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIHBvbHlnb24gb3RoZXJ3aXNlIGZhbHNlLlxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgUG9pbnQgaXMgaW5zaWRlIHRoZSBQb2x5Z29uOyBgZmFsc2VgIGlmIHRoZSBQb2ludCBpcyBub3QgaW5zaWRlIHRoZSBQb2x5Z29uXG4gKiBAZXhhbXBsZVxuICogdmFyIHB0ID0gdHVyZi5wb2ludChbLTc3LCA0NF0pO1xuICogdmFyIHBvbHkgPSB0dXJmLnBvbHlnb24oW1tcbiAqICAgWy04MSwgNDFdLFxuICogICBbLTgxLCA0N10sXG4gKiAgIFstNzIsIDQ3XSxcbiAqICAgWy03MiwgNDFdLFxuICogICBbLTgxLCA0MV1cbiAqIF1dKTtcbiAqXG4gKiB0dXJmLmJvb2xlYW5Qb2ludEluUG9seWdvbihwdCwgcG9seSk7XG4gKiAvLz0gdHJ1ZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBib29sZWFuUG9pbnRJblBvbHlnb24ocG9pbnQsIHBvbHlnb24sIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIC8vIHZhbGlkYXRpb25cbiAgICBpZiAoIXBvaW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInBvaW50IGlzIHJlcXVpcmVkXCIpO1xuICAgIH1cbiAgICBpZiAoIXBvbHlnb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicG9seWdvbiBpcyByZXF1aXJlZFwiKTtcbiAgICB9XG4gICAgdmFyIHB0ID0gZ2V0Q29vcmQocG9pbnQpO1xuICAgIHZhciBnZW9tID0gZ2V0R2VvbShwb2x5Z29uKTtcbiAgICB2YXIgdHlwZSA9IGdlb20udHlwZTtcbiAgICB2YXIgYmJveCA9IHBvbHlnb24uYmJveDtcbiAgICB2YXIgcG9seXMgPSBnZW9tLmNvb3JkaW5hdGVzO1xuICAgIC8vIFF1aWNrIGVsaW1pbmF0aW9uIGlmIHBvaW50IGlzIG5vdCBpbnNpZGUgYmJveFxuICAgIGlmIChiYm94ICYmIGluQkJveChwdCwgYmJveCkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gbm9ybWFsaXplIHRvIG11bHRpcG9seWdvblxuICAgIGlmICh0eXBlID09PSBcIlBvbHlnb25cIikge1xuICAgICAgICBwb2x5cyA9IFtwb2x5c107XG4gICAgfVxuICAgIHZhciBpbnNpZGVQb2x5ID0gZmFsc2U7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2x5cy5sZW5ndGggJiYgIWluc2lkZVBvbHk7IGkrKykge1xuICAgICAgICAvLyBjaGVjayBpZiBpdCBpcyBpbiB0aGUgb3V0ZXIgcmluZyBmaXJzdFxuICAgICAgICBpZiAoaW5SaW5nKHB0LCBwb2x5c1tpXVswXSwgb3B0aW9ucy5pZ25vcmVCb3VuZGFyeSkpIHtcbiAgICAgICAgICAgIHZhciBpbkhvbGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBrID0gMTtcbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciB0aGUgcG9pbnQgaW4gYW55IG9mIHRoZSBob2xlc1xuICAgICAgICAgICAgd2hpbGUgKGsgPCBwb2x5c1tpXS5sZW5ndGggJiYgIWluSG9sZSkge1xuICAgICAgICAgICAgICAgIGlmIChpblJpbmcocHQsIHBvbHlzW2ldW2tdLCAhb3B0aW9ucy5pZ25vcmVCb3VuZGFyeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5Ib2xlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpbkhvbGUpIHtcbiAgICAgICAgICAgICAgICBpbnNpZGVQb2x5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5zaWRlUG9seTtcbn1cbi8qKlxuICogaW5SaW5nXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gcHQgW3gseV1cbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IHJpbmcgW1t4LHldLCBbeCx5XSwuLl1cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlQm91bmRhcnkgaWdub3JlQm91bmRhcnlcbiAqIEByZXR1cm5zIHtib29sZWFufSBpblJpbmdcbiAqL1xuZnVuY3Rpb24gaW5SaW5nKHB0LCByaW5nLCBpZ25vcmVCb3VuZGFyeSkge1xuICAgIHZhciBpc0luc2lkZSA9IGZhbHNlO1xuICAgIGlmIChyaW5nWzBdWzBdID09PSByaW5nW3JpbmcubGVuZ3RoIC0gMV1bMF0gJiZcbiAgICAgICAgcmluZ1swXVsxXSA9PT0gcmluZ1tyaW5nLmxlbmd0aCAtIDFdWzFdKSB7XG4gICAgICAgIHJpbmcgPSByaW5nLnNsaWNlKDAsIHJpbmcubGVuZ3RoIC0gMSk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwLCBqID0gcmluZy5sZW5ndGggLSAxOyBpIDwgcmluZy5sZW5ndGg7IGogPSBpKyspIHtcbiAgICAgICAgdmFyIHhpID0gcmluZ1tpXVswXTtcbiAgICAgICAgdmFyIHlpID0gcmluZ1tpXVsxXTtcbiAgICAgICAgdmFyIHhqID0gcmluZ1tqXVswXTtcbiAgICAgICAgdmFyIHlqID0gcmluZ1tqXVsxXTtcbiAgICAgICAgdmFyIG9uQm91bmRhcnkgPSBwdFsxXSAqICh4aSAtIHhqKSArIHlpICogKHhqIC0gcHRbMF0pICsgeWogKiAocHRbMF0gLSB4aSkgPT09IDAgJiZcbiAgICAgICAgICAgICh4aSAtIHB0WzBdKSAqICh4aiAtIHB0WzBdKSA8PSAwICYmXG4gICAgICAgICAgICAoeWkgLSBwdFsxXSkgKiAoeWogLSBwdFsxXSkgPD0gMDtcbiAgICAgICAgaWYgKG9uQm91bmRhcnkpIHtcbiAgICAgICAgICAgIHJldHVybiAhaWdub3JlQm91bmRhcnk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGludGVyc2VjdCA9IHlpID4gcHRbMV0gIT09IHlqID4gcHRbMV0gJiZcbiAgICAgICAgICAgIHB0WzBdIDwgKCh4aiAtIHhpKSAqIChwdFsxXSAtIHlpKSkgLyAoeWogLSB5aSkgKyB4aTtcbiAgICAgICAgaWYgKGludGVyc2VjdCkge1xuICAgICAgICAgICAgaXNJbnNpZGUgPSAhaXNJbnNpZGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzSW5zaWRlO1xufVxuLyoqXG4gKiBpbkJCb3hcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtQb3NpdGlvbn0gcHQgcG9pbnQgW3gseV1cbiAqIEBwYXJhbSB7QkJveH0gYmJveCBCQm94IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZS9mYWxzZSBpZiBwb2ludCBpcyBpbnNpZGUgQkJveFxuICovXG5mdW5jdGlvbiBpbkJCb3gocHQsIGJib3gpIHtcbiAgICByZXR1cm4gKGJib3hbMF0gPD0gcHRbMF0gJiYgYmJveFsxXSA8PSBwdFsxXSAmJiBiYm94WzJdID49IHB0WzBdICYmIGJib3hbM10gPj0gcHRbMV0pO1xufVxuIiwiLyoqXG4gKiBAbW9kdWxlIGhlbHBlcnNcbiAqL1xuLyoqXG4gKiBFYXJ0aCBSYWRpdXMgdXNlZCB3aXRoIHRoZSBIYXJ2ZXNpbmUgZm9ybXVsYSBhbmQgYXBwcm94aW1hdGVzIHVzaW5nIGEgc3BoZXJpY2FsIChub24tZWxsaXBzb2lkKSBFYXJ0aC5cbiAqXG4gKiBAbWVtYmVyb2YgaGVscGVyc1xuICogQHR5cGUge251bWJlcn1cbiAqL1xuZXhwb3J0IHZhciBlYXJ0aFJhZGl1cyA9IDYzNzEwMDguODtcbi8qKlxuICogVW5pdCBvZiBtZWFzdXJlbWVudCBmYWN0b3JzIHVzaW5nIGEgc3BoZXJpY2FsIChub24tZWxsaXBzb2lkKSBlYXJ0aCByYWRpdXMuXG4gKlxuICogQG1lbWJlcm9mIGhlbHBlcnNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCB2YXIgZmFjdG9ycyA9IHtcbiAgICBjZW50aW1ldGVyczogZWFydGhSYWRpdXMgKiAxMDAsXG4gICAgY2VudGltZXRyZXM6IGVhcnRoUmFkaXVzICogMTAwLFxuICAgIGRlZ3JlZXM6IGVhcnRoUmFkaXVzIC8gMTExMzI1LFxuICAgIGZlZXQ6IGVhcnRoUmFkaXVzICogMy4yODA4NCxcbiAgICBpbmNoZXM6IGVhcnRoUmFkaXVzICogMzkuMzcsXG4gICAga2lsb21ldGVyczogZWFydGhSYWRpdXMgLyAxMDAwLFxuICAgIGtpbG9tZXRyZXM6IGVhcnRoUmFkaXVzIC8gMTAwMCxcbiAgICBtZXRlcnM6IGVhcnRoUmFkaXVzLFxuICAgIG1ldHJlczogZWFydGhSYWRpdXMsXG4gICAgbWlsZXM6IGVhcnRoUmFkaXVzIC8gMTYwOS4zNDQsXG4gICAgbWlsbGltZXRlcnM6IGVhcnRoUmFkaXVzICogMTAwMCxcbiAgICBtaWxsaW1ldHJlczogZWFydGhSYWRpdXMgKiAxMDAwLFxuICAgIG5hdXRpY2FsbWlsZXM6IGVhcnRoUmFkaXVzIC8gMTg1MixcbiAgICByYWRpYW5zOiAxLFxuICAgIHlhcmRzOiBlYXJ0aFJhZGl1cyAqIDEuMDkzNixcbn07XG4vKipcbiAqIFVuaXRzIG9mIG1lYXN1cmVtZW50IGZhY3RvcnMgYmFzZWQgb24gMSBtZXRlci5cbiAqXG4gKiBAbWVtYmVyb2YgaGVscGVyc1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0IHZhciB1bml0c0ZhY3RvcnMgPSB7XG4gICAgY2VudGltZXRlcnM6IDEwMCxcbiAgICBjZW50aW1ldHJlczogMTAwLFxuICAgIGRlZ3JlZXM6IDEgLyAxMTEzMjUsXG4gICAgZmVldDogMy4yODA4NCxcbiAgICBpbmNoZXM6IDM5LjM3LFxuICAgIGtpbG9tZXRlcnM6IDEgLyAxMDAwLFxuICAgIGtpbG9tZXRyZXM6IDEgLyAxMDAwLFxuICAgIG1ldGVyczogMSxcbiAgICBtZXRyZXM6IDEsXG4gICAgbWlsZXM6IDEgLyAxNjA5LjM0NCxcbiAgICBtaWxsaW1ldGVyczogMTAwMCxcbiAgICBtaWxsaW1ldHJlczogMTAwMCxcbiAgICBuYXV0aWNhbG1pbGVzOiAxIC8gMTg1MixcbiAgICByYWRpYW5zOiAxIC8gZWFydGhSYWRpdXMsXG4gICAgeWFyZHM6IDEuMDkzNjEzMyxcbn07XG4vKipcbiAqIEFyZWEgb2YgbWVhc3VyZW1lbnQgZmFjdG9ycyBiYXNlZCBvbiAxIHNxdWFyZSBtZXRlci5cbiAqXG4gKiBAbWVtYmVyb2YgaGVscGVyc1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0IHZhciBhcmVhRmFjdG9ycyA9IHtcbiAgICBhY3JlczogMC4wMDAyNDcxMDUsXG4gICAgY2VudGltZXRlcnM6IDEwMDAwLFxuICAgIGNlbnRpbWV0cmVzOiAxMDAwMCxcbiAgICBmZWV0OiAxMC43NjM5MTA0MTcsXG4gICAgaGVjdGFyZXM6IDAuMDAwMSxcbiAgICBpbmNoZXM6IDE1NTAuMDAzMTAwMDA2LFxuICAgIGtpbG9tZXRlcnM6IDAuMDAwMDAxLFxuICAgIGtpbG9tZXRyZXM6IDAuMDAwMDAxLFxuICAgIG1ldGVyczogMSxcbiAgICBtZXRyZXM6IDEsXG4gICAgbWlsZXM6IDMuODZlLTcsXG4gICAgbWlsbGltZXRlcnM6IDEwMDAwMDAsXG4gICAgbWlsbGltZXRyZXM6IDEwMDAwMDAsXG4gICAgeWFyZHM6IDEuMTk1OTkwMDQ2LFxufTtcbi8qKlxuICogV3JhcHMgYSBHZW9KU09OIHtAbGluayBHZW9tZXRyeX0gaW4gYSBHZW9KU09OIHtAbGluayBGZWF0dXJlfS5cbiAqXG4gKiBAbmFtZSBmZWF0dXJlXG4gKiBAcGFyYW0ge0dlb21ldHJ5fSBnZW9tZXRyeSBpbnB1dCBnZW9tZXRyeVxuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlfSBhIEdlb0pTT04gRmVhdHVyZVxuICogQGV4YW1wbGVcbiAqIHZhciBnZW9tZXRyeSA9IHtcbiAqICAgXCJ0eXBlXCI6IFwiUG9pbnRcIixcbiAqICAgXCJjb29yZGluYXRlc1wiOiBbMTEwLCA1MF1cbiAqIH07XG4gKlxuICogdmFyIGZlYXR1cmUgPSB0dXJmLmZlYXR1cmUoZ2VvbWV0cnkpO1xuICpcbiAqIC8vPWZlYXR1cmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmUoZ2VvbSwgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIGZlYXQgPSB7IHR5cGU6IFwiRmVhdHVyZVwiIH07XG4gICAgaWYgKG9wdGlvbnMuaWQgPT09IDAgfHwgb3B0aW9ucy5pZCkge1xuICAgICAgICBmZWF0LmlkID0gb3B0aW9ucy5pZDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuYmJveCkge1xuICAgICAgICBmZWF0LmJib3ggPSBvcHRpb25zLmJib3g7XG4gICAgfVxuICAgIGZlYXQucHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwge307XG4gICAgZmVhdC5nZW9tZXRyeSA9IGdlb207XG4gICAgcmV0dXJuIGZlYXQ7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBHZW9KU09OIHtAbGluayBHZW9tZXRyeX0gZnJvbSBhIEdlb21ldHJ5IHN0cmluZyB0eXBlICYgY29vcmRpbmF0ZXMuXG4gKiBGb3IgR2VvbWV0cnlDb2xsZWN0aW9uIHR5cGUgdXNlIGBoZWxwZXJzLmdlb21ldHJ5Q29sbGVjdGlvbmBcbiAqXG4gKiBAbmFtZSBnZW9tZXRyeVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgR2VvbWV0cnkgVHlwZVxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBjb29yZGluYXRlcyBDb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcmV0dXJucyB7R2VvbWV0cnl9IGEgR2VvSlNPTiBHZW9tZXRyeVxuICogQGV4YW1wbGVcbiAqIHZhciB0eXBlID0gXCJQb2ludFwiO1xuICogdmFyIGNvb3JkaW5hdGVzID0gWzExMCwgNTBdO1xuICogdmFyIGdlb21ldHJ5ID0gdHVyZi5nZW9tZXRyeSh0eXBlLCBjb29yZGluYXRlcyk7XG4gKiAvLyA9PiBnZW9tZXRyeVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VvbWV0cnkodHlwZSwgY29vcmRpbmF0ZXMsIF9vcHRpb25zKSB7XG4gICAgaWYgKF9vcHRpb25zID09PSB2b2lkIDApIHsgX29wdGlvbnMgPSB7fTsgfVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICAgICAgICAgIHJldHVybiBwb2ludChjb29yZGluYXRlcykuZ2VvbWV0cnk7XG4gICAgICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgICAgICAgICByZXR1cm4gbGluZVN0cmluZyhjb29yZGluYXRlcykuZ2VvbWV0cnk7XG4gICAgICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICAgICAgICByZXR1cm4gcG9seWdvbihjb29yZGluYXRlcykuZ2VvbWV0cnk7XG4gICAgICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6XG4gICAgICAgICAgICByZXR1cm4gbXVsdGlQb2ludChjb29yZGluYXRlcykuZ2VvbWV0cnk7XG4gICAgICAgIGNhc2UgXCJNdWx0aUxpbmVTdHJpbmdcIjpcbiAgICAgICAgICAgIHJldHVybiBtdWx0aUxpbmVTdHJpbmcoY29vcmRpbmF0ZXMpLmdlb21ldHJ5O1xuICAgICAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6XG4gICAgICAgICAgICByZXR1cm4gbXVsdGlQb2x5Z29uKGNvb3JkaW5hdGVzKS5nZW9tZXRyeTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0eXBlICsgXCIgaXMgaW52YWxpZFwiKTtcbiAgICB9XG59XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgUG9pbnR9IHtAbGluayBGZWF0dXJlfSBmcm9tIGEgUG9zaXRpb24uXG4gKlxuICogQG5hbWUgcG9pbnRcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gY29vcmRpbmF0ZXMgbG9uZ2l0dWRlLCBsYXRpdHVkZSBwb3NpdGlvbiAoZWFjaCBpbiBkZWNpbWFsIGRlZ3JlZXMpXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8UG9pbnQ+fSBhIFBvaW50IGZlYXR1cmVcbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9pbnQgPSB0dXJmLnBvaW50KFstNzUuMzQzLCAzOS45ODRdKTtcbiAqXG4gKiAvLz1wb2ludFxuICovXG5leHBvcnQgZnVuY3Rpb24gcG9pbnQoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIGlmICghY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29vcmRpbmF0ZXMgaXMgcmVxdWlyZWRcIik7XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheShjb29yZGluYXRlcykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29vcmRpbmF0ZXMgbXVzdCBiZSBhbiBBcnJheVwiKTtcbiAgICB9XG4gICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29vcmRpbmF0ZXMgbXVzdCBiZSBhdCBsZWFzdCAyIG51bWJlcnMgbG9uZ1wiKTtcbiAgICB9XG4gICAgaWYgKCFpc051bWJlcihjb29yZGluYXRlc1swXSkgfHwgIWlzTnVtYmVyKGNvb3JkaW5hdGVzWzFdKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb29yZGluYXRlcyBtdXN0IGNvbnRhaW4gbnVtYmVyc1wiKTtcbiAgICB9XG4gICAgdmFyIGdlb20gPSB7XG4gICAgICAgIHR5cGU6IFwiUG9pbnRcIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzLFxuICAgIH07XG4gICAgcmV0dXJuIGZlYXR1cmUoZ2VvbSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgUG9pbnR9IHtAbGluayBGZWF0dXJlQ29sbGVjdGlvbn0gZnJvbSBhbiBBcnJheSBvZiBQb2ludCBjb29yZGluYXRlcy5cbiAqXG4gKiBAbmFtZSBwb2ludHNcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIFBvaW50c1xuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBUcmFuc2xhdGUgdGhlc2UgcHJvcGVydGllcyB0byBlYWNoIEZlYXR1cmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF1cbiAqIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlQ29sbGVjdGlvblxuICogQHJldHVybnMge0ZlYXR1cmVDb2xsZWN0aW9uPFBvaW50Pn0gUG9pbnQgRmVhdHVyZVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2ludHMgPSB0dXJmLnBvaW50cyhbXG4gKiAgIFstNzUsIDM5XSxcbiAqICAgWy04MCwgNDVdLFxuICogICBbLTc4LCA1MF1cbiAqIF0pO1xuICpcbiAqIC8vPXBvaW50c1xuICovXG5leHBvcnQgZnVuY3Rpb24gcG9pbnRzKGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24oY29vcmRpbmF0ZXMubWFwKGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICAgICAgcmV0dXJuIHBvaW50KGNvb3JkcywgcHJvcGVydGllcyk7XG4gICAgfSksIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIFBvbHlnb259IHtAbGluayBGZWF0dXJlfSBmcm9tIGFuIEFycmF5IG9mIExpbmVhclJpbmdzLlxuICpcbiAqIEBuYW1lIHBvbHlnb25cbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8QXJyYXk8bnVtYmVyPj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBMaW5lYXJSaW5nc1xuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlPFBvbHlnb24+fSBQb2x5Z29uIEZlYXR1cmVcbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9seWdvbiA9IHR1cmYucG9seWdvbihbW1stNSwgNTJdLCBbLTQsIDU2XSwgWy0yLCA1MV0sIFstNywgNTRdLCBbLTUsIDUyXV1dLCB7IG5hbWU6ICdwb2x5MScgfSk7XG4gKlxuICogLy89cG9seWdvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcG9seWdvbihjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgZm9yICh2YXIgX2kgPSAwLCBjb29yZGluYXRlc18xID0gY29vcmRpbmF0ZXM7IF9pIDwgY29vcmRpbmF0ZXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIHJpbmcgPSBjb29yZGluYXRlc18xW19pXTtcbiAgICAgICAgaWYgKHJpbmcubGVuZ3RoIDwgNCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRWFjaCBMaW5lYXJSaW5nIG9mIGEgUG9seWdvbiBtdXN0IGhhdmUgNCBvciBtb3JlIFBvc2l0aW9ucy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByaW5nW3JpbmcubGVuZ3RoIC0gMV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGZpcnN0IHBvaW50IG9mIFBvbHlnb24gY29udGFpbnMgdHdvIG51bWJlcnNcbiAgICAgICAgICAgIGlmIChyaW5nW3JpbmcubGVuZ3RoIC0gMV1bal0gIT09IHJpbmdbMF1bal0pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGaXJzdCBhbmQgbGFzdCBQb3NpdGlvbiBhcmUgbm90IGVxdWl2YWxlbnQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBnZW9tID0ge1xuICAgICAgICB0eXBlOiBcIlBvbHlnb25cIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzLFxuICAgIH07XG4gICAgcmV0dXJuIGZlYXR1cmUoZ2VvbSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgUG9seWdvbn0ge0BsaW5rIEZlYXR1cmVDb2xsZWN0aW9ufSBmcm9tIGFuIEFycmF5IG9mIFBvbHlnb24gY29vcmRpbmF0ZXMuXG4gKlxuICogQG5hbWUgcG9seWdvbnNcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8QXJyYXk8QXJyYXk8bnVtYmVyPj4+Pn0gY29vcmRpbmF0ZXMgYW4gYXJyYXkgb2YgUG9seWdvbiBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAcmV0dXJucyB7RmVhdHVyZUNvbGxlY3Rpb248UG9seWdvbj59IFBvbHlnb24gRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9seWdvbnMgPSB0dXJmLnBvbHlnb25zKFtcbiAqICAgW1tbLTUsIDUyXSwgWy00LCA1Nl0sIFstMiwgNTFdLCBbLTcsIDU0XSwgWy01LCA1Ml1dXSxcbiAqICAgW1tbLTE1LCA0Ml0sIFstMTQsIDQ2XSwgWy0xMiwgNDFdLCBbLTE3LCA0NF0sIFstMTUsIDQyXV1dLFxuICogXSk7XG4gKlxuICogLy89cG9seWdvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBvbHlnb25zKGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24oY29vcmRpbmF0ZXMubWFwKGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICAgICAgcmV0dXJuIHBvbHlnb24oY29vcmRzLCBwcm9wZXJ0aWVzKTtcbiAgICB9KSwgb3B0aW9ucyk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgTGluZVN0cmluZ30ge0BsaW5rIEZlYXR1cmV9IGZyb20gYW4gQXJyYXkgb2YgUG9zaXRpb25zLlxuICpcbiAqIEBuYW1lIGxpbmVTdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIFBvc2l0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlPExpbmVTdHJpbmc+fSBMaW5lU3RyaW5nIEZlYXR1cmVcbiAqIEBleGFtcGxlXG4gKiB2YXIgbGluZXN0cmluZzEgPSB0dXJmLmxpbmVTdHJpbmcoW1stMjQsIDYzXSwgWy0yMywgNjBdLCBbLTI1LCA2NV0sIFstMjAsIDY5XV0sIHtuYW1lOiAnbGluZSAxJ30pO1xuICogdmFyIGxpbmVzdHJpbmcyID0gdHVyZi5saW5lU3RyaW5nKFtbLTE0LCA0M10sIFstMTMsIDQwXSwgWy0xNSwgNDVdLCBbLTEwLCA0OV1dLCB7bmFtZTogJ2xpbmUgMid9KTtcbiAqXG4gKiAvLz1saW5lc3RyaW5nMVxuICogLy89bGluZXN0cmluZzJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpbmVTdHJpbmcoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIGlmIChjb29yZGluYXRlcy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkaW5hdGVzIG11c3QgYmUgYW4gYXJyYXkgb2YgdHdvIG9yIG1vcmUgcG9zaXRpb25zXCIpO1xuICAgIH1cbiAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogXCJMaW5lU3RyaW5nXCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIExpbmVTdHJpbmd9IHtAbGluayBGZWF0dXJlQ29sbGVjdGlvbn0gZnJvbSBhbiBBcnJheSBvZiBMaW5lU3RyaW5nIGNvb3JkaW5hdGVzLlxuICpcbiAqIEBuYW1lIGxpbmVTdHJpbmdzXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PEFycmF5PG51bWJlcj4+Pn0gY29vcmRpbmF0ZXMgYW4gYXJyYXkgb2YgTGluZWFyUmluZ3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXVxuICogYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlQ29sbGVjdGlvblxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAcmV0dXJucyB7RmVhdHVyZUNvbGxlY3Rpb248TGluZVN0cmluZz59IExpbmVTdHJpbmcgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEBleGFtcGxlXG4gKiB2YXIgbGluZXN0cmluZ3MgPSB0dXJmLmxpbmVTdHJpbmdzKFtcbiAqICAgW1stMjQsIDYzXSwgWy0yMywgNjBdLCBbLTI1LCA2NV0sIFstMjAsIDY5XV0sXG4gKiAgIFtbLTE0LCA0M10sIFstMTMsIDQwXSwgWy0xNSwgNDVdLCBbLTEwLCA0OV1dXG4gKiBdKTtcbiAqXG4gKiAvLz1saW5lc3RyaW5nc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGluZVN0cmluZ3MoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbihjb29yZGluYXRlcy5tYXAoZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICByZXR1cm4gbGluZVN0cmluZyhjb29yZHMsIHByb3BlcnRpZXMpO1xuICAgIH0pLCBvcHRpb25zKTtcbn1cbi8qKlxuICogVGFrZXMgb25lIG9yIG1vcmUge0BsaW5rIEZlYXR1cmV8RmVhdHVyZXN9IGFuZCBjcmVhdGVzIGEge0BsaW5rIEZlYXR1cmVDb2xsZWN0aW9ufS5cbiAqXG4gKiBAbmFtZSBmZWF0dXJlQ29sbGVjdGlvblxuICogQHBhcmFtIHtGZWF0dXJlW119IGZlYXR1cmVzIGlucHV0IGZlYXR1cmVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbn0gRmVhdHVyZUNvbGxlY3Rpb24gb2YgRmVhdHVyZXNcbiAqIEBleGFtcGxlXG4gKiB2YXIgbG9jYXRpb25BID0gdHVyZi5wb2ludChbLTc1LjM0MywgMzkuOTg0XSwge25hbWU6ICdMb2NhdGlvbiBBJ30pO1xuICogdmFyIGxvY2F0aW9uQiA9IHR1cmYucG9pbnQoWy03NS44MzMsIDM5LjI4NF0sIHtuYW1lOiAnTG9jYXRpb24gQid9KTtcbiAqIHZhciBsb2NhdGlvbkMgPSB0dXJmLnBvaW50KFstNzUuNTM0LCAzOS4xMjNdLCB7bmFtZTogJ0xvY2F0aW9uIEMnfSk7XG4gKlxuICogdmFyIGNvbGxlY3Rpb24gPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgbG9jYXRpb25BLFxuICogICBsb2NhdGlvbkIsXG4gKiAgIGxvY2F0aW9uQ1xuICogXSk7XG4gKlxuICogLy89Y29sbGVjdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZUNvbGxlY3Rpb24oZmVhdHVyZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBmYyA9IHsgdHlwZTogXCJGZWF0dXJlQ29sbGVjdGlvblwiIH07XG4gICAgaWYgKG9wdGlvbnMuaWQpIHtcbiAgICAgICAgZmMuaWQgPSBvcHRpb25zLmlkO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5iYm94KSB7XG4gICAgICAgIGZjLmJib3ggPSBvcHRpb25zLmJib3g7XG4gICAgfVxuICAgIGZjLmZlYXR1cmVzID0gZmVhdHVyZXM7XG4gICAgcmV0dXJuIGZjO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIEZlYXR1cmU8TXVsdGlMaW5lU3RyaW5nPn0gYmFzZWQgb24gYVxuICogY29vcmRpbmF0ZSBhcnJheS4gUHJvcGVydGllcyBjYW4gYmUgYWRkZWQgb3B0aW9uYWxseS5cbiAqXG4gKiBAbmFtZSBtdWx0aUxpbmVTdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8QXJyYXk8bnVtYmVyPj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBMaW5lU3RyaW5nc1xuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlPE11bHRpTGluZVN0cmluZz59IGEgTXVsdGlMaW5lU3RyaW5nIGZlYXR1cmVcbiAqIEB0aHJvd3Mge0Vycm9yfSBpZiBubyBjb29yZGluYXRlcyBhcmUgcGFzc2VkXG4gKiBAZXhhbXBsZVxuICogdmFyIG11bHRpTGluZSA9IHR1cmYubXVsdGlMaW5lU3RyaW5nKFtbWzAsMF0sWzEwLDEwXV1dKTtcbiAqXG4gKiAvLz1tdWx0aUxpbmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG11bHRpTGluZVN0cmluZyhjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIGdlb20gPSB7XG4gICAgICAgIHR5cGU6IFwiTXVsdGlMaW5lU3RyaW5nXCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIEZlYXR1cmU8TXVsdGlQb2ludD59IGJhc2VkIG9uIGFcbiAqIGNvb3JkaW5hdGUgYXJyYXkuIFByb3BlcnRpZXMgY2FuIGJlIGFkZGVkIG9wdGlvbmFsbHkuXG4gKlxuICogQG5hbWUgbXVsdGlQb2ludFxuICogQHBhcmFtIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gY29vcmRpbmF0ZXMgYW4gYXJyYXkgb2YgUG9zaXRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8TXVsdGlQb2ludD59IGEgTXVsdGlQb2ludCBmZWF0dXJlXG4gKiBAdGhyb3dzIHtFcnJvcn0gaWYgbm8gY29vcmRpbmF0ZXMgYXJlIHBhc3NlZFxuICogQGV4YW1wbGVcbiAqIHZhciBtdWx0aVB0ID0gdHVyZi5tdWx0aVBvaW50KFtbMCwwXSxbMTAsMTBdXSk7XG4gKlxuICogLy89bXVsdGlQdFxuICovXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlQb2ludChjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIGdlb20gPSB7XG4gICAgICAgIHR5cGU6IFwiTXVsdGlQb2ludFwiLFxuICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZXMsXG4gICAgfTtcbiAgICByZXR1cm4gZmVhdHVyZShnZW9tLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBGZWF0dXJlPE11bHRpUG9seWdvbj59IGJhc2VkIG9uIGFcbiAqIGNvb3JkaW5hdGUgYXJyYXkuIFByb3BlcnRpZXMgY2FuIGJlIGFkZGVkIG9wdGlvbmFsbHkuXG4gKlxuICogQG5hbWUgbXVsdGlQb2x5Z29uXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PEFycmF5PEFycmF5PG51bWJlcj4+Pj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIFBvbHlnb25zXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8TXVsdGlQb2x5Z29uPn0gYSBtdWx0aXBvbHlnb24gZmVhdHVyZVxuICogQHRocm93cyB7RXJyb3J9IGlmIG5vIGNvb3JkaW5hdGVzIGFyZSBwYXNzZWRcbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlQb2x5ID0gdHVyZi5tdWx0aVBvbHlnb24oW1tbWzAsMF0sWzAsMTBdLFsxMCwxMF0sWzEwLDBdLFswLDBdXV1dKTtcbiAqXG4gKiAvLz1tdWx0aVBvbHlcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aVBvbHlnb24oY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBnZW9tID0ge1xuICAgICAgICB0eXBlOiBcIk11bHRpUG9seWdvblwiLFxuICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZXMsXG4gICAgfTtcbiAgICByZXR1cm4gZmVhdHVyZShnZW9tLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBGZWF0dXJlPEdlb21ldHJ5Q29sbGVjdGlvbj59IGJhc2VkIG9uIGFcbiAqIGNvb3JkaW5hdGUgYXJyYXkuIFByb3BlcnRpZXMgY2FuIGJlIGFkZGVkIG9wdGlvbmFsbHkuXG4gKlxuICogQG5hbWUgZ2VvbWV0cnlDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5PEdlb21ldHJ5Pn0gZ2VvbWV0cmllcyBhbiBhcnJheSBvZiBHZW9KU09OIEdlb21ldHJpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxHZW9tZXRyeUNvbGxlY3Rpb24+fSBhIEdlb0pTT04gR2VvbWV0cnlDb2xsZWN0aW9uIEZlYXR1cmVcbiAqIEBleGFtcGxlXG4gKiB2YXIgcHQgPSB0dXJmLmdlb21ldHJ5KFwiUG9pbnRcIiwgWzEwMCwgMF0pO1xuICogdmFyIGxpbmUgPSB0dXJmLmdlb21ldHJ5KFwiTGluZVN0cmluZ1wiLCBbWzEwMSwgMF0sIFsxMDIsIDFdXSk7XG4gKiB2YXIgY29sbGVjdGlvbiA9IHR1cmYuZ2VvbWV0cnlDb2xsZWN0aW9uKFtwdCwgbGluZV0pO1xuICpcbiAqIC8vID0+IGNvbGxlY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlb21ldHJ5Q29sbGVjdGlvbihnZW9tZXRyaWVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogXCJHZW9tZXRyeUNvbGxlY3Rpb25cIixcbiAgICAgICAgZ2VvbWV0cmllczogZ2VvbWV0cmllcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBSb3VuZCBudW1iZXIgdG8gcHJlY2lzaW9uXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IG51bSBOdW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbcHJlY2lzaW9uPTBdIFByZWNpc2lvblxuICogQHJldHVybnMge251bWJlcn0gcm91bmRlZCBudW1iZXJcbiAqIEBleGFtcGxlXG4gKiB0dXJmLnJvdW5kKDEyMC40MzIxKVxuICogLy89MTIwXG4gKlxuICogdHVyZi5yb3VuZCgxMjAuNDMyMSwgMilcbiAqIC8vPTEyMC40M1xuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmQobnVtLCBwcmVjaXNpb24pIHtcbiAgICBpZiAocHJlY2lzaW9uID09PSB2b2lkIDApIHsgcHJlY2lzaW9uID0gMDsgfVxuICAgIGlmIChwcmVjaXNpb24gJiYgIShwcmVjaXNpb24gPj0gMCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicHJlY2lzaW9uIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXJcIik7XG4gICAgfVxuICAgIHZhciBtdWx0aXBsaWVyID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbiB8fCAwKTtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChudW0gKiBtdWx0aXBsaWVyKSAvIG11bHRpcGxpZXI7XG59XG4vKipcbiAqIENvbnZlcnQgYSBkaXN0YW5jZSBtZWFzdXJlbWVudCAoYXNzdW1pbmcgYSBzcGhlcmljYWwgRWFydGgpIGZyb20gcmFkaWFucyB0byBhIG1vcmUgZnJpZW5kbHkgdW5pdC5cbiAqIFZhbGlkIHVuaXRzOiBtaWxlcywgbmF1dGljYWxtaWxlcywgaW5jaGVzLCB5YXJkcywgbWV0ZXJzLCBtZXRyZXMsIGtpbG9tZXRlcnMsIGNlbnRpbWV0ZXJzLCBmZWV0XG4gKlxuICogQG5hbWUgcmFkaWFuc1RvTGVuZ3RoXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkaWFucyBpbiByYWRpYW5zIGFjcm9zcyB0aGUgc3BoZXJlXG4gKiBAcGFyYW0ge3N0cmluZ30gW3VuaXRzPVwia2lsb21ldGVyc1wiXSBjYW4gYmUgZGVncmVlcywgcmFkaWFucywgbWlsZXMsIGluY2hlcywgeWFyZHMsIG1ldHJlcyxcbiAqIG1ldGVycywga2lsb21ldHJlcywga2lsb21ldGVycy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IGRpc3RhbmNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYWRpYW5zVG9MZW5ndGgocmFkaWFucywgdW5pdHMpIHtcbiAgICBpZiAodW5pdHMgPT09IHZvaWQgMCkgeyB1bml0cyA9IFwia2lsb21ldGVyc1wiOyB9XG4gICAgdmFyIGZhY3RvciA9IGZhY3RvcnNbdW5pdHNdO1xuICAgIGlmICghZmFjdG9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcih1bml0cyArIFwiIHVuaXRzIGlzIGludmFsaWRcIik7XG4gICAgfVxuICAgIHJldHVybiByYWRpYW5zICogZmFjdG9yO1xufVxuLyoqXG4gKiBDb252ZXJ0IGEgZGlzdGFuY2UgbWVhc3VyZW1lbnQgKGFzc3VtaW5nIGEgc3BoZXJpY2FsIEVhcnRoKSBmcm9tIGEgcmVhbC13b3JsZCB1bml0IGludG8gcmFkaWFuc1xuICogVmFsaWQgdW5pdHM6IG1pbGVzLCBuYXV0aWNhbG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRlcnMsIG1ldHJlcywga2lsb21ldGVycywgY2VudGltZXRlcnMsIGZlZXRcbiAqXG4gKiBAbmFtZSBsZW5ndGhUb1JhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBkaXN0YW5jZSBpbiByZWFsIHVuaXRzXG4gKiBAcGFyYW0ge3N0cmluZ30gW3VuaXRzPVwia2lsb21ldGVyc1wiXSBjYW4gYmUgZGVncmVlcywgcmFkaWFucywgbWlsZXMsIGluY2hlcywgeWFyZHMsIG1ldHJlcyxcbiAqIG1ldGVycywga2lsb21ldHJlcywga2lsb21ldGVycy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IHJhZGlhbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxlbmd0aFRvUmFkaWFucyhkaXN0YW5jZSwgdW5pdHMpIHtcbiAgICBpZiAodW5pdHMgPT09IHZvaWQgMCkgeyB1bml0cyA9IFwia2lsb21ldGVyc1wiOyB9XG4gICAgdmFyIGZhY3RvciA9IGZhY3RvcnNbdW5pdHNdO1xuICAgIGlmICghZmFjdG9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcih1bml0cyArIFwiIHVuaXRzIGlzIGludmFsaWRcIik7XG4gICAgfVxuICAgIHJldHVybiBkaXN0YW5jZSAvIGZhY3Rvcjtcbn1cbi8qKlxuICogQ29udmVydCBhIGRpc3RhbmNlIG1lYXN1cmVtZW50IChhc3N1bWluZyBhIHNwaGVyaWNhbCBFYXJ0aCkgZnJvbSBhIHJlYWwtd29ybGQgdW5pdCBpbnRvIGRlZ3JlZXNcbiAqIFZhbGlkIHVuaXRzOiBtaWxlcywgbmF1dGljYWxtaWxlcywgaW5jaGVzLCB5YXJkcywgbWV0ZXJzLCBtZXRyZXMsIGNlbnRpbWV0ZXJzLCBraWxvbWV0cmVzLCBmZWV0XG4gKlxuICogQG5hbWUgbGVuZ3RoVG9EZWdyZWVzXG4gKiBAcGFyYW0ge251bWJlcn0gZGlzdGFuY2UgaW4gcmVhbCB1bml0c1xuICogQHBhcmFtIHtzdHJpbmd9IFt1bml0cz1cImtpbG9tZXRlcnNcIl0gY2FuIGJlIGRlZ3JlZXMsIHJhZGlhbnMsIG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRyZXMsXG4gKiBtZXRlcnMsIGtpbG9tZXRyZXMsIGtpbG9tZXRlcnMuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBkZWdyZWVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsZW5ndGhUb0RlZ3JlZXMoZGlzdGFuY2UsIHVuaXRzKSB7XG4gICAgcmV0dXJuIHJhZGlhbnNUb0RlZ3JlZXMobGVuZ3RoVG9SYWRpYW5zKGRpc3RhbmNlLCB1bml0cykpO1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbnkgYmVhcmluZyBhbmdsZSBmcm9tIHRoZSBub3J0aCBsaW5lIGRpcmVjdGlvbiAocG9zaXRpdmUgY2xvY2t3aXNlKVxuICogYW5kIHJldHVybnMgYW4gYW5nbGUgYmV0d2VlbiAwLTM2MCBkZWdyZWVzIChwb3NpdGl2ZSBjbG9ja3dpc2UpLCAwIGJlaW5nIHRoZSBub3J0aCBsaW5lXG4gKlxuICogQG5hbWUgYmVhcmluZ1RvQXppbXV0aFxuICogQHBhcmFtIHtudW1iZXJ9IGJlYXJpbmcgYW5nbGUsIGJldHdlZW4gLTE4MCBhbmQgKzE4MCBkZWdyZWVzXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBhbmdsZSBiZXR3ZWVuIDAgYW5kIDM2MCBkZWdyZWVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZWFyaW5nVG9BemltdXRoKGJlYXJpbmcpIHtcbiAgICB2YXIgYW5nbGUgPSBiZWFyaW5nICUgMzYwO1xuICAgIGlmIChhbmdsZSA8IDApIHtcbiAgICAgICAgYW5nbGUgKz0gMzYwO1xuICAgIH1cbiAgICByZXR1cm4gYW5nbGU7XG59XG4vKipcbiAqIENvbnZlcnRzIGFuIGFuZ2xlIGluIHJhZGlhbnMgdG8gZGVncmVlc1xuICpcbiAqIEBuYW1lIHJhZGlhbnNUb0RlZ3JlZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSByYWRpYW5zIGFuZ2xlIGluIHJhZGlhbnNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IGRlZ3JlZXMgYmV0d2VlbiAwIGFuZCAzNjAgZGVncmVlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmFkaWFuc1RvRGVncmVlcyhyYWRpYW5zKSB7XG4gICAgdmFyIGRlZ3JlZXMgPSByYWRpYW5zICUgKDIgKiBNYXRoLlBJKTtcbiAgICByZXR1cm4gKGRlZ3JlZXMgKiAxODApIC8gTWF0aC5QSTtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gYW5nbGUgaW4gZGVncmVlcyB0byByYWRpYW5zXG4gKlxuICogQG5hbWUgZGVncmVlc1RvUmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGRlZ3JlZXMgYW5nbGUgYmV0d2VlbiAwIGFuZCAzNjAgZGVncmVlc1xuICogQHJldHVybnMge251bWJlcn0gYW5nbGUgaW4gcmFkaWFuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVncmVlc1RvUmFkaWFucyhkZWdyZWVzKSB7XG4gICAgdmFyIHJhZGlhbnMgPSBkZWdyZWVzICUgMzYwO1xuICAgIHJldHVybiAocmFkaWFucyAqIE1hdGguUEkpIC8gMTgwO1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhIGxlbmd0aCB0byB0aGUgcmVxdWVzdGVkIHVuaXQuXG4gKiBWYWxpZCB1bml0czogbWlsZXMsIG5hdXRpY2FsbWlsZXMsIGluY2hlcywgeWFyZHMsIG1ldGVycywgbWV0cmVzLCBraWxvbWV0ZXJzLCBjZW50aW1ldGVycywgZmVldFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggdG8gYmUgY29udmVydGVkXG4gKiBAcGFyYW0ge1VuaXRzfSBbb3JpZ2luYWxVbml0PVwia2lsb21ldGVyc1wiXSBvZiB0aGUgbGVuZ3RoXG4gKiBAcGFyYW0ge1VuaXRzfSBbZmluYWxVbml0PVwia2lsb21ldGVyc1wiXSByZXR1cm5lZCB1bml0XG4gKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgY29udmVydGVkIGxlbmd0aFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29udmVydExlbmd0aChsZW5ndGgsIG9yaWdpbmFsVW5pdCwgZmluYWxVbml0KSB7XG4gICAgaWYgKG9yaWdpbmFsVW5pdCA9PT0gdm9pZCAwKSB7IG9yaWdpbmFsVW5pdCA9IFwia2lsb21ldGVyc1wiOyB9XG4gICAgaWYgKGZpbmFsVW5pdCA9PT0gdm9pZCAwKSB7IGZpbmFsVW5pdCA9IFwia2lsb21ldGVyc1wiOyB9XG4gICAgaWYgKCEobGVuZ3RoID49IDApKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImxlbmd0aCBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcmFkaWFuc1RvTGVuZ3RoKGxlbmd0aFRvUmFkaWFucyhsZW5ndGgsIG9yaWdpbmFsVW5pdCksIGZpbmFsVW5pdCk7XG59XG4vKipcbiAqIENvbnZlcnRzIGEgYXJlYSB0byB0aGUgcmVxdWVzdGVkIHVuaXQuXG4gKiBWYWxpZCB1bml0czoga2lsb21ldGVycywga2lsb21ldHJlcywgbWV0ZXJzLCBtZXRyZXMsIGNlbnRpbWV0cmVzLCBtaWxsaW1ldGVycywgYWNyZXMsIG1pbGVzLCB5YXJkcywgZmVldCwgaW5jaGVzLCBoZWN0YXJlc1xuICogQHBhcmFtIHtudW1iZXJ9IGFyZWEgdG8gYmUgY29udmVydGVkXG4gKiBAcGFyYW0ge1VuaXRzfSBbb3JpZ2luYWxVbml0PVwibWV0ZXJzXCJdIG9mIHRoZSBkaXN0YW5jZVxuICogQHBhcmFtIHtVbml0c30gW2ZpbmFsVW5pdD1cImtpbG9tZXRlcnNcIl0gcmV0dXJuZWQgdW5pdFxuICogQHJldHVybnMge251bWJlcn0gdGhlIGNvbnZlcnRlZCBhcmVhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0QXJlYShhcmVhLCBvcmlnaW5hbFVuaXQsIGZpbmFsVW5pdCkge1xuICAgIGlmIChvcmlnaW5hbFVuaXQgPT09IHZvaWQgMCkgeyBvcmlnaW5hbFVuaXQgPSBcIm1ldGVyc1wiOyB9XG4gICAgaWYgKGZpbmFsVW5pdCA9PT0gdm9pZCAwKSB7IGZpbmFsVW5pdCA9IFwia2lsb21ldGVyc1wiOyB9XG4gICAgaWYgKCEoYXJlYSA+PSAwKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhcmVhIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXJcIik7XG4gICAgfVxuICAgIHZhciBzdGFydEZhY3RvciA9IGFyZWFGYWN0b3JzW29yaWdpbmFsVW5pdF07XG4gICAgaWYgKCFzdGFydEZhY3Rvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIG9yaWdpbmFsIHVuaXRzXCIpO1xuICAgIH1cbiAgICB2YXIgZmluYWxGYWN0b3IgPSBhcmVhRmFjdG9yc1tmaW5hbFVuaXRdO1xuICAgIGlmICghZmluYWxGYWN0b3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBmaW5hbCB1bml0c1wiKTtcbiAgICB9XG4gICAgcmV0dXJuIChhcmVhIC8gc3RhcnRGYWN0b3IpICogZmluYWxGYWN0b3I7XG59XG4vKipcbiAqIGlzTnVtYmVyXG4gKlxuICogQHBhcmFtIHsqfSBudW0gTnVtYmVyIHRvIHZhbGlkYXRlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZS9mYWxzZVxuICogQGV4YW1wbGVcbiAqIHR1cmYuaXNOdW1iZXIoMTIzKVxuICogLy89dHJ1ZVxuICogdHVyZi5pc051bWJlcignZm9vJylcbiAqIC8vPWZhbHNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcihudW0pIHtcbiAgICByZXR1cm4gIWlzTmFOKG51bSkgJiYgbnVtICE9PSBudWxsICYmICFBcnJheS5pc0FycmF5KG51bSk7XG59XG4vKipcbiAqIGlzT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSBpbnB1dCB2YXJpYWJsZSB0byB2YWxpZGF0ZVxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUvZmFsc2VcbiAqIEBleGFtcGxlXG4gKiB0dXJmLmlzT2JqZWN0KHtlbGV2YXRpb246IDEwfSlcbiAqIC8vPXRydWVcbiAqIHR1cmYuaXNPYmplY3QoJ2ZvbycpXG4gKiAvLz1mYWxzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QoaW5wdXQpIHtcbiAgICByZXR1cm4gISFpbnB1dCAmJiBpbnB1dC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xufVxuLyoqXG4gKiBWYWxpZGF0ZSBCQm94XG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gYmJveCBCQm94IHRvIHZhbGlkYXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEB0aHJvd3MgRXJyb3IgaWYgQkJveCBpcyBub3QgdmFsaWRcbiAqIEBleGFtcGxlXG4gKiB2YWxpZGF0ZUJCb3goWy0xODAsIC00MCwgMTEwLCA1MF0pXG4gKiAvLz1PS1xuICogdmFsaWRhdGVCQm94KFstMTgwLCAtNDBdKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlQkJveCgnRm9vJylcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUJCb3goNSlcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUJCb3gobnVsbClcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUJCb3godW5kZWZpbmVkKVxuICogLy89RXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlQkJveChiYm94KSB7XG4gICAgaWYgKCFiYm94KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImJib3ggaXMgcmVxdWlyZWRcIik7XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheShiYm94KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJiYm94IG11c3QgYmUgYW4gQXJyYXlcIik7XG4gICAgfVxuICAgIGlmIChiYm94Lmxlbmd0aCAhPT0gNCAmJiBiYm94Lmxlbmd0aCAhPT0gNikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJiYm94IG11c3QgYmUgYW4gQXJyYXkgb2YgNCBvciA2IG51bWJlcnNcIik7XG4gICAgfVxuICAgIGJib3guZm9yRWFjaChmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIGlmICghaXNOdW1iZXIobnVtKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYmJveCBtdXN0IG9ubHkgY29udGFpbiBudW1iZXJzXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFZhbGlkYXRlIElkXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gaWQgSWQgdG8gdmFsaWRhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQHRocm93cyBFcnJvciBpZiBJZCBpcyBub3QgdmFsaWRcbiAqIEBleGFtcGxlXG4gKiB2YWxpZGF0ZUlkKFstMTgwLCAtNDAsIDExMCwgNTBdKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlSWQoWy0xODAsIC00MF0pXG4gKiAvLz1FcnJvclxuICogdmFsaWRhdGVJZCgnRm9vJylcbiAqIC8vPU9LXG4gKiB2YWxpZGF0ZUlkKDUpXG4gKiAvLz1PS1xuICogdmFsaWRhdGVJZChudWxsKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlSWQodW5kZWZpbmVkKVxuICogLy89RXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlSWQoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImlkIGlzIHJlcXVpcmVkXCIpO1xuICAgIH1cbiAgICBpZiAoW1wic3RyaW5nXCIsIFwibnVtYmVyXCJdLmluZGV4T2YodHlwZW9mIGlkKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWQgbXVzdCBiZSBhIG51bWJlciBvciBhIHN0cmluZ1wiKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBpc051bWJlciwgfSBmcm9tIFwiQHR1cmYvaGVscGVyc1wiO1xuLyoqXG4gKiBVbndyYXAgYSBjb29yZGluYXRlIGZyb20gYSBQb2ludCBGZWF0dXJlLCBHZW9tZXRyeSBvciBhIHNpbmdsZSBjb29yZGluYXRlLlxuICpcbiAqIEBuYW1lIGdldENvb3JkXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj58R2VvbWV0cnk8UG9pbnQ+fEZlYXR1cmU8UG9pbnQ+fSBjb29yZCBHZW9KU09OIFBvaW50IG9yIGFuIEFycmF5IG9mIG51bWJlcnNcbiAqIEByZXR1cm5zIHtBcnJheTxudW1iZXI+fSBjb29yZGluYXRlc1xuICogQGV4YW1wbGVcbiAqIHZhciBwdCA9IHR1cmYucG9pbnQoWzEwLCAxMF0pO1xuICpcbiAqIHZhciBjb29yZCA9IHR1cmYuZ2V0Q29vcmQocHQpO1xuICogLy89IFsxMCwgMTBdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29yZChjb29yZCkge1xuICAgIGlmICghY29vcmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29vcmQgaXMgcmVxdWlyZWRcIik7XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheShjb29yZCkpIHtcbiAgICAgICAgaWYgKGNvb3JkLnR5cGUgPT09IFwiRmVhdHVyZVwiICYmXG4gICAgICAgICAgICBjb29yZC5nZW9tZXRyeSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgY29vcmQuZ2VvbWV0cnkudHlwZSA9PT0gXCJQb2ludFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gY29vcmQuZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvb3JkLnR5cGUgPT09IFwiUG9pbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGNvb3JkLmNvb3JkaW5hdGVzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvb3JkKSAmJlxuICAgICAgICBjb29yZC5sZW5ndGggPj0gMiAmJlxuICAgICAgICAhQXJyYXkuaXNBcnJheShjb29yZFswXSkgJiZcbiAgICAgICAgIUFycmF5LmlzQXJyYXkoY29vcmRbMV0pKSB7XG4gICAgICAgIHJldHVybiBjb29yZDtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiY29vcmQgbXVzdCBiZSBHZW9KU09OIFBvaW50IG9yIGFuIEFycmF5IG9mIG51bWJlcnNcIik7XG59XG4vKipcbiAqIFVud3JhcCBjb29yZGluYXRlcyBmcm9tIGEgRmVhdHVyZSwgR2VvbWV0cnkgT2JqZWN0IG9yIGFuIEFycmF5XG4gKlxuICogQG5hbWUgZ2V0Q29vcmRzXG4gKiBAcGFyYW0ge0FycmF5PGFueT58R2VvbWV0cnl8RmVhdHVyZX0gY29vcmRzIEZlYXR1cmUsIEdlb21ldHJ5IE9iamVjdCBvciBhbiBBcnJheVxuICogQHJldHVybnMge0FycmF5PGFueT59IGNvb3JkaW5hdGVzXG4gKiBAZXhhbXBsZVxuICogdmFyIHBvbHkgPSB0dXJmLnBvbHlnb24oW1tbMTE5LjMyLCAtOC43XSwgWzExOS41NSwgLTguNjldLCBbMTE5LjUxLCAtOC41NF0sIFsxMTkuMzIsIC04LjddXV0pO1xuICpcbiAqIHZhciBjb29yZHMgPSB0dXJmLmdldENvb3Jkcyhwb2x5KTtcbiAqIC8vPSBbW1sxMTkuMzIsIC04LjddLCBbMTE5LjU1LCAtOC42OV0sIFsxMTkuNTEsIC04LjU0XSwgWzExOS4zMiwgLTguN11dXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29vcmRzKGNvb3Jkcykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNvb3JkcykpIHtcbiAgICAgICAgcmV0dXJuIGNvb3JkcztcbiAgICB9XG4gICAgLy8gRmVhdHVyZVxuICAgIGlmIChjb29yZHMudHlwZSA9PT0gXCJGZWF0dXJlXCIpIHtcbiAgICAgICAgaWYgKGNvb3Jkcy5nZW9tZXRyeSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvb3Jkcy5nZW9tZXRyeS5jb29yZGluYXRlcztcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gR2VvbWV0cnlcbiAgICAgICAgaWYgKGNvb3Jkcy5jb29yZGluYXRlcykge1xuICAgICAgICAgICAgcmV0dXJuIGNvb3Jkcy5jb29yZGluYXRlcztcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb29yZHMgbXVzdCBiZSBHZW9KU09OIEZlYXR1cmUsIEdlb21ldHJ5IE9iamVjdCBvciBhbiBBcnJheVwiKTtcbn1cbi8qKlxuICogQ2hlY2tzIGlmIGNvb3JkaW5hdGVzIGNvbnRhaW5zIGEgbnVtYmVyXG4gKlxuICogQG5hbWUgY29udGFpbnNOdW1iZXJcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gY29vcmRpbmF0ZXMgR2VvSlNPTiBDb29yZGluYXRlc1xuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgQXJyYXkgY29udGFpbnMgYSBudW1iZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zTnVtYmVyKGNvb3JkaW5hdGVzKSB7XG4gICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCA+IDEgJiZcbiAgICAgICAgaXNOdW1iZXIoY29vcmRpbmF0ZXNbMF0pICYmXG4gICAgICAgIGlzTnVtYmVyKGNvb3JkaW5hdGVzWzFdKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29vcmRpbmF0ZXNbMF0pICYmIGNvb3JkaW5hdGVzWzBdLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gY29udGFpbnNOdW1iZXIoY29vcmRpbmF0ZXNbMF0pO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb29yZGluYXRlcyBtdXN0IG9ubHkgY29udGFpbiBudW1iZXJzXCIpO1xufVxuLyoqXG4gKiBFbmZvcmNlIGV4cGVjdGF0aW9ucyBhYm91dCB0eXBlcyBvZiBHZW9KU09OIG9iamVjdHMgZm9yIFR1cmYuXG4gKlxuICogQG5hbWUgZ2VvanNvblR5cGVcbiAqIEBwYXJhbSB7R2VvSlNPTn0gdmFsdWUgYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBleHBlY3RlZCBHZW9KU09OIHR5cGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIG5hbWUgb2YgY2FsbGluZyBmdW5jdGlvblxuICogQHRocm93cyB7RXJyb3J9IGlmIHZhbHVlIGlzIG5vdCB0aGUgZXhwZWN0ZWQgdHlwZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlb2pzb25UeXBlKHZhbHVlLCB0eXBlLCBuYW1lKSB7XG4gICAgaWYgKCF0eXBlIHx8ICFuYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInR5cGUgYW5kIG5hbWUgcmVxdWlyZWRcIik7XG4gICAgfVxuICAgIGlmICghdmFsdWUgfHwgdmFsdWUudHlwZSAhPT0gdHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGlucHV0IHRvIFwiICtcbiAgICAgICAgICAgIG5hbWUgK1xuICAgICAgICAgICAgXCI6IG11c3QgYmUgYSBcIiArXG4gICAgICAgICAgICB0eXBlICtcbiAgICAgICAgICAgIFwiLCBnaXZlbiBcIiArXG4gICAgICAgICAgICB2YWx1ZS50eXBlKTtcbiAgICB9XG59XG4vKipcbiAqIEVuZm9yY2UgZXhwZWN0YXRpb25zIGFib3V0IHR5cGVzIG9mIHtAbGluayBGZWF0dXJlfSBpbnB1dHMgZm9yIFR1cmYuXG4gKiBJbnRlcm5hbGx5IHRoaXMgdXNlcyB7QGxpbmsgZ2VvanNvblR5cGV9IHRvIGp1ZGdlIGdlb21ldHJ5IHR5cGVzLlxuICpcbiAqIEBuYW1lIGZlYXR1cmVPZlxuICogQHBhcmFtIHtGZWF0dXJlfSBmZWF0dXJlIGEgZmVhdHVyZSB3aXRoIGFuIGV4cGVjdGVkIGdlb21ldHJ5IHR5cGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIGV4cGVjdGVkIEdlb0pTT04gdHlwZVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgbmFtZSBvZiBjYWxsaW5nIGZ1bmN0aW9uXG4gKiBAdGhyb3dzIHtFcnJvcn0gZXJyb3IgaWYgdmFsdWUgaXMgbm90IHRoZSBleHBlY3RlZCB0eXBlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZU9mKGZlYXR1cmUsIHR5cGUsIG5hbWUpIHtcbiAgICBpZiAoIWZlYXR1cmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gZmVhdHVyZSBwYXNzZWRcIik7XG4gICAgfVxuICAgIGlmICghbmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCIuZmVhdHVyZU9mKCkgcmVxdWlyZXMgYSBuYW1lXCIpO1xuICAgIH1cbiAgICBpZiAoIWZlYXR1cmUgfHwgZmVhdHVyZS50eXBlICE9PSBcIkZlYXR1cmVcIiB8fCAhZmVhdHVyZS5nZW9tZXRyeSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGlucHV0IHRvIFwiICsgbmFtZSArIFwiLCBGZWF0dXJlIHdpdGggZ2VvbWV0cnkgcmVxdWlyZWRcIik7XG4gICAgfVxuICAgIGlmICghZmVhdHVyZS5nZW9tZXRyeSB8fCBmZWF0dXJlLmdlb21ldHJ5LnR5cGUgIT09IHR5cGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBpbnB1dCB0byBcIiArXG4gICAgICAgICAgICBuYW1lICtcbiAgICAgICAgICAgIFwiOiBtdXN0IGJlIGEgXCIgK1xuICAgICAgICAgICAgdHlwZSArXG4gICAgICAgICAgICBcIiwgZ2l2ZW4gXCIgK1xuICAgICAgICAgICAgZmVhdHVyZS5nZW9tZXRyeS50eXBlKTtcbiAgICB9XG59XG4vKipcbiAqIEVuZm9yY2UgZXhwZWN0YXRpb25zIGFib3V0IHR5cGVzIG9mIHtAbGluayBGZWF0dXJlQ29sbGVjdGlvbn0gaW5wdXRzIGZvciBUdXJmLlxuICogSW50ZXJuYWxseSB0aGlzIHVzZXMge0BsaW5rIGdlb2pzb25UeXBlfSB0byBqdWRnZSBnZW9tZXRyeSB0eXBlcy5cbiAqXG4gKiBAbmFtZSBjb2xsZWN0aW9uT2ZcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb259IGZlYXR1cmVDb2xsZWN0aW9uIGEgRmVhdHVyZUNvbGxlY3Rpb24gZm9yIHdoaWNoIGZlYXR1cmVzIHdpbGwgYmUganVkZ2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBleHBlY3RlZCBHZW9KU09OIHR5cGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIG5hbWUgb2YgY2FsbGluZyBmdW5jdGlvblxuICogQHRocm93cyB7RXJyb3J9IGlmIHZhbHVlIGlzIG5vdCB0aGUgZXhwZWN0ZWQgdHlwZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbGxlY3Rpb25PZihmZWF0dXJlQ29sbGVjdGlvbiwgdHlwZSwgbmFtZSkge1xuICAgIGlmICghZmVhdHVyZUNvbGxlY3Rpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gZmVhdHVyZUNvbGxlY3Rpb24gcGFzc2VkXCIpO1xuICAgIH1cbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiLmNvbGxlY3Rpb25PZigpIHJlcXVpcmVzIGEgbmFtZVwiKTtcbiAgICB9XG4gICAgaWYgKCFmZWF0dXJlQ29sbGVjdGlvbiB8fCBmZWF0dXJlQ29sbGVjdGlvbi50eXBlICE9PSBcIkZlYXR1cmVDb2xsZWN0aW9uXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBpbnB1dCB0byBcIiArIG5hbWUgKyBcIiwgRmVhdHVyZUNvbGxlY3Rpb24gcmVxdWlyZWRcIik7XG4gICAgfVxuICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIGZlYXR1cmUgPSBfYVtfaV07XG4gICAgICAgIGlmICghZmVhdHVyZSB8fCBmZWF0dXJlLnR5cGUgIT09IFwiRmVhdHVyZVwiIHx8ICFmZWF0dXJlLmdlb21ldHJ5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGlucHV0IHRvIFwiICsgbmFtZSArIFwiLCBGZWF0dXJlIHdpdGggZ2VvbWV0cnkgcmVxdWlyZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmZWF0dXJlLmdlb21ldHJ5IHx8IGZlYXR1cmUuZ2VvbWV0cnkudHlwZSAhPT0gdHlwZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBpbnB1dCB0byBcIiArXG4gICAgICAgICAgICAgICAgbmFtZSArXG4gICAgICAgICAgICAgICAgXCI6IG11c3QgYmUgYSBcIiArXG4gICAgICAgICAgICAgICAgdHlwZSArXG4gICAgICAgICAgICAgICAgXCIsIGdpdmVuIFwiICtcbiAgICAgICAgICAgICAgICBmZWF0dXJlLmdlb21ldHJ5LnR5cGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBHZXQgR2VvbWV0cnkgZnJvbSBGZWF0dXJlIG9yIEdlb21ldHJ5IE9iamVjdFxuICpcbiAqIEBwYXJhbSB7RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBHZW9KU09OIEZlYXR1cmUgb3IgR2VvbWV0cnkgT2JqZWN0XG4gKiBAcmV0dXJucyB7R2VvbWV0cnl8bnVsbH0gR2VvSlNPTiBHZW9tZXRyeSBPYmplY3RcbiAqIEB0aHJvd3Mge0Vycm9yfSBpZiBnZW9qc29uIGlzIG5vdCBhIEZlYXR1cmUgb3IgR2VvbWV0cnkgT2JqZWN0XG4gKiBAZXhhbXBsZVxuICogdmFyIHBvaW50ID0ge1xuICogICBcInR5cGVcIjogXCJGZWF0dXJlXCIsXG4gKiAgIFwicHJvcGVydGllc1wiOiB7fSxcbiAqICAgXCJnZW9tZXRyeVwiOiB7XG4gKiAgICAgXCJ0eXBlXCI6IFwiUG9pbnRcIixcbiAqICAgICBcImNvb3JkaW5hdGVzXCI6IFsxMTAsIDQwXVxuICogICB9XG4gKiB9XG4gKiB2YXIgZ2VvbSA9IHR1cmYuZ2V0R2VvbShwb2ludClcbiAqIC8vPXtcInR5cGVcIjogXCJQb2ludFwiLCBcImNvb3JkaW5hdGVzXCI6IFsxMTAsIDQwXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEdlb20oZ2VvanNvbikge1xuICAgIGlmIChnZW9qc29uLnR5cGUgPT09IFwiRmVhdHVyZVwiKSB7XG4gICAgICAgIHJldHVybiBnZW9qc29uLmdlb21ldHJ5O1xuICAgIH1cbiAgICByZXR1cm4gZ2VvanNvbjtcbn1cbi8qKlxuICogR2V0IEdlb0pTT04gb2JqZWN0J3MgdHlwZSwgR2VvbWV0cnkgdHlwZSBpcyBwcmlvcml0aXplLlxuICpcbiAqIEBwYXJhbSB7R2VvSlNPTn0gZ2VvanNvbiBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lPVwiZ2VvanNvblwiXSBuYW1lIG9mIHRoZSB2YXJpYWJsZSB0byBkaXNwbGF5IGluIGVycm9yIG1lc3NhZ2UgKHVudXNlZClcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEdlb0pTT04gdHlwZVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2ludCA9IHtcbiAqICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxuICogICBcInByb3BlcnRpZXNcIjoge30sXG4gKiAgIFwiZ2VvbWV0cnlcIjoge1xuICogICAgIFwidHlwZVwiOiBcIlBvaW50XCIsXG4gKiAgICAgXCJjb29yZGluYXRlc1wiOiBbMTEwLCA0MF1cbiAqICAgfVxuICogfVxuICogdmFyIGdlb20gPSB0dXJmLmdldFR5cGUocG9pbnQpXG4gKiAvLz1cIlBvaW50XCJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFR5cGUoZ2VvanNvbiwgX25hbWUpIHtcbiAgICBpZiAoZ2VvanNvbi50eXBlID09PSBcIkZlYXR1cmVDb2xsZWN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIFwiRmVhdHVyZUNvbGxlY3Rpb25cIjtcbiAgICB9XG4gICAgaWYgKGdlb2pzb24udHlwZSA9PT0gXCJHZW9tZXRyeUNvbGxlY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gXCJHZW9tZXRyeUNvbGxlY3Rpb25cIjtcbiAgICB9XG4gICAgaWYgKGdlb2pzb24udHlwZSA9PT0gXCJGZWF0dXJlXCIgJiYgZ2VvanNvbi5nZW9tZXRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZ2VvanNvbi5nZW9tZXRyeS50eXBlO1xuICAgIH1cbiAgICByZXR1cm4gZ2VvanNvbi50eXBlO1xufVxuIiwiaW1wb3J0IHsgZmVhdHVyZSwgZmVhdHVyZUNvbGxlY3Rpb24sIHBvaW50LCB9IGZyb20gXCJAdHVyZi9oZWxwZXJzXCI7XG5pbXBvcnQgeyBnZXRDb29yZHMgfSBmcm9tIFwiQHR1cmYvaW52YXJpYW50XCI7XG5pbXBvcnQgbGluZVNlZ21lbnQgZnJvbSBcIkB0dXJmL2xpbmUtc2VnbWVudFwiO1xuaW1wb3J0IHsgZmVhdHVyZUVhY2ggfSBmcm9tIFwiQHR1cmYvbWV0YVwiO1xuaW1wb3J0IHJidXNoIGZyb20gXCJnZW9qc29uLXJidXNoXCI7XG4vKipcbiAqIFRha2VzIGFueSBMaW5lU3RyaW5nIG9yIFBvbHlnb24gR2VvSlNPTiBhbmQgcmV0dXJucyB0aGUgaW50ZXJzZWN0aW5nIHBvaW50KHMpLlxuICpcbiAqIEBuYW1lIGxpbmVJbnRlcnNlY3RcbiAqIEBwYXJhbSB7R2VvSlNPTn0gbGluZTEgYW55IExpbmVTdHJpbmcgb3IgUG9seWdvblxuICogQHBhcmFtIHtHZW9KU09OfSBsaW5lMiBhbnkgTGluZVN0cmluZyBvciBQb2x5Z29uXG4gKiBAcmV0dXJucyB7RmVhdHVyZUNvbGxlY3Rpb248UG9pbnQ+fSBwb2ludChzKSB0aGF0IGludGVyc2VjdCBib3RoXG4gKiBAZXhhbXBsZVxuICogdmFyIGxpbmUxID0gdHVyZi5saW5lU3RyaW5nKFtbMTI2LCAtMTFdLCBbMTI5LCAtMjFdXSk7XG4gKiB2YXIgbGluZTIgPSB0dXJmLmxpbmVTdHJpbmcoW1sxMjMsIC0xOF0sIFsxMzEsIC0xNF1dKTtcbiAqIHZhciBpbnRlcnNlY3RzID0gdHVyZi5saW5lSW50ZXJzZWN0KGxpbmUxLCBsaW5lMik7XG4gKlxuICogLy9hZGRUb01hcFxuICogdmFyIGFkZFRvTWFwID0gW2xpbmUxLCBsaW5lMiwgaW50ZXJzZWN0c11cbiAqL1xuZnVuY3Rpb24gbGluZUludGVyc2VjdChsaW5lMSwgbGluZTIpIHtcbiAgICB2YXIgdW5pcXVlID0ge307XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAvLyBGaXJzdCwgbm9ybWFsaXplIGdlb21ldHJpZXMgdG8gZmVhdHVyZXNcbiAgICAvLyBUaGVuLCBoYW5kbGUgc2ltcGxlIDItdmVydGV4IHNlZ21lbnRzXG4gICAgaWYgKGxpbmUxLnR5cGUgPT09IFwiTGluZVN0cmluZ1wiKSB7XG4gICAgICAgIGxpbmUxID0gZmVhdHVyZShsaW5lMSk7XG4gICAgfVxuICAgIGlmIChsaW5lMi50eXBlID09PSBcIkxpbmVTdHJpbmdcIikge1xuICAgICAgICBsaW5lMiA9IGZlYXR1cmUobGluZTIpO1xuICAgIH1cbiAgICBpZiAobGluZTEudHlwZSA9PT0gXCJGZWF0dXJlXCIgJiZcbiAgICAgICAgbGluZTIudHlwZSA9PT0gXCJGZWF0dXJlXCIgJiZcbiAgICAgICAgbGluZTEuZ2VvbWV0cnkgIT09IG51bGwgJiZcbiAgICAgICAgbGluZTIuZ2VvbWV0cnkgIT09IG51bGwgJiZcbiAgICAgICAgbGluZTEuZ2VvbWV0cnkudHlwZSA9PT0gXCJMaW5lU3RyaW5nXCIgJiZcbiAgICAgICAgbGluZTIuZ2VvbWV0cnkudHlwZSA9PT0gXCJMaW5lU3RyaW5nXCIgJiZcbiAgICAgICAgbGluZTEuZ2VvbWV0cnkuY29vcmRpbmF0ZXMubGVuZ3RoID09PSAyICYmXG4gICAgICAgIGxpbmUyLmdlb21ldHJ5LmNvb3JkaW5hdGVzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICB2YXIgaW50ZXJzZWN0ID0gaW50ZXJzZWN0cyhsaW5lMSwgbGluZTIpO1xuICAgICAgICBpZiAoaW50ZXJzZWN0KSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goaW50ZXJzZWN0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24ocmVzdWx0cyk7XG4gICAgfVxuICAgIC8vIEhhbmRsZXMgY29tcGxleCBHZW9KU09OIEdlb21ldHJpZXNcbiAgICB2YXIgdHJlZSA9IHJidXNoKCk7XG4gICAgdHJlZS5sb2FkKGxpbmVTZWdtZW50KGxpbmUyKSk7XG4gICAgZmVhdHVyZUVhY2gobGluZVNlZ21lbnQobGluZTEpLCBmdW5jdGlvbiAoc2VnbWVudCkge1xuICAgICAgICBmZWF0dXJlRWFjaCh0cmVlLnNlYXJjaChzZWdtZW50KSwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaW50ZXJzZWN0ID0gaW50ZXJzZWN0cyhzZWdtZW50LCBtYXRjaCk7XG4gICAgICAgICAgICBpZiAoaW50ZXJzZWN0KSB7XG4gICAgICAgICAgICAgICAgLy8gcHJldmVudCBkdXBsaWNhdGUgcG9pbnRzIGh0dHBzOi8vZ2l0aHViLmNvbS9UdXJmanMvdHVyZi9pc3N1ZXMvNjg4XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGdldENvb3JkcyhpbnRlcnNlY3QpLmpvaW4oXCIsXCIpO1xuICAgICAgICAgICAgICAgIGlmICghdW5pcXVlW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdW5pcXVlW2tleV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goaW50ZXJzZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbihyZXN1bHRzKTtcbn1cbi8qKlxuICogRmluZCBhIHBvaW50IHRoYXQgaW50ZXJzZWN0cyBMaW5lU3RyaW5ncyB3aXRoIHR3byBjb29yZGluYXRlcyBlYWNoXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RmVhdHVyZTxMaW5lU3RyaW5nPn0gbGluZTEgR2VvSlNPTiBMaW5lU3RyaW5nIChNdXN0IG9ubHkgY29udGFpbiAyIGNvb3JkaW5hdGVzKVxuICogQHBhcmFtIHtGZWF0dXJlPExpbmVTdHJpbmc+fSBsaW5lMiBHZW9KU09OIExpbmVTdHJpbmcgKE11c3Qgb25seSBjb250YWluIDIgY29vcmRpbmF0ZXMpXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxQb2ludD59IGludGVyc2VjdGluZyBHZW9KU09OIFBvaW50XG4gKi9cbmZ1bmN0aW9uIGludGVyc2VjdHMobGluZTEsIGxpbmUyKSB7XG4gICAgdmFyIGNvb3JkczEgPSBnZXRDb29yZHMobGluZTEpO1xuICAgIHZhciBjb29yZHMyID0gZ2V0Q29vcmRzKGxpbmUyKTtcbiAgICBpZiAoY29vcmRzMS5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiPGludGVyc2VjdHM+IGxpbmUxIG11c3Qgb25seSBjb250YWluIDIgY29vcmRpbmF0ZXNcIik7XG4gICAgfVxuICAgIGlmIChjb29yZHMyLmxlbmd0aCAhPT0gMikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCI8aW50ZXJzZWN0cz4gbGluZTIgbXVzdCBvbmx5IGNvbnRhaW4gMiBjb29yZGluYXRlc1wiKTtcbiAgICB9XG4gICAgdmFyIHgxID0gY29vcmRzMVswXVswXTtcbiAgICB2YXIgeTEgPSBjb29yZHMxWzBdWzFdO1xuICAgIHZhciB4MiA9IGNvb3JkczFbMV1bMF07XG4gICAgdmFyIHkyID0gY29vcmRzMVsxXVsxXTtcbiAgICB2YXIgeDMgPSBjb29yZHMyWzBdWzBdO1xuICAgIHZhciB5MyA9IGNvb3JkczJbMF1bMV07XG4gICAgdmFyIHg0ID0gY29vcmRzMlsxXVswXTtcbiAgICB2YXIgeTQgPSBjb29yZHMyWzFdWzFdO1xuICAgIHZhciBkZW5vbSA9ICh5NCAtIHkzKSAqICh4MiAtIHgxKSAtICh4NCAtIHgzKSAqICh5MiAtIHkxKTtcbiAgICB2YXIgbnVtZUEgPSAoeDQgLSB4MykgKiAoeTEgLSB5MykgLSAoeTQgLSB5MykgKiAoeDEgLSB4Myk7XG4gICAgdmFyIG51bWVCID0gKHgyIC0geDEpICogKHkxIC0geTMpIC0gKHkyIC0geTEpICogKHgxIC0geDMpO1xuICAgIGlmIChkZW5vbSA9PT0gMCkge1xuICAgICAgICBpZiAobnVtZUEgPT09IDAgJiYgbnVtZUIgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgdUEgPSBudW1lQSAvIGRlbm9tO1xuICAgIHZhciB1QiA9IG51bWVCIC8gZGVub207XG4gICAgaWYgKHVBID49IDAgJiYgdUEgPD0gMSAmJiB1QiA+PSAwICYmIHVCIDw9IDEpIHtcbiAgICAgICAgdmFyIHggPSB4MSArIHVBICogKHgyIC0geDEpO1xuICAgICAgICB2YXIgeSA9IHkxICsgdUEgKiAoeTIgLSB5MSk7XG4gICAgICAgIHJldHVybiBwb2ludChbeCwgeV0pO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbmV4cG9ydCBkZWZhdWx0IGxpbmVJbnRlcnNlY3Q7XG4iLCJpbXBvcnQgeyBmZWF0dXJlQ29sbGVjdGlvbiwgbGluZVN0cmluZywgfSBmcm9tIFwiQHR1cmYvaGVscGVyc1wiO1xuaW1wb3J0IHsgZ2V0Q29vcmRzIH0gZnJvbSBcIkB0dXJmL2ludmFyaWFudFwiO1xuaW1wb3J0IHsgZmxhdHRlbkVhY2ggfSBmcm9tIFwiQHR1cmYvbWV0YVwiO1xuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIEZlYXR1cmVDb2xsZWN0aW9ufSBvZiAyLXZlcnRleCB7QGxpbmsgTGluZVN0cmluZ30gc2VnbWVudHMgZnJvbSBhXG4gKiB7QGxpbmsgTGluZVN0cmluZ3woTXVsdGkpTGluZVN0cmluZ30gb3Ige0BsaW5rIFBvbHlnb258KE11bHRpKVBvbHlnb259LlxuICpcbiAqIEBuYW1lIGxpbmVTZWdtZW50XG4gKiBAcGFyYW0ge0dlb0pTT059IGdlb2pzb24gR2VvSlNPTiBQb2x5Z29uIG9yIExpbmVTdHJpbmdcbiAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbjxMaW5lU3RyaW5nPn0gMi12ZXJ0ZXggbGluZSBzZWdtZW50c1xuICogQGV4YW1wbGVcbiAqIHZhciBwb2x5Z29uID0gdHVyZi5wb2x5Z29uKFtbWy01MCwgNV0sIFstNDAsIC0xMF0sIFstNTAsIC0xMF0sIFstNDAsIDVdLCBbLTUwLCA1XV1dKTtcbiAqIHZhciBzZWdtZW50cyA9IHR1cmYubGluZVNlZ21lbnQocG9seWdvbik7XG4gKlxuICogLy9hZGRUb01hcFxuICogdmFyIGFkZFRvTWFwID0gW3BvbHlnb24sIHNlZ21lbnRzXVxuICovXG5mdW5jdGlvbiBsaW5lU2VnbWVudChnZW9qc29uKSB7XG4gICAgaWYgKCFnZW9qc29uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImdlb2pzb24gaXMgcmVxdWlyZWRcIik7XG4gICAgfVxuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgZmxhdHRlbkVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgICAgbGluZVNlZ21lbnRGZWF0dXJlKGZlYXR1cmUsIHJlc3VsdHMpO1xuICAgIH0pO1xuICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbihyZXN1bHRzKTtcbn1cbi8qKlxuICogTGluZSBTZWdtZW50XG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RmVhdHVyZTxMaW5lU3RyaW5nfFBvbHlnb24+fSBnZW9qc29uIExpbmUgb3IgcG9seWdvbiBmZWF0dXJlXG4gKiBAcGFyYW0ge0FycmF5fSByZXN1bHRzIHB1c2ggdG8gcmVzdWx0c1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGxpbmVTZWdtZW50RmVhdHVyZShnZW9qc29uLCByZXN1bHRzKSB7XG4gICAgdmFyIGNvb3JkcyA9IFtdO1xuICAgIHZhciBnZW9tZXRyeSA9IGdlb2pzb24uZ2VvbWV0cnk7XG4gICAgaWYgKGdlb21ldHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHN3aXRjaCAoZ2VvbWV0cnkudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgICAgICAgICBjb29yZHMgPSBnZXRDb29yZHMoZ2VvbWV0cnkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgICAgICAgICBjb29yZHMgPSBbZ2V0Q29vcmRzKGdlb21ldHJ5KV07XG4gICAgICAgIH1cbiAgICAgICAgY29vcmRzLmZvckVhY2goZnVuY3Rpb24gKGNvb3JkKSB7XG4gICAgICAgICAgICB2YXIgc2VnbWVudHMgPSBjcmVhdGVTZWdtZW50cyhjb29yZCwgZ2VvanNvbi5wcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIHNlZ21lbnRzLmZvckVhY2goZnVuY3Rpb24gKHNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmlkID0gcmVzdWx0cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHNlZ21lbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogQ3JlYXRlIFNlZ21lbnRzIGZyb20gTGluZVN0cmluZyBjb29yZGluYXRlc1xuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBjb29yZHMgTGluZVN0cmluZyBjb29yZGluYXRlc1xuICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzIEdlb0pTT04gcHJvcGVydGllc1xuICogQHJldHVybnMge0FycmF5PEZlYXR1cmU8TGluZVN0cmluZz4+fSBsaW5lIHNlZ21lbnRzXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVNlZ21lbnRzKGNvb3JkcywgcHJvcGVydGllcykge1xuICAgIHZhciBzZWdtZW50cyA9IFtdO1xuICAgIGNvb3Jkcy5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzQ29vcmRzLCBjdXJyZW50Q29vcmRzKSB7XG4gICAgICAgIHZhciBzZWdtZW50ID0gbGluZVN0cmluZyhbcHJldmlvdXNDb29yZHMsIGN1cnJlbnRDb29yZHNdLCBwcm9wZXJ0aWVzKTtcbiAgICAgICAgc2VnbWVudC5iYm94ID0gYmJveChwcmV2aW91c0Nvb3JkcywgY3VycmVudENvb3Jkcyk7XG4gICAgICAgIHNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q29vcmRzO1xuICAgIH0pO1xuICAgIHJldHVybiBzZWdtZW50cztcbn1cbi8qKlxuICogQ3JlYXRlIEJCb3ggYmV0d2VlbiB0d28gY29vcmRpbmF0ZXMgKGZhc3RlciB0aGFuIEB0dXJmL2Jib3gpXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gY29vcmRzMSBQb2ludCBjb29yZGluYXRlXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGNvb3JkczIgUG9pbnQgY29vcmRpbmF0ZVxuICogQHJldHVybnMge0JCb3h9IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdXG4gKi9cbmZ1bmN0aW9uIGJib3goY29vcmRzMSwgY29vcmRzMikge1xuICAgIHZhciB4MSA9IGNvb3JkczFbMF07XG4gICAgdmFyIHkxID0gY29vcmRzMVsxXTtcbiAgICB2YXIgeDIgPSBjb29yZHMyWzBdO1xuICAgIHZhciB5MiA9IGNvb3JkczJbMV07XG4gICAgdmFyIHdlc3QgPSB4MSA8IHgyID8geDEgOiB4MjtcbiAgICB2YXIgc291dGggPSB5MSA8IHkyID8geTEgOiB5MjtcbiAgICB2YXIgZWFzdCA9IHgxID4geDIgPyB4MSA6IHgyO1xuICAgIHZhciBub3J0aCA9IHkxID4geTIgPyB5MSA6IHkyO1xuICAgIHJldHVybiBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXTtcbn1cbmV4cG9ydCBkZWZhdWx0IGxpbmVTZWdtZW50O1xuIiwiaW1wb3J0IHsgZmVhdHVyZSwgbGluZVN0cmluZywgaXNPYmplY3QsIHBvaW50IH0gZnJvbSAnQHR1cmYvaGVscGVycyc7XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGNvb3JkRWFjaFxuICpcbiAqIEBjYWxsYmFjayBjb29yZEVhY2hDYWxsYmFja1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBjdXJyZW50Q29vcmQgVGhlIGN1cnJlbnQgY29vcmRpbmF0ZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gY29vcmRJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgY29vcmRpbmF0ZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aUZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgTXVsdGktRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZ2VvbWV0cnlJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgR2VvbWV0cnkgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGNvb3JkaW5hdGVzIGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5mb3JFYWNoKClcbiAqXG4gKiBAbmFtZSBjb29yZEVhY2hcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBhbnkgR2VvSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKGN1cnJlbnRDb29yZCwgY29vcmRJbmRleCwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleClcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2V4Y2x1ZGVXcmFwQ29vcmQ9ZmFsc2VdIHdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgdGhlIGZpbmFsIGNvb3JkaW5hdGUgb2YgTGluZWFyUmluZ3MgdGhhdCB3cmFwcyB0aGUgcmluZyBpbiBpdHMgaXRlcmF0aW9uLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtcImZvb1wiOiBcImJhclwifSksXG4gKiAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtcImhlbGxvXCI6IFwid29ybGRcIn0pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmNvb3JkRWFjaChmZWF0dXJlcywgZnVuY3Rpb24gKGN1cnJlbnRDb29yZCwgY29vcmRJbmRleCwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleCkge1xuICogICAvLz1jdXJyZW50Q29vcmRcbiAqICAgLy89Y29vcmRJbmRleFxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgLy89bXVsdGlGZWF0dXJlSW5kZXhcbiAqICAgLy89Z2VvbWV0cnlJbmRleFxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIGNvb3JkRWFjaChnZW9qc29uLCBjYWxsYmFjaywgZXhjbHVkZVdyYXBDb29yZCkge1xuICAvLyBIYW5kbGVzIG51bGwgR2VvbWV0cnkgLS0gU2tpcHMgdGhpcyBHZW9KU09OXG4gIGlmIChnZW9qc29uID09PSBudWxsKSByZXR1cm47XG4gIHZhciBqLFxuICAgIGssXG4gICAgbCxcbiAgICBnZW9tZXRyeSxcbiAgICBzdG9wRyxcbiAgICBjb29yZHMsXG4gICAgZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb24sXG4gICAgd3JhcFNocmluayA9IDAsXG4gICAgY29vcmRJbmRleCA9IDAsXG4gICAgaXNHZW9tZXRyeUNvbGxlY3Rpb24sXG4gICAgdHlwZSA9IGdlb2pzb24udHlwZSxcbiAgICBpc0ZlYXR1cmVDb2xsZWN0aW9uID0gdHlwZSA9PT0gXCJGZWF0dXJlQ29sbGVjdGlvblwiLFxuICAgIGlzRmVhdHVyZSA9IHR5cGUgPT09IFwiRmVhdHVyZVwiLFxuICAgIHN0b3AgPSBpc0ZlYXR1cmVDb2xsZWN0aW9uID8gZ2VvanNvbi5mZWF0dXJlcy5sZW5ndGggOiAxO1xuXG4gIC8vIFRoaXMgbG9naWMgbWF5IGxvb2sgYSBsaXR0bGUgd2VpcmQuIFRoZSByZWFzb24gd2h5IGl0IGlzIHRoYXQgd2F5XG4gIC8vIGlzIGJlY2F1c2UgaXQncyB0cnlpbmcgdG8gYmUgZmFzdC4gR2VvSlNPTiBzdXBwb3J0cyBtdWx0aXBsZSBraW5kc1xuICAvLyBvZiBvYmplY3RzIGF0IGl0cyByb290OiBGZWF0dXJlQ29sbGVjdGlvbiwgRmVhdHVyZXMsIEdlb21ldHJpZXMuXG4gIC8vIFRoaXMgZnVuY3Rpb24gaGFzIHRoZSByZXNwb25zaWJpbGl0eSBvZiBoYW5kbGluZyBhbGwgb2YgdGhlbSwgYW5kIHRoYXRcbiAgLy8gbWVhbnMgdGhhdCBzb21lIG9mIHRoZSBgZm9yYCBsb29wcyB5b3Ugc2VlIGJlbG93IGFjdHVhbGx5IGp1c3QgZG9uJ3QgYXBwbHlcbiAgLy8gdG8gY2VydGFpbiBpbnB1dHMuIEZvciBpbnN0YW5jZSwgaWYgeW91IGdpdmUgdGhpcyBqdXN0IGFcbiAgLy8gUG9pbnQgZ2VvbWV0cnksIHRoZW4gYm90aCBsb29wcyBhcmUgc2hvcnQtY2lyY3VpdGVkIGFuZCBhbGwgd2UgZG9cbiAgLy8gaXMgZ3JhZHVhbGx5IHJlbmFtZSB0aGUgaW5wdXQgdW50aWwgaXQncyBjYWxsZWQgJ2dlb21ldHJ5Jy5cbiAgLy9cbiAgLy8gVGhpcyBhbHNvIGFpbXMgdG8gYWxsb2NhdGUgYXMgZmV3IHJlc291cmNlcyBhcyBwb3NzaWJsZToganVzdCBhXG4gIC8vIGZldyBudW1iZXJzIGFuZCBib29sZWFucywgcmF0aGVyIHRoYW4gYW55IHRlbXBvcmFyeSBhcnJheXMgYXMgd291bGRcbiAgLy8gYmUgcmVxdWlyZWQgd2l0aCB0aGUgbm9ybWFsaXphdGlvbiBhcHByb2FjaC5cbiAgZm9yICh2YXIgZmVhdHVyZUluZGV4ID0gMDsgZmVhdHVyZUluZGV4IDwgc3RvcDsgZmVhdHVyZUluZGV4KyspIHtcbiAgICBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbiA9IGlzRmVhdHVyZUNvbGxlY3Rpb25cbiAgICAgID8gZ2VvanNvbi5mZWF0dXJlc1tmZWF0dXJlSW5kZXhdLmdlb21ldHJ5XG4gICAgICA6IGlzRmVhdHVyZVxuICAgICAgPyBnZW9qc29uLmdlb21ldHJ5XG4gICAgICA6IGdlb2pzb247XG4gICAgaXNHZW9tZXRyeUNvbGxlY3Rpb24gPSBnZW9tZXRyeU1heWJlQ29sbGVjdGlvblxuICAgICAgPyBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbi50eXBlID09PSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICAgIHN0b3BHID0gaXNHZW9tZXRyeUNvbGxlY3Rpb25cbiAgICAgID8gZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb24uZ2VvbWV0cmllcy5sZW5ndGhcbiAgICAgIDogMTtcblxuICAgIGZvciAodmFyIGdlb21JbmRleCA9IDA7IGdlb21JbmRleCA8IHN0b3BHOyBnZW9tSW5kZXgrKykge1xuICAgICAgdmFyIG11bHRpRmVhdHVyZUluZGV4ID0gMDtcbiAgICAgIHZhciBnZW9tZXRyeUluZGV4ID0gMDtcbiAgICAgIGdlb21ldHJ5ID0gaXNHZW9tZXRyeUNvbGxlY3Rpb25cbiAgICAgICAgPyBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbi5nZW9tZXRyaWVzW2dlb21JbmRleF1cbiAgICAgICAgOiBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbjtcblxuICAgICAgLy8gSGFuZGxlcyBudWxsIEdlb21ldHJ5IC0tIFNraXBzIHRoaXMgZ2VvbWV0cnlcbiAgICAgIGlmIChnZW9tZXRyeSA9PT0gbnVsbCkgY29udGludWU7XG4gICAgICBjb29yZHMgPSBnZW9tZXRyeS5jb29yZGluYXRlcztcbiAgICAgIHZhciBnZW9tVHlwZSA9IGdlb21ldHJ5LnR5cGU7XG5cbiAgICAgIHdyYXBTaHJpbmsgPVxuICAgICAgICBleGNsdWRlV3JhcENvb3JkICYmXG4gICAgICAgIChnZW9tVHlwZSA9PT0gXCJQb2x5Z29uXCIgfHwgZ2VvbVR5cGUgPT09IFwiTXVsdGlQb2x5Z29uXCIpXG4gICAgICAgICAgPyAxXG4gICAgICAgICAgOiAwO1xuXG4gICAgICBzd2l0Y2ggKGdlb21UeXBlKSB7XG4gICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlBvaW50XCI6XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICAgIGNvb3JkcyxcbiAgICAgICAgICAgICAgY29vcmRJbmRleCxcbiAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgZ2VvbWV0cnlJbmRleFxuICAgICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgY29vcmRJbmRleCsrO1xuICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4Kys7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6XG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGNvb3Jkcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgICAgICBjb29yZHNbal0sXG4gICAgICAgICAgICAgICAgY29vcmRJbmRleCxcbiAgICAgICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgICAgZ2VvbWV0cnlJbmRleFxuICAgICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBjb29yZEluZGV4Kys7XG4gICAgICAgICAgICBpZiAoZ2VvbVR5cGUgPT09IFwiTXVsdGlQb2ludFwiKSBtdWx0aUZlYXR1cmVJbmRleCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZ2VvbVR5cGUgPT09IFwiTGluZVN0cmluZ1wiKSBtdWx0aUZlYXR1cmVJbmRleCsrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6XG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGNvb3Jkcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgZm9yIChrID0gMDsgayA8IGNvb3Jkc1tqXS5sZW5ndGggLSB3cmFwU2hyaW5rOyBrKyspIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICAgICAgY29vcmRzW2pdW2tdLFxuICAgICAgICAgICAgICAgICAgY29vcmRJbmRleCxcbiAgICAgICAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICAgICAgZ2VvbWV0cnlJbmRleFxuICAgICAgICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIGNvb3JkSW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChnZW9tVHlwZSA9PT0gXCJNdWx0aUxpbmVTdHJpbmdcIikgbXVsdGlGZWF0dXJlSW5kZXgrKztcbiAgICAgICAgICAgIGlmIChnZW9tVHlwZSA9PT0gXCJQb2x5Z29uXCIpIGdlb21ldHJ5SW5kZXgrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGdlb21UeXBlID09PSBcIlBvbHlnb25cIikgbXVsdGlGZWF0dXJlSW5kZXgrKztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIk11bHRpUG9seWdvblwiOlxuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBjb29yZHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGdlb21ldHJ5SW5kZXggPSAwO1xuICAgICAgICAgICAgZm9yIChrID0gMDsgayA8IGNvb3Jkc1tqXS5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICBmb3IgKGwgPSAwOyBsIDwgY29vcmRzW2pdW2tdLmxlbmd0aCAtIHdyYXBTaHJpbms7IGwrKykge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICAgICAgICBjb29yZHNbal1ba11bbF0sXG4gICAgICAgICAgICAgICAgICAgIGNvb3JkSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGdlb21ldHJ5SW5kZXhcbiAgICAgICAgICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvb3JkSW5kZXgrKztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiOlxuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBnZW9tZXRyeS5nZW9tZXRyaWVzLmxlbmd0aDsgaisrKVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjb29yZEVhY2goZ2VvbWV0cnkuZ2VvbWV0cmllc1tqXSwgY2FsbGJhY2ssIGV4Y2x1ZGVXcmFwQ29vcmQpID09PVxuICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBHZW9tZXRyeSBUeXBlXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBjb29yZFJlZHVjZVxuICpcbiAqIFRoZSBmaXJzdCB0aW1lIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZSB2YWx1ZXMgcHJvdmlkZWQgYXMgYXJndW1lbnRzIGRlcGVuZFxuICogb24gd2hldGhlciB0aGUgcmVkdWNlIG1ldGhvZCBoYXMgYW4gaW5pdGlhbFZhbHVlIGFyZ3VtZW50LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBwcm92aWRlZCB0byB0aGUgcmVkdWNlIG1ldGhvZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIGluaXRpYWxWYWx1ZS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBub3QgcHJvdmlkZWQ6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgc2Vjb25kIGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogQGNhbGxiYWNrIGNvb3JkUmVkdWNlQ2FsbGJhY2tcbiAqIEBwYXJhbSB7Kn0gcHJldmlvdXNWYWx1ZSBUaGUgYWNjdW11bGF0ZWQgdmFsdWUgcHJldmlvdXNseSByZXR1cm5lZCBpbiB0aGUgbGFzdCBpbnZvY2F0aW9uXG4gKiBvZiB0aGUgY2FsbGJhY2ssIG9yIGluaXRpYWxWYWx1ZSwgaWYgc3VwcGxpZWQuXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGN1cnJlbnRDb29yZCBUaGUgY3VycmVudCBjb29yZGluYXRlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb29yZEluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBjb29yZGluYXRlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIFN0YXJ0cyBhdCBpbmRleCAwLCBpZiBhbiBpbml0aWFsVmFsdWUgaXMgcHJvdmlkZWQsIGFuZCBhdCBpbmRleCAxIG90aGVyd2lzZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBnZW9tZXRyeUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBSZWR1Y2UgY29vcmRpbmF0ZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LnJlZHVjZSgpXG4gKlxuICogQG5hbWUgY29vcmRSZWR1Y2VcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258R2VvbWV0cnl8RmVhdHVyZX0gZ2VvanNvbiBhbnkgR2VvSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRDb29yZCwgY29vcmRJbmRleClcbiAqIEBwYXJhbSB7Kn0gW2luaXRpYWxWYWx1ZV0gVmFsdWUgdG8gdXNlIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgZmlyc3QgY2FsbCBvZiB0aGUgY2FsbGJhY2suXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtleGNsdWRlV3JhcENvb3JkPWZhbHNlXSB3aGV0aGVyIG9yIG5vdCB0byBpbmNsdWRlIHRoZSBmaW5hbCBjb29yZGluYXRlIG9mIExpbmVhclJpbmdzIHRoYXQgd3JhcHMgdGhlIHJpbmcgaW4gaXRzIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHsqfSBUaGUgdmFsdWUgdGhhdCByZXN1bHRzIGZyb20gdGhlIHJlZHVjdGlvbi5cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgdHVyZi5wb2ludChbMjYsIDM3XSwge1wiZm9vXCI6IFwiYmFyXCJ9KSxcbiAqICAgdHVyZi5wb2ludChbMzYsIDUzXSwge1wiaGVsbG9cIjogXCJ3b3JsZFwifSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuY29vcmRSZWR1Y2UoZmVhdHVyZXMsIGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50Q29vcmQsIGNvb3JkSW5kZXgsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgpIHtcbiAqICAgLy89cHJldmlvdXNWYWx1ZVxuICogICAvLz1jdXJyZW50Q29vcmRcbiAqICAgLy89Y29vcmRJbmRleFxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgLy89bXVsdGlGZWF0dXJlSW5kZXhcbiAqICAgLy89Z2VvbWV0cnlJbmRleFxuICogICByZXR1cm4gY3VycmVudENvb3JkO1xuICogfSk7XG4gKi9cbmZ1bmN0aW9uIGNvb3JkUmVkdWNlKGdlb2pzb24sIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUsIGV4Y2x1ZGVXcmFwQ29vcmQpIHtcbiAgdmFyIHByZXZpb3VzVmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gIGNvb3JkRWFjaChcbiAgICBnZW9qc29uLFxuICAgIGZ1bmN0aW9uIChcbiAgICAgIGN1cnJlbnRDb29yZCxcbiAgICAgIGNvb3JkSW5kZXgsXG4gICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgIGdlb21ldHJ5SW5kZXhcbiAgICApIHtcbiAgICAgIGlmIChjb29yZEluZGV4ID09PSAwICYmIGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBwcmV2aW91c1ZhbHVlID0gY3VycmVudENvb3JkO1xuICAgICAgZWxzZVxuICAgICAgICBwcmV2aW91c1ZhbHVlID0gY2FsbGJhY2soXG4gICAgICAgICAgcHJldmlvdXNWYWx1ZSxcbiAgICAgICAgICBjdXJyZW50Q29vcmQsXG4gICAgICAgICAgY29vcmRJbmRleCxcbiAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICAgICAgZ2VvbWV0cnlJbmRleFxuICAgICAgICApO1xuICAgIH0sXG4gICAgZXhjbHVkZVdyYXBDb29yZFxuICApO1xuICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgcHJvcEVhY2hcbiAqXG4gKiBAY2FsbGJhY2sgcHJvcEVhY2hDYWxsYmFja1xuICogQHBhcmFtIHtPYmplY3R9IGN1cnJlbnRQcm9wZXJ0aWVzIFRoZSBjdXJyZW50IFByb3BlcnRpZXMgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgcHJvcGVydGllcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkuZm9yRWFjaCgpXG4gKlxuICogQG5hbWUgcHJvcEVhY2hcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZX0gZ2VvanNvbiBhbnkgR2VvSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKGN1cnJlbnRQcm9wZXJ0aWVzLCBmZWF0dXJlSW5kZXgpXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgICB0dXJmLnBvaW50KFsyNiwgMzddLCB7Zm9vOiAnYmFyJ30pLFxuICogICAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLnByb3BFYWNoKGZlYXR1cmVzLCBmdW5jdGlvbiAoY3VycmVudFByb3BlcnRpZXMsIGZlYXR1cmVJbmRleCkge1xuICogICAvLz1jdXJyZW50UHJvcGVydGllc1xuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBwcm9wRWFjaChnZW9qc29uLCBjYWxsYmFjaykge1xuICB2YXIgaTtcbiAgc3dpdGNoIChnZW9qc29uLnR5cGUpIHtcbiAgICBjYXNlIFwiRmVhdHVyZUNvbGxlY3Rpb25cIjpcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBnZW9qc29uLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChjYWxsYmFjayhnZW9qc29uLmZlYXR1cmVzW2ldLnByb3BlcnRpZXMsIGkpID09PSBmYWxzZSkgYnJlYWs7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiRmVhdHVyZVwiOlxuICAgICAgY2FsbGJhY2soZ2VvanNvbi5wcm9wZXJ0aWVzLCAwKTtcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHByb3BSZWR1Y2VcbiAqXG4gKiBUaGUgZmlyc3QgdGltZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGUgdmFsdWVzIHByb3ZpZGVkIGFzIGFyZ3VtZW50cyBkZXBlbmRcbiAqIG9uIHdoZXRoZXIgdGhlIHJlZHVjZSBtZXRob2QgaGFzIGFuIGluaXRpYWxWYWx1ZSBhcmd1bWVudC5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgcHJvdmlkZWQgdG8gdGhlIHJlZHVjZSBtZXRob2Q6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyBpbml0aWFsVmFsdWUuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgbm90IHByb3ZpZGVkOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIHNlY29uZCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIEBjYWxsYmFjayBwcm9wUmVkdWNlQ2FsbGJhY2tcbiAqIEBwYXJhbSB7Kn0gcHJldmlvdXNWYWx1ZSBUaGUgYWNjdW11bGF0ZWQgdmFsdWUgcHJldmlvdXNseSByZXR1cm5lZCBpbiB0aGUgbGFzdCBpbnZvY2F0aW9uXG4gKiBvZiB0aGUgY2FsbGJhY2ssIG9yIGluaXRpYWxWYWx1ZSwgaWYgc3VwcGxpZWQuXG4gKiBAcGFyYW0geyp9IGN1cnJlbnRQcm9wZXJ0aWVzIFRoZSBjdXJyZW50IFByb3BlcnRpZXMgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBSZWR1Y2UgcHJvcGVydGllcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QgaW50byBhIHNpbmdsZSB2YWx1ZSxcbiAqIHNpbWlsYXIgdG8gaG93IEFycmF5LnJlZHVjZSB3b3Jrcy4gSG93ZXZlciwgaW4gdGhpcyBjYXNlIHdlIGxhemlseSBydW5cbiAqIHRoZSByZWR1Y3Rpb24sIHNvIGFuIGFycmF5IG9mIGFsbCBwcm9wZXJ0aWVzIGlzIHVubmVjZXNzYXJ5LlxuICpcbiAqIEBuYW1lIHByb3BSZWR1Y2VcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZX0gZ2VvanNvbiBhbnkgR2VvSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRQcm9wZXJ0aWVzLCBmZWF0dXJlSW5kZXgpXG4gKiBAcGFyYW0geyp9IFtpbml0aWFsVmFsdWVdIFZhbHVlIHRvIHVzZSBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIGZpcnN0IGNhbGwgb2YgdGhlIGNhbGxiYWNrLlxuICogQHJldHVybnMgeyp9IFRoZSB2YWx1ZSB0aGF0IHJlc3VsdHMgZnJvbSB0aGUgcmVkdWN0aW9uLlxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgICAgdHVyZi5wb2ludChbMzYsIDUzXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHR1cmYucHJvcFJlZHVjZShmZWF0dXJlcywgZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRQcm9wZXJ0aWVzLCBmZWF0dXJlSW5kZXgpIHtcbiAqICAgLy89cHJldmlvdXNWYWx1ZVxuICogICAvLz1jdXJyZW50UHJvcGVydGllc1xuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgcmV0dXJuIGN1cnJlbnRQcm9wZXJ0aWVzXG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gcHJvcFJlZHVjZShnZW9qc29uLCBjYWxsYmFjaywgaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBwcmV2aW91c1ZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICBwcm9wRWFjaChnZW9qc29uLCBmdW5jdGlvbiAoY3VycmVudFByb3BlcnRpZXMsIGZlYXR1cmVJbmRleCkge1xuICAgIGlmIChmZWF0dXJlSW5kZXggPT09IDAgJiYgaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICBwcmV2aW91c1ZhbHVlID0gY3VycmVudFByb3BlcnRpZXM7XG4gICAgZWxzZVxuICAgICAgcHJldmlvdXNWYWx1ZSA9IGNhbGxiYWNrKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRQcm9wZXJ0aWVzLCBmZWF0dXJlSW5kZXgpO1xuICB9KTtcbiAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGZlYXR1cmVFYWNoXG4gKlxuICogQGNhbGxiYWNrIGZlYXR1cmVFYWNoQ2FsbGJhY2tcbiAqIEBwYXJhbSB7RmVhdHVyZTxhbnk+fSBjdXJyZW50RmVhdHVyZSBUaGUgY3VycmVudCBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGZlYXR1cmVzIGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0b1xuICogQXJyYXkuZm9yRWFjaC5cbiAqXG4gKiBAbmFtZSBmZWF0dXJlRWFjaFxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAoY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleClcbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICB0dXJmLnBvaW50KFsyNiwgMzddLCB7Zm9vOiAnYmFyJ30pLFxuICogICB0dXJmLnBvaW50KFszNiwgNTNdLCB7aGVsbG86ICd3b3JsZCd9KVxuICogXSk7XG4gKlxuICogdHVyZi5mZWF0dXJlRWFjaChmZWF0dXJlcywgZnVuY3Rpb24gKGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgpIHtcbiAqICAgLy89Y3VycmVudEZlYXR1cmVcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gZmVhdHVyZUVhY2goZ2VvanNvbiwgY2FsbGJhY2spIHtcbiAgaWYgKGdlb2pzb24udHlwZSA9PT0gXCJGZWF0dXJlXCIpIHtcbiAgICBjYWxsYmFjayhnZW9qc29uLCAwKTtcbiAgfSBlbHNlIGlmIChnZW9qc29uLnR5cGUgPT09IFwiRmVhdHVyZUNvbGxlY3Rpb25cIikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ2VvanNvbi5mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGNhbGxiYWNrKGdlb2pzb24uZmVhdHVyZXNbaV0sIGkpID09PSBmYWxzZSkgYnJlYWs7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGZlYXR1cmVSZWR1Y2VcbiAqXG4gKiBUaGUgZmlyc3QgdGltZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGUgdmFsdWVzIHByb3ZpZGVkIGFzIGFyZ3VtZW50cyBkZXBlbmRcbiAqIG9uIHdoZXRoZXIgdGhlIHJlZHVjZSBtZXRob2QgaGFzIGFuIGluaXRpYWxWYWx1ZSBhcmd1bWVudC5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgcHJvdmlkZWQgdG8gdGhlIHJlZHVjZSBtZXRob2Q6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyBpbml0aWFsVmFsdWUuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgbm90IHByb3ZpZGVkOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIHNlY29uZCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIEBjYWxsYmFjayBmZWF0dXJlUmVkdWNlQ2FsbGJhY2tcbiAqIEBwYXJhbSB7Kn0gcHJldmlvdXNWYWx1ZSBUaGUgYWNjdW11bGF0ZWQgdmFsdWUgcHJldmlvdXNseSByZXR1cm5lZCBpbiB0aGUgbGFzdCBpbnZvY2F0aW9uXG4gKiBvZiB0aGUgY2FsbGJhY2ssIG9yIGluaXRpYWxWYWx1ZSwgaWYgc3VwcGxpZWQuXG4gKiBAcGFyYW0ge0ZlYXR1cmV9IGN1cnJlbnRGZWF0dXJlIFRoZSBjdXJyZW50IEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBSZWR1Y2UgZmVhdHVyZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LnJlZHVjZSgpLlxuICpcbiAqIEBuYW1lIGZlYXR1cmVSZWR1Y2VcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBhbnkgR2VvSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgpXG4gKiBAcGFyYW0geyp9IFtpbml0aWFsVmFsdWVdIFZhbHVlIHRvIHVzZSBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIGZpcnN0IGNhbGwgb2YgdGhlIGNhbGxiYWNrLlxuICogQHJldHVybnMgeyp9IFRoZSB2YWx1ZSB0aGF0IHJlc3VsdHMgZnJvbSB0aGUgcmVkdWN0aW9uLlxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICB0dXJmLnBvaW50KFsyNiwgMzddLCB7XCJmb29cIjogXCJiYXJcIn0pLFxuICogICB0dXJmLnBvaW50KFszNiwgNTNdLCB7XCJoZWxsb1wiOiBcIndvcmxkXCJ9KVxuICogXSk7XG4gKlxuICogdHVyZi5mZWF0dXJlUmVkdWNlKGZlYXR1cmVzLCBmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCkge1xuICogICAvLz1wcmV2aW91c1ZhbHVlXG4gKiAgIC8vPWN1cnJlbnRGZWF0dXJlXG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICByZXR1cm4gY3VycmVudEZlYXR1cmVcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBmZWF0dXJlUmVkdWNlKGdlb2pzb24sIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUpIHtcbiAgdmFyIHByZXZpb3VzVmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gIGZlYXR1cmVFYWNoKGdlb2pzb24sIGZ1bmN0aW9uIChjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4KSB7XG4gICAgaWYgKGZlYXR1cmVJbmRleCA9PT0gMCAmJiBpbml0aWFsVmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50RmVhdHVyZTtcbiAgICBlbHNlIHByZXZpb3VzVmFsdWUgPSBjYWxsYmFjayhwcmV2aW91c1ZhbHVlLCBjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4KTtcbiAgfSk7XG4gIHJldHVybiBwcmV2aW91c1ZhbHVlO1xufVxuXG4vKipcbiAqIEdldCBhbGwgY29vcmRpbmF0ZXMgZnJvbSBhbnkgR2VvSlNPTiBvYmplY3QuXG4gKlxuICogQG5hbWUgY29vcmRBbGxcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBhbnkgR2VvSlNPTiBvYmplY3RcbiAqIEByZXR1cm5zIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gY29vcmRpbmF0ZSBwb3NpdGlvbiBhcnJheVxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICB0dXJmLnBvaW50KFsyNiwgMzddLCB7Zm9vOiAnYmFyJ30pLFxuICogICB0dXJmLnBvaW50KFszNiwgNTNdLCB7aGVsbG86ICd3b3JsZCd9KVxuICogXSk7XG4gKlxuICogdmFyIGNvb3JkcyA9IHR1cmYuY29vcmRBbGwoZmVhdHVyZXMpO1xuICogLy89IFtbMjYsIDM3XSwgWzM2LCA1M11dXG4gKi9cbmZ1bmN0aW9uIGNvb3JkQWxsKGdlb2pzb24pIHtcbiAgdmFyIGNvb3JkcyA9IFtdO1xuICBjb29yZEVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGNvb3JkKSB7XG4gICAgY29vcmRzLnB1c2goY29vcmQpO1xuICB9KTtcbiAgcmV0dXJuIGNvb3Jkcztcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgZ2VvbUVhY2hcbiAqXG4gKiBAY2FsbGJhY2sgZ2VvbUVhY2hDYWxsYmFja1xuICogQHBhcmFtIHtHZW9tZXRyeX0gY3VycmVudEdlb21ldHJ5IFRoZSBjdXJyZW50IEdlb21ldHJ5IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtPYmplY3R9IGZlYXR1cmVQcm9wZXJ0aWVzIFRoZSBjdXJyZW50IEZlYXR1cmUgUHJvcGVydGllcyBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGZlYXR1cmVCQm94IFRoZSBjdXJyZW50IEZlYXR1cmUgQkJveCBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGZlYXR1cmVJZCBUaGUgY3VycmVudCBGZWF0dXJlIElkIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBlYWNoIGdlb21ldHJ5IGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5mb3JFYWNoKClcbiAqXG4gKiBAbmFtZSBnZW9tRWFjaFxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAoY3VycmVudEdlb21ldHJ5LCBmZWF0dXJlSW5kZXgsIGZlYXR1cmVQcm9wZXJ0aWVzLCBmZWF0dXJlQkJveCwgZmVhdHVyZUlkKVxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgICAgdHVyZi5wb2ludChbMjYsIDM3XSwge2ZvbzogJ2Jhcid9KSxcbiAqICAgICB0dXJmLnBvaW50KFszNiwgNTNdLCB7aGVsbG86ICd3b3JsZCd9KVxuICogXSk7XG4gKlxuICogdHVyZi5nZW9tRWFjaChmZWF0dXJlcywgZnVuY3Rpb24gKGN1cnJlbnRHZW9tZXRyeSwgZmVhdHVyZUluZGV4LCBmZWF0dXJlUHJvcGVydGllcywgZmVhdHVyZUJCb3gsIGZlYXR1cmVJZCkge1xuICogICAvLz1jdXJyZW50R2VvbWV0cnlcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPWZlYXR1cmVQcm9wZXJ0aWVzXG4gKiAgIC8vPWZlYXR1cmVCQm94XG4gKiAgIC8vPWZlYXR1cmVJZFxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIGdlb21FYWNoKGdlb2pzb24sIGNhbGxiYWNrKSB7XG4gIHZhciBpLFxuICAgIGosXG4gICAgZyxcbiAgICBnZW9tZXRyeSxcbiAgICBzdG9wRyxcbiAgICBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbixcbiAgICBpc0dlb21ldHJ5Q29sbGVjdGlvbixcbiAgICBmZWF0dXJlUHJvcGVydGllcyxcbiAgICBmZWF0dXJlQkJveCxcbiAgICBmZWF0dXJlSWQsXG4gICAgZmVhdHVyZUluZGV4ID0gMCxcbiAgICBpc0ZlYXR1cmVDb2xsZWN0aW9uID0gZ2VvanNvbi50eXBlID09PSBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgaXNGZWF0dXJlID0gZ2VvanNvbi50eXBlID09PSBcIkZlYXR1cmVcIixcbiAgICBzdG9wID0gaXNGZWF0dXJlQ29sbGVjdGlvbiA/IGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoIDogMTtcblxuICAvLyBUaGlzIGxvZ2ljIG1heSBsb29rIGEgbGl0dGxlIHdlaXJkLiBUaGUgcmVhc29uIHdoeSBpdCBpcyB0aGF0IHdheVxuICAvLyBpcyBiZWNhdXNlIGl0J3MgdHJ5aW5nIHRvIGJlIGZhc3QuIEdlb0pTT04gc3VwcG9ydHMgbXVsdGlwbGUga2luZHNcbiAgLy8gb2Ygb2JqZWN0cyBhdCBpdHMgcm9vdDogRmVhdHVyZUNvbGxlY3Rpb24sIEZlYXR1cmVzLCBHZW9tZXRyaWVzLlxuICAvLyBUaGlzIGZ1bmN0aW9uIGhhcyB0aGUgcmVzcG9uc2liaWxpdHkgb2YgaGFuZGxpbmcgYWxsIG9mIHRoZW0sIGFuZCB0aGF0XG4gIC8vIG1lYW5zIHRoYXQgc29tZSBvZiB0aGUgYGZvcmAgbG9vcHMgeW91IHNlZSBiZWxvdyBhY3R1YWxseSBqdXN0IGRvbid0IGFwcGx5XG4gIC8vIHRvIGNlcnRhaW4gaW5wdXRzLiBGb3IgaW5zdGFuY2UsIGlmIHlvdSBnaXZlIHRoaXMganVzdCBhXG4gIC8vIFBvaW50IGdlb21ldHJ5LCB0aGVuIGJvdGggbG9vcHMgYXJlIHNob3J0LWNpcmN1aXRlZCBhbmQgYWxsIHdlIGRvXG4gIC8vIGlzIGdyYWR1YWxseSByZW5hbWUgdGhlIGlucHV0IHVudGlsIGl0J3MgY2FsbGVkICdnZW9tZXRyeScuXG4gIC8vXG4gIC8vIFRoaXMgYWxzbyBhaW1zIHRvIGFsbG9jYXRlIGFzIGZldyByZXNvdXJjZXMgYXMgcG9zc2libGU6IGp1c3QgYVxuICAvLyBmZXcgbnVtYmVycyBhbmQgYm9vbGVhbnMsIHJhdGhlciB0aGFuIGFueSB0ZW1wb3JhcnkgYXJyYXlzIGFzIHdvdWxkXG4gIC8vIGJlIHJlcXVpcmVkIHdpdGggdGhlIG5vcm1hbGl6YXRpb24gYXBwcm9hY2guXG4gIGZvciAoaSA9IDA7IGkgPCBzdG9wOyBpKyspIHtcbiAgICBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbiA9IGlzRmVhdHVyZUNvbGxlY3Rpb25cbiAgICAgID8gZ2VvanNvbi5mZWF0dXJlc1tpXS5nZW9tZXRyeVxuICAgICAgOiBpc0ZlYXR1cmVcbiAgICAgID8gZ2VvanNvbi5nZW9tZXRyeVxuICAgICAgOiBnZW9qc29uO1xuICAgIGZlYXR1cmVQcm9wZXJ0aWVzID0gaXNGZWF0dXJlQ29sbGVjdGlvblxuICAgICAgPyBnZW9qc29uLmZlYXR1cmVzW2ldLnByb3BlcnRpZXNcbiAgICAgIDogaXNGZWF0dXJlXG4gICAgICA/IGdlb2pzb24ucHJvcGVydGllc1xuICAgICAgOiB7fTtcbiAgICBmZWF0dXJlQkJveCA9IGlzRmVhdHVyZUNvbGxlY3Rpb25cbiAgICAgID8gZ2VvanNvbi5mZWF0dXJlc1tpXS5iYm94XG4gICAgICA6IGlzRmVhdHVyZVxuICAgICAgPyBnZW9qc29uLmJib3hcbiAgICAgIDogdW5kZWZpbmVkO1xuICAgIGZlYXR1cmVJZCA9IGlzRmVhdHVyZUNvbGxlY3Rpb25cbiAgICAgID8gZ2VvanNvbi5mZWF0dXJlc1tpXS5pZFxuICAgICAgOiBpc0ZlYXR1cmVcbiAgICAgID8gZ2VvanNvbi5pZFxuICAgICAgOiB1bmRlZmluZWQ7XG4gICAgaXNHZW9tZXRyeUNvbGxlY3Rpb24gPSBnZW9tZXRyeU1heWJlQ29sbGVjdGlvblxuICAgICAgPyBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbi50eXBlID09PSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICAgIHN0b3BHID0gaXNHZW9tZXRyeUNvbGxlY3Rpb25cbiAgICAgID8gZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb24uZ2VvbWV0cmllcy5sZW5ndGhcbiAgICAgIDogMTtcblxuICAgIGZvciAoZyA9IDA7IGcgPCBzdG9wRzsgZysrKSB7XG4gICAgICBnZW9tZXRyeSA9IGlzR2VvbWV0cnlDb2xsZWN0aW9uXG4gICAgICAgID8gZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb24uZ2VvbWV0cmllc1tnXVxuICAgICAgICA6IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uO1xuXG4gICAgICAvLyBIYW5kbGUgbnVsbCBHZW9tZXRyeVxuICAgICAgaWYgKGdlb21ldHJ5ID09PSBudWxsKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICBmZWF0dXJlUHJvcGVydGllcyxcbiAgICAgICAgICAgIGZlYXR1cmVCQm94LFxuICAgICAgICAgICAgZmVhdHVyZUlkXG4gICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKGdlb21ldHJ5LnR5cGUpIHtcbiAgICAgICAgY2FzZSBcIlBvaW50XCI6XG4gICAgICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6XG4gICAgICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICAgIGNhc2UgXCJNdWx0aUxpbmVTdHJpbmdcIjpcbiAgICAgICAgY2FzZSBcIk11bHRpUG9seWdvblwiOiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICAgIGdlb21ldHJ5LFxuICAgICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgIGZlYXR1cmVQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICBmZWF0dXJlQkJveCxcbiAgICAgICAgICAgICAgZmVhdHVyZUlkXG4gICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiR2VvbWV0cnlDb2xsZWN0aW9uXCI6IHtcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgZ2VvbWV0cnkuZ2VvbWV0cmllcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgICAgICBnZW9tZXRyeS5nZW9tZXRyaWVzW2pdLFxuICAgICAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgICBmZWF0dXJlUHJvcGVydGllcyxcbiAgICAgICAgICAgICAgICBmZWF0dXJlQkJveCxcbiAgICAgICAgICAgICAgICBmZWF0dXJlSWRcbiAgICAgICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gR2VvbWV0cnkgVHlwZVwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gT25seSBpbmNyZWFzZSBgZmVhdHVyZUluZGV4YCBwZXIgZWFjaCBmZWF0dXJlXG4gICAgZmVhdHVyZUluZGV4Kys7XG4gIH1cbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgZ2VvbVJlZHVjZVxuICpcbiAqIFRoZSBmaXJzdCB0aW1lIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZSB2YWx1ZXMgcHJvdmlkZWQgYXMgYXJndW1lbnRzIGRlcGVuZFxuICogb24gd2hldGhlciB0aGUgcmVkdWNlIG1ldGhvZCBoYXMgYW4gaW5pdGlhbFZhbHVlIGFyZ3VtZW50LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBwcm92aWRlZCB0byB0aGUgcmVkdWNlIG1ldGhvZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIGluaXRpYWxWYWx1ZS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBub3QgcHJvdmlkZWQ6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgc2Vjb25kIGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogQGNhbGxiYWNrIGdlb21SZWR1Y2VDYWxsYmFja1xuICogQHBhcmFtIHsqfSBwcmV2aW91c1ZhbHVlIFRoZSBhY2N1bXVsYXRlZCB2YWx1ZSBwcmV2aW91c2x5IHJldHVybmVkIGluIHRoZSBsYXN0IGludm9jYXRpb25cbiAqIG9mIHRoZSBjYWxsYmFjaywgb3IgaW5pdGlhbFZhbHVlLCBpZiBzdXBwbGllZC5cbiAqIEBwYXJhbSB7R2VvbWV0cnl9IGN1cnJlbnRHZW9tZXRyeSBUaGUgY3VycmVudCBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBmZWF0dXJlUHJvcGVydGllcyBUaGUgY3VycmVudCBGZWF0dXJlIFByb3BlcnRpZXMgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBmZWF0dXJlQkJveCBUaGUgY3VycmVudCBGZWF0dXJlIEJCb3ggYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBmZWF0dXJlSWQgVGhlIGN1cnJlbnQgRmVhdHVyZSBJZCBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBSZWR1Y2UgZ2VvbWV0cnkgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LnJlZHVjZSgpLlxuICpcbiAqIEBuYW1lIGdlb21SZWR1Y2VcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBhbnkgR2VvSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRHZW9tZXRyeSwgZmVhdHVyZUluZGV4LCBmZWF0dXJlUHJvcGVydGllcywgZmVhdHVyZUJCb3gsIGZlYXR1cmVJZClcbiAqIEBwYXJhbSB7Kn0gW2luaXRpYWxWYWx1ZV0gVmFsdWUgdG8gdXNlIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgZmlyc3QgY2FsbCBvZiB0aGUgY2FsbGJhY2suXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHZhbHVlIHRoYXQgcmVzdWx0cyBmcm9tIHRoZSByZWR1Y3Rpb24uXG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgICAgdHVyZi5wb2ludChbMjYsIDM3XSwge2ZvbzogJ2Jhcid9KSxcbiAqICAgICB0dXJmLnBvaW50KFszNiwgNTNdLCB7aGVsbG86ICd3b3JsZCd9KVxuICogXSk7XG4gKlxuICogdHVyZi5nZW9tUmVkdWNlKGZlYXR1cmVzLCBmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudEdlb21ldHJ5LCBmZWF0dXJlSW5kZXgsIGZlYXR1cmVQcm9wZXJ0aWVzLCBmZWF0dXJlQkJveCwgZmVhdHVyZUlkKSB7XG4gKiAgIC8vPXByZXZpb3VzVmFsdWVcbiAqICAgLy89Y3VycmVudEdlb21ldHJ5XG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1mZWF0dXJlUHJvcGVydGllc1xuICogICAvLz1mZWF0dXJlQkJveFxuICogICAvLz1mZWF0dXJlSWRcbiAqICAgcmV0dXJuIGN1cnJlbnRHZW9tZXRyeVxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIGdlb21SZWR1Y2UoZ2VvanNvbiwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuICB2YXIgcHJldmlvdXNWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgZ2VvbUVhY2goXG4gICAgZ2VvanNvbixcbiAgICBmdW5jdGlvbiAoXG4gICAgICBjdXJyZW50R2VvbWV0cnksXG4gICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICBmZWF0dXJlUHJvcGVydGllcyxcbiAgICAgIGZlYXR1cmVCQm94LFxuICAgICAgZmVhdHVyZUlkXG4gICAgKSB7XG4gICAgICBpZiAoZmVhdHVyZUluZGV4ID09PSAwICYmIGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBwcmV2aW91c1ZhbHVlID0gY3VycmVudEdlb21ldHJ5O1xuICAgICAgZWxzZVxuICAgICAgICBwcmV2aW91c1ZhbHVlID0gY2FsbGJhY2soXG4gICAgICAgICAgcHJldmlvdXNWYWx1ZSxcbiAgICAgICAgICBjdXJyZW50R2VvbWV0cnksXG4gICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgIGZlYXR1cmVQcm9wZXJ0aWVzLFxuICAgICAgICAgIGZlYXR1cmVCQm94LFxuICAgICAgICAgIGZlYXR1cmVJZFxuICAgICAgICApO1xuICAgIH1cbiAgKTtcbiAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGZsYXR0ZW5FYWNoXG4gKlxuICogQGNhbGxiYWNrIGZsYXR0ZW5FYWNoQ2FsbGJhY2tcbiAqIEBwYXJhbSB7RmVhdHVyZX0gY3VycmVudEZlYXR1cmUgVGhlIGN1cnJlbnQgZmxhdHRlbmVkIGZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlGZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIE11bHRpLUZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGZsYXR0ZW5lZCBmZWF0dXJlcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG9cbiAqIEFycmF5LmZvckVhY2guXG4gKlxuICogQG5hbWUgZmxhdHRlbkVhY2hcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBhbnkgR2VvSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KVxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgICAgdHVyZi5tdWx0aVBvaW50KFtbNDAsIDMwXSwgWzM2LCA1M11dLCB7aGVsbG86ICd3b3JsZCd9KVxuICogXSk7XG4gKlxuICogdHVyZi5mbGF0dGVuRWFjaChmZWF0dXJlcywgZnVuY3Rpb24gKGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KSB7XG4gKiAgIC8vPWN1cnJlbnRGZWF0dXJlXG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1tdWx0aUZlYXR1cmVJbmRleFxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW5FYWNoKGdlb2pzb24sIGNhbGxiYWNrKSB7XG4gIGdlb21FYWNoKGdlb2pzb24sIGZ1bmN0aW9uIChnZW9tZXRyeSwgZmVhdHVyZUluZGV4LCBwcm9wZXJ0aWVzLCBiYm94LCBpZCkge1xuICAgIC8vIENhbGxiYWNrIGZvciBzaW5nbGUgZ2VvbWV0cnlcbiAgICB2YXIgdHlwZSA9IGdlb21ldHJ5ID09PSBudWxsID8gbnVsbCA6IGdlb21ldHJ5LnR5cGU7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIG51bGw6XG4gICAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgICBpZiAoXG4gICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICBmZWF0dXJlKGdlb21ldHJ5LCBwcm9wZXJ0aWVzLCB7IGJib3g6IGJib3gsIGlkOiBpZCB9KSxcbiAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGdlb21UeXBlO1xuXG4gICAgLy8gQ2FsbGJhY2sgZm9yIG11bHRpLWdlb21ldHJ5XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwiTXVsdGlQb2ludFwiOlxuICAgICAgICBnZW9tVHlwZSA9IFwiUG9pbnRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6XG4gICAgICAgIGdlb21UeXBlID0gXCJMaW5lU3RyaW5nXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIk11bHRpUG9seWdvblwiOlxuICAgICAgICBnZW9tVHlwZSA9IFwiUG9seWdvblwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBmb3IgKFxuICAgICAgdmFyIG11bHRpRmVhdHVyZUluZGV4ID0gMDtcbiAgICAgIG11bHRpRmVhdHVyZUluZGV4IDwgZ2VvbWV0cnkuY29vcmRpbmF0ZXMubGVuZ3RoO1xuICAgICAgbXVsdGlGZWF0dXJlSW5kZXgrK1xuICAgICkge1xuICAgICAgdmFyIGNvb3JkaW5hdGUgPSBnZW9tZXRyeS5jb29yZGluYXRlc1ttdWx0aUZlYXR1cmVJbmRleF07XG4gICAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogZ2VvbVR5cGUsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlLFxuICAgICAgfTtcbiAgICAgIGlmIChcbiAgICAgICAgY2FsbGJhY2soZmVhdHVyZShnZW9tLCBwcm9wZXJ0aWVzKSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCkgPT09XG4gICAgICAgIGZhbHNlXG4gICAgICApXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBmbGF0dGVuUmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgZmxhdHRlblJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHtGZWF0dXJlfSBjdXJyZW50RmVhdHVyZSBUaGUgY3VycmVudCBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBmbGF0dGVuZWQgZmVhdHVyZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LnJlZHVjZSgpLlxuICpcbiAqIEBuYW1lIGZsYXR0ZW5SZWR1Y2VcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBhbnkgR2VvSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm5zIHsqfSBUaGUgdmFsdWUgdGhhdCByZXN1bHRzIGZyb20gdGhlIHJlZHVjdGlvbi5cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgICB0dXJmLnBvaW50KFsyNiwgMzddLCB7Zm9vOiAnYmFyJ30pLFxuICogICAgIHR1cmYubXVsdGlQb2ludChbWzQwLCAzMF0sIFszNiwgNTNdXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuZmxhdHRlblJlZHVjZShmZWF0dXJlcywgZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KSB7XG4gKiAgIC8vPXByZXZpb3VzVmFsdWVcbiAqICAgLy89Y3VycmVudEZlYXR1cmVcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPW11bHRpRmVhdHVyZUluZGV4XG4gKiAgIHJldHVybiBjdXJyZW50RmVhdHVyZVxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW5SZWR1Y2UoZ2VvanNvbiwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuICB2YXIgcHJldmlvdXNWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgZmxhdHRlbkVhY2goXG4gICAgZ2VvanNvbixcbiAgICBmdW5jdGlvbiAoY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpIHtcbiAgICAgIGlmIChcbiAgICAgICAgZmVhdHVyZUluZGV4ID09PSAwICYmXG4gICAgICAgIG11bHRpRmVhdHVyZUluZGV4ID09PSAwICYmXG4gICAgICAgIGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICApXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50RmVhdHVyZTtcbiAgICAgIGVsc2VcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGNhbGxiYWNrKFxuICAgICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgICAgY3VycmVudEZlYXR1cmUsXG4gICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4XG4gICAgICAgICk7XG4gICAgfVxuICApO1xuICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3Igc2VnbWVudEVhY2hcbiAqXG4gKiBAY2FsbGJhY2sgc2VnbWVudEVhY2hDYWxsYmFja1xuICogQHBhcmFtIHtGZWF0dXJlPExpbmVTdHJpbmc+fSBjdXJyZW50U2VnbWVudCBUaGUgY3VycmVudCBTZWdtZW50IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBnZW9tZXRyeUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gc2VnbWVudEluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBTZWdtZW50IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIDItdmVydGV4IGxpbmUgc2VnbWVudCBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkuZm9yRWFjaCgpXG4gKiAoTXVsdGkpUG9pbnQgZ2VvbWV0cmllcyBkbyBub3QgY29udGFpbiBzZWdtZW50cyB0aGVyZWZvcmUgdGhleSBhcmUgaWdub3JlZCBkdXJpbmcgdGhpcyBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50U2VnbWVudCwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleCwgc2VnbWVudEluZGV4KVxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZXhhbXBsZVxuICogdmFyIHBvbHlnb24gPSB0dXJmLnBvbHlnb24oW1tbLTUwLCA1XSwgWy00MCwgLTEwXSwgWy01MCwgLTEwXSwgWy00MCwgNV0sIFstNTAsIDVdXV0pO1xuICpcbiAqIC8vIEl0ZXJhdGUgb3ZlciBHZW9KU09OIGJ5IDItdmVydGV4IHNlZ21lbnRzXG4gKiB0dXJmLnNlZ21lbnRFYWNoKHBvbHlnb24sIGZ1bmN0aW9uIChjdXJyZW50U2VnbWVudCwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleCwgc2VnbWVudEluZGV4KSB7XG4gKiAgIC8vPWN1cnJlbnRTZWdtZW50XG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1tdWx0aUZlYXR1cmVJbmRleFxuICogICAvLz1nZW9tZXRyeUluZGV4XG4gKiAgIC8vPXNlZ21lbnRJbmRleFxuICogfSk7XG4gKlxuICogLy8gQ2FsY3VsYXRlIHRoZSB0b3RhbCBudW1iZXIgb2Ygc2VnbWVudHNcbiAqIHZhciB0b3RhbCA9IDA7XG4gKiB0dXJmLnNlZ21lbnRFYWNoKHBvbHlnb24sIGZ1bmN0aW9uICgpIHtcbiAqICAgICB0b3RhbCsrO1xuICogfSk7XG4gKi9cbmZ1bmN0aW9uIHNlZ21lbnRFYWNoKGdlb2pzb24sIGNhbGxiYWNrKSB7XG4gIGZsYXR0ZW5FYWNoKGdlb2pzb24sIGZ1bmN0aW9uIChmZWF0dXJlLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KSB7XG4gICAgdmFyIHNlZ21lbnRJbmRleCA9IDA7XG5cbiAgICAvLyBFeGNsdWRlIG51bGwgR2VvbWV0cmllc1xuICAgIGlmICghZmVhdHVyZS5nZW9tZXRyeSkgcmV0dXJuO1xuICAgIC8vIChNdWx0aSlQb2ludCBnZW9tZXRyaWVzIGRvIG5vdCBjb250YWluIHNlZ21lbnRzIHRoZXJlZm9yZSB0aGV5IGFyZSBpZ25vcmVkIGR1cmluZyB0aGlzIG9wZXJhdGlvbi5cbiAgICB2YXIgdHlwZSA9IGZlYXR1cmUuZ2VvbWV0cnkudHlwZTtcbiAgICBpZiAodHlwZSA9PT0gXCJQb2ludFwiIHx8IHR5cGUgPT09IFwiTXVsdGlQb2ludFwiKSByZXR1cm47XG5cbiAgICAvLyBHZW5lcmF0ZSAyLXZlcnRleCBsaW5lIHNlZ21lbnRzXG4gICAgdmFyIHByZXZpb3VzQ29vcmRzO1xuICAgIHZhciBwcmV2aW91c0ZlYXR1cmVJbmRleCA9IDA7XG4gICAgdmFyIHByZXZpb3VzTXVsdGlJbmRleCA9IDA7XG4gICAgdmFyIHByZXZHZW9tSW5kZXggPSAwO1xuICAgIGlmIChcbiAgICAgIGNvb3JkRWFjaChcbiAgICAgICAgZmVhdHVyZSxcbiAgICAgICAgZnVuY3Rpb24gKFxuICAgICAgICAgIGN1cnJlbnRDb29yZCxcbiAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgIGZlYXR1cmVJbmRleENvb3JkLFxuICAgICAgICAgIG11bHRpUGFydEluZGV4Q29vcmQsXG4gICAgICAgICAgZ2VvbWV0cnlJbmRleFxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBTaW11bGF0aW5nIGEgbWV0YS5jb29yZFJlZHVjZSgpIHNpbmNlIGByZWR1Y2VgIG9wZXJhdGlvbnMgY2Fubm90IGJlIHN0b3BwZWQgYnkgcmV0dXJuaW5nIGBmYWxzZWBcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBwcmV2aW91c0Nvb3JkcyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBmZWF0dXJlSW5kZXggPiBwcmV2aW91c0ZlYXR1cmVJbmRleCB8fFxuICAgICAgICAgICAgbXVsdGlQYXJ0SW5kZXhDb29yZCA+IHByZXZpb3VzTXVsdGlJbmRleCB8fFxuICAgICAgICAgICAgZ2VvbWV0cnlJbmRleCA+IHByZXZHZW9tSW5kZXhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHByZXZpb3VzQ29vcmRzID0gY3VycmVudENvb3JkO1xuICAgICAgICAgICAgcHJldmlvdXNGZWF0dXJlSW5kZXggPSBmZWF0dXJlSW5kZXg7XG4gICAgICAgICAgICBwcmV2aW91c011bHRpSW5kZXggPSBtdWx0aVBhcnRJbmRleENvb3JkO1xuICAgICAgICAgICAgcHJldkdlb21JbmRleCA9IGdlb21ldHJ5SW5kZXg7XG4gICAgICAgICAgICBzZWdtZW50SW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY3VycmVudFNlZ21lbnQgPSBsaW5lU3RyaW5nKFxuICAgICAgICAgICAgW3ByZXZpb3VzQ29vcmRzLCBjdXJyZW50Q29vcmRdLFxuICAgICAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgICAgY3VycmVudFNlZ21lbnQsXG4gICAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgIGdlb21ldHJ5SW5kZXgsXG4gICAgICAgICAgICAgIHNlZ21lbnRJbmRleFxuICAgICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgc2VnbWVudEluZGV4Kys7XG4gICAgICAgICAgcHJldmlvdXNDb29yZHMgPSBjdXJyZW50Q29vcmQ7XG4gICAgICAgIH1cbiAgICAgICkgPT09IGZhbHNlXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3Igc2VnbWVudFJlZHVjZVxuICpcbiAqIFRoZSBmaXJzdCB0aW1lIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZSB2YWx1ZXMgcHJvdmlkZWQgYXMgYXJndW1lbnRzIGRlcGVuZFxuICogb24gd2hldGhlciB0aGUgcmVkdWNlIG1ldGhvZCBoYXMgYW4gaW5pdGlhbFZhbHVlIGFyZ3VtZW50LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBwcm92aWRlZCB0byB0aGUgcmVkdWNlIG1ldGhvZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIGluaXRpYWxWYWx1ZS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBub3QgcHJvdmlkZWQ6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgc2Vjb25kIGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogQGNhbGxiYWNrIHNlZ21lbnRSZWR1Y2VDYWxsYmFja1xuICogQHBhcmFtIHsqfSBwcmV2aW91c1ZhbHVlIFRoZSBhY2N1bXVsYXRlZCB2YWx1ZSBwcmV2aW91c2x5IHJldHVybmVkIGluIHRoZSBsYXN0IGludm9jYXRpb25cbiAqIG9mIHRoZSBjYWxsYmFjaywgb3IgaW5pdGlhbFZhbHVlLCBpZiBzdXBwbGllZC5cbiAqIEBwYXJhbSB7RmVhdHVyZTxMaW5lU3RyaW5nPn0gY3VycmVudFNlZ21lbnQgVGhlIGN1cnJlbnQgU2VnbWVudCBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aUZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgTXVsdGktRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZ2VvbWV0cnlJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgR2VvbWV0cnkgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IHNlZ21lbnRJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgU2VnbWVudCBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBSZWR1Y2UgMi12ZXJ0ZXggbGluZSBzZWdtZW50IGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5yZWR1Y2UoKVxuICogKE11bHRpKVBvaW50IGdlb21ldHJpZXMgZG8gbm90IGNvbnRhaW4gc2VnbWVudHMgdGhlcmVmb3JlIHRoZXkgYXJlIGlnbm9yZWQgZHVyaW5nIHRoaXMgb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBhbnkgR2VvSlNPTlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudFNlZ21lbnQsIGN1cnJlbnRJbmRleClcbiAqIEBwYXJhbSB7Kn0gW2luaXRpYWxWYWx1ZV0gVmFsdWUgdG8gdXNlIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgZmlyc3QgY2FsbCBvZiB0aGUgY2FsbGJhY2suXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9seWdvbiA9IHR1cmYucG9seWdvbihbW1stNTAsIDVdLCBbLTQwLCAtMTBdLCBbLTUwLCAtMTBdLCBbLTQwLCA1XSwgWy01MCwgNV1dXSk7XG4gKlxuICogLy8gSXRlcmF0ZSBvdmVyIEdlb0pTT04gYnkgMi12ZXJ0ZXggc2VnbWVudHNcbiAqIHR1cmYuc2VnbWVudFJlZHVjZShwb2x5Z29uLCBmdW5jdGlvbiAocHJldmlvdXNTZWdtZW50LCBjdXJyZW50U2VnbWVudCwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleCwgc2VnbWVudEluZGV4KSB7XG4gKiAgIC8vPSBwcmV2aW91c1NlZ21lbnRcbiAqICAgLy89IGN1cnJlbnRTZWdtZW50XG4gKiAgIC8vPSBmZWF0dXJlSW5kZXhcbiAqICAgLy89IG11bHRpRmVhdHVyZUluZGV4XG4gKiAgIC8vPSBnZW9tZXRyeUluZGV4XG4gKiAgIC8vPSBzZWdtZW50SW5kZXhcbiAqICAgcmV0dXJuIGN1cnJlbnRTZWdtZW50XG4gKiB9KTtcbiAqXG4gKiAvLyBDYWxjdWxhdGUgdGhlIHRvdGFsIG51bWJlciBvZiBzZWdtZW50c1xuICogdmFyIGluaXRpYWxWYWx1ZSA9IDBcbiAqIHZhciB0b3RhbCA9IHR1cmYuc2VnbWVudFJlZHVjZShwb2x5Z29uLCBmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSkge1xuICogICAgIHByZXZpb3VzVmFsdWUrKztcbiAqICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbiAqIH0sIGluaXRpYWxWYWx1ZSk7XG4gKi9cbmZ1bmN0aW9uIHNlZ21lbnRSZWR1Y2UoZ2VvanNvbiwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuICB2YXIgcHJldmlvdXNWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgdmFyIHN0YXJ0ZWQgPSBmYWxzZTtcbiAgc2VnbWVudEVhY2goXG4gICAgZ2VvanNvbixcbiAgICBmdW5jdGlvbiAoXG4gICAgICBjdXJyZW50U2VnbWVudCxcbiAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgZ2VvbWV0cnlJbmRleCxcbiAgICAgIHNlZ21lbnRJbmRleFxuICAgICkge1xuICAgICAgaWYgKHN0YXJ0ZWQgPT09IGZhbHNlICYmIGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBwcmV2aW91c1ZhbHVlID0gY3VycmVudFNlZ21lbnQ7XG4gICAgICBlbHNlXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjYWxsYmFjayhcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlLFxuICAgICAgICAgIGN1cnJlbnRTZWdtZW50LFxuICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICBnZW9tZXRyeUluZGV4LFxuICAgICAgICAgIHNlZ21lbnRJbmRleFxuICAgICAgICApO1xuICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgfVxuICApO1xuICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgbGluZUVhY2hcbiAqXG4gKiBAY2FsbGJhY2sgbGluZUVhY2hDYWxsYmFja1xuICogQHBhcmFtIHtGZWF0dXJlPExpbmVTdHJpbmc+fSBjdXJyZW50TGluZSBUaGUgY3VycmVudCBMaW5lU3RyaW5nfExpbmVhclJpbmcgYmVpbmcgcHJvY2Vzc2VkXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZFxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZFxuICogQHBhcmFtIHtudW1iZXJ9IGdlb21ldHJ5SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEdlb21ldHJ5IGJlaW5nIHByb2Nlc3NlZFxuICovXG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGxpbmUgb3IgcmluZyBjb29yZGluYXRlcyBpbiBMaW5lU3RyaW5nLCBQb2x5Z29uLCBNdWx0aUxpbmVTdHJpbmcsIE11bHRpUG9seWdvbiBGZWF0dXJlcyBvciBHZW9tZXRyaWVzLFxuICogc2ltaWxhciB0byBBcnJheS5mb3JFYWNoLlxuICpcbiAqIEBuYW1lIGxpbmVFYWNoXG4gKiBAcGFyYW0ge0dlb21ldHJ5fEZlYXR1cmU8TGluZVN0cmluZ3xQb2x5Z29ufE11bHRpTGluZVN0cmluZ3xNdWx0aVBvbHlnb24+fSBnZW9qc29uIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAoY3VycmVudExpbmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgpXG4gKiBAZXhhbXBsZVxuICogdmFyIG11bHRpTGluZSA9IHR1cmYubXVsdGlMaW5lU3RyaW5nKFtcbiAqICAgW1syNiwgMzddLCBbMzUsIDQ1XV0sXG4gKiAgIFtbMzYsIDUzXSwgWzM4LCA1MF0sIFs0MSwgNTVdXVxuICogXSk7XG4gKlxuICogdHVyZi5saW5lRWFjaChtdWx0aUxpbmUsIGZ1bmN0aW9uIChjdXJyZW50TGluZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleCkge1xuICogICAvLz1jdXJyZW50TGluZVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgLy89bXVsdGlGZWF0dXJlSW5kZXhcbiAqICAgLy89Z2VvbWV0cnlJbmRleFxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIGxpbmVFYWNoKGdlb2pzb24sIGNhbGxiYWNrKSB7XG4gIC8vIHZhbGlkYXRpb25cbiAgaWYgKCFnZW9qc29uKSB0aHJvdyBuZXcgRXJyb3IoXCJnZW9qc29uIGlzIHJlcXVpcmVkXCIpO1xuXG4gIGZsYXR0ZW5FYWNoKGdlb2pzb24sIGZ1bmN0aW9uIChmZWF0dXJlLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KSB7XG4gICAgaWYgKGZlYXR1cmUuZ2VvbWV0cnkgPT09IG51bGwpIHJldHVybjtcbiAgICB2YXIgdHlwZSA9IGZlYXR1cmUuZ2VvbWV0cnkudHlwZTtcbiAgICB2YXIgY29vcmRzID0gZmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcztcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgICAgIGlmIChjYWxsYmFjayhmZWF0dXJlLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCAwLCAwKSA9PT0gZmFsc2UpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgdmFyIGdlb21ldHJ5SW5kZXggPSAwO1xuICAgICAgICAgIGdlb21ldHJ5SW5kZXggPCBjb29yZHMubGVuZ3RoO1xuICAgICAgICAgIGdlb21ldHJ5SW5kZXgrK1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgICAgbGluZVN0cmluZyhjb29yZHNbZ2VvbWV0cnlJbmRleF0sIGZlYXR1cmUucHJvcGVydGllcyksXG4gICAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgIGdlb21ldHJ5SW5kZXhcbiAgICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGxpbmVSZWR1Y2VcbiAqXG4gKiBUaGUgZmlyc3QgdGltZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGUgdmFsdWVzIHByb3ZpZGVkIGFzIGFyZ3VtZW50cyBkZXBlbmRcbiAqIG9uIHdoZXRoZXIgdGhlIHJlZHVjZSBtZXRob2QgaGFzIGFuIGluaXRpYWxWYWx1ZSBhcmd1bWVudC5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgcHJvdmlkZWQgdG8gdGhlIHJlZHVjZSBtZXRob2Q6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyBpbml0aWFsVmFsdWUuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgbm90IHByb3ZpZGVkOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIHNlY29uZCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIEBjYWxsYmFjayBsaW5lUmVkdWNlQ2FsbGJhY2tcbiAqIEBwYXJhbSB7Kn0gcHJldmlvdXNWYWx1ZSBUaGUgYWNjdW11bGF0ZWQgdmFsdWUgcHJldmlvdXNseSByZXR1cm5lZCBpbiB0aGUgbGFzdCBpbnZvY2F0aW9uXG4gKiBvZiB0aGUgY2FsbGJhY2ssIG9yIGluaXRpYWxWYWx1ZSwgaWYgc3VwcGxpZWQuXG4gKiBAcGFyYW0ge0ZlYXR1cmU8TGluZVN0cmluZz59IGN1cnJlbnRMaW5lIFRoZSBjdXJyZW50IExpbmVTdHJpbmd8TGluZWFyUmluZyBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZFxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZFxuICogQHBhcmFtIHtudW1iZXJ9IGdlb21ldHJ5SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEdlb21ldHJ5IGJlaW5nIHByb2Nlc3NlZFxuICovXG5cbi8qKlxuICogUmVkdWNlIGZlYXR1cmVzIGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5yZWR1Y2UoKS5cbiAqXG4gKiBAbmFtZSBsaW5lUmVkdWNlXG4gKiBAcGFyYW0ge0dlb21ldHJ5fEZlYXR1cmU8TGluZVN0cmluZ3xQb2x5Z29ufE11bHRpTGluZVN0cmluZ3xNdWx0aVBvbHlnb24+fSBnZW9qc29uIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudExpbmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgpXG4gKiBAcGFyYW0geyp9IFtpbml0aWFsVmFsdWVdIFZhbHVlIHRvIHVzZSBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIGZpcnN0IGNhbGwgb2YgdGhlIGNhbGxiYWNrLlxuICogQHJldHVybnMgeyp9IFRoZSB2YWx1ZSB0aGF0IHJlc3VsdHMgZnJvbSB0aGUgcmVkdWN0aW9uLlxuICogQGV4YW1wbGVcbiAqIHZhciBtdWx0aVBvbHkgPSB0dXJmLm11bHRpUG9seWdvbihbXG4gKiAgIHR1cmYucG9seWdvbihbW1sxMiw0OF0sWzIsNDFdLFsyNCwzOF0sWzEyLDQ4XV0sIFtbOSw0NF0sWzEzLDQxXSxbMTMsNDVdLFs5LDQ0XV1dKSxcbiAqICAgdHVyZi5wb2x5Z29uKFtbWzUsIDVdLCBbMCwgMF0sIFsyLCAyXSwgWzQsIDRdLCBbNSwgNV1dXSlcbiAqIF0pO1xuICpcbiAqIHR1cmYubGluZVJlZHVjZShtdWx0aVBvbHksIGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50TGluZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleCkge1xuICogICAvLz1wcmV2aW91c1ZhbHVlXG4gKiAgIC8vPWN1cnJlbnRMaW5lXG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1tdWx0aUZlYXR1cmVJbmRleFxuICogICAvLz1nZW9tZXRyeUluZGV4XG4gKiAgIHJldHVybiBjdXJyZW50TGluZVxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIGxpbmVSZWR1Y2UoZ2VvanNvbiwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuICB2YXIgcHJldmlvdXNWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgbGluZUVhY2goXG4gICAgZ2VvanNvbixcbiAgICBmdW5jdGlvbiAoY3VycmVudExpbmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgpIHtcbiAgICAgIGlmIChmZWF0dXJlSW5kZXggPT09IDAgJiYgaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50TGluZTtcbiAgICAgIGVsc2VcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGNhbGxiYWNrKFxuICAgICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgICAgY3VycmVudExpbmUsXG4gICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgIGdlb21ldHJ5SW5kZXhcbiAgICAgICAgKTtcbiAgICB9XG4gICk7XG4gIHJldHVybiBwcmV2aW91c1ZhbHVlO1xufVxuXG4vKipcbiAqIEZpbmRzIGEgcGFydGljdWxhciAyLXZlcnRleCBMaW5lU3RyaW5nIFNlZ21lbnQgZnJvbSBhIEdlb0pTT04gdXNpbmcgYEB0dXJmL21ldGFgIGluZGV4ZXMuXG4gKlxuICogTmVnYXRpdmUgaW5kZXhlcyBhcmUgcGVybWl0dGVkLlxuICogUG9pbnQgJiBNdWx0aVBvaW50IHdpbGwgYWx3YXlzIHJldHVybiBudWxsLlxuICpcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBBbnkgR2VvSlNPTiBGZWF0dXJlIG9yIEdlb21ldHJ5XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5mZWF0dXJlSW5kZXg9MF0gRmVhdHVyZSBJbmRleFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm11bHRpRmVhdHVyZUluZGV4PTBdIE11bHRpLUZlYXR1cmUgSW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5nZW9tZXRyeUluZGV4PTBdIEdlb21ldHJ5IEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuc2VnbWVudEluZGV4PTBdIFNlZ21lbnQgSW5kZXhcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5wcm9wZXJ0aWVzPXt9XSBUcmFuc2xhdGUgUHJvcGVydGllcyB0byBvdXRwdXQgTGluZVN0cmluZ1xuICogQHBhcmFtIHtCQm94fSBbb3B0aW9ucy5iYm94PXt9XSBUcmFuc2xhdGUgQkJveCB0byBvdXRwdXQgTGluZVN0cmluZ1xuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBbb3B0aW9ucy5pZD17fV0gVHJhbnNsYXRlIElkIHRvIG91dHB1dCBMaW5lU3RyaW5nXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxMaW5lU3RyaW5nPn0gMi12ZXJ0ZXggR2VvSlNPTiBGZWF0dXJlIExpbmVTdHJpbmdcbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlMaW5lID0gdHVyZi5tdWx0aUxpbmVTdHJpbmcoW1xuICogICAgIFtbMTAsIDEwXSwgWzUwLCAzMF0sIFszMCwgNDBdXSxcbiAqICAgICBbWy0xMCwgLTEwXSwgWy01MCwgLTMwXSwgWy0zMCwgLTQwXV1cbiAqIF0pO1xuICpcbiAqIC8vIEZpcnN0IFNlZ21lbnQgKGRlZmF1bHRzIGFyZSAwKVxuICogdHVyZi5maW5kU2VnbWVudChtdWx0aUxpbmUpO1xuICogLy8gPT4gRmVhdHVyZTxMaW5lU3RyaW5nPFtbMTAsIDEwXSwgWzUwLCAzMF1dPj5cbiAqXG4gKiAvLyBGaXJzdCBTZWdtZW50IG9mIDJuZCBNdWx0aSBGZWF0dXJlXG4gKiB0dXJmLmZpbmRTZWdtZW50KG11bHRpTGluZSwge211bHRpRmVhdHVyZUluZGV4OiAxfSk7XG4gKiAvLyA9PiBGZWF0dXJlPExpbmVTdHJpbmc8W1stMTAsIC0xMF0sIFstNTAsIC0zMF1dPj5cbiAqXG4gKiAvLyBMYXN0IFNlZ21lbnQgb2YgTGFzdCBNdWx0aSBGZWF0dXJlXG4gKiB0dXJmLmZpbmRTZWdtZW50KG11bHRpTGluZSwge211bHRpRmVhdHVyZUluZGV4OiAtMSwgc2VnbWVudEluZGV4OiAtMX0pO1xuICogLy8gPT4gRmVhdHVyZTxMaW5lU3RyaW5nPFtbLTUwLCAtMzBdLCBbLTMwLCAtNDBdXT4+XG4gKi9cbmZ1bmN0aW9uIGZpbmRTZWdtZW50KGdlb2pzb24sIG9wdGlvbnMpIHtcbiAgLy8gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKCFpc09iamVjdChvcHRpb25zKSkgdGhyb3cgbmV3IEVycm9yKFwib3B0aW9ucyBpcyBpbnZhbGlkXCIpO1xuICB2YXIgZmVhdHVyZUluZGV4ID0gb3B0aW9ucy5mZWF0dXJlSW5kZXggfHwgMDtcbiAgdmFyIG11bHRpRmVhdHVyZUluZGV4ID0gb3B0aW9ucy5tdWx0aUZlYXR1cmVJbmRleCB8fCAwO1xuICB2YXIgZ2VvbWV0cnlJbmRleCA9IG9wdGlvbnMuZ2VvbWV0cnlJbmRleCB8fCAwO1xuICB2YXIgc2VnbWVudEluZGV4ID0gb3B0aW9ucy5zZWdtZW50SW5kZXggfHwgMDtcblxuICAvLyBGaW5kIEZlYXR1cmVJbmRleFxuICB2YXIgcHJvcGVydGllcyA9IG9wdGlvbnMucHJvcGVydGllcztcbiAgdmFyIGdlb21ldHJ5O1xuXG4gIHN3aXRjaCAoZ2VvanNvbi50eXBlKSB7XG4gICAgY2FzZSBcIkZlYXR1cmVDb2xsZWN0aW9uXCI6XG4gICAgICBpZiAoZmVhdHVyZUluZGV4IDwgMClcbiAgICAgICAgZmVhdHVyZUluZGV4ID0gZ2VvanNvbi5mZWF0dXJlcy5sZW5ndGggKyBmZWF0dXJlSW5kZXg7XG4gICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCBnZW9qc29uLmZlYXR1cmVzW2ZlYXR1cmVJbmRleF0ucHJvcGVydGllcztcbiAgICAgIGdlb21ldHJ5ID0gZ2VvanNvbi5mZWF0dXJlc1tmZWF0dXJlSW5kZXhdLmdlb21ldHJ5O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkZlYXR1cmVcIjpcbiAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IGdlb2pzb24ucHJvcGVydGllcztcbiAgICAgIGdlb21ldHJ5ID0gZ2VvanNvbi5nZW9tZXRyeTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJQb2ludFwiOlxuICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgIGdlb21ldHJ5ID0gZ2VvanNvbjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnZW9qc29uIGlzIGludmFsaWRcIik7XG4gIH1cblxuICAvLyBGaW5kIFNlZ21lbnRJbmRleFxuICBpZiAoZ2VvbWV0cnkgPT09IG51bGwpIHJldHVybiBudWxsO1xuICB2YXIgY29vcmRzID0gZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gIHN3aXRjaCAoZ2VvbWV0cnkudHlwZSkge1xuICAgIGNhc2UgXCJQb2ludFwiOlxuICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgaWYgKHNlZ21lbnRJbmRleCA8IDApIHNlZ21lbnRJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBzZWdtZW50SW5kZXggLSAxO1xuICAgICAgcmV0dXJuIGxpbmVTdHJpbmcoXG4gICAgICAgIFtjb29yZHNbc2VnbWVudEluZGV4XSwgY29vcmRzW3NlZ21lbnRJbmRleCArIDFdXSxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKTtcbiAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgaWYgKGdlb21ldHJ5SW5kZXggPCAwKSBnZW9tZXRyeUluZGV4ID0gY29vcmRzLmxlbmd0aCArIGdlb21ldHJ5SW5kZXg7XG4gICAgICBpZiAoc2VnbWVudEluZGV4IDwgMClcbiAgICAgICAgc2VnbWVudEluZGV4ID0gY29vcmRzW2dlb21ldHJ5SW5kZXhdLmxlbmd0aCArIHNlZ21lbnRJbmRleCAtIDE7XG4gICAgICByZXR1cm4gbGluZVN0cmluZyhcbiAgICAgICAgW1xuICAgICAgICAgIGNvb3Jkc1tnZW9tZXRyeUluZGV4XVtzZWdtZW50SW5kZXhdLFxuICAgICAgICAgIGNvb3Jkc1tnZW9tZXRyeUluZGV4XVtzZWdtZW50SW5kZXggKyAxXSxcbiAgICAgICAgXSxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKTtcbiAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6XG4gICAgICBpZiAobXVsdGlGZWF0dXJlSW5kZXggPCAwKVxuICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBtdWx0aUZlYXR1cmVJbmRleDtcbiAgICAgIGlmIChzZWdtZW50SW5kZXggPCAwKVxuICAgICAgICBzZWdtZW50SW5kZXggPSBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdLmxlbmd0aCArIHNlZ21lbnRJbmRleCAtIDE7XG4gICAgICByZXR1cm4gbGluZVN0cmluZyhcbiAgICAgICAgW1xuICAgICAgICAgIGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bc2VnbWVudEluZGV4XSxcbiAgICAgICAgICBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdW3NlZ21lbnRJbmRleCArIDFdLFxuICAgICAgICBdLFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgIGlmIChtdWx0aUZlYXR1cmVJbmRleCA8IDApXG4gICAgICAgIG11bHRpRmVhdHVyZUluZGV4ID0gY29vcmRzLmxlbmd0aCArIG11bHRpRmVhdHVyZUluZGV4O1xuICAgICAgaWYgKGdlb21ldHJ5SW5kZXggPCAwKVxuICAgICAgICBnZW9tZXRyeUluZGV4ID0gY29vcmRzW211bHRpRmVhdHVyZUluZGV4XS5sZW5ndGggKyBnZW9tZXRyeUluZGV4O1xuICAgICAgaWYgKHNlZ21lbnRJbmRleCA8IDApXG4gICAgICAgIHNlZ21lbnRJbmRleCA9XG4gICAgICAgICAgY29vcmRzW211bHRpRmVhdHVyZUluZGV4XVtnZW9tZXRyeUluZGV4XS5sZW5ndGggLSBzZWdtZW50SW5kZXggLSAxO1xuICAgICAgcmV0dXJuIGxpbmVTdHJpbmcoXG4gICAgICAgIFtcbiAgICAgICAgICBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdW2dlb21ldHJ5SW5kZXhdW3NlZ21lbnRJbmRleF0sXG4gICAgICAgICAgY29vcmRzW211bHRpRmVhdHVyZUluZGV4XVtnZW9tZXRyeUluZGV4XVtzZWdtZW50SW5kZXggKyAxXSxcbiAgICAgICAgXSxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXCJnZW9qc29uIGlzIGludmFsaWRcIik7XG59XG5cbi8qKlxuICogRmluZHMgYSBwYXJ0aWN1bGFyIFBvaW50IGZyb20gYSBHZW9KU09OIHVzaW5nIGBAdHVyZi9tZXRhYCBpbmRleGVzLlxuICpcbiAqIE5lZ2F0aXZlIGluZGV4ZXMgYXJlIHBlcm1pdHRlZC5cbiAqXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gQW55IEdlb0pTT04gRmVhdHVyZSBvciBHZW9tZXRyeVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZmVhdHVyZUluZGV4PTBdIEZlYXR1cmUgSW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tdWx0aUZlYXR1cmVJbmRleD0wXSBNdWx0aS1GZWF0dXJlIEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZ2VvbWV0cnlJbmRleD0wXSBHZW9tZXRyeSBJbmRleFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmNvb3JkSW5kZXg9MF0gQ29vcmQgSW5kZXhcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5wcm9wZXJ0aWVzPXt9XSBUcmFuc2xhdGUgUHJvcGVydGllcyB0byBvdXRwdXQgUG9pbnRcbiAqIEBwYXJhbSB7QkJveH0gW29wdGlvbnMuYmJveD17fV0gVHJhbnNsYXRlIEJCb3ggdG8gb3V0cHV0IFBvaW50XG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IFtvcHRpb25zLmlkPXt9XSBUcmFuc2xhdGUgSWQgdG8gb3V0cHV0IFBvaW50XG4gKiBAcmV0dXJucyB7RmVhdHVyZTxQb2ludD59IDItdmVydGV4IEdlb0pTT04gRmVhdHVyZSBQb2ludFxuICogQGV4YW1wbGVcbiAqIHZhciBtdWx0aUxpbmUgPSB0dXJmLm11bHRpTGluZVN0cmluZyhbXG4gKiAgICAgW1sxMCwgMTBdLCBbNTAsIDMwXSwgWzMwLCA0MF1dLFxuICogICAgIFtbLTEwLCAtMTBdLCBbLTUwLCAtMzBdLCBbLTMwLCAtNDBdXVxuICogXSk7XG4gKlxuICogLy8gRmlyc3QgU2VnbWVudCAoZGVmYXVsdHMgYXJlIDApXG4gKiB0dXJmLmZpbmRQb2ludChtdWx0aUxpbmUpO1xuICogLy8gPT4gRmVhdHVyZTxQb2ludDxbMTAsIDEwXT4+XG4gKlxuICogLy8gRmlyc3QgU2VnbWVudCBvZiB0aGUgMm5kIE11bHRpLUZlYXR1cmVcbiAqIHR1cmYuZmluZFBvaW50KG11bHRpTGluZSwge211bHRpRmVhdHVyZUluZGV4OiAxfSk7XG4gKiAvLyA9PiBGZWF0dXJlPFBvaW50PFstMTAsIC0xMF0+PlxuICpcbiAqIC8vIExhc3QgU2VnbWVudCBvZiBsYXN0IE11bHRpLUZlYXR1cmVcbiAqIHR1cmYuZmluZFBvaW50KG11bHRpTGluZSwge211bHRpRmVhdHVyZUluZGV4OiAtMSwgY29vcmRJbmRleDogLTF9KTtcbiAqIC8vID0+IEZlYXR1cmU8UG9pbnQ8Wy0zMCwgLTQwXT4+XG4gKi9cbmZ1bmN0aW9uIGZpbmRQb2ludChnZW9qc29uLCBvcHRpb25zKSB7XG4gIC8vIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGlmICghaXNPYmplY3Qob3B0aW9ucykpIHRocm93IG5ldyBFcnJvcihcIm9wdGlvbnMgaXMgaW52YWxpZFwiKTtcbiAgdmFyIGZlYXR1cmVJbmRleCA9IG9wdGlvbnMuZmVhdHVyZUluZGV4IHx8IDA7XG4gIHZhciBtdWx0aUZlYXR1cmVJbmRleCA9IG9wdGlvbnMubXVsdGlGZWF0dXJlSW5kZXggfHwgMDtcbiAgdmFyIGdlb21ldHJ5SW5kZXggPSBvcHRpb25zLmdlb21ldHJ5SW5kZXggfHwgMDtcbiAgdmFyIGNvb3JkSW5kZXggPSBvcHRpb25zLmNvb3JkSW5kZXggfHwgMDtcblxuICAvLyBGaW5kIEZlYXR1cmVJbmRleFxuICB2YXIgcHJvcGVydGllcyA9IG9wdGlvbnMucHJvcGVydGllcztcbiAgdmFyIGdlb21ldHJ5O1xuXG4gIHN3aXRjaCAoZ2VvanNvbi50eXBlKSB7XG4gICAgY2FzZSBcIkZlYXR1cmVDb2xsZWN0aW9uXCI6XG4gICAgICBpZiAoZmVhdHVyZUluZGV4IDwgMClcbiAgICAgICAgZmVhdHVyZUluZGV4ID0gZ2VvanNvbi5mZWF0dXJlcy5sZW5ndGggKyBmZWF0dXJlSW5kZXg7XG4gICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCBnZW9qc29uLmZlYXR1cmVzW2ZlYXR1cmVJbmRleF0ucHJvcGVydGllcztcbiAgICAgIGdlb21ldHJ5ID0gZ2VvanNvbi5mZWF0dXJlc1tmZWF0dXJlSW5kZXhdLmdlb21ldHJ5O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkZlYXR1cmVcIjpcbiAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IGdlb2pzb24ucHJvcGVydGllcztcbiAgICAgIGdlb21ldHJ5ID0gZ2VvanNvbi5nZW9tZXRyeTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJQb2ludFwiOlxuICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgIGdlb21ldHJ5ID0gZ2VvanNvbjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnZW9qc29uIGlzIGludmFsaWRcIik7XG4gIH1cblxuICAvLyBGaW5kIENvb3JkIEluZGV4XG4gIGlmIChnZW9tZXRyeSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gIHZhciBjb29yZHMgPSBnZW9tZXRyeS5jb29yZGluYXRlcztcbiAgc3dpdGNoIChnZW9tZXRyeS50eXBlKSB7XG4gICAgY2FzZSBcIlBvaW50XCI6XG4gICAgICByZXR1cm4gcG9pbnQoY29vcmRzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiTXVsdGlQb2ludFwiOlxuICAgICAgaWYgKG11bHRpRmVhdHVyZUluZGV4IDwgMClcbiAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXggPSBjb29yZHMubGVuZ3RoICsgbXVsdGlGZWF0dXJlSW5kZXg7XG4gICAgICByZXR1cm4gcG9pbnQoY29vcmRzW211bHRpRmVhdHVyZUluZGV4XSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG4gICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgIGlmIChjb29yZEluZGV4IDwgMCkgY29vcmRJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBjb29yZEluZGV4O1xuICAgICAgcmV0dXJuIHBvaW50KGNvb3Jkc1tjb29yZEluZGV4XSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG4gICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgIGlmIChnZW9tZXRyeUluZGV4IDwgMCkgZ2VvbWV0cnlJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBnZW9tZXRyeUluZGV4O1xuICAgICAgaWYgKGNvb3JkSW5kZXggPCAwKVxuICAgICAgICBjb29yZEluZGV4ID0gY29vcmRzW2dlb21ldHJ5SW5kZXhdLmxlbmd0aCArIGNvb3JkSW5kZXg7XG4gICAgICByZXR1cm4gcG9pbnQoY29vcmRzW2dlb21ldHJ5SW5kZXhdW2Nvb3JkSW5kZXhdLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6XG4gICAgICBpZiAobXVsdGlGZWF0dXJlSW5kZXggPCAwKVxuICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBtdWx0aUZlYXR1cmVJbmRleDtcbiAgICAgIGlmIChjb29yZEluZGV4IDwgMClcbiAgICAgICAgY29vcmRJbmRleCA9IGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF0ubGVuZ3RoICsgY29vcmRJbmRleDtcbiAgICAgIHJldHVybiBwb2ludChjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdW2Nvb3JkSW5kZXhdLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6XG4gICAgICBpZiAobXVsdGlGZWF0dXJlSW5kZXggPCAwKVxuICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBtdWx0aUZlYXR1cmVJbmRleDtcbiAgICAgIGlmIChnZW9tZXRyeUluZGV4IDwgMClcbiAgICAgICAgZ2VvbWV0cnlJbmRleCA9IGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF0ubGVuZ3RoICsgZ2VvbWV0cnlJbmRleDtcbiAgICAgIGlmIChjb29yZEluZGV4IDwgMClcbiAgICAgICAgY29vcmRJbmRleCA9XG4gICAgICAgICAgY29vcmRzW211bHRpRmVhdHVyZUluZGV4XVtnZW9tZXRyeUluZGV4XS5sZW5ndGggLSBjb29yZEluZGV4O1xuICAgICAgcmV0dXJuIHBvaW50KFxuICAgICAgICBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdW2dlb21ldHJ5SW5kZXhdW2Nvb3JkSW5kZXhdLFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcImdlb2pzb24gaXMgaW52YWxpZFwiKTtcbn1cblxuZXhwb3J0IHsgY29vcmRBbGwsIGNvb3JkRWFjaCwgY29vcmRSZWR1Y2UsIGZlYXR1cmVFYWNoLCBmZWF0dXJlUmVkdWNlLCBmaW5kUG9pbnQsIGZpbmRTZWdtZW50LCBmbGF0dGVuRWFjaCwgZmxhdHRlblJlZHVjZSwgZ2VvbUVhY2gsIGdlb21SZWR1Y2UsIGxpbmVFYWNoLCBsaW5lUmVkdWNlLCBwcm9wRWFjaCwgcHJvcFJlZHVjZSwgc2VnbWVudEVhY2gsIHNlZ21lbnRSZWR1Y2UgfTtcbiIsImltcG9ydCB7IGZlYXR1cmVDb2xsZWN0aW9uLCBsaW5lU3RyaW5nLCBtdWx0aUxpbmVTdHJpbmcgfSBmcm9tIFwiQHR1cmYvaGVscGVyc1wiO1xuaW1wb3J0IHsgZ2V0R2VvbSB9IGZyb20gXCJAdHVyZi9pbnZhcmlhbnRcIjtcbi8qKlxuICogQ29udmVydHMgYSB7QGxpbmsgUG9seWdvbn0gdG8ge0BsaW5rIExpbmVTdHJpbmd8KE11bHRpKUxpbmVTdHJpbmd9IG9yIHtAbGluayBNdWx0aVBvbHlnb259IHRvIGFcbiAqIHtAbGluayBGZWF0dXJlQ29sbGVjdGlvbn0gb2Yge0BsaW5rIExpbmVTdHJpbmd8KE11bHRpKUxpbmVTdHJpbmd9LlxuICpcbiAqIEBuYW1lIHBvbHlnb25Ub0xpbmVcbiAqIEBwYXJhbSB7RmVhdHVyZTxQb2x5Z29ufE11bHRpUG9seWdvbj59IHBvbHkgRmVhdHVyZSB0byBjb252ZXJ0XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5wcm9wZXJ0aWVzPXt9XSB0cmFuc2xhdGVzIEdlb0pTT04gcHJvcGVydGllcyB0byBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZTxMaW5lU3RyaW5nfE11bHRpTGluZXN0cmluZz59IGNvbnZlcnRlZCAoTXVsdGkpUG9seWdvbiB0byAoTXVsdGkpTGluZVN0cmluZ1xuICogQGV4YW1wbGVcbiAqIHZhciBwb2x5ID0gdHVyZi5wb2x5Z29uKFtbWzEyNSwgLTMwXSwgWzE0NSwgLTMwXSwgWzE0NSwgLTIwXSwgWzEyNSwgLTIwXSwgWzEyNSwgLTMwXV1dKTtcbiAqXG4gKiB2YXIgbGluZSA9IHR1cmYucG9seWdvblRvTGluZShwb2x5KTtcbiAqXG4gKiAvL2FkZFRvTWFwXG4gKiB2YXIgYWRkVG9NYXAgPSBbbGluZV07XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwb2x5LCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZ2VvbSA9IGdldEdlb20ocG9seSk7XG4gICAgaWYgKCFvcHRpb25zLnByb3BlcnRpZXMgJiYgcG9seS50eXBlID09PSBcIkZlYXR1cmVcIikge1xuICAgICAgICBvcHRpb25zLnByb3BlcnRpZXMgPSBwb2x5LnByb3BlcnRpZXM7XG4gICAgfVxuICAgIHN3aXRjaCAoZ2VvbS50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICAgICAgICByZXR1cm4gcG9seWdvblRvTGluZShnZW9tLCBvcHRpb25zKTtcbiAgICAgICAgY2FzZSBcIk11bHRpUG9seWdvblwiOlxuICAgICAgICAgICAgcmV0dXJuIG11bHRpUG9seWdvblRvTGluZShnZW9tLCBvcHRpb25zKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgcG9seVwiKTtcbiAgICB9XG59XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwb2x5Z29uVG9MaW5lKHBvbHksIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBnZW9tID0gZ2V0R2VvbShwb2x5KTtcbiAgICB2YXIgY29vcmRzID0gZ2VvbS5jb29yZGluYXRlcztcbiAgICB2YXIgcHJvcGVydGllcyA9IG9wdGlvbnMucHJvcGVydGllc1xuICAgICAgICA/IG9wdGlvbnMucHJvcGVydGllc1xuICAgICAgICA6IHBvbHkudHlwZSA9PT0gXCJGZWF0dXJlXCJcbiAgICAgICAgICAgID8gcG9seS5wcm9wZXJ0aWVzXG4gICAgICAgICAgICA6IHt9O1xuICAgIHJldHVybiBjb29yZHNUb0xpbmUoY29vcmRzLCBwcm9wZXJ0aWVzKTtcbn1cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG11bHRpUG9seWdvblRvTGluZShtdWx0aVBvbHksIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBnZW9tID0gZ2V0R2VvbShtdWx0aVBvbHkpO1xuICAgIHZhciBjb29yZHMgPSBnZW9tLmNvb3JkaW5hdGVzO1xuICAgIHZhciBwcm9wZXJ0aWVzID0gb3B0aW9ucy5wcm9wZXJ0aWVzXG4gICAgICAgID8gb3B0aW9ucy5wcm9wZXJ0aWVzXG4gICAgICAgIDogbXVsdGlQb2x5LnR5cGUgPT09IFwiRmVhdHVyZVwiXG4gICAgICAgICAgICA/IG11bHRpUG9seS5wcm9wZXJ0aWVzXG4gICAgICAgICAgICA6IHt9O1xuICAgIHZhciBsaW5lcyA9IFtdO1xuICAgIGNvb3Jkcy5mb3JFYWNoKGZ1bmN0aW9uIChjb29yZCkge1xuICAgICAgICBsaW5lcy5wdXNoKGNvb3Jkc1RvTGluZShjb29yZCwgcHJvcGVydGllcykpO1xuICAgIH0pO1xuICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbihsaW5lcyk7XG59XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb29yZHNUb0xpbmUoY29vcmRzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGNvb3Jkcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHJldHVybiBtdWx0aUxpbmVTdHJpbmcoY29vcmRzLCBwcm9wZXJ0aWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIGxpbmVTdHJpbmcoY29vcmRzWzBdLCBwcm9wZXJ0aWVzKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtsaW5lLCBzZWxlY3QsIHVuc2VsZWN0fSBmcm9tICcuL2ljb25zJ1xyXG5pbXBvcnQge1xyXG4gIHBvbHlnb24gYXMgdHVyZlBvbHksXHJcbiAgbGluZVN0cmluZyBhcyB0dXJmTGluZVN0cmluZyxcclxuICBtdWx0aUxpbmVTdHJpbmcgYXMgdHVyZk11bHRpTGluZVN0cmluZyxcclxufSBmcm9tIFwiQHR1cmYvaGVscGVyc1wiO1xyXG5cclxuaW1wb3J0IGJvb2xlYW5JbnRlcnNlY3RzIGZyb20gXCJAdHVyZi9ib29sZWFuLWludGVyc2VjdHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgTC5EcmF3LlRyYWNlXHJcbiAqIEBha2EgRHJhdy5UcmFjZVxyXG4gKiBAaW5oZXJpdHMgTC5EcmF3LlRyYWNlXHJcbiAqL1xyXG5MLkRyYXcuVHJhY2UgPSBMLkRyYXcuUG9seWxpbmUuZXh0ZW5kKHtcclxuICBzdGF0aWNzOiB7XHJcbiAgICBUWVBFOiBcInRyYWNlXCIsXHJcbiAgfSxcclxuICAvL1RPRE8gaSBvbmx5IHdhbnQgdG8gZWRpdCBzaGFwZU9wdGlvbnMsIHRoZSByZXN0IG5lZWQgbm90IGJlIGNvcGllZCBvdmVyXHJcbiAgb3B0aW9uczoge1xyXG4gICAgYWxsb3dJbnRlcnNlY3Rpb246IHRydWUsXHJcbiAgICByZXBlYXRNb2RlOiBmYWxzZSxcclxuICAgIGRyYXdFcnJvcjoge1xyXG4gICAgICBjb2xvcjogXCIjYjAwYjAwXCIsXHJcbiAgICAgIHRpbWVvdXQ6IDI1MDAsXHJcbiAgICB9LFxyXG4gICAgaWNvbjogbmV3IEwuRGl2SWNvbih7XHJcbiAgICAgIGljb25TaXplOiBuZXcgTC5Qb2ludCg4LCA4KSxcclxuICAgICAgY2xhc3NOYW1lOiBcImxlYWZsZXQtZGl2LWljb24gbGVhZmxldC1lZGl0aW5nLWljb25cIixcclxuICAgIH0pLFxyXG4gICAgdG91Y2hJY29uOiBuZXcgTC5EaXZJY29uKHtcclxuICAgICAgaWNvblNpemU6IG5ldyBMLlBvaW50KDIwLCAyMCksXHJcbiAgICAgIGNsYXNzTmFtZTogXCJsZWFmbGV0LWRpdi1pY29uIGxlYWZsZXQtZWRpdGluZy1pY29uIGxlYWZsZXQtdG91Y2gtaWNvblwiLFxyXG4gICAgfSksXHJcbiAgICBndWlkZWxpbmVEaXN0YW5jZTogMjAsXHJcbiAgICBtYXhHdWlkZUxpbmVMZW5ndGg6IDQwMDAsXHJcbiAgICBzaGFwZU9wdGlvbnM6IHtcclxuICAgICAgc3Ryb2tlOiB0cnVlLFxyXG4gICAgICBjb2xvcjogXCJyZWRcIixcclxuICAgICAgd2VpZ2h0OiA0LFxyXG4gICAgICBvcGFjaXR5OiAwLjUsXHJcbiAgICAgIGZpbGw6IGZhbHNlLFxyXG4gICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgbWV0cmljOiB0cnVlLCAvLyBXaGV0aGVyIHRvIHVzZSB0aGUgbWV0cmljIG1lYXN1cmVtZW50IHN5c3RlbSBvciBpbXBlcmlhbFxyXG4gICAgZmVldDogdHJ1ZSwgLy8gV2hlbiBub3QgbWV0cmljLCB0byB1c2UgZmVldCBpbnN0ZWFkIG9mIHlhcmRzIGZvciBkaXNwbGF5LlxyXG4gICAgbmF1dGljOiBmYWxzZSwgLy8gV2hlbiBub3QgbWV0cmljLCBub3QgZmVldCB1c2UgbmF1dGljIG1pbGUgZm9yIGRpc3BsYXlcclxuICAgIHpJbmRleE9mZnNldDogMjAwMCwgLy8gVGhpcyBzaG91bGQgYmUgPiB0aGFuIHRoZSBoaWdoZXN0IHotaW5kZXggYW55IG1hcCBsYXllcnNcclxuICAgIGZhY3RvcjogMSwgLy8gVG8gY2hhbmdlIGRpc3RhbmNlIGNhbGN1bGF0aW9uXHJcbiAgICBtYXhQb2ludHM6IDAsIC8vIE9uY2UgdGhpcyBudW1iZXIgb2YgcG9pbnRzIGFyZSBwbGFjZWQsIGZpbmlzaCBzaGFwZVxyXG4gIH0sXHJcbiAgLy8gQG1ldGhvZCBpbml0aWFsaXplKCk6IHZvaWRcclxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAobWFwLCBvcHRpb25zKSB7XHJcbiAgICBMLkRyYXcuUG9seWxpbmUucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBtYXAsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy50eXBlID0gTC5EcmF3LlRyYWNlLlRZUEU7XHJcbiAgICB0aGlzLm9wdGlvbnMuZHJhd0Vycm9yLm1lc3NhZ2UgPSBcIllvdSBtdXN0IGRyYXcgb3ZlciB0aGUgc2VsZWN0ZWQgbGluZS5cIjtcclxuICAgIC8vVE9ETzogTm90IHN1cmUgaWYgdGhpcyBpbGwgaW50ZXJmZXJlIHdpdGggb3RoZXIgcG9seWxpbmUgZHJhd2luZ1xyXG4gIH0sXHJcblxyXG4gIGFkZEhvb2tzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBMLkRyYXcuUG9seWxpbmUucHJvdG90eXBlLmFkZEhvb2tzLmNhbGwodGhpcyk7XHJcbiAgICB0aGlzLmFsbW9zdExhdExuZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX21hcFxyXG4gICAgICAub24oXCJhbG1vc3Q6bW92ZVwiLCB0aGlzLl9hbG1vc3RNb3ZlLCB0aGlzKVxyXG4gICAgICAub24oXCJhbG1vc3Q6b3V0XCIsIHRoaXMuX2FsbW9zdE91dCwgdGhpcyk7XHJcblxyXG4gICAgLy9UT0RPOiBzb3J0IGhvdyB0byBzdG9yZSBsYXllciBpZCBhbmQgc2VsZWN0IG1vcmUgbmljZWx5IGhlcmVcclxuICAgIGxldCBzO1xyXG4gICAgdGhpcy5fbWFwLmVhY2hMYXllcihmdW5jdGlvbiAobGF5ZXIpIHtcclxuICAgICAgaWYgKGxheWVyLm9wdGlvbnMubmFtZSAmJiBsYXllci5vcHRpb25zLm5hbWUgPT0gXCJzZWxlY3RlZFwiKSB7XHJcbiAgICAgICAgcyA9IGxheWVyO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBzO1xyXG4gICAgdGhpcy5saW5lVHlwZSA9IHMub3B0aW9ucy5saW5lVHlwZTtcclxuICAgIGlmICh0aGlzLmxpbmVUeXBlID09IFwiTXVsdGlMaW5lU3RyaW5nXCIpIHtcclxuICAgICAgdGhpcy5nZXRTZWdtZW50cyhzKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdldFNlZ21lbnRzOiBmdW5jdGlvbiAocykge1xyXG4gICAgdGhpcy5zZWdtZW50cyA9IHMuZ2V0TGF0TG5ncygpLm1hcCgobGwpID0+IEwucG9seWxpbmUobGwpKTtcclxuICB9LFxyXG4gIHJlbW92ZUhvb2tzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBMLkRyYXcuUG9seWdvbi5wcm90b3R5cGUucmVtb3ZlSG9va3MuY2FsbCh0aGlzKTtcclxuICAgIGRlbGV0ZSB0aGlzLnNlbGVjdGVkO1xyXG4gICAgZGVsZXRlIHRoaXMuYWxtb3N0TGF0TG5nO1xyXG4gICAgZGVsZXRlIHRoaXMuc3RhcnRSYXRpbztcclxuICAgIGRlbGV0ZSB0aGlzLmxpbmVzdGFydDtcclxuICAgIGRlbGV0ZSB0aGlzLl9jbGlja0hhbmRsZWQ7XHJcbiAgICBkZWxldGUgdGhpcy5fZGlzYWJsZU1hcmtlcnM7XHJcbiAgICBkZWxldGUgdGhpcy5zZWdtZW50cztcclxuICAgIGRlbGV0ZSB0aGlzLmNsb3Nlc3Q7XHJcbiAgICBkZWxldGUgdGhpcy5saW5lVHlwZTtcclxuICAgIHRoaXMuX21hcFxyXG4gICAgICAub2ZmKFwiYWxtb3N0Om1vdmVcIiwgdGhpcy5fYWxtb3N0TW92ZSwgdGhpcylcclxuICAgICAgLm9mZihcImFsbW9zdDpvdXRcIiwgdGhpcy5fYWxtb3N0T3V0LCB0aGlzKTtcclxuICB9LFxyXG4gIF9hbG1vc3RPdXQ6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB0aGlzLmFsbW9zdExhdExuZyA9IGZhbHNlO1xyXG4gIH0sXHJcbiAgX2FsbW9zdE1vdmU6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB0aGlzLmFsbW9zdExhdExuZyA9IGUubGF0bG5nO1xyXG4gIH0sXHJcbiAgLy8gQG1ldGhvZCBhZGRWZXJ0ZXgoKTogdm9pZFxyXG4gIC8vIEFkZCBhIHZlcnRleCB0byB0aGUgZW5kIG9mIHRoZSBwb2x5bGluZVxyXG4gIGFkZFZlcnRleDogZnVuY3Rpb24gKGxhdGxuZykge1xyXG4gICAgY29uc3QgbWFya2Vyc0xlbmd0aCA9IHRoaXMuX21hcmtlcnMubGVuZ3RoO1xyXG5cclxuICAgIC8vIG1hcmtlcnNMZW5ndGggbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMiBiZWZvcmUgaW50ZXJzZWN0aW9ucyBjYW4gb2NjdXIgJiYgbXVzdCBoYXZlIGxhdGxuZyBmcm9tIGRyYXdpbmcgYWxvbmcgc2VsZWN0ZWRcclxuICAgIGlmIChcclxuICAgICAgKG1hcmtlcnNMZW5ndGggPj0gMiAmJlxyXG4gICAgICAgICF0aGlzLm9wdGlvbnMuYWxsb3dJbnRlcnNlY3Rpb24gJiZcclxuICAgICAgICB0aGlzLl9wb2x5Lm5ld0xhdExuZ0ludGVyc2VjdHMobGF0bG5nKSkgfHxcclxuICAgICAgIWxhdGxuZ1xyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuX3Nob3dFcnJvclRvb2x0aXAoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLl9lcnJvclNob3duKSB7XHJcbiAgICAgIHRoaXMuX2hpZGVFcnJvclRvb2x0aXAoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vZ2V0IHRoZSBsaW5lIHJhdGlvIG9mIHRoZSBjdXJyZW50IHBvaW50LCBhbmQgZ2VuZXJhdGUgYWxsIHBvaW50cyBuZWVkZWQgdG8gZHJhdyBsaW5lXHJcbiAgICAgIGNvbnN0IGVuZFJhdGlvID0gTC5HZW9tZXRyeVV0aWwubG9jYXRlT25MaW5lKFxyXG4gICAgICAgIHRoaXMuX21hcCxcclxuICAgICAgICB0aGlzLmNsb3Nlc3QsXHJcbiAgICAgICAgdGhpcy5hbG1vc3RMYXRMbmdcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgZXh0cmFjdGlvbiA9IEwuR2VvbWV0cnlVdGlsLmV4dHJhY3QoXHJcbiAgICAgICAgdGhpcy5fbWFwLFxyXG4gICAgICAgIHRoaXMuY2xvc2VzdCxcclxuICAgICAgICB0aGlzLnN0YXJ0UmF0aW8sXHJcbiAgICAgICAgZW5kUmF0aW9cclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRoaXMuX21hcmtlcnMgPSBleHRyYWN0aW9uLm1hcCgoZSkgPT4gdGhpcy5fY3JlYXRlTWFya2VyKGUpKTsgLy9jcmVhdGUgbmV3IG1hcmtlciBsaXN0LCB3aGljaCBpcyBhZGRlZCB0byB0aGUgbWFwXHJcbiAgICAgIHRoaXMuX3BvbHkuc2V0TGF0TG5ncyhleHRyYWN0aW9uKTsgLy9zZXQgdGhlIHBvaW50cyBvZiB0aGUgbGluZVxyXG5cclxuICAgICAgaWYgKHRoaXMuX3BvbHkuZ2V0TGF0TG5ncygpLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgIHRoaXMuX21hcC5hZGRMYXllcih0aGlzLl9wb2x5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fdmVydGV4Q2hhbmdlZChsYXRsbmcsIHRydWUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX29uTW91c2VNb3ZlOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgTC5EcmF3LlBvbHlsaW5lLnByb3RvdHlwZS5fb25Nb3VzZU1vdmUuY2FsbCh0aGlzLCBlKTtcclxuICAgIC8vYWRkIGEgdmVydGV4IG9uIG1vdXNlIG1vdmUgaWYgc2xyZWFkeSBkcmF3aW5nIHN0YXJ0ZWRcclxuICAgIGlmICh0aGlzLmxpbmVTdGFydCkge1xyXG4gICAgICB0aGlzLmFkZFZlcnRleCh0aGlzLmFsbW9zdExhdExuZyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfb25Nb3VzZURvd246IGZ1bmN0aW9uIChlKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLl9jbGlja0hhbmRsZWQgJiZcclxuICAgICAgIXRoaXMuX3RvdWNoSGFuZGxlZCAmJlxyXG4gICAgICAhdGhpcy5fZGlzYWJsZU1hcmtlcnMgJiZcclxuICAgICAgdGhpcy5hbG1vc3RMYXRMbmcgIT0gZmFsc2VcclxuICAgICkge1xyXG4gICAgICB0aGlzLl9tYXAuZHJhZ2dpbmcuZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLl9vbk1vdXNlTW92ZShlKTtcclxuICAgICAgdGhpcy5fY2xpY2tIYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5fZGlzYWJsZU5ld01hcmtlcnMoKTtcclxuICAgICAgdGhpcy5saW5lU3RhcnQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNsb3Nlc3QgPSB0aGlzLl9zZXRDbG9zZXN0KCk7XHJcbiAgICAgIHRoaXMuc3RhcnRSYXRpbyA9IEwuR2VvbWV0cnlVdGlsLmxvY2F0ZU9uTGluZShcclxuICAgICAgICB0aGlzLl9tYXAsXHJcbiAgICAgICAgdGhpcy5jbG9zZXN0LFxyXG4gICAgICAgIHRoaXMuYWxtb3N0TGF0TG5nXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuX3N0YXJ0UG9pbnQuY2FsbCh0aGlzLCB0aGlzLmFsbW9zdExhdExuZy5sbmcsIHRoaXMuYWxtb3N0TGF0TG5nLmxhdCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfbGF0bG5nVG9BcnJheTogZnVuY3Rpb24gKGxscykge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobGxzKSkgcmV0dXJuIGxscy5tYXAoKGxsKSA9PiB0aGlzLl9sYXRsbmdUb0FycmF5KGxsKSk7XHJcbiAgICBlbHNlIHJldHVybiBbbGxzLmxuZywgbGxzLmxhdF07XHJcbiAgfSxcclxuICBfc2V0Q2xvc2VzdDogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMubGluZVR5cGUgPT0gXCJMaW5lU3RyaW5nXCIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gTC5HZW9tZXRyeVV0aWwuY2xvc2VzdExheWVyKFxyXG4gICAgICAgIHRoaXMuX21hcCxcclxuICAgICAgICB0aGlzLnNlZ21lbnRzLFxyXG4gICAgICAgIHRoaXMuYWxtb3N0TGF0TG5nXHJcbiAgICAgICkubGF5ZXI7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgX29uTW91c2VVcDogZnVuY3Rpb24gKGUpIHtcclxuICAgIEwuRHJhdy5Qb2x5bGluZS5wcm90b3R5cGUuX29uTW91c2VVcC5jYWxsKHRoaXMsIGUpO1xyXG4gICAgdGhpcy5fbWFwLmRyYWdnaW5nLmVuYWJsZSgpO1xyXG4gICAgdGhpcy5saW5lU3RhcnQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICAvL1RPRE86IHRoaXMgZnVuY3Rpb24gaXMgYW4gYWJzb2x1dGUgbWVzcyBhbmQgaSBuZWVkIHRvIGFkZHJlc3MgaXRcclxuICBfZW5kUG9pbnQ6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICBpZiAodGhpcy5fbW91c2VEb3duT3JpZ2luKSB7XHJcbiAgICAgIHRoaXMuYWRkVmVydGV4KGUubGF0bG5nKTtcclxuICAgICAgdGhpcy5fZmluaXNoU2hhcGUoKTtcclxuICAgICAgLy9UT0RPOiBJIGRpc2FibGVkIGFsbCBvZiB0aGlzIGFuZCBrZXB0IHRoZSBwYXJ0cyBvZiB0aGUgY29kZSB0aGF0IGFsbG93IHRoZSBsaW5lIHRvIGVuZFxyXG4gICAgICAvLyBJIG5lZWQgdG8gc3BlbmQgbW9yZSB0aW1lIGxvb2tpbmcgYXQgdGhpcyB0byBtYWtlIHN1cmUgdGhlcmUgaXNuJ3Qgc29tZXRoaW5nIGhlcmUgSSBuZWVkLCBlc3BlY2lhbGx5IGluIHJlZ2FyZHMgdG8gdG91Y2ggc2NyZWUgc3R1ZmZcclxuXHJcbiAgICAgIC8vIGlmICh0aGlzLl9tb3VzZURvd25PcmlnaW4pIHtcclxuICAgICAgLy8gXHR2YXIgZHJhZ0NoZWNrRGlzdGFuY2UgPSBMLnBvaW50KGNsaWVudFgsIGNsaWVudFkpXHJcbiAgICAgIC8vIFx0XHQuZGlzdGFuY2VUbyh0aGlzLl9tb3VzZURvd25PcmlnaW4pO1xyXG4gICAgICAvLyBcdHZhciBsYXN0UHREaXN0YW5jZSA9IHRoaXMuX2NhbGN1bGF0ZUZpbmlzaERpc3RhbmNlKGUubGF0bG5nKTtcclxuICAgICAgLy8gXHRpZiAodGhpcy5vcHRpb25zLm1heFBvaW50cyA+IDEgJiYgdGhpcy5vcHRpb25zLm1heFBvaW50cyA9PSB0aGlzLl9tYXJrZXJzLmxlbmd0aCArIDEpIHtcclxuICAgICAgLy8gXHRcdHRoaXMuYWRkVmVydGV4KGUubGF0bG5nKTtcclxuICAgICAgLy8gXHRcdHRoaXMuX2ZpbmlzaFNoYXBlKCk7XHJcbiAgICAgIC8vIFx0fSBlbHNlIGlmIChsYXN0UHREaXN0YW5jZSA8IDEwICYmIEwuQnJvd3Nlci50b3VjaCkgeyAvL1RPRE86IG5lZWQgdG8ga2VlcCB0aGlzIGluIHNvbWUgZm9ybSBmb3IgdG91Y2ggc2NyZWVucz8/P1xyXG4gICAgICAvLyBcdFx0dGhpcy5fZmluaXNoU2hhcGUoKTtcclxuICAgICAgLy8gXHR9IGVsc2UgaWYgKE1hdGguYWJzKGRyYWdDaGVja0Rpc3RhbmNlKSA8IDkgKiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSkpIHtcclxuICAgICAgLy8gXHRcdHRoaXMuYWRkVmVydGV4KGUubGF0bG5nKTtcclxuICAgICAgLy8gXHR9XHJcbiAgICAgIC8vIFx0dGhpcy5fZW5hYmxlTmV3TWFya2VycygpOyAvLyBhZnRlciBhIHNob3J0IHBhdXNlLCBlbmFibGUgbmV3IG1hcmtlcnNcclxuICAgICAgLy8gfVxyXG4gICAgICB0aGlzLl9lbmFibGVOZXdNYXJrZXJzKCk7IC8vIGFmdGVyIGEgc2hvcnQgcGF1c2UsIGVuYWJsZSBuZXcgbWFya2Vyc1xyXG4gICAgfVxyXG4gICAgdGhpcy5fbW91c2VEb3duT3JpZ2luID0gbnVsbDtcclxuICB9LFxyXG4gIF9jcmVhdGVNYXJrZXI6IGZ1bmN0aW9uIChsYXRsbmcpIHtcclxuICAgIHZhciBtYXJrZXIgPSBuZXcgTC5NYXJrZXIobGF0bG5nLCB7XHJcbiAgICAgIGljb246IHRoaXMub3B0aW9ucy5pY29uLFxyXG4gICAgICB6SW5kZXhPZmZzZXQ6IHRoaXMub3B0aW9ucy56SW5kZXhPZmZzZXQgKiAyLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWFya2VyO1xyXG4gIH0sXHJcbiAgX3VwZGF0ZVJ1bm5pbmdNZWFzdXJlOiBmdW5jdGlvbiAobGF0bG5nLCBhZGRlZCkge1xyXG4gICAgdmFyIG1hcmtlcnNMZW5ndGggPSB0aGlzLl9tYXJrZXJzLmxlbmd0aCxcclxuICAgICAgcHJldmlvdXNNYXJrZXJJbmRleCxcclxuICAgICAgZGlzdGFuY2U7XHJcblxyXG4gICAgaWYgKHRoaXMuX21hcmtlcnMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIHRoaXMuX21lYXN1cmVtZW50UnVubmluZ1RvdGFsID0gMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHByZXZpb3VzTWFya2VySW5kZXggPSBtYXJrZXJzTGVuZ3RoIC0gKGFkZGVkID8gMiA6IDEpO1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBiYXNlZCBvbiB0aGUgdmVyc2lvblxyXG4gICAgICBpZiAoTC5HZW9tZXRyeVV0aWwuaXNWZXJzaW9uMDd4KCkpIHtcclxuICAgICAgICBkaXN0YW5jZSA9XHJcbiAgICAgICAgICBsYXRsbmcuZGlzdGFuY2VUbyh0aGlzLl9tYXJrZXJzW3ByZXZpb3VzTWFya2VySW5kZXhdLmdldExhdExuZygpKSAqXHJcbiAgICAgICAgICAodGhpcy5vcHRpb25zLmZhY3RvciB8fCAxKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkaXN0YW5jZSA9XHJcbiAgICAgICAgICB0aGlzLl9tYXAuZGlzdGFuY2UoXHJcbiAgICAgICAgICAgIGxhdGxuZyxcclxuICAgICAgICAgICAgdGhpcy5fbWFya2Vyc1twcmV2aW91c01hcmtlckluZGV4XS5nZXRMYXRMbmcoKVxyXG4gICAgICAgICAgKSAqICh0aGlzLm9wdGlvbnMuZmFjdG9yIHx8IDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9tZWFzdXJlbWVudFJ1bm5pbmdUb3RhbCArPSBkaXN0YW5jZSAqIChhZGRlZCA/IDEgOiAtMSk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEwuRHJhdy5TZWxlY3RcclxuICogQGFrYSBEcmF3LlNlbGVjdFxyXG4gKiBAaW5oZXJpdHMgTC5EcmF3LlJlY3RhbmdsZVxyXG4gKi9cclxuTC5EcmF3LlNlbGVjdCA9IEwuRHJhdy5SZWN0YW5nbGUuZXh0ZW5kKHtcclxuICBzdGF0aWNzOiB7XHJcbiAgICBUWVBFOiBcInNlbGVjdFwiLFxyXG4gIH0sXHJcblxyXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChtYXAsIG9wdGlvbnMpIHtcclxuICAgIC8vIFNhdmUgdGhlIHR5cGUgc28gc3VwZXIgY2FuIGZpcmUsIG5lZWQgdG8gZG8gdGhpcyBhcyBjYW5ub3QgZG8gdGhpcy5UWVBFIDooXHJcbiAgICBMLkRyYXcuUmVjdGFuZ2xlLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgbWFwLCBvcHRpb25zKTtcclxuICAgIHRoaXMuX21hcCA9IG1hcDtcclxuICAgIHRoaXMuX2luaXRpYWxMYWJlbFRleHQgPSBcIkNsaWNrIGFuZCBkcmFnIHRvIHNlbGVjdCBhIGxpbmUuXCI7XHJcblxyXG4gICAgdGhpcy50eXBlID0gTC5EcmF3LlNlbGVjdC5UWVBFO1xyXG4gIH0sXHJcblxyXG4gIC8vIEBtZXRob2QgYWRkSG9va3MoKTogdm9pZFxyXG4gIC8vIEFkZCBsaXN0ZW5lciBob29rcyB0byB0aGlzIGhhbmRsZXIuXHJcbiAgYWRkSG9va3M6IGZ1bmN0aW9uICgpIHtcclxuICAgIEwuRHJhdy5SZWN0YW5nbGUucHJvdG90eXBlLmFkZEhvb2tzLmNhbGwodGhpcyk7XHJcbiAgICAvL1RPRE86IG1ha2UgbW9yZSBlbGVnYW50IGlmIGkgY2FuXHJcbiAgICBsZXQgcztcclxuICAgIHRoaXMuX21hcC5lYWNoTGF5ZXIoZnVuY3Rpb24gKGxheWVyKSB7XHJcbiAgICAgIGlmIChsYXllci5vcHRpb25zLm5hbWUgJiYgbGF5ZXIub3B0aW9ucy5uYW1lID09IFwic2VsZWN0ZWRcIikge1xyXG4gICAgICAgIHMgPSBsYXllcjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gcztcclxuXHJcbiAgICAvLyB0aGlzLnNlbGVjdGVkSXRlbSA9IG5ldyBMLkZlYXR1cmVHcm91cCgpLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICB0aGlzLl9tYXAub24oTC5EcmF3LkV2ZW50LkNSRUFURUQsIHRoaXMuX2NyZWF0ZWQsIHRoaXMpO1xyXG4gIH0sXHJcbiAgZW5hYmxlU2VsZWN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidHJhY2UtbGluZVwiKVswXTtcclxuICAgIGJ1dHRvbi5vbkNsaWNrID0gbnVsbDtcclxuICAgIGJ1dHRvbi5jbGFzc05hbWUgPSBcInRyYWNlLWxpbmUgbGVhZmxldC10b29sYmFyLWljb25cIjtcclxuICB9LFxyXG5cclxuICByZW1vdmVIb29rczogZnVuY3Rpb24gKCkge1xyXG4gICAgTC5EcmF3LlJlY3RhbmdsZS5wcm90b3R5cGUucmVtb3ZlSG9va3MuY2FsbCh0aGlzKTtcclxuICAgIGRlbGV0ZSB0aGlzLnNlbGVjdGVkO1xyXG4gICAgdGhpcy5fbWFwLm9mZihMLkRyYXcuRXZlbnQuQ1JFQVRFRCwgdGhpcy5fY3JlYXRlZCwgdGhpcyk7XHJcbiAgfSxcclxuICBfbGF0bG5nVG9BcnJheTogZnVuY3Rpb24gKGxscykge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobGxzKSkgcmV0dXJuIGxscy5tYXAoKGxsKSA9PiB0aGlzLl9sYXRsbmdUb0FycmF5KGxsKSk7XHJcbiAgICBlbHNlIHJldHVybiBbbGxzLmxuZywgbGxzLmxhdF07XHJcbiAgICAvLyB9KTtcclxuICB9LFxyXG5cclxuICBfY3JlYXRlZDogZnVuY3Rpb24gKGUpIHtcclxuICAgIC8vY3JlYXRlIHR1cmZqcyBjb21wYXRpYmxlIGZlYXR1cmUgZnJvbSBkcmF3biByZWN0YW5nbGVcclxuICAgIGNvbnN0IGxhdGxuZ3MgPSB0aGlzLl9sYXRsbmdUb0FycmF5KGUubGF5ZXIuZ2V0TGF0TG5ncygpKTtcclxuICAgIGxhdGxuZ3NbMF0ucHVzaChsYXRsbmdzWzBdWzBdKTsgLy9hZGQgZmlyc3QgcGFpciB0byBiYWNrIHRvIHNhdGlzZnkgdHVyZi5qc1xyXG5cclxuICAgIGNvbnN0IHNlbGVjdFBvbHkgPSB0dXJmUG9seShsYXRsbmdzKTtcclxuICAgIC8vc2VhcmNoIG1hcCBmb3IgYSBzZWxlY3RhYmxlIGxheWVyXHJcbiAgICB0aGlzLl9tYXAuZWFjaExheWVyKChsYXllcikgPT4ge1xyXG4gICAgICBpZiAobGF5ZXIub3B0aW9ucy5zZWxlY3RhYmxlKSB7XHJcbiAgICAgICAgdGhpcy5fbWFuYWdlU2VsZWN0KHNlbGVjdFBvbHksIGxheWVyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgLy9ydW4gcXVlcnkgdG8gc2VsZWN0IGZlYXR1cmUgb24gcmVjdGFuZ2xlIGRyYXdcclxuICBfbWFuYWdlU2VsZWN0OiBmdW5jdGlvbiAocmVjdCwgc2VsZWN0YWJsZSkge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5fbWFwLmFsbW9zdE92ZXIucmVtb3ZlTGF5ZXIodGhpcy5zZWxlY3RlZCk7XHJcbiAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcih0aGlzLnNlbGVjdGVkKTtcclxuICAgIH1cclxuICAgIGxldCBzZWxlY3RlZDtcclxuXHJcbiAgICBzZWxlY3RhYmxlLmVhY2hMYXllcigobGF5ZXIpID0+IHtcclxuICAgICAgbGV0IGxpbmUgPSB0aGlzLl9ncmFiVHVyZkxpbmUobGF5ZXIpO1xyXG5cclxuICAgICAgaWYgKGxpbmUpIHtcclxuICAgICAgICBjb25zdCBpbnRlcnNlY3QgPSBib29sZWFuSW50ZXJzZWN0cyhyZWN0LCBsaW5lKTtcclxuICAgICAgICBpZiAoaW50ZXJzZWN0KSB7XHJcbiAgICAgICAgICBzZWxlY3RlZCA9IGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5fZHJhd1NlbGVjdChzZWxlY3RlZCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvL2NvbnZlcnQgbGF5ZXIgaW50byBhIHR1cmYgbGluZSB0eXBlXHJcbiAgX2dyYWJUdXJmTGluZTogZnVuY3Rpb24gKGxheWVyKSB7XHJcbiAgICBjb25zdCBsaW5lVHlwZSA9IGxheWVyLmZlYXR1cmUuZ2VvbWV0cnkudHlwZTtcclxuICAgIGNvbnN0IGxhdGxuZ3MgPSB0aGlzLl9sYXRsbmdUb0FycmF5KGxheWVyLmdldExhdExuZ3MoKSk7XHJcbiAgICBpZiAobGluZVR5cGUgPT0gXCJMaW5lU3RyaW5nXCIpIHtcclxuICAgICAgcmV0dXJuIHR1cmZMaW5lU3RyaW5nKGxhdGxuZ3MpO1xyXG4gICAgfSBlbHNlIGlmIChsaW5lVHlwZSA9PSBcIk11bHRpTGluZVN0cmluZ1wiKSB7XHJcbiAgICAgIHJldHVybiB0dXJmTXVsdGlMaW5lU3RyaW5nKGxhdGxuZ3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpbmU7XHJcbiAgfSxcclxuXHJcbiAgX2RyYXdTZWxlY3Q6IGZ1bmN0aW9uIChzZWxlY3RlZCkge1xyXG4gICAgbGV0IHByb3BlcnRpZXMgPSB7fTtcclxuICAgIGlmIChzZWxlY3RlZC5mZWF0dXJlLnByb3BlcnRpZXMpIHtcclxuICAgICAgcHJvcGVydGllcyA9IHNlbGVjdGVkLmZlYXR1cmUucHJvcGVydGllcztcclxuICAgIH1cclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBMLnBvbHlsaW5lKHNlbGVjdGVkLmdldExhdExuZ3MoKSwge1xyXG4gICAgICB3ZWlnaHQ6IDQsXHJcbiAgICAgIGNvbG9yOiBcImdvbGRcIixcclxuICAgICAgbmFtZTogXCJzZWxlY3RlZFwiLFxyXG4gICAgICBsaW5lVHlwZTogc2VsZWN0ZWQuZmVhdHVyZS5nZW9tZXRyeS50eXBlLFxyXG4gICAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLFxyXG4gICAgfSkuYWRkVG8odGhpcy5fbWFwKTtcclxuICAgIHRoaXMuX21hcC5hZGRMYXllcih0aGlzLnNlbGVjdGVkKTtcclxuICAgIHRoaXMuX21hcC5hbG1vc3RPdmVyLmFkZExheWVyKHRoaXMuc2VsZWN0ZWQpO1xyXG4gICAgdGhpcy5lbmFibGVTZWxlY3QoKTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vc2VlIGlmIGkgY2FuIHJ1biBkaXNhYmxlIHNlbGVjdCBlbHNld2hlcmVcclxuTC5Ub29sYmFyMi5EcmF3QWN0aW9uLkNhbmNlbFRyYWNlID0gTC5Ub29sYmFyMi5EcmF3QWN0aW9uLkNhbmNlbC5leHRlbmQoe1xyXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgIGRpc2FibGVTZWxlY3QoKTsgLy9kaWFibGUgc2VsZWN0IG9uIGRyYXcgYnV0dG9uIGhlcmUgYmVjYXVzZSB0aGlzIGlzIHRoZSBmaXJzdCBwbGFjZSB3aGVyZSBpdCdzIGFscmFkeSBpbml0YWxpemVkXHJcbiAgICBMLlRvb2xiYXIyLkRyYXdBY3Rpb24uQ2FuY2VsLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcyk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5MLlRvb2xiYXIyLkRyYXdBY3Rpb24uVHJhY2UgPSBMLlRvb2xiYXIyLkRyYXdBY3Rpb24uZnJvbUhhbmRsZXIoXHJcbiAgTC5EcmF3LlRyYWNlLFxyXG4gIHtcclxuICAgIGNsYXNzTmFtZTogXCJsZWFmbGV0LWRyYXctZHJhdy1wb2x5bGluZVwiLFxyXG4gICAgdG9vbHRpcDogTC5kcmF3TG9jYWwuZHJhdy50b29sYmFyLmJ1dHRvbnMucG9seWxpbmUsXHJcbiAgfSxcclxuICBuZXcgTC5Ub29sYmFyMih7IGFjdGlvbnM6IFtMLlRvb2xiYXIyLkRyYXdBY3Rpb24uQ2FuY2VsVHJhY2VdIH0pXHJcbikuZXh0ZW5kKHtcclxuICBvcHRpb25zOiB7XHJcbiAgICB0b29sYmFySWNvbjoge1xyXG4gICAgICBjbGFzc05hbWU6IFwidHJhY2UtbGluZVwiLFxyXG4gICAgICBodG1sOiBsaW5lLFxyXG4gICAgICB0b29sdGlwOiBcIkRyYXcgYSBsaW5lXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuTC5Ub29sYmFyMi5EcmF3QWN0aW9uLlNlbGVjdCA9IEwuVG9vbGJhcjIuRHJhd0FjdGlvbi5mcm9tSGFuZGxlcihcclxuICBMLkRyYXcuU2VsZWN0LFxyXG4gIHtcclxuICAgIGNsYXNzTmFtZTogXCJsZWFmbGV0LWRyYXctZHJhdy1yZWN0YW5nbGVcIixcclxuICAgIHRvb2x0aXA6IEwuZHJhd0xvY2FsLmRyYXcudG9vbGJhci5idXR0b25zLnJlY3RhbmdsZSxcclxuICB9LFxyXG4gIG5ldyBMLlRvb2xiYXIyKHsgYWN0aW9uczogW0wuVG9vbGJhcjIuRHJhd0FjdGlvbi5DYW5jZWxdIH0pXHJcbikuZXh0ZW5kKHtcclxuICBvcHRpb25zOiB7XHJcbiAgICB0b29sYmFySWNvbjoge1xyXG4gICAgICBodG1sOiBzZWxlY3QsXHJcbiAgICAgIHRvb2x0aXA6IFwiU2VsZWN0IGEgbGluZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcbkwuVG9vbGJhcjIuRHJhd0FjdGlvbi5SZW1vdmVTZWxlY3QgPSBMLlRvb2xiYXIyLkFjdGlvbi5leHRlbmQoe1xyXG4gIG9wdGlvbnM6IHtcclxuICAgIHRvb2xiYXJJY29uOiB7XHJcbiAgICAgIGh0bWw6IHVuc2VsZWN0LFxyXG4gICAgICB0b29sdGlwOiBcIlVuLXNlbGVjdCB0aGUgbGluZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChtYXApIHtcclxuICAgIHRoaXMuX21hcCA9IG1hcDtcclxuXHJcbiAgICBMLlRvb2xiYXIyLkFjdGlvbi5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIGFkZEhvb2tzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgcztcclxuICAgIHRoaXMuX21hcC5lYWNoTGF5ZXIoZnVuY3Rpb24gKGxheWVyKSB7XHJcbiAgICAgIGlmIChsYXllci5vcHRpb25zLm5hbWUgJiYgbGF5ZXIub3B0aW9ucy5uYW1lID09IFwic2VsZWN0ZWRcIikge1xyXG4gICAgICAgIHMgPSBsYXllcjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gcztcclxuXHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xyXG4gICAgICB0aGlzLl9tYXAuYWxtb3N0T3Zlci5yZW1vdmVMYXllcih0aGlzLnNlbGVjdGVkKTtcclxuICAgICAgdGhpcy5fbWFwLnJlbW92ZUxheWVyKHRoaXMuc2VsZWN0ZWQpO1xyXG4gICAgICBkaXNhYmxlU2VsZWN0KCk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5MLlRvb2xiYXIyLlRyYWNlID0gTC5Ub29sYmFyMi5Db250cm9sLmV4dGVuZCh7XHJcbiAgb3B0aW9uczoge1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBMLlRvb2xiYXIyLkRyYXdBY3Rpb24uU2VsZWN0LFxyXG4gICAgICBMLlRvb2xiYXIyLkRyYXdBY3Rpb24uUmVtb3ZlU2VsZWN0LFxyXG4gICAgICBMLlRvb2xiYXIyLkRyYXdBY3Rpb24uVHJhY2VcclxuICAgIF0sXHJcbiAgfSxcclxufSk7XHJcblxyXG5jb25zdCBkaXNhYmxlU2VsZWN0ID0gKCkgPT4ge1xyXG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0cmFjZS1saW5lXCIpWzBdO1xyXG5cclxuICAvLyBkaXNhYmxlIGJ1dHRvblxyXG4gIGJ1dHRvbi5vbkNsaWNrID0gXCJwcmV2ZW50RXZlbnREZWZhdWx0KCk7IHJldHVybiBmYWxzZVwiO1xyXG4gIGJ1dHRvbi5jbGFzc05hbWUgPSBcInRyYWNlLWxpbmUgbGVhZmxldC10b29sYmFyLWljb24gZHJhdy1jb250cm9sLWRpc2FibGVkXCI7XHJcbn07XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==