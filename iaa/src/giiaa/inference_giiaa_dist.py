"""
Using distribution-based GIIAA to make inference on a few random samples from the subset of images.
"""

import numpy as np
import pandas as pd
from tqdm import tqdm
import cv2
import os
import random
from scipy.stats import wasserstein_distance
from iaa.src.giiaa._nima import *
import tensorflow.keras as keras


MODEL_PATH = "../../models/giiaa/model_giiaa-dist_200k_inceptionresnetv2_0.078.hdf5"

AVA_DATASET_SUBSET_PATH = "../../ava/subset/"
AVA_DATAFRAME_SUBSET_PATH = "../../ava/giiaa/AVA_dist_subset_dataframe.csv"

AVA_DATASET_TEST_PATH = "../../ava/test/"
AVA_DATAFRAME_TEST_PATH = "../../ava/giiaa/AVA_dist_test_dataframe.csv"


def get_mean(distribution):

    mean = 0.0
    for i in range(0, len(distribution)):
        mean += distribution[i] * (i + 1)
    return mean


if __name__ == "__main__":

    # model = keras.models.load_model(MODEL_PATH, custom_objects={"earth_movers_distance": earth_movers_distance})

    nima = NimaModule()
    nima.build()
    nima.nima_model.load_weights(MODEL_PATH)
    model = nima.nima_model
    model.compile()

    dataframe = pd.read_csv(AVA_DATAFRAME_SUBSET_PATH, converters={'label': eval})

    count_all = 200
    count_correct = 0
    eval_matrix = np.ndarray([count_all, 2])

    for i in tqdm(range(count_all)):

        predictions = []
        gts = []

        for ii in range(2):

            random_file = os.path.join(AVA_DATASET_SUBSET_PATH, random.choice(os.listdir(AVA_DATASET_SUBSET_PATH)))
            image = cv2.resize(cv2.imread(random_file), (224, 224)) / 255.0
            image = np.asarray(image)[np.newaxis, ...]

            gt = dataframe[dataframe["id"] == random_file.split('/')[-1]].iloc[0]['label']
            prediction = model.predict(image)[0]

            predictions.append(get_mean(prediction))
            gts.append(get_mean(gt))

        eval_matrix[i, 0] = int(predictions[0] < predictions[1])
        eval_matrix[i, 1] = int(gts[0] < gts[1])

        if eval_matrix[i, 0] == eval_matrix[i, 1]:
            count_correct += 1

    print(eval_matrix)
    print("Correct {} out of {}.".format(count_correct, count_all))



