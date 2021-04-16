"""
Using mean-based GIIAA to make inference on a few random samples from the subset of images.
"""

import tensorflow as tf
import numpy as np
import cv2
import os
import random


MODEL_PATH = "../../models/giiaa_dist/weights_dist_reference_0.070.hdf5"
AVA_DATASET_SUBSET_PATH = "../../ava/subset/"

if __name__ == "__main__":

    model = tf.keras.models.load_model(MODEL_PATH)

    for _ in range(20):
        random_file = os.path.join(AVA_DATASET_SUBSET_PATH, random.choice(os.listdir(AVA_DATASET_SUBSET_PATH)))
        image = cv2.resize(cv2.imread(random_file), (224, 224)) / 255.0

        image = np.asarray(image)[np.newaxis, ...]

        outputs = model.predict(image)
        print("{}: {}".format(random_file, outputs))

