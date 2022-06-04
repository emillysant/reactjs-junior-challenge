import React from "react";
import { Container, Imagem } from "./Footer.styles";
import logoInstagem from "../../imgs/instagram-logo.svg";
import logoFacebook from "../../imgs/facebook-logo.svg";

function Footer() {
  return (
    <Container>
      <div>
        <div>Contatos</div>
        <div>(XX)-X.XXXX-XXXX</div>
      </div>
      <div>
        <div>Redes Sociais</div>
        <div>
          <a href="https://www.facebook.com/">
            <Imagem src={logoFacebook}  alt="Facebook"/>
          </a>
          <a href="https://www.instagram.com/">
            <Imagem src={logoInstagem} alt="Instagram"/>
          </a>
        </div>
      </div>
    </Container>
  );
}

export default Footer;
