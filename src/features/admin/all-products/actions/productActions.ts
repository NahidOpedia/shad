import API from '@app/api-getway/API';

export const deleteProduct = async (selectedProductId: string) => {
	if (
		confirm(
			'Are you sure to delete product with id: ' + selectedProductId + ' ?'
		)
	) {
		try {
			const res = await API.delete(`/products/${selectedProductId}`, {
				headers: { 'Content-Type': 'application/json' },
			});
			console.log(res.data);
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
	} else {
		return;
	}
};

interface AddProductArgs {
	valid: (prop: string) => void;
	invalid: (prop: string) => void;
	initialData: any;
	setData?: (prop: any) => void;
	photos: { photos: string[] };
	data: any;
}

export const addProduct = async ({
	valid,
	invalid,
	initialData,
	data,
	setData,
	photos,
}: AddProductArgs) => {
	try {
		valid('');
		invalid('');
		const body = {
			...data,
			photos: photos.photos.map((el) => ({ url: el, accepted: true })),
			user: '628a6c623bb9315a63d4d020',
		};
		const res = await API.post('/products', body, {
			headers: { 'Content-Type': 'application/json' },
		});
		console.log(res.data);
		if (setData && initialData) {
			setData(initialData);
		}
		valid('Product Added Successfully!');
	} catch (error) {
		valid('');
		invalid(error.message);
		console.log(error.response);
	}
};
interface ApprovePhotoArgs {
	valid: (prop: string) => void;
	invalid: (prop: string) => void;
	productId: string;
	photoUrl: string;
}
export const approvePhoto = async ({
	productId,
	valid,
	invalid,
	photoUrl,
}: ApprovePhotoArgs) => {
	if (confirm('Are you sure to approve this photo?')) {
		try {
			valid('');
			invalid('');
			await API.put(
				`/products/${productId}?t=approve-photo`,
				{ url: photoUrl },
				{ headers: { 'Content-Type': 'application/json' } }
			);
			valid('Photo approved!');
			invalid('');
		} catch (error) {
			valid('');
			invalid(error.message);
			console.log(error.response);
		}
	}
};
