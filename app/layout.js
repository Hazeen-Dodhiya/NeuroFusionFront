import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata = {
  title: "BrainFusion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        {/* 🔥 GOOGLE PROVIDER WRAPPER (REQUIRED) */}
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          
          <Navbar />
          {children}

        </GoogleOAuthProvider>

      </body>
    </html>
  );
}