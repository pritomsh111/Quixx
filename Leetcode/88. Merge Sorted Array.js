let nums1 = [1, 4, 9, 0, 0, 0], m = 3, nums2 = [-2, 2, 7], n = 3;

let i = 0, j = 0, boro = false, choto = false;

while (i < m + j) {
    if (nums2[j] > nums1[i]) {
        continue;
    }
    else if (nums2[j] <= nums1[i]) {
        nums1.splice(i, 0, nums2[j++]);
    }
}