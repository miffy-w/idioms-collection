function countSubstrings(s: string): number {
    // dp[i] 表示，s[0] - s[i] 组成的字符串的回文个数
    const dp: number[] = []
    dp[0] = 1;
    const isCuntStr = (str: string): boolean => {
        // 方法返回boolean类型，用于判断str是不是回文字符串
        if (!str) return false;
        return Array.from(str).reverse().join('') === str
    }
    for (let i = 1; i < s.length; i++) {
        let num = 0
        let str = ''
        for (let j = i; j >= 0; j--) {
            str += s[j];
            if (isCuntStr(str)) {
                num++;
            }
        }
        dp[i] = dp[i - 1] + num;
    }

    return dp.pop()!
}
