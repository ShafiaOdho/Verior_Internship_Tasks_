document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const productList = document.getElementById('productList');

  const products = [
    'Foundation',
    'Lipstick',
    'Mascara',
    'Eyeliner',
    'Blush',
    'Highlighter',
    'Primer',
    'Concealer',
    'Face Powder',
    'Bronzer',
    'Setting Spray',
    'Eyeshadow Palette',
    'Lip Gloss',
    'Brow Pencil',
    'Makeup Sponge',
    'Makeup Remover',
    'BB Cream',
    'CC Cream',
    'Nail Polish',
    'Makeup Brush Set'
  ];

  const renderProducts = (filteredProducts) => {
    productList.innerHTML = '';
    filteredProducts.forEach(product => {
      const li = document.createElement('li');
      li.textContent = product;
      productList.appendChild(li);
    });
  };

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
  });

  renderProducts(products);
});
