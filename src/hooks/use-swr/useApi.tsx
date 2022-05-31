import API from '@app/api-getway/API';
import React from 'react';
import useSWR from 'swr';

interface ApiProps {
	text: string | (() => boolean | null);
	url: string;
	revalidate?: {
		revalidateIfStale?: boolean;
		revalidateOnFocus?: boolean;
		revalidateOnReconnect?: boolean;
		refreshInterval?: number;
	};
}

export function useApi(props: ApiProps) {
	const fetcher = async () => {
		const res = await API.get(props.url, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return res.data;
	};
	const { data, error } = useSWR(props.text, fetcher, props.revalidate);

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	};
}

export default useApi;
