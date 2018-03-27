import { AddressResponse } from "../types";
export declare function checkValues(obj1: object, obj2: object, originalObject1: object, originalObject2: object, rootname: string, onlyFirst: any[], onlySecond: any[], differences: any[], same: any[]): AddressResponse;
export declare function getOnlyFirstValues(obj1: object, obj2: object, originalObject1: object, key: string, rootname: string, onlyFirst: any[]): Promise<void>;
export declare function getOnlySecondValues(obj1: object, obj2: object, originalObject2: object, key: string, rootname: string, onlySecond: any[]): void;
export declare function getDifferentValues(obj1: object, obj2: object, originalObject1: object, originalObject2: object, key: string, rootname: string, differences: any[]): void;
export declare function getSameValues(obj1: object, obj2: object, originalObject1: object, originalObject2: object, key: string, rootname: string, same: any[]): void;
export declare function uniqueFirstAndSecond(arr: any[]): any[];
export declare function unique(arr: any[]): any[];
