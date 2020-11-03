import '@testing-library/jest-dom/extend-expect';
import {initTestApiCache} from "./test/apiCache/getData/httpStore.service";
import "jest-expect-message";
import "./test/expect/approx.expect"

initTestApiCache();

HTMLCanvasElement.prototype.getContext = () => {
    // return whatever getContext has to return
};
jest.setTimeout(10000);