import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import TableMain from "./Components/Table";
import { useState } from "react";

function App() {
  const [data, setData] = useState();
  const [fetching, setFetching] = useState(false);
  return (
    <>
      <div className="container">
        <div className="first">
          <input
            type="text"
            name=""
            placeholder="Enter Value..."
            className="search"
            id=""
          />

          <span
            className="icon-container red"
            style={{ background: "#FF6969" }}
          >
            <AiOutlineDelete color="white" />
          </span>
        </div>
        <TableMain />
      </div>
    </>
  );
}

export default App;
