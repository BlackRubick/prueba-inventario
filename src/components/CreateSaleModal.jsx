import {
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  VStack,
  HStack,
  useDisclosure,
  Text,
  Tag,
  IconButton,
  InputGroup,
  InputLeftElement,
  Box,
  useBreakpointValue,
  List,
  ListItem,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiPlus, FiTrash2, FiSearch } from "react-icons/fi";


// Debe coincidir con la lista de productos del inventario
const INVENTORY_PRODUCTS = [
  {
    id: 101,
    title: "Laptop Pro 15”",
    salePrice: 1599,
    regularPrice: 1800,
    stockQty: 8,
  },
  {
    id: 102,
    title: "Mouse Inalámbrico",
    salePrice: 29,
    regularPrice: 40,
    stockQty: 0,
  },
  {
    id: 103,
    title: "Teclado Mecánico RGB",
    salePrice: 99,
    regularPrice: 120,
    stockQty: 3,
  },
];

const defaultProduct = { productId: '', qty: 1 };

const CreateSaleModal = ({ isOpen, onClose, onCreate }) => {
        const handleCreate = () => {
          // Aquí puedes agregar validaciones si lo deseas
          if (onCreate) {
            onCreate({ customer, products });
          }
          onClose();
          // Limpiar el formulario si es necesario
          setCustomer("");
          setProducts([{ ...defaultProduct }]);
          setSearches([""]);
        };
        const [status, setStatus] = useState("Pagado");
      const handleAddProduct = () => {
        setProducts((prev) => [...prev, { ...defaultProduct }]);
        setSearches((prev) => [...prev, ""]);
      };
    const isMobile = useBreakpointValue({ base: true, md: false });
  const [customer, setCustomer] = useState("");
  const [products, setProducts] = useState([{ ...defaultProduct }]);
  // Un estado de búsqueda por cada fila de producto
  const [searches, setSearches] = useState([""]);

  const handleProductChange = (idx, field, value) => {
    setProducts((prev) =>
      prev.map((p, i) => {
        if (i !== idx) return p;
        if (field === 'productId') {
          return { ...p, productId: value, qty: 1 };
        }
        return { ...p, [field]: value };
      })
    );
    if (field === 'productId') {
      setSearches((prev) => prev.map((s, i) => (i === idx ? "" : s)));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={useBreakpointValue({ base: "full", md: "2xl" })} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="16px">
        <ModalHeader fontWeight={700}>Nueva venta</ModalHeader>
        <ModalCloseButton borderRadius="8px" />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Nombre del comprador</FormLabel>
              <Input
                placeholder="Nombre del cliente"
                value={customer}
                onChange={e => setCustomer(e.target.value)}
                borderRadius="8px"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Estado de pago</FormLabel>
              <Select value={status} onChange={e => setStatus(e.target.value)} borderRadius="8px">
                <option value="Pagado">Pagado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cancelado">Cancelado</option>
              </Select>
            </FormControl>
            {products.map((prod, idx) => {
              const selected = INVENTORY_PRODUCTS.find((ip) => String(ip.id) === String(prod.productId));
              const inputValue = typeof searches[idx] === 'string' ? searches[idx] : '';
              const filteredProducts = INVENTORY_PRODUCTS.filter((ip) =>
                ip.title.toLowerCase().includes(inputValue.toLowerCase())
              );
              return (
                <Box key={idx} w="full" mb={2}>
                  <Flex direction={isMobile ? "column" : "row"} gap={2} align={isMobile ? "stretch" : "flex-end"}>
                    <FormControl isRequired flex={2} minW={isMobile ? undefined : "220px"}>
                      <FormLabel>Producto</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <FiSearch color="#A0AEC0" />
                        </InputLeftElement>
                        <Input
                          placeholder={selected ? selected.title : "Buscar producto"}
                          value={inputValue}
                          onChange={e => {
                            setSearches(prev => prev.map((s, i) => (i === idx ? e.target.value : s)));
                            // Si el usuario borra el input, limpia la selección
                            if (selected) handleProductChange(idx, "productId", "");
                          }}
                          autoComplete="off"
                          borderRadius="8px"
                        />
                        {selected && (
                          <Button
                            size="xs"
                            ml={2}
                            colorScheme="gray"
                            variant="outline"
                            borderRadius="8px"
                            onClick={() => {
                              setSearches(prev => prev.map((s, i) => (i === idx ? "" : s)));
                              handleProductChange(idx, "productId", "");
                            }}
                          >
                            Cambiar
                          </Button>
                        )}
                      </InputGroup>
                      {/* Lista de sugerencias */}
                      {inputValue && (
                        <Box bg="white" borderRadius="8px" boxShadow="md" mt={1} maxH="180px" overflowY="auto" zIndex={20} position="absolute" w="full">
                          <List spacing={0}>
                            {filteredProducts.length === 0 && (
                              <ListItem px={4} py={2} color="gray.400">Sin resultados</ListItem>
                            )}
                            {filteredProducts.map((ip) => (
                              <ListItem
                                key={ip.id}
                                px={4}
                                py={2}
                                cursor={ip.stockQty === 0 ? "not-allowed" : "pointer"}
                                color={ip.stockQty === 0 ? "gray.400" : undefined}
                                _hover={ip.stockQty === 0 ? {} : { bg: "gray.50" }}
                                onClick={() => {
                                  if (ip.stockQty !== 0) {
                                    handleProductChange(idx, "productId", ip.id);
                                    setSearches(prev => prev.map((s, i) => (i === idx ? "" : s)));
                                  }
                                }}
                              >
                                <Flex align="center" gap={2}>
                                  <Text fontWeight={600}>{ip.title}</Text>
                                  <Tag colorScheme="blue" borderRadius="8px">${ip.salePrice}</Tag>
                                  {ip.stockQty === 0 && <Tag colorScheme="red" borderRadius="8px">Sin stock</Tag>}
                                </Flex>
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                    </FormControl>
                    <FormControl isRequired w={isMobile ? "100%" : "90px"} flex={1}>
                      <FormLabel>Cantidad</FormLabel>
                      <NumberInput min={1} max={selected?.stockQty || 99} value={prod.qty} onChange={(_, v) => handleProductChange(idx, "qty", v)}>
                        <NumberInputField />
                      </NumberInput>
                    </FormControl>
                    <FormControl w={isMobile ? "100%" : "110px"} flex={1}>
                      <FormLabel>Precio</FormLabel>
                      <Input value={selected?.salePrice || ''} isReadOnly borderRadius="8px" />
                    </FormControl>
                    <IconButton icon={<FiTrash2 />} aria-label="Eliminar" size="sm" colorScheme="red" borderRadius="8px" onClick={() => handleRemoveProduct(idx)} isDisabled={products.length === 1} />
                  </Flex>
                  {idx < products.length - 1 && <Divider my={2} />}
                </Box>
              );
            })}
            <Button leftIcon={<FiPlus />} onClick={handleAddProduct} size="sm" colorScheme="blue" variant="ghost" borderRadius="8px" alignSelf="flex-start">
              Agregar producto
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} variant="ghost" mr={3} borderRadius="8px">
            Cancelar
          </Button>
          <Button onClick={handleCreate} colorScheme="blue" borderRadius="8px">
            Crear venta
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateSaleModal;
