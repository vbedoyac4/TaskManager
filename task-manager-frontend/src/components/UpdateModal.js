import React from 'react';
import Modal from './Modal'; // Make sure the path is correct
import TaskForm from './TaskForm';

function UpdateModal({ isOpen, onClose, task }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <TaskForm task={task} onClose={onClose} />
    </Modal>
  );
}

export default UpdateModal;
