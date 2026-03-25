/**
 * Bunny CDN Storage — Email collection
 * Appends subscriber data to /data/subscribers.jsonl on the Bunny CDN storage zone.
 * No database. No email sending. JSONL format.
 */

const BUNNY_STORAGE_ZONE = "dreamgate";
const BUNNY_STORAGE_HOST = "ny.storage.bunnycdn.com";
const BUNNY_STORAGE_PASSWORD = "1f65a9f5-0090-4941-bc3563706870-a957-4046";

interface SubscriberEntry {
  email: string;
  date: string;
  source: string;
}

export async function storeSubscriber(
  email: string,
  source: string
): Promise<boolean> {
  const entry: SubscriberEntry = {
    email,
    date: new Date().toISOString(),
    source,
  };

  const jsonlLine = JSON.stringify(entry) + "\n";

  try {
    // First, try to read existing file
    let existingData = "";
    try {
      const getRes = await fetch(
        `https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/data/subscribers.jsonl`,
        {
          headers: {
            AccessKey: BUNNY_STORAGE_PASSWORD,
          },
        }
      );
      if (getRes.ok) {
        existingData = await getRes.text();
      }
    } catch {
      // File doesn't exist yet, that's fine
    }

    // Append new entry
    const newData = existingData + jsonlLine;

    // Upload back
    const putRes = await fetch(
      `https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/data/subscribers.jsonl`,
      {
        method: "PUT",
        headers: {
          AccessKey: BUNNY_STORAGE_PASSWORD,
          "Content-Type": "application/octet-stream",
        },
        body: newData,
      }
    );

    return putRes.ok;
  } catch (err) {
    console.error("Failed to store subscriber:", err);
    return false;
  }
}
