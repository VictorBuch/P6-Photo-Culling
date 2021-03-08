"""
This script solves the problem of clustering data based on its time information.

Image's time metadata is expected to follow a format "YYYY:MM:DD:HH:MM:SS",
although this script is adaptable and adding or removing information (say removing year data,
or adding milliseconds or the image's file index) is a minor implementation change.

Input: An array (any size) of textual time data information in format "YYYY:MM:DD:HH:MM:SS".
Output: A key-value store encoding the cluster information. Keys are cluster indices (positive integers),
values are numpy arrays containing chronologically ordered time data belonging to a cluster.

In words:
    * We use distance between data stamps to determine the neighbours, which should be clustered together.
    * The distance is represented as a set of differently scaled time information
      (years -> seconds, see DISTANCE_THREHSOLD below). The representation of distance using one uniform scale,
      say seconds or milliseconds, could cause data overflow when dealing with a huge distance.
      (One year is 3.2 × 10^10 milliseconds, we cannot store that in a numeric variable.
      And yes, there probably won't be a one year difference between our image data, but when solving
      a problem, it's a good practice to generalize it to its extreme.)
    * We loop through all time stamps and compare them with the ones already clustered. If a time stamp is
      close enough (less than DISTANCE_THRESHOLD) to any other time stamp in a cluster,
      the time stamp is put into that cluster. If it belongs to no cluster, it is put to a new cluster.

Possible improvements:
    * Cluster content is ordered chronologically, but not the clusters themselves.
    * Other metadata, such as image's file index could be considered, when image's time data is ambigous or missing.
    * Distance threshold could adapt to the context.
    * This is quite a basic implementation. (I googled time series clustering, but what I found seemed to be
      unnecessarily complicated for our problem, so I wrote this for now.
    * Also, I gotta fix in_proximity function, there's a bug.
"""


import numpy as np


DISTANCE_THRESHOLD = (0, 0, 0, 0, 0, 5)  # 5 seconds


def get_time_data(time_stamp):  # "2021:03:08:09:18:43" -> [2021, 3, 8, 9, 18, 43]
    return np.array(time_stamp.split(":")).astype(int)


def in_proximity(time_stamp_a, time_stamp_b, distance_threshold=DISTANCE_THRESHOLD):
    """Is one time stamp close to another time stamp with respect to distance threshold?"""

    # I forgot to account for when seconds flow into minutes, etc. Gotta fix that.

    result = True

    for i in range(0, len(time_stamp_a)):
        if abs(time_stamp_a[i] - time_stamp_b[i]) > distance_threshold[i]:
            result = False
            break

    return result


def is_predecessor(time_stamp_a, time_stamp_b):
    """Did time_stamp_a come before time_stamp_b?"""

    for i in range(0, len(time_stamp_a)):
        distance = time_stamp_a[i] - time_stamp_b[i]

        if distance != 0:
            return distance < 0

    return True


def insert_time_stamp_chronologically(time_stamp, cluster):
    """This function inserts time stamp into a cluster chronologically."""

    is_time_stamp_inserted = False
    for i in range(0, len(cluster)):
        if is_predecessor(time_stamp, cluster[i]):
            cluster.insert(i, time_stamp)
            is_time_stamp_inserted = True

    if not is_time_stamp_inserted:
        cluster.append(time_stamp)


def cluster_data(time_data):
    """The actual algorithm"""

    clusters = {}

    for time_stamp in time_data:

        is_time_stamp_sorted = False

        i = 0
        while i < len(clusters) and not is_time_stamp_sorted:  #

            j = 0
            while j < len(clusters[i]) and not is_time_stamp_sorted:
                if in_proximity(time_stamp, clusters[i][j]):
                    insert_time_stamp_chronologically(time_stamp, clusters[i])
                    is_time_stamp_sorted = True
                j += 1

            i += 1

        if not is_time_stamp_sorted:
            clusters[len(clusters)] = [time_stamp]

    return clusters


if __name__ == "__main__":

    text_time_data = ["2021:03:08:09:18:44", "2021:03:08:09:18:43",
                      "2020:03:08:09:18:43", "2020:03:08:09:18:44", "2021:03:08:09:18:45"]
    time_data = [get_time_data(time_stamp) for time_stamp in text_time_data]

    clusters = cluster_data(time_data)

    for key in clusters:
        print("Cluster {}:".format(key))
        print(clusters[key])
        print("---")

