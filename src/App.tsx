import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetClients } from "./hooks/getClients";
import Header from "./components/Header/Header";
import Pagination from "./components/pagination/Pagination";
import Clients from "./components/Clients/Clients";
import ModalClient from "./components/ModalClient/ModalClient";
import Footer from "./components/Footer/Footer";
import { IClient } from "./database/ClientInterface";

function App() {
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedClient, SetSelectedCliendt] = useState<IClient | null>(null);
  const [open, setOpen] = React.useState(false);
  const [clients, isLoading, error] = useGetClients(open);

  const pages = Math.ceil(clients.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let filteredItems = clients?.filter((client: any) => {
    return (
      client.name.toLowerCase().includes(search.toLowerCase()) +
      client.company?.toLowerCase().includes(search.toLowerCase()) +
      client.phone?.toLowerCase().includes(search.toLowerCase()) +
      client.email.toLowerCase().includes(search.toLowerCase()) +
      client.isActive
        ?.toString()
        .includes(search.toLowerCase() === "ativo" ? "true" : "false")
    );
  });
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const SelectClient = async (e: any) => {
    SetSelectedCliendt(e);
    reset({
      name: e.name,
      company: e.company,
      email: e.email,
      phone: e.phone,
      address: e.address,
      note: e.note,
    });
    handleOpen();
  };

  const handleOpenCreateClient = () => {
    SetSelectedCliendt(null);
    reset({
      name: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      note: "",
    });
    handleOpen();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    SetSelectedCliendt(null);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IClient>();

  return (
    <div className="App">
      <Header
        search={search}
        setSearch={setSearch}
        handleOpen={handleOpenCreateClient}
      />
      <Clients currentItems={currentItems} SelectClient={SelectClient} />
      <Pagination pages={pages} setCurrentPage={setCurrentPage} />
      <ModalClient
        selectedClient={selectedClient}
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        register={register}
      />
      <Footer />
    </div>
  );
}

export default App;
