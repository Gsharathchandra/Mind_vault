export function random(len) {
    let options = "qwerty298e8y439rywbd2iubdld";
    let ans = "";
    let length = options.length;
    for (let i = 0; i < len; i++) {
        ans += options[Math.floor(Math.random() * length)];
    }
    return ans;
}
//# sourceMappingURL=utils.js.map