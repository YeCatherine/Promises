const emulate = (id, ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(`inside promise (${id}, ${ms})`);
      resolve(id);
    }, ms);
  });

let urls = [
  "https://reqres.in/api/users?delay=1", // 1 sec delay
  "https://reqres.in/api/users?delay=2", // 2 sec delay.
  "https://reqres.in/api/users?delay=3", // 3 sec delay.
  "https://reqres.in/api/users?delay=4",
  "https://reqres.in/api/users?delay=5",
  "https://reqres.in/api/users?delay=6",
  "https://reqres.in/api/users?delay=7",
  "https://reqres.in/api/users?delay=8",
  "https://reqres.in/api/users?delay=9",
  "https://reqres.in/api/users?delay=10" // 10 sec delay.
];

// Async function with performance checking,.
const checkUrl = async function checkUrl(url) {
  await fetch(url);
  setTimeout(
    console.log(`fetch url ${url} - ${performance.now().toFixed(2)}`),
    1000
  );
};
const promises = urls.map((url) => checkUrl(url));

const p2 = new Promise((resolve, reject) =>
  setTimeout(resolve, 1000, "rejected")
);
promises.push(p2);
const p3 = new Promise((resolve, reject) =>
  setTimeout(resolve, 1000, "rejected")
);
promises.push(p3);

export async function legacy(promises) {
  for (const promise of promises) {
    const test = await promise;
    document
      .getElementById("legacy")
      .insertAdjacentHTML(
        "afterend",
        `<h3>Legacy Approach | ${(performance.now() / 1000).toFixed(
          2
        )} sec</h3>`
      );
  }
}
export async function promiseAllExample() {
  for (const promise of await Promise.all(promises)) {
    //    console.log("Promise.all:", promise);
    document
      .getElementById("app")
      .insertAdjacentHTML(
        "afterend",
        `<h3> == Promise.all == | ${(performance.now() / 1000).toFixed(
          2
        )} sec</h3>`
      );
  }
}
export async function promiseAllSettledExample() {
  for (const promise of await Promise.allSettled(promises)) {
    console.log("Promise.allSettled:", promise);
    document
      .getElementById("settled")
      .insertAdjacentHTML(
        "afterend",
        `<h3>Promise.allSettled | ${(performance.now() / 1000).toFixed(
          2
        )} sec</h3>`
      );
  }
}

export async function forAwaitExample() {
  for await (const promise of promises) {
    console.log("modern", promise);
    document
      .getElementById("for-await")
      .insertAdjacentHTML(
        "afterend",
        `<h3>===For await=== | ${(performance.now() / 1000).toFixed(
          2
        )} sec</h3>`
      );
  }
}

//legacy(promises);
//promiseAllExample();
//promiseAllSettledExample();
//forAwaitExample();
