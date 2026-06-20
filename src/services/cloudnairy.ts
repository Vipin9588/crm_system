export const uploadImageToCloudinary = async (
    file: File
): Promise<string> => {
    try {
        const formData = new FormData();
        console.log
        formData.append("file", file);
        formData.append(
            "upload_preset",
             import.meta.env.VITE_CLOUDINARY_PRESET
        );

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.error?.message || "Image upload failed"
            );
        }

        const data = await response.json();

        return data.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);

        throw new Error(
            error instanceof Error
                ? error.message
                : "Something went wrong while uploading the image"
        );
    }
};