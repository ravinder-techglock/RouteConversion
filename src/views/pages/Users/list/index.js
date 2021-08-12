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
import { getUsers, updateUserStatus, updateUserSession } from "../../../../redux/users/action";
import ReactPaginate from "react-paginate";
import CardFooter from "reactstrap/lib/CardFooter";
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusLoader: "",
      sessionLoader: "",
      currentPage: 0,
      perPageItem: 10,
      totalCount: 0,
      pageCount: 0,
      search: "",
      data: {},
      errors: {}
    };
    this.fetchUsers = this.fetchUsers.bind(this);
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
    this.fetchUsers();
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
      pathname: "/admin/users",
      search: `?search=${search}`
    });
    this.fetchUsers();
  };
  handleStatusChange = async (status, user) => {
    const updateUserData = {
      userId: user.id,
      status: status
    };
    this.setState({
      statusLoader: user.id
    });
    await this.props.updateUserStatus(updateUserData);
    const {
      user: { error }
    } = this.props;
    if (error === "") {
      this.setState({
        statusLoader: ""
      });
      toast.success("Updated status successfully!");
    }
  };
  handleSessionChange = async (status, user) => {
    const updateUserData = {
      userId: user.id,
      status: status
    };
    this.setState({
      sessionLoader: user.id
    });
    await this.props.updateUserSession(updateUserData);
    const {
      user: { error }
    } = this.props;
    if (error === "") {
      this.setState({
        sessionLoader: ""
      });
      toast.success("Session Destroyed successfully!");
    }
  };
  handlePageClick = async event => {
    const { search } = this.state;
    await this.setState({
      currentPage: event.selected
    });
    this.props.history.push({
      pathname: "/admin/users",
      search: search !== "" ? `?page_number=${event.selected + 1}&search=${search}` : `?page_number=${event.selected + 1}`
    });
    this.fetchUsers();
  };
  fetchUsers = async () => {
    const { currentPage, perPageItem, search } = this.state;
    const params = {
      page_number: currentPage + 1,
      per_page_limit: perPageItem,
      search
    };
    await this.props.getUsers(params);
    this.setState({
      pageCount: Math.ceil(this.props.user.total_count / this.state.perPageItem)
    });
  };
  render() {
    const { currentPage, pageCount, perPageItem, search, statusLoader, sessionLoader } = this.state;
    const { usersList, loading } = this.props.user;
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
                      <h3 className="mb-0">Users</h3>
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
                      <th scope="col">Email</th>
                      <th scope="col">Is Supper Admin</th>
                      <th scope="col">Status</th>
                      <th scope="col">Session</th>
                      <th scope="col">Action</th>
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
                    ) : usersList && usersList.length > 0 ? (
                      usersList.map(user => {
                        return (
                          <tr key={user.id}>
                            <td>{srNo++}</td>
                            <th scope="row">
                                  <span className="mb-0 text-sm">
                                    {user.name}
                                  </span>
                            </th>
                            <td>{user.emailId}</td>
                            <td>
                              {user.isSuperAdmin? (
                                <span className="badge badge-primary">Yes</span>
                              ) : (
                                <span className="badge badge-primary">No</span>
                              )}
                            </td>
                            <td>
                              {user.status ? (
                                <Button
                                  size="sm"
                                  color="danger"
                                  onClick={() => this.handleStatusChange(false, user)}
                                  disabled={statusLoader === user.id ? true : false}
                                >
                                  {statusLoader === user.id ? <i className="fa fa-spinner fa-spin" /> : ""} Deactivate
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  color="success"
                                  onClick={() => this.handleStatusChange(true, user)}
                                  disabled={statusLoader === user.id ? true : false}
                                >
                                  {statusLoader === user.id ? <i className="fa fa-spinner fa-spin" /> : ""} Activate
                                </Button>
                              )}
                            </td>
                            <td>
                              {user.session ? (
                                <span className="badge badge-primary">Active</span>
                              ) : (
                                <span className="badge badge-primary">In Active</span>
                              )}
                            </td>
                            <td className="text-right">
                              {user.session ? (
                                <Button
                                  size="sm"
                                  color="danger"
                                  onClick={() => this.handleSessionChange(false, user)}
                                  disabled={sessionLoader === user.id ? true : false}
                                >
                                  {sessionLoader === user.id ? <i className="fa fa-spinner fa-spin" /> : ""} Session Destroy
                                </Button>
                              ) : null }
                              <Button
                                id={`edit-${user.id}`}
                                data-placement="top"
                                onClick={() => history.push(`/admin/user/edit/${user.id}`)}
                                size="sm"
                                className="btn-icon btn-2"
                                color="primary"
                                type="button"
                              >
                                <i className="fa fa-edit" />
                              </Button>
                              <UncontrolledTooltip delay={0} placement="top" target={`edit-${user.id}`}>
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
            onClick={() => history.push("/admin/user/add")}
          >
            <span className="btn-inner--icon">
              <i className="ni ni-fat-add" />
            </span>
            <span className="btn-inner--text">Add User</span>
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
  getUsers,
  updateUserStatus,
  updateUserSession
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
