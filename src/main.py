from src.image_ranking_service import *
from src.giiaa_distribution.nima_module import *
import numpy as np
import cv2
import os
import random


WEIGHTS_FILE = "../models/weights_dist_2k_mobilenet_02_0.310.hdf5"
AVA_DATASET_SUBSET_PATH = "../ava/train_subset/"

if __name__ == "__main__":

    nima = NimaModule(weights=None)
    nima.build()
    nima.nima_model.load_weights(WEIGHTS_FILE)
    nima.compile()

    random_file = os.path.join(AVA_DATASET_SUBSET_PATH, random.choice(os.listdir(AVA_DATASET_SUBSET_PATH)))
    image = cv2.resize(cv2.imread(random_file), (224, 224)) / 255.0
    image = np.asarray(image)[np.newaxis, ...]

    print(image.shape)
    outputs = nima.nima_model.predict(image)
    print(outputs)

    # for _ in range(20):
    #     random_file = os.path.join(IMAGE_DATASET_SUBSET_PATH, random.choice(os.listdir(IMAGE_DATASET_SUBSET_PATH)))
    #     image = cv2.resize(cv2.imread(random_file), (224, 224)) / 255.0
    #
    #     outputs = irs.predict(image)
    #     print("{}: {}".format(random_file, outputs))

