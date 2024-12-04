// Este componente exibe uma lista de usuários em uma tabela interativa.
// Ele permite ao usuário editar ou excluir registros através de botões de ação associados a cada linha.
// O Material UI é usado para a tabela, botões e estilização.
 

import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from '@mui/material';

const UserList = ({ users, onDelete, onSelect }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Lista de Usuários
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#4fc3f7' }}>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="center">{user.id}</TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => onSelect && onSelect(user)}
                      sx={{ mr: 1, borderColor: '#4fc3f7', color: '#4fc3f7' }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => onDelete && onDelete(user.id)}
                      sx={{ borderColor: '#ff7961', color: '#ff7961' }}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  Nenhum usuário encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

export default UserList;
