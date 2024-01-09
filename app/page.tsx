import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import ConditionalPage from "@/components/conditional-page";

export default function Home() {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        <ConditionalPage />
        <Toaster />
      </ThemeProvider>
    </>
  );
}
