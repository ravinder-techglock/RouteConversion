import React from "react";
import { Col, UncontrolledTooltip } from "reactstrap";
import { connect } from "react-redux";

class ImageUpload extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    const { colSize, lableText, handleOnChange, image, error, nameProp, fileLoading, infoIconText } = this.props;
    return (
      <Col md={colSize}>
        <h4>
          {lableText}{" "}
          {infoIconText ? (
            <>
              <a
                href="#pablo"
                id={`${nameProp}-toolTip`}
                onClick={e => e.preventDefault()}
              >
                <i className="fa fa-info-circle" />
              </a>
              <UncontrolledTooltip delay={0} target={`${nameProp}-toolTip`}>
                {infoIconText}
              </UncontrolledTooltip>
            </>
          ) : (
            ""
          )}
        </h4>
        <div className="blog_image">
          <div className="avatar-upload">
            <div className="avatar-edit">
              <input
                type="file"
                id={nameProp}
                accept=".png, .jpg, .jpeg, .gif"
                name={nameProp}
                onChange={e => handleOnChange(e, nameProp)}
              />
              <label htmlFor={nameProp}>
                <i className="fas fa-edit" />
              </label>
            </div>
            <div className="avatar-preview">
              {fileLoading ? <p className="spinner" /> : <div id="imagePreview" style={{ backgroundImage: `url(${image})` }} />}
            </div>
            {/* <small className="text-center form-control-label">Icon (400 X 400)</small> */}
          </div>
        </div>
        {error ? <small className="text-danger">{error}</small> : ""}
      </Col>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageUpload);
