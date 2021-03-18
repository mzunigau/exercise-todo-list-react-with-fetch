import React, { useState, useEffect } from "react";

export function TodoList() {
	//para tareas individuales
	const [task, setTask] = useState();

	//para flag
	const [flag, setFlag] = useState();

	//almacenar grupos de tareas
	const [todoList, setTodoList] = useState([]);

	const handleChange = () => {
		if (todoList != "null") {
			setTodoList(newTask => [...newTask, { label: task, done: false }]);
			setTask("");
			update(todoList);
		}
	};

	const deleteTask = id => {
		todoList.splice(id, 1);
		setTodoList([...todoList]);
	};

	//Init
	useEffect(() => {
		create();
		getData();
	}, []);

	//Services
	//show
	const getData = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/mzuniga103", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			}
		})
			.then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
				setTodoList(todoList.concat(myJson));
			});
	};
	//Create User
	const create = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/mzuniga103", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		});
	};
	// Update users tasks
	const update = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/mzuniga103", {
			method: "PUT",
			body: JSON.stringify(todoList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				setTodoList(data);
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};

	//Delete
	const deleteT = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/mzuniga103", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		});
	};

	return (
		<div className="col d-flex justify-content-center todo">
			<div className="card  text-center" style={{ width: "18rem" }}>
				<div className="card-header"> TodoList </div>

				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						{" "}
						<input
							className="taskbox"
							placeholder="Escribe tus tareas"
							onKeyPress={e =>
								e.key === "Enter" ? handleChange() : ""
							}
							onChange={e => setTask(e.target.value)}
							value={task}
						/>
					</li>

					{todoList.map((result, i) => (
						<li className="list-group-item" key={i}>
							{result.label}{" "}
							<span>
								{result.done ? "Terminada" : "Sin terminar"}
							</span>
						</li>
					))}

					<li className="list-group-item">
						Tareas {todoList.length}
					</li>
				</ul>
			</div>
		</div>
	);
}
