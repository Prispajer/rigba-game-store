import ApiProduct from "@/features/products/types/api/apiProduct";

type ApiPagination = {
    count: number;
    next: string;
    previous: string;
    results: ApiProduct[];
}

export default ApiPagination;