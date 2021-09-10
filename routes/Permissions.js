const permissionsByLevel = () => {
    var myMap = new Map();
    var zeroLevelPermissions = [
        'Realtime national data',
        'Graphs/Tables',
    ]
    var levelFirstPermissions = [
        'Carbon Footprint for buldings',
        'Realtime data for local region',
        'Access to historic data & forecasting (weather & carbon intensity)'
    ];
    var levelSecondPermissions = [
        'Energy Price Predictions [National/]',
        'Energy Demand Predictions (National/local markets)',
        'Carbon Emission Predictions (building wise)',
        'Energy Consumtion Predictions (building wise)'
    ]
    var levelThirdPermissions = [
        'Optimal Price for trading in the future with exact date and time',
        'Real-time customer billing',
        'Optimize Energy Consumption for trading'
    ]

    myMap.set('free', zeroLevelPermissions)
    myMap.set('levelI', levelFirstPermissions)
    myMap.set('levelII', levelSecondPermissions)
    myMap.set('levelIII', levelThirdPermissions)

    return myMap
}

const mapOfPermissions = () => {
    var myMap = new Map();
    var zeroLevelInclutions = [
        'free'
    ]
    var firstLevelInclutions = [
        ...zeroLevelInclutions,'levelI'
    ]
    var secondLevelInclutions = [
        ...firstLevelInclutions, 'levelII'
    ]
    var thirdLevelInclutions = [
        ...secondLevelInclutions, 'levelIII'
    ]

    myMap.set('free', zeroLevelInclutions);
    myMap.set('levelI', firstLevelInclutions);
    myMap.set('levelII', secondLevelInclutions);
    myMap.set('levelIII', thirdLevelInclutions);
    return myMap;
}


module.exports.permissionsByLevel = permissionsByLevel;
module.exports.mapOfPermissions = mapOfPermissions;