import { AddressResponse } from "../types";
export declare function checkValues(obj1: object, obj2: object, originalObject1: object, originalObject2: object, rootname: string, onlyFirst: any[], onlySecond: any[], differences: any[], same: any[]): AddressResponse;
export declare function getOnlyFirstValues(value: any, path: any[], onlyFirst: any[]): Promise<void>;
export declare function getOnlySecondValues(value: any, path: any[], rootname: string, onlySecond: any[]): void;
export declare function getDifferentValues(val1: any, val2: any, path1: string[], path2: string[], rootname: string, differences: any[]): void;
export declare function getSameValues(val1: any, val2: any, path1: string[], path2: string[], rootname: string, same: any[]): void;
export declare function uniqueFirstAndSecond(arr: any[]): any[];
export declare function unique(arr: any[]): any[];
