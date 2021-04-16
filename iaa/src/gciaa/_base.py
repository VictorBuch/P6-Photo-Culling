import importlib
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dropout, Dense
from tensorflow.keras.optimizers import Adam
from tensorflow.keras import backend as K
from tensorflow.keras import Sequential
from tensorflow.keras import Input
from tensorflow.keras.layers import Lambda


def relative_distance(vectors):
    (features_A, features_B) = vectors
    return features_A - features_B


class BaseModule:

    def __init__(self, base_model_name, weights=None, n_classes_base=1, loss=None, learning_rate=0.001, decay=0, dropout_rate=0):

        self.base_model_name = base_model_name
        self.n_classes_base = n_classes_base
        self.loss = loss
        self.weights = weights

        self.learning_rate = learning_rate
        self.decay = decay
        self.dropout_rate = dropout_rate

        if self.base_model_name == "InceptionResNetV2":
            self.base_module = importlib.import_module('tensorflow.keras.applications.inception_resnet_v2')
        else:
            raise Exception("Trying to use unknown model: {}.".format(self.base_model_name))

        self.base_model = None
        self.siamese_model = None

    def build(self):

        BaseCNN = getattr(self.base_module, self.base_model_name)

        # Remove the last layer from InceptionResnetV2 (turn classification into a base for siamese network).
        imagenet_model = BaseCNN(input_shape=(224, 224, 3), weights=None, include_top=False, pooling='avg')

        x = Dropout(self.dropout_rate)(imagenet_model.output)
        x = Dense(units=10, activation='softmax')(x)

        giiaa_model = Model(imagenet_model.inputs, x)
        giiaa_model.load_weights(self.weights)
        base_weights = giiaa_model.get_weights()

        self.base_model = Model(imagenet_model.inputs, imagenet_model.output)
        self.base_model.set_weights(base_weights[:-2])
        
        # Build the siamese model.

        image_a = Input(shape=(224, 224, 3))
        image_b = Input(shape=(224, 224, 3))
        encoding_a = self.base_model(image_a)
        encoding_b = self.base_model(image_b)
        x = Lambda(relative_distance)([encoding_a, encoding_b])
        x = Dense(units=1, activation="sigmoid")(x)

        self.siamese_model = Model(inputs=[image_a, image_b], outputs=x)

    def compile(self):
        self.siamese_model.compile(optimizer=Adam(lr=self.learning_rate, decay=self.decay), loss=self.loss)

