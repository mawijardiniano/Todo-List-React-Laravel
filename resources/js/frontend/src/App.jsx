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
    const [viewMode, setViewMode] = useState("active"); // "active" or "completed"

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/tasks");
            setTasks(res.data.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const addTask = async () => {
        if (!taskTitle.trim()) return;
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/tasks", {
                title: taskTitle,
            });
            setTasks((prevTasks) => [...prevTasks, res.data.data]);
            setTaskTitle("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleCompleteTask = async () => {
        if (!selectedTaskId) return;
        try {
            await axios.put(
                `http://127.0.0.1:8000/api/tasks/${selectedTaskId}`,
                { completed: true }
            );
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
        setIsModalOpen(false);
        setSelectedTaskId(null);
    };

    // Function to render tasks based on viewMode
    const renderTasks = () => {
        switch (viewMode) {
            case "active":
                return tasks
                    .filter((task) => !task.completed)
                    .map((task) => (
                        <div
                            key={task.id}
                            className="border-bottom py-2 d-flex justify-content-between align-items-center"
                        >
                            <div>
                                {task.title} -{" "}
                                <span className="text-danger">
                                    ❌ Not Completed
                                </span>
                            </div>
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => {
                                        setSelectedTaskId(task.id);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                </button>
                                <button className="btn btn-primary btn-sm">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button className="btn btn-danger btn-sm">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ));

            case "completed":
                return tasks
                    .filter((task) => task.completed)
                    .map((task) => (
                        <div
                            key={task.id}
                            className="border-bottom py-2 d-flex justify-content-between align-items-center"
                        >
                            <div>
                                {task.title} -{" "}
                                <span className="text-success">
                                    ✅ Completed
                                </span>
                            </div>
                        </div>
                    ));

            default:
                return <p>No tasks available</p>;
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
                    {/* Toggle Buttons */}
                    <div className="d-flex w-100 mb-3">
                        <button
                            className={`btn flex-grow-1 ${
                                viewMode === "active" ? "btn-dark" : "btn-light"
                            }`}
                            onClick={() => setViewMode("active")}
                        >
                            Active Tasks
                        </button>
                        <button
                            className={`btn flex-grow-1 ${
                                viewMode === "completed"
                                    ? "btn-dark"
                                    : "btn-light"
                            }`}
                            onClick={() => setViewMode("completed")}
                        >
                            Completed Tasks
                        </button>
                    </div>

                    {/* Input and Add Task Button */}
                    <div className="d-flex justify-content-center gap-2 mb-4">
                        <div style={{ width: "70%" }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter task..."
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                            />
                        </div>
                        <div style={{ width: "30%" }}>
                            <button
                                className="w-100 h-100 bg-black text-white rounded-1"
                                onClick={addTask}
                            >
                                Add Task
                            </button>
                        </div>
                    </div>

                    {/* Tasks List */}
                    <div>{renderTasks()}</div>
                </div>
            </div>

            {/* Complete Task Modal */}
            <CompleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleCompleteTask}
            />
        </div>
    );
}

export default App;
