"""
Prepares a task-specific dataframe from AVA.txt, i.e. transforms all the AVA.txt information into
a dataframe of two columns: image filename (for data generator to access it dynamically) and a label
(either normalized mean-value of ranks, or distribution of ranks).
"""

import os
import pandas as pd
from tqdm import tqdm
import random

AVA_TEXT_PATH = "../../datasets/ava/AVA.txt"

AVA_DATASET_TRAIN_PATH = "../../datasets/ava/train"
AVA_DATASET_TEST_PATH = "../../datasets/ava/test"
AVA_DATASET_SUBSET_PATH = "../../datasets/ava/subset/"

AVA_DATAFRAME_GIIAA_HIST_TRAIN_PATH = "../../datasets/ava/giiaa/AVA_giiaa-hist_train_dataframe.csv"
AVA_DATAFRAME_GIIAA_HIST_TEST_PATH = "../../datasets/ava/giiaa/AVA_giiaa-hist_test_dataframe.csv"
AVA_DATAFRAME_GIIAA_HIST_SUBSET_PATH = "../../datasets/ava/giiaa/AVA_giiaa-hist_subset_dataframe.csv"

AVA_DATAFRAME_GCIAA_CAT_TRAIN_PATH = "../../datasets/ava/gciaa/AVA_gciaa-cat_train_dataframe.csv"
AVA_DATAFRAME_GCIAA_CAT_TEST_PATH = "../../datasets/ava/gciaa/AVA_gciaa-cat_test_dataframe.csv"
AVA_DATAFRAME_GCIAA_CAT_SUBSET_PATH = "../../datasets/ava/gciaa/AVA_gciaa-cat_subset_dataframe.csv"

AVA_DATAFRAME_GCIAA_DIST_TRAIN_PATH = "../../datasets/ava/gciaa/AVA_gciaa-dist_train_dataframe.csv"
AVA_DATAFRAME_GCIAA_DIST_TEST_PATH = "../../datasets/ava/gciaa/AVA_gciaa-dist_test_dataframe.csv"
AVA_DATAFRAME_GCIAA_DIST_SUBSET_PATH = "../../datasets/ava/gciaa/AVA_gciaa-dist_subset_dataframe.csv"


SELECTED_CATEGORIES_FOR_PAIRWISE_TRAINING = (19, 20, 43, 57, 21, 50, 2, 4, 38, 14, 15, 47, 7, 42, 26)
SEED = 31


def prepare_dataframe_giiaa_mean(image_dataset_path, image_info_path):
    original_dataframe = pd.read_csv(image_info_path, sep=' ')

    data = {
        "id": [],
        "label": []
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
        data["label"].append(average_rank / 10)

        if count % 500 == 0:
            print("Count: {}".format(count))

    print("{} indices were not found in the image dataset.".format(count_failed))

    return pd.DataFrame(data)


def prepare_dataframe_giiaa_hist(image_dataset_path, image_info_path):

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


def prepare_dataframe_gciaa_cat(
        image_dataset_path,
        image_info_path,
        selected_categories=SELECTED_CATEGORIES_FOR_PAIRWISE_TRAINING,
        pairs_per_category_scalar=0.7):

    original_dataframe = pd.read_csv(image_info_path, sep=' ')

    relevant_file_indices = []
    for filename in os.listdir(image_dataset_path):
        image_index = filename.split('.')[0]
        if image_index.isdigit():
            relevant_file_indices.append(image_index)

    filtered_dataframe = original_dataframe.loc[original_dataframe['index'].isin(relevant_file_indices)
                                                & ((original_dataframe['tag1'] > 0) | (original_dataframe['tag2'] > 0))]

    data = {
        'id_a': [],
        'id_b': [],
        'label': []
    }

    for i in tqdm(selected_categories):

        images_per_category = filtered_dataframe.loc[(filtered_dataframe['tag1'] == i) | (filtered_dataframe['tag2'] == i)]

        print("Number of images for category {}: {}".format(i, len(images_per_category)))

        for ii in range(int(len(images_per_category) * pairs_per_category_scalar)):

            try:
                random_pair = images_per_category.sample(2)
            except ValueError:
                print("Category {} has too few images.".format(i))
                break

            average_ranks = []

            for iii in range(2):
                num_annotations = 0
                rank_sum = 0
                image_in_pair = random_pair.iloc[iii]

                for iv in range(1, 11):
                    rank_sum += image_in_pair[str(iv)] * iv
                    num_annotations += image_in_pair[str(iv)]

                average_ranks.append(rank_sum / num_annotations)

            data['id_a'].append(os.path.join(image_dataset_path, "{}.jpg".format(random_pair.iloc[0]['index'])))
            data['id_b'].append(os.path.join(image_dataset_path, "{}.jpg".format(random_pair.iloc[1]['index'])))
            data['label'].append(float(average_ranks[0] < average_ranks[1]))

    return pd.DataFrame(data)


def prepare_dataframe_gciaa_dist(
        image_dataset_path,
        image_info_path,
        pairs_per_dataset_scalar=0.25):

    data = {
        'id': [],
        'label': []
    }

    filenames = os.listdir(image_dataset_path)
    random.Random(SEED).shuffle(filenames)

    for filename in tqdm(filenames[:int(len(filenames) * pairs_per_dataset_scalar)]):

        data['id'].append(os.path.join(image_dataset_path, filename))
        data['label'].append(0.0)

    return pd.DataFrame(data)


if __name__ == "__main__":
    dataframe = prepare_dataframe_gciaa_cat(AVA_DATASET_TEST_PATH, AVA_TEXT_PATH)
    dataframe.to_csv(AVA_DATAFRAME_GCIAA_CAT_TEST_PATH)
