let nums1 = [1, 4, 9, 0, 0, 0], m = 3, nums2 = [-2, 2, 7], n = 3;

let i = 0, j = 0, boro = false, choto = false;

nums1.length = m;

while (i < m + j) {
    if (nums2[j] < nums1[i] && i == 0) {
        nums1.unshift(nums2[j++]);
    }
    else if (nums2[j] > nums1[i]) {
        if (i >= m - 1) {

            nums1.push(nums2[j++]);
        }
    }
}