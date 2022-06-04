import { Button } from "@mui/material";
import React from "react";
import { Container } from "./Pagination.styles";

function Pagination(_props: any) {
  return (
    <Container>
      {Array.from(Array(_props.pages), (item, index) => {
        return (
          <Button
            key={index}
            value={index}
            onClick={(e) =>
              _props.setCurrentPage(
                Number((e.target as HTMLButtonElement).value)
              )
            }
          >
            {index + 1}
          </Button>
        );
      })}
    </Container>
  );
}

export default Pagination;
