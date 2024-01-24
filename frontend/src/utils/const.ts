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

    color: yup
      .string()
      .max(20, "Maximum 20 caractères")
      .optional(),

    state: yup
      .string()
      .max(20, "Maximum 20 caractères")
      .optional(),

    brand: yup.string().max(50, "Maximum 50 caractères").optional(),

    clothing_type: yup.string().required("Le type de vêtement est obligatoire"),

    category: yup
      .string()
      .max(10, "Maximum 10 caractères")
      .oneOf(["Homme", "Femme", "Enfant"], "Catégorie non valide.")
      .required("La catégorie est obligatoire"),
  })
  .required();

export const orderFormSchema = yup
  .object()
  .shape({
    address: yup
      .string()
      .max(255, "Maximum 255 caractères")
      .required("L'adresse est obligatoire"),

    city: yup
      .string()
      .max(255, "Maximum 255 caractères")
      .required("La ville est obligatoire"),

    postalCode: yup
      .string()
      .max(10, "Maximum 10 caractères")
      .required("Le code postal est obligatoire"),

    country: yup
      .string()
      .max(50, "Maximum 50 caractères")
      .required("Le pays est obligatoire"),

    firstname: yup
      .string()
      .max(255, "Maximum 255 caractères")
      .required("Le prénom est obligatoire"),

    lastname: yup
      .string()
      .max(255, "Maximum 255 caractères")
      .required("Le nom de famille est obligatoire"),

    paymentMethod: yup
      .string()
      .oneOf(["paypal", "stripe"], "Méthode de payment non valide.")
      .required("La méthode de payment est obligatoire."),

    shippingMethod: yup
      .string()
      .oneOf(["point-relais", "laposte"], "Méthode de livraison non valide.")
      .required("La méthode de livraison est obligatoire"),
  })
  .required();
