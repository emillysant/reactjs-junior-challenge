import React, { MouseEventHandler } from "react";

function Clients(_props: any) {

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Empresa</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {_props.currentItems ? (
            _props.currentItems.map((item: any) => {
              return (
                <tr
                  className="item"
                  key={item.guid}
                  onClick={(e) =>
                    _props.SelectClient(item) as
                      | MouseEventHandler<HTMLTableRowElement>
                      | undefined
                  }
                >
                  <td>{item.name}</td>
                  <td>{item.company}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.isActive ? "Ativo" : "Inativo"}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Nenhum cliente encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;
