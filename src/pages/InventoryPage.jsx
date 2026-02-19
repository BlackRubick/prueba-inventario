import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Button, Badge, Icon, Avatar, Switch, Tooltip, HStack, VStack, Tag } from "@chakra-ui/react";
import { useState } from "react";
import EditProductModal from "../components/EditProductModal";
import { FiEdit2, FiEye, FiTag, FiLayers, FiBox, FiCheckCircle, FiXCircle } from "react-icons/fi";

const products = [
	{
		id: 101,
		thumbnail: "https://via.placeholder.com/48x48.png?text=Prod+A",
		title: "Laptop Pro 15”",
		description: "Laptop profesional de alto rendimiento con procesador Intel i7, 16GB RAM y SSD de 512GB. Ideal para trabajo y gaming.",
		shortDesc: "Laptop i7, 16GB RAM, SSD",
		type: "simple",
		status: "Publicado",
		regularPrice: 1800,
		salePrice: 1599,
		sku: "LAPTOP-PRO-15",
		manageStock: true,
		stockQty: 8,
		stockStatus: "Hay existencias",
		categories: ["Electrónica", "Computadoras"],
		tags: ["laptop", "oficina"],
		brands: ["TechBrand"],
		drawer: "A1",
	},
	{
		id: 102,
		thumbnail: "https://via.placeholder.com/48x48.png?text=Prod+B",
		title: "Mouse Inalámbrico",
		description: "Mouse ergonómico inalámbrico con batería recargable y sensor óptico de alta precisión.",
		shortDesc: "Mouse wireless ergonómico",
		type: "simple",
		status: "Borrador",
		regularPrice: 40,
		salePrice: 29,
		sku: "MOUSE-INA-001",
		manageStock: false,
		stockQty: 0,
		stockStatus: "Sin existencias",
		categories: ["Electrónica", "Accesorios"],
		tags: ["mouse", "ergonómico"],
		brands: ["PeriTech"],
		drawer: "B2",
	},
	{
		id: 103,
		thumbnail: "https://via.placeholder.com/48x48.png?text=Prod+C",
		title: "Teclado Mecánico RGB",
		description: "Teclado mecánico con retroiluminación RGB, switches azules y diseño compacto.",
		shortDesc: "Teclado RGB compacto",
		type: "variable",
		status: "Publicado",
		regularPrice: 120,
		salePrice: 99,
		sku: "TECLADO-RGB-002",
		manageStock: true,
		stockQty: 3,
		stockStatus: "Bajo",
		categories: ["Electrónica", "Periféricos"],
		tags: ["teclado", "rgb"],
		brands: ["KeyMaster"],
		drawer: "C3",
	},
];


const getStockBadge = (status) => {
	if (status === "Sin existencias") return <Badge colorScheme="red" bg="#FEE2E2" color="#DC2626">Sin existencias</Badge>;
	if (status === "Bajo") return <Badge colorScheme="yellow" bg="#FEF9C3" color="#CA8A04">Bajo</Badge>;
	if (status === "Se puede reservar") return <Badge colorScheme="blue" bg="#DBEAFE" color="#2563EB">Reservable</Badge>;
	return <Badge colorScheme="green" bg="#DCFCE7" color="#16A34A">Hay existencias</Badge>;
};




