import { useEffect, useState } from 'react';
import { Header } from './components/Header'
import { List } from './components/List';
import { NewTaskModal } from './components/NewTaskModal';
import { API } from './libs/axios';
import { Form } from './components/Form';

export interface ITask{
  id: string
  title: string
  description: string
  status: 'pendente' | 'concluido'
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  async function getAllTasks() {
    const result = await API.get('/tasks')
    setTasks(result.data)
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
        <button type='button' onClick={openModal}>Criar nova Tarefa</button>
        <List tasks={tasks} getAllTask={getAllTasks}/>
        <NewTaskModal isOpen={isOpenModal}>
          <Form closeModal={closeModal} getAllTasks={getAllTasks} />
        </NewTaskModal>
      </div>
    </div>
  )
}

export default App
