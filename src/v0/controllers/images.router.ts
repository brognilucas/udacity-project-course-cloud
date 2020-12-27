import { Router, Request, Response, NextFunction } from "express";
import { deleteLocalFiles, filterImageFromURL } from "../../util/util";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const { image_url } = req.query;

  // Send error if image_url wasnt informed
  if (!image_url) {
    return res.status(400).send("URL from Image is required");
  }

  //Filter image
  const image = await filterImageFromURL(image_url as string);

  // If image wasn't found return image not found message
  if (!image) {
    return res.status(404).send("Image not found");
  }

  res.sendFile(image);
  setTimeout(() => {
    deleteLocalFiles([image]);
  }, 2000);
});

export default router;
