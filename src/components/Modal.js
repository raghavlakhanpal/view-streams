import React from "react";
import ReactDOM from "react-dom";

//REUSABLE since values outsourced to Parent Component(StreamDelete)
const Modal = (props) => {
  return ReactDOM.createPortal(
    <div
      // outsourced the on click action to parent
      onClick={props.onDismiss}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
