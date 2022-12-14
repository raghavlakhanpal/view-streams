import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import history from "../../history";
import Modal from "../Modal";

import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  renderActions() {
    return (
      //React.Fragment can be replaced with <></>
      //but some linters may not recognize it
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }
  renderContent() {
    if (!this.props.stream) {
      return <div>Are you sure you want to delete the stream?</div>;
    }
    return (
      <div>
        Are you sure you want to delete the stream titled:{" "}
        <strong>{this.props.stream.title}</strong>
      </div>
    );
  }
  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
