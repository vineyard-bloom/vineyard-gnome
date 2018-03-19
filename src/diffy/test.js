"use strict";
Object.prototype.paths = function (root = [], result = {}) {
    var ok = Object.keys(this);
    return ok.reduce((res, key) => {
        var path = root.concat(key);
        typeof this[key] === "object" &&
            this[key] !== null ? this[key].paths(path, res)
            : res[this[key]] == 0 || res[this[key]] ? res[this[key]].push(path)
                : res[this[key]] = [path];
        return res;
    }, result);
};
var myObj = {
    obj1: {
        obj2: {
            data1: 213,
            data2: "1231",
            obj3: {
                data: "blah"
            }
        }
    },
    obj4: {
        description: "toto",
        cougars: "Jodi",
        category: "blah"
    }
}, value = "blah", blahPath = myObj.paths()[value]; // the value can be set dynamically and if exists it's path will be listed.
console.log(blahPath);
//# sourceMappingURL=test.js.map