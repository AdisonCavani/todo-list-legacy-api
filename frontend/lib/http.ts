export class RestClient {
  private _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  public async get<T>(path: string, req?: any, jwtToken?: string) {
    const queryUrl = req
      ? `${this._baseUrl + path}?${appendParams(req)}`
      : this._baseUrl + path;

    let headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (jwtToken)
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      };

    const res = await fetch(queryUrl, {
      method: "GET",
      headers: headers,
    });

    if (!res.ok) throw new Error("Failed to fetch data");

    if (res.status === 204) return;

    return res.json() as T;
  }

  public async post<T>(path: string, req?: any, jwtToken?: string) {
    const queryUrl = this._baseUrl + path;

    let headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (jwtToken)
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      };

    const res = await fetch(queryUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(req),
    });

    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json() as T;
  }

  public async patch<T>(path: string, req?: any, jwtToken?: string) {
    const queryUrl = this._baseUrl + path;

    let headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (jwtToken)
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      };

    const res = await fetch(queryUrl, {
      method: "PATCH",
      headers: headers,
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
