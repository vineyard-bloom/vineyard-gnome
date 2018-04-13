"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require('assert');
/**
 * checkValues
 *
 * @param {testObject: object} a REQUIRED object to check
 * @param {minotaurObject: object} a REQUIRED object to compare obj1 against
 * @returns AddressResponse which is an object of the previously defined arrays
 */
function validateAndNormalize(testObject, minotaurObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const obj1String = JSON.stringify(testObject);
        const normalizedObj1 = JSON.parse(obj1String);
        const obj2String = JSON.stringify(minotaurObject);
        const normalizedObj2 = JSON.parse(obj2String);
        return { normalizedObj1, normalizedObj2 };
    });
}
exports.validateAndNormalize = validateAndNormalize;
;
//# sourceMappingURL=validateAndNormalize.js.map