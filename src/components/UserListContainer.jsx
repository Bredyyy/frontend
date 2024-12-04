import { useState, useEffect } from 'react';
import UserList from './UserList';
import { fetchUsers } from './services/api';
import { API_BASE_URL } from '../utils/config';
import axios from 'axios';

const UserListContainer = () => {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState({ name: '', email: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await fetchUsers();
        setUsers(result);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleCreateUser = async () => {
    try {
      await axios.post(`${API_BASE_URL}/users`, userInput);
      const result = await fetchUsers();
      setUsers(result);
      setUserInput({ name: '', email: '' });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  const handleEditUser = (user) => {
    setUserInput(user);
    setIsEdit(true);
    setEditId(user.id);
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`${API_BASE_URL}/users/${editId}`, userInput);
      const result = await fetchUsers();
      setUsers(result);
      setUserInput({ name: '', email: '' });
      setIsEdit(false);
      setEditId(null);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`);
      const result = await fetchUsers();
      setUsers(result);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSelect = (user) => {
    handleEditUser(user);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      {!isLoggedIn ? (
        <div className="login-form">
          <h2>Bem vindos a Loja GamerHive</h2>
          <button className="primary" onClick={handleLogin}>
            Clique aqui para continuar
          </button>
        </div>
      ) : (
        <div className="user-management">
          <h1>Usuários</h1>
          <div className="container">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-box">
                <input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={userInput.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userInput.email}
                  onChange={handleInputChange}
                />
              </div>
              {isEdit ? (
                <button className="primary" onClick={handleUpdateUser}>
                  Atualizar Usuário
                </button>
              ) : (
                <button className="primary" onClick={handleCreateUser}>
                  Adicionar
                </button>
              )}
            </form>
            <UserList users={users} onDelete={handleDeleteUser} onSelect={handleSelect} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListContainer;
