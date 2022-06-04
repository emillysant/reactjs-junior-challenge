import { TextField } from "@mui/material";
import styled from "styled-components";

export const Head = styled.div`
  margin: 0
  padding: 0  
`;

export const Container = styled.div`
  Display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-bottom: 2px solid red;
  width: 100%;
`

export const TextFieldHead = styled(TextField)`
    width: 500px;
  `;