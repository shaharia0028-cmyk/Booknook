const MAX_SIZE = 5 * 1024 * 1024;

/** Uploads a cover image to imgbb and returns its public URL. */
export async function uploadImage(file: File): Promise<string> {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!key) throw new Error("Image upload is not set up yet (NEXT_PUBLIC_IMGBB_API_KEY).");
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
  if (file.size > MAX_SIZE) throw new Error("The image must be smaller than 5 MB.");

  const body = new FormData();
  body.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body });
  const json = await response.json().catch(() => null);
  const url = json?.data?.url;
  if (!response.ok || typeof url !== "string") throw new Error("Image upload failed. Please try again.");
  return url;
}
