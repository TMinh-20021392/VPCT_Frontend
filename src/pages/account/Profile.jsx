import React, { Component } from "react";
import { jwtDecode } from "jwt-decode";

export default class Profile extends Component {
  state = {
    userId: null,
    userInfo: {
      fullName: "",
      email: "",
      address: "",
      description: "",
      userName: "",
      phoneNumber: "",
      imageFile: null,
      imageSrc: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      console.log(userId);
      this.setState({ userId }, () => {
        this.fetchUserDetails(userId);
      });
    }
  }

  fetchUserDetails = (userId) => {
    // Make a GET request to fetch user details based on userId
    fetch(`https://localhost:7220/api/User/account-details/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          userInfo: {
            ...this.state.userInfo,
            fullName: data.fullName,
            email: data.email,
            address: data.address,
            description: data.description,
            imageSrc: data.imageSrc,
            phoneNumber: data.phoneNumber,
            userName: data.userName,
          },
        });
      })
      .catch((error) => console.error("Error fetching user details:", error));
  };

  handleInputChange = (e) => {
    if (e.target.name === "imageFile") {
      this.setState({
        userInfo: {
          ...this.state.userInfo,
          imageFile: e.target.files[0],
        },
      });
    } else {
      const { name, value } = e.target;
      this.setState((prevState) => ({
        userInfo: {
          ...prevState.userInfo,
          [name]: value,
        },
      }));
      console.log(this.state.userInfo);
    }
  };

  handleSaveUserInfo = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Id", this.state.userId);
    formData.append("FullName", this.state.userInfo.fullName);
    formData.append("Address", this.state.userInfo.address);
    formData.append("Description", this.state.userInfo.description);
    formData.append("ImageFile", this.state.userInfo.imageFile);
    formData.append("PhoneNumber", this.state.userInfo.phoneNumber);

    // Make a PUT request to update user info
    fetch("https://localhost:7220/api/User/update-user-info", {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle success or error response
      })
      .catch((error) => console.error("Error updating user info:", error));
  };

  handlePasswordChange = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Id", this.state.userId);
    formData.append("UserName", this.state.userInfo.userName);
    formData.append("CurrentPassword", this.state.userInfo.currentPassword);
    formData.append("NewPassword", this.state.userInfo.newPassword);
    formData.append(
      "ConfirmNewPassword",
      this.state.userInfo.confirmNewPassword
    );

    // Make a PUT request to update user info
    fetch("https://localhost:7220/api/User/changepassword", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle success or error response
      })
      .catch((error) => console.error("Error updating user account:", error));
  };
  render() {
    const { userInfo } = this.state;

    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Quản trị hệ thống</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/home">Chương trình</a>
                  </li>
                  <li className="breadcrumb-item active">Dữ liệu</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                {/* Profile Image */}
                <div className="card card-primary card-outline">
                  <div className="card-body box-profile">
                    <div className="text-center">
                      {userInfo.imageSrc ? (
                        <img
                          className="profile-user-img img-fluid img-circle"
                          src="../../dist/img/avatardefault.png"
                          alt="User profile picture"
                        />
                      ) : (
                        <img
                          className="profile-user-img img-fluid img-circle"
                          src={userInfo.imageSrc}
                          alt="Profile"
                        />
                      )}
                    </div>
                    <h3 className="profile-username text-center">
                      Quản trị hệ thống
                    </h3>
                    <p className="text-muted text-center">Quản trị hệ thống</p>
                    <ul className="list-group list-group-unbordered mb-3">
                      <li className="list-group-item">
                        <b>Email</b>{" "}
                        {userInfo.email && (
                          <a className="float-right">{userInfo.email}</a>
                        )}
                      </li>
                      <li className="list-group-item">
                        <b>Tên đăng nhập</b>{" "}
                        {userInfo.userName && (
                          <a className="float-right">{userInfo.userName}</a>
                        )}
                      </li>
                      <li className="list-group-item">
                        <b>Địa chỉ</b>{" "}
                        {userInfo.address && (
                          <a className="float-right">{userInfo.address}</a>
                        )}
                      </li>
                      <li className="list-group-item">
                        <b>Điện thoại</b>{" "}
                        {userInfo.phoneNumber && (
                          <a className="float-right">{userInfo.phoneNumber}</a>
                        )}
                      </li>

                      <li className="list-group-item">
                        <b>Ngày tham gia</b> <a className="float-right"></a>
                      </li>
                    </ul>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          href="#activity"
                          data-toggle="tab"
                        >
                          Đổi thông tin
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#timeline"
                          data-toggle="tab"
                        >
                          Đổi mật khẩu
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="active tab-pane" id="activity">
                        {/* Post */}
                        <form
                          className="form-horizontal"
                          onSubmit={this.handleSaveUserInfo}
                        >
                          <div className="form-group row">
                            <label
                              htmlFor="inputName"
                              className="col-sm-2 col-form-label d-inline"
                            >
                              Họ và tên{" "}
                              <p className="text-danger d-inline">(*)</p>
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                name="fullName"
                                id="inputName"
                                defaultValue={userInfo.fullName ?? ""}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputEmail"
                              className="col-sm-2 col-form-label d-inline"
                            >
                              Email <p className="text-danger d-inline">(*)</p>
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="inputEmail"
                                defaultValue={userInfo.email ?? ""}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputPhone"
                              className="col-sm-2 col-form-label"
                            >
                              Điện thoại
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                name="phoneNumber"
                                id="inputPhone"
                                defaultValue={userInfo.phoneNumber ?? ""}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputAdd"
                              className="col-sm-2 col-form-label"
                            >
                              Địa chỉ
                            </label>
                            <div className="col-sm-10">
                              <textarea
                                className="form-control"
                                name="address"
                                id="inputAdd"
                                defaultValue={userInfo.address ?? ""}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputDes"
                              className="col-sm-2 col-form-label"
                            >
                              Mô tả
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                name="description"
                                id="inputDes"
                                defaultValue={userInfo.description ?? ""}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="imageFile"
                              className="col-sm-2 col-form-label"
                            >
                              Ảnh đại diện
                            </label>
                            <div className="col-sm-10">
                              <input
                                className="form-control"
                                type="file"
                                name="imageFile"
                                id="imageFile"
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-sm-10">
                              <button
                                type="submit"
                                className="btn btn-success mr-3 mt-3"
                              >
                                <i className="fas fa-save"></i> Lưu
                              </button>
                              <a
                                className="btn btn-danger mt-3"
                                href="/home"
                              >
                                <i className="fas fa-times"></i> Hủy
                              </a>
                            </div>
                          </div>
                        </form>

                        {/* /.post */}
                      </div>
                      {/* /.tab-pane */}
                      <div className="tab-pane" id="timeline">
                        {/* The timeline */}
                        <form
                          className="form-horizontal"
                          onSubmit={this.handlePasswordChange}
                        >
                          <div className="form-group row">
                            <label
                              htmlFor="inputUserName"
                              className="col-sm-2 col-form-label"
                            >
                              Tên đăng nhập
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                name="userName"
                                id="inputUserName"
                                defaultValue={userInfo.userName}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputPassword"
                              className="col-sm-2 col-form-label"
                            >
                              Mật khẩu cũ{" "}
                              <p className="text-danger d-inline">(*)</p>
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="password"
                                className="form-control"
                                name="currentPassword"
                                id="inputPassword"
                                placeholder=""
                                onChange={this.handleInputChange}
                              />
                            </div>
                            <p className="col-sm-10 text-primary small">
                              Mật khẩu là chuỗi hơn 8 ký tự gồm chữ hoa, thường,
                              chữ số và ký tự đặc biệt
                            </p>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputUserName2"
                              className="col-sm-2 col-form-label"
                            >
                              Mật khẩu mới{" "}
                              <p className="text-danger d-inline">(*)</p>
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="password"
                                className="form-control"
                                name="newPassword"
                                id="inputUserName2"
                                placeholder=""
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputRepeatPass"
                              className="col-sm-4 col-form-label d-inline"
                            >
                              Nhắc lại mật khẩu{" "}
                              <p className="text-danger d-inline">(*)</p>
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="password"
                                className="form-control"
                                name="confirmNewPassword"
                                id="inputRepeatPass"
                                placeholder=""
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="col-sm-10">
                              <button
                                type="submit"
                                className="btn btn-success mr-3 mt-3"
                              >
                                <i class="fas fa-save"></i> Lưu
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* /.tab-pane */}
                      <div className="tab-pane" id="settings"></div>
                      {/* /.tab-pane */}
                    </div>
                    {/* /.tab-content */}
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    );
  }
}
