"""
Functions to preprocess and modify the original data into a trainable format.
"""

import os
import pandas as pd
import numpy as np
from tqdm import tqdm


AVA_DATASET_PATH = "../../ava/train"
AVA_DATAFRAME_PATH = "../../ava/AVA_distribution_dataframe.csv"
AVA_DATAFRAME_LABEL_PATH = "../../ava/AVA_distribution_label_dataframe.csv"

AVA_DATASET_SUBSET_PATH = "../../ava/train_subset/"
AVA_DATAFRAME_SUBSET_PATH = "../../ava/AVA_distribution_dataframe_subset.csv"
AVA_DATAFRAME_SUBSET_LABEL_PATH = "../../ava/AVA_distribution_dataframe_subset.csv"

AVA_TEXT_PATH = "../../ava/AVA.txt"


def prepare_dataframe(image_dataset_path, image_info_path):

    original_dataframe = pd.read_csv(image_info_path, sep=' ')

    data = {
        'id': [],
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': [],
        '7': [],
        '8': [],
        '9': [],
        '10': []
    }

    count_failed = 0

    for filename in tqdm(os.listdir(image_dataset_path)):

        # Loop through image directory and get the row from AVA.txt dataframe where the index
        # (in dataframe) equals filename minus .jpg.

        file_index = filename.split('.')[0]

        if file_index.isdigit():
            image_data = original_dataframe[original_dataframe['index'] == int(file_index)].iloc[0]
        else:
            print("Non-digit file name: {}".format(file_index))
            count_failed += 1
            continue

        # Get the histogram distribution of annotated scores as a list.
        data['id'].append(filename)


        num_annotations = 0.0
        for i in range(1, 11):
            num_annotations += image_data[str(i)]
        for i in range(1, 11):
            data[str(i)].append(image_data[str(i)] / num_annotations)

    print("{} indices were not found in the image dataset.".format(count_failed))

    return pd.DataFrame(data)


def prepare_dataframe_label(image_dataset_path, image_info_path):

    original_dataframe = pd.read_csv(image_info_path, sep=' ')

    data = {
        'id': [],
        'label': []
    }

    count_failed = 0

    for filename in tqdm(os.listdir(image_dataset_path)):

        # Loop through image directory and get the row from AVA.txt dataframe where the index
        # (in dataframe) equals filename minus .jpg.

        file_index = filename.split('.')[0]

        if file_index.isdigit():
            image_data = original_dataframe[original_dataframe['index'] == int(file_index)].iloc[0]
        else:
            print("Non-digit file name: {}".format(file_index))
            count_failed += 1
            continue

        # Get the histogram distribution of annotated scores as a list.
        score_distribution = []
        num_annotations = 0.0

        for i in range(1, 11):
            num_annotations += image_data[str(i)]

        for i in range(1, 11):
            score_distribution.append(image_data[str(i)] / num_annotations)

        data['id'].append(filename)
        data['label'].append(score_distribution)

    print("{} indices were not found in the image dataset.".format(count_failed))

    return pd.DataFrame(data)


if __name__ == "__main__":
    # dataframe = prepare_dataframe(AVA_DATASET_SUBSET_PATH, AVA_TEXT_PATH)
    # dataframe.to_csv(AVA_DATAFRAME_SUBSET_PATH)

    dataframe = prepare_dataframe_label(AVA_DATASET_SUBSET_PATH, AVA_TEXT_PATH)
    dataframe.to_csv(AVA_DATAFRAME_SUBSET_LABEL_PATH)
