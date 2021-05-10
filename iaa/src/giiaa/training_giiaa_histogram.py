"""
Training script for distribution-based GIIAA.
"""

from iaa.src.giiaa._nima import *
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint, TensorBoard
from tensorflow.keras import backend as K
import pandas as pd
import os


FULL_DATASET_TRAINING = True


AVA_DATASET_PATH = "../../datasets/ava/train"
AVA_DATAFRAME_PATH = "../../datasets/ava/giiaa/AVA_giiaa-hist_train_dataframe.csv"

AVA_DATASET_SUBSET_PATH = "../../datasets/ava/subset/"
AVA_DATAFRAME_SUBSET_PATH = "../../datasets/ava/giiaa/AVA_giiaa-hist_subset_dataframe.csv"

LOG_PATH = "../../datasets/ava/giiaa/logs"
MODELS_PATH = "../../models/giiaa/"



BASE_MODEL_NAME = "InceptionResNetV2"
N_CLASSES = 10
BATCH_SIZE = 96
DROPOUT_RATE = 0.75
USE_MULTIPROCESSING = False
N_WORKERS = 1

EPOCHS_DENSE = 5
LEARNING_RATE_DENSE = 0.001
DECAY_DENSE = 0

EPOCHS_ALL = 9
LEARNING_RATE_ALL = 0.00003
DECAY_ALL = 0.000023


if __name__ == "__main__":

    if FULL_DATASET_TRAINING:
        dataset_path = AVA_DATASET_PATH
        dataframe_path = AVA_DATAFRAME_PATH
        model_name_tag = 'model_dist_200k_'
    else:
        dataset_path = AVA_DATASET_SUBSET_PATH
        dataframe_path = AVA_DATAFRAME_SUBSET_PATH
        model_name_tag = 'model_dist_2k_'

    base_model_name = BASE_MODEL_NAME
    nima = NimaModule(base_model_name, N_CLASSES, LEARNING_RATE_DENSE, DECAY_DENSE, DROPOUT_RATE)
    nima.build()

    dataframe = pd.read_csv(dataframe_path, converters={'label': eval})

    data_generator = ImageDataGenerator(
        rescale=1.0 / 255,
        validation_split=0.2
    )

    train_generator = data_generator.flow_from_dataframe(
        directory=dataset_path,
        dataframe=dataframe,
        x_col='id',
        y_col=['label'],
        class_mode='multi_output',
        target_size=(224, 224),
        color_mode='rgb',
        batch_size=BATCH_SIZE,
        subset='training'
    )

    validation_generator = data_generator.flow_from_dataframe(
        directory=dataset_path,
        dataframe=dataframe,
        x_col='id',
        y_col=['label'],
        class_mode='multi_output',
        target_size=(224, 224),
        color_mode='rgb',
        batch_size=BATCH_SIZE,
        subset='validation',
    )

    tensorboard = TensorBoard(
        log_dir=LOG_PATH, update_freq='batch'
    )

    model_save_name = (model_name_tag + base_model_name.lower() + '_{val_loss:.3f}.hdf5')
    model_file_path = os.path.join(MODELS_PATH, model_save_name)
    model_checkpointer = ModelCheckpoint(
        filepath=model_file_path,
        monitor='val_loss',
        verbose=1,
        save_best_only=True,
        save_weights_only=False,
    )

    for layer in nima.base_model.layers:
        layer.trainable = False

    nima.compile()
    nima.nima_model.summary()

    nima.nima_model.fit_generator(
        generator=train_generator,
        steps_per_epoch=train_generator.samples // train_generator.batch_size,
        validation_data=validation_generator,
        validation_steps=validation_generator.samples // validation_generator.batch_size,
        epochs=EPOCHS_DENSE,
        use_multiprocessing=USE_MULTIPROCESSING,
        workers=N_WORKERS,
        verbose=1,
        max_queue_size=30,
        callbacks=[tensorboard, model_checkpointer]
    )

    for layer in nima.base_model.layers:
        layer.trainable = True

    nima.compile()
    nima.nima_model.summary()

    nima.nima_model.fit_generator(
        generator=train_generator,
        steps_per_epoch=train_generator.samples // train_generator.batch_size,
        validation_data=validation_generator,
        validation_steps=validation_generator.samples // validation_generator.batch_size,
        epochs=EPOCHS_DENSE + EPOCHS_ALL,
        initial_epoch=EPOCHS_DENSE,
        use_multiprocessing=USE_MULTIPROCESSING,
        workers=N_WORKERS,
        verbose=1,
        max_queue_size=30,
        callbacks=[tensorboard, model_checkpointer],
    )

    K.clear_session()




