
import { Box, useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AppLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

	return (
		<Box minH="100vh" bg="bg.main">
			<Sidebar isOpen={isOpen} onClose={onClose} />
			<Box ml={{ base: 0, md: isOpen ? "220px" : "64px" }} transition="all 0.3s">
				<Navbar onOpenSidebar={onOpen} />
				<Box as="main" px={{ base: 2, md: 8 }} py={6} minH="calc(100vh - 60px)">
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default AppLayout;
