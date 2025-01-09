import { ITask } from "../../App";

type ListProps = {
  tasks: ITask[]
}

export function List({ tasks }:ListProps){
  
  return (
    <ul className="w-[60rem] flex justify-between items-center gap-4">
      <div className="w-full flex flex-col border-t border-t-gray-950 rounded-lg pt-4 gap-4">
      <div className="w-full flex flex-row gap-4 bg-[#1a1a1a] rounded">
        <li className="w-full list-none p-4 rounded-lg cursor-pointer  font-bold ">
          <p>Nº</p>
        </li>
        <li className="w-full list-none p-4 rounded-lg cursor-pointer  font-bold ">
          <p>Titulo</p>
        </li>
        <li className="w-full list-none p-4 rounded-lg cursor-pointer  font-bold ">
          <p>Descrição</p>
        </li>
        <li className="w-full list-none p-4 rounded-lg cursor-pointer  font-bold ">
          <p>Status</p>
        </li>
        <li className="w-full list-none p-4 rounded-lg cursor-pointer  font-bold ">
          <p>Ações</p>
        </li>
      </div>
        {
          tasks.length <= 0 ?(
            <div className="w-full flex flex-col items-center justify-center py-16 px-6 text-gray-300 gap-2">
              <p className="text-sm font-bold">Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          ):(
              tasks.map((item, index) =>{
                  return (
                    <div key={index} className="w-full flex flex-row gap-4 bg-[#1a1a1a] rounded">
                      <li className="w-full list-none p-4 rounded-lg cursor-pointer  font-bold ">
                        <p>{index+1}</p>
                      </li>
                      <li className="w-full list-none p-4 rounded-lg cursor-pointer  font-bold ">
                        <p>{item.title}</p>
                      </li>
                      <li className="w-full list-none p-4 rounded-lg cursor-pointer  font-bold ">
                        <p>{item.description}</p>
                      </li>
                      <li className="w-full list-none p-4 rounded-lg cursor-pointer  font-bold ">
                        <p>{item.status}</p>
                      </li>
                      <li className="w-full list-none p-4 rounded-lg cursor-pointer flex flex-row gap-4 font-bold ">
                        <p>X</p>
                        <p>I</p>
                      </li>
                    </div>
                  );
              })
          )
        }
      </div>
    </ul>
  )
}