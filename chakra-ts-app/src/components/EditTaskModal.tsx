import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  IconButton,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import API from "../helpers/api";

interface Props {
  id: number;
  details: string;
  done: boolean;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTaskModal = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [taskText, setTaskText] = useState(props.details);

  const handleEdit = async () => {
    try {
      const payload = {
        details: taskText,
        done: props.done,
      };
      API.put(`/tasks/edit/${props.id}`, payload);
      onClose();
      props.setUpdate(!props.update);
    } catch (error) {
      console.warn(error.message);
    }
  }

  return (
    <>
      <IconButton
        colorScheme="blue"
        mx="0.5rem"
        aria-label="Edit task"
        onClick={onOpen}
        icon={<EditIcon />}
      />

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              onChange={(e) => setTaskText(e.target.value)}
              value={taskText}
              my="1rem"
              placeholder="Edit task ..."
            />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleEdit} colorScheme="blue">Edit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTaskModal;
