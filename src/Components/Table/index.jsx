import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { StyledTableCell, StyledTableRow } from "../../Utils/MaterialUi";
import { FiEdit } from "react-icons/fi";
import "./index.css";
import { AiOutlineDelete } from "react-icons/ai";

function TableMain({
  data,
  setData,
  fetching,
  page,
  rowsPerPage,
  selectedUsers,
  setSelectedUsers,
}) {
  const deleteHandler = (id) => {
    let temp = [...data];
    temp = temp.filter((x) => x.id !== id);
    setData((prev) => {
      return temp;
    });
  };

  const defaultEditState = { id: null, name: "", email: "", role: "" };
  const [editState, setEditState] = useState(defaultEditState);

  const editHandler = () => {
    //Do Something
    setData((prev) => {
      let temp = [...prev];
      temp.splice(editState.id, 1, { ...editState });
      return temp;
    });
  };
  return (
    <Box sx={{ width: "99%", margin: "0.5rem 0" }}>
      <Paper
        sx={{ width: "100%", mb: 2 }}
        style={{
          boxShadow: "0px 0px 6px 0px rgb(225 225 225)",
          borderRadius: "12px",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: "75vw" }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  style={{ borderRadius: "1rem" }}
                  id="campaign-brand-data-select-table-header"
                  align="center"
                >
                  <div className="campaign-table-cell-heading pointer">
                    <input
                      checked={
                        data?.length > 0
                          ? data
                              ?.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              ?.every((val) =>
                                selectedUsers[page]?.includes(val.id)
                              )
                          : false
                      }
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers((prev) => {
                            // const all = [...prev];
                            const id = data
                              ?.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((x) => x?.id);
                            return { ...prev, [page]: id };
                          });
                        } else {
                          setSelectedUsers((prev) => {
                            const id = data
                              ?.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((x) => x?.id);
                            const intersection = { ...prev }[page].filter(
                              (x) => !id.includes(x)
                            );
                            return { ...prev, [page]: intersection };
                          });
                        }
                      }}
                      style={{
                        width: "15px",
                        height: "15px",
                        borderRadius: "10px",
                        boxShadow:
                          "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                      }}
                      name=""
                      id=""
                    />
                  </div>
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    backgroundColor: "white",
                    padding: "12px",
                    borderRadius: "1rem",
                  }}
                  id="campaign-brand-data-select-table-header"
                  align="left"
                >
                  <div className="campaign-table-cell-heading pointer">
                    Name
                  </div>
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    backgroundColor: "white",
                    padding: "12px",
                  }}
                  id="campaign-brand-data-select-table-header"
                  align="left"
                >
                  <div className="campaign-table-cell-heading pointer">
                    Email
                  </div>
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    backgroundColor: "white",
                    padding: "12px",
                  }}
                  id="campaign-brand-data-select-table-header"
                  align="left"
                >
                  <div className="campaign-table-cell-heading pointer">
                    Role
                  </div>
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    backgroundColor: "white",
                    padding: "12px",
                  }}
                  id="campaign-brand-data-select-table-header"
                  align="left"
                >
                  <div className="campaign-table-cell-heading pointer">
                    Actions
                  </div>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetching === true ? (
                <div
                  style={{
                    width: "100%",
                    marginTop: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </div>
              ) : null}
              {data &&
                data.length > 0 &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((value, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell
                          align="left"
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            checked={
                              selectedUsers[page]
                                ? selectedUsers[page]?.includes(value?.id)
                                : false
                            }
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers((prev) => {
                                  return {
                                    ...prev,
                                    [page]: [
                                      ...(prev[page] ? prev[page] : []),
                                      value?.id,
                                    ],
                                  };
                                });
                              } else {
                                setSelectedUsers((prev) => {
                                  const filtered = prev[page].filter(
                                    (name) => name !== value.id
                                  );
                                  return { ...prev, [page]: filtered };
                                });
                              }
                            }}
                            type="checkbox"
                            name="select-users"
                            id=""
                          />
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <div style={{ cursor: "pointer" }}>
                            <div
                              className="campaign-page-table-content"
                              style={{
                                textTransform: "none",
                                cursor: "pointer",
                              }}
                            >
                              {editState.id === value?.id ? (
                                <input
                                  type="text"
                                  placeholder="Type New value and Press enter"
                                  value={editState.name}
                                  onChange={(e) => {
                                    setEditState((prev) => {
                                      return { ...prev, name: editState.name };
                                    });
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      editHandler();
                                    }
                                  }}
                                />
                              ) : (
                                `${value?.name}`
                              )}
                            </div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="campaign-page-table-content">
                            {editState.id === value?.id ? (
                              <input
                                type="text"
                                placeholder="Type New value and Press enter"
                                value={editState.email}
                                onChange={(e) => {
                                  setEditState((prev) => {
                                    return { ...prev, email: editState.email };
                                  });
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    editHandler();
                                  }
                                }}
                              />
                            ) : (
                              `${value?.email}`
                            )}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="campaign-page-table-content">
                            {editState.id === value?.id ? (
                              <select
                                name=""
                                value={editState.role}
                                onChange={(e) => {
                                  setEditState((prev) => {
                                    return { ...prev, email: editState.email };
                                  });
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    editHandler();
                                  }
                                }}
                                id=""
                              >
                                <option value="">Please Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="member">Member</option>
                              </select>
                            ) : (
                              `${value?.email}`
                            )}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="campaign-page-table-content icons">
                            <span
                              className="icon-container"
                              id="edit"
                              onClick={() => {
                                setEditState((prev) => {
                                  return { ...prev, id: value?.id };
                                });
                              }}
                            >
                              <FiEdit />
                            </span>
                            <span
                              className="icon-container"
                              id="delete"
                              onClick={() => {
                                deleteHandler(value?.id);
                              }}
                            >
                              <AiOutlineDelete size={18} />
                            </span>
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default TableMain;
