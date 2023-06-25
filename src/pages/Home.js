import React, { useState, useEffect } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// components
import TodoDetails from "../components/TodoDetails";
import TodoForm from "../components/TodoForm";

const Home = () => {
  const { Todos, dispatch } = useTodosContext();
  const { user } = useAuthContext();

  const [activeTab, setActiveTab] = useState("active");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("http://localhost:4000/api/todos", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_TODOS", payload: json });
      }
    };
    if (user) {
      fetchTodos();
    }
  }, [dispatch, user]);

  // Filter Todos based on the selected date and activeTab
  const currentDate = new Date().toLocaleDateString();
  const filteredTodos =
    Todos &&
    Todos.filter((todo) => {
      const todoDate = new Date(todo.date).toLocaleDateString();
      const isFutureDate = todoDate >= currentDate;
      return activeTab === "active" ? isFutureDate : !isFutureDate;
    });

  // Filter Todos based on the selected date
  const handleFilterByDate = () => {
    const filteredByDate = filteredTodos.filter(
      (todo) => new Date(todo.date).toLocaleDateString() === new Date(filterDate).toLocaleDateString()
    );

    if (filteredByDate.length > 0) {
      return filteredByDate.map((todo) => (
        <TodoDetails Todo={todo} key={todo._id} isCompleted={false} />
      ));
    } else {
      return <p>No todos to display for the selected date.</p>;
    }
  };

  // Filter completed Todos that have a date in the past
  const completedTodos =
    Todos &&
    Todos.filter((todo) => {
      const todoDate = new Date(todo.date).toLocaleDateString();
      const isPastDate = todoDate < currentDate;
      return isPastDate;
    }).map((todo) => ({ ...todo, isCompleted: true })); // Add isCompleted property to completed todos

  return (
    <div className="home">
      <div className="workouts">
        <Tabs value={activeTab} onChange={(e, newTab) => setActiveTab(newTab)}>
          <Tab value="active" label="Active" />
          <Tab value="completed" label="Completed" />
        </Tabs>
        <TabPanel value={activeTab} index="active">
          <div className="filterdiv">
            <p>
              Filter:
              <input
                type="date"
                className="filter"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </p>
          </div>
          {filterDate ? (
            handleFilterByDate()
          ) : (
            <>
              {filteredTodos && filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                  <TodoDetails Todo={todo} key={todo._id} isCompleted={false} />
                ))
              ) : (
                <p>No todos to display.</p>
              )}
            </>
          )}
        </TabPanel>
        <TabPanel value={activeTab} index="completed">
          {completedTodos && completedTodos.length > 0 ? (
            completedTodos.map((todo) => (
              <TodoDetails Todo={todo} key={todo._id} isCompleted={true} />
            ))
          ) : (
            <p>No completed todos to display.</p>
          )}
        </TabPanel>
      </div>
      <TodoForm />
    </div>
  );
};

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default Home;
