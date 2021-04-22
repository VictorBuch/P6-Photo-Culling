import numpy as np


class SiameseGenerator:

    def __init__(self, generator, dataframe, subset, target_size=(224, 224), color_mode='rgb', shuffle=True, batch_size=64):

        self.generator_a = generator.flow_from_dataframe(
            dataframe=dataframe,
            target_size=target_size,
            color_mode=color_mode,
            batch_size=batch_size,
            shuffle=shuffle,
            seed=35,
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
            seed=35,
            x_col='id_b',
            y_col='label',
            class_mode='raw',
            subset=subset
        )

        self.samples_per_epoch = self.generator_a.samples
        self.batch_size = batch_size

    def get_pairwise_flow_from_dataframe(self):

        while True:

            print("Generating...")
            (image_batch_a, label_batch) = self.generator_a.next()
            (image_batch_b, _) = self.generator_b.next()

            # Learn how exactly these custom generators, work, should I yield a batch or one at a time, what about the label, excetra..

            print("Generated.")

            yield [image_batch_a, image_batch_b], [label_batch]

