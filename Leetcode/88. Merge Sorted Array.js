let nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3;

let i = 0, j = 0;

while (i < m) {
    if (nums1[i] < nums2[j]) {
        nums1.splice(i, 0, nums2[j]);
    }
}