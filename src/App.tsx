import { ChangeEvent, FormEvent, useState } from 'react';
import { Header } from './components/Header'
import { List } from './components/List';

export interface ITask{
  id: string
  title: string
  description: string
  status: 'pendente' | 'concluido'
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([{id: "1", description:"description test", title: "Teste", status: "pendente"},
    {id: "1", description:"description test", title: "Teste", status: "pendente"},
    {id: "1", description:"description test", title: "Teste", status: "pendente"},
    {id: "1", description:"description test", title: "Teste", status: "pendente"}]);
  const [newTask, setNewtask] = useState('');

  function handleSubmit(event: FormEvent){
    event.preventDefault();
    console.log(newTask);
  }

  return (
    <div>
      <Header />
      <div className='w-full py-4 flex gap-8 flex-col items-center mt-6'>
        <form className='flex justify-center gap-2' onSubmit={handleSubmit}>
          <input
            className='w-[40rem] bg-[#1a1a1a] text-gray-100 border border-gray-950 p-4 outline-none rounded'
            type='text' 
            placeholder='Adicione uma nova tarefa'
            value={newTask}
            onChange={(event) =>setNewtask(event.target.value)}
          />
          <button type='submit'>Criar</button>
        </form>

        <List tasks={tasks}/>
      </div>
    </div>
  )
}

export default App
