import React from "react";
import {
  Button,
  Card,
  Container,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Label,
  Row,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import { login } from "./../../../redux/auth/action";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: {}
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }
  componentDidMount = async () => {
    if (localStorage.getItem("_user") && localStorage.getItem("_user") !== undefined) {
      this.props.history.push("/admin/dashboard");
    }
  };
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
    let fieldList = ["email", "password"];
    let is_valid = true;
    for (let x of fieldList) {
      if (!data[x]) {
        is_valid = false;
        this.setState(prevState => ({
          errors: { ...prevState.errors, [x]: "Please fill in the above field" }
        }));
      }
    }
    return is_valid;
  };
  doLogin = async () => {
    if (this.formValidate()) {
      const { email, password } = this.state.data;
      const loginDetail = {
        emailId: email,
        password
      };
      await this.props.login(loginDetail);
      if (this.props.auth.isLogin) {
        this.props.history.push("/admin/dashboard");
      }
    }
  };
  render() {
    const { email, password } = this.state.data;
    const errors = this.state.errors;
    const { loginLoading } = this.props.auth;
    return (
      <>
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent pb-2 pt-2 border-0">
                  <div className="text-center text-muted mb-2">
                    <h2 className="text-center text-uppercase my-3">Logo</h2>
                    <small>Sign in with credentials</small>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-2">
                  <Form role="form">
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="email"
                          placeholder="Email"
                          type="email"
                          autoComplete="new-email"
                          value={email ? email : ""}
                          onChange={this.handleOnChange}
                        />
                      </InputGroup>
                      {errors.email ? <Label className="is-invalid text-danger">{errors.email}</Label> : ""}
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="password"
                          placeholder="Password"
                          type="password"
                          autoComplete="new-password"
                          value={password ? password : ""}
                          onChange={this.handleOnChange}
                        />
                      </InputGroup>
                      {errors.password ? <Label className="is-invalid text-danger">{errors.password}</Label> : ""}
                    </FormGroup>

                    <div className="text-center">
                      <Button disabled={loginLoading} className="my-4" color="primary" type="button" onClick={this.doLogin}>
                        {loginLoading ? <i className="fas fa-spinner fa-spin mr-2" /> : ""}
                        Sign in
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {
  login
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
