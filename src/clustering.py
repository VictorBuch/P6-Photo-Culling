"""
This script solves the problem of clustering data based on its time information.

Image's time metadata is expected to follow a format "YY/MM/DD HH:MM:SS",
although this script is adaptable and adding or removing information (say changing the format,
removing year data, or adding milliseconds or the image's file index) is a minor implementation change.

Input: An array (any size) of textual time data information in the format above.
Output: A key-value store encoding the cluster information. Keys are cluster indices (positive integers),
values are lists containing chronologically ordered time data belonging to a cluster.

Algorithm:
    * We use distance between data stamps to determine the neighbours, which should be clustered together.
    * The distance is represented as a tuple: (days, seconds), see DISTANCE THRESHOLD below. It is something
      like a priority-ordered distance tuple. If extra information is necessary (file index when time data missing,
      or some other metadata), it can simply be added to the distance representation, e.g. (days, seconds, file_index)
      The representation of distance using a uniform scale, say seconds or milliseconds,
      could cause data overflow when dealing with a huge distance, that's why a tuple. (One year is 3.2 × 10^10 milliseconds,
      we cannot store that in a numeric variable. There probably won't be a one year difference between our
      images, but when solving a problem, it's a good practice to generalize it to its extreme.)
    * We loop through all time stamps and compare them with the ones already clustered. If a time stamp is
      close enough (less than DISTANCE_THRESHOLD) to any other time stamp in a cluster,
      the time stamp is put into that cluster. If it belongs to no cluster, it is put to a new cluster.

Possible improvements:
    * Cluster content is ordered chronologically, but not the clusters themselves.
    * Other metadata, such as image's file index could be considered, when image's time data is ambigous or missing.
    * Distance threshold could adapt to the context.
    * This is quite a basic implementation. (I googled time series clustering, but what I found seemed to be
      unnecessarily complicated for our problem, so I wrote this for now.)
"""


import datetime as dt

FORMAT = "%y/%m/%d %H:%M:%S"
DISTANCE_THRESHOLD = (0, 5)  # 0 days, 5 seconds


def get_distance(time_stamp_a, time_stamp_b):
    distance = dt.datetime.strptime(time_stamp_b, FORMAT) - dt.datetime.strptime(time_stamp_a, FORMAT)
    return [distance.days, distance.seconds]


def in_proximity(time_stamp_a, time_stamp_b, distance_threshold=DISTANCE_THRESHOLD):
    """Is one time stamp close to another time stamp with respect to distance threshold?"""

    result = True

    distance = get_distance(time_stamp_a, time_stamp_b) if is_predecessor(time_stamp_a, time_stamp_b) else get_distance(time_stamp_b, time_stamp_a)

    for i in range(0, len(distance)):
        if abs(distance[i]) > distance_threshold[i]:
            result = False
            break

    return result


def is_predecessor(time_stamp_a, time_stamp_b):
    """Did time_stamp_a come before time_stamp_b?"""

    distance = get_distance(time_stamp_a, time_stamp_b)

    for i in range(0, len(distance)):

        if distance[i] != 0:
            return distance[i] > 0

    # If two time stamps are equal, (i) this will never happen (ii) let's just return True
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
        while i < len(clusters) and not is_time_stamp_sorted:

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

    time_data = ["21/03/08 09:18:44", "21/03/08 09:18:43",
                 "20/03/08 09:18:43", "20/03/08 09:18:44", "21/03/08 09:18:45"]

    clusters = cluster_data(time_data)

    for key in clusters:
        print("Cluster {}:".format(key))
        print(clusters[key])
        print("---")

