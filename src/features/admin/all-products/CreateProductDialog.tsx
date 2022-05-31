import API from '@app/api-getway/API';
import CustomImage from '@app/atoms/CustomImage';
import { postAdDummyData } from '@features/post-ad/post-ad.data';
import { formatData } from '@features/post-ad/PostAdForm';
import AlertMessage from '@features/shared/alert-message/AlertMessage';
import UploadImages from '@features/shared/post-ad/UploadImages';
import { RemoveCircle } from '@mui/icons-material';
import ImageIcon from '@mui/icons-material/Image';
import {
	Box,
	Button,
	Chip,
	Grid,
	IconButton,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { locations, parents } from '@utils/dummyData';
import React, { Fragment, useEffect, useState } from 'react';
import useCreateProduct from 'src/hooks/create-product/useCreateProduct';
import AdminDialog from '../dialogs/AdminDialog';
import { addProduct } from './actions/productActions';
import CategoryInputs from './CategoryInputs';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};
function formatDate(date: Date) {
	const d = new Date(date);
	let month = '' + (d.getMonth() + 1);
	let day = '' + d.getDate();
	const year = d.getFullYear();
	const minute = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
	const hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	const formateDate = [year, month, day].join('-');
	return `${formateDate}T${hours}:${minute}`;
}
const initialData = {
	location: {
		city: '',
		district: '',
	},
	productType: 'free',
	parent: '',
	title: '',
	showTill: formatDate(new Date(Date.now() + 86400000)),
	showButtons: [],
	productStatus: 'active',
};

