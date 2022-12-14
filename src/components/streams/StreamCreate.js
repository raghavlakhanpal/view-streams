import React from "react";

import { connect } from "react-redux";
//importing action creator for Creating a stream
import { createStream } from "../../actions";

import StreamForm from "./StreamForm";
class StreamCreate extends React.Component {

  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a new stream</h3>
        <StreamForm onSubmit={this.onSubmit}/>
      </div>
    );
  }
}
export default connect(null, { createStream })(StreamCreate);
