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

/***/ "./node_modules/css-loader/dist/cjs.js!./src/leaflet-draw-toolbar/leaflet.draw-toolbar.css":
/*!*************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/leaflet-draw-toolbar/leaflet.draw-toolbar.css ***!
  \*************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! images/spritesheet.png */ "./src/leaflet-draw-toolbar/images/spritesheet.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! images/spritesheet-2x.png */ "./src/leaflet-draw-toolbar/images/spritesheet-2x.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".leaflet-draw-toolbar.leaflet-control-toolbar {\n  margin-top: 12px;\n}\n.leaflet-draw-toolbar a {\n  background-image: none;\n  background-repeat: no-repeat;\n}\n.leaflet-retina .leaflet-draw-toolbar a {\n  background-image: none;\n  background-size: 300px 30px;\n}\n.leaflet-draw-toolbar .leaflet-draw-edit-edit,\n.leaflet-draw-toolbar .leaflet-draw-edit-remove,\n.leaflet-draw-toolbar .leaflet-draw-draw-polygon,\n.leaflet-draw-toolbar .leaflet-draw-draw-polyline,\n.leaflet-draw-toolbar .leaflet-draw-draw-circle,\n.leaflet-draw-toolbar .leaflet-draw-draw-marker,\n.leaflet-draw-toolbar .leaflet-draw-draw-rectangle {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-repeat: no-repeat;\n}\n.leaflet-retina .leaflet-draw-toolbar .leaflet-draw-edit-edit,\n.leaflet-retina .leaflet-draw-toolbar .leaflet-draw-edit-remove,\n.leaflet-retina .leaflet-draw-toolbar .leaflet-draw-draw-polygon,\n.leaflet-retina .leaflet-draw-toolbar .leaflet-draw-draw-polyline,\n.leaflet-retina .leaflet-draw-toolbar .leaflet-draw-draw-circle,\n.leaflet-retina .leaflet-draw-toolbar .leaflet-draw-draw-marker,\n.leaflet-retina .leaflet-draw-toolbar .leaflet-draw-draw-rectangle {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  background-size: 300px 30px;\n}\n", "",{"version":3,"sources":["webpack://./src/leaflet-draw-toolbar/leaflet.draw-toolbar.css"],"names":[],"mappings":"AAAA;EACE,gBAAgB;AAClB;AACA;EACE,sBAAsB;EACtB,4BAA4B;AAC9B;AACA;EACE,sBAAsB;EACtB,2BAA2B;AAC7B;AACA;;;;;;;EAOE,yDAA+C;EAC/C,4BAA4B;AAC9B;AACA;;;;;;;EAOE,yDAAkD;EAClD,2BAA2B;AAC7B","sourcesContent":[".leaflet-draw-toolbar.leaflet-control-toolbar {\n  margin-top: 12px;\n}\n.leaflet-draw-toolbar a {\n  background-image: none;\n  background-repeat: no-repeat;\n}\n.leaflet-retina .leaflet-draw-toolbar a {\n  background-image: none;\n  background-size: 300px 30px;\n}\n.leaflet-draw-toolbar .leaflet-draw-edit-edit,\n.leaflet-draw-toolbar .leaflet-draw-edit-remove,\n.leaflet-draw-toolbar .leaflet-draw-draw-polygon,\n.leaflet-draw-toolbar .leaflet-draw-draw-polyline,\n.leaflet-draw-toolbar .leaflet-draw-draw-circle,\n.leaflet-draw-toolbar .leaflet-draw-draw-marker,\n.leaflet-draw-toolbar .leaflet-draw-draw-rectangle {\n  background-image: url('images/spritesheet.png');\n  background-repeat: no-repeat;\n}\n.leaflet-retina .leaflet-draw-toolbar .leaflet-draw-edit-edit,\n.leaflet-retina .leaflet-draw-toolbar .leaflet-draw-edit-remove,\n.leaflet-retina .leaflet-draw-toolbar .leaflet-draw-draw-polygon,\n.leaflet-retina .leaflet-draw-toolbar .leaflet-draw-draw-polyline,\n.leaflet-retina .leaflet-draw-toolbar .leaflet-draw-draw-circle,\n.leaflet-retina .leaflet-draw-toolbar .leaflet-draw-draw-marker,\n.leaflet-retina .leaflet-draw-toolbar .leaflet-draw-draw-rectangle {\n  background-image: url('images/spritesheet-2x.png');\n  background-size: 300px 30px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

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

/***/ "./src/leaflet-draw-toolbar/leaflet.draw-toolbar.css":
/*!***********************************************************!*\
  !*** ./src/leaflet-draw-toolbar/leaflet.draw-toolbar.css ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_leaflet_draw_toolbar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./leaflet.draw-toolbar.css */ "./node_modules/css-loader/dist/cjs.js!./src/leaflet-draw-toolbar/leaflet.draw-toolbar.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_leaflet_draw_toolbar_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_leaflet_draw_toolbar_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_leaflet_draw_toolbar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_leaflet_draw_toolbar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/Leaflet.AlmostOver/src/leaflet.almostover.js":
/*!**********************************************************!*\
  !*** ./src/Leaflet.AlmostOver/src/leaflet.almostover.js ***!
  \**********************************************************/
/***/ (() => {

L.Map.mergeOptions({
    // @option almostOver: Boolean = true
    // Set it to false to disable this plugin
    almostOver: true,
    // @option almostDistance: Number = 25
    // Tolerance in pixels
    almostDistance: 25,   // pixels
    // @option almostSamplingPeriod: Number = 50
    // To reduce the 'mousemove' event frequency. In milliseconds
    almostSamplingPeriod: 50,  // ms
    // @option almostOnMouseMove Boolean = true
    // Set it to false to disable track 'mousemove' events and improve performance
    // if AlmostOver is only need for 'click' events.
    almostOnMouseMove: true,
});


L.Handler.AlmostOver = L.Handler.extend({

    includes: L.Evented || L.Mixin.Events,

    initialize: function (map) {
        this._map = map;
        this._layers = [];
        this._previous = null;
        this._marker = null;
        this._buffer = 0;

        // Reduce 'mousemove' event frequency
        this.__mouseMoveSampling = (function () {
            var timer = new Date();
            return function (e) {
                var date = new Date(),
                    filtered = (date - timer) < this._map.options.almostSamplingPeriod;
                if (filtered || this._layers.length === 0) {
                    return;  // Ignore movement
                }
                timer = date;
                this._map.fire('mousemovesample', {latlng: e.latlng});
            };
        })();
    },

    addHooks: function () {
        if (this._map.options.almostOnMouseMove) {
            this._map.on('mousemove', this.__mouseMoveSampling, this);
            this._map.on('mousemovesample', this._onMouseMove, this);
        }
        this._map.on('click dblclick', this._onMouseClick, this);

        var map = this._map;
        function computeBuffer() {
            this._buffer = this._map.layerPointToLatLng([0, 0]).lat -
                           this._map.layerPointToLatLng([this._map.options.almostDistance,
                                                         this._map.options.almostDistance]).lat;
        }
        this._map.on('viewreset zoomend', computeBuffer, this);
        this._map.whenReady(computeBuffer, this);
    },

    removeHooks: function () {
        this._map.off('mousemovesample');
        this._map.off('mousemove', this.__mouseMoveSampling, this);
        this._map.off('click dblclick', this._onMouseClick, this);
    },

    addLayer: function (layer) {
        if (typeof layer.eachLayer == 'function') {
            layer.eachLayer(function (l) {
                this.addLayer(l);
            }, this);
        }
        else {
            if (typeof this.indexLayer == 'function') {
                this.indexLayer(layer);
            }
            this._layers.push(layer);
        }
    },

    removeLayer: function (layer) {
        if (typeof layer.eachLayer == 'function') {
            layer.eachLayer(function (l) {
                this.removeLayer(l);
            }, this);
        }
        else {
            if (typeof this.unindexLayer == 'function') {
                this.unindexLayer(layer);
            }
            var index = this._layers.indexOf(layer);
            if (0 <= index) {
                this._layers.splice(index, 1);
            }
        }
        this._previous = null;
    },

    getClosest: function (latlng) {
        var snapfunc = L.GeometryUtil.closestLayerSnap,
            distance = this._map.options.almostDistance;

        var snaplist = [];
        if (typeof this.searchBuffer == 'function') {
            snaplist = this.searchBuffer(latlng, this._buffer);
        }
        else {
            snaplist = this._layers;
        }
        return snapfunc(this._map, snaplist, latlng, distance, false);
    },

    _onMouseMove: function (e) {
        var closest = this.getClosest(e.latlng);
        if (closest) {
            if (!this._previous) {
                this._map.fire('almost:over', {layer: closest.layer,
                                               latlng: closest.latlng});
            }
            else if (L.stamp(this._previous.layer) != L.stamp(closest.layer)) {
                this._map.fire('almost:out', {layer: this._previous.layer});
                this._map.fire('almost:over', {layer: closest.layer,
                                               latlng: closest.latlng});
            }

            this._map.fire('almost:move', {layer: closest.layer,
                                           latlng: closest.latlng});
        }
        else {
            if (this._previous) {
                this._map.fire('almost:out', {layer: this._previous.layer});
            }
        }
        this._previous = closest;
    },

    _onMouseClick: function (e) {
        var closest = this.getClosest(e.latlng);
        if (closest) {
            this._map.fire('almost:' + e.type, {layer: closest.layer,
                                                latlng: closest.latlng});
        }
    },
});

if (L.LayerIndexMixin !== undefined) {
    L.Handler.AlmostOver.include(L.LayerIndexMixin);
}

L.Map.addInitHook('addHandler', 'almostOver', L.Handler.AlmostOver);


/***/ }),

/***/ "./src/leaflet-draw-toolbar/leaflet.draw-toolbar.js":
/*!**********************************************************!*\
  !*** ./src/leaflet-draw-toolbar/leaflet.draw-toolbar.js ***!
  \**********************************************************/
/***/ (() => {

(function(window, document, undefined) {

"use strict";

L.Toolbar2.DrawAction = {
    fromHandler: function(Handler, defaultToolbarIcon, defaultSubToolbar) {
        return L.Toolbar2.Action.extend({
            options: {
                toolbarIcon: L.extend({}, L.Toolbar2.Action.prototype.options.toolbarIcon, defaultToolbarIcon),
                subToolbar: defaultSubToolbar ? defaultSubToolbar : L.Toolbar2.Action.prototype.options.subToolbar
            },

            initialize: function(map, options) {
                var action = this;

                this._handler = new Handler(map, options);
                this._handler.on('disabled', function() {
                    action.disable();
                });

                L.Toolbar2.Action.prototype.initialize.call(this, options);
            },

            enable: function(e) {
                this._handler.enable();
                L.Toolbar2.Action.prototype.enable.call(this, e);
            },

            disable: function() {
                this._handler.disable();
                L.Toolbar2.Action.prototype.disable.call(this);
            },

            setOptions: function(options) {
                this._handler.setOptions(options);
                L.Toolbar2.Action.prototype.setOptions.call(this, options);
            },
        });
    }
};

L.Toolbar2.DrawAction.Cancel = L.Toolbar2.Action.extend({
	options: {
		toolbarIcon: { html: 'Cancel' }
	},

	initialize: function (map, drawing) {
		this.drawing = drawing;
		L.Toolbar2.Action.prototype.initialize.call(this);
	},

	addHooks: function () {
		this.drawing.disable();
		this.disable();
	}
});

// NOTE: This subaction is only appropriate for actions which have a deleteLastVertex method.
L.Toolbar2.DrawAction.RemoveLastPoint = L.Toolbar2.Action.extend({
	options: {
		toolbarIcon: { html: L.drawLocal.draw.toolbar.undo.text }
	},

	initialize: function (map, drawing) {
		this.drawing = drawing;
		L.Toolbar2.Action.prototype.initialize.call(this);
	},

	addHooks: function () {
		this.drawing.deleteLastVertex();
		this.disable();
	}
});

L.Toolbar2.DrawAction.Circle = L.Toolbar2.DrawAction.fromHandler(
    L.Draw.Circle,
    {
        className: 'leaflet-draw-draw-circle',
        tooltip: L.drawLocal.draw.toolbar.buttons.circle
    },
    new L.Toolbar2({ actions: [L.Toolbar2.DrawAction.Cancel] })
);

L.Toolbar2.DrawAction.Marker = L.Toolbar2.DrawAction.fromHandler(
    L.Draw.Marker,
    {
        className: 'leaflet-draw-draw-marker',
        tooltip: L.drawLocal.draw.toolbar.buttons.marker
    },
	new L.Toolbar2({ actions: [L.Toolbar2.DrawAction.Cancel] })
);

L.Toolbar2.DrawAction.Polygon = L.Toolbar2.DrawAction.fromHandler(
    L.Draw.Polygon,
    {
        className: 'leaflet-draw-draw-polygon',
        tooltip: L.drawLocal.draw.toolbar.buttons.polygon
    },
	new L.Toolbar2({ actions: [L.Toolbar2.DrawAction.Cancel, L.Toolbar2.DrawAction.RemoveLastPoint] })
);

// Support for DrawAction.RemoveLastPoint.
L.Toolbar2.DrawAction.Polygon.prototype.deleteLastVertex = function() {
    this._handler.deleteLastVertex();
}

L.Toolbar2.DrawAction.Polyline = L.Toolbar2.DrawAction.fromHandler(
    L.Draw.Polyline,
    {
        className: 'leaflet-draw-draw-polyline',
        tooltip: L.drawLocal.draw.toolbar.buttons.polyline
    },
	new L.Toolbar2({ actions: [L.Toolbar2.DrawAction.Cancel, L.Toolbar2.DrawAction.RemoveLastPoint] })
);

// Support for DrawAction.RemoveLastPoint.
L.Toolbar2.DrawAction.Polyline.prototype.deleteLastVertex = function() {
    this._handler.deleteLastVertex();
}

L.Toolbar2.DrawAction.Rectangle = L.Toolbar2.DrawAction.fromHandler(
    L.Draw.Rectangle,
    {
        className: 'leaflet-draw-draw-rectangle',
        tooltip: L.drawLocal.draw.toolbar.buttons.rectangle
    },
	new L.Toolbar2({ actions: [L.Toolbar2.DrawAction.Cancel] })
);

L.Toolbar2.DrawToolbar = L.Toolbar2.Control.extend({
	options: {
		actions: [
			L.Toolbar2.DrawAction.Polygon,
			L.Toolbar2.DrawAction.Polyline,
			L.Toolbar2.DrawAction.Marker,
			L.Toolbar2.DrawAction.Rectangle,
			L.Toolbar2.DrawAction.Circle
		],
		className: 'leaflet-draw-toolbar'
	}
});

L.Toolbar2.EditToolbar = {};

L.Toolbar2.EditAction = {
    fromHandler: function(Handler, defaultToolbarIcon, defaultSubToolbar) {
        return L.Toolbar2.Action.extend({
            options: {
                toolbarIcon: L.extend({}, L.Toolbar2.Action.prototype.options.toolbarIcon, defaultToolbarIcon),
                subToolbar: defaultSubToolbar ? defaultSubToolbar : L.Toolbar2.Action.prototype.options.subToolbar
            },

            initialize: function(map, featureGroup, options) {
                var action = this;

                options = options || {};
                options.featureGroup = featureGroup;

                this._handler = new Handler(map, options);
                this._handler.on('disabled', function() {
                    action.disable();
                });

                L.Toolbar2.Action.prototype.initialize.call(this, options);
            },

            enable: function(e) {
                this._handler.enable();
                L.Toolbar2.Action.prototype.enable.call(this, e);
            },

            disable: function() {
                this._handler.disable();
                L.Toolbar2.Action.prototype.disable.call(this);
            },

            setOptions: function(options) {
                this._handler.setOptions(options);
                L.Toolbar2.Action.prototype.setOptions.call(this, options);
            },

            // For the undo subaction.
            revertLayers: function() {
                this._handler.revertLayers();
            },

            // For the save subaction.
            save: function() {
                this._handler.save();
            }
        });
    }
};

L.Toolbar2.EditAction.Control = {};

L.Toolbar2.EditAction.Control.Save = L.Toolbar2.Action.extend({
    options: {
        toolbarIcon: { html: 'Save' }
    },
    initialize: function(map, featureGroup, editing) {
        this.editing = editing;
        L.Toolbar2.Action.prototype.initialize.call(this);
    },
    addHooks: function() {
        this.editing.save();
        this.editing.disable();
    }
});

L.Toolbar2.EditAction.Control.Undo = L.Toolbar2.Action.extend({
    options: {
        toolbarIcon: { html: 'Undo' }
    },
    initialize: function(map, featureGroup, editing) {
        this.editing = editing;
        L.Toolbar2.Action.prototype.initialize.call(this);
    },
    addHooks: function() {
        this.editing.revertLayers();
        this.editing.disable();
    }
});


L.Toolbar2.EditAction.Control.Edit = L.Toolbar2.EditAction.fromHandler(
    L.EditToolbar.Edit,
    {
        className: 'leaflet-draw-edit-edit',
        tooltip: 'Edit features'
    },
    new L.Toolbar2({
        actions: [
            L.Toolbar2.EditAction.Control.Save,
            L.Toolbar2.EditAction.Control.Undo
        ]
    })
);

L.Toolbar2.EditAction.Control.Delete = L.Toolbar2.EditAction.fromHandler(
    L.EditToolbar.Delete,
    {
        className: 'leaflet-draw-edit-remove',
        tooltip: 'Remove features'
    },
    new L.Toolbar2({
        actions: [
            L.Toolbar2.EditAction.Control.Save,
            L.Toolbar2.EditAction.Control.Undo
        ]
    })
);

L.Toolbar2.EditToolbar.Control = L.Toolbar2.Control.extend({
    options: {
        actions: [
            L.Toolbar2.EditAction.Control.Edit,
            L.Toolbar2.EditAction.Control.Delete
        ],
        className: 'leaflet-draw-toolbar',
    }
});

L.Toolbar2.EditAction.Popup = {};

L.Toolbar2.EditAction.Popup.Edit = L.Toolbar2.Action.extend({
	options: {
		toolbarIcon: { className: 'leaflet-draw-edit-edit' }
	},

	initialize: function (map, shape, options) {
		this._map = map;

		this._shape = shape;
		this._shape.options.editing = this._shape.options.editing || {};

		L.Toolbar2.Action.prototype.initialize.call(this, map, options);
	},

	enable: function () {
		var map = this._map,
			shape = this._shape;

		shape.editing.enable();
		map.removeLayer(this.toolbar);
		
		map.on('click', function () {
			this.save();
			shape.editing.disable();
		}, this);
	},

	save: function() {
		var map = this._map,
			shape = this._shape;

		if (shape.edited) {
			map.fire(L.Draw.Event.EDITED, { layers: L.layerGroup([shape]) });
		}
		shape.edited = false;
	}
});

L.Toolbar2.EditAction.Popup.Delete = L.Toolbar2.Action.extend({
	options: {
		toolbarIcon: { className: 'leaflet-draw-edit-remove' }
	},

	initialize: function (map, shape, options) {
		this._map = map;
		this._shape = shape;

		L.Toolbar2.Action.prototype.initialize.call(this, map, options);
	},

	addHooks: function () {
		var map = this._map;

		map.removeLayer(this._shape);
		map.removeLayer(this.toolbar);

		console.log('firing draw:deleted');
		map.fire(L.Draw.Event.DELETED, { layers: L.layerGroup([this._shape]) });
	}
});

L.Toolbar2.EditToolbar.Popup = L.Toolbar2.Popup.extend({
	options: {
		actions: [
			L.Toolbar2.EditAction.Popup.Edit,
			L.Toolbar2.EditAction.Popup.Delete
		],
        className: 'leaflet-draw-toolbar'
	},

	onAdd: function (map) {
		var shape = this._arguments[1];

		if (shape instanceof L.Marker) {
			/* Adjust the toolbar position so that it doesn't cover the marker. */
			this.options.anchor = L.point(shape.options.icon.options.popupAnchor);
		}

		L.Toolbar2.Popup.prototype.onAdd.call(this, map);
	}
});


})(window, document);

/***/ }),

/***/ "./src/leaflet-draw-toolbar/images/spritesheet-2x.png":
/*!************************************************************!*\
  !*** ./src/leaflet-draw-toolbar/images/spritesheet-2x.png ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7ea3a6d428136b87ab95.png";

/***/ }),

/***/ "./src/leaflet-draw-toolbar/images/spritesheet.png":
/*!*********************************************************!*\
  !*** ./src/leaflet-draw-toolbar/images/spritesheet.png ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ef32ea2bdf63ba132b4c.png";

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
/******/ 			id: moduleId,
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
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
/* harmony import */ var _Leaflet_AlmostOver_src_leaflet_almostover_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Leaflet.AlmostOver/src/leaflet.almostover.js */ "./src/Leaflet.AlmostOver/src/leaflet.almostover.js");
/* harmony import */ var _Leaflet_AlmostOver_src_leaflet_almostover_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Leaflet_AlmostOver_src_leaflet_almostover_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _leaflet_draw_toolbar_leaflet_draw_toolbar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./leaflet-draw-toolbar/leaflet.draw-toolbar.js */ "./src/leaflet-draw-toolbar/leaflet.draw-toolbar.js");
/* harmony import */ var _leaflet_draw_toolbar_leaflet_draw_toolbar_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_leaflet_draw_toolbar_leaflet_draw_toolbar_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _leaflet_draw_toolbar_leaflet_draw_toolbar_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./leaflet-draw-toolbar/leaflet.draw-toolbar.css */ "./src/leaflet-draw-toolbar/leaflet.draw-toolbar.css");
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/dist/es/index.js");
/* harmony import */ var _turf_boolean_intersects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @turf/boolean-intersects */ "./node_modules/@turf/boolean-intersects/dist/es/index.js");








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

    const selectPoly = (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_3__.polygon)(latlngs);
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
        const intersect = (0,_turf_boolean_intersects__WEBPACK_IMPORTED_MODULE_4__["default"])(rect, line);
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
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_3__.lineString)(latlngs);
    } else if (lineType == "MultiLineString") {
      return (0,_turf_helpers__WEBPACK_IMPORTED_MODULE_3__.multiLineString)(latlngs);
    }
    return line;
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
      html: "",
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
      html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="" /</svg>`,
      tooltip: "Select a line",
    },
  },
});

L.Toolbar2.DrawAction.RemoveSelect = L.Toolbar2.Action.extend({
  options: {
    toolbarIcon: {
      html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="" /</svg>`,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBLEdBQUc7QUFDSCxtQkFBbUIseUNBQXlDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL2Jib3gvZGlzdC9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL2hlbHBlcnMvZGlzdC9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL21ldGEvZGlzdC9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vc3JjL2xlYWZsZXQtZHJhdy10b29sYmFyL2xlYWZsZXQuZHJhdy10b29sYmFyLmNzcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL25vZGVfbW9kdWxlcy9nZW9qc29uLXJidXNoL2luZGV4LmpzIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2UvLi9ub2RlX21vZHVsZXMvcmJ1c2gvcmJ1c2gubWluLmpzIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2UvLi9zcmMvbGVhZmxldC1kcmF3LXRvb2xiYXIvbGVhZmxldC5kcmF3LXRvb2xiYXIuY3NzP2VjZjkiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2UvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2UvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vc3JjL0xlYWZsZXQuQWxtb3N0T3Zlci9zcmMvbGVhZmxldC5hbG1vc3RvdmVyLmpzIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2UvLi9zcmMvbGVhZmxldC1kcmF3LXRvb2xiYXIvbGVhZmxldC5kcmF3LXRvb2xiYXIuanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL25vZGVfbW9kdWxlcy9AdHVyZi9ib29sZWFuLWRpc2pvaW50L2Rpc3QvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL25vZGVfbW9kdWxlcy9AdHVyZi9ib29sZWFuLWludGVyc2VjdHMvZGlzdC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL2Jvb2xlYW4tcG9pbnQtaW4tcG9seWdvbi9kaXN0L2VzL2luZGV4LmpzIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2UvLi9ub2RlX21vZHVsZXMvQHR1cmYvaGVscGVycy9kaXN0L2VzL2luZGV4LmpzIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2UvLi9ub2RlX21vZHVsZXMvQHR1cmYvaW52YXJpYW50L2Rpc3QvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL25vZGVfbW9kdWxlcy9AdHVyZi9saW5lLWludGVyc2VjdC9kaXN0L2VzL2luZGV4LmpzIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2UvLi9ub2RlX21vZHVsZXMvQHR1cmYvbGluZS1zZWdtZW50L2Rpc3QvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL25vZGVfbW9kdWxlcy9AdHVyZi9tZXRhL2Rpc3QvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL25vZGVfbW9kdWxlcy9AdHVyZi9wb2x5Z29uLXRvLWxpbmUvZGlzdC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2Uvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2Uvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2UvLi9zcmMvbGVhZmxldC50cmFjZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtZXRhXzEgPSByZXF1aXJlKFwiQHR1cmYvbWV0YVwiKTtcbi8qKlxuICogVGFrZXMgYSBzZXQgb2YgZmVhdHVyZXMsIGNhbGN1bGF0ZXMgdGhlIGJib3ggb2YgYWxsIGlucHV0IGZlYXR1cmVzLCBhbmQgcmV0dXJucyBhIGJvdW5kaW5nIGJveC5cbiAqXG4gKiBAbmFtZSBiYm94XG4gKiBAcGFyYW0ge0dlb0pTT059IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcmV0dXJucyB7QkJveH0gYmJveCBleHRlbnQgaW4gW21pblgsIG1pblksIG1heFgsIG1heFldIG9yZGVyXG4gKiBAZXhhbXBsZVxuICogdmFyIGxpbmUgPSB0dXJmLmxpbmVTdHJpbmcoW1stNzQsIDQwXSwgWy03OCwgNDJdLCBbLTgyLCAzNV1dKTtcbiAqIHZhciBiYm94ID0gdHVyZi5iYm94KGxpbmUpO1xuICogdmFyIGJib3hQb2x5Z29uID0gdHVyZi5iYm94UG9seWdvbihiYm94KTtcbiAqXG4gKiAvL2FkZFRvTWFwXG4gKiB2YXIgYWRkVG9NYXAgPSBbbGluZSwgYmJveFBvbHlnb25dXG4gKi9cbmZ1bmN0aW9uIGJib3goZ2VvanNvbikge1xuICAgIHZhciByZXN1bHQgPSBbSW5maW5pdHksIEluZmluaXR5LCAtSW5maW5pdHksIC1JbmZpbml0eV07XG4gICAgbWV0YV8xLmNvb3JkRWFjaChnZW9qc29uLCBmdW5jdGlvbiAoY29vcmQpIHtcbiAgICAgICAgaWYgKHJlc3VsdFswXSA+IGNvb3JkWzBdKSB7XG4gICAgICAgICAgICByZXN1bHRbMF0gPSBjb29yZFswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0WzFdID4gY29vcmRbMV0pIHtcbiAgICAgICAgICAgIHJlc3VsdFsxXSA9IGNvb3JkWzFdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHRbMl0gPCBjb29yZFswXSkge1xuICAgICAgICAgICAgcmVzdWx0WzJdID0gY29vcmRbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdFszXSA8IGNvb3JkWzFdKSB7XG4gICAgICAgICAgICByZXN1bHRbM10gPSBjb29yZFsxXTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5iYm94W1wiZGVmYXVsdFwiXSA9IGJib3g7XG5leHBvcnRzLmRlZmF1bHQgPSBiYm94O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEBtb2R1bGUgaGVscGVyc1xuICovXG4vKipcbiAqIEVhcnRoIFJhZGl1cyB1c2VkIHdpdGggdGhlIEhhcnZlc2luZSBmb3JtdWxhIGFuZCBhcHByb3hpbWF0ZXMgdXNpbmcgYSBzcGhlcmljYWwgKG5vbi1lbGxpcHNvaWQpIEVhcnRoLlxuICpcbiAqIEBtZW1iZXJvZiBoZWxwZXJzXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5leHBvcnRzLmVhcnRoUmFkaXVzID0gNjM3MTAwOC44O1xuLyoqXG4gKiBVbml0IG9mIG1lYXN1cmVtZW50IGZhY3RvcnMgdXNpbmcgYSBzcGhlcmljYWwgKG5vbi1lbGxpcHNvaWQpIGVhcnRoIHJhZGl1cy5cbiAqXG4gKiBAbWVtYmVyb2YgaGVscGVyc1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0cy5mYWN0b3JzID0ge1xuICAgIGNlbnRpbWV0ZXJzOiBleHBvcnRzLmVhcnRoUmFkaXVzICogMTAwLFxuICAgIGNlbnRpbWV0cmVzOiBleHBvcnRzLmVhcnRoUmFkaXVzICogMTAwLFxuICAgIGRlZ3JlZXM6IGV4cG9ydHMuZWFydGhSYWRpdXMgLyAxMTEzMjUsXG4gICAgZmVldDogZXhwb3J0cy5lYXJ0aFJhZGl1cyAqIDMuMjgwODQsXG4gICAgaW5jaGVzOiBleHBvcnRzLmVhcnRoUmFkaXVzICogMzkuMzcsXG4gICAga2lsb21ldGVyczogZXhwb3J0cy5lYXJ0aFJhZGl1cyAvIDEwMDAsXG4gICAga2lsb21ldHJlczogZXhwb3J0cy5lYXJ0aFJhZGl1cyAvIDEwMDAsXG4gICAgbWV0ZXJzOiBleHBvcnRzLmVhcnRoUmFkaXVzLFxuICAgIG1ldHJlczogZXhwb3J0cy5lYXJ0aFJhZGl1cyxcbiAgICBtaWxlczogZXhwb3J0cy5lYXJ0aFJhZGl1cyAvIDE2MDkuMzQ0LFxuICAgIG1pbGxpbWV0ZXJzOiBleHBvcnRzLmVhcnRoUmFkaXVzICogMTAwMCxcbiAgICBtaWxsaW1ldHJlczogZXhwb3J0cy5lYXJ0aFJhZGl1cyAqIDEwMDAsXG4gICAgbmF1dGljYWxtaWxlczogZXhwb3J0cy5lYXJ0aFJhZGl1cyAvIDE4NTIsXG4gICAgcmFkaWFuczogMSxcbiAgICB5YXJkczogZXhwb3J0cy5lYXJ0aFJhZGl1cyAqIDEuMDkzNixcbn07XG4vKipcbiAqIFVuaXRzIG9mIG1lYXN1cmVtZW50IGZhY3RvcnMgYmFzZWQgb24gMSBtZXRlci5cbiAqXG4gKiBAbWVtYmVyb2YgaGVscGVyc1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0cy51bml0c0ZhY3RvcnMgPSB7XG4gICAgY2VudGltZXRlcnM6IDEwMCxcbiAgICBjZW50aW1ldHJlczogMTAwLFxuICAgIGRlZ3JlZXM6IDEgLyAxMTEzMjUsXG4gICAgZmVldDogMy4yODA4NCxcbiAgICBpbmNoZXM6IDM5LjM3LFxuICAgIGtpbG9tZXRlcnM6IDEgLyAxMDAwLFxuICAgIGtpbG9tZXRyZXM6IDEgLyAxMDAwLFxuICAgIG1ldGVyczogMSxcbiAgICBtZXRyZXM6IDEsXG4gICAgbWlsZXM6IDEgLyAxNjA5LjM0NCxcbiAgICBtaWxsaW1ldGVyczogMTAwMCxcbiAgICBtaWxsaW1ldHJlczogMTAwMCxcbiAgICBuYXV0aWNhbG1pbGVzOiAxIC8gMTg1MixcbiAgICByYWRpYW5zOiAxIC8gZXhwb3J0cy5lYXJ0aFJhZGl1cyxcbiAgICB5YXJkczogMS4wOTM2MTMzLFxufTtcbi8qKlxuICogQXJlYSBvZiBtZWFzdXJlbWVudCBmYWN0b3JzIGJhc2VkIG9uIDEgc3F1YXJlIG1ldGVyLlxuICpcbiAqIEBtZW1iZXJvZiBoZWxwZXJzXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnRzLmFyZWFGYWN0b3JzID0ge1xuICAgIGFjcmVzOiAwLjAwMDI0NzEwNSxcbiAgICBjZW50aW1ldGVyczogMTAwMDAsXG4gICAgY2VudGltZXRyZXM6IDEwMDAwLFxuICAgIGZlZXQ6IDEwLjc2MzkxMDQxNyxcbiAgICBoZWN0YXJlczogMC4wMDAxLFxuICAgIGluY2hlczogMTU1MC4wMDMxMDAwMDYsXG4gICAga2lsb21ldGVyczogMC4wMDAwMDEsXG4gICAga2lsb21ldHJlczogMC4wMDAwMDEsXG4gICAgbWV0ZXJzOiAxLFxuICAgIG1ldHJlczogMSxcbiAgICBtaWxlczogMy44NmUtNyxcbiAgICBtaWxsaW1ldGVyczogMTAwMDAwMCxcbiAgICBtaWxsaW1ldHJlczogMTAwMDAwMCxcbiAgICB5YXJkczogMS4xOTU5OTAwNDYsXG59O1xuLyoqXG4gKiBXcmFwcyBhIEdlb0pTT04ge0BsaW5rIEdlb21ldHJ5fSBpbiBhIEdlb0pTT04ge0BsaW5rIEZlYXR1cmV9LlxuICpcbiAqIEBuYW1lIGZlYXR1cmVcbiAqIEBwYXJhbSB7R2VvbWV0cnl9IGdlb21ldHJ5IGlucHV0IGdlb21ldHJ5XG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmV9IGEgR2VvSlNPTiBGZWF0dXJlXG4gKiBAZXhhbXBsZVxuICogdmFyIGdlb21ldHJ5ID0ge1xuICogICBcInR5cGVcIjogXCJQb2ludFwiLFxuICogICBcImNvb3JkaW5hdGVzXCI6IFsxMTAsIDUwXVxuICogfTtcbiAqXG4gKiB2YXIgZmVhdHVyZSA9IHR1cmYuZmVhdHVyZShnZW9tZXRyeSk7XG4gKlxuICogLy89ZmVhdHVyZVxuICovXG5mdW5jdGlvbiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBmZWF0ID0geyB0eXBlOiBcIkZlYXR1cmVcIiB9O1xuICAgIGlmIChvcHRpb25zLmlkID09PSAwIHx8IG9wdGlvbnMuaWQpIHtcbiAgICAgICAgZmVhdC5pZCA9IG9wdGlvbnMuaWQ7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmJib3gpIHtcbiAgICAgICAgZmVhdC5iYm94ID0gb3B0aW9ucy5iYm94O1xuICAgIH1cbiAgICBmZWF0LnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IHt9O1xuICAgIGZlYXQuZ2VvbWV0cnkgPSBnZW9tO1xuICAgIHJldHVybiBmZWF0O1xufVxuZXhwb3J0cy5mZWF0dXJlID0gZmVhdHVyZTtcbi8qKlxuICogQ3JlYXRlcyBhIEdlb0pTT04ge0BsaW5rIEdlb21ldHJ5fSBmcm9tIGEgR2VvbWV0cnkgc3RyaW5nIHR5cGUgJiBjb29yZGluYXRlcy5cbiAqIEZvciBHZW9tZXRyeUNvbGxlY3Rpb24gdHlwZSB1c2UgYGhlbHBlcnMuZ2VvbWV0cnlDb2xsZWN0aW9uYFxuICpcbiAqIEBuYW1lIGdlb21ldHJ5XG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBHZW9tZXRyeSBUeXBlXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGNvb3JkaW5hdGVzIENvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEByZXR1cm5zIHtHZW9tZXRyeX0gYSBHZW9KU09OIEdlb21ldHJ5XG4gKiBAZXhhbXBsZVxuICogdmFyIHR5cGUgPSBcIlBvaW50XCI7XG4gKiB2YXIgY29vcmRpbmF0ZXMgPSBbMTEwLCA1MF07XG4gKiB2YXIgZ2VvbWV0cnkgPSB0dXJmLmdlb21ldHJ5KHR5cGUsIGNvb3JkaW5hdGVzKTtcbiAqIC8vID0+IGdlb21ldHJ5XG4gKi9cbmZ1bmN0aW9uIGdlb21ldHJ5KHR5cGUsIGNvb3JkaW5hdGVzLCBfb3B0aW9ucykge1xuICAgIGlmIChfb3B0aW9ucyA9PT0gdm9pZCAwKSB7IF9vcHRpb25zID0ge307IH1cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcIlBvaW50XCI6XG4gICAgICAgICAgICByZXR1cm4gcG9pbnQoY29vcmRpbmF0ZXMpLmdlb21ldHJ5O1xuICAgICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgICAgICAgcmV0dXJuIGxpbmVTdHJpbmcoY29vcmRpbmF0ZXMpLmdlb21ldHJ5O1xuICAgICAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgICAgICAgcmV0dXJuIHBvbHlnb24oY29vcmRpbmF0ZXMpLmdlb21ldHJ5O1xuICAgICAgICBjYXNlIFwiTXVsdGlQb2ludFwiOlxuICAgICAgICAgICAgcmV0dXJuIG11bHRpUG9pbnQoY29vcmRpbmF0ZXMpLmdlb21ldHJ5O1xuICAgICAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6XG4gICAgICAgICAgICByZXR1cm4gbXVsdGlMaW5lU3RyaW5nKGNvb3JkaW5hdGVzKS5nZW9tZXRyeTtcbiAgICAgICAgY2FzZSBcIk11bHRpUG9seWdvblwiOlxuICAgICAgICAgICAgcmV0dXJuIG11bHRpUG9seWdvbihjb29yZGluYXRlcykuZ2VvbWV0cnk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodHlwZSArIFwiIGlzIGludmFsaWRcIik7XG4gICAgfVxufVxuZXhwb3J0cy5nZW9tZXRyeSA9IGdlb21ldHJ5O1xuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIFBvaW50fSB7QGxpbmsgRmVhdHVyZX0gZnJvbSBhIFBvc2l0aW9uLlxuICpcbiAqIEBuYW1lIHBvaW50XG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGNvb3JkaW5hdGVzIGxvbmdpdHVkZSwgbGF0aXR1ZGUgcG9zaXRpb24gKGVhY2ggaW4gZGVjaW1hbCBkZWdyZWVzKVxuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlPFBvaW50Pn0gYSBQb2ludCBmZWF0dXJlXG4gKiBAZXhhbXBsZVxuICogdmFyIHBvaW50ID0gdHVyZi5wb2ludChbLTc1LjM0MywgMzkuOTg0XSk7XG4gKlxuICogLy89cG9pbnRcbiAqL1xuZnVuY3Rpb24gcG9pbnQoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIGlmICghY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29vcmRpbmF0ZXMgaXMgcmVxdWlyZWRcIik7XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheShjb29yZGluYXRlcykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29vcmRpbmF0ZXMgbXVzdCBiZSBhbiBBcnJheVwiKTtcbiAgICB9XG4gICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29vcmRpbmF0ZXMgbXVzdCBiZSBhdCBsZWFzdCAyIG51bWJlcnMgbG9uZ1wiKTtcbiAgICB9XG4gICAgaWYgKCFpc051bWJlcihjb29yZGluYXRlc1swXSkgfHwgIWlzTnVtYmVyKGNvb3JkaW5hdGVzWzFdKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb29yZGluYXRlcyBtdXN0IGNvbnRhaW4gbnVtYmVyc1wiKTtcbiAgICB9XG4gICAgdmFyIGdlb20gPSB7XG4gICAgICAgIHR5cGU6IFwiUG9pbnRcIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzLFxuICAgIH07XG4gICAgcmV0dXJuIGZlYXR1cmUoZ2VvbSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG5leHBvcnRzLnBvaW50ID0gcG9pbnQ7XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgUG9pbnR9IHtAbGluayBGZWF0dXJlQ29sbGVjdGlvbn0gZnJvbSBhbiBBcnJheSBvZiBQb2ludCBjb29yZGluYXRlcy5cbiAqXG4gKiBAbmFtZSBwb2ludHNcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIFBvaW50c1xuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBUcmFuc2xhdGUgdGhlc2UgcHJvcGVydGllcyB0byBlYWNoIEZlYXR1cmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF1cbiAqIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlQ29sbGVjdGlvblxuICogQHJldHVybnMge0ZlYXR1cmVDb2xsZWN0aW9uPFBvaW50Pn0gUG9pbnQgRmVhdHVyZVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2ludHMgPSB0dXJmLnBvaW50cyhbXG4gKiAgIFstNzUsIDM5XSxcbiAqICAgWy04MCwgNDVdLFxuICogICBbLTc4LCA1MF1cbiAqIF0pO1xuICpcbiAqIC8vPXBvaW50c1xuICovXG5mdW5jdGlvbiBwb2ludHMoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbihjb29yZGluYXRlcy5tYXAoZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICByZXR1cm4gcG9pbnQoY29vcmRzLCBwcm9wZXJ0aWVzKTtcbiAgICB9KSwgb3B0aW9ucyk7XG59XG5leHBvcnRzLnBvaW50cyA9IHBvaW50cztcbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBQb2x5Z29ufSB7QGxpbmsgRmVhdHVyZX0gZnJvbSBhbiBBcnJheSBvZiBMaW5lYXJSaW5ncy5cbiAqXG4gKiBAbmFtZSBwb2x5Z29uXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PEFycmF5PG51bWJlcj4+Pn0gY29vcmRpbmF0ZXMgYW4gYXJyYXkgb2YgTGluZWFyUmluZ3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxQb2x5Z29uPn0gUG9seWdvbiBGZWF0dXJlXG4gKiBAZXhhbXBsZVxuICogdmFyIHBvbHlnb24gPSB0dXJmLnBvbHlnb24oW1tbLTUsIDUyXSwgWy00LCA1Nl0sIFstMiwgNTFdLCBbLTcsIDU0XSwgWy01LCA1Ml1dXSwgeyBuYW1lOiAncG9seTEnIH0pO1xuICpcbiAqIC8vPXBvbHlnb25cbiAqL1xuZnVuY3Rpb24gcG9seWdvbihjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgZm9yICh2YXIgX2kgPSAwLCBjb29yZGluYXRlc18xID0gY29vcmRpbmF0ZXM7IF9pIDwgY29vcmRpbmF0ZXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIHJpbmcgPSBjb29yZGluYXRlc18xW19pXTtcbiAgICAgICAgaWYgKHJpbmcubGVuZ3RoIDwgNCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRWFjaCBMaW5lYXJSaW5nIG9mIGEgUG9seWdvbiBtdXN0IGhhdmUgNCBvciBtb3JlIFBvc2l0aW9ucy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByaW5nW3JpbmcubGVuZ3RoIC0gMV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGZpcnN0IHBvaW50IG9mIFBvbHlnb24gY29udGFpbnMgdHdvIG51bWJlcnNcbiAgICAgICAgICAgIGlmIChyaW5nW3JpbmcubGVuZ3RoIC0gMV1bal0gIT09IHJpbmdbMF1bal0pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGaXJzdCBhbmQgbGFzdCBQb3NpdGlvbiBhcmUgbm90IGVxdWl2YWxlbnQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBnZW9tID0ge1xuICAgICAgICB0eXBlOiBcIlBvbHlnb25cIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzLFxuICAgIH07XG4gICAgcmV0dXJuIGZlYXR1cmUoZ2VvbSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG5leHBvcnRzLnBvbHlnb24gPSBwb2x5Z29uO1xuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIFBvbHlnb259IHtAbGluayBGZWF0dXJlQ29sbGVjdGlvbn0gZnJvbSBhbiBBcnJheSBvZiBQb2x5Z29uIGNvb3JkaW5hdGVzLlxuICpcbiAqIEBuYW1lIHBvbHlnb25zXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PEFycmF5PEFycmF5PG51bWJlcj4+Pj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIFBvbHlnb24gY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlQ29sbGVjdGlvblxuICogQHJldHVybnMge0ZlYXR1cmVDb2xsZWN0aW9uPFBvbHlnb24+fSBQb2x5Z29uIEZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAZXhhbXBsZVxuICogdmFyIHBvbHlnb25zID0gdHVyZi5wb2x5Z29ucyhbXG4gKiAgIFtbWy01LCA1Ml0sIFstNCwgNTZdLCBbLTIsIDUxXSwgWy03LCA1NF0sIFstNSwgNTJdXV0sXG4gKiAgIFtbWy0xNSwgNDJdLCBbLTE0LCA0Nl0sIFstMTIsIDQxXSwgWy0xNywgNDRdLCBbLTE1LCA0Ml1dXSxcbiAqIF0pO1xuICpcbiAqIC8vPXBvbHlnb25zXG4gKi9cbmZ1bmN0aW9uIHBvbHlnb25zKGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24oY29vcmRpbmF0ZXMubWFwKGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICAgICAgcmV0dXJuIHBvbHlnb24oY29vcmRzLCBwcm9wZXJ0aWVzKTtcbiAgICB9KSwgb3B0aW9ucyk7XG59XG5leHBvcnRzLnBvbHlnb25zID0gcG9seWdvbnM7XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgTGluZVN0cmluZ30ge0BsaW5rIEZlYXR1cmV9IGZyb20gYW4gQXJyYXkgb2YgUG9zaXRpb25zLlxuICpcbiAqIEBuYW1lIGxpbmVTdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIFBvc2l0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlPExpbmVTdHJpbmc+fSBMaW5lU3RyaW5nIEZlYXR1cmVcbiAqIEBleGFtcGxlXG4gKiB2YXIgbGluZXN0cmluZzEgPSB0dXJmLmxpbmVTdHJpbmcoW1stMjQsIDYzXSwgWy0yMywgNjBdLCBbLTI1LCA2NV0sIFstMjAsIDY5XV0sIHtuYW1lOiAnbGluZSAxJ30pO1xuICogdmFyIGxpbmVzdHJpbmcyID0gdHVyZi5saW5lU3RyaW5nKFtbLTE0LCA0M10sIFstMTMsIDQwXSwgWy0xNSwgNDVdLCBbLTEwLCA0OV1dLCB7bmFtZTogJ2xpbmUgMid9KTtcbiAqXG4gKiAvLz1saW5lc3RyaW5nMVxuICogLy89bGluZXN0cmluZzJcbiAqL1xuZnVuY3Rpb24gbGluZVN0cmluZyhjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29vcmRpbmF0ZXMgbXVzdCBiZSBhbiBhcnJheSBvZiB0d28gb3IgbW9yZSBwb3NpdGlvbnNcIik7XG4gICAgfVxuICAgIHZhciBnZW9tID0ge1xuICAgICAgICB0eXBlOiBcIkxpbmVTdHJpbmdcIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzLFxuICAgIH07XG4gICAgcmV0dXJuIGZlYXR1cmUoZ2VvbSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG5leHBvcnRzLmxpbmVTdHJpbmcgPSBsaW5lU3RyaW5nO1xuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIExpbmVTdHJpbmd9IHtAbGluayBGZWF0dXJlQ29sbGVjdGlvbn0gZnJvbSBhbiBBcnJheSBvZiBMaW5lU3RyaW5nIGNvb3JkaW5hdGVzLlxuICpcbiAqIEBuYW1lIGxpbmVTdHJpbmdzXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PEFycmF5PG51bWJlcj4+Pn0gY29vcmRpbmF0ZXMgYW4gYXJyYXkgb2YgTGluZWFyUmluZ3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXVxuICogYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlQ29sbGVjdGlvblxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAcmV0dXJucyB7RmVhdHVyZUNvbGxlY3Rpb248TGluZVN0cmluZz59IExpbmVTdHJpbmcgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEBleGFtcGxlXG4gKiB2YXIgbGluZXN0cmluZ3MgPSB0dXJmLmxpbmVTdHJpbmdzKFtcbiAqICAgW1stMjQsIDYzXSwgWy0yMywgNjBdLCBbLTI1LCA2NV0sIFstMjAsIDY5XV0sXG4gKiAgIFtbLTE0LCA0M10sIFstMTMsIDQwXSwgWy0xNSwgNDVdLCBbLTEwLCA0OV1dXG4gKiBdKTtcbiAqXG4gKiAvLz1saW5lc3RyaW5nc1xuICovXG5mdW5jdGlvbiBsaW5lU3RyaW5ncyhjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKGNvb3JkaW5hdGVzLm1hcChmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgICAgIHJldHVybiBsaW5lU3RyaW5nKGNvb3JkcywgcHJvcGVydGllcyk7XG4gICAgfSksIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5saW5lU3RyaW5ncyA9IGxpbmVTdHJpbmdzO1xuLyoqXG4gKiBUYWtlcyBvbmUgb3IgbW9yZSB7QGxpbmsgRmVhdHVyZXxGZWF0dXJlc30gYW5kIGNyZWF0ZXMgYSB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259LlxuICpcbiAqIEBuYW1lIGZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0ZlYXR1cmVbXX0gZmVhdHVyZXMgaW5wdXQgZmVhdHVyZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmVDb2xsZWN0aW9ufSBGZWF0dXJlQ29sbGVjdGlvbiBvZiBGZWF0dXJlc1xuICogQGV4YW1wbGVcbiAqIHZhciBsb2NhdGlvbkEgPSB0dXJmLnBvaW50KFstNzUuMzQzLCAzOS45ODRdLCB7bmFtZTogJ0xvY2F0aW9uIEEnfSk7XG4gKiB2YXIgbG9jYXRpb25CID0gdHVyZi5wb2ludChbLTc1LjgzMywgMzkuMjg0XSwge25hbWU6ICdMb2NhdGlvbiBCJ30pO1xuICogdmFyIGxvY2F0aW9uQyA9IHR1cmYucG9pbnQoWy03NS41MzQsIDM5LjEyM10sIHtuYW1lOiAnTG9jYXRpb24gQyd9KTtcbiAqXG4gKiB2YXIgY29sbGVjdGlvbiA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICBsb2NhdGlvbkEsXG4gKiAgIGxvY2F0aW9uQixcbiAqICAgbG9jYXRpb25DXG4gKiBdKTtcbiAqXG4gKiAvLz1jb2xsZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIGZlYXR1cmVDb2xsZWN0aW9uKGZlYXR1cmVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZmMgPSB7IHR5cGU6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIiB9O1xuICAgIGlmIChvcHRpb25zLmlkKSB7XG4gICAgICAgIGZjLmlkID0gb3B0aW9ucy5pZDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuYmJveCkge1xuICAgICAgICBmYy5iYm94ID0gb3B0aW9ucy5iYm94O1xuICAgIH1cbiAgICBmYy5mZWF0dXJlcyA9IGZlYXR1cmVzO1xuICAgIHJldHVybiBmYztcbn1cbmV4cG9ydHMuZmVhdHVyZUNvbGxlY3Rpb24gPSBmZWF0dXJlQ29sbGVjdGlvbjtcbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBGZWF0dXJlPE11bHRpTGluZVN0cmluZz59IGJhc2VkIG9uIGFcbiAqIGNvb3JkaW5hdGUgYXJyYXkuIFByb3BlcnRpZXMgY2FuIGJlIGFkZGVkIG9wdGlvbmFsbHkuXG4gKlxuICogQG5hbWUgbXVsdGlMaW5lU3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PEFycmF5PG51bWJlcj4+Pn0gY29vcmRpbmF0ZXMgYW4gYXJyYXkgb2YgTGluZVN0cmluZ3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxNdWx0aUxpbmVTdHJpbmc+fSBhIE11bHRpTGluZVN0cmluZyBmZWF0dXJlXG4gKiBAdGhyb3dzIHtFcnJvcn0gaWYgbm8gY29vcmRpbmF0ZXMgYXJlIHBhc3NlZFxuICogQGV4YW1wbGVcbiAqIHZhciBtdWx0aUxpbmUgPSB0dXJmLm11bHRpTGluZVN0cmluZyhbW1swLDBdLFsxMCwxMF1dXSk7XG4gKlxuICogLy89bXVsdGlMaW5lXG4gKi9cbmZ1bmN0aW9uIG11bHRpTGluZVN0cmluZyhjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIGdlb20gPSB7XG4gICAgICAgIHR5cGU6IFwiTXVsdGlMaW5lU3RyaW5nXCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5tdWx0aUxpbmVTdHJpbmcgPSBtdWx0aUxpbmVTdHJpbmc7XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgRmVhdHVyZTxNdWx0aVBvaW50Pn0gYmFzZWQgb24gYVxuICogY29vcmRpbmF0ZSBhcnJheS4gUHJvcGVydGllcyBjYW4gYmUgYWRkZWQgb3B0aW9uYWxseS5cbiAqXG4gKiBAbmFtZSBtdWx0aVBvaW50XG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBQb3NpdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxNdWx0aVBvaW50Pn0gYSBNdWx0aVBvaW50IGZlYXR1cmVcbiAqIEB0aHJvd3Mge0Vycm9yfSBpZiBubyBjb29yZGluYXRlcyBhcmUgcGFzc2VkXG4gKiBAZXhhbXBsZVxuICogdmFyIG11bHRpUHQgPSB0dXJmLm11bHRpUG9pbnQoW1swLDBdLFsxMCwxMF1dKTtcbiAqXG4gKiAvLz1tdWx0aVB0XG4gKi9cbmZ1bmN0aW9uIG11bHRpUG9pbnQoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBnZW9tID0ge1xuICAgICAgICB0eXBlOiBcIk11bHRpUG9pbnRcIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzLFxuICAgIH07XG4gICAgcmV0dXJuIGZlYXR1cmUoZ2VvbSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG5leHBvcnRzLm11bHRpUG9pbnQgPSBtdWx0aVBvaW50O1xuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIEZlYXR1cmU8TXVsdGlQb2x5Z29uPn0gYmFzZWQgb24gYVxuICogY29vcmRpbmF0ZSBhcnJheS4gUHJvcGVydGllcyBjYW4gYmUgYWRkZWQgb3B0aW9uYWxseS5cbiAqXG4gKiBAbmFtZSBtdWx0aVBvbHlnb25cbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8QXJyYXk8QXJyYXk8bnVtYmVyPj4+Pn0gY29vcmRpbmF0ZXMgYW4gYXJyYXkgb2YgUG9seWdvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxNdWx0aVBvbHlnb24+fSBhIG11bHRpcG9seWdvbiBmZWF0dXJlXG4gKiBAdGhyb3dzIHtFcnJvcn0gaWYgbm8gY29vcmRpbmF0ZXMgYXJlIHBhc3NlZFxuICogQGV4YW1wbGVcbiAqIHZhciBtdWx0aVBvbHkgPSB0dXJmLm11bHRpUG9seWdvbihbW1tbMCwwXSxbMCwxMF0sWzEwLDEwXSxbMTAsMF0sWzAsMF1dXV0pO1xuICpcbiAqIC8vPW11bHRpUG9seVxuICpcbiAqL1xuZnVuY3Rpb24gbXVsdGlQb2x5Z29uKGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogXCJNdWx0aVBvbHlnb25cIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzLFxuICAgIH07XG4gICAgcmV0dXJuIGZlYXR1cmUoZ2VvbSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG5leHBvcnRzLm11bHRpUG9seWdvbiA9IG11bHRpUG9seWdvbjtcbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBGZWF0dXJlPEdlb21ldHJ5Q29sbGVjdGlvbj59IGJhc2VkIG9uIGFcbiAqIGNvb3JkaW5hdGUgYXJyYXkuIFByb3BlcnRpZXMgY2FuIGJlIGFkZGVkIG9wdGlvbmFsbHkuXG4gKlxuICogQG5hbWUgZ2VvbWV0cnlDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5PEdlb21ldHJ5Pn0gZ2VvbWV0cmllcyBhbiBhcnJheSBvZiBHZW9KU09OIEdlb21ldHJpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxHZW9tZXRyeUNvbGxlY3Rpb24+fSBhIEdlb0pTT04gR2VvbWV0cnlDb2xsZWN0aW9uIEZlYXR1cmVcbiAqIEBleGFtcGxlXG4gKiB2YXIgcHQgPSB0dXJmLmdlb21ldHJ5KFwiUG9pbnRcIiwgWzEwMCwgMF0pO1xuICogdmFyIGxpbmUgPSB0dXJmLmdlb21ldHJ5KFwiTGluZVN0cmluZ1wiLCBbWzEwMSwgMF0sIFsxMDIsIDFdXSk7XG4gKiB2YXIgY29sbGVjdGlvbiA9IHR1cmYuZ2VvbWV0cnlDb2xsZWN0aW9uKFtwdCwgbGluZV0pO1xuICpcbiAqIC8vID0+IGNvbGxlY3Rpb25cbiAqL1xuZnVuY3Rpb24gZ2VvbWV0cnlDb2xsZWN0aW9uKGdlb21ldHJpZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBnZW9tID0ge1xuICAgICAgICB0eXBlOiBcIkdlb21ldHJ5Q29sbGVjdGlvblwiLFxuICAgICAgICBnZW9tZXRyaWVzOiBnZW9tZXRyaWVzLFxuICAgIH07XG4gICAgcmV0dXJuIGZlYXR1cmUoZ2VvbSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG5leHBvcnRzLmdlb21ldHJ5Q29sbGVjdGlvbiA9IGdlb21ldHJ5Q29sbGVjdGlvbjtcbi8qKlxuICogUm91bmQgbnVtYmVyIHRvIHByZWNpc2lvblxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gTnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gW3ByZWNpc2lvbj0wXSBQcmVjaXNpb25cbiAqIEByZXR1cm5zIHtudW1iZXJ9IHJvdW5kZWQgbnVtYmVyXG4gKiBAZXhhbXBsZVxuICogdHVyZi5yb3VuZCgxMjAuNDMyMSlcbiAqIC8vPTEyMFxuICpcbiAqIHR1cmYucm91bmQoMTIwLjQzMjEsIDIpXG4gKiAvLz0xMjAuNDNcbiAqL1xuZnVuY3Rpb24gcm91bmQobnVtLCBwcmVjaXNpb24pIHtcbiAgICBpZiAocHJlY2lzaW9uID09PSB2b2lkIDApIHsgcHJlY2lzaW9uID0gMDsgfVxuICAgIGlmIChwcmVjaXNpb24gJiYgIShwcmVjaXNpb24gPj0gMCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicHJlY2lzaW9uIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXJcIik7XG4gICAgfVxuICAgIHZhciBtdWx0aXBsaWVyID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbiB8fCAwKTtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChudW0gKiBtdWx0aXBsaWVyKSAvIG11bHRpcGxpZXI7XG59XG5leHBvcnRzLnJvdW5kID0gcm91bmQ7XG4vKipcbiAqIENvbnZlcnQgYSBkaXN0YW5jZSBtZWFzdXJlbWVudCAoYXNzdW1pbmcgYSBzcGhlcmljYWwgRWFydGgpIGZyb20gcmFkaWFucyB0byBhIG1vcmUgZnJpZW5kbHkgdW5pdC5cbiAqIFZhbGlkIHVuaXRzOiBtaWxlcywgbmF1dGljYWxtaWxlcywgaW5jaGVzLCB5YXJkcywgbWV0ZXJzLCBtZXRyZXMsIGtpbG9tZXRlcnMsIGNlbnRpbWV0ZXJzLCBmZWV0XG4gKlxuICogQG5hbWUgcmFkaWFuc1RvTGVuZ3RoXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkaWFucyBpbiByYWRpYW5zIGFjcm9zcyB0aGUgc3BoZXJlXG4gKiBAcGFyYW0ge3N0cmluZ30gW3VuaXRzPVwia2lsb21ldGVyc1wiXSBjYW4gYmUgZGVncmVlcywgcmFkaWFucywgbWlsZXMsIGluY2hlcywgeWFyZHMsIG1ldHJlcyxcbiAqIG1ldGVycywga2lsb21ldHJlcywga2lsb21ldGVycy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IGRpc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIHJhZGlhbnNUb0xlbmd0aChyYWRpYW5zLCB1bml0cykge1xuICAgIGlmICh1bml0cyA9PT0gdm9pZCAwKSB7IHVuaXRzID0gXCJraWxvbWV0ZXJzXCI7IH1cbiAgICB2YXIgZmFjdG9yID0gZXhwb3J0cy5mYWN0b3JzW3VuaXRzXTtcbiAgICBpZiAoIWZhY3Rvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IodW5pdHMgKyBcIiB1bml0cyBpcyBpbnZhbGlkXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcmFkaWFucyAqIGZhY3Rvcjtcbn1cbmV4cG9ydHMucmFkaWFuc1RvTGVuZ3RoID0gcmFkaWFuc1RvTGVuZ3RoO1xuLyoqXG4gKiBDb252ZXJ0IGEgZGlzdGFuY2UgbWVhc3VyZW1lbnQgKGFzc3VtaW5nIGEgc3BoZXJpY2FsIEVhcnRoKSBmcm9tIGEgcmVhbC13b3JsZCB1bml0IGludG8gcmFkaWFuc1xuICogVmFsaWQgdW5pdHM6IG1pbGVzLCBuYXV0aWNhbG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRlcnMsIG1ldHJlcywga2lsb21ldGVycywgY2VudGltZXRlcnMsIGZlZXRcbiAqXG4gKiBAbmFtZSBsZW5ndGhUb1JhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBkaXN0YW5jZSBpbiByZWFsIHVuaXRzXG4gKiBAcGFyYW0ge3N0cmluZ30gW3VuaXRzPVwia2lsb21ldGVyc1wiXSBjYW4gYmUgZGVncmVlcywgcmFkaWFucywgbWlsZXMsIGluY2hlcywgeWFyZHMsIG1ldHJlcyxcbiAqIG1ldGVycywga2lsb21ldHJlcywga2lsb21ldGVycy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IHJhZGlhbnNcbiAqL1xuZnVuY3Rpb24gbGVuZ3RoVG9SYWRpYW5zKGRpc3RhbmNlLCB1bml0cykge1xuICAgIGlmICh1bml0cyA9PT0gdm9pZCAwKSB7IHVuaXRzID0gXCJraWxvbWV0ZXJzXCI7IH1cbiAgICB2YXIgZmFjdG9yID0gZXhwb3J0cy5mYWN0b3JzW3VuaXRzXTtcbiAgICBpZiAoIWZhY3Rvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IodW5pdHMgKyBcIiB1bml0cyBpcyBpbnZhbGlkXCIpO1xuICAgIH1cbiAgICByZXR1cm4gZGlzdGFuY2UgLyBmYWN0b3I7XG59XG5leHBvcnRzLmxlbmd0aFRvUmFkaWFucyA9IGxlbmd0aFRvUmFkaWFucztcbi8qKlxuICogQ29udmVydCBhIGRpc3RhbmNlIG1lYXN1cmVtZW50IChhc3N1bWluZyBhIHNwaGVyaWNhbCBFYXJ0aCkgZnJvbSBhIHJlYWwtd29ybGQgdW5pdCBpbnRvIGRlZ3JlZXNcbiAqIFZhbGlkIHVuaXRzOiBtaWxlcywgbmF1dGljYWxtaWxlcywgaW5jaGVzLCB5YXJkcywgbWV0ZXJzLCBtZXRyZXMsIGNlbnRpbWV0ZXJzLCBraWxvbWV0cmVzLCBmZWV0XG4gKlxuICogQG5hbWUgbGVuZ3RoVG9EZWdyZWVzXG4gKiBAcGFyYW0ge251bWJlcn0gZGlzdGFuY2UgaW4gcmVhbCB1bml0c1xuICogQHBhcmFtIHtzdHJpbmd9IFt1bml0cz1cImtpbG9tZXRlcnNcIl0gY2FuIGJlIGRlZ3JlZXMsIHJhZGlhbnMsIG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRyZXMsXG4gKiBtZXRlcnMsIGtpbG9tZXRyZXMsIGtpbG9tZXRlcnMuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBkZWdyZWVzXG4gKi9cbmZ1bmN0aW9uIGxlbmd0aFRvRGVncmVlcyhkaXN0YW5jZSwgdW5pdHMpIHtcbiAgICByZXR1cm4gcmFkaWFuc1RvRGVncmVlcyhsZW5ndGhUb1JhZGlhbnMoZGlzdGFuY2UsIHVuaXRzKSk7XG59XG5leHBvcnRzLmxlbmd0aFRvRGVncmVlcyA9IGxlbmd0aFRvRGVncmVlcztcbi8qKlxuICogQ29udmVydHMgYW55IGJlYXJpbmcgYW5nbGUgZnJvbSB0aGUgbm9ydGggbGluZSBkaXJlY3Rpb24gKHBvc2l0aXZlIGNsb2Nrd2lzZSlcbiAqIGFuZCByZXR1cm5zIGFuIGFuZ2xlIGJldHdlZW4gMC0zNjAgZGVncmVlcyAocG9zaXRpdmUgY2xvY2t3aXNlKSwgMCBiZWluZyB0aGUgbm9ydGggbGluZVxuICpcbiAqIEBuYW1lIGJlYXJpbmdUb0F6aW11dGhcbiAqIEBwYXJhbSB7bnVtYmVyfSBiZWFyaW5nIGFuZ2xlLCBiZXR3ZWVuIC0xODAgYW5kICsxODAgZGVncmVlc1xuICogQHJldHVybnMge251bWJlcn0gYW5nbGUgYmV0d2VlbiAwIGFuZCAzNjAgZGVncmVlc1xuICovXG5mdW5jdGlvbiBiZWFyaW5nVG9BemltdXRoKGJlYXJpbmcpIHtcbiAgICB2YXIgYW5nbGUgPSBiZWFyaW5nICUgMzYwO1xuICAgIGlmIChhbmdsZSA8IDApIHtcbiAgICAgICAgYW5nbGUgKz0gMzYwO1xuICAgIH1cbiAgICByZXR1cm4gYW5nbGU7XG59XG5leHBvcnRzLmJlYXJpbmdUb0F6aW11dGggPSBiZWFyaW5nVG9BemltdXRoO1xuLyoqXG4gKiBDb252ZXJ0cyBhbiBhbmdsZSBpbiByYWRpYW5zIHRvIGRlZ3JlZXNcbiAqXG4gKiBAbmFtZSByYWRpYW5zVG9EZWdyZWVzXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkaWFucyBhbmdsZSBpbiByYWRpYW5zXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBkZWdyZWVzIGJldHdlZW4gMCBhbmQgMzYwIGRlZ3JlZXNcbiAqL1xuZnVuY3Rpb24gcmFkaWFuc1RvRGVncmVlcyhyYWRpYW5zKSB7XG4gICAgdmFyIGRlZ3JlZXMgPSByYWRpYW5zICUgKDIgKiBNYXRoLlBJKTtcbiAgICByZXR1cm4gKGRlZ3JlZXMgKiAxODApIC8gTWF0aC5QSTtcbn1cbmV4cG9ydHMucmFkaWFuc1RvRGVncmVlcyA9IHJhZGlhbnNUb0RlZ3JlZXM7XG4vKipcbiAqIENvbnZlcnRzIGFuIGFuZ2xlIGluIGRlZ3JlZXMgdG8gcmFkaWFuc1xuICpcbiAqIEBuYW1lIGRlZ3JlZXNUb1JhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWdyZWVzIGFuZ2xlIGJldHdlZW4gMCBhbmQgMzYwIGRlZ3JlZXNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IGFuZ2xlIGluIHJhZGlhbnNcbiAqL1xuZnVuY3Rpb24gZGVncmVlc1RvUmFkaWFucyhkZWdyZWVzKSB7XG4gICAgdmFyIHJhZGlhbnMgPSBkZWdyZWVzICUgMzYwO1xuICAgIHJldHVybiAocmFkaWFucyAqIE1hdGguUEkpIC8gMTgwO1xufVxuZXhwb3J0cy5kZWdyZWVzVG9SYWRpYW5zID0gZGVncmVlc1RvUmFkaWFucztcbi8qKlxuICogQ29udmVydHMgYSBsZW5ndGggdG8gdGhlIHJlcXVlc3RlZCB1bml0LlxuICogVmFsaWQgdW5pdHM6IG1pbGVzLCBuYXV0aWNhbG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRlcnMsIG1ldHJlcywga2lsb21ldGVycywgY2VudGltZXRlcnMsIGZlZXRcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIHRvIGJlIGNvbnZlcnRlZFxuICogQHBhcmFtIHtVbml0c30gW29yaWdpbmFsVW5pdD1cImtpbG9tZXRlcnNcIl0gb2YgdGhlIGxlbmd0aFxuICogQHBhcmFtIHtVbml0c30gW2ZpbmFsVW5pdD1cImtpbG9tZXRlcnNcIl0gcmV0dXJuZWQgdW5pdFxuICogQHJldHVybnMge251bWJlcn0gdGhlIGNvbnZlcnRlZCBsZW5ndGhcbiAqL1xuZnVuY3Rpb24gY29udmVydExlbmd0aChsZW5ndGgsIG9yaWdpbmFsVW5pdCwgZmluYWxVbml0KSB7XG4gICAgaWYgKG9yaWdpbmFsVW5pdCA9PT0gdm9pZCAwKSB7IG9yaWdpbmFsVW5pdCA9IFwia2lsb21ldGVyc1wiOyB9XG4gICAgaWYgKGZpbmFsVW5pdCA9PT0gdm9pZCAwKSB7IGZpbmFsVW5pdCA9IFwia2lsb21ldGVyc1wiOyB9XG4gICAgaWYgKCEobGVuZ3RoID49IDApKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImxlbmd0aCBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcmFkaWFuc1RvTGVuZ3RoKGxlbmd0aFRvUmFkaWFucyhsZW5ndGgsIG9yaWdpbmFsVW5pdCksIGZpbmFsVW5pdCk7XG59XG5leHBvcnRzLmNvbnZlcnRMZW5ndGggPSBjb252ZXJ0TGVuZ3RoO1xuLyoqXG4gKiBDb252ZXJ0cyBhIGFyZWEgdG8gdGhlIHJlcXVlc3RlZCB1bml0LlxuICogVmFsaWQgdW5pdHM6IGtpbG9tZXRlcnMsIGtpbG9tZXRyZXMsIG1ldGVycywgbWV0cmVzLCBjZW50aW1ldHJlcywgbWlsbGltZXRlcnMsIGFjcmVzLCBtaWxlcywgeWFyZHMsIGZlZXQsIGluY2hlcywgaGVjdGFyZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSBhcmVhIHRvIGJlIGNvbnZlcnRlZFxuICogQHBhcmFtIHtVbml0c30gW29yaWdpbmFsVW5pdD1cIm1ldGVyc1wiXSBvZiB0aGUgZGlzdGFuY2VcbiAqIEBwYXJhbSB7VW5pdHN9IFtmaW5hbFVuaXQ9XCJraWxvbWV0ZXJzXCJdIHJldHVybmVkIHVuaXRcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBjb252ZXJ0ZWQgYXJlYVxuICovXG5mdW5jdGlvbiBjb252ZXJ0QXJlYShhcmVhLCBvcmlnaW5hbFVuaXQsIGZpbmFsVW5pdCkge1xuICAgIGlmIChvcmlnaW5hbFVuaXQgPT09IHZvaWQgMCkgeyBvcmlnaW5hbFVuaXQgPSBcIm1ldGVyc1wiOyB9XG4gICAgaWYgKGZpbmFsVW5pdCA9PT0gdm9pZCAwKSB7IGZpbmFsVW5pdCA9IFwia2lsb21ldGVyc1wiOyB9XG4gICAgaWYgKCEoYXJlYSA+PSAwKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhcmVhIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXJcIik7XG4gICAgfVxuICAgIHZhciBzdGFydEZhY3RvciA9IGV4cG9ydHMuYXJlYUZhY3RvcnNbb3JpZ2luYWxVbml0XTtcbiAgICBpZiAoIXN0YXJ0RmFjdG9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgb3JpZ2luYWwgdW5pdHNcIik7XG4gICAgfVxuICAgIHZhciBmaW5hbEZhY3RvciA9IGV4cG9ydHMuYXJlYUZhY3RvcnNbZmluYWxVbml0XTtcbiAgICBpZiAoIWZpbmFsRmFjdG9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgZmluYWwgdW5pdHNcIik7XG4gICAgfVxuICAgIHJldHVybiAoYXJlYSAvIHN0YXJ0RmFjdG9yKSAqIGZpbmFsRmFjdG9yO1xufVxuZXhwb3J0cy5jb252ZXJ0QXJlYSA9IGNvbnZlcnRBcmVhO1xuLyoqXG4gKiBpc051bWJlclxuICpcbiAqIEBwYXJhbSB7Kn0gbnVtIE51bWJlciB0byB2YWxpZGF0ZVxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUvZmFsc2VcbiAqIEBleGFtcGxlXG4gKiB0dXJmLmlzTnVtYmVyKDEyMylcbiAqIC8vPXRydWVcbiAqIHR1cmYuaXNOdW1iZXIoJ2ZvbycpXG4gKiAvLz1mYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcihudW0pIHtcbiAgICByZXR1cm4gIWlzTmFOKG51bSkgJiYgbnVtICE9PSBudWxsICYmICFBcnJheS5pc0FycmF5KG51bSk7XG59XG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XG4vKipcbiAqIGlzT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSBpbnB1dCB2YXJpYWJsZSB0byB2YWxpZGF0ZVxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUvZmFsc2VcbiAqIEBleGFtcGxlXG4gKiB0dXJmLmlzT2JqZWN0KHtlbGV2YXRpb246IDEwfSlcbiAqIC8vPXRydWVcbiAqIHR1cmYuaXNPYmplY3QoJ2ZvbycpXG4gKiAvLz1mYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdChpbnB1dCkge1xuICAgIHJldHVybiAhIWlucHV0ICYmIGlucHV0LmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG4vKipcbiAqIFZhbGlkYXRlIEJCb3hcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBiYm94IEJCb3ggdG8gdmFsaWRhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQHRocm93cyBFcnJvciBpZiBCQm94IGlzIG5vdCB2YWxpZFxuICogQGV4YW1wbGVcbiAqIHZhbGlkYXRlQkJveChbLTE4MCwgLTQwLCAxMTAsIDUwXSlcbiAqIC8vPU9LXG4gKiB2YWxpZGF0ZUJCb3goWy0xODAsIC00MF0pXG4gKiAvLz1FcnJvclxuICogdmFsaWRhdGVCQm94KCdGb28nKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlQkJveCg1KVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlQkJveChudWxsKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlQkJveCh1bmRlZmluZWQpXG4gKiAvLz1FcnJvclxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUJCb3goYmJveCkge1xuICAgIGlmICghYmJveCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJiYm94IGlzIHJlcXVpcmVkXCIpO1xuICAgIH1cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmJveCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYmJveCBtdXN0IGJlIGFuIEFycmF5XCIpO1xuICAgIH1cbiAgICBpZiAoYmJveC5sZW5ndGggIT09IDQgJiYgYmJveC5sZW5ndGggIT09IDYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYmJveCBtdXN0IGJlIGFuIEFycmF5IG9mIDQgb3IgNiBudW1iZXJzXCIpO1xuICAgIH1cbiAgICBiYm94LmZvckVhY2goZnVuY3Rpb24gKG51bSkge1xuICAgICAgICBpZiAoIWlzTnVtYmVyKG51bSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImJib3ggbXVzdCBvbmx5IGNvbnRhaW4gbnVtYmVyc1wiKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy52YWxpZGF0ZUJCb3ggPSB2YWxpZGF0ZUJCb3g7XG4vKipcbiAqIFZhbGlkYXRlIElkXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gaWQgSWQgdG8gdmFsaWRhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQHRocm93cyBFcnJvciBpZiBJZCBpcyBub3QgdmFsaWRcbiAqIEBleGFtcGxlXG4gKiB2YWxpZGF0ZUlkKFstMTgwLCAtNDAsIDExMCwgNTBdKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlSWQoWy0xODAsIC00MF0pXG4gKiAvLz1FcnJvclxuICogdmFsaWRhdGVJZCgnRm9vJylcbiAqIC8vPU9LXG4gKiB2YWxpZGF0ZUlkKDUpXG4gKiAvLz1PS1xuICogdmFsaWRhdGVJZChudWxsKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlSWQodW5kZWZpbmVkKVxuICogLy89RXJyb3JcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVJZChpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWQgaXMgcmVxdWlyZWRcIik7XG4gICAgfVxuICAgIGlmIChbXCJzdHJpbmdcIiwgXCJudW1iZXJcIl0uaW5kZXhPZih0eXBlb2YgaWQpID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpZCBtdXN0IGJlIGEgbnVtYmVyIG9yIGEgc3RyaW5nXCIpO1xuICAgIH1cbn1cbmV4cG9ydHMudmFsaWRhdGVJZCA9IHZhbGlkYXRlSWQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnQHR1cmYvaGVscGVycycpO1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciBjb29yZEVhY2hcbiAqXG4gKiBAY2FsbGJhY2sgY29vcmRFYWNoQ2FsbGJhY2tcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gY3VycmVudENvb3JkIFRoZSBjdXJyZW50IGNvb3JkaW5hdGUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGNvb3JkSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIGNvb3JkaW5hdGUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlGZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIE11bHRpLUZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGdlb21ldHJ5SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEdlb21ldHJ5IGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBjb29yZGluYXRlcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkuZm9yRWFjaCgpXG4gKlxuICogQG5hbWUgY29vcmRFYWNoXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50Q29vcmQsIGNvb3JkSW5kZXgsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtleGNsdWRlV3JhcENvb3JkPWZhbHNlXSB3aGV0aGVyIG9yIG5vdCB0byBpbmNsdWRlIHRoZSBmaW5hbCBjb29yZGluYXRlIG9mIExpbmVhclJpbmdzIHRoYXQgd3JhcHMgdGhlIHJpbmcgaW4gaXRzIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICB0dXJmLnBvaW50KFsyNiwgMzddLCB7XCJmb29cIjogXCJiYXJcIn0pLFxuICogICB0dXJmLnBvaW50KFszNiwgNTNdLCB7XCJoZWxsb1wiOiBcIndvcmxkXCJ9KVxuICogXSk7XG4gKlxuICogdHVyZi5jb29yZEVhY2goZmVhdHVyZXMsIGZ1bmN0aW9uIChjdXJyZW50Q29vcmQsIGNvb3JkSW5kZXgsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgpIHtcbiAqICAgLy89Y3VycmVudENvb3JkXG4gKiAgIC8vPWNvb3JkSW5kZXhcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPW11bHRpRmVhdHVyZUluZGV4XG4gKiAgIC8vPWdlb21ldHJ5SW5kZXhcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBjb29yZEVhY2goZ2VvanNvbiwgY2FsbGJhY2ssIGV4Y2x1ZGVXcmFwQ29vcmQpIHtcbiAgLy8gSGFuZGxlcyBudWxsIEdlb21ldHJ5IC0tIFNraXBzIHRoaXMgR2VvSlNPTlxuICBpZiAoZ2VvanNvbiA9PT0gbnVsbCkgcmV0dXJuO1xuICB2YXIgaixcbiAgICBrLFxuICAgIGwsXG4gICAgZ2VvbWV0cnksXG4gICAgc3RvcEcsXG4gICAgY29vcmRzLFxuICAgIGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLFxuICAgIHdyYXBTaHJpbmsgPSAwLFxuICAgIGNvb3JkSW5kZXggPSAwLFxuICAgIGlzR2VvbWV0cnlDb2xsZWN0aW9uLFxuICAgIHR5cGUgPSBnZW9qc29uLnR5cGUsXG4gICAgaXNGZWF0dXJlQ29sbGVjdGlvbiA9IHR5cGUgPT09IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAgICBpc0ZlYXR1cmUgPSB0eXBlID09PSBcIkZlYXR1cmVcIixcbiAgICBzdG9wID0gaXNGZWF0dXJlQ29sbGVjdGlvbiA/IGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoIDogMTtcblxuICAvLyBUaGlzIGxvZ2ljIG1heSBsb29rIGEgbGl0dGxlIHdlaXJkLiBUaGUgcmVhc29uIHdoeSBpdCBpcyB0aGF0IHdheVxuICAvLyBpcyBiZWNhdXNlIGl0J3MgdHJ5aW5nIHRvIGJlIGZhc3QuIEdlb0pTT04gc3VwcG9ydHMgbXVsdGlwbGUga2luZHNcbiAgLy8gb2Ygb2JqZWN0cyBhdCBpdHMgcm9vdDogRmVhdHVyZUNvbGxlY3Rpb24sIEZlYXR1cmVzLCBHZW9tZXRyaWVzLlxuICAvLyBUaGlzIGZ1bmN0aW9uIGhhcyB0aGUgcmVzcG9uc2liaWxpdHkgb2YgaGFuZGxpbmcgYWxsIG9mIHRoZW0sIGFuZCB0aGF0XG4gIC8vIG1lYW5zIHRoYXQgc29tZSBvZiB0aGUgYGZvcmAgbG9vcHMgeW91IHNlZSBiZWxvdyBhY3R1YWxseSBqdXN0IGRvbid0IGFwcGx5XG4gIC8vIHRvIGNlcnRhaW4gaW5wdXRzLiBGb3IgaW5zdGFuY2UsIGlmIHlvdSBnaXZlIHRoaXMganVzdCBhXG4gIC8vIFBvaW50IGdlb21ldHJ5LCB0aGVuIGJvdGggbG9vcHMgYXJlIHNob3J0LWNpcmN1aXRlZCBhbmQgYWxsIHdlIGRvXG4gIC8vIGlzIGdyYWR1YWxseSByZW5hbWUgdGhlIGlucHV0IHVudGlsIGl0J3MgY2FsbGVkICdnZW9tZXRyeScuXG4gIC8vXG4gIC8vIFRoaXMgYWxzbyBhaW1zIHRvIGFsbG9jYXRlIGFzIGZldyByZXNvdXJjZXMgYXMgcG9zc2libGU6IGp1c3QgYVxuICAvLyBmZXcgbnVtYmVycyBhbmQgYm9vbGVhbnMsIHJhdGhlciB0aGFuIGFueSB0ZW1wb3JhcnkgYXJyYXlzIGFzIHdvdWxkXG4gIC8vIGJlIHJlcXVpcmVkIHdpdGggdGhlIG5vcm1hbGl6YXRpb24gYXBwcm9hY2guXG4gIGZvciAodmFyIGZlYXR1cmVJbmRleCA9IDA7IGZlYXR1cmVJbmRleCA8IHN0b3A7IGZlYXR1cmVJbmRleCsrKSB7XG4gICAgZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb24gPSBpc0ZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb2pzb24uZmVhdHVyZXNbZmVhdHVyZUluZGV4XS5nZW9tZXRyeVxuICAgICAgOiBpc0ZlYXR1cmVcbiAgICAgID8gZ2VvanNvbi5nZW9tZXRyeVxuICAgICAgOiBnZW9qc29uO1xuICAgIGlzR2VvbWV0cnlDb2xsZWN0aW9uID0gZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb25cbiAgICAgID8gZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb24udHlwZSA9PT0gXCJHZW9tZXRyeUNvbGxlY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgICBzdG9wRyA9IGlzR2VvbWV0cnlDb2xsZWN0aW9uXG4gICAgICA/IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLmdlb21ldHJpZXMubGVuZ3RoXG4gICAgICA6IDE7XG5cbiAgICBmb3IgKHZhciBnZW9tSW5kZXggPSAwOyBnZW9tSW5kZXggPCBzdG9wRzsgZ2VvbUluZGV4KyspIHtcbiAgICAgIHZhciBtdWx0aUZlYXR1cmVJbmRleCA9IDA7XG4gICAgICB2YXIgZ2VvbWV0cnlJbmRleCA9IDA7XG4gICAgICBnZW9tZXRyeSA9IGlzR2VvbWV0cnlDb2xsZWN0aW9uXG4gICAgICAgID8gZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb24uZ2VvbWV0cmllc1tnZW9tSW5kZXhdXG4gICAgICAgIDogZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb247XG5cbiAgICAgIC8vIEhhbmRsZXMgbnVsbCBHZW9tZXRyeSAtLSBTa2lwcyB0aGlzIGdlb21ldHJ5XG4gICAgICBpZiAoZ2VvbWV0cnkgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgY29vcmRzID0gZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gICAgICB2YXIgZ2VvbVR5cGUgPSBnZW9tZXRyeS50eXBlO1xuXG4gICAgICB3cmFwU2hyaW5rID1cbiAgICAgICAgZXhjbHVkZVdyYXBDb29yZCAmJlxuICAgICAgICAoZ2VvbVR5cGUgPT09IFwiUG9seWdvblwiIHx8IGdlb21UeXBlID09PSBcIk11bHRpUG9seWdvblwiKVxuICAgICAgICAgID8gMVxuICAgICAgICAgIDogMDtcblxuICAgICAgc3dpdGNoIChnZW9tVHlwZSkge1xuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICBjb29yZHMsXG4gICAgICAgICAgICAgIGNvb3JkSW5kZXgsXG4gICAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgIGdlb21ldHJ5SW5kZXhcbiAgICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIGNvb3JkSW5kZXgrKztcbiAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCsrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgICBjYXNlIFwiTXVsdGlQb2ludFwiOlxuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBjb29yZHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICAgICAgY29vcmRzW2pdLFxuICAgICAgICAgICAgICAgIGNvb3JkSW5kZXgsXG4gICAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICAgIGdlb21ldHJ5SW5kZXhcbiAgICAgICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgY29vcmRJbmRleCsrO1xuICAgICAgICAgICAgaWYgKGdlb21UeXBlID09PSBcIk11bHRpUG9pbnRcIikgbXVsdGlGZWF0dXJlSW5kZXgrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGdlb21UeXBlID09PSBcIkxpbmVTdHJpbmdcIikgbXVsdGlGZWF0dXJlSW5kZXgrKztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBjb29yZHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBjb29yZHNbal0ubGVuZ3RoIC0gd3JhcFNocmluazsgaysrKSB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgICAgICAgIGNvb3Jkc1tqXVtrXSxcbiAgICAgICAgICAgICAgICAgIGNvb3JkSW5kZXgsXG4gICAgICAgICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgICAgIGdlb21ldHJ5SW5kZXhcbiAgICAgICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICBjb29yZEluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2VvbVR5cGUgPT09IFwiTXVsdGlMaW5lU3RyaW5nXCIpIG11bHRpRmVhdHVyZUluZGV4Kys7XG4gICAgICAgICAgICBpZiAoZ2VvbVR5cGUgPT09IFwiUG9seWdvblwiKSBnZW9tZXRyeUluZGV4Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChnZW9tVHlwZSA9PT0gXCJQb2x5Z29uXCIpIG11bHRpRmVhdHVyZUluZGV4Kys7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgY29vcmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBnZW9tZXRyeUluZGV4ID0gMDtcbiAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBjb29yZHNbal0ubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgZm9yIChsID0gMDsgbCA8IGNvb3Jkc1tqXVtrXS5sZW5ndGggLSB3cmFwU2hyaW5rOyBsKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgICAgICAgICAgY29vcmRzW2pdW2tdW2xdLFxuICAgICAgICAgICAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb29yZEluZGV4Kys7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZ2VvbWV0cnlJbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJHZW9tZXRyeUNvbGxlY3Rpb25cIjpcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgZ2VvbWV0cnkuZ2VvbWV0cmllcy5sZW5ndGg7IGorKylcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY29vcmRFYWNoKGdlb21ldHJ5Lmdlb21ldHJpZXNbal0sIGNhbGxiYWNrLCBleGNsdWRlV3JhcENvb3JkKSA9PT1cbiAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gR2VvbWV0cnkgVHlwZVwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgY29vcmRSZWR1Y2VcbiAqXG4gKiBUaGUgZmlyc3QgdGltZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGUgdmFsdWVzIHByb3ZpZGVkIGFzIGFyZ3VtZW50cyBkZXBlbmRcbiAqIG9uIHdoZXRoZXIgdGhlIHJlZHVjZSBtZXRob2QgaGFzIGFuIGluaXRpYWxWYWx1ZSBhcmd1bWVudC5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgcHJvdmlkZWQgdG8gdGhlIHJlZHVjZSBtZXRob2Q6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyBpbml0aWFsVmFsdWUuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgbm90IHByb3ZpZGVkOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIHNlY29uZCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIEBjYWxsYmFjayBjb29yZFJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBjdXJyZW50Q29vcmQgVGhlIGN1cnJlbnQgY29vcmRpbmF0ZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gY29vcmRJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgY29vcmRpbmF0ZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBTdGFydHMgYXQgaW5kZXggMCwgaWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkLCBhbmQgYXQgaW5kZXggMSBvdGhlcndpc2UuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aUZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgTXVsdGktRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZ2VvbWV0cnlJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgR2VvbWV0cnkgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogUmVkdWNlIGNvb3JkaW5hdGVzIGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5yZWR1Y2UoKVxuICpcbiAqIEBuYW1lIGNvb3JkUmVkdWNlXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEdlb21ldHJ5fEZlYXR1cmV9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50Q29vcmQsIGNvb3JkSW5kZXgpXG4gKiBAcGFyYW0geyp9IFtpbml0aWFsVmFsdWVdIFZhbHVlIHRvIHVzZSBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIGZpcnN0IGNhbGwgb2YgdGhlIGNhbGxiYWNrLlxuICogQHBhcmFtIHtib29sZWFufSBbZXhjbHVkZVdyYXBDb29yZD1mYWxzZV0gd2hldGhlciBvciBub3QgdG8gaW5jbHVkZSB0aGUgZmluYWwgY29vcmRpbmF0ZSBvZiBMaW5lYXJSaW5ncyB0aGF0IHdyYXBzIHRoZSByaW5nIGluIGl0cyBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHZhbHVlIHRoYXQgcmVzdWx0cyBmcm9tIHRoZSByZWR1Y3Rpb24uXG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtcImZvb1wiOiBcImJhclwifSksXG4gKiAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtcImhlbGxvXCI6IFwid29ybGRcIn0pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmNvb3JkUmVkdWNlKGZlYXR1cmVzLCBmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudENvb3JkLCBjb29yZEluZGV4LCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KSB7XG4gKiAgIC8vPXByZXZpb3VzVmFsdWVcbiAqICAgLy89Y3VycmVudENvb3JkXG4gKiAgIC8vPWNvb3JkSW5kZXhcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPW11bHRpRmVhdHVyZUluZGV4XG4gKiAgIC8vPWdlb21ldHJ5SW5kZXhcbiAqICAgcmV0dXJuIGN1cnJlbnRDb29yZDtcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBjb29yZFJlZHVjZShnZW9qc29uLCBjYWxsYmFjaywgaW5pdGlhbFZhbHVlLCBleGNsdWRlV3JhcENvb3JkKSB7XG4gIHZhciBwcmV2aW91c1ZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICBjb29yZEVhY2goXG4gICAgZ2VvanNvbixcbiAgICBmdW5jdGlvbiAoXG4gICAgICBjdXJyZW50Q29vcmQsXG4gICAgICBjb29yZEluZGV4LFxuICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICBnZW9tZXRyeUluZGV4XG4gICAgKSB7XG4gICAgICBpZiAoY29vcmRJbmRleCA9PT0gMCAmJiBpbml0aWFsVmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGN1cnJlbnRDb29yZDtcbiAgICAgIGVsc2VcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGNhbGxiYWNrKFxuICAgICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgICAgY3VycmVudENvb3JkLFxuICAgICAgICAgIGNvb3JkSW5kZXgsXG4gICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgIGdlb21ldHJ5SW5kZXhcbiAgICAgICAgKTtcbiAgICB9LFxuICAgIGV4Y2x1ZGVXcmFwQ29vcmRcbiAgKTtcbiAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHByb3BFYWNoXG4gKlxuICogQGNhbGxiYWNrIHByb3BFYWNoQ2FsbGJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBjdXJyZW50UHJvcGVydGllcyBUaGUgY3VycmVudCBQcm9wZXJ0aWVzIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIHByb3BlcnRpZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LmZvckVhY2goKVxuICpcbiAqIEBuYW1lIHByb3BFYWNoXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50UHJvcGVydGllcywgZmVhdHVyZUluZGV4KVxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgICAgdHVyZi5wb2ludChbMjYsIDM3XSwge2ZvbzogJ2Jhcid9KSxcbiAqICAgICB0dXJmLnBvaW50KFszNiwgNTNdLCB7aGVsbG86ICd3b3JsZCd9KVxuICogXSk7XG4gKlxuICogdHVyZi5wcm9wRWFjaChmZWF0dXJlcywgZnVuY3Rpb24gKGN1cnJlbnRQcm9wZXJ0aWVzLCBmZWF0dXJlSW5kZXgpIHtcbiAqICAgLy89Y3VycmVudFByb3BlcnRpZXNcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gcHJvcEVhY2goZ2VvanNvbiwgY2FsbGJhY2spIHtcbiAgdmFyIGk7XG4gIHN3aXRjaCAoZ2VvanNvbi50eXBlKSB7XG4gICAgY2FzZSBcIkZlYXR1cmVDb2xsZWN0aW9uXCI6XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZ2VvanNvbi5mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY2FsbGJhY2soZ2VvanNvbi5mZWF0dXJlc1tpXS5wcm9wZXJ0aWVzLCBpKSA9PT0gZmFsc2UpIGJyZWFrO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkZlYXR1cmVcIjpcbiAgICAgIGNhbGxiYWNrKGdlb2pzb24ucHJvcGVydGllcywgMCk7XG4gICAgICBicmVhaztcbiAgfVxufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBwcm9wUmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgcHJvcFJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHsqfSBjdXJyZW50UHJvcGVydGllcyBUaGUgY3VycmVudCBQcm9wZXJ0aWVzIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogUmVkdWNlIHByb3BlcnRpZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0IGludG8gYSBzaW5nbGUgdmFsdWUsXG4gKiBzaW1pbGFyIHRvIGhvdyBBcnJheS5yZWR1Y2Ugd29ya3MuIEhvd2V2ZXIsIGluIHRoaXMgY2FzZSB3ZSBsYXppbHkgcnVuXG4gKiB0aGUgcmVkdWN0aW9uLCBzbyBhbiBhcnJheSBvZiBhbGwgcHJvcGVydGllcyBpcyB1bm5lY2Vzc2FyeS5cbiAqXG4gKiBAbmFtZSBwcm9wUmVkdWNlXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50UHJvcGVydGllcywgZmVhdHVyZUluZGV4KVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm5zIHsqfSBUaGUgdmFsdWUgdGhhdCByZXN1bHRzIGZyb20gdGhlIHJlZHVjdGlvbi5cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgICB0dXJmLnBvaW50KFsyNiwgMzddLCB7Zm9vOiAnYmFyJ30pLFxuICogICAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLnByb3BSZWR1Y2UoZmVhdHVyZXMsIGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50UHJvcGVydGllcywgZmVhdHVyZUluZGV4KSB7XG4gKiAgIC8vPXByZXZpb3VzVmFsdWVcbiAqICAgLy89Y3VycmVudFByb3BlcnRpZXNcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIHJldHVybiBjdXJyZW50UHJvcGVydGllc1xuICogfSk7XG4gKi9cbmZ1bmN0aW9uIHByb3BSZWR1Y2UoZ2VvanNvbiwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuICB2YXIgcHJldmlvdXNWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgcHJvcEVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGN1cnJlbnRQcm9wZXJ0aWVzLCBmZWF0dXJlSW5kZXgpIHtcbiAgICBpZiAoZmVhdHVyZUluZGV4ID09PSAwICYmIGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgcHJldmlvdXNWYWx1ZSA9IGN1cnJlbnRQcm9wZXJ0aWVzO1xuICAgIGVsc2VcbiAgICAgIHByZXZpb3VzVmFsdWUgPSBjYWxsYmFjayhwcmV2aW91c1ZhbHVlLCBjdXJyZW50UHJvcGVydGllcywgZmVhdHVyZUluZGV4KTtcbiAgfSk7XG4gIHJldHVybiBwcmV2aW91c1ZhbHVlO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBmZWF0dXJlRWFjaFxuICpcbiAqIEBjYWxsYmFjayBmZWF0dXJlRWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge0ZlYXR1cmU8YW55Pn0gY3VycmVudEZlYXR1cmUgVGhlIGN1cnJlbnQgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBmZWF0dXJlcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG9cbiAqIEFycmF5LmZvckVhY2guXG4gKlxuICogQG5hbWUgZmVhdHVyZUVhY2hcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBhbnkgR2VvSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgpXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgdHVyZi5wb2ludChbMjYsIDM3XSwge2ZvbzogJ2Jhcid9KSxcbiAqICAgdHVyZi5wb2ludChbMzYsIDUzXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuZmVhdHVyZUVhY2goZmVhdHVyZXMsIGZ1bmN0aW9uIChjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4KSB7XG4gKiAgIC8vPWN1cnJlbnRGZWF0dXJlXG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIGZlYXR1cmVFYWNoKGdlb2pzb24sIGNhbGxiYWNrKSB7XG4gIGlmIChnZW9qc29uLnR5cGUgPT09IFwiRmVhdHVyZVwiKSB7XG4gICAgY2FsbGJhY2soZ2VvanNvbiwgMCk7XG4gIH0gZWxzZSBpZiAoZ2VvanNvbi50eXBlID09PSBcIkZlYXR1cmVDb2xsZWN0aW9uXCIpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjYWxsYmFjayhnZW9qc29uLmZlYXR1cmVzW2ldLCBpKSA9PT0gZmFsc2UpIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBmZWF0dXJlUmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgZmVhdHVyZVJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHtGZWF0dXJlfSBjdXJyZW50RmVhdHVyZSBUaGUgY3VycmVudCBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogUmVkdWNlIGZlYXR1cmVzIGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5yZWR1Y2UoKS5cbiAqXG4gKiBAbmFtZSBmZWF0dXJlUmVkdWNlXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4KVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm5zIHsqfSBUaGUgdmFsdWUgdGhhdCByZXN1bHRzIGZyb20gdGhlIHJlZHVjdGlvbi5cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgdHVyZi5wb2ludChbMjYsIDM3XSwge1wiZm9vXCI6IFwiYmFyXCJ9KSxcbiAqICAgdHVyZi5wb2ludChbMzYsIDUzXSwge1wiaGVsbG9cIjogXCJ3b3JsZFwifSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuZmVhdHVyZVJlZHVjZShmZWF0dXJlcywgZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgpIHtcbiAqICAgLy89cHJldmlvdXNWYWx1ZVxuICogICAvLz1jdXJyZW50RmVhdHVyZVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgcmV0dXJuIGN1cnJlbnRGZWF0dXJlXG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gZmVhdHVyZVJlZHVjZShnZW9qc29uLCBjYWxsYmFjaywgaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBwcmV2aW91c1ZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICBmZWF0dXJlRWFjaChnZW9qc29uLCBmdW5jdGlvbiAoY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCkge1xuICAgIGlmIChmZWF0dXJlSW5kZXggPT09IDAgJiYgaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICBwcmV2aW91c1ZhbHVlID0gY3VycmVudEZlYXR1cmU7XG4gICAgZWxzZSBwcmV2aW91c1ZhbHVlID0gY2FsbGJhY2socHJldmlvdXNWYWx1ZSwgY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCk7XG4gIH0pO1xuICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbn1cblxuLyoqXG4gKiBHZXQgYWxsIGNvb3JkaW5hdGVzIGZyb20gYW55IEdlb0pTT04gb2JqZWN0LlxuICpcbiAqIEBuYW1lIGNvb3JkQWxsXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcmV0dXJucyB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IGNvb3JkaW5hdGUgcG9zaXRpb24gYXJyYXlcbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgdHVyZi5wb2ludChbMjYsIDM3XSwge2ZvbzogJ2Jhcid9KSxcbiAqICAgdHVyZi5wb2ludChbMzYsIDUzXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHZhciBjb29yZHMgPSB0dXJmLmNvb3JkQWxsKGZlYXR1cmVzKTtcbiAqIC8vPSBbWzI2LCAzN10sIFszNiwgNTNdXVxuICovXG5mdW5jdGlvbiBjb29yZEFsbChnZW9qc29uKSB7XG4gIHZhciBjb29yZHMgPSBbXTtcbiAgY29vcmRFYWNoKGdlb2pzb24sIGZ1bmN0aW9uIChjb29yZCkge1xuICAgIGNvb3Jkcy5wdXNoKGNvb3JkKTtcbiAgfSk7XG4gIHJldHVybiBjb29yZHM7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGdlb21FYWNoXG4gKlxuICogQGNhbGxiYWNrIGdlb21FYWNoQ2FsbGJhY2tcbiAqIEBwYXJhbSB7R2VvbWV0cnl9IGN1cnJlbnRHZW9tZXRyeSBUaGUgY3VycmVudCBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBmZWF0dXJlUHJvcGVydGllcyBUaGUgY3VycmVudCBGZWF0dXJlIFByb3BlcnRpZXMgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBmZWF0dXJlQkJveCBUaGUgY3VycmVudCBGZWF0dXJlIEJCb3ggYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBmZWF0dXJlSWQgVGhlIGN1cnJlbnQgRmVhdHVyZSBJZCBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgZWFjaCBnZW9tZXRyeSBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkuZm9yRWFjaCgpXG4gKlxuICogQG5hbWUgZ2VvbUVhY2hcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBhbnkgR2VvSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKGN1cnJlbnRHZW9tZXRyeSwgZmVhdHVyZUluZGV4LCBmZWF0dXJlUHJvcGVydGllcywgZmVhdHVyZUJCb3gsIGZlYXR1cmVJZClcbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgICAgdHVyZi5wb2ludChbMzYsIDUzXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuZ2VvbUVhY2goZmVhdHVyZXMsIGZ1bmN0aW9uIChjdXJyZW50R2VvbWV0cnksIGZlYXR1cmVJbmRleCwgZmVhdHVyZVByb3BlcnRpZXMsIGZlYXR1cmVCQm94LCBmZWF0dXJlSWQpIHtcbiAqICAgLy89Y3VycmVudEdlb21ldHJ5XG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1mZWF0dXJlUHJvcGVydGllc1xuICogICAvLz1mZWF0dXJlQkJveFxuICogICAvLz1mZWF0dXJlSWRcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBnZW9tRWFjaChnZW9qc29uLCBjYWxsYmFjaykge1xuICB2YXIgaSxcbiAgICBqLFxuICAgIGcsXG4gICAgZ2VvbWV0cnksXG4gICAgc3RvcEcsXG4gICAgZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb24sXG4gICAgaXNHZW9tZXRyeUNvbGxlY3Rpb24sXG4gICAgZmVhdHVyZVByb3BlcnRpZXMsXG4gICAgZmVhdHVyZUJCb3gsXG4gICAgZmVhdHVyZUlkLFxuICAgIGZlYXR1cmVJbmRleCA9IDAsXG4gICAgaXNGZWF0dXJlQ29sbGVjdGlvbiA9IGdlb2pzb24udHlwZSA9PT0gXCJGZWF0dXJlQ29sbGVjdGlvblwiLFxuICAgIGlzRmVhdHVyZSA9IGdlb2pzb24udHlwZSA9PT0gXCJGZWF0dXJlXCIsXG4gICAgc3RvcCA9IGlzRmVhdHVyZUNvbGxlY3Rpb24gPyBnZW9qc29uLmZlYXR1cmVzLmxlbmd0aCA6IDE7XG5cbiAgLy8gVGhpcyBsb2dpYyBtYXkgbG9vayBhIGxpdHRsZSB3ZWlyZC4gVGhlIHJlYXNvbiB3aHkgaXQgaXMgdGhhdCB3YXlcbiAgLy8gaXMgYmVjYXVzZSBpdCdzIHRyeWluZyB0byBiZSBmYXN0LiBHZW9KU09OIHN1cHBvcnRzIG11bHRpcGxlIGtpbmRzXG4gIC8vIG9mIG9iamVjdHMgYXQgaXRzIHJvb3Q6IEZlYXR1cmVDb2xsZWN0aW9uLCBGZWF0dXJlcywgR2VvbWV0cmllcy5cbiAgLy8gVGhpcyBmdW5jdGlvbiBoYXMgdGhlIHJlc3BvbnNpYmlsaXR5IG9mIGhhbmRsaW5nIGFsbCBvZiB0aGVtLCBhbmQgdGhhdFxuICAvLyBtZWFucyB0aGF0IHNvbWUgb2YgdGhlIGBmb3JgIGxvb3BzIHlvdSBzZWUgYmVsb3cgYWN0dWFsbHkganVzdCBkb24ndCBhcHBseVxuICAvLyB0byBjZXJ0YWluIGlucHV0cy4gRm9yIGluc3RhbmNlLCBpZiB5b3UgZ2l2ZSB0aGlzIGp1c3QgYVxuICAvLyBQb2ludCBnZW9tZXRyeSwgdGhlbiBib3RoIGxvb3BzIGFyZSBzaG9ydC1jaXJjdWl0ZWQgYW5kIGFsbCB3ZSBkb1xuICAvLyBpcyBncmFkdWFsbHkgcmVuYW1lIHRoZSBpbnB1dCB1bnRpbCBpdCdzIGNhbGxlZCAnZ2VvbWV0cnknLlxuICAvL1xuICAvLyBUaGlzIGFsc28gYWltcyB0byBhbGxvY2F0ZSBhcyBmZXcgcmVzb3VyY2VzIGFzIHBvc3NpYmxlOiBqdXN0IGFcbiAgLy8gZmV3IG51bWJlcnMgYW5kIGJvb2xlYW5zLCByYXRoZXIgdGhhbiBhbnkgdGVtcG9yYXJ5IGFycmF5cyBhcyB3b3VsZFxuICAvLyBiZSByZXF1aXJlZCB3aXRoIHRoZSBub3JtYWxpemF0aW9uIGFwcHJvYWNoLlxuICBmb3IgKGkgPSAwOyBpIDwgc3RvcDsgaSsrKSB7XG4gICAgZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb24gPSBpc0ZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb2pzb24uZmVhdHVyZXNbaV0uZ2VvbWV0cnlcbiAgICAgIDogaXNGZWF0dXJlXG4gICAgICA/IGdlb2pzb24uZ2VvbWV0cnlcbiAgICAgIDogZ2VvanNvbjtcbiAgICBmZWF0dXJlUHJvcGVydGllcyA9IGlzRmVhdHVyZUNvbGxlY3Rpb25cbiAgICAgID8gZ2VvanNvbi5mZWF0dXJlc1tpXS5wcm9wZXJ0aWVzXG4gICAgICA6IGlzRmVhdHVyZVxuICAgICAgPyBnZW9qc29uLnByb3BlcnRpZXNcbiAgICAgIDoge307XG4gICAgZmVhdHVyZUJCb3ggPSBpc0ZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb2pzb24uZmVhdHVyZXNbaV0uYmJveFxuICAgICAgOiBpc0ZlYXR1cmVcbiAgICAgID8gZ2VvanNvbi5iYm94XG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICBmZWF0dXJlSWQgPSBpc0ZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb2pzb24uZmVhdHVyZXNbaV0uaWRcbiAgICAgIDogaXNGZWF0dXJlXG4gICAgICA/IGdlb2pzb24uaWRcbiAgICAgIDogdW5kZWZpbmVkO1xuICAgIGlzR2VvbWV0cnlDb2xsZWN0aW9uID0gZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb25cbiAgICAgID8gZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb24udHlwZSA9PT0gXCJHZW9tZXRyeUNvbGxlY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgICBzdG9wRyA9IGlzR2VvbWV0cnlDb2xsZWN0aW9uXG4gICAgICA/IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLmdlb21ldHJpZXMubGVuZ3RoXG4gICAgICA6IDE7XG5cbiAgICBmb3IgKGcgPSAwOyBnIDwgc3RvcEc7IGcrKykge1xuICAgICAgZ2VvbWV0cnkgPSBpc0dlb21ldHJ5Q29sbGVjdGlvblxuICAgICAgICA/IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLmdlb21ldHJpZXNbZ11cbiAgICAgICAgOiBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbjtcblxuICAgICAgLy8gSGFuZGxlIG51bGwgR2VvbWV0cnlcbiAgICAgIGlmIChnZW9tZXRyeSA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgZmVhdHVyZVByb3BlcnRpZXMsXG4gICAgICAgICAgICBmZWF0dXJlQkJveCxcbiAgICAgICAgICAgIGZlYXR1cmVJZFxuICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChnZW9tZXRyeS50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgICBjYXNlIFwiTXVsdGlQb2ludFwiOlxuICAgICAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6XG4gICAgICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjoge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICBnZW9tZXRyeSxcbiAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICBmZWF0dXJlUHJvcGVydGllcyxcbiAgICAgICAgICAgICAgZmVhdHVyZUJCb3gsXG4gICAgICAgICAgICAgIGZlYXR1cmVJZFxuICAgICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiOiB7XG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGdlb21ldHJ5Lmdlb21ldHJpZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICAgICAgZ2VvbWV0cnkuZ2VvbWV0cmllc1tqXSxcbiAgICAgICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgICAgZmVhdHVyZVByb3BlcnRpZXMsXG4gICAgICAgICAgICAgICAgZmVhdHVyZUJCb3gsXG4gICAgICAgICAgICAgICAgZmVhdHVyZUlkXG4gICAgICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIEdlb21ldHJ5IFR5cGVcIik7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIE9ubHkgaW5jcmVhc2UgYGZlYXR1cmVJbmRleGAgcGVyIGVhY2ggZmVhdHVyZVxuICAgIGZlYXR1cmVJbmRleCsrO1xuICB9XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGdlb21SZWR1Y2VcbiAqXG4gKiBUaGUgZmlyc3QgdGltZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGUgdmFsdWVzIHByb3ZpZGVkIGFzIGFyZ3VtZW50cyBkZXBlbmRcbiAqIG9uIHdoZXRoZXIgdGhlIHJlZHVjZSBtZXRob2QgaGFzIGFuIGluaXRpYWxWYWx1ZSBhcmd1bWVudC5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgcHJvdmlkZWQgdG8gdGhlIHJlZHVjZSBtZXRob2Q6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyBpbml0aWFsVmFsdWUuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgbm90IHByb3ZpZGVkOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIHNlY29uZCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIEBjYWxsYmFjayBnZW9tUmVkdWNlQ2FsbGJhY2tcbiAqIEBwYXJhbSB7Kn0gcHJldmlvdXNWYWx1ZSBUaGUgYWNjdW11bGF0ZWQgdmFsdWUgcHJldmlvdXNseSByZXR1cm5lZCBpbiB0aGUgbGFzdCBpbnZvY2F0aW9uXG4gKiBvZiB0aGUgY2FsbGJhY2ssIG9yIGluaXRpYWxWYWx1ZSwgaWYgc3VwcGxpZWQuXG4gKiBAcGFyYW0ge0dlb21ldHJ5fSBjdXJyZW50R2VvbWV0cnkgVGhlIGN1cnJlbnQgR2VvbWV0cnkgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gZmVhdHVyZVByb3BlcnRpZXMgVGhlIGN1cnJlbnQgRmVhdHVyZSBQcm9wZXJ0aWVzIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gZmVhdHVyZUJCb3ggVGhlIGN1cnJlbnQgRmVhdHVyZSBCQm94IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gZmVhdHVyZUlkIFRoZSBjdXJyZW50IEZlYXR1cmUgSWQgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogUmVkdWNlIGdlb21ldHJ5IGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5yZWR1Y2UoKS5cbiAqXG4gKiBAbmFtZSBnZW9tUmVkdWNlXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50R2VvbWV0cnksIGZlYXR1cmVJbmRleCwgZmVhdHVyZVByb3BlcnRpZXMsIGZlYXR1cmVCQm94LCBmZWF0dXJlSWQpXG4gKiBAcGFyYW0geyp9IFtpbml0aWFsVmFsdWVdIFZhbHVlIHRvIHVzZSBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIGZpcnN0IGNhbGwgb2YgdGhlIGNhbGxiYWNrLlxuICogQHJldHVybnMgeyp9IFRoZSB2YWx1ZSB0aGF0IHJlc3VsdHMgZnJvbSB0aGUgcmVkdWN0aW9uLlxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgICAgdHVyZi5wb2ludChbMzYsIDUzXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuZ2VvbVJlZHVjZShmZWF0dXJlcywgZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRHZW9tZXRyeSwgZmVhdHVyZUluZGV4LCBmZWF0dXJlUHJvcGVydGllcywgZmVhdHVyZUJCb3gsIGZlYXR1cmVJZCkge1xuICogICAvLz1wcmV2aW91c1ZhbHVlXG4gKiAgIC8vPWN1cnJlbnRHZW9tZXRyeVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgLy89ZmVhdHVyZVByb3BlcnRpZXNcbiAqICAgLy89ZmVhdHVyZUJCb3hcbiAqICAgLy89ZmVhdHVyZUlkXG4gKiAgIHJldHVybiBjdXJyZW50R2VvbWV0cnlcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBnZW9tUmVkdWNlKGdlb2pzb24sIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUpIHtcbiAgdmFyIHByZXZpb3VzVmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gIGdlb21FYWNoKFxuICAgIGdlb2pzb24sXG4gICAgZnVuY3Rpb24gKFxuICAgICAgY3VycmVudEdlb21ldHJ5LFxuICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgZmVhdHVyZVByb3BlcnRpZXMsXG4gICAgICBmZWF0dXJlQkJveCxcbiAgICAgIGZlYXR1cmVJZFxuICAgICkge1xuICAgICAgaWYgKGZlYXR1cmVJbmRleCA9PT0gMCAmJiBpbml0aWFsVmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGN1cnJlbnRHZW9tZXRyeTtcbiAgICAgIGVsc2VcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGNhbGxiYWNrKFxuICAgICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgICAgY3VycmVudEdlb21ldHJ5LFxuICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICBmZWF0dXJlUHJvcGVydGllcyxcbiAgICAgICAgICBmZWF0dXJlQkJveCxcbiAgICAgICAgICBmZWF0dXJlSWRcbiAgICAgICAgKTtcbiAgICB9XG4gICk7XG4gIHJldHVybiBwcmV2aW91c1ZhbHVlO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBmbGF0dGVuRWFjaFxuICpcbiAqIEBjYWxsYmFjayBmbGF0dGVuRWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge0ZlYXR1cmV9IGN1cnJlbnRGZWF0dXJlIFRoZSBjdXJyZW50IGZsYXR0ZW5lZCBmZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBmbGF0dGVuZWQgZmVhdHVyZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvXG4gKiBBcnJheS5mb3JFYWNoLlxuICpcbiAqIEBuYW1lIGZsYXR0ZW5FYWNoXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleClcbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgICB0dXJmLnBvaW50KFsyNiwgMzddLCB7Zm9vOiAnYmFyJ30pLFxuICogICAgIHR1cmYubXVsdGlQb2ludChbWzQwLCAzMF0sIFszNiwgNTNdXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuZmxhdHRlbkVhY2goZmVhdHVyZXMsIGZ1bmN0aW9uIChjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCkge1xuICogICAvLz1jdXJyZW50RmVhdHVyZVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgLy89bXVsdGlGZWF0dXJlSW5kZXhcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBmbGF0dGVuRWFjaChnZW9qc29uLCBjYWxsYmFjaykge1xuICBnZW9tRWFjaChnZW9qc29uLCBmdW5jdGlvbiAoZ2VvbWV0cnksIGZlYXR1cmVJbmRleCwgcHJvcGVydGllcywgYmJveCwgaWQpIHtcbiAgICAvLyBDYWxsYmFjayBmb3Igc2luZ2xlIGdlb21ldHJ5XG4gICAgdmFyIHR5cGUgPSBnZW9tZXRyeSA9PT0gbnVsbCA/IG51bGwgOiBnZW9tZXRyeS50eXBlO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBudWxsOlxuICAgICAgY2FzZSBcIlBvaW50XCI6XG4gICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgaGVscGVycy5mZWF0dXJlKGdlb21ldHJ5LCBwcm9wZXJ0aWVzLCB7IGJib3g6IGJib3gsIGlkOiBpZCB9KSxcbiAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGdlb21UeXBlO1xuXG4gICAgLy8gQ2FsbGJhY2sgZm9yIG11bHRpLWdlb21ldHJ5XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwiTXVsdGlQb2ludFwiOlxuICAgICAgICBnZW9tVHlwZSA9IFwiUG9pbnRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6XG4gICAgICAgIGdlb21UeXBlID0gXCJMaW5lU3RyaW5nXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIk11bHRpUG9seWdvblwiOlxuICAgICAgICBnZW9tVHlwZSA9IFwiUG9seWdvblwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBmb3IgKFxuICAgICAgdmFyIG11bHRpRmVhdHVyZUluZGV4ID0gMDtcbiAgICAgIG11bHRpRmVhdHVyZUluZGV4IDwgZ2VvbWV0cnkuY29vcmRpbmF0ZXMubGVuZ3RoO1xuICAgICAgbXVsdGlGZWF0dXJlSW5kZXgrK1xuICAgICkge1xuICAgICAgdmFyIGNvb3JkaW5hdGUgPSBnZW9tZXRyeS5jb29yZGluYXRlc1ttdWx0aUZlYXR1cmVJbmRleF07XG4gICAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogZ2VvbVR5cGUsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlLFxuICAgICAgfTtcbiAgICAgIGlmIChcbiAgICAgICAgY2FsbGJhY2soaGVscGVycy5mZWF0dXJlKGdlb20sIHByb3BlcnRpZXMpLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KSA9PT1cbiAgICAgICAgZmFsc2VcbiAgICAgIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGZsYXR0ZW5SZWR1Y2VcbiAqXG4gKiBUaGUgZmlyc3QgdGltZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGUgdmFsdWVzIHByb3ZpZGVkIGFzIGFyZ3VtZW50cyBkZXBlbmRcbiAqIG9uIHdoZXRoZXIgdGhlIHJlZHVjZSBtZXRob2QgaGFzIGFuIGluaXRpYWxWYWx1ZSBhcmd1bWVudC5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgcHJvdmlkZWQgdG8gdGhlIHJlZHVjZSBtZXRob2Q6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyBpbml0aWFsVmFsdWUuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgbm90IHByb3ZpZGVkOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIHNlY29uZCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIEBjYWxsYmFjayBmbGF0dGVuUmVkdWNlQ2FsbGJhY2tcbiAqIEBwYXJhbSB7Kn0gcHJldmlvdXNWYWx1ZSBUaGUgYWNjdW11bGF0ZWQgdmFsdWUgcHJldmlvdXNseSByZXR1cm5lZCBpbiB0aGUgbGFzdCBpbnZvY2F0aW9uXG4gKiBvZiB0aGUgY2FsbGJhY2ssIG9yIGluaXRpYWxWYWx1ZSwgaWYgc3VwcGxpZWQuXG4gKiBAcGFyYW0ge0ZlYXR1cmV9IGN1cnJlbnRGZWF0dXJlIFRoZSBjdXJyZW50IEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlGZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIE11bHRpLUZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogUmVkdWNlIGZsYXR0ZW5lZCBmZWF0dXJlcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkucmVkdWNlKCkuXG4gKlxuICogQG5hbWUgZmxhdHRlblJlZHVjZVxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpXG4gKiBAcGFyYW0geyp9IFtpbml0aWFsVmFsdWVdIFZhbHVlIHRvIHVzZSBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIGZpcnN0IGNhbGwgb2YgdGhlIGNhbGxiYWNrLlxuICogQHJldHVybnMgeyp9IFRoZSB2YWx1ZSB0aGF0IHJlc3VsdHMgZnJvbSB0aGUgcmVkdWN0aW9uLlxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgICAgdHVyZi5tdWx0aVBvaW50KFtbNDAsIDMwXSwgWzM2LCA1M11dLCB7aGVsbG86ICd3b3JsZCd9KVxuICogXSk7XG4gKlxuICogdHVyZi5mbGF0dGVuUmVkdWNlKGZlYXR1cmVzLCBmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpIHtcbiAqICAgLy89cHJldmlvdXNWYWx1ZVxuICogICAvLz1jdXJyZW50RmVhdHVyZVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgLy89bXVsdGlGZWF0dXJlSW5kZXhcbiAqICAgcmV0dXJuIGN1cnJlbnRGZWF0dXJlXG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gZmxhdHRlblJlZHVjZShnZW9qc29uLCBjYWxsYmFjaywgaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBwcmV2aW91c1ZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICBmbGF0dGVuRWFjaChcbiAgICBnZW9qc29uLFxuICAgIGZ1bmN0aW9uIChjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCkge1xuICAgICAgaWYgKFxuICAgICAgICBmZWF0dXJlSW5kZXggPT09IDAgJiZcbiAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXggPT09IDAgJiZcbiAgICAgICAgaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgIClcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGN1cnJlbnRGZWF0dXJlO1xuICAgICAgZWxzZVxuICAgICAgICBwcmV2aW91c1ZhbHVlID0gY2FsbGJhY2soXG4gICAgICAgICAgcHJldmlvdXNWYWx1ZSxcbiAgICAgICAgICBjdXJyZW50RmVhdHVyZSxcbiAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXhcbiAgICAgICAgKTtcbiAgICB9XG4gICk7XG4gIHJldHVybiBwcmV2aW91c1ZhbHVlO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBzZWdtZW50RWFjaFxuICpcbiAqIEBjYWxsYmFjayBzZWdtZW50RWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge0ZlYXR1cmU8TGluZVN0cmluZz59IGN1cnJlbnRTZWdtZW50IFRoZSBjdXJyZW50IFNlZ21lbnQgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlGZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIE11bHRpLUZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGdlb21ldHJ5SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEdlb21ldHJ5IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWdtZW50SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIFNlZ21lbnQgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgMi12ZXJ0ZXggbGluZSBzZWdtZW50IGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5mb3JFYWNoKClcbiAqIChNdWx0aSlQb2ludCBnZW9tZXRyaWVzIGRvIG5vdCBjb250YWluIHNlZ21lbnRzIHRoZXJlZm9yZSB0aGV5IGFyZSBpZ25vcmVkIGR1cmluZyB0aGlzIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT05cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKGN1cnJlbnRTZWdtZW50LCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4LCBzZWdtZW50SW5kZXgpXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9seWdvbiA9IHR1cmYucG9seWdvbihbW1stNTAsIDVdLCBbLTQwLCAtMTBdLCBbLTUwLCAtMTBdLCBbLTQwLCA1XSwgWy01MCwgNV1dXSk7XG4gKlxuICogLy8gSXRlcmF0ZSBvdmVyIEdlb0pTT04gYnkgMi12ZXJ0ZXggc2VnbWVudHNcbiAqIHR1cmYuc2VnbWVudEVhY2gocG9seWdvbiwgZnVuY3Rpb24gKGN1cnJlbnRTZWdtZW50LCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4LCBzZWdtZW50SW5kZXgpIHtcbiAqICAgLy89Y3VycmVudFNlZ21lbnRcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPW11bHRpRmVhdHVyZUluZGV4XG4gKiAgIC8vPWdlb21ldHJ5SW5kZXhcbiAqICAgLy89c2VnbWVudEluZGV4XG4gKiB9KTtcbiAqXG4gKiAvLyBDYWxjdWxhdGUgdGhlIHRvdGFsIG51bWJlciBvZiBzZWdtZW50c1xuICogdmFyIHRvdGFsID0gMDtcbiAqIHR1cmYuc2VnbWVudEVhY2gocG9seWdvbiwgZnVuY3Rpb24gKCkge1xuICogICAgIHRvdGFsKys7XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gc2VnbWVudEVhY2goZ2VvanNvbiwgY2FsbGJhY2spIHtcbiAgZmxhdHRlbkVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpIHtcbiAgICB2YXIgc2VnbWVudEluZGV4ID0gMDtcblxuICAgIC8vIEV4Y2x1ZGUgbnVsbCBHZW9tZXRyaWVzXG4gICAgaWYgKCFmZWF0dXJlLmdlb21ldHJ5KSByZXR1cm47XG4gICAgLy8gKE11bHRpKVBvaW50IGdlb21ldHJpZXMgZG8gbm90IGNvbnRhaW4gc2VnbWVudHMgdGhlcmVmb3JlIHRoZXkgYXJlIGlnbm9yZWQgZHVyaW5nIHRoaXMgb3BlcmF0aW9uLlxuICAgIHZhciB0eXBlID0gZmVhdHVyZS5nZW9tZXRyeS50eXBlO1xuICAgIGlmICh0eXBlID09PSBcIlBvaW50XCIgfHwgdHlwZSA9PT0gXCJNdWx0aVBvaW50XCIpIHJldHVybjtcblxuICAgIC8vIEdlbmVyYXRlIDItdmVydGV4IGxpbmUgc2VnbWVudHNcbiAgICB2YXIgcHJldmlvdXNDb29yZHM7XG4gICAgdmFyIHByZXZpb3VzRmVhdHVyZUluZGV4ID0gMDtcbiAgICB2YXIgcHJldmlvdXNNdWx0aUluZGV4ID0gMDtcbiAgICB2YXIgcHJldkdlb21JbmRleCA9IDA7XG4gICAgaWYgKFxuICAgICAgY29vcmRFYWNoKFxuICAgICAgICBmZWF0dXJlLFxuICAgICAgICBmdW5jdGlvbiAoXG4gICAgICAgICAgY3VycmVudENvb3JkLFxuICAgICAgICAgIGNvb3JkSW5kZXgsXG4gICAgICAgICAgZmVhdHVyZUluZGV4Q29vcmQsXG4gICAgICAgICAgbXVsdGlQYXJ0SW5kZXhDb29yZCxcbiAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICkge1xuICAgICAgICAgIC8vIFNpbXVsYXRpbmcgYSBtZXRhLmNvb3JkUmVkdWNlKCkgc2luY2UgYHJlZHVjZWAgb3BlcmF0aW9ucyBjYW5ub3QgYmUgc3RvcHBlZCBieSByZXR1cm5pbmcgYGZhbHNlYFxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHByZXZpb3VzQ29vcmRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIGZlYXR1cmVJbmRleCA+IHByZXZpb3VzRmVhdHVyZUluZGV4IHx8XG4gICAgICAgICAgICBtdWx0aVBhcnRJbmRleENvb3JkID4gcHJldmlvdXNNdWx0aUluZGV4IHx8XG4gICAgICAgICAgICBnZW9tZXRyeUluZGV4ID4gcHJldkdlb21JbmRleFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcHJldmlvdXNDb29yZHMgPSBjdXJyZW50Q29vcmQ7XG4gICAgICAgICAgICBwcmV2aW91c0ZlYXR1cmVJbmRleCA9IGZlYXR1cmVJbmRleDtcbiAgICAgICAgICAgIHByZXZpb3VzTXVsdGlJbmRleCA9IG11bHRpUGFydEluZGV4Q29vcmQ7XG4gICAgICAgICAgICBwcmV2R2VvbUluZGV4ID0gZ2VvbWV0cnlJbmRleDtcbiAgICAgICAgICAgIHNlZ21lbnRJbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBjdXJyZW50U2VnbWVudCA9IGhlbHBlcnMubGluZVN0cmluZyhcbiAgICAgICAgICAgIFtwcmV2aW91c0Nvb3JkcywgY3VycmVudENvb3JkXSxcbiAgICAgICAgICAgIGZlYXR1cmUucHJvcGVydGllc1xuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICAgIGN1cnJlbnRTZWdtZW50LFxuICAgICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4LFxuICAgICAgICAgICAgICBzZWdtZW50SW5kZXhcbiAgICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIHNlZ21lbnRJbmRleCsrO1xuICAgICAgICAgIHByZXZpb3VzQ29vcmRzID0gY3VycmVudENvb3JkO1xuICAgICAgICB9XG4gICAgICApID09PSBmYWxzZVxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHNlZ21lbnRSZWR1Y2VcbiAqXG4gKiBUaGUgZmlyc3QgdGltZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGUgdmFsdWVzIHByb3ZpZGVkIGFzIGFyZ3VtZW50cyBkZXBlbmRcbiAqIG9uIHdoZXRoZXIgdGhlIHJlZHVjZSBtZXRob2QgaGFzIGFuIGluaXRpYWxWYWx1ZSBhcmd1bWVudC5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgcHJvdmlkZWQgdG8gdGhlIHJlZHVjZSBtZXRob2Q6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyBpbml0aWFsVmFsdWUuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgbm90IHByb3ZpZGVkOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIHNlY29uZCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIEBjYWxsYmFjayBzZWdtZW50UmVkdWNlQ2FsbGJhY2tcbiAqIEBwYXJhbSB7Kn0gcHJldmlvdXNWYWx1ZSBUaGUgYWNjdW11bGF0ZWQgdmFsdWUgcHJldmlvdXNseSByZXR1cm5lZCBpbiB0aGUgbGFzdCBpbnZvY2F0aW9uXG4gKiBvZiB0aGUgY2FsbGJhY2ssIG9yIGluaXRpYWxWYWx1ZSwgaWYgc3VwcGxpZWQuXG4gKiBAcGFyYW0ge0ZlYXR1cmU8TGluZVN0cmluZz59IGN1cnJlbnRTZWdtZW50IFRoZSBjdXJyZW50IFNlZ21lbnQgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlGZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIE11bHRpLUZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGdlb21ldHJ5SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEdlb21ldHJ5IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWdtZW50SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIFNlZ21lbnQgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogUmVkdWNlIDItdmVydGV4IGxpbmUgc2VnbWVudCBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkucmVkdWNlKClcbiAqIChNdWx0aSlQb2ludCBnZW9tZXRyaWVzIGRvIG5vdCBjb250YWluIHNlZ21lbnRzIHRoZXJlZm9yZSB0aGV5IGFyZSBpZ25vcmVkIGR1cmluZyB0aGlzIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT05cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRTZWdtZW50LCBjdXJyZW50SW5kZXgpXG4gKiBAcGFyYW0geyp9IFtpbml0aWFsVmFsdWVdIFZhbHVlIHRvIHVzZSBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIGZpcnN0IGNhbGwgb2YgdGhlIGNhbGxiYWNrLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZXhhbXBsZVxuICogdmFyIHBvbHlnb24gPSB0dXJmLnBvbHlnb24oW1tbLTUwLCA1XSwgWy00MCwgLTEwXSwgWy01MCwgLTEwXSwgWy00MCwgNV0sIFstNTAsIDVdXV0pO1xuICpcbiAqIC8vIEl0ZXJhdGUgb3ZlciBHZW9KU09OIGJ5IDItdmVydGV4IHNlZ21lbnRzXG4gKiB0dXJmLnNlZ21lbnRSZWR1Y2UocG9seWdvbiwgZnVuY3Rpb24gKHByZXZpb3VzU2VnbWVudCwgY3VycmVudFNlZ21lbnQsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgsIHNlZ21lbnRJbmRleCkge1xuICogICAvLz0gcHJldmlvdXNTZWdtZW50XG4gKiAgIC8vPSBjdXJyZW50U2VnbWVudFxuICogICAvLz0gZmVhdHVyZUluZGV4XG4gKiAgIC8vPSBtdWx0aUZlYXR1cmVJbmRleFxuICogICAvLz0gZ2VvbWV0cnlJbmRleFxuICogICAvLz0gc2VnbWVudEluZGV4XG4gKiAgIHJldHVybiBjdXJyZW50U2VnbWVudFxuICogfSk7XG4gKlxuICogLy8gQ2FsY3VsYXRlIHRoZSB0b3RhbCBudW1iZXIgb2Ygc2VnbWVudHNcbiAqIHZhciBpbml0aWFsVmFsdWUgPSAwXG4gKiB2YXIgdG90YWwgPSB0dXJmLnNlZ21lbnRSZWR1Y2UocG9seWdvbiwgZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUpIHtcbiAqICAgICBwcmV2aW91c1ZhbHVlKys7XG4gKiAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG4gKiB9LCBpbml0aWFsVmFsdWUpO1xuICovXG5mdW5jdGlvbiBzZWdtZW50UmVkdWNlKGdlb2pzb24sIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUpIHtcbiAgdmFyIHByZXZpb3VzVmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gIHZhciBzdGFydGVkID0gZmFsc2U7XG4gIHNlZ21lbnRFYWNoKFxuICAgIGdlb2pzb24sXG4gICAgZnVuY3Rpb24gKFxuICAgICAgY3VycmVudFNlZ21lbnQsXG4gICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgIGdlb21ldHJ5SW5kZXgsXG4gICAgICBzZWdtZW50SW5kZXhcbiAgICApIHtcbiAgICAgIGlmIChzdGFydGVkID09PSBmYWxzZSAmJiBpbml0aWFsVmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGN1cnJlbnRTZWdtZW50O1xuICAgICAgZWxzZVxuICAgICAgICBwcmV2aW91c1ZhbHVlID0gY2FsbGJhY2soXG4gICAgICAgICAgcHJldmlvdXNWYWx1ZSxcbiAgICAgICAgICBjdXJyZW50U2VnbWVudCxcbiAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICAgICAgZ2VvbWV0cnlJbmRleCxcbiAgICAgICAgICBzZWdtZW50SW5kZXhcbiAgICAgICAgKTtcbiAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgIH1cbiAgKTtcbiAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGxpbmVFYWNoXG4gKlxuICogQGNhbGxiYWNrIGxpbmVFYWNoQ2FsbGJhY2tcbiAqIEBwYXJhbSB7RmVhdHVyZTxMaW5lU3RyaW5nPn0gY3VycmVudExpbmUgVGhlIGN1cnJlbnQgTGluZVN0cmluZ3xMaW5lYXJSaW5nIGJlaW5nIHByb2Nlc3NlZFxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aUZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgTXVsdGktRmVhdHVyZSBiZWluZyBwcm9jZXNzZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBnZW9tZXRyeUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWRcbiAqL1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBsaW5lIG9yIHJpbmcgY29vcmRpbmF0ZXMgaW4gTGluZVN0cmluZywgUG9seWdvbiwgTXVsdGlMaW5lU3RyaW5nLCBNdWx0aVBvbHlnb24gRmVhdHVyZXMgb3IgR2VvbWV0cmllcyxcbiAqIHNpbWlsYXIgdG8gQXJyYXkuZm9yRWFjaC5cbiAqXG4gKiBAbmFtZSBsaW5lRWFjaFxuICogQHBhcmFtIHtHZW9tZXRyeXxGZWF0dXJlPExpbmVTdHJpbmd8UG9seWdvbnxNdWx0aUxpbmVTdHJpbmd8TXVsdGlQb2x5Z29uPn0gZ2VvanNvbiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKGN1cnJlbnRMaW5lLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KVxuICogQGV4YW1wbGVcbiAqIHZhciBtdWx0aUxpbmUgPSB0dXJmLm11bHRpTGluZVN0cmluZyhbXG4gKiAgIFtbMjYsIDM3XSwgWzM1LCA0NV1dLFxuICogICBbWzM2LCA1M10sIFszOCwgNTBdLCBbNDEsIDU1XV1cbiAqIF0pO1xuICpcbiAqIHR1cmYubGluZUVhY2gobXVsdGlMaW5lLCBmdW5jdGlvbiAoY3VycmVudExpbmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgpIHtcbiAqICAgLy89Y3VycmVudExpbmVcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPW11bHRpRmVhdHVyZUluZGV4XG4gKiAgIC8vPWdlb21ldHJ5SW5kZXhcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBsaW5lRWFjaChnZW9qc29uLCBjYWxsYmFjaykge1xuICAvLyB2YWxpZGF0aW9uXG4gIGlmICghZ2VvanNvbikgdGhyb3cgbmV3IEVycm9yKFwiZ2VvanNvbiBpcyByZXF1aXJlZFwiKTtcblxuICBmbGF0dGVuRWFjaChnZW9qc29uLCBmdW5jdGlvbiAoZmVhdHVyZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCkge1xuICAgIGlmIChmZWF0dXJlLmdlb21ldHJ5ID09PSBudWxsKSByZXR1cm47XG4gICAgdmFyIHR5cGUgPSBmZWF0dXJlLmdlb21ldHJ5LnR5cGU7XG4gICAgdmFyIGNvb3JkcyA9IGZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgICBpZiAoY2FsbGJhY2soZmVhdHVyZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgMCwgMCkgPT09IGZhbHNlKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgICBmb3IgKFxuICAgICAgICAgIHZhciBnZW9tZXRyeUluZGV4ID0gMDtcbiAgICAgICAgICBnZW9tZXRyeUluZGV4IDwgY29vcmRzLmxlbmd0aDtcbiAgICAgICAgICBnZW9tZXRyeUluZGV4KytcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICAgIGhlbHBlcnMubGluZVN0cmluZyhjb29yZHNbZ2VvbWV0cnlJbmRleF0sIGZlYXR1cmUucHJvcGVydGllcyksXG4gICAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgIGdlb21ldHJ5SW5kZXhcbiAgICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGxpbmVSZWR1Y2VcbiAqXG4gKiBUaGUgZmlyc3QgdGltZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGUgdmFsdWVzIHByb3ZpZGVkIGFzIGFyZ3VtZW50cyBkZXBlbmRcbiAqIG9uIHdoZXRoZXIgdGhlIHJlZHVjZSBtZXRob2QgaGFzIGFuIGluaXRpYWxWYWx1ZSBhcmd1bWVudC5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgcHJvdmlkZWQgdG8gdGhlIHJlZHVjZSBtZXRob2Q6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyBpbml0aWFsVmFsdWUuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgbm90IHByb3ZpZGVkOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIHNlY29uZCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIEBjYWxsYmFjayBsaW5lUmVkdWNlQ2FsbGJhY2tcbiAqIEBwYXJhbSB7Kn0gcHJldmlvdXNWYWx1ZSBUaGUgYWNjdW11bGF0ZWQgdmFsdWUgcHJldmlvdXNseSByZXR1cm5lZCBpbiB0aGUgbGFzdCBpbnZvY2F0aW9uXG4gKiBvZiB0aGUgY2FsbGJhY2ssIG9yIGluaXRpYWxWYWx1ZSwgaWYgc3VwcGxpZWQuXG4gKiBAcGFyYW0ge0ZlYXR1cmU8TGluZVN0cmluZz59IGN1cnJlbnRMaW5lIFRoZSBjdXJyZW50IExpbmVTdHJpbmd8TGluZWFyUmluZyBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZFxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZFxuICogQHBhcmFtIHtudW1iZXJ9IGdlb21ldHJ5SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEdlb21ldHJ5IGJlaW5nIHByb2Nlc3NlZFxuICovXG5cbi8qKlxuICogUmVkdWNlIGZlYXR1cmVzIGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5yZWR1Y2UoKS5cbiAqXG4gKiBAbmFtZSBsaW5lUmVkdWNlXG4gKiBAcGFyYW0ge0dlb21ldHJ5fEZlYXR1cmU8TGluZVN0cmluZ3xQb2x5Z29ufE11bHRpTGluZVN0cmluZ3xNdWx0aVBvbHlnb24+fSBnZW9qc29uIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudExpbmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgpXG4gKiBAcGFyYW0geyp9IFtpbml0aWFsVmFsdWVdIFZhbHVlIHRvIHVzZSBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIGZpcnN0IGNhbGwgb2YgdGhlIGNhbGxiYWNrLlxuICogQHJldHVybnMgeyp9IFRoZSB2YWx1ZSB0aGF0IHJlc3VsdHMgZnJvbSB0aGUgcmVkdWN0aW9uLlxuICogQGV4YW1wbGVcbiAqIHZhciBtdWx0aVBvbHkgPSB0dXJmLm11bHRpUG9seWdvbihbXG4gKiAgIHR1cmYucG9seWdvbihbW1sxMiw0OF0sWzIsNDFdLFsyNCwzOF0sWzEyLDQ4XV0sIFtbOSw0NF0sWzEzLDQxXSxbMTMsNDVdLFs5LDQ0XV1dKSxcbiAqICAgdHVyZi5wb2x5Z29uKFtbWzUsIDVdLCBbMCwgMF0sIFsyLCAyXSwgWzQsIDRdLCBbNSwgNV1dXSlcbiAqIF0pO1xuICpcbiAqIHR1cmYubGluZVJlZHVjZShtdWx0aVBvbHksIGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50TGluZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleCkge1xuICogICAvLz1wcmV2aW91c1ZhbHVlXG4gKiAgIC8vPWN1cnJlbnRMaW5lXG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1tdWx0aUZlYXR1cmVJbmRleFxuICogICAvLz1nZW9tZXRyeUluZGV4XG4gKiAgIHJldHVybiBjdXJyZW50TGluZVxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIGxpbmVSZWR1Y2UoZ2VvanNvbiwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuICB2YXIgcHJldmlvdXNWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgbGluZUVhY2goXG4gICAgZ2VvanNvbixcbiAgICBmdW5jdGlvbiAoY3VycmVudExpbmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgpIHtcbiAgICAgIGlmIChmZWF0dXJlSW5kZXggPT09IDAgJiYgaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50TGluZTtcbiAgICAgIGVsc2VcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGNhbGxiYWNrKFxuICAgICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgICAgY3VycmVudExpbmUsXG4gICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgIGdlb21ldHJ5SW5kZXhcbiAgICAgICAgKTtcbiAgICB9XG4gICk7XG4gIHJldHVybiBwcmV2aW91c1ZhbHVlO1xufVxuXG4vKipcbiAqIEZpbmRzIGEgcGFydGljdWxhciAyLXZlcnRleCBMaW5lU3RyaW5nIFNlZ21lbnQgZnJvbSBhIEdlb0pTT04gdXNpbmcgYEB0dXJmL21ldGFgIGluZGV4ZXMuXG4gKlxuICogTmVnYXRpdmUgaW5kZXhlcyBhcmUgcGVybWl0dGVkLlxuICogUG9pbnQgJiBNdWx0aVBvaW50IHdpbGwgYWx3YXlzIHJldHVybiBudWxsLlxuICpcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBBbnkgR2VvSlNPTiBGZWF0dXJlIG9yIEdlb21ldHJ5XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5mZWF0dXJlSW5kZXg9MF0gRmVhdHVyZSBJbmRleFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm11bHRpRmVhdHVyZUluZGV4PTBdIE11bHRpLUZlYXR1cmUgSW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5nZW9tZXRyeUluZGV4PTBdIEdlb21ldHJ5IEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuc2VnbWVudEluZGV4PTBdIFNlZ21lbnQgSW5kZXhcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5wcm9wZXJ0aWVzPXt9XSBUcmFuc2xhdGUgUHJvcGVydGllcyB0byBvdXRwdXQgTGluZVN0cmluZ1xuICogQHBhcmFtIHtCQm94fSBbb3B0aW9ucy5iYm94PXt9XSBUcmFuc2xhdGUgQkJveCB0byBvdXRwdXQgTGluZVN0cmluZ1xuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBbb3B0aW9ucy5pZD17fV0gVHJhbnNsYXRlIElkIHRvIG91dHB1dCBMaW5lU3RyaW5nXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxMaW5lU3RyaW5nPn0gMi12ZXJ0ZXggR2VvSlNPTiBGZWF0dXJlIExpbmVTdHJpbmdcbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlMaW5lID0gdHVyZi5tdWx0aUxpbmVTdHJpbmcoW1xuICogICAgIFtbMTAsIDEwXSwgWzUwLCAzMF0sIFszMCwgNDBdXSxcbiAqICAgICBbWy0xMCwgLTEwXSwgWy01MCwgLTMwXSwgWy0zMCwgLTQwXV1cbiAqIF0pO1xuICpcbiAqIC8vIEZpcnN0IFNlZ21lbnQgKGRlZmF1bHRzIGFyZSAwKVxuICogdHVyZi5maW5kU2VnbWVudChtdWx0aUxpbmUpO1xuICogLy8gPT4gRmVhdHVyZTxMaW5lU3RyaW5nPFtbMTAsIDEwXSwgWzUwLCAzMF1dPj5cbiAqXG4gKiAvLyBGaXJzdCBTZWdtZW50IG9mIDJuZCBNdWx0aSBGZWF0dXJlXG4gKiB0dXJmLmZpbmRTZWdtZW50KG11bHRpTGluZSwge211bHRpRmVhdHVyZUluZGV4OiAxfSk7XG4gKiAvLyA9PiBGZWF0dXJlPExpbmVTdHJpbmc8W1stMTAsIC0xMF0sIFstNTAsIC0zMF1dPj5cbiAqXG4gKiAvLyBMYXN0IFNlZ21lbnQgb2YgTGFzdCBNdWx0aSBGZWF0dXJlXG4gKiB0dXJmLmZpbmRTZWdtZW50KG11bHRpTGluZSwge211bHRpRmVhdHVyZUluZGV4OiAtMSwgc2VnbWVudEluZGV4OiAtMX0pO1xuICogLy8gPT4gRmVhdHVyZTxMaW5lU3RyaW5nPFtbLTUwLCAtMzBdLCBbLTMwLCAtNDBdXT4+XG4gKi9cbmZ1bmN0aW9uIGZpbmRTZWdtZW50KGdlb2pzb24sIG9wdGlvbnMpIHtcbiAgLy8gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKCFoZWxwZXJzLmlzT2JqZWN0KG9wdGlvbnMpKSB0aHJvdyBuZXcgRXJyb3IoXCJvcHRpb25zIGlzIGludmFsaWRcIik7XG4gIHZhciBmZWF0dXJlSW5kZXggPSBvcHRpb25zLmZlYXR1cmVJbmRleCB8fCAwO1xuICB2YXIgbXVsdGlGZWF0dXJlSW5kZXggPSBvcHRpb25zLm11bHRpRmVhdHVyZUluZGV4IHx8IDA7XG4gIHZhciBnZW9tZXRyeUluZGV4ID0gb3B0aW9ucy5nZW9tZXRyeUluZGV4IHx8IDA7XG4gIHZhciBzZWdtZW50SW5kZXggPSBvcHRpb25zLnNlZ21lbnRJbmRleCB8fCAwO1xuXG4gIC8vIEZpbmQgRmVhdHVyZUluZGV4XG4gIHZhciBwcm9wZXJ0aWVzID0gb3B0aW9ucy5wcm9wZXJ0aWVzO1xuICB2YXIgZ2VvbWV0cnk7XG5cbiAgc3dpdGNoIChnZW9qc29uLnR5cGUpIHtcbiAgICBjYXNlIFwiRmVhdHVyZUNvbGxlY3Rpb25cIjpcbiAgICAgIGlmIChmZWF0dXJlSW5kZXggPCAwKVxuICAgICAgICBmZWF0dXJlSW5kZXggPSBnZW9qc29uLmZlYXR1cmVzLmxlbmd0aCArIGZlYXR1cmVJbmRleDtcbiAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IGdlb2pzb24uZmVhdHVyZXNbZmVhdHVyZUluZGV4XS5wcm9wZXJ0aWVzO1xuICAgICAgZ2VvbWV0cnkgPSBnZW9qc29uLmZlYXR1cmVzW2ZlYXR1cmVJbmRleF0uZ2VvbWV0cnk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiRmVhdHVyZVwiOlxuICAgICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwgZ2VvanNvbi5wcm9wZXJ0aWVzO1xuICAgICAgZ2VvbWV0cnkgPSBnZW9qc29uLmdlb21ldHJ5O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIlBvaW50XCI6XG4gICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgIHJldHVybiBudWxsO1xuICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6XG4gICAgY2FzZSBcIk11bHRpUG9seWdvblwiOlxuICAgICAgZ2VvbWV0cnkgPSBnZW9qc29uO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImdlb2pzb24gaXMgaW52YWxpZFwiKTtcbiAgfVxuXG4gIC8vIEZpbmQgU2VnbWVudEluZGV4XG4gIGlmIChnZW9tZXRyeSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gIHZhciBjb29yZHMgPSBnZW9tZXRyeS5jb29yZGluYXRlcztcbiAgc3dpdGNoIChnZW9tZXRyeS50eXBlKSB7XG4gICAgY2FzZSBcIlBvaW50XCI6XG4gICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgIHJldHVybiBudWxsO1xuICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgICBpZiAoc2VnbWVudEluZGV4IDwgMCkgc2VnbWVudEluZGV4ID0gY29vcmRzLmxlbmd0aCArIHNlZ21lbnRJbmRleCAtIDE7XG4gICAgICByZXR1cm4gaGVscGVycy5saW5lU3RyaW5nKFxuICAgICAgICBbY29vcmRzW3NlZ21lbnRJbmRleF0sIGNvb3Jkc1tzZWdtZW50SW5kZXggKyAxXV0sXG4gICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgIGlmIChnZW9tZXRyeUluZGV4IDwgMCkgZ2VvbWV0cnlJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBnZW9tZXRyeUluZGV4O1xuICAgICAgaWYgKHNlZ21lbnRJbmRleCA8IDApXG4gICAgICAgIHNlZ21lbnRJbmRleCA9IGNvb3Jkc1tnZW9tZXRyeUluZGV4XS5sZW5ndGggKyBzZWdtZW50SW5kZXggLSAxO1xuICAgICAgcmV0dXJuIGhlbHBlcnMubGluZVN0cmluZyhcbiAgICAgICAgW1xuICAgICAgICAgIGNvb3Jkc1tnZW9tZXRyeUluZGV4XVtzZWdtZW50SW5kZXhdLFxuICAgICAgICAgIGNvb3Jkc1tnZW9tZXRyeUluZGV4XVtzZWdtZW50SW5kZXggKyAxXSxcbiAgICAgICAgXSxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKTtcbiAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6XG4gICAgICBpZiAobXVsdGlGZWF0dXJlSW5kZXggPCAwKVxuICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBtdWx0aUZlYXR1cmVJbmRleDtcbiAgICAgIGlmIChzZWdtZW50SW5kZXggPCAwKVxuICAgICAgICBzZWdtZW50SW5kZXggPSBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdLmxlbmd0aCArIHNlZ21lbnRJbmRleCAtIDE7XG4gICAgICByZXR1cm4gaGVscGVycy5saW5lU3RyaW5nKFxuICAgICAgICBbXG4gICAgICAgICAgY29vcmRzW211bHRpRmVhdHVyZUluZGV4XVtzZWdtZW50SW5kZXhdLFxuICAgICAgICAgIGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bc2VnbWVudEluZGV4ICsgMV0sXG4gICAgICAgIF0sXG4gICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gICAgY2FzZSBcIk11bHRpUG9seWdvblwiOlxuICAgICAgaWYgKG11bHRpRmVhdHVyZUluZGV4IDwgMClcbiAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXggPSBjb29yZHMubGVuZ3RoICsgbXVsdGlGZWF0dXJlSW5kZXg7XG4gICAgICBpZiAoZ2VvbWV0cnlJbmRleCA8IDApXG4gICAgICAgIGdlb21ldHJ5SW5kZXggPSBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdLmxlbmd0aCArIGdlb21ldHJ5SW5kZXg7XG4gICAgICBpZiAoc2VnbWVudEluZGV4IDwgMClcbiAgICAgICAgc2VnbWVudEluZGV4ID1cbiAgICAgICAgICBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdW2dlb21ldHJ5SW5kZXhdLmxlbmd0aCAtIHNlZ21lbnRJbmRleCAtIDE7XG4gICAgICByZXR1cm4gaGVscGVycy5saW5lU3RyaW5nKFxuICAgICAgICBbXG4gICAgICAgICAgY29vcmRzW211bHRpRmVhdHVyZUluZGV4XVtnZW9tZXRyeUluZGV4XVtzZWdtZW50SW5kZXhdLFxuICAgICAgICAgIGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bZ2VvbWV0cnlJbmRleF1bc2VnbWVudEluZGV4ICsgMV0sXG4gICAgICAgIF0sXG4gICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFwiZ2VvanNvbiBpcyBpbnZhbGlkXCIpO1xufVxuXG4vKipcbiAqIEZpbmRzIGEgcGFydGljdWxhciBQb2ludCBmcm9tIGEgR2VvSlNPTiB1c2luZyBgQHR1cmYvbWV0YWAgaW5kZXhlcy5cbiAqXG4gKiBOZWdhdGl2ZSBpbmRleGVzIGFyZSBwZXJtaXR0ZWQuXG4gKlxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIEFueSBHZW9KU09OIEZlYXR1cmUgb3IgR2VvbWV0cnlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmZlYXR1cmVJbmRleD0wXSBGZWF0dXJlIEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubXVsdGlGZWF0dXJlSW5kZXg9MF0gTXVsdGktRmVhdHVyZSBJbmRleFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmdlb21ldHJ5SW5kZXg9MF0gR2VvbWV0cnkgSW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5jb29yZEluZGV4PTBdIENvb3JkIEluZGV4XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMucHJvcGVydGllcz17fV0gVHJhbnNsYXRlIFByb3BlcnRpZXMgdG8gb3V0cHV0IFBvaW50XG4gKiBAcGFyYW0ge0JCb3h9IFtvcHRpb25zLmJib3g9e31dIFRyYW5zbGF0ZSBCQm94IHRvIG91dHB1dCBQb2ludFxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBbb3B0aW9ucy5pZD17fV0gVHJhbnNsYXRlIElkIHRvIG91dHB1dCBQb2ludFxuICogQHJldHVybnMge0ZlYXR1cmU8UG9pbnQ+fSAyLXZlcnRleCBHZW9KU09OIEZlYXR1cmUgUG9pbnRcbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlMaW5lID0gdHVyZi5tdWx0aUxpbmVTdHJpbmcoW1xuICogICAgIFtbMTAsIDEwXSwgWzUwLCAzMF0sIFszMCwgNDBdXSxcbiAqICAgICBbWy0xMCwgLTEwXSwgWy01MCwgLTMwXSwgWy0zMCwgLTQwXV1cbiAqIF0pO1xuICpcbiAqIC8vIEZpcnN0IFNlZ21lbnQgKGRlZmF1bHRzIGFyZSAwKVxuICogdHVyZi5maW5kUG9pbnQobXVsdGlMaW5lKTtcbiAqIC8vID0+IEZlYXR1cmU8UG9pbnQ8WzEwLCAxMF0+PlxuICpcbiAqIC8vIEZpcnN0IFNlZ21lbnQgb2YgdGhlIDJuZCBNdWx0aS1GZWF0dXJlXG4gKiB0dXJmLmZpbmRQb2ludChtdWx0aUxpbmUsIHttdWx0aUZlYXR1cmVJbmRleDogMX0pO1xuICogLy8gPT4gRmVhdHVyZTxQb2ludDxbLTEwLCAtMTBdPj5cbiAqXG4gKiAvLyBMYXN0IFNlZ21lbnQgb2YgbGFzdCBNdWx0aS1GZWF0dXJlXG4gKiB0dXJmLmZpbmRQb2ludChtdWx0aUxpbmUsIHttdWx0aUZlYXR1cmVJbmRleDogLTEsIGNvb3JkSW5kZXg6IC0xfSk7XG4gKiAvLyA9PiBGZWF0dXJlPFBvaW50PFstMzAsIC00MF0+PlxuICovXG5mdW5jdGlvbiBmaW5kUG9pbnQoZ2VvanNvbiwgb3B0aW9ucykge1xuICAvLyBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBpZiAoIWhlbHBlcnMuaXNPYmplY3Qob3B0aW9ucykpIHRocm93IG5ldyBFcnJvcihcIm9wdGlvbnMgaXMgaW52YWxpZFwiKTtcbiAgdmFyIGZlYXR1cmVJbmRleCA9IG9wdGlvbnMuZmVhdHVyZUluZGV4IHx8IDA7XG4gIHZhciBtdWx0aUZlYXR1cmVJbmRleCA9IG9wdGlvbnMubXVsdGlGZWF0dXJlSW5kZXggfHwgMDtcbiAgdmFyIGdlb21ldHJ5SW5kZXggPSBvcHRpb25zLmdlb21ldHJ5SW5kZXggfHwgMDtcbiAgdmFyIGNvb3JkSW5kZXggPSBvcHRpb25zLmNvb3JkSW5kZXggfHwgMDtcblxuICAvLyBGaW5kIEZlYXR1cmVJbmRleFxuICB2YXIgcHJvcGVydGllcyA9IG9wdGlvbnMucHJvcGVydGllcztcbiAgdmFyIGdlb21ldHJ5O1xuXG4gIHN3aXRjaCAoZ2VvanNvbi50eXBlKSB7XG4gICAgY2FzZSBcIkZlYXR1cmVDb2xsZWN0aW9uXCI6XG4gICAgICBpZiAoZmVhdHVyZUluZGV4IDwgMClcbiAgICAgICAgZmVhdHVyZUluZGV4ID0gZ2VvanNvbi5mZWF0dXJlcy5sZW5ndGggKyBmZWF0dXJlSW5kZXg7XG4gICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCBnZW9qc29uLmZlYXR1cmVzW2ZlYXR1cmVJbmRleF0ucHJvcGVydGllcztcbiAgICAgIGdlb21ldHJ5ID0gZ2VvanNvbi5mZWF0dXJlc1tmZWF0dXJlSW5kZXhdLmdlb21ldHJ5O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkZlYXR1cmVcIjpcbiAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IGdlb2pzb24ucHJvcGVydGllcztcbiAgICAgIGdlb21ldHJ5ID0gZ2VvanNvbi5nZW9tZXRyeTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJQb2ludFwiOlxuICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgIGdlb21ldHJ5ID0gZ2VvanNvbjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnZW9qc29uIGlzIGludmFsaWRcIik7XG4gIH1cblxuICAvLyBGaW5kIENvb3JkIEluZGV4XG4gIGlmIChnZW9tZXRyeSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gIHZhciBjb29yZHMgPSBnZW9tZXRyeS5jb29yZGluYXRlcztcbiAgc3dpdGNoIChnZW9tZXRyeS50eXBlKSB7XG4gICAgY2FzZSBcIlBvaW50XCI6XG4gICAgICByZXR1cm4gaGVscGVycy5wb2ludChjb29yZHMsIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6XG4gICAgICBpZiAobXVsdGlGZWF0dXJlSW5kZXggPCAwKVxuICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBtdWx0aUZlYXR1cmVJbmRleDtcbiAgICAgIHJldHVybiBoZWxwZXJzLnBvaW50KGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF0sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgICBpZiAoY29vcmRJbmRleCA8IDApIGNvb3JkSW5kZXggPSBjb29yZHMubGVuZ3RoICsgY29vcmRJbmRleDtcbiAgICAgIHJldHVybiBoZWxwZXJzLnBvaW50KGNvb3Jkc1tjb29yZEluZGV4XSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG4gICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgIGlmIChnZW9tZXRyeUluZGV4IDwgMCkgZ2VvbWV0cnlJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBnZW9tZXRyeUluZGV4O1xuICAgICAgaWYgKGNvb3JkSW5kZXggPCAwKVxuICAgICAgICBjb29yZEluZGV4ID0gY29vcmRzW2dlb21ldHJ5SW5kZXhdLmxlbmd0aCArIGNvb3JkSW5kZXg7XG4gICAgICByZXR1cm4gaGVscGVycy5wb2ludChjb29yZHNbZ2VvbWV0cnlJbmRleF1bY29vcmRJbmRleF0sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJNdWx0aUxpbmVTdHJpbmdcIjpcbiAgICAgIGlmIChtdWx0aUZlYXR1cmVJbmRleCA8IDApXG4gICAgICAgIG11bHRpRmVhdHVyZUluZGV4ID0gY29vcmRzLmxlbmd0aCArIG11bHRpRmVhdHVyZUluZGV4O1xuICAgICAgaWYgKGNvb3JkSW5kZXggPCAwKVxuICAgICAgICBjb29yZEluZGV4ID0gY29vcmRzW211bHRpRmVhdHVyZUluZGV4XS5sZW5ndGggKyBjb29yZEluZGV4O1xuICAgICAgcmV0dXJuIGhlbHBlcnMucG9pbnQoY29vcmRzW211bHRpRmVhdHVyZUluZGV4XVtjb29yZEluZGV4XSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG4gICAgY2FzZSBcIk11bHRpUG9seWdvblwiOlxuICAgICAgaWYgKG11bHRpRmVhdHVyZUluZGV4IDwgMClcbiAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXggPSBjb29yZHMubGVuZ3RoICsgbXVsdGlGZWF0dXJlSW5kZXg7XG4gICAgICBpZiAoZ2VvbWV0cnlJbmRleCA8IDApXG4gICAgICAgIGdlb21ldHJ5SW5kZXggPSBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdLmxlbmd0aCArIGdlb21ldHJ5SW5kZXg7XG4gICAgICBpZiAoY29vcmRJbmRleCA8IDApXG4gICAgICAgIGNvb3JkSW5kZXggPVxuICAgICAgICAgIGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bZ2VvbWV0cnlJbmRleF0ubGVuZ3RoIC0gY29vcmRJbmRleDtcbiAgICAgIHJldHVybiBoZWxwZXJzLnBvaW50KFxuICAgICAgICBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdW2dlb21ldHJ5SW5kZXhdW2Nvb3JkSW5kZXhdLFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcImdlb2pzb24gaXMgaW52YWxpZFwiKTtcbn1cblxuZXhwb3J0cy5jb29yZEFsbCA9IGNvb3JkQWxsO1xuZXhwb3J0cy5jb29yZEVhY2ggPSBjb29yZEVhY2g7XG5leHBvcnRzLmNvb3JkUmVkdWNlID0gY29vcmRSZWR1Y2U7XG5leHBvcnRzLmZlYXR1cmVFYWNoID0gZmVhdHVyZUVhY2g7XG5leHBvcnRzLmZlYXR1cmVSZWR1Y2UgPSBmZWF0dXJlUmVkdWNlO1xuZXhwb3J0cy5maW5kUG9pbnQgPSBmaW5kUG9pbnQ7XG5leHBvcnRzLmZpbmRTZWdtZW50ID0gZmluZFNlZ21lbnQ7XG5leHBvcnRzLmZsYXR0ZW5FYWNoID0gZmxhdHRlbkVhY2g7XG5leHBvcnRzLmZsYXR0ZW5SZWR1Y2UgPSBmbGF0dGVuUmVkdWNlO1xuZXhwb3J0cy5nZW9tRWFjaCA9IGdlb21FYWNoO1xuZXhwb3J0cy5nZW9tUmVkdWNlID0gZ2VvbVJlZHVjZTtcbmV4cG9ydHMubGluZUVhY2ggPSBsaW5lRWFjaDtcbmV4cG9ydHMubGluZVJlZHVjZSA9IGxpbmVSZWR1Y2U7XG5leHBvcnRzLnByb3BFYWNoID0gcHJvcEVhY2g7XG5leHBvcnRzLnByb3BSZWR1Y2UgPSBwcm9wUmVkdWNlO1xuZXhwb3J0cy5zZWdtZW50RWFjaCA9IHNlZ21lbnRFYWNoO1xuZXhwb3J0cy5zZWdtZW50UmVkdWNlID0gc2VnbWVudFJlZHVjZTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCJpbWFnZXMvc3ByaXRlc2hlZXQucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiaW1hZ2VzL3Nwcml0ZXNoZWV0LTJ4LnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIubGVhZmxldC1kcmF3LXRvb2xiYXIubGVhZmxldC1jb250cm9sLXRvb2xiYXIge1xcbiAgbWFyZ2luLXRvcDogMTJweDtcXG59XFxuLmxlYWZsZXQtZHJhdy10b29sYmFyIGEge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxufVxcbi5sZWFmbGV0LXJldGluYSAubGVhZmxldC1kcmF3LXRvb2xiYXIgYSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xcbiAgYmFja2dyb3VuZC1zaXplOiAzMDBweCAzMHB4O1xcbn1cXG4ubGVhZmxldC1kcmF3LXRvb2xiYXIgLmxlYWZsZXQtZHJhdy1lZGl0LWVkaXQsXFxuLmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZWRpdC1yZW1vdmUsXFxuLmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZHJhdy1wb2x5Z29uLFxcbi5sZWFmbGV0LWRyYXctdG9vbGJhciAubGVhZmxldC1kcmF3LWRyYXctcG9seWxpbmUsXFxuLmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZHJhdy1jaXJjbGUsXFxuLmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZHJhdy1tYXJrZXIsXFxuLmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZHJhdy1yZWN0YW5nbGUge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxufVxcbi5sZWFmbGV0LXJldGluYSAubGVhZmxldC1kcmF3LXRvb2xiYXIgLmxlYWZsZXQtZHJhdy1lZGl0LWVkaXQsXFxuLmxlYWZsZXQtcmV0aW5hIC5sZWFmbGV0LWRyYXctdG9vbGJhciAubGVhZmxldC1kcmF3LWVkaXQtcmVtb3ZlLFxcbi5sZWFmbGV0LXJldGluYSAubGVhZmxldC1kcmF3LXRvb2xiYXIgLmxlYWZsZXQtZHJhdy1kcmF3LXBvbHlnb24sXFxuLmxlYWZsZXQtcmV0aW5hIC5sZWFmbGV0LWRyYXctdG9vbGJhciAubGVhZmxldC1kcmF3LWRyYXctcG9seWxpbmUsXFxuLmxlYWZsZXQtcmV0aW5hIC5sZWFmbGV0LWRyYXctdG9vbGJhciAubGVhZmxldC1kcmF3LWRyYXctY2lyY2xlLFxcbi5sZWFmbGV0LXJldGluYSAubGVhZmxldC1kcmF3LXRvb2xiYXIgLmxlYWZsZXQtZHJhdy1kcmF3LW1hcmtlcixcXG4ubGVhZmxldC1yZXRpbmEgLmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZHJhdy1yZWN0YW5nbGUge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogMzAwcHggMzBweDtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2xlYWZsZXQtZHJhdy10b29sYmFyL2xlYWZsZXQuZHJhdy10b29sYmFyLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0Usc0JBQXNCO0VBQ3RCLDRCQUE0QjtBQUM5QjtBQUNBO0VBQ0Usc0JBQXNCO0VBQ3RCLDJCQUEyQjtBQUM3QjtBQUNBOzs7Ozs7O0VBT0UseURBQStDO0VBQy9DLDRCQUE0QjtBQUM5QjtBQUNBOzs7Ozs7O0VBT0UseURBQWtEO0VBQ2xELDJCQUEyQjtBQUM3QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIubGVhZmxldC1kcmF3LXRvb2xiYXIubGVhZmxldC1jb250cm9sLXRvb2xiYXIge1xcbiAgbWFyZ2luLXRvcDogMTJweDtcXG59XFxuLmxlYWZsZXQtZHJhdy10b29sYmFyIGEge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxufVxcbi5sZWFmbGV0LXJldGluYSAubGVhZmxldC1kcmF3LXRvb2xiYXIgYSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xcbiAgYmFja2dyb3VuZC1zaXplOiAzMDBweCAzMHB4O1xcbn1cXG4ubGVhZmxldC1kcmF3LXRvb2xiYXIgLmxlYWZsZXQtZHJhdy1lZGl0LWVkaXQsXFxuLmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZWRpdC1yZW1vdmUsXFxuLmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZHJhdy1wb2x5Z29uLFxcbi5sZWFmbGV0LWRyYXctdG9vbGJhciAubGVhZmxldC1kcmF3LWRyYXctcG9seWxpbmUsXFxuLmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZHJhdy1jaXJjbGUsXFxuLmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZHJhdy1tYXJrZXIsXFxuLmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZHJhdy1yZWN0YW5nbGUge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCdpbWFnZXMvc3ByaXRlc2hlZXQucG5nJyk7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbn1cXG4ubGVhZmxldC1yZXRpbmEgLmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZWRpdC1lZGl0LFxcbi5sZWFmbGV0LXJldGluYSAubGVhZmxldC1kcmF3LXRvb2xiYXIgLmxlYWZsZXQtZHJhdy1lZGl0LXJlbW92ZSxcXG4ubGVhZmxldC1yZXRpbmEgLmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZHJhdy1wb2x5Z29uLFxcbi5sZWFmbGV0LXJldGluYSAubGVhZmxldC1kcmF3LXRvb2xiYXIgLmxlYWZsZXQtZHJhdy1kcmF3LXBvbHlsaW5lLFxcbi5sZWFmbGV0LXJldGluYSAubGVhZmxldC1kcmF3LXRvb2xiYXIgLmxlYWZsZXQtZHJhdy1kcmF3LWNpcmNsZSxcXG4ubGVhZmxldC1yZXRpbmEgLmxlYWZsZXQtZHJhdy10b29sYmFyIC5sZWFmbGV0LWRyYXctZHJhdy1tYXJrZXIsXFxuLmxlYWZsZXQtcmV0aW5hIC5sZWFmbGV0LWRyYXctdG9vbGJhciAubGVhZmxldC1kcmF3LWRyYXctcmVjdGFuZ2xlIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnaW1hZ2VzL3Nwcml0ZXNoZWV0LTJ4LnBuZycpO1xcbiAgYmFja2dyb3VuZC1zaXplOiAzMDBweCAzMHB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJ2YXIgcmJ1c2ggPSByZXF1aXJlKCdyYnVzaCcpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCdAdHVyZi9oZWxwZXJzJyk7XG52YXIgbWV0YSA9IHJlcXVpcmUoJ0B0dXJmL21ldGEnKTtcbnZhciB0dXJmQkJveCA9IHJlcXVpcmUoJ0B0dXJmL2Jib3gnKS5kZWZhdWx0O1xudmFyIGZlYXR1cmVFYWNoID0gbWV0YS5mZWF0dXJlRWFjaDtcbnZhciBjb29yZEVhY2ggPSBtZXRhLmNvb3JkRWFjaDtcbnZhciBwb2x5Z29uID0gaGVscGVycy5wb2x5Z29uO1xudmFyIGZlYXR1cmVDb2xsZWN0aW9uID0gaGVscGVycy5mZWF0dXJlQ29sbGVjdGlvbjtcblxuLyoqXG4gKiBHZW9KU09OIGltcGxlbWVudGF0aW9uIG9mIFtSQnVzaF0oaHR0cHM6Ly9naXRodWIuY29tL21vdXJuZXIvcmJ1c2gjcmJ1c2gpIHNwYXRpYWwgaW5kZXguXG4gKlxuICogQG5hbWUgcmJ1c2hcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbWF4RW50cmllcz05XSBkZWZpbmVzIHRoZSBtYXhpbXVtIG51bWJlciBvZiBlbnRyaWVzIGluIGEgdHJlZSBub2RlLiA5ICh1c2VkIGJ5IGRlZmF1bHQpIGlzIGFcbiAqIHJlYXNvbmFibGUgY2hvaWNlIGZvciBtb3N0IGFwcGxpY2F0aW9ucy4gSGlnaGVyIHZhbHVlIG1lYW5zIGZhc3RlciBpbnNlcnRpb24gYW5kIHNsb3dlciBzZWFyY2gsIGFuZCB2aWNlIHZlcnNhLlxuICogQHJldHVybnMge1JCdXNofSBHZW9KU09OIFJCdXNoXG4gKiBAZXhhbXBsZVxuICogdmFyIGdlb2pzb25SYnVzaCA9IHJlcXVpcmUoJ2dlb2pzb24tcmJ1c2gnKS5kZWZhdWx0O1xuICogdmFyIHRyZWUgPSBnZW9qc29uUmJ1c2goKTtcbiAqL1xuZnVuY3Rpb24gZ2VvanNvblJidXNoKG1heEVudHJpZXMpIHtcbiAgICB2YXIgdHJlZSA9IG5ldyByYnVzaChtYXhFbnRyaWVzKTtcbiAgICAvKipcbiAgICAgKiBbaW5zZXJ0XShodHRwczovL2dpdGh1Yi5jb20vbW91cm5lci9yYnVzaCNkYXRhLWZvcm1hdClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RmVhdHVyZX0gZmVhdHVyZSBpbnNlcnQgc2luZ2xlIEdlb0pTT04gRmVhdHVyZVxuICAgICAqIEByZXR1cm5zIHtSQnVzaH0gR2VvSlNPTiBSQnVzaFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHBvbHkgPSB0dXJmLnBvbHlnb24oW1tbLTc4LCA0MV0sIFstNjcsIDQxXSwgWy02NywgNDhdLCBbLTc4LCA0OF0sIFstNzgsIDQxXV1dKTtcbiAgICAgKiB0cmVlLmluc2VydChwb2x5KVxuICAgICAqL1xuICAgIHRyZWUuaW5zZXJ0ID0gZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgICAgaWYgKGZlYXR1cmUudHlwZSAhPT0gJ0ZlYXR1cmUnKSB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZmVhdHVyZScpO1xuICAgICAgICBmZWF0dXJlLmJib3ggPSBmZWF0dXJlLmJib3ggPyBmZWF0dXJlLmJib3ggOiB0dXJmQkJveChmZWF0dXJlKTtcbiAgICAgICAgcmV0dXJuIHJidXNoLnByb3RvdHlwZS5pbnNlcnQuY2FsbCh0aGlzLCBmZWF0dXJlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogW2xvYWRdKGh0dHBzOi8vZ2l0aHViLmNvbS9tb3VybmVyL3JidXNoI2J1bGstaW5zZXJ0aW5nLWRhdGEpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEFycmF5PEZlYXR1cmU+fSBmZWF0dXJlcyBsb2FkIGVudGlyZSBHZW9KU09OIEZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICogQHJldHVybnMge1JCdXNofSBHZW9KU09OIFJCdXNoXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgcG9seXMgPSB0dXJmLnBvbHlnb25zKFtcbiAgICAgKiAgICAgW1tbLTc4LCA0MV0sIFstNjcsIDQxXSwgWy02NywgNDhdLCBbLTc4LCA0OF0sIFstNzgsIDQxXV1dLFxuICAgICAqICAgICBbW1stOTMsIDMyXSwgWy04MywgMzJdLCBbLTgzLCAzOV0sIFstOTMsIDM5XSwgWy05MywgMzJdXV1cbiAgICAgKiBdKTtcbiAgICAgKiB0cmVlLmxvYWQocG9seXMpO1xuICAgICAqL1xuICAgIHRyZWUubG9hZCA9IGZ1bmN0aW9uIChmZWF0dXJlcykge1xuICAgICAgICB2YXIgbG9hZCA9IFtdO1xuICAgICAgICAvLyBMb2FkIGFuIEFycmF5IG9mIEZlYXR1cmVzXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZlYXR1cmVzKSkge1xuICAgICAgICAgICAgZmVhdHVyZXMuZm9yRWFjaChmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlLnR5cGUgIT09ICdGZWF0dXJlJykgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGZlYXR1cmVzJyk7XG4gICAgICAgICAgICAgICAgZmVhdHVyZS5iYm94ID0gZmVhdHVyZS5iYm94ID8gZmVhdHVyZS5iYm94IDogdHVyZkJCb3goZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgbG9hZC5wdXNoKGZlYXR1cmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBMb2FkIGEgRmVhdHVyZUNvbGxlY3Rpb25cbiAgICAgICAgICAgIGZlYXR1cmVFYWNoKGZlYXR1cmVzLCBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlLnR5cGUgIT09ICdGZWF0dXJlJykgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGZlYXR1cmVzJyk7XG4gICAgICAgICAgICAgICAgZmVhdHVyZS5iYm94ID0gZmVhdHVyZS5iYm94ID8gZmVhdHVyZS5iYm94IDogdHVyZkJCb3goZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgbG9hZC5wdXNoKGZlYXR1cmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJidXNoLnByb3RvdHlwZS5sb2FkLmNhbGwodGhpcywgbG9hZCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFtyZW1vdmVdKGh0dHBzOi8vZ2l0aHViLmNvbS9tb3VybmVyL3JidXNoI3JlbW92aW5nLWRhdGEpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0ZlYXR1cmV9IGZlYXR1cmUgcmVtb3ZlIHNpbmdsZSBHZW9KU09OIEZlYXR1cmVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbHMgUGFzcyBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gdG8gY29tcGFyZSBieSB2YWx1ZSBmb3IgcmVtb3ZhbC5cbiAgICAgKiBAcmV0dXJucyB7UkJ1c2h9IEdlb0pTT04gUkJ1c2hcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBwb2x5ID0gdHVyZi5wb2x5Z29uKFtbWy03OCwgNDFdLCBbLTY3LCA0MV0sIFstNjcsIDQ4XSwgWy03OCwgNDhdLCBbLTc4LCA0MV1dXSk7XG4gICAgICpcbiAgICAgKiB0cmVlLnJlbW92ZShwb2x5KTtcbiAgICAgKi9cbiAgICB0cmVlLnJlbW92ZSA9IGZ1bmN0aW9uIChmZWF0dXJlLCBlcXVhbHMpIHtcbiAgICAgICAgaWYgKGZlYXR1cmUudHlwZSAhPT0gJ0ZlYXR1cmUnKSB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZmVhdHVyZScpO1xuICAgICAgICBmZWF0dXJlLmJib3ggPSBmZWF0dXJlLmJib3ggPyBmZWF0dXJlLmJib3ggOiB0dXJmQkJveChmZWF0dXJlKTtcbiAgICAgICAgcmV0dXJuIHJidXNoLnByb3RvdHlwZS5yZW1vdmUuY2FsbCh0aGlzLCBmZWF0dXJlLCBlcXVhbHMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBbY2xlYXJdKGh0dHBzOi8vZ2l0aHViLmNvbS9tb3VybmVyL3JidXNoI3JlbW92aW5nLWRhdGEpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UkJ1c2h9IEdlb0pTT04gUmJ1c2hcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRyZWUuY2xlYXIoKVxuICAgICAqL1xuICAgIHRyZWUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByYnVzaC5wcm90b3R5cGUuY2xlYXIuY2FsbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogW3NlYXJjaF0oaHR0cHM6Ly9naXRodWIuY29tL21vdXJuZXIvcmJ1c2gjc2VhcmNoKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtCQm94fEZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV9IGdlb2pzb24gc2VhcmNoIHdpdGggR2VvSlNPTlxuICAgICAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbn0gYWxsIGZlYXR1cmVzIHRoYXQgaW50ZXJzZWN0cyB3aXRoIHRoZSBnaXZlbiBHZW9KU09OLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHBvbHkgPSB0dXJmLnBvbHlnb24oW1tbLTc4LCA0MV0sIFstNjcsIDQxXSwgWy02NywgNDhdLCBbLTc4LCA0OF0sIFstNzgsIDQxXV1dKTtcbiAgICAgKlxuICAgICAqIHRyZWUuc2VhcmNoKHBvbHkpO1xuICAgICAqL1xuICAgIHRyZWUuc2VhcmNoID0gZnVuY3Rpb24gKGdlb2pzb24pIHtcbiAgICAgICAgdmFyIGZlYXR1cmVzID0gcmJ1c2gucHJvdG90eXBlLnNlYXJjaC5jYWxsKHRoaXMsIHRoaXMudG9CQm94KGdlb2pzb24pKTtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKGZlYXR1cmVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogW2NvbGxpZGVzXShodHRwczovL2dpdGh1Yi5jb20vbW91cm5lci9yYnVzaCNjb2xsaXNpb25zKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtCQm94fEZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV9IGdlb2pzb24gY29sbGlkZXMgd2l0aCBHZW9KU09OXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlcmUgYXJlIGFueSBpdGVtcyBpbnRlcnNlY3RpbmcgdGhlIGdpdmVuIEdlb0pTT04sIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBwb2x5ID0gdHVyZi5wb2x5Z29uKFtbWy03OCwgNDFdLCBbLTY3LCA0MV0sIFstNjcsIDQ4XSwgWy03OCwgNDhdLCBbLTc4LCA0MV1dXSk7XG4gICAgICpcbiAgICAgKiB0cmVlLmNvbGxpZGVzKHBvbHkpO1xuICAgICAqL1xuICAgIHRyZWUuY29sbGlkZXMgPSBmdW5jdGlvbiAoZ2VvanNvbikge1xuICAgICAgICByZXR1cm4gcmJ1c2gucHJvdG90eXBlLmNvbGxpZGVzLmNhbGwodGhpcywgdGhpcy50b0JCb3goZ2VvanNvbikpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBbYWxsXShodHRwczovL2dpdGh1Yi5jb20vbW91cm5lci9yYnVzaCNzZWFyY2gpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7RmVhdHVyZUNvbGxlY3Rpb259IGFsbCB0aGUgZmVhdHVyZXMgaW4gUkJ1c2hcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRyZWUuYWxsKClcbiAgICAgKi9cbiAgICB0cmVlLmFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGZlYXR1cmVzID0gcmJ1c2gucHJvdG90eXBlLmFsbC5jYWxsKHRoaXMpO1xuICAgICAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24oZmVhdHVyZXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBbdG9KU09OXShodHRwczovL2dpdGh1Yi5jb20vbW91cm5lci9yYnVzaCNleHBvcnQtYW5kLWltcG9ydClcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHthbnl9IGV4cG9ydCBkYXRhIGFzIEpTT04gb2JqZWN0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgZXhwb3J0ZWQgPSB0cmVlLnRvSlNPTigpXG4gICAgICovXG4gICAgdHJlZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByYnVzaC5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFtmcm9tSlNPTl0oaHR0cHM6Ly9naXRodWIuY29tL21vdXJuZXIvcmJ1c2gjZXhwb3J0LWFuZC1pbXBvcnQpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2FueX0ganNvbiBpbXBvcnQgcHJldmlvdXNseSBleHBvcnRlZCBkYXRhXG4gICAgICogQHJldHVybnMge1JCdXNofSBHZW9KU09OIFJCdXNoXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgZXhwb3J0ZWQgPSB7XG4gICAgICogICBcImNoaWxkcmVuXCI6IFtcbiAgICAgKiAgICAge1xuICAgICAqICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAgICAgKiAgICAgICBcImdlb21ldHJ5XCI6IHtcbiAgICAgKiAgICAgICAgIFwidHlwZVwiOiBcIlBvaW50XCIsXG4gICAgICogICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFsxMTAsIDUwXVxuICAgICAqICAgICAgIH0sXG4gICAgICogICAgICAgXCJwcm9wZXJ0aWVzXCI6IHt9LFxuICAgICAqICAgICAgIFwiYmJveFwiOiBbMTEwLCA1MCwgMTEwLCA1MF1cbiAgICAgKiAgICAgfVxuICAgICAqICAgXSxcbiAgICAgKiAgIFwiaGVpZ2h0XCI6IDEsXG4gICAgICogICBcImxlYWZcIjogdHJ1ZSxcbiAgICAgKiAgIFwibWluWFwiOiAxMTAsXG4gICAgICogICBcIm1pbllcIjogNTAsXG4gICAgICogICBcIm1heFhcIjogMTEwLFxuICAgICAqICAgXCJtYXhZXCI6IDUwXG4gICAgICogfVxuICAgICAqIHRyZWUuZnJvbUpTT04oZXhwb3J0ZWQpXG4gICAgICovXG4gICAgdHJlZS5mcm9tSlNPTiA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiByYnVzaC5wcm90b3R5cGUuZnJvbUpTT04uY2FsbCh0aGlzLCBqc29uKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgR2VvSlNPTiB0byB7bWluWCwgbWluWSwgbWF4WCwgbWF4WX0gc2NoZW1hXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QkJveHxGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfSBnZW9qc29uIGZlYXR1cmUocykgdG8gcmV0cmlldmUgQkJveCBmcm9tXG4gICAgICogQHJldHVybnMge09iamVjdH0gY29udmVydGVkIHRvIHttaW5YLCBtaW5ZLCBtYXhYLCBtYXhZfVxuICAgICAqL1xuICAgIHRyZWUudG9CQm94ID0gZnVuY3Rpb24gKGdlb2pzb24pIHtcbiAgICAgICAgdmFyIGJib3g7XG4gICAgICAgIGlmIChnZW9qc29uLmJib3gpIGJib3ggPSBnZW9qc29uLmJib3g7XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZ2VvanNvbikgJiYgZ2VvanNvbi5sZW5ndGggPT09IDQpIGJib3ggPSBnZW9qc29uO1xuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGdlb2pzb24pICYmIGdlb2pzb24ubGVuZ3RoID09PSA2KSBiYm94ID0gW2dlb2pzb25bMF0sIGdlb2pzb25bMV0sIGdlb2pzb25bM10sIGdlb2pzb25bNF1dO1xuICAgICAgICBlbHNlIGlmIChnZW9qc29uLnR5cGUgPT09ICdGZWF0dXJlJykgYmJveCA9IHR1cmZCQm94KGdlb2pzb24pO1xuICAgICAgICBlbHNlIGlmIChnZW9qc29uLnR5cGUgPT09ICdGZWF0dXJlQ29sbGVjdGlvbicpIGJib3ggPSB0dXJmQkJveChnZW9qc29uKTtcbiAgICAgICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZ2VvanNvbicpXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1pblg6IGJib3hbMF0sXG4gICAgICAgICAgICBtaW5ZOiBiYm94WzFdLFxuICAgICAgICAgICAgbWF4WDogYmJveFsyXSxcbiAgICAgICAgICAgIG1heFk6IGJib3hbM11cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiB0cmVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdlb2pzb25SYnVzaDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBnZW9qc29uUmJ1c2g7XG4iLCIhZnVuY3Rpb24odCxpKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1pKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShpKToodD10fHxzZWxmKS5SQnVzaD1pKCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQscixlLGEsaCl7IWZ1bmN0aW9uIHQobixyLGUsYSxoKXtmb3IoO2E+ZTspe2lmKGEtZT42MDApe3ZhciBvPWEtZSsxLHM9ci1lKzEsbD1NYXRoLmxvZyhvKSxmPS41Kk1hdGguZXhwKDIqbC8zKSx1PS41Kk1hdGguc3FydChsKmYqKG8tZikvbykqKHMtby8yPDA/LTE6MSksbT1NYXRoLm1heChlLE1hdGguZmxvb3Ioci1zKmYvbyt1KSksYz1NYXRoLm1pbihhLE1hdGguZmxvb3Iocisoby1zKSpmL28rdSkpO3QobixyLG0sYyxoKX12YXIgcD1uW3JdLGQ9ZSx4PWE7Zm9yKGkobixlLHIpLGgoblthXSxwKT4wJiZpKG4sZSxhKTtkPHg7KXtmb3IoaShuLGQseCksZCsrLHgtLTtoKG5bZF0scCk8MDspZCsrO2Zvcig7aChuW3hdLHApPjA7KXgtLX0wPT09aChuW2VdLHApP2kobixlLHgpOmkobiwrK3gsYSkseDw9ciYmKGU9eCsxKSxyPD14JiYoYT14LTEpfX0odCxyLGV8fDAsYXx8dC5sZW5ndGgtMSxofHxuKX1mdW5jdGlvbiBpKHQsaSxuKXt2YXIgcj10W2ldO3RbaV09dFtuXSx0W25dPXJ9ZnVuY3Rpb24gbih0LGkpe3JldHVybiB0PGk/LTE6dD5pPzE6MH12YXIgcj1mdW5jdGlvbih0KXt2b2lkIDA9PT10JiYodD05KSx0aGlzLl9tYXhFbnRyaWVzPU1hdGgubWF4KDQsdCksdGhpcy5fbWluRW50cmllcz1NYXRoLm1heCgyLE1hdGguY2VpbCguNCp0aGlzLl9tYXhFbnRyaWVzKSksdGhpcy5jbGVhcigpfTtmdW5jdGlvbiBlKHQsaSxuKXtpZighbilyZXR1cm4gaS5pbmRleE9mKHQpO2Zvcih2YXIgcj0wO3I8aS5sZW5ndGg7cisrKWlmKG4odCxpW3JdKSlyZXR1cm4gcjtyZXR1cm4tMX1mdW5jdGlvbiBhKHQsaSl7aCh0LDAsdC5jaGlsZHJlbi5sZW5ndGgsaSx0KX1mdW5jdGlvbiBoKHQsaSxuLHIsZSl7ZXx8KGU9cChudWxsKSksZS5taW5YPTEvMCxlLm1pblk9MS8wLGUubWF4WD0tMS8wLGUubWF4WT0tMS8wO2Zvcih2YXIgYT1pO2E8bjthKyspe3ZhciBoPXQuY2hpbGRyZW5bYV07byhlLHQubGVhZj9yKGgpOmgpfXJldHVybiBlfWZ1bmN0aW9uIG8odCxpKXtyZXR1cm4gdC5taW5YPU1hdGgubWluKHQubWluWCxpLm1pblgpLHQubWluWT1NYXRoLm1pbih0Lm1pblksaS5taW5ZKSx0Lm1heFg9TWF0aC5tYXgodC5tYXhYLGkubWF4WCksdC5tYXhZPU1hdGgubWF4KHQubWF4WSxpLm1heFkpLHR9ZnVuY3Rpb24gcyh0LGkpe3JldHVybiB0Lm1pblgtaS5taW5YfWZ1bmN0aW9uIGwodCxpKXtyZXR1cm4gdC5taW5ZLWkubWluWX1mdW5jdGlvbiBmKHQpe3JldHVybih0Lm1heFgtdC5taW5YKSoodC5tYXhZLXQubWluWSl9ZnVuY3Rpb24gdSh0KXtyZXR1cm4gdC5tYXhYLXQubWluWCsodC5tYXhZLXQubWluWSl9ZnVuY3Rpb24gbSh0LGkpe3JldHVybiB0Lm1pblg8PWkubWluWCYmdC5taW5ZPD1pLm1pblkmJmkubWF4WDw9dC5tYXhYJiZpLm1heFk8PXQubWF4WX1mdW5jdGlvbiBjKHQsaSl7cmV0dXJuIGkubWluWDw9dC5tYXhYJiZpLm1pblk8PXQubWF4WSYmaS5tYXhYPj10Lm1pblgmJmkubWF4WT49dC5taW5ZfWZ1bmN0aW9uIHAodCl7cmV0dXJue2NoaWxkcmVuOnQsaGVpZ2h0OjEsbGVhZjohMCxtaW5YOjEvMCxtaW5ZOjEvMCxtYXhYOi0xLzAsbWF4WTotMS8wfX1mdW5jdGlvbiBkKGksbixyLGUsYSl7Zm9yKHZhciBoPVtuLHJdO2gubGVuZ3RoOylpZighKChyPWgucG9wKCkpLShuPWgucG9wKCkpPD1lKSl7dmFyIG89bitNYXRoLmNlaWwoKHItbikvZS8yKSplO3QoaSxvLG4scixhKSxoLnB1c2gobixvLG8scil9fXJldHVybiByLnByb3RvdHlwZS5hbGw9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fYWxsKHRoaXMuZGF0YSxbXSl9LHIucHJvdG90eXBlLnNlYXJjaD1mdW5jdGlvbih0KXt2YXIgaT10aGlzLmRhdGEsbj1bXTtpZighYyh0LGkpKXJldHVybiBuO2Zvcih2YXIgcj10aGlzLnRvQkJveCxlPVtdO2k7KXtmb3IodmFyIGE9MDthPGkuY2hpbGRyZW4ubGVuZ3RoO2ErKyl7dmFyIGg9aS5jaGlsZHJlblthXSxvPWkubGVhZj9yKGgpOmg7Yyh0LG8pJiYoaS5sZWFmP24ucHVzaChoKTptKHQsbyk/dGhpcy5fYWxsKGgsbik6ZS5wdXNoKGgpKX1pPWUucG9wKCl9cmV0dXJuIG59LHIucHJvdG90eXBlLmNvbGxpZGVzPWZ1bmN0aW9uKHQpe3ZhciBpPXRoaXMuZGF0YTtpZighYyh0LGkpKXJldHVybiExO2Zvcih2YXIgbj1bXTtpOyl7Zm9yKHZhciByPTA7cjxpLmNoaWxkcmVuLmxlbmd0aDtyKyspe3ZhciBlPWkuY2hpbGRyZW5bcl0sYT1pLmxlYWY/dGhpcy50b0JCb3goZSk6ZTtpZihjKHQsYSkpe2lmKGkubGVhZnx8bSh0LGEpKXJldHVybiEwO24ucHVzaChlKX19aT1uLnBvcCgpfXJldHVybiExfSxyLnByb3RvdHlwZS5sb2FkPWZ1bmN0aW9uKHQpe2lmKCF0fHwhdC5sZW5ndGgpcmV0dXJuIHRoaXM7aWYodC5sZW5ndGg8dGhpcy5fbWluRW50cmllcyl7Zm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspdGhpcy5pbnNlcnQodFtpXSk7cmV0dXJuIHRoaXN9dmFyIG49dGhpcy5fYnVpbGQodC5zbGljZSgpLDAsdC5sZW5ndGgtMSwwKTtpZih0aGlzLmRhdGEuY2hpbGRyZW4ubGVuZ3RoKWlmKHRoaXMuZGF0YS5oZWlnaHQ9PT1uLmhlaWdodCl0aGlzLl9zcGxpdFJvb3QodGhpcy5kYXRhLG4pO2Vsc2V7aWYodGhpcy5kYXRhLmhlaWdodDxuLmhlaWdodCl7dmFyIHI9dGhpcy5kYXRhO3RoaXMuZGF0YT1uLG49cn10aGlzLl9pbnNlcnQobix0aGlzLmRhdGEuaGVpZ2h0LW4uaGVpZ2h0LTEsITApfWVsc2UgdGhpcy5kYXRhPW47cmV0dXJuIHRoaXN9LHIucHJvdG90eXBlLmluc2VydD1mdW5jdGlvbih0KXtyZXR1cm4gdCYmdGhpcy5faW5zZXJ0KHQsdGhpcy5kYXRhLmhlaWdodC0xKSx0aGlzfSxyLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmRhdGE9cChbXSksdGhpc30sci5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKHQsaSl7aWYoIXQpcmV0dXJuIHRoaXM7Zm9yKHZhciBuLHIsYSxoPXRoaXMuZGF0YSxvPXRoaXMudG9CQm94KHQpLHM9W10sbD1bXTtofHxzLmxlbmd0aDspe2lmKGh8fChoPXMucG9wKCkscj1zW3MubGVuZ3RoLTFdLG49bC5wb3AoKSxhPSEwKSxoLmxlYWYpe3ZhciBmPWUodCxoLmNoaWxkcmVuLGkpO2lmKC0xIT09ZilyZXR1cm4gaC5jaGlsZHJlbi5zcGxpY2UoZiwxKSxzLnB1c2goaCksdGhpcy5fY29uZGVuc2UocyksdGhpc31hfHxoLmxlYWZ8fCFtKGgsbyk/cj8obisrLGg9ci5jaGlsZHJlbltuXSxhPSExKTpoPW51bGw6KHMucHVzaChoKSxsLnB1c2gobiksbj0wLHI9aCxoPWguY2hpbGRyZW5bMF0pfXJldHVybiB0aGlzfSxyLnByb3RvdHlwZS50b0JCb3g9ZnVuY3Rpb24odCl7cmV0dXJuIHR9LHIucHJvdG90eXBlLmNvbXBhcmVNaW5YPWZ1bmN0aW9uKHQsaSl7cmV0dXJuIHQubWluWC1pLm1pblh9LHIucHJvdG90eXBlLmNvbXBhcmVNaW5ZPWZ1bmN0aW9uKHQsaSl7cmV0dXJuIHQubWluWS1pLm1pbll9LHIucHJvdG90eXBlLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmRhdGF9LHIucHJvdG90eXBlLmZyb21KU09OPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmRhdGE9dCx0aGlzfSxyLnByb3RvdHlwZS5fYWxsPWZ1bmN0aW9uKHQsaSl7Zm9yKHZhciBuPVtdO3Q7KXQubGVhZj9pLnB1c2guYXBwbHkoaSx0LmNoaWxkcmVuKTpuLnB1c2guYXBwbHkobix0LmNoaWxkcmVuKSx0PW4ucG9wKCk7cmV0dXJuIGl9LHIucHJvdG90eXBlLl9idWlsZD1mdW5jdGlvbih0LGksbixyKXt2YXIgZSxoPW4taSsxLG89dGhpcy5fbWF4RW50cmllcztpZihoPD1vKXJldHVybiBhKGU9cCh0LnNsaWNlKGksbisxKSksdGhpcy50b0JCb3gpLGU7cnx8KHI9TWF0aC5jZWlsKE1hdGgubG9nKGgpL01hdGgubG9nKG8pKSxvPU1hdGguY2VpbChoL01hdGgucG93KG8sci0xKSkpLChlPXAoW10pKS5sZWFmPSExLGUuaGVpZ2h0PXI7dmFyIHM9TWF0aC5jZWlsKGgvbyksbD1zKk1hdGguY2VpbChNYXRoLnNxcnQobykpO2QodCxpLG4sbCx0aGlzLmNvbXBhcmVNaW5YKTtmb3IodmFyIGY9aTtmPD1uO2YrPWwpe3ZhciB1PU1hdGgubWluKGYrbC0xLG4pO2QodCxmLHUscyx0aGlzLmNvbXBhcmVNaW5ZKTtmb3IodmFyIG09ZjttPD11O20rPXMpe3ZhciBjPU1hdGgubWluKG0rcy0xLHUpO2UuY2hpbGRyZW4ucHVzaCh0aGlzLl9idWlsZCh0LG0sYyxyLTEpKX19cmV0dXJuIGEoZSx0aGlzLnRvQkJveCksZX0sci5wcm90b3R5cGUuX2Nob29zZVN1YnRyZWU9ZnVuY3Rpb24odCxpLG4scil7Zm9yKDtyLnB1c2goaSksIWkubGVhZiYmci5sZW5ndGgtMSE9PW47KXtmb3IodmFyIGU9MS8wLGE9MS8wLGg9dm9pZCAwLG89MDtvPGkuY2hpbGRyZW4ubGVuZ3RoO28rKyl7dmFyIHM9aS5jaGlsZHJlbltvXSxsPWYocyksdT0obT10LGM9cywoTWF0aC5tYXgoYy5tYXhYLG0ubWF4WCktTWF0aC5taW4oYy5taW5YLG0ubWluWCkpKihNYXRoLm1heChjLm1heFksbS5tYXhZKS1NYXRoLm1pbihjLm1pblksbS5taW5ZKSktbCk7dTxhPyhhPXUsZT1sPGU/bDplLGg9cyk6dT09PWEmJmw8ZSYmKGU9bCxoPXMpfWk9aHx8aS5jaGlsZHJlblswXX12YXIgbSxjO3JldHVybiBpfSxyLnByb3RvdHlwZS5faW5zZXJ0PWZ1bmN0aW9uKHQsaSxuKXt2YXIgcj1uP3Q6dGhpcy50b0JCb3godCksZT1bXSxhPXRoaXMuX2Nob29zZVN1YnRyZWUocix0aGlzLmRhdGEsaSxlKTtmb3IoYS5jaGlsZHJlbi5wdXNoKHQpLG8oYSxyKTtpPj0wJiZlW2ldLmNoaWxkcmVuLmxlbmd0aD50aGlzLl9tYXhFbnRyaWVzOyl0aGlzLl9zcGxpdChlLGkpLGktLTt0aGlzLl9hZGp1c3RQYXJlbnRCQm94ZXMocixlLGkpfSxyLnByb3RvdHlwZS5fc3BsaXQ9ZnVuY3Rpb24odCxpKXt2YXIgbj10W2ldLHI9bi5jaGlsZHJlbi5sZW5ndGgsZT10aGlzLl9taW5FbnRyaWVzO3RoaXMuX2Nob29zZVNwbGl0QXhpcyhuLGUscik7dmFyIGg9dGhpcy5fY2hvb3NlU3BsaXRJbmRleChuLGUsciksbz1wKG4uY2hpbGRyZW4uc3BsaWNlKGgsbi5jaGlsZHJlbi5sZW5ndGgtaCkpO28uaGVpZ2h0PW4uaGVpZ2h0LG8ubGVhZj1uLmxlYWYsYShuLHRoaXMudG9CQm94KSxhKG8sdGhpcy50b0JCb3gpLGk/dFtpLTFdLmNoaWxkcmVuLnB1c2gobyk6dGhpcy5fc3BsaXRSb290KG4sbyl9LHIucHJvdG90eXBlLl9zcGxpdFJvb3Q9ZnVuY3Rpb24odCxpKXt0aGlzLmRhdGE9cChbdCxpXSksdGhpcy5kYXRhLmhlaWdodD10LmhlaWdodCsxLHRoaXMuZGF0YS5sZWFmPSExLGEodGhpcy5kYXRhLHRoaXMudG9CQm94KX0sci5wcm90b3R5cGUuX2Nob29zZVNwbGl0SW5kZXg9ZnVuY3Rpb24odCxpLG4pe2Zvcih2YXIgcixlLGEsbyxzLGwsdSxtPTEvMCxjPTEvMCxwPWk7cDw9bi1pO3ArKyl7dmFyIGQ9aCh0LDAscCx0aGlzLnRvQkJveCkseD1oKHQscCxuLHRoaXMudG9CQm94KSx2PShlPWQsYT14LG89dm9pZCAwLHM9dm9pZCAwLGw9dm9pZCAwLHU9dm9pZCAwLG89TWF0aC5tYXgoZS5taW5YLGEubWluWCkscz1NYXRoLm1heChlLm1pblksYS5taW5ZKSxsPU1hdGgubWluKGUubWF4WCxhLm1heFgpLHU9TWF0aC5taW4oZS5tYXhZLGEubWF4WSksTWF0aC5tYXgoMCxsLW8pKk1hdGgubWF4KDAsdS1zKSksTT1mKGQpK2YoeCk7djxtPyhtPXYscj1wLGM9TTxjP006Yyk6dj09PW0mJk08YyYmKGM9TSxyPXApfXJldHVybiByfHxuLWl9LHIucHJvdG90eXBlLl9jaG9vc2VTcGxpdEF4aXM9ZnVuY3Rpb24odCxpLG4pe3ZhciByPXQubGVhZj90aGlzLmNvbXBhcmVNaW5YOnMsZT10LmxlYWY/dGhpcy5jb21wYXJlTWluWTpsO3RoaXMuX2FsbERpc3RNYXJnaW4odCxpLG4scik8dGhpcy5fYWxsRGlzdE1hcmdpbih0LGksbixlKSYmdC5jaGlsZHJlbi5zb3J0KHIpfSxyLnByb3RvdHlwZS5fYWxsRGlzdE1hcmdpbj1mdW5jdGlvbih0LGksbixyKXt0LmNoaWxkcmVuLnNvcnQocik7Zm9yKHZhciBlPXRoaXMudG9CQm94LGE9aCh0LDAsaSxlKSxzPWgodCxuLWksbixlKSxsPXUoYSkrdShzKSxmPWk7ZjxuLWk7ZisrKXt2YXIgbT10LmNoaWxkcmVuW2ZdO28oYSx0LmxlYWY/ZShtKTptKSxsKz11KGEpfWZvcih2YXIgYz1uLWktMTtjPj1pO2MtLSl7dmFyIHA9dC5jaGlsZHJlbltjXTtvKHMsdC5sZWFmP2UocCk6cCksbCs9dShzKX1yZXR1cm4gbH0sci5wcm90b3R5cGUuX2FkanVzdFBhcmVudEJCb3hlcz1mdW5jdGlvbih0LGksbil7Zm9yKHZhciByPW47cj49MDtyLS0pbyhpW3JdLHQpfSxyLnByb3RvdHlwZS5fY29uZGVuc2U9ZnVuY3Rpb24odCl7Zm9yKHZhciBpPXQubGVuZ3RoLTEsbj12b2lkIDA7aT49MDtpLS0pMD09PXRbaV0uY2hpbGRyZW4ubGVuZ3RoP2k+MD8obj10W2ktMV0uY2hpbGRyZW4pLnNwbGljZShuLmluZGV4T2YodFtpXSksMSk6dGhpcy5jbGVhcigpOmEodFtpXSx0aGlzLnRvQkJveCl9LHJ9KTtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9sZWFmbGV0LmRyYXctdG9vbGJhci5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2xlYWZsZXQuZHJhdy10b29sYmFyLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJMLk1hcC5tZXJnZU9wdGlvbnMoe1xuICAgIC8vIEBvcHRpb24gYWxtb3N0T3ZlcjogQm9vbGVhbiA9IHRydWVcbiAgICAvLyBTZXQgaXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB0aGlzIHBsdWdpblxuICAgIGFsbW9zdE92ZXI6IHRydWUsXG4gICAgLy8gQG9wdGlvbiBhbG1vc3REaXN0YW5jZTogTnVtYmVyID0gMjVcbiAgICAvLyBUb2xlcmFuY2UgaW4gcGl4ZWxzXG4gICAgYWxtb3N0RGlzdGFuY2U6IDI1LCAgIC8vIHBpeGVsc1xuICAgIC8vIEBvcHRpb24gYWxtb3N0U2FtcGxpbmdQZXJpb2Q6IE51bWJlciA9IDUwXG4gICAgLy8gVG8gcmVkdWNlIHRoZSAnbW91c2Vtb3ZlJyBldmVudCBmcmVxdWVuY3kuIEluIG1pbGxpc2Vjb25kc1xuICAgIGFsbW9zdFNhbXBsaW5nUGVyaW9kOiA1MCwgIC8vIG1zXG4gICAgLy8gQG9wdGlvbiBhbG1vc3RPbk1vdXNlTW92ZSBCb29sZWFuID0gdHJ1ZVxuICAgIC8vIFNldCBpdCB0byBmYWxzZSB0byBkaXNhYmxlIHRyYWNrICdtb3VzZW1vdmUnIGV2ZW50cyBhbmQgaW1wcm92ZSBwZXJmb3JtYW5jZVxuICAgIC8vIGlmIEFsbW9zdE92ZXIgaXMgb25seSBuZWVkIGZvciAnY2xpY2snIGV2ZW50cy5cbiAgICBhbG1vc3RPbk1vdXNlTW92ZTogdHJ1ZSxcbn0pO1xuXG5cbkwuSGFuZGxlci5BbG1vc3RPdmVyID0gTC5IYW5kbGVyLmV4dGVuZCh7XG5cbiAgICBpbmNsdWRlczogTC5FdmVudGVkIHx8IEwuTWl4aW4uRXZlbnRzLFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICB0aGlzLl9tYXAgPSBtYXA7XG4gICAgICAgIHRoaXMuX2xheWVycyA9IFtdO1xuICAgICAgICB0aGlzLl9wcmV2aW91cyA9IG51bGw7XG4gICAgICAgIHRoaXMuX21hcmtlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2J1ZmZlciA9IDA7XG5cbiAgICAgICAgLy8gUmVkdWNlICdtb3VzZW1vdmUnIGV2ZW50IGZyZXF1ZW5jeVxuICAgICAgICB0aGlzLl9fbW91c2VNb3ZlU2FtcGxpbmcgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRpbWVyID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWQgPSAoZGF0ZSAtIHRpbWVyKSA8IHRoaXMuX21hcC5vcHRpb25zLmFsbW9zdFNhbXBsaW5nUGVyaW9kO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZCB8fCB0aGlzLl9sYXllcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjsgIC8vIElnbm9yZSBtb3ZlbWVudFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aW1lciA9IGRhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwLmZpcmUoJ21vdXNlbW92ZXNhbXBsZScsIHtsYXRsbmc6IGUubGF0bG5nfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KSgpO1xuICAgIH0sXG5cbiAgICBhZGRIb29rczogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fbWFwLm9wdGlvbnMuYWxtb3N0T25Nb3VzZU1vdmUpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5vbignbW91c2Vtb3ZlJywgdGhpcy5fX21vdXNlTW92ZVNhbXBsaW5nLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX21hcC5vbignbW91c2Vtb3Zlc2FtcGxlJywgdGhpcy5fb25Nb3VzZU1vdmUsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hcC5vbignY2xpY2sgZGJsY2xpY2snLCB0aGlzLl9vbk1vdXNlQ2xpY2ssIHRoaXMpO1xuXG4gICAgICAgIHZhciBtYXAgPSB0aGlzLl9tYXA7XG4gICAgICAgIGZ1bmN0aW9uIGNvbXB1dGVCdWZmZXIoKSB7XG4gICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9tYXAubGF5ZXJQb2ludFRvTGF0TG5nKFswLCAwXSkubGF0IC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcC5sYXllclBvaW50VG9MYXRMbmcoW3RoaXMuX21hcC5vcHRpb25zLmFsbW9zdERpc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwLm9wdGlvbnMuYWxtb3N0RGlzdGFuY2VdKS5sYXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFwLm9uKCd2aWV3cmVzZXQgem9vbWVuZCcsIGNvbXB1dGVCdWZmZXIsIHRoaXMpO1xuICAgICAgICB0aGlzLl9tYXAud2hlblJlYWR5KGNvbXB1dGVCdWZmZXIsIHRoaXMpO1xuICAgIH0sXG5cbiAgICByZW1vdmVIb29rczogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9tYXAub2ZmKCdtb3VzZW1vdmVzYW1wbGUnKTtcbiAgICAgICAgdGhpcy5fbWFwLm9mZignbW91c2Vtb3ZlJywgdGhpcy5fX21vdXNlTW92ZVNhbXBsaW5nLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fbWFwLm9mZignY2xpY2sgZGJsY2xpY2snLCB0aGlzLl9vbk1vdXNlQ2xpY2ssIHRoaXMpO1xuICAgIH0sXG5cbiAgICBhZGRMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbGF5ZXIuZWFjaExheWVyID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGxheWVyLmVhY2hMYXllcihmdW5jdGlvbiAobCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkTGF5ZXIobCk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5pbmRleExheWVyID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4TGF5ZXIobGF5ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbGF5ZXJzLnB1c2gobGF5ZXIpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZUxheWVyOiBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBsYXllci5lYWNoTGF5ZXIgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgbGF5ZXIuZWFjaExheWVyKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMYXllcihsKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnVuaW5kZXhMYXllciA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bmluZGV4TGF5ZXIobGF5ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fbGF5ZXJzLmluZGV4T2YobGF5ZXIpO1xuICAgICAgICAgICAgaWYgKDAgPD0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcmV2aW91cyA9IG51bGw7XG4gICAgfSxcblxuICAgIGdldENsb3Nlc3Q6IGZ1bmN0aW9uIChsYXRsbmcpIHtcbiAgICAgICAgdmFyIHNuYXBmdW5jID0gTC5HZW9tZXRyeVV0aWwuY2xvc2VzdExheWVyU25hcCxcbiAgICAgICAgICAgIGRpc3RhbmNlID0gdGhpcy5fbWFwLm9wdGlvbnMuYWxtb3N0RGlzdGFuY2U7XG5cbiAgICAgICAgdmFyIHNuYXBsaXN0ID0gW107XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZWFyY2hCdWZmZXIgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgc25hcGxpc3QgPSB0aGlzLnNlYXJjaEJ1ZmZlcihsYXRsbmcsIHRoaXMuX2J1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzbmFwbGlzdCA9IHRoaXMuX2xheWVycztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc25hcGZ1bmModGhpcy5fbWFwLCBzbmFwbGlzdCwgbGF0bG5nLCBkaXN0YW5jZSwgZmFsc2UpO1xuICAgIH0sXG5cbiAgICBfb25Nb3VzZU1vdmU6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBjbG9zZXN0ID0gdGhpcy5nZXRDbG9zZXN0KGUubGF0bG5nKTtcbiAgICAgICAgaWYgKGNsb3Nlc3QpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fcHJldmlvdXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXAuZmlyZSgnYWxtb3N0Om92ZXInLCB7bGF5ZXI6IGNsb3Nlc3QubGF5ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdGxuZzogY2xvc2VzdC5sYXRsbmd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKEwuc3RhbXAodGhpcy5fcHJldmlvdXMubGF5ZXIpICE9IEwuc3RhbXAoY2xvc2VzdC5sYXllcikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXAuZmlyZSgnYWxtb3N0Om91dCcsIHtsYXllcjogdGhpcy5fcHJldmlvdXMubGF5ZXJ9KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXAuZmlyZSgnYWxtb3N0Om92ZXInLCB7bGF5ZXI6IGNsb3Nlc3QubGF5ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdGxuZzogY2xvc2VzdC5sYXRsbmd9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fbWFwLmZpcmUoJ2FsbW9zdDptb3ZlJywge2xheWVyOiBjbG9zZXN0LmxheWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdGxuZzogY2xvc2VzdC5sYXRsbmd9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wcmV2aW91cykge1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcC5maXJlKCdhbG1vc3Q6b3V0Jywge2xheWVyOiB0aGlzLl9wcmV2aW91cy5sYXllcn0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzID0gY2xvc2VzdDtcbiAgICB9LFxuXG4gICAgX29uTW91c2VDbGljazogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGNsb3Nlc3QgPSB0aGlzLmdldENsb3Nlc3QoZS5sYXRsbmcpO1xuICAgICAgICBpZiAoY2xvc2VzdCkge1xuICAgICAgICAgICAgdGhpcy5fbWFwLmZpcmUoJ2FsbW9zdDonICsgZS50eXBlLCB7bGF5ZXI6IGNsb3Nlc3QubGF5ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXRsbmc6IGNsb3Nlc3QubGF0bG5nfSk7XG4gICAgICAgIH1cbiAgICB9LFxufSk7XG5cbmlmIChMLkxheWVySW5kZXhNaXhpbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgTC5IYW5kbGVyLkFsbW9zdE92ZXIuaW5jbHVkZShMLkxheWVySW5kZXhNaXhpbik7XG59XG5cbkwuTWFwLmFkZEluaXRIb29rKCdhZGRIYW5kbGVyJywgJ2FsbW9zdE92ZXInLCBMLkhhbmRsZXIuQWxtb3N0T3Zlcik7XG4iLCIoZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5MLlRvb2xiYXIyLkRyYXdBY3Rpb24gPSB7XG4gICAgZnJvbUhhbmRsZXI6IGZ1bmN0aW9uKEhhbmRsZXIsIGRlZmF1bHRUb29sYmFySWNvbiwgZGVmYXVsdFN1YlRvb2xiYXIpIHtcbiAgICAgICAgcmV0dXJuIEwuVG9vbGJhcjIuQWN0aW9uLmV4dGVuZCh7XG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgdG9vbGJhckljb246IEwuZXh0ZW5kKHt9LCBMLlRvb2xiYXIyLkFjdGlvbi5wcm90b3R5cGUub3B0aW9ucy50b29sYmFySWNvbiwgZGVmYXVsdFRvb2xiYXJJY29uKSxcbiAgICAgICAgICAgICAgICBzdWJUb29sYmFyOiBkZWZhdWx0U3ViVG9vbGJhciA/IGRlZmF1bHRTdWJUb29sYmFyIDogTC5Ub29sYmFyMi5BY3Rpb24ucHJvdG90eXBlLm9wdGlvbnMuc3ViVG9vbGJhclxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24obWFwLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVyID0gbmV3IEhhbmRsZXIobWFwLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVyLm9uKCdkaXNhYmxlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZGlzYWJsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgTC5Ub29sYmFyMi5BY3Rpb24ucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGVuYWJsZTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZXIuZW5hYmxlKCk7XG4gICAgICAgICAgICAgICAgTC5Ub29sYmFyMi5BY3Rpb24ucHJvdG90eXBlLmVuYWJsZS5jYWxsKHRoaXMsIGUpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZGlzYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlci5kaXNhYmxlKCk7XG4gICAgICAgICAgICAgICAgTC5Ub29sYmFyMi5BY3Rpb24ucHJvdG90eXBlLmRpc2FibGUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldE9wdGlvbnM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVyLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgTC5Ub29sYmFyMi5BY3Rpb24ucHJvdG90eXBlLnNldE9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbkwuVG9vbGJhcjIuRHJhd0FjdGlvbi5DYW5jZWwgPSBMLlRvb2xiYXIyLkFjdGlvbi5leHRlbmQoe1xuXHRvcHRpb25zOiB7XG5cdFx0dG9vbGJhckljb246IHsgaHRtbDogJ0NhbmNlbCcgfVxuXHR9LFxuXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChtYXAsIGRyYXdpbmcpIHtcblx0XHR0aGlzLmRyYXdpbmcgPSBkcmF3aW5nO1xuXHRcdEwuVG9vbGJhcjIuQWN0aW9uLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcyk7XG5cdH0sXG5cblx0YWRkSG9va3M6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLmRyYXdpbmcuZGlzYWJsZSgpO1xuXHRcdHRoaXMuZGlzYWJsZSgpO1xuXHR9XG59KTtcblxuLy8gTk9URTogVGhpcyBzdWJhY3Rpb24gaXMgb25seSBhcHByb3ByaWF0ZSBmb3IgYWN0aW9ucyB3aGljaCBoYXZlIGEgZGVsZXRlTGFzdFZlcnRleCBtZXRob2QuXG5MLlRvb2xiYXIyLkRyYXdBY3Rpb24uUmVtb3ZlTGFzdFBvaW50ID0gTC5Ub29sYmFyMi5BY3Rpb24uZXh0ZW5kKHtcblx0b3B0aW9uczoge1xuXHRcdHRvb2xiYXJJY29uOiB7IGh0bWw6IEwuZHJhd0xvY2FsLmRyYXcudG9vbGJhci51bmRvLnRleHQgfVxuXHR9LFxuXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChtYXAsIGRyYXdpbmcpIHtcblx0XHR0aGlzLmRyYXdpbmcgPSBkcmF3aW5nO1xuXHRcdEwuVG9vbGJhcjIuQWN0aW9uLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcyk7XG5cdH0sXG5cblx0YWRkSG9va3M6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLmRyYXdpbmcuZGVsZXRlTGFzdFZlcnRleCgpO1xuXHRcdHRoaXMuZGlzYWJsZSgpO1xuXHR9XG59KTtcblxuTC5Ub29sYmFyMi5EcmF3QWN0aW9uLkNpcmNsZSA9IEwuVG9vbGJhcjIuRHJhd0FjdGlvbi5mcm9tSGFuZGxlcihcbiAgICBMLkRyYXcuQ2lyY2xlLFxuICAgIHtcbiAgICAgICAgY2xhc3NOYW1lOiAnbGVhZmxldC1kcmF3LWRyYXctY2lyY2xlJyxcbiAgICAgICAgdG9vbHRpcDogTC5kcmF3TG9jYWwuZHJhdy50b29sYmFyLmJ1dHRvbnMuY2lyY2xlXG4gICAgfSxcbiAgICBuZXcgTC5Ub29sYmFyMih7IGFjdGlvbnM6IFtMLlRvb2xiYXIyLkRyYXdBY3Rpb24uQ2FuY2VsXSB9KVxuKTtcblxuTC5Ub29sYmFyMi5EcmF3QWN0aW9uLk1hcmtlciA9IEwuVG9vbGJhcjIuRHJhd0FjdGlvbi5mcm9tSGFuZGxlcihcbiAgICBMLkRyYXcuTWFya2VyLFxuICAgIHtcbiAgICAgICAgY2xhc3NOYW1lOiAnbGVhZmxldC1kcmF3LWRyYXctbWFya2VyJyxcbiAgICAgICAgdG9vbHRpcDogTC5kcmF3TG9jYWwuZHJhdy50b29sYmFyLmJ1dHRvbnMubWFya2VyXG4gICAgfSxcblx0bmV3IEwuVG9vbGJhcjIoeyBhY3Rpb25zOiBbTC5Ub29sYmFyMi5EcmF3QWN0aW9uLkNhbmNlbF0gfSlcbik7XG5cbkwuVG9vbGJhcjIuRHJhd0FjdGlvbi5Qb2x5Z29uID0gTC5Ub29sYmFyMi5EcmF3QWN0aW9uLmZyb21IYW5kbGVyKFxuICAgIEwuRHJhdy5Qb2x5Z29uLFxuICAgIHtcbiAgICAgICAgY2xhc3NOYW1lOiAnbGVhZmxldC1kcmF3LWRyYXctcG9seWdvbicsXG4gICAgICAgIHRvb2x0aXA6IEwuZHJhd0xvY2FsLmRyYXcudG9vbGJhci5idXR0b25zLnBvbHlnb25cbiAgICB9LFxuXHRuZXcgTC5Ub29sYmFyMih7IGFjdGlvbnM6IFtMLlRvb2xiYXIyLkRyYXdBY3Rpb24uQ2FuY2VsLCBMLlRvb2xiYXIyLkRyYXdBY3Rpb24uUmVtb3ZlTGFzdFBvaW50XSB9KVxuKTtcblxuLy8gU3VwcG9ydCBmb3IgRHJhd0FjdGlvbi5SZW1vdmVMYXN0UG9pbnQuXG5MLlRvb2xiYXIyLkRyYXdBY3Rpb24uUG9seWdvbi5wcm90b3R5cGUuZGVsZXRlTGFzdFZlcnRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2hhbmRsZXIuZGVsZXRlTGFzdFZlcnRleCgpO1xufVxuXG5MLlRvb2xiYXIyLkRyYXdBY3Rpb24uUG9seWxpbmUgPSBMLlRvb2xiYXIyLkRyYXdBY3Rpb24uZnJvbUhhbmRsZXIoXG4gICAgTC5EcmF3LlBvbHlsaW5lLFxuICAgIHtcbiAgICAgICAgY2xhc3NOYW1lOiAnbGVhZmxldC1kcmF3LWRyYXctcG9seWxpbmUnLFxuICAgICAgICB0b29sdGlwOiBMLmRyYXdMb2NhbC5kcmF3LnRvb2xiYXIuYnV0dG9ucy5wb2x5bGluZVxuICAgIH0sXG5cdG5ldyBMLlRvb2xiYXIyKHsgYWN0aW9uczogW0wuVG9vbGJhcjIuRHJhd0FjdGlvbi5DYW5jZWwsIEwuVG9vbGJhcjIuRHJhd0FjdGlvbi5SZW1vdmVMYXN0UG9pbnRdIH0pXG4pO1xuXG4vLyBTdXBwb3J0IGZvciBEcmF3QWN0aW9uLlJlbW92ZUxhc3RQb2ludC5cbkwuVG9vbGJhcjIuRHJhd0FjdGlvbi5Qb2x5bGluZS5wcm90b3R5cGUuZGVsZXRlTGFzdFZlcnRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2hhbmRsZXIuZGVsZXRlTGFzdFZlcnRleCgpO1xufVxuXG5MLlRvb2xiYXIyLkRyYXdBY3Rpb24uUmVjdGFuZ2xlID0gTC5Ub29sYmFyMi5EcmF3QWN0aW9uLmZyb21IYW5kbGVyKFxuICAgIEwuRHJhdy5SZWN0YW5nbGUsXG4gICAge1xuICAgICAgICBjbGFzc05hbWU6ICdsZWFmbGV0LWRyYXctZHJhdy1yZWN0YW5nbGUnLFxuICAgICAgICB0b29sdGlwOiBMLmRyYXdMb2NhbC5kcmF3LnRvb2xiYXIuYnV0dG9ucy5yZWN0YW5nbGVcbiAgICB9LFxuXHRuZXcgTC5Ub29sYmFyMih7IGFjdGlvbnM6IFtMLlRvb2xiYXIyLkRyYXdBY3Rpb24uQ2FuY2VsXSB9KVxuKTtcblxuTC5Ub29sYmFyMi5EcmF3VG9vbGJhciA9IEwuVG9vbGJhcjIuQ29udHJvbC5leHRlbmQoe1xuXHRvcHRpb25zOiB7XG5cdFx0YWN0aW9uczogW1xuXHRcdFx0TC5Ub29sYmFyMi5EcmF3QWN0aW9uLlBvbHlnb24sXG5cdFx0XHRMLlRvb2xiYXIyLkRyYXdBY3Rpb24uUG9seWxpbmUsXG5cdFx0XHRMLlRvb2xiYXIyLkRyYXdBY3Rpb24uTWFya2VyLFxuXHRcdFx0TC5Ub29sYmFyMi5EcmF3QWN0aW9uLlJlY3RhbmdsZSxcblx0XHRcdEwuVG9vbGJhcjIuRHJhd0FjdGlvbi5DaXJjbGVcblx0XHRdLFxuXHRcdGNsYXNzTmFtZTogJ2xlYWZsZXQtZHJhdy10b29sYmFyJ1xuXHR9XG59KTtcblxuTC5Ub29sYmFyMi5FZGl0VG9vbGJhciA9IHt9O1xuXG5MLlRvb2xiYXIyLkVkaXRBY3Rpb24gPSB7XG4gICAgZnJvbUhhbmRsZXI6IGZ1bmN0aW9uKEhhbmRsZXIsIGRlZmF1bHRUb29sYmFySWNvbiwgZGVmYXVsdFN1YlRvb2xiYXIpIHtcbiAgICAgICAgcmV0dXJuIEwuVG9vbGJhcjIuQWN0aW9uLmV4dGVuZCh7XG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgdG9vbGJhckljb246IEwuZXh0ZW5kKHt9LCBMLlRvb2xiYXIyLkFjdGlvbi5wcm90b3R5cGUub3B0aW9ucy50b29sYmFySWNvbiwgZGVmYXVsdFRvb2xiYXJJY29uKSxcbiAgICAgICAgICAgICAgICBzdWJUb29sYmFyOiBkZWZhdWx0U3ViVG9vbGJhciA/IGRlZmF1bHRTdWJUb29sYmFyIDogTC5Ub29sYmFyMi5BY3Rpb24ucHJvdG90eXBlLm9wdGlvbnMuc3ViVG9vbGJhclxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24obWFwLCBmZWF0dXJlR3JvdXAsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0gdGhpcztcblxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuZmVhdHVyZUdyb3VwID0gZmVhdHVyZUdyb3VwO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlciA9IG5ldyBIYW5kbGVyKG1hcCwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlci5vbignZGlzYWJsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmRpc2FibGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIEwuVG9vbGJhcjIuQWN0aW9uLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBlbmFibGU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVyLmVuYWJsZSgpO1xuICAgICAgICAgICAgICAgIEwuVG9vbGJhcjIuQWN0aW9uLnByb3RvdHlwZS5lbmFibGUuY2FsbCh0aGlzLCBlKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGRpc2FibGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZXIuZGlzYWJsZSgpO1xuICAgICAgICAgICAgICAgIEwuVG9vbGJhcjIuQWN0aW9uLnByb3RvdHlwZS5kaXNhYmxlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXRPcHRpb25zOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIEwuVG9vbGJhcjIuQWN0aW9uLnByb3RvdHlwZS5zZXRPcHRpb25zLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvLyBGb3IgdGhlIHVuZG8gc3ViYWN0aW9uLlxuICAgICAgICAgICAgcmV2ZXJ0TGF5ZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVyLnJldmVydExheWVycygpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLy8gRm9yIHRoZSBzYXZlIHN1YmFjdGlvbi5cbiAgICAgICAgICAgIHNhdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZXIuc2F2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5MLlRvb2xiYXIyLkVkaXRBY3Rpb24uQ29udHJvbCA9IHt9O1xuXG5MLlRvb2xiYXIyLkVkaXRBY3Rpb24uQ29udHJvbC5TYXZlID0gTC5Ub29sYmFyMi5BY3Rpb24uZXh0ZW5kKHtcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHRvb2xiYXJJY29uOiB7IGh0bWw6ICdTYXZlJyB9XG4gICAgfSxcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihtYXAsIGZlYXR1cmVHcm91cCwgZWRpdGluZykge1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSBlZGl0aW5nO1xuICAgICAgICBMLlRvb2xiYXIyLkFjdGlvbi5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMpO1xuICAgIH0sXG4gICAgYWRkSG9va3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVkaXRpbmcuc2F2ZSgpO1xuICAgICAgICB0aGlzLmVkaXRpbmcuZGlzYWJsZSgpO1xuICAgIH1cbn0pO1xuXG5MLlRvb2xiYXIyLkVkaXRBY3Rpb24uQ29udHJvbC5VbmRvID0gTC5Ub29sYmFyMi5BY3Rpb24uZXh0ZW5kKHtcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHRvb2xiYXJJY29uOiB7IGh0bWw6ICdVbmRvJyB9XG4gICAgfSxcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihtYXAsIGZlYXR1cmVHcm91cCwgZWRpdGluZykge1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSBlZGl0aW5nO1xuICAgICAgICBMLlRvb2xiYXIyLkFjdGlvbi5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMpO1xuICAgIH0sXG4gICAgYWRkSG9va3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVkaXRpbmcucmV2ZXJ0TGF5ZXJzKCk7XG4gICAgICAgIHRoaXMuZWRpdGluZy5kaXNhYmxlKCk7XG4gICAgfVxufSk7XG5cblxuTC5Ub29sYmFyMi5FZGl0QWN0aW9uLkNvbnRyb2wuRWRpdCA9IEwuVG9vbGJhcjIuRWRpdEFjdGlvbi5mcm9tSGFuZGxlcihcbiAgICBMLkVkaXRUb29sYmFyLkVkaXQsXG4gICAge1xuICAgICAgICBjbGFzc05hbWU6ICdsZWFmbGV0LWRyYXctZWRpdC1lZGl0JyxcbiAgICAgICAgdG9vbHRpcDogJ0VkaXQgZmVhdHVyZXMnXG4gICAgfSxcbiAgICBuZXcgTC5Ub29sYmFyMih7XG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIEwuVG9vbGJhcjIuRWRpdEFjdGlvbi5Db250cm9sLlNhdmUsXG4gICAgICAgICAgICBMLlRvb2xiYXIyLkVkaXRBY3Rpb24uQ29udHJvbC5VbmRvXG4gICAgICAgIF1cbiAgICB9KVxuKTtcblxuTC5Ub29sYmFyMi5FZGl0QWN0aW9uLkNvbnRyb2wuRGVsZXRlID0gTC5Ub29sYmFyMi5FZGl0QWN0aW9uLmZyb21IYW5kbGVyKFxuICAgIEwuRWRpdFRvb2xiYXIuRGVsZXRlLFxuICAgIHtcbiAgICAgICAgY2xhc3NOYW1lOiAnbGVhZmxldC1kcmF3LWVkaXQtcmVtb3ZlJyxcbiAgICAgICAgdG9vbHRpcDogJ1JlbW92ZSBmZWF0dXJlcydcbiAgICB9LFxuICAgIG5ldyBMLlRvb2xiYXIyKHtcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAgTC5Ub29sYmFyMi5FZGl0QWN0aW9uLkNvbnRyb2wuU2F2ZSxcbiAgICAgICAgICAgIEwuVG9vbGJhcjIuRWRpdEFjdGlvbi5Db250cm9sLlVuZG9cbiAgICAgICAgXVxuICAgIH0pXG4pO1xuXG5MLlRvb2xiYXIyLkVkaXRUb29sYmFyLkNvbnRyb2wgPSBMLlRvb2xiYXIyLkNvbnRyb2wuZXh0ZW5kKHtcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgIEwuVG9vbGJhcjIuRWRpdEFjdGlvbi5Db250cm9sLkVkaXQsXG4gICAgICAgICAgICBMLlRvb2xiYXIyLkVkaXRBY3Rpb24uQ29udHJvbC5EZWxldGVcbiAgICAgICAgXSxcbiAgICAgICAgY2xhc3NOYW1lOiAnbGVhZmxldC1kcmF3LXRvb2xiYXInLFxuICAgIH1cbn0pO1xuXG5MLlRvb2xiYXIyLkVkaXRBY3Rpb24uUG9wdXAgPSB7fTtcblxuTC5Ub29sYmFyMi5FZGl0QWN0aW9uLlBvcHVwLkVkaXQgPSBMLlRvb2xiYXIyLkFjdGlvbi5leHRlbmQoe1xuXHRvcHRpb25zOiB7XG5cdFx0dG9vbGJhckljb246IHsgY2xhc3NOYW1lOiAnbGVhZmxldC1kcmF3LWVkaXQtZWRpdCcgfVxuXHR9LFxuXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChtYXAsIHNoYXBlLCBvcHRpb25zKSB7XG5cdFx0dGhpcy5fbWFwID0gbWFwO1xuXG5cdFx0dGhpcy5fc2hhcGUgPSBzaGFwZTtcblx0XHR0aGlzLl9zaGFwZS5vcHRpb25zLmVkaXRpbmcgPSB0aGlzLl9zaGFwZS5vcHRpb25zLmVkaXRpbmcgfHwge307XG5cblx0XHRMLlRvb2xiYXIyLkFjdGlvbi5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG1hcCwgb3B0aW9ucyk7XG5cdH0sXG5cblx0ZW5hYmxlOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcblx0XHRcdHNoYXBlID0gdGhpcy5fc2hhcGU7XG5cblx0XHRzaGFwZS5lZGl0aW5nLmVuYWJsZSgpO1xuXHRcdG1hcC5yZW1vdmVMYXllcih0aGlzLnRvb2xiYXIpO1xuXHRcdFxuXHRcdG1hcC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLnNhdmUoKTtcblx0XHRcdHNoYXBlLmVkaXRpbmcuZGlzYWJsZSgpO1xuXHRcdH0sIHRoaXMpO1xuXHR9LFxuXG5cdHNhdmU6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBtYXAgPSB0aGlzLl9tYXAsXG5cdFx0XHRzaGFwZSA9IHRoaXMuX3NoYXBlO1xuXG5cdFx0aWYgKHNoYXBlLmVkaXRlZCkge1xuXHRcdFx0bWFwLmZpcmUoTC5EcmF3LkV2ZW50LkVESVRFRCwgeyBsYXllcnM6IEwubGF5ZXJHcm91cChbc2hhcGVdKSB9KTtcblx0XHR9XG5cdFx0c2hhcGUuZWRpdGVkID0gZmFsc2U7XG5cdH1cbn0pO1xuXG5MLlRvb2xiYXIyLkVkaXRBY3Rpb24uUG9wdXAuRGVsZXRlID0gTC5Ub29sYmFyMi5BY3Rpb24uZXh0ZW5kKHtcblx0b3B0aW9uczoge1xuXHRcdHRvb2xiYXJJY29uOiB7IGNsYXNzTmFtZTogJ2xlYWZsZXQtZHJhdy1lZGl0LXJlbW92ZScgfVxuXHR9LFxuXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChtYXAsIHNoYXBlLCBvcHRpb25zKSB7XG5cdFx0dGhpcy5fbWFwID0gbWFwO1xuXHRcdHRoaXMuX3NoYXBlID0gc2hhcGU7XG5cblx0XHRMLlRvb2xiYXIyLkFjdGlvbi5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG1hcCwgb3B0aW9ucyk7XG5cdH0sXG5cblx0YWRkSG9va3M6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwO1xuXG5cdFx0bWFwLnJlbW92ZUxheWVyKHRoaXMuX3NoYXBlKTtcblx0XHRtYXAucmVtb3ZlTGF5ZXIodGhpcy50b29sYmFyKTtcblxuXHRcdGNvbnNvbGUubG9nKCdmaXJpbmcgZHJhdzpkZWxldGVkJyk7XG5cdFx0bWFwLmZpcmUoTC5EcmF3LkV2ZW50LkRFTEVURUQsIHsgbGF5ZXJzOiBMLmxheWVyR3JvdXAoW3RoaXMuX3NoYXBlXSkgfSk7XG5cdH1cbn0pO1xuXG5MLlRvb2xiYXIyLkVkaXRUb29sYmFyLlBvcHVwID0gTC5Ub29sYmFyMi5Qb3B1cC5leHRlbmQoe1xuXHRvcHRpb25zOiB7XG5cdFx0YWN0aW9uczogW1xuXHRcdFx0TC5Ub29sYmFyMi5FZGl0QWN0aW9uLlBvcHVwLkVkaXQsXG5cdFx0XHRMLlRvb2xiYXIyLkVkaXRBY3Rpb24uUG9wdXAuRGVsZXRlXG5cdFx0XSxcbiAgICAgICAgY2xhc3NOYW1lOiAnbGVhZmxldC1kcmF3LXRvb2xiYXInXG5cdH0sXG5cblx0b25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcblx0XHR2YXIgc2hhcGUgPSB0aGlzLl9hcmd1bWVudHNbMV07XG5cblx0XHRpZiAoc2hhcGUgaW5zdGFuY2VvZiBMLk1hcmtlcikge1xuXHRcdFx0LyogQWRqdXN0IHRoZSB0b29sYmFyIHBvc2l0aW9uIHNvIHRoYXQgaXQgZG9lc24ndCBjb3ZlciB0aGUgbWFya2VyLiAqL1xuXHRcdFx0dGhpcy5vcHRpb25zLmFuY2hvciA9IEwucG9pbnQoc2hhcGUub3B0aW9ucy5pY29uLm9wdGlvbnMucG9wdXBBbmNob3IpO1xuXHRcdH1cblxuXHRcdEwuVG9vbGJhcjIuUG9wdXAucHJvdG90eXBlLm9uQWRkLmNhbGwodGhpcywgbWFwKTtcblx0fVxufSk7XG5cblxufSkod2luZG93LCBkb2N1bWVudCk7IiwiaW1wb3J0IGJvb2xlYW5Qb2ludEluUG9seWdvbiBmcm9tIFwiQHR1cmYvYm9vbGVhbi1wb2ludC1pbi1wb2x5Z29uXCI7XG5pbXBvcnQgbGluZUludGVyc2VjdCBmcm9tIFwiQHR1cmYvbGluZS1pbnRlcnNlY3RcIjtcbmltcG9ydCB7IGZsYXR0ZW5FYWNoIH0gZnJvbSBcIkB0dXJmL21ldGFcIjtcbmltcG9ydCBwb2x5Z29uVG9MaW5lIGZyb20gXCJAdHVyZi9wb2x5Z29uLXRvLWxpbmVcIjtcbi8qKlxuICogQm9vbGVhbi1kaXNqb2ludCByZXR1cm5zIChUUlVFKSBpZiB0aGUgaW50ZXJzZWN0aW9uIG9mIHRoZSB0d28gZ2VvbWV0cmllcyBpcyBhbiBlbXB0eSBzZXQuXG4gKlxuICogQG5hbWUgYm9vbGVhbkRpc2pvaW50XG4gKiBAcGFyYW0ge0dlb21ldHJ5fEZlYXR1cmU8YW55Pn0gZmVhdHVyZTEgR2VvSlNPTiBGZWF0dXJlIG9yIEdlb21ldHJ5XG4gKiBAcGFyYW0ge0dlb21ldHJ5fEZlYXR1cmU8YW55Pn0gZmVhdHVyZTIgR2VvSlNPTiBGZWF0dXJlIG9yIEdlb21ldHJ5XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZS9mYWxzZVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2ludCA9IHR1cmYucG9pbnQoWzIsIDJdKTtcbiAqIHZhciBsaW5lID0gdHVyZi5saW5lU3RyaW5nKFtbMSwgMV0sIFsxLCAyXSwgWzEsIDNdLCBbMSwgNF1dKTtcbiAqXG4gKiB0dXJmLmJvb2xlYW5EaXNqb2ludChsaW5lLCBwb2ludCk7XG4gKiAvLz10cnVlXG4gKi9cbmZ1bmN0aW9uIGJvb2xlYW5EaXNqb2ludChmZWF0dXJlMSwgZmVhdHVyZTIpIHtcbiAgICB2YXIgYm9vbCA9IHRydWU7XG4gICAgZmxhdHRlbkVhY2goZmVhdHVyZTEsIGZ1bmN0aW9uIChmbGF0dGVuMSkge1xuICAgICAgICBmbGF0dGVuRWFjaChmZWF0dXJlMiwgZnVuY3Rpb24gKGZsYXR0ZW4yKSB7XG4gICAgICAgICAgICBpZiAoYm9vbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib29sID0gZGlzam9pbnQoZmxhdHRlbjEuZ2VvbWV0cnksIGZsYXR0ZW4yLmdlb21ldHJ5KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGJvb2w7XG59XG4vKipcbiAqIERpc2pvaW50IG9wZXJhdGlvbiBmb3Igc2ltcGxlIEdlb21ldHJpZXMgKFBvaW50L0xpbmVTdHJpbmcvUG9seWdvbilcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtHZW9tZXRyeTxhbnk+fSBnZW9tMSBHZW9KU09OIEdlb21ldHJ5XG4gKiBAcGFyYW0ge0dlb21ldHJ5PGFueT59IGdlb20yIEdlb0pTT04gR2VvbWV0cnlcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlL2ZhbHNlXG4gKi9cbmZ1bmN0aW9uIGRpc2pvaW50KGdlb20xLCBnZW9tMikge1xuICAgIHN3aXRjaCAoZ2VvbTEudHlwZSkge1xuICAgICAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICAgICAgICAgIHN3aXRjaCAoZ2VvbTIudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWNvbXBhcmVDb29yZHMoZ2VvbTEuY29vcmRpbmF0ZXMsIGdlb20yLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWlzUG9pbnRPbkxpbmUoZ2VvbTIsIGdlb20xKTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWJvb2xlYW5Qb2ludEluUG9seWdvbihnZW9tMSwgZ2VvbTIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgICAgICAgc3dpdGNoIChnZW9tMi50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIlBvaW50XCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNQb2ludE9uTGluZShnZW9tMSwgZ2VvbTIpO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNMaW5lT25MaW5lKGdlb20xLCBnZW9tMik7XG4gICAgICAgICAgICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc0xpbmVJblBvbHkoZ2VvbTIsIGdlb20xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgICAgIHN3aXRjaCAoZ2VvbTIudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWJvb2xlYW5Qb2ludEluUG9seWdvbihnZW9tMiwgZ2VvbTEpO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNMaW5lSW5Qb2x5KGdlb20xLCBnZW9tMik7XG4gICAgICAgICAgICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc1BvbHlJblBvbHkoZ2VvbTIsIGdlb20xKTtcbiAgICAgICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTE5MDgxNTgvMTk3OTA4NVxuZnVuY3Rpb24gaXNQb2ludE9uTGluZShsaW5lU3RyaW5nLCBwdCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZVN0cmluZy5jb29yZGluYXRlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgaWYgKGlzUG9pbnRPbkxpbmVTZWdtZW50KGxpbmVTdHJpbmcuY29vcmRpbmF0ZXNbaV0sIGxpbmVTdHJpbmcuY29vcmRpbmF0ZXNbaSArIDFdLCBwdC5jb29yZGluYXRlcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGlzTGluZU9uTGluZShsaW5lU3RyaW5nMSwgbGluZVN0cmluZzIpIHtcbiAgICB2YXIgZG9MaW5lc0ludGVyc2VjdCA9IGxpbmVJbnRlcnNlY3QobGluZVN0cmluZzEsIGxpbmVTdHJpbmcyKTtcbiAgICBpZiAoZG9MaW5lc0ludGVyc2VjdC5mZWF0dXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBpc0xpbmVJblBvbHkocG9seWdvbiwgbGluZVN0cmluZykge1xuICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBsaW5lU3RyaW5nLmNvb3JkaW5hdGVzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgY29vcmQgPSBfYVtfaV07XG4gICAgICAgIGlmIChib29sZWFuUG9pbnRJblBvbHlnb24oY29vcmQsIHBvbHlnb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgZG9MaW5lc0ludGVyc2VjdCA9IGxpbmVJbnRlcnNlY3QobGluZVN0cmluZywgcG9seWdvblRvTGluZShwb2x5Z29uKSk7XG4gICAgaWYgKGRvTGluZXNJbnRlcnNlY3QuZmVhdHVyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuLyoqXG4gKiBJcyBQb2x5Z29uIChnZW9tMSkgaW4gUG9seWdvbiAoZ2VvbTIpXG4gKiBPbmx5IHRha2VzIGludG8gYWNjb3VudCBvdXRlciByaW5nc1xuICogU2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ4MzM4MjMvMTk3OTA4NVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0dlb21ldHJ5fEZlYXR1cmU8UG9seWdvbj59IGZlYXR1cmUxIFBvbHlnb24xXG4gKiBAcGFyYW0ge0dlb21ldHJ5fEZlYXR1cmU8UG9seWdvbj59IGZlYXR1cmUyIFBvbHlnb24yXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZS9mYWxzZVxuICovXG5mdW5jdGlvbiBpc1BvbHlJblBvbHkoZmVhdHVyZTEsIGZlYXR1cmUyKSB7XG4gICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IGZlYXR1cmUxLmNvb3JkaW5hdGVzWzBdOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgY29vcmQxID0gX2FbX2ldO1xuICAgICAgICBpZiAoYm9vbGVhblBvaW50SW5Qb2x5Z29uKGNvb3JkMSwgZmVhdHVyZTIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfYiA9IDAsIF9jID0gZmVhdHVyZTIuY29vcmRpbmF0ZXNbMF07IF9iIDwgX2MubGVuZ3RoOyBfYisrKSB7XG4gICAgICAgIHZhciBjb29yZDIgPSBfY1tfYl07XG4gICAgICAgIGlmIChib29sZWFuUG9pbnRJblBvbHlnb24oY29vcmQyLCBmZWF0dXJlMSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBkb0xpbmVzSW50ZXJzZWN0ID0gbGluZUludGVyc2VjdChwb2x5Z29uVG9MaW5lKGZlYXR1cmUxKSwgcG9seWdvblRvTGluZShmZWF0dXJlMikpO1xuICAgIGlmIChkb0xpbmVzSW50ZXJzZWN0LmZlYXR1cmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGlzUG9pbnRPbkxpbmVTZWdtZW50KGxpbmVTZWdtZW50U3RhcnQsIGxpbmVTZWdtZW50RW5kLCBwdCkge1xuICAgIHZhciBkeGMgPSBwdFswXSAtIGxpbmVTZWdtZW50U3RhcnRbMF07XG4gICAgdmFyIGR5YyA9IHB0WzFdIC0gbGluZVNlZ21lbnRTdGFydFsxXTtcbiAgICB2YXIgZHhsID0gbGluZVNlZ21lbnRFbmRbMF0gLSBsaW5lU2VnbWVudFN0YXJ0WzBdO1xuICAgIHZhciBkeWwgPSBsaW5lU2VnbWVudEVuZFsxXSAtIGxpbmVTZWdtZW50U3RhcnRbMV07XG4gICAgdmFyIGNyb3NzID0gZHhjICogZHlsIC0gZHljICogZHhsO1xuICAgIGlmIChjcm9zcyAhPT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChNYXRoLmFicyhkeGwpID49IE1hdGguYWJzKGR5bCkpIHtcbiAgICAgICAgaWYgKGR4bCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBsaW5lU2VnbWVudFN0YXJ0WzBdIDw9IHB0WzBdICYmIHB0WzBdIDw9IGxpbmVTZWdtZW50RW5kWzBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGxpbmVTZWdtZW50RW5kWzBdIDw9IHB0WzBdICYmIHB0WzBdIDw9IGxpbmVTZWdtZW50U3RhcnRbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZHlsID4gMCkge1xuICAgICAgICByZXR1cm4gbGluZVNlZ21lbnRTdGFydFsxXSA8PSBwdFsxXSAmJiBwdFsxXSA8PSBsaW5lU2VnbWVudEVuZFsxXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBsaW5lU2VnbWVudEVuZFsxXSA8PSBwdFsxXSAmJiBwdFsxXSA8PSBsaW5lU2VnbWVudFN0YXJ0WzFdO1xuICAgIH1cbn1cbi8qKlxuICogY29tcGFyZUNvb3Jkc1xuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufSBwYWlyMSBwb2ludCBbeCx5XVxuICogQHBhcmFtIHtQb3NpdGlvbn0gcGFpcjIgcG9pbnQgW3gseV1cbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlL2ZhbHNlIGlmIGNvb3JkIHBhaXJzIG1hdGNoXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVDb29yZHMocGFpcjEsIHBhaXIyKSB7XG4gICAgcmV0dXJuIHBhaXIxWzBdID09PSBwYWlyMlswXSAmJiBwYWlyMVsxXSA9PT0gcGFpcjJbMV07XG59XG5leHBvcnQgZGVmYXVsdCBib29sZWFuRGlzam9pbnQ7XG4iLCJpbXBvcnQgYm9vbGVhbkRpc2pvaW50IGZyb20gXCJAdHVyZi9ib29sZWFuLWRpc2pvaW50XCI7XG5pbXBvcnQgeyBmbGF0dGVuRWFjaCB9IGZyb20gXCJAdHVyZi9tZXRhXCI7XG4vKipcbiAqIEJvb2xlYW4taW50ZXJzZWN0cyByZXR1cm5zIChUUlVFKSB0d28gZ2VvbWV0cmllcyBpbnRlcnNlY3QuXG4gKlxuICogQG5hbWUgYm9vbGVhbkludGVyc2VjdHNcbiAqIEBwYXJhbSB7R2VvbWV0cnl8RmVhdHVyZTxhbnk+fSBmZWF0dXJlMSBHZW9KU09OIEZlYXR1cmUgb3IgR2VvbWV0cnlcbiAqIEBwYXJhbSB7R2VvbWV0cnl8RmVhdHVyZTxhbnk+fSBmZWF0dXJlMiBHZW9KU09OIEZlYXR1cmUgb3IgR2VvbWV0cnlcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlL2ZhbHNlXG4gKiBAZXhhbXBsZVxuICogdmFyIHBvaW50ID0gdHVyZi5wb2ludChbMiwgMl0pO1xuICogdmFyIGxpbmUgPSB0dXJmLmxpbmVTdHJpbmcoW1sxLCAxXSwgWzEsIDJdLCBbMSwgM10sIFsxLCA0XV0pO1xuICpcbiAqIHR1cmYuYm9vbGVhbkludGVyc2VjdHMobGluZSwgcG9pbnQpO1xuICogLy89dHJ1ZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBib29sZWFuSW50ZXJzZWN0cyhmZWF0dXJlMSwgZmVhdHVyZTIpIHtcbiAgICB2YXIgYm9vbCA9IGZhbHNlO1xuICAgIGZsYXR0ZW5FYWNoKGZlYXR1cmUxLCBmdW5jdGlvbiAoZmxhdHRlbjEpIHtcbiAgICAgICAgZmxhdHRlbkVhY2goZmVhdHVyZTIsIGZ1bmN0aW9uIChmbGF0dGVuMikge1xuICAgICAgICAgICAgaWYgKGJvb2wgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvb2wgPSAhYm9vbGVhbkRpc2pvaW50KGZsYXR0ZW4xLmdlb21ldHJ5LCBmbGF0dGVuMi5nZW9tZXRyeSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBib29sO1xufVxuIiwiaW1wb3J0IHsgZ2V0Q29vcmQsIGdldEdlb20gfSBmcm9tIFwiQHR1cmYvaW52YXJpYW50XCI7XG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0V2ZW4lRTIlODAlOTNvZGRfcnVsZVxuLy8gbW9kaWZpZWQgZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL3N1YnN0YWNrL3BvaW50LWluLXBvbHlnb24vYmxvYi9tYXN0ZXIvaW5kZXguanNcbi8vIHdoaWNoIHdhcyBtb2RpZmllZCBmcm9tIGh0dHA6Ly93d3cuZWNzZS5ycGkuZWR1L0hvbWVwYWdlcy93cmYvUmVzZWFyY2gvU2hvcnRfTm90ZXMvcG5wb2x5Lmh0bWxcbi8qKlxuICogVGFrZXMgYSB7QGxpbmsgUG9pbnR9IGFuZCBhIHtAbGluayBQb2x5Z29ufSBvciB7QGxpbmsgTXVsdGlQb2x5Z29ufSBhbmQgZGV0ZXJtaW5lcyBpZiB0aGUgcG9pbnRcbiAqIHJlc2lkZXMgaW5zaWRlIHRoZSBwb2x5Z29uLiBUaGUgcG9seWdvbiBjYW4gYmUgY29udmV4IG9yIGNvbmNhdmUuIFRoZSBmdW5jdGlvbiBhY2NvdW50cyBmb3IgaG9sZXMuXG4gKlxuICogQG5hbWUgYm9vbGVhblBvaW50SW5Qb2x5Z29uXG4gKiBAcGFyYW0ge0Nvb3JkfSBwb2ludCBpbnB1dCBwb2ludFxuICogQHBhcmFtIHtGZWF0dXJlPFBvbHlnb258TXVsdGlQb2x5Z29uPn0gcG9seWdvbiBpbnB1dCBwb2x5Z29uIG9yIG11bHRpcG9seWdvblxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmlnbm9yZUJvdW5kYXJ5PWZhbHNlXSBUcnVlIGlmIHBvbHlnb24gYm91bmRhcnkgc2hvdWxkIGJlIGlnbm9yZWQgd2hlbiBkZXRlcm1pbmluZyBpZlxuICogdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgcG9seWdvbiBvdGhlcndpc2UgZmFsc2UuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSBQb2ludCBpcyBpbnNpZGUgdGhlIFBvbHlnb247IGBmYWxzZWAgaWYgdGhlIFBvaW50IGlzIG5vdCBpbnNpZGUgdGhlIFBvbHlnb25cbiAqIEBleGFtcGxlXG4gKiB2YXIgcHQgPSB0dXJmLnBvaW50KFstNzcsIDQ0XSk7XG4gKiB2YXIgcG9seSA9IHR1cmYucG9seWdvbihbW1xuICogICBbLTgxLCA0MV0sXG4gKiAgIFstODEsIDQ3XSxcbiAqICAgWy03MiwgNDddLFxuICogICBbLTcyLCA0MV0sXG4gKiAgIFstODEsIDQxXVxuICogXV0pO1xuICpcbiAqIHR1cmYuYm9vbGVhblBvaW50SW5Qb2x5Z29uKHB0LCBwb2x5KTtcbiAqIC8vPSB0cnVlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJvb2xlYW5Qb2ludEluUG9seWdvbihwb2ludCwgcG9seWdvbiwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgLy8gdmFsaWRhdGlvblxuICAgIGlmICghcG9pbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicG9pbnQgaXMgcmVxdWlyZWRcIik7XG4gICAgfVxuICAgIGlmICghcG9seWdvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwb2x5Z29uIGlzIHJlcXVpcmVkXCIpO1xuICAgIH1cbiAgICB2YXIgcHQgPSBnZXRDb29yZChwb2ludCk7XG4gICAgdmFyIGdlb20gPSBnZXRHZW9tKHBvbHlnb24pO1xuICAgIHZhciB0eXBlID0gZ2VvbS50eXBlO1xuICAgIHZhciBiYm94ID0gcG9seWdvbi5iYm94O1xuICAgIHZhciBwb2x5cyA9IGdlb20uY29vcmRpbmF0ZXM7XG4gICAgLy8gUXVpY2sgZWxpbWluYXRpb24gaWYgcG9pbnQgaXMgbm90IGluc2lkZSBiYm94XG4gICAgaWYgKGJib3ggJiYgaW5CQm94KHB0LCBiYm94KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBub3JtYWxpemUgdG8gbXVsdGlwb2x5Z29uXG4gICAgaWYgKHR5cGUgPT09IFwiUG9seWdvblwiKSB7XG4gICAgICAgIHBvbHlzID0gW3BvbHlzXTtcbiAgICB9XG4gICAgdmFyIGluc2lkZVBvbHkgPSBmYWxzZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvbHlzLmxlbmd0aCAmJiAhaW5zaWRlUG9seTsgaSsrKSB7XG4gICAgICAgIC8vIGNoZWNrIGlmIGl0IGlzIGluIHRoZSBvdXRlciByaW5nIGZpcnN0XG4gICAgICAgIGlmIChpblJpbmcocHQsIHBvbHlzW2ldWzBdLCBvcHRpb25zLmlnbm9yZUJvdW5kYXJ5KSkge1xuICAgICAgICAgICAgdmFyIGluSG9sZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGsgPSAxO1xuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHRoZSBwb2ludCBpbiBhbnkgb2YgdGhlIGhvbGVzXG4gICAgICAgICAgICB3aGlsZSAoayA8IHBvbHlzW2ldLmxlbmd0aCAmJiAhaW5Ib2xlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluUmluZyhwdCwgcG9seXNbaV1ba10sICFvcHRpb25zLmlnbm9yZUJvdW5kYXJ5KSkge1xuICAgICAgICAgICAgICAgICAgICBpbkhvbGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWluSG9sZSkge1xuICAgICAgICAgICAgICAgIGluc2lkZVBvbHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbnNpZGVQb2x5O1xufVxuLyoqXG4gKiBpblJpbmdcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBwdCBbeCx5XVxuICogQHBhcmFtIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gcmluZyBbW3gseV0sIFt4LHldLC4uXVxuICogQHBhcmFtIHtib29sZWFufSBpZ25vcmVCb3VuZGFyeSBpZ25vcmVCb3VuZGFyeVxuICogQHJldHVybnMge2Jvb2xlYW59IGluUmluZ1xuICovXG5mdW5jdGlvbiBpblJpbmcocHQsIHJpbmcsIGlnbm9yZUJvdW5kYXJ5KSB7XG4gICAgdmFyIGlzSW5zaWRlID0gZmFsc2U7XG4gICAgaWYgKHJpbmdbMF1bMF0gPT09IHJpbmdbcmluZy5sZW5ndGggLSAxXVswXSAmJlxuICAgICAgICByaW5nWzBdWzFdID09PSByaW5nW3JpbmcubGVuZ3RoIC0gMV1bMV0pIHtcbiAgICAgICAgcmluZyA9IHJpbmcuc2xpY2UoMCwgcmluZy5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSByaW5nLmxlbmd0aCAtIDE7IGkgPCByaW5nLmxlbmd0aDsgaiA9IGkrKykge1xuICAgICAgICB2YXIgeGkgPSByaW5nW2ldWzBdO1xuICAgICAgICB2YXIgeWkgPSByaW5nW2ldWzFdO1xuICAgICAgICB2YXIgeGogPSByaW5nW2pdWzBdO1xuICAgICAgICB2YXIgeWogPSByaW5nW2pdWzFdO1xuICAgICAgICB2YXIgb25Cb3VuZGFyeSA9IHB0WzFdICogKHhpIC0geGopICsgeWkgKiAoeGogLSBwdFswXSkgKyB5aiAqIChwdFswXSAtIHhpKSA9PT0gMCAmJlxuICAgICAgICAgICAgKHhpIC0gcHRbMF0pICogKHhqIC0gcHRbMF0pIDw9IDAgJiZcbiAgICAgICAgICAgICh5aSAtIHB0WzFdKSAqICh5aiAtIHB0WzFdKSA8PSAwO1xuICAgICAgICBpZiAob25Cb3VuZGFyeSkge1xuICAgICAgICAgICAgcmV0dXJuICFpZ25vcmVCb3VuZGFyeTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW50ZXJzZWN0ID0geWkgPiBwdFsxXSAhPT0geWogPiBwdFsxXSAmJlxuICAgICAgICAgICAgcHRbMF0gPCAoKHhqIC0geGkpICogKHB0WzFdIC0geWkpKSAvICh5aiAtIHlpKSArIHhpO1xuICAgICAgICBpZiAoaW50ZXJzZWN0KSB7XG4gICAgICAgICAgICBpc0luc2lkZSA9ICFpc0luc2lkZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNJbnNpZGU7XG59XG4vKipcbiAqIGluQkJveFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufSBwdCBwb2ludCBbeCx5XVxuICogQHBhcmFtIHtCQm94fSBiYm94IEJCb3ggW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF1cbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlL2ZhbHNlIGlmIHBvaW50IGlzIGluc2lkZSBCQm94XG4gKi9cbmZ1bmN0aW9uIGluQkJveChwdCwgYmJveCkge1xuICAgIHJldHVybiAoYmJveFswXSA8PSBwdFswXSAmJiBiYm94WzFdIDw9IHB0WzFdICYmIGJib3hbMl0gPj0gcHRbMF0gJiYgYmJveFszXSA+PSBwdFsxXSk7XG59XG4iLCIvKipcbiAqIEBtb2R1bGUgaGVscGVyc1xuICovXG4vKipcbiAqIEVhcnRoIFJhZGl1cyB1c2VkIHdpdGggdGhlIEhhcnZlc2luZSBmb3JtdWxhIGFuZCBhcHByb3hpbWF0ZXMgdXNpbmcgYSBzcGhlcmljYWwgKG5vbi1lbGxpcHNvaWQpIEVhcnRoLlxuICpcbiAqIEBtZW1iZXJvZiBoZWxwZXJzXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5leHBvcnQgdmFyIGVhcnRoUmFkaXVzID0gNjM3MTAwOC44O1xuLyoqXG4gKiBVbml0IG9mIG1lYXN1cmVtZW50IGZhY3RvcnMgdXNpbmcgYSBzcGhlcmljYWwgKG5vbi1lbGxpcHNvaWQpIGVhcnRoIHJhZGl1cy5cbiAqXG4gKiBAbWVtYmVyb2YgaGVscGVyc1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0IHZhciBmYWN0b3JzID0ge1xuICAgIGNlbnRpbWV0ZXJzOiBlYXJ0aFJhZGl1cyAqIDEwMCxcbiAgICBjZW50aW1ldHJlczogZWFydGhSYWRpdXMgKiAxMDAsXG4gICAgZGVncmVlczogZWFydGhSYWRpdXMgLyAxMTEzMjUsXG4gICAgZmVldDogZWFydGhSYWRpdXMgKiAzLjI4MDg0LFxuICAgIGluY2hlczogZWFydGhSYWRpdXMgKiAzOS4zNyxcbiAgICBraWxvbWV0ZXJzOiBlYXJ0aFJhZGl1cyAvIDEwMDAsXG4gICAga2lsb21ldHJlczogZWFydGhSYWRpdXMgLyAxMDAwLFxuICAgIG1ldGVyczogZWFydGhSYWRpdXMsXG4gICAgbWV0cmVzOiBlYXJ0aFJhZGl1cyxcbiAgICBtaWxlczogZWFydGhSYWRpdXMgLyAxNjA5LjM0NCxcbiAgICBtaWxsaW1ldGVyczogZWFydGhSYWRpdXMgKiAxMDAwLFxuICAgIG1pbGxpbWV0cmVzOiBlYXJ0aFJhZGl1cyAqIDEwMDAsXG4gICAgbmF1dGljYWxtaWxlczogZWFydGhSYWRpdXMgLyAxODUyLFxuICAgIHJhZGlhbnM6IDEsXG4gICAgeWFyZHM6IGVhcnRoUmFkaXVzICogMS4wOTM2LFxufTtcbi8qKlxuICogVW5pdHMgb2YgbWVhc3VyZW1lbnQgZmFjdG9ycyBiYXNlZCBvbiAxIG1ldGVyLlxuICpcbiAqIEBtZW1iZXJvZiBoZWxwZXJzXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgdmFyIHVuaXRzRmFjdG9ycyA9IHtcbiAgICBjZW50aW1ldGVyczogMTAwLFxuICAgIGNlbnRpbWV0cmVzOiAxMDAsXG4gICAgZGVncmVlczogMSAvIDExMTMyNSxcbiAgICBmZWV0OiAzLjI4MDg0LFxuICAgIGluY2hlczogMzkuMzcsXG4gICAga2lsb21ldGVyczogMSAvIDEwMDAsXG4gICAga2lsb21ldHJlczogMSAvIDEwMDAsXG4gICAgbWV0ZXJzOiAxLFxuICAgIG1ldHJlczogMSxcbiAgICBtaWxlczogMSAvIDE2MDkuMzQ0LFxuICAgIG1pbGxpbWV0ZXJzOiAxMDAwLFxuICAgIG1pbGxpbWV0cmVzOiAxMDAwLFxuICAgIG5hdXRpY2FsbWlsZXM6IDEgLyAxODUyLFxuICAgIHJhZGlhbnM6IDEgLyBlYXJ0aFJhZGl1cyxcbiAgICB5YXJkczogMS4wOTM2MTMzLFxufTtcbi8qKlxuICogQXJlYSBvZiBtZWFzdXJlbWVudCBmYWN0b3JzIGJhc2VkIG9uIDEgc3F1YXJlIG1ldGVyLlxuICpcbiAqIEBtZW1iZXJvZiBoZWxwZXJzXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgdmFyIGFyZWFGYWN0b3JzID0ge1xuICAgIGFjcmVzOiAwLjAwMDI0NzEwNSxcbiAgICBjZW50aW1ldGVyczogMTAwMDAsXG4gICAgY2VudGltZXRyZXM6IDEwMDAwLFxuICAgIGZlZXQ6IDEwLjc2MzkxMDQxNyxcbiAgICBoZWN0YXJlczogMC4wMDAxLFxuICAgIGluY2hlczogMTU1MC4wMDMxMDAwMDYsXG4gICAga2lsb21ldGVyczogMC4wMDAwMDEsXG4gICAga2lsb21ldHJlczogMC4wMDAwMDEsXG4gICAgbWV0ZXJzOiAxLFxuICAgIG1ldHJlczogMSxcbiAgICBtaWxlczogMy44NmUtNyxcbiAgICBtaWxsaW1ldGVyczogMTAwMDAwMCxcbiAgICBtaWxsaW1ldHJlczogMTAwMDAwMCxcbiAgICB5YXJkczogMS4xOTU5OTAwNDYsXG59O1xuLyoqXG4gKiBXcmFwcyBhIEdlb0pTT04ge0BsaW5rIEdlb21ldHJ5fSBpbiBhIEdlb0pTT04ge0BsaW5rIEZlYXR1cmV9LlxuICpcbiAqIEBuYW1lIGZlYXR1cmVcbiAqIEBwYXJhbSB7R2VvbWV0cnl9IGdlb21ldHJ5IGlucHV0IGdlb21ldHJ5XG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmV9IGEgR2VvSlNPTiBGZWF0dXJlXG4gKiBAZXhhbXBsZVxuICogdmFyIGdlb21ldHJ5ID0ge1xuICogICBcInR5cGVcIjogXCJQb2ludFwiLFxuICogICBcImNvb3JkaW5hdGVzXCI6IFsxMTAsIDUwXVxuICogfTtcbiAqXG4gKiB2YXIgZmVhdHVyZSA9IHR1cmYuZmVhdHVyZShnZW9tZXRyeSk7XG4gKlxuICogLy89ZmVhdHVyZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZShnZW9tLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZmVhdCA9IHsgdHlwZTogXCJGZWF0dXJlXCIgfTtcbiAgICBpZiAob3B0aW9ucy5pZCA9PT0gMCB8fCBvcHRpb25zLmlkKSB7XG4gICAgICAgIGZlYXQuaWQgPSBvcHRpb25zLmlkO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5iYm94KSB7XG4gICAgICAgIGZlYXQuYmJveCA9IG9wdGlvbnMuYmJveDtcbiAgICB9XG4gICAgZmVhdC5wcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCB7fTtcbiAgICBmZWF0Lmdlb21ldHJ5ID0gZ2VvbTtcbiAgICByZXR1cm4gZmVhdDtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIEdlb0pTT04ge0BsaW5rIEdlb21ldHJ5fSBmcm9tIGEgR2VvbWV0cnkgc3RyaW5nIHR5cGUgJiBjb29yZGluYXRlcy5cbiAqIEZvciBHZW9tZXRyeUNvbGxlY3Rpb24gdHlwZSB1c2UgYGhlbHBlcnMuZ2VvbWV0cnlDb2xsZWN0aW9uYFxuICpcbiAqIEBuYW1lIGdlb21ldHJ5XG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBHZW9tZXRyeSBUeXBlXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGNvb3JkaW5hdGVzIENvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEByZXR1cm5zIHtHZW9tZXRyeX0gYSBHZW9KU09OIEdlb21ldHJ5XG4gKiBAZXhhbXBsZVxuICogdmFyIHR5cGUgPSBcIlBvaW50XCI7XG4gKiB2YXIgY29vcmRpbmF0ZXMgPSBbMTEwLCA1MF07XG4gKiB2YXIgZ2VvbWV0cnkgPSB0dXJmLmdlb21ldHJ5KHR5cGUsIGNvb3JkaW5hdGVzKTtcbiAqIC8vID0+IGdlb21ldHJ5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW9tZXRyeSh0eXBlLCBjb29yZGluYXRlcywgX29wdGlvbnMpIHtcbiAgICBpZiAoX29wdGlvbnMgPT09IHZvaWQgMCkgeyBfb3B0aW9ucyA9IHt9OyB9XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgICAgICAgcmV0dXJuIHBvaW50KGNvb3JkaW5hdGVzKS5nZW9tZXRyeTtcbiAgICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgICAgIHJldHVybiBsaW5lU3RyaW5nKGNvb3JkaW5hdGVzKS5nZW9tZXRyeTtcbiAgICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgICAgIHJldHVybiBwb2x5Z29uKGNvb3JkaW5hdGVzKS5nZW9tZXRyeTtcbiAgICAgICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgICAgICAgIHJldHVybiBtdWx0aVBvaW50KGNvb3JkaW5hdGVzKS5nZW9tZXRyeTtcbiAgICAgICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgICAgICAgICAgcmV0dXJuIG11bHRpTGluZVN0cmluZyhjb29yZGluYXRlcykuZ2VvbWV0cnk7XG4gICAgICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgICAgICAgIHJldHVybiBtdWx0aVBvbHlnb24oY29vcmRpbmF0ZXMpLmdlb21ldHJ5O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHR5cGUgKyBcIiBpcyBpbnZhbGlkXCIpO1xuICAgIH1cbn1cbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBQb2ludH0ge0BsaW5rIEZlYXR1cmV9IGZyb20gYSBQb3NpdGlvbi5cbiAqXG4gKiBAbmFtZSBwb2ludFxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBjb29yZGluYXRlcyBsb25naXR1ZGUsIGxhdGl0dWRlIHBvc2l0aW9uIChlYWNoIGluIGRlY2ltYWwgZGVncmVlcylcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxQb2ludD59IGEgUG9pbnQgZmVhdHVyZVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2ludCA9IHR1cmYucG9pbnQoWy03NS4zNDMsIDM5Ljk4NF0pO1xuICpcbiAqIC8vPXBvaW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwb2ludChjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgaWYgKCFjb29yZGluYXRlcykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb29yZGluYXRlcyBpcyByZXF1aXJlZFwiKTtcbiAgICB9XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvb3JkaW5hdGVzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb29yZGluYXRlcyBtdXN0IGJlIGFuIEFycmF5XCIpO1xuICAgIH1cbiAgICBpZiAoY29vcmRpbmF0ZXMubGVuZ3RoIDwgMikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb29yZGluYXRlcyBtdXN0IGJlIGF0IGxlYXN0IDIgbnVtYmVycyBsb25nXCIpO1xuICAgIH1cbiAgICBpZiAoIWlzTnVtYmVyKGNvb3JkaW5hdGVzWzBdKSB8fCAhaXNOdW1iZXIoY29vcmRpbmF0ZXNbMV0pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkaW5hdGVzIG11c3QgY29udGFpbiBudW1iZXJzXCIpO1xuICAgIH1cbiAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogXCJQb2ludFwiLFxuICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZXMsXG4gICAgfTtcbiAgICByZXR1cm4gZmVhdHVyZShnZW9tLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBQb2ludH0ge0BsaW5rIEZlYXR1cmVDb2xsZWN0aW9ufSBmcm9tIGFuIEFycmF5IG9mIFBvaW50IGNvb3JkaW5hdGVzLlxuICpcbiAqIEBuYW1lIHBvaW50c1xuICogQHBhcmFtIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gY29vcmRpbmF0ZXMgYW4gYXJyYXkgb2YgUG9pbnRzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIFRyYW5zbGF0ZSB0aGVzZSBwcm9wZXJ0aWVzIHRvIGVhY2ggRmVhdHVyZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXVxuICogYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlQ29sbGVjdGlvblxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAcmV0dXJucyB7RmVhdHVyZUNvbGxlY3Rpb248UG9pbnQ+fSBQb2ludCBGZWF0dXJlXG4gKiBAZXhhbXBsZVxuICogdmFyIHBvaW50cyA9IHR1cmYucG9pbnRzKFtcbiAqICAgWy03NSwgMzldLFxuICogICBbLTgwLCA0NV0sXG4gKiAgIFstNzgsIDUwXVxuICogXSk7XG4gKlxuICogLy89cG9pbnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwb2ludHMoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbihjb29yZGluYXRlcy5tYXAoZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICByZXR1cm4gcG9pbnQoY29vcmRzLCBwcm9wZXJ0aWVzKTtcbiAgICB9KSwgb3B0aW9ucyk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgUG9seWdvbn0ge0BsaW5rIEZlYXR1cmV9IGZyb20gYW4gQXJyYXkgb2YgTGluZWFyUmluZ3MuXG4gKlxuICogQG5hbWUgcG9seWdvblxuICogQHBhcmFtIHtBcnJheTxBcnJheTxBcnJheTxudW1iZXI+Pj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIExpbmVhclJpbmdzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8UG9seWdvbj59IFBvbHlnb24gRmVhdHVyZVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2x5Z29uID0gdHVyZi5wb2x5Z29uKFtbWy01LCA1Ml0sIFstNCwgNTZdLCBbLTIsIDUxXSwgWy03LCA1NF0sIFstNSwgNTJdXV0sIHsgbmFtZTogJ3BvbHkxJyB9KTtcbiAqXG4gKiAvLz1wb2x5Z29uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwb2x5Z29uKGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICBmb3IgKHZhciBfaSA9IDAsIGNvb3JkaW5hdGVzXzEgPSBjb29yZGluYXRlczsgX2kgPCBjb29yZGluYXRlc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgcmluZyA9IGNvb3JkaW5hdGVzXzFbX2ldO1xuICAgICAgICBpZiAocmluZy5sZW5ndGggPCA0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFYWNoIExpbmVhclJpbmcgb2YgYSBQb2x5Z29uIG11c3QgaGF2ZSA0IG9yIG1vcmUgUG9zaXRpb25zLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJpbmdbcmluZy5sZW5ndGggLSAxXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgZmlyc3QgcG9pbnQgb2YgUG9seWdvbiBjb250YWlucyB0d28gbnVtYmVyc1xuICAgICAgICAgICAgaWYgKHJpbmdbcmluZy5sZW5ndGggLSAxXVtqXSAhPT0gcmluZ1swXVtqXSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZpcnN0IGFuZCBsYXN0IFBvc2l0aW9uIGFyZSBub3QgZXF1aXZhbGVudC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGdlb20gPSB7XG4gICAgICAgIHR5cGU6IFwiUG9seWdvblwiLFxuICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZXMsXG4gICAgfTtcbiAgICByZXR1cm4gZmVhdHVyZShnZW9tLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBQb2x5Z29ufSB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259IGZyb20gYW4gQXJyYXkgb2YgUG9seWdvbiBjb29yZGluYXRlcy5cbiAqXG4gKiBAbmFtZSBwb2x5Z29uc1xuICogQHBhcmFtIHtBcnJheTxBcnJheTxBcnJheTxBcnJheTxudW1iZXI+Pj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBQb2x5Z29uIGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbjxQb2x5Z29uPn0gUG9seWdvbiBGZWF0dXJlQ29sbGVjdGlvblxuICogQGV4YW1wbGVcbiAqIHZhciBwb2x5Z29ucyA9IHR1cmYucG9seWdvbnMoW1xuICogICBbW1stNSwgNTJdLCBbLTQsIDU2XSwgWy0yLCA1MV0sIFstNywgNTRdLCBbLTUsIDUyXV1dLFxuICogICBbW1stMTUsIDQyXSwgWy0xNCwgNDZdLCBbLTEyLCA0MV0sIFstMTcsIDQ0XSwgWy0xNSwgNDJdXV0sXG4gKiBdKTtcbiAqXG4gKiAvLz1wb2x5Z29uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcG9seWdvbnMoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbihjb29yZGluYXRlcy5tYXAoZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICByZXR1cm4gcG9seWdvbihjb29yZHMsIHByb3BlcnRpZXMpO1xuICAgIH0pLCBvcHRpb25zKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBMaW5lU3RyaW5nfSB7QGxpbmsgRmVhdHVyZX0gZnJvbSBhbiBBcnJheSBvZiBQb3NpdGlvbnMuXG4gKlxuICogQG5hbWUgbGluZVN0cmluZ1xuICogQHBhcmFtIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gY29vcmRpbmF0ZXMgYW4gYXJyYXkgb2YgUG9zaXRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8TGluZVN0cmluZz59IExpbmVTdHJpbmcgRmVhdHVyZVxuICogQGV4YW1wbGVcbiAqIHZhciBsaW5lc3RyaW5nMSA9IHR1cmYubGluZVN0cmluZyhbWy0yNCwgNjNdLCBbLTIzLCA2MF0sIFstMjUsIDY1XSwgWy0yMCwgNjldXSwge25hbWU6ICdsaW5lIDEnfSk7XG4gKiB2YXIgbGluZXN0cmluZzIgPSB0dXJmLmxpbmVTdHJpbmcoW1stMTQsIDQzXSwgWy0xMywgNDBdLCBbLTE1LCA0NV0sIFstMTAsIDQ5XV0sIHtuYW1lOiAnbGluZSAyJ30pO1xuICpcbiAqIC8vPWxpbmVzdHJpbmcxXG4gKiAvLz1saW5lc3RyaW5nMlxuICovXG5leHBvcnQgZnVuY3Rpb24gbGluZVN0cmluZyhjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29vcmRpbmF0ZXMgbXVzdCBiZSBhbiBhcnJheSBvZiB0d28gb3IgbW9yZSBwb3NpdGlvbnNcIik7XG4gICAgfVxuICAgIHZhciBnZW9tID0ge1xuICAgICAgICB0eXBlOiBcIkxpbmVTdHJpbmdcIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzLFxuICAgIH07XG4gICAgcmV0dXJuIGZlYXR1cmUoZ2VvbSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgTGluZVN0cmluZ30ge0BsaW5rIEZlYXR1cmVDb2xsZWN0aW9ufSBmcm9tIGFuIEFycmF5IG9mIExpbmVTdHJpbmcgY29vcmRpbmF0ZXMuXG4gKlxuICogQG5hbWUgbGluZVN0cmluZ3NcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8QXJyYXk8bnVtYmVyPj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBMaW5lYXJSaW5nc1xuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdXG4gKiBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbjxMaW5lU3RyaW5nPn0gTGluZVN0cmluZyBGZWF0dXJlQ29sbGVjdGlvblxuICogQGV4YW1wbGVcbiAqIHZhciBsaW5lc3RyaW5ncyA9IHR1cmYubGluZVN0cmluZ3MoW1xuICogICBbWy0yNCwgNjNdLCBbLTIzLCA2MF0sIFstMjUsIDY1XSwgWy0yMCwgNjldXSxcbiAqICAgW1stMTQsIDQzXSwgWy0xMywgNDBdLCBbLTE1LCA0NV0sIFstMTAsIDQ5XV1cbiAqIF0pO1xuICpcbiAqIC8vPWxpbmVzdHJpbmdzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaW5lU3RyaW5ncyhjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKGNvb3JkaW5hdGVzLm1hcChmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgICAgIHJldHVybiBsaW5lU3RyaW5nKGNvb3JkcywgcHJvcGVydGllcyk7XG4gICAgfSksIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBUYWtlcyBvbmUgb3IgbW9yZSB7QGxpbmsgRmVhdHVyZXxGZWF0dXJlc30gYW5kIGNyZWF0ZXMgYSB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259LlxuICpcbiAqIEBuYW1lIGZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0ZlYXR1cmVbXX0gZmVhdHVyZXMgaW5wdXQgZmVhdHVyZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmVDb2xsZWN0aW9ufSBGZWF0dXJlQ29sbGVjdGlvbiBvZiBGZWF0dXJlc1xuICogQGV4YW1wbGVcbiAqIHZhciBsb2NhdGlvbkEgPSB0dXJmLnBvaW50KFstNzUuMzQzLCAzOS45ODRdLCB7bmFtZTogJ0xvY2F0aW9uIEEnfSk7XG4gKiB2YXIgbG9jYXRpb25CID0gdHVyZi5wb2ludChbLTc1LjgzMywgMzkuMjg0XSwge25hbWU6ICdMb2NhdGlvbiBCJ30pO1xuICogdmFyIGxvY2F0aW9uQyA9IHR1cmYucG9pbnQoWy03NS41MzQsIDM5LjEyM10sIHtuYW1lOiAnTG9jYXRpb24gQyd9KTtcbiAqXG4gKiB2YXIgY29sbGVjdGlvbiA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICBsb2NhdGlvbkEsXG4gKiAgIGxvY2F0aW9uQixcbiAqICAgbG9jYXRpb25DXG4gKiBdKTtcbiAqXG4gKiAvLz1jb2xsZWN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlQ29sbGVjdGlvbihmZWF0dXJlcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIGZjID0geyB0eXBlOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIgfTtcbiAgICBpZiAob3B0aW9ucy5pZCkge1xuICAgICAgICBmYy5pZCA9IG9wdGlvbnMuaWQ7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmJib3gpIHtcbiAgICAgICAgZmMuYmJveCA9IG9wdGlvbnMuYmJveDtcbiAgICB9XG4gICAgZmMuZmVhdHVyZXMgPSBmZWF0dXJlcztcbiAgICByZXR1cm4gZmM7XG59XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgRmVhdHVyZTxNdWx0aUxpbmVTdHJpbmc+fSBiYXNlZCBvbiBhXG4gKiBjb29yZGluYXRlIGFycmF5LiBQcm9wZXJ0aWVzIGNhbiBiZSBhZGRlZCBvcHRpb25hbGx5LlxuICpcbiAqIEBuYW1lIG11bHRpTGluZVN0cmluZ1xuICogQHBhcmFtIHtBcnJheTxBcnJheTxBcnJheTxudW1iZXI+Pj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIExpbmVTdHJpbmdzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8TXVsdGlMaW5lU3RyaW5nPn0gYSBNdWx0aUxpbmVTdHJpbmcgZmVhdHVyZVxuICogQHRocm93cyB7RXJyb3J9IGlmIG5vIGNvb3JkaW5hdGVzIGFyZSBwYXNzZWRcbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlMaW5lID0gdHVyZi5tdWx0aUxpbmVTdHJpbmcoW1tbMCwwXSxbMTAsMTBdXV0pO1xuICpcbiAqIC8vPW11bHRpTGluZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlMaW5lU3RyaW5nKGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogXCJNdWx0aUxpbmVTdHJpbmdcIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzLFxuICAgIH07XG4gICAgcmV0dXJuIGZlYXR1cmUoZ2VvbSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgRmVhdHVyZTxNdWx0aVBvaW50Pn0gYmFzZWQgb24gYVxuICogY29vcmRpbmF0ZSBhcnJheS4gUHJvcGVydGllcyBjYW4gYmUgYWRkZWQgb3B0aW9uYWxseS5cbiAqXG4gKiBAbmFtZSBtdWx0aVBvaW50XG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBQb3NpdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxNdWx0aVBvaW50Pn0gYSBNdWx0aVBvaW50IGZlYXR1cmVcbiAqIEB0aHJvd3Mge0Vycm9yfSBpZiBubyBjb29yZGluYXRlcyBhcmUgcGFzc2VkXG4gKiBAZXhhbXBsZVxuICogdmFyIG11bHRpUHQgPSB0dXJmLm11bHRpUG9pbnQoW1swLDBdLFsxMCwxMF1dKTtcbiAqXG4gKiAvLz1tdWx0aVB0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aVBvaW50KGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogXCJNdWx0aVBvaW50XCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIEZlYXR1cmU8TXVsdGlQb2x5Z29uPn0gYmFzZWQgb24gYVxuICogY29vcmRpbmF0ZSBhcnJheS4gUHJvcGVydGllcyBjYW4gYmUgYWRkZWQgb3B0aW9uYWxseS5cbiAqXG4gKiBAbmFtZSBtdWx0aVBvbHlnb25cbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8QXJyYXk8QXJyYXk8bnVtYmVyPj4+Pn0gY29vcmRpbmF0ZXMgYW4gYXJyYXkgb2YgUG9seWdvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxNdWx0aVBvbHlnb24+fSBhIG11bHRpcG9seWdvbiBmZWF0dXJlXG4gKiBAdGhyb3dzIHtFcnJvcn0gaWYgbm8gY29vcmRpbmF0ZXMgYXJlIHBhc3NlZFxuICogQGV4YW1wbGVcbiAqIHZhciBtdWx0aVBvbHkgPSB0dXJmLm11bHRpUG9seWdvbihbW1tbMCwwXSxbMCwxMF0sWzEwLDEwXSxbMTAsMF0sWzAsMF1dXV0pO1xuICpcbiAqIC8vPW11bHRpUG9seVxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG11bHRpUG9seWdvbihjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIGdlb20gPSB7XG4gICAgICAgIHR5cGU6IFwiTXVsdGlQb2x5Z29uXCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIEZlYXR1cmU8R2VvbWV0cnlDb2xsZWN0aW9uPn0gYmFzZWQgb24gYVxuICogY29vcmRpbmF0ZSBhcnJheS4gUHJvcGVydGllcyBjYW4gYmUgYWRkZWQgb3B0aW9uYWxseS5cbiAqXG4gKiBAbmFtZSBnZW9tZXRyeUNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXk8R2VvbWV0cnk+fSBnZW9tZXRyaWVzIGFuIGFycmF5IG9mIEdlb0pTT04gR2VvbWV0cmllc1xuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlPEdlb21ldHJ5Q29sbGVjdGlvbj59IGEgR2VvSlNPTiBHZW9tZXRyeUNvbGxlY3Rpb24gRmVhdHVyZVxuICogQGV4YW1wbGVcbiAqIHZhciBwdCA9IHR1cmYuZ2VvbWV0cnkoXCJQb2ludFwiLCBbMTAwLCAwXSk7XG4gKiB2YXIgbGluZSA9IHR1cmYuZ2VvbWV0cnkoXCJMaW5lU3RyaW5nXCIsIFtbMTAxLCAwXSwgWzEwMiwgMV1dKTtcbiAqIHZhciBjb2xsZWN0aW9uID0gdHVyZi5nZW9tZXRyeUNvbGxlY3Rpb24oW3B0LCBsaW5lXSk7XG4gKlxuICogLy8gPT4gY29sbGVjdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VvbWV0cnlDb2xsZWN0aW9uKGdlb21ldHJpZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBnZW9tID0ge1xuICAgICAgICB0eXBlOiBcIkdlb21ldHJ5Q29sbGVjdGlvblwiLFxuICAgICAgICBnZW9tZXRyaWVzOiBnZW9tZXRyaWVzLFxuICAgIH07XG4gICAgcmV0dXJuIGZlYXR1cmUoZ2VvbSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG4vKipcbiAqIFJvdW5kIG51bWJlciB0byBwcmVjaXNpb25cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIE51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IFtwcmVjaXNpb249MF0gUHJlY2lzaW9uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSByb3VuZGVkIG51bWJlclxuICogQGV4YW1wbGVcbiAqIHR1cmYucm91bmQoMTIwLjQzMjEpXG4gKiAvLz0xMjBcbiAqXG4gKiB0dXJmLnJvdW5kKDEyMC40MzIxLCAyKVxuICogLy89MTIwLjQzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3VuZChudW0sIHByZWNpc2lvbikge1xuICAgIGlmIChwcmVjaXNpb24gPT09IHZvaWQgMCkgeyBwcmVjaXNpb24gPSAwOyB9XG4gICAgaWYgKHByZWNpc2lvbiAmJiAhKHByZWNpc2lvbiA+PSAwKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwcmVjaXNpb24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlclwiKTtcbiAgICB9XG4gICAgdmFyIG11bHRpcGxpZXIgPSBNYXRoLnBvdygxMCwgcHJlY2lzaW9uIHx8IDApO1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG51bSAqIG11bHRpcGxpZXIpIC8gbXVsdGlwbGllcjtcbn1cbi8qKlxuICogQ29udmVydCBhIGRpc3RhbmNlIG1lYXN1cmVtZW50IChhc3N1bWluZyBhIHNwaGVyaWNhbCBFYXJ0aCkgZnJvbSByYWRpYW5zIHRvIGEgbW9yZSBmcmllbmRseSB1bml0LlxuICogVmFsaWQgdW5pdHM6IG1pbGVzLCBuYXV0aWNhbG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRlcnMsIG1ldHJlcywga2lsb21ldGVycywgY2VudGltZXRlcnMsIGZlZXRcbiAqXG4gKiBAbmFtZSByYWRpYW5zVG9MZW5ndGhcbiAqIEBwYXJhbSB7bnVtYmVyfSByYWRpYW5zIGluIHJhZGlhbnMgYWNyb3NzIHRoZSBzcGhlcmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdW5pdHM9XCJraWxvbWV0ZXJzXCJdIGNhbiBiZSBkZWdyZWVzLCByYWRpYW5zLCBtaWxlcywgaW5jaGVzLCB5YXJkcywgbWV0cmVzLFxuICogbWV0ZXJzLCBraWxvbWV0cmVzLCBraWxvbWV0ZXJzLlxuICogQHJldHVybnMge251bWJlcn0gZGlzdGFuY2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhZGlhbnNUb0xlbmd0aChyYWRpYW5zLCB1bml0cykge1xuICAgIGlmICh1bml0cyA9PT0gdm9pZCAwKSB7IHVuaXRzID0gXCJraWxvbWV0ZXJzXCI7IH1cbiAgICB2YXIgZmFjdG9yID0gZmFjdG9yc1t1bml0c107XG4gICAgaWYgKCFmYWN0b3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHVuaXRzICsgXCIgdW5pdHMgaXMgaW52YWxpZFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJhZGlhbnMgKiBmYWN0b3I7XG59XG4vKipcbiAqIENvbnZlcnQgYSBkaXN0YW5jZSBtZWFzdXJlbWVudCAoYXNzdW1pbmcgYSBzcGhlcmljYWwgRWFydGgpIGZyb20gYSByZWFsLXdvcmxkIHVuaXQgaW50byByYWRpYW5zXG4gKiBWYWxpZCB1bml0czogbWlsZXMsIG5hdXRpY2FsbWlsZXMsIGluY2hlcywgeWFyZHMsIG1ldGVycywgbWV0cmVzLCBraWxvbWV0ZXJzLCBjZW50aW1ldGVycywgZmVldFxuICpcbiAqIEBuYW1lIGxlbmd0aFRvUmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGRpc3RhbmNlIGluIHJlYWwgdW5pdHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdW5pdHM9XCJraWxvbWV0ZXJzXCJdIGNhbiBiZSBkZWdyZWVzLCByYWRpYW5zLCBtaWxlcywgaW5jaGVzLCB5YXJkcywgbWV0cmVzLFxuICogbWV0ZXJzLCBraWxvbWV0cmVzLCBraWxvbWV0ZXJzLlxuICogQHJldHVybnMge251bWJlcn0gcmFkaWFuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGVuZ3RoVG9SYWRpYW5zKGRpc3RhbmNlLCB1bml0cykge1xuICAgIGlmICh1bml0cyA9PT0gdm9pZCAwKSB7IHVuaXRzID0gXCJraWxvbWV0ZXJzXCI7IH1cbiAgICB2YXIgZmFjdG9yID0gZmFjdG9yc1t1bml0c107XG4gICAgaWYgKCFmYWN0b3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHVuaXRzICsgXCIgdW5pdHMgaXMgaW52YWxpZFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGRpc3RhbmNlIC8gZmFjdG9yO1xufVxuLyoqXG4gKiBDb252ZXJ0IGEgZGlzdGFuY2UgbWVhc3VyZW1lbnQgKGFzc3VtaW5nIGEgc3BoZXJpY2FsIEVhcnRoKSBmcm9tIGEgcmVhbC13b3JsZCB1bml0IGludG8gZGVncmVlc1xuICogVmFsaWQgdW5pdHM6IG1pbGVzLCBuYXV0aWNhbG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRlcnMsIG1ldHJlcywgY2VudGltZXRlcnMsIGtpbG9tZXRyZXMsIGZlZXRcbiAqXG4gKiBAbmFtZSBsZW5ndGhUb0RlZ3JlZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSBkaXN0YW5jZSBpbiByZWFsIHVuaXRzXG4gKiBAcGFyYW0ge3N0cmluZ30gW3VuaXRzPVwia2lsb21ldGVyc1wiXSBjYW4gYmUgZGVncmVlcywgcmFkaWFucywgbWlsZXMsIGluY2hlcywgeWFyZHMsIG1ldHJlcyxcbiAqIG1ldGVycywga2lsb21ldHJlcywga2lsb21ldGVycy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IGRlZ3JlZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxlbmd0aFRvRGVncmVlcyhkaXN0YW5jZSwgdW5pdHMpIHtcbiAgICByZXR1cm4gcmFkaWFuc1RvRGVncmVlcyhsZW5ndGhUb1JhZGlhbnMoZGlzdGFuY2UsIHVuaXRzKSk7XG59XG4vKipcbiAqIENvbnZlcnRzIGFueSBiZWFyaW5nIGFuZ2xlIGZyb20gdGhlIG5vcnRoIGxpbmUgZGlyZWN0aW9uIChwb3NpdGl2ZSBjbG9ja3dpc2UpXG4gKiBhbmQgcmV0dXJucyBhbiBhbmdsZSBiZXR3ZWVuIDAtMzYwIGRlZ3JlZXMgKHBvc2l0aXZlIGNsb2Nrd2lzZSksIDAgYmVpbmcgdGhlIG5vcnRoIGxpbmVcbiAqXG4gKiBAbmFtZSBiZWFyaW5nVG9BemltdXRoXG4gKiBAcGFyYW0ge251bWJlcn0gYmVhcmluZyBhbmdsZSwgYmV0d2VlbiAtMTgwIGFuZCArMTgwIGRlZ3JlZXNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IGFuZ2xlIGJldHdlZW4gMCBhbmQgMzYwIGRlZ3JlZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJlYXJpbmdUb0F6aW11dGgoYmVhcmluZykge1xuICAgIHZhciBhbmdsZSA9IGJlYXJpbmcgJSAzNjA7XG4gICAgaWYgKGFuZ2xlIDwgMCkge1xuICAgICAgICBhbmdsZSArPSAzNjA7XG4gICAgfVxuICAgIHJldHVybiBhbmdsZTtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gYW5nbGUgaW4gcmFkaWFucyB0byBkZWdyZWVzXG4gKlxuICogQG5hbWUgcmFkaWFuc1RvRGVncmVlc1xuICogQHBhcmFtIHtudW1iZXJ9IHJhZGlhbnMgYW5nbGUgaW4gcmFkaWFuc1xuICogQHJldHVybnMge251bWJlcn0gZGVncmVlcyBiZXR3ZWVuIDAgYW5kIDM2MCBkZWdyZWVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYWRpYW5zVG9EZWdyZWVzKHJhZGlhbnMpIHtcbiAgICB2YXIgZGVncmVlcyA9IHJhZGlhbnMgJSAoMiAqIE1hdGguUEkpO1xuICAgIHJldHVybiAoZGVncmVlcyAqIDE4MCkgLyBNYXRoLlBJO1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbiBhbmdsZSBpbiBkZWdyZWVzIHRvIHJhZGlhbnNcbiAqXG4gKiBAbmFtZSBkZWdyZWVzVG9SYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gZGVncmVlcyBhbmdsZSBiZXR3ZWVuIDAgYW5kIDM2MCBkZWdyZWVzXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBhbmdsZSBpbiByYWRpYW5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWdyZWVzVG9SYWRpYW5zKGRlZ3JlZXMpIHtcbiAgICB2YXIgcmFkaWFucyA9IGRlZ3JlZXMgJSAzNjA7XG4gICAgcmV0dXJuIChyYWRpYW5zICogTWF0aC5QSSkgLyAxODA7XG59XG4vKipcbiAqIENvbnZlcnRzIGEgbGVuZ3RoIHRvIHRoZSByZXF1ZXN0ZWQgdW5pdC5cbiAqIFZhbGlkIHVuaXRzOiBtaWxlcywgbmF1dGljYWxtaWxlcywgaW5jaGVzLCB5YXJkcywgbWV0ZXJzLCBtZXRyZXMsIGtpbG9tZXRlcnMsIGNlbnRpbWV0ZXJzLCBmZWV0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCB0byBiZSBjb252ZXJ0ZWRcbiAqIEBwYXJhbSB7VW5pdHN9IFtvcmlnaW5hbFVuaXQ9XCJraWxvbWV0ZXJzXCJdIG9mIHRoZSBsZW5ndGhcbiAqIEBwYXJhbSB7VW5pdHN9IFtmaW5hbFVuaXQ9XCJraWxvbWV0ZXJzXCJdIHJldHVybmVkIHVuaXRcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBjb252ZXJ0ZWQgbGVuZ3RoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0TGVuZ3RoKGxlbmd0aCwgb3JpZ2luYWxVbml0LCBmaW5hbFVuaXQpIHtcbiAgICBpZiAob3JpZ2luYWxVbml0ID09PSB2b2lkIDApIHsgb3JpZ2luYWxVbml0ID0gXCJraWxvbWV0ZXJzXCI7IH1cbiAgICBpZiAoZmluYWxVbml0ID09PSB2b2lkIDApIHsgZmluYWxVbml0ID0gXCJraWxvbWV0ZXJzXCI7IH1cbiAgICBpZiAoIShsZW5ndGggPj0gMCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibGVuZ3RoIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXJcIik7XG4gICAgfVxuICAgIHJldHVybiByYWRpYW5zVG9MZW5ndGgobGVuZ3RoVG9SYWRpYW5zKGxlbmd0aCwgb3JpZ2luYWxVbml0KSwgZmluYWxVbml0KTtcbn1cbi8qKlxuICogQ29udmVydHMgYSBhcmVhIHRvIHRoZSByZXF1ZXN0ZWQgdW5pdC5cbiAqIFZhbGlkIHVuaXRzOiBraWxvbWV0ZXJzLCBraWxvbWV0cmVzLCBtZXRlcnMsIG1ldHJlcywgY2VudGltZXRyZXMsIG1pbGxpbWV0ZXJzLCBhY3JlcywgbWlsZXMsIHlhcmRzLCBmZWV0LCBpbmNoZXMsIGhlY3RhcmVzXG4gKiBAcGFyYW0ge251bWJlcn0gYXJlYSB0byBiZSBjb252ZXJ0ZWRcbiAqIEBwYXJhbSB7VW5pdHN9IFtvcmlnaW5hbFVuaXQ9XCJtZXRlcnNcIl0gb2YgdGhlIGRpc3RhbmNlXG4gKiBAcGFyYW0ge1VuaXRzfSBbZmluYWxVbml0PVwia2lsb21ldGVyc1wiXSByZXR1cm5lZCB1bml0XG4gKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgY29udmVydGVkIGFyZWFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRBcmVhKGFyZWEsIG9yaWdpbmFsVW5pdCwgZmluYWxVbml0KSB7XG4gICAgaWYgKG9yaWdpbmFsVW5pdCA9PT0gdm9pZCAwKSB7IG9yaWdpbmFsVW5pdCA9IFwibWV0ZXJzXCI7IH1cbiAgICBpZiAoZmluYWxVbml0ID09PSB2b2lkIDApIHsgZmluYWxVbml0ID0gXCJraWxvbWV0ZXJzXCI7IH1cbiAgICBpZiAoIShhcmVhID49IDApKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImFyZWEgbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlclwiKTtcbiAgICB9XG4gICAgdmFyIHN0YXJ0RmFjdG9yID0gYXJlYUZhY3RvcnNbb3JpZ2luYWxVbml0XTtcbiAgICBpZiAoIXN0YXJ0RmFjdG9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgb3JpZ2luYWwgdW5pdHNcIik7XG4gICAgfVxuICAgIHZhciBmaW5hbEZhY3RvciA9IGFyZWFGYWN0b3JzW2ZpbmFsVW5pdF07XG4gICAgaWYgKCFmaW5hbEZhY3Rvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGZpbmFsIHVuaXRzXCIpO1xuICAgIH1cbiAgICByZXR1cm4gKGFyZWEgLyBzdGFydEZhY3RvcikgKiBmaW5hbEZhY3Rvcjtcbn1cbi8qKlxuICogaXNOdW1iZXJcbiAqXG4gKiBAcGFyYW0geyp9IG51bSBOdW1iZXIgdG8gdmFsaWRhdGVcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlL2ZhbHNlXG4gKiBAZXhhbXBsZVxuICogdHVyZi5pc051bWJlcigxMjMpXG4gKiAvLz10cnVlXG4gKiB0dXJmLmlzTnVtYmVyKCdmb28nKVxuICogLy89ZmFsc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKG51bSkge1xuICAgIHJldHVybiAhaXNOYU4obnVtKSAmJiBudW0gIT09IG51bGwgJiYgIUFycmF5LmlzQXJyYXkobnVtKTtcbn1cbi8qKlxuICogaXNPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IGlucHV0IHZhcmlhYmxlIHRvIHZhbGlkYXRlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZS9mYWxzZVxuICogQGV4YW1wbGVcbiAqIHR1cmYuaXNPYmplY3Qoe2VsZXZhdGlvbjogMTB9KVxuICogLy89dHJ1ZVxuICogdHVyZi5pc09iamVjdCgnZm9vJylcbiAqIC8vPWZhbHNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdChpbnB1dCkge1xuICAgIHJldHVybiAhIWlucHV0ICYmIGlucHV0LmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG59XG4vKipcbiAqIFZhbGlkYXRlIEJCb3hcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBiYm94IEJCb3ggdG8gdmFsaWRhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQHRocm93cyBFcnJvciBpZiBCQm94IGlzIG5vdCB2YWxpZFxuICogQGV4YW1wbGVcbiAqIHZhbGlkYXRlQkJveChbLTE4MCwgLTQwLCAxMTAsIDUwXSlcbiAqIC8vPU9LXG4gKiB2YWxpZGF0ZUJCb3goWy0xODAsIC00MF0pXG4gKiAvLz1FcnJvclxuICogdmFsaWRhdGVCQm94KCdGb28nKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlQkJveCg1KVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlQkJveChudWxsKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlQkJveCh1bmRlZmluZWQpXG4gKiAvLz1FcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVCQm94KGJib3gpIHtcbiAgICBpZiAoIWJib3gpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYmJveCBpcyByZXF1aXJlZFwiKTtcbiAgICB9XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJib3gpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImJib3ggbXVzdCBiZSBhbiBBcnJheVwiKTtcbiAgICB9XG4gICAgaWYgKGJib3gubGVuZ3RoICE9PSA0ICYmIGJib3gubGVuZ3RoICE9PSA2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImJib3ggbXVzdCBiZSBhbiBBcnJheSBvZiA0IG9yIDYgbnVtYmVyc1wiKTtcbiAgICB9XG4gICAgYmJveC5mb3JFYWNoKGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgaWYgKCFpc051bWJlcihudW0pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJiYm94IG11c3Qgb25seSBjb250YWluIG51bWJlcnNcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8qKlxuICogVmFsaWRhdGUgSWRcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBpZCBJZCB0byB2YWxpZGF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAdGhyb3dzIEVycm9yIGlmIElkIGlzIG5vdCB2YWxpZFxuICogQGV4YW1wbGVcbiAqIHZhbGlkYXRlSWQoWy0xODAsIC00MCwgMTEwLCA1MF0pXG4gKiAvLz1FcnJvclxuICogdmFsaWRhdGVJZChbLTE4MCwgLTQwXSlcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUlkKCdGb28nKVxuICogLy89T0tcbiAqIHZhbGlkYXRlSWQoNSlcbiAqIC8vPU9LXG4gKiB2YWxpZGF0ZUlkKG51bGwpXG4gKiAvLz1FcnJvclxuICogdmFsaWRhdGVJZCh1bmRlZmluZWQpXG4gKiAvLz1FcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVJZChpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWQgaXMgcmVxdWlyZWRcIik7XG4gICAgfVxuICAgIGlmIChbXCJzdHJpbmdcIiwgXCJudW1iZXJcIl0uaW5kZXhPZih0eXBlb2YgaWQpID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpZCBtdXN0IGJlIGEgbnVtYmVyIG9yIGEgc3RyaW5nXCIpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGlzTnVtYmVyLCB9IGZyb20gXCJAdHVyZi9oZWxwZXJzXCI7XG4vKipcbiAqIFVud3JhcCBhIGNvb3JkaW5hdGUgZnJvbSBhIFBvaW50IEZlYXR1cmUsIEdlb21ldHJ5IG9yIGEgc2luZ2xlIGNvb3JkaW5hdGUuXG4gKlxuICogQG5hbWUgZ2V0Q29vcmRcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPnxHZW9tZXRyeTxQb2ludD58RmVhdHVyZTxQb2ludD59IGNvb3JkIEdlb0pTT04gUG9pbnQgb3IgYW4gQXJyYXkgb2YgbnVtYmVyc1xuICogQHJldHVybnMge0FycmF5PG51bWJlcj59IGNvb3JkaW5hdGVzXG4gKiBAZXhhbXBsZVxuICogdmFyIHB0ID0gdHVyZi5wb2ludChbMTAsIDEwXSk7XG4gKlxuICogdmFyIGNvb3JkID0gdHVyZi5nZXRDb29yZChwdCk7XG4gKiAvLz0gWzEwLCAxMF1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvb3JkKGNvb3JkKSB7XG4gICAgaWYgKCFjb29yZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb29yZCBpcyByZXF1aXJlZFwiKTtcbiAgICB9XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvb3JkKSkge1xuICAgICAgICBpZiAoY29vcmQudHlwZSA9PT0gXCJGZWF0dXJlXCIgJiZcbiAgICAgICAgICAgIGNvb3JkLmdlb21ldHJ5ICE9PSBudWxsICYmXG4gICAgICAgICAgICBjb29yZC5nZW9tZXRyeS50eXBlID09PSBcIlBvaW50XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBjb29yZC5nZW9tZXRyeS5jb29yZGluYXRlcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29vcmQudHlwZSA9PT0gXCJQb2ludFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gY29vcmQuY29vcmRpbmF0ZXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29vcmQpICYmXG4gICAgICAgIGNvb3JkLmxlbmd0aCA+PSAyICYmXG4gICAgICAgICFBcnJheS5pc0FycmF5KGNvb3JkWzBdKSAmJlxuICAgICAgICAhQXJyYXkuaXNBcnJheShjb29yZFsxXSkpIHtcbiAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb29yZCBtdXN0IGJlIEdlb0pTT04gUG9pbnQgb3IgYW4gQXJyYXkgb2YgbnVtYmVyc1wiKTtcbn1cbi8qKlxuICogVW53cmFwIGNvb3JkaW5hdGVzIGZyb20gYSBGZWF0dXJlLCBHZW9tZXRyeSBPYmplY3Qgb3IgYW4gQXJyYXlcbiAqXG4gKiBAbmFtZSBnZXRDb29yZHNcbiAqIEBwYXJhbSB7QXJyYXk8YW55PnxHZW9tZXRyeXxGZWF0dXJlfSBjb29yZHMgRmVhdHVyZSwgR2VvbWV0cnkgT2JqZWN0IG9yIGFuIEFycmF5XG4gKiBAcmV0dXJucyB7QXJyYXk8YW55Pn0gY29vcmRpbmF0ZXNcbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9seSA9IHR1cmYucG9seWdvbihbW1sxMTkuMzIsIC04LjddLCBbMTE5LjU1LCAtOC42OV0sIFsxMTkuNTEsIC04LjU0XSwgWzExOS4zMiwgLTguN11dXSk7XG4gKlxuICogdmFyIGNvb3JkcyA9IHR1cmYuZ2V0Q29vcmRzKHBvbHkpO1xuICogLy89IFtbWzExOS4zMiwgLTguN10sIFsxMTkuNTUsIC04LjY5XSwgWzExOS41MSwgLTguNTRdLCBbMTE5LjMyLCAtOC43XV1dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29yZHMoY29vcmRzKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29vcmRzKSkge1xuICAgICAgICByZXR1cm4gY29vcmRzO1xuICAgIH1cbiAgICAvLyBGZWF0dXJlXG4gICAgaWYgKGNvb3Jkcy50eXBlID09PSBcIkZlYXR1cmVcIikge1xuICAgICAgICBpZiAoY29vcmRzLmdlb21ldHJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gY29vcmRzLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBHZW9tZXRyeVxuICAgICAgICBpZiAoY29vcmRzLmNvb3JkaW5hdGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gY29vcmRzLmNvb3JkaW5hdGVzO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkcyBtdXN0IGJlIEdlb0pTT04gRmVhdHVyZSwgR2VvbWV0cnkgT2JqZWN0IG9yIGFuIEFycmF5XCIpO1xufVxuLyoqXG4gKiBDaGVja3MgaWYgY29vcmRpbmF0ZXMgY29udGFpbnMgYSBudW1iZXJcbiAqXG4gKiBAbmFtZSBjb250YWluc051bWJlclxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBjb29yZGluYXRlcyBHZW9KU09OIENvb3JkaW5hdGVzXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiBBcnJheSBjb250YWlucyBhIG51bWJlclxuICovXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnNOdW1iZXIoY29vcmRpbmF0ZXMpIHtcbiAgICBpZiAoY29vcmRpbmF0ZXMubGVuZ3RoID4gMSAmJlxuICAgICAgICBpc051bWJlcihjb29yZGluYXRlc1swXSkgJiZcbiAgICAgICAgaXNOdW1iZXIoY29vcmRpbmF0ZXNbMV0pKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb29yZGluYXRlc1swXSkgJiYgY29vcmRpbmF0ZXNbMF0ubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBjb250YWluc051bWJlcihjb29yZGluYXRlc1swXSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkaW5hdGVzIG11c3Qgb25seSBjb250YWluIG51bWJlcnNcIik7XG59XG4vKipcbiAqIEVuZm9yY2UgZXhwZWN0YXRpb25zIGFib3V0IHR5cGVzIG9mIEdlb0pTT04gb2JqZWN0cyBmb3IgVHVyZi5cbiAqXG4gKiBAbmFtZSBnZW9qc29uVHlwZVxuICogQHBhcmFtIHtHZW9KU09OfSB2YWx1ZSBhbnkgR2VvSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIGV4cGVjdGVkIEdlb0pTT04gdHlwZVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgbmFtZSBvZiBjYWxsaW5nIGZ1bmN0aW9uXG4gKiBAdGhyb3dzIHtFcnJvcn0gaWYgdmFsdWUgaXMgbm90IHRoZSBleHBlY3RlZCB0eXBlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VvanNvblR5cGUodmFsdWUsIHR5cGUsIG5hbWUpIHtcbiAgICBpZiAoIXR5cGUgfHwgIW5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHlwZSBhbmQgbmFtZSByZXF1aXJlZFwiKTtcbiAgICB9XG4gICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZS50eXBlICE9PSB0eXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW5wdXQgdG8gXCIgK1xuICAgICAgICAgICAgbmFtZSArXG4gICAgICAgICAgICBcIjogbXVzdCBiZSBhIFwiICtcbiAgICAgICAgICAgIHR5cGUgK1xuICAgICAgICAgICAgXCIsIGdpdmVuIFwiICtcbiAgICAgICAgICAgIHZhbHVlLnR5cGUpO1xuICAgIH1cbn1cbi8qKlxuICogRW5mb3JjZSBleHBlY3RhdGlvbnMgYWJvdXQgdHlwZXMgb2Yge0BsaW5rIEZlYXR1cmV9IGlucHV0cyBmb3IgVHVyZi5cbiAqIEludGVybmFsbHkgdGhpcyB1c2VzIHtAbGluayBnZW9qc29uVHlwZX0gdG8ganVkZ2UgZ2VvbWV0cnkgdHlwZXMuXG4gKlxuICogQG5hbWUgZmVhdHVyZU9mXG4gKiBAcGFyYW0ge0ZlYXR1cmV9IGZlYXR1cmUgYSBmZWF0dXJlIHdpdGggYW4gZXhwZWN0ZWQgZ2VvbWV0cnkgdHlwZVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgZXhwZWN0ZWQgR2VvSlNPTiB0eXBlXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBuYW1lIG9mIGNhbGxpbmcgZnVuY3Rpb25cbiAqIEB0aHJvd3Mge0Vycm9yfSBlcnJvciBpZiB2YWx1ZSBpcyBub3QgdGhlIGV4cGVjdGVkIHR5cGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlT2YoZmVhdHVyZSwgdHlwZSwgbmFtZSkge1xuICAgIGlmICghZmVhdHVyZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBmZWF0dXJlIHBhc3NlZFwiKTtcbiAgICB9XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIi5mZWF0dXJlT2YoKSByZXF1aXJlcyBhIG5hbWVcIik7XG4gICAgfVxuICAgIGlmICghZmVhdHVyZSB8fCBmZWF0dXJlLnR5cGUgIT09IFwiRmVhdHVyZVwiIHx8ICFmZWF0dXJlLmdlb21ldHJ5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW5wdXQgdG8gXCIgKyBuYW1lICsgXCIsIEZlYXR1cmUgd2l0aCBnZW9tZXRyeSByZXF1aXJlZFwiKTtcbiAgICB9XG4gICAgaWYgKCFmZWF0dXJlLmdlb21ldHJ5IHx8IGZlYXR1cmUuZ2VvbWV0cnkudHlwZSAhPT0gdHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGlucHV0IHRvIFwiICtcbiAgICAgICAgICAgIG5hbWUgK1xuICAgICAgICAgICAgXCI6IG11c3QgYmUgYSBcIiArXG4gICAgICAgICAgICB0eXBlICtcbiAgICAgICAgICAgIFwiLCBnaXZlbiBcIiArXG4gICAgICAgICAgICBmZWF0dXJlLmdlb21ldHJ5LnR5cGUpO1xuICAgIH1cbn1cbi8qKlxuICogRW5mb3JjZSBleHBlY3RhdGlvbnMgYWJvdXQgdHlwZXMgb2Yge0BsaW5rIEZlYXR1cmVDb2xsZWN0aW9ufSBpbnB1dHMgZm9yIFR1cmYuXG4gKiBJbnRlcm5hbGx5IHRoaXMgdXNlcyB7QGxpbmsgZ2VvanNvblR5cGV9IHRvIGp1ZGdlIGdlb21ldHJ5IHR5cGVzLlxuICpcbiAqIEBuYW1lIGNvbGxlY3Rpb25PZlxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbn0gZmVhdHVyZUNvbGxlY3Rpb24gYSBGZWF0dXJlQ29sbGVjdGlvbiBmb3Igd2hpY2ggZmVhdHVyZXMgd2lsbCBiZSBqdWRnZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIGV4cGVjdGVkIEdlb0pTT04gdHlwZVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgbmFtZSBvZiBjYWxsaW5nIGZ1bmN0aW9uXG4gKiBAdGhyb3dzIHtFcnJvcn0gaWYgdmFsdWUgaXMgbm90IHRoZSBleHBlY3RlZCB0eXBlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdGlvbk9mKGZlYXR1cmVDb2xsZWN0aW9uLCB0eXBlLCBuYW1lKSB7XG4gICAgaWYgKCFmZWF0dXJlQ29sbGVjdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBmZWF0dXJlQ29sbGVjdGlvbiBwYXNzZWRcIik7XG4gICAgfVxuICAgIGlmICghbmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCIuY29sbGVjdGlvbk9mKCkgcmVxdWlyZXMgYSBuYW1lXCIpO1xuICAgIH1cbiAgICBpZiAoIWZlYXR1cmVDb2xsZWN0aW9uIHx8IGZlYXR1cmVDb2xsZWN0aW9uLnR5cGUgIT09IFwiRmVhdHVyZUNvbGxlY3Rpb25cIikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGlucHV0IHRvIFwiICsgbmFtZSArIFwiLCBGZWF0dXJlQ29sbGVjdGlvbiByZXF1aXJlZFwiKTtcbiAgICB9XG4gICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgZmVhdHVyZSA9IF9hW19pXTtcbiAgICAgICAgaWYgKCFmZWF0dXJlIHx8IGZlYXR1cmUudHlwZSAhPT0gXCJGZWF0dXJlXCIgfHwgIWZlYXR1cmUuZ2VvbWV0cnkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW5wdXQgdG8gXCIgKyBuYW1lICsgXCIsIEZlYXR1cmUgd2l0aCBnZW9tZXRyeSByZXF1aXJlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZlYXR1cmUuZ2VvbWV0cnkgfHwgZmVhdHVyZS5nZW9tZXRyeS50eXBlICE9PSB0eXBlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGlucHV0IHRvIFwiICtcbiAgICAgICAgICAgICAgICBuYW1lICtcbiAgICAgICAgICAgICAgICBcIjogbXVzdCBiZSBhIFwiICtcbiAgICAgICAgICAgICAgICB0eXBlICtcbiAgICAgICAgICAgICAgICBcIiwgZ2l2ZW4gXCIgK1xuICAgICAgICAgICAgICAgIGZlYXR1cmUuZ2VvbWV0cnkudHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEdldCBHZW9tZXRyeSBmcm9tIEZlYXR1cmUgb3IgR2VvbWV0cnkgT2JqZWN0XG4gKlxuICogQHBhcmFtIHtGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIEdlb0pTT04gRmVhdHVyZSBvciBHZW9tZXRyeSBPYmplY3RcbiAqIEByZXR1cm5zIHtHZW9tZXRyeXxudWxsfSBHZW9KU09OIEdlb21ldHJ5IE9iamVjdFxuICogQHRocm93cyB7RXJyb3J9IGlmIGdlb2pzb24gaXMgbm90IGEgRmVhdHVyZSBvciBHZW9tZXRyeSBPYmplY3RcbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9pbnQgPSB7XG4gKiAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAqICAgXCJwcm9wZXJ0aWVzXCI6IHt9LFxuICogICBcImdlb21ldHJ5XCI6IHtcbiAqICAgICBcInR5cGVcIjogXCJQb2ludFwiLFxuICogICAgIFwiY29vcmRpbmF0ZXNcIjogWzExMCwgNDBdXG4gKiAgIH1cbiAqIH1cbiAqIHZhciBnZW9tID0gdHVyZi5nZXRHZW9tKHBvaW50KVxuICogLy89e1widHlwZVwiOiBcIlBvaW50XCIsIFwiY29vcmRpbmF0ZXNcIjogWzExMCwgNDBdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2VvbShnZW9qc29uKSB7XG4gICAgaWYgKGdlb2pzb24udHlwZSA9PT0gXCJGZWF0dXJlXCIpIHtcbiAgICAgICAgcmV0dXJuIGdlb2pzb24uZ2VvbWV0cnk7XG4gICAgfVxuICAgIHJldHVybiBnZW9qc29uO1xufVxuLyoqXG4gKiBHZXQgR2VvSlNPTiBvYmplY3QncyB0eXBlLCBHZW9tZXRyeSB0eXBlIGlzIHByaW9yaXRpemUuXG4gKlxuICogQHBhcmFtIHtHZW9KU09OfSBnZW9qc29uIEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gW25hbWU9XCJnZW9qc29uXCJdIG5hbWUgb2YgdGhlIHZhcmlhYmxlIHRvIGRpc3BsYXkgaW4gZXJyb3IgbWVzc2FnZSAodW51c2VkKVxuICogQHJldHVybnMge3N0cmluZ30gR2VvSlNPTiB0eXBlXG4gKiBAZXhhbXBsZVxuICogdmFyIHBvaW50ID0ge1xuICogICBcInR5cGVcIjogXCJGZWF0dXJlXCIsXG4gKiAgIFwicHJvcGVydGllc1wiOiB7fSxcbiAqICAgXCJnZW9tZXRyeVwiOiB7XG4gKiAgICAgXCJ0eXBlXCI6IFwiUG9pbnRcIixcbiAqICAgICBcImNvb3JkaW5hdGVzXCI6IFsxMTAsIDQwXVxuICogICB9XG4gKiB9XG4gKiB2YXIgZ2VvbSA9IHR1cmYuZ2V0VHlwZShwb2ludClcbiAqIC8vPVwiUG9pbnRcIlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHlwZShnZW9qc29uLCBfbmFtZSkge1xuICAgIGlmIChnZW9qc29uLnR5cGUgPT09IFwiRmVhdHVyZUNvbGxlY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gXCJGZWF0dXJlQ29sbGVjdGlvblwiO1xuICAgIH1cbiAgICBpZiAoZ2VvanNvbi50eXBlID09PSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBcIkdlb21ldHJ5Q29sbGVjdGlvblwiO1xuICAgIH1cbiAgICBpZiAoZ2VvanNvbi50eXBlID09PSBcIkZlYXR1cmVcIiAmJiBnZW9qc29uLmdlb21ldHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBnZW9qc29uLmdlb21ldHJ5LnR5cGU7XG4gICAgfVxuICAgIHJldHVybiBnZW9qc29uLnR5cGU7XG59XG4iLCJpbXBvcnQgeyBmZWF0dXJlLCBmZWF0dXJlQ29sbGVjdGlvbiwgcG9pbnQsIH0gZnJvbSBcIkB0dXJmL2hlbHBlcnNcIjtcbmltcG9ydCB7IGdldENvb3JkcyB9IGZyb20gXCJAdHVyZi9pbnZhcmlhbnRcIjtcbmltcG9ydCBsaW5lU2VnbWVudCBmcm9tIFwiQHR1cmYvbGluZS1zZWdtZW50XCI7XG5pbXBvcnQgeyBmZWF0dXJlRWFjaCB9IGZyb20gXCJAdHVyZi9tZXRhXCI7XG5pbXBvcnQgcmJ1c2ggZnJvbSBcImdlb2pzb24tcmJ1c2hcIjtcbi8qKlxuICogVGFrZXMgYW55IExpbmVTdHJpbmcgb3IgUG9seWdvbiBHZW9KU09OIGFuZCByZXR1cm5zIHRoZSBpbnRlcnNlY3RpbmcgcG9pbnQocykuXG4gKlxuICogQG5hbWUgbGluZUludGVyc2VjdFxuICogQHBhcmFtIHtHZW9KU09OfSBsaW5lMSBhbnkgTGluZVN0cmluZyBvciBQb2x5Z29uXG4gKiBAcGFyYW0ge0dlb0pTT059IGxpbmUyIGFueSBMaW5lU3RyaW5nIG9yIFBvbHlnb25cbiAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbjxQb2ludD59IHBvaW50KHMpIHRoYXQgaW50ZXJzZWN0IGJvdGhcbiAqIEBleGFtcGxlXG4gKiB2YXIgbGluZTEgPSB0dXJmLmxpbmVTdHJpbmcoW1sxMjYsIC0xMV0sIFsxMjksIC0yMV1dKTtcbiAqIHZhciBsaW5lMiA9IHR1cmYubGluZVN0cmluZyhbWzEyMywgLTE4XSwgWzEzMSwgLTE0XV0pO1xuICogdmFyIGludGVyc2VjdHMgPSB0dXJmLmxpbmVJbnRlcnNlY3QobGluZTEsIGxpbmUyKTtcbiAqXG4gKiAvL2FkZFRvTWFwXG4gKiB2YXIgYWRkVG9NYXAgPSBbbGluZTEsIGxpbmUyLCBpbnRlcnNlY3RzXVxuICovXG5mdW5jdGlvbiBsaW5lSW50ZXJzZWN0KGxpbmUxLCBsaW5lMikge1xuICAgIHZhciB1bmlxdWUgPSB7fTtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIC8vIEZpcnN0LCBub3JtYWxpemUgZ2VvbWV0cmllcyB0byBmZWF0dXJlc1xuICAgIC8vIFRoZW4sIGhhbmRsZSBzaW1wbGUgMi12ZXJ0ZXggc2VnbWVudHNcbiAgICBpZiAobGluZTEudHlwZSA9PT0gXCJMaW5lU3RyaW5nXCIpIHtcbiAgICAgICAgbGluZTEgPSBmZWF0dXJlKGxpbmUxKTtcbiAgICB9XG4gICAgaWYgKGxpbmUyLnR5cGUgPT09IFwiTGluZVN0cmluZ1wiKSB7XG4gICAgICAgIGxpbmUyID0gZmVhdHVyZShsaW5lMik7XG4gICAgfVxuICAgIGlmIChsaW5lMS50eXBlID09PSBcIkZlYXR1cmVcIiAmJlxuICAgICAgICBsaW5lMi50eXBlID09PSBcIkZlYXR1cmVcIiAmJlxuICAgICAgICBsaW5lMS5nZW9tZXRyeSAhPT0gbnVsbCAmJlxuICAgICAgICBsaW5lMi5nZW9tZXRyeSAhPT0gbnVsbCAmJlxuICAgICAgICBsaW5lMS5nZW9tZXRyeS50eXBlID09PSBcIkxpbmVTdHJpbmdcIiAmJlxuICAgICAgICBsaW5lMi5nZW9tZXRyeS50eXBlID09PSBcIkxpbmVTdHJpbmdcIiAmJlxuICAgICAgICBsaW5lMS5nZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGggPT09IDIgJiZcbiAgICAgICAgbGluZTIuZ2VvbWV0cnkuY29vcmRpbmF0ZXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHZhciBpbnRlcnNlY3QgPSBpbnRlcnNlY3RzKGxpbmUxLCBsaW5lMik7XG4gICAgICAgIGlmIChpbnRlcnNlY3QpIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChpbnRlcnNlY3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbihyZXN1bHRzKTtcbiAgICB9XG4gICAgLy8gSGFuZGxlcyBjb21wbGV4IEdlb0pTT04gR2VvbWV0cmllc1xuICAgIHZhciB0cmVlID0gcmJ1c2goKTtcbiAgICB0cmVlLmxvYWQobGluZVNlZ21lbnQobGluZTIpKTtcbiAgICBmZWF0dXJlRWFjaChsaW5lU2VnbWVudChsaW5lMSksIGZ1bmN0aW9uIChzZWdtZW50KSB7XG4gICAgICAgIGZlYXR1cmVFYWNoKHRyZWUuc2VhcmNoKHNlZ21lbnQpLCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpbnRlcnNlY3QgPSBpbnRlcnNlY3RzKHNlZ21lbnQsIG1hdGNoKTtcbiAgICAgICAgICAgIGlmIChpbnRlcnNlY3QpIHtcbiAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IGR1cGxpY2F0ZSBwb2ludHMgaHR0cHM6Ly9naXRodWIuY29tL1R1cmZqcy90dXJmL2lzc3Vlcy82ODhcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gZ2V0Q29vcmRzKGludGVyc2VjdCkuam9pbihcIixcIik7XG4gICAgICAgICAgICAgICAgaWYgKCF1bmlxdWVba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICB1bmlxdWVba2V5XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChpbnRlcnNlY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKHJlc3VsdHMpO1xufVxuLyoqXG4gKiBGaW5kIGEgcG9pbnQgdGhhdCBpbnRlcnNlY3RzIExpbmVTdHJpbmdzIHdpdGggdHdvIGNvb3JkaW5hdGVzIGVhY2hcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGZWF0dXJlPExpbmVTdHJpbmc+fSBsaW5lMSBHZW9KU09OIExpbmVTdHJpbmcgKE11c3Qgb25seSBjb250YWluIDIgY29vcmRpbmF0ZXMpXG4gKiBAcGFyYW0ge0ZlYXR1cmU8TGluZVN0cmluZz59IGxpbmUyIEdlb0pTT04gTGluZVN0cmluZyAoTXVzdCBvbmx5IGNvbnRhaW4gMiBjb29yZGluYXRlcylcbiAqIEByZXR1cm5zIHtGZWF0dXJlPFBvaW50Pn0gaW50ZXJzZWN0aW5nIEdlb0pTT04gUG9pbnRcbiAqL1xuZnVuY3Rpb24gaW50ZXJzZWN0cyhsaW5lMSwgbGluZTIpIHtcbiAgICB2YXIgY29vcmRzMSA9IGdldENvb3JkcyhsaW5lMSk7XG4gICAgdmFyIGNvb3JkczIgPSBnZXRDb29yZHMobGluZTIpO1xuICAgIGlmIChjb29yZHMxLmxlbmd0aCAhPT0gMikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCI8aW50ZXJzZWN0cz4gbGluZTEgbXVzdCBvbmx5IGNvbnRhaW4gMiBjb29yZGluYXRlc1wiKTtcbiAgICB9XG4gICAgaWYgKGNvb3JkczIubGVuZ3RoICE9PSAyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIjxpbnRlcnNlY3RzPiBsaW5lMiBtdXN0IG9ubHkgY29udGFpbiAyIGNvb3JkaW5hdGVzXCIpO1xuICAgIH1cbiAgICB2YXIgeDEgPSBjb29yZHMxWzBdWzBdO1xuICAgIHZhciB5MSA9IGNvb3JkczFbMF1bMV07XG4gICAgdmFyIHgyID0gY29vcmRzMVsxXVswXTtcbiAgICB2YXIgeTIgPSBjb29yZHMxWzFdWzFdO1xuICAgIHZhciB4MyA9IGNvb3JkczJbMF1bMF07XG4gICAgdmFyIHkzID0gY29vcmRzMlswXVsxXTtcbiAgICB2YXIgeDQgPSBjb29yZHMyWzFdWzBdO1xuICAgIHZhciB5NCA9IGNvb3JkczJbMV1bMV07XG4gICAgdmFyIGRlbm9tID0gKHk0IC0geTMpICogKHgyIC0geDEpIC0gKHg0IC0geDMpICogKHkyIC0geTEpO1xuICAgIHZhciBudW1lQSA9ICh4NCAtIHgzKSAqICh5MSAtIHkzKSAtICh5NCAtIHkzKSAqICh4MSAtIHgzKTtcbiAgICB2YXIgbnVtZUIgPSAoeDIgLSB4MSkgKiAoeTEgLSB5MykgLSAoeTIgLSB5MSkgKiAoeDEgLSB4Myk7XG4gICAgaWYgKGRlbm9tID09PSAwKSB7XG4gICAgICAgIGlmIChudW1lQSA9PT0gMCAmJiBudW1lQiA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciB1QSA9IG51bWVBIC8gZGVub207XG4gICAgdmFyIHVCID0gbnVtZUIgLyBkZW5vbTtcbiAgICBpZiAodUEgPj0gMCAmJiB1QSA8PSAxICYmIHVCID49IDAgJiYgdUIgPD0gMSkge1xuICAgICAgICB2YXIgeCA9IHgxICsgdUEgKiAoeDIgLSB4MSk7XG4gICAgICAgIHZhciB5ID0geTEgKyB1QSAqICh5MiAtIHkxKTtcbiAgICAgICAgcmV0dXJuIHBvaW50KFt4LCB5XSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZXhwb3J0IGRlZmF1bHQgbGluZUludGVyc2VjdDtcbiIsImltcG9ydCB7IGZlYXR1cmVDb2xsZWN0aW9uLCBsaW5lU3RyaW5nLCB9IGZyb20gXCJAdHVyZi9oZWxwZXJzXCI7XG5pbXBvcnQgeyBnZXRDb29yZHMgfSBmcm9tIFwiQHR1cmYvaW52YXJpYW50XCI7XG5pbXBvcnQgeyBmbGF0dGVuRWFjaCB9IGZyb20gXCJAdHVyZi9tZXRhXCI7XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259IG9mIDItdmVydGV4IHtAbGluayBMaW5lU3RyaW5nfSBzZWdtZW50cyBmcm9tIGFcbiAqIHtAbGluayBMaW5lU3RyaW5nfChNdWx0aSlMaW5lU3RyaW5nfSBvciB7QGxpbmsgUG9seWdvbnwoTXVsdGkpUG9seWdvbn0uXG4gKlxuICogQG5hbWUgbGluZVNlZ21lbnRcbiAqIEBwYXJhbSB7R2VvSlNPTn0gZ2VvanNvbiBHZW9KU09OIFBvbHlnb24gb3IgTGluZVN0cmluZ1xuICogQHJldHVybnMge0ZlYXR1cmVDb2xsZWN0aW9uPExpbmVTdHJpbmc+fSAyLXZlcnRleCBsaW5lIHNlZ21lbnRzXG4gKiBAZXhhbXBsZVxuICogdmFyIHBvbHlnb24gPSB0dXJmLnBvbHlnb24oW1tbLTUwLCA1XSwgWy00MCwgLTEwXSwgWy01MCwgLTEwXSwgWy00MCwgNV0sIFstNTAsIDVdXV0pO1xuICogdmFyIHNlZ21lbnRzID0gdHVyZi5saW5lU2VnbWVudChwb2x5Z29uKTtcbiAqXG4gKiAvL2FkZFRvTWFwXG4gKiB2YXIgYWRkVG9NYXAgPSBbcG9seWdvbiwgc2VnbWVudHNdXG4gKi9cbmZ1bmN0aW9uIGxpbmVTZWdtZW50KGdlb2pzb24pIHtcbiAgICBpZiAoIWdlb2pzb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2VvanNvbiBpcyByZXF1aXJlZFwiKTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICBmbGF0dGVuRWFjaChnZW9qc29uLCBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgICBsaW5lU2VnbWVudEZlYXR1cmUoZmVhdHVyZSwgcmVzdWx0cyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKHJlc3VsdHMpO1xufVxuLyoqXG4gKiBMaW5lIFNlZ21lbnRcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGZWF0dXJlPExpbmVTdHJpbmd8UG9seWdvbj59IGdlb2pzb24gTGluZSBvciBwb2x5Z29uIGZlYXR1cmVcbiAqIEBwYXJhbSB7QXJyYXl9IHJlc3VsdHMgcHVzaCB0byByZXN1bHRzXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gbGluZVNlZ21lbnRGZWF0dXJlKGdlb2pzb24sIHJlc3VsdHMpIHtcbiAgICB2YXIgY29vcmRzID0gW107XG4gICAgdmFyIGdlb21ldHJ5ID0gZ2VvanNvbi5nZW9tZXRyeTtcbiAgICBpZiAoZ2VvbWV0cnkgIT09IG51bGwpIHtcbiAgICAgICAgc3dpdGNoIChnZW9tZXRyeS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgICAgICAgICAgIGNvb3JkcyA9IGdldENvb3JkcyhnZW9tZXRyeSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgICAgICAgICAgIGNvb3JkcyA9IFtnZXRDb29yZHMoZ2VvbWV0cnkpXTtcbiAgICAgICAgfVxuICAgICAgICBjb29yZHMuZm9yRWFjaChmdW5jdGlvbiAoY29vcmQpIHtcbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IGNyZWF0ZVNlZ21lbnRzKGNvb3JkLCBnZW9qc29uLnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgc2VnbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoc2VnbWVudCkge1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuaWQgPSByZXN1bHRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goc2VnbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBDcmVhdGUgU2VnbWVudHMgZnJvbSBMaW5lU3RyaW5nIGNvb3JkaW5hdGVzXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IGNvb3JkcyBMaW5lU3RyaW5nIGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0geyp9IHByb3BlcnRpZXMgR2VvSlNPTiBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJucyB7QXJyYXk8RmVhdHVyZTxMaW5lU3RyaW5nPj59IGxpbmUgc2VnbWVudHNcbiAqL1xuZnVuY3Rpb24gY3JlYXRlU2VnbWVudHMoY29vcmRzLCBwcm9wZXJ0aWVzKSB7XG4gICAgdmFyIHNlZ21lbnRzID0gW107XG4gICAgY29vcmRzLnJlZHVjZShmdW5jdGlvbiAocHJldmlvdXNDb29yZHMsIGN1cnJlbnRDb29yZHMpIHtcbiAgICAgICAgdmFyIHNlZ21lbnQgPSBsaW5lU3RyaW5nKFtwcmV2aW91c0Nvb3JkcywgY3VycmVudENvb3Jkc10sIHByb3BlcnRpZXMpO1xuICAgICAgICBzZWdtZW50LmJib3ggPSBiYm94KHByZXZpb3VzQ29vcmRzLCBjdXJyZW50Q29vcmRzKTtcbiAgICAgICAgc2VnbWVudHMucHVzaChzZWdtZW50KTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDb29yZHM7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNlZ21lbnRzO1xufVxuLyoqXG4gKiBDcmVhdGUgQkJveCBiZXR3ZWVuIHR3byBjb29yZGluYXRlcyAoZmFzdGVyIHRoYW4gQHR1cmYvYmJveClcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBjb29yZHMxIFBvaW50IGNvb3JkaW5hdGVcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gY29vcmRzMiBQb2ludCBjb29yZGluYXRlXG4gKiBAcmV0dXJucyB7QkJveH0gW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF1cbiAqL1xuZnVuY3Rpb24gYmJveChjb29yZHMxLCBjb29yZHMyKSB7XG4gICAgdmFyIHgxID0gY29vcmRzMVswXTtcbiAgICB2YXIgeTEgPSBjb29yZHMxWzFdO1xuICAgIHZhciB4MiA9IGNvb3JkczJbMF07XG4gICAgdmFyIHkyID0gY29vcmRzMlsxXTtcbiAgICB2YXIgd2VzdCA9IHgxIDwgeDIgPyB4MSA6IHgyO1xuICAgIHZhciBzb3V0aCA9IHkxIDwgeTIgPyB5MSA6IHkyO1xuICAgIHZhciBlYXN0ID0geDEgPiB4MiA/IHgxIDogeDI7XG4gICAgdmFyIG5vcnRoID0geTEgPiB5MiA/IHkxIDogeTI7XG4gICAgcmV0dXJuIFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdO1xufVxuZXhwb3J0IGRlZmF1bHQgbGluZVNlZ21lbnQ7XG4iLCJpbXBvcnQgeyBmZWF0dXJlLCBsaW5lU3RyaW5nLCBpc09iamVjdCwgcG9pbnQgfSBmcm9tICdAdHVyZi9oZWxwZXJzJztcblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgY29vcmRFYWNoXG4gKlxuICogQGNhbGxiYWNrIGNvb3JkRWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGN1cnJlbnRDb29yZCBUaGUgY3VycmVudCBjb29yZGluYXRlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb29yZEluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBjb29yZGluYXRlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBnZW9tZXRyeUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgY29vcmRpbmF0ZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LmZvckVhY2goKVxuICpcbiAqIEBuYW1lIGNvb3JkRWFjaFxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAoY3VycmVudENvb3JkLCBjb29yZEluZGV4LCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KVxuICogQHBhcmFtIHtib29sZWFufSBbZXhjbHVkZVdyYXBDb29yZD1mYWxzZV0gd2hldGhlciBvciBub3QgdG8gaW5jbHVkZSB0aGUgZmluYWwgY29vcmRpbmF0ZSBvZiBMaW5lYXJSaW5ncyB0aGF0IHdyYXBzIHRoZSByaW5nIGluIGl0cyBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgdHVyZi5wb2ludChbMjYsIDM3XSwge1wiZm9vXCI6IFwiYmFyXCJ9KSxcbiAqICAgdHVyZi5wb2ludChbMzYsIDUzXSwge1wiaGVsbG9cIjogXCJ3b3JsZFwifSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuY29vcmRFYWNoKGZlYXR1cmVzLCBmdW5jdGlvbiAoY3VycmVudENvb3JkLCBjb29yZEluZGV4LCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KSB7XG4gKiAgIC8vPWN1cnJlbnRDb29yZFxuICogICAvLz1jb29yZEluZGV4XG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1tdWx0aUZlYXR1cmVJbmRleFxuICogICAvLz1nZW9tZXRyeUluZGV4XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gY29vcmRFYWNoKGdlb2pzb24sIGNhbGxiYWNrLCBleGNsdWRlV3JhcENvb3JkKSB7XG4gIC8vIEhhbmRsZXMgbnVsbCBHZW9tZXRyeSAtLSBTa2lwcyB0aGlzIEdlb0pTT05cbiAgaWYgKGdlb2pzb24gPT09IG51bGwpIHJldHVybjtcbiAgdmFyIGosXG4gICAgayxcbiAgICBsLFxuICAgIGdlb21ldHJ5LFxuICAgIHN0b3BHLFxuICAgIGNvb3JkcyxcbiAgICBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbixcbiAgICB3cmFwU2hyaW5rID0gMCxcbiAgICBjb29yZEluZGV4ID0gMCxcbiAgICBpc0dlb21ldHJ5Q29sbGVjdGlvbixcbiAgICB0eXBlID0gZ2VvanNvbi50eXBlLFxuICAgIGlzRmVhdHVyZUNvbGxlY3Rpb24gPSB0eXBlID09PSBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgaXNGZWF0dXJlID0gdHlwZSA9PT0gXCJGZWF0dXJlXCIsXG4gICAgc3RvcCA9IGlzRmVhdHVyZUNvbGxlY3Rpb24gPyBnZW9qc29uLmZlYXR1cmVzLmxlbmd0aCA6IDE7XG5cbiAgLy8gVGhpcyBsb2dpYyBtYXkgbG9vayBhIGxpdHRsZSB3ZWlyZC4gVGhlIHJlYXNvbiB3aHkgaXQgaXMgdGhhdCB3YXlcbiAgLy8gaXMgYmVjYXVzZSBpdCdzIHRyeWluZyB0byBiZSBmYXN0LiBHZW9KU09OIHN1cHBvcnRzIG11bHRpcGxlIGtpbmRzXG4gIC8vIG9mIG9iamVjdHMgYXQgaXRzIHJvb3Q6IEZlYXR1cmVDb2xsZWN0aW9uLCBGZWF0dXJlcywgR2VvbWV0cmllcy5cbiAgLy8gVGhpcyBmdW5jdGlvbiBoYXMgdGhlIHJlc3BvbnNpYmlsaXR5IG9mIGhhbmRsaW5nIGFsbCBvZiB0aGVtLCBhbmQgdGhhdFxuICAvLyBtZWFucyB0aGF0IHNvbWUgb2YgdGhlIGBmb3JgIGxvb3BzIHlvdSBzZWUgYmVsb3cgYWN0dWFsbHkganVzdCBkb24ndCBhcHBseVxuICAvLyB0byBjZXJ0YWluIGlucHV0cy4gRm9yIGluc3RhbmNlLCBpZiB5b3UgZ2l2ZSB0aGlzIGp1c3QgYVxuICAvLyBQb2ludCBnZW9tZXRyeSwgdGhlbiBib3RoIGxvb3BzIGFyZSBzaG9ydC1jaXJjdWl0ZWQgYW5kIGFsbCB3ZSBkb1xuICAvLyBpcyBncmFkdWFsbHkgcmVuYW1lIHRoZSBpbnB1dCB1bnRpbCBpdCdzIGNhbGxlZCAnZ2VvbWV0cnknLlxuICAvL1xuICAvLyBUaGlzIGFsc28gYWltcyB0byBhbGxvY2F0ZSBhcyBmZXcgcmVzb3VyY2VzIGFzIHBvc3NpYmxlOiBqdXN0IGFcbiAgLy8gZmV3IG51bWJlcnMgYW5kIGJvb2xlYW5zLCByYXRoZXIgdGhhbiBhbnkgdGVtcG9yYXJ5IGFycmF5cyBhcyB3b3VsZFxuICAvLyBiZSByZXF1aXJlZCB3aXRoIHRoZSBub3JtYWxpemF0aW9uIGFwcHJvYWNoLlxuICBmb3IgKHZhciBmZWF0dXJlSW5kZXggPSAwOyBmZWF0dXJlSW5kZXggPCBzdG9wOyBmZWF0dXJlSW5kZXgrKykge1xuICAgIGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uID0gaXNGZWF0dXJlQ29sbGVjdGlvblxuICAgICAgPyBnZW9qc29uLmZlYXR1cmVzW2ZlYXR1cmVJbmRleF0uZ2VvbWV0cnlcbiAgICAgIDogaXNGZWF0dXJlXG4gICAgICA/IGdlb2pzb24uZ2VvbWV0cnlcbiAgICAgIDogZ2VvanNvbjtcbiAgICBpc0dlb21ldHJ5Q29sbGVjdGlvbiA9IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLnR5cGUgPT09IFwiR2VvbWV0cnlDb2xsZWN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gICAgc3RvcEcgPSBpc0dlb21ldHJ5Q29sbGVjdGlvblxuICAgICAgPyBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbi5nZW9tZXRyaWVzLmxlbmd0aFxuICAgICAgOiAxO1xuXG4gICAgZm9yICh2YXIgZ2VvbUluZGV4ID0gMDsgZ2VvbUluZGV4IDwgc3RvcEc7IGdlb21JbmRleCsrKSB7XG4gICAgICB2YXIgbXVsdGlGZWF0dXJlSW5kZXggPSAwO1xuICAgICAgdmFyIGdlb21ldHJ5SW5kZXggPSAwO1xuICAgICAgZ2VvbWV0cnkgPSBpc0dlb21ldHJ5Q29sbGVjdGlvblxuICAgICAgICA/IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLmdlb21ldHJpZXNbZ2VvbUluZGV4XVxuICAgICAgICA6IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uO1xuXG4gICAgICAvLyBIYW5kbGVzIG51bGwgR2VvbWV0cnkgLS0gU2tpcHMgdGhpcyBnZW9tZXRyeVxuICAgICAgaWYgKGdlb21ldHJ5ID09PSBudWxsKSBjb250aW51ZTtcbiAgICAgIGNvb3JkcyA9IGdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgICAgdmFyIGdlb21UeXBlID0gZ2VvbWV0cnkudHlwZTtcblxuICAgICAgd3JhcFNocmluayA9XG4gICAgICAgIGV4Y2x1ZGVXcmFwQ29vcmQgJiZcbiAgICAgICAgKGdlb21UeXBlID09PSBcIlBvbHlnb25cIiB8fCBnZW9tVHlwZSA9PT0gXCJNdWx0aVBvbHlnb25cIilcbiAgICAgICAgICA/IDFcbiAgICAgICAgICA6IDA7XG5cbiAgICAgIHN3aXRjaCAoZ2VvbVR5cGUpIHtcbiAgICAgICAgY2FzZSBudWxsOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgICAgY29vcmRzLFxuICAgICAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBjb29yZEluZGV4Kys7XG4gICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgrKztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgY29vcmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICAgIGNvb3Jkc1tqXSxcbiAgICAgICAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNvb3JkSW5kZXgrKztcbiAgICAgICAgICAgIGlmIChnZW9tVHlwZSA9PT0gXCJNdWx0aVBvaW50XCIpIG11bHRpRmVhdHVyZUluZGV4Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChnZW9tVHlwZSA9PT0gXCJMaW5lU3RyaW5nXCIpIG11bHRpRmVhdHVyZUluZGV4Kys7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICAgIGNhc2UgXCJNdWx0aUxpbmVTdHJpbmdcIjpcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgY29vcmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgY29vcmRzW2pdLmxlbmd0aCAtIHdyYXBTaHJpbms7IGsrKykge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICAgICAgICBjb29yZHNbal1ba10sXG4gICAgICAgICAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgY29vcmRJbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdlb21UeXBlID09PSBcIk11bHRpTGluZVN0cmluZ1wiKSBtdWx0aUZlYXR1cmVJbmRleCsrO1xuICAgICAgICAgICAgaWYgKGdlb21UeXBlID09PSBcIlBvbHlnb25cIikgZ2VvbWV0cnlJbmRleCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZ2VvbVR5cGUgPT09IFwiUG9seWdvblwiKSBtdWx0aUZlYXR1cmVJbmRleCsrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6XG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGNvb3Jkcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgZ2VvbWV0cnlJbmRleCA9IDA7XG4gICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgY29vcmRzW2pdLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgIGZvciAobCA9IDA7IGwgPCBjb29yZHNbal1ba10ubGVuZ3RoIC0gd3JhcFNocmluazsgbCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICAgICAgICAgIGNvb3Jkc1tqXVtrXVtsXSxcbiAgICAgICAgICAgICAgICAgICAgY29vcmRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnlJbmRleFxuICAgICAgICAgICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29vcmRJbmRleCsrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGdlb21ldHJ5SW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiR2VvbWV0cnlDb2xsZWN0aW9uXCI6XG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGdlb21ldHJ5Lmdlb21ldHJpZXMubGVuZ3RoOyBqKyspXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNvb3JkRWFjaChnZW9tZXRyeS5nZW9tZXRyaWVzW2pdLCBjYWxsYmFjaywgZXhjbHVkZVdyYXBDb29yZCkgPT09XG4gICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIEdlb21ldHJ5IFR5cGVcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGNvb3JkUmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgY29vcmRSZWR1Y2VDYWxsYmFja1xuICogQHBhcmFtIHsqfSBwcmV2aW91c1ZhbHVlIFRoZSBhY2N1bXVsYXRlZCB2YWx1ZSBwcmV2aW91c2x5IHJldHVybmVkIGluIHRoZSBsYXN0IGludm9jYXRpb25cbiAqIG9mIHRoZSBjYWxsYmFjaywgb3IgaW5pdGlhbFZhbHVlLCBpZiBzdXBwbGllZC5cbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gY3VycmVudENvb3JkIFRoZSBjdXJyZW50IGNvb3JkaW5hdGUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGNvb3JkSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIGNvb3JkaW5hdGUgYmVpbmcgcHJvY2Vzc2VkLlxuICogU3RhcnRzIGF0IGluZGV4IDAsIGlmIGFuIGluaXRpYWxWYWx1ZSBpcyBwcm92aWRlZCwgYW5kIGF0IGluZGV4IDEgb3RoZXJ3aXNlLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlGZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIE11bHRpLUZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGdlb21ldHJ5SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEdlb21ldHJ5IGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBjb29yZGluYXRlcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkucmVkdWNlKClcbiAqXG4gKiBAbmFtZSBjb29yZFJlZHVjZVxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxHZW9tZXRyeXxGZWF0dXJlfSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudENvb3JkLCBjb29yZEluZGV4KVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2V4Y2x1ZGVXcmFwQ29vcmQ9ZmFsc2VdIHdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgdGhlIGZpbmFsIGNvb3JkaW5hdGUgb2YgTGluZWFyUmluZ3MgdGhhdCB3cmFwcyB0aGUgcmluZyBpbiBpdHMgaXRlcmF0aW9uLlxuICogQHJldHVybnMgeyp9IFRoZSB2YWx1ZSB0aGF0IHJlc3VsdHMgZnJvbSB0aGUgcmVkdWN0aW9uLlxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICB0dXJmLnBvaW50KFsyNiwgMzddLCB7XCJmb29cIjogXCJiYXJcIn0pLFxuICogICB0dXJmLnBvaW50KFszNiwgNTNdLCB7XCJoZWxsb1wiOiBcIndvcmxkXCJ9KVxuICogXSk7XG4gKlxuICogdHVyZi5jb29yZFJlZHVjZShmZWF0dXJlcywgZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRDb29yZCwgY29vcmRJbmRleCwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleCkge1xuICogICAvLz1wcmV2aW91c1ZhbHVlXG4gKiAgIC8vPWN1cnJlbnRDb29yZFxuICogICAvLz1jb29yZEluZGV4XG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1tdWx0aUZlYXR1cmVJbmRleFxuICogICAvLz1nZW9tZXRyeUluZGV4XG4gKiAgIHJldHVybiBjdXJyZW50Q29vcmQ7XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gY29vcmRSZWR1Y2UoZ2VvanNvbiwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSwgZXhjbHVkZVdyYXBDb29yZCkge1xuICB2YXIgcHJldmlvdXNWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgY29vcmRFYWNoKFxuICAgIGdlb2pzb24sXG4gICAgZnVuY3Rpb24gKFxuICAgICAgY3VycmVudENvb3JkLFxuICAgICAgY29vcmRJbmRleCxcbiAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgZ2VvbWV0cnlJbmRleFxuICAgICkge1xuICAgICAgaWYgKGNvb3JkSW5kZXggPT09IDAgJiYgaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50Q29vcmQ7XG4gICAgICBlbHNlXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjYWxsYmFjayhcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlLFxuICAgICAgICAgIGN1cnJlbnRDb29yZCxcbiAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBleGNsdWRlV3JhcENvb3JkXG4gICk7XG4gIHJldHVybiBwcmV2aW91c1ZhbHVlO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBwcm9wRWFjaFxuICpcbiAqIEBjYWxsYmFjayBwcm9wRWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdH0gY3VycmVudFByb3BlcnRpZXMgVGhlIGN1cnJlbnQgUHJvcGVydGllcyBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBwcm9wZXJ0aWVzIGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5mb3JFYWNoKClcbiAqXG4gKiBAbmFtZSBwcm9wRWFjaFxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAoY3VycmVudFByb3BlcnRpZXMsIGZlYXR1cmVJbmRleClcbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgICAgdHVyZi5wb2ludChbMzYsIDUzXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHR1cmYucHJvcEVhY2goZmVhdHVyZXMsIGZ1bmN0aW9uIChjdXJyZW50UHJvcGVydGllcywgZmVhdHVyZUluZGV4KSB7XG4gKiAgIC8vPWN1cnJlbnRQcm9wZXJ0aWVzXG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIHByb3BFYWNoKGdlb2pzb24sIGNhbGxiYWNrKSB7XG4gIHZhciBpO1xuICBzd2l0Y2ggKGdlb2pzb24udHlwZSkge1xuICAgIGNhc2UgXCJGZWF0dXJlQ29sbGVjdGlvblwiOlxuICAgICAgZm9yIChpID0gMDsgaSA8IGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKGdlb2pzb24uZmVhdHVyZXNbaV0ucHJvcGVydGllcywgaSkgPT09IGZhbHNlKSBicmVhaztcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJGZWF0dXJlXCI6XG4gICAgICBjYWxsYmFjayhnZW9qc29uLnByb3BlcnRpZXMsIDApO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgcHJvcFJlZHVjZVxuICpcbiAqIFRoZSBmaXJzdCB0aW1lIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZSB2YWx1ZXMgcHJvdmlkZWQgYXMgYXJndW1lbnRzIGRlcGVuZFxuICogb24gd2hldGhlciB0aGUgcmVkdWNlIG1ldGhvZCBoYXMgYW4gaW5pdGlhbFZhbHVlIGFyZ3VtZW50LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBwcm92aWRlZCB0byB0aGUgcmVkdWNlIG1ldGhvZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIGluaXRpYWxWYWx1ZS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBub3QgcHJvdmlkZWQ6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgc2Vjb25kIGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogQGNhbGxiYWNrIHByb3BSZWR1Y2VDYWxsYmFja1xuICogQHBhcmFtIHsqfSBwcmV2aW91c1ZhbHVlIFRoZSBhY2N1bXVsYXRlZCB2YWx1ZSBwcmV2aW91c2x5IHJldHVybmVkIGluIHRoZSBsYXN0IGludm9jYXRpb25cbiAqIG9mIHRoZSBjYWxsYmFjaywgb3IgaW5pdGlhbFZhbHVlLCBpZiBzdXBwbGllZC5cbiAqIEBwYXJhbSB7Kn0gY3VycmVudFByb3BlcnRpZXMgVGhlIGN1cnJlbnQgUHJvcGVydGllcyBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBwcm9wZXJ0aWVzIGluIGFueSBHZW9KU09OIG9iamVjdCBpbnRvIGEgc2luZ2xlIHZhbHVlLFxuICogc2ltaWxhciB0byBob3cgQXJyYXkucmVkdWNlIHdvcmtzLiBIb3dldmVyLCBpbiB0aGlzIGNhc2Ugd2UgbGF6aWx5IHJ1blxuICogdGhlIHJlZHVjdGlvbiwgc28gYW4gYXJyYXkgb2YgYWxsIHByb3BlcnRpZXMgaXMgdW5uZWNlc3NhcnkuXG4gKlxuICogQG5hbWUgcHJvcFJlZHVjZVxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudFByb3BlcnRpZXMsIGZlYXR1cmVJbmRleClcbiAqIEBwYXJhbSB7Kn0gW2luaXRpYWxWYWx1ZV0gVmFsdWUgdG8gdXNlIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgZmlyc3QgY2FsbCBvZiB0aGUgY2FsbGJhY2suXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHZhbHVlIHRoYXQgcmVzdWx0cyBmcm9tIHRoZSByZWR1Y3Rpb24uXG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgICAgdHVyZi5wb2ludChbMjYsIDM3XSwge2ZvbzogJ2Jhcid9KSxcbiAqICAgICB0dXJmLnBvaW50KFszNiwgNTNdLCB7aGVsbG86ICd3b3JsZCd9KVxuICogXSk7XG4gKlxuICogdHVyZi5wcm9wUmVkdWNlKGZlYXR1cmVzLCBmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudFByb3BlcnRpZXMsIGZlYXR1cmVJbmRleCkge1xuICogICAvLz1wcmV2aW91c1ZhbHVlXG4gKiAgIC8vPWN1cnJlbnRQcm9wZXJ0aWVzXG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICByZXR1cm4gY3VycmVudFByb3BlcnRpZXNcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBwcm9wUmVkdWNlKGdlb2pzb24sIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUpIHtcbiAgdmFyIHByZXZpb3VzVmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gIHByb3BFYWNoKGdlb2pzb24sIGZ1bmN0aW9uIChjdXJyZW50UHJvcGVydGllcywgZmVhdHVyZUluZGV4KSB7XG4gICAgaWYgKGZlYXR1cmVJbmRleCA9PT0gMCAmJiBpbml0aWFsVmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50UHJvcGVydGllcztcbiAgICBlbHNlXG4gICAgICBwcmV2aW91c1ZhbHVlID0gY2FsbGJhY2socHJldmlvdXNWYWx1ZSwgY3VycmVudFByb3BlcnRpZXMsIGZlYXR1cmVJbmRleCk7XG4gIH0pO1xuICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgZmVhdHVyZUVhY2hcbiAqXG4gKiBAY2FsbGJhY2sgZmVhdHVyZUVhY2hDYWxsYmFja1xuICogQHBhcmFtIHtGZWF0dXJlPGFueT59IGN1cnJlbnRGZWF0dXJlIFRoZSBjdXJyZW50IEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgZmVhdHVyZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvXG4gKiBBcnJheS5mb3JFYWNoLlxuICpcbiAqIEBuYW1lIGZlYXR1cmVFYWNoXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4KVxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmZlYXR1cmVFYWNoKGZlYXR1cmVzLCBmdW5jdGlvbiAoY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCkge1xuICogICAvLz1jdXJyZW50RmVhdHVyZVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBmZWF0dXJlRWFjaChnZW9qc29uLCBjYWxsYmFjaykge1xuICBpZiAoZ2VvanNvbi50eXBlID09PSBcIkZlYXR1cmVcIikge1xuICAgIGNhbGxiYWNrKGdlb2pzb24sIDApO1xuICB9IGVsc2UgaWYgKGdlb2pzb24udHlwZSA9PT0gXCJGZWF0dXJlQ29sbGVjdGlvblwiKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBnZW9qc29uLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY2FsbGJhY2soZ2VvanNvbi5mZWF0dXJlc1tpXSwgaSkgPT09IGZhbHNlKSBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgZmVhdHVyZVJlZHVjZVxuICpcbiAqIFRoZSBmaXJzdCB0aW1lIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZSB2YWx1ZXMgcHJvdmlkZWQgYXMgYXJndW1lbnRzIGRlcGVuZFxuICogb24gd2hldGhlciB0aGUgcmVkdWNlIG1ldGhvZCBoYXMgYW4gaW5pdGlhbFZhbHVlIGFyZ3VtZW50LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBwcm92aWRlZCB0byB0aGUgcmVkdWNlIG1ldGhvZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIGluaXRpYWxWYWx1ZS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBub3QgcHJvdmlkZWQ6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgc2Vjb25kIGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogQGNhbGxiYWNrIGZlYXR1cmVSZWR1Y2VDYWxsYmFja1xuICogQHBhcmFtIHsqfSBwcmV2aW91c1ZhbHVlIFRoZSBhY2N1bXVsYXRlZCB2YWx1ZSBwcmV2aW91c2x5IHJldHVybmVkIGluIHRoZSBsYXN0IGludm9jYXRpb25cbiAqIG9mIHRoZSBjYWxsYmFjaywgb3IgaW5pdGlhbFZhbHVlLCBpZiBzdXBwbGllZC5cbiAqIEBwYXJhbSB7RmVhdHVyZX0gY3VycmVudEZlYXR1cmUgVGhlIGN1cnJlbnQgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBmZWF0dXJlcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkucmVkdWNlKCkuXG4gKlxuICogQG5hbWUgZmVhdHVyZVJlZHVjZVxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleClcbiAqIEBwYXJhbSB7Kn0gW2luaXRpYWxWYWx1ZV0gVmFsdWUgdG8gdXNlIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgZmlyc3QgY2FsbCBvZiB0aGUgY2FsbGJhY2suXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHZhbHVlIHRoYXQgcmVzdWx0cyBmcm9tIHRoZSByZWR1Y3Rpb24uXG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtcImZvb1wiOiBcImJhclwifSksXG4gKiAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtcImhlbGxvXCI6IFwid29ybGRcIn0pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmZlYXR1cmVSZWR1Y2UoZmVhdHVyZXMsIGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4KSB7XG4gKiAgIC8vPXByZXZpb3VzVmFsdWVcbiAqICAgLy89Y3VycmVudEZlYXR1cmVcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIHJldHVybiBjdXJyZW50RmVhdHVyZVxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIGZlYXR1cmVSZWR1Y2UoZ2VvanNvbiwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuICB2YXIgcHJldmlvdXNWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgZmVhdHVyZUVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgpIHtcbiAgICBpZiAoZmVhdHVyZUluZGV4ID09PSAwICYmIGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgcHJldmlvdXNWYWx1ZSA9IGN1cnJlbnRGZWF0dXJlO1xuICAgIGVsc2UgcHJldmlvdXNWYWx1ZSA9IGNhbGxiYWNrKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgpO1xuICB9KTtcbiAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG59XG5cbi8qKlxuICogR2V0IGFsbCBjb29yZGluYXRlcyBmcm9tIGFueSBHZW9KU09OIG9iamVjdC5cbiAqXG4gKiBAbmFtZSBjb29yZEFsbFxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHJldHVybnMge0FycmF5PEFycmF5PG51bWJlcj4+fSBjb29yZGluYXRlIHBvc2l0aW9uIGFycmF5XG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB2YXIgY29vcmRzID0gdHVyZi5jb29yZEFsbChmZWF0dXJlcyk7XG4gKiAvLz0gW1syNiwgMzddLCBbMzYsIDUzXV1cbiAqL1xuZnVuY3Rpb24gY29vcmRBbGwoZ2VvanNvbikge1xuICB2YXIgY29vcmRzID0gW107XG4gIGNvb3JkRWFjaChnZW9qc29uLCBmdW5jdGlvbiAoY29vcmQpIHtcbiAgICBjb29yZHMucHVzaChjb29yZCk7XG4gIH0pO1xuICByZXR1cm4gY29vcmRzO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBnZW9tRWFjaFxuICpcbiAqIEBjYWxsYmFjayBnZW9tRWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge0dlb21ldHJ5fSBjdXJyZW50R2VvbWV0cnkgVGhlIGN1cnJlbnQgR2VvbWV0cnkgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gZmVhdHVyZVByb3BlcnRpZXMgVGhlIGN1cnJlbnQgRmVhdHVyZSBQcm9wZXJ0aWVzIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gZmVhdHVyZUJCb3ggVGhlIGN1cnJlbnQgRmVhdHVyZSBCQm94IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gZmVhdHVyZUlkIFRoZSBjdXJyZW50IEZlYXR1cmUgSWQgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGVhY2ggZ2VvbWV0cnkgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LmZvckVhY2goKVxuICpcbiAqIEBuYW1lIGdlb21FYWNoXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50R2VvbWV0cnksIGZlYXR1cmVJbmRleCwgZmVhdHVyZVByb3BlcnRpZXMsIGZlYXR1cmVCQm94LCBmZWF0dXJlSWQpXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgICB0dXJmLnBvaW50KFsyNiwgMzddLCB7Zm9vOiAnYmFyJ30pLFxuICogICAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmdlb21FYWNoKGZlYXR1cmVzLCBmdW5jdGlvbiAoY3VycmVudEdlb21ldHJ5LCBmZWF0dXJlSW5kZXgsIGZlYXR1cmVQcm9wZXJ0aWVzLCBmZWF0dXJlQkJveCwgZmVhdHVyZUlkKSB7XG4gKiAgIC8vPWN1cnJlbnRHZW9tZXRyeVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgLy89ZmVhdHVyZVByb3BlcnRpZXNcbiAqICAgLy89ZmVhdHVyZUJCb3hcbiAqICAgLy89ZmVhdHVyZUlkXG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gZ2VvbUVhY2goZ2VvanNvbiwgY2FsbGJhY2spIHtcbiAgdmFyIGksXG4gICAgaixcbiAgICBnLFxuICAgIGdlb21ldHJ5LFxuICAgIHN0b3BHLFxuICAgIGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLFxuICAgIGlzR2VvbWV0cnlDb2xsZWN0aW9uLFxuICAgIGZlYXR1cmVQcm9wZXJ0aWVzLFxuICAgIGZlYXR1cmVCQm94LFxuICAgIGZlYXR1cmVJZCxcbiAgICBmZWF0dXJlSW5kZXggPSAwLFxuICAgIGlzRmVhdHVyZUNvbGxlY3Rpb24gPSBnZW9qc29uLnR5cGUgPT09IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAgICBpc0ZlYXR1cmUgPSBnZW9qc29uLnR5cGUgPT09IFwiRmVhdHVyZVwiLFxuICAgIHN0b3AgPSBpc0ZlYXR1cmVDb2xsZWN0aW9uID8gZ2VvanNvbi5mZWF0dXJlcy5sZW5ndGggOiAxO1xuXG4gIC8vIFRoaXMgbG9naWMgbWF5IGxvb2sgYSBsaXR0bGUgd2VpcmQuIFRoZSByZWFzb24gd2h5IGl0IGlzIHRoYXQgd2F5XG4gIC8vIGlzIGJlY2F1c2UgaXQncyB0cnlpbmcgdG8gYmUgZmFzdC4gR2VvSlNPTiBzdXBwb3J0cyBtdWx0aXBsZSBraW5kc1xuICAvLyBvZiBvYmplY3RzIGF0IGl0cyByb290OiBGZWF0dXJlQ29sbGVjdGlvbiwgRmVhdHVyZXMsIEdlb21ldHJpZXMuXG4gIC8vIFRoaXMgZnVuY3Rpb24gaGFzIHRoZSByZXNwb25zaWJpbGl0eSBvZiBoYW5kbGluZyBhbGwgb2YgdGhlbSwgYW5kIHRoYXRcbiAgLy8gbWVhbnMgdGhhdCBzb21lIG9mIHRoZSBgZm9yYCBsb29wcyB5b3Ugc2VlIGJlbG93IGFjdHVhbGx5IGp1c3QgZG9uJ3QgYXBwbHlcbiAgLy8gdG8gY2VydGFpbiBpbnB1dHMuIEZvciBpbnN0YW5jZSwgaWYgeW91IGdpdmUgdGhpcyBqdXN0IGFcbiAgLy8gUG9pbnQgZ2VvbWV0cnksIHRoZW4gYm90aCBsb29wcyBhcmUgc2hvcnQtY2lyY3VpdGVkIGFuZCBhbGwgd2UgZG9cbiAgLy8gaXMgZ3JhZHVhbGx5IHJlbmFtZSB0aGUgaW5wdXQgdW50aWwgaXQncyBjYWxsZWQgJ2dlb21ldHJ5Jy5cbiAgLy9cbiAgLy8gVGhpcyBhbHNvIGFpbXMgdG8gYWxsb2NhdGUgYXMgZmV3IHJlc291cmNlcyBhcyBwb3NzaWJsZToganVzdCBhXG4gIC8vIGZldyBudW1iZXJzIGFuZCBib29sZWFucywgcmF0aGVyIHRoYW4gYW55IHRlbXBvcmFyeSBhcnJheXMgYXMgd291bGRcbiAgLy8gYmUgcmVxdWlyZWQgd2l0aCB0aGUgbm9ybWFsaXphdGlvbiBhcHByb2FjaC5cbiAgZm9yIChpID0gMDsgaSA8IHN0b3A7IGkrKykge1xuICAgIGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uID0gaXNGZWF0dXJlQ29sbGVjdGlvblxuICAgICAgPyBnZW9qc29uLmZlYXR1cmVzW2ldLmdlb21ldHJ5XG4gICAgICA6IGlzRmVhdHVyZVxuICAgICAgPyBnZW9qc29uLmdlb21ldHJ5XG4gICAgICA6IGdlb2pzb247XG4gICAgZmVhdHVyZVByb3BlcnRpZXMgPSBpc0ZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb2pzb24uZmVhdHVyZXNbaV0ucHJvcGVydGllc1xuICAgICAgOiBpc0ZlYXR1cmVcbiAgICAgID8gZ2VvanNvbi5wcm9wZXJ0aWVzXG4gICAgICA6IHt9O1xuICAgIGZlYXR1cmVCQm94ID0gaXNGZWF0dXJlQ29sbGVjdGlvblxuICAgICAgPyBnZW9qc29uLmZlYXR1cmVzW2ldLmJib3hcbiAgICAgIDogaXNGZWF0dXJlXG4gICAgICA/IGdlb2pzb24uYmJveFxuICAgICAgOiB1bmRlZmluZWQ7XG4gICAgZmVhdHVyZUlkID0gaXNGZWF0dXJlQ29sbGVjdGlvblxuICAgICAgPyBnZW9qc29uLmZlYXR1cmVzW2ldLmlkXG4gICAgICA6IGlzRmVhdHVyZVxuICAgICAgPyBnZW9qc29uLmlkXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICBpc0dlb21ldHJ5Q29sbGVjdGlvbiA9IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLnR5cGUgPT09IFwiR2VvbWV0cnlDb2xsZWN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gICAgc3RvcEcgPSBpc0dlb21ldHJ5Q29sbGVjdGlvblxuICAgICAgPyBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbi5nZW9tZXRyaWVzLmxlbmd0aFxuICAgICAgOiAxO1xuXG4gICAgZm9yIChnID0gMDsgZyA8IHN0b3BHOyBnKyspIHtcbiAgICAgIGdlb21ldHJ5ID0gaXNHZW9tZXRyeUNvbGxlY3Rpb25cbiAgICAgICAgPyBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbi5nZW9tZXRyaWVzW2ddXG4gICAgICAgIDogZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb247XG5cbiAgICAgIC8vIEhhbmRsZSBudWxsIEdlb21ldHJ5XG4gICAgICBpZiAoZ2VvbWV0cnkgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgIGZlYXR1cmVQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgZmVhdHVyZUJCb3gsXG4gICAgICAgICAgICBmZWF0dXJlSWRcbiAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAoZ2VvbWV0cnkudHlwZSkge1xuICAgICAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgICAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgICAgZ2VvbWV0cnksXG4gICAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgZmVhdHVyZVByb3BlcnRpZXMsXG4gICAgICAgICAgICAgIGZlYXR1cmVCQm94LFxuICAgICAgICAgICAgICBmZWF0dXJlSWRcbiAgICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJHZW9tZXRyeUNvbGxlY3Rpb25cIjoge1xuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBnZW9tZXRyeS5nZW9tZXRyaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICAgIGdlb21ldHJ5Lmdlb21ldHJpZXNbal0sXG4gICAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICAgIGZlYXR1cmVQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgIGZlYXR1cmVCQm94LFxuICAgICAgICAgICAgICAgIGZlYXR1cmVJZFxuICAgICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBHZW9tZXRyeSBUeXBlXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBPbmx5IGluY3JlYXNlIGBmZWF0dXJlSW5kZXhgIHBlciBlYWNoIGZlYXR1cmVcbiAgICBmZWF0dXJlSW5kZXgrKztcbiAgfVxufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBnZW9tUmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgZ2VvbVJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHtHZW9tZXRyeX0gY3VycmVudEdlb21ldHJ5IFRoZSBjdXJyZW50IEdlb21ldHJ5IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtPYmplY3R9IGZlYXR1cmVQcm9wZXJ0aWVzIFRoZSBjdXJyZW50IEZlYXR1cmUgUHJvcGVydGllcyBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGZlYXR1cmVCQm94IFRoZSBjdXJyZW50IEZlYXR1cmUgQkJveCBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGZlYXR1cmVJZCBUaGUgY3VycmVudCBGZWF0dXJlIElkIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBnZW9tZXRyeSBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkucmVkdWNlKCkuXG4gKlxuICogQG5hbWUgZ2VvbVJlZHVjZVxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudEdlb21ldHJ5LCBmZWF0dXJlSW5kZXgsIGZlYXR1cmVQcm9wZXJ0aWVzLCBmZWF0dXJlQkJveCwgZmVhdHVyZUlkKVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm5zIHsqfSBUaGUgdmFsdWUgdGhhdCByZXN1bHRzIGZyb20gdGhlIHJlZHVjdGlvbi5cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgICB0dXJmLnBvaW50KFsyNiwgMzddLCB7Zm9vOiAnYmFyJ30pLFxuICogICAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmdlb21SZWR1Y2UoZmVhdHVyZXMsIGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50R2VvbWV0cnksIGZlYXR1cmVJbmRleCwgZmVhdHVyZVByb3BlcnRpZXMsIGZlYXR1cmVCQm94LCBmZWF0dXJlSWQpIHtcbiAqICAgLy89cHJldmlvdXNWYWx1ZVxuICogICAvLz1jdXJyZW50R2VvbWV0cnlcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPWZlYXR1cmVQcm9wZXJ0aWVzXG4gKiAgIC8vPWZlYXR1cmVCQm94XG4gKiAgIC8vPWZlYXR1cmVJZFxuICogICByZXR1cm4gY3VycmVudEdlb21ldHJ5XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gZ2VvbVJlZHVjZShnZW9qc29uLCBjYWxsYmFjaywgaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBwcmV2aW91c1ZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICBnZW9tRWFjaChcbiAgICBnZW9qc29uLFxuICAgIGZ1bmN0aW9uIChcbiAgICAgIGN1cnJlbnRHZW9tZXRyeSxcbiAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgIGZlYXR1cmVQcm9wZXJ0aWVzLFxuICAgICAgZmVhdHVyZUJCb3gsXG4gICAgICBmZWF0dXJlSWRcbiAgICApIHtcbiAgICAgIGlmIChmZWF0dXJlSW5kZXggPT09IDAgJiYgaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50R2VvbWV0cnk7XG4gICAgICBlbHNlXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjYWxsYmFjayhcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlLFxuICAgICAgICAgIGN1cnJlbnRHZW9tZXRyeSxcbiAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgZmVhdHVyZVByb3BlcnRpZXMsXG4gICAgICAgICAgZmVhdHVyZUJCb3gsXG4gICAgICAgICAgZmVhdHVyZUlkXG4gICAgICAgICk7XG4gICAgfVxuICApO1xuICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgZmxhdHRlbkVhY2hcbiAqXG4gKiBAY2FsbGJhY2sgZmxhdHRlbkVhY2hDYWxsYmFja1xuICogQHBhcmFtIHtGZWF0dXJlfSBjdXJyZW50RmVhdHVyZSBUaGUgY3VycmVudCBmbGF0dGVuZWQgZmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aUZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgTXVsdGktRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgZmxhdHRlbmVkIGZlYXR1cmVzIGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0b1xuICogQXJyYXkuZm9yRWFjaC5cbiAqXG4gKiBAbmFtZSBmbGF0dGVuRWFjaFxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAoY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpXG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgICAgdHVyZi5wb2ludChbMjYsIDM3XSwge2ZvbzogJ2Jhcid9KSxcbiAqICAgICB0dXJmLm11bHRpUG9pbnQoW1s0MCwgMzBdLCBbMzYsIDUzXV0sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmZsYXR0ZW5FYWNoKGZlYXR1cmVzLCBmdW5jdGlvbiAoY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpIHtcbiAqICAgLy89Y3VycmVudEZlYXR1cmVcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPW11bHRpRmVhdHVyZUluZGV4XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gZmxhdHRlbkVhY2goZ2VvanNvbiwgY2FsbGJhY2spIHtcbiAgZ2VvbUVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGdlb21ldHJ5LCBmZWF0dXJlSW5kZXgsIHByb3BlcnRpZXMsIGJib3gsIGlkKSB7XG4gICAgLy8gQ2FsbGJhY2sgZm9yIHNpbmdsZSBnZW9tZXRyeVxuICAgIHZhciB0eXBlID0gZ2VvbWV0cnkgPT09IG51bGwgPyBudWxsIDogZ2VvbWV0cnkudHlwZTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgbnVsbDpcbiAgICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgIGZlYXR1cmUoZ2VvbWV0cnksIHByb3BlcnRpZXMsIHsgYmJveDogYmJveCwgaWQ6IGlkIH0pLFxuICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgMFxuICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgZ2VvbVR5cGU7XG5cbiAgICAvLyBDYWxsYmFjayBmb3IgbXVsdGktZ2VvbWV0cnlcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6XG4gICAgICAgIGdlb21UeXBlID0gXCJQb2ludFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJNdWx0aUxpbmVTdHJpbmdcIjpcbiAgICAgICAgZ2VvbVR5cGUgPSBcIkxpbmVTdHJpbmdcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6XG4gICAgICAgIGdlb21UeXBlID0gXCJQb2x5Z29uXCI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGZvciAoXG4gICAgICB2YXIgbXVsdGlGZWF0dXJlSW5kZXggPSAwO1xuICAgICAgbXVsdGlGZWF0dXJlSW5kZXggPCBnZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGg7XG4gICAgICBtdWx0aUZlYXR1cmVJbmRleCsrXG4gICAgKSB7XG4gICAgICB2YXIgY29vcmRpbmF0ZSA9IGdlb21ldHJ5LmNvb3JkaW5hdGVzW211bHRpRmVhdHVyZUluZGV4XTtcbiAgICAgIHZhciBnZW9tID0ge1xuICAgICAgICB0eXBlOiBnZW9tVHlwZSxcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGUsXG4gICAgICB9O1xuICAgICAgaWYgKFxuICAgICAgICBjYWxsYmFjayhmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMpLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KSA9PT1cbiAgICAgICAgZmFsc2VcbiAgICAgIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGZsYXR0ZW5SZWR1Y2VcbiAqXG4gKiBUaGUgZmlyc3QgdGltZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGUgdmFsdWVzIHByb3ZpZGVkIGFzIGFyZ3VtZW50cyBkZXBlbmRcbiAqIG9uIHdoZXRoZXIgdGhlIHJlZHVjZSBtZXRob2QgaGFzIGFuIGluaXRpYWxWYWx1ZSBhcmd1bWVudC5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgcHJvdmlkZWQgdG8gdGhlIHJlZHVjZSBtZXRob2Q6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyBpbml0aWFsVmFsdWUuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgbm90IHByb3ZpZGVkOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIHNlY29uZCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIEBjYWxsYmFjayBmbGF0dGVuUmVkdWNlQ2FsbGJhY2tcbiAqIEBwYXJhbSB7Kn0gcHJldmlvdXNWYWx1ZSBUaGUgYWNjdW11bGF0ZWQgdmFsdWUgcHJldmlvdXNseSByZXR1cm5lZCBpbiB0aGUgbGFzdCBpbnZvY2F0aW9uXG4gKiBvZiB0aGUgY2FsbGJhY2ssIG9yIGluaXRpYWxWYWx1ZSwgaWYgc3VwcGxpZWQuXG4gKiBAcGFyYW0ge0ZlYXR1cmV9IGN1cnJlbnRGZWF0dXJlIFRoZSBjdXJyZW50IEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlGZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIE11bHRpLUZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogUmVkdWNlIGZsYXR0ZW5lZCBmZWF0dXJlcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkucmVkdWNlKCkuXG4gKlxuICogQG5hbWUgZmxhdHRlblJlZHVjZVxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpXG4gKiBAcGFyYW0geyp9IFtpbml0aWFsVmFsdWVdIFZhbHVlIHRvIHVzZSBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIGZpcnN0IGNhbGwgb2YgdGhlIGNhbGxiYWNrLlxuICogQHJldHVybnMgeyp9IFRoZSB2YWx1ZSB0aGF0IHJlc3VsdHMgZnJvbSB0aGUgcmVkdWN0aW9uLlxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgICAgdHVyZi5tdWx0aVBvaW50KFtbNDAsIDMwXSwgWzM2LCA1M11dLCB7aGVsbG86ICd3b3JsZCd9KVxuICogXSk7XG4gKlxuICogdHVyZi5mbGF0dGVuUmVkdWNlKGZlYXR1cmVzLCBmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpIHtcbiAqICAgLy89cHJldmlvdXNWYWx1ZVxuICogICAvLz1jdXJyZW50RmVhdHVyZVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgLy89bXVsdGlGZWF0dXJlSW5kZXhcbiAqICAgcmV0dXJuIGN1cnJlbnRGZWF0dXJlXG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gZmxhdHRlblJlZHVjZShnZW9qc29uLCBjYWxsYmFjaywgaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBwcmV2aW91c1ZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICBmbGF0dGVuRWFjaChcbiAgICBnZW9qc29uLFxuICAgIGZ1bmN0aW9uIChjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCkge1xuICAgICAgaWYgKFxuICAgICAgICBmZWF0dXJlSW5kZXggPT09IDAgJiZcbiAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXggPT09IDAgJiZcbiAgICAgICAgaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgIClcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGN1cnJlbnRGZWF0dXJlO1xuICAgICAgZWxzZVxuICAgICAgICBwcmV2aW91c1ZhbHVlID0gY2FsbGJhY2soXG4gICAgICAgICAgcHJldmlvdXNWYWx1ZSxcbiAgICAgICAgICBjdXJyZW50RmVhdHVyZSxcbiAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXhcbiAgICAgICAgKTtcbiAgICB9XG4gICk7XG4gIHJldHVybiBwcmV2aW91c1ZhbHVlO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBzZWdtZW50RWFjaFxuICpcbiAqIEBjYWxsYmFjayBzZWdtZW50RWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge0ZlYXR1cmU8TGluZVN0cmluZz59IGN1cnJlbnRTZWdtZW50IFRoZSBjdXJyZW50IFNlZ21lbnQgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlGZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIE11bHRpLUZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGdlb21ldHJ5SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEdlb21ldHJ5IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWdtZW50SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIFNlZ21lbnQgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgMi12ZXJ0ZXggbGluZSBzZWdtZW50IGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5mb3JFYWNoKClcbiAqIChNdWx0aSlQb2ludCBnZW9tZXRyaWVzIGRvIG5vdCBjb250YWluIHNlZ21lbnRzIHRoZXJlZm9yZSB0aGV5IGFyZSBpZ25vcmVkIGR1cmluZyB0aGlzIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT05cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKGN1cnJlbnRTZWdtZW50LCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4LCBzZWdtZW50SW5kZXgpXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9seWdvbiA9IHR1cmYucG9seWdvbihbW1stNTAsIDVdLCBbLTQwLCAtMTBdLCBbLTUwLCAtMTBdLCBbLTQwLCA1XSwgWy01MCwgNV1dXSk7XG4gKlxuICogLy8gSXRlcmF0ZSBvdmVyIEdlb0pTT04gYnkgMi12ZXJ0ZXggc2VnbWVudHNcbiAqIHR1cmYuc2VnbWVudEVhY2gocG9seWdvbiwgZnVuY3Rpb24gKGN1cnJlbnRTZWdtZW50LCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4LCBzZWdtZW50SW5kZXgpIHtcbiAqICAgLy89Y3VycmVudFNlZ21lbnRcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPW11bHRpRmVhdHVyZUluZGV4XG4gKiAgIC8vPWdlb21ldHJ5SW5kZXhcbiAqICAgLy89c2VnbWVudEluZGV4XG4gKiB9KTtcbiAqXG4gKiAvLyBDYWxjdWxhdGUgdGhlIHRvdGFsIG51bWJlciBvZiBzZWdtZW50c1xuICogdmFyIHRvdGFsID0gMDtcbiAqIHR1cmYuc2VnbWVudEVhY2gocG9seWdvbiwgZnVuY3Rpb24gKCkge1xuICogICAgIHRvdGFsKys7XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gc2VnbWVudEVhY2goZ2VvanNvbiwgY2FsbGJhY2spIHtcbiAgZmxhdHRlbkVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpIHtcbiAgICB2YXIgc2VnbWVudEluZGV4ID0gMDtcblxuICAgIC8vIEV4Y2x1ZGUgbnVsbCBHZW9tZXRyaWVzXG4gICAgaWYgKCFmZWF0dXJlLmdlb21ldHJ5KSByZXR1cm47XG4gICAgLy8gKE11bHRpKVBvaW50IGdlb21ldHJpZXMgZG8gbm90IGNvbnRhaW4gc2VnbWVudHMgdGhlcmVmb3JlIHRoZXkgYXJlIGlnbm9yZWQgZHVyaW5nIHRoaXMgb3BlcmF0aW9uLlxuICAgIHZhciB0eXBlID0gZmVhdHVyZS5nZW9tZXRyeS50eXBlO1xuICAgIGlmICh0eXBlID09PSBcIlBvaW50XCIgfHwgdHlwZSA9PT0gXCJNdWx0aVBvaW50XCIpIHJldHVybjtcblxuICAgIC8vIEdlbmVyYXRlIDItdmVydGV4IGxpbmUgc2VnbWVudHNcbiAgICB2YXIgcHJldmlvdXNDb29yZHM7XG4gICAgdmFyIHByZXZpb3VzRmVhdHVyZUluZGV4ID0gMDtcbiAgICB2YXIgcHJldmlvdXNNdWx0aUluZGV4ID0gMDtcbiAgICB2YXIgcHJldkdlb21JbmRleCA9IDA7XG4gICAgaWYgKFxuICAgICAgY29vcmRFYWNoKFxuICAgICAgICBmZWF0dXJlLFxuICAgICAgICBmdW5jdGlvbiAoXG4gICAgICAgICAgY3VycmVudENvb3JkLFxuICAgICAgICAgIGNvb3JkSW5kZXgsXG4gICAgICAgICAgZmVhdHVyZUluZGV4Q29vcmQsXG4gICAgICAgICAgbXVsdGlQYXJ0SW5kZXhDb29yZCxcbiAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICkge1xuICAgICAgICAgIC8vIFNpbXVsYXRpbmcgYSBtZXRhLmNvb3JkUmVkdWNlKCkgc2luY2UgYHJlZHVjZWAgb3BlcmF0aW9ucyBjYW5ub3QgYmUgc3RvcHBlZCBieSByZXR1cm5pbmcgYGZhbHNlYFxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHByZXZpb3VzQ29vcmRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIGZlYXR1cmVJbmRleCA+IHByZXZpb3VzRmVhdHVyZUluZGV4IHx8XG4gICAgICAgICAgICBtdWx0aVBhcnRJbmRleENvb3JkID4gcHJldmlvdXNNdWx0aUluZGV4IHx8XG4gICAgICAgICAgICBnZW9tZXRyeUluZGV4ID4gcHJldkdlb21JbmRleFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcHJldmlvdXNDb29yZHMgPSBjdXJyZW50Q29vcmQ7XG4gICAgICAgICAgICBwcmV2aW91c0ZlYXR1cmVJbmRleCA9IGZlYXR1cmVJbmRleDtcbiAgICAgICAgICAgIHByZXZpb3VzTXVsdGlJbmRleCA9IG11bHRpUGFydEluZGV4Q29vcmQ7XG4gICAgICAgICAgICBwcmV2R2VvbUluZGV4ID0gZ2VvbWV0cnlJbmRleDtcbiAgICAgICAgICAgIHNlZ21lbnRJbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBjdXJyZW50U2VnbWVudCA9IGxpbmVTdHJpbmcoXG4gICAgICAgICAgICBbcHJldmlvdXNDb29yZHMsIGN1cnJlbnRDb29yZF0sXG4gICAgICAgICAgICBmZWF0dXJlLnByb3BlcnRpZXNcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICBjdXJyZW50U2VnbWVudCxcbiAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgZ2VvbWV0cnlJbmRleCxcbiAgICAgICAgICAgICAgc2VnbWVudEluZGV4XG4gICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBzZWdtZW50SW5kZXgrKztcbiAgICAgICAgICBwcmV2aW91c0Nvb3JkcyA9IGN1cnJlbnRDb29yZDtcbiAgICAgICAgfVxuICAgICAgKSA9PT0gZmFsc2VcbiAgICApXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBzZWdtZW50UmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgc2VnbWVudFJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHtGZWF0dXJlPExpbmVTdHJpbmc+fSBjdXJyZW50U2VnbWVudCBUaGUgY3VycmVudCBTZWdtZW50IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBnZW9tZXRyeUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gc2VnbWVudEluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBTZWdtZW50IGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSAyLXZlcnRleCBsaW5lIHNlZ21lbnQgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LnJlZHVjZSgpXG4gKiAoTXVsdGkpUG9pbnQgZ2VvbWV0cmllcyBkbyBub3QgY29udGFpbiBzZWdtZW50cyB0aGVyZWZvcmUgdGhleSBhcmUgaWdub3JlZCBkdXJpbmcgdGhpcyBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50U2VnbWVudCwgY3VycmVudEluZGV4KVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2x5Z29uID0gdHVyZi5wb2x5Z29uKFtbWy01MCwgNV0sIFstNDAsIC0xMF0sIFstNTAsIC0xMF0sIFstNDAsIDVdLCBbLTUwLCA1XV1dKTtcbiAqXG4gKiAvLyBJdGVyYXRlIG92ZXIgR2VvSlNPTiBieSAyLXZlcnRleCBzZWdtZW50c1xuICogdHVyZi5zZWdtZW50UmVkdWNlKHBvbHlnb24sIGZ1bmN0aW9uIChwcmV2aW91c1NlZ21lbnQsIGN1cnJlbnRTZWdtZW50LCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4LCBzZWdtZW50SW5kZXgpIHtcbiAqICAgLy89IHByZXZpb3VzU2VnbWVudFxuICogICAvLz0gY3VycmVudFNlZ21lbnRcbiAqICAgLy89IGZlYXR1cmVJbmRleFxuICogICAvLz0gbXVsdGlGZWF0dXJlSW5kZXhcbiAqICAgLy89IGdlb21ldHJ5SW5kZXhcbiAqICAgLy89IHNlZ21lbnRJbmRleFxuICogICByZXR1cm4gY3VycmVudFNlZ21lbnRcbiAqIH0pO1xuICpcbiAqIC8vIENhbGN1bGF0ZSB0aGUgdG90YWwgbnVtYmVyIG9mIHNlZ21lbnRzXG4gKiB2YXIgaW5pdGlhbFZhbHVlID0gMFxuICogdmFyIHRvdGFsID0gdHVyZi5zZWdtZW50UmVkdWNlKHBvbHlnb24sIGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlKSB7XG4gKiAgICAgcHJldmlvdXNWYWx1ZSsrO1xuICogICAgIHJldHVybiBwcmV2aW91c1ZhbHVlO1xuICogfSwgaW5pdGlhbFZhbHVlKTtcbiAqL1xuZnVuY3Rpb24gc2VnbWVudFJlZHVjZShnZW9qc29uLCBjYWxsYmFjaywgaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBwcmV2aW91c1ZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICB2YXIgc3RhcnRlZCA9IGZhbHNlO1xuICBzZWdtZW50RWFjaChcbiAgICBnZW9qc29uLFxuICAgIGZ1bmN0aW9uIChcbiAgICAgIGN1cnJlbnRTZWdtZW50LFxuICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICBnZW9tZXRyeUluZGV4LFxuICAgICAgc2VnbWVudEluZGV4XG4gICAgKSB7XG4gICAgICBpZiAoc3RhcnRlZCA9PT0gZmFsc2UgJiYgaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50U2VnbWVudDtcbiAgICAgIGVsc2VcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGNhbGxiYWNrKFxuICAgICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgICAgY3VycmVudFNlZ21lbnQsXG4gICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgIGdlb21ldHJ5SW5kZXgsXG4gICAgICAgICAgc2VnbWVudEluZGV4XG4gICAgICAgICk7XG4gICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICB9XG4gICk7XG4gIHJldHVybiBwcmV2aW91c1ZhbHVlO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBsaW5lRWFjaFxuICpcbiAqIEBjYWxsYmFjayBsaW5lRWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge0ZlYXR1cmU8TGluZVN0cmluZz59IGN1cnJlbnRMaW5lIFRoZSBjdXJyZW50IExpbmVTdHJpbmd8TGluZWFyUmluZyBiZWluZyBwcm9jZXNzZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlGZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIE11bHRpLUZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkXG4gKiBAcGFyYW0ge251bWJlcn0gZ2VvbWV0cnlJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgR2VvbWV0cnkgYmVpbmcgcHJvY2Vzc2VkXG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgbGluZSBvciByaW5nIGNvb3JkaW5hdGVzIGluIExpbmVTdHJpbmcsIFBvbHlnb24sIE11bHRpTGluZVN0cmluZywgTXVsdGlQb2x5Z29uIEZlYXR1cmVzIG9yIEdlb21ldHJpZXMsXG4gKiBzaW1pbGFyIHRvIEFycmF5LmZvckVhY2guXG4gKlxuICogQG5hbWUgbGluZUVhY2hcbiAqIEBwYXJhbSB7R2VvbWV0cnl8RmVhdHVyZTxMaW5lU3RyaW5nfFBvbHlnb258TXVsdGlMaW5lU3RyaW5nfE11bHRpUG9seWdvbj59IGdlb2pzb24gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50TGluZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleClcbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlMaW5lID0gdHVyZi5tdWx0aUxpbmVTdHJpbmcoW1xuICogICBbWzI2LCAzN10sIFszNSwgNDVdXSxcbiAqICAgW1szNiwgNTNdLCBbMzgsIDUwXSwgWzQxLCA1NV1dXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmxpbmVFYWNoKG11bHRpTGluZSwgZnVuY3Rpb24gKGN1cnJlbnRMaW5lLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KSB7XG4gKiAgIC8vPWN1cnJlbnRMaW5lXG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1tdWx0aUZlYXR1cmVJbmRleFxuICogICAvLz1nZW9tZXRyeUluZGV4XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gbGluZUVhY2goZ2VvanNvbiwgY2FsbGJhY2spIHtcbiAgLy8gdmFsaWRhdGlvblxuICBpZiAoIWdlb2pzb24pIHRocm93IG5ldyBFcnJvcihcImdlb2pzb24gaXMgcmVxdWlyZWRcIik7XG5cbiAgZmxhdHRlbkVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpIHtcbiAgICBpZiAoZmVhdHVyZS5nZW9tZXRyeSA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIHZhciB0eXBlID0gZmVhdHVyZS5nZW9tZXRyeS50eXBlO1xuICAgIHZhciBjb29yZHMgPSBmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgaWYgKGNhbGxiYWNrKGZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIDAsIDApID09PSBmYWxzZSlcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgZm9yIChcbiAgICAgICAgICB2YXIgZ2VvbWV0cnlJbmRleCA9IDA7XG4gICAgICAgICAgZ2VvbWV0cnlJbmRleCA8IGNvb3Jkcy5sZW5ndGg7XG4gICAgICAgICAgZ2VvbWV0cnlJbmRleCsrXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICBsaW5lU3RyaW5nKGNvb3Jkc1tnZW9tZXRyeUluZGV4XSwgZmVhdHVyZS5wcm9wZXJ0aWVzKSxcbiAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgZ2VvbWV0cnlJbmRleFxuICAgICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgbGluZVJlZHVjZVxuICpcbiAqIFRoZSBmaXJzdCB0aW1lIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZSB2YWx1ZXMgcHJvdmlkZWQgYXMgYXJndW1lbnRzIGRlcGVuZFxuICogb24gd2hldGhlciB0aGUgcmVkdWNlIG1ldGhvZCBoYXMgYW4gaW5pdGlhbFZhbHVlIGFyZ3VtZW50LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBwcm92aWRlZCB0byB0aGUgcmVkdWNlIG1ldGhvZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIGluaXRpYWxWYWx1ZS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBub3QgcHJvdmlkZWQ6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgc2Vjb25kIGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogQGNhbGxiYWNrIGxpbmVSZWR1Y2VDYWxsYmFja1xuICogQHBhcmFtIHsqfSBwcmV2aW91c1ZhbHVlIFRoZSBhY2N1bXVsYXRlZCB2YWx1ZSBwcmV2aW91c2x5IHJldHVybmVkIGluIHRoZSBsYXN0IGludm9jYXRpb25cbiAqIG9mIHRoZSBjYWxsYmFjaywgb3IgaW5pdGlhbFZhbHVlLCBpZiBzdXBwbGllZC5cbiAqIEBwYXJhbSB7RmVhdHVyZTxMaW5lU3RyaW5nPn0gY3VycmVudExpbmUgVGhlIGN1cnJlbnQgTGluZVN0cmluZ3xMaW5lYXJSaW5nIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlGZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIE11bHRpLUZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkXG4gKiBAcGFyYW0ge251bWJlcn0gZ2VvbWV0cnlJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgR2VvbWV0cnkgYmVpbmcgcHJvY2Vzc2VkXG4gKi9cblxuLyoqXG4gKiBSZWR1Y2UgZmVhdHVyZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LnJlZHVjZSgpLlxuICpcbiAqIEBuYW1lIGxpbmVSZWR1Y2VcbiAqIEBwYXJhbSB7R2VvbWV0cnl8RmVhdHVyZTxMaW5lU3RyaW5nfFBvbHlnb258TXVsdGlMaW5lU3RyaW5nfE11bHRpUG9seWdvbj59IGdlb2pzb24gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50TGluZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleClcbiAqIEBwYXJhbSB7Kn0gW2luaXRpYWxWYWx1ZV0gVmFsdWUgdG8gdXNlIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgZmlyc3QgY2FsbCBvZiB0aGUgY2FsbGJhY2suXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHZhbHVlIHRoYXQgcmVzdWx0cyBmcm9tIHRoZSByZWR1Y3Rpb24uXG4gKiBAZXhhbXBsZVxuICogdmFyIG11bHRpUG9seSA9IHR1cmYubXVsdGlQb2x5Z29uKFtcbiAqICAgdHVyZi5wb2x5Z29uKFtbWzEyLDQ4XSxbMiw0MV0sWzI0LDM4XSxbMTIsNDhdXSwgW1s5LDQ0XSxbMTMsNDFdLFsxMyw0NV0sWzksNDRdXV0pLFxuICogICB0dXJmLnBvbHlnb24oW1tbNSwgNV0sIFswLCAwXSwgWzIsIDJdLCBbNCwgNF0sIFs1LCA1XV1dKVxuICogXSk7XG4gKlxuICogdHVyZi5saW5lUmVkdWNlKG11bHRpUG9seSwgZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRMaW5lLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KSB7XG4gKiAgIC8vPXByZXZpb3VzVmFsdWVcbiAqICAgLy89Y3VycmVudExpbmVcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPW11bHRpRmVhdHVyZUluZGV4XG4gKiAgIC8vPWdlb21ldHJ5SW5kZXhcbiAqICAgcmV0dXJuIGN1cnJlbnRMaW5lXG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gbGluZVJlZHVjZShnZW9qc29uLCBjYWxsYmFjaywgaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBwcmV2aW91c1ZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICBsaW5lRWFjaChcbiAgICBnZW9qc29uLFxuICAgIGZ1bmN0aW9uIChjdXJyZW50TGluZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleCkge1xuICAgICAgaWYgKGZlYXR1cmVJbmRleCA9PT0gMCAmJiBpbml0aWFsVmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGN1cnJlbnRMaW5lO1xuICAgICAgZWxzZVxuICAgICAgICBwcmV2aW91c1ZhbHVlID0gY2FsbGJhY2soXG4gICAgICAgICAgcHJldmlvdXNWYWx1ZSxcbiAgICAgICAgICBjdXJyZW50TGluZSxcbiAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICAgICAgZ2VvbWV0cnlJbmRleFxuICAgICAgICApO1xuICAgIH1cbiAgKTtcbiAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG59XG5cbi8qKlxuICogRmluZHMgYSBwYXJ0aWN1bGFyIDItdmVydGV4IExpbmVTdHJpbmcgU2VnbWVudCBmcm9tIGEgR2VvSlNPTiB1c2luZyBgQHR1cmYvbWV0YWAgaW5kZXhlcy5cbiAqXG4gKiBOZWdhdGl2ZSBpbmRleGVzIGFyZSBwZXJtaXR0ZWQuXG4gKiBQb2ludCAmIE11bHRpUG9pbnQgd2lsbCBhbHdheXMgcmV0dXJuIG51bGwuXG4gKlxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIEFueSBHZW9KU09OIEZlYXR1cmUgb3IgR2VvbWV0cnlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmZlYXR1cmVJbmRleD0wXSBGZWF0dXJlIEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubXVsdGlGZWF0dXJlSW5kZXg9MF0gTXVsdGktRmVhdHVyZSBJbmRleFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmdlb21ldHJ5SW5kZXg9MF0gR2VvbWV0cnkgSW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5zZWdtZW50SW5kZXg9MF0gU2VnbWVudCBJbmRleFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLnByb3BlcnRpZXM9e31dIFRyYW5zbGF0ZSBQcm9wZXJ0aWVzIHRvIG91dHB1dCBMaW5lU3RyaW5nXG4gKiBAcGFyYW0ge0JCb3h9IFtvcHRpb25zLmJib3g9e31dIFRyYW5zbGF0ZSBCQm94IHRvIG91dHB1dCBMaW5lU3RyaW5nXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IFtvcHRpb25zLmlkPXt9XSBUcmFuc2xhdGUgSWQgdG8gb3V0cHV0IExpbmVTdHJpbmdcbiAqIEByZXR1cm5zIHtGZWF0dXJlPExpbmVTdHJpbmc+fSAyLXZlcnRleCBHZW9KU09OIEZlYXR1cmUgTGluZVN0cmluZ1xuICogQGV4YW1wbGVcbiAqIHZhciBtdWx0aUxpbmUgPSB0dXJmLm11bHRpTGluZVN0cmluZyhbXG4gKiAgICAgW1sxMCwgMTBdLCBbNTAsIDMwXSwgWzMwLCA0MF1dLFxuICogICAgIFtbLTEwLCAtMTBdLCBbLTUwLCAtMzBdLCBbLTMwLCAtNDBdXVxuICogXSk7XG4gKlxuICogLy8gRmlyc3QgU2VnbWVudCAoZGVmYXVsdHMgYXJlIDApXG4gKiB0dXJmLmZpbmRTZWdtZW50KG11bHRpTGluZSk7XG4gKiAvLyA9PiBGZWF0dXJlPExpbmVTdHJpbmc8W1sxMCwgMTBdLCBbNTAsIDMwXV0+PlxuICpcbiAqIC8vIEZpcnN0IFNlZ21lbnQgb2YgMm5kIE11bHRpIEZlYXR1cmVcbiAqIHR1cmYuZmluZFNlZ21lbnQobXVsdGlMaW5lLCB7bXVsdGlGZWF0dXJlSW5kZXg6IDF9KTtcbiAqIC8vID0+IEZlYXR1cmU8TGluZVN0cmluZzxbWy0xMCwgLTEwXSwgWy01MCwgLTMwXV0+PlxuICpcbiAqIC8vIExhc3QgU2VnbWVudCBvZiBMYXN0IE11bHRpIEZlYXR1cmVcbiAqIHR1cmYuZmluZFNlZ21lbnQobXVsdGlMaW5lLCB7bXVsdGlGZWF0dXJlSW5kZXg6IC0xLCBzZWdtZW50SW5kZXg6IC0xfSk7XG4gKiAvLyA9PiBGZWF0dXJlPExpbmVTdHJpbmc8W1stNTAsIC0zMF0sIFstMzAsIC00MF1dPj5cbiAqL1xuZnVuY3Rpb24gZmluZFNlZ21lbnQoZ2VvanNvbiwgb3B0aW9ucykge1xuICAvLyBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBpZiAoIWlzT2JqZWN0KG9wdGlvbnMpKSB0aHJvdyBuZXcgRXJyb3IoXCJvcHRpb25zIGlzIGludmFsaWRcIik7XG4gIHZhciBmZWF0dXJlSW5kZXggPSBvcHRpb25zLmZlYXR1cmVJbmRleCB8fCAwO1xuICB2YXIgbXVsdGlGZWF0dXJlSW5kZXggPSBvcHRpb25zLm11bHRpRmVhdHVyZUluZGV4IHx8IDA7XG4gIHZhciBnZW9tZXRyeUluZGV4ID0gb3B0aW9ucy5nZW9tZXRyeUluZGV4IHx8IDA7XG4gIHZhciBzZWdtZW50SW5kZXggPSBvcHRpb25zLnNlZ21lbnRJbmRleCB8fCAwO1xuXG4gIC8vIEZpbmQgRmVhdHVyZUluZGV4XG4gIHZhciBwcm9wZXJ0aWVzID0gb3B0aW9ucy5wcm9wZXJ0aWVzO1xuICB2YXIgZ2VvbWV0cnk7XG5cbiAgc3dpdGNoIChnZW9qc29uLnR5cGUpIHtcbiAgICBjYXNlIFwiRmVhdHVyZUNvbGxlY3Rpb25cIjpcbiAgICAgIGlmIChmZWF0dXJlSW5kZXggPCAwKVxuICAgICAgICBmZWF0dXJlSW5kZXggPSBnZW9qc29uLmZlYXR1cmVzLmxlbmd0aCArIGZlYXR1cmVJbmRleDtcbiAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IGdlb2pzb24uZmVhdHVyZXNbZmVhdHVyZUluZGV4XS5wcm9wZXJ0aWVzO1xuICAgICAgZ2VvbWV0cnkgPSBnZW9qc29uLmZlYXR1cmVzW2ZlYXR1cmVJbmRleF0uZ2VvbWV0cnk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiRmVhdHVyZVwiOlxuICAgICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwgZ2VvanNvbi5wcm9wZXJ0aWVzO1xuICAgICAgZ2VvbWV0cnkgPSBnZW9qc29uLmdlb21ldHJ5O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIlBvaW50XCI6XG4gICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgIHJldHVybiBudWxsO1xuICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6XG4gICAgY2FzZSBcIk11bHRpUG9seWdvblwiOlxuICAgICAgZ2VvbWV0cnkgPSBnZW9qc29uO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImdlb2pzb24gaXMgaW52YWxpZFwiKTtcbiAgfVxuXG4gIC8vIEZpbmQgU2VnbWVudEluZGV4XG4gIGlmIChnZW9tZXRyeSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gIHZhciBjb29yZHMgPSBnZW9tZXRyeS5jb29yZGluYXRlcztcbiAgc3dpdGNoIChnZW9tZXRyeS50eXBlKSB7XG4gICAgY2FzZSBcIlBvaW50XCI6XG4gICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgIHJldHVybiBudWxsO1xuICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgICBpZiAoc2VnbWVudEluZGV4IDwgMCkgc2VnbWVudEluZGV4ID0gY29vcmRzLmxlbmd0aCArIHNlZ21lbnRJbmRleCAtIDE7XG4gICAgICByZXR1cm4gbGluZVN0cmluZyhcbiAgICAgICAgW2Nvb3Jkc1tzZWdtZW50SW5kZXhdLCBjb29yZHNbc2VnbWVudEluZGV4ICsgMV1dLFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICBpZiAoZ2VvbWV0cnlJbmRleCA8IDApIGdlb21ldHJ5SW5kZXggPSBjb29yZHMubGVuZ3RoICsgZ2VvbWV0cnlJbmRleDtcbiAgICAgIGlmIChzZWdtZW50SW5kZXggPCAwKVxuICAgICAgICBzZWdtZW50SW5kZXggPSBjb29yZHNbZ2VvbWV0cnlJbmRleF0ubGVuZ3RoICsgc2VnbWVudEluZGV4IC0gMTtcbiAgICAgIHJldHVybiBsaW5lU3RyaW5nKFxuICAgICAgICBbXG4gICAgICAgICAgY29vcmRzW2dlb21ldHJ5SW5kZXhdW3NlZ21lbnRJbmRleF0sXG4gICAgICAgICAgY29vcmRzW2dlb21ldHJ5SW5kZXhdW3NlZ21lbnRJbmRleCArIDFdLFxuICAgICAgICBdLFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIGNhc2UgXCJNdWx0aUxpbmVTdHJpbmdcIjpcbiAgICAgIGlmIChtdWx0aUZlYXR1cmVJbmRleCA8IDApXG4gICAgICAgIG11bHRpRmVhdHVyZUluZGV4ID0gY29vcmRzLmxlbmd0aCArIG11bHRpRmVhdHVyZUluZGV4O1xuICAgICAgaWYgKHNlZ21lbnRJbmRleCA8IDApXG4gICAgICAgIHNlZ21lbnRJbmRleCA9IGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF0ubGVuZ3RoICsgc2VnbWVudEluZGV4IC0gMTtcbiAgICAgIHJldHVybiBsaW5lU3RyaW5nKFxuICAgICAgICBbXG4gICAgICAgICAgY29vcmRzW211bHRpRmVhdHVyZUluZGV4XVtzZWdtZW50SW5kZXhdLFxuICAgICAgICAgIGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bc2VnbWVudEluZGV4ICsgMV0sXG4gICAgICAgIF0sXG4gICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gICAgY2FzZSBcIk11bHRpUG9seWdvblwiOlxuICAgICAgaWYgKG11bHRpRmVhdHVyZUluZGV4IDwgMClcbiAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXggPSBjb29yZHMubGVuZ3RoICsgbXVsdGlGZWF0dXJlSW5kZXg7XG4gICAgICBpZiAoZ2VvbWV0cnlJbmRleCA8IDApXG4gICAgICAgIGdlb21ldHJ5SW5kZXggPSBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdLmxlbmd0aCArIGdlb21ldHJ5SW5kZXg7XG4gICAgICBpZiAoc2VnbWVudEluZGV4IDwgMClcbiAgICAgICAgc2VnbWVudEluZGV4ID1cbiAgICAgICAgICBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdW2dlb21ldHJ5SW5kZXhdLmxlbmd0aCAtIHNlZ21lbnRJbmRleCAtIDE7XG4gICAgICByZXR1cm4gbGluZVN0cmluZyhcbiAgICAgICAgW1xuICAgICAgICAgIGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bZ2VvbWV0cnlJbmRleF1bc2VnbWVudEluZGV4XSxcbiAgICAgICAgICBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdW2dlb21ldHJ5SW5kZXhdW3NlZ21lbnRJbmRleCArIDFdLFxuICAgICAgICBdLFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcImdlb2pzb24gaXMgaW52YWxpZFwiKTtcbn1cblxuLyoqXG4gKiBGaW5kcyBhIHBhcnRpY3VsYXIgUG9pbnQgZnJvbSBhIEdlb0pTT04gdXNpbmcgYEB0dXJmL21ldGFgIGluZGV4ZXMuXG4gKlxuICogTmVnYXRpdmUgaW5kZXhlcyBhcmUgcGVybWl0dGVkLlxuICpcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBBbnkgR2VvSlNPTiBGZWF0dXJlIG9yIEdlb21ldHJ5XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5mZWF0dXJlSW5kZXg9MF0gRmVhdHVyZSBJbmRleFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm11bHRpRmVhdHVyZUluZGV4PTBdIE11bHRpLUZlYXR1cmUgSW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5nZW9tZXRyeUluZGV4PTBdIEdlb21ldHJ5IEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuY29vcmRJbmRleD0wXSBDb29yZCBJbmRleFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLnByb3BlcnRpZXM9e31dIFRyYW5zbGF0ZSBQcm9wZXJ0aWVzIHRvIG91dHB1dCBQb2ludFxuICogQHBhcmFtIHtCQm94fSBbb3B0aW9ucy5iYm94PXt9XSBUcmFuc2xhdGUgQkJveCB0byBvdXRwdXQgUG9pbnRcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gW29wdGlvbnMuaWQ9e31dIFRyYW5zbGF0ZSBJZCB0byBvdXRwdXQgUG9pbnRcbiAqIEByZXR1cm5zIHtGZWF0dXJlPFBvaW50Pn0gMi12ZXJ0ZXggR2VvSlNPTiBGZWF0dXJlIFBvaW50XG4gKiBAZXhhbXBsZVxuICogdmFyIG11bHRpTGluZSA9IHR1cmYubXVsdGlMaW5lU3RyaW5nKFtcbiAqICAgICBbWzEwLCAxMF0sIFs1MCwgMzBdLCBbMzAsIDQwXV0sXG4gKiAgICAgW1stMTAsIC0xMF0sIFstNTAsIC0zMF0sIFstMzAsIC00MF1dXG4gKiBdKTtcbiAqXG4gKiAvLyBGaXJzdCBTZWdtZW50IChkZWZhdWx0cyBhcmUgMClcbiAqIHR1cmYuZmluZFBvaW50KG11bHRpTGluZSk7XG4gKiAvLyA9PiBGZWF0dXJlPFBvaW50PFsxMCwgMTBdPj5cbiAqXG4gKiAvLyBGaXJzdCBTZWdtZW50IG9mIHRoZSAybmQgTXVsdGktRmVhdHVyZVxuICogdHVyZi5maW5kUG9pbnQobXVsdGlMaW5lLCB7bXVsdGlGZWF0dXJlSW5kZXg6IDF9KTtcbiAqIC8vID0+IEZlYXR1cmU8UG9pbnQ8Wy0xMCwgLTEwXT4+XG4gKlxuICogLy8gTGFzdCBTZWdtZW50IG9mIGxhc3QgTXVsdGktRmVhdHVyZVxuICogdHVyZi5maW5kUG9pbnQobXVsdGlMaW5lLCB7bXVsdGlGZWF0dXJlSW5kZXg6IC0xLCBjb29yZEluZGV4OiAtMX0pO1xuICogLy8gPT4gRmVhdHVyZTxQb2ludDxbLTMwLCAtNDBdPj5cbiAqL1xuZnVuY3Rpb24gZmluZFBvaW50KGdlb2pzb24sIG9wdGlvbnMpIHtcbiAgLy8gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKCFpc09iamVjdChvcHRpb25zKSkgdGhyb3cgbmV3IEVycm9yKFwib3B0aW9ucyBpcyBpbnZhbGlkXCIpO1xuICB2YXIgZmVhdHVyZUluZGV4ID0gb3B0aW9ucy5mZWF0dXJlSW5kZXggfHwgMDtcbiAgdmFyIG11bHRpRmVhdHVyZUluZGV4ID0gb3B0aW9ucy5tdWx0aUZlYXR1cmVJbmRleCB8fCAwO1xuICB2YXIgZ2VvbWV0cnlJbmRleCA9IG9wdGlvbnMuZ2VvbWV0cnlJbmRleCB8fCAwO1xuICB2YXIgY29vcmRJbmRleCA9IG9wdGlvbnMuY29vcmRJbmRleCB8fCAwO1xuXG4gIC8vIEZpbmQgRmVhdHVyZUluZGV4XG4gIHZhciBwcm9wZXJ0aWVzID0gb3B0aW9ucy5wcm9wZXJ0aWVzO1xuICB2YXIgZ2VvbWV0cnk7XG5cbiAgc3dpdGNoIChnZW9qc29uLnR5cGUpIHtcbiAgICBjYXNlIFwiRmVhdHVyZUNvbGxlY3Rpb25cIjpcbiAgICAgIGlmIChmZWF0dXJlSW5kZXggPCAwKVxuICAgICAgICBmZWF0dXJlSW5kZXggPSBnZW9qc29uLmZlYXR1cmVzLmxlbmd0aCArIGZlYXR1cmVJbmRleDtcbiAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IGdlb2pzb24uZmVhdHVyZXNbZmVhdHVyZUluZGV4XS5wcm9wZXJ0aWVzO1xuICAgICAgZ2VvbWV0cnkgPSBnZW9qc29uLmZlYXR1cmVzW2ZlYXR1cmVJbmRleF0uZ2VvbWV0cnk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiRmVhdHVyZVwiOlxuICAgICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwgZ2VvanNvbi5wcm9wZXJ0aWVzO1xuICAgICAgZ2VvbWV0cnkgPSBnZW9qc29uLmdlb21ldHJ5O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIlBvaW50XCI6XG4gICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgIHJldHVybiBudWxsO1xuICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6XG4gICAgY2FzZSBcIk11bHRpUG9seWdvblwiOlxuICAgICAgZ2VvbWV0cnkgPSBnZW9qc29uO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImdlb2pzb24gaXMgaW52YWxpZFwiKTtcbiAgfVxuXG4gIC8vIEZpbmQgQ29vcmQgSW5kZXhcbiAgaWYgKGdlb21ldHJ5ID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgdmFyIGNvb3JkcyA9IGdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICBzd2l0Y2ggKGdlb21ldHJ5LnR5cGUpIHtcbiAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICAgIHJldHVybiBwb2ludChjb29yZHMsIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6XG4gICAgICBpZiAobXVsdGlGZWF0dXJlSW5kZXggPCAwKVxuICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBtdWx0aUZlYXR1cmVJbmRleDtcbiAgICAgIHJldHVybiBwb2ludChjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgaWYgKGNvb3JkSW5kZXggPCAwKSBjb29yZEluZGV4ID0gY29vcmRzLmxlbmd0aCArIGNvb3JkSW5kZXg7XG4gICAgICByZXR1cm4gcG9pbnQoY29vcmRzW2Nvb3JkSW5kZXhdLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgaWYgKGdlb21ldHJ5SW5kZXggPCAwKSBnZW9tZXRyeUluZGV4ID0gY29vcmRzLmxlbmd0aCArIGdlb21ldHJ5SW5kZXg7XG4gICAgICBpZiAoY29vcmRJbmRleCA8IDApXG4gICAgICAgIGNvb3JkSW5kZXggPSBjb29yZHNbZ2VvbWV0cnlJbmRleF0ubGVuZ3RoICsgY29vcmRJbmRleDtcbiAgICAgIHJldHVybiBwb2ludChjb29yZHNbZ2VvbWV0cnlJbmRleF1bY29vcmRJbmRleF0sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJNdWx0aUxpbmVTdHJpbmdcIjpcbiAgICAgIGlmIChtdWx0aUZlYXR1cmVJbmRleCA8IDApXG4gICAgICAgIG11bHRpRmVhdHVyZUluZGV4ID0gY29vcmRzLmxlbmd0aCArIG11bHRpRmVhdHVyZUluZGV4O1xuICAgICAgaWYgKGNvb3JkSW5kZXggPCAwKVxuICAgICAgICBjb29yZEluZGV4ID0gY29vcmRzW211bHRpRmVhdHVyZUluZGV4XS5sZW5ndGggKyBjb29yZEluZGV4O1xuICAgICAgcmV0dXJuIHBvaW50KGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bY29vcmRJbmRleF0sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgIGlmIChtdWx0aUZlYXR1cmVJbmRleCA8IDApXG4gICAgICAgIG11bHRpRmVhdHVyZUluZGV4ID0gY29vcmRzLmxlbmd0aCArIG11bHRpRmVhdHVyZUluZGV4O1xuICAgICAgaWYgKGdlb21ldHJ5SW5kZXggPCAwKVxuICAgICAgICBnZW9tZXRyeUluZGV4ID0gY29vcmRzW211bHRpRmVhdHVyZUluZGV4XS5sZW5ndGggKyBnZW9tZXRyeUluZGV4O1xuICAgICAgaWYgKGNvb3JkSW5kZXggPCAwKVxuICAgICAgICBjb29yZEluZGV4ID1cbiAgICAgICAgICBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdW2dlb21ldHJ5SW5kZXhdLmxlbmd0aCAtIGNvb3JkSW5kZXg7XG4gICAgICByZXR1cm4gcG9pbnQoXG4gICAgICAgIGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bZ2VvbWV0cnlJbmRleF1bY29vcmRJbmRleF0sXG4gICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFwiZ2VvanNvbiBpcyBpbnZhbGlkXCIpO1xufVxuXG5leHBvcnQgeyBjb29yZEFsbCwgY29vcmRFYWNoLCBjb29yZFJlZHVjZSwgZmVhdHVyZUVhY2gsIGZlYXR1cmVSZWR1Y2UsIGZpbmRQb2ludCwgZmluZFNlZ21lbnQsIGZsYXR0ZW5FYWNoLCBmbGF0dGVuUmVkdWNlLCBnZW9tRWFjaCwgZ2VvbVJlZHVjZSwgbGluZUVhY2gsIGxpbmVSZWR1Y2UsIHByb3BFYWNoLCBwcm9wUmVkdWNlLCBzZWdtZW50RWFjaCwgc2VnbWVudFJlZHVjZSB9O1xuIiwiaW1wb3J0IHsgZmVhdHVyZUNvbGxlY3Rpb24sIGxpbmVTdHJpbmcsIG11bHRpTGluZVN0cmluZyB9IGZyb20gXCJAdHVyZi9oZWxwZXJzXCI7XG5pbXBvcnQgeyBnZXRHZW9tIH0gZnJvbSBcIkB0dXJmL2ludmFyaWFudFwiO1xuLyoqXG4gKiBDb252ZXJ0cyBhIHtAbGluayBQb2x5Z29ufSB0byB7QGxpbmsgTGluZVN0cmluZ3woTXVsdGkpTGluZVN0cmluZ30gb3Ige0BsaW5rIE11bHRpUG9seWdvbn0gdG8gYVxuICoge0BsaW5rIEZlYXR1cmVDb2xsZWN0aW9ufSBvZiB7QGxpbmsgTGluZVN0cmluZ3woTXVsdGkpTGluZVN0cmluZ30uXG4gKlxuICogQG5hbWUgcG9seWdvblRvTGluZVxuICogQHBhcmFtIHtGZWF0dXJlPFBvbHlnb258TXVsdGlQb2x5Z29uPn0gcG9seSBGZWF0dXJlIHRvIGNvbnZlcnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLnByb3BlcnRpZXM9e31dIHRyYW5zbGF0ZXMgR2VvSlNPTiBwcm9wZXJ0aWVzIHRvIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlPExpbmVTdHJpbmd8TXVsdGlMaW5lc3RyaW5nPn0gY29udmVydGVkIChNdWx0aSlQb2x5Z29uIHRvIChNdWx0aSlMaW5lU3RyaW5nXG4gKiBAZXhhbXBsZVxuICogdmFyIHBvbHkgPSB0dXJmLnBvbHlnb24oW1tbMTI1LCAtMzBdLCBbMTQ1LCAtMzBdLCBbMTQ1LCAtMjBdLCBbMTI1LCAtMjBdLCBbMTI1LCAtMzBdXV0pO1xuICpcbiAqIHZhciBsaW5lID0gdHVyZi5wb2x5Z29uVG9MaW5lKHBvbHkpO1xuICpcbiAqIC8vYWRkVG9NYXBcbiAqIHZhciBhZGRUb01hcCA9IFtsaW5lXTtcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHBvbHksIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBnZW9tID0gZ2V0R2VvbShwb2x5KTtcbiAgICBpZiAoIW9wdGlvbnMucHJvcGVydGllcyAmJiBwb2x5LnR5cGUgPT09IFwiRmVhdHVyZVwiKSB7XG4gICAgICAgIG9wdGlvbnMucHJvcGVydGllcyA9IHBvbHkucHJvcGVydGllcztcbiAgICB9XG4gICAgc3dpdGNoIChnZW9tLnR5cGUpIHtcbiAgICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgICAgIHJldHVybiBwb2x5Z29uVG9MaW5lKGdlb20sIG9wdGlvbnMpO1xuICAgICAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6XG4gICAgICAgICAgICByZXR1cm4gbXVsdGlQb2x5Z29uVG9MaW5lKGdlb20sIG9wdGlvbnMpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBwb2x5XCIpO1xuICAgIH1cbn1cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBvbHlnb25Ub0xpbmUocG9seSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIGdlb20gPSBnZXRHZW9tKHBvbHkpO1xuICAgIHZhciBjb29yZHMgPSBnZW9tLmNvb3JkaW5hdGVzO1xuICAgIHZhciBwcm9wZXJ0aWVzID0gb3B0aW9ucy5wcm9wZXJ0aWVzXG4gICAgICAgID8gb3B0aW9ucy5wcm9wZXJ0aWVzXG4gICAgICAgIDogcG9seS50eXBlID09PSBcIkZlYXR1cmVcIlxuICAgICAgICAgICAgPyBwb2x5LnByb3BlcnRpZXNcbiAgICAgICAgICAgIDoge307XG4gICAgcmV0dXJuIGNvb3Jkc1RvTGluZShjb29yZHMsIHByb3BlcnRpZXMpO1xufVxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlQb2x5Z29uVG9MaW5lKG11bHRpUG9seSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIGdlb20gPSBnZXRHZW9tKG11bHRpUG9seSk7XG4gICAgdmFyIGNvb3JkcyA9IGdlb20uY29vcmRpbmF0ZXM7XG4gICAgdmFyIHByb3BlcnRpZXMgPSBvcHRpb25zLnByb3BlcnRpZXNcbiAgICAgICAgPyBvcHRpb25zLnByb3BlcnRpZXNcbiAgICAgICAgOiBtdWx0aVBvbHkudHlwZSA9PT0gXCJGZWF0dXJlXCJcbiAgICAgICAgICAgID8gbXVsdGlQb2x5LnByb3BlcnRpZXNcbiAgICAgICAgICAgIDoge307XG4gICAgdmFyIGxpbmVzID0gW107XG4gICAgY29vcmRzLmZvckVhY2goZnVuY3Rpb24gKGNvb3JkKSB7XG4gICAgICAgIGxpbmVzLnB1c2goY29vcmRzVG9MaW5lKGNvb3JkLCBwcm9wZXJ0aWVzKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKGxpbmVzKTtcbn1cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvb3Jkc1RvTGluZShjb29yZHMsIHByb3BlcnRpZXMpIHtcbiAgICBpZiAoY29vcmRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcmV0dXJuIG11bHRpTGluZVN0cmluZyhjb29yZHMsIHByb3BlcnRpZXMpO1xuICAgIH1cbiAgICByZXR1cm4gbGluZVN0cmluZyhjb29yZHNbMF0sIHByb3BlcnRpZXMpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vTGVhZmxldC5BbG1vc3RPdmVyL3NyYy9sZWFmbGV0LmFsbW9zdG92ZXIuanNcIjtcclxuaW1wb3J0IFwiLi9sZWFmbGV0LWRyYXctdG9vbGJhci9sZWFmbGV0LmRyYXctdG9vbGJhci5qc1wiO1xyXG5pbXBvcnQgXCIuL2xlYWZsZXQtZHJhdy10b29sYmFyL2xlYWZsZXQuZHJhdy10b29sYmFyLmNzc1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICBwb2x5Z29uIGFzIHR1cmZQb2x5LFxyXG4gIGxpbmVTdHJpbmcgYXMgdHVyZkxpbmVTdHJpbmcsXHJcbiAgbXVsdGlMaW5lU3RyaW5nIGFzIHR1cmZNdWx0aUxpbmVTdHJpbmcsXHJcbn0gZnJvbSBcIkB0dXJmL2hlbHBlcnNcIjtcclxuXHJcbmltcG9ydCBib29sZWFuSW50ZXJzZWN0cyBmcm9tIFwiQHR1cmYvYm9vbGVhbi1pbnRlcnNlY3RzXCI7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEwuRHJhdy5UcmFjZVxyXG4gKiBAYWthIERyYXcuVHJhY2VcclxuICogQGluaGVyaXRzIEwuRHJhdy5UcmFjZVxyXG4gKi9cclxuTC5EcmF3LlRyYWNlID0gTC5EcmF3LlBvbHlsaW5lLmV4dGVuZCh7XHJcbiAgc3RhdGljczoge1xyXG4gICAgVFlQRTogXCJ0cmFjZVwiLFxyXG4gIH0sXHJcbiAgLy9UT0RPIGkgb25seSB3YW50IHRvIGVkaXQgc2hhcGVPcHRpb25zLCB0aGUgcmVzdCBuZWVkIG5vdCBiZSBjb3BpZWQgb3ZlclxyXG4gIG9wdGlvbnM6IHtcclxuICAgIGFsbG93SW50ZXJzZWN0aW9uOiB0cnVlLFxyXG4gICAgcmVwZWF0TW9kZTogZmFsc2UsXHJcbiAgICBkcmF3RXJyb3I6IHtcclxuICAgICAgY29sb3I6IFwiI2IwMGIwMFwiLFxyXG4gICAgICB0aW1lb3V0OiAyNTAwLFxyXG4gICAgfSxcclxuICAgIGljb246IG5ldyBMLkRpdkljb24oe1xyXG4gICAgICBpY29uU2l6ZTogbmV3IEwuUG9pbnQoOCwgOCksXHJcbiAgICAgIGNsYXNzTmFtZTogXCJsZWFmbGV0LWRpdi1pY29uIGxlYWZsZXQtZWRpdGluZy1pY29uXCIsXHJcbiAgICB9KSxcclxuICAgIHRvdWNoSWNvbjogbmV3IEwuRGl2SWNvbih7XHJcbiAgICAgIGljb25TaXplOiBuZXcgTC5Qb2ludCgyMCwgMjApLFxyXG4gICAgICBjbGFzc05hbWU6IFwibGVhZmxldC1kaXYtaWNvbiBsZWFmbGV0LWVkaXRpbmctaWNvbiBsZWFmbGV0LXRvdWNoLWljb25cIixcclxuICAgIH0pLFxyXG4gICAgZ3VpZGVsaW5lRGlzdGFuY2U6IDIwLFxyXG4gICAgbWF4R3VpZGVMaW5lTGVuZ3RoOiA0MDAwLFxyXG4gICAgc2hhcGVPcHRpb25zOiB7XHJcbiAgICAgIHN0cm9rZTogdHJ1ZSxcclxuICAgICAgY29sb3I6IFwicmVkXCIsXHJcbiAgICAgIHdlaWdodDogNCxcclxuICAgICAgb3BhY2l0eTogMC41LFxyXG4gICAgICBmaWxsOiBmYWxzZSxcclxuICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIG1ldHJpYzogdHJ1ZSwgLy8gV2hldGhlciB0byB1c2UgdGhlIG1ldHJpYyBtZWFzdXJlbWVudCBzeXN0ZW0gb3IgaW1wZXJpYWxcclxuICAgIGZlZXQ6IHRydWUsIC8vIFdoZW4gbm90IG1ldHJpYywgdG8gdXNlIGZlZXQgaW5zdGVhZCBvZiB5YXJkcyBmb3IgZGlzcGxheS5cclxuICAgIG5hdXRpYzogZmFsc2UsIC8vIFdoZW4gbm90IG1ldHJpYywgbm90IGZlZXQgdXNlIG5hdXRpYyBtaWxlIGZvciBkaXNwbGF5XHJcbiAgICB6SW5kZXhPZmZzZXQ6IDIwMDAsIC8vIFRoaXMgc2hvdWxkIGJlID4gdGhhbiB0aGUgaGlnaGVzdCB6LWluZGV4IGFueSBtYXAgbGF5ZXJzXHJcbiAgICBmYWN0b3I6IDEsIC8vIFRvIGNoYW5nZSBkaXN0YW5jZSBjYWxjdWxhdGlvblxyXG4gICAgbWF4UG9pbnRzOiAwLCAvLyBPbmNlIHRoaXMgbnVtYmVyIG9mIHBvaW50cyBhcmUgcGxhY2VkLCBmaW5pc2ggc2hhcGVcclxuICB9LFxyXG4gIC8vIEBtZXRob2QgaW5pdGlhbGl6ZSgpOiB2b2lkXHJcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG1hcCwgb3B0aW9ucykge1xyXG4gICAgTC5EcmF3LlBvbHlsaW5lLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgbWFwLCBvcHRpb25zKTtcclxuICAgIHRoaXMudHlwZSA9IEwuRHJhdy5UcmFjZS5UWVBFO1xyXG4gICAgdGhpcy5vcHRpb25zLmRyYXdFcnJvci5tZXNzYWdlID0gXCJZb3UgbXVzdCBkcmF3IG92ZXIgdGhlIHNlbGVjdGVkIGxpbmUuXCI7XHJcbiAgICAvL1RPRE86IE5vdCBzdXJlIGlmIHRoaXMgaWxsIGludGVyZmVyZSB3aXRoIG90aGVyIHBvbHlsaW5lIGRyYXdpbmdcclxuICB9LFxyXG5cclxuICBhZGRIb29rczogZnVuY3Rpb24gKCkge1xyXG4gICAgTC5EcmF3LlBvbHlsaW5lLnByb3RvdHlwZS5hZGRIb29rcy5jYWxsKHRoaXMpO1xyXG4gICAgdGhpcy5hbG1vc3RMYXRMbmcgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9tYXBcclxuICAgICAgLm9uKFwiYWxtb3N0Om1vdmVcIiwgdGhpcy5fYWxtb3N0TW92ZSwgdGhpcylcclxuICAgICAgLm9uKFwiYWxtb3N0Om91dFwiLCB0aGlzLl9hbG1vc3RPdXQsIHRoaXMpO1xyXG5cclxuICAgIC8vVE9ETzogc29ydCBob3cgdG8gc3RvcmUgbGF5ZXIgaWQgYW5kIHNlbGVjdCBtb3JlIG5pY2VseSBoZXJlXHJcbiAgICBsZXQgcztcclxuICAgIHRoaXMuX21hcC5lYWNoTGF5ZXIoZnVuY3Rpb24gKGxheWVyKSB7XHJcbiAgICAgIGlmIChsYXllci5vcHRpb25zLm5hbWUgJiYgbGF5ZXIub3B0aW9ucy5uYW1lID09IFwic2VsZWN0ZWRcIikge1xyXG4gICAgICAgIHMgPSBsYXllcjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gcztcclxuICAgIHRoaXMubGluZVR5cGUgPSBzLm9wdGlvbnMubGluZVR5cGU7XHJcbiAgICBpZiAodGhpcy5saW5lVHlwZSA9PSBcIk11bHRpTGluZVN0cmluZ1wiKSB7XHJcbiAgICAgIHRoaXMuZ2V0U2VnbWVudHMocyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXRTZWdtZW50czogZnVuY3Rpb24gKHMpIHtcclxuICAgIHRoaXMuc2VnbWVudHMgPSBzLmdldExhdExuZ3MoKS5tYXAoKGxsKSA9PiBMLnBvbHlsaW5lKGxsKSk7XHJcbiAgfSxcclxuICByZW1vdmVIb29rczogZnVuY3Rpb24gKCkge1xyXG4gICAgTC5EcmF3LlBvbHlnb24ucHJvdG90eXBlLnJlbW92ZUhvb2tzLmNhbGwodGhpcyk7XHJcbiAgICBkZWxldGUgdGhpcy5zZWxlY3RlZDtcclxuICAgIGRlbGV0ZSB0aGlzLmFsbW9zdExhdExuZztcclxuICAgIGRlbGV0ZSB0aGlzLnN0YXJ0UmF0aW87XHJcbiAgICBkZWxldGUgdGhpcy5saW5lc3RhcnQ7XHJcbiAgICBkZWxldGUgdGhpcy5fY2xpY2tIYW5kbGVkO1xyXG4gICAgZGVsZXRlIHRoaXMuX2Rpc2FibGVNYXJrZXJzO1xyXG4gICAgZGVsZXRlIHRoaXMuc2VnbWVudHM7XHJcbiAgICBkZWxldGUgdGhpcy5jbG9zZXN0O1xyXG4gICAgZGVsZXRlIHRoaXMubGluZVR5cGU7XHJcbiAgICB0aGlzLl9tYXBcclxuICAgICAgLm9mZihcImFsbW9zdDptb3ZlXCIsIHRoaXMuX2FsbW9zdE1vdmUsIHRoaXMpXHJcbiAgICAgIC5vZmYoXCJhbG1vc3Q6b3V0XCIsIHRoaXMuX2FsbW9zdE91dCwgdGhpcyk7XHJcbiAgfSxcclxuICBfYWxtb3N0T3V0OiBmdW5jdGlvbiAoZSkge1xyXG4gICAgdGhpcy5hbG1vc3RMYXRMbmcgPSBmYWxzZTtcclxuICB9LFxyXG4gIF9hbG1vc3RNb3ZlOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgdGhpcy5hbG1vc3RMYXRMbmcgPSBlLmxhdGxuZztcclxuICB9LFxyXG4gIC8vIEBtZXRob2QgYWRkVmVydGV4KCk6IHZvaWRcclxuICAvLyBBZGQgYSB2ZXJ0ZXggdG8gdGhlIGVuZCBvZiB0aGUgcG9seWxpbmVcclxuICBhZGRWZXJ0ZXg6IGZ1bmN0aW9uIChsYXRsbmcpIHtcclxuICAgIGNvbnN0IG1hcmtlcnNMZW5ndGggPSB0aGlzLl9tYXJrZXJzLmxlbmd0aDtcclxuXHJcbiAgICAvLyBtYXJrZXJzTGVuZ3RoIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIDIgYmVmb3JlIGludGVyc2VjdGlvbnMgY2FuIG9jY3VyICYmIG11c3QgaGF2ZSBsYXRsbmcgZnJvbSBkcmF3aW5nIGFsb25nIHNlbGVjdGVkXHJcbiAgICBpZiAoXHJcbiAgICAgIChtYXJrZXJzTGVuZ3RoID49IDIgJiZcclxuICAgICAgICAhdGhpcy5vcHRpb25zLmFsbG93SW50ZXJzZWN0aW9uICYmXHJcbiAgICAgICAgdGhpcy5fcG9seS5uZXdMYXRMbmdJbnRlcnNlY3RzKGxhdGxuZykpIHx8XHJcbiAgICAgICFsYXRsbmdcclxuICAgICkge1xyXG4gICAgICB0aGlzLl9zaG93RXJyb3JUb29sdGlwKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5fZXJyb3JTaG93bikge1xyXG4gICAgICB0aGlzLl9oaWRlRXJyb3JUb29sdGlwKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvL2dldCB0aGUgbGluZSByYXRpbyBvZiB0aGUgY3VycmVudCBwb2ludCwgYW5kIGdlbmVyYXRlIGFsbCBwb2ludHMgbmVlZGVkIHRvIGRyYXcgbGluZVxyXG4gICAgICBjb25zdCBlbmRSYXRpbyA9IEwuR2VvbWV0cnlVdGlsLmxvY2F0ZU9uTGluZShcclxuICAgICAgICB0aGlzLl9tYXAsXHJcbiAgICAgICAgdGhpcy5jbG9zZXN0LFxyXG4gICAgICAgIHRoaXMuYWxtb3N0TGF0TG5nXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IGV4dHJhY3Rpb24gPSBMLkdlb21ldHJ5VXRpbC5leHRyYWN0KFxyXG4gICAgICAgIHRoaXMuX21hcCxcclxuICAgICAgICB0aGlzLmNsb3Nlc3QsXHJcbiAgICAgICAgdGhpcy5zdGFydFJhdGlvLFxyXG4gICAgICAgIGVuZFJhdGlvXHJcbiAgICAgICk7XHJcblxyXG4gICAgICB0aGlzLl9tYXJrZXJzID0gZXh0cmFjdGlvbi5tYXAoKGUpID0+IHRoaXMuX2NyZWF0ZU1hcmtlcihlKSk7IC8vY3JlYXRlIG5ldyBtYXJrZXIgbGlzdCwgd2hpY2ggaXMgYWRkZWQgdG8gdGhlIG1hcFxyXG4gICAgICB0aGlzLl9wb2x5LnNldExhdExuZ3MoZXh0cmFjdGlvbik7IC8vc2V0IHRoZSBwb2ludHMgb2YgdGhlIGxpbmVcclxuXHJcbiAgICAgIGlmICh0aGlzLl9wb2x5LmdldExhdExuZ3MoKS5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICB0aGlzLl9tYXAuYWRkTGF5ZXIodGhpcy5fcG9seSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX3ZlcnRleENoYW5nZWQobGF0bG5nLCB0cnVlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9vbk1vdXNlTW92ZTogZnVuY3Rpb24gKGUpIHtcclxuICAgIEwuRHJhdy5Qb2x5bGluZS5wcm90b3R5cGUuX29uTW91c2VNb3ZlLmNhbGwodGhpcywgZSk7XHJcbiAgICAvL2FkZCBhIHZlcnRleCBvbiBtb3VzZSBtb3ZlIGlmIHNscmVhZHkgZHJhd2luZyBzdGFydGVkXHJcbiAgICBpZiAodGhpcy5saW5lU3RhcnQpIHtcclxuICAgICAgdGhpcy5hZGRWZXJ0ZXgodGhpcy5hbG1vc3RMYXRMbmcpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX29uTW91c2VEb3duOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy5fY2xpY2tIYW5kbGVkICYmXHJcbiAgICAgICF0aGlzLl90b3VjaEhhbmRsZWQgJiZcclxuICAgICAgIXRoaXMuX2Rpc2FibGVNYXJrZXJzICYmXHJcbiAgICAgIHRoaXMuYWxtb3N0TGF0TG5nICE9IGZhbHNlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5fbWFwLmRyYWdnaW5nLmRpc2FibGUoKTtcclxuICAgICAgdGhpcy5fb25Nb3VzZU1vdmUoZSk7XHJcbiAgICAgIHRoaXMuX2NsaWNrSGFuZGxlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuX2Rpc2FibGVOZXdNYXJrZXJzKCk7XHJcbiAgICAgIHRoaXMubGluZVN0YXJ0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jbG9zZXN0ID0gdGhpcy5fc2V0Q2xvc2VzdCgpO1xyXG4gICAgICB0aGlzLnN0YXJ0UmF0aW8gPSBMLkdlb21ldHJ5VXRpbC5sb2NhdGVPbkxpbmUoXHJcbiAgICAgICAgdGhpcy5fbWFwLFxyXG4gICAgICAgIHRoaXMuY2xvc2VzdCxcclxuICAgICAgICB0aGlzLmFsbW9zdExhdExuZ1xyXG4gICAgICApO1xyXG4gICAgICB0aGlzLl9zdGFydFBvaW50LmNhbGwodGhpcywgdGhpcy5hbG1vc3RMYXRMbmcubG5nLCB0aGlzLmFsbW9zdExhdExuZy5sYXQpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2xhdGxuZ1RvQXJyYXk6IGZ1bmN0aW9uIChsbHMpIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGxscykpIHJldHVybiBsbHMubWFwKChsbCkgPT4gdGhpcy5fbGF0bG5nVG9BcnJheShsbCkpO1xyXG4gICAgZWxzZSByZXR1cm4gW2xscy5sbmcsIGxscy5sYXRdO1xyXG4gIH0sXHJcbiAgX3NldENsb3Nlc3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLmxpbmVUeXBlID09IFwiTGluZVN0cmluZ1wiKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIEwuR2VvbWV0cnlVdGlsLmNsb3Nlc3RMYXllcihcclxuICAgICAgICB0aGlzLl9tYXAsXHJcbiAgICAgICAgdGhpcy5zZWdtZW50cyxcclxuICAgICAgICB0aGlzLmFsbW9zdExhdExuZ1xyXG4gICAgICApLmxheWVyO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIF9vbk1vdXNlVXA6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICBMLkRyYXcuUG9seWxpbmUucHJvdG90eXBlLl9vbk1vdXNlVXAuY2FsbCh0aGlzLCBlKTtcclxuICAgIHRoaXMuX21hcC5kcmFnZ2luZy5lbmFibGUoKTtcclxuICAgIHRoaXMubGluZVN0YXJ0ID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgLy9UT0RPOiB0aGlzIGZ1bmN0aW9uIGlzIGFuIGFic29sdXRlIG1lc3MgYW5kIGkgbmVlZCB0byBhZGRyZXNzIGl0XHJcbiAgX2VuZFBvaW50OiBmdW5jdGlvbiAoZSkge1xyXG4gICAgaWYgKHRoaXMuX21vdXNlRG93bk9yaWdpbikge1xyXG4gICAgICB0aGlzLmFkZFZlcnRleChlLmxhdGxuZyk7XHJcbiAgICAgIHRoaXMuX2ZpbmlzaFNoYXBlKCk7XHJcbiAgICAgIC8vVE9ETzogSSBkaXNhYmxlZCBhbGwgb2YgdGhpcyBhbmQga2VwdCB0aGUgcGFydHMgb2YgdGhlIGNvZGUgdGhhdCBhbGxvdyB0aGUgbGluZSB0byBlbmRcclxuICAgICAgLy8gSSBuZWVkIHRvIHNwZW5kIG1vcmUgdGltZSBsb29raW5nIGF0IHRoaXMgdG8gbWFrZSBzdXJlIHRoZXJlIGlzbid0IHNvbWV0aGluZyBoZXJlIEkgbmVlZCwgZXNwZWNpYWxseSBpbiByZWdhcmRzIHRvIHRvdWNoIHNjcmVlIHN0dWZmXHJcblxyXG4gICAgICAvLyBpZiAodGhpcy5fbW91c2VEb3duT3JpZ2luKSB7XHJcbiAgICAgIC8vIFx0dmFyIGRyYWdDaGVja0Rpc3RhbmNlID0gTC5wb2ludChjbGllbnRYLCBjbGllbnRZKVxyXG4gICAgICAvLyBcdFx0LmRpc3RhbmNlVG8odGhpcy5fbW91c2VEb3duT3JpZ2luKTtcclxuICAgICAgLy8gXHR2YXIgbGFzdFB0RGlzdGFuY2UgPSB0aGlzLl9jYWxjdWxhdGVGaW5pc2hEaXN0YW5jZShlLmxhdGxuZyk7XHJcbiAgICAgIC8vIFx0aWYgKHRoaXMub3B0aW9ucy5tYXhQb2ludHMgPiAxICYmIHRoaXMub3B0aW9ucy5tYXhQb2ludHMgPT0gdGhpcy5fbWFya2Vycy5sZW5ndGggKyAxKSB7XHJcbiAgICAgIC8vIFx0XHR0aGlzLmFkZFZlcnRleChlLmxhdGxuZyk7XHJcbiAgICAgIC8vIFx0XHR0aGlzLl9maW5pc2hTaGFwZSgpO1xyXG4gICAgICAvLyBcdH0gZWxzZSBpZiAobGFzdFB0RGlzdGFuY2UgPCAxMCAmJiBMLkJyb3dzZXIudG91Y2gpIHsgLy9UT0RPOiBuZWVkIHRvIGtlZXAgdGhpcyBpbiBzb21lIGZvcm0gZm9yIHRvdWNoIHNjcmVlbnM/Pz9cclxuICAgICAgLy8gXHRcdHRoaXMuX2ZpbmlzaFNoYXBlKCk7XHJcbiAgICAgIC8vIFx0fSBlbHNlIGlmIChNYXRoLmFicyhkcmFnQ2hlY2tEaXN0YW5jZSkgPCA5ICogKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEpKSB7XHJcbiAgICAgIC8vIFx0XHR0aGlzLmFkZFZlcnRleChlLmxhdGxuZyk7XHJcbiAgICAgIC8vIFx0fVxyXG4gICAgICAvLyBcdHRoaXMuX2VuYWJsZU5ld01hcmtlcnMoKTsgLy8gYWZ0ZXIgYSBzaG9ydCBwYXVzZSwgZW5hYmxlIG5ldyBtYXJrZXJzXHJcbiAgICAgIC8vIH1cclxuICAgICAgdGhpcy5fZW5hYmxlTmV3TWFya2VycygpOyAvLyBhZnRlciBhIHNob3J0IHBhdXNlLCBlbmFibGUgbmV3IG1hcmtlcnNcclxuICAgIH1cclxuICAgIHRoaXMuX21vdXNlRG93bk9yaWdpbiA9IG51bGw7XHJcbiAgfSxcclxuICBfY3JlYXRlTWFya2VyOiBmdW5jdGlvbiAobGF0bG5nKSB7XHJcbiAgICB2YXIgbWFya2VyID0gbmV3IEwuTWFya2VyKGxhdGxuZywge1xyXG4gICAgICBpY29uOiB0aGlzLm9wdGlvbnMuaWNvbixcclxuICAgICAgekluZGV4T2Zmc2V0OiB0aGlzLm9wdGlvbnMuekluZGV4T2Zmc2V0ICogMixcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hcmtlcjtcclxuICB9LFxyXG4gIF91cGRhdGVSdW5uaW5nTWVhc3VyZTogZnVuY3Rpb24gKGxhdGxuZywgYWRkZWQpIHtcclxuICAgIHZhciBtYXJrZXJzTGVuZ3RoID0gdGhpcy5fbWFya2Vycy5sZW5ndGgsXHJcbiAgICAgIHByZXZpb3VzTWFya2VySW5kZXgsXHJcbiAgICAgIGRpc3RhbmNlO1xyXG5cclxuICAgIGlmICh0aGlzLl9tYXJrZXJzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICB0aGlzLl9tZWFzdXJlbWVudFJ1bm5pbmdUb3RhbCA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwcmV2aW91c01hcmtlckluZGV4ID0gbWFya2Vyc0xlbmd0aCAtIChhZGRlZCA/IDIgOiAxKTtcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgYmFzZWQgb24gdGhlIHZlcnNpb25cclxuICAgICAgaWYgKEwuR2VvbWV0cnlVdGlsLmlzVmVyc2lvbjA3eCgpKSB7XHJcbiAgICAgICAgZGlzdGFuY2UgPVxyXG4gICAgICAgICAgbGF0bG5nLmRpc3RhbmNlVG8odGhpcy5fbWFya2Vyc1twcmV2aW91c01hcmtlckluZGV4XS5nZXRMYXRMbmcoKSkgKlxyXG4gICAgICAgICAgKHRoaXMub3B0aW9ucy5mYWN0b3IgfHwgMSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGlzdGFuY2UgPVxyXG4gICAgICAgICAgdGhpcy5fbWFwLmRpc3RhbmNlKFxyXG4gICAgICAgICAgICBsYXRsbmcsXHJcbiAgICAgICAgICAgIHRoaXMuX21hcmtlcnNbcHJldmlvdXNNYXJrZXJJbmRleF0uZ2V0TGF0TG5nKClcclxuICAgICAgICAgICkgKiAodGhpcy5vcHRpb25zLmZhY3RvciB8fCAxKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fbWVhc3VyZW1lbnRSdW5uaW5nVG90YWwgKz0gZGlzdGFuY2UgKiAoYWRkZWQgPyAxIDogLTEpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBMLkRyYXcuU2VsZWN0XHJcbiAqIEBha2EgRHJhdy5TZWxlY3RcclxuICogQGluaGVyaXRzIEwuRHJhdy5SZWN0YW5nbGVcclxuICovXHJcbkwuRHJhdy5TZWxlY3QgPSBMLkRyYXcuUmVjdGFuZ2xlLmV4dGVuZCh7XHJcbiAgc3RhdGljczoge1xyXG4gICAgVFlQRTogXCJzZWxlY3RcIixcclxuICB9LFxyXG5cclxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAobWFwLCBvcHRpb25zKSB7XHJcbiAgICAvLyBTYXZlIHRoZSB0eXBlIHNvIHN1cGVyIGNhbiBmaXJlLCBuZWVkIHRvIGRvIHRoaXMgYXMgY2Fubm90IGRvIHRoaXMuVFlQRSA6KFxyXG4gICAgTC5EcmF3LlJlY3RhbmdsZS5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG1hcCwgb3B0aW9ucyk7XHJcbiAgICB0aGlzLl9tYXAgPSBtYXA7XHJcbiAgICB0aGlzLl9pbml0aWFsTGFiZWxUZXh0ID0gXCJDbGljayBhbmQgZHJhZyB0byBzZWxlY3QgYSBsaW5lLlwiO1xyXG5cclxuICAgIHRoaXMudHlwZSA9IEwuRHJhdy5TZWxlY3QuVFlQRTtcclxuICB9LFxyXG5cclxuICAvLyBAbWV0aG9kIGFkZEhvb2tzKCk6IHZvaWRcclxuICAvLyBBZGQgbGlzdGVuZXIgaG9va3MgdG8gdGhpcyBoYW5kbGVyLlxyXG4gIGFkZEhvb2tzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBMLkRyYXcuUmVjdGFuZ2xlLnByb3RvdHlwZS5hZGRIb29rcy5jYWxsKHRoaXMpO1xyXG4gICAgLy9UT0RPOiBtYWtlIG1vcmUgZWxlZ2FudCBpZiBpIGNhblxyXG4gICAgbGV0IHM7XHJcbiAgICB0aGlzLl9tYXAuZWFjaExheWVyKGZ1bmN0aW9uIChsYXllcikge1xyXG4gICAgICBpZiAobGF5ZXIub3B0aW9ucy5uYW1lICYmIGxheWVyLm9wdGlvbnMubmFtZSA9PSBcInNlbGVjdGVkXCIpIHtcclxuICAgICAgICBzID0gbGF5ZXI7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IHM7XHJcblxyXG4gICAgLy8gdGhpcy5zZWxlY3RlZEl0ZW0gPSBuZXcgTC5GZWF0dXJlR3JvdXAoKS5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgdGhpcy5fbWFwLm9uKEwuRHJhdy5FdmVudC5DUkVBVEVELCB0aGlzLl9jcmVhdGVkLCB0aGlzKTtcclxuICB9LFxyXG4gIGVuYWJsZVNlbGVjdDogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRyYWNlLWxpbmVcIilbMF07XHJcbiAgICBidXR0b24ub25DbGljayA9IG51bGw7XHJcbiAgICBidXR0b24uY2xhc3NOYW1lID0gXCJ0cmFjZS1saW5lIGxlYWZsZXQtdG9vbGJhci1pY29uXCI7XHJcbiAgfSxcclxuXHJcbiAgcmVtb3ZlSG9va3M6IGZ1bmN0aW9uICgpIHtcclxuICAgIEwuRHJhdy5SZWN0YW5nbGUucHJvdG90eXBlLnJlbW92ZUhvb2tzLmNhbGwodGhpcyk7XHJcbiAgICBkZWxldGUgdGhpcy5zZWxlY3RlZDtcclxuICAgIHRoaXMuX21hcC5vZmYoTC5EcmF3LkV2ZW50LkNSRUFURUQsIHRoaXMuX2NyZWF0ZWQsIHRoaXMpO1xyXG4gIH0sXHJcbiAgX2xhdGxuZ1RvQXJyYXk6IGZ1bmN0aW9uIChsbHMpIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGxscykpIHJldHVybiBsbHMubWFwKChsbCkgPT4gdGhpcy5fbGF0bG5nVG9BcnJheShsbCkpO1xyXG4gICAgZWxzZSByZXR1cm4gW2xscy5sbmcsIGxscy5sYXRdO1xyXG4gICAgLy8gfSk7XHJcbiAgfSxcclxuXHJcbiAgX2NyZWF0ZWQ6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAvL2NyZWF0ZSB0dXJmanMgY29tcGF0aWJsZSBmZWF0dXJlIGZyb20gZHJhd24gcmVjdGFuZ2xlXHJcbiAgICBjb25zdCBsYXRsbmdzID0gdGhpcy5fbGF0bG5nVG9BcnJheShlLmxheWVyLmdldExhdExuZ3MoKSk7XHJcbiAgICBsYXRsbmdzWzBdLnB1c2gobGF0bG5nc1swXVswXSk7IC8vYWRkIGZpcnN0IHBhaXIgdG8gYmFjayB0byBzYXRpc2Z5IHR1cmYuanNcclxuXHJcbiAgICBjb25zdCBzZWxlY3RQb2x5ID0gdHVyZlBvbHkobGF0bG5ncyk7XHJcbiAgICAvL3NlYXJjaCBtYXAgZm9yIGEgc2VsZWN0YWJsZSBsYXllclxyXG4gICAgdGhpcy5fbWFwLmVhY2hMYXllcigobGF5ZXIpID0+IHtcclxuICAgICAgaWYgKGxheWVyLm9wdGlvbnMuc2VsZWN0YWJsZSkge1xyXG4gICAgICAgIHRoaXMuX21hbmFnZVNlbGVjdChzZWxlY3RQb2x5LCBsYXllcik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIC8vcnVuIHF1ZXJ5IHRvIHNlbGVjdCBmZWF0dXJlIG9uIHJlY3RhbmdsZSBkcmF3XHJcbiAgX21hbmFnZVNlbGVjdDogZnVuY3Rpb24gKHJlY3QsIHNlbGVjdGFibGUpIHtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMuX21hcC5hbG1vc3RPdmVyLnJlbW92ZUxheWVyKHRoaXMuc2VsZWN0ZWQpO1xyXG4gICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5zZWxlY3RlZCk7XHJcbiAgICB9XHJcbiAgICBsZXQgc2VsZWN0ZWQ7XHJcblxyXG4gICAgc2VsZWN0YWJsZS5lYWNoTGF5ZXIoKGxheWVyKSA9PiB7XHJcbiAgICAgIGxldCBsaW5lID0gdGhpcy5fZ3JhYlR1cmZMaW5lKGxheWVyKTtcclxuXHJcbiAgICAgIGlmIChsaW5lKSB7XHJcbiAgICAgICAgY29uc3QgaW50ZXJzZWN0ID0gYm9vbGVhbkludGVyc2VjdHMocmVjdCwgbGluZSk7XHJcbiAgICAgICAgaWYgKGludGVyc2VjdCkge1xyXG4gICAgICAgICAgc2VsZWN0ZWQgPSBsYXllcjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMuX2RyYXdTZWxlY3Qoc2VsZWN0ZWQpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy9jb252ZXJ0IGxheWVyIGludG8gYSB0dXJmIGxpbmUgdHlwZVxyXG4gIF9ncmFiVHVyZkxpbmU6IGZ1bmN0aW9uIChsYXllcikge1xyXG4gICAgY29uc3QgbGluZVR5cGUgPSBsYXllci5mZWF0dXJlLmdlb21ldHJ5LnR5cGU7XHJcbiAgICBjb25zdCBsYXRsbmdzID0gdGhpcy5fbGF0bG5nVG9BcnJheShsYXllci5nZXRMYXRMbmdzKCkpO1xyXG4gICAgaWYgKGxpbmVUeXBlID09IFwiTGluZVN0cmluZ1wiKSB7XHJcbiAgICAgIHJldHVybiB0dXJmTGluZVN0cmluZyhsYXRsbmdzKTtcclxuICAgIH0gZWxzZSBpZiAobGluZVR5cGUgPT0gXCJNdWx0aUxpbmVTdHJpbmdcIikge1xyXG4gICAgICByZXR1cm4gdHVyZk11bHRpTGluZVN0cmluZyhsYXRsbmdzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBsaW5lO1xyXG4gIH0sXHJcblxyXG4gIF9kcmF3U2VsZWN0OiBmdW5jdGlvbiAoc2VsZWN0ZWQpIHtcclxuICAgIGxldCBwcm9wZXJ0aWVzID0ge307XHJcbiAgICBpZiAoc2VsZWN0ZWQuZmVhdHVyZS5wcm9wZXJ0aWVzKSB7XHJcbiAgICAgIHByb3BlcnRpZXMgPSBzZWxlY3RlZC5mZWF0dXJlLnByb3BlcnRpZXM7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gTC5wb2x5bGluZShzZWxlY3RlZC5nZXRMYXRMbmdzKCksIHtcclxuICAgICAgd2VpZ2h0OiA0LFxyXG4gICAgICBjb2xvcjogXCJnb2xkXCIsXHJcbiAgICAgIG5hbWU6IFwic2VsZWN0ZWRcIixcclxuICAgICAgbGluZVR5cGU6IHNlbGVjdGVkLmZlYXR1cmUuZ2VvbWV0cnkudHlwZSxcclxuICAgICAgcHJvcGVydGllczogcHJvcGVydGllcyxcclxuICAgIH0pLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICB0aGlzLl9tYXAuYWRkTGF5ZXIodGhpcy5zZWxlY3RlZCk7XHJcbiAgICB0aGlzLl9tYXAuYWxtb3N0T3Zlci5hZGRMYXllcih0aGlzLnNlbGVjdGVkKTtcclxuICAgIHRoaXMuZW5hYmxlU2VsZWN0KCk7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vL3NlZSBpZiBpIGNhbiBydW4gZGlzYWJsZSBzZWxlY3QgZWxzZXdoZXJlXHJcbkwuVG9vbGJhcjIuRHJhd0FjdGlvbi5DYW5jZWxUcmFjZSA9IEwuVG9vbGJhcjIuRHJhd0FjdGlvbi5DYW5jZWwuZXh0ZW5kKHtcclxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBkaXNhYmxlU2VsZWN0KCk7IC8vZGlhYmxlIHNlbGVjdCBvbiBkcmF3IGJ1dHRvbiBoZXJlIGJlY2F1c2UgdGhpcyBpcyB0aGUgZmlyc3QgcGxhY2Ugd2hlcmUgaXQncyBhbHJhZHkgaW5pdGFsaXplZFxyXG4gICAgTC5Ub29sYmFyMi5EcmF3QWN0aW9uLkNhbmNlbC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMpO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuTC5Ub29sYmFyMi5EcmF3QWN0aW9uLlRyYWNlID0gTC5Ub29sYmFyMi5EcmF3QWN0aW9uLmZyb21IYW5kbGVyKFxyXG4gIEwuRHJhdy5UcmFjZSxcclxuICB7XHJcbiAgICBjbGFzc05hbWU6IFwibGVhZmxldC1kcmF3LWRyYXctcG9seWxpbmVcIixcclxuICAgIHRvb2x0aXA6IEwuZHJhd0xvY2FsLmRyYXcudG9vbGJhci5idXR0b25zLnBvbHlsaW5lLFxyXG4gIH0sXHJcbiAgbmV3IEwuVG9vbGJhcjIoeyBhY3Rpb25zOiBbTC5Ub29sYmFyMi5EcmF3QWN0aW9uLkNhbmNlbFRyYWNlXSB9KVxyXG4pLmV4dGVuZCh7XHJcbiAgb3B0aW9uczoge1xyXG4gICAgdG9vbGJhckljb246IHtcclxuICAgICAgY2xhc3NOYW1lOiBcInRyYWNlLWxpbmVcIixcclxuICAgICAgaHRtbDogXCJcIixcclxuICAgICAgdG9vbHRpcDogXCJEcmF3IGEgbGluZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcbkwuVG9vbGJhcjIuRHJhd0FjdGlvbi5TZWxlY3QgPSBMLlRvb2xiYXIyLkRyYXdBY3Rpb24uZnJvbUhhbmRsZXIoXHJcbiAgTC5EcmF3LlNlbGVjdCxcclxuICB7XHJcbiAgICBjbGFzc05hbWU6IFwibGVhZmxldC1kcmF3LWRyYXctcmVjdGFuZ2xlXCIsXHJcbiAgICB0b29sdGlwOiBMLmRyYXdMb2NhbC5kcmF3LnRvb2xiYXIuYnV0dG9ucy5yZWN0YW5nbGUsXHJcbiAgfSxcclxuICBuZXcgTC5Ub29sYmFyMih7IGFjdGlvbnM6IFtMLlRvb2xiYXIyLkRyYXdBY3Rpb24uQ2FuY2VsXSB9KVxyXG4pLmV4dGVuZCh7XHJcbiAgb3B0aW9uczoge1xyXG4gICAgdG9vbGJhckljb246IHtcclxuICAgICAgaHRtbDogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMzIgMzJcIj48cGF0aCBkPVwiXCIgLzwvc3ZnPmAsXHJcbiAgICAgIHRvb2x0aXA6IFwiU2VsZWN0IGEgbGluZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcbkwuVG9vbGJhcjIuRHJhd0FjdGlvbi5SZW1vdmVTZWxlY3QgPSBMLlRvb2xiYXIyLkFjdGlvbi5leHRlbmQoe1xyXG4gIG9wdGlvbnM6IHtcclxuICAgIHRvb2xiYXJJY29uOiB7XHJcbiAgICAgIGh0bWw6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDMyIDMyXCI+PHBhdGggZD1cIlwiIC88L3N2Zz5gLFxyXG4gICAgICB0b29sdGlwOiBcIlVuLXNlbGVjdCB0aGUgbGluZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChtYXApIHtcclxuICAgIHRoaXMuX21hcCA9IG1hcDtcclxuXHJcbiAgICBMLlRvb2xiYXIyLkFjdGlvbi5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIGFkZEhvb2tzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgcztcclxuICAgIHRoaXMuX21hcC5lYWNoTGF5ZXIoZnVuY3Rpb24gKGxheWVyKSB7XHJcbiAgICAgIGlmIChsYXllci5vcHRpb25zLm5hbWUgJiYgbGF5ZXIub3B0aW9ucy5uYW1lID09IFwic2VsZWN0ZWRcIikge1xyXG4gICAgICAgIHMgPSBsYXllcjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gcztcclxuXHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xyXG4gICAgICB0aGlzLl9tYXAuYWxtb3N0T3Zlci5yZW1vdmVMYXllcih0aGlzLnNlbGVjdGVkKTtcclxuICAgICAgdGhpcy5fbWFwLnJlbW92ZUxheWVyKHRoaXMuc2VsZWN0ZWQpO1xyXG4gICAgICBkaXNhYmxlU2VsZWN0KCk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5MLlRvb2xiYXIyLlRyYWNlID0gTC5Ub29sYmFyMi5Db250cm9sLmV4dGVuZCh7XHJcbiAgb3B0aW9uczoge1xyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBMLlRvb2xiYXIyLkRyYXdBY3Rpb24uU2VsZWN0LFxyXG4gICAgICBMLlRvb2xiYXIyLkRyYXdBY3Rpb24uUmVtb3ZlU2VsZWN0LFxyXG4gICAgICBMLlRvb2xiYXIyLkRyYXdBY3Rpb24uVHJhY2VcclxuICAgIF0sXHJcbiAgfSxcclxufSk7XHJcblxyXG5jb25zdCBkaXNhYmxlU2VsZWN0ID0gKCkgPT4ge1xyXG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0cmFjZS1saW5lXCIpWzBdO1xyXG5cclxuICAvLyBkaXNhYmxlIGJ1dHRvblxyXG4gIGJ1dHRvbi5vbkNsaWNrID0gXCJwcmV2ZW50RXZlbnREZWZhdWx0KCk7IHJldHVybiBmYWxzZVwiO1xyXG4gIGJ1dHRvbi5jbGFzc05hbWUgPSBcInRyYWNlLWxpbmUgbGVhZmxldC10b29sYmFyLWljb24gZHJhdy1jb250cm9sLWRpc2FibGVkXCI7XHJcbn07XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==