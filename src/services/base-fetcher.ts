type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type FetchOptions = {
  body?: object;
  queryParams?: Record<string, string>;
};

export class BaseFetcher {
  baseUrl = '/api';

  public async request<T>({method = 'GET', options = {}, endpoint = ""}: {method?: Method, options?: FetchOptions, endpoint?: string
}): Promise<T> {
    const { body, queryParams } = options;

    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin);

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => url.searchParams.append(key, value));
    }

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (e) {
      console.error('Request error:', e);
      throw new Error(`Request error`);
    }
  }
}