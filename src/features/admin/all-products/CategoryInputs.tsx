import {
	Box,
	Checkbox,
	Chip,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	MenuItem,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';

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

const CategoryInputs = ({
	subCategory,
	setData,
	handleFormFieldData,
	formFieldData,
}) => {
	const findValue = (key: string) => {
		return formFieldData.find((el) => el.key === key).value;
	};

	return (
		<Fragment>
			{subCategory.formFields?.map((field) => (
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
										onChange={handleFormFieldData(field.key, field.type)}
										control={
											<Radio
												placeholder={value.tooltip}
												required={field.required}
											/>
										}
										label={value.label}
									/>
								))}

								{formFieldData.homeDelivery === 'YES' && (
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
									onChange={handleFormFieldData(field.key, field.type)}
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
											formFieldData.find((e) => e.key === field.key).child_value
												.selectState || ''
										}
										onChange={(e) => {
											setData((prev) => {
												const parsed = JSON.parse(e.target.value);
												const elem = prev.find((el) => el.key === field.key);
												elem.child_value.value = parsed;
												elem.child_value.selectState = e.target.value;
												return [...prev];
											});
										}}
										label={field.child_label}
									>
										{formFieldData.find((e) => e.key === field.key).childData
											.length > 0 ? (
											formFieldData
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
								onChange={handleFormFieldData(field.key, field.type)}
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
														onChange={handleFormFieldData(
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
								onChange={handleFormFieldData(field.key, field.type)}
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
								value={findValue(field.key).price}
								onChange={handleFormFieldData(field.key, field.type)}
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
											onChange={handleFormFieldData(field.key, field.type, {
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
		</Fragment>
	);
};

export default CategoryInputs;
