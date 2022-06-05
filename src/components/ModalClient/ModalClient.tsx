import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SubmitHandler, useForm } from "react-hook-form";
import { DeleteClient } from "../../endpoints/Delete";
import { UpdateClient } from "../../endpoints/Update";
import { CreateClient } from "../../endpoints/Create";
import { Button, Input } from "@mui/material";
import {
  TypographyHeader,
  style,
  InputAdress,
  InputNote,
  InputsContainer,
  InputsContent,
  ButtonGroup
} from "./ModalClient.styles";

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
        <TypographyHeader id="modal-modal-title" variant="h5">
          Dados do Cliente
        </TypographyHeader>
        <Typography id="modal-modal-description" component={"div"}>
          <form onSubmit={props.handleSubmit(onSubmit)}>
            <InputsContainer>
              <InputsContent>
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
              </InputsContent>
              <InputAdress
                type="text"
                placeholder="Endereço"
                {...props.register("address", {
                  required: false,
                })}
              />
              <InputNote
                type="text"
                placeholder="Notas"
                {...props.register("note", {
                  required: false,
                })}
              />
            </InputsContainer>
            <ButtonGroup>
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
            </ButtonGroup>
          </form>
        </Typography>
      </Box>
    </Modal>
  );
}

export default ModalClient;
