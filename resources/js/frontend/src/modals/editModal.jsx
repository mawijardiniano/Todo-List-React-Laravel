import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EditModal = ({ isOpen, onClose, onConfirm, editTaskTitle, setEditTaskTitle }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop show"></div>
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Task</h5>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={editTaskTitle}
                                onChange={(e) => setEditTaskTitle(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success" onClick={onConfirm}>
                                Save Changes
                            </button>
                            <button className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditModal;
