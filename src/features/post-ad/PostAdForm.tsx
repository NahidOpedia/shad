import {
	ArrowBack,
	DoDisturbOn,
	HelpOutlined,
	Place,
	Verified,
} from '@mui/icons-material';
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	IconButton,
	Input,
	InputLabel,
	MenuItem,
	Paper,
	Radio,
	RadioGroup,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { postAdDummyData } from './post-ad.data';
import { Category, Location, PageState } from './PostAdDialog';
import { AuthContext } from '@app/global-context/AuthContext';
import UploadImages from '@features/shared/post-ad/UploadImages';
import { addProduct } from '@features/admin/all-products/actions/productActions';
import AlertMessage from '@features/shared/alert-message/AlertMessage';

interface Props {
	location: Location;
	category: any;
	handlePageState: (props: string) => void;
}

export const formatData = (array: any[]) => {
	console.log(array, 'array');
	if (!array) return false;
	return array.map((field) => {
		if (field.type === 'multi') {
			return {
				key: field.key,
				label: field.label,
				value: [],
			};
		}
		if (field.type === 'tree') {
			if (field.child_label) {
				return {
					key: field.key,
					label: field.label,
					selectState: '',
					value: {},
					child_value: {
						selectState: '',
						value: {},
					},
					childData: [],
				};
			}
			return {
				key: field.key,
				label: field.label,
				selectState: '',
				value: {},
			};
		}
		if (field.type === 'money') {
			return {
				key: field.key,
				label: field.label,
				value: {
					value: '',
					negotiable: true,
				},
			};
		}
		return {
			key: field.key,
			label: field.label,
			value: '',
		};
	});
};

