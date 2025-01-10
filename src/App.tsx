import { FormEvent, useEffect, useState } from 'react';
import { Header } from './components/Header'
import { List } from './components/List';
import { NewTaskModal } from './components/NewTaskModal';
import { API } from './libs/axios';

export interface ITask{
  id: string
  title: string
  description: string
  status: 'pendente' | 'concluido'
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const [isOpenModal, setIsOpenModal] = useState(false);

  async function getAllTasks() {
    const result = await API.get('/tasks')
    setTasks(result.data)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      title: newTitle,
      description: newDescription,
      status: 'pendente'
    };
    try {
      await API.post('/tasks', data);
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

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  useEffect(() =>{
    getAllTasks();
  }, [])
  return (
    <div>
      <Header />
      <div className='w-full py-4 flex gap-8 flex-col items-center mt-6'>
        <NewTaskModal isOpen={isOpenModal}>
          <div className='w-[26rem] h-auto flex flex-col gap-4'>
            <div className='w-full flex justify-between text-black'>
              <span className='text-lg font-bold'>Criar tarefa</span>
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
              <button className='mt-4' type='submit'>Criar</button>
            </form>
          </div>
        </NewTaskModal>
        <button type='button' onClick={openModal}>Criar nova Tarefa</button>

        <List tasks={tasks} getAllTask={getAllTasks}/>
      </div>
    </div>
  )
}

export default App
