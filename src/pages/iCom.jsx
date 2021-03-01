import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  styles,
} from "../components/materialUi";
import {
  BsPlusCircle,
} from "react-icons/bs";
import swal from 'sweetalert';
import Card from "../components/Card";
import ModalComp from "../components/Modal";
import {ToastContainer, toast} from "react-toastify";


class iCom extends Component {
  state = {
    data: [
      {
        foto:
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        judul: "Makan makan",
        caption: "makan teratur",
      },
      {
        foto:
          "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/1800x1200_potassium_foods_other.jpg?resize=750px:*",
        judul: "Makan makan",
        caption: "makan teratur",
      },
    ],
    fotoInp:"",
    judulInp:"",
    captionInp:"",
    indexdelete: -1,
    indexEdit: -1,
    EditData: {
      foto: "",
      judul: "",
      caption: "",
    },
    modal: false,
    editmodal: false,
  };
  onAddModalClick =() => {
    this.setState({modal: true});
  };
  onCancelAddClick =() => {
    this.setState({modal: false});
  };

  onClickDelete = (index) => {
    this.setState({ indexDelete: index });
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imageinary file!",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("data deleted successfully", {
            icon: "success",
          });
          const { data, indexDelete } = this.state;
          let usersData = data;
          usersData.splice(indexDelete, 1);
          console.log(indexDelete)
          this.setState({ data: usersData, indexDelete: -1 });
        } else {
          swal("failed to delete!");
        }
      });
  };
  onEditClick = (index) => {
    console.log(index);
    let EditData = this.state.EditData;
    let data = this.state.data;
    EditData ={
      ...EditData,
      foto: data[index].foto,
      judul: data[index].judul,
      caption: data[index].caption,
    }
    this.setState({ indexEdit: index, EditData, editModal: true});
  }
  onEditSaveClick = () => {
    const { EditData, data, indexEdit} = this.state;
    const { foto,judul,caption}= EditData;
    if (foto && judul && caption){
      let dataEdit ={
        foto: foto,
        judul: judul,
        caption: caption,
      };
      let dataUser = data;
      dataUser.splice(indexEdit, 1, dataEdit);
      this.setState({
        foto: dataUser,
        indexEdit: -1,
        editModal: false,
      })
    }else{
      this.setState({
        EditData: {
          foto: "",
          judulu: "",
          caption: "",
        },
        indexEdit:-1,
      })
    }
  }
  onEditCancelClick =()=> {
    this.setState({
      EditData: {
        foto: "",
        judulu: "",
        caption: "",
      },
      indexEdit: -1,
      editModal: false,
    });
  }

  onAddClick = () => {
    const { fotoInp, judulInp, captionInp, data} = this.state;
    if (fotoInp && judulInp && captionInp){
      let dataInp = {
        foto: fotoInp,
        judul: judulInp,
        caption: captionInp,
      };
      let dataUsers = data;
      dataUsers.push(dataInp);
      this.setState({
        data: dataUsers,
        fotoInp: "",
        judulInp: "",
        captionInp: "",
        modal: false,
      })
    }else {
      toast.error("input is required", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  }

  onInputChange = (event) => {
    console.log(event);
    this.setState({ [event.target.name]: event.target.value});
  };
  onEditChange = (event) => {
    let EditData = this.state.EditData;
    EditData[event.target.name] = event.target.value;
    this.setState({EditData: EditData})
  }


  renderCard = () => {
    return this.state.data.map((val, index) => {
      return (
        <div className= "col-md-3" key={index}>
          <Card foto={val.foto} judul={val.judul} caption={val.caption} onDelete={()=> this.onClickDelete(index)} onEdit={()=> this.onEditClick(index)}/>
        </div>
      );  
    });
  };
  

  render() {
     return (
      <div>
        <div className = "me-5 ms-5">
          <ModalComp
          isOpen= {this.state.modal}
          toggle={this.toggle}
          title={"Add data"}
          saveData = {this.onAddClick}
          cancel={this.onCancelAddClick}
          >
          <input
          name= "fotoInp"
          type= "text"
          placeholder="Masukkan URL image"
          className= "form-control my-2"
          value={this.state.usernameInp}
          onChange={this.onInputChange}
          />
          <input
          name= "judulInp"
          type= "text"
          placeholder="Judul"
          className= "form-control my-2"
          value={this.state.judulInp}
          onChange={this.onInputChange}
          />
          <input
          name= "captionInp"
          type= "text"
          placeholder="Caption"
          className= "form-control my-2"
          value={this.state.captionInp}
          onChange={this.onInputChange}
          />
          </ModalComp>

          <ModalComp
          isOpen= {this.state.editModal}
          toggle={this.toggle}
          title={"Edit data"}
          saveData = {this.onEditSaveClick}
          cancel={this.onEditCancelClick}
          >
          <input
          name= "foto"
          type= "text"
          placeholder="Masukkan URL image"
          className= "form-control my-2"
          value={this.state.foto}
          onChange={this.onEditChange}
          />
          <input
          name= "judul"
          type= "text"
          placeholder="Judul"
          className= "form-control my-2"
          value={this.state.judul}
          onChange={this.onEditChange}
          />
          <input
          name= "caption"
          type= "text"
          placeholder="Caption"
          className= "form-control my-2"
          value={this.state.caption}
          onChange={this.onEditChange}
          />
          </ModalComp>
          <div className="row d-flex justify-content-flex-start">{this.renderCard()}</div>
          <div className=" mt-5 d-flex flex-column justify-content-center align-items-center">
          <h1>Tambah Data</h1>
          <div className= "mb-5">
            <BsPlusCircle style={{ fontSize: "3em", fontWeight: "700" }} onClick={this.onAddModalClick} />
          </div>
        </div>
      </div>
      <ToastContainer />
      </div>
    );
  }
}

export default withStyles(styles)(iCom);
