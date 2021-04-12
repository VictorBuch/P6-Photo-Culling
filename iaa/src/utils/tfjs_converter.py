"""
Converts hdf5 model into JS model.
"""

import tensorflowjs as tfjs
import tensorflow as tf
from iaa.src.giiaa_dist._nima import earth_movers_distance

INPUT_MODEL_PATH = "../../models/giiaa_dist/model_dist_200k_inceptionresnetv2_0.078.hdf5"
OUTPUT_MODEL_PATH = "../../models/giiaa_dist/model_dist_200k_inceptionresnetv2_0.078"


if __name__ == "__main__":

    model = tf.keras.models.load_model(INPUT_MODEL_PATH, custom_objects={"earth_movers_distance": earth_movers_distance})
    tfjs.converters.save_keras_model(model, OUTPUT_MODEL_PATH)
