import matplotlib.pyplot as plt
import json

from collections import Counter
from numpy import arange


def main():
    tetris = json.load(open("/Users/tom/Downloads/data.json", "r"))[1]

    pieces = [piece[0] for piece in tetris["generatedPieces"]]
    counter = Counter(pieces).most_common()

    xaxis = arange(1, len(counter) + 1, 1)

    plt.bar(xaxis, [c[1] for c in counter])
    plt.xticks(xaxis, [c[0] for c in counter])
    plt.show()


if __name__ == "__main__":
    main()
