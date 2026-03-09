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

  const deactivateUser = async (cardId) => {
    try {
      await axios.post("http://localhost:5000/api/topup/deactivate", {
        cardId,
      });

      setUsers((prev) =>
        prev.map((user) =>
          user.cardId === cardId ? { ...user, isActive: false } : user,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="p-6 text-white mt-5">
        <h2 className="text-3xl text-center font-bold mb-10">Daftar Player</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-lime-700 p-3 rounded-xl mb-2 font-bold shadow-lg"
            >
              <div className="text-center text-xl">
                <p>{user.username}</p>
                <p>Rp {(user.balance || 0).toLocaleString()}</p>
                <p
                  className={
                    user.isActive ? "text-green-300 font-bold" : "text-gray-300"
                  }
                >
                  {user.isActive ? "AKTIF" : "NONAKTIF"}
                </p>
              </div>
              <button
                onClick={() => deactivateUser(user.cardId)}
                className="mt-2 bg-red-500 px-3 py-1 rounded text-sm"
              >
                Nonaktifkan
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserList;
