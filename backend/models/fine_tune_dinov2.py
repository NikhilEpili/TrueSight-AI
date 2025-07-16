import os
from transformers import AutoImageProcessor, AutoModelForImageClassification, TrainingArguments, Trainer
from datasets import load_dataset
import torch

def main():
    # Set paths
    dataset_dir = os.path.join(os.path.dirname(__file__), "dataset")
    output_dir = os.path.join(os.path.dirname(__file__), "finetuned-dinov2")
    model_name = "facebook/dinov2-base"  # or "microsoft/swin-base-patch4-window7-224"

    # Load dataset
    dataset = load_dataset("imagefolder", data_dir=dataset_dir)

    # Load processor and model
    processor = AutoImageProcessor.from_pretrained(model_name)
    model = AutoModelForImageClassification.from_pretrained(
        model_name,
        num_labels=2,
        id2label={0: "real", 1: "fake"},
        label2id={"real": 0, "fake": 1}
    )

    def transform(example):
        example["pixel_values"] = processor(example["image"], return_tensors="pt")["pixel_values"][0]
        return example

    dataset = dataset.with_transform(transform)

    training_args = TrainingArguments(
        output_dir=output_dir,
        per_device_train_batch_size=8,
        evaluation_strategy="epoch",
        num_train_epochs=3,
        save_strategy="epoch",
        logging_dir=os.path.join(output_dir, "logs"),
        remove_unused_columns=False,
        report_to="none",
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=dataset["train"],
        eval_dataset=dataset["val"],
    )

    trainer.train()
    model.save_pretrained(output_dir)
    processor.save_pretrained(output_dir)
    print(f"Model and processor saved to {output_dir}")

if __name__ == "__main__":
    main() 