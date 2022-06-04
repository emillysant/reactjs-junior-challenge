import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SubmitHandler, useForm } from "react-hook-form";
import { DeleteClient } from "../../endpoints/Delete";
import { UpdateClient } from "../../endpoints/Update";
import { CreateClient } from "../../endpoints/Create";
import { Button, Input } from "@mui/material";

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

function ModalClient(props: any) {
  const deleteClient = async (id: any) => {
    DeleteClient(id);
    props.handleClose();
  };

  const onSubmit: SubmitHandler<IClient> = async (data) => {
    if (props.selectedClient?.guid !== undefined) {
      UpdateClient(data, props.selectedClient);
    } else {
      CreateClient(data);
    }
    props.handleClose();
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h5">
          Dados do Cliente
        </Typography>
        <Typography id="modal-modal-description" component={"div"}>
          <form onSubmit={props.handleSubmit(onSubmit)}>
            <div className="inputsContainers">
              <div className="inputsContent">
                <div>
                  <Input
                    type="text"
                    placeholder="Nome"
                    defaultValue={props.selectedClient?.name}
                    {...props.register("name", {
                      required: "requerido",
                      pattern: {
                        value: /[A-Z][a-z]* [A-Z][a-z]*/,
                        message: "Nome inválido",
                      },
                    })}
                  />
                  <Input
                    type="text"
                    placeholder="Telefone"
                    {...props.register("phone", {
                      required: false,
                    })}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Empresa"
                    {...props.register("company", {
                      required: false,
                    })}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    {...props.register("email", {
                      required: "requerido",
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: "Email inválido",
                      },
                    })}
                  />
                </div>
              </div>
              <Input
                className="inputAdress"
                type="text"
                placeholder="Endereço"
                {...props.register("address", {
                  required: false,
                })}
              />
              <Input
                className="inputNotes"
                type="text"
                placeholder="Notas"
                {...props.register("note", {
                  required: false,
                })}
              />
            </div>
            <div className="buttonGroup">
              <Button variant="contained" color="success" type="submit">
                Salvar
              </Button>
              <Button variant="contained" onClick={props.handleClose}>
                Cancelar
              </Button>
              {props.selectedClient ? (
                <Button
                  variant="contained"
                  color="error"
                  onClick={(e) => deleteClient(props.selectedClient?.id)}
                >
                  Deletar
                </Button>
              ) : null}
            </div>
          </form>
        </Typography>
      </Box>
    </Modal>
  );
}

export default ModalClient;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
