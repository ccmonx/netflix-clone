import styled from "styled-components";

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 100%;
	padding: 20px 60px;
	background-color: black;
	font-size: 14px;
`;

const PrimaryNav = styled.div`
	display: flex;
	align-items: center;
`;

const SecondaryNav = styled.div`
	display: flex;
	align-items: center;
	gap: 23px;
`;

const Logo = styled.svg`
	width: 95px;
	height: 25px;
	margin-right: 45px;
	fill: ${(props) => props.theme.red};
`;

const MenuList = styled.ul`
	display: flex;
	align-items: center;
`;

const MenuItem = styled.li`
	margin-right: 20px;
	color: ${(props) => props.theme.white.normal};
	transition: color 0.3s ease-in-out;
	&:hover {
		color: ${(props) => props.theme.white.darker};
	}
`;

const Search = styled.span`
	display: flex;
`;

const Notifications = styled.div`
	display: flex;
`;

const AccountMenu = styled.div`
	display: flex;
	img {
		border-radius: 5px;
	}
`;

function Header() {
	return (
		<Wrapper>
			<PrimaryNav>
				<Logo
					width="1024"
					height="276.742"
					viewBox="0 0 1024 276.742"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
				</Logo>
				<MenuList>
					<MenuItem>Home</MenuItem>
					<MenuItem>TV Shows</MenuItem>
				</MenuList>
			</PrimaryNav>
			<SecondaryNav>
				<Search>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M14 11C14 14.3137 11.3137 17 8 17C4.68629 17 2 14.3137 2 11C2 7.68629 4.68629 5 8 5C11.3137 5 14 7.68629 14 11ZM14.3623 15.8506C12.9006 17.7649 10.5945 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 12.1076 15.7749 13.1626 15.368 14.1218L24.0022 19.1352L22.9979 20.8648L14.3623 15.8506Z"
							fill="#FFFFFF"
						/>
					</svg>
				</Search>
				<Notifications>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M13 4.07092C16.3922 4.55624 18.9998 7.4736 18.9998 11V15.2538C20.0486 15.3307 21.0848 15.4245 22.107 15.5347L21.8926 17.5232C18.7219 17.1813 15.409 17 11.9998 17C8.59056 17 5.27764 17.1813 2.10699 17.5232L1.89258 15.5347C2.91473 15.4245 3.95095 15.3307 4.99978 15.2538V11C4.99978 7.47345 7.6076 4.55599 11 4.07086V2L13 2V4.07092ZM16.9998 15.1287V11C16.9998 8.23858 14.7612 6 11.9998 6C9.23836 6 6.99978 8.23858 6.99978 11V15.1287C8.64041 15.0437 10.3089 15 11.9998 15C13.6907 15 15.3591 15.0437 16.9998 15.1287ZM8.62568 19.3712C8.6621 20.5173 10.1509 22 11.9993 22C13.8477 22 15.3365 20.5173 15.373 19.3712C15.38 19.1489 15.1756 19 14.9531 19H9.04555C8.82308 19 8.61862 19.1489 8.62568 19.3712Z"
							fill="#FFFFFF"
						/>
					</svg>
				</Notifications>
				<AccountMenu>
					<img
						src="http://occ-0-4831-993.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABR4EWsvDGulc98QqSoE0INTdfSs6nxo6fAbYBgS8nOGXI2eO8Zmh5yfNxGujQlggn_f2iPF78t4q9kHkxYzoPgEzgk-xh7Y.png?r=7c7"
						alt=""
					/>
				</AccountMenu>
			</SecondaryNav>
		</Wrapper>
	);
}

export default Header;
