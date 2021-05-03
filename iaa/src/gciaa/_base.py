import importlib
import numpy as np
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dropout, Dense
from tensorflow.keras.optimizers import RMSprop
from tensorflow.keras import backend as K
from tensorflow.keras import Input
from tensorflow.keras.layers import Lambda

from time import time_ns


def contrastive_loss(y_true, y_predicted):
    margin = 1
    return K.mean(y_true * K.maximum(margin - y_predicted, 0) + (1 - y_true) * y_predicted)


def accuracy(y_true, y_predicted):
    return K.mean(K.equal(y_true, K.cast(y_predicted > 0.5, y_true.dtype)))


def mapped_comparison_layer(vectors):
    (features_a, features_b) = vectors
    rank_vector = K.constant(np.array([i for i in range(1, 11)]).reshape(1, 10))

    means_a = K.dot(rank_vector, K.transpose(features_a))
    means_b = K.dot(rank_vector, K.transpose(features_b))
    distance = K.transpose(means_b - means_a)

    # sum_a = K.sum(features_a)
    # sum_b = K.sum(features_b)
    # distance = K.transpose(sum_b - sum_a)

    return distance


class BaseModule:

    def __init__(self, base_model_name, weights=None, n_classes_base=1, loss=contrastive_loss, learning_rate=0.0001,
                 decay=0, dropout_rate=0):

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

        self.image_encoder_model = None
        self.siamese_model = None

    def build(self):

        imagenet_cnn = getattr(self.base_module, self.base_model_name)

        # Remove the last layer from InceptionResnetV2 (turn classification into a base for siamese network).
        imagenet_model = imagenet_cnn(input_shape=(224, 224, 3), weights=None, include_top=False, pooling='avg')

        x = Dropout(self.dropout_rate)(imagenet_model.output)
        x = Dense(units=10, activation='softmax')(x)

        # Set image encode model to the trained GIIAA model.
        self.image_encoder_model = Model(imagenet_model.inputs, x)
        self.image_encoder_model.load_weights(self.weights)

        # Build the siamese model.
        image_a = Input(shape=(224, 224, 3), dtype='float32')
        image_b = Input(shape=(224, 224, 3), dtype='float32')
        encoding_a = self.image_encoder_model(image_a)
        encoding_b = self.image_encoder_model(image_b)

        x = Lambda(mapped_comparison_layer, name="mapped_comparison_layer")([encoding_a, encoding_b])
        x = Dense(units=1, activation="sigmoid")(x)

        self.siamese_model = Model(inputs=[image_a, image_b], outputs=x)

        # for layer in self.siamese_model.layers:
        #     layer.trainable = False

    def compile(self):
        self.siamese_model.compile(optimizer=RMSprop(lr=self.learning_rate), loss=self.loss, metrics=[accuracy])

    def predict(self, inputs):
        start = time_ns()
        prediction = self.siamese_model.predict([inputs[0], inputs[1]])
        print("Prediction in ns: {}".format(time_ns() - start))
        return prediction
