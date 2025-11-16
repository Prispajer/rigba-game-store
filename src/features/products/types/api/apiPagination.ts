import ApiProductDetails from "@/features/products/types/api/apiProductDetails";

type ApiPagination = {
    count: number;
    next: string;
    previous: string;
    results: ApiProductDetails[];
}

export default ApiPagination;