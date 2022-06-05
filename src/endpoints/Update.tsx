import React, { useState } from "react";
import axios from "axios";
import {environment} from "../environment/environment"
const baseUrl = environment.baseUrl;

export const UpdateClient = (formData: any, selectedClient: any) => {

  formData.guid = selectedClient.guid;
  formData.id = selectedClient.id;
  formData.isActive = selectedClient.isActive;

  const updateClient = async () =>
    await axios
      .put(`${baseUrl}/clients/${formData.id}`, formData)
      .then((response) => {
        //console.log("response", response);
      })
      .catch((error) => {
        //console.log(error.response);
      });

  updateClient();
};
