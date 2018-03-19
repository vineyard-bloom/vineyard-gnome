import { AddressResponse } from "../types";
export declare function checkValues(obj1: any, obj2: any, originalObj1?: any, originalObj2?: any): AddressResponse;
export declare function paths(root: never[] | undefined, result: {} | undefined, obj: any, key: any): {};
export declare function getOnlyFirstValues(obj1: any, obj2: any, key: any, path: any): boolean;
export declare function getOnlySecondValues(obj1: any, obj2: any, key: any, rootName: any, path: any): void;
export declare function getDifferentValues(obj1: any, obj2: any, key: any, path1: any, path2: any): false | undefined;
export declare function getSameValues(obj1: any, obj2: any, key: any, path1: any, path2: any): void;
