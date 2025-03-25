import { useState } from "react";
import "./App.css";
import TodoList, { Message } from "./todo-list/components/TodoList";
import InputField from "./todo-list/components/InputField";

const App = () => {
  const [msgList, setMsgList] = useState<Message[]>([]);

  const [editMessage, setEditMessage] = useState<{
    id: number;
    message: string;
  } | null>(null);

  const handleEdit = (id: number) => {
    const messageToEdit = msgList.find((msg) => msg.id === id);
    if (messageToEdit) {
      setEditMessage(messageToEdit);
    }
  };

  const handleUpdate = (data: { message: string }) => {
    if (editMessage) {
      setMsgList(
        msgList.map((msg) =>
          msg.id === editMessage.id ? { ...msg, message: data.message } : msg
        )
      );
      setEditMessage(null); // Reset editing state after update
    } else {
      setMsgList([...msgList, { ...data, id: msgList.length + 1 }]);
    }
  };

  return (
    <>
      <div className="bg-list h-[3rem] text-white text-2xl flex justify-center items-center">
        ToDo List
      </div>
      <div className="w-[100%] mx-auto mt-5">
        <div className="w-[60%] mx-auto">
          <div className="bg-offwhite w-full pt-2 pb-2 rounded-md drop-shadow-md">
            <div className="mt-2 w-[70%] mx-auto">
              <InputField
                onSubmit={
                  handleUpdate
                  // setMsgList([...msgList, {...data, id: msgList.length + 1}])
                }
                editMessage={editMessage}
              />
            </div>
          </div>
          <div className="">
            <div className="">
              <TodoList
                list={msgList}
                onEdit={handleEdit}
                onDelete={(id) => setMsgList(msgList.filter((m) => m.id != id))}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
