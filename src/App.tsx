import React, { useState, useRef } from "react";

//tasks type
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  // handle individual task
  const [newTask, setNewTask] = useState<string>("");
  //handle arr tasks
  const [tasks, setTasks] = useState<ITask[]>([]);
  //ref to focus (input)
  const inputRef = useRef<HTMLInputElement>(null);
  // handle button to add tasks
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //calling the function to add a new task
    addTask(newTask);
    inputRef.current?.focus();
  };
  //method to add a task
  const addTask = (name: string): void => {
    const newT: ITask[] = [...tasks, { name, done: false }];
    //sets and clean
    setTasks(newT);
    setNewTask("");
  };
  //method to alternate the "done" atribute
  const toggleDoneTask = (index: number): void => {
    const newT: ITask[] = [...tasks];
    newT[index].done = !newT[index].done;
    setTasks(newT);
  };
  //method to remove a task with splice
  const removeTask = (index: number): void => {
    const newT: ITask[] = [...tasks];
    newT.splice(index, 1);
    setTasks(newT);
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 ">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  ref={inputRef}
                />
                <button type="submit" className="btn btn-success col-12">
                  {" "}
                  save
                </button>
              </form>
            </div>
          </div>

          {tasks.map((t: ITask, index: number) => (
            <div className="card card-body mt-2" key={index}>
              <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h2>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleDoneTask(index)}
                >
                  {t.done ? "✓" : "×"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(index)}
                >
                  🗑{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
