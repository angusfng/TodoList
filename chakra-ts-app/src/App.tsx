import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Input,
  Box,
  Button,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import Task from "./components/Task";
import API from "./helpers/api";

interface Props {}

interface TaskType {
  id: number;
  details: string;
  done: boolean;
}

const App = (props: Props) => {
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [update, setUpdate] = useState(false);
  const [taskText, setTaskText] = useState("");

  // Get array of tasks
  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await API.get("/tasks");
        setTaskList(tasks);
      } catch (error) {
        console.warn(error.message);
      }    
    }
    getTasks();
  }, [update]);

  // Post a new task
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No empty task
    if (taskText === "") {
      return;
    }
    try {
      const payload = {
        details: taskText,
        done: false,
      };
      await API.post("/tasks/new", payload);
      setUpdate((update) => !update);
      setTaskText("");
    } catch (error) {
      console.warn(error.message);
    }
  };

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Flex flexGrow={1} bg="gray.50" flexDirection="column" align="center">
        <Heading mt="3%">To-do List</Heading>
        <Box maxW="50rem" w="100%">
          <form onSubmit={handleSubmit}>
            <Flex align="center">
              <Input
                onChange={(e) => setTaskText(e.target.value)}
                value={taskText}
                my="1rem"
                placeholder="New task ..."
              />
              <Button type="submit" w="10rem" ml="1rem" colorScheme="teal">
                Add task
              </Button>
            </Flex>
          </form>
          <UnorderedList mt="1rem" m={0} styleType="none">
            {taskList.map((task, idx: number) => (
              <ListItem key={idx} my="1rem">
                <Task
                  id={task.id}
                  details={task.details}
                  done={task.done}
                  update={update}
                  setUpdate={setUpdate}
                />
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Flex>
    </Flex>
  );
};

export default App;
