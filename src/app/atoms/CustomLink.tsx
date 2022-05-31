import MuiLink from '@mui/material/Link';
import { SxProps } from '@mui/system';
import clsx from 'clsx';
import { useRouter } from 'next/dist/client/router';
import Link, { LinkProps } from 'next/link';

type CustomLinkProps = {
	sx?: SxProps;
	exact?: boolean;
	activeClass?: string;
	className?: string;
};

const CustomLink: React.FC<LinkProps & CustomLinkProps> = ({
	sx,
	exact,
	children,
	activeClass,
	className,
	...props
}) => {
	const { pathname } = useRouter();
	let { href } = props;
	href = href.toString();
	const isActive = exact ? pathname === href : pathname.startsWith(href);

	return (
		<Link {...props}>
			<MuiLink
				className={clsx({
					[activeClass || 'active']: isActive,
					[className as string]: className,
				})}
				sx={{ color: '#1877f2', textDecoration: 'none', ...sx }}
			>
				{children}
			</MuiLink>
		</Link>
	);
};

export default CustomLink;
