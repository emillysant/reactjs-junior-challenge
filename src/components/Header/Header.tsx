import React from "react";
import { Head, Container, TextFieldHead } from "./Header.styles";
import { useState} from "react";


function Header(_props: any) {

  return (
    <Container>
      <Head>Frontend Challenge</Head>
      <TextFieldHead id="outlined-basic" label="Pesquisar" variant="outlined" 
            type="text"
            value={_props.search}
            onChange={(e) => _props.setSearch(e.target.value)}
            placeholder="Pesquisar por nome"
          />
          <button onClick={_props.handleOpen}>Adicionar Cliente</button>
    </Container>
  );
}

export default Header;
