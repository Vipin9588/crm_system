export type productDatatype = {
    name: string,
    brand: string,
    description: string,
    category: string,
    costPrice: string,
    salePrice: string,
    discount: string,
    stock: string,
    image: string,
    attribute: Record<string, string[] | string>
}