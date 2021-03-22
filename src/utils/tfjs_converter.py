import tensorflowjs as tfjs
import tensorflow as tf


def save_as_js_model(input_model_path, output_model_path):

    model = tf.keras.models.load_model(input_model_path)
    tfjs.converters.save_keras_model(model, output_model_path)
