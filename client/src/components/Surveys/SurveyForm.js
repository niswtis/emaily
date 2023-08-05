import { reduxForm, Field } from "redux-form";
import _ from "lodash";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";

const FIELDS = [
  { label: "Survey Title", name: "title" },
  { label: "Subject Line", name: "subject" },
  { label: "Email Body", name: "body" },
  {
    label: 'Recipient List separated by "," (comma)',
    name: "recipients",
  },
];

function renderFields() {
  return _.map(FIELDS, ({ label, name }) => {
    return (
      <Field
        type="text"
        name={name}
        component={SurveyField}
        label={label}
        key={name}
      />
    );
  });
}

function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || "");

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      //error.attr , attr is equal to the name attribute of the field
      errors[name] = `${name} can not be empty`;
    }
    return name;
  });

  return errors;
}

function SurveyForm(props) {
  const { handleSubmit, setShowReview } = props;
  return (
    <div>
      <form onSubmit={handleSubmit(() => setShowReview(true))}>
        {renderFields()}
        <Link to="/surveys" className="red btn-flat left white-text">
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
}

export default reduxForm({
  form: "surveyForm",
  destroyOnUnmount: false, // when we go to the SurveyFormReview, we do not want the values to get deleted
  validate,
})(SurveyForm);
