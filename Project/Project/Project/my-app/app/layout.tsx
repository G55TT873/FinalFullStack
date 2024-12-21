// app/layout.js

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './globals.css'; // Adjust the path to your global styles if necessary


export const metadata = {
  title: 'My App',
  description: 'A description of my app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Navbar/>

        <div className="mt-16 mb-20">{children}</div>

        <Footer/>
      </body>
    </html>
  );
}
