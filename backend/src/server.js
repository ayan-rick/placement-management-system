const app = require("./app");

console.log(">>> LOADED CURRENT APP.JS <<<");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});