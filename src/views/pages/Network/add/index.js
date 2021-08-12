import React from "react";
import { Button, Card, CardHeader, Container, FormGroup, Input, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import SimpleHeader from "components/Headers/SimpleHeader";
import { createNetwork } from "../../../../redux/network/action";
import { toast } from "react-toastify";
class AddNetwork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    console.log(this.state);
    let { data } = this.state;
    let fieldList = ["name", "click_log_id_param"];
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
      const { data } = this.state;
      let params = {
        click_log_id_param: data.click_log_id_param,
        name: data.name
      };
      await this.props.createNetwork(params)
      const { network: { error } } = this.props
      if(error === ''){
        toast.success('Network Created successfully!');
        this.props.history.push('/admin/networks')
      }
    }
  };
  render() {
    const {
      history,
      network: { isNetworkAdd }
    } = this.props;
    const { data, errors } = this.state;
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
                      <h3 className="mb-0">Add Network</h3>
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
                      <h5>Log Id Param</h5>
                      <Input
                        onChange={this.handleOnChange}
                        name="click_log_id_param"
                        className="form-control-alternative"
                        id="click_log_id_param"
                        placeholder="Enter log id param here"
                        type="text"
                        value={data?.click_log_id_param ? data.click_log_id_param : ""}
                      />
                      {errors.click_log_id_param ? <small className="text-danger">{errors.click_log_id_param}</small> : ""}
                    </FormGroup>
                  </Col>
                  <Col md="12" className="text-right">
                    <FormGroup>
                      <Button disabled={isNetworkAdd} color="primary" onClick={() => this.handleSubmit()}>
                        {isNetworkAdd ? <i className="fas fa-spinner fa-spin mr-2" /> : ""}
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
  createNetwork
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNetwork);
