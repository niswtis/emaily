import { connect } from "react-redux";
import { useSaveSurveyMutation } from "../../store";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

function SurveyFormReview(props) {
  const { setShowReview, formValues } = props;
  const navigate = useNavigate();
  const [saveSurvey] = useSaveSurveyMutation();

  const saveSurveyHandler = () => {
    saveSurvey(formValues).then(() => {
      navigate("/surveys");
    });
  };

  const formFields = [
    { label: "Title of survey", name: "title" },
    { label: "Subject of email", name: "subject" },
    { label: "Body of email", name: "body" },
    { label: "Recipients of email", name: "recipients" },
  ];

  const reviewFields = _.map(formFields, ({ label, name }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        onClick={() => setShowReview(false)}
        className="yellow darken-3 btn-flat left white-text"
        style={{ marginTop: "10px" }}
      >
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        style={{ marginTop: "10px" }}
        onClick={saveSurveyHandler}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

// we use connect to get access to the redux store
export default connect(mapStateToProps)(SurveyFormReview);
