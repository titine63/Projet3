// const.ts
import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("Ce champ est obligatoire.")
      .email("L'email est incorrect."),
    password: yup
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
      .required("Ce champ est obligatoire."),
  })
  .required();

export const registerSchema = yup
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
      .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas.")
      .required("Ce champ est obligatoire."),
  })
  .required();

export const productFormSchema = yup
  .object()
  .shape({
    title: yup
      .string()
      .max(20, "Maximum 20 caractères")
      .required("Le titre est obligatoire"),

    description: yup.string().required("ce champ est obligatoire"),

    price: yup
      .number()
      .typeError("Le prix est obligatoire")
      .required("Le prix est obligatoire")
      .positive("Le prix ne peut pas être négatif ou null.")
      .test(
        "maxDecimalPlaces",
        "Le prix peut avoir au plus 2 décimales",
        (value) => {
          const decimalCount = (value.toString().split(".")[1] || "").length;
          return decimalCount <= 2;
        },
      ),

    size: yup
      .string()
      .oneOf(["XS", "S", "M", "L", "XL", "XXL", "XXXL"], "Taille non valide.")
      .required("La taille est obligatoire"),

    clothing_type: yup.string().required("Le type de vêtement est obligatoire"),
    category: yup
      .string()
      .oneOf(["Homme", "Femme", "Enfant"], "Catégorie non valide.")
      .required("La catégorie est obligatoire"),
  })
  .required();
