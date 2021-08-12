import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal
} from "reactstrap";
import { hideModal, updatePassword } from "./../../../redux/changePassword/action";
class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changePasswordModal: true,
      data: {},
      errors: {}
    };
  }
  handleOnChange = event => {
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value },
      errors: { ...this.state.errors, [event.target.name]: "" }
    });
    if (!event.target.value) {
      this.setState({
        errors: {
          ...this.state.errors,
          [event.target.name]: "Please fill in the above field"
        }
      });
    }
  };
  formValidate = () => {
    let { data } = this.state;
    let fieldList = ["oldPassword", "newPassword", "confirmPassword"];
    let is_valid = true;
    for (let x of fieldList) {
      if (!data[x]) {
        is_valid = false;
        this.setState(prevState => ({
          errors: { ...prevState.errors, [x]: "Please fill in the above field" }
        }));
      }
    }
    if (data["newPassword"] !== "" && data["confirmPassword"] !== "") {
      if (data["newPassword"] !== data["confirmPassword"]) {
        is_valid = false;
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            confirmPassword: "New Password & Confirm Password do not match"
          }
        }));
      }
    }
    return is_valid;
  };
  handleSubmit = async () => {
    if (this.formValidate()) {
      const { data } = this.state;
      const params = {
        oldPassword: data['oldPassword'],
        newPassword: data['newPassword']
      };
      await this.props.updatePassword(params)
      const { error } = this.props.changePassword;
      if(error === ""){
          this.setState({
              data:{}
          })
      }
    }
  };
  hideModal = () => {
    this.props.hideModal();
  };
  render() {
    const { modalProps, changePasswordLoading } = this.props.changePassword;
    const { data, errors } = this.state;
    return (
      <Modal className="modal-dialog-centered" size="sm" isOpen={modalProps.open} toggle={() => this.hideModal()}>
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-1">
              <div className="text-center text-muted">
                <h4>Change Password</h4>
              </div>
            </CardHeader>
            <CardBody className="px-lg-4 py-lg-3">
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={data?.oldPassword ? data.oldPassword : ""}
                      name="oldPassword"
                      onChange={this.handleOnChange}
                      placeholder="Old Password"
                      type="password"
                    />
                  </InputGroup>
                  {errors.oldPassword ? <small className="text-danger">{errors.oldPassword}</small> : ""}
                </FormGroup>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={data?.newPassword ? data.newPassword : ""}
                      name="newPassword"
                      onChange={this.handleOnChange}
                      placeholder="New Password"
                      type="password"
                    />
                  </InputGroup>
                  {errors.newPassword ? <small className="text-danger">{errors.newPassword}</small> : ""}
                </FormGroup>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={data?.confirmPassword ? data.confirmPassword : ""}
                      name="confirmPassword"
                      onChange={this.handleOnChange}
                      placeholder="Confirm Password"
                      type="password"
                    />
                  </InputGroup>
                  {errors.confirmPassword ? <small className="text-danger">{errors.confirmPassword}</small> : ""}
                </FormGroup>
                <div className="text-center">
                  <Button
                    disabled={changePasswordLoading}
                    className="my-2 mb-0"
                    color="primary"
                    type="button"
                    onClick={() => this.handleSubmit()}
                  >
                    {changePasswordLoading ? <i className="fas fa-spinner fa-spin mr-2" /> : ""}
                    Update
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {
  hideModal,
  updatePassword
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
