import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskProps = {
  taskId: number;
  taskNewTitle: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find((task) => task.title === newTaskTitle);

    if (taskWithSameTitle) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks((prevState) => [...prevState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.filter((task) => ({ ...task }));
    const findItem = updatedTasks.find((task) => task.id === id);

    if (!findItem) {
      return;
    } else {
      findItem.done = !findItem.done;
    }

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          style: 'cancel',
          text: 'Não',
        },
        {
          style: 'destructive',
          text: 'Sim',
          onPress: () => {
            const updatedTasks = tasks.filter((task) => task.id !== id);

            setTasks(updatedTasks);
          },
        },
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskProps) {
    const updatedTasks = tasks.filter((task) => ({ ...task }));
    const taskToBeUpdated = updatedTasks.find((task) => task.id === taskId);

    if (!taskToBeUpdated) {
      return;
    }

    taskToBeUpdated.title = taskNewTitle;

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
