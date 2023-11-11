import UserList from "../UserList";
import Form from "../Form";

import Window from "../Window";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import nameGenerator from "../../features/nameGenerator";
import { joinChat } from "../../redux/actions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const randomName = nameGenerator();
    dispatch(joinChat(randomName));
  }, []);

  return (
    <div className="page">
      <header className="header">
        <UserList />
      </header>
      <main className="content">
        <Window />
        <Form />
      </main>
    </div>
  );
};

export default App;
