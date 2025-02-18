import {instance} from "@/common/instance/instance.ts";
import {Todolist} from "@/features/todolists/api/todolistApi.types.ts";
import {BaseResponse} from "@/common/types";

export const todolistApi = {
    getTodoLists() {
        return instance.get<Todolist[]>(`/todo-lists`)
    },
    createTodoList(title: string) {
        return instance.post<BaseResponse<{item: Todolist}>>(`/todo-lists`, {title})
    },
    deleteTodoList(id: string) {
        return instance.delete<BaseResponse>(`/todo-lists/${id}`)
    },
    changeTodolistTitle(id: string, title: string) {
        return instance.put<BaseResponse>(`/todo-lists/${id}`, {title})
    }
}