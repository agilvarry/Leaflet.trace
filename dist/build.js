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
/* harmony export */   "unselect": () => (/* binding */ unselect),
/* harmony export */   "unselect2": () => (/* binding */ unselect2)
/* harmony export */ });
const line = `<svg viewBox="-5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
<path d="M23.36 9.32c-1.32 0-2.36 1.080-2.36 2.36 0 0.28 0.040 0.56 0.12 0.8l-4.8 4.080c-0.32-0.2-0.72-0.28-1.16-0.28s-0.88 0.12-1.24 0.36l-2.72-2.2c0.080-0.24 0.12-0.44 0.12-0.72 0-1.32-1.080-2.36-2.36-2.36-1.32 0-2.36 1.080-2.36 2.36 0 0.36 0.080 0.68 0.2 0.96l-3.44 3.44c-0.28-0.12-0.64-0.2-0.96-0.2-1.32 0-2.36 1.080-2.36 2.36 0 1.32 1.080 2.36 2.36 2.36s2.36-1.080 2.36-2.36c0-0.36-0.080-0.68-0.2-0.96l3.44-3.44c0.28 0.12 0.64 0.2 0.96 0.2 0.44 0 0.88-0.12 1.24-0.36l2.76 2.12c-0.080 0.24-0.080 0.44-0.080 0.72 0 1.32 1.080 2.36 2.36 2.36s2.36-1.080 2.36-2.36c0-0.28-0.040-0.56-0.12-0.8l4.8-4.080c0.32 0.2 0.72 0.28 1.16 0.28 1.32 0 2.36-1.080 2.36-2.36-0.040-1.2-1.16-2.28-2.44-2.28zM2.36 21c-0.36 0-0.68-0.32-0.68-0.68 0-0.4 0.32-0.68 0.68-0.68s0.68 0.32 0.68 0.68c0 0.36-0.28 0.68-0.68 0.68zM8.24 13.76c0-0.4 0.32-0.68 0.68-0.68s0.68 0.32 0.68 0.68-0.32 0.68-0.68 0.68c-0.36 0-0.68-0.32-0.68-0.68zM15.2 19.28c-0.4 0-0.68-0.32-0.68-0.68s0.32-0.68 0.68-0.68 0.68 0.32 0.68 0.68c-0.040 0.4-0.28 0.68-0.68 0.68zM23.36 12.36c-0.36 0-0.68-0.32-0.68-0.68 0-0.4 0.32-0.68 0.68-0.68 0.4 0 0.68 0.32 0.68 0.68 0 0.4-0.32 0.68-0.68 0.68z"></path>
</svg>`;

const select = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-4 -3 28 28" >
<g id="select">
<path d="M14.8,24l-3.3-4.3l-3.2,4.2L5.8,6.9l16,7.2L16.4,16l3.2,4.3L14.8,24z M11.6,16.4l3.6,4.8l1.6-1.3L13.1,15l3.3-1.1l-8.1-3.6
  l1.3,8.7L11.6,16.4z"/>
<path d="M4,18H0v-4h2v2h2V18z M2,12H0V6h2V12z M18,10h-2V6h2V10z M18,4h-2V2h-2V0h4V4z M2,4H0V0h4v2H2V4z M12,2H6V0h6V2z"/>
</g>
</svg>`;

const unselect2 = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path  opacity=".25" d="M8.458 12.5a10.323 10.323 0 0 1 6.536 2.757 7.942 7.942 0 0 0-2.128-4.878C10.593 8.249 9.145 8.605 9 2H3v12.433A9.392 9.392 0 0 1 8.458 12.5z"/>
<path d="M22 2v20h-5v-1h4V9.05a10.327 10.327 0 0 0-5.253 1.91c-.154-.249-.35-.542-.558-.837A11.364 11.364 0 0 1 21 8.048V3H10V2zM3 2v2h1V3h1V2H3zm0 6h1V6H3zm0 4h1v-2H3zM9 2H7v1h1v.022c.017.362.038.7.067 1.024l.996-.09A17.355 17.355 0 0 1 9 2zm5.84 12.214a13.604 13.604 0 0 0-.594-1.81l-.088-.21-.914.406.073.173a12.677 12.677 0 0 1 .553 1.68zM8.397 6.142a7.701 7.701 0 0 0 .773 2.035l.87-.494a6.726 6.726 0 0 1-.67-1.774zm4.47 4.237a11.45 11.45 0 0 0-.989-.802c-.211-.158-.424-.317-.632-.49l-.639.77c.222.183.447.352.671.52a10.747 10.747 0 0 1 .908.732zM16 18.5l-.234.305C15.634 18.976 12.524 23 8.458 23c-4.06 0-7.072-4.017-7.209-4.188L1 18.5l.249-.312C1.386 18.018 4.398 14 8.459 14c4.064 0 7.175 4.024 7.307 4.195zm-1.101 0c-.815-.928-3.39-3.6-6.44-3.6-3.045 0-5.489 2.663-6.338 3.6.85.937 3.293 3.6 6.339 3.6 3.055 0 5.626-2.67 6.439-3.6zM11 18.5A2.5 2.5 0 1 0 8.5 21a2.503 2.503 0 0 0 2.5-2.5z"/>
<path fill="none" d="M0 0h24v24H0z"/>
</svg>`;

const unselect = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
viewBox="0 0 15 16">
<g id="layer1" transform="translate(-461.714 -531.79)">

<path   d="M470.714 533.877v1.015a5 5 0 0 1 1.754.73l.717-.716a6 6 0 0 0-2.47-1.03zm-2 .004a6 6 0 0 0-2.472 1.023l.718.719a5 5 0 0 1 1.754-.727zm5.887 2.437-.719.719a5 5 0 0 1 .727 1.754h1.015a6 6 0 0 0-1.023-2.473zm-9.771.002a6 6 0 0 0-1.03 2.47h1.016a5 5 0 0 1 .73-1.753zm-1.026 4.47a6 6 0 0 0 1.024 2.474l.718-.72a5 5 0 0 1-.726-1.753zm10.809 0a5 5 0 0 1-.73 1.755l.716.717a6 6 0 0 0 1.03-2.471zm-7.653 3.169-.716.717a6 6 0 0 0 2.47 1.029v-1.016a5 5 0 0 1-1.754-.73zm5.508 0a5 5 0 0 1-1.754.726v1.016a6 6 0 0 0 2.473-1.023z" id="path858"/>

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
// import "./Leaflet.AlmostOver/src/leaflet.almostover.js";
// import "./leaflet-draw-toolbar/leaflet.draw-toolbar.js";
// import "./leaflet-draw-toolbar/leaflet.draw-toolbar.css";





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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0U7QUFDcEUseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG1EQUFtRDtBQUMvRDtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBLHVCQUF1QixzREFBUTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixvRUFBaUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHlEQUFjO0FBQzNCLE1BQU07QUFDTixhQUFhLDhEQUFtQjtBQUNoQztBQUNBLFdBQVcsd0NBQUk7QUFDZixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxtQkFBbUIsOENBQThDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx3Q0FBSTtBQUNoQjtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxtQkFBbUIseUNBQXlDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLFlBQVksMENBQU07QUFDbEI7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNENBQVE7QUFDcEI7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL2Jib3gvZGlzdC9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL2hlbHBlcnMvZGlzdC9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL21ldGEvZGlzdC9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL2dlb2pzb24tcmJ1c2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL25vZGVfbW9kdWxlcy9yYnVzaC9yYnVzaC5taW4uanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL3NyYy9pY29ucy5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL2Jvb2xlYW4tZGlzam9pbnQvZGlzdC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL2Jvb2xlYW4taW50ZXJzZWN0cy9kaXN0L2VzL2luZGV4LmpzIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2UvLi9ub2RlX21vZHVsZXMvQHR1cmYvYm9vbGVhbi1wb2ludC1pbi1wb2x5Z29uL2Rpc3QvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL25vZGVfbW9kdWxlcy9AdHVyZi9oZWxwZXJzL2Rpc3QvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL25vZGVfbW9kdWxlcy9AdHVyZi9pbnZhcmlhbnQvZGlzdC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL2xpbmUtaW50ZXJzZWN0L2Rpc3QvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS8uL25vZGVfbW9kdWxlcy9AdHVyZi9saW5lLXNlZ21lbnQvZGlzdC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL21ldGEvZGlzdC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vbm9kZV9tb2R1bGVzL0B0dXJmL3BvbHlnb24tdG8tbGluZS9kaXN0L2VzL2luZGV4LmpzIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGVhZmxldC10cmFjZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xlYWZsZXQtdHJhY2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sZWFmbGV0LXRyYWNlLy4vc3JjL2xlYWZsZXQudHJhY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbWV0YV8xID0gcmVxdWlyZShcIkB0dXJmL21ldGFcIik7XG4vKipcbiAqIFRha2VzIGEgc2V0IG9mIGZlYXR1cmVzLCBjYWxjdWxhdGVzIHRoZSBiYm94IG9mIGFsbCBpbnB1dCBmZWF0dXJlcywgYW5kIHJldHVybnMgYSBib3VuZGluZyBib3guXG4gKlxuICogQG5hbWUgYmJveFxuICogQHBhcmFtIHtHZW9KU09OfSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHJldHVybnMge0JCb3h9IGJib3ggZXh0ZW50IGluIFttaW5YLCBtaW5ZLCBtYXhYLCBtYXhZXSBvcmRlclxuICogQGV4YW1wbGVcbiAqIHZhciBsaW5lID0gdHVyZi5saW5lU3RyaW5nKFtbLTc0LCA0MF0sIFstNzgsIDQyXSwgWy04MiwgMzVdXSk7XG4gKiB2YXIgYmJveCA9IHR1cmYuYmJveChsaW5lKTtcbiAqIHZhciBiYm94UG9seWdvbiA9IHR1cmYuYmJveFBvbHlnb24oYmJveCk7XG4gKlxuICogLy9hZGRUb01hcFxuICogdmFyIGFkZFRvTWFwID0gW2xpbmUsIGJib3hQb2x5Z29uXVxuICovXG5mdW5jdGlvbiBiYm94KGdlb2pzb24pIHtcbiAgICB2YXIgcmVzdWx0ID0gW0luZmluaXR5LCBJbmZpbml0eSwgLUluZmluaXR5LCAtSW5maW5pdHldO1xuICAgIG1ldGFfMS5jb29yZEVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGNvb3JkKSB7XG4gICAgICAgIGlmIChyZXN1bHRbMF0gPiBjb29yZFswXSkge1xuICAgICAgICAgICAgcmVzdWx0WzBdID0gY29vcmRbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdFsxXSA+IGNvb3JkWzFdKSB7XG4gICAgICAgICAgICByZXN1bHRbMV0gPSBjb29yZFsxXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0WzJdIDwgY29vcmRbMF0pIHtcbiAgICAgICAgICAgIHJlc3VsdFsyXSA9IGNvb3JkWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHRbM10gPCBjb29yZFsxXSkge1xuICAgICAgICAgICAgcmVzdWx0WzNdID0gY29vcmRbMV07XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuYmJveFtcImRlZmF1bHRcIl0gPSBiYm94O1xuZXhwb3J0cy5kZWZhdWx0ID0gYmJveDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBAbW9kdWxlIGhlbHBlcnNcbiAqL1xuLyoqXG4gKiBFYXJ0aCBSYWRpdXMgdXNlZCB3aXRoIHRoZSBIYXJ2ZXNpbmUgZm9ybXVsYSBhbmQgYXBwcm94aW1hdGVzIHVzaW5nIGEgc3BoZXJpY2FsIChub24tZWxsaXBzb2lkKSBFYXJ0aC5cbiAqXG4gKiBAbWVtYmVyb2YgaGVscGVyc1xuICogQHR5cGUge251bWJlcn1cbiAqL1xuZXhwb3J0cy5lYXJ0aFJhZGl1cyA9IDYzNzEwMDguODtcbi8qKlxuICogVW5pdCBvZiBtZWFzdXJlbWVudCBmYWN0b3JzIHVzaW5nIGEgc3BoZXJpY2FsIChub24tZWxsaXBzb2lkKSBlYXJ0aCByYWRpdXMuXG4gKlxuICogQG1lbWJlcm9mIGhlbHBlcnNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydHMuZmFjdG9ycyA9IHtcbiAgICBjZW50aW1ldGVyczogZXhwb3J0cy5lYXJ0aFJhZGl1cyAqIDEwMCxcbiAgICBjZW50aW1ldHJlczogZXhwb3J0cy5lYXJ0aFJhZGl1cyAqIDEwMCxcbiAgICBkZWdyZWVzOiBleHBvcnRzLmVhcnRoUmFkaXVzIC8gMTExMzI1LFxuICAgIGZlZXQ6IGV4cG9ydHMuZWFydGhSYWRpdXMgKiAzLjI4MDg0LFxuICAgIGluY2hlczogZXhwb3J0cy5lYXJ0aFJhZGl1cyAqIDM5LjM3LFxuICAgIGtpbG9tZXRlcnM6IGV4cG9ydHMuZWFydGhSYWRpdXMgLyAxMDAwLFxuICAgIGtpbG9tZXRyZXM6IGV4cG9ydHMuZWFydGhSYWRpdXMgLyAxMDAwLFxuICAgIG1ldGVyczogZXhwb3J0cy5lYXJ0aFJhZGl1cyxcbiAgICBtZXRyZXM6IGV4cG9ydHMuZWFydGhSYWRpdXMsXG4gICAgbWlsZXM6IGV4cG9ydHMuZWFydGhSYWRpdXMgLyAxNjA5LjM0NCxcbiAgICBtaWxsaW1ldGVyczogZXhwb3J0cy5lYXJ0aFJhZGl1cyAqIDEwMDAsXG4gICAgbWlsbGltZXRyZXM6IGV4cG9ydHMuZWFydGhSYWRpdXMgKiAxMDAwLFxuICAgIG5hdXRpY2FsbWlsZXM6IGV4cG9ydHMuZWFydGhSYWRpdXMgLyAxODUyLFxuICAgIHJhZGlhbnM6IDEsXG4gICAgeWFyZHM6IGV4cG9ydHMuZWFydGhSYWRpdXMgKiAxLjA5MzYsXG59O1xuLyoqXG4gKiBVbml0cyBvZiBtZWFzdXJlbWVudCBmYWN0b3JzIGJhc2VkIG9uIDEgbWV0ZXIuXG4gKlxuICogQG1lbWJlcm9mIGhlbHBlcnNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydHMudW5pdHNGYWN0b3JzID0ge1xuICAgIGNlbnRpbWV0ZXJzOiAxMDAsXG4gICAgY2VudGltZXRyZXM6IDEwMCxcbiAgICBkZWdyZWVzOiAxIC8gMTExMzI1LFxuICAgIGZlZXQ6IDMuMjgwODQsXG4gICAgaW5jaGVzOiAzOS4zNyxcbiAgICBraWxvbWV0ZXJzOiAxIC8gMTAwMCxcbiAgICBraWxvbWV0cmVzOiAxIC8gMTAwMCxcbiAgICBtZXRlcnM6IDEsXG4gICAgbWV0cmVzOiAxLFxuICAgIG1pbGVzOiAxIC8gMTYwOS4zNDQsXG4gICAgbWlsbGltZXRlcnM6IDEwMDAsXG4gICAgbWlsbGltZXRyZXM6IDEwMDAsXG4gICAgbmF1dGljYWxtaWxlczogMSAvIDE4NTIsXG4gICAgcmFkaWFuczogMSAvIGV4cG9ydHMuZWFydGhSYWRpdXMsXG4gICAgeWFyZHM6IDEuMDkzNjEzMyxcbn07XG4vKipcbiAqIEFyZWEgb2YgbWVhc3VyZW1lbnQgZmFjdG9ycyBiYXNlZCBvbiAxIHNxdWFyZSBtZXRlci5cbiAqXG4gKiBAbWVtYmVyb2YgaGVscGVyc1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0cy5hcmVhRmFjdG9ycyA9IHtcbiAgICBhY3JlczogMC4wMDAyNDcxMDUsXG4gICAgY2VudGltZXRlcnM6IDEwMDAwLFxuICAgIGNlbnRpbWV0cmVzOiAxMDAwMCxcbiAgICBmZWV0OiAxMC43NjM5MTA0MTcsXG4gICAgaGVjdGFyZXM6IDAuMDAwMSxcbiAgICBpbmNoZXM6IDE1NTAuMDAzMTAwMDA2LFxuICAgIGtpbG9tZXRlcnM6IDAuMDAwMDAxLFxuICAgIGtpbG9tZXRyZXM6IDAuMDAwMDAxLFxuICAgIG1ldGVyczogMSxcbiAgICBtZXRyZXM6IDEsXG4gICAgbWlsZXM6IDMuODZlLTcsXG4gICAgbWlsbGltZXRlcnM6IDEwMDAwMDAsXG4gICAgbWlsbGltZXRyZXM6IDEwMDAwMDAsXG4gICAgeWFyZHM6IDEuMTk1OTkwMDQ2LFxufTtcbi8qKlxuICogV3JhcHMgYSBHZW9KU09OIHtAbGluayBHZW9tZXRyeX0gaW4gYSBHZW9KU09OIHtAbGluayBGZWF0dXJlfS5cbiAqXG4gKiBAbmFtZSBmZWF0dXJlXG4gKiBAcGFyYW0ge0dlb21ldHJ5fSBnZW9tZXRyeSBpbnB1dCBnZW9tZXRyeVxuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlfSBhIEdlb0pTT04gRmVhdHVyZVxuICogQGV4YW1wbGVcbiAqIHZhciBnZW9tZXRyeSA9IHtcbiAqICAgXCJ0eXBlXCI6IFwiUG9pbnRcIixcbiAqICAgXCJjb29yZGluYXRlc1wiOiBbMTEwLCA1MF1cbiAqIH07XG4gKlxuICogdmFyIGZlYXR1cmUgPSB0dXJmLmZlYXR1cmUoZ2VvbWV0cnkpO1xuICpcbiAqIC8vPWZlYXR1cmVcbiAqL1xuZnVuY3Rpb24gZmVhdHVyZShnZW9tLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZmVhdCA9IHsgdHlwZTogXCJGZWF0dXJlXCIgfTtcbiAgICBpZiAob3B0aW9ucy5pZCA9PT0gMCB8fCBvcHRpb25zLmlkKSB7XG4gICAgICAgIGZlYXQuaWQgPSBvcHRpb25zLmlkO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5iYm94KSB7XG4gICAgICAgIGZlYXQuYmJveCA9IG9wdGlvbnMuYmJveDtcbiAgICB9XG4gICAgZmVhdC5wcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCB7fTtcbiAgICBmZWF0Lmdlb21ldHJ5ID0gZ2VvbTtcbiAgICByZXR1cm4gZmVhdDtcbn1cbmV4cG9ydHMuZmVhdHVyZSA9IGZlYXR1cmU7XG4vKipcbiAqIENyZWF0ZXMgYSBHZW9KU09OIHtAbGluayBHZW9tZXRyeX0gZnJvbSBhIEdlb21ldHJ5IHN0cmluZyB0eXBlICYgY29vcmRpbmF0ZXMuXG4gKiBGb3IgR2VvbWV0cnlDb2xsZWN0aW9uIHR5cGUgdXNlIGBoZWxwZXJzLmdlb21ldHJ5Q29sbGVjdGlvbmBcbiAqXG4gKiBAbmFtZSBnZW9tZXRyeVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgR2VvbWV0cnkgVHlwZVxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBjb29yZGluYXRlcyBDb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcmV0dXJucyB7R2VvbWV0cnl9IGEgR2VvSlNPTiBHZW9tZXRyeVxuICogQGV4YW1wbGVcbiAqIHZhciB0eXBlID0gXCJQb2ludFwiO1xuICogdmFyIGNvb3JkaW5hdGVzID0gWzExMCwgNTBdO1xuICogdmFyIGdlb21ldHJ5ID0gdHVyZi5nZW9tZXRyeSh0eXBlLCBjb29yZGluYXRlcyk7XG4gKiAvLyA9PiBnZW9tZXRyeVxuICovXG5mdW5jdGlvbiBnZW9tZXRyeSh0eXBlLCBjb29yZGluYXRlcywgX29wdGlvbnMpIHtcbiAgICBpZiAoX29wdGlvbnMgPT09IHZvaWQgMCkgeyBfb3B0aW9ucyA9IHt9OyB9XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgICAgICAgcmV0dXJuIHBvaW50KGNvb3JkaW5hdGVzKS5nZW9tZXRyeTtcbiAgICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgICAgIHJldHVybiBsaW5lU3RyaW5nKGNvb3JkaW5hdGVzKS5nZW9tZXRyeTtcbiAgICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgICAgIHJldHVybiBwb2x5Z29uKGNvb3JkaW5hdGVzKS5nZW9tZXRyeTtcbiAgICAgICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgICAgICAgIHJldHVybiBtdWx0aVBvaW50KGNvb3JkaW5hdGVzKS5nZW9tZXRyeTtcbiAgICAgICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgICAgICAgICAgcmV0dXJuIG11bHRpTGluZVN0cmluZyhjb29yZGluYXRlcykuZ2VvbWV0cnk7XG4gICAgICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgICAgICAgIHJldHVybiBtdWx0aVBvbHlnb24oY29vcmRpbmF0ZXMpLmdlb21ldHJ5O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHR5cGUgKyBcIiBpcyBpbnZhbGlkXCIpO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2VvbWV0cnkgPSBnZW9tZXRyeTtcbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBQb2ludH0ge0BsaW5rIEZlYXR1cmV9IGZyb20gYSBQb3NpdGlvbi5cbiAqXG4gKiBAbmFtZSBwb2ludFxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBjb29yZGluYXRlcyBsb25naXR1ZGUsIGxhdGl0dWRlIHBvc2l0aW9uIChlYWNoIGluIGRlY2ltYWwgZGVncmVlcylcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxQb2ludD59IGEgUG9pbnQgZmVhdHVyZVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2ludCA9IHR1cmYucG9pbnQoWy03NS4zNDMsIDM5Ljk4NF0pO1xuICpcbiAqIC8vPXBvaW50XG4gKi9cbmZ1bmN0aW9uIHBvaW50KGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICBpZiAoIWNvb3JkaW5hdGVzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkaW5hdGVzIGlzIHJlcXVpcmVkXCIpO1xuICAgIH1cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29vcmRpbmF0ZXMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkaW5hdGVzIG11c3QgYmUgYW4gQXJyYXlcIik7XG4gICAgfVxuICAgIGlmIChjb29yZGluYXRlcy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkaW5hdGVzIG11c3QgYmUgYXQgbGVhc3QgMiBudW1iZXJzIGxvbmdcIik7XG4gICAgfVxuICAgIGlmICghaXNOdW1iZXIoY29vcmRpbmF0ZXNbMF0pIHx8ICFpc051bWJlcihjb29yZGluYXRlc1sxXSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29vcmRpbmF0ZXMgbXVzdCBjb250YWluIG51bWJlcnNcIik7XG4gICAgfVxuICAgIHZhciBnZW9tID0ge1xuICAgICAgICB0eXBlOiBcIlBvaW50XCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5wb2ludCA9IHBvaW50O1xuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIFBvaW50fSB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259IGZyb20gYW4gQXJyYXkgb2YgUG9pbnQgY29vcmRpbmF0ZXMuXG4gKlxuICogQG5hbWUgcG9pbnRzXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBQb2ludHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gVHJhbnNsYXRlIHRoZXNlIHByb3BlcnRpZXMgdG8gZWFjaCBGZWF0dXJlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdXG4gKiBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbjxQb2ludD59IFBvaW50IEZlYXR1cmVcbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9pbnRzID0gdHVyZi5wb2ludHMoW1xuICogICBbLTc1LCAzOV0sXG4gKiAgIFstODAsIDQ1XSxcbiAqICAgWy03OCwgNTBdXG4gKiBdKTtcbiAqXG4gKiAvLz1wb2ludHNcbiAqL1xuZnVuY3Rpb24gcG9pbnRzKGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24oY29vcmRpbmF0ZXMubWFwKGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICAgICAgcmV0dXJuIHBvaW50KGNvb3JkcywgcHJvcGVydGllcyk7XG4gICAgfSksIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5wb2ludHMgPSBwb2ludHM7XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgUG9seWdvbn0ge0BsaW5rIEZlYXR1cmV9IGZyb20gYW4gQXJyYXkgb2YgTGluZWFyUmluZ3MuXG4gKlxuICogQG5hbWUgcG9seWdvblxuICogQHBhcmFtIHtBcnJheTxBcnJheTxBcnJheTxudW1iZXI+Pj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIExpbmVhclJpbmdzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8UG9seWdvbj59IFBvbHlnb24gRmVhdHVyZVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2x5Z29uID0gdHVyZi5wb2x5Z29uKFtbWy01LCA1Ml0sIFstNCwgNTZdLCBbLTIsIDUxXSwgWy03LCA1NF0sIFstNSwgNTJdXV0sIHsgbmFtZTogJ3BvbHkxJyB9KTtcbiAqXG4gKiAvLz1wb2x5Z29uXG4gKi9cbmZ1bmN0aW9uIHBvbHlnb24oY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIGZvciAodmFyIF9pID0gMCwgY29vcmRpbmF0ZXNfMSA9IGNvb3JkaW5hdGVzOyBfaSA8IGNvb3JkaW5hdGVzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciByaW5nID0gY29vcmRpbmF0ZXNfMVtfaV07XG4gICAgICAgIGlmIChyaW5nLmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVhY2ggTGluZWFyUmluZyBvZiBhIFBvbHlnb24gbXVzdCBoYXZlIDQgb3IgbW9yZSBQb3NpdGlvbnMuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmluZ1tyaW5nLmxlbmd0aCAtIDFdLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAvLyBDaGVjayBpZiBmaXJzdCBwb2ludCBvZiBQb2x5Z29uIGNvbnRhaW5zIHR3byBudW1iZXJzXG4gICAgICAgICAgICBpZiAocmluZ1tyaW5nLmxlbmd0aCAtIDFdW2pdICE9PSByaW5nWzBdW2pdKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmlyc3QgYW5kIGxhc3QgUG9zaXRpb24gYXJlIG5vdCBlcXVpdmFsZW50LlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogXCJQb2x5Z29uXCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5wb2x5Z29uID0gcG9seWdvbjtcbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBQb2x5Z29ufSB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259IGZyb20gYW4gQXJyYXkgb2YgUG9seWdvbiBjb29yZGluYXRlcy5cbiAqXG4gKiBAbmFtZSBwb2x5Z29uc1xuICogQHBhcmFtIHtBcnJheTxBcnJheTxBcnJheTxBcnJheTxudW1iZXI+Pj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBQb2x5Z29uIGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbjxQb2x5Z29uPn0gUG9seWdvbiBGZWF0dXJlQ29sbGVjdGlvblxuICogQGV4YW1wbGVcbiAqIHZhciBwb2x5Z29ucyA9IHR1cmYucG9seWdvbnMoW1xuICogICBbW1stNSwgNTJdLCBbLTQsIDU2XSwgWy0yLCA1MV0sIFstNywgNTRdLCBbLTUsIDUyXV1dLFxuICogICBbW1stMTUsIDQyXSwgWy0xNCwgNDZdLCBbLTEyLCA0MV0sIFstMTcsIDQ0XSwgWy0xNSwgNDJdXV0sXG4gKiBdKTtcbiAqXG4gKiAvLz1wb2x5Z29uc1xuICovXG5mdW5jdGlvbiBwb2x5Z29ucyhjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKGNvb3JkaW5hdGVzLm1hcChmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgICAgIHJldHVybiBwb2x5Z29uKGNvb3JkcywgcHJvcGVydGllcyk7XG4gICAgfSksIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5wb2x5Z29ucyA9IHBvbHlnb25zO1xuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIExpbmVTdHJpbmd9IHtAbGluayBGZWF0dXJlfSBmcm9tIGFuIEFycmF5IG9mIFBvc2l0aW9ucy5cbiAqXG4gKiBAbmFtZSBsaW5lU3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBQb3NpdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxMaW5lU3RyaW5nPn0gTGluZVN0cmluZyBGZWF0dXJlXG4gKiBAZXhhbXBsZVxuICogdmFyIGxpbmVzdHJpbmcxID0gdHVyZi5saW5lU3RyaW5nKFtbLTI0LCA2M10sIFstMjMsIDYwXSwgWy0yNSwgNjVdLCBbLTIwLCA2OV1dLCB7bmFtZTogJ2xpbmUgMSd9KTtcbiAqIHZhciBsaW5lc3RyaW5nMiA9IHR1cmYubGluZVN0cmluZyhbWy0xNCwgNDNdLCBbLTEzLCA0MF0sIFstMTUsIDQ1XSwgWy0xMCwgNDldXSwge25hbWU6ICdsaW5lIDInfSk7XG4gKlxuICogLy89bGluZXN0cmluZzFcbiAqIC8vPWxpbmVzdHJpbmcyXG4gKi9cbmZ1bmN0aW9uIGxpbmVTdHJpbmcoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIGlmIChjb29yZGluYXRlcy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkaW5hdGVzIG11c3QgYmUgYW4gYXJyYXkgb2YgdHdvIG9yIG1vcmUgcG9zaXRpb25zXCIpO1xuICAgIH1cbiAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogXCJMaW5lU3RyaW5nXCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5saW5lU3RyaW5nID0gbGluZVN0cmluZztcbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBMaW5lU3RyaW5nfSB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259IGZyb20gYW4gQXJyYXkgb2YgTGluZVN0cmluZyBjb29yZGluYXRlcy5cbiAqXG4gKiBAbmFtZSBsaW5lU3RyaW5nc1xuICogQHBhcmFtIHtBcnJheTxBcnJheTxBcnJheTxudW1iZXI+Pj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIExpbmVhclJpbmdzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF1cbiAqIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlQ29sbGVjdGlvblxuICogQHJldHVybnMge0ZlYXR1cmVDb2xsZWN0aW9uPExpbmVTdHJpbmc+fSBMaW5lU3RyaW5nIEZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAZXhhbXBsZVxuICogdmFyIGxpbmVzdHJpbmdzID0gdHVyZi5saW5lU3RyaW5ncyhbXG4gKiAgIFtbLTI0LCA2M10sIFstMjMsIDYwXSwgWy0yNSwgNjVdLCBbLTIwLCA2OV1dLFxuICogICBbWy0xNCwgNDNdLCBbLTEzLCA0MF0sIFstMTUsIDQ1XSwgWy0xMCwgNDldXVxuICogXSk7XG4gKlxuICogLy89bGluZXN0cmluZ3NcbiAqL1xuZnVuY3Rpb24gbGluZVN0cmluZ3MoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbihjb29yZGluYXRlcy5tYXAoZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICByZXR1cm4gbGluZVN0cmluZyhjb29yZHMsIHByb3BlcnRpZXMpO1xuICAgIH0pLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMubGluZVN0cmluZ3MgPSBsaW5lU3RyaW5ncztcbi8qKlxuICogVGFrZXMgb25lIG9yIG1vcmUge0BsaW5rIEZlYXR1cmV8RmVhdHVyZXN9IGFuZCBjcmVhdGVzIGEge0BsaW5rIEZlYXR1cmVDb2xsZWN0aW9ufS5cbiAqXG4gKiBAbmFtZSBmZWF0dXJlQ29sbGVjdGlvblxuICogQHBhcmFtIHtGZWF0dXJlW119IGZlYXR1cmVzIGlucHV0IGZlYXR1cmVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbn0gRmVhdHVyZUNvbGxlY3Rpb24gb2YgRmVhdHVyZXNcbiAqIEBleGFtcGxlXG4gKiB2YXIgbG9jYXRpb25BID0gdHVyZi5wb2ludChbLTc1LjM0MywgMzkuOTg0XSwge25hbWU6ICdMb2NhdGlvbiBBJ30pO1xuICogdmFyIGxvY2F0aW9uQiA9IHR1cmYucG9pbnQoWy03NS44MzMsIDM5LjI4NF0sIHtuYW1lOiAnTG9jYXRpb24gQid9KTtcbiAqIHZhciBsb2NhdGlvbkMgPSB0dXJmLnBvaW50KFstNzUuNTM0LCAzOS4xMjNdLCB7bmFtZTogJ0xvY2F0aW9uIEMnfSk7XG4gKlxuICogdmFyIGNvbGxlY3Rpb24gPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgbG9jYXRpb25BLFxuICogICBsb2NhdGlvbkIsXG4gKiAgIGxvY2F0aW9uQ1xuICogXSk7XG4gKlxuICogLy89Y29sbGVjdGlvblxuICovXG5mdW5jdGlvbiBmZWF0dXJlQ29sbGVjdGlvbihmZWF0dXJlcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIGZjID0geyB0eXBlOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIgfTtcbiAgICBpZiAob3B0aW9ucy5pZCkge1xuICAgICAgICBmYy5pZCA9IG9wdGlvbnMuaWQ7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmJib3gpIHtcbiAgICAgICAgZmMuYmJveCA9IG9wdGlvbnMuYmJveDtcbiAgICB9XG4gICAgZmMuZmVhdHVyZXMgPSBmZWF0dXJlcztcbiAgICByZXR1cm4gZmM7XG59XG5leHBvcnRzLmZlYXR1cmVDb2xsZWN0aW9uID0gZmVhdHVyZUNvbGxlY3Rpb247XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgRmVhdHVyZTxNdWx0aUxpbmVTdHJpbmc+fSBiYXNlZCBvbiBhXG4gKiBjb29yZGluYXRlIGFycmF5LiBQcm9wZXJ0aWVzIGNhbiBiZSBhZGRlZCBvcHRpb25hbGx5LlxuICpcbiAqIEBuYW1lIG11bHRpTGluZVN0cmluZ1xuICogQHBhcmFtIHtBcnJheTxBcnJheTxBcnJheTxudW1iZXI+Pj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIExpbmVTdHJpbmdzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8TXVsdGlMaW5lU3RyaW5nPn0gYSBNdWx0aUxpbmVTdHJpbmcgZmVhdHVyZVxuICogQHRocm93cyB7RXJyb3J9IGlmIG5vIGNvb3JkaW5hdGVzIGFyZSBwYXNzZWRcbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlMaW5lID0gdHVyZi5tdWx0aUxpbmVTdHJpbmcoW1tbMCwwXSxbMTAsMTBdXV0pO1xuICpcbiAqIC8vPW11bHRpTGluZVxuICovXG5mdW5jdGlvbiBtdWx0aUxpbmVTdHJpbmcoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBnZW9tID0ge1xuICAgICAgICB0eXBlOiBcIk11bHRpTGluZVN0cmluZ1wiLFxuICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZXMsXG4gICAgfTtcbiAgICByZXR1cm4gZmVhdHVyZShnZW9tLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMubXVsdGlMaW5lU3RyaW5nID0gbXVsdGlMaW5lU3RyaW5nO1xuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIEZlYXR1cmU8TXVsdGlQb2ludD59IGJhc2VkIG9uIGFcbiAqIGNvb3JkaW5hdGUgYXJyYXkuIFByb3BlcnRpZXMgY2FuIGJlIGFkZGVkIG9wdGlvbmFsbHkuXG4gKlxuICogQG5hbWUgbXVsdGlQb2ludFxuICogQHBhcmFtIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gY29vcmRpbmF0ZXMgYW4gYXJyYXkgb2YgUG9zaXRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8TXVsdGlQb2ludD59IGEgTXVsdGlQb2ludCBmZWF0dXJlXG4gKiBAdGhyb3dzIHtFcnJvcn0gaWYgbm8gY29vcmRpbmF0ZXMgYXJlIHBhc3NlZFxuICogQGV4YW1wbGVcbiAqIHZhciBtdWx0aVB0ID0gdHVyZi5tdWx0aVBvaW50KFtbMCwwXSxbMTAsMTBdXSk7XG4gKlxuICogLy89bXVsdGlQdFxuICovXG5mdW5jdGlvbiBtdWx0aVBvaW50KGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogXCJNdWx0aVBvaW50XCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5tdWx0aVBvaW50ID0gbXVsdGlQb2ludDtcbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBGZWF0dXJlPE11bHRpUG9seWdvbj59IGJhc2VkIG9uIGFcbiAqIGNvb3JkaW5hdGUgYXJyYXkuIFByb3BlcnRpZXMgY2FuIGJlIGFkZGVkIG9wdGlvbmFsbHkuXG4gKlxuICogQG5hbWUgbXVsdGlQb2x5Z29uXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PEFycmF5PEFycmF5PG51bWJlcj4+Pj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIFBvbHlnb25zXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8TXVsdGlQb2x5Z29uPn0gYSBtdWx0aXBvbHlnb24gZmVhdHVyZVxuICogQHRocm93cyB7RXJyb3J9IGlmIG5vIGNvb3JkaW5hdGVzIGFyZSBwYXNzZWRcbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlQb2x5ID0gdHVyZi5tdWx0aVBvbHlnb24oW1tbWzAsMF0sWzAsMTBdLFsxMCwxMF0sWzEwLDBdLFswLDBdXV1dKTtcbiAqXG4gKiAvLz1tdWx0aVBvbHlcbiAqXG4gKi9cbmZ1bmN0aW9uIG11bHRpUG9seWdvbihjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIGdlb20gPSB7XG4gICAgICAgIHR5cGU6IFwiTXVsdGlQb2x5Z29uXCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5tdWx0aVBvbHlnb24gPSBtdWx0aVBvbHlnb247XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgRmVhdHVyZTxHZW9tZXRyeUNvbGxlY3Rpb24+fSBiYXNlZCBvbiBhXG4gKiBjb29yZGluYXRlIGFycmF5LiBQcm9wZXJ0aWVzIGNhbiBiZSBhZGRlZCBvcHRpb25hbGx5LlxuICpcbiAqIEBuYW1lIGdlb21ldHJ5Q29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheTxHZW9tZXRyeT59IGdlb21ldHJpZXMgYW4gYXJyYXkgb2YgR2VvSlNPTiBHZW9tZXRyaWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8R2VvbWV0cnlDb2xsZWN0aW9uPn0gYSBHZW9KU09OIEdlb21ldHJ5Q29sbGVjdGlvbiBGZWF0dXJlXG4gKiBAZXhhbXBsZVxuICogdmFyIHB0ID0gdHVyZi5nZW9tZXRyeShcIlBvaW50XCIsIFsxMDAsIDBdKTtcbiAqIHZhciBsaW5lID0gdHVyZi5nZW9tZXRyeShcIkxpbmVTdHJpbmdcIiwgW1sxMDEsIDBdLCBbMTAyLCAxXV0pO1xuICogdmFyIGNvbGxlY3Rpb24gPSB0dXJmLmdlb21ldHJ5Q29sbGVjdGlvbihbcHQsIGxpbmVdKTtcbiAqXG4gKiAvLyA9PiBjb2xsZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIGdlb21ldHJ5Q29sbGVjdGlvbihnZW9tZXRyaWVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogXCJHZW9tZXRyeUNvbGxlY3Rpb25cIixcbiAgICAgICAgZ2VvbWV0cmllczogZ2VvbWV0cmllcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5nZW9tZXRyeUNvbGxlY3Rpb24gPSBnZW9tZXRyeUNvbGxlY3Rpb247XG4vKipcbiAqIFJvdW5kIG51bWJlciB0byBwcmVjaXNpb25cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIE51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IFtwcmVjaXNpb249MF0gUHJlY2lzaW9uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSByb3VuZGVkIG51bWJlclxuICogQGV4YW1wbGVcbiAqIHR1cmYucm91bmQoMTIwLjQzMjEpXG4gKiAvLz0xMjBcbiAqXG4gKiB0dXJmLnJvdW5kKDEyMC40MzIxLCAyKVxuICogLy89MTIwLjQzXG4gKi9cbmZ1bmN0aW9uIHJvdW5kKG51bSwgcHJlY2lzaW9uKSB7XG4gICAgaWYgKHByZWNpc2lvbiA9PT0gdm9pZCAwKSB7IHByZWNpc2lvbiA9IDA7IH1cbiAgICBpZiAocHJlY2lzaW9uICYmICEocHJlY2lzaW9uID49IDApKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInByZWNpc2lvbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyXCIpO1xuICAgIH1cbiAgICB2YXIgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24gfHwgMCk7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobnVtICogbXVsdGlwbGllcikgLyBtdWx0aXBsaWVyO1xufVxuZXhwb3J0cy5yb3VuZCA9IHJvdW5kO1xuLyoqXG4gKiBDb252ZXJ0IGEgZGlzdGFuY2UgbWVhc3VyZW1lbnQgKGFzc3VtaW5nIGEgc3BoZXJpY2FsIEVhcnRoKSBmcm9tIHJhZGlhbnMgdG8gYSBtb3JlIGZyaWVuZGx5IHVuaXQuXG4gKiBWYWxpZCB1bml0czogbWlsZXMsIG5hdXRpY2FsbWlsZXMsIGluY2hlcywgeWFyZHMsIG1ldGVycywgbWV0cmVzLCBraWxvbWV0ZXJzLCBjZW50aW1ldGVycywgZmVldFxuICpcbiAqIEBuYW1lIHJhZGlhbnNUb0xlbmd0aFxuICogQHBhcmFtIHtudW1iZXJ9IHJhZGlhbnMgaW4gcmFkaWFucyBhY3Jvc3MgdGhlIHNwaGVyZVxuICogQHBhcmFtIHtzdHJpbmd9IFt1bml0cz1cImtpbG9tZXRlcnNcIl0gY2FuIGJlIGRlZ3JlZXMsIHJhZGlhbnMsIG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRyZXMsXG4gKiBtZXRlcnMsIGtpbG9tZXRyZXMsIGtpbG9tZXRlcnMuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBkaXN0YW5jZVxuICovXG5mdW5jdGlvbiByYWRpYW5zVG9MZW5ndGgocmFkaWFucywgdW5pdHMpIHtcbiAgICBpZiAodW5pdHMgPT09IHZvaWQgMCkgeyB1bml0cyA9IFwia2lsb21ldGVyc1wiOyB9XG4gICAgdmFyIGZhY3RvciA9IGV4cG9ydHMuZmFjdG9yc1t1bml0c107XG4gICAgaWYgKCFmYWN0b3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHVuaXRzICsgXCIgdW5pdHMgaXMgaW52YWxpZFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJhZGlhbnMgKiBmYWN0b3I7XG59XG5leHBvcnRzLnJhZGlhbnNUb0xlbmd0aCA9IHJhZGlhbnNUb0xlbmd0aDtcbi8qKlxuICogQ29udmVydCBhIGRpc3RhbmNlIG1lYXN1cmVtZW50IChhc3N1bWluZyBhIHNwaGVyaWNhbCBFYXJ0aCkgZnJvbSBhIHJlYWwtd29ybGQgdW5pdCBpbnRvIHJhZGlhbnNcbiAqIFZhbGlkIHVuaXRzOiBtaWxlcywgbmF1dGljYWxtaWxlcywgaW5jaGVzLCB5YXJkcywgbWV0ZXJzLCBtZXRyZXMsIGtpbG9tZXRlcnMsIGNlbnRpbWV0ZXJzLCBmZWV0XG4gKlxuICogQG5hbWUgbGVuZ3RoVG9SYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gZGlzdGFuY2UgaW4gcmVhbCB1bml0c1xuICogQHBhcmFtIHtzdHJpbmd9IFt1bml0cz1cImtpbG9tZXRlcnNcIl0gY2FuIGJlIGRlZ3JlZXMsIHJhZGlhbnMsIG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRyZXMsXG4gKiBtZXRlcnMsIGtpbG9tZXRyZXMsIGtpbG9tZXRlcnMuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSByYWRpYW5zXG4gKi9cbmZ1bmN0aW9uIGxlbmd0aFRvUmFkaWFucyhkaXN0YW5jZSwgdW5pdHMpIHtcbiAgICBpZiAodW5pdHMgPT09IHZvaWQgMCkgeyB1bml0cyA9IFwia2lsb21ldGVyc1wiOyB9XG4gICAgdmFyIGZhY3RvciA9IGV4cG9ydHMuZmFjdG9yc1t1bml0c107XG4gICAgaWYgKCFmYWN0b3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHVuaXRzICsgXCIgdW5pdHMgaXMgaW52YWxpZFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGRpc3RhbmNlIC8gZmFjdG9yO1xufVxuZXhwb3J0cy5sZW5ndGhUb1JhZGlhbnMgPSBsZW5ndGhUb1JhZGlhbnM7XG4vKipcbiAqIENvbnZlcnQgYSBkaXN0YW5jZSBtZWFzdXJlbWVudCAoYXNzdW1pbmcgYSBzcGhlcmljYWwgRWFydGgpIGZyb20gYSByZWFsLXdvcmxkIHVuaXQgaW50byBkZWdyZWVzXG4gKiBWYWxpZCB1bml0czogbWlsZXMsIG5hdXRpY2FsbWlsZXMsIGluY2hlcywgeWFyZHMsIG1ldGVycywgbWV0cmVzLCBjZW50aW1ldGVycywga2lsb21ldHJlcywgZmVldFxuICpcbiAqIEBuYW1lIGxlbmd0aFRvRGVncmVlc1xuICogQHBhcmFtIHtudW1iZXJ9IGRpc3RhbmNlIGluIHJlYWwgdW5pdHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdW5pdHM9XCJraWxvbWV0ZXJzXCJdIGNhbiBiZSBkZWdyZWVzLCByYWRpYW5zLCBtaWxlcywgaW5jaGVzLCB5YXJkcywgbWV0cmVzLFxuICogbWV0ZXJzLCBraWxvbWV0cmVzLCBraWxvbWV0ZXJzLlxuICogQHJldHVybnMge251bWJlcn0gZGVncmVlc1xuICovXG5mdW5jdGlvbiBsZW5ndGhUb0RlZ3JlZXMoZGlzdGFuY2UsIHVuaXRzKSB7XG4gICAgcmV0dXJuIHJhZGlhbnNUb0RlZ3JlZXMobGVuZ3RoVG9SYWRpYW5zKGRpc3RhbmNlLCB1bml0cykpO1xufVxuZXhwb3J0cy5sZW5ndGhUb0RlZ3JlZXMgPSBsZW5ndGhUb0RlZ3JlZXM7XG4vKipcbiAqIENvbnZlcnRzIGFueSBiZWFyaW5nIGFuZ2xlIGZyb20gdGhlIG5vcnRoIGxpbmUgZGlyZWN0aW9uIChwb3NpdGl2ZSBjbG9ja3dpc2UpXG4gKiBhbmQgcmV0dXJucyBhbiBhbmdsZSBiZXR3ZWVuIDAtMzYwIGRlZ3JlZXMgKHBvc2l0aXZlIGNsb2Nrd2lzZSksIDAgYmVpbmcgdGhlIG5vcnRoIGxpbmVcbiAqXG4gKiBAbmFtZSBiZWFyaW5nVG9BemltdXRoXG4gKiBAcGFyYW0ge251bWJlcn0gYmVhcmluZyBhbmdsZSwgYmV0d2VlbiAtMTgwIGFuZCArMTgwIGRlZ3JlZXNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IGFuZ2xlIGJldHdlZW4gMCBhbmQgMzYwIGRlZ3JlZXNcbiAqL1xuZnVuY3Rpb24gYmVhcmluZ1RvQXppbXV0aChiZWFyaW5nKSB7XG4gICAgdmFyIGFuZ2xlID0gYmVhcmluZyAlIDM2MDtcbiAgICBpZiAoYW5nbGUgPCAwKSB7XG4gICAgICAgIGFuZ2xlICs9IDM2MDtcbiAgICB9XG4gICAgcmV0dXJuIGFuZ2xlO1xufVxuZXhwb3J0cy5iZWFyaW5nVG9BemltdXRoID0gYmVhcmluZ1RvQXppbXV0aDtcbi8qKlxuICogQ29udmVydHMgYW4gYW5nbGUgaW4gcmFkaWFucyB0byBkZWdyZWVzXG4gKlxuICogQG5hbWUgcmFkaWFuc1RvRGVncmVlc1xuICogQHBhcmFtIHtudW1iZXJ9IHJhZGlhbnMgYW5nbGUgaW4gcmFkaWFuc1xuICogQHJldHVybnMge251bWJlcn0gZGVncmVlcyBiZXR3ZWVuIDAgYW5kIDM2MCBkZWdyZWVzXG4gKi9cbmZ1bmN0aW9uIHJhZGlhbnNUb0RlZ3JlZXMocmFkaWFucykge1xuICAgIHZhciBkZWdyZWVzID0gcmFkaWFucyAlICgyICogTWF0aC5QSSk7XG4gICAgcmV0dXJuIChkZWdyZWVzICogMTgwKSAvIE1hdGguUEk7XG59XG5leHBvcnRzLnJhZGlhbnNUb0RlZ3JlZXMgPSByYWRpYW5zVG9EZWdyZWVzO1xuLyoqXG4gKiBDb252ZXJ0cyBhbiBhbmdsZSBpbiBkZWdyZWVzIHRvIHJhZGlhbnNcbiAqXG4gKiBAbmFtZSBkZWdyZWVzVG9SYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gZGVncmVlcyBhbmdsZSBiZXR3ZWVuIDAgYW5kIDM2MCBkZWdyZWVzXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBhbmdsZSBpbiByYWRpYW5zXG4gKi9cbmZ1bmN0aW9uIGRlZ3JlZXNUb1JhZGlhbnMoZGVncmVlcykge1xuICAgIHZhciByYWRpYW5zID0gZGVncmVlcyAlIDM2MDtcbiAgICByZXR1cm4gKHJhZGlhbnMgKiBNYXRoLlBJKSAvIDE4MDtcbn1cbmV4cG9ydHMuZGVncmVlc1RvUmFkaWFucyA9IGRlZ3JlZXNUb1JhZGlhbnM7XG4vKipcbiAqIENvbnZlcnRzIGEgbGVuZ3RoIHRvIHRoZSByZXF1ZXN0ZWQgdW5pdC5cbiAqIFZhbGlkIHVuaXRzOiBtaWxlcywgbmF1dGljYWxtaWxlcywgaW5jaGVzLCB5YXJkcywgbWV0ZXJzLCBtZXRyZXMsIGtpbG9tZXRlcnMsIGNlbnRpbWV0ZXJzLCBmZWV0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCB0byBiZSBjb252ZXJ0ZWRcbiAqIEBwYXJhbSB7VW5pdHN9IFtvcmlnaW5hbFVuaXQ9XCJraWxvbWV0ZXJzXCJdIG9mIHRoZSBsZW5ndGhcbiAqIEBwYXJhbSB7VW5pdHN9IFtmaW5hbFVuaXQ9XCJraWxvbWV0ZXJzXCJdIHJldHVybmVkIHVuaXRcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBjb252ZXJ0ZWQgbGVuZ3RoXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRMZW5ndGgobGVuZ3RoLCBvcmlnaW5hbFVuaXQsIGZpbmFsVW5pdCkge1xuICAgIGlmIChvcmlnaW5hbFVuaXQgPT09IHZvaWQgMCkgeyBvcmlnaW5hbFVuaXQgPSBcImtpbG9tZXRlcnNcIjsgfVxuICAgIGlmIChmaW5hbFVuaXQgPT09IHZvaWQgMCkgeyBmaW5hbFVuaXQgPSBcImtpbG9tZXRlcnNcIjsgfVxuICAgIGlmICghKGxlbmd0aCA+PSAwKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJsZW5ndGggbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlclwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJhZGlhbnNUb0xlbmd0aChsZW5ndGhUb1JhZGlhbnMobGVuZ3RoLCBvcmlnaW5hbFVuaXQpLCBmaW5hbFVuaXQpO1xufVxuZXhwb3J0cy5jb252ZXJ0TGVuZ3RoID0gY29udmVydExlbmd0aDtcbi8qKlxuICogQ29udmVydHMgYSBhcmVhIHRvIHRoZSByZXF1ZXN0ZWQgdW5pdC5cbiAqIFZhbGlkIHVuaXRzOiBraWxvbWV0ZXJzLCBraWxvbWV0cmVzLCBtZXRlcnMsIG1ldHJlcywgY2VudGltZXRyZXMsIG1pbGxpbWV0ZXJzLCBhY3JlcywgbWlsZXMsIHlhcmRzLCBmZWV0LCBpbmNoZXMsIGhlY3RhcmVzXG4gKiBAcGFyYW0ge251bWJlcn0gYXJlYSB0byBiZSBjb252ZXJ0ZWRcbiAqIEBwYXJhbSB7VW5pdHN9IFtvcmlnaW5hbFVuaXQ9XCJtZXRlcnNcIl0gb2YgdGhlIGRpc3RhbmNlXG4gKiBAcGFyYW0ge1VuaXRzfSBbZmluYWxVbml0PVwia2lsb21ldGVyc1wiXSByZXR1cm5lZCB1bml0XG4gKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgY29udmVydGVkIGFyZWFcbiAqL1xuZnVuY3Rpb24gY29udmVydEFyZWEoYXJlYSwgb3JpZ2luYWxVbml0LCBmaW5hbFVuaXQpIHtcbiAgICBpZiAob3JpZ2luYWxVbml0ID09PSB2b2lkIDApIHsgb3JpZ2luYWxVbml0ID0gXCJtZXRlcnNcIjsgfVxuICAgIGlmIChmaW5hbFVuaXQgPT09IHZvaWQgMCkgeyBmaW5hbFVuaXQgPSBcImtpbG9tZXRlcnNcIjsgfVxuICAgIGlmICghKGFyZWEgPj0gMCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXJlYSBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyXCIpO1xuICAgIH1cbiAgICB2YXIgc3RhcnRGYWN0b3IgPSBleHBvcnRzLmFyZWFGYWN0b3JzW29yaWdpbmFsVW5pdF07XG4gICAgaWYgKCFzdGFydEZhY3Rvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIG9yaWdpbmFsIHVuaXRzXCIpO1xuICAgIH1cbiAgICB2YXIgZmluYWxGYWN0b3IgPSBleHBvcnRzLmFyZWFGYWN0b3JzW2ZpbmFsVW5pdF07XG4gICAgaWYgKCFmaW5hbEZhY3Rvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGZpbmFsIHVuaXRzXCIpO1xuICAgIH1cbiAgICByZXR1cm4gKGFyZWEgLyBzdGFydEZhY3RvcikgKiBmaW5hbEZhY3Rvcjtcbn1cbmV4cG9ydHMuY29udmVydEFyZWEgPSBjb252ZXJ0QXJlYTtcbi8qKlxuICogaXNOdW1iZXJcbiAqXG4gKiBAcGFyYW0geyp9IG51bSBOdW1iZXIgdG8gdmFsaWRhdGVcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlL2ZhbHNlXG4gKiBAZXhhbXBsZVxuICogdHVyZi5pc051bWJlcigxMjMpXG4gKiAvLz10cnVlXG4gKiB0dXJmLmlzTnVtYmVyKCdmb28nKVxuICogLy89ZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIobnVtKSB7XG4gICAgcmV0dXJuICFpc05hTihudW0pICYmIG51bSAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheShudW0pO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuLyoqXG4gKiBpc09iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gaW5wdXQgdmFyaWFibGUgdG8gdmFsaWRhdGVcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlL2ZhbHNlXG4gKiBAZXhhbXBsZVxuICogdHVyZi5pc09iamVjdCh7ZWxldmF0aW9uOiAxMH0pXG4gKiAvLz10cnVlXG4gKiB0dXJmLmlzT2JqZWN0KCdmb28nKVxuICogLy89ZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QoaW5wdXQpIHtcbiAgICByZXR1cm4gISFpbnB1dCAmJiBpbnB1dC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuLyoqXG4gKiBWYWxpZGF0ZSBCQm94XG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gYmJveCBCQm94IHRvIHZhbGlkYXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEB0aHJvd3MgRXJyb3IgaWYgQkJveCBpcyBub3QgdmFsaWRcbiAqIEBleGFtcGxlXG4gKiB2YWxpZGF0ZUJCb3goWy0xODAsIC00MCwgMTEwLCA1MF0pXG4gKiAvLz1PS1xuICogdmFsaWRhdGVCQm94KFstMTgwLCAtNDBdKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlQkJveCgnRm9vJylcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUJCb3goNSlcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUJCb3gobnVsbClcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUJCb3godW5kZWZpbmVkKVxuICogLy89RXJyb3JcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVCQm94KGJib3gpIHtcbiAgICBpZiAoIWJib3gpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYmJveCBpcyByZXF1aXJlZFwiKTtcbiAgICB9XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJib3gpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImJib3ggbXVzdCBiZSBhbiBBcnJheVwiKTtcbiAgICB9XG4gICAgaWYgKGJib3gubGVuZ3RoICE9PSA0ICYmIGJib3gubGVuZ3RoICE9PSA2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImJib3ggbXVzdCBiZSBhbiBBcnJheSBvZiA0IG9yIDYgbnVtYmVyc1wiKTtcbiAgICB9XG4gICAgYmJveC5mb3JFYWNoKGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgaWYgKCFpc051bWJlcihudW0pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJiYm94IG11c3Qgb25seSBjb250YWluIG51bWJlcnNcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMudmFsaWRhdGVCQm94ID0gdmFsaWRhdGVCQm94O1xuLyoqXG4gKiBWYWxpZGF0ZSBJZFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IGlkIElkIHRvIHZhbGlkYXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEB0aHJvd3MgRXJyb3IgaWYgSWQgaXMgbm90IHZhbGlkXG4gKiBAZXhhbXBsZVxuICogdmFsaWRhdGVJZChbLTE4MCwgLTQwLCAxMTAsIDUwXSlcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUlkKFstMTgwLCAtNDBdKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlSWQoJ0ZvbycpXG4gKiAvLz1PS1xuICogdmFsaWRhdGVJZCg1KVxuICogLy89T0tcbiAqIHZhbGlkYXRlSWQobnVsbClcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUlkKHVuZGVmaW5lZClcbiAqIC8vPUVycm9yXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlSWQoaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImlkIGlzIHJlcXVpcmVkXCIpO1xuICAgIH1cbiAgICBpZiAoW1wic3RyaW5nXCIsIFwibnVtYmVyXCJdLmluZGV4T2YodHlwZW9mIGlkKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWQgbXVzdCBiZSBhIG51bWJlciBvciBhIHN0cmluZ1wiKTtcbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlSWQgPSB2YWxpZGF0ZUlkO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG52YXIgaGVscGVycyA9IHJlcXVpcmUoJ0B0dXJmL2hlbHBlcnMnKTtcblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgY29vcmRFYWNoXG4gKlxuICogQGNhbGxiYWNrIGNvb3JkRWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGN1cnJlbnRDb29yZCBUaGUgY3VycmVudCBjb29yZGluYXRlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb29yZEluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBjb29yZGluYXRlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBnZW9tZXRyeUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgY29vcmRpbmF0ZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LmZvckVhY2goKVxuICpcbiAqIEBuYW1lIGNvb3JkRWFjaFxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAoY3VycmVudENvb3JkLCBjb29yZEluZGV4LCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KVxuICogQHBhcmFtIHtib29sZWFufSBbZXhjbHVkZVdyYXBDb29yZD1mYWxzZV0gd2hldGhlciBvciBub3QgdG8gaW5jbHVkZSB0aGUgZmluYWwgY29vcmRpbmF0ZSBvZiBMaW5lYXJSaW5ncyB0aGF0IHdyYXBzIHRoZSByaW5nIGluIGl0cyBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgdHVyZi5wb2ludChbMjYsIDM3XSwge1wiZm9vXCI6IFwiYmFyXCJ9KSxcbiAqICAgdHVyZi5wb2ludChbMzYsIDUzXSwge1wiaGVsbG9cIjogXCJ3b3JsZFwifSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuY29vcmRFYWNoKGZlYXR1cmVzLCBmdW5jdGlvbiAoY3VycmVudENvb3JkLCBjb29yZEluZGV4LCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KSB7XG4gKiAgIC8vPWN1cnJlbnRDb29yZFxuICogICAvLz1jb29yZEluZGV4XG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1tdWx0aUZlYXR1cmVJbmRleFxuICogICAvLz1nZW9tZXRyeUluZGV4XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gY29vcmRFYWNoKGdlb2pzb24sIGNhbGxiYWNrLCBleGNsdWRlV3JhcENvb3JkKSB7XG4gIC8vIEhhbmRsZXMgbnVsbCBHZW9tZXRyeSAtLSBTa2lwcyB0aGlzIEdlb0pTT05cbiAgaWYgKGdlb2pzb24gPT09IG51bGwpIHJldHVybjtcbiAgdmFyIGosXG4gICAgayxcbiAgICBsLFxuICAgIGdlb21ldHJ5LFxuICAgIHN0b3BHLFxuICAgIGNvb3JkcyxcbiAgICBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbixcbiAgICB3cmFwU2hyaW5rID0gMCxcbiAgICBjb29yZEluZGV4ID0gMCxcbiAgICBpc0dlb21ldHJ5Q29sbGVjdGlvbixcbiAgICB0eXBlID0gZ2VvanNvbi50eXBlLFxuICAgIGlzRmVhdHVyZUNvbGxlY3Rpb24gPSB0eXBlID09PSBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgaXNGZWF0dXJlID0gdHlwZSA9PT0gXCJGZWF0dXJlXCIsXG4gICAgc3RvcCA9IGlzRmVhdHVyZUNvbGxlY3Rpb24gPyBnZW9qc29uLmZlYXR1cmVzLmxlbmd0aCA6IDE7XG5cbiAgLy8gVGhpcyBsb2dpYyBtYXkgbG9vayBhIGxpdHRsZSB3ZWlyZC4gVGhlIHJlYXNvbiB3aHkgaXQgaXMgdGhhdCB3YXlcbiAgLy8gaXMgYmVjYXVzZSBpdCdzIHRyeWluZyB0byBiZSBmYXN0LiBHZW9KU09OIHN1cHBvcnRzIG11bHRpcGxlIGtpbmRzXG4gIC8vIG9mIG9iamVjdHMgYXQgaXRzIHJvb3Q6IEZlYXR1cmVDb2xsZWN0aW9uLCBGZWF0dXJlcywgR2VvbWV0cmllcy5cbiAgLy8gVGhpcyBmdW5jdGlvbiBoYXMgdGhlIHJlc3BvbnNpYmlsaXR5IG9mIGhhbmRsaW5nIGFsbCBvZiB0aGVtLCBhbmQgdGhhdFxuICAvLyBtZWFucyB0aGF0IHNvbWUgb2YgdGhlIGBmb3JgIGxvb3BzIHlvdSBzZWUgYmVsb3cgYWN0dWFsbHkganVzdCBkb24ndCBhcHBseVxuICAvLyB0byBjZXJ0YWluIGlucHV0cy4gRm9yIGluc3RhbmNlLCBpZiB5b3UgZ2l2ZSB0aGlzIGp1c3QgYVxuICAvLyBQb2ludCBnZW9tZXRyeSwgdGhlbiBib3RoIGxvb3BzIGFyZSBzaG9ydC1jaXJjdWl0ZWQgYW5kIGFsbCB3ZSBkb1xuICAvLyBpcyBncmFkdWFsbHkgcmVuYW1lIHRoZSBpbnB1dCB1bnRpbCBpdCdzIGNhbGxlZCAnZ2VvbWV0cnknLlxuICAvL1xuICAvLyBUaGlzIGFsc28gYWltcyB0byBhbGxvY2F0ZSBhcyBmZXcgcmVzb3VyY2VzIGFzIHBvc3NpYmxlOiBqdXN0IGFcbiAgLy8gZmV3IG51bWJlcnMgYW5kIGJvb2xlYW5zLCByYXRoZXIgdGhhbiBhbnkgdGVtcG9yYXJ5IGFycmF5cyBhcyB3b3VsZFxuICAvLyBiZSByZXF1aXJlZCB3aXRoIHRoZSBub3JtYWxpemF0aW9uIGFwcHJvYWNoLlxuICBmb3IgKHZhciBmZWF0dXJlSW5kZXggPSAwOyBmZWF0dXJlSW5kZXggPCBzdG9wOyBmZWF0dXJlSW5kZXgrKykge1xuICAgIGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uID0gaXNGZWF0dXJlQ29sbGVjdGlvblxuICAgICAgPyBnZW9qc29uLmZlYXR1cmVzW2ZlYXR1cmVJbmRleF0uZ2VvbWV0cnlcbiAgICAgIDogaXNGZWF0dXJlXG4gICAgICA/IGdlb2pzb24uZ2VvbWV0cnlcbiAgICAgIDogZ2VvanNvbjtcbiAgICBpc0dlb21ldHJ5Q29sbGVjdGlvbiA9IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLnR5cGUgPT09IFwiR2VvbWV0cnlDb2xsZWN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gICAgc3RvcEcgPSBpc0dlb21ldHJ5Q29sbGVjdGlvblxuICAgICAgPyBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbi5nZW9tZXRyaWVzLmxlbmd0aFxuICAgICAgOiAxO1xuXG4gICAgZm9yICh2YXIgZ2VvbUluZGV4ID0gMDsgZ2VvbUluZGV4IDwgc3RvcEc7IGdlb21JbmRleCsrKSB7XG4gICAgICB2YXIgbXVsdGlGZWF0dXJlSW5kZXggPSAwO1xuICAgICAgdmFyIGdlb21ldHJ5SW5kZXggPSAwO1xuICAgICAgZ2VvbWV0cnkgPSBpc0dlb21ldHJ5Q29sbGVjdGlvblxuICAgICAgICA/IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLmdlb21ldHJpZXNbZ2VvbUluZGV4XVxuICAgICAgICA6IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uO1xuXG4gICAgICAvLyBIYW5kbGVzIG51bGwgR2VvbWV0cnkgLS0gU2tpcHMgdGhpcyBnZW9tZXRyeVxuICAgICAgaWYgKGdlb21ldHJ5ID09PSBudWxsKSBjb250aW51ZTtcbiAgICAgIGNvb3JkcyA9IGdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgICAgdmFyIGdlb21UeXBlID0gZ2VvbWV0cnkudHlwZTtcblxuICAgICAgd3JhcFNocmluayA9XG4gICAgICAgIGV4Y2x1ZGVXcmFwQ29vcmQgJiZcbiAgICAgICAgKGdlb21UeXBlID09PSBcIlBvbHlnb25cIiB8fCBnZW9tVHlwZSA9PT0gXCJNdWx0aVBvbHlnb25cIilcbiAgICAgICAgICA/IDFcbiAgICAgICAgICA6IDA7XG5cbiAgICAgIHN3aXRjaCAoZ2VvbVR5cGUpIHtcbiAgICAgICAgY2FzZSBudWxsOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgICAgY29vcmRzLFxuICAgICAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBjb29yZEluZGV4Kys7XG4gICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgrKztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgY29vcmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICAgIGNvb3Jkc1tqXSxcbiAgICAgICAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNvb3JkSW5kZXgrKztcbiAgICAgICAgICAgIGlmIChnZW9tVHlwZSA9PT0gXCJNdWx0aVBvaW50XCIpIG11bHRpRmVhdHVyZUluZGV4Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChnZW9tVHlwZSA9PT0gXCJMaW5lU3RyaW5nXCIpIG11bHRpRmVhdHVyZUluZGV4Kys7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICAgIGNhc2UgXCJNdWx0aUxpbmVTdHJpbmdcIjpcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgY29vcmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgY29vcmRzW2pdLmxlbmd0aCAtIHdyYXBTaHJpbms7IGsrKykge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICAgICAgICBjb29yZHNbal1ba10sXG4gICAgICAgICAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgY29vcmRJbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdlb21UeXBlID09PSBcIk11bHRpTGluZVN0cmluZ1wiKSBtdWx0aUZlYXR1cmVJbmRleCsrO1xuICAgICAgICAgICAgaWYgKGdlb21UeXBlID09PSBcIlBvbHlnb25cIikgZ2VvbWV0cnlJbmRleCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZ2VvbVR5cGUgPT09IFwiUG9seWdvblwiKSBtdWx0aUZlYXR1cmVJbmRleCsrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6XG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGNvb3Jkcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgZ2VvbWV0cnlJbmRleCA9IDA7XG4gICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgY29vcmRzW2pdLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgIGZvciAobCA9IDA7IGwgPCBjb29yZHNbal1ba10ubGVuZ3RoIC0gd3JhcFNocmluazsgbCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICAgICAgICAgIGNvb3Jkc1tqXVtrXVtsXSxcbiAgICAgICAgICAgICAgICAgICAgY29vcmRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnlJbmRleFxuICAgICAgICAgICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29vcmRJbmRleCsrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGdlb21ldHJ5SW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiR2VvbWV0cnlDb2xsZWN0aW9uXCI6XG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGdlb21ldHJ5Lmdlb21ldHJpZXMubGVuZ3RoOyBqKyspXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNvb3JkRWFjaChnZW9tZXRyeS5nZW9tZXRyaWVzW2pdLCBjYWxsYmFjaywgZXhjbHVkZVdyYXBDb29yZCkgPT09XG4gICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIEdlb21ldHJ5IFR5cGVcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGNvb3JkUmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgY29vcmRSZWR1Y2VDYWxsYmFja1xuICogQHBhcmFtIHsqfSBwcmV2aW91c1ZhbHVlIFRoZSBhY2N1bXVsYXRlZCB2YWx1ZSBwcmV2aW91c2x5IHJldHVybmVkIGluIHRoZSBsYXN0IGludm9jYXRpb25cbiAqIG9mIHRoZSBjYWxsYmFjaywgb3IgaW5pdGlhbFZhbHVlLCBpZiBzdXBwbGllZC5cbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gY3VycmVudENvb3JkIFRoZSBjdXJyZW50IGNvb3JkaW5hdGUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGNvb3JkSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIGNvb3JkaW5hdGUgYmVpbmcgcHJvY2Vzc2VkLlxuICogU3RhcnRzIGF0IGluZGV4IDAsIGlmIGFuIGluaXRpYWxWYWx1ZSBpcyBwcm92aWRlZCwgYW5kIGF0IGluZGV4IDEgb3RoZXJ3aXNlLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlGZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIE11bHRpLUZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGdlb21ldHJ5SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEdlb21ldHJ5IGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBjb29yZGluYXRlcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkucmVkdWNlKClcbiAqXG4gKiBAbmFtZSBjb29yZFJlZHVjZVxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxHZW9tZXRyeXxGZWF0dXJlfSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudENvb3JkLCBjb29yZEluZGV4KVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2V4Y2x1ZGVXcmFwQ29vcmQ9ZmFsc2VdIHdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgdGhlIGZpbmFsIGNvb3JkaW5hdGUgb2YgTGluZWFyUmluZ3MgdGhhdCB3cmFwcyB0aGUgcmluZyBpbiBpdHMgaXRlcmF0aW9uLlxuICogQHJldHVybnMgeyp9IFRoZSB2YWx1ZSB0aGF0IHJlc3VsdHMgZnJvbSB0aGUgcmVkdWN0aW9uLlxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICB0dXJmLnBvaW50KFsyNiwgMzddLCB7XCJmb29cIjogXCJiYXJcIn0pLFxuICogICB0dXJmLnBvaW50KFszNiwgNTNdLCB7XCJoZWxsb1wiOiBcIndvcmxkXCJ9KVxuICogXSk7XG4gKlxuICogdHVyZi5jb29yZFJlZHVjZShmZWF0dXJlcywgZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRDb29yZCwgY29vcmRJbmRleCwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleCkge1xuICogICAvLz1wcmV2aW91c1ZhbHVlXG4gKiAgIC8vPWN1cnJlbnRDb29yZFxuICogICAvLz1jb29yZEluZGV4XG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1tdWx0aUZlYXR1cmVJbmRleFxuICogICAvLz1nZW9tZXRyeUluZGV4XG4gKiAgIHJldHVybiBjdXJyZW50Q29vcmQ7XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gY29vcmRSZWR1Y2UoZ2VvanNvbiwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSwgZXhjbHVkZVdyYXBDb29yZCkge1xuICB2YXIgcHJldmlvdXNWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgY29vcmRFYWNoKFxuICAgIGdlb2pzb24sXG4gICAgZnVuY3Rpb24gKFxuICAgICAgY3VycmVudENvb3JkLFxuICAgICAgY29vcmRJbmRleCxcbiAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgZ2VvbWV0cnlJbmRleFxuICAgICkge1xuICAgICAgaWYgKGNvb3JkSW5kZXggPT09IDAgJiYgaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50Q29vcmQ7XG4gICAgICBlbHNlXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjYWxsYmFjayhcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlLFxuICAgICAgICAgIGN1cnJlbnRDb29yZCxcbiAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBleGNsdWRlV3JhcENvb3JkXG4gICk7XG4gIHJldHVybiBwcmV2aW91c1ZhbHVlO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBwcm9wRWFjaFxuICpcbiAqIEBjYWxsYmFjayBwcm9wRWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdH0gY3VycmVudFByb3BlcnRpZXMgVGhlIGN1cnJlbnQgUHJvcGVydGllcyBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBwcm9wZXJ0aWVzIGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5mb3JFYWNoKClcbiAqXG4gKiBAbmFtZSBwcm9wRWFjaFxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAoY3VycmVudFByb3BlcnRpZXMsIGZlYXR1cmVJbmRleClcbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgICAgdHVyZi5wb2ludChbMzYsIDUzXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHR1cmYucHJvcEVhY2goZmVhdHVyZXMsIGZ1bmN0aW9uIChjdXJyZW50UHJvcGVydGllcywgZmVhdHVyZUluZGV4KSB7XG4gKiAgIC8vPWN1cnJlbnRQcm9wZXJ0aWVzXG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIHByb3BFYWNoKGdlb2pzb24sIGNhbGxiYWNrKSB7XG4gIHZhciBpO1xuICBzd2l0Y2ggKGdlb2pzb24udHlwZSkge1xuICAgIGNhc2UgXCJGZWF0dXJlQ29sbGVjdGlvblwiOlxuICAgICAgZm9yIChpID0gMDsgaSA8IGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKGdlb2pzb24uZmVhdHVyZXNbaV0ucHJvcGVydGllcywgaSkgPT09IGZhbHNlKSBicmVhaztcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJGZWF0dXJlXCI6XG4gICAgICBjYWxsYmFjayhnZW9qc29uLnByb3BlcnRpZXMsIDApO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgcHJvcFJlZHVjZVxuICpcbiAqIFRoZSBmaXJzdCB0aW1lIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZSB2YWx1ZXMgcHJvdmlkZWQgYXMgYXJndW1lbnRzIGRlcGVuZFxuICogb24gd2hldGhlciB0aGUgcmVkdWNlIG1ldGhvZCBoYXMgYW4gaW5pdGlhbFZhbHVlIGFyZ3VtZW50LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBwcm92aWRlZCB0byB0aGUgcmVkdWNlIG1ldGhvZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIGluaXRpYWxWYWx1ZS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBub3QgcHJvdmlkZWQ6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgc2Vjb25kIGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogQGNhbGxiYWNrIHByb3BSZWR1Y2VDYWxsYmFja1xuICogQHBhcmFtIHsqfSBwcmV2aW91c1ZhbHVlIFRoZSBhY2N1bXVsYXRlZCB2YWx1ZSBwcmV2aW91c2x5IHJldHVybmVkIGluIHRoZSBsYXN0IGludm9jYXRpb25cbiAqIG9mIHRoZSBjYWxsYmFjaywgb3IgaW5pdGlhbFZhbHVlLCBpZiBzdXBwbGllZC5cbiAqIEBwYXJhbSB7Kn0gY3VycmVudFByb3BlcnRpZXMgVGhlIGN1cnJlbnQgUHJvcGVydGllcyBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBwcm9wZXJ0aWVzIGluIGFueSBHZW9KU09OIG9iamVjdCBpbnRvIGEgc2luZ2xlIHZhbHVlLFxuICogc2ltaWxhciB0byBob3cgQXJyYXkucmVkdWNlIHdvcmtzLiBIb3dldmVyLCBpbiB0aGlzIGNhc2Ugd2UgbGF6aWx5IHJ1blxuICogdGhlIHJlZHVjdGlvbiwgc28gYW4gYXJyYXkgb2YgYWxsIHByb3BlcnRpZXMgaXMgdW5uZWNlc3NhcnkuXG4gKlxuICogQG5hbWUgcHJvcFJlZHVjZVxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudFByb3BlcnRpZXMsIGZlYXR1cmVJbmRleClcbiAqIEBwYXJhbSB7Kn0gW2luaXRpYWxWYWx1ZV0gVmFsdWUgdG8gdXNlIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgZmlyc3QgY2FsbCBvZiB0aGUgY2FsbGJhY2suXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHZhbHVlIHRoYXQgcmVzdWx0cyBmcm9tIHRoZSByZWR1Y3Rpb24uXG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgICAgdHVyZi5wb2ludChbMjYsIDM3XSwge2ZvbzogJ2Jhcid9KSxcbiAqICAgICB0dXJmLnBvaW50KFszNiwgNTNdLCB7aGVsbG86ICd3b3JsZCd9KVxuICogXSk7XG4gKlxuICogdHVyZi5wcm9wUmVkdWNlKGZlYXR1cmVzLCBmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudFByb3BlcnRpZXMsIGZlYXR1cmVJbmRleCkge1xuICogICAvLz1wcmV2aW91c1ZhbHVlXG4gKiAgIC8vPWN1cnJlbnRQcm9wZXJ0aWVzXG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICByZXR1cm4gY3VycmVudFByb3BlcnRpZXNcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBwcm9wUmVkdWNlKGdlb2pzb24sIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUpIHtcbiAgdmFyIHByZXZpb3VzVmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gIHByb3BFYWNoKGdlb2pzb24sIGZ1bmN0aW9uIChjdXJyZW50UHJvcGVydGllcywgZmVhdHVyZUluZGV4KSB7XG4gICAgaWYgKGZlYXR1cmVJbmRleCA9PT0gMCAmJiBpbml0aWFsVmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50UHJvcGVydGllcztcbiAgICBlbHNlXG4gICAgICBwcmV2aW91c1ZhbHVlID0gY2FsbGJhY2socHJldmlvdXNWYWx1ZSwgY3VycmVudFByb3BlcnRpZXMsIGZlYXR1cmVJbmRleCk7XG4gIH0pO1xuICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgZmVhdHVyZUVhY2hcbiAqXG4gKiBAY2FsbGJhY2sgZmVhdHVyZUVhY2hDYWxsYmFja1xuICogQHBhcmFtIHtGZWF0dXJlPGFueT59IGN1cnJlbnRGZWF0dXJlIFRoZSBjdXJyZW50IEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgZmVhdHVyZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvXG4gKiBBcnJheS5mb3JFYWNoLlxuICpcbiAqIEBuYW1lIGZlYXR1cmVFYWNoXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4KVxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmZlYXR1cmVFYWNoKGZlYXR1cmVzLCBmdW5jdGlvbiAoY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCkge1xuICogICAvLz1jdXJyZW50RmVhdHVyZVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBmZWF0dXJlRWFjaChnZW9qc29uLCBjYWxsYmFjaykge1xuICBpZiAoZ2VvanNvbi50eXBlID09PSBcIkZlYXR1cmVcIikge1xuICAgIGNhbGxiYWNrKGdlb2pzb24sIDApO1xuICB9IGVsc2UgaWYgKGdlb2pzb24udHlwZSA9PT0gXCJGZWF0dXJlQ29sbGVjdGlvblwiKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBnZW9qc29uLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY2FsbGJhY2soZ2VvanNvbi5mZWF0dXJlc1tpXSwgaSkgPT09IGZhbHNlKSBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgZmVhdHVyZVJlZHVjZVxuICpcbiAqIFRoZSBmaXJzdCB0aW1lIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZSB2YWx1ZXMgcHJvdmlkZWQgYXMgYXJndW1lbnRzIGRlcGVuZFxuICogb24gd2hldGhlciB0aGUgcmVkdWNlIG1ldGhvZCBoYXMgYW4gaW5pdGlhbFZhbHVlIGFyZ3VtZW50LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBwcm92aWRlZCB0byB0aGUgcmVkdWNlIG1ldGhvZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIGluaXRpYWxWYWx1ZS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBub3QgcHJvdmlkZWQ6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgc2Vjb25kIGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogQGNhbGxiYWNrIGZlYXR1cmVSZWR1Y2VDYWxsYmFja1xuICogQHBhcmFtIHsqfSBwcmV2aW91c1ZhbHVlIFRoZSBhY2N1bXVsYXRlZCB2YWx1ZSBwcmV2aW91c2x5IHJldHVybmVkIGluIHRoZSBsYXN0IGludm9jYXRpb25cbiAqIG9mIHRoZSBjYWxsYmFjaywgb3IgaW5pdGlhbFZhbHVlLCBpZiBzdXBwbGllZC5cbiAqIEBwYXJhbSB7RmVhdHVyZX0gY3VycmVudEZlYXR1cmUgVGhlIGN1cnJlbnQgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBmZWF0dXJlcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkucmVkdWNlKCkuXG4gKlxuICogQG5hbWUgZmVhdHVyZVJlZHVjZVxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleClcbiAqIEBwYXJhbSB7Kn0gW2luaXRpYWxWYWx1ZV0gVmFsdWUgdG8gdXNlIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgZmlyc3QgY2FsbCBvZiB0aGUgY2FsbGJhY2suXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHZhbHVlIHRoYXQgcmVzdWx0cyBmcm9tIHRoZSByZWR1Y3Rpb24uXG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtcImZvb1wiOiBcImJhclwifSksXG4gKiAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtcImhlbGxvXCI6IFwid29ybGRcIn0pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmZlYXR1cmVSZWR1Y2UoZmVhdHVyZXMsIGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4KSB7XG4gKiAgIC8vPXByZXZpb3VzVmFsdWVcbiAqICAgLy89Y3VycmVudEZlYXR1cmVcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIHJldHVybiBjdXJyZW50RmVhdHVyZVxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIGZlYXR1cmVSZWR1Y2UoZ2VvanNvbiwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuICB2YXIgcHJldmlvdXNWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgZmVhdHVyZUVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgpIHtcbiAgICBpZiAoZmVhdHVyZUluZGV4ID09PSAwICYmIGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgcHJldmlvdXNWYWx1ZSA9IGN1cnJlbnRGZWF0dXJlO1xuICAgIGVsc2UgcHJldmlvdXNWYWx1ZSA9IGNhbGxiYWNrKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgpO1xuICB9KTtcbiAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG59XG5cbi8qKlxuICogR2V0IGFsbCBjb29yZGluYXRlcyBmcm9tIGFueSBHZW9KU09OIG9iamVjdC5cbiAqXG4gKiBAbmFtZSBjb29yZEFsbFxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHJldHVybnMge0FycmF5PEFycmF5PG51bWJlcj4+fSBjb29yZGluYXRlIHBvc2l0aW9uIGFycmF5XG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB2YXIgY29vcmRzID0gdHVyZi5jb29yZEFsbChmZWF0dXJlcyk7XG4gKiAvLz0gW1syNiwgMzddLCBbMzYsIDUzXV1cbiAqL1xuZnVuY3Rpb24gY29vcmRBbGwoZ2VvanNvbikge1xuICB2YXIgY29vcmRzID0gW107XG4gIGNvb3JkRWFjaChnZW9qc29uLCBmdW5jdGlvbiAoY29vcmQpIHtcbiAgICBjb29yZHMucHVzaChjb29yZCk7XG4gIH0pO1xuICByZXR1cm4gY29vcmRzO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBnZW9tRWFjaFxuICpcbiAqIEBjYWxsYmFjayBnZW9tRWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge0dlb21ldHJ5fSBjdXJyZW50R2VvbWV0cnkgVGhlIGN1cnJlbnQgR2VvbWV0cnkgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gZmVhdHVyZVByb3BlcnRpZXMgVGhlIGN1cnJlbnQgRmVhdHVyZSBQcm9wZXJ0aWVzIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gZmVhdHVyZUJCb3ggVGhlIGN1cnJlbnQgRmVhdHVyZSBCQm94IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gZmVhdHVyZUlkIFRoZSBjdXJyZW50IEZlYXR1cmUgSWQgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGVhY2ggZ2VvbWV0cnkgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LmZvckVhY2goKVxuICpcbiAqIEBuYW1lIGdlb21FYWNoXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50R2VvbWV0cnksIGZlYXR1cmVJbmRleCwgZmVhdHVyZVByb3BlcnRpZXMsIGZlYXR1cmVCQm94LCBmZWF0dXJlSWQpXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgICB0dXJmLnBvaW50KFsyNiwgMzddLCB7Zm9vOiAnYmFyJ30pLFxuICogICAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmdlb21FYWNoKGZlYXR1cmVzLCBmdW5jdGlvbiAoY3VycmVudEdlb21ldHJ5LCBmZWF0dXJlSW5kZXgsIGZlYXR1cmVQcm9wZXJ0aWVzLCBmZWF0dXJlQkJveCwgZmVhdHVyZUlkKSB7XG4gKiAgIC8vPWN1cnJlbnRHZW9tZXRyeVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgLy89ZmVhdHVyZVByb3BlcnRpZXNcbiAqICAgLy89ZmVhdHVyZUJCb3hcbiAqICAgLy89ZmVhdHVyZUlkXG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gZ2VvbUVhY2goZ2VvanNvbiwgY2FsbGJhY2spIHtcbiAgdmFyIGksXG4gICAgaixcbiAgICBnLFxuICAgIGdlb21ldHJ5LFxuICAgIHN0b3BHLFxuICAgIGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLFxuICAgIGlzR2VvbWV0cnlDb2xsZWN0aW9uLFxuICAgIGZlYXR1cmVQcm9wZXJ0aWVzLFxuICAgIGZlYXR1cmVCQm94LFxuICAgIGZlYXR1cmVJZCxcbiAgICBmZWF0dXJlSW5kZXggPSAwLFxuICAgIGlzRmVhdHVyZUNvbGxlY3Rpb24gPSBnZW9qc29uLnR5cGUgPT09IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAgICBpc0ZlYXR1cmUgPSBnZW9qc29uLnR5cGUgPT09IFwiRmVhdHVyZVwiLFxuICAgIHN0b3AgPSBpc0ZlYXR1cmVDb2xsZWN0aW9uID8gZ2VvanNvbi5mZWF0dXJlcy5sZW5ndGggOiAxO1xuXG4gIC8vIFRoaXMgbG9naWMgbWF5IGxvb2sgYSBsaXR0bGUgd2VpcmQuIFRoZSByZWFzb24gd2h5IGl0IGlzIHRoYXQgd2F5XG4gIC8vIGlzIGJlY2F1c2UgaXQncyB0cnlpbmcgdG8gYmUgZmFzdC4gR2VvSlNPTiBzdXBwb3J0cyBtdWx0aXBsZSBraW5kc1xuICAvLyBvZiBvYmplY3RzIGF0IGl0cyByb290OiBGZWF0dXJlQ29sbGVjdGlvbiwgRmVhdHVyZXMsIEdlb21ldHJpZXMuXG4gIC8vIFRoaXMgZnVuY3Rpb24gaGFzIHRoZSByZXNwb25zaWJpbGl0eSBvZiBoYW5kbGluZyBhbGwgb2YgdGhlbSwgYW5kIHRoYXRcbiAgLy8gbWVhbnMgdGhhdCBzb21lIG9mIHRoZSBgZm9yYCBsb29wcyB5b3Ugc2VlIGJlbG93IGFjdHVhbGx5IGp1c3QgZG9uJ3QgYXBwbHlcbiAgLy8gdG8gY2VydGFpbiBpbnB1dHMuIEZvciBpbnN0YW5jZSwgaWYgeW91IGdpdmUgdGhpcyBqdXN0IGFcbiAgLy8gUG9pbnQgZ2VvbWV0cnksIHRoZW4gYm90aCBsb29wcyBhcmUgc2hvcnQtY2lyY3VpdGVkIGFuZCBhbGwgd2UgZG9cbiAgLy8gaXMgZ3JhZHVhbGx5IHJlbmFtZSB0aGUgaW5wdXQgdW50aWwgaXQncyBjYWxsZWQgJ2dlb21ldHJ5Jy5cbiAgLy9cbiAgLy8gVGhpcyBhbHNvIGFpbXMgdG8gYWxsb2NhdGUgYXMgZmV3IHJlc291cmNlcyBhcyBwb3NzaWJsZToganVzdCBhXG4gIC8vIGZldyBudW1iZXJzIGFuZCBib29sZWFucywgcmF0aGVyIHRoYW4gYW55IHRlbXBvcmFyeSBhcnJheXMgYXMgd291bGRcbiAgLy8gYmUgcmVxdWlyZWQgd2l0aCB0aGUgbm9ybWFsaXphdGlvbiBhcHByb2FjaC5cbiAgZm9yIChpID0gMDsgaSA8IHN0b3A7IGkrKykge1xuICAgIGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uID0gaXNGZWF0dXJlQ29sbGVjdGlvblxuICAgICAgPyBnZW9qc29uLmZlYXR1cmVzW2ldLmdlb21ldHJ5XG4gICAgICA6IGlzRmVhdHVyZVxuICAgICAgPyBnZW9qc29uLmdlb21ldHJ5XG4gICAgICA6IGdlb2pzb247XG4gICAgZmVhdHVyZVByb3BlcnRpZXMgPSBpc0ZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb2pzb24uZmVhdHVyZXNbaV0ucHJvcGVydGllc1xuICAgICAgOiBpc0ZlYXR1cmVcbiAgICAgID8gZ2VvanNvbi5wcm9wZXJ0aWVzXG4gICAgICA6IHt9O1xuICAgIGZlYXR1cmVCQm94ID0gaXNGZWF0dXJlQ29sbGVjdGlvblxuICAgICAgPyBnZW9qc29uLmZlYXR1cmVzW2ldLmJib3hcbiAgICAgIDogaXNGZWF0dXJlXG4gICAgICA/IGdlb2pzb24uYmJveFxuICAgICAgOiB1bmRlZmluZWQ7XG4gICAgZmVhdHVyZUlkID0gaXNGZWF0dXJlQ29sbGVjdGlvblxuICAgICAgPyBnZW9qc29uLmZlYXR1cmVzW2ldLmlkXG4gICAgICA6IGlzRmVhdHVyZVxuICAgICAgPyBnZW9qc29uLmlkXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICBpc0dlb21ldHJ5Q29sbGVjdGlvbiA9IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLnR5cGUgPT09IFwiR2VvbWV0cnlDb2xsZWN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gICAgc3RvcEcgPSBpc0dlb21ldHJ5Q29sbGVjdGlvblxuICAgICAgPyBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbi5nZW9tZXRyaWVzLmxlbmd0aFxuICAgICAgOiAxO1xuXG4gICAgZm9yIChnID0gMDsgZyA8IHN0b3BHOyBnKyspIHtcbiAgICAgIGdlb21ldHJ5ID0gaXNHZW9tZXRyeUNvbGxlY3Rpb25cbiAgICAgICAgPyBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbi5nZW9tZXRyaWVzW2ddXG4gICAgICAgIDogZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb247XG5cbiAgICAgIC8vIEhhbmRsZSBudWxsIEdlb21ldHJ5XG4gICAgICBpZiAoZ2VvbWV0cnkgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgIGZlYXR1cmVQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgZmVhdHVyZUJCb3gsXG4gICAgICAgICAgICBmZWF0dXJlSWRcbiAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAoZ2VvbWV0cnkudHlwZSkge1xuICAgICAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgICAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgICAgZ2VvbWV0cnksXG4gICAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgZmVhdHVyZVByb3BlcnRpZXMsXG4gICAgICAgICAgICAgIGZlYXR1cmVCQm94LFxuICAgICAgICAgICAgICBmZWF0dXJlSWRcbiAgICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJHZW9tZXRyeUNvbGxlY3Rpb25cIjoge1xuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBnZW9tZXRyeS5nZW9tZXRyaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICAgIGdlb21ldHJ5Lmdlb21ldHJpZXNbal0sXG4gICAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICAgIGZlYXR1cmVQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgIGZlYXR1cmVCQm94LFxuICAgICAgICAgICAgICAgIGZlYXR1cmVJZFxuICAgICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBHZW9tZXRyeSBUeXBlXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBPbmx5IGluY3JlYXNlIGBmZWF0dXJlSW5kZXhgIHBlciBlYWNoIGZlYXR1cmVcbiAgICBmZWF0dXJlSW5kZXgrKztcbiAgfVxufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBnZW9tUmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgZ2VvbVJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHtHZW9tZXRyeX0gY3VycmVudEdlb21ldHJ5IFRoZSBjdXJyZW50IEdlb21ldHJ5IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtPYmplY3R9IGZlYXR1cmVQcm9wZXJ0aWVzIFRoZSBjdXJyZW50IEZlYXR1cmUgUHJvcGVydGllcyBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGZlYXR1cmVCQm94IFRoZSBjdXJyZW50IEZlYXR1cmUgQkJveCBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGZlYXR1cmVJZCBUaGUgY3VycmVudCBGZWF0dXJlIElkIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBnZW9tZXRyeSBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkucmVkdWNlKCkuXG4gKlxuICogQG5hbWUgZ2VvbVJlZHVjZVxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAocHJldmlvdXNWYWx1ZSwgY3VycmVudEdlb21ldHJ5LCBmZWF0dXJlSW5kZXgsIGZlYXR1cmVQcm9wZXJ0aWVzLCBmZWF0dXJlQkJveCwgZmVhdHVyZUlkKVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm5zIHsqfSBUaGUgdmFsdWUgdGhhdCByZXN1bHRzIGZyb20gdGhlIHJlZHVjdGlvbi5cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgICB0dXJmLnBvaW50KFsyNiwgMzddLCB7Zm9vOiAnYmFyJ30pLFxuICogICAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmdlb21SZWR1Y2UoZmVhdHVyZXMsIGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50R2VvbWV0cnksIGZlYXR1cmVJbmRleCwgZmVhdHVyZVByb3BlcnRpZXMsIGZlYXR1cmVCQm94LCBmZWF0dXJlSWQpIHtcbiAqICAgLy89cHJldmlvdXNWYWx1ZVxuICogICAvLz1jdXJyZW50R2VvbWV0cnlcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPWZlYXR1cmVQcm9wZXJ0aWVzXG4gKiAgIC8vPWZlYXR1cmVCQm94XG4gKiAgIC8vPWZlYXR1cmVJZFxuICogICByZXR1cm4gY3VycmVudEdlb21ldHJ5XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gZ2VvbVJlZHVjZShnZW9qc29uLCBjYWxsYmFjaywgaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBwcmV2aW91c1ZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICBnZW9tRWFjaChcbiAgICBnZW9qc29uLFxuICAgIGZ1bmN0aW9uIChcbiAgICAgIGN1cnJlbnRHZW9tZXRyeSxcbiAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgIGZlYXR1cmVQcm9wZXJ0aWVzLFxuICAgICAgZmVhdHVyZUJCb3gsXG4gICAgICBmZWF0dXJlSWRcbiAgICApIHtcbiAgICAgIGlmIChmZWF0dXJlSW5kZXggPT09IDAgJiYgaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50R2VvbWV0cnk7XG4gICAgICBlbHNlXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjYWxsYmFjayhcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlLFxuICAgICAgICAgIGN1cnJlbnRHZW9tZXRyeSxcbiAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgZmVhdHVyZVByb3BlcnRpZXMsXG4gICAgICAgICAgZmVhdHVyZUJCb3gsXG4gICAgICAgICAgZmVhdHVyZUlkXG4gICAgICAgICk7XG4gICAgfVxuICApO1xuICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgZmxhdHRlbkVhY2hcbiAqXG4gKiBAY2FsbGJhY2sgZmxhdHRlbkVhY2hDYWxsYmFja1xuICogQHBhcmFtIHtGZWF0dXJlfSBjdXJyZW50RmVhdHVyZSBUaGUgY3VycmVudCBmbGF0dGVuZWQgZmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aUZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgTXVsdGktRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgZmxhdHRlbmVkIGZlYXR1cmVzIGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0b1xuICogQXJyYXkuZm9yRWFjaC5cbiAqXG4gKiBAbmFtZSBmbGF0dGVuRWFjaFxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAoY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpXG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgICAgdHVyZi5wb2ludChbMjYsIDM3XSwge2ZvbzogJ2Jhcid9KSxcbiAqICAgICB0dXJmLm11bHRpUG9pbnQoW1s0MCwgMzBdLCBbMzYsIDUzXV0sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmZsYXR0ZW5FYWNoKGZlYXR1cmVzLCBmdW5jdGlvbiAoY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpIHtcbiAqICAgLy89Y3VycmVudEZlYXR1cmVcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPW11bHRpRmVhdHVyZUluZGV4XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gZmxhdHRlbkVhY2goZ2VvanNvbiwgY2FsbGJhY2spIHtcbiAgZ2VvbUVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGdlb21ldHJ5LCBmZWF0dXJlSW5kZXgsIHByb3BlcnRpZXMsIGJib3gsIGlkKSB7XG4gICAgLy8gQ2FsbGJhY2sgZm9yIHNpbmdsZSBnZW9tZXRyeVxuICAgIHZhciB0eXBlID0gZ2VvbWV0cnkgPT09IG51bGwgPyBudWxsIDogZ2VvbWV0cnkudHlwZTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgbnVsbDpcbiAgICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgIGhlbHBlcnMuZmVhdHVyZShnZW9tZXRyeSwgcHJvcGVydGllcywgeyBiYm94OiBiYm94LCBpZDogaWQgfSksXG4gICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAwXG4gICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBnZW9tVHlwZTtcblxuICAgIC8vIENhbGxiYWNrIGZvciBtdWx0aS1nZW9tZXRyeVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgICAgZ2VvbVR5cGUgPSBcIlBvaW50XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgICAgICBnZW9tVHlwZSA9IFwiTGluZVN0cmluZ1wiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgICAgZ2VvbVR5cGUgPSBcIlBvbHlnb25cIjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZm9yIChcbiAgICAgIHZhciBtdWx0aUZlYXR1cmVJbmRleCA9IDA7XG4gICAgICBtdWx0aUZlYXR1cmVJbmRleCA8IGdlb21ldHJ5LmNvb3JkaW5hdGVzLmxlbmd0aDtcbiAgICAgIG11bHRpRmVhdHVyZUluZGV4KytcbiAgICApIHtcbiAgICAgIHZhciBjb29yZGluYXRlID0gZ2VvbWV0cnkuY29vcmRpbmF0ZXNbbXVsdGlGZWF0dXJlSW5kZXhdO1xuICAgICAgdmFyIGdlb20gPSB7XG4gICAgICAgIHR5cGU6IGdlb21UeXBlLFxuICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZSxcbiAgICAgIH07XG4gICAgICBpZiAoXG4gICAgICAgIGNhbGxiYWNrKGhlbHBlcnMuZmVhdHVyZShnZW9tLCBwcm9wZXJ0aWVzKSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCkgPT09XG4gICAgICAgIGZhbHNlXG4gICAgICApXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBmbGF0dGVuUmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgZmxhdHRlblJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHtGZWF0dXJlfSBjdXJyZW50RmVhdHVyZSBUaGUgY3VycmVudCBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBmbGF0dGVuZWQgZmVhdHVyZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LnJlZHVjZSgpLlxuICpcbiAqIEBuYW1lIGZsYXR0ZW5SZWR1Y2VcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBhbnkgR2VvSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm5zIHsqfSBUaGUgdmFsdWUgdGhhdCByZXN1bHRzIGZyb20gdGhlIHJlZHVjdGlvbi5cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgICB0dXJmLnBvaW50KFsyNiwgMzddLCB7Zm9vOiAnYmFyJ30pLFxuICogICAgIHR1cmYubXVsdGlQb2ludChbWzQwLCAzMF0sIFszNiwgNTNdXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuZmxhdHRlblJlZHVjZShmZWF0dXJlcywgZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KSB7XG4gKiAgIC8vPXByZXZpb3VzVmFsdWVcbiAqICAgLy89Y3VycmVudEZlYXR1cmVcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPW11bHRpRmVhdHVyZUluZGV4XG4gKiAgIHJldHVybiBjdXJyZW50RmVhdHVyZVxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW5SZWR1Y2UoZ2VvanNvbiwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuICB2YXIgcHJldmlvdXNWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgZmxhdHRlbkVhY2goXG4gICAgZ2VvanNvbixcbiAgICBmdW5jdGlvbiAoY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpIHtcbiAgICAgIGlmIChcbiAgICAgICAgZmVhdHVyZUluZGV4ID09PSAwICYmXG4gICAgICAgIG11bHRpRmVhdHVyZUluZGV4ID09PSAwICYmXG4gICAgICAgIGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICApXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50RmVhdHVyZTtcbiAgICAgIGVsc2VcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGNhbGxiYWNrKFxuICAgICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgICAgY3VycmVudEZlYXR1cmUsXG4gICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4XG4gICAgICAgICk7XG4gICAgfVxuICApO1xuICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3Igc2VnbWVudEVhY2hcbiAqXG4gKiBAY2FsbGJhY2sgc2VnbWVudEVhY2hDYWxsYmFja1xuICogQHBhcmFtIHtGZWF0dXJlPExpbmVTdHJpbmc+fSBjdXJyZW50U2VnbWVudCBUaGUgY3VycmVudCBTZWdtZW50IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBnZW9tZXRyeUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gc2VnbWVudEluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBTZWdtZW50IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIDItdmVydGV4IGxpbmUgc2VnbWVudCBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkuZm9yRWFjaCgpXG4gKiAoTXVsdGkpUG9pbnQgZ2VvbWV0cmllcyBkbyBub3QgY29udGFpbiBzZWdtZW50cyB0aGVyZWZvcmUgdGhleSBhcmUgaWdub3JlZCBkdXJpbmcgdGhpcyBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50U2VnbWVudCwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleCwgc2VnbWVudEluZGV4KVxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZXhhbXBsZVxuICogdmFyIHBvbHlnb24gPSB0dXJmLnBvbHlnb24oW1tbLTUwLCA1XSwgWy00MCwgLTEwXSwgWy01MCwgLTEwXSwgWy00MCwgNV0sIFstNTAsIDVdXV0pO1xuICpcbiAqIC8vIEl0ZXJhdGUgb3ZlciBHZW9KU09OIGJ5IDItdmVydGV4IHNlZ21lbnRzXG4gKiB0dXJmLnNlZ21lbnRFYWNoKHBvbHlnb24sIGZ1bmN0aW9uIChjdXJyZW50U2VnbWVudCwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleCwgc2VnbWVudEluZGV4KSB7XG4gKiAgIC8vPWN1cnJlbnRTZWdtZW50XG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1tdWx0aUZlYXR1cmVJbmRleFxuICogICAvLz1nZW9tZXRyeUluZGV4XG4gKiAgIC8vPXNlZ21lbnRJbmRleFxuICogfSk7XG4gKlxuICogLy8gQ2FsY3VsYXRlIHRoZSB0b3RhbCBudW1iZXIgb2Ygc2VnbWVudHNcbiAqIHZhciB0b3RhbCA9IDA7XG4gKiB0dXJmLnNlZ21lbnRFYWNoKHBvbHlnb24sIGZ1bmN0aW9uICgpIHtcbiAqICAgICB0b3RhbCsrO1xuICogfSk7XG4gKi9cbmZ1bmN0aW9uIHNlZ21lbnRFYWNoKGdlb2pzb24sIGNhbGxiYWNrKSB7XG4gIGZsYXR0ZW5FYWNoKGdlb2pzb24sIGZ1bmN0aW9uIChmZWF0dXJlLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KSB7XG4gICAgdmFyIHNlZ21lbnRJbmRleCA9IDA7XG5cbiAgICAvLyBFeGNsdWRlIG51bGwgR2VvbWV0cmllc1xuICAgIGlmICghZmVhdHVyZS5nZW9tZXRyeSkgcmV0dXJuO1xuICAgIC8vIChNdWx0aSlQb2ludCBnZW9tZXRyaWVzIGRvIG5vdCBjb250YWluIHNlZ21lbnRzIHRoZXJlZm9yZSB0aGV5IGFyZSBpZ25vcmVkIGR1cmluZyB0aGlzIG9wZXJhdGlvbi5cbiAgICB2YXIgdHlwZSA9IGZlYXR1cmUuZ2VvbWV0cnkudHlwZTtcbiAgICBpZiAodHlwZSA9PT0gXCJQb2ludFwiIHx8IHR5cGUgPT09IFwiTXVsdGlQb2ludFwiKSByZXR1cm47XG5cbiAgICAvLyBHZW5lcmF0ZSAyLXZlcnRleCBsaW5lIHNlZ21lbnRzXG4gICAgdmFyIHByZXZpb3VzQ29vcmRzO1xuICAgIHZhciBwcmV2aW91c0ZlYXR1cmVJbmRleCA9IDA7XG4gICAgdmFyIHByZXZpb3VzTXVsdGlJbmRleCA9IDA7XG4gICAgdmFyIHByZXZHZW9tSW5kZXggPSAwO1xuICAgIGlmIChcbiAgICAgIGNvb3JkRWFjaChcbiAgICAgICAgZmVhdHVyZSxcbiAgICAgICAgZnVuY3Rpb24gKFxuICAgICAgICAgIGN1cnJlbnRDb29yZCxcbiAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgIGZlYXR1cmVJbmRleENvb3JkLFxuICAgICAgICAgIG11bHRpUGFydEluZGV4Q29vcmQsXG4gICAgICAgICAgZ2VvbWV0cnlJbmRleFxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBTaW11bGF0aW5nIGEgbWV0YS5jb29yZFJlZHVjZSgpIHNpbmNlIGByZWR1Y2VgIG9wZXJhdGlvbnMgY2Fubm90IGJlIHN0b3BwZWQgYnkgcmV0dXJuaW5nIGBmYWxzZWBcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBwcmV2aW91c0Nvb3JkcyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBmZWF0dXJlSW5kZXggPiBwcmV2aW91c0ZlYXR1cmVJbmRleCB8fFxuICAgICAgICAgICAgbXVsdGlQYXJ0SW5kZXhDb29yZCA+IHByZXZpb3VzTXVsdGlJbmRleCB8fFxuICAgICAgICAgICAgZ2VvbWV0cnlJbmRleCA+IHByZXZHZW9tSW5kZXhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHByZXZpb3VzQ29vcmRzID0gY3VycmVudENvb3JkO1xuICAgICAgICAgICAgcHJldmlvdXNGZWF0dXJlSW5kZXggPSBmZWF0dXJlSW5kZXg7XG4gICAgICAgICAgICBwcmV2aW91c011bHRpSW5kZXggPSBtdWx0aVBhcnRJbmRleENvb3JkO1xuICAgICAgICAgICAgcHJldkdlb21JbmRleCA9IGdlb21ldHJ5SW5kZXg7XG4gICAgICAgICAgICBzZWdtZW50SW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY3VycmVudFNlZ21lbnQgPSBoZWxwZXJzLmxpbmVTdHJpbmcoXG4gICAgICAgICAgICBbcHJldmlvdXNDb29yZHMsIGN1cnJlbnRDb29yZF0sXG4gICAgICAgICAgICBmZWF0dXJlLnByb3BlcnRpZXNcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICBjdXJyZW50U2VnbWVudCxcbiAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgZ2VvbWV0cnlJbmRleCxcbiAgICAgICAgICAgICAgc2VnbWVudEluZGV4XG4gICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBzZWdtZW50SW5kZXgrKztcbiAgICAgICAgICBwcmV2aW91c0Nvb3JkcyA9IGN1cnJlbnRDb29yZDtcbiAgICAgICAgfVxuICAgICAgKSA9PT0gZmFsc2VcbiAgICApXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBzZWdtZW50UmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgc2VnbWVudFJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHtGZWF0dXJlPExpbmVTdHJpbmc+fSBjdXJyZW50U2VnbWVudCBUaGUgY3VycmVudCBTZWdtZW50IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBnZW9tZXRyeUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gc2VnbWVudEluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBTZWdtZW50IGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIFJlZHVjZSAyLXZlcnRleCBsaW5lIHNlZ21lbnQgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LnJlZHVjZSgpXG4gKiAoTXVsdGkpUG9pbnQgZ2VvbWV0cmllcyBkbyBub3QgY29udGFpbiBzZWdtZW50cyB0aGVyZWZvcmUgdGhleSBhcmUgaWdub3JlZCBkdXJpbmcgdGhpcyBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIGFueSBHZW9KU09OXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50U2VnbWVudCwgY3VycmVudEluZGV4KVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2x5Z29uID0gdHVyZi5wb2x5Z29uKFtbWy01MCwgNV0sIFstNDAsIC0xMF0sIFstNTAsIC0xMF0sIFstNDAsIDVdLCBbLTUwLCA1XV1dKTtcbiAqXG4gKiAvLyBJdGVyYXRlIG92ZXIgR2VvSlNPTiBieSAyLXZlcnRleCBzZWdtZW50c1xuICogdHVyZi5zZWdtZW50UmVkdWNlKHBvbHlnb24sIGZ1bmN0aW9uIChwcmV2aW91c1NlZ21lbnQsIGN1cnJlbnRTZWdtZW50LCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4LCBzZWdtZW50SW5kZXgpIHtcbiAqICAgLy89IHByZXZpb3VzU2VnbWVudFxuICogICAvLz0gY3VycmVudFNlZ21lbnRcbiAqICAgLy89IGZlYXR1cmVJbmRleFxuICogICAvLz0gbXVsdGlGZWF0dXJlSW5kZXhcbiAqICAgLy89IGdlb21ldHJ5SW5kZXhcbiAqICAgLy89IHNlZ21lbnRJbmRleFxuICogICByZXR1cm4gY3VycmVudFNlZ21lbnRcbiAqIH0pO1xuICpcbiAqIC8vIENhbGN1bGF0ZSB0aGUgdG90YWwgbnVtYmVyIG9mIHNlZ21lbnRzXG4gKiB2YXIgaW5pdGlhbFZhbHVlID0gMFxuICogdmFyIHRvdGFsID0gdHVyZi5zZWdtZW50UmVkdWNlKHBvbHlnb24sIGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlKSB7XG4gKiAgICAgcHJldmlvdXNWYWx1ZSsrO1xuICogICAgIHJldHVybiBwcmV2aW91c1ZhbHVlO1xuICogfSwgaW5pdGlhbFZhbHVlKTtcbiAqL1xuZnVuY3Rpb24gc2VnbWVudFJlZHVjZShnZW9qc29uLCBjYWxsYmFjaywgaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBwcmV2aW91c1ZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICB2YXIgc3RhcnRlZCA9IGZhbHNlO1xuICBzZWdtZW50RWFjaChcbiAgICBnZW9qc29uLFxuICAgIGZ1bmN0aW9uIChcbiAgICAgIGN1cnJlbnRTZWdtZW50LFxuICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICBnZW9tZXRyeUluZGV4LFxuICAgICAgc2VnbWVudEluZGV4XG4gICAgKSB7XG4gICAgICBpZiAoc3RhcnRlZCA9PT0gZmFsc2UgJiYgaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjdXJyZW50U2VnbWVudDtcbiAgICAgIGVsc2VcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGNhbGxiYWNrKFxuICAgICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgICAgY3VycmVudFNlZ21lbnQsXG4gICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgIGdlb21ldHJ5SW5kZXgsXG4gICAgICAgICAgc2VnbWVudEluZGV4XG4gICAgICAgICk7XG4gICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICB9XG4gICk7XG4gIHJldHVybiBwcmV2aW91c1ZhbHVlO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBsaW5lRWFjaFxuICpcbiAqIEBjYWxsYmFjayBsaW5lRWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge0ZlYXR1cmU8TGluZVN0cmluZz59IGN1cnJlbnRMaW5lIFRoZSBjdXJyZW50IExpbmVTdHJpbmd8TGluZWFyUmluZyBiZWluZyBwcm9jZXNzZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlGZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIE11bHRpLUZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkXG4gKiBAcGFyYW0ge251bWJlcn0gZ2VvbWV0cnlJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgR2VvbWV0cnkgYmVpbmcgcHJvY2Vzc2VkXG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgbGluZSBvciByaW5nIGNvb3JkaW5hdGVzIGluIExpbmVTdHJpbmcsIFBvbHlnb24sIE11bHRpTGluZVN0cmluZywgTXVsdGlQb2x5Z29uIEZlYXR1cmVzIG9yIEdlb21ldHJpZXMsXG4gKiBzaW1pbGFyIHRvIEFycmF5LmZvckVhY2guXG4gKlxuICogQG5hbWUgbGluZUVhY2hcbiAqIEBwYXJhbSB7R2VvbWV0cnl8RmVhdHVyZTxMaW5lU3RyaW5nfFBvbHlnb258TXVsdGlMaW5lU3RyaW5nfE11bHRpUG9seWdvbj59IGdlb2pzb24gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50TGluZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgZ2VvbWV0cnlJbmRleClcbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlMaW5lID0gdHVyZi5tdWx0aUxpbmVTdHJpbmcoW1xuICogICBbWzI2LCAzN10sIFszNSwgNDVdXSxcbiAqICAgW1szNiwgNTNdLCBbMzgsIDUwXSwgWzQxLCA1NV1dXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmxpbmVFYWNoKG11bHRpTGluZSwgZnVuY3Rpb24gKGN1cnJlbnRMaW5lLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KSB7XG4gKiAgIC8vPWN1cnJlbnRMaW5lXG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1tdWx0aUZlYXR1cmVJbmRleFxuICogICAvLz1nZW9tZXRyeUluZGV4XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gbGluZUVhY2goZ2VvanNvbiwgY2FsbGJhY2spIHtcbiAgLy8gdmFsaWRhdGlvblxuICBpZiAoIWdlb2pzb24pIHRocm93IG5ldyBFcnJvcihcImdlb2pzb24gaXMgcmVxdWlyZWRcIik7XG5cbiAgZmxhdHRlbkVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpIHtcbiAgICBpZiAoZmVhdHVyZS5nZW9tZXRyeSA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIHZhciB0eXBlID0gZmVhdHVyZS5nZW9tZXRyeS50eXBlO1xuICAgIHZhciBjb29yZHMgPSBmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgaWYgKGNhbGxiYWNrKGZlYXR1cmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIDAsIDApID09PSBmYWxzZSlcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgZm9yIChcbiAgICAgICAgICB2YXIgZ2VvbWV0cnlJbmRleCA9IDA7XG4gICAgICAgICAgZ2VvbWV0cnlJbmRleCA8IGNvb3Jkcy5sZW5ndGg7XG4gICAgICAgICAgZ2VvbWV0cnlJbmRleCsrXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICBoZWxwZXJzLmxpbmVTdHJpbmcoY29vcmRzW2dlb21ldHJ5SW5kZXhdLCBmZWF0dXJlLnByb3BlcnRpZXMpLFxuICAgICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBsaW5lUmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgbGluZVJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHtGZWF0dXJlPExpbmVTdHJpbmc+fSBjdXJyZW50TGluZSBUaGUgY3VycmVudCBMaW5lU3RyaW5nfExpbmVhclJpbmcgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aUZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgTXVsdGktRmVhdHVyZSBiZWluZyBwcm9jZXNzZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBnZW9tZXRyeUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWRcbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBmZWF0dXJlcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkucmVkdWNlKCkuXG4gKlxuICogQG5hbWUgbGluZVJlZHVjZVxuICogQHBhcmFtIHtHZW9tZXRyeXxGZWF0dXJlPExpbmVTdHJpbmd8UG9seWdvbnxNdWx0aUxpbmVTdHJpbmd8TXVsdGlQb2x5Z29uPn0gZ2VvanNvbiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRMaW5lLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm5zIHsqfSBUaGUgdmFsdWUgdGhhdCByZXN1bHRzIGZyb20gdGhlIHJlZHVjdGlvbi5cbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlQb2x5ID0gdHVyZi5tdWx0aVBvbHlnb24oW1xuICogICB0dXJmLnBvbHlnb24oW1tbMTIsNDhdLFsyLDQxXSxbMjQsMzhdLFsxMiw0OF1dLCBbWzksNDRdLFsxMyw0MV0sWzEzLDQ1XSxbOSw0NF1dXSksXG4gKiAgIHR1cmYucG9seWdvbihbW1s1LCA1XSwgWzAsIDBdLCBbMiwgMl0sIFs0LCA0XSwgWzUsIDVdXV0pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmxpbmVSZWR1Y2UobXVsdGlQb2x5LCBmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudExpbmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgpIHtcbiAqICAgLy89cHJldmlvdXNWYWx1ZVxuICogICAvLz1jdXJyZW50TGluZVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgLy89bXVsdGlGZWF0dXJlSW5kZXhcbiAqICAgLy89Z2VvbWV0cnlJbmRleFxuICogICByZXR1cm4gY3VycmVudExpbmVcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBsaW5lUmVkdWNlKGdlb2pzb24sIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUpIHtcbiAgdmFyIHByZXZpb3VzVmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gIGxpbmVFYWNoKFxuICAgIGdlb2pzb24sXG4gICAgZnVuY3Rpb24gKGN1cnJlbnRMaW5lLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KSB7XG4gICAgICBpZiAoZmVhdHVyZUluZGV4ID09PSAwICYmIGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBwcmV2aW91c1ZhbHVlID0gY3VycmVudExpbmU7XG4gICAgICBlbHNlXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjYWxsYmFjayhcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlLFxuICAgICAgICAgIGN1cnJlbnRMaW5lLFxuICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICk7XG4gICAgfVxuICApO1xuICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbn1cblxuLyoqXG4gKiBGaW5kcyBhIHBhcnRpY3VsYXIgMi12ZXJ0ZXggTGluZVN0cmluZyBTZWdtZW50IGZyb20gYSBHZW9KU09OIHVzaW5nIGBAdHVyZi9tZXRhYCBpbmRleGVzLlxuICpcbiAqIE5lZ2F0aXZlIGluZGV4ZXMgYXJlIHBlcm1pdHRlZC5cbiAqIFBvaW50ICYgTXVsdGlQb2ludCB3aWxsIGFsd2F5cyByZXR1cm4gbnVsbC5cbiAqXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gQW55IEdlb0pTT04gRmVhdHVyZSBvciBHZW9tZXRyeVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZmVhdHVyZUluZGV4PTBdIEZlYXR1cmUgSW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tdWx0aUZlYXR1cmVJbmRleD0wXSBNdWx0aS1GZWF0dXJlIEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZ2VvbWV0cnlJbmRleD0wXSBHZW9tZXRyeSBJbmRleFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnNlZ21lbnRJbmRleD0wXSBTZWdtZW50IEluZGV4XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMucHJvcGVydGllcz17fV0gVHJhbnNsYXRlIFByb3BlcnRpZXMgdG8gb3V0cHV0IExpbmVTdHJpbmdcbiAqIEBwYXJhbSB7QkJveH0gW29wdGlvbnMuYmJveD17fV0gVHJhbnNsYXRlIEJCb3ggdG8gb3V0cHV0IExpbmVTdHJpbmdcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gW29wdGlvbnMuaWQ9e31dIFRyYW5zbGF0ZSBJZCB0byBvdXRwdXQgTGluZVN0cmluZ1xuICogQHJldHVybnMge0ZlYXR1cmU8TGluZVN0cmluZz59IDItdmVydGV4IEdlb0pTT04gRmVhdHVyZSBMaW5lU3RyaW5nXG4gKiBAZXhhbXBsZVxuICogdmFyIG11bHRpTGluZSA9IHR1cmYubXVsdGlMaW5lU3RyaW5nKFtcbiAqICAgICBbWzEwLCAxMF0sIFs1MCwgMzBdLCBbMzAsIDQwXV0sXG4gKiAgICAgW1stMTAsIC0xMF0sIFstNTAsIC0zMF0sIFstMzAsIC00MF1dXG4gKiBdKTtcbiAqXG4gKiAvLyBGaXJzdCBTZWdtZW50IChkZWZhdWx0cyBhcmUgMClcbiAqIHR1cmYuZmluZFNlZ21lbnQobXVsdGlMaW5lKTtcbiAqIC8vID0+IEZlYXR1cmU8TGluZVN0cmluZzxbWzEwLCAxMF0sIFs1MCwgMzBdXT4+XG4gKlxuICogLy8gRmlyc3QgU2VnbWVudCBvZiAybmQgTXVsdGkgRmVhdHVyZVxuICogdHVyZi5maW5kU2VnbWVudChtdWx0aUxpbmUsIHttdWx0aUZlYXR1cmVJbmRleDogMX0pO1xuICogLy8gPT4gRmVhdHVyZTxMaW5lU3RyaW5nPFtbLTEwLCAtMTBdLCBbLTUwLCAtMzBdXT4+XG4gKlxuICogLy8gTGFzdCBTZWdtZW50IG9mIExhc3QgTXVsdGkgRmVhdHVyZVxuICogdHVyZi5maW5kU2VnbWVudChtdWx0aUxpbmUsIHttdWx0aUZlYXR1cmVJbmRleDogLTEsIHNlZ21lbnRJbmRleDogLTF9KTtcbiAqIC8vID0+IEZlYXR1cmU8TGluZVN0cmluZzxbWy01MCwgLTMwXSwgWy0zMCwgLTQwXV0+PlxuICovXG5mdW5jdGlvbiBmaW5kU2VnbWVudChnZW9qc29uLCBvcHRpb25zKSB7XG4gIC8vIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGlmICghaGVscGVycy5pc09iamVjdChvcHRpb25zKSkgdGhyb3cgbmV3IEVycm9yKFwib3B0aW9ucyBpcyBpbnZhbGlkXCIpO1xuICB2YXIgZmVhdHVyZUluZGV4ID0gb3B0aW9ucy5mZWF0dXJlSW5kZXggfHwgMDtcbiAgdmFyIG11bHRpRmVhdHVyZUluZGV4ID0gb3B0aW9ucy5tdWx0aUZlYXR1cmVJbmRleCB8fCAwO1xuICB2YXIgZ2VvbWV0cnlJbmRleCA9IG9wdGlvbnMuZ2VvbWV0cnlJbmRleCB8fCAwO1xuICB2YXIgc2VnbWVudEluZGV4ID0gb3B0aW9ucy5zZWdtZW50SW5kZXggfHwgMDtcblxuICAvLyBGaW5kIEZlYXR1cmVJbmRleFxuICB2YXIgcHJvcGVydGllcyA9IG9wdGlvbnMucHJvcGVydGllcztcbiAgdmFyIGdlb21ldHJ5O1xuXG4gIHN3aXRjaCAoZ2VvanNvbi50eXBlKSB7XG4gICAgY2FzZSBcIkZlYXR1cmVDb2xsZWN0aW9uXCI6XG4gICAgICBpZiAoZmVhdHVyZUluZGV4IDwgMClcbiAgICAgICAgZmVhdHVyZUluZGV4ID0gZ2VvanNvbi5mZWF0dXJlcy5sZW5ndGggKyBmZWF0dXJlSW5kZXg7XG4gICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCBnZW9qc29uLmZlYXR1cmVzW2ZlYXR1cmVJbmRleF0ucHJvcGVydGllcztcbiAgICAgIGdlb21ldHJ5ID0gZ2VvanNvbi5mZWF0dXJlc1tmZWF0dXJlSW5kZXhdLmdlb21ldHJ5O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkZlYXR1cmVcIjpcbiAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IGdlb2pzb24ucHJvcGVydGllcztcbiAgICAgIGdlb21ldHJ5ID0gZ2VvanNvbi5nZW9tZXRyeTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJQb2ludFwiOlxuICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgIGdlb21ldHJ5ID0gZ2VvanNvbjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnZW9qc29uIGlzIGludmFsaWRcIik7XG4gIH1cblxuICAvLyBGaW5kIFNlZ21lbnRJbmRleFxuICBpZiAoZ2VvbWV0cnkgPT09IG51bGwpIHJldHVybiBudWxsO1xuICB2YXIgY29vcmRzID0gZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gIHN3aXRjaCAoZ2VvbWV0cnkudHlwZSkge1xuICAgIGNhc2UgXCJQb2ludFwiOlxuICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgaWYgKHNlZ21lbnRJbmRleCA8IDApIHNlZ21lbnRJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBzZWdtZW50SW5kZXggLSAxO1xuICAgICAgcmV0dXJuIGhlbHBlcnMubGluZVN0cmluZyhcbiAgICAgICAgW2Nvb3Jkc1tzZWdtZW50SW5kZXhdLCBjb29yZHNbc2VnbWVudEluZGV4ICsgMV1dLFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICBpZiAoZ2VvbWV0cnlJbmRleCA8IDApIGdlb21ldHJ5SW5kZXggPSBjb29yZHMubGVuZ3RoICsgZ2VvbWV0cnlJbmRleDtcbiAgICAgIGlmIChzZWdtZW50SW5kZXggPCAwKVxuICAgICAgICBzZWdtZW50SW5kZXggPSBjb29yZHNbZ2VvbWV0cnlJbmRleF0ubGVuZ3RoICsgc2VnbWVudEluZGV4IC0gMTtcbiAgICAgIHJldHVybiBoZWxwZXJzLmxpbmVTdHJpbmcoXG4gICAgICAgIFtcbiAgICAgICAgICBjb29yZHNbZ2VvbWV0cnlJbmRleF1bc2VnbWVudEluZGV4XSxcbiAgICAgICAgICBjb29yZHNbZ2VvbWV0cnlJbmRleF1bc2VnbWVudEluZGV4ICsgMV0sXG4gICAgICAgIF0sXG4gICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgICAgaWYgKG11bHRpRmVhdHVyZUluZGV4IDwgMClcbiAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXggPSBjb29yZHMubGVuZ3RoICsgbXVsdGlGZWF0dXJlSW5kZXg7XG4gICAgICBpZiAoc2VnbWVudEluZGV4IDwgMClcbiAgICAgICAgc2VnbWVudEluZGV4ID0gY29vcmRzW211bHRpRmVhdHVyZUluZGV4XS5sZW5ndGggKyBzZWdtZW50SW5kZXggLSAxO1xuICAgICAgcmV0dXJuIGhlbHBlcnMubGluZVN0cmluZyhcbiAgICAgICAgW1xuICAgICAgICAgIGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bc2VnbWVudEluZGV4XSxcbiAgICAgICAgICBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdW3NlZ21lbnRJbmRleCArIDFdLFxuICAgICAgICBdLFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgIGlmIChtdWx0aUZlYXR1cmVJbmRleCA8IDApXG4gICAgICAgIG11bHRpRmVhdHVyZUluZGV4ID0gY29vcmRzLmxlbmd0aCArIG11bHRpRmVhdHVyZUluZGV4O1xuICAgICAgaWYgKGdlb21ldHJ5SW5kZXggPCAwKVxuICAgICAgICBnZW9tZXRyeUluZGV4ID0gY29vcmRzW211bHRpRmVhdHVyZUluZGV4XS5sZW5ndGggKyBnZW9tZXRyeUluZGV4O1xuICAgICAgaWYgKHNlZ21lbnRJbmRleCA8IDApXG4gICAgICAgIHNlZ21lbnRJbmRleCA9XG4gICAgICAgICAgY29vcmRzW211bHRpRmVhdHVyZUluZGV4XVtnZW9tZXRyeUluZGV4XS5sZW5ndGggLSBzZWdtZW50SW5kZXggLSAxO1xuICAgICAgcmV0dXJuIGhlbHBlcnMubGluZVN0cmluZyhcbiAgICAgICAgW1xuICAgICAgICAgIGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bZ2VvbWV0cnlJbmRleF1bc2VnbWVudEluZGV4XSxcbiAgICAgICAgICBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdW2dlb21ldHJ5SW5kZXhdW3NlZ21lbnRJbmRleCArIDFdLFxuICAgICAgICBdLFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcImdlb2pzb24gaXMgaW52YWxpZFwiKTtcbn1cblxuLyoqXG4gKiBGaW5kcyBhIHBhcnRpY3VsYXIgUG9pbnQgZnJvbSBhIEdlb0pTT04gdXNpbmcgYEB0dXJmL21ldGFgIGluZGV4ZXMuXG4gKlxuICogTmVnYXRpdmUgaW5kZXhlcyBhcmUgcGVybWl0dGVkLlxuICpcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBBbnkgR2VvSlNPTiBGZWF0dXJlIG9yIEdlb21ldHJ5XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5mZWF0dXJlSW5kZXg9MF0gRmVhdHVyZSBJbmRleFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm11bHRpRmVhdHVyZUluZGV4PTBdIE11bHRpLUZlYXR1cmUgSW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5nZW9tZXRyeUluZGV4PTBdIEdlb21ldHJ5IEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuY29vcmRJbmRleD0wXSBDb29yZCBJbmRleFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLnByb3BlcnRpZXM9e31dIFRyYW5zbGF0ZSBQcm9wZXJ0aWVzIHRvIG91dHB1dCBQb2ludFxuICogQHBhcmFtIHtCQm94fSBbb3B0aW9ucy5iYm94PXt9XSBUcmFuc2xhdGUgQkJveCB0byBvdXRwdXQgUG9pbnRcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gW29wdGlvbnMuaWQ9e31dIFRyYW5zbGF0ZSBJZCB0byBvdXRwdXQgUG9pbnRcbiAqIEByZXR1cm5zIHtGZWF0dXJlPFBvaW50Pn0gMi12ZXJ0ZXggR2VvSlNPTiBGZWF0dXJlIFBvaW50XG4gKiBAZXhhbXBsZVxuICogdmFyIG11bHRpTGluZSA9IHR1cmYubXVsdGlMaW5lU3RyaW5nKFtcbiAqICAgICBbWzEwLCAxMF0sIFs1MCwgMzBdLCBbMzAsIDQwXV0sXG4gKiAgICAgW1stMTAsIC0xMF0sIFstNTAsIC0zMF0sIFstMzAsIC00MF1dXG4gKiBdKTtcbiAqXG4gKiAvLyBGaXJzdCBTZWdtZW50IChkZWZhdWx0cyBhcmUgMClcbiAqIHR1cmYuZmluZFBvaW50KG11bHRpTGluZSk7XG4gKiAvLyA9PiBGZWF0dXJlPFBvaW50PFsxMCwgMTBdPj5cbiAqXG4gKiAvLyBGaXJzdCBTZWdtZW50IG9mIHRoZSAybmQgTXVsdGktRmVhdHVyZVxuICogdHVyZi5maW5kUG9pbnQobXVsdGlMaW5lLCB7bXVsdGlGZWF0dXJlSW5kZXg6IDF9KTtcbiAqIC8vID0+IEZlYXR1cmU8UG9pbnQ8Wy0xMCwgLTEwXT4+XG4gKlxuICogLy8gTGFzdCBTZWdtZW50IG9mIGxhc3QgTXVsdGktRmVhdHVyZVxuICogdHVyZi5maW5kUG9pbnQobXVsdGlMaW5lLCB7bXVsdGlGZWF0dXJlSW5kZXg6IC0xLCBjb29yZEluZGV4OiAtMX0pO1xuICogLy8gPT4gRmVhdHVyZTxQb2ludDxbLTMwLCAtNDBdPj5cbiAqL1xuZnVuY3Rpb24gZmluZFBvaW50KGdlb2pzb24sIG9wdGlvbnMpIHtcbiAgLy8gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKCFoZWxwZXJzLmlzT2JqZWN0KG9wdGlvbnMpKSB0aHJvdyBuZXcgRXJyb3IoXCJvcHRpb25zIGlzIGludmFsaWRcIik7XG4gIHZhciBmZWF0dXJlSW5kZXggPSBvcHRpb25zLmZlYXR1cmVJbmRleCB8fCAwO1xuICB2YXIgbXVsdGlGZWF0dXJlSW5kZXggPSBvcHRpb25zLm11bHRpRmVhdHVyZUluZGV4IHx8IDA7XG4gIHZhciBnZW9tZXRyeUluZGV4ID0gb3B0aW9ucy5nZW9tZXRyeUluZGV4IHx8IDA7XG4gIHZhciBjb29yZEluZGV4ID0gb3B0aW9ucy5jb29yZEluZGV4IHx8IDA7XG5cbiAgLy8gRmluZCBGZWF0dXJlSW5kZXhcbiAgdmFyIHByb3BlcnRpZXMgPSBvcHRpb25zLnByb3BlcnRpZXM7XG4gIHZhciBnZW9tZXRyeTtcblxuICBzd2l0Y2ggKGdlb2pzb24udHlwZSkge1xuICAgIGNhc2UgXCJGZWF0dXJlQ29sbGVjdGlvblwiOlxuICAgICAgaWYgKGZlYXR1cmVJbmRleCA8IDApXG4gICAgICAgIGZlYXR1cmVJbmRleCA9IGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoICsgZmVhdHVyZUluZGV4O1xuICAgICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwgZ2VvanNvbi5mZWF0dXJlc1tmZWF0dXJlSW5kZXhdLnByb3BlcnRpZXM7XG4gICAgICBnZW9tZXRyeSA9IGdlb2pzb24uZmVhdHVyZXNbZmVhdHVyZUluZGV4XS5nZW9tZXRyeTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJGZWF0dXJlXCI6XG4gICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCBnZW9qc29uLnByb3BlcnRpZXM7XG4gICAgICBnZW9tZXRyeSA9IGdlb2pzb24uZ2VvbWV0cnk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICBjYXNlIFwiTXVsdGlQb2ludFwiOlxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgIGNhc2UgXCJNdWx0aUxpbmVTdHJpbmdcIjpcbiAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6XG4gICAgICBnZW9tZXRyeSA9IGdlb2pzb247XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2VvanNvbiBpcyBpbnZhbGlkXCIpO1xuICB9XG5cbiAgLy8gRmluZCBDb29yZCBJbmRleFxuICBpZiAoZ2VvbWV0cnkgPT09IG51bGwpIHJldHVybiBudWxsO1xuICB2YXIgY29vcmRzID0gZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gIHN3aXRjaCAoZ2VvbWV0cnkudHlwZSkge1xuICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgcmV0dXJuIGhlbHBlcnMucG9pbnQoY29vcmRzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiTXVsdGlQb2ludFwiOlxuICAgICAgaWYgKG11bHRpRmVhdHVyZUluZGV4IDwgMClcbiAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXggPSBjb29yZHMubGVuZ3RoICsgbXVsdGlGZWF0dXJlSW5kZXg7XG4gICAgICByZXR1cm4gaGVscGVycy5wb2ludChjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgaWYgKGNvb3JkSW5kZXggPCAwKSBjb29yZEluZGV4ID0gY29vcmRzLmxlbmd0aCArIGNvb3JkSW5kZXg7XG4gICAgICByZXR1cm4gaGVscGVycy5wb2ludChjb29yZHNbY29vcmRJbmRleF0sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICBpZiAoZ2VvbWV0cnlJbmRleCA8IDApIGdlb21ldHJ5SW5kZXggPSBjb29yZHMubGVuZ3RoICsgZ2VvbWV0cnlJbmRleDtcbiAgICAgIGlmIChjb29yZEluZGV4IDwgMClcbiAgICAgICAgY29vcmRJbmRleCA9IGNvb3Jkc1tnZW9tZXRyeUluZGV4XS5sZW5ndGggKyBjb29yZEluZGV4O1xuICAgICAgcmV0dXJuIGhlbHBlcnMucG9pbnQoY29vcmRzW2dlb21ldHJ5SW5kZXhdW2Nvb3JkSW5kZXhdLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6XG4gICAgICBpZiAobXVsdGlGZWF0dXJlSW5kZXggPCAwKVxuICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBtdWx0aUZlYXR1cmVJbmRleDtcbiAgICAgIGlmIChjb29yZEluZGV4IDwgMClcbiAgICAgICAgY29vcmRJbmRleCA9IGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF0ubGVuZ3RoICsgY29vcmRJbmRleDtcbiAgICAgIHJldHVybiBoZWxwZXJzLnBvaW50KGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bY29vcmRJbmRleF0sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgIGlmIChtdWx0aUZlYXR1cmVJbmRleCA8IDApXG4gICAgICAgIG11bHRpRmVhdHVyZUluZGV4ID0gY29vcmRzLmxlbmd0aCArIG11bHRpRmVhdHVyZUluZGV4O1xuICAgICAgaWYgKGdlb21ldHJ5SW5kZXggPCAwKVxuICAgICAgICBnZW9tZXRyeUluZGV4ID0gY29vcmRzW211bHRpRmVhdHVyZUluZGV4XS5sZW5ndGggKyBnZW9tZXRyeUluZGV4O1xuICAgICAgaWYgKGNvb3JkSW5kZXggPCAwKVxuICAgICAgICBjb29yZEluZGV4ID1cbiAgICAgICAgICBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdW2dlb21ldHJ5SW5kZXhdLmxlbmd0aCAtIGNvb3JkSW5kZXg7XG4gICAgICByZXR1cm4gaGVscGVycy5wb2ludChcbiAgICAgICAgY29vcmRzW211bHRpRmVhdHVyZUluZGV4XVtnZW9tZXRyeUluZGV4XVtjb29yZEluZGV4XSxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXCJnZW9qc29uIGlzIGludmFsaWRcIik7XG59XG5cbmV4cG9ydHMuY29vcmRBbGwgPSBjb29yZEFsbDtcbmV4cG9ydHMuY29vcmRFYWNoID0gY29vcmRFYWNoO1xuZXhwb3J0cy5jb29yZFJlZHVjZSA9IGNvb3JkUmVkdWNlO1xuZXhwb3J0cy5mZWF0dXJlRWFjaCA9IGZlYXR1cmVFYWNoO1xuZXhwb3J0cy5mZWF0dXJlUmVkdWNlID0gZmVhdHVyZVJlZHVjZTtcbmV4cG9ydHMuZmluZFBvaW50ID0gZmluZFBvaW50O1xuZXhwb3J0cy5maW5kU2VnbWVudCA9IGZpbmRTZWdtZW50O1xuZXhwb3J0cy5mbGF0dGVuRWFjaCA9IGZsYXR0ZW5FYWNoO1xuZXhwb3J0cy5mbGF0dGVuUmVkdWNlID0gZmxhdHRlblJlZHVjZTtcbmV4cG9ydHMuZ2VvbUVhY2ggPSBnZW9tRWFjaDtcbmV4cG9ydHMuZ2VvbVJlZHVjZSA9IGdlb21SZWR1Y2U7XG5leHBvcnRzLmxpbmVFYWNoID0gbGluZUVhY2g7XG5leHBvcnRzLmxpbmVSZWR1Y2UgPSBsaW5lUmVkdWNlO1xuZXhwb3J0cy5wcm9wRWFjaCA9IHByb3BFYWNoO1xuZXhwb3J0cy5wcm9wUmVkdWNlID0gcHJvcFJlZHVjZTtcbmV4cG9ydHMuc2VnbWVudEVhY2ggPSBzZWdtZW50RWFjaDtcbmV4cG9ydHMuc2VnbWVudFJlZHVjZSA9IHNlZ21lbnRSZWR1Y2U7XG4iLCJ2YXIgcmJ1c2ggPSByZXF1aXJlKCdyYnVzaCcpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCdAdHVyZi9oZWxwZXJzJyk7XG52YXIgbWV0YSA9IHJlcXVpcmUoJ0B0dXJmL21ldGEnKTtcbnZhciB0dXJmQkJveCA9IHJlcXVpcmUoJ0B0dXJmL2Jib3gnKS5kZWZhdWx0O1xudmFyIGZlYXR1cmVFYWNoID0gbWV0YS5mZWF0dXJlRWFjaDtcbnZhciBjb29yZEVhY2ggPSBtZXRhLmNvb3JkRWFjaDtcbnZhciBwb2x5Z29uID0gaGVscGVycy5wb2x5Z29uO1xudmFyIGZlYXR1cmVDb2xsZWN0aW9uID0gaGVscGVycy5mZWF0dXJlQ29sbGVjdGlvbjtcblxuLyoqXG4gKiBHZW9KU09OIGltcGxlbWVudGF0aW9uIG9mIFtSQnVzaF0oaHR0cHM6Ly9naXRodWIuY29tL21vdXJuZXIvcmJ1c2gjcmJ1c2gpIHNwYXRpYWwgaW5kZXguXG4gKlxuICogQG5hbWUgcmJ1c2hcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbWF4RW50cmllcz05XSBkZWZpbmVzIHRoZSBtYXhpbXVtIG51bWJlciBvZiBlbnRyaWVzIGluIGEgdHJlZSBub2RlLiA5ICh1c2VkIGJ5IGRlZmF1bHQpIGlzIGFcbiAqIHJlYXNvbmFibGUgY2hvaWNlIGZvciBtb3N0IGFwcGxpY2F0aW9ucy4gSGlnaGVyIHZhbHVlIG1lYW5zIGZhc3RlciBpbnNlcnRpb24gYW5kIHNsb3dlciBzZWFyY2gsIGFuZCB2aWNlIHZlcnNhLlxuICogQHJldHVybnMge1JCdXNofSBHZW9KU09OIFJCdXNoXG4gKiBAZXhhbXBsZVxuICogdmFyIGdlb2pzb25SYnVzaCA9IHJlcXVpcmUoJ2dlb2pzb24tcmJ1c2gnKS5kZWZhdWx0O1xuICogdmFyIHRyZWUgPSBnZW9qc29uUmJ1c2goKTtcbiAqL1xuZnVuY3Rpb24gZ2VvanNvblJidXNoKG1heEVudHJpZXMpIHtcbiAgICB2YXIgdHJlZSA9IG5ldyByYnVzaChtYXhFbnRyaWVzKTtcbiAgICAvKipcbiAgICAgKiBbaW5zZXJ0XShodHRwczovL2dpdGh1Yi5jb20vbW91cm5lci9yYnVzaCNkYXRhLWZvcm1hdClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RmVhdHVyZX0gZmVhdHVyZSBpbnNlcnQgc2luZ2xlIEdlb0pTT04gRmVhdHVyZVxuICAgICAqIEByZXR1cm5zIHtSQnVzaH0gR2VvSlNPTiBSQnVzaFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHBvbHkgPSB0dXJmLnBvbHlnb24oW1tbLTc4LCA0MV0sIFstNjcsIDQxXSwgWy02NywgNDhdLCBbLTc4LCA0OF0sIFstNzgsIDQxXV1dKTtcbiAgICAgKiB0cmVlLmluc2VydChwb2x5KVxuICAgICAqL1xuICAgIHRyZWUuaW5zZXJ0ID0gZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgICAgaWYgKGZlYXR1cmUudHlwZSAhPT0gJ0ZlYXR1cmUnKSB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZmVhdHVyZScpO1xuICAgICAgICBmZWF0dXJlLmJib3ggPSBmZWF0dXJlLmJib3ggPyBmZWF0dXJlLmJib3ggOiB0dXJmQkJveChmZWF0dXJlKTtcbiAgICAgICAgcmV0dXJuIHJidXNoLnByb3RvdHlwZS5pbnNlcnQuY2FsbCh0aGlzLCBmZWF0dXJlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogW2xvYWRdKGh0dHBzOi8vZ2l0aHViLmNvbS9tb3VybmVyL3JidXNoI2J1bGstaW5zZXJ0aW5nLWRhdGEpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEFycmF5PEZlYXR1cmU+fSBmZWF0dXJlcyBsb2FkIGVudGlyZSBHZW9KU09OIEZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICogQHJldHVybnMge1JCdXNofSBHZW9KU09OIFJCdXNoXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgcG9seXMgPSB0dXJmLnBvbHlnb25zKFtcbiAgICAgKiAgICAgW1tbLTc4LCA0MV0sIFstNjcsIDQxXSwgWy02NywgNDhdLCBbLTc4LCA0OF0sIFstNzgsIDQxXV1dLFxuICAgICAqICAgICBbW1stOTMsIDMyXSwgWy04MywgMzJdLCBbLTgzLCAzOV0sIFstOTMsIDM5XSwgWy05MywgMzJdXV1cbiAgICAgKiBdKTtcbiAgICAgKiB0cmVlLmxvYWQocG9seXMpO1xuICAgICAqL1xuICAgIHRyZWUubG9hZCA9IGZ1bmN0aW9uIChmZWF0dXJlcykge1xuICAgICAgICB2YXIgbG9hZCA9IFtdO1xuICAgICAgICAvLyBMb2FkIGFuIEFycmF5IG9mIEZlYXR1cmVzXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZlYXR1cmVzKSkge1xuICAgICAgICAgICAgZmVhdHVyZXMuZm9yRWFjaChmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlLnR5cGUgIT09ICdGZWF0dXJlJykgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGZlYXR1cmVzJyk7XG4gICAgICAgICAgICAgICAgZmVhdHVyZS5iYm94ID0gZmVhdHVyZS5iYm94ID8gZmVhdHVyZS5iYm94IDogdHVyZkJCb3goZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgbG9hZC5wdXNoKGZlYXR1cmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBMb2FkIGEgRmVhdHVyZUNvbGxlY3Rpb25cbiAgICAgICAgICAgIGZlYXR1cmVFYWNoKGZlYXR1cmVzLCBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlLnR5cGUgIT09ICdGZWF0dXJlJykgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGZlYXR1cmVzJyk7XG4gICAgICAgICAgICAgICAgZmVhdHVyZS5iYm94ID0gZmVhdHVyZS5iYm94ID8gZmVhdHVyZS5iYm94IDogdHVyZkJCb3goZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgbG9hZC5wdXNoKGZlYXR1cmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJidXNoLnByb3RvdHlwZS5sb2FkLmNhbGwodGhpcywgbG9hZCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFtyZW1vdmVdKGh0dHBzOi8vZ2l0aHViLmNvbS9tb3VybmVyL3JidXNoI3JlbW92aW5nLWRhdGEpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0ZlYXR1cmV9IGZlYXR1cmUgcmVtb3ZlIHNpbmdsZSBHZW9KU09OIEZlYXR1cmVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbHMgUGFzcyBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gdG8gY29tcGFyZSBieSB2YWx1ZSBmb3IgcmVtb3ZhbC5cbiAgICAgKiBAcmV0dXJucyB7UkJ1c2h9IEdlb0pTT04gUkJ1c2hcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBwb2x5ID0gdHVyZi5wb2x5Z29uKFtbWy03OCwgNDFdLCBbLTY3LCA0MV0sIFstNjcsIDQ4XSwgWy03OCwgNDhdLCBbLTc4LCA0MV1dXSk7XG4gICAgICpcbiAgICAgKiB0cmVlLnJlbW92ZShwb2x5KTtcbiAgICAgKi9cbiAgICB0cmVlLnJlbW92ZSA9IGZ1bmN0aW9uIChmZWF0dXJlLCBlcXVhbHMpIHtcbiAgICAgICAgaWYgKGZlYXR1cmUudHlwZSAhPT0gJ0ZlYXR1cmUnKSB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZmVhdHVyZScpO1xuICAgICAgICBmZWF0dXJlLmJib3ggPSBmZWF0dXJlLmJib3ggPyBmZWF0dXJlLmJib3ggOiB0dXJmQkJveChmZWF0dXJlKTtcbiAgICAgICAgcmV0dXJuIHJidXNoLnByb3RvdHlwZS5yZW1vdmUuY2FsbCh0aGlzLCBmZWF0dXJlLCBlcXVhbHMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBbY2xlYXJdKGh0dHBzOi8vZ2l0aHViLmNvbS9tb3VybmVyL3JidXNoI3JlbW92aW5nLWRhdGEpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UkJ1c2h9IEdlb0pTT04gUmJ1c2hcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRyZWUuY2xlYXIoKVxuICAgICAqL1xuICAgIHRyZWUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByYnVzaC5wcm90b3R5cGUuY2xlYXIuY2FsbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogW3NlYXJjaF0oaHR0cHM6Ly9naXRodWIuY29tL21vdXJuZXIvcmJ1c2gjc2VhcmNoKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtCQm94fEZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV9IGdlb2pzb24gc2VhcmNoIHdpdGggR2VvSlNPTlxuICAgICAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbn0gYWxsIGZlYXR1cmVzIHRoYXQgaW50ZXJzZWN0cyB3aXRoIHRoZSBnaXZlbiBHZW9KU09OLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHBvbHkgPSB0dXJmLnBvbHlnb24oW1tbLTc4LCA0MV0sIFstNjcsIDQxXSwgWy02NywgNDhdLCBbLTc4LCA0OF0sIFstNzgsIDQxXV1dKTtcbiAgICAgKlxuICAgICAqIHRyZWUuc2VhcmNoKHBvbHkpO1xuICAgICAqL1xuICAgIHRyZWUuc2VhcmNoID0gZnVuY3Rpb24gKGdlb2pzb24pIHtcbiAgICAgICAgdmFyIGZlYXR1cmVzID0gcmJ1c2gucHJvdG90eXBlLnNlYXJjaC5jYWxsKHRoaXMsIHRoaXMudG9CQm94KGdlb2pzb24pKTtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKGZlYXR1cmVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogW2NvbGxpZGVzXShodHRwczovL2dpdGh1Yi5jb20vbW91cm5lci9yYnVzaCNjb2xsaXNpb25zKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtCQm94fEZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV9IGdlb2pzb24gY29sbGlkZXMgd2l0aCBHZW9KU09OXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlcmUgYXJlIGFueSBpdGVtcyBpbnRlcnNlY3RpbmcgdGhlIGdpdmVuIEdlb0pTT04sIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBwb2x5ID0gdHVyZi5wb2x5Z29uKFtbWy03OCwgNDFdLCBbLTY3LCA0MV0sIFstNjcsIDQ4XSwgWy03OCwgNDhdLCBbLTc4LCA0MV1dXSk7XG4gICAgICpcbiAgICAgKiB0cmVlLmNvbGxpZGVzKHBvbHkpO1xuICAgICAqL1xuICAgIHRyZWUuY29sbGlkZXMgPSBmdW5jdGlvbiAoZ2VvanNvbikge1xuICAgICAgICByZXR1cm4gcmJ1c2gucHJvdG90eXBlLmNvbGxpZGVzLmNhbGwodGhpcywgdGhpcy50b0JCb3goZ2VvanNvbikpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBbYWxsXShodHRwczovL2dpdGh1Yi5jb20vbW91cm5lci9yYnVzaCNzZWFyY2gpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7RmVhdHVyZUNvbGxlY3Rpb259IGFsbCB0aGUgZmVhdHVyZXMgaW4gUkJ1c2hcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRyZWUuYWxsKClcbiAgICAgKi9cbiAgICB0cmVlLmFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGZlYXR1cmVzID0gcmJ1c2gucHJvdG90eXBlLmFsbC5jYWxsKHRoaXMpO1xuICAgICAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24oZmVhdHVyZXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBbdG9KU09OXShodHRwczovL2dpdGh1Yi5jb20vbW91cm5lci9yYnVzaCNleHBvcnQtYW5kLWltcG9ydClcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHthbnl9IGV4cG9ydCBkYXRhIGFzIEpTT04gb2JqZWN0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgZXhwb3J0ZWQgPSB0cmVlLnRvSlNPTigpXG4gICAgICovXG4gICAgdHJlZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByYnVzaC5wcm90b3R5cGUudG9KU09OLmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFtmcm9tSlNPTl0oaHR0cHM6Ly9naXRodWIuY29tL21vdXJuZXIvcmJ1c2gjZXhwb3J0LWFuZC1pbXBvcnQpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2FueX0ganNvbiBpbXBvcnQgcHJldmlvdXNseSBleHBvcnRlZCBkYXRhXG4gICAgICogQHJldHVybnMge1JCdXNofSBHZW9KU09OIFJCdXNoXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgZXhwb3J0ZWQgPSB7XG4gICAgICogICBcImNoaWxkcmVuXCI6IFtcbiAgICAgKiAgICAge1xuICAgICAqICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAgICAgKiAgICAgICBcImdlb21ldHJ5XCI6IHtcbiAgICAgKiAgICAgICAgIFwidHlwZVwiOiBcIlBvaW50XCIsXG4gICAgICogICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFsxMTAsIDUwXVxuICAgICAqICAgICAgIH0sXG4gICAgICogICAgICAgXCJwcm9wZXJ0aWVzXCI6IHt9LFxuICAgICAqICAgICAgIFwiYmJveFwiOiBbMTEwLCA1MCwgMTEwLCA1MF1cbiAgICAgKiAgICAgfVxuICAgICAqICAgXSxcbiAgICAgKiAgIFwiaGVpZ2h0XCI6IDEsXG4gICAgICogICBcImxlYWZcIjogdHJ1ZSxcbiAgICAgKiAgIFwibWluWFwiOiAxMTAsXG4gICAgICogICBcIm1pbllcIjogNTAsXG4gICAgICogICBcIm1heFhcIjogMTEwLFxuICAgICAqICAgXCJtYXhZXCI6IDUwXG4gICAgICogfVxuICAgICAqIHRyZWUuZnJvbUpTT04oZXhwb3J0ZWQpXG4gICAgICovXG4gICAgdHJlZS5mcm9tSlNPTiA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIHJldHVybiByYnVzaC5wcm90b3R5cGUuZnJvbUpTT04uY2FsbCh0aGlzLCBqc29uKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgR2VvSlNPTiB0byB7bWluWCwgbWluWSwgbWF4WCwgbWF4WX0gc2NoZW1hXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QkJveHxGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfSBnZW9qc29uIGZlYXR1cmUocykgdG8gcmV0cmlldmUgQkJveCBmcm9tXG4gICAgICogQHJldHVybnMge09iamVjdH0gY29udmVydGVkIHRvIHttaW5YLCBtaW5ZLCBtYXhYLCBtYXhZfVxuICAgICAqL1xuICAgIHRyZWUudG9CQm94ID0gZnVuY3Rpb24gKGdlb2pzb24pIHtcbiAgICAgICAgdmFyIGJib3g7XG4gICAgICAgIGlmIChnZW9qc29uLmJib3gpIGJib3ggPSBnZW9qc29uLmJib3g7XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZ2VvanNvbikgJiYgZ2VvanNvbi5sZW5ndGggPT09IDQpIGJib3ggPSBnZW9qc29uO1xuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGdlb2pzb24pICYmIGdlb2pzb24ubGVuZ3RoID09PSA2KSBiYm94ID0gW2dlb2pzb25bMF0sIGdlb2pzb25bMV0sIGdlb2pzb25bM10sIGdlb2pzb25bNF1dO1xuICAgICAgICBlbHNlIGlmIChnZW9qc29uLnR5cGUgPT09ICdGZWF0dXJlJykgYmJveCA9IHR1cmZCQm94KGdlb2pzb24pO1xuICAgICAgICBlbHNlIGlmIChnZW9qc29uLnR5cGUgPT09ICdGZWF0dXJlQ29sbGVjdGlvbicpIGJib3ggPSB0dXJmQkJveChnZW9qc29uKTtcbiAgICAgICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZ2VvanNvbicpXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1pblg6IGJib3hbMF0sXG4gICAgICAgICAgICBtaW5ZOiBiYm94WzFdLFxuICAgICAgICAgICAgbWF4WDogYmJveFsyXSxcbiAgICAgICAgICAgIG1heFk6IGJib3hbM11cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiB0cmVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdlb2pzb25SYnVzaDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBnZW9qc29uUmJ1c2g7XG4iLCIhZnVuY3Rpb24odCxpKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1pKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShpKToodD10fHxzZWxmKS5SQnVzaD1pKCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQscixlLGEsaCl7IWZ1bmN0aW9uIHQobixyLGUsYSxoKXtmb3IoO2E+ZTspe2lmKGEtZT42MDApe3ZhciBvPWEtZSsxLHM9ci1lKzEsbD1NYXRoLmxvZyhvKSxmPS41Kk1hdGguZXhwKDIqbC8zKSx1PS41Kk1hdGguc3FydChsKmYqKG8tZikvbykqKHMtby8yPDA/LTE6MSksbT1NYXRoLm1heChlLE1hdGguZmxvb3Ioci1zKmYvbyt1KSksYz1NYXRoLm1pbihhLE1hdGguZmxvb3Iocisoby1zKSpmL28rdSkpO3QobixyLG0sYyxoKX12YXIgcD1uW3JdLGQ9ZSx4PWE7Zm9yKGkobixlLHIpLGgoblthXSxwKT4wJiZpKG4sZSxhKTtkPHg7KXtmb3IoaShuLGQseCksZCsrLHgtLTtoKG5bZF0scCk8MDspZCsrO2Zvcig7aChuW3hdLHApPjA7KXgtLX0wPT09aChuW2VdLHApP2kobixlLHgpOmkobiwrK3gsYSkseDw9ciYmKGU9eCsxKSxyPD14JiYoYT14LTEpfX0odCxyLGV8fDAsYXx8dC5sZW5ndGgtMSxofHxuKX1mdW5jdGlvbiBpKHQsaSxuKXt2YXIgcj10W2ldO3RbaV09dFtuXSx0W25dPXJ9ZnVuY3Rpb24gbih0LGkpe3JldHVybiB0PGk/LTE6dD5pPzE6MH12YXIgcj1mdW5jdGlvbih0KXt2b2lkIDA9PT10JiYodD05KSx0aGlzLl9tYXhFbnRyaWVzPU1hdGgubWF4KDQsdCksdGhpcy5fbWluRW50cmllcz1NYXRoLm1heCgyLE1hdGguY2VpbCguNCp0aGlzLl9tYXhFbnRyaWVzKSksdGhpcy5jbGVhcigpfTtmdW5jdGlvbiBlKHQsaSxuKXtpZighbilyZXR1cm4gaS5pbmRleE9mKHQpO2Zvcih2YXIgcj0wO3I8aS5sZW5ndGg7cisrKWlmKG4odCxpW3JdKSlyZXR1cm4gcjtyZXR1cm4tMX1mdW5jdGlvbiBhKHQsaSl7aCh0LDAsdC5jaGlsZHJlbi5sZW5ndGgsaSx0KX1mdW5jdGlvbiBoKHQsaSxuLHIsZSl7ZXx8KGU9cChudWxsKSksZS5taW5YPTEvMCxlLm1pblk9MS8wLGUubWF4WD0tMS8wLGUubWF4WT0tMS8wO2Zvcih2YXIgYT1pO2E8bjthKyspe3ZhciBoPXQuY2hpbGRyZW5bYV07byhlLHQubGVhZj9yKGgpOmgpfXJldHVybiBlfWZ1bmN0aW9uIG8odCxpKXtyZXR1cm4gdC5taW5YPU1hdGgubWluKHQubWluWCxpLm1pblgpLHQubWluWT1NYXRoLm1pbih0Lm1pblksaS5taW5ZKSx0Lm1heFg9TWF0aC5tYXgodC5tYXhYLGkubWF4WCksdC5tYXhZPU1hdGgubWF4KHQubWF4WSxpLm1heFkpLHR9ZnVuY3Rpb24gcyh0LGkpe3JldHVybiB0Lm1pblgtaS5taW5YfWZ1bmN0aW9uIGwodCxpKXtyZXR1cm4gdC5taW5ZLWkubWluWX1mdW5jdGlvbiBmKHQpe3JldHVybih0Lm1heFgtdC5taW5YKSoodC5tYXhZLXQubWluWSl9ZnVuY3Rpb24gdSh0KXtyZXR1cm4gdC5tYXhYLXQubWluWCsodC5tYXhZLXQubWluWSl9ZnVuY3Rpb24gbSh0LGkpe3JldHVybiB0Lm1pblg8PWkubWluWCYmdC5taW5ZPD1pLm1pblkmJmkubWF4WDw9dC5tYXhYJiZpLm1heFk8PXQubWF4WX1mdW5jdGlvbiBjKHQsaSl7cmV0dXJuIGkubWluWDw9dC5tYXhYJiZpLm1pblk8PXQubWF4WSYmaS5tYXhYPj10Lm1pblgmJmkubWF4WT49dC5taW5ZfWZ1bmN0aW9uIHAodCl7cmV0dXJue2NoaWxkcmVuOnQsaGVpZ2h0OjEsbGVhZjohMCxtaW5YOjEvMCxtaW5ZOjEvMCxtYXhYOi0xLzAsbWF4WTotMS8wfX1mdW5jdGlvbiBkKGksbixyLGUsYSl7Zm9yKHZhciBoPVtuLHJdO2gubGVuZ3RoOylpZighKChyPWgucG9wKCkpLShuPWgucG9wKCkpPD1lKSl7dmFyIG89bitNYXRoLmNlaWwoKHItbikvZS8yKSplO3QoaSxvLG4scixhKSxoLnB1c2gobixvLG8scil9fXJldHVybiByLnByb3RvdHlwZS5hbGw9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fYWxsKHRoaXMuZGF0YSxbXSl9LHIucHJvdG90eXBlLnNlYXJjaD1mdW5jdGlvbih0KXt2YXIgaT10aGlzLmRhdGEsbj1bXTtpZighYyh0LGkpKXJldHVybiBuO2Zvcih2YXIgcj10aGlzLnRvQkJveCxlPVtdO2k7KXtmb3IodmFyIGE9MDthPGkuY2hpbGRyZW4ubGVuZ3RoO2ErKyl7dmFyIGg9aS5jaGlsZHJlblthXSxvPWkubGVhZj9yKGgpOmg7Yyh0LG8pJiYoaS5sZWFmP24ucHVzaChoKTptKHQsbyk/dGhpcy5fYWxsKGgsbik6ZS5wdXNoKGgpKX1pPWUucG9wKCl9cmV0dXJuIG59LHIucHJvdG90eXBlLmNvbGxpZGVzPWZ1bmN0aW9uKHQpe3ZhciBpPXRoaXMuZGF0YTtpZighYyh0LGkpKXJldHVybiExO2Zvcih2YXIgbj1bXTtpOyl7Zm9yKHZhciByPTA7cjxpLmNoaWxkcmVuLmxlbmd0aDtyKyspe3ZhciBlPWkuY2hpbGRyZW5bcl0sYT1pLmxlYWY/dGhpcy50b0JCb3goZSk6ZTtpZihjKHQsYSkpe2lmKGkubGVhZnx8bSh0LGEpKXJldHVybiEwO24ucHVzaChlKX19aT1uLnBvcCgpfXJldHVybiExfSxyLnByb3RvdHlwZS5sb2FkPWZ1bmN0aW9uKHQpe2lmKCF0fHwhdC5sZW5ndGgpcmV0dXJuIHRoaXM7aWYodC5sZW5ndGg8dGhpcy5fbWluRW50cmllcyl7Zm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspdGhpcy5pbnNlcnQodFtpXSk7cmV0dXJuIHRoaXN9dmFyIG49dGhpcy5fYnVpbGQodC5zbGljZSgpLDAsdC5sZW5ndGgtMSwwKTtpZih0aGlzLmRhdGEuY2hpbGRyZW4ubGVuZ3RoKWlmKHRoaXMuZGF0YS5oZWlnaHQ9PT1uLmhlaWdodCl0aGlzLl9zcGxpdFJvb3QodGhpcy5kYXRhLG4pO2Vsc2V7aWYodGhpcy5kYXRhLmhlaWdodDxuLmhlaWdodCl7dmFyIHI9dGhpcy5kYXRhO3RoaXMuZGF0YT1uLG49cn10aGlzLl9pbnNlcnQobix0aGlzLmRhdGEuaGVpZ2h0LW4uaGVpZ2h0LTEsITApfWVsc2UgdGhpcy5kYXRhPW47cmV0dXJuIHRoaXN9LHIucHJvdG90eXBlLmluc2VydD1mdW5jdGlvbih0KXtyZXR1cm4gdCYmdGhpcy5faW5zZXJ0KHQsdGhpcy5kYXRhLmhlaWdodC0xKSx0aGlzfSxyLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmRhdGE9cChbXSksdGhpc30sci5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKHQsaSl7aWYoIXQpcmV0dXJuIHRoaXM7Zm9yKHZhciBuLHIsYSxoPXRoaXMuZGF0YSxvPXRoaXMudG9CQm94KHQpLHM9W10sbD1bXTtofHxzLmxlbmd0aDspe2lmKGh8fChoPXMucG9wKCkscj1zW3MubGVuZ3RoLTFdLG49bC5wb3AoKSxhPSEwKSxoLmxlYWYpe3ZhciBmPWUodCxoLmNoaWxkcmVuLGkpO2lmKC0xIT09ZilyZXR1cm4gaC5jaGlsZHJlbi5zcGxpY2UoZiwxKSxzLnB1c2goaCksdGhpcy5fY29uZGVuc2UocyksdGhpc31hfHxoLmxlYWZ8fCFtKGgsbyk/cj8obisrLGg9ci5jaGlsZHJlbltuXSxhPSExKTpoPW51bGw6KHMucHVzaChoKSxsLnB1c2gobiksbj0wLHI9aCxoPWguY2hpbGRyZW5bMF0pfXJldHVybiB0aGlzfSxyLnByb3RvdHlwZS50b0JCb3g9ZnVuY3Rpb24odCl7cmV0dXJuIHR9LHIucHJvdG90eXBlLmNvbXBhcmVNaW5YPWZ1bmN0aW9uKHQsaSl7cmV0dXJuIHQubWluWC1pLm1pblh9LHIucHJvdG90eXBlLmNvbXBhcmVNaW5ZPWZ1bmN0aW9uKHQsaSl7cmV0dXJuIHQubWluWS1pLm1pbll9LHIucHJvdG90eXBlLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmRhdGF9LHIucHJvdG90eXBlLmZyb21KU09OPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmRhdGE9dCx0aGlzfSxyLnByb3RvdHlwZS5fYWxsPWZ1bmN0aW9uKHQsaSl7Zm9yKHZhciBuPVtdO3Q7KXQubGVhZj9pLnB1c2guYXBwbHkoaSx0LmNoaWxkcmVuKTpuLnB1c2guYXBwbHkobix0LmNoaWxkcmVuKSx0PW4ucG9wKCk7cmV0dXJuIGl9LHIucHJvdG90eXBlLl9idWlsZD1mdW5jdGlvbih0LGksbixyKXt2YXIgZSxoPW4taSsxLG89dGhpcy5fbWF4RW50cmllcztpZihoPD1vKXJldHVybiBhKGU9cCh0LnNsaWNlKGksbisxKSksdGhpcy50b0JCb3gpLGU7cnx8KHI9TWF0aC5jZWlsKE1hdGgubG9nKGgpL01hdGgubG9nKG8pKSxvPU1hdGguY2VpbChoL01hdGgucG93KG8sci0xKSkpLChlPXAoW10pKS5sZWFmPSExLGUuaGVpZ2h0PXI7dmFyIHM9TWF0aC5jZWlsKGgvbyksbD1zKk1hdGguY2VpbChNYXRoLnNxcnQobykpO2QodCxpLG4sbCx0aGlzLmNvbXBhcmVNaW5YKTtmb3IodmFyIGY9aTtmPD1uO2YrPWwpe3ZhciB1PU1hdGgubWluKGYrbC0xLG4pO2QodCxmLHUscyx0aGlzLmNvbXBhcmVNaW5ZKTtmb3IodmFyIG09ZjttPD11O20rPXMpe3ZhciBjPU1hdGgubWluKG0rcy0xLHUpO2UuY2hpbGRyZW4ucHVzaCh0aGlzLl9idWlsZCh0LG0sYyxyLTEpKX19cmV0dXJuIGEoZSx0aGlzLnRvQkJveCksZX0sci5wcm90b3R5cGUuX2Nob29zZVN1YnRyZWU9ZnVuY3Rpb24odCxpLG4scil7Zm9yKDtyLnB1c2goaSksIWkubGVhZiYmci5sZW5ndGgtMSE9PW47KXtmb3IodmFyIGU9MS8wLGE9MS8wLGg9dm9pZCAwLG89MDtvPGkuY2hpbGRyZW4ubGVuZ3RoO28rKyl7dmFyIHM9aS5jaGlsZHJlbltvXSxsPWYocyksdT0obT10LGM9cywoTWF0aC5tYXgoYy5tYXhYLG0ubWF4WCktTWF0aC5taW4oYy5taW5YLG0ubWluWCkpKihNYXRoLm1heChjLm1heFksbS5tYXhZKS1NYXRoLm1pbihjLm1pblksbS5taW5ZKSktbCk7dTxhPyhhPXUsZT1sPGU/bDplLGg9cyk6dT09PWEmJmw8ZSYmKGU9bCxoPXMpfWk9aHx8aS5jaGlsZHJlblswXX12YXIgbSxjO3JldHVybiBpfSxyLnByb3RvdHlwZS5faW5zZXJ0PWZ1bmN0aW9uKHQsaSxuKXt2YXIgcj1uP3Q6dGhpcy50b0JCb3godCksZT1bXSxhPXRoaXMuX2Nob29zZVN1YnRyZWUocix0aGlzLmRhdGEsaSxlKTtmb3IoYS5jaGlsZHJlbi5wdXNoKHQpLG8oYSxyKTtpPj0wJiZlW2ldLmNoaWxkcmVuLmxlbmd0aD50aGlzLl9tYXhFbnRyaWVzOyl0aGlzLl9zcGxpdChlLGkpLGktLTt0aGlzLl9hZGp1c3RQYXJlbnRCQm94ZXMocixlLGkpfSxyLnByb3RvdHlwZS5fc3BsaXQ9ZnVuY3Rpb24odCxpKXt2YXIgbj10W2ldLHI9bi5jaGlsZHJlbi5sZW5ndGgsZT10aGlzLl9taW5FbnRyaWVzO3RoaXMuX2Nob29zZVNwbGl0QXhpcyhuLGUscik7dmFyIGg9dGhpcy5fY2hvb3NlU3BsaXRJbmRleChuLGUsciksbz1wKG4uY2hpbGRyZW4uc3BsaWNlKGgsbi5jaGlsZHJlbi5sZW5ndGgtaCkpO28uaGVpZ2h0PW4uaGVpZ2h0LG8ubGVhZj1uLmxlYWYsYShuLHRoaXMudG9CQm94KSxhKG8sdGhpcy50b0JCb3gpLGk/dFtpLTFdLmNoaWxkcmVuLnB1c2gobyk6dGhpcy5fc3BsaXRSb290KG4sbyl9LHIucHJvdG90eXBlLl9zcGxpdFJvb3Q9ZnVuY3Rpb24odCxpKXt0aGlzLmRhdGE9cChbdCxpXSksdGhpcy5kYXRhLmhlaWdodD10LmhlaWdodCsxLHRoaXMuZGF0YS5sZWFmPSExLGEodGhpcy5kYXRhLHRoaXMudG9CQm94KX0sci5wcm90b3R5cGUuX2Nob29zZVNwbGl0SW5kZXg9ZnVuY3Rpb24odCxpLG4pe2Zvcih2YXIgcixlLGEsbyxzLGwsdSxtPTEvMCxjPTEvMCxwPWk7cDw9bi1pO3ArKyl7dmFyIGQ9aCh0LDAscCx0aGlzLnRvQkJveCkseD1oKHQscCxuLHRoaXMudG9CQm94KSx2PShlPWQsYT14LG89dm9pZCAwLHM9dm9pZCAwLGw9dm9pZCAwLHU9dm9pZCAwLG89TWF0aC5tYXgoZS5taW5YLGEubWluWCkscz1NYXRoLm1heChlLm1pblksYS5taW5ZKSxsPU1hdGgubWluKGUubWF4WCxhLm1heFgpLHU9TWF0aC5taW4oZS5tYXhZLGEubWF4WSksTWF0aC5tYXgoMCxsLW8pKk1hdGgubWF4KDAsdS1zKSksTT1mKGQpK2YoeCk7djxtPyhtPXYscj1wLGM9TTxjP006Yyk6dj09PW0mJk08YyYmKGM9TSxyPXApfXJldHVybiByfHxuLWl9LHIucHJvdG90eXBlLl9jaG9vc2VTcGxpdEF4aXM9ZnVuY3Rpb24odCxpLG4pe3ZhciByPXQubGVhZj90aGlzLmNvbXBhcmVNaW5YOnMsZT10LmxlYWY/dGhpcy5jb21wYXJlTWluWTpsO3RoaXMuX2FsbERpc3RNYXJnaW4odCxpLG4scik8dGhpcy5fYWxsRGlzdE1hcmdpbih0LGksbixlKSYmdC5jaGlsZHJlbi5zb3J0KHIpfSxyLnByb3RvdHlwZS5fYWxsRGlzdE1hcmdpbj1mdW5jdGlvbih0LGksbixyKXt0LmNoaWxkcmVuLnNvcnQocik7Zm9yKHZhciBlPXRoaXMudG9CQm94LGE9aCh0LDAsaSxlKSxzPWgodCxuLWksbixlKSxsPXUoYSkrdShzKSxmPWk7ZjxuLWk7ZisrKXt2YXIgbT10LmNoaWxkcmVuW2ZdO28oYSx0LmxlYWY/ZShtKTptKSxsKz11KGEpfWZvcih2YXIgYz1uLWktMTtjPj1pO2MtLSl7dmFyIHA9dC5jaGlsZHJlbltjXTtvKHMsdC5sZWFmP2UocCk6cCksbCs9dShzKX1yZXR1cm4gbH0sci5wcm90b3R5cGUuX2FkanVzdFBhcmVudEJCb3hlcz1mdW5jdGlvbih0LGksbil7Zm9yKHZhciByPW47cj49MDtyLS0pbyhpW3JdLHQpfSxyLnByb3RvdHlwZS5fY29uZGVuc2U9ZnVuY3Rpb24odCl7Zm9yKHZhciBpPXQubGVuZ3RoLTEsbj12b2lkIDA7aT49MDtpLS0pMD09PXRbaV0uY2hpbGRyZW4ubGVuZ3RoP2k+MD8obj10W2ktMV0uY2hpbGRyZW4pLnNwbGljZShuLmluZGV4T2YodFtpXSksMSk6dGhpcy5jbGVhcigpOmEodFtpXSx0aGlzLnRvQkJveCl9LHJ9KTtcbiIsImV4cG9ydCBjb25zdCBsaW5lID0gYDxzdmcgdmlld0JveD1cIi01IDAgMzIgMzJcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG48cGF0aCBkPVwiTTIzLjM2IDkuMzJjLTEuMzIgMC0yLjM2IDEuMDgwLTIuMzYgMi4zNiAwIDAuMjggMC4wNDAgMC41NiAwLjEyIDAuOGwtNC44IDQuMDgwYy0wLjMyLTAuMi0wLjcyLTAuMjgtMS4xNi0wLjI4cy0wLjg4IDAuMTItMS4yNCAwLjM2bC0yLjcyLTIuMmMwLjA4MC0wLjI0IDAuMTItMC40NCAwLjEyLTAuNzIgMC0xLjMyLTEuMDgwLTIuMzYtMi4zNi0yLjM2LTEuMzIgMC0yLjM2IDEuMDgwLTIuMzYgMi4zNiAwIDAuMzYgMC4wODAgMC42OCAwLjIgMC45NmwtMy40NCAzLjQ0Yy0wLjI4LTAuMTItMC42NC0wLjItMC45Ni0wLjItMS4zMiAwLTIuMzYgMS4wODAtMi4zNiAyLjM2IDAgMS4zMiAxLjA4MCAyLjM2IDIuMzYgMi4zNnMyLjM2LTEuMDgwIDIuMzYtMi4zNmMwLTAuMzYtMC4wODAtMC42OC0wLjItMC45NmwzLjQ0LTMuNDRjMC4yOCAwLjEyIDAuNjQgMC4yIDAuOTYgMC4yIDAuNDQgMCAwLjg4LTAuMTIgMS4yNC0wLjM2bDIuNzYgMi4xMmMtMC4wODAgMC4yNC0wLjA4MCAwLjQ0LTAuMDgwIDAuNzIgMCAxLjMyIDEuMDgwIDIuMzYgMi4zNiAyLjM2czIuMzYtMS4wODAgMi4zNi0yLjM2YzAtMC4yOC0wLjA0MC0wLjU2LTAuMTItMC44bDQuOC00LjA4MGMwLjMyIDAuMiAwLjcyIDAuMjggMS4xNiAwLjI4IDEuMzIgMCAyLjM2LTEuMDgwIDIuMzYtMi4zNi0wLjA0MC0xLjItMS4xNi0yLjI4LTIuNDQtMi4yOHpNMi4zNiAyMWMtMC4zNiAwLTAuNjgtMC4zMi0wLjY4LTAuNjggMC0wLjQgMC4zMi0wLjY4IDAuNjgtMC42OHMwLjY4IDAuMzIgMC42OCAwLjY4YzAgMC4zNi0wLjI4IDAuNjgtMC42OCAwLjY4ek04LjI0IDEzLjc2YzAtMC40IDAuMzItMC42OCAwLjY4LTAuNjhzMC42OCAwLjMyIDAuNjggMC42OC0wLjMyIDAuNjgtMC42OCAwLjY4Yy0wLjM2IDAtMC42OC0wLjMyLTAuNjgtMC42OHpNMTUuMiAxOS4yOGMtMC40IDAtMC42OC0wLjMyLTAuNjgtMC42OHMwLjMyLTAuNjggMC42OC0wLjY4IDAuNjggMC4zMiAwLjY4IDAuNjhjLTAuMDQwIDAuNC0wLjI4IDAuNjgtMC42OCAwLjY4ek0yMy4zNiAxMi4zNmMtMC4zNiAwLTAuNjgtMC4zMi0wLjY4LTAuNjggMC0wLjQgMC4zMi0wLjY4IDAuNjgtMC42OCAwLjQgMCAwLjY4IDAuMzIgMC42OCAwLjY4IDAgMC40LTAuMzIgMC42OC0wLjY4IDAuNjh6XCI+PC9wYXRoPlxyXG48L3N2Zz5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlbGVjdCA9IGA8c3ZnIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIi00IC0zIDI4IDI4XCIgPlxyXG48ZyBpZD1cInNlbGVjdFwiPlxyXG48cGF0aCBkPVwiTTE0LjgsMjRsLTMuMy00LjNsLTMuMiw0LjJMNS44LDYuOWwxNiw3LjJMMTYuNCwxNmwzLjIsNC4zTDE0LjgsMjR6IE0xMS42LDE2LjRsMy42LDQuOGwxLjYtMS4zTDEzLjEsMTVsMy4zLTEuMWwtOC4xLTMuNlxyXG4gIGwxLjMsOC43TDExLjYsMTYuNHpcIi8+XHJcbjxwYXRoIGQ9XCJNNCwxOEgwdi00aDJ2MmgyVjE4eiBNMiwxMkgwVjZoMlYxMnogTTE4LDEwaC0yVjZoMlYxMHogTTE4LDRoLTJWMmgtMlYwaDRWNHogTTIsNEgwVjBoNHYySDJWNHogTTEyLDJINlYwaDZWMnpcIi8+XHJcbjwvZz5cclxuPC9zdmc+YDtcclxuXHJcbmV4cG9ydCBjb25zdCB1bnNlbGVjdDIgPSBgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG48cGF0aCAgb3BhY2l0eT1cIi4yNVwiIGQ9XCJNOC40NTggMTIuNWExMC4zMjMgMTAuMzIzIDAgMCAxIDYuNTM2IDIuNzU3IDcuOTQyIDcuOTQyIDAgMCAwLTIuMTI4LTQuODc4QzEwLjU5MyA4LjI0OSA5LjE0NSA4LjYwNSA5IDJIM3YxMi40MzNBOS4zOTIgOS4zOTIgMCAwIDEgOC40NTggMTIuNXpcIi8+XHJcbjxwYXRoIGQ9XCJNMjIgMnYyMGgtNXYtMWg0VjkuMDVhMTAuMzI3IDEwLjMyNyAwIDAgMC01LjI1MyAxLjkxYy0uMTU0LS4yNDktLjM1LS41NDItLjU1OC0uODM3QTExLjM2NCAxMS4zNjQgMCAwIDEgMjEgOC4wNDhWM0gxMFYyek0zIDJ2MmgxVjNoMVYySDN6bTAgNmgxVjZIM3ptMCA0aDF2LTJIM3pNOSAySDd2MWgxdi4wMjJjLjAxNy4zNjIuMDM4LjcuMDY3IDEuMDI0bC45OTYtLjA5QTE3LjM1NSAxNy4zNTUgMCAwIDEgOSAyem01Ljg0IDEyLjIxNGExMy42MDQgMTMuNjA0IDAgMCAwLS41OTQtMS44MWwtLjA4OC0uMjEtLjkxNC40MDYuMDczLjE3M2ExMi42NzcgMTIuNjc3IDAgMCAxIC41NTMgMS42OHpNOC4zOTcgNi4xNDJhNy43MDEgNy43MDEgMCAwIDAgLjc3MyAyLjAzNWwuODctLjQ5NGE2LjcyNiA2LjcyNiAwIDAgMS0uNjctMS43NzR6bTQuNDcgNC4yMzdhMTEuNDUgMTEuNDUgMCAwIDAtLjk4OS0uODAyYy0uMjExLS4xNTgtLjQyNC0uMzE3LS42MzItLjQ5bC0uNjM5Ljc3Yy4yMjIuMTgzLjQ0Ny4zNTIuNjcxLjUyYTEwLjc0NyAxMC43NDcgMCAwIDEgLjkwOC43MzJ6TTE2IDE4LjVsLS4yMzQuMzA1QzE1LjYzNCAxOC45NzYgMTIuNTI0IDIzIDguNDU4IDIzYy00LjA2IDAtNy4wNzItNC4wMTctNy4yMDktNC4xODhMMSAxOC41bC4yNDktLjMxMkMxLjM4NiAxOC4wMTggNC4zOTggMTQgOC40NTkgMTRjNC4wNjQgMCA3LjE3NSA0LjAyNCA3LjMwNyA0LjE5NXptLTEuMTAxIDBjLS44MTUtLjkyOC0zLjM5LTMuNi02LjQ0LTMuNi0zLjA0NSAwLTUuNDg5IDIuNjYzLTYuMzM4IDMuNi44NS45MzcgMy4yOTMgMy42IDYuMzM5IDMuNiAzLjA1NSAwIDUuNjI2LTIuNjcgNi40MzktMy42ek0xMSAxOC41QTIuNSAyLjUgMCAxIDAgOC41IDIxYTIuNTAzIDIuNTAzIDAgMCAwIDIuNS0yLjV6XCIvPlxyXG48cGF0aCBmaWxsPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIvPlxyXG48L3N2Zz5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVuc2VsZWN0ID0gYDxzdmcgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBcclxudmlld0JveD1cIjAgMCAxNSAxNlwiPlxyXG48ZyBpZD1cImxheWVyMVwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNDYxLjcxNCAtNTMxLjc5KVwiPlxyXG5cclxuPHBhdGggICBkPVwiTTQ3MC43MTQgNTMzLjg3N3YxLjAxNWE1IDUgMCAwIDEgMS43NTQuNzNsLjcxNy0uNzE2YTYgNiAwIDAgMC0yLjQ3LTEuMDN6bS0yIC4wMDRhNiA2IDAgMCAwLTIuNDcyIDEuMDIzbC43MTguNzE5YTUgNSAwIDAgMSAxLjc1NC0uNzI3em01Ljg4NyAyLjQzNy0uNzE5LjcxOWE1IDUgMCAwIDEgLjcyNyAxLjc1NGgxLjAxNWE2IDYgMCAwIDAtMS4wMjMtMi40NzN6bS05Ljc3MS4wMDJhNiA2IDAgMCAwLTEuMDMgMi40N2gxLjAxNmE1IDUgMCAwIDEgLjczLTEuNzUzem0tMS4wMjYgNC40N2E2IDYgMCAwIDAgMS4wMjQgMi40NzRsLjcxOC0uNzJhNSA1IDAgMCAxLS43MjYtMS43NTN6bTEwLjgwOSAwYTUgNSAwIDAgMS0uNzMgMS43NTVsLjcxNi43MTdhNiA2IDAgMCAwIDEuMDMtMi40NzF6bS03LjY1MyAzLjE2OS0uNzE2LjcxN2E2IDYgMCAwIDAgMi40NyAxLjAyOXYtMS4wMTZhNSA1IDAgMCAxLTEuNzU0LS43M3ptNS41MDggMGE1IDUgMCAwIDEtMS43NTQuNzI2djEuMDE2YTYgNiAwIDAgMCAyLjQ3My0xLjAyM3pcIiBpZD1cInBhdGg4NThcIi8+XHJcblxyXG48cmVjdCB0cmFuc2Zvcm09XCJyb3RhdGUoLTQ1KVwiIHdpZHRoPVwiMVwiIGhlaWdodD1cIjguMDAwMDAyOVwiIHg9XCItNTAuMDUxNTUyXCIgeT1cIjcwOS44Mjc4OFwiLz5cclxuXHJcbjxyZWN0IHdpZHRoPVwiMVwiIGhlaWdodD1cIjhcIiB4PVwiLTcxNC4zMjc4OFwiIHk9XCItNTMuNTUxNTUyXCIgdHJhbnNmb3JtPVwicm90YXRlKC0xMzUpXCIvPlxyXG5cclxuPC9nPlxyXG48L3N2Zz5gO1xyXG4iLCJpbXBvcnQgYm9vbGVhblBvaW50SW5Qb2x5Z29uIGZyb20gXCJAdHVyZi9ib29sZWFuLXBvaW50LWluLXBvbHlnb25cIjtcbmltcG9ydCBsaW5lSW50ZXJzZWN0IGZyb20gXCJAdHVyZi9saW5lLWludGVyc2VjdFwiO1xuaW1wb3J0IHsgZmxhdHRlbkVhY2ggfSBmcm9tIFwiQHR1cmYvbWV0YVwiO1xuaW1wb3J0IHBvbHlnb25Ub0xpbmUgZnJvbSBcIkB0dXJmL3BvbHlnb24tdG8tbGluZVwiO1xuLyoqXG4gKiBCb29sZWFuLWRpc2pvaW50IHJldHVybnMgKFRSVUUpIGlmIHRoZSBpbnRlcnNlY3Rpb24gb2YgdGhlIHR3byBnZW9tZXRyaWVzIGlzIGFuIGVtcHR5IHNldC5cbiAqXG4gKiBAbmFtZSBib29sZWFuRGlzam9pbnRcbiAqIEBwYXJhbSB7R2VvbWV0cnl8RmVhdHVyZTxhbnk+fSBmZWF0dXJlMSBHZW9KU09OIEZlYXR1cmUgb3IgR2VvbWV0cnlcbiAqIEBwYXJhbSB7R2VvbWV0cnl8RmVhdHVyZTxhbnk+fSBmZWF0dXJlMiBHZW9KU09OIEZlYXR1cmUgb3IgR2VvbWV0cnlcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlL2ZhbHNlXG4gKiBAZXhhbXBsZVxuICogdmFyIHBvaW50ID0gdHVyZi5wb2ludChbMiwgMl0pO1xuICogdmFyIGxpbmUgPSB0dXJmLmxpbmVTdHJpbmcoW1sxLCAxXSwgWzEsIDJdLCBbMSwgM10sIFsxLCA0XV0pO1xuICpcbiAqIHR1cmYuYm9vbGVhbkRpc2pvaW50KGxpbmUsIHBvaW50KTtcbiAqIC8vPXRydWVcbiAqL1xuZnVuY3Rpb24gYm9vbGVhbkRpc2pvaW50KGZlYXR1cmUxLCBmZWF0dXJlMikge1xuICAgIHZhciBib29sID0gdHJ1ZTtcbiAgICBmbGF0dGVuRWFjaChmZWF0dXJlMSwgZnVuY3Rpb24gKGZsYXR0ZW4xKSB7XG4gICAgICAgIGZsYXR0ZW5FYWNoKGZlYXR1cmUyLCBmdW5jdGlvbiAoZmxhdHRlbjIpIHtcbiAgICAgICAgICAgIGlmIChib29sID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvb2wgPSBkaXNqb2ludChmbGF0dGVuMS5nZW9tZXRyeSwgZmxhdHRlbjIuZ2VvbWV0cnkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYm9vbDtcbn1cbi8qKlxuICogRGlzam9pbnQgb3BlcmF0aW9uIGZvciBzaW1wbGUgR2VvbWV0cmllcyAoUG9pbnQvTGluZVN0cmluZy9Qb2x5Z29uKVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0dlb21ldHJ5PGFueT59IGdlb20xIEdlb0pTT04gR2VvbWV0cnlcbiAqIEBwYXJhbSB7R2VvbWV0cnk8YW55Pn0gZ2VvbTIgR2VvSlNPTiBHZW9tZXRyeVxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUvZmFsc2VcbiAqL1xuZnVuY3Rpb24gZGlzam9pbnQoZ2VvbTEsIGdlb20yKSB7XG4gICAgc3dpdGNoIChnZW9tMS50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgICAgICAgc3dpdGNoIChnZW9tMi50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIlBvaW50XCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhY29tcGFyZUNvb3JkcyhnZW9tMS5jb29yZGluYXRlcywgZ2VvbTIuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNQb2ludE9uTGluZShnZW9tMiwgZ2VvbTEpO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhYm9vbGVhblBvaW50SW5Qb2x5Z29uKGdlb20xLCBnZW9tMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgICAgICAgICBzd2l0Y2ggKGdlb20yLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc1BvaW50T25MaW5lKGdlb20xLCBnZW9tMik7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc0xpbmVPbkxpbmUoZ2VvbTEsIGdlb20yKTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWlzTGluZUluUG9seShnZW9tMiwgZ2VvbTEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgICAgICAgc3dpdGNoIChnZW9tMi50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIlBvaW50XCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhYm9vbGVhblBvaW50SW5Qb2x5Z29uKGdlb20yLCBnZW9tMSk7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc0xpbmVJblBvbHkoZ2VvbTEsIGdlb20yKTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWlzUG9seUluUG9seShnZW9tMiwgZ2VvbTEpO1xuICAgICAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMTkwODE1OC8xOTc5MDg1XG5mdW5jdGlvbiBpc1BvaW50T25MaW5lKGxpbmVTdHJpbmcsIHB0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lU3RyaW5nLmNvb3JkaW5hdGVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBpZiAoaXNQb2ludE9uTGluZVNlZ21lbnQobGluZVN0cmluZy5jb29yZGluYXRlc1tpXSwgbGluZVN0cmluZy5jb29yZGluYXRlc1tpICsgMV0sIHB0LmNvb3JkaW5hdGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gaXNMaW5lT25MaW5lKGxpbmVTdHJpbmcxLCBsaW5lU3RyaW5nMikge1xuICAgIHZhciBkb0xpbmVzSW50ZXJzZWN0ID0gbGluZUludGVyc2VjdChsaW5lU3RyaW5nMSwgbGluZVN0cmluZzIpO1xuICAgIGlmIChkb0xpbmVzSW50ZXJzZWN0LmZlYXR1cmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGlzTGluZUluUG9seShwb2x5Z29uLCBsaW5lU3RyaW5nKSB7XG4gICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IGxpbmVTdHJpbmcuY29vcmRpbmF0ZXM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBjb29yZCA9IF9hW19pXTtcbiAgICAgICAgaWYgKGJvb2xlYW5Qb2ludEluUG9seWdvbihjb29yZCwgcG9seWdvbikpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBkb0xpbmVzSW50ZXJzZWN0ID0gbGluZUludGVyc2VjdChsaW5lU3RyaW5nLCBwb2x5Z29uVG9MaW5lKHBvbHlnb24pKTtcbiAgICBpZiAoZG9MaW5lc0ludGVyc2VjdC5mZWF0dXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG4vKipcbiAqIElzIFBvbHlnb24gKGdlb20xKSBpbiBQb2x5Z29uIChnZW9tMilcbiAqIE9ubHkgdGFrZXMgaW50byBhY2NvdW50IG91dGVyIHJpbmdzXG4gKiBTZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDgzMzgyMy8xOTc5MDg1XG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7R2VvbWV0cnl8RmVhdHVyZTxQb2x5Z29uPn0gZmVhdHVyZTEgUG9seWdvbjFcbiAqIEBwYXJhbSB7R2VvbWV0cnl8RmVhdHVyZTxQb2x5Z29uPn0gZmVhdHVyZTIgUG9seWdvbjJcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlL2ZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzUG9seUluUG9seShmZWF0dXJlMSwgZmVhdHVyZTIpIHtcbiAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gZmVhdHVyZTEuY29vcmRpbmF0ZXNbMF07IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBjb29yZDEgPSBfYVtfaV07XG4gICAgICAgIGlmIChib29sZWFuUG9pbnRJblBvbHlnb24oY29vcmQxLCBmZWF0dXJlMikpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9iID0gMCwgX2MgPSBmZWF0dXJlMi5jb29yZGluYXRlc1swXTsgX2IgPCBfYy5sZW5ndGg7IF9iKyspIHtcbiAgICAgICAgdmFyIGNvb3JkMiA9IF9jW19iXTtcbiAgICAgICAgaWYgKGJvb2xlYW5Qb2ludEluUG9seWdvbihjb29yZDIsIGZlYXR1cmUxKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGRvTGluZXNJbnRlcnNlY3QgPSBsaW5lSW50ZXJzZWN0KHBvbHlnb25Ub0xpbmUoZmVhdHVyZTEpLCBwb2x5Z29uVG9MaW5lKGZlYXR1cmUyKSk7XG4gICAgaWYgKGRvTGluZXNJbnRlcnNlY3QuZmVhdHVyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gaXNQb2ludE9uTGluZVNlZ21lbnQobGluZVNlZ21lbnRTdGFydCwgbGluZVNlZ21lbnRFbmQsIHB0KSB7XG4gICAgdmFyIGR4YyA9IHB0WzBdIC0gbGluZVNlZ21lbnRTdGFydFswXTtcbiAgICB2YXIgZHljID0gcHRbMV0gLSBsaW5lU2VnbWVudFN0YXJ0WzFdO1xuICAgIHZhciBkeGwgPSBsaW5lU2VnbWVudEVuZFswXSAtIGxpbmVTZWdtZW50U3RhcnRbMF07XG4gICAgdmFyIGR5bCA9IGxpbmVTZWdtZW50RW5kWzFdIC0gbGluZVNlZ21lbnRTdGFydFsxXTtcbiAgICB2YXIgY3Jvc3MgPSBkeGMgKiBkeWwgLSBkeWMgKiBkeGw7XG4gICAgaWYgKGNyb3NzICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKE1hdGguYWJzKGR4bCkgPj0gTWF0aC5hYnMoZHlsKSkge1xuICAgICAgICBpZiAoZHhsID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGxpbmVTZWdtZW50U3RhcnRbMF0gPD0gcHRbMF0gJiYgcHRbMF0gPD0gbGluZVNlZ21lbnRFbmRbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbGluZVNlZ21lbnRFbmRbMF0gPD0gcHRbMF0gJiYgcHRbMF0gPD0gbGluZVNlZ21lbnRTdGFydFswXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChkeWwgPiAwKSB7XG4gICAgICAgIHJldHVybiBsaW5lU2VnbWVudFN0YXJ0WzFdIDw9IHB0WzFdICYmIHB0WzFdIDw9IGxpbmVTZWdtZW50RW5kWzFdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGxpbmVTZWdtZW50RW5kWzFdIDw9IHB0WzFdICYmIHB0WzFdIDw9IGxpbmVTZWdtZW50U3RhcnRbMV07XG4gICAgfVxufVxuLyoqXG4gKiBjb21wYXJlQ29vcmRzXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7UG9zaXRpb259IHBhaXIxIHBvaW50IFt4LHldXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufSBwYWlyMiBwb2ludCBbeCx5XVxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUvZmFsc2UgaWYgY29vcmQgcGFpcnMgbWF0Y2hcbiAqL1xuZnVuY3Rpb24gY29tcGFyZUNvb3JkcyhwYWlyMSwgcGFpcjIpIHtcbiAgICByZXR1cm4gcGFpcjFbMF0gPT09IHBhaXIyWzBdICYmIHBhaXIxWzFdID09PSBwYWlyMlsxXTtcbn1cbmV4cG9ydCBkZWZhdWx0IGJvb2xlYW5EaXNqb2ludDtcbiIsImltcG9ydCBib29sZWFuRGlzam9pbnQgZnJvbSBcIkB0dXJmL2Jvb2xlYW4tZGlzam9pbnRcIjtcbmltcG9ydCB7IGZsYXR0ZW5FYWNoIH0gZnJvbSBcIkB0dXJmL21ldGFcIjtcbi8qKlxuICogQm9vbGVhbi1pbnRlcnNlY3RzIHJldHVybnMgKFRSVUUpIHR3byBnZW9tZXRyaWVzIGludGVyc2VjdC5cbiAqXG4gKiBAbmFtZSBib29sZWFuSW50ZXJzZWN0c1xuICogQHBhcmFtIHtHZW9tZXRyeXxGZWF0dXJlPGFueT59IGZlYXR1cmUxIEdlb0pTT04gRmVhdHVyZSBvciBHZW9tZXRyeVxuICogQHBhcmFtIHtHZW9tZXRyeXxGZWF0dXJlPGFueT59IGZlYXR1cmUyIEdlb0pTT04gRmVhdHVyZSBvciBHZW9tZXRyeVxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUvZmFsc2VcbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9pbnQgPSB0dXJmLnBvaW50KFsyLCAyXSk7XG4gKiB2YXIgbGluZSA9IHR1cmYubGluZVN0cmluZyhbWzEsIDFdLCBbMSwgMl0sIFsxLCAzXSwgWzEsIDRdXSk7XG4gKlxuICogdHVyZi5ib29sZWFuSW50ZXJzZWN0cyhsaW5lLCBwb2ludCk7XG4gKiAvLz10cnVlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJvb2xlYW5JbnRlcnNlY3RzKGZlYXR1cmUxLCBmZWF0dXJlMikge1xuICAgIHZhciBib29sID0gZmFsc2U7XG4gICAgZmxhdHRlbkVhY2goZmVhdHVyZTEsIGZ1bmN0aW9uIChmbGF0dGVuMSkge1xuICAgICAgICBmbGF0dGVuRWFjaChmZWF0dXJlMiwgZnVuY3Rpb24gKGZsYXR0ZW4yKSB7XG4gICAgICAgICAgICBpZiAoYm9vbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9vbCA9ICFib29sZWFuRGlzam9pbnQoZmxhdHRlbjEuZ2VvbWV0cnksIGZsYXR0ZW4yLmdlb21ldHJ5KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGJvb2w7XG59XG4iLCJpbXBvcnQgeyBnZXRDb29yZCwgZ2V0R2VvbSB9IGZyb20gXCJAdHVyZi9pbnZhcmlhbnRcIjtcbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRXZlbiVFMiU4MCU5M29kZF9ydWxlXG4vLyBtb2RpZmllZCBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vc3Vic3RhY2svcG9pbnQtaW4tcG9seWdvbi9ibG9iL21hc3Rlci9pbmRleC5qc1xuLy8gd2hpY2ggd2FzIG1vZGlmaWVkIGZyb20gaHR0cDovL3d3dy5lY3NlLnJwaS5lZHUvSG9tZXBhZ2VzL3dyZi9SZXNlYXJjaC9TaG9ydF9Ob3Rlcy9wbnBvbHkuaHRtbFxuLyoqXG4gKiBUYWtlcyBhIHtAbGluayBQb2ludH0gYW5kIGEge0BsaW5rIFBvbHlnb259IG9yIHtAbGluayBNdWx0aVBvbHlnb259IGFuZCBkZXRlcm1pbmVzIGlmIHRoZSBwb2ludFxuICogcmVzaWRlcyBpbnNpZGUgdGhlIHBvbHlnb24uIFRoZSBwb2x5Z29uIGNhbiBiZSBjb252ZXggb3IgY29uY2F2ZS4gVGhlIGZ1bmN0aW9uIGFjY291bnRzIGZvciBob2xlcy5cbiAqXG4gKiBAbmFtZSBib29sZWFuUG9pbnRJblBvbHlnb25cbiAqIEBwYXJhbSB7Q29vcmR9IHBvaW50IGlucHV0IHBvaW50XG4gKiBAcGFyYW0ge0ZlYXR1cmU8UG9seWdvbnxNdWx0aVBvbHlnb24+fSBwb2x5Z29uIGlucHV0IHBvbHlnb24gb3IgbXVsdGlwb2x5Z29uXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuaWdub3JlQm91bmRhcnk9ZmFsc2VdIFRydWUgaWYgcG9seWdvbiBib3VuZGFyeSBzaG91bGQgYmUgaWdub3JlZCB3aGVuIGRldGVybWluaW5nIGlmXG4gKiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBwb2x5Z29uIG90aGVyd2lzZSBmYWxzZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIFBvaW50IGlzIGluc2lkZSB0aGUgUG9seWdvbjsgYGZhbHNlYCBpZiB0aGUgUG9pbnQgaXMgbm90IGluc2lkZSB0aGUgUG9seWdvblxuICogQGV4YW1wbGVcbiAqIHZhciBwdCA9IHR1cmYucG9pbnQoWy03NywgNDRdKTtcbiAqIHZhciBwb2x5ID0gdHVyZi5wb2x5Z29uKFtbXG4gKiAgIFstODEsIDQxXSxcbiAqICAgWy04MSwgNDddLFxuICogICBbLTcyLCA0N10sXG4gKiAgIFstNzIsIDQxXSxcbiAqICAgWy04MSwgNDFdXG4gKiBdXSk7XG4gKlxuICogdHVyZi5ib29sZWFuUG9pbnRJblBvbHlnb24ocHQsIHBvbHkpO1xuICogLy89IHRydWVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYm9vbGVhblBvaW50SW5Qb2x5Z29uKHBvaW50LCBwb2x5Z29uLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAvLyB2YWxpZGF0aW9uXG4gICAgaWYgKCFwb2ludCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwb2ludCBpcyByZXF1aXJlZFwiKTtcbiAgICB9XG4gICAgaWYgKCFwb2x5Z29uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInBvbHlnb24gaXMgcmVxdWlyZWRcIik7XG4gICAgfVxuICAgIHZhciBwdCA9IGdldENvb3JkKHBvaW50KTtcbiAgICB2YXIgZ2VvbSA9IGdldEdlb20ocG9seWdvbik7XG4gICAgdmFyIHR5cGUgPSBnZW9tLnR5cGU7XG4gICAgdmFyIGJib3ggPSBwb2x5Z29uLmJib3g7XG4gICAgdmFyIHBvbHlzID0gZ2VvbS5jb29yZGluYXRlcztcbiAgICAvLyBRdWljayBlbGltaW5hdGlvbiBpZiBwb2ludCBpcyBub3QgaW5zaWRlIGJib3hcbiAgICBpZiAoYmJveCAmJiBpbkJCb3gocHQsIGJib3gpID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIG5vcm1hbGl6ZSB0byBtdWx0aXBvbHlnb25cbiAgICBpZiAodHlwZSA9PT0gXCJQb2x5Z29uXCIpIHtcbiAgICAgICAgcG9seXMgPSBbcG9seXNdO1xuICAgIH1cbiAgICB2YXIgaW5zaWRlUG9seSA9IGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9seXMubGVuZ3RoICYmICFpbnNpZGVQb2x5OyBpKyspIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgaXQgaXMgaW4gdGhlIG91dGVyIHJpbmcgZmlyc3RcbiAgICAgICAgaWYgKGluUmluZyhwdCwgcG9seXNbaV1bMF0sIG9wdGlvbnMuaWdub3JlQm91bmRhcnkpKSB7XG4gICAgICAgICAgICB2YXIgaW5Ib2xlID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgayA9IDE7XG4gICAgICAgICAgICAvLyBjaGVjayBmb3IgdGhlIHBvaW50IGluIGFueSBvZiB0aGUgaG9sZXNcbiAgICAgICAgICAgIHdoaWxlIChrIDwgcG9seXNbaV0ubGVuZ3RoICYmICFpbkhvbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5SaW5nKHB0LCBwb2x5c1tpXVtrXSwgIW9wdGlvbnMuaWdub3JlQm91bmRhcnkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGluSG9sZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGsrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaW5Ib2xlKSB7XG4gICAgICAgICAgICAgICAgaW5zaWRlUG9seSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGluc2lkZVBvbHk7XG59XG4vKipcbiAqIGluUmluZ1xuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IHB0IFt4LHldXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSByaW5nIFtbeCx5XSwgW3gseV0sLi5dXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZUJvdW5kYXJ5IGlnbm9yZUJvdW5kYXJ5XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gaW5SaW5nXG4gKi9cbmZ1bmN0aW9uIGluUmluZyhwdCwgcmluZywgaWdub3JlQm91bmRhcnkpIHtcbiAgICB2YXIgaXNJbnNpZGUgPSBmYWxzZTtcbiAgICBpZiAocmluZ1swXVswXSA9PT0gcmluZ1tyaW5nLmxlbmd0aCAtIDFdWzBdICYmXG4gICAgICAgIHJpbmdbMF1bMV0gPT09IHJpbmdbcmluZy5sZW5ndGggLSAxXVsxXSkge1xuICAgICAgICByaW5nID0gcmluZy5zbGljZSgwLCByaW5nLmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMCwgaiA9IHJpbmcubGVuZ3RoIC0gMTsgaSA8IHJpbmcubGVuZ3RoOyBqID0gaSsrKSB7XG4gICAgICAgIHZhciB4aSA9IHJpbmdbaV1bMF07XG4gICAgICAgIHZhciB5aSA9IHJpbmdbaV1bMV07XG4gICAgICAgIHZhciB4aiA9IHJpbmdbal1bMF07XG4gICAgICAgIHZhciB5aiA9IHJpbmdbal1bMV07XG4gICAgICAgIHZhciBvbkJvdW5kYXJ5ID0gcHRbMV0gKiAoeGkgLSB4aikgKyB5aSAqICh4aiAtIHB0WzBdKSArIHlqICogKHB0WzBdIC0geGkpID09PSAwICYmXG4gICAgICAgICAgICAoeGkgLSBwdFswXSkgKiAoeGogLSBwdFswXSkgPD0gMCAmJlxuICAgICAgICAgICAgKHlpIC0gcHRbMV0pICogKHlqIC0gcHRbMV0pIDw9IDA7XG4gICAgICAgIGlmIChvbkJvdW5kYXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gIWlnbm9yZUJvdW5kYXJ5O1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbnRlcnNlY3QgPSB5aSA+IHB0WzFdICE9PSB5aiA+IHB0WzFdICYmXG4gICAgICAgICAgICBwdFswXSA8ICgoeGogLSB4aSkgKiAocHRbMV0gLSB5aSkpIC8gKHlqIC0geWkpICsgeGk7XG4gICAgICAgIGlmIChpbnRlcnNlY3QpIHtcbiAgICAgICAgICAgIGlzSW5zaWRlID0gIWlzSW5zaWRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc0luc2lkZTtcbn1cbi8qKlxuICogaW5CQm94XG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7UG9zaXRpb259IHB0IHBvaW50IFt4LHldXG4gKiBAcGFyYW0ge0JCb3h9IGJib3ggQkJveCBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXVxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUvZmFsc2UgaWYgcG9pbnQgaXMgaW5zaWRlIEJCb3hcbiAqL1xuZnVuY3Rpb24gaW5CQm94KHB0LCBiYm94KSB7XG4gICAgcmV0dXJuIChiYm94WzBdIDw9IHB0WzBdICYmIGJib3hbMV0gPD0gcHRbMV0gJiYgYmJveFsyXSA+PSBwdFswXSAmJiBiYm94WzNdID49IHB0WzFdKTtcbn1cbiIsIi8qKlxuICogQG1vZHVsZSBoZWxwZXJzXG4gKi9cbi8qKlxuICogRWFydGggUmFkaXVzIHVzZWQgd2l0aCB0aGUgSGFydmVzaW5lIGZvcm11bGEgYW5kIGFwcHJveGltYXRlcyB1c2luZyBhIHNwaGVyaWNhbCAobm9uLWVsbGlwc29pZCkgRWFydGguXG4gKlxuICogQG1lbWJlcm9mIGhlbHBlcnNcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCB2YXIgZWFydGhSYWRpdXMgPSA2MzcxMDA4Ljg7XG4vKipcbiAqIFVuaXQgb2YgbWVhc3VyZW1lbnQgZmFjdG9ycyB1c2luZyBhIHNwaGVyaWNhbCAobm9uLWVsbGlwc29pZCkgZWFydGggcmFkaXVzLlxuICpcbiAqIEBtZW1iZXJvZiBoZWxwZXJzXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgdmFyIGZhY3RvcnMgPSB7XG4gICAgY2VudGltZXRlcnM6IGVhcnRoUmFkaXVzICogMTAwLFxuICAgIGNlbnRpbWV0cmVzOiBlYXJ0aFJhZGl1cyAqIDEwMCxcbiAgICBkZWdyZWVzOiBlYXJ0aFJhZGl1cyAvIDExMTMyNSxcbiAgICBmZWV0OiBlYXJ0aFJhZGl1cyAqIDMuMjgwODQsXG4gICAgaW5jaGVzOiBlYXJ0aFJhZGl1cyAqIDM5LjM3LFxuICAgIGtpbG9tZXRlcnM6IGVhcnRoUmFkaXVzIC8gMTAwMCxcbiAgICBraWxvbWV0cmVzOiBlYXJ0aFJhZGl1cyAvIDEwMDAsXG4gICAgbWV0ZXJzOiBlYXJ0aFJhZGl1cyxcbiAgICBtZXRyZXM6IGVhcnRoUmFkaXVzLFxuICAgIG1pbGVzOiBlYXJ0aFJhZGl1cyAvIDE2MDkuMzQ0LFxuICAgIG1pbGxpbWV0ZXJzOiBlYXJ0aFJhZGl1cyAqIDEwMDAsXG4gICAgbWlsbGltZXRyZXM6IGVhcnRoUmFkaXVzICogMTAwMCxcbiAgICBuYXV0aWNhbG1pbGVzOiBlYXJ0aFJhZGl1cyAvIDE4NTIsXG4gICAgcmFkaWFuczogMSxcbiAgICB5YXJkczogZWFydGhSYWRpdXMgKiAxLjA5MzYsXG59O1xuLyoqXG4gKiBVbml0cyBvZiBtZWFzdXJlbWVudCBmYWN0b3JzIGJhc2VkIG9uIDEgbWV0ZXIuXG4gKlxuICogQG1lbWJlcm9mIGhlbHBlcnNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCB2YXIgdW5pdHNGYWN0b3JzID0ge1xuICAgIGNlbnRpbWV0ZXJzOiAxMDAsXG4gICAgY2VudGltZXRyZXM6IDEwMCxcbiAgICBkZWdyZWVzOiAxIC8gMTExMzI1LFxuICAgIGZlZXQ6IDMuMjgwODQsXG4gICAgaW5jaGVzOiAzOS4zNyxcbiAgICBraWxvbWV0ZXJzOiAxIC8gMTAwMCxcbiAgICBraWxvbWV0cmVzOiAxIC8gMTAwMCxcbiAgICBtZXRlcnM6IDEsXG4gICAgbWV0cmVzOiAxLFxuICAgIG1pbGVzOiAxIC8gMTYwOS4zNDQsXG4gICAgbWlsbGltZXRlcnM6IDEwMDAsXG4gICAgbWlsbGltZXRyZXM6IDEwMDAsXG4gICAgbmF1dGljYWxtaWxlczogMSAvIDE4NTIsXG4gICAgcmFkaWFuczogMSAvIGVhcnRoUmFkaXVzLFxuICAgIHlhcmRzOiAxLjA5MzYxMzMsXG59O1xuLyoqXG4gKiBBcmVhIG9mIG1lYXN1cmVtZW50IGZhY3RvcnMgYmFzZWQgb24gMSBzcXVhcmUgbWV0ZXIuXG4gKlxuICogQG1lbWJlcm9mIGhlbHBlcnNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCB2YXIgYXJlYUZhY3RvcnMgPSB7XG4gICAgYWNyZXM6IDAuMDAwMjQ3MTA1LFxuICAgIGNlbnRpbWV0ZXJzOiAxMDAwMCxcbiAgICBjZW50aW1ldHJlczogMTAwMDAsXG4gICAgZmVldDogMTAuNzYzOTEwNDE3LFxuICAgIGhlY3RhcmVzOiAwLjAwMDEsXG4gICAgaW5jaGVzOiAxNTUwLjAwMzEwMDAwNixcbiAgICBraWxvbWV0ZXJzOiAwLjAwMDAwMSxcbiAgICBraWxvbWV0cmVzOiAwLjAwMDAwMSxcbiAgICBtZXRlcnM6IDEsXG4gICAgbWV0cmVzOiAxLFxuICAgIG1pbGVzOiAzLjg2ZS03LFxuICAgIG1pbGxpbWV0ZXJzOiAxMDAwMDAwLFxuICAgIG1pbGxpbWV0cmVzOiAxMDAwMDAwLFxuICAgIHlhcmRzOiAxLjE5NTk5MDA0Nixcbn07XG4vKipcbiAqIFdyYXBzIGEgR2VvSlNPTiB7QGxpbmsgR2VvbWV0cnl9IGluIGEgR2VvSlNPTiB7QGxpbmsgRmVhdHVyZX0uXG4gKlxuICogQG5hbWUgZmVhdHVyZVxuICogQHBhcmFtIHtHZW9tZXRyeX0gZ2VvbWV0cnkgaW5wdXQgZ2VvbWV0cnlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZX0gYSBHZW9KU09OIEZlYXR1cmVcbiAqIEBleGFtcGxlXG4gKiB2YXIgZ2VvbWV0cnkgPSB7XG4gKiAgIFwidHlwZVwiOiBcIlBvaW50XCIsXG4gKiAgIFwiY29vcmRpbmF0ZXNcIjogWzExMCwgNTBdXG4gKiB9O1xuICpcbiAqIHZhciBmZWF0dXJlID0gdHVyZi5mZWF0dXJlKGdlb21ldHJ5KTtcbiAqXG4gKiAvLz1mZWF0dXJlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBmZWF0ID0geyB0eXBlOiBcIkZlYXR1cmVcIiB9O1xuICAgIGlmIChvcHRpb25zLmlkID09PSAwIHx8IG9wdGlvbnMuaWQpIHtcbiAgICAgICAgZmVhdC5pZCA9IG9wdGlvbnMuaWQ7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmJib3gpIHtcbiAgICAgICAgZmVhdC5iYm94ID0gb3B0aW9ucy5iYm94O1xuICAgIH1cbiAgICBmZWF0LnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IHt9O1xuICAgIGZlYXQuZ2VvbWV0cnkgPSBnZW9tO1xuICAgIHJldHVybiBmZWF0O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgR2VvSlNPTiB7QGxpbmsgR2VvbWV0cnl9IGZyb20gYSBHZW9tZXRyeSBzdHJpbmcgdHlwZSAmIGNvb3JkaW5hdGVzLlxuICogRm9yIEdlb21ldHJ5Q29sbGVjdGlvbiB0eXBlIHVzZSBgaGVscGVycy5nZW9tZXRyeUNvbGxlY3Rpb25gXG4gKlxuICogQG5hbWUgZ2VvbWV0cnlcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIEdlb21ldHJ5IFR5cGVcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gY29vcmRpbmF0ZXMgQ29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHJldHVybnMge0dlb21ldHJ5fSBhIEdlb0pTT04gR2VvbWV0cnlcbiAqIEBleGFtcGxlXG4gKiB2YXIgdHlwZSA9IFwiUG9pbnRcIjtcbiAqIHZhciBjb29yZGluYXRlcyA9IFsxMTAsIDUwXTtcbiAqIHZhciBnZW9tZXRyeSA9IHR1cmYuZ2VvbWV0cnkodHlwZSwgY29vcmRpbmF0ZXMpO1xuICogLy8gPT4gZ2VvbWV0cnlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlb21ldHJ5KHR5cGUsIGNvb3JkaW5hdGVzLCBfb3B0aW9ucykge1xuICAgIGlmIChfb3B0aW9ucyA9PT0gdm9pZCAwKSB7IF9vcHRpb25zID0ge307IH1cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcIlBvaW50XCI6XG4gICAgICAgICAgICByZXR1cm4gcG9pbnQoY29vcmRpbmF0ZXMpLmdlb21ldHJ5O1xuICAgICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgICAgICAgcmV0dXJuIGxpbmVTdHJpbmcoY29vcmRpbmF0ZXMpLmdlb21ldHJ5O1xuICAgICAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgICAgICAgcmV0dXJuIHBvbHlnb24oY29vcmRpbmF0ZXMpLmdlb21ldHJ5O1xuICAgICAgICBjYXNlIFwiTXVsdGlQb2ludFwiOlxuICAgICAgICAgICAgcmV0dXJuIG11bHRpUG9pbnQoY29vcmRpbmF0ZXMpLmdlb21ldHJ5O1xuICAgICAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6XG4gICAgICAgICAgICByZXR1cm4gbXVsdGlMaW5lU3RyaW5nKGNvb3JkaW5hdGVzKS5nZW9tZXRyeTtcbiAgICAgICAgY2FzZSBcIk11bHRpUG9seWdvblwiOlxuICAgICAgICAgICAgcmV0dXJuIG11bHRpUG9seWdvbihjb29yZGluYXRlcykuZ2VvbWV0cnk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodHlwZSArIFwiIGlzIGludmFsaWRcIik7XG4gICAgfVxufVxuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIFBvaW50fSB7QGxpbmsgRmVhdHVyZX0gZnJvbSBhIFBvc2l0aW9uLlxuICpcbiAqIEBuYW1lIHBvaW50XG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGNvb3JkaW5hdGVzIGxvbmdpdHVkZSwgbGF0aXR1ZGUgcG9zaXRpb24gKGVhY2ggaW4gZGVjaW1hbCBkZWdyZWVzKVxuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlPFBvaW50Pn0gYSBQb2ludCBmZWF0dXJlXG4gKiBAZXhhbXBsZVxuICogdmFyIHBvaW50ID0gdHVyZi5wb2ludChbLTc1LjM0MywgMzkuOTg0XSk7XG4gKlxuICogLy89cG9pbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBvaW50KGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICBpZiAoIWNvb3JkaW5hdGVzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkaW5hdGVzIGlzIHJlcXVpcmVkXCIpO1xuICAgIH1cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29vcmRpbmF0ZXMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkaW5hdGVzIG11c3QgYmUgYW4gQXJyYXlcIik7XG4gICAgfVxuICAgIGlmIChjb29yZGluYXRlcy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkaW5hdGVzIG11c3QgYmUgYXQgbGVhc3QgMiBudW1iZXJzIGxvbmdcIik7XG4gICAgfVxuICAgIGlmICghaXNOdW1iZXIoY29vcmRpbmF0ZXNbMF0pIHx8ICFpc051bWJlcihjb29yZGluYXRlc1sxXSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29vcmRpbmF0ZXMgbXVzdCBjb250YWluIG51bWJlcnNcIik7XG4gICAgfVxuICAgIHZhciBnZW9tID0ge1xuICAgICAgICB0eXBlOiBcIlBvaW50XCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIFBvaW50fSB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259IGZyb20gYW4gQXJyYXkgb2YgUG9pbnQgY29vcmRpbmF0ZXMuXG4gKlxuICogQG5hbWUgcG9pbnRzXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBQb2ludHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gVHJhbnNsYXRlIHRoZXNlIHByb3BlcnRpZXMgdG8gZWFjaCBGZWF0dXJlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdXG4gKiBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEByZXR1cm5zIHtGZWF0dXJlQ29sbGVjdGlvbjxQb2ludD59IFBvaW50IEZlYXR1cmVcbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9pbnRzID0gdHVyZi5wb2ludHMoW1xuICogICBbLTc1LCAzOV0sXG4gKiAgIFstODAsIDQ1XSxcbiAqICAgWy03OCwgNTBdXG4gKiBdKTtcbiAqXG4gKiAvLz1wb2ludHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBvaW50cyhjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKGNvb3JkaW5hdGVzLm1hcChmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgICAgIHJldHVybiBwb2ludChjb29yZHMsIHByb3BlcnRpZXMpO1xuICAgIH0pLCBvcHRpb25zKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBQb2x5Z29ufSB7QGxpbmsgRmVhdHVyZX0gZnJvbSBhbiBBcnJheSBvZiBMaW5lYXJSaW5ncy5cbiAqXG4gKiBAbmFtZSBwb2x5Z29uXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PEFycmF5PG51bWJlcj4+Pn0gY29vcmRpbmF0ZXMgYW4gYXJyYXkgb2YgTGluZWFyUmluZ3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxQb2x5Z29uPn0gUG9seWdvbiBGZWF0dXJlXG4gKiBAZXhhbXBsZVxuICogdmFyIHBvbHlnb24gPSB0dXJmLnBvbHlnb24oW1tbLTUsIDUyXSwgWy00LCA1Nl0sIFstMiwgNTFdLCBbLTcsIDU0XSwgWy01LCA1Ml1dXSwgeyBuYW1lOiAncG9seTEnIH0pO1xuICpcbiAqIC8vPXBvbHlnb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBvbHlnb24oY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIGZvciAodmFyIF9pID0gMCwgY29vcmRpbmF0ZXNfMSA9IGNvb3JkaW5hdGVzOyBfaSA8IGNvb3JkaW5hdGVzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciByaW5nID0gY29vcmRpbmF0ZXNfMVtfaV07XG4gICAgICAgIGlmIChyaW5nLmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVhY2ggTGluZWFyUmluZyBvZiBhIFBvbHlnb24gbXVzdCBoYXZlIDQgb3IgbW9yZSBQb3NpdGlvbnMuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmluZ1tyaW5nLmxlbmd0aCAtIDFdLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAvLyBDaGVjayBpZiBmaXJzdCBwb2ludCBvZiBQb2x5Z29uIGNvbnRhaW5zIHR3byBudW1iZXJzXG4gICAgICAgICAgICBpZiAocmluZ1tyaW5nLmxlbmd0aCAtIDFdW2pdICE9PSByaW5nWzBdW2pdKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmlyc3QgYW5kIGxhc3QgUG9zaXRpb24gYXJlIG5vdCBlcXVpdmFsZW50LlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogXCJQb2x5Z29uXCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHJldHVybiBmZWF0dXJlKGdlb20sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIFBvbHlnb259IHtAbGluayBGZWF0dXJlQ29sbGVjdGlvbn0gZnJvbSBhbiBBcnJheSBvZiBQb2x5Z29uIGNvb3JkaW5hdGVzLlxuICpcbiAqIEBuYW1lIHBvbHlnb25zXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PEFycmF5PEFycmF5PG51bWJlcj4+Pj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIFBvbHlnb24gY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlQ29sbGVjdGlvblxuICogQHJldHVybnMge0ZlYXR1cmVDb2xsZWN0aW9uPFBvbHlnb24+fSBQb2x5Z29uIEZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAZXhhbXBsZVxuICogdmFyIHBvbHlnb25zID0gdHVyZi5wb2x5Z29ucyhbXG4gKiAgIFtbWy01LCA1Ml0sIFstNCwgNTZdLCBbLTIsIDUxXSwgWy03LCA1NF0sIFstNSwgNTJdXV0sXG4gKiAgIFtbWy0xNSwgNDJdLCBbLTE0LCA0Nl0sIFstMTIsIDQxXSwgWy0xNywgNDRdLCBbLTE1LCA0Ml1dXSxcbiAqIF0pO1xuICpcbiAqIC8vPXBvbHlnb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwb2x5Z29ucyhjb29yZGluYXRlcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKGNvb3JkaW5hdGVzLm1hcChmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgICAgIHJldHVybiBwb2x5Z29uKGNvb3JkcywgcHJvcGVydGllcyk7XG4gICAgfSksIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEge0BsaW5rIExpbmVTdHJpbmd9IHtAbGluayBGZWF0dXJlfSBmcm9tIGFuIEFycmF5IG9mIFBvc2l0aW9ucy5cbiAqXG4gKiBAbmFtZSBsaW5lU3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBQb3NpdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxMaW5lU3RyaW5nPn0gTGluZVN0cmluZyBGZWF0dXJlXG4gKiBAZXhhbXBsZVxuICogdmFyIGxpbmVzdHJpbmcxID0gdHVyZi5saW5lU3RyaW5nKFtbLTI0LCA2M10sIFstMjMsIDYwXSwgWy0yNSwgNjVdLCBbLTIwLCA2OV1dLCB7bmFtZTogJ2xpbmUgMSd9KTtcbiAqIHZhciBsaW5lc3RyaW5nMiA9IHR1cmYubGluZVN0cmluZyhbWy0xNCwgNDNdLCBbLTEzLCA0MF0sIFstMTUsIDQ1XSwgWy0xMCwgNDldXSwge25hbWU6ICdsaW5lIDInfSk7XG4gKlxuICogLy89bGluZXN0cmluZzFcbiAqIC8vPWxpbmVzdHJpbmcyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaW5lU3RyaW5nKGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICBpZiAoY29vcmRpbmF0ZXMubGVuZ3RoIDwgMikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb29yZGluYXRlcyBtdXN0IGJlIGFuIGFycmF5IG9mIHR3byBvciBtb3JlIHBvc2l0aW9uc1wiKTtcbiAgICB9XG4gICAgdmFyIGdlb20gPSB7XG4gICAgICAgIHR5cGU6IFwiTGluZVN0cmluZ1wiLFxuICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZXMsXG4gICAgfTtcbiAgICByZXR1cm4gZmVhdHVyZShnZW9tLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBMaW5lU3RyaW5nfSB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259IGZyb20gYW4gQXJyYXkgb2YgTGluZVN0cmluZyBjb29yZGluYXRlcy5cbiAqXG4gKiBAbmFtZSBsaW5lU3RyaW5nc1xuICogQHBhcmFtIHtBcnJheTxBcnJheTxBcnJheTxudW1iZXI+Pj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIExpbmVhclJpbmdzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF1cbiAqIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZUNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlQ29sbGVjdGlvblxuICogQHJldHVybnMge0ZlYXR1cmVDb2xsZWN0aW9uPExpbmVTdHJpbmc+fSBMaW5lU3RyaW5nIEZlYXR1cmVDb2xsZWN0aW9uXG4gKiBAZXhhbXBsZVxuICogdmFyIGxpbmVzdHJpbmdzID0gdHVyZi5saW5lU3RyaW5ncyhbXG4gKiAgIFtbLTI0LCA2M10sIFstMjMsIDYwXSwgWy0yNSwgNjVdLCBbLTIwLCA2OV1dLFxuICogICBbWy0xNCwgNDNdLCBbLTEzLCA0MF0sIFstMTUsIDQ1XSwgWy0xMCwgNDldXVxuICogXSk7XG4gKlxuICogLy89bGluZXN0cmluZ3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpbmVTdHJpbmdzKGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24oY29vcmRpbmF0ZXMubWFwKGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICAgICAgcmV0dXJuIGxpbmVTdHJpbmcoY29vcmRzLCBwcm9wZXJ0aWVzKTtcbiAgICB9KSwgb3B0aW9ucyk7XG59XG4vKipcbiAqIFRha2VzIG9uZSBvciBtb3JlIHtAbGluayBGZWF0dXJlfEZlYXR1cmVzfSBhbmQgY3JlYXRlcyBhIHtAbGluayBGZWF0dXJlQ29sbGVjdGlvbn0uXG4gKlxuICogQG5hbWUgZmVhdHVyZUNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7RmVhdHVyZVtdfSBmZWF0dXJlcyBpbnB1dCBmZWF0dXJlc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZUNvbGxlY3Rpb259IEZlYXR1cmVDb2xsZWN0aW9uIG9mIEZlYXR1cmVzXG4gKiBAZXhhbXBsZVxuICogdmFyIGxvY2F0aW9uQSA9IHR1cmYucG9pbnQoWy03NS4zNDMsIDM5Ljk4NF0sIHtuYW1lOiAnTG9jYXRpb24gQSd9KTtcbiAqIHZhciBsb2NhdGlvbkIgPSB0dXJmLnBvaW50KFstNzUuODMzLCAzOS4yODRdLCB7bmFtZTogJ0xvY2F0aW9uIEInfSk7XG4gKiB2YXIgbG9jYXRpb25DID0gdHVyZi5wb2ludChbLTc1LjUzNCwgMzkuMTIzXSwge25hbWU6ICdMb2NhdGlvbiBDJ30pO1xuICpcbiAqIHZhciBjb2xsZWN0aW9uID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgIGxvY2F0aW9uQSxcbiAqICAgbG9jYXRpb25CLFxuICogICBsb2NhdGlvbkNcbiAqIF0pO1xuICpcbiAqIC8vPWNvbGxlY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVDb2xsZWN0aW9uKGZlYXR1cmVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZmMgPSB7IHR5cGU6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIiB9O1xuICAgIGlmIChvcHRpb25zLmlkKSB7XG4gICAgICAgIGZjLmlkID0gb3B0aW9ucy5pZDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuYmJveCkge1xuICAgICAgICBmYy5iYm94ID0gb3B0aW9ucy5iYm94O1xuICAgIH1cbiAgICBmYy5mZWF0dXJlcyA9IGZlYXR1cmVzO1xuICAgIHJldHVybiBmYztcbn1cbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBGZWF0dXJlPE11bHRpTGluZVN0cmluZz59IGJhc2VkIG9uIGFcbiAqIGNvb3JkaW5hdGUgYXJyYXkuIFByb3BlcnRpZXMgY2FuIGJlIGFkZGVkIG9wdGlvbmFsbHkuXG4gKlxuICogQG5hbWUgbXVsdGlMaW5lU3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PEFycmF5PG51bWJlcj4+Pn0gY29vcmRpbmF0ZXMgYW4gYXJyYXkgb2YgTGluZVN0cmluZ3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gYW4gT2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyB0byBhZGQgYXMgcHJvcGVydGllc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtvcHRpb25zLmJib3hdIEJvdW5kaW5nIEJveCBBcnJheSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXSBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW29wdGlvbnMuaWRdIElkZW50aWZpZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcmV0dXJucyB7RmVhdHVyZTxNdWx0aUxpbmVTdHJpbmc+fSBhIE11bHRpTGluZVN0cmluZyBmZWF0dXJlXG4gKiBAdGhyb3dzIHtFcnJvcn0gaWYgbm8gY29vcmRpbmF0ZXMgYXJlIHBhc3NlZFxuICogQGV4YW1wbGVcbiAqIHZhciBtdWx0aUxpbmUgPSB0dXJmLm11bHRpTGluZVN0cmluZyhbW1swLDBdLFsxMCwxMF1dXSk7XG4gKlxuICogLy89bXVsdGlMaW5lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aUxpbmVTdHJpbmcoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBnZW9tID0ge1xuICAgICAgICB0eXBlOiBcIk11bHRpTGluZVN0cmluZ1wiLFxuICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZXMsXG4gICAgfTtcbiAgICByZXR1cm4gZmVhdHVyZShnZW9tLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBGZWF0dXJlPE11bHRpUG9pbnQ+fSBiYXNlZCBvbiBhXG4gKiBjb29yZGluYXRlIGFycmF5LiBQcm9wZXJ0aWVzIGNhbiBiZSBhZGRlZCBvcHRpb25hbGx5LlxuICpcbiAqIEBuYW1lIG11bHRpUG9pbnRcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IGNvb3JkaW5hdGVzIGFuIGFycmF5IG9mIFBvc2l0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlPE11bHRpUG9pbnQ+fSBhIE11bHRpUG9pbnQgZmVhdHVyZVxuICogQHRocm93cyB7RXJyb3J9IGlmIG5vIGNvb3JkaW5hdGVzIGFyZSBwYXNzZWRcbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlQdCA9IHR1cmYubXVsdGlQb2ludChbWzAsMF0sWzEwLDEwXV0pO1xuICpcbiAqIC8vPW11bHRpUHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG11bHRpUG9pbnQoY29vcmRpbmF0ZXMsIHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBnZW9tID0ge1xuICAgICAgICB0eXBlOiBcIk11bHRpUG9pbnRcIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzLFxuICAgIH07XG4gICAgcmV0dXJuIGZlYXR1cmUoZ2VvbSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgRmVhdHVyZTxNdWx0aVBvbHlnb24+fSBiYXNlZCBvbiBhXG4gKiBjb29yZGluYXRlIGFycmF5LiBQcm9wZXJ0aWVzIGNhbiBiZSBhZGRlZCBvcHRpb25hbGx5LlxuICpcbiAqIEBuYW1lIG11bHRpUG9seWdvblxuICogQHBhcmFtIHtBcnJheTxBcnJheTxBcnJheTxBcnJheTxudW1iZXI+Pj4+fSBjb29yZGluYXRlcyBhbiBhcnJheSBvZiBQb2x5Z29uc1xuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzPXt9XSBhbiBPYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIHRvIGFkZCBhcyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuYmJveF0gQm91bmRpbmcgQm94IEFycmF5IFt3ZXN0LCBzb3V0aCwgZWFzdCwgbm9ydGhdIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbb3B0aW9ucy5pZF0gSWRlbnRpZmllciBhc3NvY2lhdGVkIHdpdGggdGhlIEZlYXR1cmVcbiAqIEByZXR1cm5zIHtGZWF0dXJlPE11bHRpUG9seWdvbj59IGEgbXVsdGlwb2x5Z29uIGZlYXR1cmVcbiAqIEB0aHJvd3Mge0Vycm9yfSBpZiBubyBjb29yZGluYXRlcyBhcmUgcGFzc2VkXG4gKiBAZXhhbXBsZVxuICogdmFyIG11bHRpUG9seSA9IHR1cmYubXVsdGlQb2x5Z29uKFtbW1swLDBdLFswLDEwXSxbMTAsMTBdLFsxMCwwXSxbMCwwXV1dXSk7XG4gKlxuICogLy89bXVsdGlQb2x5XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlQb2x5Z29uKGNvb3JkaW5hdGVzLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZ2VvbSA9IHtcbiAgICAgICAgdHlwZTogXCJNdWx0aVBvbHlnb25cIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzLFxuICAgIH07XG4gICAgcmV0dXJuIGZlYXR1cmUoZ2VvbSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSB7QGxpbmsgRmVhdHVyZTxHZW9tZXRyeUNvbGxlY3Rpb24+fSBiYXNlZCBvbiBhXG4gKiBjb29yZGluYXRlIGFycmF5LiBQcm9wZXJ0aWVzIGNhbiBiZSBhZGRlZCBvcHRpb25hbGx5LlxuICpcbiAqIEBuYW1lIGdlb21ldHJ5Q29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheTxHZW9tZXRyeT59IGdlb21ldHJpZXMgYW4gYXJyYXkgb2YgR2VvSlNPTiBHZW9tZXRyaWVzXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIGFuIE9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gYWRkIGFzIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgUGFyYW1ldGVyc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbb3B0aW9ucy5iYm94XSBCb3VuZGluZyBCb3ggQXJyYXkgW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF0gYXNzb2NpYXRlZCB3aXRoIHRoZSBGZWF0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtvcHRpb25zLmlkXSBJZGVudGlmaWVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmU8R2VvbWV0cnlDb2xsZWN0aW9uPn0gYSBHZW9KU09OIEdlb21ldHJ5Q29sbGVjdGlvbiBGZWF0dXJlXG4gKiBAZXhhbXBsZVxuICogdmFyIHB0ID0gdHVyZi5nZW9tZXRyeShcIlBvaW50XCIsIFsxMDAsIDBdKTtcbiAqIHZhciBsaW5lID0gdHVyZi5nZW9tZXRyeShcIkxpbmVTdHJpbmdcIiwgW1sxMDEsIDBdLCBbMTAyLCAxXV0pO1xuICogdmFyIGNvbGxlY3Rpb24gPSB0dXJmLmdlb21ldHJ5Q29sbGVjdGlvbihbcHQsIGxpbmVdKTtcbiAqXG4gKiAvLyA9PiBjb2xsZWN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW9tZXRyeUNvbGxlY3Rpb24oZ2VvbWV0cmllcywgcHJvcGVydGllcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIGdlb20gPSB7XG4gICAgICAgIHR5cGU6IFwiR2VvbWV0cnlDb2xsZWN0aW9uXCIsXG4gICAgICAgIGdlb21ldHJpZXM6IGdlb21ldHJpZXMsXG4gICAgfTtcbiAgICByZXR1cm4gZmVhdHVyZShnZW9tLCBwcm9wZXJ0aWVzLCBvcHRpb25zKTtcbn1cbi8qKlxuICogUm91bmQgbnVtYmVyIHRvIHByZWNpc2lvblxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gTnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gW3ByZWNpc2lvbj0wXSBQcmVjaXNpb25cbiAqIEByZXR1cm5zIHtudW1iZXJ9IHJvdW5kZWQgbnVtYmVyXG4gKiBAZXhhbXBsZVxuICogdHVyZi5yb3VuZCgxMjAuNDMyMSlcbiAqIC8vPTEyMFxuICpcbiAqIHR1cmYucm91bmQoMTIwLjQzMjEsIDIpXG4gKiAvLz0xMjAuNDNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kKG51bSwgcHJlY2lzaW9uKSB7XG4gICAgaWYgKHByZWNpc2lvbiA9PT0gdm9pZCAwKSB7IHByZWNpc2lvbiA9IDA7IH1cbiAgICBpZiAocHJlY2lzaW9uICYmICEocHJlY2lzaW9uID49IDApKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInByZWNpc2lvbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyXCIpO1xuICAgIH1cbiAgICB2YXIgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24gfHwgMCk7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobnVtICogbXVsdGlwbGllcikgLyBtdWx0aXBsaWVyO1xufVxuLyoqXG4gKiBDb252ZXJ0IGEgZGlzdGFuY2UgbWVhc3VyZW1lbnQgKGFzc3VtaW5nIGEgc3BoZXJpY2FsIEVhcnRoKSBmcm9tIHJhZGlhbnMgdG8gYSBtb3JlIGZyaWVuZGx5IHVuaXQuXG4gKiBWYWxpZCB1bml0czogbWlsZXMsIG5hdXRpY2FsbWlsZXMsIGluY2hlcywgeWFyZHMsIG1ldGVycywgbWV0cmVzLCBraWxvbWV0ZXJzLCBjZW50aW1ldGVycywgZmVldFxuICpcbiAqIEBuYW1lIHJhZGlhbnNUb0xlbmd0aFxuICogQHBhcmFtIHtudW1iZXJ9IHJhZGlhbnMgaW4gcmFkaWFucyBhY3Jvc3MgdGhlIHNwaGVyZVxuICogQHBhcmFtIHtzdHJpbmd9IFt1bml0cz1cImtpbG9tZXRlcnNcIl0gY2FuIGJlIGRlZ3JlZXMsIHJhZGlhbnMsIG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRyZXMsXG4gKiBtZXRlcnMsIGtpbG9tZXRyZXMsIGtpbG9tZXRlcnMuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBkaXN0YW5jZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFkaWFuc1RvTGVuZ3RoKHJhZGlhbnMsIHVuaXRzKSB7XG4gICAgaWYgKHVuaXRzID09PSB2b2lkIDApIHsgdW5pdHMgPSBcImtpbG9tZXRlcnNcIjsgfVxuICAgIHZhciBmYWN0b3IgPSBmYWN0b3JzW3VuaXRzXTtcbiAgICBpZiAoIWZhY3Rvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IodW5pdHMgKyBcIiB1bml0cyBpcyBpbnZhbGlkXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcmFkaWFucyAqIGZhY3Rvcjtcbn1cbi8qKlxuICogQ29udmVydCBhIGRpc3RhbmNlIG1lYXN1cmVtZW50IChhc3N1bWluZyBhIHNwaGVyaWNhbCBFYXJ0aCkgZnJvbSBhIHJlYWwtd29ybGQgdW5pdCBpbnRvIHJhZGlhbnNcbiAqIFZhbGlkIHVuaXRzOiBtaWxlcywgbmF1dGljYWxtaWxlcywgaW5jaGVzLCB5YXJkcywgbWV0ZXJzLCBtZXRyZXMsIGtpbG9tZXRlcnMsIGNlbnRpbWV0ZXJzLCBmZWV0XG4gKlxuICogQG5hbWUgbGVuZ3RoVG9SYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gZGlzdGFuY2UgaW4gcmVhbCB1bml0c1xuICogQHBhcmFtIHtzdHJpbmd9IFt1bml0cz1cImtpbG9tZXRlcnNcIl0gY2FuIGJlIGRlZ3JlZXMsIHJhZGlhbnMsIG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRyZXMsXG4gKiBtZXRlcnMsIGtpbG9tZXRyZXMsIGtpbG9tZXRlcnMuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSByYWRpYW5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsZW5ndGhUb1JhZGlhbnMoZGlzdGFuY2UsIHVuaXRzKSB7XG4gICAgaWYgKHVuaXRzID09PSB2b2lkIDApIHsgdW5pdHMgPSBcImtpbG9tZXRlcnNcIjsgfVxuICAgIHZhciBmYWN0b3IgPSBmYWN0b3JzW3VuaXRzXTtcbiAgICBpZiAoIWZhY3Rvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IodW5pdHMgKyBcIiB1bml0cyBpcyBpbnZhbGlkXCIpO1xuICAgIH1cbiAgICByZXR1cm4gZGlzdGFuY2UgLyBmYWN0b3I7XG59XG4vKipcbiAqIENvbnZlcnQgYSBkaXN0YW5jZSBtZWFzdXJlbWVudCAoYXNzdW1pbmcgYSBzcGhlcmljYWwgRWFydGgpIGZyb20gYSByZWFsLXdvcmxkIHVuaXQgaW50byBkZWdyZWVzXG4gKiBWYWxpZCB1bml0czogbWlsZXMsIG5hdXRpY2FsbWlsZXMsIGluY2hlcywgeWFyZHMsIG1ldGVycywgbWV0cmVzLCBjZW50aW1ldGVycywga2lsb21ldHJlcywgZmVldFxuICpcbiAqIEBuYW1lIGxlbmd0aFRvRGVncmVlc1xuICogQHBhcmFtIHtudW1iZXJ9IGRpc3RhbmNlIGluIHJlYWwgdW5pdHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdW5pdHM9XCJraWxvbWV0ZXJzXCJdIGNhbiBiZSBkZWdyZWVzLCByYWRpYW5zLCBtaWxlcywgaW5jaGVzLCB5YXJkcywgbWV0cmVzLFxuICogbWV0ZXJzLCBraWxvbWV0cmVzLCBraWxvbWV0ZXJzLlxuICogQHJldHVybnMge251bWJlcn0gZGVncmVlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGVuZ3RoVG9EZWdyZWVzKGRpc3RhbmNlLCB1bml0cykge1xuICAgIHJldHVybiByYWRpYW5zVG9EZWdyZWVzKGxlbmd0aFRvUmFkaWFucyhkaXN0YW5jZSwgdW5pdHMpKTtcbn1cbi8qKlxuICogQ29udmVydHMgYW55IGJlYXJpbmcgYW5nbGUgZnJvbSB0aGUgbm9ydGggbGluZSBkaXJlY3Rpb24gKHBvc2l0aXZlIGNsb2Nrd2lzZSlcbiAqIGFuZCByZXR1cm5zIGFuIGFuZ2xlIGJldHdlZW4gMC0zNjAgZGVncmVlcyAocG9zaXRpdmUgY2xvY2t3aXNlKSwgMCBiZWluZyB0aGUgbm9ydGggbGluZVxuICpcbiAqIEBuYW1lIGJlYXJpbmdUb0F6aW11dGhcbiAqIEBwYXJhbSB7bnVtYmVyfSBiZWFyaW5nIGFuZ2xlLCBiZXR3ZWVuIC0xODAgYW5kICsxODAgZGVncmVlc1xuICogQHJldHVybnMge251bWJlcn0gYW5nbGUgYmV0d2VlbiAwIGFuZCAzNjAgZGVncmVlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gYmVhcmluZ1RvQXppbXV0aChiZWFyaW5nKSB7XG4gICAgdmFyIGFuZ2xlID0gYmVhcmluZyAlIDM2MDtcbiAgICBpZiAoYW5nbGUgPCAwKSB7XG4gICAgICAgIGFuZ2xlICs9IDM2MDtcbiAgICB9XG4gICAgcmV0dXJuIGFuZ2xlO1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbiBhbmdsZSBpbiByYWRpYW5zIHRvIGRlZ3JlZXNcbiAqXG4gKiBAbmFtZSByYWRpYW5zVG9EZWdyZWVzXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkaWFucyBhbmdsZSBpbiByYWRpYW5zXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBkZWdyZWVzIGJldHdlZW4gMCBhbmQgMzYwIGRlZ3JlZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhZGlhbnNUb0RlZ3JlZXMocmFkaWFucykge1xuICAgIHZhciBkZWdyZWVzID0gcmFkaWFucyAlICgyICogTWF0aC5QSSk7XG4gICAgcmV0dXJuIChkZWdyZWVzICogMTgwKSAvIE1hdGguUEk7XG59XG4vKipcbiAqIENvbnZlcnRzIGFuIGFuZ2xlIGluIGRlZ3JlZXMgdG8gcmFkaWFuc1xuICpcbiAqIEBuYW1lIGRlZ3JlZXNUb1JhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWdyZWVzIGFuZ2xlIGJldHdlZW4gMCBhbmQgMzYwIGRlZ3JlZXNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IGFuZ2xlIGluIHJhZGlhbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZ3JlZXNUb1JhZGlhbnMoZGVncmVlcykge1xuICAgIHZhciByYWRpYW5zID0gZGVncmVlcyAlIDM2MDtcbiAgICByZXR1cm4gKHJhZGlhbnMgKiBNYXRoLlBJKSAvIDE4MDtcbn1cbi8qKlxuICogQ29udmVydHMgYSBsZW5ndGggdG8gdGhlIHJlcXVlc3RlZCB1bml0LlxuICogVmFsaWQgdW5pdHM6IG1pbGVzLCBuYXV0aWNhbG1pbGVzLCBpbmNoZXMsIHlhcmRzLCBtZXRlcnMsIG1ldHJlcywga2lsb21ldGVycywgY2VudGltZXRlcnMsIGZlZXRcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIHRvIGJlIGNvbnZlcnRlZFxuICogQHBhcmFtIHtVbml0c30gW29yaWdpbmFsVW5pdD1cImtpbG9tZXRlcnNcIl0gb2YgdGhlIGxlbmd0aFxuICogQHBhcmFtIHtVbml0c30gW2ZpbmFsVW5pdD1cImtpbG9tZXRlcnNcIl0gcmV0dXJuZWQgdW5pdFxuICogQHJldHVybnMge251bWJlcn0gdGhlIGNvbnZlcnRlZCBsZW5ndGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRMZW5ndGgobGVuZ3RoLCBvcmlnaW5hbFVuaXQsIGZpbmFsVW5pdCkge1xuICAgIGlmIChvcmlnaW5hbFVuaXQgPT09IHZvaWQgMCkgeyBvcmlnaW5hbFVuaXQgPSBcImtpbG9tZXRlcnNcIjsgfVxuICAgIGlmIChmaW5hbFVuaXQgPT09IHZvaWQgMCkgeyBmaW5hbFVuaXQgPSBcImtpbG9tZXRlcnNcIjsgfVxuICAgIGlmICghKGxlbmd0aCA+PSAwKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJsZW5ndGggbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlclwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJhZGlhbnNUb0xlbmd0aChsZW5ndGhUb1JhZGlhbnMobGVuZ3RoLCBvcmlnaW5hbFVuaXQpLCBmaW5hbFVuaXQpO1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhIGFyZWEgdG8gdGhlIHJlcXVlc3RlZCB1bml0LlxuICogVmFsaWQgdW5pdHM6IGtpbG9tZXRlcnMsIGtpbG9tZXRyZXMsIG1ldGVycywgbWV0cmVzLCBjZW50aW1ldHJlcywgbWlsbGltZXRlcnMsIGFjcmVzLCBtaWxlcywgeWFyZHMsIGZlZXQsIGluY2hlcywgaGVjdGFyZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSBhcmVhIHRvIGJlIGNvbnZlcnRlZFxuICogQHBhcmFtIHtVbml0c30gW29yaWdpbmFsVW5pdD1cIm1ldGVyc1wiXSBvZiB0aGUgZGlzdGFuY2VcbiAqIEBwYXJhbSB7VW5pdHN9IFtmaW5hbFVuaXQ9XCJraWxvbWV0ZXJzXCJdIHJldHVybmVkIHVuaXRcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBjb252ZXJ0ZWQgYXJlYVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29udmVydEFyZWEoYXJlYSwgb3JpZ2luYWxVbml0LCBmaW5hbFVuaXQpIHtcbiAgICBpZiAob3JpZ2luYWxVbml0ID09PSB2b2lkIDApIHsgb3JpZ2luYWxVbml0ID0gXCJtZXRlcnNcIjsgfVxuICAgIGlmIChmaW5hbFVuaXQgPT09IHZvaWQgMCkgeyBmaW5hbFVuaXQgPSBcImtpbG9tZXRlcnNcIjsgfVxuICAgIGlmICghKGFyZWEgPj0gMCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXJlYSBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyXCIpO1xuICAgIH1cbiAgICB2YXIgc3RhcnRGYWN0b3IgPSBhcmVhRmFjdG9yc1tvcmlnaW5hbFVuaXRdO1xuICAgIGlmICghc3RhcnRGYWN0b3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBvcmlnaW5hbCB1bml0c1wiKTtcbiAgICB9XG4gICAgdmFyIGZpbmFsRmFjdG9yID0gYXJlYUZhY3RvcnNbZmluYWxVbml0XTtcbiAgICBpZiAoIWZpbmFsRmFjdG9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgZmluYWwgdW5pdHNcIik7XG4gICAgfVxuICAgIHJldHVybiAoYXJlYSAvIHN0YXJ0RmFjdG9yKSAqIGZpbmFsRmFjdG9yO1xufVxuLyoqXG4gKiBpc051bWJlclxuICpcbiAqIEBwYXJhbSB7Kn0gbnVtIE51bWJlciB0byB2YWxpZGF0ZVxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUvZmFsc2VcbiAqIEBleGFtcGxlXG4gKiB0dXJmLmlzTnVtYmVyKDEyMylcbiAqIC8vPXRydWVcbiAqIHR1cmYuaXNOdW1iZXIoJ2ZvbycpXG4gKiAvLz1mYWxzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIobnVtKSB7XG4gICAgcmV0dXJuICFpc05hTihudW0pICYmIG51bSAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheShudW0pO1xufVxuLyoqXG4gKiBpc09iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gaW5wdXQgdmFyaWFibGUgdG8gdmFsaWRhdGVcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlL2ZhbHNlXG4gKiBAZXhhbXBsZVxuICogdHVyZi5pc09iamVjdCh7ZWxldmF0aW9uOiAxMH0pXG4gKiAvLz10cnVlXG4gKiB0dXJmLmlzT2JqZWN0KCdmb28nKVxuICogLy89ZmFsc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KGlucHV0KSB7XG4gICAgcmV0dXJuICEhaW5wdXQgJiYgaW5wdXQuY29uc3RydWN0b3IgPT09IE9iamVjdDtcbn1cbi8qKlxuICogVmFsaWRhdGUgQkJveFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGJib3ggQkJveCB0byB2YWxpZGF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAdGhyb3dzIEVycm9yIGlmIEJCb3ggaXMgbm90IHZhbGlkXG4gKiBAZXhhbXBsZVxuICogdmFsaWRhdGVCQm94KFstMTgwLCAtNDAsIDExMCwgNTBdKVxuICogLy89T0tcbiAqIHZhbGlkYXRlQkJveChbLTE4MCwgLTQwXSlcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUJCb3goJ0ZvbycpXG4gKiAvLz1FcnJvclxuICogdmFsaWRhdGVCQm94KDUpXG4gKiAvLz1FcnJvclxuICogdmFsaWRhdGVCQm94KG51bGwpXG4gKiAvLz1FcnJvclxuICogdmFsaWRhdGVCQm94KHVuZGVmaW5lZClcbiAqIC8vPUVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUJCb3goYmJveCkge1xuICAgIGlmICghYmJveCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJiYm94IGlzIHJlcXVpcmVkXCIpO1xuICAgIH1cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmJveCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYmJveCBtdXN0IGJlIGFuIEFycmF5XCIpO1xuICAgIH1cbiAgICBpZiAoYmJveC5sZW5ndGggIT09IDQgJiYgYmJveC5sZW5ndGggIT09IDYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYmJveCBtdXN0IGJlIGFuIEFycmF5IG9mIDQgb3IgNiBudW1iZXJzXCIpO1xuICAgIH1cbiAgICBiYm94LmZvckVhY2goZnVuY3Rpb24gKG51bSkge1xuICAgICAgICBpZiAoIWlzTnVtYmVyKG51bSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImJib3ggbXVzdCBvbmx5IGNvbnRhaW4gbnVtYmVyc1wiKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLyoqXG4gKiBWYWxpZGF0ZSBJZFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IGlkIElkIHRvIHZhbGlkYXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEB0aHJvd3MgRXJyb3IgaWYgSWQgaXMgbm90IHZhbGlkXG4gKiBAZXhhbXBsZVxuICogdmFsaWRhdGVJZChbLTE4MCwgLTQwLCAxMTAsIDUwXSlcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUlkKFstMTgwLCAtNDBdKVxuICogLy89RXJyb3JcbiAqIHZhbGlkYXRlSWQoJ0ZvbycpXG4gKiAvLz1PS1xuICogdmFsaWRhdGVJZCg1KVxuICogLy89T0tcbiAqIHZhbGlkYXRlSWQobnVsbClcbiAqIC8vPUVycm9yXG4gKiB2YWxpZGF0ZUlkKHVuZGVmaW5lZClcbiAqIC8vPUVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUlkKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpZCBpcyByZXF1aXJlZFwiKTtcbiAgICB9XG4gICAgaWYgKFtcInN0cmluZ1wiLCBcIm51bWJlclwiXS5pbmRleE9mKHR5cGVvZiBpZCkgPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImlkIG11c3QgYmUgYSBudW1iZXIgb3IgYSBzdHJpbmdcIik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgaXNOdW1iZXIsIH0gZnJvbSBcIkB0dXJmL2hlbHBlcnNcIjtcbi8qKlxuICogVW53cmFwIGEgY29vcmRpbmF0ZSBmcm9tIGEgUG9pbnQgRmVhdHVyZSwgR2VvbWV0cnkgb3IgYSBzaW5nbGUgY29vcmRpbmF0ZS5cbiAqXG4gKiBAbmFtZSBnZXRDb29yZFxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fEdlb21ldHJ5PFBvaW50PnxGZWF0dXJlPFBvaW50Pn0gY29vcmQgR2VvSlNPTiBQb2ludCBvciBhbiBBcnJheSBvZiBudW1iZXJzXG4gKiBAcmV0dXJucyB7QXJyYXk8bnVtYmVyPn0gY29vcmRpbmF0ZXNcbiAqIEBleGFtcGxlXG4gKiB2YXIgcHQgPSB0dXJmLnBvaW50KFsxMCwgMTBdKTtcbiAqXG4gKiB2YXIgY29vcmQgPSB0dXJmLmdldENvb3JkKHB0KTtcbiAqIC8vPSBbMTAsIDEwXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29vcmQoY29vcmQpIHtcbiAgICBpZiAoIWNvb3JkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkIGlzIHJlcXVpcmVkXCIpO1xuICAgIH1cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29vcmQpKSB7XG4gICAgICAgIGlmIChjb29yZC50eXBlID09PSBcIkZlYXR1cmVcIiAmJlxuICAgICAgICAgICAgY29vcmQuZ2VvbWV0cnkgIT09IG51bGwgJiZcbiAgICAgICAgICAgIGNvb3JkLmdlb21ldHJ5LnR5cGUgPT09IFwiUG9pbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGNvb3JkLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb29yZC50eXBlID09PSBcIlBvaW50XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBjb29yZC5jb29yZGluYXRlcztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb29yZCkgJiZcbiAgICAgICAgY29vcmQubGVuZ3RoID49IDIgJiZcbiAgICAgICAgIUFycmF5LmlzQXJyYXkoY29vcmRbMF0pICYmXG4gICAgICAgICFBcnJheS5pc0FycmF5KGNvb3JkWzFdKSkge1xuICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihcImNvb3JkIG11c3QgYmUgR2VvSlNPTiBQb2ludCBvciBhbiBBcnJheSBvZiBudW1iZXJzXCIpO1xufVxuLyoqXG4gKiBVbndyYXAgY29vcmRpbmF0ZXMgZnJvbSBhIEZlYXR1cmUsIEdlb21ldHJ5IE9iamVjdCBvciBhbiBBcnJheVxuICpcbiAqIEBuYW1lIGdldENvb3Jkc1xuICogQHBhcmFtIHtBcnJheTxhbnk+fEdlb21ldHJ5fEZlYXR1cmV9IGNvb3JkcyBGZWF0dXJlLCBHZW9tZXRyeSBPYmplY3Qgb3IgYW4gQXJyYXlcbiAqIEByZXR1cm5zIHtBcnJheTxhbnk+fSBjb29yZGluYXRlc1xuICogQGV4YW1wbGVcbiAqIHZhciBwb2x5ID0gdHVyZi5wb2x5Z29uKFtbWzExOS4zMiwgLTguN10sIFsxMTkuNTUsIC04LjY5XSwgWzExOS41MSwgLTguNTRdLCBbMTE5LjMyLCAtOC43XV1dKTtcbiAqXG4gKiB2YXIgY29vcmRzID0gdHVyZi5nZXRDb29yZHMocG9seSk7XG4gKiAvLz0gW1tbMTE5LjMyLCAtOC43XSwgWzExOS41NSwgLTguNjldLCBbMTE5LjUxLCAtOC41NF0sIFsxMTkuMzIsIC04LjddXV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvb3Jkcyhjb29yZHMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb29yZHMpKSB7XG4gICAgICAgIHJldHVybiBjb29yZHM7XG4gICAgfVxuICAgIC8vIEZlYXR1cmVcbiAgICBpZiAoY29vcmRzLnR5cGUgPT09IFwiRmVhdHVyZVwiKSB7XG4gICAgICAgIGlmIChjb29yZHMuZ2VvbWV0cnkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBjb29yZHMuZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIEdlb21ldHJ5XG4gICAgICAgIGlmIChjb29yZHMuY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBjb29yZHMuY29vcmRpbmF0ZXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiY29vcmRzIG11c3QgYmUgR2VvSlNPTiBGZWF0dXJlLCBHZW9tZXRyeSBPYmplY3Qgb3IgYW4gQXJyYXlcIik7XG59XG4vKipcbiAqIENoZWNrcyBpZiBjb29yZGluYXRlcyBjb250YWlucyBhIG51bWJlclxuICpcbiAqIEBuYW1lIGNvbnRhaW5zTnVtYmVyXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGNvb3JkaW5hdGVzIEdlb0pTT04gQ29vcmRpbmF0ZXNcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIEFycmF5IGNvbnRhaW5zIGEgbnVtYmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluc051bWJlcihjb29yZGluYXRlcykge1xuICAgIGlmIChjb29yZGluYXRlcy5sZW5ndGggPiAxICYmXG4gICAgICAgIGlzTnVtYmVyKGNvb3JkaW5hdGVzWzBdKSAmJlxuICAgICAgICBpc051bWJlcihjb29yZGluYXRlc1sxXSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvb3JkaW5hdGVzWzBdKSAmJiBjb29yZGluYXRlc1swXS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5zTnVtYmVyKGNvb3JkaW5hdGVzWzBdKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiY29vcmRpbmF0ZXMgbXVzdCBvbmx5IGNvbnRhaW4gbnVtYmVyc1wiKTtcbn1cbi8qKlxuICogRW5mb3JjZSBleHBlY3RhdGlvbnMgYWJvdXQgdHlwZXMgb2YgR2VvSlNPTiBvYmplY3RzIGZvciBUdXJmLlxuICpcbiAqIEBuYW1lIGdlb2pzb25UeXBlXG4gKiBAcGFyYW0ge0dlb0pTT059IHZhbHVlIGFueSBHZW9KU09OIG9iamVjdFxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgZXhwZWN0ZWQgR2VvSlNPTiB0eXBlXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBuYW1lIG9mIGNhbGxpbmcgZnVuY3Rpb25cbiAqIEB0aHJvd3Mge0Vycm9yfSBpZiB2YWx1ZSBpcyBub3QgdGhlIGV4cGVjdGVkIHR5cGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW9qc29uVHlwZSh2YWx1ZSwgdHlwZSwgbmFtZSkge1xuICAgIGlmICghdHlwZSB8fCAhbmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0eXBlIGFuZCBuYW1lIHJlcXVpcmVkXCIpO1xuICAgIH1cbiAgICBpZiAoIXZhbHVlIHx8IHZhbHVlLnR5cGUgIT09IHR5cGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBpbnB1dCB0byBcIiArXG4gICAgICAgICAgICBuYW1lICtcbiAgICAgICAgICAgIFwiOiBtdXN0IGJlIGEgXCIgK1xuICAgICAgICAgICAgdHlwZSArXG4gICAgICAgICAgICBcIiwgZ2l2ZW4gXCIgK1xuICAgICAgICAgICAgdmFsdWUudHlwZSk7XG4gICAgfVxufVxuLyoqXG4gKiBFbmZvcmNlIGV4cGVjdGF0aW9ucyBhYm91dCB0eXBlcyBvZiB7QGxpbmsgRmVhdHVyZX0gaW5wdXRzIGZvciBUdXJmLlxuICogSW50ZXJuYWxseSB0aGlzIHVzZXMge0BsaW5rIGdlb2pzb25UeXBlfSB0byBqdWRnZSBnZW9tZXRyeSB0eXBlcy5cbiAqXG4gKiBAbmFtZSBmZWF0dXJlT2ZcbiAqIEBwYXJhbSB7RmVhdHVyZX0gZmVhdHVyZSBhIGZlYXR1cmUgd2l0aCBhbiBleHBlY3RlZCBnZW9tZXRyeSB0eXBlXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBleHBlY3RlZCBHZW9KU09OIHR5cGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIG5hbWUgb2YgY2FsbGluZyBmdW5jdGlvblxuICogQHRocm93cyB7RXJyb3J9IGVycm9yIGlmIHZhbHVlIGlzIG5vdCB0aGUgZXhwZWN0ZWQgdHlwZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVPZihmZWF0dXJlLCB0eXBlLCBuYW1lKSB7XG4gICAgaWYgKCFmZWF0dXJlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGZlYXR1cmUgcGFzc2VkXCIpO1xuICAgIH1cbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiLmZlYXR1cmVPZigpIHJlcXVpcmVzIGEgbmFtZVwiKTtcbiAgICB9XG4gICAgaWYgKCFmZWF0dXJlIHx8IGZlYXR1cmUudHlwZSAhPT0gXCJGZWF0dXJlXCIgfHwgIWZlYXR1cmUuZ2VvbWV0cnkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBpbnB1dCB0byBcIiArIG5hbWUgKyBcIiwgRmVhdHVyZSB3aXRoIGdlb21ldHJ5IHJlcXVpcmVkXCIpO1xuICAgIH1cbiAgICBpZiAoIWZlYXR1cmUuZ2VvbWV0cnkgfHwgZmVhdHVyZS5nZW9tZXRyeS50eXBlICE9PSB0eXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW5wdXQgdG8gXCIgK1xuICAgICAgICAgICAgbmFtZSArXG4gICAgICAgICAgICBcIjogbXVzdCBiZSBhIFwiICtcbiAgICAgICAgICAgIHR5cGUgK1xuICAgICAgICAgICAgXCIsIGdpdmVuIFwiICtcbiAgICAgICAgICAgIGZlYXR1cmUuZ2VvbWV0cnkudHlwZSk7XG4gICAgfVxufVxuLyoqXG4gKiBFbmZvcmNlIGV4cGVjdGF0aW9ucyBhYm91dCB0eXBlcyBvZiB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259IGlucHV0cyBmb3IgVHVyZi5cbiAqIEludGVybmFsbHkgdGhpcyB1c2VzIHtAbGluayBnZW9qc29uVHlwZX0gdG8ganVkZ2UgZ2VvbWV0cnkgdHlwZXMuXG4gKlxuICogQG5hbWUgY29sbGVjdGlvbk9mXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufSBmZWF0dXJlQ29sbGVjdGlvbiBhIEZlYXR1cmVDb2xsZWN0aW9uIGZvciB3aGljaCBmZWF0dXJlcyB3aWxsIGJlIGp1ZGdlZFxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgZXhwZWN0ZWQgR2VvSlNPTiB0eXBlXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBuYW1lIG9mIGNhbGxpbmcgZnVuY3Rpb25cbiAqIEB0aHJvd3Mge0Vycm9yfSBpZiB2YWx1ZSBpcyBub3QgdGhlIGV4cGVjdGVkIHR5cGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb2xsZWN0aW9uT2YoZmVhdHVyZUNvbGxlY3Rpb24sIHR5cGUsIG5hbWUpIHtcbiAgICBpZiAoIWZlYXR1cmVDb2xsZWN0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGZlYXR1cmVDb2xsZWN0aW9uIHBhc3NlZFwiKTtcbiAgICB9XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIi5jb2xsZWN0aW9uT2YoKSByZXF1aXJlcyBhIG5hbWVcIik7XG4gICAgfVxuICAgIGlmICghZmVhdHVyZUNvbGxlY3Rpb24gfHwgZmVhdHVyZUNvbGxlY3Rpb24udHlwZSAhPT0gXCJGZWF0dXJlQ29sbGVjdGlvblwiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW5wdXQgdG8gXCIgKyBuYW1lICsgXCIsIEZlYXR1cmVDb2xsZWN0aW9uIHJlcXVpcmVkXCIpO1xuICAgIH1cbiAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBmZWF0dXJlID0gX2FbX2ldO1xuICAgICAgICBpZiAoIWZlYXR1cmUgfHwgZmVhdHVyZS50eXBlICE9PSBcIkZlYXR1cmVcIiB8fCAhZmVhdHVyZS5nZW9tZXRyeSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBpbnB1dCB0byBcIiArIG5hbWUgKyBcIiwgRmVhdHVyZSB3aXRoIGdlb21ldHJ5IHJlcXVpcmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZmVhdHVyZS5nZW9tZXRyeSB8fCBmZWF0dXJlLmdlb21ldHJ5LnR5cGUgIT09IHR5cGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW5wdXQgdG8gXCIgK1xuICAgICAgICAgICAgICAgIG5hbWUgK1xuICAgICAgICAgICAgICAgIFwiOiBtdXN0IGJlIGEgXCIgK1xuICAgICAgICAgICAgICAgIHR5cGUgK1xuICAgICAgICAgICAgICAgIFwiLCBnaXZlbiBcIiArXG4gICAgICAgICAgICAgICAgZmVhdHVyZS5nZW9tZXRyeS50eXBlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogR2V0IEdlb21ldHJ5IGZyb20gRmVhdHVyZSBvciBHZW9tZXRyeSBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge0ZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gR2VvSlNPTiBGZWF0dXJlIG9yIEdlb21ldHJ5IE9iamVjdFxuICogQHJldHVybnMge0dlb21ldHJ5fG51bGx9IEdlb0pTT04gR2VvbWV0cnkgT2JqZWN0XG4gKiBAdGhyb3dzIHtFcnJvcn0gaWYgZ2VvanNvbiBpcyBub3QgYSBGZWF0dXJlIG9yIEdlb21ldHJ5IE9iamVjdFxuICogQGV4YW1wbGVcbiAqIHZhciBwb2ludCA9IHtcbiAqICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxuICogICBcInByb3BlcnRpZXNcIjoge30sXG4gKiAgIFwiZ2VvbWV0cnlcIjoge1xuICogICAgIFwidHlwZVwiOiBcIlBvaW50XCIsXG4gKiAgICAgXCJjb29yZGluYXRlc1wiOiBbMTEwLCA0MF1cbiAqICAgfVxuICogfVxuICogdmFyIGdlb20gPSB0dXJmLmdldEdlb20ocG9pbnQpXG4gKiAvLz17XCJ0eXBlXCI6IFwiUG9pbnRcIiwgXCJjb29yZGluYXRlc1wiOiBbMTEwLCA0MF19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRHZW9tKGdlb2pzb24pIHtcbiAgICBpZiAoZ2VvanNvbi50eXBlID09PSBcIkZlYXR1cmVcIikge1xuICAgICAgICByZXR1cm4gZ2VvanNvbi5nZW9tZXRyeTtcbiAgICB9XG4gICAgcmV0dXJuIGdlb2pzb247XG59XG4vKipcbiAqIEdldCBHZW9KU09OIG9iamVjdCdzIHR5cGUsIEdlb21ldHJ5IHR5cGUgaXMgcHJpb3JpdGl6ZS5cbiAqXG4gKiBAcGFyYW0ge0dlb0pTT059IGdlb2pzb24gR2VvSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZT1cImdlb2pzb25cIl0gbmFtZSBvZiB0aGUgdmFyaWFibGUgdG8gZGlzcGxheSBpbiBlcnJvciBtZXNzYWdlICh1bnVzZWQpXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBHZW9KU09OIHR5cGVcbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9pbnQgPSB7XG4gKiAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAqICAgXCJwcm9wZXJ0aWVzXCI6IHt9LFxuICogICBcImdlb21ldHJ5XCI6IHtcbiAqICAgICBcInR5cGVcIjogXCJQb2ludFwiLFxuICogICAgIFwiY29vcmRpbmF0ZXNcIjogWzExMCwgNDBdXG4gKiAgIH1cbiAqIH1cbiAqIHZhciBnZW9tID0gdHVyZi5nZXRUeXBlKHBvaW50KVxuICogLy89XCJQb2ludFwiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlKGdlb2pzb24sIF9uYW1lKSB7XG4gICAgaWYgKGdlb2pzb24udHlwZSA9PT0gXCJGZWF0dXJlQ29sbGVjdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBcIkZlYXR1cmVDb2xsZWN0aW9uXCI7XG4gICAgfVxuICAgIGlmIChnZW9qc29uLnR5cGUgPT09IFwiR2VvbWV0cnlDb2xsZWN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIFwiR2VvbWV0cnlDb2xsZWN0aW9uXCI7XG4gICAgfVxuICAgIGlmIChnZW9qc29uLnR5cGUgPT09IFwiRmVhdHVyZVwiICYmIGdlb2pzb24uZ2VvbWV0cnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGdlb2pzb24uZ2VvbWV0cnkudHlwZTtcbiAgICB9XG4gICAgcmV0dXJuIGdlb2pzb24udHlwZTtcbn1cbiIsImltcG9ydCB7IGZlYXR1cmUsIGZlYXR1cmVDb2xsZWN0aW9uLCBwb2ludCwgfSBmcm9tIFwiQHR1cmYvaGVscGVyc1wiO1xuaW1wb3J0IHsgZ2V0Q29vcmRzIH0gZnJvbSBcIkB0dXJmL2ludmFyaWFudFwiO1xuaW1wb3J0IGxpbmVTZWdtZW50IGZyb20gXCJAdHVyZi9saW5lLXNlZ21lbnRcIjtcbmltcG9ydCB7IGZlYXR1cmVFYWNoIH0gZnJvbSBcIkB0dXJmL21ldGFcIjtcbmltcG9ydCByYnVzaCBmcm9tIFwiZ2VvanNvbi1yYnVzaFwiO1xuLyoqXG4gKiBUYWtlcyBhbnkgTGluZVN0cmluZyBvciBQb2x5Z29uIEdlb0pTT04gYW5kIHJldHVybnMgdGhlIGludGVyc2VjdGluZyBwb2ludChzKS5cbiAqXG4gKiBAbmFtZSBsaW5lSW50ZXJzZWN0XG4gKiBAcGFyYW0ge0dlb0pTT059IGxpbmUxIGFueSBMaW5lU3RyaW5nIG9yIFBvbHlnb25cbiAqIEBwYXJhbSB7R2VvSlNPTn0gbGluZTIgYW55IExpbmVTdHJpbmcgb3IgUG9seWdvblxuICogQHJldHVybnMge0ZlYXR1cmVDb2xsZWN0aW9uPFBvaW50Pn0gcG9pbnQocykgdGhhdCBpbnRlcnNlY3QgYm90aFxuICogQGV4YW1wbGVcbiAqIHZhciBsaW5lMSA9IHR1cmYubGluZVN0cmluZyhbWzEyNiwgLTExXSwgWzEyOSwgLTIxXV0pO1xuICogdmFyIGxpbmUyID0gdHVyZi5saW5lU3RyaW5nKFtbMTIzLCAtMThdLCBbMTMxLCAtMTRdXSk7XG4gKiB2YXIgaW50ZXJzZWN0cyA9IHR1cmYubGluZUludGVyc2VjdChsaW5lMSwgbGluZTIpO1xuICpcbiAqIC8vYWRkVG9NYXBcbiAqIHZhciBhZGRUb01hcCA9IFtsaW5lMSwgbGluZTIsIGludGVyc2VjdHNdXG4gKi9cbmZ1bmN0aW9uIGxpbmVJbnRlcnNlY3QobGluZTEsIGxpbmUyKSB7XG4gICAgdmFyIHVuaXF1ZSA9IHt9O1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgLy8gRmlyc3QsIG5vcm1hbGl6ZSBnZW9tZXRyaWVzIHRvIGZlYXR1cmVzXG4gICAgLy8gVGhlbiwgaGFuZGxlIHNpbXBsZSAyLXZlcnRleCBzZWdtZW50c1xuICAgIGlmIChsaW5lMS50eXBlID09PSBcIkxpbmVTdHJpbmdcIikge1xuICAgICAgICBsaW5lMSA9IGZlYXR1cmUobGluZTEpO1xuICAgIH1cbiAgICBpZiAobGluZTIudHlwZSA9PT0gXCJMaW5lU3RyaW5nXCIpIHtcbiAgICAgICAgbGluZTIgPSBmZWF0dXJlKGxpbmUyKTtcbiAgICB9XG4gICAgaWYgKGxpbmUxLnR5cGUgPT09IFwiRmVhdHVyZVwiICYmXG4gICAgICAgIGxpbmUyLnR5cGUgPT09IFwiRmVhdHVyZVwiICYmXG4gICAgICAgIGxpbmUxLmdlb21ldHJ5ICE9PSBudWxsICYmXG4gICAgICAgIGxpbmUyLmdlb21ldHJ5ICE9PSBudWxsICYmXG4gICAgICAgIGxpbmUxLmdlb21ldHJ5LnR5cGUgPT09IFwiTGluZVN0cmluZ1wiICYmXG4gICAgICAgIGxpbmUyLmdlb21ldHJ5LnR5cGUgPT09IFwiTGluZVN0cmluZ1wiICYmXG4gICAgICAgIGxpbmUxLmdlb21ldHJ5LmNvb3JkaW5hdGVzLmxlbmd0aCA9PT0gMiAmJlxuICAgICAgICBsaW5lMi5nZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgdmFyIGludGVyc2VjdCA9IGludGVyc2VjdHMobGluZTEsIGxpbmUyKTtcbiAgICAgICAgaWYgKGludGVyc2VjdCkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGludGVyc2VjdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uKHJlc3VsdHMpO1xuICAgIH1cbiAgICAvLyBIYW5kbGVzIGNvbXBsZXggR2VvSlNPTiBHZW9tZXRyaWVzXG4gICAgdmFyIHRyZWUgPSByYnVzaCgpO1xuICAgIHRyZWUubG9hZChsaW5lU2VnbWVudChsaW5lMikpO1xuICAgIGZlYXR1cmVFYWNoKGxpbmVTZWdtZW50KGxpbmUxKSwgZnVuY3Rpb24gKHNlZ21lbnQpIHtcbiAgICAgICAgZmVhdHVyZUVhY2godHJlZS5zZWFyY2goc2VnbWVudCksIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGludGVyc2VjdCA9IGludGVyc2VjdHMoc2VnbWVudCwgbWF0Y2gpO1xuICAgICAgICAgICAgaWYgKGludGVyc2VjdCkge1xuICAgICAgICAgICAgICAgIC8vIHByZXZlbnQgZHVwbGljYXRlIHBvaW50cyBodHRwczovL2dpdGh1Yi5jb20vVHVyZmpzL3R1cmYvaXNzdWVzLzY4OFxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBnZXRDb29yZHMoaW50ZXJzZWN0KS5qb2luKFwiLFwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIXVuaXF1ZVtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuaXF1ZVtrZXldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGludGVyc2VjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24ocmVzdWx0cyk7XG59XG4vKipcbiAqIEZpbmQgYSBwb2ludCB0aGF0IGludGVyc2VjdHMgTGluZVN0cmluZ3Mgd2l0aCB0d28gY29vcmRpbmF0ZXMgZWFjaFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0ZlYXR1cmU8TGluZVN0cmluZz59IGxpbmUxIEdlb0pTT04gTGluZVN0cmluZyAoTXVzdCBvbmx5IGNvbnRhaW4gMiBjb29yZGluYXRlcylcbiAqIEBwYXJhbSB7RmVhdHVyZTxMaW5lU3RyaW5nPn0gbGluZTIgR2VvSlNPTiBMaW5lU3RyaW5nIChNdXN0IG9ubHkgY29udGFpbiAyIGNvb3JkaW5hdGVzKVxuICogQHJldHVybnMge0ZlYXR1cmU8UG9pbnQ+fSBpbnRlcnNlY3RpbmcgR2VvSlNPTiBQb2ludFxuICovXG5mdW5jdGlvbiBpbnRlcnNlY3RzKGxpbmUxLCBsaW5lMikge1xuICAgIHZhciBjb29yZHMxID0gZ2V0Q29vcmRzKGxpbmUxKTtcbiAgICB2YXIgY29vcmRzMiA9IGdldENvb3JkcyhsaW5lMik7XG4gICAgaWYgKGNvb3JkczEubGVuZ3RoICE9PSAyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIjxpbnRlcnNlY3RzPiBsaW5lMSBtdXN0IG9ubHkgY29udGFpbiAyIGNvb3JkaW5hdGVzXCIpO1xuICAgIH1cbiAgICBpZiAoY29vcmRzMi5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiPGludGVyc2VjdHM+IGxpbmUyIG11c3Qgb25seSBjb250YWluIDIgY29vcmRpbmF0ZXNcIik7XG4gICAgfVxuICAgIHZhciB4MSA9IGNvb3JkczFbMF1bMF07XG4gICAgdmFyIHkxID0gY29vcmRzMVswXVsxXTtcbiAgICB2YXIgeDIgPSBjb29yZHMxWzFdWzBdO1xuICAgIHZhciB5MiA9IGNvb3JkczFbMV1bMV07XG4gICAgdmFyIHgzID0gY29vcmRzMlswXVswXTtcbiAgICB2YXIgeTMgPSBjb29yZHMyWzBdWzFdO1xuICAgIHZhciB4NCA9IGNvb3JkczJbMV1bMF07XG4gICAgdmFyIHk0ID0gY29vcmRzMlsxXVsxXTtcbiAgICB2YXIgZGVub20gPSAoeTQgLSB5MykgKiAoeDIgLSB4MSkgLSAoeDQgLSB4MykgKiAoeTIgLSB5MSk7XG4gICAgdmFyIG51bWVBID0gKHg0IC0geDMpICogKHkxIC0geTMpIC0gKHk0IC0geTMpICogKHgxIC0geDMpO1xuICAgIHZhciBudW1lQiA9ICh4MiAtIHgxKSAqICh5MSAtIHkzKSAtICh5MiAtIHkxKSAqICh4MSAtIHgzKTtcbiAgICBpZiAoZGVub20gPT09IDApIHtcbiAgICAgICAgaWYgKG51bWVBID09PSAwICYmIG51bWVCID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIHVBID0gbnVtZUEgLyBkZW5vbTtcbiAgICB2YXIgdUIgPSBudW1lQiAvIGRlbm9tO1xuICAgIGlmICh1QSA+PSAwICYmIHVBIDw9IDEgJiYgdUIgPj0gMCAmJiB1QiA8PSAxKSB7XG4gICAgICAgIHZhciB4ID0geDEgKyB1QSAqICh4MiAtIHgxKTtcbiAgICAgICAgdmFyIHkgPSB5MSArIHVBICogKHkyIC0geTEpO1xuICAgICAgICByZXR1cm4gcG9pbnQoW3gsIHldKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5leHBvcnQgZGVmYXVsdCBsaW5lSW50ZXJzZWN0O1xuIiwiaW1wb3J0IHsgZmVhdHVyZUNvbGxlY3Rpb24sIGxpbmVTdHJpbmcsIH0gZnJvbSBcIkB0dXJmL2hlbHBlcnNcIjtcbmltcG9ydCB7IGdldENvb3JkcyB9IGZyb20gXCJAdHVyZi9pbnZhcmlhbnRcIjtcbmltcG9ydCB7IGZsYXR0ZW5FYWNoIH0gZnJvbSBcIkB0dXJmL21ldGFcIjtcbi8qKlxuICogQ3JlYXRlcyBhIHtAbGluayBGZWF0dXJlQ29sbGVjdGlvbn0gb2YgMi12ZXJ0ZXgge0BsaW5rIExpbmVTdHJpbmd9IHNlZ21lbnRzIGZyb20gYVxuICoge0BsaW5rIExpbmVTdHJpbmd8KE11bHRpKUxpbmVTdHJpbmd9IG9yIHtAbGluayBQb2x5Z29ufChNdWx0aSlQb2x5Z29ufS5cbiAqXG4gKiBAbmFtZSBsaW5lU2VnbWVudFxuICogQHBhcmFtIHtHZW9KU09OfSBnZW9qc29uIEdlb0pTT04gUG9seWdvbiBvciBMaW5lU3RyaW5nXG4gKiBAcmV0dXJucyB7RmVhdHVyZUNvbGxlY3Rpb248TGluZVN0cmluZz59IDItdmVydGV4IGxpbmUgc2VnbWVudHNcbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9seWdvbiA9IHR1cmYucG9seWdvbihbW1stNTAsIDVdLCBbLTQwLCAtMTBdLCBbLTUwLCAtMTBdLCBbLTQwLCA1XSwgWy01MCwgNV1dXSk7XG4gKiB2YXIgc2VnbWVudHMgPSB0dXJmLmxpbmVTZWdtZW50KHBvbHlnb24pO1xuICpcbiAqIC8vYWRkVG9NYXBcbiAqIHZhciBhZGRUb01hcCA9IFtwb2x5Z29uLCBzZWdtZW50c11cbiAqL1xuZnVuY3Rpb24gbGluZVNlZ21lbnQoZ2VvanNvbikge1xuICAgIGlmICghZ2VvanNvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnZW9qc29uIGlzIHJlcXVpcmVkXCIpO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIGZsYXR0ZW5FYWNoKGdlb2pzb24sIGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgICAgIGxpbmVTZWdtZW50RmVhdHVyZShmZWF0dXJlLCByZXN1bHRzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24ocmVzdWx0cyk7XG59XG4vKipcbiAqIExpbmUgU2VnbWVudFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0ZlYXR1cmU8TGluZVN0cmluZ3xQb2x5Z29uPn0gZ2VvanNvbiBMaW5lIG9yIHBvbHlnb24gZmVhdHVyZVxuICogQHBhcmFtIHtBcnJheX0gcmVzdWx0cyBwdXNoIHRvIHJlc3VsdHNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBsaW5lU2VnbWVudEZlYXR1cmUoZ2VvanNvbiwgcmVzdWx0cykge1xuICAgIHZhciBjb29yZHMgPSBbXTtcbiAgICB2YXIgZ2VvbWV0cnkgPSBnZW9qc29uLmdlb21ldHJ5O1xuICAgIGlmIChnZW9tZXRyeSAhPT0gbnVsbCkge1xuICAgICAgICBzd2l0Y2ggKGdlb21ldHJ5LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICAgICAgICAgICAgY29vcmRzID0gZ2V0Q29vcmRzKGdlb21ldHJ5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgICAgICAgICAgICAgY29vcmRzID0gW2dldENvb3JkcyhnZW9tZXRyeSldO1xuICAgICAgICB9XG4gICAgICAgIGNvb3Jkcy5mb3JFYWNoKGZ1bmN0aW9uIChjb29yZCkge1xuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gY3JlYXRlU2VnbWVudHMoY29vcmQsIGdlb2pzb24ucHJvcGVydGllcyk7XG4gICAgICAgICAgICBzZWdtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChzZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5pZCA9IHJlc3VsdHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChzZWdtZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiAqIENyZWF0ZSBTZWdtZW50cyBmcm9tIExpbmVTdHJpbmcgY29vcmRpbmF0ZXNcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gY29vcmRzIExpbmVTdHJpbmcgY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7Kn0gcHJvcGVydGllcyBHZW9KU09OIHByb3BlcnRpZXNcbiAqIEByZXR1cm5zIHtBcnJheTxGZWF0dXJlPExpbmVTdHJpbmc+Pn0gbGluZSBzZWdtZW50c1xuICovXG5mdW5jdGlvbiBjcmVhdGVTZWdtZW50cyhjb29yZHMsIHByb3BlcnRpZXMpIHtcbiAgICB2YXIgc2VnbWVudHMgPSBbXTtcbiAgICBjb29yZHMucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91c0Nvb3JkcywgY3VycmVudENvb3Jkcykge1xuICAgICAgICB2YXIgc2VnbWVudCA9IGxpbmVTdHJpbmcoW3ByZXZpb3VzQ29vcmRzLCBjdXJyZW50Q29vcmRzXSwgcHJvcGVydGllcyk7XG4gICAgICAgIHNlZ21lbnQuYmJveCA9IGJib3gocHJldmlvdXNDb29yZHMsIGN1cnJlbnRDb29yZHMpO1xuICAgICAgICBzZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuICAgICAgICByZXR1cm4gY3VycmVudENvb3JkcztcbiAgICB9KTtcbiAgICByZXR1cm4gc2VnbWVudHM7XG59XG4vKipcbiAqIENyZWF0ZSBCQm94IGJldHdlZW4gdHdvIGNvb3JkaW5hdGVzIChmYXN0ZXIgdGhhbiBAdHVyZi9iYm94KVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGNvb3JkczEgUG9pbnQgY29vcmRpbmF0ZVxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBjb29yZHMyIFBvaW50IGNvb3JkaW5hdGVcbiAqIEByZXR1cm5zIHtCQm94fSBbd2VzdCwgc291dGgsIGVhc3QsIG5vcnRoXVxuICovXG5mdW5jdGlvbiBiYm94KGNvb3JkczEsIGNvb3JkczIpIHtcbiAgICB2YXIgeDEgPSBjb29yZHMxWzBdO1xuICAgIHZhciB5MSA9IGNvb3JkczFbMV07XG4gICAgdmFyIHgyID0gY29vcmRzMlswXTtcbiAgICB2YXIgeTIgPSBjb29yZHMyWzFdO1xuICAgIHZhciB3ZXN0ID0geDEgPCB4MiA/IHgxIDogeDI7XG4gICAgdmFyIHNvdXRoID0geTEgPCB5MiA/IHkxIDogeTI7XG4gICAgdmFyIGVhc3QgPSB4MSA+IHgyID8geDEgOiB4MjtcbiAgICB2YXIgbm9ydGggPSB5MSA+IHkyID8geTEgOiB5MjtcbiAgICByZXR1cm4gW3dlc3QsIHNvdXRoLCBlYXN0LCBub3J0aF07XG59XG5leHBvcnQgZGVmYXVsdCBsaW5lU2VnbWVudDtcbiIsImltcG9ydCB7IGZlYXR1cmUsIGxpbmVTdHJpbmcsIGlzT2JqZWN0LCBwb2ludCB9IGZyb20gJ0B0dXJmL2hlbHBlcnMnO1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciBjb29yZEVhY2hcbiAqXG4gKiBAY2FsbGJhY2sgY29vcmRFYWNoQ2FsbGJhY2tcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gY3VycmVudENvb3JkIFRoZSBjdXJyZW50IGNvb3JkaW5hdGUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGNvb3JkSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIGNvb3JkaW5hdGUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlGZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIE11bHRpLUZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGdlb21ldHJ5SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEdlb21ldHJ5IGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBjb29yZGluYXRlcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkuZm9yRWFjaCgpXG4gKlxuICogQG5hbWUgY29vcmRFYWNoXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50Q29vcmQsIGNvb3JkSW5kZXgsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtleGNsdWRlV3JhcENvb3JkPWZhbHNlXSB3aGV0aGVyIG9yIG5vdCB0byBpbmNsdWRlIHRoZSBmaW5hbCBjb29yZGluYXRlIG9mIExpbmVhclJpbmdzIHRoYXQgd3JhcHMgdGhlIHJpbmcgaW4gaXRzIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICB0dXJmLnBvaW50KFsyNiwgMzddLCB7XCJmb29cIjogXCJiYXJcIn0pLFxuICogICB0dXJmLnBvaW50KFszNiwgNTNdLCB7XCJoZWxsb1wiOiBcIndvcmxkXCJ9KVxuICogXSk7XG4gKlxuICogdHVyZi5jb29yZEVhY2goZmVhdHVyZXMsIGZ1bmN0aW9uIChjdXJyZW50Q29vcmQsIGNvb3JkSW5kZXgsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgpIHtcbiAqICAgLy89Y3VycmVudENvb3JkXG4gKiAgIC8vPWNvb3JkSW5kZXhcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPW11bHRpRmVhdHVyZUluZGV4XG4gKiAgIC8vPWdlb21ldHJ5SW5kZXhcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBjb29yZEVhY2goZ2VvanNvbiwgY2FsbGJhY2ssIGV4Y2x1ZGVXcmFwQ29vcmQpIHtcbiAgLy8gSGFuZGxlcyBudWxsIEdlb21ldHJ5IC0tIFNraXBzIHRoaXMgR2VvSlNPTlxuICBpZiAoZ2VvanNvbiA9PT0gbnVsbCkgcmV0dXJuO1xuICB2YXIgaixcbiAgICBrLFxuICAgIGwsXG4gICAgZ2VvbWV0cnksXG4gICAgc3RvcEcsXG4gICAgY29vcmRzLFxuICAgIGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLFxuICAgIHdyYXBTaHJpbmsgPSAwLFxuICAgIGNvb3JkSW5kZXggPSAwLFxuICAgIGlzR2VvbWV0cnlDb2xsZWN0aW9uLFxuICAgIHR5cGUgPSBnZW9qc29uLnR5cGUsXG4gICAgaXNGZWF0dXJlQ29sbGVjdGlvbiA9IHR5cGUgPT09IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAgICBpc0ZlYXR1cmUgPSB0eXBlID09PSBcIkZlYXR1cmVcIixcbiAgICBzdG9wID0gaXNGZWF0dXJlQ29sbGVjdGlvbiA/IGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoIDogMTtcblxuICAvLyBUaGlzIGxvZ2ljIG1heSBsb29rIGEgbGl0dGxlIHdlaXJkLiBUaGUgcmVhc29uIHdoeSBpdCBpcyB0aGF0IHdheVxuICAvLyBpcyBiZWNhdXNlIGl0J3MgdHJ5aW5nIHRvIGJlIGZhc3QuIEdlb0pTT04gc3VwcG9ydHMgbXVsdGlwbGUga2luZHNcbiAgLy8gb2Ygb2JqZWN0cyBhdCBpdHMgcm9vdDogRmVhdHVyZUNvbGxlY3Rpb24sIEZlYXR1cmVzLCBHZW9tZXRyaWVzLlxuICAvLyBUaGlzIGZ1bmN0aW9uIGhhcyB0aGUgcmVzcG9uc2liaWxpdHkgb2YgaGFuZGxpbmcgYWxsIG9mIHRoZW0sIGFuZCB0aGF0XG4gIC8vIG1lYW5zIHRoYXQgc29tZSBvZiB0aGUgYGZvcmAgbG9vcHMgeW91IHNlZSBiZWxvdyBhY3R1YWxseSBqdXN0IGRvbid0IGFwcGx5XG4gIC8vIHRvIGNlcnRhaW4gaW5wdXRzLiBGb3IgaW5zdGFuY2UsIGlmIHlvdSBnaXZlIHRoaXMganVzdCBhXG4gIC8vIFBvaW50IGdlb21ldHJ5LCB0aGVuIGJvdGggbG9vcHMgYXJlIHNob3J0LWNpcmN1aXRlZCBhbmQgYWxsIHdlIGRvXG4gIC8vIGlzIGdyYWR1YWxseSByZW5hbWUgdGhlIGlucHV0IHVudGlsIGl0J3MgY2FsbGVkICdnZW9tZXRyeScuXG4gIC8vXG4gIC8vIFRoaXMgYWxzbyBhaW1zIHRvIGFsbG9jYXRlIGFzIGZldyByZXNvdXJjZXMgYXMgcG9zc2libGU6IGp1c3QgYVxuICAvLyBmZXcgbnVtYmVycyBhbmQgYm9vbGVhbnMsIHJhdGhlciB0aGFuIGFueSB0ZW1wb3JhcnkgYXJyYXlzIGFzIHdvdWxkXG4gIC8vIGJlIHJlcXVpcmVkIHdpdGggdGhlIG5vcm1hbGl6YXRpb24gYXBwcm9hY2guXG4gIGZvciAodmFyIGZlYXR1cmVJbmRleCA9IDA7IGZlYXR1cmVJbmRleCA8IHN0b3A7IGZlYXR1cmVJbmRleCsrKSB7XG4gICAgZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb24gPSBpc0ZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb2pzb24uZmVhdHVyZXNbZmVhdHVyZUluZGV4XS5nZW9tZXRyeVxuICAgICAgOiBpc0ZlYXR1cmVcbiAgICAgID8gZ2VvanNvbi5nZW9tZXRyeVxuICAgICAgOiBnZW9qc29uO1xuICAgIGlzR2VvbWV0cnlDb2xsZWN0aW9uID0gZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb25cbiAgICAgID8gZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb24udHlwZSA9PT0gXCJHZW9tZXRyeUNvbGxlY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgICBzdG9wRyA9IGlzR2VvbWV0cnlDb2xsZWN0aW9uXG4gICAgICA/IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLmdlb21ldHJpZXMubGVuZ3RoXG4gICAgICA6IDE7XG5cbiAgICBmb3IgKHZhciBnZW9tSW5kZXggPSAwOyBnZW9tSW5kZXggPCBzdG9wRzsgZ2VvbUluZGV4KyspIHtcbiAgICAgIHZhciBtdWx0aUZlYXR1cmVJbmRleCA9IDA7XG4gICAgICB2YXIgZ2VvbWV0cnlJbmRleCA9IDA7XG4gICAgICBnZW9tZXRyeSA9IGlzR2VvbWV0cnlDb2xsZWN0aW9uXG4gICAgICAgID8gZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb24uZ2VvbWV0cmllc1tnZW9tSW5kZXhdXG4gICAgICAgIDogZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb247XG5cbiAgICAgIC8vIEhhbmRsZXMgbnVsbCBHZW9tZXRyeSAtLSBTa2lwcyB0aGlzIGdlb21ldHJ5XG4gICAgICBpZiAoZ2VvbWV0cnkgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgY29vcmRzID0gZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gICAgICB2YXIgZ2VvbVR5cGUgPSBnZW9tZXRyeS50eXBlO1xuXG4gICAgICB3cmFwU2hyaW5rID1cbiAgICAgICAgZXhjbHVkZVdyYXBDb29yZCAmJlxuICAgICAgICAoZ2VvbVR5cGUgPT09IFwiUG9seWdvblwiIHx8IGdlb21UeXBlID09PSBcIk11bHRpUG9seWdvblwiKVxuICAgICAgICAgID8gMVxuICAgICAgICAgIDogMDtcblxuICAgICAgc3dpdGNoIChnZW9tVHlwZSkge1xuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICBjb29yZHMsXG4gICAgICAgICAgICAgIGNvb3JkSW5kZXgsXG4gICAgICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgIGdlb21ldHJ5SW5kZXhcbiAgICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIGNvb3JkSW5kZXgrKztcbiAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCsrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgICBjYXNlIFwiTXVsdGlQb2ludFwiOlxuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBjb29yZHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICAgICAgY29vcmRzW2pdLFxuICAgICAgICAgICAgICAgIGNvb3JkSW5kZXgsXG4gICAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICAgIGdlb21ldHJ5SW5kZXhcbiAgICAgICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgY29vcmRJbmRleCsrO1xuICAgICAgICAgICAgaWYgKGdlb21UeXBlID09PSBcIk11bHRpUG9pbnRcIikgbXVsdGlGZWF0dXJlSW5kZXgrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGdlb21UeXBlID09PSBcIkxpbmVTdHJpbmdcIikgbXVsdGlGZWF0dXJlSW5kZXgrKztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBjb29yZHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBjb29yZHNbal0ubGVuZ3RoIC0gd3JhcFNocmluazsgaysrKSB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgICAgICAgIGNvb3Jkc1tqXVtrXSxcbiAgICAgICAgICAgICAgICAgIGNvb3JkSW5kZXgsXG4gICAgICAgICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgICAgICAgIGdlb21ldHJ5SW5kZXhcbiAgICAgICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICBjb29yZEluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2VvbVR5cGUgPT09IFwiTXVsdGlMaW5lU3RyaW5nXCIpIG11bHRpRmVhdHVyZUluZGV4Kys7XG4gICAgICAgICAgICBpZiAoZ2VvbVR5cGUgPT09IFwiUG9seWdvblwiKSBnZW9tZXRyeUluZGV4Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChnZW9tVHlwZSA9PT0gXCJQb2x5Z29uXCIpIG11bHRpRmVhdHVyZUluZGV4Kys7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgY29vcmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBnZW9tZXRyeUluZGV4ID0gMDtcbiAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBjb29yZHNbal0ubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgZm9yIChsID0gMDsgbCA8IGNvb3Jkc1tqXVtrXS5sZW5ndGggLSB3cmFwU2hyaW5rOyBsKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICAgICAgICAgICAgY29vcmRzW2pdW2tdW2xdLFxuICAgICAgICAgICAgICAgICAgICBjb29yZEluZGV4LFxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb29yZEluZGV4Kys7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZ2VvbWV0cnlJbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJHZW9tZXRyeUNvbGxlY3Rpb25cIjpcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgZ2VvbWV0cnkuZ2VvbWV0cmllcy5sZW5ndGg7IGorKylcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY29vcmRFYWNoKGdlb21ldHJ5Lmdlb21ldHJpZXNbal0sIGNhbGxiYWNrLCBleGNsdWRlV3JhcENvb3JkKSA9PT1cbiAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gR2VvbWV0cnkgVHlwZVwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgY29vcmRSZWR1Y2VcbiAqXG4gKiBUaGUgZmlyc3QgdGltZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGUgdmFsdWVzIHByb3ZpZGVkIGFzIGFyZ3VtZW50cyBkZXBlbmRcbiAqIG9uIHdoZXRoZXIgdGhlIHJlZHVjZSBtZXRob2QgaGFzIGFuIGluaXRpYWxWYWx1ZSBhcmd1bWVudC5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgcHJvdmlkZWQgdG8gdGhlIHJlZHVjZSBtZXRob2Q6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyBpbml0aWFsVmFsdWUuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgbm90IHByb3ZpZGVkOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIHNlY29uZCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIEBjYWxsYmFjayBjb29yZFJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBjdXJyZW50Q29vcmQgVGhlIGN1cnJlbnQgY29vcmRpbmF0ZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gY29vcmRJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgY29vcmRpbmF0ZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBTdGFydHMgYXQgaW5kZXggMCwgaWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkLCBhbmQgYXQgaW5kZXggMSBvdGhlcndpc2UuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aUZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgTXVsdGktRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZ2VvbWV0cnlJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgR2VvbWV0cnkgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogUmVkdWNlIGNvb3JkaW5hdGVzIGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5yZWR1Y2UoKVxuICpcbiAqIEBuYW1lIGNvb3JkUmVkdWNlXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEdlb21ldHJ5fEZlYXR1cmV9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50Q29vcmQsIGNvb3JkSW5kZXgpXG4gKiBAcGFyYW0geyp9IFtpbml0aWFsVmFsdWVdIFZhbHVlIHRvIHVzZSBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIGZpcnN0IGNhbGwgb2YgdGhlIGNhbGxiYWNrLlxuICogQHBhcmFtIHtib29sZWFufSBbZXhjbHVkZVdyYXBDb29yZD1mYWxzZV0gd2hldGhlciBvciBub3QgdG8gaW5jbHVkZSB0aGUgZmluYWwgY29vcmRpbmF0ZSBvZiBMaW5lYXJSaW5ncyB0aGF0IHdyYXBzIHRoZSByaW5nIGluIGl0cyBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHZhbHVlIHRoYXQgcmVzdWx0cyBmcm9tIHRoZSByZWR1Y3Rpb24uXG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtcImZvb1wiOiBcImJhclwifSksXG4gKiAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtcImhlbGxvXCI6IFwid29ybGRcIn0pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmNvb3JkUmVkdWNlKGZlYXR1cmVzLCBmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudENvb3JkLCBjb29yZEluZGV4LCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KSB7XG4gKiAgIC8vPXByZXZpb3VzVmFsdWVcbiAqICAgLy89Y3VycmVudENvb3JkXG4gKiAgIC8vPWNvb3JkSW5kZXhcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPW11bHRpRmVhdHVyZUluZGV4XG4gKiAgIC8vPWdlb21ldHJ5SW5kZXhcbiAqICAgcmV0dXJuIGN1cnJlbnRDb29yZDtcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBjb29yZFJlZHVjZShnZW9qc29uLCBjYWxsYmFjaywgaW5pdGlhbFZhbHVlLCBleGNsdWRlV3JhcENvb3JkKSB7XG4gIHZhciBwcmV2aW91c1ZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICBjb29yZEVhY2goXG4gICAgZ2VvanNvbixcbiAgICBmdW5jdGlvbiAoXG4gICAgICBjdXJyZW50Q29vcmQsXG4gICAgICBjb29yZEluZGV4LFxuICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICBnZW9tZXRyeUluZGV4XG4gICAgKSB7XG4gICAgICBpZiAoY29vcmRJbmRleCA9PT0gMCAmJiBpbml0aWFsVmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGN1cnJlbnRDb29yZDtcbiAgICAgIGVsc2VcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGNhbGxiYWNrKFxuICAgICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgICAgY3VycmVudENvb3JkLFxuICAgICAgICAgIGNvb3JkSW5kZXgsXG4gICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgIGdlb21ldHJ5SW5kZXhcbiAgICAgICAgKTtcbiAgICB9LFxuICAgIGV4Y2x1ZGVXcmFwQ29vcmRcbiAgKTtcbiAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHByb3BFYWNoXG4gKlxuICogQGNhbGxiYWNrIHByb3BFYWNoQ2FsbGJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBjdXJyZW50UHJvcGVydGllcyBUaGUgY3VycmVudCBQcm9wZXJ0aWVzIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIHByb3BlcnRpZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LmZvckVhY2goKVxuICpcbiAqIEBuYW1lIHByb3BFYWNoXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50UHJvcGVydGllcywgZmVhdHVyZUluZGV4KVxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgICAgdHVyZi5wb2ludChbMjYsIDM3XSwge2ZvbzogJ2Jhcid9KSxcbiAqICAgICB0dXJmLnBvaW50KFszNiwgNTNdLCB7aGVsbG86ICd3b3JsZCd9KVxuICogXSk7XG4gKlxuICogdHVyZi5wcm9wRWFjaChmZWF0dXJlcywgZnVuY3Rpb24gKGN1cnJlbnRQcm9wZXJ0aWVzLCBmZWF0dXJlSW5kZXgpIHtcbiAqICAgLy89Y3VycmVudFByb3BlcnRpZXNcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gcHJvcEVhY2goZ2VvanNvbiwgY2FsbGJhY2spIHtcbiAgdmFyIGk7XG4gIHN3aXRjaCAoZ2VvanNvbi50eXBlKSB7XG4gICAgY2FzZSBcIkZlYXR1cmVDb2xsZWN0aW9uXCI6XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZ2VvanNvbi5mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY2FsbGJhY2soZ2VvanNvbi5mZWF0dXJlc1tpXS5wcm9wZXJ0aWVzLCBpKSA9PT0gZmFsc2UpIGJyZWFrO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkZlYXR1cmVcIjpcbiAgICAgIGNhbGxiYWNrKGdlb2pzb24ucHJvcGVydGllcywgMCk7XG4gICAgICBicmVhaztcbiAgfVxufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBwcm9wUmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgcHJvcFJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHsqfSBjdXJyZW50UHJvcGVydGllcyBUaGUgY3VycmVudCBQcm9wZXJ0aWVzIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogUmVkdWNlIHByb3BlcnRpZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0IGludG8gYSBzaW5nbGUgdmFsdWUsXG4gKiBzaW1pbGFyIHRvIGhvdyBBcnJheS5yZWR1Y2Ugd29ya3MuIEhvd2V2ZXIsIGluIHRoaXMgY2FzZSB3ZSBsYXppbHkgcnVuXG4gKiB0aGUgcmVkdWN0aW9uLCBzbyBhbiBhcnJheSBvZiBhbGwgcHJvcGVydGllcyBpcyB1bm5lY2Vzc2FyeS5cbiAqXG4gKiBAbmFtZSBwcm9wUmVkdWNlXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50UHJvcGVydGllcywgZmVhdHVyZUluZGV4KVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm5zIHsqfSBUaGUgdmFsdWUgdGhhdCByZXN1bHRzIGZyb20gdGhlIHJlZHVjdGlvbi5cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgICB0dXJmLnBvaW50KFsyNiwgMzddLCB7Zm9vOiAnYmFyJ30pLFxuICogICAgIHR1cmYucG9pbnQoWzM2LCA1M10sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLnByb3BSZWR1Y2UoZmVhdHVyZXMsIGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50UHJvcGVydGllcywgZmVhdHVyZUluZGV4KSB7XG4gKiAgIC8vPXByZXZpb3VzVmFsdWVcbiAqICAgLy89Y3VycmVudFByb3BlcnRpZXNcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIHJldHVybiBjdXJyZW50UHJvcGVydGllc1xuICogfSk7XG4gKi9cbmZ1bmN0aW9uIHByb3BSZWR1Y2UoZ2VvanNvbiwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuICB2YXIgcHJldmlvdXNWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgcHJvcEVhY2goZ2VvanNvbiwgZnVuY3Rpb24gKGN1cnJlbnRQcm9wZXJ0aWVzLCBmZWF0dXJlSW5kZXgpIHtcbiAgICBpZiAoZmVhdHVyZUluZGV4ID09PSAwICYmIGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgcHJldmlvdXNWYWx1ZSA9IGN1cnJlbnRQcm9wZXJ0aWVzO1xuICAgIGVsc2VcbiAgICAgIHByZXZpb3VzVmFsdWUgPSBjYWxsYmFjayhwcmV2aW91c1ZhbHVlLCBjdXJyZW50UHJvcGVydGllcywgZmVhdHVyZUluZGV4KTtcbiAgfSk7XG4gIHJldHVybiBwcmV2aW91c1ZhbHVlO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBmZWF0dXJlRWFjaFxuICpcbiAqIEBjYWxsYmFjayBmZWF0dXJlRWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge0ZlYXR1cmU8YW55Pn0gY3VycmVudEZlYXR1cmUgVGhlIGN1cnJlbnQgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBmZWF0dXJlcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG9cbiAqIEFycmF5LmZvckVhY2guXG4gKlxuICogQG5hbWUgZmVhdHVyZUVhY2hcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBhbnkgR2VvSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgpXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgdHVyZi5wb2ludChbMjYsIDM3XSwge2ZvbzogJ2Jhcid9KSxcbiAqICAgdHVyZi5wb2ludChbMzYsIDUzXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuZmVhdHVyZUVhY2goZmVhdHVyZXMsIGZ1bmN0aW9uIChjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4KSB7XG4gKiAgIC8vPWN1cnJlbnRGZWF0dXJlXG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIGZlYXR1cmVFYWNoKGdlb2pzb24sIGNhbGxiYWNrKSB7XG4gIGlmIChnZW9qc29uLnR5cGUgPT09IFwiRmVhdHVyZVwiKSB7XG4gICAgY2FsbGJhY2soZ2VvanNvbiwgMCk7XG4gIH0gZWxzZSBpZiAoZ2VvanNvbi50eXBlID09PSBcIkZlYXR1cmVDb2xsZWN0aW9uXCIpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjYWxsYmFjayhnZW9qc29uLmZlYXR1cmVzW2ldLCBpKSA9PT0gZmFsc2UpIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBmZWF0dXJlUmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgZmVhdHVyZVJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHtGZWF0dXJlfSBjdXJyZW50RmVhdHVyZSBUaGUgY3VycmVudCBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogUmVkdWNlIGZlYXR1cmVzIGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5yZWR1Y2UoKS5cbiAqXG4gKiBAbmFtZSBmZWF0dXJlUmVkdWNlXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4KVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm5zIHsqfSBUaGUgdmFsdWUgdGhhdCByZXN1bHRzIGZyb20gdGhlIHJlZHVjdGlvbi5cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgdHVyZi5wb2ludChbMjYsIDM3XSwge1wiZm9vXCI6IFwiYmFyXCJ9KSxcbiAqICAgdHVyZi5wb2ludChbMzYsIDUzXSwge1wiaGVsbG9cIjogXCJ3b3JsZFwifSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuZmVhdHVyZVJlZHVjZShmZWF0dXJlcywgZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgpIHtcbiAqICAgLy89cHJldmlvdXNWYWx1ZVxuICogICAvLz1jdXJyZW50RmVhdHVyZVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgcmV0dXJuIGN1cnJlbnRGZWF0dXJlXG4gKiB9KTtcbiAqL1xuZnVuY3Rpb24gZmVhdHVyZVJlZHVjZShnZW9qc29uLCBjYWxsYmFjaywgaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBwcmV2aW91c1ZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICBmZWF0dXJlRWFjaChnZW9qc29uLCBmdW5jdGlvbiAoY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCkge1xuICAgIGlmIChmZWF0dXJlSW5kZXggPT09IDAgJiYgaW5pdGlhbFZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICBwcmV2aW91c1ZhbHVlID0gY3VycmVudEZlYXR1cmU7XG4gICAgZWxzZSBwcmV2aW91c1ZhbHVlID0gY2FsbGJhY2socHJldmlvdXNWYWx1ZSwgY3VycmVudEZlYXR1cmUsIGZlYXR1cmVJbmRleCk7XG4gIH0pO1xuICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbn1cblxuLyoqXG4gKiBHZXQgYWxsIGNvb3JkaW5hdGVzIGZyb20gYW55IEdlb0pTT04gb2JqZWN0LlxuICpcbiAqIEBuYW1lIGNvb3JkQWxsXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcmV0dXJucyB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IGNvb3JkaW5hdGUgcG9zaXRpb24gYXJyYXlcbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgdHVyZi5wb2ludChbMjYsIDM3XSwge2ZvbzogJ2Jhcid9KSxcbiAqICAgdHVyZi5wb2ludChbMzYsIDUzXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHZhciBjb29yZHMgPSB0dXJmLmNvb3JkQWxsKGZlYXR1cmVzKTtcbiAqIC8vPSBbWzI2LCAzN10sIFszNiwgNTNdXVxuICovXG5mdW5jdGlvbiBjb29yZEFsbChnZW9qc29uKSB7XG4gIHZhciBjb29yZHMgPSBbXTtcbiAgY29vcmRFYWNoKGdlb2pzb24sIGZ1bmN0aW9uIChjb29yZCkge1xuICAgIGNvb3Jkcy5wdXNoKGNvb3JkKTtcbiAgfSk7XG4gIHJldHVybiBjb29yZHM7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGdlb21FYWNoXG4gKlxuICogQGNhbGxiYWNrIGdlb21FYWNoQ2FsbGJhY2tcbiAqIEBwYXJhbSB7R2VvbWV0cnl9IGN1cnJlbnRHZW9tZXRyeSBUaGUgY3VycmVudCBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBmZWF0dXJlUHJvcGVydGllcyBUaGUgY3VycmVudCBGZWF0dXJlIFByb3BlcnRpZXMgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBmZWF0dXJlQkJveCBUaGUgY3VycmVudCBGZWF0dXJlIEJCb3ggYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBmZWF0dXJlSWQgVGhlIGN1cnJlbnQgRmVhdHVyZSBJZCBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgZWFjaCBnZW9tZXRyeSBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkuZm9yRWFjaCgpXG4gKlxuICogQG5hbWUgZ2VvbUVhY2hcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBhbnkgR2VvSlNPTiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKGN1cnJlbnRHZW9tZXRyeSwgZmVhdHVyZUluZGV4LCBmZWF0dXJlUHJvcGVydGllcywgZmVhdHVyZUJCb3gsIGZlYXR1cmVJZClcbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgICAgdHVyZi5wb2ludChbMzYsIDUzXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuZ2VvbUVhY2goZmVhdHVyZXMsIGZ1bmN0aW9uIChjdXJyZW50R2VvbWV0cnksIGZlYXR1cmVJbmRleCwgZmVhdHVyZVByb3BlcnRpZXMsIGZlYXR1cmVCQm94LCBmZWF0dXJlSWQpIHtcbiAqICAgLy89Y3VycmVudEdlb21ldHJ5XG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1mZWF0dXJlUHJvcGVydGllc1xuICogICAvLz1mZWF0dXJlQkJveFxuICogICAvLz1mZWF0dXJlSWRcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBnZW9tRWFjaChnZW9qc29uLCBjYWxsYmFjaykge1xuICB2YXIgaSxcbiAgICBqLFxuICAgIGcsXG4gICAgZ2VvbWV0cnksXG4gICAgc3RvcEcsXG4gICAgZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb24sXG4gICAgaXNHZW9tZXRyeUNvbGxlY3Rpb24sXG4gICAgZmVhdHVyZVByb3BlcnRpZXMsXG4gICAgZmVhdHVyZUJCb3gsXG4gICAgZmVhdHVyZUlkLFxuICAgIGZlYXR1cmVJbmRleCA9IDAsXG4gICAgaXNGZWF0dXJlQ29sbGVjdGlvbiA9IGdlb2pzb24udHlwZSA9PT0gXCJGZWF0dXJlQ29sbGVjdGlvblwiLFxuICAgIGlzRmVhdHVyZSA9IGdlb2pzb24udHlwZSA9PT0gXCJGZWF0dXJlXCIsXG4gICAgc3RvcCA9IGlzRmVhdHVyZUNvbGxlY3Rpb24gPyBnZW9qc29uLmZlYXR1cmVzLmxlbmd0aCA6IDE7XG5cbiAgLy8gVGhpcyBsb2dpYyBtYXkgbG9vayBhIGxpdHRsZSB3ZWlyZC4gVGhlIHJlYXNvbiB3aHkgaXQgaXMgdGhhdCB3YXlcbiAgLy8gaXMgYmVjYXVzZSBpdCdzIHRyeWluZyB0byBiZSBmYXN0LiBHZW9KU09OIHN1cHBvcnRzIG11bHRpcGxlIGtpbmRzXG4gIC8vIG9mIG9iamVjdHMgYXQgaXRzIHJvb3Q6IEZlYXR1cmVDb2xsZWN0aW9uLCBGZWF0dXJlcywgR2VvbWV0cmllcy5cbiAgLy8gVGhpcyBmdW5jdGlvbiBoYXMgdGhlIHJlc3BvbnNpYmlsaXR5IG9mIGhhbmRsaW5nIGFsbCBvZiB0aGVtLCBhbmQgdGhhdFxuICAvLyBtZWFucyB0aGF0IHNvbWUgb2YgdGhlIGBmb3JgIGxvb3BzIHlvdSBzZWUgYmVsb3cgYWN0dWFsbHkganVzdCBkb24ndCBhcHBseVxuICAvLyB0byBjZXJ0YWluIGlucHV0cy4gRm9yIGluc3RhbmNlLCBpZiB5b3UgZ2l2ZSB0aGlzIGp1c3QgYVxuICAvLyBQb2ludCBnZW9tZXRyeSwgdGhlbiBib3RoIGxvb3BzIGFyZSBzaG9ydC1jaXJjdWl0ZWQgYW5kIGFsbCB3ZSBkb1xuICAvLyBpcyBncmFkdWFsbHkgcmVuYW1lIHRoZSBpbnB1dCB1bnRpbCBpdCdzIGNhbGxlZCAnZ2VvbWV0cnknLlxuICAvL1xuICAvLyBUaGlzIGFsc28gYWltcyB0byBhbGxvY2F0ZSBhcyBmZXcgcmVzb3VyY2VzIGFzIHBvc3NpYmxlOiBqdXN0IGFcbiAgLy8gZmV3IG51bWJlcnMgYW5kIGJvb2xlYW5zLCByYXRoZXIgdGhhbiBhbnkgdGVtcG9yYXJ5IGFycmF5cyBhcyB3b3VsZFxuICAvLyBiZSByZXF1aXJlZCB3aXRoIHRoZSBub3JtYWxpemF0aW9uIGFwcHJvYWNoLlxuICBmb3IgKGkgPSAwOyBpIDwgc3RvcDsgaSsrKSB7XG4gICAgZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb24gPSBpc0ZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb2pzb24uZmVhdHVyZXNbaV0uZ2VvbWV0cnlcbiAgICAgIDogaXNGZWF0dXJlXG4gICAgICA/IGdlb2pzb24uZ2VvbWV0cnlcbiAgICAgIDogZ2VvanNvbjtcbiAgICBmZWF0dXJlUHJvcGVydGllcyA9IGlzRmVhdHVyZUNvbGxlY3Rpb25cbiAgICAgID8gZ2VvanNvbi5mZWF0dXJlc1tpXS5wcm9wZXJ0aWVzXG4gICAgICA6IGlzRmVhdHVyZVxuICAgICAgPyBnZW9qc29uLnByb3BlcnRpZXNcbiAgICAgIDoge307XG4gICAgZmVhdHVyZUJCb3ggPSBpc0ZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb2pzb24uZmVhdHVyZXNbaV0uYmJveFxuICAgICAgOiBpc0ZlYXR1cmVcbiAgICAgID8gZ2VvanNvbi5iYm94XG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICBmZWF0dXJlSWQgPSBpc0ZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICA/IGdlb2pzb24uZmVhdHVyZXNbaV0uaWRcbiAgICAgIDogaXNGZWF0dXJlXG4gICAgICA/IGdlb2pzb24uaWRcbiAgICAgIDogdW5kZWZpbmVkO1xuICAgIGlzR2VvbWV0cnlDb2xsZWN0aW9uID0gZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb25cbiAgICAgID8gZ2VvbWV0cnlNYXliZUNvbGxlY3Rpb24udHlwZSA9PT0gXCJHZW9tZXRyeUNvbGxlY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgICBzdG9wRyA9IGlzR2VvbWV0cnlDb2xsZWN0aW9uXG4gICAgICA/IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLmdlb21ldHJpZXMubGVuZ3RoXG4gICAgICA6IDE7XG5cbiAgICBmb3IgKGcgPSAwOyBnIDwgc3RvcEc7IGcrKykge1xuICAgICAgZ2VvbWV0cnkgPSBpc0dlb21ldHJ5Q29sbGVjdGlvblxuICAgICAgICA/IGdlb21ldHJ5TWF5YmVDb2xsZWN0aW9uLmdlb21ldHJpZXNbZ11cbiAgICAgICAgOiBnZW9tZXRyeU1heWJlQ29sbGVjdGlvbjtcblxuICAgICAgLy8gSGFuZGxlIG51bGwgR2VvbWV0cnlcbiAgICAgIGlmIChnZW9tZXRyeSA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgZmVhdHVyZVByb3BlcnRpZXMsXG4gICAgICAgICAgICBmZWF0dXJlQkJveCxcbiAgICAgICAgICAgIGZlYXR1cmVJZFxuICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChnZW9tZXRyeS50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgICBjYXNlIFwiTXVsdGlQb2ludFwiOlxuICAgICAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6XG4gICAgICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjoge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgICBnZW9tZXRyeSxcbiAgICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICBmZWF0dXJlUHJvcGVydGllcyxcbiAgICAgICAgICAgICAgZmVhdHVyZUJCb3gsXG4gICAgICAgICAgICAgIGZlYXR1cmVJZFxuICAgICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiOiB7XG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGdlb21ldHJ5Lmdlb21ldHJpZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICAgICAgZ2VvbWV0cnkuZ2VvbWV0cmllc1tqXSxcbiAgICAgICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgICAgZmVhdHVyZVByb3BlcnRpZXMsXG4gICAgICAgICAgICAgICAgZmVhdHVyZUJCb3gsXG4gICAgICAgICAgICAgICAgZmVhdHVyZUlkXG4gICAgICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIEdlb21ldHJ5IFR5cGVcIik7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIE9ubHkgaW5jcmVhc2UgYGZlYXR1cmVJbmRleGAgcGVyIGVhY2ggZmVhdHVyZVxuICAgIGZlYXR1cmVJbmRleCsrO1xuICB9XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGdlb21SZWR1Y2VcbiAqXG4gKiBUaGUgZmlyc3QgdGltZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGUgdmFsdWVzIHByb3ZpZGVkIGFzIGFyZ3VtZW50cyBkZXBlbmRcbiAqIG9uIHdoZXRoZXIgdGhlIHJlZHVjZSBtZXRob2QgaGFzIGFuIGluaXRpYWxWYWx1ZSBhcmd1bWVudC5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgcHJvdmlkZWQgdG8gdGhlIHJlZHVjZSBtZXRob2Q6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyBpbml0aWFsVmFsdWUuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgbm90IHByb3ZpZGVkOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIHNlY29uZCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIEBjYWxsYmFjayBnZW9tUmVkdWNlQ2FsbGJhY2tcbiAqIEBwYXJhbSB7Kn0gcHJldmlvdXNWYWx1ZSBUaGUgYWNjdW11bGF0ZWQgdmFsdWUgcHJldmlvdXNseSByZXR1cm5lZCBpbiB0aGUgbGFzdCBpbnZvY2F0aW9uXG4gKiBvZiB0aGUgY2FsbGJhY2ssIG9yIGluaXRpYWxWYWx1ZSwgaWYgc3VwcGxpZWQuXG4gKiBAcGFyYW0ge0dlb21ldHJ5fSBjdXJyZW50R2VvbWV0cnkgVGhlIGN1cnJlbnQgR2VvbWV0cnkgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gZmVhdHVyZVByb3BlcnRpZXMgVGhlIGN1cnJlbnQgRmVhdHVyZSBQcm9wZXJ0aWVzIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gZmVhdHVyZUJCb3ggVGhlIGN1cnJlbnQgRmVhdHVyZSBCQm94IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gZmVhdHVyZUlkIFRoZSBjdXJyZW50IEZlYXR1cmUgSWQgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogUmVkdWNlIGdlb21ldHJ5IGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5yZWR1Y2UoKS5cbiAqXG4gKiBAbmFtZSBnZW9tUmVkdWNlXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50R2VvbWV0cnksIGZlYXR1cmVJbmRleCwgZmVhdHVyZVByb3BlcnRpZXMsIGZlYXR1cmVCQm94LCBmZWF0dXJlSWQpXG4gKiBAcGFyYW0geyp9IFtpbml0aWFsVmFsdWVdIFZhbHVlIHRvIHVzZSBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIGZpcnN0IGNhbGwgb2YgdGhlIGNhbGxiYWNrLlxuICogQHJldHVybnMgeyp9IFRoZSB2YWx1ZSB0aGF0IHJlc3VsdHMgZnJvbSB0aGUgcmVkdWN0aW9uLlxuICogQGV4YW1wbGVcbiAqIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW1xuICogICAgIHR1cmYucG9pbnQoWzI2LCAzN10sIHtmb286ICdiYXInfSksXG4gKiAgICAgdHVyZi5wb2ludChbMzYsIDUzXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuZ2VvbVJlZHVjZShmZWF0dXJlcywgZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRHZW9tZXRyeSwgZmVhdHVyZUluZGV4LCBmZWF0dXJlUHJvcGVydGllcywgZmVhdHVyZUJCb3gsIGZlYXR1cmVJZCkge1xuICogICAvLz1wcmV2aW91c1ZhbHVlXG4gKiAgIC8vPWN1cnJlbnRHZW9tZXRyeVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgLy89ZmVhdHVyZVByb3BlcnRpZXNcbiAqICAgLy89ZmVhdHVyZUJCb3hcbiAqICAgLy89ZmVhdHVyZUlkXG4gKiAgIHJldHVybiBjdXJyZW50R2VvbWV0cnlcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBnZW9tUmVkdWNlKGdlb2pzb24sIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUpIHtcbiAgdmFyIHByZXZpb3VzVmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gIGdlb21FYWNoKFxuICAgIGdlb2pzb24sXG4gICAgZnVuY3Rpb24gKFxuICAgICAgY3VycmVudEdlb21ldHJ5LFxuICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgZmVhdHVyZVByb3BlcnRpZXMsXG4gICAgICBmZWF0dXJlQkJveCxcbiAgICAgIGZlYXR1cmVJZFxuICAgICkge1xuICAgICAgaWYgKGZlYXR1cmVJbmRleCA9PT0gMCAmJiBpbml0aWFsVmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGN1cnJlbnRHZW9tZXRyeTtcbiAgICAgIGVsc2VcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGNhbGxiYWNrKFxuICAgICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgICAgY3VycmVudEdlb21ldHJ5LFxuICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICBmZWF0dXJlUHJvcGVydGllcyxcbiAgICAgICAgICBmZWF0dXJlQkJveCxcbiAgICAgICAgICBmZWF0dXJlSWRcbiAgICAgICAgKTtcbiAgICB9XG4gICk7XG4gIHJldHVybiBwcmV2aW91c1ZhbHVlO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBmbGF0dGVuRWFjaFxuICpcbiAqIEBjYWxsYmFjayBmbGF0dGVuRWFjaENhbGxiYWNrXG4gKiBAcGFyYW0ge0ZlYXR1cmV9IGN1cnJlbnRGZWF0dXJlIFRoZSBjdXJyZW50IGZsYXR0ZW5lZCBmZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpRmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBNdWx0aS1GZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqL1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBmbGF0dGVuZWQgZmVhdHVyZXMgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvXG4gKiBBcnJheS5mb3JFYWNoLlxuICpcbiAqIEBuYW1lIGZsYXR0ZW5FYWNoXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleClcbiAqIEBleGFtcGxlXG4gKiB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtcbiAqICAgICB0dXJmLnBvaW50KFsyNiwgMzddLCB7Zm9vOiAnYmFyJ30pLFxuICogICAgIHR1cmYubXVsdGlQb2ludChbWzQwLCAzMF0sIFszNiwgNTNdXSwge2hlbGxvOiAnd29ybGQnfSlcbiAqIF0pO1xuICpcbiAqIHR1cmYuZmxhdHRlbkVhY2goZmVhdHVyZXMsIGZ1bmN0aW9uIChjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCkge1xuICogICAvLz1jdXJyZW50RmVhdHVyZVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgLy89bXVsdGlGZWF0dXJlSW5kZXhcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBmbGF0dGVuRWFjaChnZW9qc29uLCBjYWxsYmFjaykge1xuICBnZW9tRWFjaChnZW9qc29uLCBmdW5jdGlvbiAoZ2VvbWV0cnksIGZlYXR1cmVJbmRleCwgcHJvcGVydGllcywgYmJveCwgaWQpIHtcbiAgICAvLyBDYWxsYmFjayBmb3Igc2luZ2xlIGdlb21ldHJ5XG4gICAgdmFyIHR5cGUgPSBnZW9tZXRyeSA9PT0gbnVsbCA/IG51bGwgOiBnZW9tZXRyeS50eXBlO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBudWxsOlxuICAgICAgY2FzZSBcIlBvaW50XCI6XG4gICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgICAgZmVhdHVyZShnZW9tZXRyeSwgcHJvcGVydGllcywgeyBiYm94OiBiYm94LCBpZDogaWQgfSksXG4gICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAwXG4gICAgICAgICAgKSA9PT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBnZW9tVHlwZTtcblxuICAgIC8vIENhbGxiYWNrIGZvciBtdWx0aS1nZW9tZXRyeVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgICAgZ2VvbVR5cGUgPSBcIlBvaW50XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgICAgICBnZW9tVHlwZSA9IFwiTGluZVN0cmluZ1wiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgICAgZ2VvbVR5cGUgPSBcIlBvbHlnb25cIjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZm9yIChcbiAgICAgIHZhciBtdWx0aUZlYXR1cmVJbmRleCA9IDA7XG4gICAgICBtdWx0aUZlYXR1cmVJbmRleCA8IGdlb21ldHJ5LmNvb3JkaW5hdGVzLmxlbmd0aDtcbiAgICAgIG11bHRpRmVhdHVyZUluZGV4KytcbiAgICApIHtcbiAgICAgIHZhciBjb29yZGluYXRlID0gZ2VvbWV0cnkuY29vcmRpbmF0ZXNbbXVsdGlGZWF0dXJlSW5kZXhdO1xuICAgICAgdmFyIGdlb20gPSB7XG4gICAgICAgIHR5cGU6IGdlb21UeXBlLFxuICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZSxcbiAgICAgIH07XG4gICAgICBpZiAoXG4gICAgICAgIGNhbGxiYWNrKGZlYXR1cmUoZ2VvbSwgcHJvcGVydGllcyksIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgpID09PVxuICAgICAgICBmYWxzZVxuICAgICAgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgZmxhdHRlblJlZHVjZVxuICpcbiAqIFRoZSBmaXJzdCB0aW1lIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZSB2YWx1ZXMgcHJvdmlkZWQgYXMgYXJndW1lbnRzIGRlcGVuZFxuICogb24gd2hldGhlciB0aGUgcmVkdWNlIG1ldGhvZCBoYXMgYW4gaW5pdGlhbFZhbHVlIGFyZ3VtZW50LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBwcm92aWRlZCB0byB0aGUgcmVkdWNlIG1ldGhvZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIGluaXRpYWxWYWx1ZS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIElmIGFuIGluaXRpYWxWYWx1ZSBpcyBub3QgcHJvdmlkZWQ6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgc2Vjb25kIGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogQGNhbGxiYWNrIGZsYXR0ZW5SZWR1Y2VDYWxsYmFja1xuICogQHBhcmFtIHsqfSBwcmV2aW91c1ZhbHVlIFRoZSBhY2N1bXVsYXRlZCB2YWx1ZSBwcmV2aW91c2x5IHJldHVybmVkIGluIHRoZSBsYXN0IGludm9jYXRpb25cbiAqIG9mIHRoZSBjYWxsYmFjaywgb3IgaW5pdGlhbFZhbHVlLCBpZiBzdXBwbGllZC5cbiAqIEBwYXJhbSB7RmVhdHVyZX0gY3VycmVudEZlYXR1cmUgVGhlIGN1cnJlbnQgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aUZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgTXVsdGktRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKi9cblxuLyoqXG4gKiBSZWR1Y2UgZmxhdHRlbmVkIGZlYXR1cmVzIGluIGFueSBHZW9KU09OIG9iamVjdCwgc2ltaWxhciB0byBBcnJheS5yZWR1Y2UoKS5cbiAqXG4gKiBAbmFtZSBmbGF0dGVuUmVkdWNlXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT04gb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBhIG1ldGhvZCB0aGF0IHRha2VzIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleClcbiAqIEBwYXJhbSB7Kn0gW2luaXRpYWxWYWx1ZV0gVmFsdWUgdG8gdXNlIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgZmlyc3QgY2FsbCBvZiB0aGUgY2FsbGJhY2suXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHZhbHVlIHRoYXQgcmVzdWx0cyBmcm9tIHRoZSByZWR1Y3Rpb24uXG4gKiBAZXhhbXBsZVxuICogdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXG4gKiAgICAgdHVyZi5wb2ludChbMjYsIDM3XSwge2ZvbzogJ2Jhcid9KSxcbiAqICAgICB0dXJmLm11bHRpUG9pbnQoW1s0MCwgMzBdLCBbMzYsIDUzXV0sIHtoZWxsbzogJ3dvcmxkJ30pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmZsYXR0ZW5SZWR1Y2UoZmVhdHVyZXMsIGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50RmVhdHVyZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCkge1xuICogICAvLz1wcmV2aW91c1ZhbHVlXG4gKiAgIC8vPWN1cnJlbnRGZWF0dXJlXG4gKiAgIC8vPWZlYXR1cmVJbmRleFxuICogICAvLz1tdWx0aUZlYXR1cmVJbmRleFxuICogICByZXR1cm4gY3VycmVudEZlYXR1cmVcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBmbGF0dGVuUmVkdWNlKGdlb2pzb24sIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUpIHtcbiAgdmFyIHByZXZpb3VzVmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gIGZsYXR0ZW5FYWNoKFxuICAgIGdlb2pzb24sXG4gICAgZnVuY3Rpb24gKGN1cnJlbnRGZWF0dXJlLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4KSB7XG4gICAgICBpZiAoXG4gICAgICAgIGZlYXR1cmVJbmRleCA9PT0gMCAmJlxuICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCA9PT0gMCAmJlxuICAgICAgICBpbml0aWFsVmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgKVxuICAgICAgICBwcmV2aW91c1ZhbHVlID0gY3VycmVudEZlYXR1cmU7XG4gICAgICBlbHNlXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjYWxsYmFjayhcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlLFxuICAgICAgICAgIGN1cnJlbnRGZWF0dXJlLFxuICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleFxuICAgICAgICApO1xuICAgIH1cbiAgKTtcbiAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHNlZ21lbnRFYWNoXG4gKlxuICogQGNhbGxiYWNrIHNlZ21lbnRFYWNoQ2FsbGJhY2tcbiAqIEBwYXJhbSB7RmVhdHVyZTxMaW5lU3RyaW5nPn0gY3VycmVudFNlZ21lbnQgVGhlIGN1cnJlbnQgU2VnbWVudCBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZmVhdHVyZUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBGZWF0dXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aUZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgTXVsdGktRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZ2VvbWV0cnlJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgR2VvbWV0cnkgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IHNlZ21lbnRJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgU2VnbWVudCBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciAyLXZlcnRleCBsaW5lIHNlZ21lbnQgaW4gYW55IEdlb0pTT04gb2JqZWN0LCBzaW1pbGFyIHRvIEFycmF5LmZvckVhY2goKVxuICogKE11bHRpKVBvaW50IGdlb21ldHJpZXMgZG8gbm90IGNvbnRhaW4gc2VnbWVudHMgdGhlcmVmb3JlIHRoZXkgYXJlIGlnbm9yZWQgZHVyaW5nIHRoaXMgb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7RmVhdHVyZUNvbGxlY3Rpb258RmVhdHVyZXxHZW9tZXRyeX0gZ2VvanNvbiBhbnkgR2VvSlNPTlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBtZXRob2QgdGhhdCB0YWtlcyAoY3VycmVudFNlZ21lbnQsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgsIHNlZ21lbnRJbmRleClcbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIHZhciBwb2x5Z29uID0gdHVyZi5wb2x5Z29uKFtbWy01MCwgNV0sIFstNDAsIC0xMF0sIFstNTAsIC0xMF0sIFstNDAsIDVdLCBbLTUwLCA1XV1dKTtcbiAqXG4gKiAvLyBJdGVyYXRlIG92ZXIgR2VvSlNPTiBieSAyLXZlcnRleCBzZWdtZW50c1xuICogdHVyZi5zZWdtZW50RWFjaChwb2x5Z29uLCBmdW5jdGlvbiAoY3VycmVudFNlZ21lbnQsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgsIHNlZ21lbnRJbmRleCkge1xuICogICAvLz1jdXJyZW50U2VnbWVudFxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgLy89bXVsdGlGZWF0dXJlSW5kZXhcbiAqICAgLy89Z2VvbWV0cnlJbmRleFxuICogICAvLz1zZWdtZW50SW5kZXhcbiAqIH0pO1xuICpcbiAqIC8vIENhbGN1bGF0ZSB0aGUgdG90YWwgbnVtYmVyIG9mIHNlZ21lbnRzXG4gKiB2YXIgdG90YWwgPSAwO1xuICogdHVyZi5zZWdtZW50RWFjaChwb2x5Z29uLCBmdW5jdGlvbiAoKSB7XG4gKiAgICAgdG90YWwrKztcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBzZWdtZW50RWFjaChnZW9qc29uLCBjYWxsYmFjaykge1xuICBmbGF0dGVuRWFjaChnZW9qc29uLCBmdW5jdGlvbiAoZmVhdHVyZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCkge1xuICAgIHZhciBzZWdtZW50SW5kZXggPSAwO1xuXG4gICAgLy8gRXhjbHVkZSBudWxsIEdlb21ldHJpZXNcbiAgICBpZiAoIWZlYXR1cmUuZ2VvbWV0cnkpIHJldHVybjtcbiAgICAvLyAoTXVsdGkpUG9pbnQgZ2VvbWV0cmllcyBkbyBub3QgY29udGFpbiBzZWdtZW50cyB0aGVyZWZvcmUgdGhleSBhcmUgaWdub3JlZCBkdXJpbmcgdGhpcyBvcGVyYXRpb24uXG4gICAgdmFyIHR5cGUgPSBmZWF0dXJlLmdlb21ldHJ5LnR5cGU7XG4gICAgaWYgKHR5cGUgPT09IFwiUG9pbnRcIiB8fCB0eXBlID09PSBcIk11bHRpUG9pbnRcIikgcmV0dXJuO1xuXG4gICAgLy8gR2VuZXJhdGUgMi12ZXJ0ZXggbGluZSBzZWdtZW50c1xuICAgIHZhciBwcmV2aW91c0Nvb3JkcztcbiAgICB2YXIgcHJldmlvdXNGZWF0dXJlSW5kZXggPSAwO1xuICAgIHZhciBwcmV2aW91c011bHRpSW5kZXggPSAwO1xuICAgIHZhciBwcmV2R2VvbUluZGV4ID0gMDtcbiAgICBpZiAoXG4gICAgICBjb29yZEVhY2goXG4gICAgICAgIGZlYXR1cmUsXG4gICAgICAgIGZ1bmN0aW9uIChcbiAgICAgICAgICBjdXJyZW50Q29vcmQsXG4gICAgICAgICAgY29vcmRJbmRleCxcbiAgICAgICAgICBmZWF0dXJlSW5kZXhDb29yZCxcbiAgICAgICAgICBtdWx0aVBhcnRJbmRleENvb3JkLFxuICAgICAgICAgIGdlb21ldHJ5SW5kZXhcbiAgICAgICAgKSB7XG4gICAgICAgICAgLy8gU2ltdWxhdGluZyBhIG1ldGEuY29vcmRSZWR1Y2UoKSBzaW5jZSBgcmVkdWNlYCBvcGVyYXRpb25zIGNhbm5vdCBiZSBzdG9wcGVkIGJ5IHJldHVybmluZyBgZmFsc2VgXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgcHJldmlvdXNDb29yZHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgZmVhdHVyZUluZGV4ID4gcHJldmlvdXNGZWF0dXJlSW5kZXggfHxcbiAgICAgICAgICAgIG11bHRpUGFydEluZGV4Q29vcmQgPiBwcmV2aW91c011bHRpSW5kZXggfHxcbiAgICAgICAgICAgIGdlb21ldHJ5SW5kZXggPiBwcmV2R2VvbUluZGV4XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwcmV2aW91c0Nvb3JkcyA9IGN1cnJlbnRDb29yZDtcbiAgICAgICAgICAgIHByZXZpb3VzRmVhdHVyZUluZGV4ID0gZmVhdHVyZUluZGV4O1xuICAgICAgICAgICAgcHJldmlvdXNNdWx0aUluZGV4ID0gbXVsdGlQYXJ0SW5kZXhDb29yZDtcbiAgICAgICAgICAgIHByZXZHZW9tSW5kZXggPSBnZW9tZXRyeUluZGV4O1xuICAgICAgICAgICAgc2VnbWVudEluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGN1cnJlbnRTZWdtZW50ID0gbGluZVN0cmluZyhcbiAgICAgICAgICAgIFtwcmV2aW91c0Nvb3JkcywgY3VycmVudENvb3JkXSxcbiAgICAgICAgICAgIGZlYXR1cmUucHJvcGVydGllc1xuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICAgIGN1cnJlbnRTZWdtZW50LFxuICAgICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4LFxuICAgICAgICAgICAgICBzZWdtZW50SW5kZXhcbiAgICAgICAgICAgICkgPT09IGZhbHNlXG4gICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIHNlZ21lbnRJbmRleCsrO1xuICAgICAgICAgIHByZXZpb3VzQ29vcmRzID0gY3VycmVudENvb3JkO1xuICAgICAgICB9XG4gICAgICApID09PSBmYWxzZVxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHNlZ21lbnRSZWR1Y2VcbiAqXG4gKiBUaGUgZmlyc3QgdGltZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGUgdmFsdWVzIHByb3ZpZGVkIGFzIGFyZ3VtZW50cyBkZXBlbmRcbiAqIG9uIHdoZXRoZXIgdGhlIHJlZHVjZSBtZXRob2QgaGFzIGFuIGluaXRpYWxWYWx1ZSBhcmd1bWVudC5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgcHJvdmlkZWQgdG8gdGhlIHJlZHVjZSBtZXRob2Q6XG4gKiAgLSBUaGUgcHJldmlvdXNWYWx1ZSBhcmd1bWVudCBpcyBpbml0aWFsVmFsdWUuXG4gKiAgLSBUaGUgY3VycmVudFZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBJZiBhbiBpbml0aWFsVmFsdWUgaXMgbm90IHByb3ZpZGVkOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIHNlY29uZCBlbGVtZW50IHByZXNlbnQgaW4gdGhlIGFycmF5LlxuICpcbiAqIEBjYWxsYmFjayBzZWdtZW50UmVkdWNlQ2FsbGJhY2tcbiAqIEBwYXJhbSB7Kn0gcHJldmlvdXNWYWx1ZSBUaGUgYWNjdW11bGF0ZWQgdmFsdWUgcHJldmlvdXNseSByZXR1cm5lZCBpbiB0aGUgbGFzdCBpbnZvY2F0aW9uXG4gKiBvZiB0aGUgY2FsbGJhY2ssIG9yIGluaXRpYWxWYWx1ZSwgaWYgc3VwcGxpZWQuXG4gKiBAcGFyYW0ge0ZlYXR1cmU8TGluZVN0cmluZz59IGN1cnJlbnRTZWdtZW50IFRoZSBjdXJyZW50IFNlZ21lbnQgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlGZWF0dXJlSW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIE11bHRpLUZlYXR1cmUgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGdlb21ldHJ5SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIEdlb21ldHJ5IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWdtZW50SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggb2YgdGhlIFNlZ21lbnQgYmVpbmcgcHJvY2Vzc2VkLlxuICovXG5cbi8qKlxuICogUmVkdWNlIDItdmVydGV4IGxpbmUgc2VnbWVudCBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkucmVkdWNlKClcbiAqIChNdWx0aSlQb2ludCBnZW9tZXRyaWVzIGRvIG5vdCBjb250YWluIHNlZ21lbnRzIHRoZXJlZm9yZSB0aGV5IGFyZSBpZ25vcmVkIGR1cmluZyB0aGlzIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gYW55IEdlb0pTT05cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRTZWdtZW50LCBjdXJyZW50SW5kZXgpXG4gKiBAcGFyYW0geyp9IFtpbml0aWFsVmFsdWVdIFZhbHVlIHRvIHVzZSBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIGZpcnN0IGNhbGwgb2YgdGhlIGNhbGxiYWNrLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZXhhbXBsZVxuICogdmFyIHBvbHlnb24gPSB0dXJmLnBvbHlnb24oW1tbLTUwLCA1XSwgWy00MCwgLTEwXSwgWy01MCwgLTEwXSwgWy00MCwgNV0sIFstNTAsIDVdXV0pO1xuICpcbiAqIC8vIEl0ZXJhdGUgb3ZlciBHZW9KU09OIGJ5IDItdmVydGV4IHNlZ21lbnRzXG4gKiB0dXJmLnNlZ21lbnRSZWR1Y2UocG9seWdvbiwgZnVuY3Rpb24gKHByZXZpb3VzU2VnbWVudCwgY3VycmVudFNlZ21lbnQsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgsIHNlZ21lbnRJbmRleCkge1xuICogICAvLz0gcHJldmlvdXNTZWdtZW50XG4gKiAgIC8vPSBjdXJyZW50U2VnbWVudFxuICogICAvLz0gZmVhdHVyZUluZGV4XG4gKiAgIC8vPSBtdWx0aUZlYXR1cmVJbmRleFxuICogICAvLz0gZ2VvbWV0cnlJbmRleFxuICogICAvLz0gc2VnbWVudEluZGV4XG4gKiAgIHJldHVybiBjdXJyZW50U2VnbWVudFxuICogfSk7XG4gKlxuICogLy8gQ2FsY3VsYXRlIHRoZSB0b3RhbCBudW1iZXIgb2Ygc2VnbWVudHNcbiAqIHZhciBpbml0aWFsVmFsdWUgPSAwXG4gKiB2YXIgdG90YWwgPSB0dXJmLnNlZ21lbnRSZWR1Y2UocG9seWdvbiwgZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUpIHtcbiAqICAgICBwcmV2aW91c1ZhbHVlKys7XG4gKiAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG4gKiB9LCBpbml0aWFsVmFsdWUpO1xuICovXG5mdW5jdGlvbiBzZWdtZW50UmVkdWNlKGdlb2pzb24sIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUpIHtcbiAgdmFyIHByZXZpb3VzVmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gIHZhciBzdGFydGVkID0gZmFsc2U7XG4gIHNlZ21lbnRFYWNoKFxuICAgIGdlb2pzb24sXG4gICAgZnVuY3Rpb24gKFxuICAgICAgY3VycmVudFNlZ21lbnQsXG4gICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgIGdlb21ldHJ5SW5kZXgsXG4gICAgICBzZWdtZW50SW5kZXhcbiAgICApIHtcbiAgICAgIGlmIChzdGFydGVkID09PSBmYWxzZSAmJiBpbml0aWFsVmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcHJldmlvdXNWYWx1ZSA9IGN1cnJlbnRTZWdtZW50O1xuICAgICAgZWxzZVxuICAgICAgICBwcmV2aW91c1ZhbHVlID0gY2FsbGJhY2soXG4gICAgICAgICAgcHJldmlvdXNWYWx1ZSxcbiAgICAgICAgICBjdXJyZW50U2VnbWVudCxcbiAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXgsXG4gICAgICAgICAgZ2VvbWV0cnlJbmRleCxcbiAgICAgICAgICBzZWdtZW50SW5kZXhcbiAgICAgICAgKTtcbiAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgIH1cbiAgKTtcbiAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGxpbmVFYWNoXG4gKlxuICogQGNhbGxiYWNrIGxpbmVFYWNoQ2FsbGJhY2tcbiAqIEBwYXJhbSB7RmVhdHVyZTxMaW5lU3RyaW5nPn0gY3VycmVudExpbmUgVGhlIGN1cnJlbnQgTGluZVN0cmluZ3xMaW5lYXJSaW5nIGJlaW5nIHByb2Nlc3NlZFxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aUZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgTXVsdGktRmVhdHVyZSBiZWluZyBwcm9jZXNzZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBnZW9tZXRyeUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWRcbiAqL1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBsaW5lIG9yIHJpbmcgY29vcmRpbmF0ZXMgaW4gTGluZVN0cmluZywgUG9seWdvbiwgTXVsdGlMaW5lU3RyaW5nLCBNdWx0aVBvbHlnb24gRmVhdHVyZXMgb3IgR2VvbWV0cmllcyxcbiAqIHNpbWlsYXIgdG8gQXJyYXkuZm9yRWFjaC5cbiAqXG4gKiBAbmFtZSBsaW5lRWFjaFxuICogQHBhcmFtIHtHZW9tZXRyeXxGZWF0dXJlPExpbmVTdHJpbmd8UG9seWdvbnxNdWx0aUxpbmVTdHJpbmd8TXVsdGlQb2x5Z29uPn0gZ2VvanNvbiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKGN1cnJlbnRMaW5lLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KVxuICogQGV4YW1wbGVcbiAqIHZhciBtdWx0aUxpbmUgPSB0dXJmLm11bHRpTGluZVN0cmluZyhbXG4gKiAgIFtbMjYsIDM3XSwgWzM1LCA0NV1dLFxuICogICBbWzM2LCA1M10sIFszOCwgNTBdLCBbNDEsIDU1XV1cbiAqIF0pO1xuICpcbiAqIHR1cmYubGluZUVhY2gobXVsdGlMaW5lLCBmdW5jdGlvbiAoY3VycmVudExpbmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgpIHtcbiAqICAgLy89Y3VycmVudExpbmVcbiAqICAgLy89ZmVhdHVyZUluZGV4XG4gKiAgIC8vPW11bHRpRmVhdHVyZUluZGV4XG4gKiAgIC8vPWdlb21ldHJ5SW5kZXhcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBsaW5lRWFjaChnZW9qc29uLCBjYWxsYmFjaykge1xuICAvLyB2YWxpZGF0aW9uXG4gIGlmICghZ2VvanNvbikgdGhyb3cgbmV3IEVycm9yKFwiZ2VvanNvbiBpcyByZXF1aXJlZFwiKTtcblxuICBmbGF0dGVuRWFjaChnZW9qc29uLCBmdW5jdGlvbiAoZmVhdHVyZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCkge1xuICAgIGlmIChmZWF0dXJlLmdlb21ldHJ5ID09PSBudWxsKSByZXR1cm47XG4gICAgdmFyIHR5cGUgPSBmZWF0dXJlLmdlb21ldHJ5LnR5cGU7XG4gICAgdmFyIGNvb3JkcyA9IGZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOlxuICAgICAgICBpZiAoY2FsbGJhY2soZmVhdHVyZSwgZmVhdHVyZUluZGV4LCBtdWx0aUZlYXR1cmVJbmRleCwgMCwgMCkgPT09IGZhbHNlKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgICBmb3IgKFxuICAgICAgICAgIHZhciBnZW9tZXRyeUluZGV4ID0gMDtcbiAgICAgICAgICBnZW9tZXRyeUluZGV4IDwgY29vcmRzLmxlbmd0aDtcbiAgICAgICAgICBnZW9tZXRyeUluZGV4KytcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgICAgIGxpbmVTdHJpbmcoY29vcmRzW2dlb21ldHJ5SW5kZXhdLCBmZWF0dXJlLnByb3BlcnRpZXMpLFxuICAgICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICAgIG11bHRpRmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICAgICApID09PSBmYWxzZVxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciBsaW5lUmVkdWNlXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHZhbHVlcyBwcm92aWRlZCBhcyBhcmd1bWVudHMgZGVwZW5kXG4gKiBvbiB3aGV0aGVyIHRoZSByZWR1Y2UgbWV0aG9kIGhhcyBhbiBpbml0aWFsVmFsdWUgYXJndW1lbnQuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIHByb3ZpZGVkIHRvIHRoZSByZWR1Y2UgbWV0aG9kOlxuICogIC0gVGhlIHByZXZpb3VzVmFsdWUgYXJndW1lbnQgaXMgaW5pdGlhbFZhbHVlLlxuICogIC0gVGhlIGN1cnJlbnRWYWx1ZSBhcmd1bWVudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGVsZW1lbnQgcHJlc2VudCBpbiB0aGUgYXJyYXkuXG4gKlxuICogSWYgYW4gaW5pdGlhbFZhbHVlIGlzIG5vdCBwcm92aWRlZDpcbiAqICAtIFRoZSBwcmV2aW91c1ZhbHVlIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqICAtIFRoZSBjdXJyZW50VmFsdWUgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBwcmVzZW50IGluIHRoZSBhcnJheS5cbiAqXG4gKiBAY2FsbGJhY2sgbGluZVJlZHVjZUNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IHByZXZpb3VzVmFsdWUgVGhlIGFjY3VtdWxhdGVkIHZhbHVlIHByZXZpb3VzbHkgcmV0dXJuZWQgaW4gdGhlIGxhc3QgaW52b2NhdGlvblxuICogb2YgdGhlIGNhbGxiYWNrLCBvciBpbml0aWFsVmFsdWUsIGlmIHN1cHBsaWVkLlxuICogQHBhcmFtIHtGZWF0dXJlPExpbmVTdHJpbmc+fSBjdXJyZW50TGluZSBUaGUgY3VycmVudCBMaW5lU3RyaW5nfExpbmVhclJpbmcgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtudW1iZXJ9IGZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgRmVhdHVyZSBiZWluZyBwcm9jZXNzZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aUZlYXR1cmVJbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgTXVsdGktRmVhdHVyZSBiZWluZyBwcm9jZXNzZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBnZW9tZXRyeUluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBHZW9tZXRyeSBiZWluZyBwcm9jZXNzZWRcbiAqL1xuXG4vKipcbiAqIFJlZHVjZSBmZWF0dXJlcyBpbiBhbnkgR2VvSlNPTiBvYmplY3QsIHNpbWlsYXIgdG8gQXJyYXkucmVkdWNlKCkuXG4gKlxuICogQG5hbWUgbGluZVJlZHVjZVxuICogQHBhcmFtIHtHZW9tZXRyeXxGZWF0dXJlPExpbmVTdHJpbmd8UG9seWdvbnxNdWx0aUxpbmVTdHJpbmd8TXVsdGlQb2x5Z29uPn0gZ2VvanNvbiBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgbWV0aG9kIHRoYXQgdGFrZXMgKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRMaW5lLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KVxuICogQHBhcmFtIHsqfSBbaW5pdGlhbFZhbHVlXSBWYWx1ZSB0byB1c2UgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBmaXJzdCBjYWxsIG9mIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm5zIHsqfSBUaGUgdmFsdWUgdGhhdCByZXN1bHRzIGZyb20gdGhlIHJlZHVjdGlvbi5cbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlQb2x5ID0gdHVyZi5tdWx0aVBvbHlnb24oW1xuICogICB0dXJmLnBvbHlnb24oW1tbMTIsNDhdLFsyLDQxXSxbMjQsMzhdLFsxMiw0OF1dLCBbWzksNDRdLFsxMyw0MV0sWzEzLDQ1XSxbOSw0NF1dXSksXG4gKiAgIHR1cmYucG9seWdvbihbW1s1LCA1XSwgWzAsIDBdLCBbMiwgMl0sIFs0LCA0XSwgWzUsIDVdXV0pXG4gKiBdKTtcbiAqXG4gKiB0dXJmLmxpbmVSZWR1Y2UobXVsdGlQb2x5LCBmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudExpbmUsIGZlYXR1cmVJbmRleCwgbXVsdGlGZWF0dXJlSW5kZXgsIGdlb21ldHJ5SW5kZXgpIHtcbiAqICAgLy89cHJldmlvdXNWYWx1ZVxuICogICAvLz1jdXJyZW50TGluZVxuICogICAvLz1mZWF0dXJlSW5kZXhcbiAqICAgLy89bXVsdGlGZWF0dXJlSW5kZXhcbiAqICAgLy89Z2VvbWV0cnlJbmRleFxuICogICByZXR1cm4gY3VycmVudExpbmVcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBsaW5lUmVkdWNlKGdlb2pzb24sIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUpIHtcbiAgdmFyIHByZXZpb3VzVmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gIGxpbmVFYWNoKFxuICAgIGdlb2pzb24sXG4gICAgZnVuY3Rpb24gKGN1cnJlbnRMaW5lLCBmZWF0dXJlSW5kZXgsIG11bHRpRmVhdHVyZUluZGV4LCBnZW9tZXRyeUluZGV4KSB7XG4gICAgICBpZiAoZmVhdHVyZUluZGV4ID09PSAwICYmIGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBwcmV2aW91c1ZhbHVlID0gY3VycmVudExpbmU7XG4gICAgICBlbHNlXG4gICAgICAgIHByZXZpb3VzVmFsdWUgPSBjYWxsYmFjayhcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlLFxuICAgICAgICAgIGN1cnJlbnRMaW5lLFxuICAgICAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCxcbiAgICAgICAgICBnZW9tZXRyeUluZGV4XG4gICAgICAgICk7XG4gICAgfVxuICApO1xuICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbn1cblxuLyoqXG4gKiBGaW5kcyBhIHBhcnRpY3VsYXIgMi12ZXJ0ZXggTGluZVN0cmluZyBTZWdtZW50IGZyb20gYSBHZW9KU09OIHVzaW5nIGBAdHVyZi9tZXRhYCBpbmRleGVzLlxuICpcbiAqIE5lZ2F0aXZlIGluZGV4ZXMgYXJlIHBlcm1pdHRlZC5cbiAqIFBvaW50ICYgTXVsdGlQb2ludCB3aWxsIGFsd2F5cyByZXR1cm4gbnVsbC5cbiAqXG4gKiBAcGFyYW0ge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmV8R2VvbWV0cnl9IGdlb2pzb24gQW55IEdlb0pTT04gRmVhdHVyZSBvciBHZW9tZXRyeVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZmVhdHVyZUluZGV4PTBdIEZlYXR1cmUgSW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tdWx0aUZlYXR1cmVJbmRleD0wXSBNdWx0aS1GZWF0dXJlIEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZ2VvbWV0cnlJbmRleD0wXSBHZW9tZXRyeSBJbmRleFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnNlZ21lbnRJbmRleD0wXSBTZWdtZW50IEluZGV4XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMucHJvcGVydGllcz17fV0gVHJhbnNsYXRlIFByb3BlcnRpZXMgdG8gb3V0cHV0IExpbmVTdHJpbmdcbiAqIEBwYXJhbSB7QkJveH0gW29wdGlvbnMuYmJveD17fV0gVHJhbnNsYXRlIEJCb3ggdG8gb3V0cHV0IExpbmVTdHJpbmdcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gW29wdGlvbnMuaWQ9e31dIFRyYW5zbGF0ZSBJZCB0byBvdXRwdXQgTGluZVN0cmluZ1xuICogQHJldHVybnMge0ZlYXR1cmU8TGluZVN0cmluZz59IDItdmVydGV4IEdlb0pTT04gRmVhdHVyZSBMaW5lU3RyaW5nXG4gKiBAZXhhbXBsZVxuICogdmFyIG11bHRpTGluZSA9IHR1cmYubXVsdGlMaW5lU3RyaW5nKFtcbiAqICAgICBbWzEwLCAxMF0sIFs1MCwgMzBdLCBbMzAsIDQwXV0sXG4gKiAgICAgW1stMTAsIC0xMF0sIFstNTAsIC0zMF0sIFstMzAsIC00MF1dXG4gKiBdKTtcbiAqXG4gKiAvLyBGaXJzdCBTZWdtZW50IChkZWZhdWx0cyBhcmUgMClcbiAqIHR1cmYuZmluZFNlZ21lbnQobXVsdGlMaW5lKTtcbiAqIC8vID0+IEZlYXR1cmU8TGluZVN0cmluZzxbWzEwLCAxMF0sIFs1MCwgMzBdXT4+XG4gKlxuICogLy8gRmlyc3QgU2VnbWVudCBvZiAybmQgTXVsdGkgRmVhdHVyZVxuICogdHVyZi5maW5kU2VnbWVudChtdWx0aUxpbmUsIHttdWx0aUZlYXR1cmVJbmRleDogMX0pO1xuICogLy8gPT4gRmVhdHVyZTxMaW5lU3RyaW5nPFtbLTEwLCAtMTBdLCBbLTUwLCAtMzBdXT4+XG4gKlxuICogLy8gTGFzdCBTZWdtZW50IG9mIExhc3QgTXVsdGkgRmVhdHVyZVxuICogdHVyZi5maW5kU2VnbWVudChtdWx0aUxpbmUsIHttdWx0aUZlYXR1cmVJbmRleDogLTEsIHNlZ21lbnRJbmRleDogLTF9KTtcbiAqIC8vID0+IEZlYXR1cmU8TGluZVN0cmluZzxbWy01MCwgLTMwXSwgWy0zMCwgLTQwXV0+PlxuICovXG5mdW5jdGlvbiBmaW5kU2VnbWVudChnZW9qc29uLCBvcHRpb25zKSB7XG4gIC8vIE9wdGlvbmFsIFBhcmFtZXRlcnNcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGlmICghaXNPYmplY3Qob3B0aW9ucykpIHRocm93IG5ldyBFcnJvcihcIm9wdGlvbnMgaXMgaW52YWxpZFwiKTtcbiAgdmFyIGZlYXR1cmVJbmRleCA9IG9wdGlvbnMuZmVhdHVyZUluZGV4IHx8IDA7XG4gIHZhciBtdWx0aUZlYXR1cmVJbmRleCA9IG9wdGlvbnMubXVsdGlGZWF0dXJlSW5kZXggfHwgMDtcbiAgdmFyIGdlb21ldHJ5SW5kZXggPSBvcHRpb25zLmdlb21ldHJ5SW5kZXggfHwgMDtcbiAgdmFyIHNlZ21lbnRJbmRleCA9IG9wdGlvbnMuc2VnbWVudEluZGV4IHx8IDA7XG5cbiAgLy8gRmluZCBGZWF0dXJlSW5kZXhcbiAgdmFyIHByb3BlcnRpZXMgPSBvcHRpb25zLnByb3BlcnRpZXM7XG4gIHZhciBnZW9tZXRyeTtcblxuICBzd2l0Y2ggKGdlb2pzb24udHlwZSkge1xuICAgIGNhc2UgXCJGZWF0dXJlQ29sbGVjdGlvblwiOlxuICAgICAgaWYgKGZlYXR1cmVJbmRleCA8IDApXG4gICAgICAgIGZlYXR1cmVJbmRleCA9IGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoICsgZmVhdHVyZUluZGV4O1xuICAgICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwgZ2VvanNvbi5mZWF0dXJlc1tmZWF0dXJlSW5kZXhdLnByb3BlcnRpZXM7XG4gICAgICBnZW9tZXRyeSA9IGdlb2pzb24uZmVhdHVyZXNbZmVhdHVyZUluZGV4XS5nZW9tZXRyeTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJGZWF0dXJlXCI6XG4gICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCBnZW9qc29uLnByb3BlcnRpZXM7XG4gICAgICBnZW9tZXRyeSA9IGdlb2pzb24uZ2VvbWV0cnk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICBjYXNlIFwiTXVsdGlQb2ludFwiOlxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgIGNhc2UgXCJNdWx0aUxpbmVTdHJpbmdcIjpcbiAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6XG4gICAgICBnZW9tZXRyeSA9IGdlb2pzb247XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2VvanNvbiBpcyBpbnZhbGlkXCIpO1xuICB9XG5cbiAgLy8gRmluZCBTZWdtZW50SW5kZXhcbiAgaWYgKGdlb21ldHJ5ID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgdmFyIGNvb3JkcyA9IGdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICBzd2l0Y2ggKGdlb21ldHJ5LnR5cGUpIHtcbiAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICBjYXNlIFwiTXVsdGlQb2ludFwiOlxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICAgIGlmIChzZWdtZW50SW5kZXggPCAwKSBzZWdtZW50SW5kZXggPSBjb29yZHMubGVuZ3RoICsgc2VnbWVudEluZGV4IC0gMTtcbiAgICAgIHJldHVybiBsaW5lU3RyaW5nKFxuICAgICAgICBbY29vcmRzW3NlZ21lbnRJbmRleF0sIGNvb3Jkc1tzZWdtZW50SW5kZXggKyAxXV0sXG4gICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gICAgY2FzZSBcIlBvbHlnb25cIjpcbiAgICAgIGlmIChnZW9tZXRyeUluZGV4IDwgMCkgZ2VvbWV0cnlJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBnZW9tZXRyeUluZGV4O1xuICAgICAgaWYgKHNlZ21lbnRJbmRleCA8IDApXG4gICAgICAgIHNlZ21lbnRJbmRleCA9IGNvb3Jkc1tnZW9tZXRyeUluZGV4XS5sZW5ndGggKyBzZWdtZW50SW5kZXggLSAxO1xuICAgICAgcmV0dXJuIGxpbmVTdHJpbmcoXG4gICAgICAgIFtcbiAgICAgICAgICBjb29yZHNbZ2VvbWV0cnlJbmRleF1bc2VnbWVudEluZGV4XSxcbiAgICAgICAgICBjb29yZHNbZ2VvbWV0cnlJbmRleF1bc2VnbWVudEluZGV4ICsgMV0sXG4gICAgICAgIF0sXG4gICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgICAgaWYgKG11bHRpRmVhdHVyZUluZGV4IDwgMClcbiAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXggPSBjb29yZHMubGVuZ3RoICsgbXVsdGlGZWF0dXJlSW5kZXg7XG4gICAgICBpZiAoc2VnbWVudEluZGV4IDwgMClcbiAgICAgICAgc2VnbWVudEluZGV4ID0gY29vcmRzW211bHRpRmVhdHVyZUluZGV4XS5sZW5ndGggKyBzZWdtZW50SW5kZXggLSAxO1xuICAgICAgcmV0dXJuIGxpbmVTdHJpbmcoXG4gICAgICAgIFtcbiAgICAgICAgICBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdW3NlZ21lbnRJbmRleF0sXG4gICAgICAgICAgY29vcmRzW211bHRpRmVhdHVyZUluZGV4XVtzZWdtZW50SW5kZXggKyAxXSxcbiAgICAgICAgXSxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKTtcbiAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6XG4gICAgICBpZiAobXVsdGlGZWF0dXJlSW5kZXggPCAwKVxuICAgICAgICBtdWx0aUZlYXR1cmVJbmRleCA9IGNvb3Jkcy5sZW5ndGggKyBtdWx0aUZlYXR1cmVJbmRleDtcbiAgICAgIGlmIChnZW9tZXRyeUluZGV4IDwgMClcbiAgICAgICAgZ2VvbWV0cnlJbmRleCA9IGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF0ubGVuZ3RoICsgZ2VvbWV0cnlJbmRleDtcbiAgICAgIGlmIChzZWdtZW50SW5kZXggPCAwKVxuICAgICAgICBzZWdtZW50SW5kZXggPVxuICAgICAgICAgIGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bZ2VvbWV0cnlJbmRleF0ubGVuZ3RoIC0gc2VnbWVudEluZGV4IC0gMTtcbiAgICAgIHJldHVybiBsaW5lU3RyaW5nKFxuICAgICAgICBbXG4gICAgICAgICAgY29vcmRzW211bHRpRmVhdHVyZUluZGV4XVtnZW9tZXRyeUluZGV4XVtzZWdtZW50SW5kZXhdLFxuICAgICAgICAgIGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bZ2VvbWV0cnlJbmRleF1bc2VnbWVudEluZGV4ICsgMV0sXG4gICAgICAgIF0sXG4gICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFwiZ2VvanNvbiBpcyBpbnZhbGlkXCIpO1xufVxuXG4vKipcbiAqIEZpbmRzIGEgcGFydGljdWxhciBQb2ludCBmcm9tIGEgR2VvSlNPTiB1c2luZyBgQHR1cmYvbWV0YWAgaW5kZXhlcy5cbiAqXG4gKiBOZWdhdGl2ZSBpbmRleGVzIGFyZSBwZXJtaXR0ZWQuXG4gKlxuICogQHBhcmFtIHtGZWF0dXJlQ29sbGVjdGlvbnxGZWF0dXJlfEdlb21ldHJ5fSBnZW9qc29uIEFueSBHZW9KU09OIEZlYXR1cmUgb3IgR2VvbWV0cnlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmZlYXR1cmVJbmRleD0wXSBGZWF0dXJlIEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubXVsdGlGZWF0dXJlSW5kZXg9MF0gTXVsdGktRmVhdHVyZSBJbmRleFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmdlb21ldHJ5SW5kZXg9MF0gR2VvbWV0cnkgSW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5jb29yZEluZGV4PTBdIENvb3JkIEluZGV4XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMucHJvcGVydGllcz17fV0gVHJhbnNsYXRlIFByb3BlcnRpZXMgdG8gb3V0cHV0IFBvaW50XG4gKiBAcGFyYW0ge0JCb3h9IFtvcHRpb25zLmJib3g9e31dIFRyYW5zbGF0ZSBCQm94IHRvIG91dHB1dCBQb2ludFxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBbb3B0aW9ucy5pZD17fV0gVHJhbnNsYXRlIElkIHRvIG91dHB1dCBQb2ludFxuICogQHJldHVybnMge0ZlYXR1cmU8UG9pbnQ+fSAyLXZlcnRleCBHZW9KU09OIEZlYXR1cmUgUG9pbnRcbiAqIEBleGFtcGxlXG4gKiB2YXIgbXVsdGlMaW5lID0gdHVyZi5tdWx0aUxpbmVTdHJpbmcoW1xuICogICAgIFtbMTAsIDEwXSwgWzUwLCAzMF0sIFszMCwgNDBdXSxcbiAqICAgICBbWy0xMCwgLTEwXSwgWy01MCwgLTMwXSwgWy0zMCwgLTQwXV1cbiAqIF0pO1xuICpcbiAqIC8vIEZpcnN0IFNlZ21lbnQgKGRlZmF1bHRzIGFyZSAwKVxuICogdHVyZi5maW5kUG9pbnQobXVsdGlMaW5lKTtcbiAqIC8vID0+IEZlYXR1cmU8UG9pbnQ8WzEwLCAxMF0+PlxuICpcbiAqIC8vIEZpcnN0IFNlZ21lbnQgb2YgdGhlIDJuZCBNdWx0aS1GZWF0dXJlXG4gKiB0dXJmLmZpbmRQb2ludChtdWx0aUxpbmUsIHttdWx0aUZlYXR1cmVJbmRleDogMX0pO1xuICogLy8gPT4gRmVhdHVyZTxQb2ludDxbLTEwLCAtMTBdPj5cbiAqXG4gKiAvLyBMYXN0IFNlZ21lbnQgb2YgbGFzdCBNdWx0aS1GZWF0dXJlXG4gKiB0dXJmLmZpbmRQb2ludChtdWx0aUxpbmUsIHttdWx0aUZlYXR1cmVJbmRleDogLTEsIGNvb3JkSW5kZXg6IC0xfSk7XG4gKiAvLyA9PiBGZWF0dXJlPFBvaW50PFstMzAsIC00MF0+PlxuICovXG5mdW5jdGlvbiBmaW5kUG9pbnQoZ2VvanNvbiwgb3B0aW9ucykge1xuICAvLyBPcHRpb25hbCBQYXJhbWV0ZXJzXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBpZiAoIWlzT2JqZWN0KG9wdGlvbnMpKSB0aHJvdyBuZXcgRXJyb3IoXCJvcHRpb25zIGlzIGludmFsaWRcIik7XG4gIHZhciBmZWF0dXJlSW5kZXggPSBvcHRpb25zLmZlYXR1cmVJbmRleCB8fCAwO1xuICB2YXIgbXVsdGlGZWF0dXJlSW5kZXggPSBvcHRpb25zLm11bHRpRmVhdHVyZUluZGV4IHx8IDA7XG4gIHZhciBnZW9tZXRyeUluZGV4ID0gb3B0aW9ucy5nZW9tZXRyeUluZGV4IHx8IDA7XG4gIHZhciBjb29yZEluZGV4ID0gb3B0aW9ucy5jb29yZEluZGV4IHx8IDA7XG5cbiAgLy8gRmluZCBGZWF0dXJlSW5kZXhcbiAgdmFyIHByb3BlcnRpZXMgPSBvcHRpb25zLnByb3BlcnRpZXM7XG4gIHZhciBnZW9tZXRyeTtcblxuICBzd2l0Y2ggKGdlb2pzb24udHlwZSkge1xuICAgIGNhc2UgXCJGZWF0dXJlQ29sbGVjdGlvblwiOlxuICAgICAgaWYgKGZlYXR1cmVJbmRleCA8IDApXG4gICAgICAgIGZlYXR1cmVJbmRleCA9IGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoICsgZmVhdHVyZUluZGV4O1xuICAgICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwgZ2VvanNvbi5mZWF0dXJlc1tmZWF0dXJlSW5kZXhdLnByb3BlcnRpZXM7XG4gICAgICBnZW9tZXRyeSA9IGdlb2pzb24uZmVhdHVyZXNbZmVhdHVyZUluZGV4XS5nZW9tZXRyeTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJGZWF0dXJlXCI6XG4gICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCBnZW9qc29uLnByb3BlcnRpZXM7XG4gICAgICBnZW9tZXRyeSA9IGdlb2pzb24uZ2VvbWV0cnk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiUG9pbnRcIjpcbiAgICBjYXNlIFwiTXVsdGlQb2ludFwiOlxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgY2FzZSBcIkxpbmVTdHJpbmdcIjpcbiAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgIGNhc2UgXCJNdWx0aUxpbmVTdHJpbmdcIjpcbiAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6XG4gICAgICBnZW9tZXRyeSA9IGdlb2pzb247XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2VvanNvbiBpcyBpbnZhbGlkXCIpO1xuICB9XG5cbiAgLy8gRmluZCBDb29yZCBJbmRleFxuICBpZiAoZ2VvbWV0cnkgPT09IG51bGwpIHJldHVybiBudWxsO1xuICB2YXIgY29vcmRzID0gZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gIHN3aXRjaCAoZ2VvbWV0cnkudHlwZSkge1xuICAgIGNhc2UgXCJQb2ludFwiOlxuICAgICAgcmV0dXJuIHBvaW50KGNvb3JkcywgcHJvcGVydGllcywgb3B0aW9ucyk7XG4gICAgY2FzZSBcIk11bHRpUG9pbnRcIjpcbiAgICAgIGlmIChtdWx0aUZlYXR1cmVJbmRleCA8IDApXG4gICAgICAgIG11bHRpRmVhdHVyZUluZGV4ID0gY29vcmRzLmxlbmd0aCArIG11bHRpRmVhdHVyZUluZGV4O1xuICAgICAgcmV0dXJuIHBvaW50KGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF0sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJMaW5lU3RyaW5nXCI6XG4gICAgICBpZiAoY29vcmRJbmRleCA8IDApIGNvb3JkSW5kZXggPSBjb29yZHMubGVuZ3RoICsgY29vcmRJbmRleDtcbiAgICAgIHJldHVybiBwb2ludChjb29yZHNbY29vcmRJbmRleF0sIHByb3BlcnRpZXMsIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJQb2x5Z29uXCI6XG4gICAgICBpZiAoZ2VvbWV0cnlJbmRleCA8IDApIGdlb21ldHJ5SW5kZXggPSBjb29yZHMubGVuZ3RoICsgZ2VvbWV0cnlJbmRleDtcbiAgICAgIGlmIChjb29yZEluZGV4IDwgMClcbiAgICAgICAgY29vcmRJbmRleCA9IGNvb3Jkc1tnZW9tZXRyeUluZGV4XS5sZW5ndGggKyBjb29yZEluZGV4O1xuICAgICAgcmV0dXJuIHBvaW50KGNvb3Jkc1tnZW9tZXRyeUluZGV4XVtjb29yZEluZGV4XSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG4gICAgY2FzZSBcIk11bHRpTGluZVN0cmluZ1wiOlxuICAgICAgaWYgKG11bHRpRmVhdHVyZUluZGV4IDwgMClcbiAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXggPSBjb29yZHMubGVuZ3RoICsgbXVsdGlGZWF0dXJlSW5kZXg7XG4gICAgICBpZiAoY29vcmRJbmRleCA8IDApXG4gICAgICAgIGNvb3JkSW5kZXggPSBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdLmxlbmd0aCArIGNvb3JkSW5kZXg7XG4gICAgICByZXR1cm4gcG9pbnQoY29vcmRzW211bHRpRmVhdHVyZUluZGV4XVtjb29yZEluZGV4XSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG4gICAgY2FzZSBcIk11bHRpUG9seWdvblwiOlxuICAgICAgaWYgKG11bHRpRmVhdHVyZUluZGV4IDwgMClcbiAgICAgICAgbXVsdGlGZWF0dXJlSW5kZXggPSBjb29yZHMubGVuZ3RoICsgbXVsdGlGZWF0dXJlSW5kZXg7XG4gICAgICBpZiAoZ2VvbWV0cnlJbmRleCA8IDApXG4gICAgICAgIGdlb21ldHJ5SW5kZXggPSBjb29yZHNbbXVsdGlGZWF0dXJlSW5kZXhdLmxlbmd0aCArIGdlb21ldHJ5SW5kZXg7XG4gICAgICBpZiAoY29vcmRJbmRleCA8IDApXG4gICAgICAgIGNvb3JkSW5kZXggPVxuICAgICAgICAgIGNvb3Jkc1ttdWx0aUZlYXR1cmVJbmRleF1bZ2VvbWV0cnlJbmRleF0ubGVuZ3RoIC0gY29vcmRJbmRleDtcbiAgICAgIHJldHVybiBwb2ludChcbiAgICAgICAgY29vcmRzW211bHRpRmVhdHVyZUluZGV4XVtnZW9tZXRyeUluZGV4XVtjb29yZEluZGV4XSxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXCJnZW9qc29uIGlzIGludmFsaWRcIik7XG59XG5cbmV4cG9ydCB7IGNvb3JkQWxsLCBjb29yZEVhY2gsIGNvb3JkUmVkdWNlLCBmZWF0dXJlRWFjaCwgZmVhdHVyZVJlZHVjZSwgZmluZFBvaW50LCBmaW5kU2VnbWVudCwgZmxhdHRlbkVhY2gsIGZsYXR0ZW5SZWR1Y2UsIGdlb21FYWNoLCBnZW9tUmVkdWNlLCBsaW5lRWFjaCwgbGluZVJlZHVjZSwgcHJvcEVhY2gsIHByb3BSZWR1Y2UsIHNlZ21lbnRFYWNoLCBzZWdtZW50UmVkdWNlIH07XG4iLCJpbXBvcnQgeyBmZWF0dXJlQ29sbGVjdGlvbiwgbGluZVN0cmluZywgbXVsdGlMaW5lU3RyaW5nIH0gZnJvbSBcIkB0dXJmL2hlbHBlcnNcIjtcbmltcG9ydCB7IGdldEdlb20gfSBmcm9tIFwiQHR1cmYvaW52YXJpYW50XCI7XG4vKipcbiAqIENvbnZlcnRzIGEge0BsaW5rIFBvbHlnb259IHRvIHtAbGluayBMaW5lU3RyaW5nfChNdWx0aSlMaW5lU3RyaW5nfSBvciB7QGxpbmsgTXVsdGlQb2x5Z29ufSB0byBhXG4gKiB7QGxpbmsgRmVhdHVyZUNvbGxlY3Rpb259IG9mIHtAbGluayBMaW5lU3RyaW5nfChNdWx0aSlMaW5lU3RyaW5nfS5cbiAqXG4gKiBAbmFtZSBwb2x5Z29uVG9MaW5lXG4gKiBAcGFyYW0ge0ZlYXR1cmU8UG9seWdvbnxNdWx0aVBvbHlnb24+fSBwb2x5IEZlYXR1cmUgdG8gY29udmVydFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMucHJvcGVydGllcz17fV0gdHJhbnNsYXRlcyBHZW9KU09OIHByb3BlcnRpZXMgdG8gRmVhdHVyZVxuICogQHJldHVybnMge0ZlYXR1cmVDb2xsZWN0aW9ufEZlYXR1cmU8TGluZVN0cmluZ3xNdWx0aUxpbmVzdHJpbmc+fSBjb252ZXJ0ZWQgKE11bHRpKVBvbHlnb24gdG8gKE11bHRpKUxpbmVTdHJpbmdcbiAqIEBleGFtcGxlXG4gKiB2YXIgcG9seSA9IHR1cmYucG9seWdvbihbW1sxMjUsIC0zMF0sIFsxNDUsIC0zMF0sIFsxNDUsIC0yMF0sIFsxMjUsIC0yMF0sIFsxMjUsIC0zMF1dXSk7XG4gKlxuICogdmFyIGxpbmUgPSB0dXJmLnBvbHlnb25Ub0xpbmUocG9seSk7XG4gKlxuICogLy9hZGRUb01hcFxuICogdmFyIGFkZFRvTWFwID0gW2xpbmVdO1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocG9seSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIGdlb20gPSBnZXRHZW9tKHBvbHkpO1xuICAgIGlmICghb3B0aW9ucy5wcm9wZXJ0aWVzICYmIHBvbHkudHlwZSA9PT0gXCJGZWF0dXJlXCIpIHtcbiAgICAgICAgb3B0aW9ucy5wcm9wZXJ0aWVzID0gcG9seS5wcm9wZXJ0aWVzO1xuICAgIH1cbiAgICBzd2l0Y2ggKGdlb20udHlwZSkge1xuICAgICAgICBjYXNlIFwiUG9seWdvblwiOlxuICAgICAgICAgICAgcmV0dXJuIHBvbHlnb25Ub0xpbmUoZ2VvbSwgb3B0aW9ucyk7XG4gICAgICAgIGNhc2UgXCJNdWx0aVBvbHlnb25cIjpcbiAgICAgICAgICAgIHJldHVybiBtdWx0aVBvbHlnb25Ub0xpbmUoZ2VvbSwgb3B0aW9ucyk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIHBvbHlcIik7XG4gICAgfVxufVxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcG9seWdvblRvTGluZShwb2x5LCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZ2VvbSA9IGdldEdlb20ocG9seSk7XG4gICAgdmFyIGNvb3JkcyA9IGdlb20uY29vcmRpbmF0ZXM7XG4gICAgdmFyIHByb3BlcnRpZXMgPSBvcHRpb25zLnByb3BlcnRpZXNcbiAgICAgICAgPyBvcHRpb25zLnByb3BlcnRpZXNcbiAgICAgICAgOiBwb2x5LnR5cGUgPT09IFwiRmVhdHVyZVwiXG4gICAgICAgICAgICA/IHBvbHkucHJvcGVydGllc1xuICAgICAgICAgICAgOiB7fTtcbiAgICByZXR1cm4gY29vcmRzVG9MaW5lKGNvb3JkcywgcHJvcGVydGllcyk7XG59XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aVBvbHlnb25Ub0xpbmUobXVsdGlQb2x5LCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgZ2VvbSA9IGdldEdlb20obXVsdGlQb2x5KTtcbiAgICB2YXIgY29vcmRzID0gZ2VvbS5jb29yZGluYXRlcztcbiAgICB2YXIgcHJvcGVydGllcyA9IG9wdGlvbnMucHJvcGVydGllc1xuICAgICAgICA/IG9wdGlvbnMucHJvcGVydGllc1xuICAgICAgICA6IG11bHRpUG9seS50eXBlID09PSBcIkZlYXR1cmVcIlxuICAgICAgICAgICAgPyBtdWx0aVBvbHkucHJvcGVydGllc1xuICAgICAgICAgICAgOiB7fTtcbiAgICB2YXIgbGluZXMgPSBbXTtcbiAgICBjb29yZHMuZm9yRWFjaChmdW5jdGlvbiAoY29vcmQpIHtcbiAgICAgICAgbGluZXMucHVzaChjb29yZHNUb0xpbmUoY29vcmQsIHByb3BlcnRpZXMpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb24obGluZXMpO1xufVxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29vcmRzVG9MaW5lKGNvb3JkcywgcHJvcGVydGllcykge1xuICAgIGlmIChjb29yZHMubGVuZ3RoID4gMSkge1xuICAgICAgICByZXR1cm4gbXVsdGlMaW5lU3RyaW5nKGNvb3JkcywgcHJvcGVydGllcyk7XG4gICAgfVxuICAgIHJldHVybiBsaW5lU3RyaW5nKGNvb3Jkc1swXSwgcHJvcGVydGllcyk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGltcG9ydCBcIi4vTGVhZmxldC5BbG1vc3RPdmVyL3NyYy9sZWFmbGV0LmFsbW9zdG92ZXIuanNcIjtcclxuLy8gaW1wb3J0IFwiLi9sZWFmbGV0LWRyYXctdG9vbGJhci9sZWFmbGV0LmRyYXctdG9vbGJhci5qc1wiO1xyXG4vLyBpbXBvcnQgXCIuL2xlYWZsZXQtZHJhdy10b29sYmFyL2xlYWZsZXQuZHJhdy10b29sYmFyLmNzc1wiO1xyXG5pbXBvcnQge2xpbmUsIHNlbGVjdCwgdW5zZWxlY3QsIHNlbGVjdDJ9IGZyb20gJy4vaWNvbnMnXHJcbmltcG9ydCB7XHJcbiAgcG9seWdvbiBhcyB0dXJmUG9seSxcclxuICBsaW5lU3RyaW5nIGFzIHR1cmZMaW5lU3RyaW5nLFxyXG4gIG11bHRpTGluZVN0cmluZyBhcyB0dXJmTXVsdGlMaW5lU3RyaW5nLFxyXG59IGZyb20gXCJAdHVyZi9oZWxwZXJzXCI7XHJcblxyXG5pbXBvcnQgYm9vbGVhbkludGVyc2VjdHMgZnJvbSBcIkB0dXJmL2Jvb2xlYW4taW50ZXJzZWN0c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBMLkRyYXcuVHJhY2VcclxuICogQGFrYSBEcmF3LlRyYWNlXHJcbiAqIEBpbmhlcml0cyBMLkRyYXcuVHJhY2VcclxuICovXHJcbkwuRHJhdy5UcmFjZSA9IEwuRHJhdy5Qb2x5bGluZS5leHRlbmQoe1xyXG4gIHN0YXRpY3M6IHtcclxuICAgIFRZUEU6IFwidHJhY2VcIixcclxuICB9LFxyXG4gIC8vVE9ETyBpIG9ubHkgd2FudCB0byBlZGl0IHNoYXBlT3B0aW9ucywgdGhlIHJlc3QgbmVlZCBub3QgYmUgY29waWVkIG92ZXJcclxuICBvcHRpb25zOiB7XHJcbiAgICBhbGxvd0ludGVyc2VjdGlvbjogdHJ1ZSxcclxuICAgIHJlcGVhdE1vZGU6IGZhbHNlLFxyXG4gICAgZHJhd0Vycm9yOiB7XHJcbiAgICAgIGNvbG9yOiBcIiNiMDBiMDBcIixcclxuICAgICAgdGltZW91dDogMjUwMCxcclxuICAgIH0sXHJcbiAgICBpY29uOiBuZXcgTC5EaXZJY29uKHtcclxuICAgICAgaWNvblNpemU6IG5ldyBMLlBvaW50KDgsIDgpLFxyXG4gICAgICBjbGFzc05hbWU6IFwibGVhZmxldC1kaXYtaWNvbiBsZWFmbGV0LWVkaXRpbmctaWNvblwiLFxyXG4gICAgfSksXHJcbiAgICB0b3VjaEljb246IG5ldyBMLkRpdkljb24oe1xyXG4gICAgICBpY29uU2l6ZTogbmV3IEwuUG9pbnQoMjAsIDIwKSxcclxuICAgICAgY2xhc3NOYW1lOiBcImxlYWZsZXQtZGl2LWljb24gbGVhZmxldC1lZGl0aW5nLWljb24gbGVhZmxldC10b3VjaC1pY29uXCIsXHJcbiAgICB9KSxcclxuICAgIGd1aWRlbGluZURpc3RhbmNlOiAyMCxcclxuICAgIG1heEd1aWRlTGluZUxlbmd0aDogNDAwMCxcclxuICAgIHNoYXBlT3B0aW9uczoge1xyXG4gICAgICBzdHJva2U6IHRydWUsXHJcbiAgICAgIGNvbG9yOiBcInJlZFwiLFxyXG4gICAgICB3ZWlnaHQ6IDQsXHJcbiAgICAgIG9wYWNpdHk6IDAuNSxcclxuICAgICAgZmlsbDogZmFsc2UsXHJcbiAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBtZXRyaWM6IHRydWUsIC8vIFdoZXRoZXIgdG8gdXNlIHRoZSBtZXRyaWMgbWVhc3VyZW1lbnQgc3lzdGVtIG9yIGltcGVyaWFsXHJcbiAgICBmZWV0OiB0cnVlLCAvLyBXaGVuIG5vdCBtZXRyaWMsIHRvIHVzZSBmZWV0IGluc3RlYWQgb2YgeWFyZHMgZm9yIGRpc3BsYXkuXHJcbiAgICBuYXV0aWM6IGZhbHNlLCAvLyBXaGVuIG5vdCBtZXRyaWMsIG5vdCBmZWV0IHVzZSBuYXV0aWMgbWlsZSBmb3IgZGlzcGxheVxyXG4gICAgekluZGV4T2Zmc2V0OiAyMDAwLCAvLyBUaGlzIHNob3VsZCBiZSA+IHRoYW4gdGhlIGhpZ2hlc3Qgei1pbmRleCBhbnkgbWFwIGxheWVyc1xyXG4gICAgZmFjdG9yOiAxLCAvLyBUbyBjaGFuZ2UgZGlzdGFuY2UgY2FsY3VsYXRpb25cclxuICAgIG1heFBvaW50czogMCwgLy8gT25jZSB0aGlzIG51bWJlciBvZiBwb2ludHMgYXJlIHBsYWNlZCwgZmluaXNoIHNoYXBlXHJcbiAgfSxcclxuICAvLyBAbWV0aG9kIGluaXRpYWxpemUoKTogdm9pZFxyXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChtYXAsIG9wdGlvbnMpIHtcclxuICAgIEwuRHJhdy5Qb2x5bGluZS5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG1hcCwgb3B0aW9ucyk7XHJcbiAgICB0aGlzLnR5cGUgPSBMLkRyYXcuVHJhY2UuVFlQRTtcclxuICAgIHRoaXMub3B0aW9ucy5kcmF3RXJyb3IubWVzc2FnZSA9IFwiWW91IG11c3QgZHJhdyBvdmVyIHRoZSBzZWxlY3RlZCBsaW5lLlwiO1xyXG4gICAgLy9UT0RPOiBOb3Qgc3VyZSBpZiB0aGlzIGlsbCBpbnRlcmZlcmUgd2l0aCBvdGhlciBwb2x5bGluZSBkcmF3aW5nXHJcbiAgfSxcclxuXHJcbiAgYWRkSG9va3M6IGZ1bmN0aW9uICgpIHtcclxuICAgIEwuRHJhdy5Qb2x5bGluZS5wcm90b3R5cGUuYWRkSG9va3MuY2FsbCh0aGlzKTtcclxuICAgIHRoaXMuYWxtb3N0TGF0TG5nID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fbWFwXHJcbiAgICAgIC5vbihcImFsbW9zdDptb3ZlXCIsIHRoaXMuX2FsbW9zdE1vdmUsIHRoaXMpXHJcbiAgICAgIC5vbihcImFsbW9zdDpvdXRcIiwgdGhpcy5fYWxtb3N0T3V0LCB0aGlzKTtcclxuXHJcbiAgICAvL1RPRE86IHNvcnQgaG93IHRvIHN0b3JlIGxheWVyIGlkIGFuZCBzZWxlY3QgbW9yZSBuaWNlbHkgaGVyZVxyXG4gICAgbGV0IHM7XHJcbiAgICB0aGlzLl9tYXAuZWFjaExheWVyKGZ1bmN0aW9uIChsYXllcikge1xyXG4gICAgICBpZiAobGF5ZXIub3B0aW9ucy5uYW1lICYmIGxheWVyLm9wdGlvbnMubmFtZSA9PSBcInNlbGVjdGVkXCIpIHtcclxuICAgICAgICBzID0gbGF5ZXI7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IHM7XHJcbiAgICB0aGlzLmxpbmVUeXBlID0gcy5vcHRpb25zLmxpbmVUeXBlO1xyXG4gICAgaWYgKHRoaXMubGluZVR5cGUgPT0gXCJNdWx0aUxpbmVTdHJpbmdcIikge1xyXG4gICAgICB0aGlzLmdldFNlZ21lbnRzKHMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0U2VnbWVudHM6IGZ1bmN0aW9uIChzKSB7XHJcbiAgICB0aGlzLnNlZ21lbnRzID0gcy5nZXRMYXRMbmdzKCkubWFwKChsbCkgPT4gTC5wb2x5bGluZShsbCkpO1xyXG4gIH0sXHJcbiAgcmVtb3ZlSG9va3M6IGZ1bmN0aW9uICgpIHtcclxuICAgIEwuRHJhdy5Qb2x5Z29uLnByb3RvdHlwZS5yZW1vdmVIb29rcy5jYWxsKHRoaXMpO1xyXG4gICAgZGVsZXRlIHRoaXMuc2VsZWN0ZWQ7XHJcbiAgICBkZWxldGUgdGhpcy5hbG1vc3RMYXRMbmc7XHJcbiAgICBkZWxldGUgdGhpcy5zdGFydFJhdGlvO1xyXG4gICAgZGVsZXRlIHRoaXMubGluZXN0YXJ0O1xyXG4gICAgZGVsZXRlIHRoaXMuX2NsaWNrSGFuZGxlZDtcclxuICAgIGRlbGV0ZSB0aGlzLl9kaXNhYmxlTWFya2VycztcclxuICAgIGRlbGV0ZSB0aGlzLnNlZ21lbnRzO1xyXG4gICAgZGVsZXRlIHRoaXMuY2xvc2VzdDtcclxuICAgIGRlbGV0ZSB0aGlzLmxpbmVUeXBlO1xyXG4gICAgdGhpcy5fbWFwXHJcbiAgICAgIC5vZmYoXCJhbG1vc3Q6bW92ZVwiLCB0aGlzLl9hbG1vc3RNb3ZlLCB0aGlzKVxyXG4gICAgICAub2ZmKFwiYWxtb3N0Om91dFwiLCB0aGlzLl9hbG1vc3RPdXQsIHRoaXMpO1xyXG4gIH0sXHJcbiAgX2FsbW9zdE91dDogZnVuY3Rpb24gKGUpIHtcclxuICAgIHRoaXMuYWxtb3N0TGF0TG5nID0gZmFsc2U7XHJcbiAgfSxcclxuICBfYWxtb3N0TW92ZTogZnVuY3Rpb24gKGUpIHtcclxuICAgIHRoaXMuYWxtb3N0TGF0TG5nID0gZS5sYXRsbmc7XHJcbiAgfSxcclxuICAvLyBAbWV0aG9kIGFkZFZlcnRleCgpOiB2b2lkXHJcbiAgLy8gQWRkIGEgdmVydGV4IHRvIHRoZSBlbmQgb2YgdGhlIHBvbHlsaW5lXHJcbiAgYWRkVmVydGV4OiBmdW5jdGlvbiAobGF0bG5nKSB7XHJcbiAgICBjb25zdCBtYXJrZXJzTGVuZ3RoID0gdGhpcy5fbWFya2Vycy5sZW5ndGg7XHJcblxyXG4gICAgLy8gbWFya2Vyc0xlbmd0aCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAyIGJlZm9yZSBpbnRlcnNlY3Rpb25zIGNhbiBvY2N1ciAmJiBtdXN0IGhhdmUgbGF0bG5nIGZyb20gZHJhd2luZyBhbG9uZyBzZWxlY3RlZFxyXG4gICAgaWYgKFxyXG4gICAgICAobWFya2Vyc0xlbmd0aCA+PSAyICYmXHJcbiAgICAgICAgIXRoaXMub3B0aW9ucy5hbGxvd0ludGVyc2VjdGlvbiAmJlxyXG4gICAgICAgIHRoaXMuX3BvbHkubmV3TGF0TG5nSW50ZXJzZWN0cyhsYXRsbmcpKSB8fFxyXG4gICAgICAhbGF0bG5nXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5fc2hvd0Vycm9yVG9vbHRpcCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2Vycm9yU2hvd24pIHtcclxuICAgICAgdGhpcy5faGlkZUVycm9yVG9vbHRpcCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy9nZXQgdGhlIGxpbmUgcmF0aW8gb2YgdGhlIGN1cnJlbnQgcG9pbnQsIGFuZCBnZW5lcmF0ZSBhbGwgcG9pbnRzIG5lZWRlZCB0byBkcmF3IGxpbmVcclxuICAgICAgY29uc3QgZW5kUmF0aW8gPSBMLkdlb21ldHJ5VXRpbC5sb2NhdGVPbkxpbmUoXHJcbiAgICAgICAgdGhpcy5fbWFwLFxyXG4gICAgICAgIHRoaXMuY2xvc2VzdCxcclxuICAgICAgICB0aGlzLmFsbW9zdExhdExuZ1xyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBleHRyYWN0aW9uID0gTC5HZW9tZXRyeVV0aWwuZXh0cmFjdChcclxuICAgICAgICB0aGlzLl9tYXAsXHJcbiAgICAgICAgdGhpcy5jbG9zZXN0LFxyXG4gICAgICAgIHRoaXMuc3RhcnRSYXRpbyxcclxuICAgICAgICBlbmRSYXRpb1xyXG4gICAgICApO1xyXG5cclxuICAgICAgdGhpcy5fbWFya2VycyA9IGV4dHJhY3Rpb24ubWFwKChlKSA9PiB0aGlzLl9jcmVhdGVNYXJrZXIoZSkpOyAvL2NyZWF0ZSBuZXcgbWFya2VyIGxpc3QsIHdoaWNoIGlzIGFkZGVkIHRvIHRoZSBtYXBcclxuICAgICAgdGhpcy5fcG9seS5zZXRMYXRMbmdzKGV4dHJhY3Rpb24pOyAvL3NldCB0aGUgcG9pbnRzIG9mIHRoZSBsaW5lXHJcblxyXG4gICAgICBpZiAodGhpcy5fcG9seS5nZXRMYXRMbmdzKCkubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwLmFkZExheWVyKHRoaXMuX3BvbHkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl92ZXJ0ZXhDaGFuZ2VkKGxhdGxuZywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfb25Nb3VzZU1vdmU6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICBMLkRyYXcuUG9seWxpbmUucHJvdG90eXBlLl9vbk1vdXNlTW92ZS5jYWxsKHRoaXMsIGUpO1xyXG4gICAgLy9hZGQgYSB2ZXJ0ZXggb24gbW91c2UgbW92ZSBpZiBzbHJlYWR5IGRyYXdpbmcgc3RhcnRlZFxyXG4gICAgaWYgKHRoaXMubGluZVN0YXJ0KSB7XHJcbiAgICAgIHRoaXMuYWRkVmVydGV4KHRoaXMuYWxtb3N0TGF0TG5nKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9vbk1vdXNlRG93bjogZnVuY3Rpb24gKGUpIHtcclxuICAgIGlmIChcclxuICAgICAgIXRoaXMuX2NsaWNrSGFuZGxlZCAmJlxyXG4gICAgICAhdGhpcy5fdG91Y2hIYW5kbGVkICYmXHJcbiAgICAgICF0aGlzLl9kaXNhYmxlTWFya2VycyAmJlxyXG4gICAgICB0aGlzLmFsbW9zdExhdExuZyAhPSBmYWxzZVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuX21hcC5kcmFnZ2luZy5kaXNhYmxlKCk7XHJcbiAgICAgIHRoaXMuX29uTW91c2VNb3ZlKGUpO1xyXG4gICAgICB0aGlzLl9jbGlja0hhbmRsZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLl9kaXNhYmxlTmV3TWFya2VycygpO1xyXG4gICAgICB0aGlzLmxpbmVTdGFydCA9IHRydWU7XHJcbiAgICAgIHRoaXMuY2xvc2VzdCA9IHRoaXMuX3NldENsb3Nlc3QoKTtcclxuICAgICAgdGhpcy5zdGFydFJhdGlvID0gTC5HZW9tZXRyeVV0aWwubG9jYXRlT25MaW5lKFxyXG4gICAgICAgIHRoaXMuX21hcCxcclxuICAgICAgICB0aGlzLmNsb3Nlc3QsXHJcbiAgICAgICAgdGhpcy5hbG1vc3RMYXRMbmdcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5fc3RhcnRQb2ludC5jYWxsKHRoaXMsIHRoaXMuYWxtb3N0TGF0TG5nLmxuZywgdGhpcy5hbG1vc3RMYXRMbmcubGF0KTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9sYXRsbmdUb0FycmF5OiBmdW5jdGlvbiAobGxzKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShsbHMpKSByZXR1cm4gbGxzLm1hcCgobGwpID0+IHRoaXMuX2xhdGxuZ1RvQXJyYXkobGwpKTtcclxuICAgIGVsc2UgcmV0dXJuIFtsbHMubG5nLCBsbHMubGF0XTtcclxuICB9LFxyXG4gIF9zZXRDbG9zZXN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5saW5lVHlwZSA9PSBcIkxpbmVTdHJpbmdcIikge1xyXG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBMLkdlb21ldHJ5VXRpbC5jbG9zZXN0TGF5ZXIoXHJcbiAgICAgICAgdGhpcy5fbWFwLFxyXG4gICAgICAgIHRoaXMuc2VnbWVudHMsXHJcbiAgICAgICAgdGhpcy5hbG1vc3RMYXRMbmdcclxuICAgICAgKS5sYXllcjtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBfb25Nb3VzZVVwOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgTC5EcmF3LlBvbHlsaW5lLnByb3RvdHlwZS5fb25Nb3VzZVVwLmNhbGwodGhpcywgZSk7XHJcbiAgICB0aGlzLl9tYXAuZHJhZ2dpbmcuZW5hYmxlKCk7XHJcbiAgICB0aGlzLmxpbmVTdGFydCA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIC8vVE9ETzogdGhpcyBmdW5jdGlvbiBpcyBhbiBhYnNvbHV0ZSBtZXNzIGFuZCBpIG5lZWQgdG8gYWRkcmVzcyBpdFxyXG4gIF9lbmRQb2ludDogZnVuY3Rpb24gKGUpIHtcclxuICAgIGlmICh0aGlzLl9tb3VzZURvd25PcmlnaW4pIHtcclxuICAgICAgdGhpcy5hZGRWZXJ0ZXgoZS5sYXRsbmcpO1xyXG4gICAgICB0aGlzLl9maW5pc2hTaGFwZSgpO1xyXG4gICAgICAvL1RPRE86IEkgZGlzYWJsZWQgYWxsIG9mIHRoaXMgYW5kIGtlcHQgdGhlIHBhcnRzIG9mIHRoZSBjb2RlIHRoYXQgYWxsb3cgdGhlIGxpbmUgdG8gZW5kXHJcbiAgICAgIC8vIEkgbmVlZCB0byBzcGVuZCBtb3JlIHRpbWUgbG9va2luZyBhdCB0aGlzIHRvIG1ha2Ugc3VyZSB0aGVyZSBpc24ndCBzb21ldGhpbmcgaGVyZSBJIG5lZWQsIGVzcGVjaWFsbHkgaW4gcmVnYXJkcyB0byB0b3VjaCBzY3JlZSBzdHVmZlxyXG5cclxuICAgICAgLy8gaWYgKHRoaXMuX21vdXNlRG93bk9yaWdpbikge1xyXG4gICAgICAvLyBcdHZhciBkcmFnQ2hlY2tEaXN0YW5jZSA9IEwucG9pbnQoY2xpZW50WCwgY2xpZW50WSlcclxuICAgICAgLy8gXHRcdC5kaXN0YW5jZVRvKHRoaXMuX21vdXNlRG93bk9yaWdpbik7XHJcbiAgICAgIC8vIFx0dmFyIGxhc3RQdERpc3RhbmNlID0gdGhpcy5fY2FsY3VsYXRlRmluaXNoRGlzdGFuY2UoZS5sYXRsbmcpO1xyXG4gICAgICAvLyBcdGlmICh0aGlzLm9wdGlvbnMubWF4UG9pbnRzID4gMSAmJiB0aGlzLm9wdGlvbnMubWF4UG9pbnRzID09IHRoaXMuX21hcmtlcnMubGVuZ3RoICsgMSkge1xyXG4gICAgICAvLyBcdFx0dGhpcy5hZGRWZXJ0ZXgoZS5sYXRsbmcpO1xyXG4gICAgICAvLyBcdFx0dGhpcy5fZmluaXNoU2hhcGUoKTtcclxuICAgICAgLy8gXHR9IGVsc2UgaWYgKGxhc3RQdERpc3RhbmNlIDwgMTAgJiYgTC5Ccm93c2VyLnRvdWNoKSB7IC8vVE9ETzogbmVlZCB0byBrZWVwIHRoaXMgaW4gc29tZSBmb3JtIGZvciB0b3VjaCBzY3JlZW5zPz8/XHJcbiAgICAgIC8vIFx0XHR0aGlzLl9maW5pc2hTaGFwZSgpO1xyXG4gICAgICAvLyBcdH0gZWxzZSBpZiAoTWF0aC5hYnMoZHJhZ0NoZWNrRGlzdGFuY2UpIDwgOSAqICh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxKSkge1xyXG4gICAgICAvLyBcdFx0dGhpcy5hZGRWZXJ0ZXgoZS5sYXRsbmcpO1xyXG4gICAgICAvLyBcdH1cclxuICAgICAgLy8gXHR0aGlzLl9lbmFibGVOZXdNYXJrZXJzKCk7IC8vIGFmdGVyIGEgc2hvcnQgcGF1c2UsIGVuYWJsZSBuZXcgbWFya2Vyc1xyXG4gICAgICAvLyB9XHJcbiAgICAgIHRoaXMuX2VuYWJsZU5ld01hcmtlcnMoKTsgLy8gYWZ0ZXIgYSBzaG9ydCBwYXVzZSwgZW5hYmxlIG5ldyBtYXJrZXJzXHJcbiAgICB9XHJcbiAgICB0aGlzLl9tb3VzZURvd25PcmlnaW4gPSBudWxsO1xyXG4gIH0sXHJcbiAgX2NyZWF0ZU1hcmtlcjogZnVuY3Rpb24gKGxhdGxuZykge1xyXG4gICAgdmFyIG1hcmtlciA9IG5ldyBMLk1hcmtlcihsYXRsbmcsIHtcclxuICAgICAgaWNvbjogdGhpcy5vcHRpb25zLmljb24sXHJcbiAgICAgIHpJbmRleE9mZnNldDogdGhpcy5vcHRpb25zLnpJbmRleE9mZnNldCAqIDIsXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXJrZXI7XHJcbiAgfSxcclxuICBfdXBkYXRlUnVubmluZ01lYXN1cmU6IGZ1bmN0aW9uIChsYXRsbmcsIGFkZGVkKSB7XHJcbiAgICB2YXIgbWFya2Vyc0xlbmd0aCA9IHRoaXMuX21hcmtlcnMubGVuZ3RoLFxyXG4gICAgICBwcmV2aW91c01hcmtlckluZGV4LFxyXG4gICAgICBkaXN0YW5jZTtcclxuXHJcbiAgICBpZiAodGhpcy5fbWFya2Vycy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgdGhpcy5fbWVhc3VyZW1lbnRSdW5uaW5nVG90YWwgPSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcHJldmlvdXNNYXJrZXJJbmRleCA9IG1hcmtlcnNMZW5ndGggLSAoYWRkZWQgPyAyIDogMSk7XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGJhc2VkIG9uIHRoZSB2ZXJzaW9uXHJcbiAgICAgIGlmIChMLkdlb21ldHJ5VXRpbC5pc1ZlcnNpb24wN3goKSkge1xyXG4gICAgICAgIGRpc3RhbmNlID1cclxuICAgICAgICAgIGxhdGxuZy5kaXN0YW5jZVRvKHRoaXMuX21hcmtlcnNbcHJldmlvdXNNYXJrZXJJbmRleF0uZ2V0TGF0TG5nKCkpICpcclxuICAgICAgICAgICh0aGlzLm9wdGlvbnMuZmFjdG9yIHx8IDEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRpc3RhbmNlID1cclxuICAgICAgICAgIHRoaXMuX21hcC5kaXN0YW5jZShcclxuICAgICAgICAgICAgbGF0bG5nLFxyXG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJzW3ByZXZpb3VzTWFya2VySW5kZXhdLmdldExhdExuZygpXHJcbiAgICAgICAgICApICogKHRoaXMub3B0aW9ucy5mYWN0b3IgfHwgMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX21lYXN1cmVtZW50UnVubmluZ1RvdGFsICs9IGRpc3RhbmNlICogKGFkZGVkID8gMSA6IC0xKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgTC5EcmF3LlNlbGVjdFxyXG4gKiBAYWthIERyYXcuU2VsZWN0XHJcbiAqIEBpbmhlcml0cyBMLkRyYXcuUmVjdGFuZ2xlXHJcbiAqL1xyXG5MLkRyYXcuU2VsZWN0ID0gTC5EcmF3LlJlY3RhbmdsZS5leHRlbmQoe1xyXG4gIHN0YXRpY3M6IHtcclxuICAgIFRZUEU6IFwic2VsZWN0XCIsXHJcbiAgfSxcclxuXHJcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG1hcCwgb3B0aW9ucykge1xyXG4gICAgLy8gU2F2ZSB0aGUgdHlwZSBzbyBzdXBlciBjYW4gZmlyZSwgbmVlZCB0byBkbyB0aGlzIGFzIGNhbm5vdCBkbyB0aGlzLlRZUEUgOihcclxuICAgIEwuRHJhdy5SZWN0YW5nbGUucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBtYXAsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5fbWFwID0gbWFwO1xyXG4gICAgdGhpcy5faW5pdGlhbExhYmVsVGV4dCA9IFwiQ2xpY2sgYW5kIGRyYWcgdG8gc2VsZWN0IGEgbGluZS5cIjtcclxuXHJcbiAgICB0aGlzLnR5cGUgPSBMLkRyYXcuU2VsZWN0LlRZUEU7XHJcbiAgfSxcclxuXHJcbiAgLy8gQG1ldGhvZCBhZGRIb29rcygpOiB2b2lkXHJcbiAgLy8gQWRkIGxpc3RlbmVyIGhvb2tzIHRvIHRoaXMgaGFuZGxlci5cclxuICBhZGRIb29rczogZnVuY3Rpb24gKCkge1xyXG4gICAgTC5EcmF3LlJlY3RhbmdsZS5wcm90b3R5cGUuYWRkSG9va3MuY2FsbCh0aGlzKTtcclxuICAgIC8vVE9ETzogbWFrZSBtb3JlIGVsZWdhbnQgaWYgaSBjYW5cclxuICAgIGxldCBzO1xyXG4gICAgdGhpcy5fbWFwLmVhY2hMYXllcihmdW5jdGlvbiAobGF5ZXIpIHtcclxuICAgICAgaWYgKGxheWVyLm9wdGlvbnMubmFtZSAmJiBsYXllci5vcHRpb25zLm5hbWUgPT0gXCJzZWxlY3RlZFwiKSB7XHJcbiAgICAgICAgcyA9IGxheWVyO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBzO1xyXG5cclxuICAgIC8vIHRoaXMuc2VsZWN0ZWRJdGVtID0gbmV3IEwuRmVhdHVyZUdyb3VwKCkuYWRkVG8odGhpcy5fbWFwKTtcclxuICAgIHRoaXMuX21hcC5vbihMLkRyYXcuRXZlbnQuQ1JFQVRFRCwgdGhpcy5fY3JlYXRlZCwgdGhpcyk7XHJcbiAgfSxcclxuICBlbmFibGVTZWxlY3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0cmFjZS1saW5lXCIpWzBdO1xyXG4gICAgYnV0dG9uLm9uQ2xpY2sgPSBudWxsO1xyXG4gICAgYnV0dG9uLmNsYXNzTmFtZSA9IFwidHJhY2UtbGluZSBsZWFmbGV0LXRvb2xiYXItaWNvblwiO1xyXG4gIH0sXHJcblxyXG4gIHJlbW92ZUhvb2tzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBMLkRyYXcuUmVjdGFuZ2xlLnByb3RvdHlwZS5yZW1vdmVIb29rcy5jYWxsKHRoaXMpO1xyXG4gICAgZGVsZXRlIHRoaXMuc2VsZWN0ZWQ7XHJcbiAgICB0aGlzLl9tYXAub2ZmKEwuRHJhdy5FdmVudC5DUkVBVEVELCB0aGlzLl9jcmVhdGVkLCB0aGlzKTtcclxuICB9LFxyXG4gIF9sYXRsbmdUb0FycmF5OiBmdW5jdGlvbiAobGxzKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShsbHMpKSByZXR1cm4gbGxzLm1hcCgobGwpID0+IHRoaXMuX2xhdGxuZ1RvQXJyYXkobGwpKTtcclxuICAgIGVsc2UgcmV0dXJuIFtsbHMubG5nLCBsbHMubGF0XTtcclxuICAgIC8vIH0pO1xyXG4gIH0sXHJcblxyXG4gIF9jcmVhdGVkOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgLy9jcmVhdGUgdHVyZmpzIGNvbXBhdGlibGUgZmVhdHVyZSBmcm9tIGRyYXduIHJlY3RhbmdsZVxyXG4gICAgY29uc3QgbGF0bG5ncyA9IHRoaXMuX2xhdGxuZ1RvQXJyYXkoZS5sYXllci5nZXRMYXRMbmdzKCkpO1xyXG4gICAgbGF0bG5nc1swXS5wdXNoKGxhdGxuZ3NbMF1bMF0pOyAvL2FkZCBmaXJzdCBwYWlyIHRvIGJhY2sgdG8gc2F0aXNmeSB0dXJmLmpzXHJcblxyXG4gICAgY29uc3Qgc2VsZWN0UG9seSA9IHR1cmZQb2x5KGxhdGxuZ3MpO1xyXG4gICAgLy9zZWFyY2ggbWFwIGZvciBhIHNlbGVjdGFibGUgbGF5ZXJcclxuICAgIHRoaXMuX21hcC5lYWNoTGF5ZXIoKGxheWVyKSA9PiB7XHJcbiAgICAgIGlmIChsYXllci5vcHRpb25zLnNlbGVjdGFibGUpIHtcclxuICAgICAgICB0aGlzLl9tYW5hZ2VTZWxlY3Qoc2VsZWN0UG9seSwgbGF5ZXIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICAvL3J1biBxdWVyeSB0byBzZWxlY3QgZmVhdHVyZSBvbiByZWN0YW5nbGUgZHJhd1xyXG4gIF9tYW5hZ2VTZWxlY3Q6IGZ1bmN0aW9uIChyZWN0LCBzZWxlY3RhYmxlKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xyXG4gICAgICB0aGlzLl9tYXAuYWxtb3N0T3Zlci5yZW1vdmVMYXllcih0aGlzLnNlbGVjdGVkKTtcclxuICAgICAgdGhpcy5fbWFwLnJlbW92ZUxheWVyKHRoaXMuc2VsZWN0ZWQpO1xyXG4gICAgfVxyXG4gICAgbGV0IHNlbGVjdGVkO1xyXG5cclxuICAgIHNlbGVjdGFibGUuZWFjaExheWVyKChsYXllcikgPT4ge1xyXG4gICAgICBsZXQgbGluZSA9IHRoaXMuX2dyYWJUdXJmTGluZShsYXllcik7XHJcblxyXG4gICAgICBpZiAobGluZSkge1xyXG4gICAgICAgIGNvbnN0IGludGVyc2VjdCA9IGJvb2xlYW5JbnRlcnNlY3RzKHJlY3QsIGxpbmUpO1xyXG4gICAgICAgIGlmIChpbnRlcnNlY3QpIHtcclxuICAgICAgICAgIHNlbGVjdGVkID0gbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChzZWxlY3RlZCkge1xyXG4gICAgICB0aGlzLl9kcmF3U2VsZWN0KHNlbGVjdGVkKTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vY29udmVydCBsYXllciBpbnRvIGEgdHVyZiBsaW5lIHR5cGVcclxuICBfZ3JhYlR1cmZMaW5lOiBmdW5jdGlvbiAobGF5ZXIpIHtcclxuICAgIGNvbnN0IGxpbmVUeXBlID0gbGF5ZXIuZmVhdHVyZS5nZW9tZXRyeS50eXBlO1xyXG4gICAgY29uc3QgbGF0bG5ncyA9IHRoaXMuX2xhdGxuZ1RvQXJyYXkobGF5ZXIuZ2V0TGF0TG5ncygpKTtcclxuICAgIGlmIChsaW5lVHlwZSA9PSBcIkxpbmVTdHJpbmdcIikge1xyXG4gICAgICByZXR1cm4gdHVyZkxpbmVTdHJpbmcobGF0bG5ncyk7XHJcbiAgICB9IGVsc2UgaWYgKGxpbmVUeXBlID09IFwiTXVsdGlMaW5lU3RyaW5nXCIpIHtcclxuICAgICAgcmV0dXJuIHR1cmZNdWx0aUxpbmVTdHJpbmcobGF0bG5ncyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGluZTtcclxuICB9LFxyXG5cclxuICBfZHJhd1NlbGVjdDogZnVuY3Rpb24gKHNlbGVjdGVkKSB7XHJcbiAgICBsZXQgcHJvcGVydGllcyA9IHt9O1xyXG4gICAgaWYgKHNlbGVjdGVkLmZlYXR1cmUucHJvcGVydGllcykge1xyXG4gICAgICBwcm9wZXJ0aWVzID0gc2VsZWN0ZWQuZmVhdHVyZS5wcm9wZXJ0aWVzO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxlY3RlZCA9IEwucG9seWxpbmUoc2VsZWN0ZWQuZ2V0TGF0TG5ncygpLCB7XHJcbiAgICAgIHdlaWdodDogNCxcclxuICAgICAgY29sb3I6IFwiZ29sZFwiLFxyXG4gICAgICBuYW1lOiBcInNlbGVjdGVkXCIsXHJcbiAgICAgIGxpbmVUeXBlOiBzZWxlY3RlZC5mZWF0dXJlLmdlb21ldHJ5LnR5cGUsXHJcbiAgICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXMsXHJcbiAgICB9KS5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgdGhpcy5fbWFwLmFkZExheWVyKHRoaXMuc2VsZWN0ZWQpO1xyXG4gICAgdGhpcy5fbWFwLmFsbW9zdE92ZXIuYWRkTGF5ZXIodGhpcy5zZWxlY3RlZCk7XHJcbiAgICB0aGlzLmVuYWJsZVNlbGVjdCgpO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy9zZWUgaWYgaSBjYW4gcnVuIGRpc2FibGUgc2VsZWN0IGVsc2V3aGVyZVxyXG5MLlRvb2xiYXIyLkRyYXdBY3Rpb24uQ2FuY2VsVHJhY2UgPSBMLlRvb2xiYXIyLkRyYXdBY3Rpb24uQ2FuY2VsLmV4dGVuZCh7XHJcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgZGlzYWJsZVNlbGVjdCgpOyAvL2RpYWJsZSBzZWxlY3Qgb24gZHJhdyBidXR0b24gaGVyZSBiZWNhdXNlIHRoaXMgaXMgdGhlIGZpcnN0IHBsYWNlIHdoZXJlIGl0J3MgYWxyYWR5IGluaXRhbGl6ZWRcclxuICAgIEwuVG9vbGJhcjIuRHJhd0FjdGlvbi5DYW5jZWwucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzKTtcclxuICB9LFxyXG59KTtcclxuXHJcbkwuVG9vbGJhcjIuRHJhd0FjdGlvbi5UcmFjZSA9IEwuVG9vbGJhcjIuRHJhd0FjdGlvbi5mcm9tSGFuZGxlcihcclxuICBMLkRyYXcuVHJhY2UsXHJcbiAge1xyXG4gICAgY2xhc3NOYW1lOiBcImxlYWZsZXQtZHJhdy1kcmF3LXBvbHlsaW5lXCIsXHJcbiAgICB0b29sdGlwOiBMLmRyYXdMb2NhbC5kcmF3LnRvb2xiYXIuYnV0dG9ucy5wb2x5bGluZSxcclxuICB9LFxyXG4gIG5ldyBMLlRvb2xiYXIyKHsgYWN0aW9uczogW0wuVG9vbGJhcjIuRHJhd0FjdGlvbi5DYW5jZWxUcmFjZV0gfSlcclxuKS5leHRlbmQoe1xyXG4gIG9wdGlvbnM6IHtcclxuICAgIHRvb2xiYXJJY29uOiB7XHJcbiAgICAgIGNsYXNzTmFtZTogXCJ0cmFjZS1saW5lXCIsXHJcbiAgICAgIGh0bWw6IGxpbmUsXHJcbiAgICAgIHRvb2x0aXA6IFwiRHJhdyBhIGxpbmVcIixcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcblxyXG5MLlRvb2xiYXIyLkRyYXdBY3Rpb24uU2VsZWN0ID0gTC5Ub29sYmFyMi5EcmF3QWN0aW9uLmZyb21IYW5kbGVyKFxyXG4gIEwuRHJhdy5TZWxlY3QsXHJcbiAge1xyXG4gICAgY2xhc3NOYW1lOiBcImxlYWZsZXQtZHJhdy1kcmF3LXJlY3RhbmdsZVwiLFxyXG4gICAgdG9vbHRpcDogTC5kcmF3TG9jYWwuZHJhdy50b29sYmFyLmJ1dHRvbnMucmVjdGFuZ2xlLFxyXG4gIH0sXHJcbiAgbmV3IEwuVG9vbGJhcjIoeyBhY3Rpb25zOiBbTC5Ub29sYmFyMi5EcmF3QWN0aW9uLkNhbmNlbF0gfSlcclxuKS5leHRlbmQoe1xyXG4gIG9wdGlvbnM6IHtcclxuICAgIHRvb2xiYXJJY29uOiB7XHJcbiAgICAgIGh0bWw6IHNlbGVjdCxcclxuICAgICAgdG9vbHRpcDogXCJTZWxlY3QgYSBsaW5lXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuTC5Ub29sYmFyMi5EcmF3QWN0aW9uLlJlbW92ZVNlbGVjdCA9IEwuVG9vbGJhcjIuQWN0aW9uLmV4dGVuZCh7XHJcbiAgb3B0aW9uczoge1xyXG4gICAgdG9vbGJhckljb246IHtcclxuICAgICAgaHRtbDogdW5zZWxlY3QsXHJcbiAgICAgIHRvb2x0aXA6IFwiVW4tc2VsZWN0IHRoZSBsaW5lXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG1hcCkge1xyXG4gICAgdGhpcy5fbWFwID0gbWFwO1xyXG5cclxuICAgIEwuVG9vbGJhcjIuQWN0aW9uLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgYWRkSG9va3M6IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBzO1xyXG4gICAgdGhpcy5fbWFwLmVhY2hMYXllcihmdW5jdGlvbiAobGF5ZXIpIHtcclxuICAgICAgaWYgKGxheWVyLm9wdGlvbnMubmFtZSAmJiBsYXllci5vcHRpb25zLm5hbWUgPT0gXCJzZWxlY3RlZFwiKSB7XHJcbiAgICAgICAgcyA9IGxheWVyO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBzO1xyXG5cclxuICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMuX21hcC5hbG1vc3RPdmVyLnJlbW92ZUxheWVyKHRoaXMuc2VsZWN0ZWQpO1xyXG4gICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5zZWxlY3RlZCk7XHJcbiAgICAgIGRpc2FibGVTZWxlY3QoKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbkwuVG9vbGJhcjIuVHJhY2UgPSBMLlRvb2xiYXIyLkNvbnRyb2wuZXh0ZW5kKHtcclxuICBvcHRpb25zOiB7XHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIEwuVG9vbGJhcjIuRHJhd0FjdGlvbi5TZWxlY3QsXHJcbiAgICAgIEwuVG9vbGJhcjIuRHJhd0FjdGlvbi5SZW1vdmVTZWxlY3QsXHJcbiAgICAgIEwuVG9vbGJhcjIuRHJhd0FjdGlvbi5UcmFjZVxyXG4gICAgXSxcclxuICB9LFxyXG59KTtcclxuXHJcbmNvbnN0IGRpc2FibGVTZWxlY3QgPSAoKSA9PiB7XHJcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRyYWNlLWxpbmVcIilbMF07XHJcblxyXG4gIC8vIGRpc2FibGUgYnV0dG9uXHJcbiAgYnV0dG9uLm9uQ2xpY2sgPSBcInByZXZlbnRFdmVudERlZmF1bHQoKTsgcmV0dXJuIGZhbHNlXCI7XHJcbiAgYnV0dG9uLmNsYXNzTmFtZSA9IFwidHJhY2UtbGluZSBsZWFmbGV0LXRvb2xiYXItaWNvbiBkcmF3LWNvbnRyb2wtZGlzYWJsZWRcIjtcclxufTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9