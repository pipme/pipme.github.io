---
layout: post
title: The Cantor Pairing Function
# gh-repo: pipme/pipme.github.io
# gh-badge: [star, fork, follow]
tags: [Cantor, hashing]
comments: true
---

One surprising fact from set theory is that integers and rational numbers have the same cardinality as natural numbers. This can be proved by a standard trick named diagonal progression invented by Cantor. The underlying function is the Cantor pairing function. Yesterday I was writing codes to hash two integers and the Cantor pairing function turns out to be a neat way.

Formally, the Cantor pairing function $\pi$ is defined as:

$$
\pi:\mathbb{N} \times \mathbb{N} \to \mathbb{N} \\
\pi(k_1, k_2) := \frac{1}{2} (k_1 + k_2)(k_1 + k_2 + 1) + k2
$$

It can also be easily extended to multiple dimensions cases:

$$
\pi^{(n)}:\mathbb{N}^n \to \mathbb{N} \\
\pi^{(n)}(k_1, \ldots, k_{n-1}, k_n) := \pi ( \pi^{(n-1)}(k_1, \ldots, k_{n-1}) , k_n), \quad n>2
$$

The Cantor pairing function is bijection. To prove that, we just need to invert it ([details](https://en.wikipedia.org/wiki/Pairing_function#Inverting_the_Cantor_pairing_function]) can be found  in Wikepidia). 

Simple python and C++ implementations:

```python
def cantor_pairing(x, y):
    return int((x + y) * (x + y +1)/2 + y)

def cantor_pairing_nd(*args):
    if len(args) == 2:
        return cantor_pairing(args[0], args[1])
    return cantor_pairing(cantor_pairing_nd(*args[:-1]), args[-1])

print(cantor_pairing_nd(1,2,3))
```


```c++
struct pair_hash
{
	std::size_t operator() (const std::pair<int, int>& p) const
	{
		return (p.first + p.second) * (p.first + p.second + 1) / 2 + p.second;
	}
};

unordered_map<pair<int, int>, int, pair_hash> um;
um[make_pair(1,2)] = 0;
```

To see the connection between the diagonal progression and the Cantor pairing function, we can do a formal analysis or directly visualize its graphical shape. I write a simple [code](https://github.com/pipme/pipme.github.io/blob/master/code/cantor_pairing_function.py) to visualize the progression order based on the Cantor pairing function. The arrow direction indicates the monotonic increase of the Cantor pairing function (by 1 each time): ![not found](/img/progression.png)