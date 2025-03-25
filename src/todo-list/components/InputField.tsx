import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

interface Props {
  onSubmit: (data: messageData) => void;
  editMessage?: { id: number; message: string } | null;
}

const schema = z.object({
  message: z.string().min(1, { message: "Flied should not empty." }),
});

type messageData = z.infer<typeof schema>;

const InputField = ({ onSubmit, editMessage }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<{ message: string }>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (editMessage) {
      setValue("message", editMessage.message);
    }
  }, [editMessage, setValue]);

  return (
    <form
      className="my-8"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <input
        {...register("message")}
        type="text"
        placeholder="Add Todo"
        className="p-2 rounded-md bg-white w-full drop-shadow-xl"
      />
      {errors.message && (
        <p className="text-red-500 text-sm">{errors.message.message}</p>
      )}
      <button
        type="submit"
        className="cursor-pointer rounded-md text-white px-4 py-1 bg-btn mt-5 drop-shadow-3xl"
      >
        {editMessage ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default InputField;
