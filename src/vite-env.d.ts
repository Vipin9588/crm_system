/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CLOUDINARY_URL: string;
    readonly VITE_CLOUD_NAME: string;
    readonly VITE_CLOUDINARY_PRESET: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}