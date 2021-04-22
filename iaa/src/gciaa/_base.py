import importlib
import numpy as np
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dropout, Dense
from tensorflow.keras.optimizers import RMSprop
from tensorflow.keras.optimizers import Adam
from tensorflow.keras import backend as K
from tensorflow.keras import Input
from tensorflow.keras.layers import Lambda


def contrastive_loss(y_true, y_predicted):
    margin = 1
    return K.mean(y_true * 0.5 * K.square(y_predicted) +
                  (1 - y_true) * 0.5 * K.square(K.maximum(margin - y_predicted, 0)))


def mapped_comparison_layer(vectors):
    # This is a custom comparison function I made up for our use case.
    # All Siamese networks I researched are used for similarity checking (of similar and dissimilar pairs),
    # but... but reasons... I don't have time to write this I'll get back to you.

    (features_a, features_b) = vectors

    magnitude_a = K.sqrt(K.sum(K.square(features_a), axis=1, keepdims=True))
    magnitude_b = K.sqrt(K.sum(K.square(features_b), axis=1, keepdims=True))
    # The thinking here is something like this:
    # 1, If Image A > Image B, then output should be close to 0, otherwise close to 1.
    # 2, If Image A > Image B, this layer should output a large negative number, and vice versa,
    # which is then mapped by sigmoid into range 0 and 1
    # 3, Magnitude of the feature vector is (read as "probably isn't", since it's my rushed unproven theory) the model's
    # estimation of the image's aesthetics, so that's what we'll use.
    # sigmoid(Magnitude B - Mangitude A) happens to output ~0 if A > B, and ~1 if B > A, just like we want
    # 4, next layer is the sigmoid, if you don't know what this one does, google image of sigmoid function you'll get it
    # 5, this return value could maybe be "decorated" by square rooting it or whatnot, but I'll take it raw

    return K.sqrt(K.sum(K.square(features_a - features_b), axis=1, keepdims=True))


class BaseModule:

    def __init__(self, base_model_name, weights=None, n_classes_base=1, loss=contrastive_loss, learning_rate=0.0001, decay=0, dropout_rate=0):

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

        BaseCNN = getattr(self.base_module, self.base_model_name)

        # Remove the last layer from InceptionResnetV2 (turn classification into a base for siamese network).
        imagenet_model = BaseCNN(input_shape=(224, 224, 3), weights=None, include_top=False, pooling='avg')

        x = Dropout(self.dropout_rate)(imagenet_model.output)
        x = Dense(units=10, activation='softmax')(x)

        giiaa_model = Model(imagenet_model.inputs, x)
        giiaa_model.load_weights(self.weights)
        giiaa_weights = giiaa_model.get_weights()

        self.image_encoder_model = Model(imagenet_model.inputs, imagenet_model.output)
        self.image_encoder_model.set_weights(giiaa_weights[:-2])

        # x = Dense(units=10, activation='relu')(imagenet_model.output)
        # base_model = Model(imagenet_model.inputs, x)

        # image_encoder_weights = giiaa_weights[:-2]
        # image_encoder_weights.append(np.random.rand(1536, 512))
        # image_encoder_weights.append(np.random.rand(512,))
        # self.image_encoder_model = Model(imagenet_model.inputs, base_model.output)
        # self.image_encoder_model.set_weights(image_encoder_weights)


        # Build the siamese model.

        image_a = Input(shape=(224, 224, 3), dtype='float32')
        image_b = Input(shape=(224, 224, 3), dtype='float32')
        encoding_a = self.image_encoder_model(image_a)
        encoding_b = self.image_encoder_model(image_b)

        x = Lambda(mapped_comparison_layer)([encoding_a, encoding_b])
        x = Dense(units=1, activation="sigmoid")(x)

        self.siamese_model = Model(inputs=[image_a, image_b], outputs=x)
        self.siamese_model.summary()

    def compile(self):
        self.siamese_model.compile(optimizer=Adam(lr=self.learning_rate, decay=self.decay), loss=self.loss)

