from src.image_ranking_service import *

MODEL_PATH = "models/model.h5"

if __name__ == "__main__":
    irs = ImageRankingService(MODEL_PATH)
