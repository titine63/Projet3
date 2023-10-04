import * as yup from "yup";

export const schema = yup
  .object({
    pseudo: yup.string().required("Ce champ est obligatoire."),
    email: yup
      .string()
      .required("Ce champ est obligatoire.")
      .email("L'email est incorrect."),
    password: yup
      .string()
      .min(8, "Au minimum au moins 8 caractères.")
      .required("Ce champ est obligatoire."),
    confirmpassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Les mots de passe ne correspondent pas.",
      )
      .required("Ce champ est obligatoire."),
  })
  .required();
