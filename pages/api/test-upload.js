/**
 * Test endpoint to debug form parsing
 */

import { parseForm } from "../../lib/upload";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { fields, files } = await parseForm(req);
    
    console.log("=== PARSED FORM DATA ===");
    console.log("Fields:", JSON.stringify(fields, null, 2));
    console.log("Files:", JSON.stringify(files, null, 2));
    
    return res.status(200).json({
      success: true,
      fields,
      files: Object.keys(files).reduce((acc, key) => {
        acc[key] = {
          name: files[key]?.originalFilename || files[key]?.name,
          size: files[key]?.size,
          type: files[key]?.mimetype || files[key]?.type,
        };
        return acc;
      }, {}),
    });
  } catch (error) {
    console.error("Parse error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

