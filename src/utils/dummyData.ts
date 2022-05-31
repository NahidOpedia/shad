import CheckroomIcon from '@mui/icons-material/Checkroom';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
export const categoriesOld = [
	{
		label: 'Mobiles',
		child: [
			{
				label: 'Mobile Phones',
			},
			{
				label: 'Wearable',
			},
			{
				label: 'SIM Cards',
			},
		],
	},
	{
		label: 'Electronics',
		child: [
			{
				label: 'Desktop',
			},
			{
				label: 'Laptops',
			},
			{
				label: 'TVs',
			},
		],
	},
	{
		label: 'Vehicles',
		child: [
			{
				label: 'Cars',
			},
			{
				label: 'Motobikes',
			},
			{
				label: 'Bicycles',
			},
		],
	},
];
export const cities = [
	{
		label: 'Dhaka',
		districts: [
			{
				label: 'Mirpur',
			},
			{
				label: 'Uttara',
			},
			{
				label: 'Savar',
			},
		],
	},
	{
		label: 'Sylhet',
		districts: [
			{
				label: 'Sunamgonj',
			},
			{
				label: 'Hobigonj',
			},
			{
				label: 'Sylhet Sadar',
			},
		],
	},
	{
		label: 'Khulna',
		districts: [
			{
				label: 'Khulna Sadar',
			},
			{
				label: 'Kalishpur',
			},
			{
				label: 'Boyra Bazar',
			},
		],
	},
];

export const categories = [
	{
		label: 'Sell',
		child: [
			{
				label: 'Electronics',
				icon: DirectionsCarFilledIcon,
				count: 1235,
			},
			{
				label: 'Mobiles',
				icon: PhoneAndroidIcon,
				count: 1235,
			},
			{
				label: 'Home and Livings',
				icon: CheckroomIcon,
				count: 1235,
				child: [
					{
						label: 'Vehicles',
						icon: DirectionsCarFilledIcon,
						count: 1235,
					},
					{
						label: 'Property',
						icon: DirectionsCarFilledIcon,
						count: 1235,
					},
					{
						label: 'Pets & Animals',
						icon: DirectionsCarFilledIcon,
						count: 1235,
					},
				],
			},
			{
				label: 'Education',
				icon: DirectionsCarFilledIcon,
				count: 1235,
			},
			{
				label: 'Essentials',
				icon: DirectionsCarFilledIcon,
				count: 1235,
			},
		],
	},
	{
		label: 'Rent',
		icon: DirectionsCarFilledIcon,
		count: 1235,
	},
	{
		label: 'Jobs',
		icon: DirectionsCarFilledIcon,
		count: 1235,
	},
	{
		label: 'Offer',
		icon: DirectionsCarFilledIcon,
		count: 1235,
	},
	{
		label: 'Bid',
		icon: DirectionsCarFilledIcon,
		count: 1235,
	},
	{
		label: 'Buy',
		icon: DirectionsCarFilledIcon,
		count: 1235,
	},
];

export const locations = [
	{
		label: 'All of Bangladesh',
		child: [
			{
				label: 'Dhaka',
				count: 1235,
				child: [
					{
						label: 'Malibag',
						icon: DirectionsCarFilledIcon,
						count: 1235,
					},
					{
						label: 'Rampura',
						icon: DirectionsCarFilledIcon,
						count: 1235,
					},
					{
						label: 'Gulshan',
						icon: DirectionsCarFilledIcon,
						count: 1235,
					},
				],
			},
			{
				label: 'Chattogram',
				icon: PhoneAndroidIcon,
				count: 1235,
			},
			{
				label: 'Dhaka Division',
				icon: CheckroomIcon,
				count: 1235,
			},
		],
	},
];
type AdminPage = {
	label: string;
	link: string;
	child?: AdminPage[];
};

export const adminPages: AdminPage[] = [
	{
		label: 'Dashboard',
		link: '/admin',
	},
	{
		label: 'All Products',
		link: '/admin/all-products',
	},
	{
		label: 'All Orders',
		link: '/admin/all-orders',
	},
	{
		label: 'Loans',
		link: '/admin/loans',
		child: [
			{
				label: 'All Loans',
				link: '/admin/loans/all-loans',
			},
			{
				label: 'Loan Requests',
				link: '/admin/loans/requests',
			},
		],
	},
	{
		label: 'Transactions',
		link: '/admin/transactions',
	},
	{
		label: 'Stuffing',
		link: '/admin/stuffing',
	},
	{
		label: 'Reports',
		link: '/admin/reports',
	},
	{
		label: 'Blog',
		link: '/admin/blog',
	},
	{
		label: 'Settings',
		link: '/admin/settings',
	},
];

