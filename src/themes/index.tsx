import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
    interface Palette {
        custom: {
            black: string,
            blue: string,
            indigo: string,
        };
    }
    interface PaletteOptions {
        custom?: {
            black?: string;
            blue?: string;
            indigo?: string;
        };
    }
}

const theme = createTheme({
    palette: {
        custom: {
            black: "#212121",
            blue: "#2979ff",
            indigo: "#3f51b5",
        },
    },
});

export default theme;

