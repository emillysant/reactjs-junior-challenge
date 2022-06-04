import React from "react";
import axios from "axios";
const baseUrl = "http://localhost:8000";

export const DeleteClient = (id: any) => {
  const deleteClient = async () =>
    await axios
      .delete(`${baseUrl}/clients/${id}`)
      .then((res) => {})
      .catch((error) => {
        console.log(error.response);
      });

  deleteClient();
};