export const parents: string[] = [
	'Sell',
	'Rent',
	'Job',
	'Offer',
	'Buy',
	'Promotion',
];

export const postAdFields = [
	{
		key: 'item_type',
		type: 'enum',
		data: {},
		label: 'Bike type',
		tooltip: 'What is the type of your motorbike?',
		required: true,
		values: [
			{
				key: 'motorcycle',
				label: 'Motorcycle',
			},
			{
				key: 'e_bikes',
				label: 'E-bikes',
			},
			{
				key: 'scooters',
				label: 'Scooters',
			},
		],
	},
	{
		key: 'condition',
		type: 'enum',
		data: {},
		label: 'Condition',
		tooltip: 'What is the condition of your motorbike?',
		required: true,
		values: [
			{
				key: 'new',
				label: 'New',
				tooltip: 'Select only if the motorbike is brand new or unregistered.',
			},
			{
				key: 'used',
				label: 'Used',
				tooltip:
					'Select only if the motorbike has been used before and is currently unregistered.',
			},
		],
	},
	{
		key: 'brand',
		type: 'tree',
		data: {},
		label: 'Brand',
		tooltip: 'Select the brand of your motorbike.',
		required: true,
		values: [
			{
				key: 'akij',
				label: 'Akij',
			},
			{
				key: 'alliance',
				label: 'Alliance',
			},
			{
				key: 'aprilia',
				label: 'Aprilia',
			},
			{
				key: 'auge',
				label: 'Auge',
			},
			{
				key: 'bajaj',
				label: 'Bajaj',
			},
			{
				key: 'beetle-bolt',
				label: 'Beetle Bolt',
			},
			{
				key: 'benelli',
				label: 'Benelli',
			},
			{
				key: 'bennett',
				label: 'Bennett',
			},
			{
				key: 'bir',
				label: 'Bir',
			},
			{
				key: 'bmw',
				label: 'BMW',
			},
			{
				key: 'butterfly',
				label: 'Butterfly',
			},
			{
				key: 'cafe-racer',
				label: 'Cafe Racer',
			},
			{
				key: 'cz',
				label: 'CZ',
			},
			{
				key: 'daelim',
				label: 'Daelim',
			},
			{
				key: 'dayang-runner',
				label: 'Dayang Runner',
			},
			{
				key: 'dayang',
				label: 'Dayang',
			},
			{
				key: 'dayun',
				label: 'Dayun',
			},
			{
				key: 'demak',
				label: 'Demak',
			},
			{
				key: 'ducati',
				label: 'Ducati',
			},
			{
				key: 'emma',
				label: 'Emma',
			},
			{
				key: 'exploit',
				label: 'Exploit',
			},
			{
				key: 'fkm',
				label: 'FKM',
			},
			{
				key: 'frantic',
				label: 'Frantic',
			},
			{
				key: 'freedom-runner',
				label: 'Freedom Runner',
			},
			{
				key: 'freedom',
				label: 'Freedom',
			},
			{
				key: 'goodwheel',
				label: 'Goodwheel',
			},
			{
				key: 'gpx',
				label: 'GPX',
			},
			{
				key: 'grameen-motors',
				label: 'Grameen Motors',
			},
			{
				key: 'green-tiger',
				label: 'Green Tiger',
			},
			{
				key: 'h-power',
				label: 'H Power',
			},
			{
				key: 'haojin',
				label: 'Haojin',
			},
			{
				key: 'haojue',
				label: 'Haojue',
			},
			{
				key: 'harley-davidson',
				label: 'Harley-Davidson',
			},
			{
				key: 'hero',
				label: 'Hero',
			},
			{
				key: 'honda',
				label: 'Honda',
			},
			{
				key: 'hundai',
				label: 'Hundai',
			},
			{
				key: 'hyosung',
				label: 'Hyosung',
			},
			{
				key: 'intraco',
				label: 'Intraco',
			},
			{
				key: 'italjet',
				label: 'Italjet',
			},
			{
				key: 'jamuna',
				label: 'Jamuna',
			},
			{
				key: 'jb',
				label: 'JB',
			},
			{
				key: 'jialing',
				label: 'Jialing',
			},
			{
				key: 'karino',
				label: 'Karino',
			},
			{
				key: 'kawasaki',
				label: 'Kawasaki',
			},
			{
				key: 'keeway',
				label: 'Keeway',
			},
			{
				key: 'kenbo',
				label: 'Kenbo',
			},
			{
				key: 'kinbo',
				label: 'Kinbo',
			},
			{
				key: 'kinetic',
				label: 'Kinetic',
			},
			{
				key: 'kinlon',
				label: 'Kinlon',
			},
			{
				key: 'ktm',
				label: 'KTM',
			},
			{
				key: 'lexmoto',
				label: 'Lexmoto',
			},
			{
				key: 'lifan',
				label: 'Lifan',
			},
			{
				key: 'lml',
				label: 'LML',
			},
			{
				key: 'loncin',
				label: 'Loncin',
			},
			{
				key: 'mahindra',
				label: 'Mahindra',
			},
			{
				key: 'marcel',
				label: 'Marcel',
			},
			{
				key: 'max-chopper',
				label: 'Max Chopper',
			},
			{
				key: 'maxton',
				label: 'Maxton',
			},
			{
				key: 'meghelli',
				label: 'Megelli',
			},
			{
				key: 'meiduo',
				label: 'Meiduo',
			},
			{
				key: 'motrac',
				label: 'Motrac',
			},
			{
				key: 'mychoice',
				label: 'MyChoice',
			},
			{
				key: 'omoto',
				label: 'Omoto',
			},
			{
				key: 'pegasus',
				label: 'Pegasus',
			},
			{
				key: 'php',
				label: 'PHP',
			},
			{
				key: 'piaggio',
				label: 'Piaggio',
			},
			{
				key: 'porag',
				label: 'Porag',
			},
			{
				key: 'power-ninja',
				label: 'Power Ninja',
			},
			{
				key: 'power',
				label: 'Power',
			},
			{
				key: 'qjiang',
				label: 'QJiang',
			},
			{
				key: 'race-bangladesh',
				label: 'Race',
			},
			{
				key: 'regal-raptor',
				label: 'Regal Raptor',
			},
			{
				key: 'roadmaster',
				label: 'Roadmaster',
			},
			{
				key: 'runner',
				label: 'Runner',
			},
			{
				key: 'rusi',
				label: 'Rusi',
			},
			{
				key: 'singer',
				label: 'Singer',
			},
			{
				key: 'sinski',
				label: 'Sinski',
			},
			{
				key: 'starway',
				label: 'Starway',
			},
			{
				key: 'sunsuki',
				label: 'Sunsuki',
			},
			{
				key: 'suzuki',
				label: 'Suzuki',
			},
			{
				key: 'sym',
				label: 'SYM',
			},
			{
				key: 'taro',
				label: 'Taro',
			},
			{
				key: 'tvs',
				label: 'TVS',
			},
			{
				key: 'um',
				label: 'UM',
			},
			{
				key: 'vespa',
				label: 'Vespa',
			},
			{
				key: 'victor-r',
				label: 'Victor-R',
			},
			{
				key: 'walton',
				label: 'Walton',
			},
			{
				key: 'wuyung',
				label: 'Wuyung',
			},
			{
				key: 'xingfu',
				label: 'Xingfu',
			},
			{
				key: 'yamaha',
				label: 'Yamaha',
			},
			{
				key: 'yume-japan',
				label: 'Yume Japan',
			},
			{
				key: 'zaara',
				label: 'Zaara',
			},
			{
				key: 'znen',
				label: 'ZNEN',
			},
			{
				key: 'zongshen',
				label: 'Zongshen',
			},
			{
				key: 'other',
				label: 'Other brand',
			},
		],
		child_label: 'Model',
		child_data: {},
		child_key: 'model',
		child_tooltip: 'Select the model of your motorbike.',
	},
	{
		key: 'edition',
		type: 'text',
		data: {},
		label: 'Trim / Edition',
		tooltip: 'What is the trim/edition of your motorbike?',
		required: false,
		minimum_length: 1,
		maximum_length: 20,
	},
	{
		key: 'model_year',
		type: 'year',
		data: {},
		label: 'Year of Manufacture',
		tooltip: 'When was your motorbike manufactured?',
		required: true,
		minimum: 1923,
		maximum: 2023,
	},
	{
		key: 'mileage',
		type: 'measurement',
		data: {
			unit: 'km',
		},
		label: 'Kilometers run',
		tooltip: 'What is the mileage of your motorbike?',
		required: true,
		units: [
			{
				key: 'km',
				label: 'km',
			},
		],
		minimum: 0,
		maximum: 1000000,
		decimal_places: 0,
	},
	{
		key: 'engine_capacity',
		type: 'measurement',
		data: {
			unit: 'cc',
		},
		label: 'Engine capacity',
		tooltip: 'What is the engine capacity of your motorbike?',
		required: true,
		units: [
			{
				key: 'cc',
				label: 'cc',
			},
		],
		minimum: 1,
		maximum: 10000,
		decimal_places: 0,
	},
	{
		key: 'description',
		type: 'description',
		data: {},
		label: 'Description',
		tooltip: 'More details = more interested buyers!',
		required: true,
		minimum_length: 10,
		maximum_length: 5000,
	},
	{
		key: 'price',
		type: 'money',
		data: {
			currency: 'BDT',
		},
		label: 'Price',
		tooltip: 'Pick a good price - what would you pay?',
		required: true,
		currencies: [
			{
				key: 'BDT',
				code: 'BDT',
				label: 'Tk',
			},
		],
		units: [],
		negotiable: 'Negotiable',
		minimum: 0,
		maximum: 9999999999999,
	},
];

