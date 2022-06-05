import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {environment} from "../environment/environment"
const baseUrl = environment.baseUrl;


export const useGetClients = (openModal: any): any[]  => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getClients();
  }, [setClients, openModal]);

  const getClients = async () => {
    await axios
      .get(`${baseUrl}/clients`)
      .then((response) => {
        setClients(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        //console.log(error.response);
        setError(error);
        setIsLoading(false);
      });
  };

  return [clients, isLoading, error];  ;
};
