import { Box, Progress, Text, VStack } from "@chakra-ui/react";

interface StatCardProps {
  title: string;
  value: number;
  max: number;
}

const StatCard = ({ title, value, max }: StatCardProps) => {
  // Calcula el porcentaje para la barra de progreso
  const percentage = (value / max) * 100;

  return (
    <Box
      p="4"
      bgGradient="linear(to-r, teal.500, green.500)"
      borderRadius="lg"
      color="white"
      boxShadow="md"
      minWidth="200px"
    >
      <VStack>
        <Text fontSize="xl" fontWeight="bold">
          {value}
        </Text>
        <Text fontSize="md">{title.toUpperCase()}</Text>
        <Progress
          value={percentage}
          size="xs"
          colorScheme="pink"
          width="100%"
        />
      </VStack>
    </Box>
  );
};

export default StatCard;
