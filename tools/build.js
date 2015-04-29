{
    "appDir": "../app",
    "baseUrl": "./javascript",
    "mainConfigFile": "../app/javascript/util.js",
    "dir": "../dist",
    "modules": [
        {
            "name": "util",
            "include": [
                "jquery",
                "bootstrap/dropdown"
            ]
        },
        {
            "name": "controller/index",
            "exclude": ["util"]
        }
    ]
}
