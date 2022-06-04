import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Pagination from "./components/pagination/Pagination";
import Clients from "./components/Clients/Clients";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { generateId } from "./services/IdGenerator";
import axios from "axios";
import { useGetClients } from "./hooks/getClients";
import { UpdateClient } from "./endpoints/Update";
import { CreateClient } from './endpoints/Create';
import { DeleteClient } from "./endpoints/Delete";

const baseUrl = "http://localhost:8000";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IClient {
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
function App() {
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedClient, SetSelectedCliendt] = useState<IClient | null>(null);
  const [clients, isLoading, error] = useGetClients();
  // problemas na tipagem durante a desestruturação do array

  const pages = Math.ceil(clients.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  console.log("hook client", clients)

  let filteredItems = clients?.filter((client: any) => {
    return client.name.toLowerCase().includes(search.toLowerCase());
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

  const [open, setOpen] = React.useState(false);
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

  const deleteClient = async (id: any) => {
    DeleteClient(id)
    handleClose();
  };

  const onSubmit: SubmitHandler<IClient> = async (data) => {
    if (selectedClient?.guid !== undefined) {
      UpdateClient(data, selectedClient);
    } else {
      CreateClient(data);
    }
    handleClose();
  };

  return (
    <div className="App">
      <Header
        search={search}
        setSearch={setSearch}
        handleOpen={handleOpenCreateClient}
      />
      <Clients currentItems={currentItems} SelectClient={SelectClient} />
      <Pagination pages={pages} setCurrentPage={setCurrentPage} />
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" component={"div"}>
              Dados do Cliente
            </Typography>
            <Typography id="modal-modal-description" component={"div"}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="inputsContainers">
                  <div className="inputsContent">
                    <div>
                      <input
                        type="text"
                        placeholder="Nome"
                        defaultValue={selectedClient?.name}
                        {...register("name", {
                          required: "requerido",
                          pattern: {
                            value: /[A-Z][a-z]* [A-Z][a-z]*/,
                            message: "Nome inválido",
                          },
                        })}
                      />
                      <input
                        type="text"
                        placeholder="Telefone"
                        {...register("phone", {
                          required: false,
                        })}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Empresa"
                        {...register("company", {
                          required: false,
                        })}
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                          required: "requerido",
                          pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                            message: "Email inválido",
                          },
                        })}
                      />
                    </div>
                  </div>
                  <input
                    className="inputAdress"
                    type="text"
                    placeholder="Endereço"
                    {...register("address", {
                      required: false,
                    })}
                  />
                  <input
                    className="inputNotes"
                    type="text"
                    placeholder="Notas"
                    {...register("note", {
                      required: false,
                    })}
                  />
                </div>
                <div className="buttonGroup">
                  <button type="submit">Salvar</button>
                  <button onClick={handleClose}>Cancelar</button>
                </div>
              </form>
            </Typography>
            {selectedClient ? (
              <button onClick={(e) => deleteClient(selectedClient?.id)}>
                Deletar
              </button>
            ) : null}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default App;


