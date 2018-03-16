import { AddressResponse } from "../types";
export declare function checkValues(obj1: any, obj2: any, rootName: any): AddressResponse;
export declare function getOnlyFirstValues(obj1: any, obj2: any, key: any, rootName: any, path: any): boolean;
export declare function getOnlySecondValues(obj1: any, obj2: any, key: any, rootName: any, path: any): void;
export declare function getDifferentValues(obj1: any, obj2: any, key: any, rootName: any, path: any): false | undefined;
export declare function getSameValues(obj1: any, obj2: any, key: any, rootName: any, path: any): void;
