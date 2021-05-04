import random

SEED = 1


class SiameseGeneratorCat:

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

    def get_pairwise_flow_from_dataframe(self):

        while True:
            (image_batch_a, label_batch) = self.generator_a.next()
            (image_batch_b, _) = self.generator_b.next()

            yield [image_batch_a, image_batch_b], [label_batch]


class SiameseGeneratorDist:
    def __init__(self, generator, distortion_generator, dataframe, subset=None, target_size=(224, 224), color_mode='rgb', shuffle=True, batch_size=64):

        self.generator_a = generator.flow_from_dataframe(
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

        self.generator_b = distortion_generator.flow_from_dataframe(
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

        self.samples_per_epoch = self.generator_a.samples
        self.batch_size = batch_size

    def get_pairwise_flow_from_dataframe(self):

        while True:
            (image_batch_a, label_batch) = self.generator_a.next()
            (image_batch_b, _) = self.generator_b.next()

            if random.random() < 0.5:
                (image_batch_a, image_batch_b) = (image_batch_b, image_batch_a)
                label_batch = [1.0 for _ in label_batch]

            print(label_batch)

            yield [image_batch_a, image_batch_b], [label_batch]

