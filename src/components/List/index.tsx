import { ITask } from "../../App";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { API } from "../../libs/axios";
import { NewTaskModal } from "../NewTaskModal";
import { Form } from "../Form";
import { useState } from "react";

type ListProps = {
  tasks: ITask[]
  getAllTask: VoidFunction
}

export function List({ tasks, getAllTask }:ListProps){
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [task, setTask] = useState<ITask>()
  const openModal = (task: ITask) => {
    setTask(task)
    setIsOpenModal(true)
  };
  const closeModal = () => setIsOpenModal(false);

  async function deleteTask(id: string) {
    await API.delete(`/tasks/${id}`)
    getAllTask()
  }

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
                        <p className="cursor-pointer" title="Editar" onClick={() => openModal(item)}><FaEdit/></p>
                        <p className="cursor-pointer" title="Excluir" onClick={() => deleteTask(item.id)}><MdDelete/></p>
                      </li>
                    </div>
                    
                  );
              })
          )
        }
      </div>
      <NewTaskModal isOpen={isOpenModal}>
        <Form closeModal={closeModal} getAllTasks={getAllTask} task={task} />
      </NewTaskModal>
    </ul>
  )
}