const PostAdForm = (props: Props) => {
	const { user } = useContext(AuthContext);
	const [valid, setValid] = useState('');
	const [invalid, setInvalid] = useState('');
	const [openAdDialog, setOpenAdDialog] = useState(false);
	const [photo, setPhoto] = useState({
		photos: ['/assets/premium-cover-pic.jpg'],
	});
	const [title, setTitle] = useState('');
	const [hideNumber, setHideNumber] = useState(true);
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [data, setData] = useState<any>(
		formatData(props.category.subCategory.formFields) || {}
	);

	const handleData =
		(props: string, type: string, value?: { key: string; label: string }) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setData((prev) => {
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

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const finalData = {
			title,
			location: props.location,
			category: props.category.subCategory._id,
			features: {
				...data.reduce((obj, el) => ((obj[el.key] = el.value), obj), {}),
			},
		};
		if (photo.photos.length < 1) return;
		console.log(finalData, 'form data', photo);
		await addProduct({
			valid: setValid,
			data: finalData,
			initialData: [],
			invalid: setInvalid,
			photos: photo,
		});
		// setOpenAdDialog(true);
	};

	const radioFormControlSx = {
		borderBottom: 1,
		borderColor: 'text.disabled',
		pb: 1,
		width: '100%',
		'& label': {
			color: 'text.primary',
		},
		'& label, span': {
			fontSize: '0.9rem',
		},
		'& svg': {
			fontSize: '19px',
		},
	};
	const findValue = (key: string) => {
		return data.find((el) => el.key === key).value;
	};

	return (
		<Fragment>
			<AlertMessage
				duration={3000}
				invalid={invalid}
				valid={valid}
				setInvalid={setInvalid}
				setValid={setValid}
			/>
			<IconButton
				onClick={() => props.handlePageState(PageState.locPage)}
				aria-label="close"
				sx={{
					color: '#00000060',
					bgcolor: '#e4e4e4',
					position: 'absolute',
					left: 12,
					top: 10,
					'&:hover': {
						bgcolor: '#e4e4e4',
					},
				}}
			>
				<ArrowBack />
			</IconButton>
			<Stack
				direction="column"
				spacing={1}
				sx={{
					pt: 6,
					px: { xs: 2 },
					pb: 1,
					justifyContent: 'start',
					alignItems: 'center',
					width: '100%',
					height: '100%',
				}}
				component="form"
				onSubmit={handleFormSubmit}
			>
				<Typography
					fontWeight={'bold'}
					align="left"
					sx={{ pl: 1, width: '100%' }}
				>
					Fill in the details
				</Typography>

				<Stack
					direction={'row'}
					justifyContent="space-between"
					sx={{
						flexWrap: { xs: 'wrap', sm: 'nowrap' },
						borderBottom: 1,
						width: '100%',
						pt: 0,
						px: 1,
						pb: 0.5,
						mt: '0px!important',
						borderColor: 'text.disabled',
					}}
					spacing={0}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-start',
							gap: 0.5,
						}}
					>
						<Place sx={{ fontSize: 15 }} />
						<Typography>{props.location.district}</Typography>
						<Button
							sx={{ fontSize: 15 }}
							onClick={() => props.handlePageState(PageState.locPage)}
						>
							Change
						</Button>
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-start',
							gap: 0.5,
						}}
					>
						<LocalOfferIcon sx={{ fontSize: 15 }} />
						<Typography>{props.category.subCategory.title}</Typography>
						<Button
							sx={{ fontSize: 15 }}
							onClick={() => props.handlePageState(PageState.catPage)}
						>
							Change
						</Button>
					</Box>
				</Stack>

				<Box sx={{ width: '100%', textAlign: 'right' }}>
					See our posting rules
				</Box>
				<Stack
					direction="column"
					sx={{
						width: '100%',
						p: 1,
						justifyContent: 'flex-start',
					}}
					spacing={1}
				>
					<FormControl
						sx={{
							m: 0,
							borderBottom: 1,
							borderColor: 'text.disabled',
							width: '100%',
							py: 1,
						}}
					>
						<TextField
							required
							label="Product Title"
							value={title}
							placeholder={'Write a title for your product...'}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</FormControl>
					{props.category.subCategory.formFields?.map((field) => (
						<Fragment key={field.label}>
							{/* 
                               enum

                             */}
							{field.type === 'enum' && (
								<FormControl sx={{ ...radioFormControlSx, pb: 0.5 }}>
									<FormLabel id="product-conditions">{field.label}</FormLabel>
									<RadioGroup
										row
										aria-labelledby="product-conditions-label"
										name="product-conditions-group"
									>
										{field.values.map((value) => (
											<FormControlLabel
												key={value.key}
												value={value.key}
												onChange={handleData(field.key, field.type)}
												control={
													<Radio
														placeholder={value.tooltip}
														required={field.required}
													/>
												}
												label={value.label}
											/>
										))}

										{data.homeDelivery === 'YES' && (
											<TextField
												type={'text'}
												label="Delivery charge"
												size="small"
											/>
										)}
									</RadioGroup>
								</FormControl>
							)}
							{field.type === 'tree' && (
								<Fragment>
									<FormControl
										variant="standard"
										sx={{
											borderBottom: 1,
											borderColor: 'text.disabled',
											m: 0,
											minWidth: 120,
											py: 1,
										}}
									>
										<TextField
											size="small"
											select
											id="brand-select"
											label="Brand"
											required={field.required}
											sx={{ width: 120 }}
											value={findValue(field.key).selectState || ''}
											onChange={handleData(field.key, field.type)}
										>
											{field.values.map((value) => (
												<MenuItem key={value.key} value={JSON.stringify(value)}>
													{value.label}
												</MenuItem>
											))}
										</TextField>
									</FormControl>
									{field.child_label && (
										<FormControl
											variant="standard"
											sx={{
												borderBottom: 1,
												borderColor: 'text.disabled',
												m: 0,
												minWidth: 120,
												width: '100%',
												py: 1,
											}}
										>
											<TextField
												sx={{ width: 120 }}
												size="small"
												select
												required
												disabled={findValue(field.key).key ? false : true}
												id="model-select"
												value={
													data.find((e) => e.key === field.key).child_value
														.selectState || ''
												}
												onChange={(e) => {
													setData((prev) => {
														const parsed = JSON.parse(e.target.value);
														const elem = prev.find(
															(el) => el.key === field.key
														);
														elem.child_value.value = parsed;
														elem.child_value.selectState = e.target.value;
														return [...prev];
													});
												}}
												label={field.child_label}
											>
												{data.find((e) => e.key === field.key).childData
													.length > 0 ? (
													data
														.find((e) => e.key === field.key)
														.childData.map((el) => (
															<MenuItem key={el.key} value={JSON.stringify(el)}>
																{el.label}
															</MenuItem>
														))
												) : (
													<MenuItem>{''}</MenuItem>
												)}
											</TextField>
										</FormControl>
									)}
								</Fragment>
							)}
							{field.type === 'text' && (
								<FormControl
									sx={{
										m: 0,
										borderBottom: 1,
										borderColor: 'text.disabled',
										width: '100%',
										py: 1,
									}}
								>
									<TextField
										required={field.required}
										label={field.label}
										id={field.key}
										value={findValue(field.key)}
										placeholder={field.tooltip}
										onChange={handleData(field.key, field.type)}
									/>
								</FormControl>
							)}
							{field.type === 'multi' && (
								<FormControl
									sx={{ ...radioFormControlSx, m: 0, pb: 0.5 }}
									component="fieldset"
									variant="standard"
								>
									<FormLabel component="legend">{`${field.label} ${
										!field.required && '(optional)'
									}`}</FormLabel>
									<FormGroup>
										<Grid container spacing={0}>
											{field.values.map((value) => (
												<Grid key={value.key} item xs={12} sm={6}>
													<FormControlLabel
														control={
															<Checkbox
																checked={findValue(field.key).find(
																	(k) => k.key === value.key
																)}
																onChange={handleData(
																	field.key,
																	field.type,
																	value
																)}
																name={value.key}
																sx={{ p: 0.5 }}
															/>
														}
														label={value.label}
													/>
												</Grid>
											))}
										</Grid>
									</FormGroup>
								</FormControl>
							)}
							{field.type === 'description' && (
								<FormControl
									sx={{
										m: 0,
										borderBottom: 1,
										borderColor: 'text.disabled',
										width: '100%',
										py: 1,
									}}
									component="fieldset"
									variant="standard"
								>
									<TextField
										required
										// error={!data.description ? true : false}
										helperText={'Please provide product description.'}
										multiline
										minRows={3}
										placeholder={field.tooltip}
										label={field.label}
										value={findValue(field.key)}
										onChange={handleData(field.key, field.type)}
									/>
								</FormControl>
							)}
							{field.type === 'money' && (
								<FormControl
									sx={{
										m: 0,
										borderBottom: 1,
										borderColor: 'text.disabled',
										width: '100%',
										py: 1,
									}}
									component="fieldset"
									variant="standard"
								>
									<TextField
										sx={{ width: 200 }}
										label={`${field.label} (${field.data.currency})`}
										required={field.required}
										type={'number'}
										placeholder={field.tooltip}
										id="component-simple"
										value={findValue(field.key).value}
										onChange={handleData(field.key, field.type)}
									/>
									<FormControl
										sx={{
											m: 0,

											width: '100%',
											py: 1,
										}}
										component="fieldset"
										variant="standard"
									>
										<FormControlLabel
											control={
												<Checkbox
													checked={findValue(field.key).negotiable}
													onChange={handleData(field.key, field.type, {
														key: 'negotiable',
														label: 'Negotiable',
													})}
													name="negotiable"
													sx={{ p: 0.5 }}
												/>
											}
											label="Negotiable"
										/>
									</FormControl>
								</FormControl>
							)}
						</Fragment>
					))}

					{/* <PostAdInputs
						subCategory={props.category.subCategory}
						setData={setData}
					/> */}

					<Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>
						Add up to 5 photos {<HelpOutlined sx={{ fontSize: 13 }} />}
					</Typography>
					<UploadImages data={photo} setData={setPhoto} />
					{photo.photos.length < 1 && (
						<Typography variant="caption" color="error">
							At least one photo is required *
						</Typography>
					)}

					<Typography fontWeight={'bold'}>Contact Details</Typography>
					<Box
						sx={{
							m: 0,
							display: 'flex',
							flexDirection: 'column',
							gap: 0,
							my: 1,
						}}
					>
						<FormLabel sx={{ color: 'text.primary' }}>Name</FormLabel>

						<Typography sx={{ fontSize: 18, fontWeight: 500 }}>
							{user.name}
						</Typography>
					</Box>
					<Box
						sx={{
							m: 0,
							display: 'flex',
							flexDirection: 'column',
							gap: 0.5,
							my: 1,
						}}
					>
						<FormLabel sx={{ color: 'text.primary' }}>Email</FormLabel>
						<Typography sx={{ fontSize: 18, fontWeight: 500 }}>
							{user.email?.address}
						</Typography>
					</Box>

					<Box
						sx={{
							px: 1,
							border: 1,
							borderColor: 'text.disabled',
							bgcolor: '#fff',
						}}
					>
						<Typography variant="subtitle1" sx={{ p: 1 }}>
							Phone number {<HelpOutlined sx={{ fontSize: 13 }} />}
						</Typography>
						<Stack
							direction="row"
							spacing={1}
							alignItems="center"
							sx={{ p: 1, borderBottom: 1, borderColor: 'text.disabled' }}
						>
							<Verified color="primary" sx={{ fontSize: 16 }} />
							<Typography variant="subtitle1">01234579845</Typography>
							<DoDisturbOn sx={{ color: 'error.main', fontSize: 16 }} />
						</Stack>
						<Stack direction="row" spacing={0.5} sx={{ p: 1 }}>
							<TextField
								label="Add Phone number"
								type="number"
								error={false}
								helperText={'Please provide a valid phone number!'}
								size="small"
							/>
							<Button
								size="small"
								variant="outlined"
								sx={{
									borderColor: 'text.primary',
									color: 'text.primary',
									height: 38,
									width: 52,
								}}
							>
								Add
							</Button>
						</Stack>
						<FormControl
							sx={{ m: 0, pl: 1 }}
							component="fieldset"
							variant="standard"
						>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											required
											checked={hideNumber}
											onChange={() => setHideNumber(!hideNumber)}
											name="accept terms"
											sx={{ '& svg': { fontSize: 19 } }}
										/>
									}
									label="Hide Number(s)"
								/>
							</FormGroup>
						</FormControl>
					</Box>

					<Button
						fullWidth
						variant="contained"
						type="submit"
						sx={{ color: '#fff' }}
					>
						Post Ad
					</Button>

					<FormControl
						sx={{ m: 0, px: 1 }}
						component="fieldset"
						variant="standard"
					>
						<FormGroup>
							<FormControlLabel
								sx={{ '& span': { fontSize: 14 } }}
								control={
									<Checkbox
										required
										checked={acceptedTerms}
										onChange={() => setAcceptedTerms(!acceptedTerms)}
										name="accept terms"
										sx={{ p: 0.5, pl: 1, '& svg': { fontSize: 19 } }}
									/>
								}
								label="I have read and agreed to Terms and conditions"
							/>
						</FormGroup>
					</FormControl>
				</Stack>
			</Stack>
			{/* <AdDialog
				data={{
					...data,
					city: props.location.city,
					category: props.category.subCategory.title,
				}}
				open={openAdDialog}
				close={() => setOpenAdDialog(false)}
			/> */}
		</Fragment>
	);
};

export default PostAdForm;
