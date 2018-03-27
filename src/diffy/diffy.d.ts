import { AddressResponse } from "../types";
export declare function checkValues(obj1: object, obj2: object, originalObject1: object, originalObject2: object, rootname: string): AddressResponse;
export declare function getOnlyFirstValues(obj1: object, obj2: object, originalObject1: object, key: string, rootname: string): Promise<void>;
export declare function getOnlySecondValues(obj1: object, obj2: object, originalObject2: object, key: string, rootname: string): void;
export declare function getDifferentValues(obj1: object, obj2: object, originalObject1: object, originalObject2: object, key: string, rootname: string): void;
export declare function getSameValues(obj1: object, obj2: object, originalObject1: object, originalObject2: object, key: string, rootname: string): void;
export declare function uniqueFirstAndSecond(arr: any[]): any[];
export declare function unique(arr: any[]): any[];
