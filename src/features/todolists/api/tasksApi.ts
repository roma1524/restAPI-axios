import { instance } from "@/common"
import { GetTasksResponse, Task, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { BaseResponse } from "@/app/types.ts"

export const tasksApi = {
  getTasks(tdId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${tdId}/tasks`)
  },
  createTask(tdId: string, title: string) {
    return instance.post<BaseResponse<{ item: Task }>>(`/todo-lists/${tdId}/tasks`, { title })
  },
  deleteTask(tdId: string, taskId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${tdId}/tasks/${taskId}`)
  },
  changeTaskStatus(tdId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<BaseResponse<{ item: Task }>>(`/todo-lists/${tdId}/tasks/${taskId}`, model)
  },
}
