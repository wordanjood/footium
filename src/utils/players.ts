import { Player } from "@/types/club";
import { SortByType } from "@/types/player-list";

/* Util function to handle order players are displayed */
export const sortPlayers = (players: Player[], sortOption?: SortByType) => {
  switch (sortOption) {
    case "aToZ":
      return [...players].sort((a, b) => a.fullName.localeCompare(b.fullName));
    case "zToA":
      return [...players].sort((a, b) => b.fullName.localeCompare(a.fullName));
    case "ratingLow":
      return [...players].sort((a, b) => a.creationRating - b.creationRating);
    case "ratingHigh":
      return [...players].sort((a, b) => b.creationRating - a.creationRating);
    default:
      return players;
  }
};
