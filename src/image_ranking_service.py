"""
Using the trained model(s) to process a new image, or a set of images.
"""

import tensorflow as tf
import numpy as np


class ImageRankingService:

    def __init__(self, model_path):
        self.model = tf.keras.models.load_model(model_path)

    def predict(self, image):

        return self.model.predict(image[np.newaxis, ...])



