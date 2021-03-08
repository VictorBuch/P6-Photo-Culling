import tensorflow.keras as keras


class ImageRankingService:

    def __init__(self, model_path):
        self.model = keras.models.load_model(model_path)

    def predict(self, image):
        # 1, Preprocess image the same way it was preprocessed for training.
        # 2, Predict ...

        return self.model.predict(image)



