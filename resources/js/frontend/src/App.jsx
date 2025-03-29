import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import CompleteModal from "./modals/completeModal";
import EditModal from "./modals/editModal";

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [viewMode, setViewMode] = useState("active");
    const [editTaskTitle, setEditTaskTitle] = useState("");

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

    const handleEditTask = async () => {
        if (!selectedTaskId || !editTaskTitle.trim()) return;
        try {
            await axios.put(`http://127.0.0.1:8000/api/tasks/${selectedTaskId}`, {
                title: editTaskTitle,
            });
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
        setEditModalOpen(false);
        setSelectedTaskId(null);
    };

    const handleCompleteTask = async () => {
        if (!selectedTaskId) return;
        try {
            await axios.put(`http://127.0.0.1:8000/api/tasks/${selectedTaskId}`, {
                completed: true,
            });
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
        setIsModalOpen(false);
        setSelectedTaskId(null);
    };

    const renderTasks = () => {
        return tasks
            .filter((task) => (viewMode === "active" ? !task.completed : task.completed))
            .map((task) => (
                <div key={task.id} className="border-bottom py-2 d-flex justify-content-between align-items-center">
                    <div>{task.title}</div>
                    <div className="d-flex gap-2">
                        <button className="btn btn-success btn-sm" onClick={() => {
                            setSelectedTaskId(task.id);
                            setIsModalOpen(true);
                        }}>
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button className="btn btn-primary btn-sm" onClick={() => {
                            setSelectedTaskId(task.id);
                            setEditTaskTitle(task.title);
                            setEditModalOpen(true);
                        }}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="btn btn-danger btn-sm">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            ));
    };

    return (
        <div className="d-flex flex-column vh-100">
            <div className="d-flex justify-content-center p-5">
                <h1 className="fw-bold fs-1">Todo List</h1>
            </div>

            <div className="d-flex justify-content-center">
                <div className="border border-1 w-50 d-flex flex-column p-4">
                    <div className="d-flex w-100 mb-3">
                        <button className={`btn flex-grow-1 ${viewMode === "active" ? "btn-dark" : "btn-light"}`} onClick={() => setViewMode("active")}>
                            Active Tasks
                        </button>
                        <button className={`btn flex-grow-1 ${viewMode === "completed" ? "btn-dark" : "btn-light"}`} onClick={() => setViewMode("completed")}>
                            Completed Tasks
                        </button>
                    </div>

                    <div className="d-flex justify-content-center gap-2 mb-4">
                        <div style={{ width: "70%" }}>
                            <input type="text" className="form-control" placeholder="Enter task..." value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                        </div>
                        <div style={{ width: "30%" }}>
                            <button className="w-100 h-100 bg-black text-white rounded-1" onClick={addTask}>
                                Add Task
                            </button>
                        </div>
                    </div>

                    <div>{renderTasks()}</div>
                </div>
            </div>

            <CompleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleCompleteTask} />
            <EditModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} onConfirm={handleEditTask} editTaskTitle={editTaskTitle} setEditTaskTitle={setEditTaskTitle} />
        </div>
    );
}

export default App;
