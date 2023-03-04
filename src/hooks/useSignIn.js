import { getUserDevices, getWeatherData } from "@api";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "@lib/axios";
import { queryClient } from "@lib/react-query";
import { userSchema } from "@lib/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useGlobalContext } from "./useGlobalContext";

export const useSignIn = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { setUserId } = useGlobalContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    try {
      const res = await axiosInstance.post("auth/login", data);
      console.log(res);
      const { token, user } = res.data;
      const userId = user._id;
      const userCity = user.userAddress.city;

      queryClient.setQueryData("user", user);

      queryClient.prefetchQuery(["weather", userCity], () =>
        getWeatherData(userCity),
      );
      queryClient.prefetchQuery(["useDevices"], () => getUserDevices(userId));

      setUserId(userId);
      setToken(token);

      navigate("/");
    } catch (error) {
      setError("Email e/ou senha incorretos");
    }
  };

  return {
    error,
    errors,
    handleLogin,
    handleSubmit,
    register,
  }
}
