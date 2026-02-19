import {
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
  Switch,
  useDisclosure,
  VStack,
  HStack,
  Tag,
  Textarea,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const EditProductModal = ({ isOpen, onClose, product, onSave }) => {
  const [form, setForm] = useState(product || {});

  useEffect(() => {
    setForm(product || {});
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="14px">
        <ModalHeader>Editar producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Título</FormLabel>
              <Input name="title" value={form.title || ""} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Descripción</FormLabel>
              <Textarea name="description" value={form.description || ""} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Descripción corta</FormLabel>
              <Input name="shortDesc" value={form.shortDesc || ""} onChange={handleChange} />
            </FormControl>
            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Precio regular</FormLabel>
                <Input name="regularPrice" type="number" value={form.regularPrice || ""} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Precio oferta</FormLabel>
                <Input name="salePrice" type="number" value={form.salePrice || ""} onChange={handleChange} />
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl>
                <FormLabel>SKU</FormLabel>
                <Input name="sku" value={form.sku || ""} onChange={handleChange} />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Gestionar stock</FormLabel>
                <Switch name="manageStock" isChecked={form.manageStock || false} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Cantidad</FormLabel>
                <Input name="stockQty" type="number" value={form.stockQty || ""} onChange={handleChange} />
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <Select name="status" value={form.status || ""} onChange={handleChange}>
                  <option value="Publicado">Publicado</option>
                  <option value="Borrador">Borrador</option>
                  <option value="Privado">Privado</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Tipo</FormLabel>
                <Select name="type" value={form.type || ""} onChange={handleChange}>
                  <option value="simple">Simple</option>
                  <option value="variable">Variable</option>
                </Select>
              </FormControl>
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} variant="ghost" mr={3} borderRadius="8px">
            Cancelar
          </Button>
          <Button onClick={handleSave} colorScheme="blue" borderRadius="8px">
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProductModal;
