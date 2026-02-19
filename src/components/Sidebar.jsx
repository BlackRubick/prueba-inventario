import {
  Box,
  Flex,
  IconButton,
  Text,
  VStack,
  useBreakpointValue,
  Button
} from "@chakra-ui/react";
import { FiHome, FiBox, FiShoppingCart, FiLogOut, FiChevronLeft } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const links = [
  { label: "Dashboard", icon: FiHome, to: "/" },
  { label: "Inventario", icon: FiBox, to: "/inventario" },
  { label: "Ventas", icon: FiShoppingCart, to: "/ventas" },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [collapsing, setCollapsing] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const sidebarBg = "bg.sidebar";

  const handleLogout = () => {
    localStorage.removeItem("session");
    navigate("/login");
  };

  return (
    <Box
      as="aside"
      bg={sidebarBg}
      color="white"
      w={isOpen ? { base: "220px", md: "220px" } : { base: 0, md: "64px" }}
      minW={isOpen ? { base: "220px", md: "220px" } : { base: 0, md: "64px" }}
      transition="all 0.3s"
      h="100vh"
      position="fixed"
      left={0}
      top={0}
      zIndex={20}
      boxShadow="md"
      overflowX="hidden"
      borderRight="1px solid"
      borderColor="border"
    >
      <Flex align="center" justify="space-between" px={4} py={4}>
        <Text fontWeight={700} fontSize="lg" display={isOpen ? "block" : "none"}>
          Menú
        </Text>
        {isOpen && (
          <IconButton
            icon={<FiChevronLeft />}
            aria-label="Colapsar sidebar"
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={() => {
              setCollapsing(true);
              setTimeout(() => {
                setCollapsing(false);
                onClose();
              }, 200);
            }}
            size="sm"
          />
        )}
      </Flex>
      <VStack align="stretch" spacing={1} mt={2}>
        {links.map((link) => (
          <NavLink
            to={link.to}
            key={link.to}
            style={({ isActive }) => ({
              textDecoration: "none",
            })}
          >
            {({ isActive }) => (
              <Flex
                align="center"
                px={isOpen ? 4 : 2}
                py={3}
                borderRadius="md"
                cursor="pointer"
                bg={isActive ? "primary.main" : "transparent"}
                color={isActive ? "white" : "gray.200"}
                fontWeight={isActive ? 700 : 500}
                _hover={{
                  bg: isActive ? "primary.hover" : "whiteAlpha.200",
                  transform: "scale(1.02)",
                  boxShadow: "md",
                }}
                transition="all 0.2s"
                gap={3}
              >
                <Box as={link.icon} fontSize="xl" />
                {isOpen && <Text>{link.label}</Text>}
              </Flex>
            )}
          </NavLink>
        ))}
      </VStack>
      <Flex mt="auto" px={isOpen ? 4 : 2} py={4}>
        <Button
          leftIcon={<FiLogOut />}
          colorScheme="red"
          variant="solid"
          w="full"
          size={isOpen ? "md" : "sm"}
          fontWeight={700}
          fontSize={isOpen ? "md" : "sm"}
          onClick={handleLogout}
          borderRadius="md"
          boxShadow="0 2px 8px rgba(220,38,38,0.10)"
        >
          {isOpen ? "Cerrar sesión" : null}
        </Button>
      </Flex>
    </Box>
  );
};

export default Sidebar;
