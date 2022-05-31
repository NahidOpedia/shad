export interface Columns {
	field: string;
	headerName: string;
	width?: number | string;
	align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
	type?: string;
	lineHeight?: string | number;
	sortable?: boolean;
}

export const columns: Columns[] = [
	// { field: 'checkbox', headerName: 'checkbox' },
	{ field: 'productPicture', headerName: 'Product Picture', width: 243 },
	{ field: 'productId', headerName: 'Product ID', align: 'center', width: 175 },
	{ field: 'category', headerName: 'Category' },
	{
		field: 'location',
		headerName: 'Location',
		type: 'string',
	},
	{
		field: 'postType',
		headerName: 'Post Type',
	},
	{
		field: 'marchent',
		headerName: 'Marchent',
	},
	{
		field: 'price',
		headerName: 'Price',
		type: 'number',
	},
	{
		field: 'reach',
		headerName: 'Reach',
		type: 'number',
	},
	{
		field: 'click',
		headerName: 'Click',
		type: 'number',
	},
	{
		field: 'userType',
		headerName: 'User Type',
	},
	{
		field: 'slotSts',
		headerName: 'Slot sts',
	},
	{
		field: 'verify',
		headerName: 'Verify',
	},

	{
		field: 'productStatus',
		headerName: 'Product Status',
	},
	{
		field: 'report',
		headerName: 'Report',
	},
	{
		field: 'lgnEditby',
		headerName: 'Lgn sen/Edit by',
		width: 107,
		sortable: false,
	},
];
type Picture = {
	url: string;
	accepted?: boolean;
};

export interface Rows {
	id: number;
	productPicture: Picture[];
	location: string;
	postType: string;
	verify: string;
	productId: string;
	category: string;
	marchent: string;
	price: number;
	reach: number;
	click: number;
	userType: string;
	slots: string;
	productStatus: string;
	report: string;
	editBy: string;
	description: string;
}

export const rows: Rows[] = [
	{
		id: 1,
		productId: '4567811548',
		category: 'Sell',
		editBy: 'smahmed',
		click: 100,
		location: 'Dhaka',
		marchent: 'Samsung',
		postType: 'Promotion',
		price: 120,
		productPicture: [
			{ url: '/assets/post-ad.png' },
			{ url: '/assets/premium-cover-pic.jpg' },
			{ url: '/assets/post-ad.png' },
			{ url: '/assets/premium-cover-pic.jpg' },
		],
		productStatus: 'active',
		reach: 2110,
		report: 'no',
		slots: '1/2',
		userType: 'Pro',
		verify: 'Mobile',
		description:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita sapiente ipsum dolor sit amet consectetur adipisicing elit. Expedita sapiente laboriosam reprehenderit pariatur, totam distinctio quisquam, quas aliquam veritatis enim id alias praesentium, ut quibusdam ratione minus eveniet. Unde, neque?',
	},
	{
		id: 2,
		productId: '4567811555',
		category: 'Sell',
		editBy: 'smahmed',
		click: 100,
		location: 'Dhaka',
		marchent: 'Samsung',
		postType: 'Promotion',
		price: 120,
		productPicture: [
			{ url: '/assets/post-ad.png' },
			{ url: '/assets/premium-cover-pic.jpg' },
			{ url: '/assets/post-ad.png' },
			{ url: '/assets/premium-cover-pic.jpg' },
		],
		productStatus: 'active',
		reach: 2110,
		report: 'no',
		slots: '1/2',
		userType: 'Pro',
		verify: 'Mobile',
		description:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita sapiente laboriosam reprehenderit pariatur, totam distinctio quisquam, quas aliquam veritatis enim id alias praesentium, ut quibusdam ratione minus eveniet. Unde, neque?',
	},
];
