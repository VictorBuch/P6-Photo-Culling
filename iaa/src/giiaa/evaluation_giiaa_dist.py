"""
Script to perform proper evaluation on the test set.
"""


from iaa.src.giiaa._nima import *
import pandas as pd
import tensorflow.keras as keras
from tensorflow.keras.preprocessing.image import ImageDataGenerator


MODEL_PATH = "../../models/giiaa/model_giiaa-dist_200k_inceptionresnetv2_0.078.hdf5"

AVA_DATASET_TEST_PATH = "../../ava/test/"
AVA_DATAFRAME_TEST_PATH = "../../ava/giiaa/AVA_dist_test_dataframe.csv"

BATCH_SIZE = 32


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
    nima.nima_model.compile()

    dataframe = pd.read_csv(AVA_DATAFRAME_TEST_PATH, converters={'label': eval})

    data_generator = ImageDataGenerator(rescale=1.0 / 255)

    test_generator = data_generator.flow_from_dataframe(
        directory=AVA_DATASET_TEST_PATH,
        dataframe=dataframe,
        x_col='id',
        y_col=['label'],
        class_mode='multi_output',
        target_size=(224, 224),
        color_mode='rgb',
        batch_size=BATCH_SIZE,
        shuffle=False
    )


    nima.nima_model.evaluate_generator(
        generator=test_generator,
        steps=test_generator.samples / test_generator.batch_size,
        verbose=1
    )

