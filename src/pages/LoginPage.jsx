
import { Box, Stack, Text, Heading, useToast, FormControl, FormLabel, Input, Button, Icon, Divider } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const DEMO_USER = {
	email: "admin@demo.com",
	password: "123456",
};

const LoginPage = () => {
	useEffect(() => {
		console.log("[LoginPage] MONTADO");
		return () => {
			console.log("[LoginPage] DESMONTADO");
		};
	}, []);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (email === DEMO_USER.email && password === DEMO_USER.password) {
			localStorage.setItem("session", JSON.stringify({ email }));
			toast({
				title: "¡Bienvenido!",
				description: "Acceso correcto.",
				status: "success",
				duration: 2000,
				isClosable: true,
			});
			setTimeout(() => navigate("/"), 800);
		} else {
			toast({
				title: "Credenciales incorrectas",
				description: "Verifica tu email y contraseña.",
				status: "error",
				duration: 2500,
				isClosable: true,
			});
		}
		setLoading(false);
	};


	// Animaciones y colores
	const MotionBox = useMemo(() => motion(Box), []);
	const gradientBg = "linear-gradient(135deg, #0B1120 0%, #1E3A8A 100%)";
	const motionBoxWidth = useMemo(() => ({ base: "90%", sm: "400px" }), []);
	const handleEmail = (e) => {
		setEmail(e.target.value);
		console.log("[LoginPage] CAMBIO EMAIL", e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
		console.log("[LoginPage] CAMBIO PASSWORD", e.target.value);
	};

	return (
		<Box minH="100vh" w="100vw" bg={gradientBg} display="flex" alignItems="center" justifyContent="center" px={4}>
			<MotionBox
				w={motionBoxWidth}
				bg="white"
				borderRadius="16px"
				boxShadow="0 20px 40px rgba(0,0,0,0.15)"
				p={10}
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.4, ease: "easeOut" }}
				zIndex={1}
			>
				<Box display="flex" flexDir="column" alignItems="center" mb={8}>
					<Icon as={FiUser} color="primary.main" boxSize={12} mb={2} />
					<Heading fontSize="28px" fontWeight={700} color="text.main" textAlign="center">
						Inventario & Ventas
					</Heading>
					<Text fontSize="14px" color="text.secondary" textAlign="center" mt={1}>
						Acceso Demo 
					</Text>
				</Box>
				<form onSubmit={handleSubmit}>
					<Stack spacing={6}>
						<FormControl isRequired>
							<FormLabel fontWeight={600} color="text.main">Email</FormLabel>
								<Input
									type="email"
									value={email}
									onChange={handleEmail}
									placeholder="admin@demo.com"
									autoComplete="username"
									size="lg"
									borderRadius="8px"
									border="1px solid"
									borderColor="border"
									minH="44px"
									fontWeight={500}
									_focus={{ borderColor: "primary.main", boxShadow: "0 0 0 2px #2563EB33" }}
									_hover={{ borderColor: "primary.main" }}
									transition="all 0.2s"
								/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel fontWeight={600} color="text.main">Contraseña</FormLabel>
								<Input
									type="password"
									value={password}
									onChange={handlePassword}
									placeholder="123456"
									autoComplete="current-password"
									size="lg"
									borderRadius="8px"
									border="1px solid"
									borderColor="border"
									minH="44px"
									fontWeight={500}
									_focus={{ borderColor: "primary.main", boxShadow: "0 0 0 2px #2563EB33" }}
									_hover={{ borderColor: "primary.main" }}
									transition="all 0.2s"
								/>
						</FormControl>
						<Button
							type="submit"
							bg="primary.main"
							color="white"
							borderRadius="10px"
							fontWeight={700}
							size="lg"
							minH="44px"
							_hover={{ bg: "primary.hover", transform: "scale(1.02)", transition: "all 0.2s ease" }}
							isLoading={loading}
							transition="all 0.2s"
							boxShadow="sm"
						>
							Ingresar
						</Button>
					</Stack>
				</form>
				<Text color="text.secondary" fontSize="sm" textAlign="center" mt={8}>
					<b>Demo:</b> admin@demo.com / 123456
				</Text>
			</MotionBox>
		</Box>
	);
};

export default LoginPage;
