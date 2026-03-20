import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        business: resolve(__dirname, 'pages/business.html'),
        dashboard: resolve(__dirname, 'pages/dashboard.html'),
        editListing: resolve(__dirname, 'pages/edit-listing.html'),
        listings: resolve(__dirname, 'pages/listings.html'),
        login: resolve(__dirname, 'pages/login.html'),
        newListing: resolve(__dirname, 'pages/new-listing.html'),
        register: resolve(__dirname, 'pages/register.html')
      }
    }
  }
});
