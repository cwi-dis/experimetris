from __future__ import print_function

import json
import sys
import matplotlib.pyplot as plt

from collections import Counter
from numpy import arange


def main():
    if len(sys.argv) < 2:
        print("USAGE:", sys.argv[0], "data_file")
        sys.exit(1)

    tetris = json.load(open(sys.argv[1], "r"))[1]

    pieces = [piece[0] for piece in tetris["generatedPieces"]]
    counter = Counter(pieces).most_common()

    xaxis = arange(1, len(counter) + 1, 1)

    plt.title("n={0}".format(len(pieces)))
    plt.bar(xaxis, [c[1] for c in counter])
    plt.xticks(xaxis, [c[0] for c in counter])
    plt.show()


if __name__ == "__main__":
    main()
