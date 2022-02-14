"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hello_1 = require("handlers/src/hello");
describe('hello', () => {
    it('returns 200', () => {
        expect((0, hello_1.handler)()).resolves.toEqual(200);
    });
});
//# sourceMappingURL=hello.spec.js.map