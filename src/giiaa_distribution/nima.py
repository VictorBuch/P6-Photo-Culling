
import importlib

class Nima:

    def __init__(self, base_model_name, n_classes, learning_rate_dense, decay_dense, dropout_rate):
        self.base_model_name = base_model_name
        self.n_classes = n_classes
        self.learning_rate_dense = learning_rate_dense
        self.dropout_rate = dropout_rate
        self.decay_dense = decay_dense
        self.dropout_rate = dropout_rate
        self.base_module = importlib.import_module('tensorflow.keras.applications.'+self.base_model_name.lower())

    def build(self):

        BaseCnn = getattr(self.base_module, self.base_model_name)


        return ""

