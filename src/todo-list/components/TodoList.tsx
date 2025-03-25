import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import "../../App.css";

export interface Message {
  id: number;
  message: string;
}

interface Props {
  list: Message[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const TodoList = ({ list, onDelete, onEdit }: Props) => {
  if (list.length === 0) return;

  return (
    <div className="w-full bg-list pt-2 pb-2 mt-4 rounded-md drop-shadow-xl">
      <div className="w-[70%] mx-auto text-white">
        <div className="">
          {list.map((msg, index) => (
            <div key={msg.id} className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                {index + 1}
                {". "}
                {msg.message.trim()}
              </div>
              <div className="text-right">
                <button
                  className="cursor-pointer"
                  onClick={() => onEdit(msg.id)}
                >
                  <MdEdit />
                </button>
                <button
                  className="cursor-pointer ml-2"
                  onClick={() => onDelete(msg.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
