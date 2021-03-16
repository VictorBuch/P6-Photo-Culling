from src.image_ranking_service import *
import cv2
import os
import random


MODEL_PATH = "../models/model_AVAsubset_val_loss-0.0037.h5"
IMAGE_DATASET_SUBSET_PATH = "../datasets/images_subset/"

if __name__ == "__main__":

    irs = ImageRankingService(MODEL_PATH)

    for _ in range(20):
        random_file = os.path.join(IMAGE_DATASET_SUBSET_PATH, random.choice(os.listdir(IMAGE_DATASET_SUBSET_PATH)))
        image = cv2.resize(cv2.imread(random_file), (256, 256)) / 255.0

        outputs = irs.predict(image)
        print("{}: {}".format(random_file, outputs))

