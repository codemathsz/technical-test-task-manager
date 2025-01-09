interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}
export function NewTaskModal({ isOpen, children }: ModalProps){
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10">
        {children}
      </div>
    </div>
  );
}
