"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//SingleTransaction
const onlyFirst = [];
const onlySecond = [];
const differences = [];
const same = [];
function compare(first, second, path, secondName) {
    let messages = [];
    for (let i in first) {
        console.log('%c ( ͡° ͜ʖ ͡°)', 'color:tomato;font-size:30px;', first);
        const secondValue = second ? second[i] : undefined;
        if (secondValue === undefined) {
            onlyFirst.push({ path: `first.${i}`, value: first[i] });
            const pathString = path.concat(i).join('.');
            // messages.push(secondName + ' is missing ' + pathString)
        }
        console.log('%c ( ͡° ͜ʖ ͡°)', 'color:tomato;font-size:30px;', secondValue, first[i]);
        if (secondValue && secondValue !== first[i]) {
            if (first[i] && typeof first[i] === 'object') {
                compare(first[i], secondValue, path.concat(i), secondName);
                // messages = messages.concat(compare(firstValue, secondValue, path.concat(i), secondName))
            }
            differences.push({ first: { path: `first.${i}`, value: first[i] }, second: { path: `second.${i}`, value: second[i] } });
        }
        if (secondValue === first[i]) {
            same.push({ first: { path: `first.${i}`, value: first[i] }, second: { path: `second.${i}`, value: second[i] } });
        }
        const firstValue = first[i];
        if (firstValue && typeof firstValue === 'object') {
            compare(firstValue, secondValue, path.concat(i), secondName);
            // messages = messages.concat(compare(firstValue, secondValue, path.concat(i), secondName))
        }
    }
    for (let i in second) {
        const firstValue = first ? first[i] : undefined;
        if (firstValue === undefined) {
            onlySecond.push({ path: `second.${i}`, value: second[i] });
            const pathString = path.concat(i).join('.');
            // messages.push(secondName + ' is missing ' + pathString)
        }
        const secondValue = second[i];
        if (secondValue && typeof secondValue === 'object') {
            compare(firstValue, secondValue, path.concat(i), secondName);
            // messages = messages.concat(compare()
        }
    }
    return {
        differences: differences,
        same: same,
        onlyFirst: onlyFirst,
        onlySecond: onlySecond,
    };
}
exports.compare = compare;
function flatten(data) {
    var result = {};
    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        }
        else if (Array.isArray(cur)) {
            for (var i = 0, l = cur.length; i < l; i++)
                recurse(cur[i], prop + "[" + i + "]");
            if (l == 0)
                result[prop] = [];
        }
        else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop + "." + p : p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
}
//# sourceMappingURL=diffy.js.map