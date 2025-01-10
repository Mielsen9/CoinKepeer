// import {TasksStateType, ToDoListType} from "@/App";
// import {addTodolistAC, toDoListReducer} from "@/state/reducer/todolist-reducer/todolist-reducer";
// import {taskReducer} from "@/state/reducer/task-reducer/task-reducer";
//
// test("id must be equals", () => {
// 	const startTaskState: TasksStateType = {};
// 	const startToDoList: Array<ToDoListType> = [];
//
// 	const action = addTodolistAC("new todolist");
// 	const endTaskState = taskReducer(startTaskState, action);
// 	const endTodolistState = toDoListReducer(startToDoList, action);
//
// 	const keys = Object.keys(endTaskState);
// 	const idFromTask = keys[0];
// 	const idFromTodolist = endTodolistState[0].id;
//
// 	expect(idFromTask).toBe(action.id);
// 	expect(idFromTodolist).toBe(action.id)
//
// })