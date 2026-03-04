def binary_search_iter(arr, target):
    """Iterative binary search. Returns index or -1 if not found."""
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1


def binary_search_rec(arr, target, lo=0, hi=None):
    """Recursive binary search. Returns index or -1 if not found."""
    if hi is None:
        hi = len(arr) - 1
    if lo > hi:
        return -1
    mid = (lo + hi) // 2
    if arr[mid] == target:
        return mid
    if arr[mid] < target:
        return binary_search_rec(arr, target, mid + 1, hi)
    return binary_search_rec(arr, target, lo, mid - 1)


if __name__ == '__main__':
    a = [1, 3, 5, 7, 9, 11]
    tests = [(5, 2), (2, -1), (11, 5), (1, 0), (9, 4)]
    for target, expected in tests:
        it = binary_search_iter(a, target)
        rc = binary_search_rec(a, target)
        print(f"target={target} iter={it} rec={rc} expected={expected}")
