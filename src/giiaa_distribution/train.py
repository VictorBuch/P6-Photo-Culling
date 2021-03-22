"""
Training script for mean-based GIAA. Since the training dataset is large, and thus should not be loaded all at once
into RAM, the training process is such that the data flows from a dataframe using keras' ImageDataGenerator.
As this is a regression problem, the labels are normalized average ranks of aesthetic quality of corresponding images.
Using means as labels carries with it a few flaws (it does not model human perception well), and this problem will
be attempted to solve differently.
"""

from src.giiaa_distribution.nima import *
import tensorflow as tf

IMAGE_DATASET_PATH = "../../ava/train"
IMAGE_DATASET_SUBSET_PATH = "../../ava/train_subset/"

AVA_TEXT_PATH = "../../ava/AVA.txt"
AVA_DATAFRAME_PATH = "../../ava/AVA_dataframe.csv"
AVA_DATAFRAME_SUBSET_PATH = "../../ava/AVA_dataframe_subset.csv"

MODEL_PATH = "../../models/model_AVAsubset_val_loss-0.0037.h5"

# EPOCHS = 10
# BATCH_SIZE = 32
# LEARNING_RATE = 0.0001
# REGULARIZATION_PARAMETER = 0.001


BASE_MODEL_NAMES = ["inception_resnet_v2", "inception_v3"]


N_CLASSES = 10
LEARNING_RATE_DENSE = 0.0001
DECAY_DENSE = 0.95
DROPOUT_RATE = 0.7


if __name__ == "__main__":
    # build NIMA model and load existing weights if they were provided in config

    nima = Nima(BASE_MODEL_NAMES[0], N_CLASSES, LEARNING_RATE_DENSE, DECAY_DENSE, DROPOUT_RATE)
    nima.build()




