import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import CompleteModal from "./modals/completeModal";

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const handleCompleteTask = async () => {
        if (!selectedTaskId) return; // Ensure taskId exists

        try {
            await axios.put(`http://127.0.0.1:8000/api/tasks/${selectedTaskId}`, { completed: true });
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
        setIsModalOpen(false);
        setSelectedTaskId(null);
    };
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/tasks");
            console.log(res.data.data);
            setTasks(res.data.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const addTask = async () => {
        if (!taskTitle.trim()) return; // Prevent adding empty tasks

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/tasks", {
                title: taskTitle, 
            });

            // Update task list and clear input
            setTasks((prevTasks) => [...prevTasks, res.data.data]);
            setTaskTitle(""); 
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="d-flex flex-column vh-100">
            {/* Heading at the top */}
            <div className="d-flex justify-content-center p-5">
                <h1 className="fw-bold fs-1">Todo List</h1>
            </div>

            {/* Input, button, and tasks section */}
            <div className="d-flex justify-content-center">
                <div className="border border-1 w-50 d-flex flex-column p-4">
                    {/* Input and button */}
                    <div className="d-flex justify-content-center gap-2 mb-4">
                        <div style={{ width: "70%" }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter task..."
                                value={taskTitle} 
                                onChange={(e) => setTaskTitle(e.target.value)} // Update state on change
                            />
                        </div>
                        <div style={{ width: "30%" }}>
                            <button 
                                className="w-100 h-100 bg-black text-white rounded-1"
                                onClick={addTask} // Call addTask function
                            >
                                Add Task
                            </button>
                        </div>
                    </div>

                    {/* Tasks list */}
                    <div>
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={`border-bottom py-2 d-flex justify-content-between align-items-center 
                                    ${task.completed ? "text-decoration-line-through text-secondary" : ""}`}
                                >
                                    <div>{task.title}</div>
                                    <div className="d-flex gap-2">
                                        {/* Complete Button */}
                                        {!task.completed && (
                                            <button 
                                                className="btn btn-success btn-sm"
                                                onClick={() => {
                                                    setSelectedTaskId(task.id);
                                                    setIsModalOpen(true);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faCheck} />
                                            </button>
                                        )}
                                        {/* Edit Button */}
                                        <button className="btn btn-primary btn-sm">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        {/* Delete Button */}
                                        <button className="btn btn-danger btn-sm">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No tasks available</p>
                        )}
                    </div>
                </div>
            </div>
             <CompleteModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={handleCompleteTask}
            />
        </div>
    );
}

export default App;