const CreateProductDialog = ({ open, handleClose, id, title }) => {
	const { categories, isError, isLoading } = useCreateProduct();
	const [validMessage, setValidMessage] = useState('');
	const [invalidMessage, setInvalidMessage] = useState('');
	const [city, setCity] = useState({
		selectState: '',
		city: { child: [] },
	});
	const [category, setCategory] = useState({
		selectState: '',
		cat: { child: { subCategories: [] } },
	});
	const [subCategory, setSubCategory] = useState({
		selectState: '',
		subCat: { formFields: [] },
	});
	const [data, setData] = useState(initialData);
	const [formFieldData, setFormFieldData] = useState([]);
	const [photoCollections, setPhotoCollections] = useState({
		photos: [
			'https://i.bikroy-st.com/bajaj-pulsar-phresh-knddishn-2019-for-sale-sylhet/622e09c8-b574-4bb8-afcf-22496042c3d2/620/466/fitted.jpg',
			'https://i.bikroy-st.com/bajaj-pulsar-phresh-knddishn-2019-for-sale-sylhet/8db6cddd-f2b0-4adf-909c-fc231fbd7683/620/466/fitted.jpg',
			'https://i.bikroy-st.com/bajaj-pulsar-phresh-knddishn-2019-for-sale-sylhet/3f5d7cae-9e17-4ae4-8f0d-cd8fc658fdcb/620/466/fitted.jpg',
			'https://i.bikroy-st.com/bajaj-pulsar-phresh-knddishn-2019-for-sale-sylhet/5cb08640-9312-4d69-9b9e-7b7f4b1bd1e5/620/466/fitted.jpg',
		],
	});
	const handleData =
		(props: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setData((prev) => {
				return {
					...prev,
					[props]: event.target.value,
				};
			});
		};

	const handleFormFieldData =
		(props: string, type: string, value?: { key: string; label: string }) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setFormFieldData((prev) => {
				const element = prev.find((el) => el.key === props);
				if (type === 'money') {
					if (!value) {
						element.value.value = event.target.value;
						return [...prev];
					}
					if (element.value.negotiable) {
						element.value.negotiable = false;
						return [...prev];
					}
					element.value.negotiable = true;
					return [...prev];
				}
				if (type === 'tree') {
					const parsed = JSON.parse(event.target.value);
					element.value = parsed;
					element.selectState = event.target.value;
					return [...prev];
				}
				if (type === 'multi') {
					if (element.value.find((e) => e.key === value.key)) {
						element.value = element.value.filter((v) => v.key !== value.key);
						return [...prev];
					}
					element.value.push(value);
					return [...prev];
				}
				if (type === 'enum') {
					element.value = event.target.value;
					return [...prev];
				}
				if (type === 'text' || type === 'description') {
					element.value = event.target.value;
					return [...prev];
				}
				return prev;
			});
		};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const finalData = {
			...data,
			features: {
				...formFieldData.reduce(
					(obj, el) => ((obj[el.key] = el.value), obj),
					{}
				),
			},
		};
		console.log(finalData, 'final data');
		if (photoCollections.photos.length < 1) return;
		await addProduct({
			valid: setValidMessage,
			invalid: setInvalidMessage,
			data: finalData,
			initialData,
			photos: photoCollections,
			setData,
		});
	};

	useEffect(() => {
		// console.log(subCategory.subCat, 'sub cat');
		if (subCategory.subCat.formFields.length > 0) {
			setFormFieldData((formatData(subCategory.subCat.formFields) as []) || []);
		}
	}, [subCategory]);
	// console.log(formFieldData, 'formfield');
	if (isLoading) {
		return (
			<AdminDialog open={open} handleClose={handleClose} id={id} title={title}>
				<Box sx={{ p: 1 }}>
					<Box
						sx={{
							bgcolor: '#fff',
							borderRadius: '8px',
							p: 1,
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Typography>Loading...</Typography>
					</Box>
				</Box>
			</AdminDialog>
		);
	}
	if (isError) {
		return (
			<AdminDialog open={open} handleClose={handleClose} id={id} title={title}>
				<Box sx={{ p: 1 }}>
					<Box
						sx={{
							bgcolor: '#fff',
							borderRadius: '8px',

							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							p: 5,
						}}
					>
						<Typography>Failed to load categories...</Typography>
					</Box>
				</Box>
			</AdminDialog>
		);
	}

	return (
		<Fragment>
			<AlertMessage
				duration={3000}
				invalid={invalidMessage}
				valid={validMessage}
				setInvalid={setInvalidMessage}
				setValid={setValidMessage}
			/>
			<AdminDialog open={open} handleClose={handleClose} id={id} title={title}>
				<Box sx={{ p: 1 }}>
					<Box
						sx={{ bgcolor: '#fff', borderRadius: '8px', p: 1 }}
						component="form"
						onSubmit={handleSubmit}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={5}>
								<Stack direction="column" spacing={1} sx={{ width: '100%' }}>
									<TextField
										fullWidth
										label="Title"
										required
										value={data.title}
										onChange={handleData('title')}
									/>

									<Stack
										direction={'row'}
										flexWrap="wrap"
										spacing={0}
										sx={{ width: '100%', gap: 0.5 }}
									>
										<TextField
											size="small"
											select
											value={data.productType}
											onChange={(e) =>
												setData((prev) => ({
													...prev,
													productType: e.target.value,
												}))
											}
											label="Product Type"
											required
											sx={{ width: 120 }}
										>
											{['free', 'premium'].map((el) => (
												<MenuItem key={el} value={el}>
													{el}
												</MenuItem>
											))}
										</TextField>
										<TextField
											size="small"
											select
											value={data.parent}
											onChange={(e) =>
												setData((prev) => ({
													...prev,
													parent: e.target.value,
												}))
											}
											label="Parent"
											required
											sx={{ width: 120 }}
										>
											{parents.map((el) => (
												<MenuItem key={el} value={el}>
													{el}
												</MenuItem>
											))}
										</TextField>
										<TextField
											size="small"
											select
											value={category.selectState || ''}
											onChange={(e) => {
												const parsedValue = JSON.parse(e.target.value);

												return setCategory({
													selectState: e.target.value,
													cat: parsedValue,
												});
											}}
											label="Category"
											required
											sx={{ width: 120 }}
										>
											{categories.map((el) => (
												<MenuItem
													key={el.category.title}
													value={JSON.stringify(el)}
												>
													{el.category.title}
												</MenuItem>
											))}
										</TextField>
										<TextField
											sx={{ width: 120 }}
											size="small"
											select
											required
											disabled={
												category.cat.child.subCategories.length > 0
													? false
													: true
											}
											value={subCategory.selectState || ''}
											onChange={(e) => {
												const parsedValue = JSON.parse(e.target.value);
												console.log(parsedValue, 'parsed vlaue');
												setData((prev) => ({
													...prev,
													category: parsedValue._id,
												}));
												setSubCategory({
													selectState: e.target.value,
													subCat: parsedValue,
												});
											}}
											label="Sub-category"
										>
											{category.cat.child.subCategories.map((el) => (
												<MenuItem key={el.key} value={JSON.stringify(el)}>
													{el.title}
												</MenuItem>
											))}
										</TextField>
										{formFieldData.length > 0 && (
											<CategoryInputs
												setData={setFormFieldData}
												subCategory={subCategory.subCat}
												handleFormFieldData={handleFormFieldData}
												formFieldData={formFieldData}
											/>
										)}
										<TextField
											select
											size="small"
											label="City"
											required
											value={city.selectState}
											sx={{ minWidth: 85 }}
											onChange={(e) => {
												const parsedValue = JSON.parse(e.target.value);

												setData((prev) => ({
													...prev,
													location: {
														...prev.location,
														city: parsedValue.label,
													},
												}));
												setCity({
													selectState: e.target.value,
													city: JSON.parse(e.target.value),
												});
											}}
										>
											{locations[0].child.map((city) => (
												<MenuItem key={city.label} value={JSON.stringify(city)}>
													{city.label}
												</MenuItem>
											))}
										</TextField>
										{city.city.child && city.city.child.length > 0 && (
											<TextField
												select
												size="small"
												label="District"
												required
												sx={{ minWidth: 85 }}
												value={data.location.district}
												onChange={(e) =>
													setData((prev) => ({
														...prev,
														location: {
															...prev.location,
															district: e.target.value,
														},
													}))
												}
											>
												{city.city.child.map((city) => (
													<MenuItem key={city.label} value={city.label}>
														{city.label}
													</MenuItem>
												))}
											</TextField>
										)}
									</Stack>
									<Box
										sx={{
											py: 1,
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											gap: 0.5,
										}}
									>
										<Button variant="contained" color="error" fullWidth>
											Cancel
										</Button>
										<Button
											type="submit"
											variant="contained"
											color="success"
											fullWidth
										>
											Save
										</Button>
									</Box>
								</Stack>
							</Grid>
							<Grid item xs={12} sm={7}>
								<Stack
									direction={'row'}
									flexWrap="wrap"
									spacing={0}
									sx={{ width: '100%', gap: 0.5 }}
								>
									<TextField
										type="datetime-local"
										label="Show Till"
										sx={{ minWidth: 220 }}
										size="small"
										value={data.showTill}
										onChange={handleData('showTill')}
									/>

									<TextField
										type="text"
										value={new Date().toLocaleDateString()}
										sx={{ width: 120 }}
										size="small"
										label="Create"
										InputProps={{
											readOnly: true,
										}}
									/>
								</Stack>
								<Stack
									direction={'row'}
									flexWrap="wrap"
									spacing={0}
									sx={{ width: '100%', gap: 0.5, py: 1 }}
								>
									<Stack
										direction={'column'}
										spacing={0.5}
										// sx={{ width: '100%' }}
									>
										<Typography variant="caption">Normal</Typography>
										<Stack
											direction={'row'}
											flexWrap="wrap"
											spacing={0}
											sx={{ width: '100%', gap: 0.5 }}
										>
											<TextField
												type="number"
												label="Impression"
												size="small"
												value={128}
												// onChange={handleData('showTill')}
												sx={{ width: 88 }}
											/>

											<TextField
												type="number"
												value={122}
												size="small"
												label="Reach"
												sx={{ width: 88 }}
											/>
											<TextField
												type="number"
												value={122}
												size="small"
												label="Click"
												sx={{ width: 88 }}
											/>
										</Stack>
									</Stack>
									<Stack
										direction={'column'}
										spacing={0.5}
										// sx={{ width: '100%' }}
									>
										<Typography variant="caption">Paid</Typography>
										<Stack
											direction={'row'}
											flexWrap="wrap"
											spacing={0}
											sx={{ width: '100%', gap: 0.5 }}
										>
											<TextField
												type="number"
												label="Impression"
												size="small"
												value={122}
												// onChange={handleData('showTill')}
												sx={{ width: 88 }}
											/>

											<TextField
												type="number"
												value={122}
												size="small"
												label="Reach"
												sx={{ width: 88 }}
											/>
											<TextField
												type="number"
												value={122}
												size="small"
												label="Click"
												sx={{ width: 88 }}
											/>
											<TextField
												type="number"
												value={122}
												size="small"
												label="Slot status"
												sx={{ width: 130 }}
											/>
										</Stack>
									</Stack>
								</Stack>
								<Stack
									direction="row"
									flexWrap={'wrap'}
									spacing={1}
									sx={{ width: '100%', py: 1 }}
								>
									<TextField
										label="Show buttons"
										select
										SelectProps={{
											labelId: 'demo-multiple-chip-label',
											multiple: true,
											renderValue: (selected: string[]) => (
												<Box
													sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
												>
													{selected.map((value) => (
														<Chip key={value} label={value} />
													))}
												</Box>
											),

											MenuProps: { ...MenuProps },
										}}
										sx={{
											minWidth: 180,
										}}
										id="demo-multiple-chip"
										value={data.showButtons}
										required
										onChange={(e) =>
											setData((prev) => {
												return {
													...prev,
													showButtons: [
														...(e.target.value as unknown as string[]),
													],
												};
											})
										}
									>
										{['Report', 'Message', 'Call'].map((name) => (
											<MenuItem
												key={name}
												value={name}
												//   style={getStyles(name, personName, theme)}
											>
												{name}
											</MenuItem>
										))}
									</TextField>
									<TextField
										size="small"
										select
										value={data.productStatus}
										onChange={(e) =>
											setData((prev) => ({
												...prev,
												productStatus: e.target.value,
											}))
										}
										label="Product Status"
										required
										sx={{ width: 120 }}
									>
										{['active', 'review', 'inactive', 'pause'].map((el) => (
											<MenuItem key={el} value={el}>
												{el}
											</MenuItem>
										))}
									</TextField>
								</Stack>
								<UploadImages
									data={photoCollections}
									setData={setPhotoCollections}
								/>
								{photoCollections.photos.length < 1 && (
									<Typography variant="caption" color="error">
										At least one photo is required*
									</Typography>
								)}
							</Grid>
						</Grid>
					</Box>
				</Box>
			</AdminDialog>
		</Fragment>
	);
};

export default CreateProductDialog;