export const formFields = [
	{
		key: 'condition',
		type: 'enum',
		data: {
			value: 'used',
		},
		label: 'Condition',
		tooltip: 'Choose the condition of the phone.',
		required: true,
		values: [
			{
				key: 'used',
				label: 'Used',
				tooltip: 'Select only if your phone has been used before.',
			},
			{
				key: 'new',
				label: 'New',
				tooltip: 'Select only if your phone is new and never used before.',
			},
		],
	},
	{
		key: 'authenticity',
		type: 'enum',
		data: {},
		label: 'Authenticity',
		tooltip: 'Choose the authenticity of the phone.',
		required: true,
		values: [
			{
				key: 'original',
				label: 'Original',
			},
			{
				key: 'refurbished',
				label: 'Refurbished',
			},
		],
	},
	{
		key: 'brand',
		type: 'tree',
		data: {},
		label: 'Brand',
		tooltip: 'Select the brand of your phone.',
		required: true,
		values: [
			{
				key: 'aamra',
				label: 'Aamra',
			},
			{
				key: 'acer',
				label: 'Acer',
			},
			{
				key: 'aeku',
				label: 'AEKU',
			},
			{
				key: 'aiek',
				label: 'Aiek',
			},
			{
				key: 'airmax',
				label: 'Airmax',
			},
			{
				key: 'alcatel',
				label: 'Alcatel',
			},
			{
				key: 'allview',
				label: 'Allview',
			},
			{
				key: 'amoi',
				label: 'AMOI',
			},
			{
				key: 'apple',
				label: 'Apple',
			},
			{
				key: 'archos',
				label: 'Archos',
			},
			{
				key: 'asus',
				label: 'Asus',
			},
			{
				key: 'benq',
				label: 'BenQ',
			},
			{
				key: 'blackberry',
				label: 'Blackberry',
			},
			{
				key: 'blu',
				label: 'BLU',
			},
			{
				key: 'by2',
				label: 'By 2',
			},
			{
				key: 'celkon',
				label: 'Celkon',
			},
			{
				key: 'china-mobile',
				label: 'China Mobile',
			},
			{
				key: 'coolpad',
				label: 'Coolpad',
			},
			{
				key: 'dell',
				label: 'Dell',
			},
			{
				key: 'digo',
				label: 'Digo',
			},
			{
				key: 'doogee',
				label: 'Doogee',
			},
			{
				key: 'elite',
				label: 'Elite',
			},
			{
				key: 'five-star',
				label: '5 Star',
			},
			{
				key: 'g-five',
				label: 'G Five',
			},
			{
				key: 'gigabyte',
				label: 'Gigabyte',
			},
			{
				key: 'gionee',
				label: 'Gionee',
			},
			{
				key: 'goldberg',
				label: 'Goldberg',
			},
			{
				key: 'google',
				label: 'Google',
			},
			{
				key: 'gphone',
				label: 'Gphone',
			},
			{
				key: 'grameenphone',
				label: 'Grameenphone',
			},
			{
				key: 'haier',
				label: 'Haier',
			},
			{
				key: 'helio',
				label: 'Helio',
			},
			{
				key: 'himax',
				label: 'Himax',
			},
			{
				key: 'hisense',
				label: 'Hisense',
			},
			{
				key: 'honor',
				label: 'Honor',
			},
			{
				key: 'hotwav',
				label: 'Hotwav',
			},
			{
				key: 'htc',
				label: 'HTC',
			},
			{
				key: 'huawei',
				label: 'Huawei',
			},
			{
				key: 'imam',
				label: 'Imam',
			},
			{
				key: 'imax',
				label: 'Imax',
			},
			{
				key: 'infinix',
				label: 'Infinix',
			},
			{
				key: 'innjoo',
				label: 'Innjoo',
			},
			{
				key: 'intex',
				label: 'Intex',
			},
			{
				key: 'invens',
				label: 'Invens',
			},
			{
				key: 'itel',
				label: 'Itel',
			},
			{
				key: 'jio',
				label: 'Jio',
			},
			{
				key: 'karbonn',
				label: 'Karbonn',
			},
			{
				key: 'kechaoda',
				label: 'Kechaoda',
			},
			{
				key: 'kingstar',
				label: 'Kingstar',
			},
			{
				key: 'lava',
				label: 'Lava',
			},
			{
				key: 'leeco',
				label: 'LeEco',
			},
			{
				key: 'lemon',
				label: 'Lemon',
			},
			{
				key: 'lenovo',
				label: 'Lenovo',
			},
			{
				key: 'lephone',
				label: 'Lephone',
			},
			{
				key: 'letv',
				label: 'Letv',
			},
			{
				key: 'lg',
				label: 'LG',
			},
			{
				key: 'linnex',
				label: 'Linnex',
			},
			{
				key: 'lite-tel',
				label: 'LiteTel',
			},
			{
				key: 'mango',
				label: 'Mango',
			},
			{
				key: 'maximum',
				label: 'Maximum',
			},
			{
				key: 'maximus',
				label: 'Maximus',
			},
			{
				key: 'meizu',
				label: 'Meizu',
			},
			{
				key: 'microsoft',
				label: 'Microsoft',
			},
			{
				key: 'micromax',
				label: 'Micromax',
			},
			{
				key: 'mode',
				label: 'Mode',
			},
			{
				key: 'motorola',
				label: 'Motorola',
			},
			{
				key: 'mycell',
				label: 'MyCell',
			},
			{
				key: 'nokia',
				label: 'Nokia',
			},
			{
				key: 'octenn',
				label: 'Octenn',
			},
			{
				key: 'okapia',
				label: 'Okapia',
			},
			{
				key: 'one-plus',
				label: 'OnePlus',
			},
			{
				key: 'oppo',
				label: 'OPPO',
			},
			{
				key: 'orange',
				label: 'Orange',
			},
			{
				key: 'panasonic',
				label: 'Panasonic',
			},
			{
				key: 'peace',
				label: 'Peace',
			},
			{
				key: 'prestigio',
				label: 'Prestigio',
			},
			{
				key: 'q-mobile',
				label: 'Q Mobile',
			},
			{
				key: 'rangs',
				label: 'Rangs',
			},
			{
				key: 'realme',
				label: 'Realme',
			},
			{
				key: 'rn',
				label: 'R.N',
			},
			{
				key: 's-mobile',
				label: 'S Mobile',
			},
			{
				key: 'samsung',
				label: 'Samsung',
			},
			{
				key: 'siemens',
				label: 'Siemens',
			},
			{
				key: 'sky',
				label: 'Sky',
			},
			{
				key: 'smart',
				label: 'Smart',
			},
			{
				key: 'smile',
				label: 'Smile',
			},
			{
				key: 'sony-ericsson',
				label: 'Sony Ericsson',
			},
			{
				key: 'sony',
				label: 'Sony',
			},
			{
				key: 'spice',
				label: 'Spice',
			},
			{
				key: 'sports',
				label: 'Sports',
			},
			{
				key: 'sprint',
				label: 'Sprint',
			},
			{
				key: 'strawberry',
				label: 'Strawberry',
			},
			{
				key: 'stylus',
				label: 'Stylus',
			},
			{
				key: 'symphony',
				label: 'Symphony',
			},
			{
				key: 'tecno',
				label: 'Tecno',
			},
			{
				key: 'tinmo',
				label: 'Tinmo',
			},
			{
				key: 'titanic',
				label: 'Titanic',
			},
			{
				key: 'tornado',
				label: 'Tornado',
			},
			{
				key: 'umi',
				label: 'UMI',
			},
			{
				key: 'umidigi',
				label: 'Umidigi',
			},
			{
				key: 'venus',
				label: 'Venus',
			},
			{
				key: 'vivo',
				label: 'Vivo',
			},
			{
				key: 'vmax',
				label: 'VMAX',
			},
			{
				key: 'vodafone',
				label: 'Vodafone',
			},
			{
				key: 'walton',
				label: 'Walton',
			},
			{
				key: 'we',
				label: 'WE',
			},
			{
				key: 'western',
				label: 'Western',
			},
			{
				key: 'wiko',
				label: 'Wiko',
			},
			{
				key: 'winmax',
				label: 'Winmax',
			},
			{
				key: 'winstar',
				label: 'Winstar',
			},
			{
				key: 'xiaomi',
				label: 'Xiaomi',
			},
			{
				key: 'xolo',
				label: 'XOLO',
			},
			{
				key: 'zelta',
				label: 'Zelta',
			},
			{
				key: 'zte',
				label: 'ZTE',
			},
			{
				key: 'other',
				label: 'Other Brand',
			},
		],
		child_label: 'Model',
		child_data: {},
		child_key: 'model',
		child_tooltip: 'Select the model of your phone.',
	},
	{
		key: 'edition',
		type: 'text',
		data: {},
		label: 'Edition',
		tooltip: 'Enter the edition of your phone.',
		required: false,
		minimum_length: 1,
		maximum_length: 20,
	},
	{
		key: 'features',
		type: 'multi',
		data: {},
		label: 'Features',
		tooltip: 'Select the features that your phone have.',
		required: false,
		values: [
			{
				key: 'bluetooth',
				label: 'Bluetooth',
			},
			{
				key: 'camera',
				label: 'Camera',
			},
			{
				key: 'dual-lens-camera',
				label: 'Dual-Lens Camera',
			},
			{
				key: 'dual_sim',
				label: 'Dual SIM',
			},
			{
				key: 'expandable-memory',
				label: 'Expandable Memory',
			},
			{
				key: 'fingerprint-sensor',
				label: 'Fingerprint Sensor',
			},
			{
				key: 'gps',
				label: 'GPS',
			},
			{
				key: 'keyboard',
				label: 'Physical keyboard',
			},
			{
				key: 'motion-sensors',
				label: 'Motion Sensors',
			},
			{
				key: 'network-3g',
				label: '3G',
			},
			{
				key: 'network-4g',
				label: '4G',
			},
			{
				key: 'network-5g',
				label: '5G',
			},
			{
				key: 'network-gsm',
				label: 'GSM',
			},
			{
				key: 'touch',
				label: 'Touch screen',
			},
		],
	},
	{
		key: 'description',
		type: 'description',
		data: {},
		label: 'Description',
		tooltip: 'More details = more interested buyers!',
		required: true,
		minimum_length: 10,
		maximum_length: 5000,
	},
	{
		key: 'price',
		type: 'money',
		data: {
			currency: 'BDT',
		},
		label: 'Price',
		tooltip: 'Pick a good price - what would you pay?',
		required: true,
		currencies: [
			{
				key: 'BDT',
				code: 'BDT',
				label: 'Tk',
			},
		],
		units: [],
		negotiable: 'Negotiable',
		minimum: 0,
		maximum: 9999999999999,
	},
];
