import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Modify theme colors to match modern red theme
document.documentElement.style.setProperty('--primary', '220 38 38'); // #DC2626 (red-600)
document.documentElement.style.setProperty('--primary-foreground', '255 255 255'); // White
document.documentElement.style.setProperty('--background', '250 250 250'); // #FAFAFA
document.documentElement.style.setProperty('--foreground', '41 37 36'); // #292524 (stone-800)
document.documentElement.style.setProperty('--secondary', '113 113 122'); // #71717A (zinc-500)
document.documentElement.style.setProperty('--accent', '245 158 11'); // #F59E0B (amber-500)
document.documentElement.style.setProperty('--card', '255 255 255'); // White
document.documentElement.style.setProperty('--card-foreground', '41 37 36'); // #292524 (stone-800)
document.documentElement.style.setProperty('--border', '228 228 231'); // #E4E4E7 (zinc-200)
document.documentElement.style.setProperty('--ring', '220 38 38'); // #DC2626 (red-600)

createRoot(document.getElementById("root")!).render(<App />);
