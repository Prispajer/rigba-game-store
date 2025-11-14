type RequestResponse<T> = {
    data: T | null;
    success: boolean;
    message: string;
    twoFactor?: boolean;
};

export default RequestResponse;