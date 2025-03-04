import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import styled from "styled-components";
import { AddUser, deleteUser, fetchAllUsers, UpdateUser } from "./Api";
import InputFields from "./common/inputFields";

const Crudoperation = () => {
  const queryClient = useQueryClient();

  const [editId, setEditId] = useState(null);
  const [formdata, setformdata] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    city: "",
    zipcode: "",
  });
  //data fetching that tine use useQurey Hooks
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryFn: fetchAllUsers,
    queryKey: ["users"],
  });

  //add Mutation Hooks that time performe Crud Operation like create,edit,delete etc.
  
  const addUserMutation = useMutation({
    mutationFn: AddUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setformdata({
        username: "",
        password: "",
        email: "",
        phone: "",
        city: "",
        zipcode: "",
      });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: UpdateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setformdata({
        username: "",
        password: "",
        email: "",
        phone: "",
        city: "",
        zipcode: "",
      });
      setEditId(null);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateUserMutation.mutate({
        id: editId,
        ...formdata,
      });
    } else {
      addUserMutation.mutate(formdata);
    }
  };

  if (isLoading)
    return (
      <StyledWrapper>
        <div className="spinner">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </StyledWrapper>
    );
  if (error) return <p>Error fetching users.</p>;

  return (
    <div className="container mt-4">
      <h2>TanStack Query</h2>
      <form
        onSubmit={handleSubmit}
        className="shadow-lg w-50 mx-auto px-4 py-4 rounded"
      >
        <div className="row g-3">
          <div className="col-lg-6">
            <InputFields
              type="text"
              placeholder="Enter the Username"
              value={formdata.username}
              className="form-control"
              onChange={(e) =>
                setformdata((prev) => ({ ...prev, username: e.target.value }))
              }
              required={true}
            />
          </div>
          <div className="col-lg-6">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={formdata.password}
              onChange={(e) =>
                setformdata((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
          </div>
          <div className="col-lg-6">
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={formdata.email}
              onChange={(e) =>
                setformdata((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>
          <div className="col-lg-6">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Mobile Number"
              value={formdata.phone}
              onChange={(e) =>
                setformdata((prev) => ({ ...prev, phone: e.target.value }))
              }
              required
            />
          </div>
          <div className="col-lg-6">
            <input
              type="text"
              className="form-control"
              placeholder="Enter City"
              value={formdata.city}
              onChange={(e) =>
                setformdata((prev) => ({ ...prev, city: e.target.value }))
              }
              required
            />
          </div>
          <div className="col-lg-6">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Zipcode"
              value={formdata.zipcode}
              onChange={(e) =>
                setformdata((prev) => ({ ...prev, zipcode: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <button type="submit" className="btn btn-outline-dark">
              {editId ? "Update User" : "Add User"}
            </button>
          </div>
        </div>
      </form>

      <table className="table mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Password</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>City</th>
            <th>Zipcode</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user?.address?.city}</td>
                <td>{user?.address?.zipcode}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mx-2"
                    onClick={() => {
                      setformdata({
                        username: user.username,
                        password: user.password,
                        email: user.email,
                        phone: user.phone,
                        city: user?.address?.city || "",
                        zipcode: user?.address?.zipcode || "",
                      });
                    }}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUserMutation.mutate(user.id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Crudoperation;
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;

  .spinner {
    position: absolute;
    width: 10px;
    height: 10px;
  }

  .spinner div {
    position: absolute;
    width: 50%;
    height: 150%;
    background: #000000;
    transform: rotate(calc(var(--rotation) * 1deg))
      translate(0, calc(var(--translation) * 1%));
    animation: spinner-fzua35 1s calc(var(--delay) * 1s) infinite ease;
  }

  .spinner div:nth-child(1) {
    --delay: 0.1;
    --rotation: 36;
    --translation: 150;
  }

  .spinner div:nth-child(2) {
    --delay: 0.2;
    --rotation: 72;
    --translation: 150;
  }

  .spinner div:nth-child(3) {
    --delay: 0.3;
    --rotation: 108;
    --translation: 150;
  }

  .spinner div:nth-child(4) {
    --delay: 0.4;
    --rotation: 144;
    --translation: 150;
  }

  .spinner div:nth-child(5) {
    --delay: 0.5;
    --rotation: 180;
    --translation: 150;
  }

  .spinner div:nth-child(6) {
    --delay: 0.6;
    --rotation: 216;
    --translation: 150;
  }

  .spinner div:nth-child(7) {
    --delay: 0.7;
    --rotation: 252;
    --translation: 150;
  }

  .spinner div:nth-child(8) {
    --delay: 0.8;
    --rotation: 288;
    --translation: 150;
  }

  .spinner div:nth-child(9) {
    --delay: 0.9;
    --rotation: 324;
    --translation: 150;
  }

  .spinner div:nth-child(10) {
    --delay: 1;
    --rotation: 360;
    --translation: 150;
  }

  @keyframes spinner-fzua35 {
    0%,
    10%,
    20%,
    30%,
    50%,
    60%,
    70%,
    80%,
    90%,
    100% {
      transform: rotate(calc(var(--rotation) * 1deg))
        translate(0, calc(var(--translation) * 1%));
    }

    50% {
      transform: rotate(calc(var(--rotation) * 1deg))
        translate(0, calc(var(--translation) * 1.5%));
    }
  }
`;
