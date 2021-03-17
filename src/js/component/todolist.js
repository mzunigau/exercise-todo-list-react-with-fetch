import React, { useState, useEffect } from "react";

export function TodoList() {
	//para tareas individuales
	const [task, setTask] = useState();
	//almacenar grupos de tareas
	const [todoList, setTodoList] = useState([]);

	const handleChange = () => {
		if (todoList != "null") {
			setTodoList(newTask => [...newTask, { label: task, done: false }]);
			setTask("");
			update(todoList);
		}
	};

	const getData = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/mzuniga", {
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
	useEffect(() => {
		getData();
	}, []);

	const update = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/mzuniga", {
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
								e.key === "Enter" ? handleChange : ""
							}
							onChange={e => setTask(e.target.value)}
							value={task}
						/>
					</li>

					{todoList.map((result, i) => (
						<li className="list-group-item" key={i}>
							{result.label}
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
