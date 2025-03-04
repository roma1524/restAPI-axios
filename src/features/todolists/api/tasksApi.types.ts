export type Task = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
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
  status: number
  priority: number
  startDate: string
  deadline: string
}
