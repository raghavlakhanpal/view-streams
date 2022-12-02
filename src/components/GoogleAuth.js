import React from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../actions";
import ClientID from "./ClientID";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: ClientID,
          scope: "email",
          plugin_name: "MyStreamy",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClicked = (userId) => {
    //google api call
    this.auth.signIn();
  };
  onSignOutClicked = () => {
    //google api call
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button
          onClick={this.onSignOutClicked}
          className="ui black google button"
        >
          <i className="google icon" />
          Sign out
        </button>
      );
    } else {
      return (
        <button
          onClick={this.onSignInClicked}
          className="ui black google button"
        >
          <i className="google icon" />
          Sign in with google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
