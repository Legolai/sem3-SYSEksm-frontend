function handleHttpErrors(res: Response) {
  if (!res.ok) {
    return Promise.reject<{ status: string, fullError: {}; }>({ status: res.status, fullError: res.json() });
  }
  return Promise.resolve(res.json() as { [key: string]: any; });
}

const setToken = (token: string) => {
  localStorage.setItem("jwtToken", token);
};

const getToken = () => {
  const value = localStorage.getItem("jwtToken");
  if (value == null) return undefined;
  return value;
};

const loggedIn = () => {
  return getToken() != undefined;
};


function makeOptions<T>(method: "GET" | "POST" | "DELETE" | "PUT" | "HEAD", addToken: boolean, body?: T) {
  method = method ? method : "GET";
  const opts: {
    method: string,
    headers: {
      "Content-type"?: string;
      Accept: string;
      "x-access-token"?: string;
    },
    body?: string;
  } = {
    method: method,
    headers: {
      ...(["PUT", "POST"].includes(method) && {
        "Content-type": "application/json",
      }),
      Accept: "application/json",
    },
  };
  if (addToken && loggedIn()) {
    opts.headers["x-access-token"] = getToken();
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

export {
  makeOptions,
  loggedIn,
  getToken,
  handleHttpErrors,
  setToken
};