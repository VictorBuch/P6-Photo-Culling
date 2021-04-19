"""
Script to perform proper evaluation on the test set.
Not yet implemented.
"""


from iaa.src.giiaa_dist._nima import *
import pandas as pd
from tensorflow.keras.preprocessing.image import ImageDataGenerator


MODEL_PATH = "../../models/giiaa_dist/weights_dist_2k_mobilenet_0.166.hdf5"

AVA_DATASET_TEST_PATH = "../../ava/test/"
AVA_DATAFRAME_TEST_PATH = "../../ava/AVA_dist_test_dataframe.csv"

BATCH_SIZE = 1


def get_mean(distribution):

    mean = 0.0
    for i in range(0, len(distribution)):
        mean += distribution[i] * (i + 1)

    return mean


if __name__ == "__main__":

    # model = keras.models.load_model(WEIGHTS_PATH, custom_objects={"earth_movers_distance": earth_movers_distance})

    nima = NimaModule(weights=None)
    nima.build()
    nima.nima_model.load_weights(MODEL_PATH)
    model = nima.nima_model

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

    evaluate = model.predict_generator(
        generator=test_generator,
        steps=len(test_generator.filenames)
    )

    print("Dunno what's happening.")

