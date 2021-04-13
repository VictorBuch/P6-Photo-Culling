

def get_pairwise_flow_from_dataframe(
        generator,
        dataframe,
        subset,
        target_size=(224, 224),
        color_mode='rgb',
        shuffle=True,
        batch_size=64):

    generator_a = generator.flow_from_dataframe(
        dataframe=dataframe,
        target_size=target_size,
        color_mode=color_mode,
        batch_size=batch_size,
        shuffle=shuffle,
        x_col='id_a',
        y_col='label',
        class_mode='raw',
        subset=subset
    )

    generator_b = generator.flow_from_dataframe(
        dataframe=dataframe,
        target_size=target_size,
        color_mode=color_mode,
        batch_size=batch_size,
        shuffle=shuffle,
        x_col='id_b',
        y_col='label',
        class_mode='raw',
        subset=subset
    )

    while True:
        image_a = generator_a.next()
        image_b = generator_b.next()
        print("Things about the yielding:")
        print(image_a.shape)
        print(image_a)
        yield [image_a, image_b, 0]


