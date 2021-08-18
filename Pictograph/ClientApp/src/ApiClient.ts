const headers = {
  "Content-Type": "application/json",
};

async function fetchRequest(method: 'GET' | 'POST' | 'PUT', url: string, data?: any) {
  const options = {
    method,
    headers: { ...headers },
    body: data ? JSON.stringify(data) : undefined,
  };

  const res = await fetch(url, options);

  if (res.status !== 200) {
    return res
      .json()
      .then((data) => Promise.reject({ status: res.status, data }));
  }

  return await res.json();
}

export class ApiClient {
  readonly endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  post<T = any>(url = "", data: object): Promise<T>{
    return fetchRequest("POST", this.endpoint + url, data);
  }

  get<T = any>(url = ""): Promise<T> {
    return fetchRequest("GET", this.endpoint + url, null);
  }

  put<T = any>(url = "", data: object): Promise<T> {
    return fetchRequest("PUT", this.endpoint + url, data);
  }
}
