import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Table,
  FormGroup,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Input,
  InputGroup
} from "reactstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
// core components
import SimpleHeader from "components/Headers/SimpleHeader";
import { getNetwork, updateNetworkStatus } from "../../../../redux/network/action";
import ReactPaginate from "react-paginate";
import CardFooter from "reactstrap/lib/CardFooter";
class Networks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusLoader: "",
      currentPage: 0,
      perPageItem: 10,
      totalCount: 0,
      pageCount: 0,
      search: "",
      data: {},
      errors: {}
    };
    this.fetchNetworks = this.fetchNetworks.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }
  componentDidMount = async () => {
    const query = new URLSearchParams(this.props.location.search);
    const currentPage = query.get("page_number") ? query.get("page_number") - 1 : 0;
    const search = query.get("search") ? query.get("search") : "";
    await this.setState({
      currentPage,
      search
    });
    this.fetchNetworks();
  };
  handleOnChange = event => {
    this.setState({
      search: event.target.value
    });
  };
  handleSearch = async () => {
    const { search } = this.state;
    await this.setState({
      currentPage: 0
    });
    this.props.history.push({
      pathname: "/admin/networks",
      search: `?search=${search}`
    });
    this.fetchNetworks();
  };
  handleStatusChange = async (status, network) => {
    const updateNetworkData = {
      networkId: network.id,
      status: status
    };
    this.setState({
      statusLoader: network.id
    });
    await this.props.updateNetworkStatus(updateNetworkData);
    const {
      network: { error }
    } = this.props;
    if (error === "") {
      this.setState({
        statusLoader: ""
      });
      toast.success("Updated status successfully!");
    }
  };
  handlePageClick = async event => {
    const { search } = this.state;
    await this.setState({
      currentPage: event.selected
    });
    this.props.history.push({
      pathname: "/admin/networks",
      search: search !== "" ? `?page_number=${event.selected + 1}&search=${search}` : `?page_number=${event.selected + 1}`
    });
    this.fetchNetworks();
  };
  fetchNetworks = async () => {
    const { currentPage, perPageItem, search } = this.state;
    const params = {
      page_number: currentPage + 1,
      per_page_limit: perPageItem,
      search
    };
    await this.props.getNetwork(params);
    this.setState({
      pageCount: Math.ceil(this.props.network.total_count / this.state.perPageItem)
    });
  };
  render() {
    const { currentPage, pageCount, perPageItem, search, statusLoader  } = this.state;
    const { networksList, loading } = this.props.network;
    const { history } = this.props;
    let srNo = currentPage * perPageItem + 1;
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
                  <Row className="align-items-center">
                    <Col sm={8}>
                      <h3 className="mb-0">Networks</h3>
                    </Col>
                    <Col sm={4} className="text-right">
                      <FormGroup className="mb-0 form-inline searchSec">
                        <InputGroup className="input-group-alternative input-group-merge">
                          <Input value={search} placeholder="Search" type="text" name="search" onChange={this.handleOnChange} />
                        </InputGroup>
                        <Button color="primary" className="searchBtn" onClick={this.handleSearch}>
                          <i className="fas fa-search" />
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Sr. No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Log Id Param</th>
                      <th scope="col">Status</th>
                      <th scope="col" className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="8" className="text-center">
                          <h4>
                            <i className="fa fa-spinner fa-spin" />
                          </h4>
                        </td>
                      </tr>
                    ) : networksList && networksList.length > 0 ? (
                      networksList.map(network => {
                        return (
                          <tr key={network.id}>
                            <td>{srNo++}</td>
                            <th scope="row">
                                  <span className="mb-0 text-sm">
                                    {network.name}
                                  </span>
                            </th>
                            <td>{network.click_log_id_param}</td>
                            <td>
                              {network.active ? (
                                <Button
                                  size="sm"
                                  color="danger"
                                  onClick={() => this.handleStatusChange(false, network)}
                                  disabled={statusLoader === network.id ? true : false}
                                >
                                  {statusLoader === network.id ? <i className="fa fa-spinner fa-spin" /> : ""} Deactivate
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  color="success"
                                  onClick={() => this.handleStatusChange(true, network)}
                                  disabled={statusLoader === network.id ? true : false}
                                >
                                  {statusLoader === network.id ? <i className="fa fa-spinner fa-spin" /> : ""} Activate
                                </Button>
                              )}
                            </td>
                            <td className="text-center">
                              <Button
                                id={`edit-${network.id}`}
                                data-placement="top"
                                onClick={() => history.push(`/admin/network/edit/${network.id}`)}
                                size="sm"
                                className="btn-icon btn-2"
                                color="primary"
                                type="button"
                              >
                                <i className="fa fa-edit" />
                              </Button>
                              <UncontrolledTooltip delay={0} placement="top" target={`edit-${network.id}`}>
                                Edit
                              </UncontrolledTooltip>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          <h4>No Data Found</h4>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                {pageCount > 1 ? (
                  <CardFooter>
                    <ReactPaginate
                      previousLabel={"⋖"}
                      forcePage={currentPage}
                      nextLabel={"⋗"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                  </CardFooter>
                ) : (
                  ""
                )}
              </Card>
            </div>
          </Row>
          <Button
            className="btn-icon ml-sm-3 d-none d-md-block btn addButton"
            color="primary"
            type="button"
            onClick={() => history.push("/admin/network/add")}
          >
            <span className="btn-inner--icon">
              <i className="ni ni-fat-add" />
            </span>
            <span className="btn-inner--text">Add Network</span>
          </Button>
        </Container>
      </>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {
  getNetwork,
  updateNetworkStatus
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Networks);
