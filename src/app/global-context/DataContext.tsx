import { createContext, useState } from 'react';

export const DataContext = createContext(null);

export const DataContextProvider = ({ children }) => {
	const [data, setData] = useState({
		category: '',
		subCategory: '',
		city: '',
		district: '',
	});
	return (
		<>
			<DataContext.Provider value={{ data, setData }}>
				{children}
			</DataContext.Provider>
		</>
	);
};
