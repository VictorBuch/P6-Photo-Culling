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
from iaa.src.giiaa._nima import *
import tensorflow.keras as keras


GIIAA_MODEL = "../../models/giiaa/model_giiaa-hist_200k_inceptionresnetv2_0.078.hdf5"
AVA_DATASET_SUBSET_PATH = "../../datasets/ava/subset/"
AVA_DATAFRAME_SUBSET_PATH = "../../datasets/ava/giiaa/AVA_giiaa-hist_subset_dataframe.csv"

BASE_MODEL_NAME = "InceptionResNetV2"


def get_mean(distribution):

    mean = 0.0
    for i in range(0, len(distribution)):
        mean += distribution[i] * (i + 1)
    return mean


if __name__ == "__main__":

    giiaa = keras.models.load_model(GIIAA_MODEL, custom_objects={"earth_movers_distance": earth_movers_distance})

    gciaa = BaseModule(
        base_model_name=BASE_MODEL_NAME,
        weights=GIIAA_MODEL)
    gciaa.build()
    gciaa.compile()

    dataframe = pd.read_csv(AVA_DATAFRAME_SUBSET_PATH, converters={'label': eval})

    for i in range(20):

        random_file = os.path.join(AVA_DATASET_SUBSET_PATH, random.choice(os.listdir(AVA_DATASET_SUBSET_PATH)))
        image = cv2.resize(cv2.imread(random_file), (224, 224)) / 255.0
        image_a = np.asarray(image)[np.newaxis, ...]
        gt_a = dataframe[dataframe["id"] == random_file.split('/')[-1]].iloc[0]['label']

        random_file = os.path.join(AVA_DATASET_SUBSET_PATH, random.choice(os.listdir(AVA_DATASET_SUBSET_PATH)))
        image = cv2.resize(cv2.imread(random_file), (224, 224)) / 255.0
        image_b = np.asarray(image)[np.newaxis, ...]
        gt_b = dataframe[dataframe["id"] == random_file.split('/')[-1]].iloc[0]['label']

        giiaa_prediction_a = get_mean(giiaa.predict(image_a)[0])
        giiaa_prediction_b = get_mean(giiaa.predict(image_b)[0])

        giiaa_gt_a = get_mean(gt_a)
        giiaa_gt_b = get_mean(gt_b)

        gciaa_prediction = gciaa.predict([image_a, image_b])[0, 0]

        print("GT A {:.2f} | GT B {:.2f} | GIIAA A {:.2f} | GIIAA B {:.2f} | GCIAA {:.2f}"
              .format(giiaa_gt_a, giiaa_gt_b, giiaa_prediction_a, giiaa_prediction_b, gciaa_prediction))

