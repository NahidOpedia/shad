import { FormControl, MenuItem, TextField } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';

const PostAdInputs = ({ subCategory, setData }) => {
	const [brands, setBrands] = useState(null);
	const [selectedBrand, setSelectedBrand] = useState({
		selectState: '',
		brand: { models: [] },
	});
	const [models, setModels] = useState('');
	const [features, setFeatures] = useState([]);

	useEffect(() => {
		const getBrands = () => {
			if (!subCategory.brands || subCategory.brands.length < 1) {
				return false;
			}
			setBrands(subCategory.brands);
		};
		getBrands();
		return () => setBrands(null);
	}, [subCategory]);
	return (
		<Fragment>
			{brands && (
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
							required
							sx={{ width: 120 }}
							value={selectedBrand.selectState || ''}
							onChange={(e) => {
								const parsedValue = JSON.parse(e.target.value);
								setData((prev) => ({
									...prev,
									brand: parsedValue.title,
								}));
								return setSelectedBrand({
									selectState: e.target.value,
									brand: parsedValue,
								});
							}}
						>
							{brands.map((brand) => (
								<MenuItem key={brand.title} value={JSON.stringify(brand)}>
									{brand.title}
								</MenuItem>
							))}
						</TextField>
					</FormControl>
					{selectedBrand.brand.models && (
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
								disabled={selectedBrand.brand.models.length > 0 ? false : true}
								id="model-select"
								value={models || selectedBrand.brand.models[0]}
								onChange={(e) => {
									setData((prev) => ({
										...prev,
										model: e.target.value,
									}));
									return setModels(e.target.value);
								}}
								label="Model"
							>
								{selectedBrand.brand.models.map((el) => (
									<MenuItem key={el} value={el}>
										{el}
									</MenuItem>
								))}
							</TextField>
						</FormControl>
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

export default PostAdInputs;

{
	/* <FormControl
						sx={{ ...radioFormControlSx, m: 0, pb: 0.5 }}
						component="fieldset"
						variant="standard"
					>
						<FormLabel component="legend">Features (optional)</FormLabel>
						<FormGroup>
							<Grid container spacing={0}>
								{postAdDummyData.features.value.map((feature) => (
									<Grid key={feature.id} item xs={12} sm={6}>
										<FormControlLabel
											control={
												<Checkbox
													checked={data.features.includes(feature.id)}
													onChange={handleData('features', feature.id)}
													name={feature.id}
													sx={{ p: 0.5 }}
												/>
											}
											label={feature.label}
										/>
									</Grid>
								))}
							</Grid>
						</FormGroup>
					</FormControl> */
}
