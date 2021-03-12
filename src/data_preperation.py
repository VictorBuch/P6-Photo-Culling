# from sklearn.model_selection import train_test_split
# import tensorflow.keras as keras
# import tensorflow as tf

import numpy as np
import cv2
import os
import json
import pandas as pd

# Whatever preprocessing necessary (maybe cropping, reshaping) to get the dataset into training material


def prepare_dataset(image_dataset_path, image_info_path):
    # This method's task is to get the image data from the folder into numpy arrays
    # and also to dissect the AVA.txt's content and extract the ranks into numpy array of labels (and associate them
    # with the images they correspond to.

    dataframe = pd.read_csv(image_info_path, sep=' ')

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


def get_labels(image_dataset_path, image_info_path):
    dataframe = pd.read_csv(image_info_path, sep=' ')

    labels = []

    count = 0
    count_failed = 0

    for filename in os.listdir(image_dataset_path):

        # Get the row from AVA.txt dataframe where the index (in dataframe) equals filename minus .jpg.
        image_data = dataframe[dataframe["index"] == int(filename.split('.')[0])]

        count += 1
        if image_data is None:
            # We will remove these from the directory, but first I wanna see how many (if any) we're talking.
            count_failed += 1
            continue

        # Get the average of ranks (although literature suggests to use different metrics).
        num_annotations = 0
        rank_sum = 0

        for i in range(1, 11):
            rank_sum += image_data[str(i)] * i
            num_annotations += image_data[str(i)]

        average_rank = rank_sum / num_annotations
        labels.append(average_rank)
        if count % 500 == 0:
            print("Count: {}".format(count))

    print("This many fucked up: {}".format(count_failed))
    return labels


def prepare_dataframe(image_dataset_path, image_info_path):
    original_dataframe = pd.read_csv(image_info_path, sep=' ')

    data = {
        "filename": [],
        "rank": []
    }

    count = 0
    count_failed = 0

    for filename in os.listdir(image_dataset_path):

        if count > 2000:
            break

        # Get the row from AVA.txt dataframe where the index (in dataframe) equals filename minus .jpg.
        image_data = original_dataframe[original_dataframe["index"] == int(filename.split('.')[0])].iloc[0]

        count += 1
        if image_data is None:
            # We will remove these from the directory, but first I wanna see how many (if any) we're talking.
            count_failed += 1
            continue

        # Get the average of ranks (although literature suggests to use different metrics).
        num_annotations = 0
        rank_sum = 0

        for i in range(1, 11):
            rank_sum += image_data[str(i)] * i
            num_annotations += image_data[str(i)]

        average_rank = int(round(rank_sum / num_annotations))

        data["filename"].append(filename)
        data["rank"].append(average_rank)

        if count % 500 == 0:
            print("Count: {}".format(count))

    print("{} indices were not found in the image dataset.".format(count_failed))

    dataframe = pd.DataFrame(data)
    dataframe.to_csv("../datasets/AVA_dataframe.csv")
