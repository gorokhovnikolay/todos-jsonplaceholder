import { useEffect, useState } from 'react';
import styles from './app.module.css';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((resTodos) => setTodos(resTodos))
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(true));
	}, []);

	return (
		<div className={styles.app}>
			<h2>Список дел:</h2>
			<div className={styles.add_todos}>
				<form>
					<div className={styles.add_todo__bock}>
						<input className={styles.add_todo__input} type="text" />
						<button className={styles.add_todo__button} type="submit">
							Добавить
						</button>
					</div>
				</form>
			</div>
			<div className={styles.container_todos}>
				{isLoading ? (
					todos.map(({ id, title, completed }) => {
						return (
							<div className={styles.container_todo} key={id}>
								<input
									className={styles.todo_checkbox}
									type="checkbox"
									defaultChecked={completed}
								/>
								<span
									className={
										completed
											? styles.todo_title__checked
											: styles.todo_title
									}
								>
									{title}
								</span>
							</div>
						);
					})
				) : (
					<div className={styles.isLoading}></div>
				)}
			</div>
		</div>
	);
};
