import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop show"></div>
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Deletion</h5>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this task?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" onClick={onConfirm}>
                                Delete
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

export default DeleteModal;
