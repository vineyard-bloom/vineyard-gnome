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

const myObj = {
 floo: {
  bar: "ter"
 },
 status: "localhost",
 goal: "localhost",
 result: [
  {
   hash: "00x3505799c9749cfa7f1c45cd8888d6c001c257a4a34713b46e92bdc576e95b3cf",
  },
  {
   hashh: "foo",
  },
 ]
};
const value = "foo"
const blahPath = myObj.paths()[value]; // the value can be set dynamically and if exists it's path will be listed.
console.log(blahPath);