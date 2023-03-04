import { VIACEP_URL } from "@config";
import { validatorRegex } from "@lib/yup";
import axios from "axios";

export const getAddressInfoFromZip = async (e, setValue) => {
  const zipCode = e.target.value;
  const isValidZip = validatorRegex.zipCode.test(zipCode);
  if (isValidZip) {
    const numbersOnlyZip = zipCode.replace(/\D/g, "");
    const { data } = await axios.get(
      `${VIACEP_URL}/ws/${numbersOnlyZip}/json/`,
    );
    const { bairro, localidade, logradouro, uf } = data;
    setValue("address.neighborhood", bairro);
    setValue("address.city", localidade);
    setValue("address.street", logradouro);
    setValue("address.state", uf);
  }
}