import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import { fetchStream, editStream } from "../../actions";

import StreamForm from "./StreamForm";
class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id,formValues);
  };
  render() {
    if (!this.props.streams) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <h3>Edit stream</h3>
        <StreamForm
          // this method from lodash selects only the key:value pairs specified
          // from the given object(helps in abstraction)
          initialValues={_.pick(this.props.streams, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

//using connect function to pass the selected stream
//by fetching the stream object form store and setting the id
//that was fetched from the URL

//the second arg contains all props of the component which is using the
//mapStateToProps function
const mapStateToProps = (state, ownProps) => {
  return { streams: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
