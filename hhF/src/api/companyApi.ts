import {apiClient} from "./axios.ts";

export const createCompany = async (companyData: {
    name: string;
}) => {
    const res = await apiClient.post(`/create/company`, companyData);
    return res.data;
}

//?