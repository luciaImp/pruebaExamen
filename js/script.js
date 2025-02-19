// Asegúrate de reemplazar "YOUR_UNIQUE_ENDPOINT" por tu endpoint único asignado por crudcrud.com.
const apiUrl = 'https://crudcrud.com/api/4aed9605aca346c68ba4daa552b879f2/producto';

// Función para crear un producto (POST)
async function createProduct(product) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });
  return response.json();
}

// Función para obtener productos (GET)
async function getProducts() {
  const response = await fetch(apiUrl);
  return response.json();
}

// Elementos del DOM
const productForm = document.getElementById('productForm');
const createProductBtn = document.getElementById('createProductBtn');
const showProductsBtn = document.getElementById('showProductsBtn');

// Evento para crear producto
createProductBtn.addEventListener('click', async () => {
  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  const quantityValue = document.getElementById('quantity').value.trim();
  const quantity = parseInt(quantityValue);

  // Validación: no permitir campos vacíos y que cantidad sea numérica mayor que cero.
  if (!name || !description || !quantityValue || isNaN(quantity) || quantity <= 0) {
    alert("Datos erróneos. Por favor, completa todos los campos correctamente.");
    return;
  }

  const product = { name, description, quantity };

  try {
    const createdProduct = await createProduct(product);
    console.log("Producto creado:", createdProduct);
    // Vaciar el formulario
    productForm.reset();
  } catch (error) {
    console.error("Error al crear producto:", error);
  }
});

// Evento para mostrar en consola nombres y cantidades
showProductsBtn.addEventListener('click', async () => {
  try {
    const products = await getProducts();
    // Mostrar sólo el nombre y la cantidad de cada producto
    products.forEach(prod => {
      console.log(`Nombre: ${prod.name}, Cantidad: ${prod.quantity}`);
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
});
