import {Props} from "../Component/pages/login";
import httpClient from "./api_config";

export const loginQuery = async (user : Props) => {
    try{
      return await httpClient.post("/user/login",user)
    }catch(err)
    {
      console.log(err);
    }
  }