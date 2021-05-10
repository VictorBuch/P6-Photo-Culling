import random
import numpy as np
import cv2

SEED = 1


class SiameseGeneratorCategories:

    def __init__(self, generator, dataframe, subset=None, target_size=(224, 224), color_mode='rgb', shuffle=True, batch_size=64):

        self.generator_a = generator.flow_from_dataframe(
            dataframe=dataframe,
            target_size=target_size,
            color_mode=color_mode,
            batch_size=batch_size,
            shuffle=shuffle,
            seed=SEED,
            x_col='id_a',
            y_col='label',
            class_mode='raw',
            subset=subset
        )

        self.generator_b = generator.flow_from_dataframe(
            dataframe=dataframe,
            target_size=target_size,
            color_mode=color_mode,
            batch_size=batch_size,
            shuffle=shuffle,
            seed=SEED,
            x_col='id_b',
            y_col='label',
            class_mode='raw',
            subset=subset
        )

        self.samples_per_epoch = self.generator_a.samples
        self.batch_size = batch_size

        self.distortion_blob = dict(radius=30)

    def get_pairwise_flow_from_dataframe(self):

        while True:
            (image_batch_a, label_batch) = self.generator_a.next()
            (image_batch_b, _) = self.generator_b.next()

            yield [image_batch_a, image_batch_b], [label_batch]


class SiameseGeneratorDistortions:
    def __init__(self, generator, distortion_generators, dataframe, subset=None, target_size=(224, 224), color_mode='rgb', shuffle=True, batch_size=64):

        self.flow_original = generator.flow_from_dataframe(
            dataframe=dataframe,
            target_size=target_size,
            color_mode=color_mode,
            batch_size=batch_size,
            shuffle=shuffle,
            seed=SEED,
            x_col='id',
            y_col='label',
            class_mode='raw',
            subset=subset
        )

        self.flow_distortions = []
        for generator in distortion_generators:
            self.flow_distortions.append(generator.flow_from_dataframe(
                dataframe=dataframe,
                target_size=target_size,
                color_mode=color_mode,
                batch_size=batch_size,
                shuffle=shuffle,
                seed=SEED,
                x_col='id',
                y_col='label',
                class_mode='raw',
                subset=subset
            ))

        self.samples_per_epoch = self.flow_original.samples
        self.batch_size = batch_size
        self.distortion_type = 0

    @staticmethod
    def apply_blur(image):
        image = np.array(image)
        distorted_image = cv2.blur(image, (10, 10))
        return distorted_image

    @staticmethod
    def apply_blob(image):
        distorted_image = np.array(image)

        radius_x = random.randrange(10, 50)
        radius_y = random.randrange(10, 50)
        center_x = random.randrange(radius_x, distorted_image.shape[0] - radius_x)
        center_y = random.randrange(radius_y, distorted_image.shape[0] - radius_y)

        distorted_image[center_x - radius_x // 2:center_x + radius_x // 2, center_y - radius_y // 2:center_y + radius_y // 2] = \
            [random.random() * 255.0, random.random() * 255.0, random.random() * 255.0]
        return distorted_image

    def get_pairwise_flow_from_dataframe(self):
        while True:

            (image_batch_a, label_batch) = self.flow_original.next()
            (image_batch_b, _) = random.choice(self.flow_distortions).next()

            seed = [float(random.random() < 0.5) for _ in range(len(label_batch))]

            shuffled_image_batch_a = []
            shuffled_image_batch_b = []
            shuffled_label_batch = []

            for i in range(len(seed)):
                (image_a, image_b) = \
                    (image_batch_a[i, :], image_batch_b[i, :]) if seed[i] == 0.0 else \
                    (image_batch_b[i, :], image_batch_a[i, :])
                shuffled_image_batch_a.append(image_a)
                shuffled_image_batch_b.append(image_b)
                shuffled_label_batch.append(seed[i])

            shuffled_image_batch_a = np.asarray(shuffled_image_batch_a)
            shuffled_image_batch_b = np.asarray(shuffled_image_batch_b)
            shuffled_label_batch = np.asarray(shuffled_label_batch)

            yield [shuffled_image_batch_a, shuffled_image_batch_b], [shuffled_label_batch]

            self.distortion_type = self.distortion_type + 1 if self.distortion_type + 1 < len(self.flow_distortions) else 0

