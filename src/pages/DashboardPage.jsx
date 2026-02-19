import { Box, SimpleGrid, Text, Stat, StatLabel, StatNumber, Icon, useColorModeValue, Flex } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { motion } from "framer-motion";
import { FiTrendingUp, FiDollarSign, FiShoppingCart, FiBox } from "react-icons/fi";

const stats = [
	{
		label: "Ventas del día",
		value: "$1,200",
		icon: FiTrendingUp,
		color: "primary.main",
	},
	{
		label: "Ganancia del día",
		value: "$350",
		icon: FiDollarSign,
		color: "success",
	},
	{
		label: "Total productos",
		value: "48",
		icon: FiBox,
		color: "primary.main",
	},
	{
		label: "Ventas mensuales",
		value: "$8,900",
		icon: FiShoppingCart,
		color: "info",
	},
];

const MotionBox = motion(Box);


// Datos demo para las gráficas
const ventasPorMes = [
	{ mes: "Ene", ventas: 1200 },
	{ mes: "Feb", ventas: 2100 },
	{ mes: "Mar", ventas: 800 },
	{ mes: "Abr", ventas: 1600 },
	{ mes: "May", ventas: 900 },
	{ mes: "Jun", ventas: 1700 },
	{ mes: "Jul", ventas: 2200 },
];

const productosVendidos = [
	{ name: "Laptop", value: 12 },
	{ name: "Mouse", value: 20 },
	{ name: "Teclado", value: 8 },
	{ name: "Monitor", value: 5 },
	{ name: "Silla", value: 7 },
];

const pieColors = ["#2563EB", "#0EA5E9", "#16A34A", "#F59E0B", "#DC2626"];

const DashboardPage = () => {
	return (
		<Box>
			<Text fontSize="2xl" fontWeight={700} color="text.main" mb={8} letterSpacing={-1}>
				Dashboard
			</Text>
			<SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6} mb={10}>
				{stats.map((stat, i) => (
					<MotionBox
						key={stat.label}
						bg="white"
						borderRadius="14px"
						boxShadow="card"
						p={6}
						display="flex"
						alignItems="center"
						justifyContent="space-between"
						whileHover={{ y: -3, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
						transition={{ duration: 0.3, ease: "ease" }}
					>
						<Box>
							<Stat>
								<StatLabel color="text.secondary" fontWeight={600} fontSize="sm">
									{stat.label}
								</StatLabel>
								<StatNumber color="text.main" fontWeight={800} fontSize="2xl">
									{stat.value}
								</StatNumber>
							</Stat>
						</Box>
						<Icon as={stat.icon} boxSize={8} color={stat.color} opacity={0.85} />
					</MotionBox>
				))}
			</SimpleGrid>

			<SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
				{/* Gráfica de barras: Ventas por mes */}
				<Box bg="white" borderRadius="14px" boxShadow="card" p={6} minH="320px">
					<Text fontWeight={700} color="text.main" mb={4} fontSize="lg">
						Ventas por mes
					</Text>
					<ResponsiveContainer width="100%" height={220}>
						<BarChart data={ventasPorMes} style={{ fontFamily: 'inherit' }}>
							<XAxis dataKey="mes" stroke="#6B7280" tick={{ fontWeight: 600, fontSize: 13 }} axisLine={false} tickLine={false} />
							<YAxis stroke="#6B7280" tick={{ fontWeight: 600, fontSize: 13 }} axisLine={false} tickLine={false} />
							<Tooltip cursor={{ fill: "#F4F6F9" }} contentStyle={{ borderRadius: 10, fontWeight: 600 }} />
							<Bar dataKey="ventas" fill="#2563EB" radius={[8, 8, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</Box>

				{/* Gráfica de pastel: Productos más vendidos */}
				<Box bg="white" borderRadius="14px" boxShadow="card" p={6} minH="320px">
					<Text fontWeight={700} color="text.main" mb={4} fontSize="lg">
						Productos más vendidos
					</Text>
					<ResponsiveContainer width="100%" height={220}>
						<PieChart>
							<Pie
								data={productosVendidos}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								outerRadius={70}
								innerRadius={40}
								fill="#2563EB"
								label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
								stroke="none"
							>
								{productosVendidos.map((entry, idx) => (
									<Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
								))}
							</Pie>
							<Legend verticalAlign="bottom" height={36} iconType="circle"/>
							<Tooltip contentStyle={{ borderRadius: 10, fontWeight: 600 }} />
						</PieChart>
					</ResponsiveContainer>
				</Box>
			</SimpleGrid>
		</Box>
	);
};

export default DashboardPage;
