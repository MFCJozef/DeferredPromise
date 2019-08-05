'use strict';
class PromisedDeferred {
    constructor() {
        this.State = require('deferred')();
    }

    /**
     * Create a promise to receive an object of any kind later (including nothing).
     * @returns a promise to receive an object of any kind later.
     * */
    Promise() {
        var def = this.State;
        return new Promise(function (resolve, reject) {
            var req = function () {

                return def.promise.then(function (value) {
                    resolve(value);
                },
                    function (value) {
                        reject(value)
                    });
            }
            req();
        });
    }
    /**
     * Resolve the item and give a return value of any kind (including nothing).
     * @param {any} arg An of any kind (including an empty) that is returned through the promise.
     */

    Resolve(arg) {
        this.State.resolve(arg);
    }

    Reject(arg) {
        this.State.reject(arg);
    }
}

module.exports = PromisedDeferred;