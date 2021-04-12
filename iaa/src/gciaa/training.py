"""
Training script for distribution-based GCIAA.
"""

from iaa.src.gciaa._base import *
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint, TensorBoard
from tensorflow.keras import backend as K
import pandas as pd
import os

FULL_DATASET_TRAINING = False


AVA_DATASET_PATH = "../../ava/train"
AVA_DATAFRAME_PATH = "../../ava/giiaa/AVA_dist_train_dataframe.csv"

AVA_DATASET_SUBSET_PATH = "../../ava/subset/"
AVA_DATAFRAME_SUBSET_PATH = "../../ava/gciaa/AVA_dist_subset_dataframe.csv"

LOG_PATH = "../../ava/gciaa/logs"
MODELS_PATH = "../../models/gciaa/"

BASE_MODEL_NAME = "InceptionResNetV2"
N_CLASSES = 10
BATCH_SIZE = 96
DROPOUT_RATE = 0.75
USE_MULTIPROCESSING = False
N_WORKERS = 1


if __name__ == "__main__":
    if FULL_DATASET_TRAINING:
        dataset_path = AVA_DATASET_PATH
        dataframe_path = AVA_DATAFRAME_PATH
        model_name_tag = 'model_gciaa_200k_'
    else:
        dataset_path = AVA_DATASET_SUBSET_PATH
        dataframe_path = AVA_DATAFRAME_SUBSET_PATH
        model_name_tag = 'model_gciaa_2k_'

    base_model_name = BASE_MODEL_NAME

    base = BaseModule(base_model_name)
    base.build()

    dataframe = pd.read_csv(dataframe_path, converters={'label': eval})


    K.clear_session()