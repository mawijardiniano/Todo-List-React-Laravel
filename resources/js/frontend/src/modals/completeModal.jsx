import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CompleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop show"></div>
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Complete Task</h5>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to mark this task as completed?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success" onClick={onConfirm}>
                                Yes, Complete
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

export default CompleteModal;
