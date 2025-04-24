class ProductDTO {
  constructor(product) {
    this.name = product.name
    this.category = product.category
    this.stock = product.stock
    this.price = product.price
  }
}

export default ProductDTO
