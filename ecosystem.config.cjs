module.exports = {
    apps: [
        {
            name: "esports-training-companion",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "production",
                PORT: 3008
            }
        }
    ]
}
