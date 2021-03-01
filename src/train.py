from src.data_preperation import *

from sklearn.model_selection import train_test_split
import tensorflow.keras as keras
import tensorflow as tf
import numpy as np
import cv2
import os
import json

IMAGE_DATASET_PATH = "../datasets/images"
IMAGE_DATASET_SUBSET_PATH = "../datasets/images_subset/"
IMAGE_INFO_PATH = "../datasets/AVA.txt"

MODEL_PATH = "models/model.h5"

EPOCHS = 40
BATCH_SIZE = 32
LEARNING_RATE = 0.0001
REGULARIZATION_PARAMETER = 0.001


def get_data_splits(dataset_path):

    # Splt the data into train, validation and test set

    X = np.array()  # All images
    y = np.array()  # All ranks (ordered according to the images)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1)
    X_train, X_validation, y_train, y_validation = train_test_split(X_train, y_train, test_size=0.1)

    X_train = X_train[..., np.newaxis]
    X_validation = X_validation[..., np.newaxis]
    X_test = X_test[..., np.newaxis]

    return X_train, X_validation, X_test, y_train, y_validation, y_test


def build_model(input_shape):

    model = keras.models.Sequential()

    model.add(keras.layers.Conv2D(
        filters=64, kernel_size=(3, 3), input_shape=input_shape,
        activation="relu", kernel_regularizer=keras.regularizers.l2(REGULARIZATION_PARAMETER))
    )
    model.add(keras.layers.BatchNormalization())
    model.add(keras.layers.MaxPooling2D(pool_size=(3, 3), strides=(2, 2), padding="same"))

    model.add(keras.layers.Conv2D(
        filters=32, kernel_size=(3, 3),
        activation="relu", kernel_regularizer=keras.regularizers.l2(REGULARIZATION_PARAMETER))
    )
    model.add(keras.layers.BatchNormalization())
    model.add(keras.layers.MaxPooling2D(pool_size=(3, 3), strides=(2, 2), padding="same"))

    model.add(keras.layers.Conv2D(
        filters=32, kernel_size=(2, 2),
        activation="relu", kernel_regularizer=keras.regularizers.l2(REGULARIZATION_PARAMETER))
    )
    model.add(keras.layers.BatchNormalization())
    model.add(keras.layers.MaxPooling2D(pool_size=(3, 3), strides=(2, 2), padding="same"))

    model.add(keras.layers.Flatten())
    model.add(keras.layers.Dense(units=64, activation="relu"))
    model.add(keras.layers.Dropout(0.3))
    model.add(keras.layers.Dense(units=1))

    optimizer = keras.optimizers.Adam(learning_rate=LEARNING_RATE)
    model.compile(optimizer=optimizer, loss="sparse_categorical_crossentropy", metrics=["accuracy"])

    model.summary()

    return model


if __name__ == "__main__":

    labels = get_labels(IMAGE_DATASET_PATH, IMAGE_INFO_PATH)

    keras.preprocessing.image.image_dataset_from_directory(
        IMAGE_DATASET_PATH,
        labels=labels,
        label_mode="int",
        class_names=None,
        color_mode="rgb",
        batch_size=32,
        image_size=(256, 256),
        shuffle=True,
        seed=None,
        validation_split=None,
        subset=None,
        interpolation="bilinear",
        follow_links=False,
    )


    X_train, X_validation, X_test, y_train, y_validation, y_test = get_data_splits(IMAGE_DATASET_PATH)

    model = build_model((X_train.shape[1], X_train.shape[2], X_train.shape[3]))

    early_stopping_callback = keras.callbacks.EarlyStopping(monitor="accuracy", min_delta=0.001, patience=5)

    history = model.fit(X_train, y_train, epochs=EPOCHS, batch_size=BATCH_SIZE,
              validation_data=(X_validation, y_validation), callbacks=[early_stopping_callback])

    test_loss, test_accuracy = model.evaluate(X_test, y_test)

    print(f"Test loss is {test_loss}.")
    print(f"Test accuracy is {test_accuracy}.")

    model.save(MODEL_PATH)


