import { instance } from "@/common/instance/instance.ts"
import { BaseResponse } from "@/app/types.ts"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>(`/todo-lists`)
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>(`/todo-lists`, { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
  changeTodolistTitle(id: string, title: string) {
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
}
