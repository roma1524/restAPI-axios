import { TaskPriority, TaskStatus } from "@/common/enums/enums.ts"

export type Task = {
  description: string
  title: string
  completed: boolean
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type GetTasksResponse = {
  items: Task[]
  totalCount: string
  error: string
}
export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}
