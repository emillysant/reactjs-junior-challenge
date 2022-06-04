import React, { useState } from "react";
import axios from "axios";
const baseUrl = "http://localhost:8000";

export const UpdateClient = (formData: any, selectedClient: any) => {

  formData.guid = selectedClient.guid;
  formData.id = selectedClient.id;

  const updateClient = async () =>
    await axios
      .put(`${baseUrl}/clients/${formData.id}`, formData)
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log(error.response);

      });

  updateClient();
};
