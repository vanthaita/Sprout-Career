import createNextIntlPlugin from 'next-intl/plugin';
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["images.unsplash.com", "japan-dev.com"],
    },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
