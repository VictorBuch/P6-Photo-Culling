"""
Converts hdf5 model into JS model.
"""

import tensorflowjs as tfjs
import tensorflow as tf
from iaa.src.gciaa._base import *

INPUT_MODEL_PATH = "../../models/gciaa/model_gciaa_siamese_base.hdf5"
OUTPUT_MODEL_PATH = "../../models/gciaa/model_gciaa_2k_siamese_model"


if __name__ == "__main__":

    model = tf.keras.models.load_model(INPUT_MODEL_PATH,
                                       custom_objects={"mapped_comparison_layer": mapped_comparison_layer,
                                                       "contrastive_loss": contrastive_loss})
    tfjs.converters.save_keras_model(model, OUTPUT_MODEL_PATH)
