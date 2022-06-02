import { useState, useEffect } from "react";
import "./App.css";

const baseUrl = "http://localhost:8000";

function App() {
  const [items, setItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const pages = Math.ceil(items.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let filteredItems = items?.filter(
    (client: any) => {
      return client.name.toLowerCase().includes(search.toLowerCase());
    }
  )
  const currentItems = filteredItems.slice(startIndex, endIndex)
  console.log("search", search, filteredItems);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${baseUrl}/clients`)
        .then((response) => {
          console.log("response", response);
          return response.json();
        })
        .then((data) => {
          console.log("data", data);
          setItems(data);
        });
    };
    fetchData();

    console.log("items", items);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo"></div>
        <h1>Frontend Challenge</h1>
      </header>
      <div className="container">
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por nome"
          />
        </div>
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
            {currentItems ? (
              currentItems.map((item: any) => {
                return (
                  <tr className="item" key={item.guid}>
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
        <div className="Pagination">
          {Array.from(Array(pages), (item, index) => {
            return (
              <button
                key={index}
                value={index}
                onClick={(e) =>
                  setCurrentPage(Number((e.target as HTMLButtonElement).value))
                }
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
