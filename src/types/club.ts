export type Club = {
  id: number;
  name: string;
  players: Player[];
};

export type Player = {
  id: number;
  fullName: string;
  isAcademy: boolean | null;
  isRetired: boolean | null;
  creationRating: number;
  imageUrls: {
    player: string;
  };
};

export type ClubResponse = {
  club: Club;
};
