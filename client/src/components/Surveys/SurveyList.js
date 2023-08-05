import { useFetchSurveysQuery } from "../../store";
import _ from "lodash";

function SurveyList() {
  const { data, isFetching } = useFetchSurveysQuery();

  let renderedSurveys;
  if (!isFetching) {
    renderedSurveys = _.cloneDeep(data)
      .reverse()
      .map((survey) => {
        return (
          <div className="card darken-1" key={survey._id}>
            <div className="card-content">
              <span className="card-title">{survey.title}</span>
              <p>{survey.body}</p>
              <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <a href="/surveys">Yes: {survey.yes}</a>
              <a href="/surveys">No: {survey.no}</a>
            </div>
          </div>
        );
      });
    console.log(data);
  }

  return <div>{renderedSurveys}</div>;
}

export default SurveyList;
