import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/topup/users",
        );
        setUsers(response.data.data);
      } catch (error) {
        console.error("Gagal ambil data:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Daftar Player</h2>

      {users.map((user) => (
        <div key={user._id} className="border p-3 rounded mb-2 shadow">
          <p>
            <strong>Card ID:</strong> {user.cardId}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Saldo:</strong> Rp {(user.balance || 0).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
