import React, { Component } from "react";
import { Table } from "reactstrap";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";
import ModalComp from "../components/Modal";
class dataUsers extends Component {
  state = {
    isLogin: false,
    users: [
      {
        username: "dino",
        email: "dino@gmail.com",
        role: "user",
      },
      {
        username: "dedi",
        email: "dedi@gmail.com",
        role: "admin",
      },
    ],
    role: ["admin", "user"],
    usernameInp: "",
    emailInp: "",
    roleInp: "",
    indexdelete: -1,
    indexEdit: -1,
    EditData: {
      username: "",
      email: "",
      role: "",
    },
    products: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ],
    modal: false,
    editmodal: false,
  };

  renderUsers = () => {
    return this.state.users.map((val, index) => {
      if (index === this.state.indexdelete) {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{val.username}</td>
            <td>{val.email}</td>
            <td>{val.role}</td>
            <td>
              <button className="btn btn-danger mx-2" onClick={this.onYesClick}>
                Delete
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={this.onCancelClick}
              >
                No
              </button>
            </td>
          </tr>
        );
      }
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val.username}</td>
          <td>{val.email}</td>
          <td>{val.role}</td>
          <td>
            <button
              className="btn btn-primary mx-2"
              onClick={() => this.onEditClick(index)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger mx-2"
              onClick={() => this.onDeleteClick(index)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  renderRole = () => {
    return this.state.role.map((val, index) => {
      return (
        <option key={index} value={val}>
          {val}
        </option>
      );
    });
  };

  renderProducts = () => {
    return this.state.products.map((val) => {
      return (
        <Link
          key={val.id}
          className="mx-4"
          to={{ pathname: `/product/` + val.id, state: { category: "dino" } }}
        >
          <button className="btn btn-success">{val.id}</button>
        </Link>
      );
    });
  };
  // ? Create Read Update Delete == CRUD

  onUsernameChange = (event) => {
    this.setState({ usernameInp: event.target.value });
  };
  onEmailChange = (event) => {
    this.setState({ emailInp: event.target.value });
  };
  onInputChage = (event) => {
    console.log(event);
    this.setState({ [event.target.name]: event.target.value });
  };
  onInputEditChage = (event) => {
    let Editdata = this.state.EditData;
    Editdata[event.target.name] = event.target.value;
    this.setState({ EditData: Editdata });
  };
  onAddClick = () => {
    const { roleInp, usernameInp, emailInp, users } = this.state;
    if (usernameInp && emailInp && roleInp) {
      let data = {
        username: usernameInp,
        email: emailInp,
        role: roleInp,
      };
      let usersdata = users;
      usersdata.push(data);
      this.setState({
        users: usersdata,
        roleInp: "",
        usernameInp: "",
        emailInp: "",
        modal: false,
      });
    } else {
      toast.error("input harus diisi bro", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  onAddModalClick = () => {
    this.setState({ modal: true });
  };

  onDeleteClick = (index) => {
    this.setState({ indexdelete: index });
  };
  onCancelClick = () => {
    this.setState({ indexdelete: -1 });
  };
  onYesClick = () => {
    const { users, indexdelete } = this.state;
    let usersData = users;
    usersData.splice(indexdelete, 1);
    this.setState({ users: usersData, indexdelete: -1 });
  };

  onEditClick = (index) => {
    let EditData = this.state.EditData;
    let users = this.state.users;
    EditData = {
      ...EditData,
      username: users[index].username,
      email: users[index].email,
      role: users[index].role,
    };
    this.setState({ indexEdit: index, EditData: EditData, editmodal: true });
  };

  onCancelEditClick = () => {
    this.setState({
      EditData: {
        username: "",
        email: "",
        role: "",
      },
      indexEdit: -1,
      editmodal: false,
    });
  };

  onSaveEditClick = () => {
   
    const { EditData, users, indexEdit } = this.state;
    const { username, email, role } = EditData;
  
    if (username && email && role) {
      let data = {
        username: username,
        email: email,
        role: role,
      };
      let usersdata = users;
      usersdata.splice(indexEdit, 1, data);
      this.setState({
        users: usersdata,
        indexEdit: -1,
        editmodal: false,
      });

      toast.success("berhasil edit ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      this.setState({
        EditData: {
          username: "",
          email: "",
          role: "",
        },
        indexEdit: -1,
      });
      toast.error("Gak jadi Edit", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  onLoginClick = () => {
    if (this.state.users.length > 2) {
      this.setState({ isLogin: true });
    } else {
      toast("data harus lebih dari 2");
    }
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  toggleEdit = () => {
    this.setState({ editmodal: !this.state.editmodal });
  };
  render() {
    const { isLogin } = this.state;

    if (isLogin) {
      return <Redirect to="/corona" />;
    }
    return (
      <div>
        <ModalComp
          isOpen={this.state.modal}
          toggle={this.toggle}
          title={"Add Users"}
          saveData={this.onAddClick}
        >
          <input
            name="usernameInp"
            type="text"
            placeholder="username"
            className="form-control my-2"
            value={this.state.usernameInp}
            onChange={this.onInputChage}
          />
          <input
            name="emailInp"
            type="email"
            placeholder="email"
            className="form-control my-2"
            value={this.state.emailInp}
            onChange={this.onInputChage}
          />
          <select
            name="roleInp"
            onChange={this.onInputChage}
            value={this.state.roleInp}
            className="form-control my-2"
          >
            <option hidden value="">
              pilih role
            </option>
            {this.renderRole()}
          </select>
        </ModalComp>
        <ModalComp
          isOpen={this.state.editmodal}
          toggle={this.toggleEdit}
          title={"Edit Users " + this.state.EditData.username}
          saveData={this.onSaveEditClick}
          Cancel={this.onCancelEditClick}
          Edit={true}
        >
          <input
            name="username"
            type="text"
            placeholder="username"
            className="form-control"
            value={this.state.EditData.username}
            onChange={this.onInputEditChage}
          />

          <input
            name="email"
            type="email"
            placeholder="email"
            className="form-control"
            value={this.state.EditData.email}
            onChange={this.onInputEditChage}
          />

          <select
            name="role"
            onChange={this.onInputEditChage}
            value={this.state.EditData.role}
            className="form-control"
          >
            {this.renderRole()}
          </select>
        </ModalComp>

        <div className="pt-5 px-5 mx-5">
          
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderUsers()}</tbody>
          </Table>
          <button onClick={this.onAddModalClick} className="btn btn-success">
            add
          </button>
        </div>
      </div>
    );
  }
}

export default dataUsers;
