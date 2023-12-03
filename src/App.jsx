import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import TableMain from "./Components/Table";
import { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";

function App() {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (data.length > 0) {
        return;
      }
      setFetching(true);
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchedData = await response.json();
        setData(fetchedData);
        console.log(fetchedData);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  // Table Controllers
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Selection and Deleteion
  const [selectedUsers, setSelectedUsers] = useState({});

  const deleteHandler = (id) => {
    let temp = [...data];
    temp = temp.filter((x) => x.id !== id);
    setData((prev) => {
      return temp;
    });
  };

  return (
    <>
      <div className="container">
        <div className="first">
          <input
            type="text"
            name=""
            placeholder="Search..."
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
        <TableMain
          fetching={fetching}
          page={page}
          rowsPerPage={rowsPerPage}
          data={data}
          setData={setData}
        />
        <div className="footer">
          <TablePagination
            rowsPerPageOptions
            component="div"
            count={data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            deleteHandler={deleteHandler}
          />
        </div>
      </div>
    </>
  );
}

export default App;
