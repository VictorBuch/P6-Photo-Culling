"""
Prepares a task-specific dataframe from AVA.txt, i.e. transforms all the AVA.txt information into
a dataframe of two columns: image filename (for data generator to access it dynamically) and a label
(either normalized mean-value of ranks, or distribution of ranks).
"""

import os
import pandas as pd
from tqdm import tqdm


AVA_DATASET_TRAIN_PATH = "../../ava/train"
AVA_DATAFRAME_TRAIN_PATH = "../../ava/AVA_dist_train_dataframe.csv"

AVA_DATASET_SUBSET_PATH = "../../ava/subset/"
AVA_DATAFRAME_SUBSET_PATH = "../../ava/AVA_dist_subset_dataframe.csv"

AVA_DATASET_TEST_PATH = "../../ava/test"
AVA_DATAFRAME_TEST_PATH = "../../ava/AVA_dist_test_dataframe.csv"


AVA_TEXT_PATH = "../../ava/AVA.txt"


def prepare_dataframe_mean(image_dataset_path, image_info_path):
    original_dataframe = pd.read_csv(image_info_path, sep=' ')

    data = {
        "id": [],
        "score": []
    }

    count = 0
    count_failed = 0

    for filename in os.listdir(image_dataset_path):

        # Loop through image directory and get the row from AVA.txt dataframe where the index
        # (in dataframe) equals filename minus .jpg.

        file_index = filename.split('.')[0]

        if file_index.isdigit():
            image_data = original_dataframe[original_dataframe["index"] == int(file_index)].iloc[0]
        else:
            print("Non-digit file name: {}".format(file_index))
            count_failed += 1
            continue

        count += 1

        # Get the average of ranks for now (although literature suggests to use different metrics).

        num_annotations = 0
        rank_sum = 0

        for i in range(1, 11):
            rank_sum += image_data[str(i)] * i
            num_annotations += image_data[str(i)]

        average_rank = rank_sum / num_annotations

        data["id"].append(filename)
        data["score"].append(average_rank / 10)

        if count % 500 == 0:
            print("Count: {}".format(count))

    print("{} indices were not found in the image dataset.".format(count_failed))

    return pd.DataFrame(data)


def prepare_dataframe_dist(image_dataset_path, image_info_path):

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
    dataframe = prepare_dataframe_dist(AVA_DATASET_TRAIN_PATH, AVA_TEXT_PATH)
    dataframe.to_csv(AVA_DATAFRAME_TRAIN_PATH)
