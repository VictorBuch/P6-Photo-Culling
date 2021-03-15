from src.image_ranking_service import *

MODEL_PATH = "models/model_AVAsubset_val_loss-0.0037.h5"

if __name__ == "__main__":
    irs = ImageRankingService(MODEL_PATH)
