import { FormEvent } from 'react';
import { Header } from './components/Header'

export interface ITask{
  id: string
  title: string
  description: string
  status: 'pendente' | 'concluido'
}

function App() {

  function handleSubmit(event: FormEvent){
    event.preventDefault();
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
          />
          <button type='submit'>Criar</button>
        </form>
      </div>
    </div>
  )
}

export default App
