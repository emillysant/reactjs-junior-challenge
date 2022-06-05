import React from "react";

export interface IClient {
    id?: number;
    guid: string;
    name: string;
    company?: string;
    email: string;
    phone?: string;
    address?: string;
    note?: string;
    isActive: boolean;
  }