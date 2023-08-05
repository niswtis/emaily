// SurveyNew shows SurveyForm and SurveyFormReview
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { useState } from "react";

function SurveyNew() {
  const [showReview, setShowReview] = useState(false);

  return (
    <div>
      {showReview ? (
        <SurveyFormReview setShowReview={setShowReview} />
      ) : (
        <SurveyForm setShowReview={setShowReview} />
      )}
    </div>
  );
}

// we add this so that, when we cancel the form creation the values get deleted
// if this component get unmounted the the values get dumped
export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
