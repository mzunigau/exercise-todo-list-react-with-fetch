import React, { useState, useEffect } from "react";

export function TodoList() {
	//para tareas individuales
	const [task, setTask] = useState();
	//para flag
	const [flag, setFlag] = useState();
	//usuario
	const [user, setUser] = useState();
	// URL EndPoint
	const [url, setURL] = useState("");

	//almacenar grupos de tareas
	const [todoList, setTodoList] = useState([]);

	const handleChange = e => {
		setTask(e.target.value);
		setTodoList(newTask => [...newTask, { label: task, done: false }]);
		console.log(todoList);
		setTask("");
		update();
		//getData();
	};

	const handleUser = e => {
		setUser(e.target.value);
		setURL(`https://assets.breatheco.de/apis/fake/todos/user/${user}`);
		create();
		//getData();
	};

	const deleteTask = id => {
		todoList.splice(id, 1);
		setTodoList([todoList]);
		update();
		if (flag) {
			getData();
		}
	};

	//Init
	useEffect(() => {
		getData();
	}, []);

	//Services
	//show
	const getData = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/marco106", {
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
				setTodoList(myJson);
			});
	};
	//Create User
	const create = () => {
		fetch(url, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		});
	};
	// Update users tasks
	const update = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/marco106", {
			method: "PUT",
			body: JSON.stringify(todoList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				console.log(data);
				setFlag(true);
			})
			.catch(error => {
				console.log(error);
			});
	};

	//Delete
	const deleteT = () => {
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		});
	};

	return (
		<div className="col d-flex justify-content-center todo">
			<div className="card  text-center" style={{ width: "18rem" }}>
				<div className="card-header">
					{" "}
					<h1>TodoList</h1>{" "}
					<input
						className="form-control "
						placeholder="Seleccionar usuario"
						onKeyPress={e =>
							e.key === "Enter" ? handleUser(e) : ""
						}
						onChange={e => setUser(e.target.value)}
						value={user}
					/>
					<button
						type="button"
						onClick={() => deleteT()}
						className="btn btn-danger mt-3">
						Eliminar Listado
					</button>{" "}
					<button
						type="button"
						onClick={() => getData()}
						className="btn btn-success mt-3">
						Refresh
					</button>{" "}
				</div>

				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						{" "}
						<input
							className="taskbox form-control"
							placeholder="Escribe tus tareas"
							onKeyPress={e =>
								e.key === "Enter" ? handleChange(e) : ""
							}
							onChange={e => setTask(e.target.value)}
							value={task}
						/>
					</li>

					{todoList.map((result, i) => (
						<li className="list-group-item task" key={i}>
							<div className="container">
								<div className="row">
									<div
										className="col"
										onClick={() => deleteTask(result.id)}>
										&#10003;
										{result.label}
									</div>
									<div
										className="close col col-lg-1"
										onClick={() => deleteTask(result.id)}>
										&times;
									</div>
								</div>
							</div>
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
