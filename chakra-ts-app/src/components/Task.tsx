import React from "react";
import { Box, Text, Flex, IconButton, Checkbox } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import EditTaskModal from "./EditTaskModal";
import API from "../helpers/api";

interface Props {
  id: number;
  details: string;
  done: boolean;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const Task = (props: Props) => {
  const handleChecked = async () => {
    try {
      const payload = {
        details: props.details,
        done: !props.done,
      };
      await API.put(`/tasks/edit/${props.id}`, payload)
      props.setUpdate(!props.update);
    } catch (error) {
      console.warn(error.message);
    }
  };

  // Delete a task
  const handleDelete = async () => {
    try {
      await API.delete(`/tasks/delete/${props.id}`)
      props.setUpdate(!props.update);
    } catch (error) {
      console.warn(error.message);
    }
  };

  return (
    <Flex
      border="1px"
      borderColor="gray.200"
      p="1rem"
      borderRadius="5px"
      align="center"
      justify="space-between"
    >
      <Flex>
        <Checkbox
          isChecked={props.done}
          onChange={handleChecked}
          size="lg"
          mr="1rem"
        />
        <Text fontWeight="semibold">{props.details}</Text>
      </Flex>
      <Box>
        <EditTaskModal
          id={props.id}
          details={props.details}
          done={props.done}
          update={props.update}
          setUpdate={props.setUpdate}
        />
        <IconButton
          colorScheme="red"
          mx="0.5rem"
          aria-label="Delete task"
          icon={<DeleteIcon />}
          onClick={handleDelete}
        />
      </Box>
    </Flex>
  );
};

export default Task;
