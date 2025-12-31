import axios from "axios";

export const createServiceClient = (isMultyPart? : boolean) => {
  const client = axios.create({
    withCredentials:true,
    timeout: 5000,
    headers: {
      "Content-Type": isMultyPart ? 'multipart/form-data' : "application/json",
    },
  });

  return client;
};
