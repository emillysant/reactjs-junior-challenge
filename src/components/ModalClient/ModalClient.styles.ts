import { Input, Typography } from "@mui/material";
import styled from "styled-components";


export const TypographyHeader = styled(Typography)`
    && {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 2px solid red;
        padding: 10px;
    }
`
export const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const InputsContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

export const InputAdress = styled(Input)`
    && {
        width: 100%;
        margin-bottom: 10px;
    }
`

export const InputNote = styled(Input)`
    && {
        width: 100%;
        height: 200px;
        margin-bottom: 10px;   
    }
`

export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`

export const style = {
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
