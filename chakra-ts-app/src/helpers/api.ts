class API {
  url: string;

  constructor() {
    this.url = "http://localhost:3001";
  }

  fetchJSON = async (endpoint: string, options = {}) => {
    const res = await fetch(this.url + endpoint, options);

    if (!res.ok) {
      throw Error(res.statusText);
    }

    return res.json();
  }

  get = (endpoint: string) => {
    return this.fetchJSON(endpoint, {
      method: "GET",
    });
  };

  post = (endpoint: string, body = {}) => {
    return this.fetchJSON(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  put = (endpoint: string, body = {}) => {
    return this.fetchJSON(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  delete = (endpoint: string) => {
    return this.fetchJSON(endpoint, {
      method: "DELETE",
    });
  }
}

export default new API();
