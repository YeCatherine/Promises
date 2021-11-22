// First promise returns an array after a delay
const getUsers = () => {
  return fetch("https://reqres.in/api/users?delay=1")
    .then((response) => response.json())
    .then((json) => json.data);
};

// load User.
const loadUser = (user) => {
  return fetch(`https://reqres.in/api/users/${user.id}?delay=1`)
    .then((response) => response.json())
    .then((json) => json.data);
};

/**
 * Mocking of legacy approach.
 */
export const runAsyncFunctions = async () => {
  let timeStart = performance.now();
  const users = await getUsers();

  for (let user of users) {
    const userId = await loadUser(user);
  }

  let timeEnd = performance.now();

  let funcSpeed1 = timeEnd - timeStart;
  console.debug("Legacy:", funcSpeed1);

  document
    .getElementById("legacy")
    .insertAdjacentHTML(
      "afterend",
      `<h3> ===== Legacy1 ===== | ${(funcSpeed1 / 1000).toFixed(2)} sec </h3>`
    );
  return funcSpeed1;
};

/**
 * Mocking of Promise.AllSettled
 */
export const runAsyncFunctionsPromiseAll = async () => {
  const timeStart = performance.now();
  const users = await getUsers();
  const validIds = [];
  await Promise.all(
    users.map(async (user) => {
      const userId = await loadUser(user);
      validIds.push(userId);
      return userId;
    })
  );

  console.log("validIDs", validIds);

  const timeEnd = performance.now();

  let funcSpeed2 = timeEnd - timeStart;

  console.debug("PromiceAll:", funcSpeed2);
  document
    .getElementById("promise-all")
    .insertAdjacentHTML(
      "afterend",
      `<h3> PromiseAll : | <i>${(funcSpeed2 / 1000).toFixed(2)} sec </i></h3>`
    );
  return funcSpeed2;
};

/**
 * Mocking of Promise.AllSettled
 */
export const runAsyncFunctionsPromiseAllSettled = async () => {
  const timeStart = performance.now();
  const users = await getUsers();
  const validIds = [];

  await Promise.allSettled(
    users.map(async (user) => {
      const userId = await loadUser(user);
      validIds.push(userId);
      return userId;
    })
  );

  //console.log("validIDs", validIds);

  const timeEnd = performance.now();

  let funcSpeed = timeEnd - timeStart;

  console.debug("PromiceAllSettled:", funcSpeed);
  document
    .getElementById("settled")
    .insertAdjacentHTML(
      "afterend",
      `<h3> PromiseAllSettled | ${(funcSpeed / 1000).toFixed(2)} sec </h3>`
    );
  return funcSpeed;
};

/**
 * Mocking of Promise.AllSettled
 */
export const runAsyncFunctionsPromiseAllSettled2 = async () => {
  const timeStart = performance.now();
  //let validTemplatePromises =
  const users = await getUsers();
  const validIds = [];

  const promises = users.map(async (user) => {
    return loadUser(user).then((userId) => {
      console.log("user ID ", userId);
      validIds.push(userId);
      return userId;
    });
  });
  await Promise.allSettled(promises);

  //console.log("validIDs", validIds);

  const timeEnd = performance.now();

  let funcSpeed = timeEnd - timeStart;

  console.debug("PromiceAllSettled:", funcSpeed);
  document
    .getElementById("settled2")
    .insertAdjacentHTML(
      "afterend",
      `<h3> PromiseAllSettled | ${(funcSpeed / 1000).toFixed(2)} sec </h3>`
    );
  return funcSpeed;
};
/**
 * For Await.
 */
export async function forAwaitExample2() {
  const timeStart = performance.now();
  const users = await getUsers();
  for await (const user of users) {
    const userId = await loadUser(user);

    let timeEnd = performance.now();

    let funcSpeed = timeEnd - timeStart;
    document
      .getElementById("for-await")
      .insertAdjacentHTML(
        "afterend",
        `<h3>===For await=== | ${(funcSpeed / 1000).toFixed(2)} sec</h3>`
      );
  }
}
