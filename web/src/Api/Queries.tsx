import { IUser, IPerson} from "../Models/user";
import httpClient from "./api_config";
import { getAccessToken } from "./AccessToken";

export const LoginQuery = async (user : IUser) => {
  try{
    return await httpClient.post("user/login",user);
  }catch(err)
  {
    console.log(err);
  }
}

export const LogOutQuery = async () => {
  try{
    const token = getAccessToken();
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return await httpClient.post("user/logout");
  }catch(err)
  {
    console.log(err);
  }
}

export const RegisterQuery = async (person : IPerson) => {
  try{
    return await httpClient.post("user/register",person);
  }catch(err)
  {
    console.log(err);
  }
}

export const RevokeAccessTokenQuery = async () => {
  try{
    return await httpClient.post("user/revoke");
  }catch(err)
  {
    console.log(err);
  }
}


export const testQuery = async () => {
    try
    {
      const token = getAccessToken();
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return await httpClient.get("test");
    }catch(err)
    {
      console.log(err);
    }
}