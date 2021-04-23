"""
Training script for distribution-based GCIAA.
"""

from iaa.src.gciaa._base import *
from iaa.src.gciaa._generator import *

from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint, TensorBoard
from tensorflow.keras import backend as K
import pandas as pd
import os

FULL_DATASET_TRAINING = False


AVA_DATASET_PATH = "../../ava/train"
AVA_DATAFRAME_PATH = "../../ava/giiaa/AVA_gciaa_train_dataframe.csv"

AVA_DATASET_SUBSET_PATH = "../../ava/subset/"
AVA_DATAFRAME_SUBSET_PATH = "../../ava/gciaa/AVA_gciaa_subset_dataframe.csv"

GIIAA_MODEL = "../../models/giiaa/model_giiaa-dist_200k_inceptionresnetv2_0.078.hdf5"
LOG_PATH = "../../ava/gciaa/logs"
MODELS_PATH = "../../models/gciaa/"

BASE_MODEL_NAME = "InceptionResNetV2"
BATCH_SIZE = 32
DROPOUT_RATE = 0.75
USE_MULTIPROCESSING = False
N_WORKERS = 1

EPOCHS = 12


if __name__ == "__main__":
    if FULL_DATASET_TRAINING:
        dataset_path = AVA_DATASET_PATH
        dataframe_path = AVA_DATAFRAME_PATH
        model_name_tag = 'model_gciaa_200k_'
    else:
        dataset_path = AVA_DATASET_SUBSET_PATH
        dataframe_path = AVA_DATAFRAME_SUBSET_PATH
        model_name_tag = 'model_gciaa_2k_'

    tensorboard = TensorBoard(
        log_dir=LOG_PATH, update_freq='batch'
    )

    model_save_name = (model_name_tag + BASE_MODEL_NAME.lower() + '_{val_loss:.3f}.hdf5')
    model_file_path = os.path.join(MODELS_PATH, model_save_name)
    model_checkpointer = ModelCheckpoint(
        filepath=model_file_path,
        monitor='val_loss',
        verbose=1,
        save_best_only=True,
        save_weights_only=False,
    )

    base = BaseModule(
        base_model_name=BASE_MODEL_NAME,
        weights=GIIAA_MODEL)
    base.build()

    dataframe = pd.read_csv(dataframe_path, converters={'label': eval})

    data_generator = ImageDataGenerator(
        rescale=1.0 / 255,
        validation_split=0.2
    )

    train_generator = SiameseGenerator(
        generator=data_generator,
        dataframe=dataframe,
        subset='training')

    validation_generator = SiameseGenerator(
        generator=data_generator,
        dataframe=dataframe,
        subset='validation')

    base.compile()
    base.siamese_model.summary()

    base.siamese_model.fit_generator(
        generator=train_generator.get_pairwise_flow_from_dataframe(),
        steps_per_epoch=train_generator.samples_per_epoch // train_generator.batch_size,
        validation_data=validation_generator.get_pairwise_flow_from_dataframe(),
        validation_steps=validation_generator.samples_per_epoch // validation_generator.batch_size,
        epochs=EPOCHS,
        use_multiprocessing=USE_MULTIPROCESSING,
        workers=N_WORKERS,
        verbose=1,
        max_queue_size=30,
        callbacks=[tensorboard, model_checkpointer]
    )

    K.clear_session()
