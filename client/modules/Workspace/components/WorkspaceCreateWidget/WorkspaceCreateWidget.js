import React, { Component, PropTypes } from "react";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import {
  Button,
  ButtonToolbar,
  Modal,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";
// Import Style
import styles from "./WorkspaceCreateWidget.css";

export class WorkspaceCreateWidget extends Component {
  constructor(props, context) {
    super(props, context);

    // this.handleChange = this.handleChange.bind(this);

    this.state = {
      full_name: "",
      display_name: "",
      admin_user: "",
      password: "",
      confirm_password: ""
    };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  getValidationState = key => {
    switch (key) {
      case "full_name":
        return this.state.full_name.length > 0 ? "success" : "error";
        break;

      case "display_name":
        return this.state.display_name.length > 0 ? "success" : "error";
        break;

      case "admin_user":
        return this.state.admin_user.length > 0 ? "success" : "error";
        break;

      case "password":
        return this.state.password.length > 0 ? "success" : "error";
        break;

      case "confirm_password":
        var pc_length = this.state.confirm_password.length;
        if (pc_length > 0 && this.state.password == this.state.confirm_password)
          return "success";
        return "error";
        break;

      default:
        break;
    }
  };

  newWorkspace = () => {
    if (
      this.state.full_name.length > 0 &&
      this.state.display_name.length > 0 &&
      this.state.admin_user.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password == this.state.confirm_password
    ) {
      this.props.addWorkspace(this.state);
    }
  };

  render() {
    return (
      <Form horizontal style={{ padding: "50px" }}>
        <FormGroup
          controlId="formHorizontalFullName"
          validationState={this.getValidationState("full_name")}
        >
          <Col
            style={{ textAlign: "left" }}
            componentClass={ControlLabel}
            sm={3}
          >
            <ControlLabel>Full Name</ControlLabel>
          </Col>
          <Col sm={9}>
            <FormControl
              type="text"
              value={this.state.full_name}
              placeholder="Enter Full Name"
              onChange={e => {
                this.setState({ full_name: e.target.value });
              }}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup
          controlId="formHorizontalDispalyName"
          validationState={this.getValidationState("display_name")}
        >
          <Col
            style={{ textAlign: "left" }}
            componentClass={ControlLabel}
            sm={3}
          >
            <ControlLabel>Display Name</ControlLabel>
          </Col>
          <Col sm={9}>
            <FormControl
              type="text"
              value={this.state.display_name}
              placeholder="Enter Display Name"
              onChange={e => {
                this.setState({ display_name: e.target.value });
              }}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup
          controlId="formHorizontalAdminUser"
          validationState={this.getValidationState("admin_user")}
        >
          <Col
            style={{ textAlign: "left" }}
            componentClass={ControlLabel}
            sm={3}
          >
            <ControlLabel>Admin User</ControlLabel>
          </Col>
          <Col sm={9}>
            <FormControl
              type="text"
              value={this.state.admin_user}
              placeholder="Enter Admin User's Email"
              onChange={e => {
                this.setState({ admin_user: e.target.value });
              }}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup
          controlId="formHorizontalPassword"
          validationState={this.getValidationState("password")}
        >
          <Col
            style={{ textAlign: "left" }}
            componentClass={ControlLabel}
            sm={3}
          >
            <ControlLabel>Password</ControlLabel>
          </Col>
          <Col sm={9}>
            <FormControl
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup
          controlId="formHorizontalConfirmPassword"
          validationState={this.getValidationState("confirm_password")}
        >
          <Col
            style={{ textAlign: "left" }}
            componentClass={ControlLabel}
            sm={3}
          >
            <ControlLabel>Confirm Password</ControlLabel>
          </Col>
          <Col sm={9}>
            <FormControl
              type="password"
              value={this.state.confirm_password}
              placeholder="Confirm Password"
              onChange={e => {
                this.setState({ confirm_password: e.target.value });
              }}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={5} sm={7}>
            <Button onClick={this.newWorkspace}>
              Create Workspace ->
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

WorkspaceCreateWidget.propTypes = {
  addWorkspace: PropTypes.func.isRequired
  // showAddWorkspace: PropTypes.bool.isRequired,
  // intl: intlShape.isRequired,
};

export default injectIntl(WorkspaceCreateWidget);
