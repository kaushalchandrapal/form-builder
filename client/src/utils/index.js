import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '',
  headers: { 'Cache-Control': 'no-cache, private', Expires: 0 },
});

export function AuthRequestTransformer(config = {}, isUnAuthRequest = false, noHeaders = false) {
  const newConfig = { ...config };
  const token = localStorage.getItem('authToken'); // Retrieve token from sessionStorage

  if (isUnAuthRequest) {
    // For unauthenticated requests, remove the Authorization header
    newConfig.transformRequest = [
      (data, headers) => {
        if (headers) {
          delete headers['Authorization'];
        }
        return data;
      },
      ...(Array.isArray(config.transformRequest) ? config.transformRequest : [config.transformRequest ?? ((data) => data)]),
    ];
  } else if (noHeaders) {
    // For requests without headers, adjust Cache-Control headers
    newConfig.transformRequest = [
      (data, headers) => {
        if (headers) {
          headers['Cache-Control'] = 'private, max-age=86400';
          delete headers['Pragma'];
          delete headers['Expires'];
        }
        return data;
      },
      ...(Array.isArray(config.transformRequest) ? config.transformRequest : [config.transformRequest ?? ((data) => data)]),
    ];
  } else {
    // Add Authorization header for authenticated requests
    newConfig.headers = {
      ...newConfig.headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    };
  }

  return newConfig;
}

export const HttpClient = {
  get: (url, config = axiosInstance.defaults, noAuth = false, noHeaders = false) => {
    const finalConfig = AuthRequestTransformer(config, noAuth, noHeaders);
    console.log('GET Request Config:', finalConfig); // Debugging
    return axiosInstance.get(url, finalConfig);
  },

  post: (url, data, config = axiosInstance.defaults, noAuth = false) => {
    const finalConfig = AuthRequestTransformer(config, noAuth);
    console.log('POST Request Config:', finalConfig); // Debugging
    return axiosInstance.post(url, data, finalConfig);
  },

  put: (url, data, config = axiosInstance.defaults, noAuth = false) => {
    const finalConfig = AuthRequestTransformer(config, noAuth);
    console.log('PUT Request Config:', finalConfig); // Debugging
    return axiosInstance.put(url, data, finalConfig);
  },

  delete: (url, config = axiosInstance.defaults, noAuth = false) => {
    const finalConfig = AuthRequestTransformer(config, noAuth);
    console.log('DELETE Request Config:', finalConfig); // Debugging
    return axiosInstance.delete(url, finalConfig);
  },
};
