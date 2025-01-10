// import {
// 	addedTaskAC,
// 	changeTaskStatusAC,
// 	changeTaskTitleAC,
// 	removeTaskAC,
// 	taskReducer
// } from "@/state/reducer/task-reducer/task-reducer";
// import {v1} from "uuid";
// import {TasksStateType} from "@/App";
// import {addTodolistAC, removeTodolistAC} from "@/state/reducer/todolist-reducer/todolist-reducer";
//
// test("task mast be added", () => {
// 	let toDoListsID1 = v1();
// 	let toDoListsID2 = v1();
//
// 	const startState: TasksStateType = {
// 		[toDoListsID1]: [
// 			{id: v1(), title: "CSS", isDone: true},
// 			{id: v1(), title: "JS", isDone: true},
// 			{id: v1(), title: "React", isDone: false},
// 		],
// 		[toDoListsID2]: [
// 			{id: v1(), title: "Bread", isDone: true},
// 			{id: v1(), title: "Milk", isDone: true},
// 		],
// 	}
//
// 	const newTitle = "New Title";
// 	const action = addedTaskAC (toDoListsID2, newTitle);
//
// 	const endState = taskReducer(startState, action)
//
// 	expect(endState[toDoListsID2].length).toBe(3); // Було 2, тепер має бути 3
// 	expect(endState[toDoListsID2][0].title).toBe(newTitle); // Нове завдання додається на початок
// });
// test("task mast be removed", () => {
// 	let toDoListsID1 = v1();
// 	let toDoListsID2 = v1();
//
// 	const startState: TasksStateType = {
// 		[toDoListsID1]: [
// 			{id: v1(), title: "CSS", isDone: true},
// 			{id: v1(), title: "JS", isDone: true},
// 			{id: v1(), title: "React", isDone: false},
// 		],
// 		[toDoListsID2]: [
// 			{id: v1(), title: "Bread", isDone: true},
// 			{id: v1(), title: "Milk", isDone: true},
// 		],
// 	}
//
// 	const taskId = startState[toDoListsID1][2].id;
// 	const action = removeTaskAC(toDoListsID1, taskId)
//
// 	const endState = taskReducer(startState, action)
//
// 	expect(endState[toDoListsID1].length).toBe(2);
// });
// test("taskTitle mast be changed", () => {
// 	let toDoListsID1 = v1();
// 	let toDoListsID2 = v1();
//
// 	const startState: TasksStateType = {
// 		[toDoListsID1]: [
// 			{id: v1(), title: "CSS", isDone: true},
// 			{id: v1(), title: "JS", isDone: true},
// 			{id: v1(), title: "React", isDone: false},
// 		],
// 		[toDoListsID2]: [
// 			{id: v1(), title: "Bread", isDone: true},
// 			{id: v1(), title: "Milk", isDone: true},
// 		],
// 	}
//
// 	const newTitle = "New Title";
// 	const taskId = startState[toDoListsID1][2].id;
// 	const action = changeTaskTitleAC(toDoListsID1, taskId, newTitle)
//
// 	const endState = taskReducer(startState, action)
//
// 	expect(endState[toDoListsID1][2].title).toBe(newTitle);
// });
// test("taskStatus mast be changed", () => {
// 	let toDoListsID1 = v1();
// 	let toDoListsID2 = v1();
//
// 	const startState: TasksStateType = {
// 		[toDoListsID1]: [
// 			{id: v1(), title: "CSS", isDone: true},
// 			{id: v1(), title: "JS", isDone: true},
// 			{id: v1(), title: "React", isDone: false},
// 		],
// 		[toDoListsID2]: [
// 			{id: v1(), title: "Bread", isDone: true},
// 			{id: v1(), title: "Milk", isDone: true},
// 		],
// 	}
//
// 	const newStatus = true;
// 	const taskId = startState[toDoListsID1][2].id;
// 	const action = changeTaskStatusAC(toDoListsID1, taskId, newStatus)
//
// 	const endState = taskReducer(startState, action);
//
// 	expect(endState[toDoListsID1][2].isDone).toBe(newStatus);
// });
// test("new property most be added when new todolist is added", () => {
// 	let toDoListsID1 = v1();
// 	let toDoListsID2 = v1();
//
// 	const startState: TasksStateType = {
// 		[toDoListsID1]: [
// 			{id: "1", title: "CSS", isDone: true},
// 			{id: "2", title: "JS", isDone: true},
// 			{id: "3", title: "React", isDone: false},
// 		],
// 		[toDoListsID2]: [
// 			{id: "1", title: "Bread", isDone: true},
// 			{id: "2", title: "Milk", isDone: true},
// 		],
// 	}
//
// 	const action = addTodolistAC("New Title")
//
// 	const endState = taskReducer(startState, action);
//
// 	const keys = Object.keys(endState);
//
// 	expect(keys.length).toBe(3);
// });
// test("todolist must be delete", () => {
// 	let toDoListsID1 = v1();
// 	let toDoListsID2 = v1();
//
// 	const startState: TasksStateType = {
// 		[toDoListsID1]: [
// 			{id: v1(), title: "CSS", isDone: true},
// 			{id: v1(), title: "JS", isDone: true},
// 			{id: v1(), title: "React", isDone: false},
// 		],
// 		[toDoListsID2]: [
// 			{id: v1(), title: "Bread", isDone: true},
// 			{id: v1(), title: "Milk", isDone: true},
// 		],
// 	}
//
// 	const action = removeTodolistAC(toDoListsID2)
// 	const endState = taskReducer(startState, action)
//
// 	const keys = Object.keys(endState);
// 	expect(keys.length).toBe(1)
// 	expect(endState[toDoListsID2]).not.toBeDefined();
// });