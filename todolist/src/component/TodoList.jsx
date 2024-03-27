import '../css/TodoList.css';
import TodoItem from './TodoItem';

const TodoList = () => {

    return (
        <div className='todoList'>
            <h4>Todo List 🌱</h4>
            <input className="searchbar" placeholder='검색어를 입력하세요.' />
            <div className='list_wrapper'>
                <TodoItem />
                <TodoItem />
                <TodoItem />
            </div>
        </div>

    );
};
export default TodoList;