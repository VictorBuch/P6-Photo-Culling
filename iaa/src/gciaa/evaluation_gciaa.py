"""
Script to perform proper evaluation on the test set.
Loss: 0.4274
Accuracy: 0.6751
"""


from iaa.src.gciaa._base import *
from iaa.src.gciaa._generator import *
import pandas as pd
from tensorflow.keras.preprocessing.image import ImageDataGenerator


GIIAA_MODEL = "../../models/giiaa/model_giiaa-hist_200k_inceptionresnetv2_0.078.hdf5"
AVA_DATASET_TEST_PATH = "../../ava/test/"
AVA_DATAFRAME_TEST_PATH = "../../ava/gciaa/AVA_gciaa-cat_test_dataframe.csv"

BASE_MODEL_NAME = "InceptionResNetV2"
BATCH_SIZE = 64


def get_mean(distribution):
    mean = 0.0
    for i in range(0, len(distribution)):
        mean += distribution[i] * (i + 1)
    return mean


if __name__ == "__main__":

    # model = keras.models.load_model(WEIGHTS_PATH, custom_objects={"earth_movers_distance": earth_movers_distance})
    base = BaseModule(
        base_model_name=BASE_MODEL_NAME,
        weights=GIIAA_MODEL)
    base.build()
    base.compile()

    dataframe = pd.read_csv(AVA_DATAFRAME_TEST_PATH, converters={'label': eval})

    data_generator = ImageDataGenerator(rescale=1.0 / 255)

    test_generator = SiameseGenerator(
        generator=data_generator,
        dataframe=dataframe)

    accuracy = base.siamese_model.evaluate_generator(
        generator=test_generator.get_pairwise_flow_from_dataframe(),
        steps=test_generator.samples_per_epoch / test_generator.batch_size,
        verbose=1
    )

