import { Flex, IconButton, Text, useBreakpointValue } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

const Navbar = ({ onOpenSidebar }) => {
  const showMenu = useBreakpointValue({ base: true, md: false });
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      px={4}
      py={3}
      bg="white"
      borderBottom="1px solid"
      borderColor="border"
      boxShadow="sm"
      zIndex={10}
      position="sticky"
      top={0}
      minH="60px"
    >
      {showMenu && (
        <IconButton
          icon={<FiMenu />}
          variant="ghost"
          aria-label="Abrir menú"
          onClick={onOpenSidebar}
          fontSize="2xl"
        />
      )}
      <Text fontWeight={700} color="primary.main" fontSize="xl">
        Inventario & Ventas
      </Text>
      <Flex minW="40px" />
    </Flex>
  );
};

export default Navbar;
