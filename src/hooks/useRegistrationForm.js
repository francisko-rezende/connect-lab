import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "@lib/axios";
import { formSchema } from "@lib/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useRegistrationForm = () => {
  const defaultValues = {
    address: {
      state: "RJ",
      city: "Rio de Janeiro",
      neighborhood: "Vale dos Puxadores de Ferro",
      number: 17,
      street: "Rua Felipe Franco",
      zipCode: "28495-000",
      complement: "",
    },
    phone: "(35) 9 9828-0000",
    photoUrl: "https://duck.com",
    fullName: "Léo Stronda",
    confirmPassword: "VemMonstro",
    password: "VemMonstro",
    email: "leo@stronda.com",
  }


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const navigate = useNavigate();
  const [registrationResult, setRegistrationResult] = useState("");

  const handleRegisterUser = async (data) => {
    try {
      await axiosInstance.post("/auth/register", data);
      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/login"), 3 * 1000);
    } catch (error) {
      if (error.response.status === 409) {
        setRegistrationResult("Usuário já registrado.");
        return;
      }
      setRegistrationResult("Houve um erro, tente novamente mais tarde");
    }
  };

  return {
    errors,
    handleRegisterUser,
    handleSubmit,
    register,
    registrationResult,
  }
}
