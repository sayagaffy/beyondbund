const MAX_IMAGE_BYTES = 300 * 1024;

type SanityImageValue = {
  asset?: {
    _ref?: string;
  };
};

export async function validateWebpUnder300kb(
  value: SanityImageValue | undefined,
  context: { getClient?: (options: { apiVersion: string }) => any },
): Promise<true | string> {
  if (!value?.asset?._ref) {
    return true;
  }

  const client = context?.getClient?.({ apiVersion: "2024-03-01" });
  if (!client) {
    return true;
  }

  try {
    const asset = await client.getDocument(value.asset._ref);
    if (!asset) {
      return "Image asset not found.";
    }

    const size = asset.size as number | undefined;
    if (typeof size === "number" && size > MAX_IMAGE_BYTES) {
      return "Ukuran gambar maksimal 300KB.";
    }
  } catch (error) {
    return "Tidak bisa memvalidasi gambar saat ini.";
  }

  return true;
}
