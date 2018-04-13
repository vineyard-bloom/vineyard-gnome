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
const Ajv = require('ajv');
const assert = require('assert');
const ajv = new Ajv();
const validation = require('./validationSchema.json');
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
        const validate = ajv.compile(validation);
        normalizedObj1.transactionList.forEach(transaction => {
            var valid1 = validate(transaction);
            if (!valid1)
                console.log('_:_::_:__:_:_::_:__:_::_:__:_:_:_:_:_:_:_:', validate.errors);
        });
        normalizedObj2.transactionList.forEach(transaction => {
            var valid2 = validate(transaction);
            if (!valid2)
                console.log('_:_::_:__:_:_::_:__:_::_:__:_:_:_:_:_:_:_:', validate.errors);
        });
        return { normalizedObj1, normalizedObj2 };
    });
}
exports.validateAndNormalize = validateAndNormalize;
;
//# sourceMappingURL=validateAndNormalize.js.map