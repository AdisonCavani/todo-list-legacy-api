import type { BaseDto } from "@api/dtos/BaseDto";
import type { BaseReq } from "@api/req/BaseReq";
import type { BaseRes } from "@api/res/BaseRes";

export class RestClient {
  private _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  public async get<T extends BaseRes | BaseDto>(path: string, req?: BaseReq) {
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

    return res.json() as unknown as T;
  }

  public async post<T extends BaseRes>(path: string, req?: BaseReq) {
    const queryUrl = this._baseUrl + path;

    const res = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json() as unknown as T;
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
