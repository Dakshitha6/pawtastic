export const DogBreeds = {
  LABRADOR: "Labrador Retriever",
  GERMAN_SHEPHERD: "German Shepherd",
  GOLDEN_RETRIEVER: "Golden Retriever",
  BULLDOG: "Bulldog",
  BEAGLE: "Beagle",
  POODLE: "Poodle",
  ROTTWEILER: "Rottweiler",
  YORKSHIRE_TERRIER: "Yorkshire Terrier",
  BOXER: "Boxer",
  DACHSHUND: "Dachshund",
  SIBERIAN_HUSKY: "Siberian Husky",
  DOBERMAN: "Doberman",
  SHIH_TZU: "Shih Tzu",
  GREAT_DANE: "Great Dane",
  CHIHUAHUA: "Chihuahua",
  POMERANIAN: "Pomeranian",
  BORDER_COLLIE: "Border Collie",
  AKITA: "Akita",
  MALTESE: "Maltese",
  CAVALIER_KING_CHARLES: "Cavalier King Charles Spaniel",
} as const;

export type DogBreedKey = keyof typeof DogBreeds;
export type DogBreedValue = (typeof DogBreeds)[DogBreedKey];

export const THEME_COLORS = {
  offWhite: "#FAF9F9",
  warmGray: "#B4AEA6",
  darkGray: "#161415",
  mutedBrown: "#534544",
  warmYellow: "#F4AF22",
  orangeRed: "#DB471B",
  brightBlue: "#159DF7",
  teal: "#2D826D",
};
