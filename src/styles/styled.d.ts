import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		red: string;
		black: {
			darker: string;
			normal: string;
			lighter: string;
		};
		white: {
			lighter: string;
			normal: string;
			darker: string;
		};
	}
}
