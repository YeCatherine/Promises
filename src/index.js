import "./styles.css";
// import * from './old.js';
import {
  runAsyncFunctions,
  runAsyncFunctionsPromiseAll,
  forAwaitExample2,
  runAsyncFunctionsPromiseAllSettled,
  runAsyncFunctionsPromiseAllSettled2
} from "./secondRound";

(async () => {
  try {
    await runAsyncFunctionsPromiseAll();
    await runAsyncFunctionsPromiseAllSettled();
    await runAsyncFunctionsPromiseAllSettled2();
    await forAwaitExample2();
    await runAsyncFunctions();
  } catch (e) {
    // Deal with the fact the chain failed
  }
})();
