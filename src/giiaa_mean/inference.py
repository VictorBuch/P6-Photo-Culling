from src.giiaa_distribution.nima import *
import numpy as np
import cv2
import os
import random


WEIGHTS_FILE = "../../models/giiaa_dist/weights_dist_reference_0.070.hdf5"
AVA_DATASET_SUBSET_PATH = "../../ava/train_subset/"

if __name__ == "__main__":

    model = None

    for _ in range(20):
        random_file = os.path.join(AVA_DATASET_SUBSET_PATH, random.choice(os.listdir(AVA_DATASET_SUBSET_PATH)))
        image = cv2.resize(cv2.imread(random_file), (224, 224)) / 255.0

        image = np.asarray(image)[np.newaxis, ...]

        outputs = model.predict(image)
        print("{}: {}".format(random_file, outputs))

