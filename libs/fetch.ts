import axios, { AxiosError } from 'axios';
import useSWR from 'swr'

const fetchSimple = async (url: string) => {
    const res = await axios.get(url);
    return res.data;
}

export const useCategory = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/category`;
    const { data, error, isLoading } = useSWR(url, fetchSimple);
    const categories = data as { id: number, name: string, link: string, urlImg: string }[]
    return { categories, error, isLoading };
}

export const useBanner = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/banner`;
    const { data, error, isLoading } = useSWR(url, fetchSimple);
    const banners = data as { id: number, imageUrl: string, link: string, description: string }[]
    return { banners, error, isLoading }
}
