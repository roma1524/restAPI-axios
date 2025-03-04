import { type ChangeEvent, type CSSProperties, useEffect, useState } from "react"
import Checkbox from "@mui/material/Checkbox"
import { CreateItemForm, EditableSpan } from "@/common/components"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { Task, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums/enums.ts"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Record<string, Task[]>>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)

      todolists.forEach((td) => {
        tasksApi.getTasks(td.id).then((res) => {
          setTasks((prevState) => ({ ...prevState, [td.id]: res.data.items }))
        })
      })
    })
  }, [])

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newT = res.data.data.item
      setTodolists([newT, ...todolists])
    })
  }
  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolist(id).then(() => {
      setTodolists((prevTodolists) => prevTodolists.filter((el) => el.id !== id))
      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks }
        delete newTasks[id]
        return newTasks
      })
    })
  }

  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTodolistTitle(id, title).then(() => {
      setTodolists(todolists.map((el) => (el.id === id ? { ...el, title } : el)))
    })
  }

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTask(todolistId, title).then((res) => {
      const newTask = res.data.data.item
      setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    })
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask(todolistId, taskId).then(() => {
      setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((el) => el.id !== taskId) })
    })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: Task) => {
    const tdId = task.todoListId
    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }

    tasksApi.changeTaskStatus(tdId, task.id, model).then((res) => {
      setTasks({ ...tasks, [tdId]: tasks[tdId].map((t) => (t.id === task.id ? res.data.data.item : t)) })
    })
  }

  const changeTaskTitle = (task: Task, title: string) => {
    const tdId = task.todoListId
    const model: UpdateTaskModel = {
      description: task.description,
      title: title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    tasksApi.changeTaskTitle(tdId, task.id, model).then((res) => {
      setTasks({ ...tasks, [tdId]: tasks[tdId].map((t) => (t.id === task.id ? res.data.data.item : t)) })
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <CreateItemForm onCreateItem={createTodolist} />
      {todolists.map((todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan value={todolist.title} onChange={(title) => changeTodolistTitle(todolist.id, title)} />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <CreateItemForm onCreateItem={(title) => createTask(todolist.id, title)} />
          {tasks[todolist.id]?.map((task: Task) => (
            <div key={task.id}>
              <Checkbox checked={task.status === TaskStatus.Completed} onChange={(e) => changeTaskStatus(e, task)} />
              <EditableSpan value={task.title} onChange={(title) => changeTaskTitle(task, title)} />
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
