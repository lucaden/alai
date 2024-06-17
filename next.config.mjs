/** @type {import('next').NextConfig} */
const nextConfig = {
    api: {
        bodyParser: {
            sizeLimit: "20gb",
        },
    },
    maxDuration: 100000,
    experimental: {
        serverComponentsExternalPackages: ["pdf-parse", "csv-parser", "mammoth"]
    },
 
    webpack: (config) => { config.externals.push({ sharp: 'commonjs sharp', canvas: 'commonjs canvas' }); return config }
};
 
export default nextConfig;
