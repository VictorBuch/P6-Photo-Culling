import importlib
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dropout, Dense
from tensorflow.keras.optimizers import Adam
from src.giiaa_distribution.emd import earth_movers_distance


class NimaModule:

    def __init__(self, base_model_name="InceptionResNetV2", n_classes=10,
                 learning_rate=0.001, decay=0, dropout_rate=0,
                 loss=earth_movers_distance, weights='imagenet'):

        self.base_model_name = base_model_name
        self.n_classes = n_classes
        self.loss = loss
        self.weights = weights

        self.learning_rate = learning_rate
        self.decay = decay
        self.dropout_rate = dropout_rate

        if self.base_model_name == "InceptionResNetV2":
            self.base_module = importlib.import_module('tensorflow.keras.applications.inception_resnet_v2')
        else:
            self.base_module = importlib.import_module('tensorflow.keras.applications.' + self.base_model_name.lower())

        self.base_model = None
        self.nima_model = None

    def build(self):

        BaseCnn = getattr(self.base_module, self.base_model_name)

        # Replace last layer with Dropout and Dense (virtually turn regression into classification).

        self.base_model = BaseCnn(input_shape=(224, 224, 3), weights=self.weights, include_top=False, pooling='avg')

        x = Dropout(self.dropout_rate)(self.base_model.output)
        x = Dense(units=self.n_classes, activation='softmax')(x)

        self.nima_model = Model(self.base_model.inputs, x)

    def compile(self):
        self.nima_model.compile(optimizer=Adam(lr=self.learning_rate, decay=self.decay), loss=self.loss)

    def preprocess(self):
        return self.base_module.preprocess_input
