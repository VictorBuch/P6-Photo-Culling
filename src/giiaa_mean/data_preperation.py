"""
Functions to preprocess and modify the original data into a trainable format.
"""

import os
import pandas as pd


def prepare_dataframe(image_dataset_path, image_info_path):
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
