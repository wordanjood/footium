import { gql } from "@apollo/client";

export const GET_CLUB_BY_ID = gql`
  query ($where: ClubWhereUniqueInput!, $playerWhere: PlayerWhereInput) {
    club(where: $where) {
      id
      name
      players(where: $playerWhere) {
        id
        fullName
        potential
        isAcademy
        isRetired
        creationRating
        imageUrls {
          player
        }
      }
    }
  }
`;
