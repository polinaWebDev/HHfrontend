import {useEffect, useState} from "react";
import {apiClient} from "../api/axios.ts";

export interface Job {
    id: string;
    description: string;
    salary: string;
    title: string;
}

export const useGetJobs = (title?: string) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error|null>(null);
    const [debouncedTitle, setDebouncedTitle] = useState(title)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTitle(title)
        }, 500)

        return() => {
            clearTimeout(handler)
        }
    }, [title]);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const res = await apiClient.get<Job[]>('/jobs', {
                    params: { title: debouncedTitle },
                });
                setJobs(res.data);
                setError(null);
            } catch (err) {
                setError(err as Error);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (debouncedTitle !== undefined) {
            fetchJobs();
        }
    }, [debouncedTitle]);

    return {jobs, loading, error}
}