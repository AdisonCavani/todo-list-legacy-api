export class RestClient {
  private _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  public async get<T>(path: string, req?: any) {
    const queryUrl = req
      ? `${this._baseUrl + path}?${appendParams(req)}`
      : this._baseUrl + path;

    const res = await fetch(queryUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json() as T;
  }

  public async post<T>(path: string, req?: any) {
    const queryUrl = this._baseUrl + path;

    const res = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json() as T;
  }

  public async patch<T>(path: string, req?: any) {
    const queryUrl = this._baseUrl + path;

    const res = await fetch(queryUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json() as T;
  }
}

function appendParams(obj: any): URLSearchParams {
  const params = new URLSearchParams();

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.append(key, obj[key]);
    }
  }

  return params;
}
