def cantor_pairing(x, y):
    return int((x + y) * (x + y + 1)/2 + y)


def cantor_pairing_nd(*args):
    if len(args) == 2:
        return cantor_pairing(args[0], args[1])
    return cantor_pairing(cantor_pairing_nd(*args[:-1]), args[-1])


if __name__ == '__main__':
    import collections
    import matplotlib.pyplot as plt
    import numpy as np
    
    d = {}
    for i in range(1, 10):
        for j in range(1, 10):
            val = cantor_pairing(i, j)
            d[val] = np.array((i, j))
    od = collections.OrderedDict(sorted(d.items()))

    plt.figure()
    plt.axis([0, 10, 0, 10])
    plt.axis('off')
    for k, v in od.items():
        if v[0] == 9 and v[1] == 2:
            break
        plt.annotate(s='{}/{}'.format(*v), xy=v, ha='center', va='center')
        if 'v0' in locals():
            plt.annotate(s='', xy=v0 + (v - v0) * 0.2 / np.linalg.norm(v - v0), xytext=v - (
                v - v0) * 0.2 / np.linalg.norm(v - v0), arrowprops=dict(arrowstyle='<-'))
        v0 = v
    plt.savefig('progression.png', format='png', bbox_inches='tight', dpi=300)
