import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Button, Icon, Badge, HStack, Tooltip, Avatar, VStack, useDisclosure, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { FiEye, FiDollarSign, FiShoppingBag, FiPlus } from "react-icons/fi";
import { useState } from "react";
import CreateSaleModal from "../components/CreateSaleModal";
import SaleTicket from "../components/SaleTicket";

const initialSales = [
	{
		id: 1,
		date: "2026-02-18",
		total: 250,
		profit: 60,
		items: 3,
		status: "Pagado",
		customer: "Juan Pérez",
		products: [
			{ name: "Laptop Pro 15”", qty: 1, price: 150 },
			{ name: "Mouse Inalámbrico", qty: 2, price: 50 },
		],
	},
	{
		id: 2,
		date: "2026-02-17",
		total: 120,
		profit: 30,
		items: 1,
		status: "Pendiente",
		customer: "Ana López",
		products: [
			{ name: "Teclado Mecánico RGB", qty: 1, price: 120 },
		],
	},
	{
		id: 3,
		date: "2026-02-16",
		total: 480,
		profit: 120,
		items: 7,
		status: "Pagado",
		customer: "Carlos Ruiz",
		products: [
			{ name: "Laptop Pro 15”", qty: 2, price: 300 },
			{ name: "Teclado Mecánico RGB", qty: 2, price: 240 },
			{ name: "Mouse Inalámbrico", qty: 3, price: 90 },
		],
	},
];


const formatDate = (dateStr) => {
	const d = new Date(dateStr);
	return d.toLocaleDateString("es-MX", { year: "numeric", month: "short", day: "2-digit" });
};

const statusColor = (status) => {
	if (status === "Pagado") return "green";
	if (status === "Pendiente") return "yellow";
	return "gray";
};

const SalesPage = () => {
	const [sales, setSales] = useState(initialSales);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [lastSale, setLastSale] = useState(null);
	const [ticketSale, setTicketSale] = useState(null);
	const { isOpen: isTicketOpen, onOpen: openTicket, onClose: closeTicket } = useDisclosure();

	const handleCreateSale = (newSale) => {
		// Transformar productos a la estructura esperada por la tabla
		const INVENTORY_PRODUCTS = [
			{ id: 101, title: "Laptop Pro 15”", salePrice: 1599 },
			{ id: 102, title: "Mouse Inalámbrico", salePrice: 29 },
			{ id: 103, title: "Teclado Mecánico RGB", salePrice: 99 },
		];
		const products = (newSale.products || []).map((p) => {
			const prod = INVENTORY_PRODUCTS.find(ip => String(ip.id) === String(p.productId));
			return {
				name: prod ? prod.title : "Producto desconocido",
				qty: p.qty,
				price: prod ? prod.salePrice * p.qty : 0,
			};
		});
		const total = products.reduce((acc, p) => acc + p.price, 0);
		const profit = Math.round(total * 0.2); // demo: 20% de ganancia
		const sale = {
			id: Date.now(),
			date: new Date().toISOString().slice(0, 10),
			total,
			profit,
			items: products.reduce((acc, p) => acc + p.qty, 0),
			status: newSale.status || "Pagado",
			customer: newSale.customer,
			products,
		};
		setSales((prev) => [sale, ...prev]);
		setLastSale(sale);
	};

	return (
		<Box position="relative">
			<Text fontSize="2xl" fontWeight={700} color="text.main" mb={8} letterSpacing={-1}>
				Ventas
			</Text>
			<Box bg="white" borderRadius="14px" boxShadow="card" p={6} overflowX="auto">
				<Table variant="simple" minW="900px">
					<Thead bg="tableHeader">
						<Tr>
							<Th color="text.secondary">Fecha</Th>
							<Th color="text.secondary">Cliente</Th>
							<Th color="text.secondary">Productos</Th>
							<Th color="text.secondary">Total</Th>
							<Th color="text.secondary">Ganancia</Th>
							<Th color="text.secondary">Estado</Th>
							<Th color="text.secondary">Acciones</Th>
						</Tr>
					</Thead>
					<Tbody>
						{sales.map((s) => (
							<Tr key={s.id} _hover={{ bg: "#F9FAFB" }}>
								<Td fontWeight={600}>{formatDate(s.date)}</Td>
								<Td>
									<HStack spacing={2}>
										<Avatar size="xs" name={s.customer} />
										<Text fontWeight={600}>{s.customer}</Text>
									</HStack>
								</Td>
								<Td>
									<VStack align="start" spacing={1}>
										{s.products.map((prod, idx) => (
											<HStack key={idx} spacing={2}>
												<Badge colorScheme="blue" borderRadius="8px" px={2}>{prod.qty}x</Badge>
												<Text fontSize="sm">{prod.name}</Text>
												<Text fontSize="sm" color="text.secondary">${prod.price}</Text>
											</HStack>
										))}
									</VStack>
								</Td>
								<Td fontWeight={700} color="primary.main">
									<HStack spacing={1}><Icon as={FiDollarSign} /> <Text>${s.total}</Text></HStack>
								</Td>
								<Td color="success" fontWeight={600}>${s.profit}</Td>
								<Td>
									<Badge colorScheme={statusColor(s.status)} borderRadius="8px">{s.status}</Badge>
								</Td>
								<Td>
									<Tooltip label="Ver detalles" hasArrow>
										<Button
											size="sm"
											variant="ghost"
											colorScheme="blue"
											borderRadius="8px"
											onClick={() => {
												setTicketSale(s);
												openTicket();
											}}
										>
											<Icon as={FiEye} />
										</Button>
									</Tooltip>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
			   <Button
				   leftIcon={<FiPlus />}
				   colorScheme="blue"
				   borderRadius="8px"
				   size="lg"
				   fontWeight={700}
				   px={6}
				   position="fixed"
				   bottom={{ base: 8, md: 12 }}
				   right={{ base: 8, md: 16 }}
				   boxShadow="0 4px 16px rgba(37,99,235,0.18)"
				   zIndex={10}
				   onClick={onOpen}
			   >
				   Nueva venta
			   </Button>
			<CreateSaleModal isOpen={isOpen} onClose={onClose} onCreate={handleCreateSale} />
			{lastSale && <SaleTicket sale={lastSale} />}

			<Modal isOpen={isTicketOpen} onClose={closeTicket} size="xs" isCentered>
				<ModalOverlay />
				<ModalContent borderRadius="14px" display="flex" alignItems="center" justifyContent="center">
					<ModalHeader fontWeight={700} fontSize="lg" w="100%" textAlign="center">Ticket de venta</ModalHeader>
					<ModalCloseButton borderRadius="8px" />
					<ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" w="100%">
						<div id="ticket-print-area" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
							{ticketSale && <SaleTicket sale={ticketSale} />}
						</div>
					</ModalBody>
					<ModalFooter w="100%" display="flex" justifyContent="center">
						<Button colorScheme="blue" borderRadius="8px" onClick={() => {
							const printContents = document.getElementById('ticket-print-area').innerHTML;
							const printWindow = window.open('', '', 'height=600,width=400');
							printWindow.document.write('<html><head><title>Ticket de venta</title>');
							printWindow.document.write('<style>body{margin:0;padding:0;} .chakra-box{box-shadow:none !important;border-radius:0 !important;}</style>');
							printWindow.document.write('</head><body >');
							printWindow.document.write(printContents);
							printWindow.document.write('</body></html>');
							printWindow.document.close();
							printWindow.focus();
							setTimeout(() => { printWindow.print(); printWindow.close(); }, 300);
						}}>
							Imprimir ticket
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default SalesPage;
