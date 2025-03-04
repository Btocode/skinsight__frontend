import { Complexion, Gender } from "@/types/products";

const genders = ["Male", "Female", "I do prefer not to say"] as Gender[];

const skinTypes = ["Normal", "Oily", "Dry", "Combination", "Not sure"] as const;

const complexionOptions: Complexion[] = [
  {
    title: "Pale",
    description:
      "The fairest of them all! Often delicate and prone to sunburn.",
    icon: "/icons/pale.png",
  },
  {
    title: "Light",
    description:
      "A natural brightness — usually burns but with some luck it can tan.",
    icon: "/icons/light.png",
  },
  {
    title: "Medium",
    description:
      "Burns sometimes, tans uniformly, carries the warmth of golden sunsets.",
    icon: "/icons/medium.png",
  },
  {
    title: "Deep",
    description:
      "Rich and dark skin tones that radiate depth. Burns rarely, tans very easily.",
    icon: "/icons/deep.png",
  },
  {
    title: "Dark",
    description: "The deepest, most vibrant tones. Never burns!",
    icon: "/icons/dark.png",
  },
];

const skinConcerns = [
  ["Acne", "blemishes"],
  ["Wrinkles", "aging"],
  ["Scars", "pigmentation"],
  ["Hydrate", "moisturise"],
  ["Sensitive", "skin"],
  ["Pores", "dullness"],
] as const;

const ages = [
  "13-17",
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  ["54+ &", "fabulous"],
  "I'd prefer not to say",
];

export { genders, skinTypes, complexionOptions, skinConcerns, ages };
