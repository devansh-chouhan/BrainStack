export const random = (len) => {
    let options = "qwertyuiopasdfghjklzxcvbnm1234567890";
    let optionLength = options.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += options[Math.floor(Math.random() * optionLength)];
    }
    return ans;
};
//# sourceMappingURL=utils.js.map