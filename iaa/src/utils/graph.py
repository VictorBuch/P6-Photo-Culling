from tensorflow.keras.utils import plot_model
import pydot
# pydot.find_graphviz = lambda: True
# plot_model(base.base_model, show_shapes=True, to_file=MODELS_PATH+"model.pdf")

def _check_pydot():
    try:
        # Attempt to create an image of a blank graph
        # to check the pydot/graphviz installation.
        pydot.Dot.create(pydot.Dot())
    except Exception:
        # pydot raises a generic Exception here,
        # so no specific class can be caught.
        raise ImportError('Failed to import pydot. You must install pydot'
                          ' and graphviz for `pydotprint` to work.')