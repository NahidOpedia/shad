import CustomLink from '@app/atoms/CustomLink';
import { ArrowForward, ArrowRight } from '@mui/icons-material';
import {
	Dialog,
	DialogContent,
	List,
	ListItemButton,
	ListItemSecondaryAction,
	ListItemText,
	Stack,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { categories, cities } from 'src/utils/dummyData';

export const CategoryDialog = ({
	open,
	close,
	openLocation,
	data,
	setData,
	redirect,
}) => {
	const [subCat, setSubCat] = useState([]);
	const handleCatClick = (category: string) => {
		setData((prev) => {
			return {
				...prev,
				category,
			};
		});
		setSubCat(categories.find((cat) => cat.label === category).child);
	};
	useEffect(() => {
		return () => setSubCat([]);
	}, []);
	return (
		<Dialog
			open={open}
			onClose={() => {
				setSubCat([]);
				close();
			}}
		>
			<DialogContent>
				<Stack direction={'row'} spacing={1.5}>
					<Box sx={{ minWidth: 200 }}>
						<Typography fontWeight={'bold'}>Select a category</Typography>
						<List>
							{categories.map((category) => (
								<ListItemButton
									onClick={() => handleCatClick(category.label)}
									key={category.label}
								>
									<ListItemSecondaryAction>
										<ArrowRight />
									</ListItemSecondaryAction>
									<ListItemText>{category.label}</ListItemText>
								</ListItemButton>
							))}
						</List>
					</Box>
					<Box sx={{ minWidth: 200 }}>
						{redirect && subCat.length > 0 && (
							<>
								<Typography fontWeight={'bold'}>
									Select a sub category
								</Typography>
								<List>
									{subCat.map((category) => (
										<CustomLink
											href={`/post-ad?category=${data.category}&subcat=${data.subCategory}&city=${data.city}&dis=${data.dis}`}
											key={category.label}
										>
											<ListItemButton
												onClick={() => {
													setData((prev) => {
														return {
															...prev,
															subCategory: category.label,
														};
													});
													openLocation();
												}}
											>
												<ListItemSecondaryAction>
													<ArrowRight />
												</ListItemSecondaryAction>
												<ListItemText>{category.label}</ListItemText>
											</ListItemButton>
										</CustomLink>
									))}
								</List>
							</>
						)}
						{!redirect && subCat.length > 0 && (
							<>
								<Typography fontWeight={'bold'}>
									Select a sub category
								</Typography>
								<List>
									{subCat.map((category) => (
										<ListItemButton
											key={category.label}
											onClick={() => {
												setData((prev) => {
													return {
														...prev,
														subCategory: category.label,
													};
												});
												openLocation();
											}}
										>
											<ListItemSecondaryAction>
												<ArrowRight />
											</ListItemSecondaryAction>
											<ListItemText>{category.label}</ListItemText>
										</ListItemButton>
									))}
								</List>
							</>
						)}
					</Box>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};

export const LocationDialog = ({ open, close, data, setData, redirect }) => {
	const [districts, setDistricts] = useState([]);
	const handleCityClick = (city: string) => {
		setData((prev) => {
			return {
				...prev,
				city,
			};
		});
		setDistricts(cities.find((el) => el.label === city).districts);
	};
	return (
		<Dialog
			open={open}
			onClose={() => {
				setDistricts([]);
				close();
			}}
		>
			<DialogContent>
				<Stack direction={'row'} spacing={1.5}>
					<Box sx={{ minWidth: 200 }}>
						<Typography fontWeight={'bold'}>Select a City</Typography>
						<List>
							{cities.map((city) => (
								<ListItemButton
									onClick={() => handleCityClick(city.label)}
									key={city.label}
								>
									<ListItemSecondaryAction>
										<ArrowRight />
									</ListItemSecondaryAction>
									<ListItemText>{city.label}</ListItemText>
								</ListItemButton>
							))}
						</List>
					</Box>
					<Box sx={{ minWidth: 200 }}>
						{districts.length > 0 && (
							<>
								<Typography fontWeight={'bold'}>Select a District</Typography>
								<List>
									{redirect &&
										districts.map((district) => (
											<CustomLink
												href={`/post-ad?category=${data.category}&subcat=${data.subCategory}&city=${data.city}&dis=${district.label}`}
												key={district.label}
											>
												<ListItemButton
													onClick={() => {
														setData((prev) => {
															return {
																...prev,
																district,
															};
														});
													}}
												>
													<ListItemSecondaryAction>
														<ArrowRight />
													</ListItemSecondaryAction>
													<ListItemText>{district.label}</ListItemText>
												</ListItemButton>
											</CustomLink>
										))}
									{!redirect &&
										districts.map((district) => (
											<ListItemButton
												key={district.label}
												onClick={() => {
													setData((prev) => {
														return {
															...prev,
															district,
														};
													});
												}}
											>
												<ListItemSecondaryAction>
													<ArrowRight />
												</ListItemSecondaryAction>
												<ListItemText>{district.label}</ListItemText>
											</ListItemButton>
										))}
								</List>
							</>
						)}
					</Box>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};
