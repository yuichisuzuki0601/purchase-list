import AsyncStorage from '@react-native-async-storage/async-storage';

const getUrl = (path: string) => (!path.startsWith('http') ? `http://localhost:8080/${path}` : path);

export async function apiGet(path: string, params?: { [key: string]: any }) {
  const url = params ? `${getUrl(path)}?${new URLSearchParams(params)}` : getUrl(path);
  const headers: any = {
    Authorization: (await AsyncStorage.getItem('Authorization')) || ''
  };
  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers
    });
    const contentType = response.headers.get('content-type');
    if (!contentType) {
      return null;
    }
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      throw {
        status: response.status,
        body: json
      };
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function apiPost(path: string, params?: FormData | { [key: string]: any }) {
  const headers: any = {};
  let body: any = params;
  if (params && !(params instanceof FormData)) {
    headers['Authorization'] = (await AsyncStorage.getItem('Authorization')) || '';
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(params);
  }
  try {
    const response = await fetch(getUrl(path), {
      method: 'POST',
      mode: 'cors',
      headers,
      body
    });
    const token = response.headers.get('Authorization');
    if (token) {
      return token;
    }
    const contentType = response.headers.get('content-type');
    if (!contentType) {
      return null;
    }
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      throw {
        status: response.status,
        body: json
      };
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function apiPut(path: string, params?: { [key: string]: any }) {
  const headers: any = {
    Authorization: (await AsyncStorage.getItem('Authorization')) || ''
  };
  let body: any = params;
  headers['Content-Type'] = 'application/json';
  body = JSON.stringify(params);
  try {
    const response = await fetch(getUrl(path), {
      method: 'PUT',
      mode: 'cors',
      headers,
      body
    });
    const contentType = response.headers.get('content-type');
    if (!contentType) {
      return null;
    }
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      throw {
        status: response.status,
        body: json
      };
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}
