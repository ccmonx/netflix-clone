import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const client = new QueryClient();

root.render(
	<React.StrictMode>
		<QueryClientProvider client={client}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<App />
			</ThemeProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
