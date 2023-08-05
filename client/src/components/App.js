import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useFetchUserQuery, changeCurrentUser } from "../store";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./Surveys/SurveyNew";

function App() {
  const dispatch = useDispatch();
  const { data, error, isFetching } = useFetchUserQuery();
  useEffect(() => {
    if (!isFetching) {
      dispatch(changeCurrentUser(data || false));
    }
  }, [data, dispatch, error, isFetching]);

  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/surveys" element={<Dashboard />} />
          <Route path="/surveys/new" element={<SurveyNew />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
