import React from "react";
import { Head, Container, TextFieldHead } from "./Header.styles";
import { useState} from "react";
import { Button } from "@mui/material";
import logo from "../../imgs/logo.png"; 


function Header(props: any) {

  return (
    <Container>
      <Head><img src={logo}/></Head>
      <TextFieldHead id="outlined-basic" label="Pesquisar" variant="outlined" 
            type="text"
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
            placeholder="Pesquisar por nome"
          />
          <Button color="error" variant="contained" onClick={props.handleOpen}>Adicionar Cliente</Button>
    </Container>
  );
}

export default Header;
