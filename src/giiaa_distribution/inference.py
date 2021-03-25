from src.giiaa_distribution.nima import *
import numpy as np
import pandas as pd
import cv2
import os
import random
from scipy.stats import wasserstein_distance
from src.giiaa_distribution.nima import earth_movers_distance
import tensorflow.keras as keras


WEIGHTS_PATH = "../../models/weights_dist_2k_mobilenet_03_0.175_as_model.hdf5"

AVA_DATASET_SUBSET_PATH = "../../ava/train_subset/"
AVA_DATAFRAME_SUBSET_PATH = "../../ava/AVA_distribution_dataframe_subset.csv"


def get_mean(distribution):

    mean = 0.0
    for i in range(0, len(distribution)):
        mean += distribution[i] * (i + 1)

    return mean


if __name__ == "__main__":

    # model = keras.models.load_model(WEIGHTS_PATH, custom_objects={"earth_movers_distance": earth_movers_distance})

    nima = NimaModule(weights=None)
    nima.build()
    nima.nima_model.load_weights(WEIGHTS_PATH)
    model = nima.nima_model

    dataframe = pd.read_csv(AVA_DATAFRAME_SUBSET_PATH, converters={'label': eval})

    for _ in range(20):

        random_file = os.path.join(AVA_DATASET_SUBSET_PATH, random.choice(os.listdir(AVA_DATASET_SUBSET_PATH)))
        image = cv2.resize(cv2.imread(random_file), (224, 224)) / 255.0
        image = np.asarray(image)[np.newaxis, ...]

        gt = dataframe[dataframe["id"] == random_file.split('/')[-1]].iloc[0]['label']
        prediction = model.predict(image)[0]

        print("File: {}".format(random_file))
        print("Prediction:\n{}".format(prediction))
        print("Ground truth:\n{}".format(gt))
        print("---")
        print("Prediction mean: {}".format(get_mean(prediction)))
        print("Ground truth mean: {}".format(get_mean(gt)))
        print("EMD: {}".format(wasserstein_distance(gt, prediction)))
        print("--------------------------")



