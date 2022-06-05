import React from "react";
import axios from "axios";
import {environment} from "../environment/environment"
const baseUrl = environment.baseUrl;

export const DeleteClient = (id: any) => {
  const deleteClient = async () =>
    await axios
      .delete(`${baseUrl}/clients/${id}`)
      .then((res) => {})
      .catch((error) => {
        //console.log(error.response);
      });

  deleteClient();
};
