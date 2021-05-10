"""
Training script for mean-based GIIAA. Since the training dataset is large, and thus should not be loaded all at once
into RAM, the training process is such that the data flows from a dataframe using keras' ImageDataGenerator.
As this is a regression problem, the labels are normalized average ranks of aesthetic quality of corresponding images.
"""

from iaa.src.utils.dataframe_preparation import *
import tensorflow as tf

IMAGE_DATASET_PATH = "../../datasets/ava/train"
IMAGE_DATASET_SUBSET_PATH = "../../datasets/ava/subset/"

AVA_TEXT_PATH = "../../datasets/ava/AVA.txt"
AVA_DATAFRAME_PATH = "../../iaa/ava/AVA_mean_dataframe.csv"
AVA_DATAFRAME_SUBSET_PATH = "../../iaa/ava/AVA_mean_dataframe_subset.csv"

MODEL_PATH = "../../iaa/models/model_AVAsubset_val_loss-0.0037.h5"

EPOCHS = 10
BATCH_SIZE = 32
LEARNING_RATE = 0.0001
REGULARIZATION_PARAMETER = 0.001


def build_model(input_shape):

    model = tf.keras.models.Sequential()

    model.add(tf.keras.layers.Conv2D(
        filters=64, kernel_size=(3, 3), input_shape=input_shape,
        activation="relu", kernel_regularizer=tf.keras.regularizers.l2(REGULARIZATION_PARAMETER))
    )
    model.add(tf.keras.layers.BatchNormalization())
    model.add(tf.keras.layers.MaxPooling2D(pool_size=(3, 3), strides=(2, 2), padding="same"))

    model.add(tf.keras.layers.Conv2D(
        filters=32, kernel_size=(3, 3),
        activation="relu", kernel_regularizer=tf.keras.regularizers.l2(REGULARIZATION_PARAMETER))
    )
    model.add(tf.keras.layers.BatchNormalization())
    model.add(tf.keras.layers.MaxPooling2D(pool_size=(3, 3), strides=(2, 2), padding="same"))

    model.add(tf.keras.layers.Conv2D(
        filters=32, kernel_size=(2, 2),
        activation="relu", kernel_regularizer=tf.keras.regularizers.l2(REGULARIZATION_PARAMETER))
    )
    model.add(tf.keras.layers.BatchNormalization())
    model.add(tf.keras.layers.MaxPooling2D(pool_size=(3, 3), strides=(2, 2), padding="same"))

    model.add(tf.keras.layers.Flatten())
    model.add(tf.keras.layers.Dense(units=64, activation="relu"))
    model.add(tf.keras.layers.Dropout(0.3))
    model.add(tf.keras.layers.Dense(units=1))

    optimizer = tf.keras.optimizers.Adam(learning_rate=LEARNING_RATE)

    model.compile(optimizer=optimizer, loss="sparse_categorical_crossentropy", metrics=["mse"])

    model.summary()

    return model


if __name__ == "__main__":

    dataframe = pd.read_csv(AVA_DATAFRAME_PATH)

    data_generator = tf.keras.preprocessing.image.ImageDataGenerator(
        rescale=1.0/255,
        validation_split=0.2
    )

    train_generator = data_generator.flow_from_dataframe(
        directory=IMAGE_DATASET_PATH,
        dataframe=dataframe,
        x_col="id",
        y_col="score",
        class_mode="raw",
        target_size=(256, 256),
        color_mode="rgb",
        batch_size=32,
        subset="training"
    )

    validation_generator = data_generator.flow_from_dataframe(
        directory=IMAGE_DATASET_PATH,
        dataframe=dataframe,
        x_col="id",
        y_col="score",
        class_mode="raw",
        target_size=(256, 256),
        color_mode="rgb",
        batch_size=32,
        subset="validation"
    )

    model = build_model((256, 256, 3))

    model.fit_generator(
        generator=train_generator,
        steps_per_epoch=train_generator.samples // train_generator.batch_size,
        validation_data=validation_generator,
        validation_steps=validation_generator.samples // validation_generator.batch_size,
        epochs=EPOCHS
    )

    model.save(MODEL_PATH)
