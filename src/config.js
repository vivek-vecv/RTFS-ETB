//export const API_URL = "http://localhost/dashboard/apis";
export const API_URL = "http://10.106.51.37/dashboard/apis";

export const CreateArray = (data) => {
  data = Array.isArray(data) ? data : data ? [data] : [];
  return data;
};
