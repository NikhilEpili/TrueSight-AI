# Fine-tuning Dataset Structure

Place your training and validation data in the following structure:

```
models/dataset/
  train/
    real/
      image1.jpg
      image2.jpg
      ...
    fake/
      image1.jpg
      image2.jpg
      ...
  val/
    real/
      image1.jpg
      ...
    fake/
      image1.jpg
      ...
```

- Use `real` and `fake` as folder names for binary classification.
- You can add as many images as you want in each class folder.
- For video, you can extract frames and place them as images, or adapt the script for video files. 