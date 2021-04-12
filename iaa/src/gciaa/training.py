"""
Training script for distribution-based GIIAA.
"""


from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint, TensorBoard
from tensorflow.keras import backend as K
import pandas as pd
import os


LOG_PATH = "../../ava/gciaa/logs"
MODELS_PATH = "../../models/gciaa/"


if __name__ == "__main__":
    pass