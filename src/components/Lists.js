import React, { useState, useEffect } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { RiTodoLine } from 'react-icons/ri';
import { BsPlusSquareFill } from 'react-icons/bs';
import {MdOutlineUpdate} from 'react-icons/md'
import './Lists.css';
import { getAllTasks, addTask, updateTask, deleteTask } from '../services/apiService';


const Lists = () => {

 // state Variables
  const [state, setState] = useState([]);
  const [text, setText] = useState('');
  const [editIndex, setEditIndex] = useState(-1);


  useEffect(() => {
    async function fetchTasks() {
      try {
        const tasks = await getAllTasks();
        setState(tasks);
      } catch (error) {
        console.error("Error displaying tasks");
      }
    }
    fetchTasks();
  }, []);


  //For cutting the tasks temporarily that are completed
  const handleCheckboxChange = async (index) => {
    try {
      const updatedTask = { ...state[index], checked: !state[index].checked };
      await updateTask(state[index].id, updatedTask);
      setState((prevState) =>
        prevState.map((item, i) => (i === index ? updatedTask : item))
      );
    } catch (error) {
      console.error('Error updating the task checked status:', error);
    }
    
  };

  // Delete task from the list
  const handleDelete = async (index) => {
    try {
      const taskId = state[index].id; // Assuming the backend provides the ID for each task
      await deleteTask(taskId);
      setState((prevState) => prevState.filter((item, i) => i !== index));
    } catch (error) {
      console.error("Error deleting a note", error);
      
    }
  };

  //Add a note to the database
  const handleAdd = async () => {
        try {
          const newTask = {tasks: text, checked: false };
          // console.log(newTask);
          const addedTask = await addTask(newTask);
          // console.log(addedTask);
          setState((prevState) => [...prevState, addedTask]);
          setText('');
        } catch (error) {
          console.error("Error adding the note", error);
    }
  };

  //for input text 
  const handleChange = (event) => {
    let newText = event.target.value;
    // console.log(newText);
    setText(newText);
  };

  // for editing the note
  const handleEdit = (index) => {
    setEditIndex(index); // Set the index of the task being edited
    setText(state[index].tasks); // Set the input field with the text of the task being edited
  };

  // for replacing the current note with the updated note
  const handleUpdate = async () => {
    if (text && editIndex !== -1) {
      try {
        const taskId = state[editIndex].id; // Assuming the backend provides the ID for each task
        const updatedTask = { ...state[editIndex], tasks: text, checked: state[editIndex].checked};
        await updateTask(taskId, updatedTask);
        setState((prevState) =>
          prevState.map((item, i) => (i === editIndex ? updatedTask : item))
        );
        setEditIndex(-1);
        setText('');
      } catch (error) {
        console.error("Error Updating the task", error);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="heading mb-5 p-5">
        <h1 className="text-5xl font-semibold my-6 font-sans">
          Manage Daily Your Tasks
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-start">
          <div className="flex flex-col justify-center items-start lists py-2">
            {state.map((el, i) => (
              <div key={i} className="flex justify-center items-center mx-5">
                <label className="inline-flex items-center">
                  <input 
                    type="checkbox"
                    checked={el.checked}
                    onChange={() => handleCheckboxChange(i)}
                    className="form-checkbox h-5 w-5 mx-3 border-gray-300 rounded cursor-pointer"
                  />
                </label>
                <div className="flex items-center bg-gray-200 py-6 my-2 rounded-lg shadow-md text-2xl font-semibold">
                  <span className="float-left items-center mx-3 cursor-pointer">
                    <RiTodoLine fontSize={'3rem'} className="float-left" />
                  </span>
                  <span className={`text-orange-500 mx-8 ${el.checked ? 'line-through' : ''}`}>
                    {el.tasks}
                  </span>
                  <span className="float-right mx-2">
                    {editIndex === i ? (
                      <MdOutlineUpdate fontSize={'2rem'} className="inline mx-3 my-2 !text-yellow-500 cursor-pointer" onClick={handleUpdate}/>
                    ) : (
                      <FaPen className="inline mx-3 my-2 text-blue-500 cursor-pointer" onClick={() => handleEdit(i)}/>
                    )}
                    <FaTrash className="inline mx-3 my-2 text-red-500 cursor-pointer" onClick={() => handleDelete(i)}/>
                  </span>
                </div>
              </div>
            ))}
            <div className="flex flex-col justify-center ms-5 py-5 my-7">
              <input
                value={text}
                placeholder="Enter a Note"
                className=" flex rounded-lg py-6 px-10 justify-center  m-5 w-full "
                type="text"
                onChange={handleChange}
              />
              <button
                onClick={handleAdd}
                className="flex bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 mx-5 my-4 font-bold text-2xl justify-center items-center"
              >
                <i className="flex items-center justify-center ml-auto">
                  Add a Note
                </i>
                <span className="ml-auto">
                  <BsPlusSquareFill className="text-4xl ms-3 my-2 float-right" fontSize={'1.5rem'}/>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Lists;