const InventoryPage = () => {
	const [editProduct, setEditProduct] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const handleEdit = (product) => {
		setEditProduct(product);
		setModalOpen(true);
	};

	const handleSave = (updatedProduct) => {
		// Aquí deberías actualizar el producto en el estado global o localStorage
		// Por ahora solo cierra el modal
		setModalOpen(false);
	};

	return (
		<Box>
			<Text fontSize="2xl" fontWeight={700} color="text.main" mb={8} letterSpacing={-1}>
				Inventario
			</Text>
			<Box bg="white" borderRadius="14px" boxShadow="card" p={6} overflowX="auto">
				<Table variant="simple" minW="1400px">
					<Thead bg="tableHeader">
						<Tr>
							{/* Identificación */}
							<Th color="text.secondary">ID</Th>
							<Th color="text.secondary">Thumbnail</Th>
							<Th color="text.secondary">Title</Th>
							<Th color="text.secondary">Description</Th>
							<Th color="text.secondary">Short Desc.</Th>
							{/* Tipo y estado */}
							<Th color="text.secondary">Type</Th>
							<Th color="text.secondary">Status</Th>
							{/* Precios */}
							<Th color="text.secondary">Regular price</Th>
							<Th color="text.secondary">Sale price</Th>
							{/* Inventario */}
							<Th color="text.secondary">SKU</Th>
							<Th color="text.secondary">Manage stock</Th>
							<Th color="text.secondary">Stock quantity</Th>
							<Th color="text.secondary">Stock status</Th>
							{/* Clasificación */}
							<Th color="text.secondary">Categorías</Th>
							<Th color="text.secondary">Etiquetas</Th>
							<Th color="text.secondary">Marcas</Th>
							<Th color="text.secondary">Cajón</Th>
							{/* Acciones */}
							<Th color="text.secondary">Acciones</Th>
						</Tr>
					</Thead>
					<Tbody>
						 {products.map((p) => (
						 <Tr key={p.id} _hover={{ bg: "#F9FAFB" }}>
							 {/* ID */}
							 <Td fontWeight={600}>{p.id}</Td>
							 {/* Thumbnail */}
							 <Td>
								 <Avatar size="sm" src={p.thumbnail} name={p.title} borderRadius="8px" />
							 </Td>
							 {/* Title */}
							 <Td fontWeight={700}>{p.title}</Td>
							 {/* Description */}
							 <Td maxW="260px">
								 <Tooltip label={p.description} hasArrow placement="top-start">
									 <Text noOfLines={2} fontSize="sm" color="text.secondary">{p.description}</Text>
								 </Tooltip>
							 </Td>
							 {/* Short Desc. */}
							 <Td maxW="160px">
								 <Tooltip label={p.shortDesc} hasArrow placement="top-start">
									 <Text noOfLines={1} fontSize="sm" color="text.secondary">{p.shortDesc}</Text>
								 </Tooltip>
							 </Td>
							 {/* Type */}
							 <Td>
								 <Tag colorScheme={p.type === "variable" ? "purple" : "blue"} borderRadius="8px">{p.type}</Tag>
							 </Td>
							 {/* Status */}
							 <Td>
								 <Badge colorScheme={p.status === "Publicado" ? "green" : "gray"} borderRadius="8px">{p.status}</Badge>
							 </Td>
							 {/* Regular price */}
							 <Td>${p.regularPrice}</Td>
							 {/* Sale price */}
							 <Td color={p.salePrice < p.regularPrice ? "#16A34A" : undefined} fontWeight={700}>${p.salePrice}</Td>
							 {/* SKU */}
							 <Td>{p.sku}</Td>
							 {/* Manage stock */}
							 <Td>
								 <Switch isChecked={p.manageStock} colorScheme="blue" size="md" isReadOnly />
							 </Td>
							 {/* Stock quantity */}
							 <Td>{p.stockQty}</Td>
							 {/* Stock status */}
							 <Td>{getStockBadge(p.stockStatus)}</Td>
							 {/* Categorías */}
							 <Td>
								 <HStack spacing={1} flexWrap="wrap">
									 {p.categories.map((cat) => (
										 <Tag key={cat} colorScheme="blue" borderRadius="8px" size="sm">{cat}</Tag>
									 ))}
								 </HStack>
							 </Td>
							 {/* Etiquetas */}
							 <Td>
								 <HStack spacing={1} flexWrap="wrap">
									 {p.tags.map((tag) => (
										 <Tag key={tag} colorScheme="gray" borderRadius="8px" size="sm">{tag}</Tag>
									 ))}
								 </HStack>
							 </Td>
							 {/* Marcas */}
							 <Td>
								 <HStack spacing={1} flexWrap="wrap">
									 {p.brands.map((brand) => (
										 <Tag key={brand} colorScheme="purple" borderRadius="8px" size="sm">{brand}</Tag>
									 ))}
								 </HStack>
							 </Td>
							 {/* Cajón */}
							 <Td>{p.drawer}</Td>
							 {/* Acciones */}
							 <Td>
								 <HStack spacing={1}>
									 <Tooltip label="Ver producto" hasArrow><Button size="sm" variant="ghost" colorScheme="blue" borderRadius="8px"><Icon as={FiEye} /></Button></Tooltip>
									 <Tooltip label="Editar producto" hasArrow>
										 <Button size="sm" variant="ghost" colorScheme="green" borderRadius="8px" onClick={() => handleEdit(p)}>
											 <Icon as={FiEdit2} />
										 </Button>
									 </Tooltip>
								 </HStack>
							 </Td>
						 </Tr>
						 ))}
					</Tbody>
				</Table>
			</Box>
			<EditProductModal isOpen={modalOpen} onClose={() => setModalOpen(false)} product={editProduct} onSave={handleSave} />
		</Box>
	);
};

export default InventoryPage;
