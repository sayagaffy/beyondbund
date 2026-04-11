import { useCallback, useRef, useState } from "react";
import type { AssetSourceComponentProps } from "@sanity/types";
import { useClient } from "sanity";
import { Box, Button, Card, Flex, Stack, Text } from "@sanity/ui";

const MAX_BYTES = 300 * 1024;
const API_VERSION = "2024-03-01";

const loadImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("File gambar tidak bisa dibaca."));
    };
    img.src = objectUrl;
  });

const canvasToBlob = (
  canvas: HTMLCanvasElement,
  quality: number,
): Promise<Blob> =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Gagal membuat file WebP."));
          return;
        }
        resolve(blob);
      },
      "image/webp",
      quality,
    );
  });

const createWebpFile = async (file: File): Promise<File> => {
  const image = await loadImage(file);
  let quality = 0.88;
  let scale = 1;
  let lastBlob: Blob | null = null;

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas tidak tersedia.");
    }

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await canvasToBlob(canvas, quality);
    lastBlob = blob;

    if (blob.size <= MAX_BYTES) {
      const baseName =
        file.name.replace(/\.[^/.]+$/, "") || "image";
      return new File([blob], `${baseName}.webp`, { type: "image/webp" });
    }

    if (quality > 0.65) {
      quality = Math.max(0.55, quality - 0.1);
    } else if (scale > 0.7) {
      scale = Math.max(0.6, scale - 0.08);
      quality = 0.8;
    } else {
      quality = Math.max(0.45, quality - 0.05);
    }
  }

  if (!lastBlob) {
    throw new Error("Gagal memproses gambar.");
  }

  const baseName = file.name.replace(/\.[^/.]+$/, "") || "image";
  return new File([lastBlob], `${baseName}.webp`, { type: "image/webp" });
};

export default function WebpImageAssetSource({
  onClose,
  onSelect,
  accept,
  dialogHeaderTitle,
}: AssetSourceComponentProps) {
  const client = useClient({ apiVersion: API_VERSION });
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }

      setBusy(true);
      setError(null);

      try {
        const webpFile = await createWebpFile(file);
        if (webpFile.size > MAX_BYTES) {
          throw new Error(
            "Gambar masih lebih dari 300KB. Coba gunakan gambar yang lebih kecil.",
          );
        }

        const asset = await client.assets.upload("image", webpFile, {
          filename: webpFile.name,
        });

        onSelect([{ kind: "assetDocumentId", value: asset._id }]);
        onClose();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Gagal memproses gambar.";
        setError(message);
      } finally {
        setBusy(false);
        event.target.value = "";
      }
    },
    [client, onClose, onSelect],
  );

  return (
    <Card padding={4} radius={2} shadow={1} style={{ maxWidth: 520 }}>
      <Stack space={4}>
        <Stack space={2}>
          <Text weight="semibold" size={2}>
            {dialogHeaderTitle || "Upload Gambar (WebP 300KB)"}
          </Text>
          <Text size={1} muted>
            File apa pun akan otomatis dikonversi ke WebP dan dikompresi
            maksimal 300KB.
          </Text>
        </Stack>

        <Box>
          <input
            ref={inputRef}
            type="file"
            accept={accept || "image/*"}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Flex gap={3} align="center">
            <Button
              text={busy ? "Memproses..." : "Pilih Gambar"}
              tone="primary"
              disabled={busy}
              onClick={handlePick}
            />
            <Button
              text="Batal"
              mode="bleed"
              disabled={busy}
              onClick={onClose}
            />
          </Flex>
        </Box>

        {error ? (
          <Card padding={3} radius={2} tone="critical">
            <Text size={1}>{error}</Text>
          </Card>
        ) : null}
      </Stack>
    </Card>
  );
}
