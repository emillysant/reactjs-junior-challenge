import React from "react";
import axios from "axios";
import { generateId } from "../services/IdGenerator";
import {environment} from "../environment/environment"
const baseUrl = environment.baseUrl;

export const CreateClient = (formData: any) => {
  formData.guid = generateId();
  formData.isActive = true;

  const createClient = async () =>
    await axios
      .post(`${baseUrl}/clients`, formData)
      .then((response) => {
        //console.log("response", response);
      })
      .catch((error) => {
        //console.log(error.response);
      });
      
  createClient();
};
