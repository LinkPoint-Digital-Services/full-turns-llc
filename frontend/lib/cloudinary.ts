export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);

  const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY!, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) throw new Error('Cloudinary upload failed');
  const data = await res.json();
  return data.secure_url;
};
