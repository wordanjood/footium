const SortBy = {
  aToZ: "A-Z",
  zToA: "Z-A",
  ratingHigh: "Highest rated",
  ratingLow: "Lowest rated",
} as const;

export type SortByType = keyof typeof SortBy;
