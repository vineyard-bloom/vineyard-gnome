/**
 * checkValues
 *
 * @param {obj1: object} a RE: objectQUIRED object to check
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
export declare function checkValues2(obj1: object, obj2: object, originalObject1?: object, originalObject2?: object, rootname?: string, onlyFirst?: never[], onlySecond?: never[], differences?: never[], same?: never[]): any;
export declare function getOnlyFirstValues(obj1: object, obj2: object, originalObject1: object, rootname: string, onlyFirstValues?: never[]): never[] | undefined;
export declare function getOnlySecondValues(obj1: object, obj2: object, originalObject2: object, rootname: string, onlySecondValues?: never[]): never[] | undefined;
export declare function getDifferentValues(obj1: object, obj2: object, originalObject1: object, originalObject2: object, rootname: string, onlyDifferentValues?: never[]): never[];
export declare function getSameValues(obj1: object, obj2: object, originalObject2: object, originalObject1: object, rootname: string, onlySameValues?: never[]): never[];
export declare function unique(arr: any[], isMultiple?: boolean): any[];
