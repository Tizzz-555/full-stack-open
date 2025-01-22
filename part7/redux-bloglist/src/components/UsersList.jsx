import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material";

export const UsersList = ({ users }) => {
  const usersLayout = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  return (
    <div style={usersLayout}>
      <h2>Users</h2>
      <TableContainer sx={{ maxWidth: 500 }} component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "lightcoral" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>User</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                blogs created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>
                  <TableCell align="right">{user.blogs.length}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersList;
