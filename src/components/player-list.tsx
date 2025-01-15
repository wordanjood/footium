import { orderByOptions } from "@/constants/player-list";
import { Player } from "@/types/club";
import { SortByType } from "@/types/player-list";
import { sortPlayers } from "@/utils/players";
import { Box, Fade, FormLabel, Select, Switch, Text } from "@chakra-ui/react";
import { v4 } from "uuid";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

interface Props {
  players: Player[];
  isRetired: Player["isRetired"];
  handleRetiredFilter: () => void;
  isAcademy: Player["isAcademy"];
  handleAcademyFilter: () => void;
  loading: boolean;
}

const uuid = v4();

const PlayerList = ({
  players,
  isRetired,
  handleRetiredFilter,
  isAcademy,
  handleAcademyFilter,
  loading = false,
}: Props) => {
  const [orderBy, setOrderBy] = useState<SortByType>();

  const handleOrderBy = (value: ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(value.target.value as SortByType);
  };

  return (
    <Fade in>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap="20px"
        minHeight="500px"
      >
        <Box
          display="flex"
          gap="14px"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap="10px">
            <Box display="flex" alignItems="center">
              <FormLabel mb="0">Retired:</FormLabel>
              <Switch
                size="lg"
                isChecked={!!isRetired}
                onChange={handleRetiredFilter}
              />
            </Box>
            <Box display="flex" alignItems="center">
              <FormLabel mb="0">Academy:</FormLabel>
              <Switch
                size="lg"
                isChecked={!!isAcademy}
                onChange={handleAcademyFilter}
              />
            </Box>
          </Box>
          <Select
            placeholder="Filter by"
            onChange={(value) => handleOrderBy(value)}
            width="160px"
          >
            {orderByOptions.map(({ value, label }, index) => (
              <option key={`${index}-${uuid}`} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          height="500px"
          overflow="hidden"
          overflowY="scroll"
          width={{ base: "100%", sm: "500px" }}
          border="1px solid rgba(255, 255, 255, 0.4)"
          borderRadius="6px"
          bg="rgba(39, 39, 39, 0.6)"
        >
          {!loading && players.length > 0 ? (
            sortPlayers(players, orderBy).map((player) => (
              <Box
                key={`${player.id}-${uuid}`}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                height="64px"
                width="100%"
                padding="3px 40px"
                borderBottom="1px solid gray"
                bg="#1e1e1e"
                cursor="pointer"
                _hover={{
                  bg: "#272727",
                }}
              >
                <Text>{player.fullName}</Text>
                <Box display="flex" alignItems="center" gap="14px">
                  <Text color="gold">{player.creationRating}</Text>
                  <Image
                    src={player.imageUrls.player}
                    height={40}
                    width={40}
                    alt={player.fullName}
                  />
                </Box>
              </Box>
            ))
          ) : (
            <Text display="flex" alignItems="center" height="100%">
              No players found
            </Text>
          )}
          {loading ? <Text>Loading...</Text> : undefined}
        </Box>
      </Box>
    </Fade>
  );
};

export default PlayerList;
