"""
Using GCIAA to make inference on a few random samples from the subset of images.
"""

import numpy as np
import pandas as pd
from tqdm import tqdm
import cv2
import os
import random
from iaa.src.gciaa._base import *
import tensorflow.keras as keras


MODEL_PATH = "../../models/gciaa/model_gciaa_siamese_base.h5"
AVA_DATASET_SUBSET_PATH = "../../ava/subset/"
AVA_DATAFRAME_SUBSET_PATH = "../../ava/gciaa/AVA_gciaa_subset_dataframe.csv"

BASE_MODEL_NAME = "InceptionResNetV2"
GIIAA_MODEL = "../../models/giiaa/model_giiaa-dist_200k_inceptionresnetv2_0.078.hdf5"

if __name__ == "__main__":

    base = BaseModule(
        base_model_name=BASE_MODEL_NAME,
        weights=GIIAA_MODEL)
    base.build()
    base.compile()

    dataframe = pd.read_csv(AVA_DATAFRAME_SUBSET_PATH, converters={'label': eval})

    for i in range(20):

        random_file = os.path.join(AVA_DATASET_SUBSET_PATH, random.choice(os.listdir(AVA_DATASET_SUBSET_PATH)))
        image = cv2.resize(cv2.imread(random_file), (224, 224)) / 255.0
        image_a = np.asarray(image)[np.newaxis, ...]

        random_file = os.path.join(AVA_DATASET_SUBSET_PATH, random.choice(os.listdir(AVA_DATASET_SUBSET_PATH)))
        image = cv2.resize(cv2.imread(random_file), (224, 224)) / 255.0
        image_b = np.asarray(image)[np.newaxis, ...]

        # gt = dataframe[dataframe["id"] == random_file.split('/')[-1]].iloc[0]['label']

        # Write base.predict method
        prediction = base.predict([image_a, image_b])[0]
        print(prediction)
