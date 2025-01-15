import React, { useState } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_CLUB_BY_ID } from "@/services/queries/club";
import { ClubResponse } from "@/types/club";
import PlayerList from "./player-list";

const ClubLookUp = () => {
  const [inputValue, setInputValue] = useState<number>();
  const [clubId, setClubId] = useState<number | undefined>(undefined);
  const [isRetired, setIsRetired] = useState<boolean | null>(null);
  const [isAcademy, setIsAcademy] = useState<boolean | null>(null);

  /* With more time would move server side and add error handling */
  const { loading, data } = useQuery<ClubResponse>(GET_CLUB_BY_ID, {
    variables: {
      where: { id: clubId },
      playerWhere: {
        ...(isRetired ? { isRetired: { equals: isRetired } } : undefined),
        ...(isAcademy ? { isAcademy: { equals: isAcademy } } : undefined),
      },
    },
    skip: !clubId,
  });

  const club = data?.club;

  const resetClubId = () => {
    setClubId(undefined);
  };

  const handleAcademyFilter = () => {
    setIsAcademy((prev) => !prev);
  };

  const handleRetiredFilter = () => {
    setIsRetired((prev) => !prev);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setClubId(inputValue);
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column" gap="40px">
      {!club ? (
        <>
          <Text align="center">
            Welcome to Footium, please enter your unique Club ID to begin
          </Text>

          <Box
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            gap="10px"
            alignItems="center"
            justifyContent="center"
            height="48px"
            as="form"
            onSubmit={handleSubmit}
          >
            <Input
              placeholder="Enter Club ID"
              bg="gray.800"
              width="100%"
              minWidth="300px"
              minHeight="48px"
              onChange={handleInputChange}
            />
            <Button
              bg="linear-gradient(rgb(62, 77, 229) 0%, rgb(40, 53, 186) 100%)"
              color="gray.300"
              minHeight="48px"
              padding="0 24px"
              type="submit"
              width={{ base: "100%", sm: "auto" }}
              _hover={{
                bg: "linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), linear-gradient(rgb(62, 77, 229) 0%, rgb(40, 53, 186) 100%)",
              }}
            >
              SEARCH
            </Button>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          gap="14px"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontWeight="700" fontSize="20px">
            Club - {club.name.toUpperCase()}
          </Text>
          <Button bg="tomato" color="white" onClick={resetClubId}>
            X
          </Button>
        </Box>
      )}
      {club ? (
        <PlayerList
          players={club.players}
          isRetired={isRetired}
          isAcademy={isAcademy}
          handleRetiredFilter={handleRetiredFilter}
          handleAcademyFilter={handleAcademyFilter}
          loading={loading}
        />
      ) : undefined}
      {!club && !!clubId && !loading ? (
        <Text color="tomato">
          Club with entered ID cannot be found, please check and try again
        </Text>
      ) : undefined}
      {!!clubId && loading ? <Text>Scouting for club...</Text> : undefined}
    </Box>
  );
};

export default ClubLookUp;
