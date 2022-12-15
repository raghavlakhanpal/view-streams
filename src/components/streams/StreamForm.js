import React from "react";
//importing Field Component -> to handle input component
// and reduxForm -> a connector function to connect the form to redux store
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  //creating an error handeling method
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  //creating a method to render input field to the Field Component
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        {/*synatax to assign all properties of 'input' to the input tag
        this way we wont have to declare different properties and their values */}
        <input {...input} autoComplete="off" />
        {/* the meta param contains many other params including error */}
        {/* which i wired to redux store using validate function below*/}
        {this.renderError(meta)}
      </div>
    );
  };

  //creating a config method to pass values to
  //the predefined handleSubmit function
  //this method does not recieve an event but values of the fields in form
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        // the 'error' here tells semantic UI to render errors
        // which it will not do otherwise
        className="ui form error"
      >
        {/* when we pass additional props to field component */}
        {/* they get passed as props to the fuction call of 'component' property */}
        <Field name="title" component={this.renderInput} label="Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}
//implementing validation on forms
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

//implementing reduxForm function
export default reduxForm({
  // passing the name of form to store
  form: "streamForm",
  //passing the validate function to store(validate:validate)
  validate,
})(StreamForm);
