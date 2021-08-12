import React from "react";
import { Button, Card, CardHeader, Container, FormGroup, Input, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import SimpleHeader from "components/Headers/SimpleHeader";
import { getUsersDetail, updateUserDetail } from "../../../../redux/users/action";
import { toast } from 'react-toastify';
class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: {},
      featureAccess: {
        dashboard: 0,
        user: 0,
        analytic_data: 0,
        conversion_status: 0
      }
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
  handleOnChangeFeature = event => {
    let value = event.target.checked ? 1 : 0;
    this.setState({
      featureAccess: { ...this.state.featureAccess, [event.target.name]: value },
      errors: { ...this.state.errors, [event.target.name]: "" }
    });
    let featureAccess = {
      ...this.state.featureAccess,
      [event.target.name]: value
    };
    const { dashboard, user, analytic_data, conversion_status } = featureAccess;
    if (dashboard && user && analytic_data && conversion_status) {
      this.setState({
        data: { ...this.state.data, isSuperAdmin: true }
      });
    } else if (event.target.checked === false) {
      this.setState({
        data: { ...this.state.data, isSuperAdmin: false }
      });
    }
  };
  handleOnChangeCheckbox = event => {
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.checked },
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
    if (event.target.name === "isSuperAdmin") {
      if (event.target.checked === true) {
        this.setState({
          featureAccess: {
            dashboard: 1,
            user: 1,
            analytic_data: 1,
            conversion_status: 1
          }
        });
      } else {
        this.setState({
          featureAccess: {
            dashboard: 0,
            user: 0,
            analytic_data: 0,
            conversion_status: 0
          }
        });
      }
    }
  };


  formValidate = () => {
    let { data } = this.state;
    let fieldList = ["name", "emailId"];
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
  
  handleSubmit = async () => {
    if (this.formValidate()) {
      const userId = this.props.match.params.userId;
      const { data, featureAccess } = this.state;
      let params = {
        userId,
        name: data.name,
        isSuperAdmin: data.isSuperAdmin ? data.isSuperAdmin : false,
        featureAccess: [
          {
            dashboard: featureAccess.dashboard
          },
          {
            user: featureAccess.user
          },
          {
            analytic_data: featureAccess.analytic_data
          },
          {
            conversion_status: featureAccess.conversion_status
          }
        ]
      };
      await this.props.updateUserDetail(params);
      const {
        user: { error }
      } = this.props;
      if (error === "") {
        toast.success('User Updated successfully');
        this.props.history.push("/admin/users");
      }
    }
  };
  patchData = userDetail => {
    const createPatchData = {
      userId: userDetail.id,
      emailId: userDetail.emailId,
      name: userDetail.name,
      isSuperAdmin: userDetail.isSuperAdmin
    };
    const featureAccess = Object.assign(userDetail.featureAccess[0], userDetail.featureAccess[1], userDetail.featureAccess[2], userDetail.featureAccess[3]);
    this.setState({
      data: createPatchData,
      featureAccess
    });
  };
  componentDidMount = async () => {
    const userId = this.props.match.params.userId;
    const params = {
      userId
    };
    await this.props.getUsersDetail(params);
    const {
      user: { userDetail }
    } = this.props;
    this.patchData(userDetail);
  };
  render() {
    const {
      history,
      user: { isUserUpdate }
    } = this.props;
    const { data, errors, featureAccess } = this.state;
    return (
      <>
        <SimpleHeader breadcrumb={false} />
        {/* Page content */}
        <Container className="mt--5" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row>
                    <Col sm={4}>
                      <h3 className="mb-0">Edit User</h3>
                    </Col>
                    <Col sm={8} className="text-right">
                      <Button className="btn-icon btn-sm" color="primary" type="button" onClick={() => history.goBack()}>
                        <span className="btn-inner--icon">
                          <i className="ni ni-bold-left" />
                        </span>
                        <span className="btn-inner--text">Back</span>
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <Row className="px-3">
                  <Col md="6" xs="12" sm="12">
                    <FormGroup>
                      <h5>Name</h5>
                      <Input
                        onChange={this.handleOnChange}
                        name="name"
                        className="form-control-alternative"
                        id="name"
                        placeholder="Name"
                        type="text"
                        value={data?.name ? data.name : ""}
                      />
                      {errors.name ? <small className="text-danger">{errors.name}</small> : ""}
                    </FormGroup>
                  </Col>
                  <Col md="6" xs="12" sm="12">
                    <FormGroup>
                      <h5>Email</h5>
                      <Input
                        name="emailId"
                        disabled={true}
                        className="form-control-alternative"
                        id="emailId"
                        placeholder="Enter email here"
                        type="email"
                        value={data?.emailId ? data.emailId : ""}
                      />
                      {errors.emailId ? <small className="text-danger">{errors.emailId}</small> : ""}
                    </FormGroup>
                  </Col>
                  <Col md="12" xs="12" sm="12">
                    <div className="custom-control custom-checkbox mb-3">
                      <Input
                        onChange={this.handleOnChangeCheckbox}
                        className="custom-control-input"
                        id="customCheck1"
                        type="checkbox"
                        name="isSuperAdmin"
                        checked={data?.isSuperAdmin ? true : false}
                      />
                      <label className="custom-control-label" htmlFor="customCheck1">
                        Is Super Admin
                      </label>
                    </div>
                  </Col>
                  <Col md="3" xs="12" sm="12">
                    <div className="custom-control custom-checkbox mb-3">
                      <Input
                        onChange={this.handleOnChangeFeature}
                        name="dashboard"
                        className="custom-control-input"
                        id="customCheck2"
                        type="checkbox"
                        checked={featureAccess?.dashboard ? true : false}
                      />
                      <label className="custom-control-label" htmlFor="customCheck2">
                        Dashboard
                      </label>
                    </div>
                  </Col>
                  <Col md="3" xs="12" sm="12">
                    <div className="custom-control custom-checkbox mb-3">
                      <Input
                        onChange={this.handleOnChangeFeature}
                        name="user"
                        className="custom-control-input"
                        id="customCheck3"
                        type="checkbox"
                        checked={featureAccess?.user ? true : false}
                      />
                      <label className="custom-control-label" htmlFor="customCheck3">
                        User
                      </label>
                    </div>
                  </Col>
                  <Col md="3" xs="12" sm="12">
                    <div className="custom-control custom-checkbox mb-3">
                      <Input
                        onChange={this.handleOnChangeFeature}
                        name="analytic_data"
                        className="custom-control-input"
                        id="customCheck4"
                        type="checkbox"
                        checked={featureAccess?.analytic_data ? true : false}
                      />
                      <label className="custom-control-label" htmlFor="customCheck4">
                        Analytic Data
                      </label>
                    </div>
                  </Col>
                  <Col md="3" xs="12" sm="12">
                    <div className="custom-control custom-checkbox mb-3">
                      <Input
                        onChange={this.handleOnChangeFeature}
                        name="conversion_status"
                        className="custom-control-input"
                        id="customCheck5"
                        type="checkbox"
                        checked={featureAccess?.conversion_status ? true : false}
                      />
                      <label className="custom-control-label" htmlFor="customCheck5">
                        Conversion Status
                      </label>
                    </div>
                  </Col>
                  <Col md="12" className="text-right">
                    <FormGroup>
                      <Button disabled={isUserUpdate} color="primary" onClick={() => this.handleSubmit()}>
                        {isUserUpdate ? <i className="fas fa-spinner fa-spin mr-2" /> : ""}
                        Save
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Card>
            </div>
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
  getUsersDetail,
  updateUserDetail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
