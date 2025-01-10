import { FormEvent, useEffect, useState } from "react";
import { API } from "../../libs/axios";
import { ITask } from "../../App";

type FormProps = {
  task?: ITask;
  closeModal: VoidFunction
  getAllTasks: VoidFunction
}

export function Form({task, closeModal, getAllTasks}: FormProps){

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [status, setStatus] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      title: newTitle,
      description: newDescription,
      status: status ?? 'pendente'
    };
    try {
      if(task){
        await API.put(`/tasks/${task.id}`, data);
      }else{
        await API.post('/tasks', data);
      }
      closeModal();
      clearData();
      getAllTasks()
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  const clearData = () => {
    setNewTitle('')
    setNewDescription('')
  }

  useEffect(() => { 
    if (task) { 
      setNewTitle(task.title); 
      setNewDescription(task.description); 
      setStatus(task.status)
    }
  }, [task]);
  return (
    <div className='w-[26rem] h-auto flex flex-col gap-4'>
      <div className='w-full flex justify-between text-black'>
        <span className='text-lg font-bold'>{task ? 'Editar tarefa' : 'Criar tarefa'}</span>
        <span className='cursor-pointer' title='Fechar' onClick={closeModal}>X</span>
      </div>
      <form className='flex flex-col justify-center gap-2' onSubmit={handleSubmit}>
        <div className='w-full text-black flex flex-col gap-1'>
          <label>Titulo </label>
          <input
            className='w-full bg-[#1a1a1a] text-gray-100 border border-gray-950 p-4 outline-none rounded'
            type='text' 
            placeholder='Escreva o titulo da tarefa'
            value={newTitle}
            onChange={(event) =>setNewTitle(event.target.value)}
          />
        </div>
        <div className='w-full text-black flex flex-col gap-1'>
          <label>Descrição </label>
          <input
            className='w-full bg-[#1a1a1a] text-gray-100 border border-gray-950 p-4 outline-none rounded'
            type='text' 
            placeholder='Escreva uma breve descrição'
            value={newDescription}
            onChange={(event) =>setNewDescription(event.target.value)}
          />
        </div>
        {task && (
          <div  className='w-full text-black flex flex-col gap-1'>
          <label>Status</label>
          <select 
            className='w-full bg-[#1a1a1a] text-gray-100 border border-gray-950 p-4 outline-none rounded' 
            value={status} 
            onChange={(event) => setStatus(event.target.value)} > 
            <option value="pendente">Pendente</option> 
            <option value="concluido">Concluído</option> 
          </select>
        </div>
        )}
        <button className='mt-4' type='submit'>{task ? 'Salvar' : 'Criar'}</button>
      </form>
    </div>
  )
}