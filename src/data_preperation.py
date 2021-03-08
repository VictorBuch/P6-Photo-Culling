# from sklearn.model_selection import train_test_split
# import tensorflow.keras as keras
# import tensorflow as tf

import numpy as np
import cv2
import os
import json
import pandas as pd

# Whatever preprocessing necessary (maybe cropping, reshaping) to get the dataset into training material

IMAGE_DATASET_PATH = "../datasets/images_subset/"
TEXT_FILE_PATH = "../datasets/AVA.txt"


def prepare_dataset(image_dataset_path, text_file_path):
    # This method's task is to get the image data from the folder into numpy arrays
    # and also to dissect the AVA.txt's content and extract the ranks into numpy array of labels (and associate them
    # with the images they correspond to.

    dataframe = pd.read_csv(text_file_path, sep=' ')

    images = []
    labels = []

    for filename in os.listdir(image_dataset_path):

        # Get the row from AVA.txt dataframe where the index (in dataframe) equals filename minus .jpg.
        image_data = dataframe[dataframe["index"] == int(filename.split('.')[0])]

        if image_data is None:
            continue


        # Get the average of ranks (although literature suggests to use different metrics).
        num_annotations = 0
        rank_sum = 0

        for i in range(1, 11):
            rank_sum += image_data[str(i)] * i
            num_annotations += image_data[str(i)]

        average_rank = rank_sum / num_annotations
        labels.append(average_rank)

        # If the index is in the dataframe, get the image.
        filepath = os.path.join(image_dataset_path, filename)
        image = np.array(cv2.imread(filepath))
        image.resize((240, 240, 3))  # Need to find standarized format, which doesn't deform the image too much.
        images.append(image)

    images = np.array(images)
    labels = np.array(labels)

    return images, labels


if __name__ == "__main__":
    X, y = prepare_dataset(IMAGE_DATASET_PATH, TEXT_FILE_PATH)

    print("Input shape: {}.".format(X.shape))
    print("Output shape: {}.".format(y.shape))

    # This takes ~8 seconds with just 210 examples. We might need to find a better way to load 32GB of data
    # into 16GM of RAM later on.
