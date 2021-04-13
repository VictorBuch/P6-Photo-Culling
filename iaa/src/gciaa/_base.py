import importlib
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dropout, Dense
from tensorflow.keras.optimizers import Adam
from tensorflow.keras import backend as K


class BaseModule:

    def __init__(self, base_model_name, weights=None, n_classes_base=10, loss=None, learning_rate=0.001, decay=0, dropout_rate=0):

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
        self.pairwise_model = None

    def build(self):

        BaseCnn = getattr(self.base_module, self.base_model_name)

        # Remove the last layer (turn classification into a base for siamese network).
        self.base_model = BaseCnn(input_shape=(224, 224, 3), weights=None, include_top=False, pooling='avg')

        x = Dropout(self.dropout_rate)(self.base_model.output)
        x = Dense(units=self.n_classes_base, activation='softmax')(x)

        self.base_model = Model(self.base_model.inputs, x)
        self.base_model.load_weights(self.weights)

        self.base_model.summary()

        # Either use custom CNN as base, or construct it manually.
        # Build the pairwise model.

    def compile(self):
        self.pairwise_model.compile(optimizer=Adam(lr=self.learning_rate, decay=self.decay), loss=self.loss)

    def preprocess(self):
        return self.base_module.preprocess_input
