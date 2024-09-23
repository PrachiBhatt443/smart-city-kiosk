// src/app/layout.js
import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Smart City Kiosk',
  description: 'Information kiosk for smart cities',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  );
}
