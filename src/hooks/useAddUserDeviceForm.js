import { yupResolver } from '@hookform/resolvers/yup';
import { newUserDeviceSchema } from '@lib/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAddUserDevice } from '@hooks';

export const useAddUserDeviceForm = ({ userId, setIsOpen }) => {
  const { register, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(newUserDeviceSchema),
  });

  const addUserDevice = useAddUserDevice();

  setValue("userId", userId);

  const handleLinkDevice = handleSubmit((data) => {
    toast.loading("Adicionando device");
    addUserDevice.mutate({ data, setIsOpen, reset, toast });
  });

  return { handleLinkDevice, register, setValue }
}
