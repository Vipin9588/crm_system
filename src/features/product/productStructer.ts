
type ImageItem = {
    file: File;
    id: string;
    preview: string;
};

export type productDatatype = {
    id: string,
    name: string,
    brand: string,
    description: string,
    category: string,
    costPrice: string,
    salePrice: string,
    discount: string,
    stock: string,
    images: ImageItem[],
    attribute: Record<string, string[] | string>
}