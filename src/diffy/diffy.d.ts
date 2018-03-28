import { AddressResponse } from "../types";
/**
 * checkValues
 *
 * @param {obj1} a REQUIRED object to check
 * @param {obj2} a REQUIRED object to compare obj1 against
 * @param {originalObject1} an OPTIONAL object for maintaining original object
 * @param {originalObject2} an OPTIONAL object for maintaining original comparison object
 * @param {rootname} an OPTIONAL string defining the root objects name
 * @param {onlyFirst} an OPTIONAL array for the keys only in the first object
 * @param {onlySecond} an OPTIONAL array for the keys only in the second object
 * @param {differences} an OPTIONAL array for the keys in both objects but with different values
 * @param {same} an OPTIONAL array for the keys that have the same values in both objects
 * @returns AddressResponse which is an object of the previously defined arrays
 */
export declare function checkValues(obj1: object, obj2: object, originalObject1?: object, originalObject2?: object, rootname?: string, onlyFirst?: never[], onlySecond?: never[], differences?: never[], same?: never[]): AddressResponse;
export declare function getOnlyFirstValues(value: any, path: any[], rootname: string, onlyFirst: any[]): Promise<void>;
export declare function getOnlySecondValues(value: any, path: any[], rootname: string, onlySecond: any[]): void;
export declare function getDifferentValues(val1: any, val2: any, path1: string[], path2: string[], rootname: string, differences: any[]): void;
export declare function getSameValues(val1: any, val2: any, path1: string[], path2: string[], rootname: string, same: any[]): void;
export declare function uniqueFirstAndSecond(arr: any[]): any[];
export declare function unique(arr: any[]): any[];
