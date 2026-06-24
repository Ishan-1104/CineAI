import pickle
import pandas as pd
import sys
import json

# Load model files once
movies = pickle.load(open("src/python/movies.pkl", "rb"))
similarity = pickle.load(open("src/python/similarity.pkl", "rb"))


def recommend(movie_name, top_n=10):
    try:
        movie_name = movie_name.strip().lower()

        matches = movies[
            movies["title"].str.lower() == movie_name
        ]

        if matches.empty:
            return {
                "success": False,
                "message": "Movie not found",
                "recommendations": []
            }

        movie_index = matches.index[0]

        distances = list(
            enumerate(similarity[movie_index])
        )

        distances = sorted(
            distances,
            key=lambda x: x[1],
            reverse=True
        )

        recommendations = []

        for movie in distances[1:top_n + 1]:
            movie_id = movie[0]

            recommendations.append(
                movies.iloc[movie_id]["title"]
            )

        return {
            "success": True,
            "recommendations": recommendations
        }

    except Exception as error:
        return {
            "success": False,
            "message": str(error),
            "recommendations": []
        }


if __name__ == "__main__":
    movie_name = sys.argv[1]

    result = recommend(movie_name)

    print(json.dumps(result))